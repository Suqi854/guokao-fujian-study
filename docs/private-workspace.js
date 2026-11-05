"use strict";
// All imported strings are rendered with textContent/value, never HTML or URLs.
(() => {
  function mount(root) {
    if (!root || !window.PRIVATE_LIBRARY) throw new Error("私人题库组件未准备好");
    const $ = s => root.querySelector(s), M = window.PRIVATE_LIBRARY;
    let alive = true, ticket = 0, pending = null, selectedPack = "", selectedPaper = "", cursor = 0;
    const responses = new Map(); // Volatile by design. Never piggybacks on study-v2 records.
    const node = (tag, text, className) => {
      const e = document.createElement(tag);
      if (text !== undefined) e.textContent = text;
      if (className) e.className = className;
      return e;
    };
    const status = text => { if (alive) $("#private-status").textContent = text; };
    const repo = M.create({ onError: message => { status(message); syncControls(); } });
    function syncControls() {
      if (!alive) return;
      const blocked = !!repo.error || repo.busy;
      for (const name of ["private-file", "private-confirm", "private-remove"]) $("#" + name).disabled = blocked;
      $("#private-confirm").disabled = blocked || !pending || !$("#private-rights").checked;
      $("#private-reload").disabled = repo.busy;
      $("#private-cancel").disabled = repo.busy;
    }
    function clearPreview() {
      ticket++; pending = null;
      $("#private-preview").hidden = true;
      $("#private-rights").checked = false;
      $("#private-file").value = "";
      syncControls();
    }
    function download(text, name) {
      if (typeof text !== "string") throw new Error("没有可导出的存储原文");
      const url = URL.createObjectURL(new Blob([text], { type: "application/json;charset=utf-8" }));
      const a = node("a"); a.href = url; a.download = name;
      document.body.append(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    function exportBackup() {
      const warning = !!repo.error;
      download(repo.exportBackup(), "zhixu-private-backup-" + (warning ? "page-copy-" : "") + new Date().toISOString().slice(0, 10) + ".json");
      status((warning ? "已生成当前页私人题库副本，不保证是其他标签页的最新内容。" : "已生成当前页私人题库备份。") + "请确认浏览器实际保存了文件，并存放到私人位置；它不包含主站学习记录或本页临时作答。");
    }
    function option(select, value, text) {
      const o = node("option", text); o.value = value; select.append(o);
    }
    function render() {
      if (!alive) return;
      const state = repo.snapshot();
      const packs = state?.packs || [], ps = $("#private-pack"), papers = $("#private-paper");
      ps.replaceChildren(); papers.replaceChildren();
      if (!packs.some(p => p.packId === selectedPack)) { selectedPack = packs[0]?.packId || ""; selectedPaper = ""; cursor = 0; }
      packs.forEach((p, i) => option(ps, String(i), p.title));
      ps.value = String(packs.findIndex(p => p.packId === selectedPack));
      const pack = packs.find(p => p.packId === selectedPack);
      option(papers, "", "全部题目");
      pack?.papers.forEach((p, i) => option(papers, String(i), p.title));
      if (selectedPaper !== "" && !pack?.papers[Number(selectedPaper)]) selectedPaper = "";
      papers.value = selectedPaper;
      $("#private-summary").textContent = state ? `${packs.length} 个题包 · ${packs.reduce((n, p) => n + p.questions.length, 0)} 道私人题目（不计入公开题库）` : "本机私人题库无法读取，原文未覆盖。";
      const area = $("#private-reader"); area.replaceChildren();
      $("#private-remove").hidden = !pack;
      $("#private-pagination").hidden = !pack;
      if (!pack) { area.append(node("p", "尚无可阅读的私人题包。可先下载原创格式样例，按说明整理自己合法取得的题目。")); syncControls(); return; }
      area.append(node("p", "用户自备内容，来源、答案及解析未经本站核验。", "private-warning"));
      area.append(node("p", "题包来源说明：" + pack.sourceNote, "private-text"));
      const paper = selectedPaper === "" ? null : pack.papers[Number(selectedPaper)];
      const ids = paper ? paper.sections.flatMap(s => s.questionIds) : pack.questions.map(q => q.id);
      cursor = Math.max(0, Math.min(cursor, ids.length - 1));
      const q = pack.questions.find(q => q.id === ids[cursor]);
      if (paper) {
        const section = paper.sections.find(s => s.questionIds.includes(q.id));
        area.append(node("h2", paper.title + " · " + section.title));
        if (paper.sourceNote) area.append(node("p", paper.sourceNote, "private-text"));
        area.append(node("p", "这里只按卷内顺序阅读与自查，不提供正式计时、分数或自动阅卷。"));
      }
      area.append(node("p", `${cursor + 1} / ${ids.length} · ${q.module}`));
      for (const mid of q.materialIds) {
        const m = pack.materials.find(m => m.id === mid);
        const section = node("section"); section.append(node("h3", m.title), node("p", m.text, "private-text")); area.append(section);
      }
      area.append(node("h2", q.stem, "private-text"));
      const answerKey = JSON.stringify([pack.packId, q.id]);
      if (q.type === "single-choice") {
        const group = node("fieldset"), legend = node("legend", "选择答案（仅临时保留在本页）"); group.append(legend);
        q.options.forEach((text, index) => {
          const label = node("label", undefined, "private-choice"), input = node("input");
          input.type = "radio"; input.name = "private-answer"; input.value = String(index); input.checked = responses.get(answerKey) === index;
          input.addEventListener("change", () => responses.set(answerKey, index));
          label.append(input, node("span", String.fromCharCode(65 + index) + ". " + text)); group.append(label);
        });
        area.append(group);
      } else {
        const label = node("label", "临时草稿，刷新/关闭页面后丢失。请自行复制保存。"), draft = node("textarea");
        draft.maxLength = 20000; draft.rows = 10; draft.value = responses.get(answerKey) || "";
        draft.addEventListener("input", () => responses.set(answerKey, draft.value));
        label.append(draft); area.append(label);
      }
      const details = node("details"), summary = node("summary", "展开用户提供的答案/参考提示"); details.append(summary);
      if (q.type === "single-choice") details.append(node("p", q.answer === null ? "未提供可核对答案，本题仅阅读/自查。" : "文件提供答案：" + String.fromCharCode(65 + q.answer) + "。未经本站核验，不代表官方答案。"));
      details.append(node("p", q.explanation || "文件未提供解析/参考提示。", "private-text")); area.append(details);
      $("#private-prev").disabled = cursor === 0; $("#private-next").disabled = cursor === ids.length - 1;
      $("#private-page").textContent = `${cursor + 1} / ${ids.length}`;
      syncControls();
    }
    async function fileChanged() {
      if (repo.busy) return;
      const f = $("#private-file").files[0];
      clearPreview();
      if (!f) return;
      const current = ticket;
      try {
        if (!Number.isSafeInteger(f.size) || f.size < 1 || f.size > M.LIMITS.backupBytes) throw new Error("文件须为不超过 2 MiB 的 JSON；单题包另限 1 MiB");
        status("正在本页读取并校验文件，尚未写入本机题库。");
        const text = await f.text();
        if (!alive || current !== ticket) return;
        pending = repo.prepare(text);
        $("#private-preview-text").textContent = `可新增 ${pending.added} 个题包、${pending.questions} 道题、${pending.papers} 份试卷；跳过 ${pending.skipped} 个完全相同题包。当前已有内容不会被覆盖。`;
        $("#private-preview").hidden = false;
        status("校验通过，确认后才保存。请先导出当前私人题库备份。");
      } catch (error) { if (alive && current === ticket) { pending = null; status("导入失败：" + error.message); } }
      syncControls();
    }
    async function commit() {
      if (!pending || !$("#private-rights").checked || repo.busy) return;
      try {
        const operation = repo.commit(pending); syncControls();
        const result = await operation;
        if (!alive) return;
        if (!result.ok) throw new Error(result.error || "保存未完成，原内容保留");
        clearPreview(); render();
        status(result.unchanged ? "题包完全相同，未重复导入，也未写入存储。" : "私人题库已保存到当前浏览器和网站来源。没有上传内容；不自动跨设备同步。");
      } catch (error) { status("未能导入：" + error.message); syncControls(); }
    }
    async function remove() {
      if (repo.busy || !selectedPack) return;
      try {
        const pack = repo.snapshot()?.packs.find(p => p.packId === selectedPack);
        if (!pack || !window.confirm("删除私人题包「" + pack.title + "」？只影响本机私人题库，不能撤销。请先导出备份。")) return;
        clearPreview();
        const removedPackId=pack.packId;
        const operation = repo.commit(repo.prepareRemoval(removedPackId)); syncControls();
        const result = await operation;
        if (!result.ok) throw new Error(result.error || "删除未完成");
        for(const key of responses.keys())if(JSON.parse(key)[0]===removedPackId)responses.delete(key);
        render(); status("已删除所选本机私人题包；其他题包的本页临时作答保留。主站学习记录未改动。");
      } catch (error) { status(error.message); syncControls(); }
    }
    const listeners = [];
    function listen(id, type, handler) { const el = $("#" + id); el.addEventListener(type, handler); listeners.push([el, type, handler]); }
    listen("private-file", "change", fileChanged);
    listen("private-rights", "change", syncControls);
    listen("private-cancel", "click", () => { if (repo.busy) return; clearPreview(); status("已取消读取/预览，未导入任何内容。"); });
    listen("private-confirm", "click", commit);
    listen("private-remove", "click", remove);
    listen("private-export", "click", () => { try { exportBackup(); } catch (e) { status(e.message); } });
    listen("private-raw", "click", () => {
      try { const raw = repo.raw(); download(raw.text, "zhixu-private-raw-" + (raw.cached ? "cached-" : "") + new Date().toISOString().slice(0, 10) + ".json"); status(raw.cached ? "已导出缓存原文，不保证最新。请保存在私人位置。" : "已导出本机存储原文，可能含损坏数据。请保存在私人位置。"); } catch (e) { status(e.message); }
    });
    listen("private-reload", "click", () => { try { clearPreview(); repo.reload(); render(); status(repo.error || "已重新读取本机私人题库。"); } catch (e) { status(e.message); } });
    listen("private-pack", "change", () => { selectedPack = repo.snapshot()?.packs[Number($("#private-pack").value)]?.packId || ""; selectedPaper = ""; cursor = 0; render(); });
    listen("private-paper", "change", () => { selectedPaper = $("#private-paper").value; cursor = 0; render(); });
    listen("private-prev", "click", () => { cursor--; render(); });
    listen("private-next", "click", () => { cursor++; render(); });
    repo.reload(); render();
    return Object.freeze({ repo, destroy() { alive = false; ticket++; repo.destroy(); for (const [el, type, fn] of listeners) el.removeEventListener(type, fn); } });
  }
  window.PRIVATE_WORKSPACE = Object.freeze({ mount });
  const root = document.getElementById("private-workspace");
  if (root) window.privateWorkspace = mount(root);
})();
