"use strict";
// Separate local-only content namespace. Never mutates STUDY_CONTENT or study v1/v2.
(() => {
  const KEY = "zhixu-private-library-v1", UNUSED = "zhixu-private-library-unused-v0";
  const PACK = "zhixu-private-question-pack", LIB = "zhixu-private-library";
  const BACKUP = "zhixu-private-library-backup";
  const LIMITS = Object.freeze({ fileBytes: 1024 * 1024, backupBytes: 2 * 1024 * 1024,
    // Reserve space for the private backup envelope and an expanded revision.
    libraryBytes: 2 * 1024 * 1024 - 256, packs: 30, questionsPerPack: 1000, questions: 3000,
    materialsPerPack: 100, papersPerPack: 20, sectionsPerPaper: 30, treeNodes: 100000 });
  const fail = message => { throw new Error(message); };
  const object = x => x !== null && typeof x === "object" && !Array.isArray(x);
  const bytes = text => new TextEncoder().encode(text).length;
  const copy = x => JSON.parse(JSON.stringify(x));
  const integer = (x, min, max, label) => Number.isSafeInteger(x) && x >= min && x <= max ? x : fail(label + "无效");
  const plain = (x, label, max, optional = false) => {
    if (typeof x !== "string" || x.length > max) fail(label + "须为不超过 " + max + " 字符的纯文本");
    // Preserve math < > and literal HTML as text. Never strip tags or interpret markup.
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/u.test(x)) fail(label + "含不支持的控制字符");
    const out = x.replace(/\r\n?/g, "\n").replace(/\t/g, "  ").trim();
    if (!optional && !out) fail(label + "不能为空");
    return out;
  };
  const id = (x, label) => typeof x === "string" && /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/.test(x) && !["__proto__", "prototype", "constructor"].includes(x) ? x : fail(label + "须为 1–64 位字母、数字、点、下划线或连字符，且以字母/数字开头");
  const fields = (x, allowed, required, label) => {
    if (!object(x)) fail(label + "须为对象");
    for (const k of Object.keys(x)) if (!allowed.includes(k)) fail(label + "含不支持的字段：" + k.slice(0, 80));
    for (const k of required) if (!Object.prototype.hasOwnProperty.call(x, k)) fail(label + "缺少字段：" + k);
  };
  const array = (x, max, label, min = 0) => Array.isArray(x) && x.length >= min && x.length <= max ? x : fail(label + "数量须为 " + min + "–" + max);
  const unique = (list, label) => { if (new Set(list).size !== list.length) fail(label + "含重复 ID"); };
  function safeTree(root) {
    const pending = [[root, 0]];
    let count = 0;
    while (pending.length) {
      const [value, depth] = pending.pop();
      if (++count > LIMITS.treeNodes || depth > 12) fail("JSON 内容过多或嵌套过深");
      if (value !== null && typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (["__proto__", "prototype", "constructor"].includes(key)) fail("JSON 含保留字段");
          pending.push([value[key], depth + 1]);
        }
      } else if (!["string", "boolean", "number"].includes(typeof value) && value !== null) fail("只接受 JSON 数据");
      else if (typeof value === "number" && !Number.isFinite(value)) fail("JSON 数字超出范围");
    }
  }
  function pack(raw) {
    fields(raw, ["format", "version", "packId", "title", "sourceNote", "materials", "questions", "papers"],
      ["format", "version", "packId", "title", "sourceNote", "questions"], "题包");
    if (raw.format !== PACK || raw.version !== 1) fail("题包格式或版本不支持");
    const out = { format: PACK, version: 1, packId: id(raw.packId, "题包 ID"), title: plain(raw.title, "题包标题", 200),
      sourceNote: plain(raw.sourceNote, "来源说明", 2000), materials: [], questions: [], papers: [] };
    out.materials = array(raw.materials ?? [], LIMITS.materialsPerPack, "材料").map(m => {
      fields(m, ["id", "title", "text"], ["id", "title", "text"], "材料");
      return { id: id(m.id, "材料 ID"), title: plain(m.title, "材料标题", 200), text: plain(m.text, "材料正文", 50000) };
    });
    unique(out.materials.map(m => m.id), "材料");
    const mids = new Set(out.materials.map(m => m.id));
    out.questions = array(raw.questions, LIMITS.questionsPerPack, "题目", 1).map(q => {
      fields(q, ["id", "type", "stem", "module", "materialIds", "options", "answer", "explanation"], ["id", "type", "stem"], "题目");
      if (!["single-choice", "writing"].includes(q.type)) fail("只支持单选题或申论阅读/自查任务");
      const result = { id: id(q.id, "题目 ID"), type: q.type, stem: plain(q.stem, "题干", 20000),
        module: plain(q.module ?? "未分类", "模块", 80),
        materialIds: array(q.materialIds ?? [], 10, "题目材料引用").map(x => id(x, "材料引用")),
        explanation: plain(q.explanation ?? "", "解析/参考提示", 30000, true) };
      unique(result.materialIds, "题目材料引用");
      if (result.materialIds.some(x => !mids.has(x))) fail("题目引用了不存在的材料");
      if (q.type === "single-choice") {
        result.options = array(q.options, 8, "选项", 2).map(x => plain(x, "选项", 6000));
        if (new Set(result.options).size !== result.options.length) fail("同题选项不能完全相同");
        result.answer = q.answer === undefined || q.answer === null ? null : integer(q.answer, 0, result.options.length - 1, "答案下标");
      } else {
        if (q.options !== undefined || q.answer !== undefined) fail("申论任务不接受选项或自动评分答案");
      }
      return result;
    });
    unique(out.questions.map(q => q.id), "题目");
    const qids = new Set(out.questions.map(q => q.id));
    out.papers = array(raw.papers ?? [], LIMITS.papersPerPack, "试卷").map(p => {
      fields(p, ["id", "title", "sections", "sourceNote"], ["id", "title", "sections"], "试卷");
      const result = { id: id(p.id, "试卷 ID"), title: plain(p.title, "试卷标题", 200),
        sourceNote: plain(p.sourceNote ?? "", "试卷说明", 2000, true),
        sections: array(p.sections, LIMITS.sectionsPerPaper, "分节", 1).map(s => {
          fields(s, ["id", "title", "questionIds"], ["id", "title", "questionIds"], "分节");
          const section = { id: id(s.id, "分节 ID"), title: plain(s.title, "分节标题", 200),
            questionIds: array(s.questionIds, LIMITS.questionsPerPack, "分节题目", 1).map(x => id(x, "题目引用")) };
          if (section.questionIds.some(x => !qids.has(x))) fail("试卷引用了不存在的题目");
          return section;
        }) };
      unique(result.sections.map(s => s.id), "分节");
      unique(result.sections.flatMap(s => s.questionIds), "同卷题目（跨节也不能重复）");
      return result;
    });
    unique(out.papers.map(p => p.id), "试卷");
    return out;
  }
  const fresh = () => ({ format: LIB, schemaVersion: 2, revision: 0, packs: [] });
  function normalize(raw) {
    safeTree(raw);
    fields(raw, ["format", "schemaVersion", "revision", "packs"], ["format", "schemaVersion", "revision", "packs"], "私人题库");
    if (raw.format !== LIB || raw.schemaVersion !== 2) fail("私人题库存储格式不支持");
    const out = { format: LIB, schemaVersion: 2, revision: integer(raw.revision, 0, Number.MAX_SAFE_INTEGER, "修订号"),
      packs: array(raw.packs, LIMITS.packs, "题包").map(pack) };
    unique(out.packs.map(p => p.packId), "题包");
    if (out.packs.reduce((n, p) => n + p.questions.length, 0) > LIMITS.questions) fail("私人题库最多 " + LIMITS.questions + " 道题");
    // Validate the final backup envelope and the largest safe revision before saving.
    // The shared store increments revision after normalization; a digit rollover must
    // never make a successfully committed library unreadable or non-exportable.
    const reserved={...out,revision:Number.MAX_SAFE_INTEGER};
    if (bytes(JSON.stringify(reserved)) > LIMITS.libraryBytes) fail("合并后的私人题库接近 2 MiB 保护上限，请先导出并减少题包");
    const envelope={format:BACKUP,version:1,library:reserved};
    safeTree(envelope);
    if(bytes(JSON.stringify(envelope))>LIMITS.backupBytes)fail("私人备份封装超过 2 MiB，未写入内容");
    return out;
  }
  function parse(text) {
    if (typeof text !== "string" || bytes(text) > LIMITS.backupBytes) fail("JSON 文件超过 2 MiB 或不是文本");
    let raw;
    try { raw = JSON.parse(text.replace(/^\uFEFF/, "")); } catch (_) { fail("文件不是有效的 JSON"); }
    safeTree(raw);
    if (!object(raw)) fail("JSON 顶层须为对象");
    if (raw.format === PACK) {
      if (bytes(text) > LIMITS.fileBytes) fail("单题包文件超过 1 MiB");
      return [pack(raw)];
    }
    if (raw.format === BACKUP) {
      fields(raw, ["format", "version", "library"], ["format", "version", "library"], "私人备份");
      if (raw.version !== 1) fail("私人备份版本不支持");
      return normalize(raw.library).packs;
    }
    if ([1, 2].includes(raw.schemaVersion)) fail("这是原学习记录 v1/v2 备份，请在主站「备份与恢复」导入；它不含私人题库");
    fail("仅接受私人题包或私人题库备份，不支持 PDF、图片、HTML 或自动抓题");
  }
  function create({ onError = () => {} } = {}) {
    if (!window.STUDY_PROGRESS_STORE) fail("请先加载 local-progress-store.js");
    let state = fresh(), generation = 0, busy = false, valid = false, initialized = false;
    const plans = new WeakMap();
    const store = window.STUDY_PROGRESS_STORE.create({ key: KEY, legacyKey: UNUSED, normalize,
      onError: (message, kind) => onError(["parse", "validation"].includes(kind)
        ? "本机私人题库损坏或格式不兼容，已停止保存，原文未覆盖。请先导出存储原文；本候选不提供损坏库的一键替换修复，不要清除全站数据。"
        : message.replaceAll("学习记录", "私人题库"), kind) });
    function reload() {
      if (busy) fail("正在保存，请等待完成后再重新读取");
      generation++;
      const result = store.read();
      initialized = true;
      valid = !result.error || result.kind === "unsupported";
      if (valid) state = result.value || fresh();
      return { ...result, value: valid ? copy(state) : null };
    }
    function ready() {
      if (!initialized) reload();
      if (!valid || store.error) fail(store.error || "私人题库读取失败，请先导出存储原文并处理错误");
      if (busy) fail("正在保存，请勿重复导入");
    }
    function makePlan(next, summary) {
      const token = Object.freeze({ ...summary });
      plans.set(token, { next: normalize(next), generation });
      return token;
    }
    function prepare(text) {
      ready();
      const incoming = parse(text), existing = new Map(state.packs.map(p => [p.packId, p]));
      let skipped = 0;
      const added = [];
      for (const p of incoming) {
        if (existing.has(p.packId)) {
          if (JSON.stringify(existing.get(p.packId)) !== JSON.stringify(p)) fail("题包 ID 冲突：" + p.packId + "。原题包未覆盖；请核对来源并为不同题包使用不同 ID");
          skipped++;
        } else added.push(p);
      }
      return makePlan({ ...state, packs: [...state.packs, ...added] }, { action: "import", added: added.length,
        skipped, questions: added.reduce((n, p) => n + p.questions.length, 0), papers: added.reduce((n, p) => n + p.papers.length, 0) });
    }
    function prepareRemoval(packId) {
      ready();
      if (!state.packs.some(p => p.packId === packId)) fail("题包不存在");
      return makePlan({ ...state, packs: state.packs.filter(p => p.packId !== packId) }, { action: "remove", packId });
    }
    async function commit(token) {
      ready();
      const pending = plans.get(token);
      if (!pending || pending.generation !== generation) fail("预览已失效，请重新选择并校验文件");
      plans.delete(token);
      if (token.action === "import" && token.added === 0) return { ok: true, unchanged: true };
      busy = true;
      try {
        const result = await store.save(pending.next);
        if (result.ok) { state = result.value; generation++; }
        return result;
      } finally { busy = false; }
    }
    return Object.freeze({ reload, prepare, prepareRemoval, commit,
      snapshot() { if (!initialized) reload(); return valid ? copy(state) : null; },
      exportBackup() {
        if (!initialized) reload();
        if (!valid) fail("当前没有通过校验的私人题库副本，请导出存储原文");
        const data = JSON.stringify({ format: BACKUP, version: 1, library: normalize(state) });
        if (bytes(data) > LIMITS.backupBytes) fail("备份封装后超出 2 MiB，请先减少题包");
        return data;
      },
      raw() { try { return { text: store.getRaw(), cached: false }; } catch (_) { return { text: store.loadedRaw, cached: true }; } },
      destroy() { generation++; store.destroy(); },
      get error() { return store.error; }, get busy() { return busy; }, get writeSupported() { return store.writeSupported; },
    });
  }
  window.PRIVATE_LIBRARY = Object.freeze({ create, parse, normalize, fresh, bytes, LIMITS, KEY, PACK, BACKUP });
})();
