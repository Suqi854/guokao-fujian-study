"use strict";
// Local training records only. No storage, network calls, exam scoring or predictions.
(() => {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const MAX_ELAPSED_MS = 365 * DAY_MS;
  const MAX_DATE_MS = 253402300799999;
  const TERMINAL = new Set(["finished", "early", "timeout"]);
  const fail = (message) => { throw new Error(message); };
  const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
  const integer = (value, min, max) => Number.isSafeInteger(value) && value >= min && value <= max;
  const idOK = (value) => typeof value === "string" && /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/.test(value);
  const iso = (ms) => new Date(ms).toISOString();
  function time(value) {
    const ms = typeof value === "number" ? value : typeof value === "string" ? Date.parse(value) : value && typeof value.getTime === "function" ? value.getTime() : NaN;
    if (!integer(ms, 0, MAX_DATE_MS)) fail("训练时间必须是有效的整数毫秒、日期或 ISO 时间。");
    return ms;
  }
  function isoTime(value, field) {
    if (typeof value !== "string") fail(`${field}不是有效的 ISO 时间。`);
    const ms = Date.parse(value);
    if (!integer(ms, 0, MAX_DATE_MS) || iso(ms) !== value) fail(`${field}不是有效的 ISO 时间。`);
    return ms;
  }
  function content() {
    const c = window.STUDY_CONTENT;
    if (!c || !Array.isArray(c.questions) || !Array.isArray(c.writing) || !Array.isArray(c.lessons)) fail("训练内容尚未加载。");
    return c;
  }
  function question(id) {
    const matches = content().questions.filter((q) => q.id === id);
    if (matches.length !== 1) fail(`训练题目不存在或编号重复：${id}`);
    const q = matches[0];
    if (!Array.isArray(q.options) || !integer(q.options.length, 2, 20) || !integer(q.answer, 0, q.options.length - 1)) fail(`题目选项或答案无效：${id}`);
    return q;
  }
  function writing(id) {
    const matches = content().writing.filter((w) => w.id === id);
    if (matches.length !== 1) fail(`申论任务不存在或编号重复：${id}`);
    return matches[0];
  }
  function moduleFor(q) {
    const lesson = content().lessons.find((l) => l.id === q.lesson);
    if (!lesson) fail(`题目关联讲义不存在：${q.id}`);
    const module = q.meta?.module || lesson.category;
    if (typeof module !== "string" || !module.trim() || module.length > 80) fail(`题目模块无效：${q.id}`);
    return module;
  }
  // Sorted JSON makes fingerprints independent of object key insertion order.
  // The option count is retained so older records can validate frozen answers
  // even if a later content revision changes the number of options.
  function canonical(value, ancestors = new Set()) {
    if (value === null || typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
    if (typeof value === "number" && Number.isFinite(value)) return JSON.stringify(value);
    if (typeof value !== "object" || ancestors.has(value)) fail("内容指纹需要不含循环引用的 JSON 数据。");
    ancestors.add(value);
    let result;
    if (Array.isArray(value)) result = `[${value.map((v) => canonical(v, ancestors)).join(",")}]`;
    else result = `{${Object.keys(value).sort().filter((key) => value[key] !== undefined).map((key) => `${JSON.stringify(key)}:${canonical(value[key], ancestors)}`).join(",")}}`;
    ancestors.delete(value);
    return result;
  }
  function signature(value) {
    if (!object(value)) fail("无法为无效内容生成指纹。");
    const isChoice = Array.isArray(value.options);
    if (isChoice && !integer(value.options.length, 2, 20)) fail("题目选项数量无效。");
    // Shared tables are displayed alongside the stem but live outside the question.
    // Hash the complete referenced material, including its title, note and every table.
    // Questions without this dependency retain their original fingerprint.
    let payload = value;
    if (isChoice && value.materialId !== undefined) {
      const materials = content().questionMaterials;
      if (!idOK(value.materialId) || !object(materials) || !Object.prototype.hasOwnProperty.call(materials, value.materialId) || !object(materials[value.materialId])) fail(`题目共用材料引用不存在：${value.materialId}`);
      const material = materials[value.materialId];
      if (typeof material.title !== "string" || typeof material.note !== "string" || !Array.isArray(material.tables) || material.tables.length === 0) fail(`题目共用材料内容不完整：${value.materialId}`);
      payload = { question: value, sharedMaterial: material };
    }
    const source = canonical(payload);
    let a = 2166136261;
    let b = 2246822519;
    for (let i = 0; i < source.length; i++) {
      const code = source.charCodeAt(i);
      a = Math.imul(a ^ code, 16777619);
      b = Math.imul(b ^ code, 3266489917);
    }
    const hex = (n) => (n >>> 0).toString(16).padStart(8, "0");
    return `v1:${isChoice ? `q${value.options.length}` : "w"}:${hex(a)}${hex(b)}`;
  }
  function frozenOptionCount(value) {
    const match = typeof value === "string" && /^v1:q([0-9]{1,2}):[0-9a-f]{16}$/.exec(value);
    if (!match || !integer(Number(match[1]), 2, 20)) fail("选择题内容指纹无效。");
    return Number(match[1]);
  }
  const isTerminal = (run) => Boolean(run && TERMINAL.has(run.status));
  const empty = () => ({ runs: [], activeRun: null });
  function base(id, now, kind, budgetMs) {
    if (!idOK(id)) fail("训练记录编号无效。");
    const ms = time(now);
    return { id, kind, startedAt: iso(ms), endedAt: null, anchorMs: ms, elapsedMs: 0, budgetMs, status: "running", clockIssue: "" };
  }
  function newChoice({ id, now, ids, budgetSeconds } = {}) {
    if (!Array.isArray(ids) || ids.length < 1 || ids.length > 20 || new Set(ids).size !== ids.length) fail("每组须选择 1 至 20 道不重复的题目。");
    if (!integer(budgetSeconds, 1, 4 * 60 * 60)) fail("自选预算须为 1 秒至 4 小时的整数秒。");
    const items = Array.from(ids, (qid) => {
      if (!idOK(qid)) fail("题目编号无效。");
      const q = question(qid);
      return { qid, module: moduleFor(q), answer: q.answer, signature: signature(q) };
    });
    return { ...base(id, now, "choice", budgetSeconds * 1000), items, cursor: 0, spentMs: items.map(() => 0), responses: items.map(() => null) };
  }
  function newWriting({ id, now, taskId } = {}) {
    if (!idOK(taskId)) fail("申论任务编号无效。");
    const task = writing(taskId);
    return { ...base(id, now, "writing", null), taskId, signature: signature(task), completed: null, draftChars: null };
  }
  function validateRun(raw, location) {
    if (!object(raw) || !idOK(raw.id)) fail("训练记录对象或编号无效。");
    if (!["choice", "writing"].includes(raw.kind)) fail("训练类型无效。");
    if (!["running", "paused", "finished", "early", "timeout"].includes(raw.status)) fail("训练状态无效。");
    const terminal = isTerminal(raw);
    if (location === "history" && !terminal) fail("历史训练必须已经结束。");
    if (location === "active" && terminal) fail("活动训练不能是已结束记录。");
    if (!["", "backward", "gap"].includes(raw.clockIssue)) fail("训练时钟标记无效。");
    const startedMs = isoTime(raw.startedAt, "开始时间");
    let endedMs = null;
    if (terminal) endedMs = isoTime(raw.endedAt, "结束时间");
    else if (raw.endedAt !== null) fail("尚未结束的训练不能有结束时间。");
    if (raw.status === "running") {
      if (!integer(raw.anchorMs, 0, MAX_DATE_MS)) fail("运行中训练缺少有效计时起点。");
    } else if (raw.anchorMs !== null) fail("暂停或结束的训练不能保留计时起点。");
    if (!integer(raw.elapsedMs, 0, MAX_ELAPSED_MS)) fail("训练累计用时无效或超过一年上限。");
    // A recorded clock anomaly means wall-clock dates cannot prove chronology.
    // Do not invent dates to hide it; elapsed time still excludes that interval.
    if (raw.clockIssue === "") {
      if (endedMs !== null && endedMs < startedMs) fail("训练结束时间早于开始时间。");
      if (raw.status === "running" && raw.anchorMs < startedMs) fail("计时起点早于开始时间。");
      const lastMs = terminal ? endedMs : raw.status === "running" ? raw.anchorMs : null;
      if (lastMs !== null && raw.elapsedMs > lastMs - startedMs) fail("累计用时超过可用时间范围。");
    }
    const run = { id: raw.id, kind: raw.kind, startedAt: raw.startedAt, endedAt: raw.endedAt, anchorMs: raw.anchorMs, elapsedMs: raw.elapsedMs, budgetMs: raw.budgetMs, status: raw.status, clockIssue: raw.clockIssue };
    if (raw.kind === "choice") {
      if (!integer(raw.budgetMs, 1000, 4 * 60 * 60 * 1000)) fail("选择题时间预算无效。");
      if (raw.elapsedMs > raw.budgetMs) fail("选择题用时超过预算。");
      if (raw.status === "timeout" && raw.elapsedMs !== raw.budgetMs) fail("超时记录必须达到预算。");
      if (raw.status !== "timeout" && raw.elapsedMs === raw.budgetMs) fail("达到预算的选择题训练必须标记为超时。");
      if (!Array.isArray(raw.items) || raw.items.length < 1 || raw.items.length > 20) fail("训练题组须包含 1 至 20 道题。");
      if (!integer(raw.cursor, 0, raw.items.length - 1)) fail("当前题目位置无效。");
      if (!Array.isArray(raw.spentMs) || raw.spentMs.length !== raw.items.length || !Array.isArray(raw.responses) || raw.responses.length !== raw.items.length) fail("题目用时或答题记录长度不一致。");
      const ids = new Set();
      const counts = [];
      run.items = Array.from(raw.items, (item) => {
        if (!object(item) || !idOK(item.qid) || ids.has(item.qid)) fail("题目编号无效或重复。");
        ids.add(item.qid);
        const q = question(item.qid);
        const module = moduleFor(q);
        if (typeof item.module !== "string" || !item.module.trim() || item.module.length > 80) fail("冻结模块名称无效。");
        const count = frozenOptionCount(item.signature);
        counts.push(count);
        if (!integer(item.answer, 0, count - 1)) fail("冻结答案超出选项范围。");
        if (item.signature === signature(q) && (item.answer !== q.answer || item.module !== module)) fail("冻结答案或模块与同版本内容不一致。");
        return { qid: item.qid, module: item.module, answer: item.answer, signature: item.signature };
      });
      run.cursor = raw.cursor;
      run.spentMs = Array.from(raw.spentMs, (ms, index) => {
        if (!integer(ms, 0, raw.budgetMs) || (index > raw.cursor && ms !== 0)) fail("题目分配用时无效。");
        return ms;
      });
      if (run.spentMs.reduce((sum, ms) => sum + ms, 0) !== raw.elapsedMs) fail("各题用时之和必须等于训练累计用时。");
      run.responses = Array.from(raw.responses, (response, index) => {
        if (response === null) return null;
        if (!object(response) || !integer(response.choice, 0, counts[index] - 1) || index > raw.cursor) fail("提交答案或题目位置无效。");
        const atMs = isoTime(response.at, "提交时间");
        if (raw.clockIssue === "") {
          if (atMs < startedMs || (endedMs !== null && atMs > endedMs) || (raw.status === "running" && atMs > raw.anchorMs)) fail("提交时间超出训练范围。");
        }
        return { choice: response.choice, at: response.at };
      });
    } else {
      if (raw.budgetMs !== null || raw.status === "timeout") fail("申论训练不使用时间预算或超时状态。");
      if (!idOK(raw.taskId)) fail("申论任务编号无效。");
      writing(raw.taskId);
      if (typeof raw.signature !== "string" || !/^v1:w:[0-9a-f]{16}$/.test(raw.signature)) fail("申论内容指纹无效。");
      if (raw.completed !== null && typeof raw.completed !== "boolean") fail("申论完成标记无效。");
      if ((!terminal && raw.completed !== null) || (raw.status === "finished" && raw.completed !== true) || (raw.status === "early" && raw.completed !== false)) fail("申论完成标记与训练状态不一致。");
      if (raw.draftChars !== null && !integer(raw.draftChars, 0, 10000000)) fail("申论字符数无效或过大。");
      Object.assign(run, { taskId: raw.taskId, signature: raw.signature, completed: raw.completed, draftChars: raw.draftChars });
    }
    return run;
  }
  function validate(raw) {
    if (!object(raw) || !Array.isArray(raw.runs) || raw.runs.length > 500 || !(raw.activeRun === null || object(raw.activeRun))) fail("训练记录格式无效，历史最多保留 500 组。");
    if (raw.runs.length === 500 && raw.activeRun !== null) fail("已达到 500 组历史上限，不能保留尚待归档的活动训练。");
    const result = { runs: Array.from(raw.runs, (run) => validateRun(run, "history")), activeRun: raw.activeRun === null ? null : validateRun(raw.activeRun, "active") };
    const ids = result.runs.map((run) => run.id);
    if (result.activeRun) ids.push(result.activeRun.id);
    if (new Set(ids).size !== ids.length) fail("训练记录编号重复。");
    return result;
  }
  function compatible(run) {
    try {
      const checked = validateRun(run);
      return checked.kind === "choice" ? checked.items.every((item) => {
        const q = question(item.qid);
        return item.signature === signature(q) && item.answer === q.answer && item.module === moduleFor(q);
      }) : checked.signature === signature(writing(checked.taskId));
    } catch (_) { return false; }
  }
  function close(run, status, atMs) {
    run.status = status;
    run.endedAt = iso(atMs);
    run.anchorMs = null;
  }
  // Return the same run. Repeated settlement never recounts elapsed time.
  function settle(run, now) {
    validateRun(run);
    const ms = time(now);
    if (run.status !== "running") return run;
    const delta = ms - run.anchorMs;
    if (delta < 0 || delta > DAY_MS || run.elapsedMs + delta > MAX_ELAPSED_MS) {
      run.status = "paused";
      run.anchorMs = null;
      run.clockIssue = delta < 0 ? "backward" : "gap";
      return run;
    }
    const counted = run.kind === "choice" ? Math.min(delta, run.budgetMs - run.elapsedMs) : delta;
    const reachedAt = run.anchorMs + counted;
    run.elapsedMs += counted;
    if (run.kind === "choice") run.spentMs[run.cursor] += counted;
    run.anchorMs = ms;
    if (run.kind === "choice" && run.elapsedMs === run.budgetMs) close(run, "timeout", reachedAt);
    return run;
  }
  // project returns an independent display snapshot; it never changes storage.
  function project(run, now) {
    return settle(validateRun(run), now);
  }
  // pause/resume/advance/finish return true only when that action takes effect.
  // An automatic timeout during an action still takes effect even if it returns false.
  function pause(run, now) {
    const wasRunning = run.status === "running";
    settle(run, now);
    if (run.status === "running") { run.status = "paused"; run.anchorMs = null; }
    return wasRunning && run.status === "paused";
  }
  function resume(run, now) {
    validateRun(run);
    const ms = time(now);
    if (run.status !== "paused" || !compatible(run)) return false;
    // An already adjusted wall clock is reported, never repaired by inventing time.
    if (ms < Date.parse(run.startedAt) + run.elapsedMs || (run.kind === "choice" && run.responses.some((r) => r && Date.parse(r.at) > ms))) run.clockIssue = "backward";
    run.status = "running";
    run.anchorMs = ms;
    return true;
  }
  // An accepted event may be appended once to the legacy per-question attempts.
  // seconds stops at submission, while spentMs continues through explanation dwell.
  function submit(run, choice, now) {
    settle(run, now);
    if (run.kind !== "choice" || run.status !== "running" || run.responses[run.cursor] !== null || !compatible(run)) return { accepted: false };
    if (!integer(choice, 0, frozenOptionCount(run.items[run.cursor].signature) - 1)) return { accepted: false };
    const at = iso(time(now));
    const qid = run.items[run.cursor].qid;
    run.responses[run.cursor] = { choice, at };
    return { accepted: true, qid, choice, at, seconds: Math.round(run.spentMs[run.cursor] / 1000) };
  }
  function advance(run, now, { skip = false } = {}) {
    settle(run, now);
    if (run.kind !== "choice" || run.status !== "running" || !compatible(run)) return false;
    if (typeof skip !== "boolean") fail("跳过标记必须为布尔值。");
    if (!skip && run.responses[run.cursor] === null) return false;
    if (run.cursor === run.items.length - 1) close(run, "finished", time(now));
    else run.cursor += 1;
    return true;
  }
  function finish(run, now, { completed = false, draftChars = 0, reason = "early" } = {}) {
    // Validate action arguments before mutating a valid running record.
    if (!["early", "finished"].includes(reason)) fail("结束原因只能是提前结束或完成。");
    if (run.kind === "writing" && (typeof completed !== "boolean" || !integer(draftChars, 0, 10000000))) fail("申论完成标记或字符数无效。");
    settle(run, now);
    if (isTerminal(run)) return false;
    const ms = time(now);
    if (ms < Date.parse(run.startedAt) + run.elapsedMs || (run.kind === "choice" && run.responses.some((r) => r && Date.parse(r.at) > ms))) run.clockIssue = "backward";
    if (run.kind === "writing") {
      run.completed = completed;
      run.draftChars = draftChars;
      close(run, completed ? "finished" : "early", time(now));
    } else close(run, reason, time(now));
    return true;
  }
  function choiceSummary(run) {
    const checked = validateRun(run);
    if (checked.kind !== "choice") fail("模块作答统计仅适用于选择题训练。");
    const blank = () => ({ planned: 0, submitted: 0, correct: 0, wrong: 0, unsubmitted: 0, spentMs: 0 });
    const byModule = new Map();
    const total = blank();
    checked.items.forEach((item, index) => {
      if (!byModule.has(item.module)) byModule.set(item.module, { module: item.module, ...blank() });
      const row = byModule.get(item.module);
      row.planned += 1;
      row.spentMs += checked.spentMs[index];
      const response = checked.responses[index];
      if (response === null) row.unsubmitted += 1;
      else { row.submitted += 1; if (response.choice === item.answer) row.correct += 1; else row.wrong += 1; }
    });
    const modules = [...byModule.values()];
    for (const row of modules) for (const key of Object.keys(total)) total[key] += row[key];
    return { modules, total };
  }
  window.STUDY_TRAINING = Object.freeze({ empty, signature, newChoice, newWriting, validate, isTerminal, compatible, project, settle, pause, resume, submit, advance, finish, choiceSummary });
})();
