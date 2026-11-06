"use strict";
// Runs actual app scripts in a DOM, not in a browser. No layout, touch or pixel claims.
const { JSDOM, VirtualConsole } = require("jsdom");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { navigateHash, installSerialLocks, assertV2Snapshot, assertEmptySnapshot, assertRestored } = require("./progress-dom-support.cjs");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "docs/index.html"), "utf8");
const errors = [], outgoing = [];
const vc = new VirtualConsole();
vc.on("jsdomError", e => errors.push(e.message));
const dom = new JSDOM(html, { url: "https://study.example/", runScripts: "outside-only", pretendToBeVisual: true, virtualConsole: vc });
const w = dom.window, d = w.document;
installSerialLocks(w);
w.scrollTo = () => {};
w.HTMLElement.prototype.scrollIntoView = () => {};
w.confirm = () => true;
w.fetch = (...args) => { outgoing.push(args); throw new Error("Unexpected outgoing request"); };
let exported;
w.Blob = Blob;
w.File = File;
w.URL.createObjectURL = blob => { exported = blob; return "blob:test-backup"; };
w.URL.revokeObjectURL = () => {};
const anchorClick = w.HTMLAnchorElement.prototype.click;
w.HTMLAnchorElement.prototype.click = function () { if (!this.download) anchorClick.call(this); };
const old = { schemaVersion: 1, exam: "both", read: ["logic"], favorites: ["solid-views"], notes: { logic: "测试旧条件笔记", "solid-views": "测试旧柱高笔记", "figure-features": "测试图形笔记", remainders: "测试旧余数笔记", "geometry-scale": "测试旧几何笔记", arrangement: "测试旧排列笔记", "growth-contribution": "测试旧贡献笔记", "multi-table": "测试旧表格笔记", "context-blanks": "测试旧多空笔记", "title-choice": "测试旧标题笔记", cpi: "测试旧CPI笔记", "fujian-geography": "测试旧福建笔记", "constitutional-rights": "测试新宪法笔记", "admin-review": "测试新复议笔记", "estimation-boundary": "测试旧估算笔记", "without-replacement": "测试旧抽取笔记", "three-set-counting": "测试旧三集合笔记", "next-paragraph": "测试旧下文笔记", "practice-cognition": "测试新实践笔记", "contradiction-method": "测试新矛盾笔记", "productive-relations": "测试新生产关系笔记", "mao-thought-context": "测试新思想背景笔记" }, attempts: [{ qid: "q07", choice: 0, at: "2026-11-04T12:00:00Z", seconds: 10 }], drafts: { w01: "测试早期草稿", ...Object.fromEntries(Array.from({ length: 15 }, (_, i) => ["w" + (33 + i), "测试保留写作" + (33 + i)])) }, checks: { w01: [0], w37: [1], w47: [0, 2] } };
const legacyRaw = JSON.stringify(old);
w.localStorage.setItem("zhixu-study-v1", legacyRaw);
for (const m of html.matchAll(/src="\.\/([^\"]+)"/g)) w.eval(fs.readFileSync(path.join(root, "docs", m[1]), "utf8") + "\n//# sourceURL=" + m[1]);
const C = w.STUDY_CONTENT, questions = Object.fromEntries(C.questions.map(q => [q.id, q]));
const plain = v => JSON.parse(JSON.stringify(v));
const pause = () => new Promise(resolve => setTimeout(resolve, 10));
async function route(hash) { await navigateHash(w,hash,()=>{w.location.hash=hash;}); await pause(); }
async function click(selector) { const el=d.querySelector(selector);assert.ok(el,selector);if(el.tagName==="A"&&el.hash)await navigateHash(w,el.hash,()=>el.click());else el.click();await pause(); }
async function action(name, id) { await click(`[data-action="${name}"]${id === undefined ? "" : `[data-id="${id}"]`}`); }
function text(selector) { assert.ok(d.querySelector(selector), selector); return d.querySelector(selector).textContent; }
function input(selector, value) { const el = d.querySelector(selector); el.value = value; el.dispatchEvent(new w.Event("input", { bubbles: true })); }
function select(selector, value) { const el = d.querySelector(selector); el.value = value; el.dispatchEvent(new w.Event("change", { bubbles: true })); }
(async () => {
  for (const l of C.lessons) {
    await route("#lesson/" + l.id);
    assert.equal(text(".reading h1"), l.title);
    assert.equal(d.querySelectorAll(".source-panel").length, 0);
    for (const [level, group] of Object.entries(l.learningLevels || {})) {
      await route("#lesson/" + l.id + "/" + level);
      assert.deepEqual([...d.querySelectorAll(".reading > section:not(.level-guide):not(.diagram-box) > h2")].map(el => el.textContent), plain(group.sections.map(i => l.sections[i][0])));
    }
  }
  for (const id of ["logic", "quantified-logic", "solid-views", "figure-features", "arrangement", "remainders", "geometry-scale", "growth-contribution", "multi-table", "context-blanks", "title-choice", "cpi", "fujian-geography", "constitutional-rights", "admin-review", "estimation-boundary", "without-replacement", "three-set-counting", "next-paragraph", "practice-cognition", "contradiction-method", "productive-relations", "mao-thought-context"]) for (const level of ["intro", "practice", "advanced"]) {
    await route("#lesson/" + id + "/" + level);
    const group = C.lessons.find(l => l.id === id).learningLevels[level];
    const link = d.querySelector('.level-guide a[href^="#quiz/"]');
    assert.ok(link, id + ":" + level);
    assert.deepEqual(link.getAttribute("href").split("/").at(-1).split(","), plain(group.questionIds));
    await navigateHash(w,link.hash,()=>link.click()); await pause();
    assert.match(text(".quiz-header"), new RegExp("1 / " + (id === "multi-table" ? 3 : 2)));
  }
  console.log("PASS DOM: all 105 full lessons, every existing learning path and sixty-nine exact recent quiz paths");
  await route("#lesson/figure-features/practice");
  await action("feature-example", 1);
  assert.match(text(".diagram-caption"), /黑格 5 · 连通部分 1 · 孔洞 0/);
  assert.match(text(".diagram-caption"), /中心对称：是.*没有对称轴/);
  const original = d.querySelector(".feature-grid").getAttribute("aria-label");
  for (let i = 0; i < 4; i++) await action("feature-turn");
  for (let i = 0; i < 2; i++) await action("feature-mirror");
  assert.equal(d.querySelector(".feature-grid").getAttribute("aria-label"), original);
  await action("feature-example", 2);
  assert.match(text(".diagram-caption"), /黑格 5 · 连通部分 5 · 孔洞 0/);
  await action("feature-example", 0);
  assert.match(text(".diagram-caption"), /黑格 8 · 连通部分 1 · 孔洞 1/);
  assert.equal(d.querySelector("#lesson-note").value, old.notes["figure-features"]);
  await route("#lesson/solid-views/practice");
  for (const result of ["1、3", "3、2", "3、1", "2、3"]) {
    await action("solid-turn");
    assert.ok(text(".rotation-caption").includes("正视高度从左到右 " + result));
  }
  assert.equal(d.querySelectorAll(".projection-figure rect").length, 6);
  await action("solid-view", "top");
  assert.equal(d.querySelectorAll(".projection-figure rect").length, 5);
  assert.equal(d.querySelector("#lesson-note").value, old.notes["solid-views"]);
  await route("#lesson/figure-features/intro");
  input("#lesson-note", "<img src=x onerror=alert(1)>只作为笔记文字");
  await action("feature-turn");
  assert.equal(d.querySelector("#lesson-note").value, "<img src=x onerror=alert(1)>只作为笔记文字");
  await route("#home"); await route("#lesson/figure-features/intro");
  assert.equal(d.querySelector("#lesson-note").value, "<img src=x onerror=alert(1)>只作为笔记文字");
  assert.equal(d.querySelectorAll("main img").length, 0);
  console.log("PASS DOM: exact grids, repeated transforms, old projection controls, note retention and HTML escaping");
  for (let n = 322; n <= 459; n++) {
    await route("#quiz/one/q" + n);
    assert.equal(text(".quiz-card h1"), questions["q" + n].stem);
    if (n >= 340 && n <= 343) assert.equal(d.querySelectorAll(".question-features rect").length, 9);
    if (n === 345) assert.equal(d.querySelectorAll(".question-features rect").length, 18);
    await action("choose", questions["q" + n].answer);
    await action("submit");
    assert.equal(d.querySelectorAll(".option-review li").length, 4);
    assert.ok(d.querySelector(".feedback:not(.wrong)"));
  }
  for (const id of ["q327", "q345"]) {
    await route("#quiz/one/" + id);
    await action("choose", (questions[id].answer + 1) % 4);
    await action("submit");
    assert.ok(d.querySelector(".feedback.wrong"));
  }
  await route("#targeted");
  select("#target-module", "判断推理"); select("#target-stage", "检查边界");
  const queue = [...d.querySelectorAll("a")].find(a => a.textContent.includes("开始这组")).getAttribute("href").split("/").at(-1).split(",");
  assert.deepEqual(new Set(queue.slice(0, 2)), new Set(["q327", "q345"]));
  assert.ok(queue.every(id => questions[id].meta.module === "判断推理" && questions[id].meta.trainingStage === "检查边界"));
  for (const id of ["q351", "q357", "q363"]) {
    await route("#quiz/one/" + id);
    await action("choose", (questions[id].answer + 1) % 4);
    await action("submit");
  }
  await route("#targeted");
  select("#target-module", "数量关系"); select("#target-stage", "检查边界");
  const mathQueue = [...d.querySelectorAll("a")].find(a => a.textContent.includes("开始这组")).getAttribute("href").split("/").at(-1).split(",");
  assert.deepEqual(new Set(mathQueue.slice(0, 2)), new Set(["q357", "q363"]));
  assert.ok(mathQueue.every(id => questions[id].meta.module === "数量关系" && questions[id].meta.trainingStage === "检查边界"));
  for (const id of ["arrangement", "remainders", "geometry-scale"]) {
    await route("#lesson/" + id + "/advanced");
    assert.equal(d.querySelector("#lesson-note").value, old.notes[id]);
  }
  for (const id of ["q368", "q381"]) {
    await route("#quiz/one/" + id); await action("choose", (questions[id].answer + 1) % 4); await action("submit");
  }
  for (const [module, expected] of [["资料分析", "q368"], ["言语理解", "q381"]]) {
    await route("#targeted"); select("#target-module", module); select("#target-stage", "检查边界");
    const selected = [...d.querySelectorAll("a")].find(a => a.textContent.includes("开始这组")).getAttribute("href").split("/").at(-1).split(",");
    assert.equal(selected[0], expected); assert.ok(selected.every(id => questions[id].meta.module === module && questions[id].meta.trainingStage === "检查边界"));
  }
  for (const id of ["growth-contribution", "multi-table", "context-blanks", "title-choice"]) {
    await route("#lesson/" + id + "/advanced"); assert.equal(d.querySelector("#lesson-note").value, old.notes[id]);
  }
  for (const id of ["q393", "q399", "q410"]) {
    await route("#quiz/one/" + id); await action("choose", (questions[id].answer + 1) % 4); await action("submit");
  }
  for (const [module, expected] of [["常识判断", ["q393", "q410"]], ["福建专题", ["q399"]]]) {
    await route("#targeted"); select("#target-module", module); select("#target-stage", "检查边界");
    const selected = [...d.querySelectorAll("a")].find(a => a.textContent.includes("开始这组")).getAttribute("href").split("/").at(-1).split(",");
    assert.deepEqual(new Set(selected.slice(0, expected.length)), new Set(expected)); assert.ok(selected.every(id => questions[id].meta.module === module && questions[id].meta.trainingStage === "检查边界"));
  }
  for (const id of ["cpi", "fujian-geography", "constitutional-rights", "admin-review"]) {
    await route("#lesson/" + id + "/advanced"); assert.equal(d.querySelector("#lesson-note").value, old.notes[id]);
  }
  for (const id of ["w01", "w33", "w37", "w42", "w47"]) {
    await route("#write/" + id);
    assert.equal(d.querySelector("#draft").value, old.drafts[id]);
  }
  for (const id of ["q417", "q423", "q429", "q435"]) {
    await route("#quiz/one/" + id); await action("choose", (questions[id].answer + 1) % 4); await action("submit");
  }
  for (const [module, expected] of [["资料分析", ["q368", "q417"]], ["数量关系", ["q357", "q363", "q423", "q429"]], ["言语理解", ["q381", "q435"]]]) {
    await route("#targeted"); select("#target-module", module); select("#target-stage", "检查边界");
    const ids = [...d.querySelectorAll("a")].find(a => a.textContent.includes("开始这组")).getAttribute("href").split("/").at(-1).split(",");
    assert.deepEqual(new Set(ids.slice(0, expected.length)), new Set(expected));
    assert.ok(ids.every(id => questions[id].meta.module === module && questions[id].meta.trainingStage === "检查边界"));
  }
  for (const id of ["estimation-boundary", "without-replacement", "three-set-counting", "next-paragraph"]) {
    await route("#lesson/" + id + "/advanced"); assert.equal(d.querySelector("#lesson-note").value, old.notes[id]);
  }
  for (const id of ["q441", "q447", "q453", "q459"]) {
    await route("#quiz/one/" + id); await action("choose", (questions[id].answer + 1) % 4); await action("submit");
  }
  await route("#targeted"); select("#target-module", "政治理论"); select("#target-stage", "检查边界");
  const political = [...d.querySelectorAll("a")].find(a => a.textContent.includes("开始这组")).getAttribute("href").split("/").at(-1).split(",");
  assert.deepEqual(new Set(political.slice(0,4)),new Set(["q441","q447","q453","q459"]));
  assert.ok(political.every(id=>questions[id].meta.module==="政治理论"&&questions[id].meta.trainingStage==="检查边界"));
  for (const id of ["practice-cognition", "contradiction-method", "productive-relations", "mao-thought-context"]) {
    await route("#lesson/"+id+"/advanced"); assert.equal(d.querySelector("#lesson-note").value,old.notes[id]);
  }
  console.log("PASS DOM: all 138 recent actual answer flows, four-option feedback, targeted mistakes and old writing drafts");
  const saved = JSON.parse(w.localStorage.getItem("zhixu-study-v2"));
  assertV2Snapshot(saved);
  assert.ok(saved.revision > 0);
  assert.equal(w.localStorage.getItem("zhixu-study-v1"), legacyRaw);
  assert.deepEqual(saved.drafts, old.drafts);
  assert.deepEqual(saved.checks, old.checks);
  assert.deepEqual(saved.attempts[0], old.attempts[0]);
  await route("#settings");
  await click('button[data-action="backup"]');
  assert.ok(exported instanceof Blob);
  const backup = await exported.text();
  const exportedState = JSON.parse(backup);
  assertV2Snapshot(exportedState);
  assert.ok(Number.isFinite(Date.parse(exportedState.exportedAt)));
  delete exportedState.exportedAt;
  assert.deepEqual(exportedState, saved);
  await action("reset");
  const reset = JSON.parse(w.localStorage.getItem("zhixu-study-v2"));
  assertEmptySnapshot(reset);
  assert.equal(reset.revision, saved.revision + 1);
  assert.equal(w.localStorage.getItem("zhixu-study-v1"), legacyRaw);
  const fileInput = d.querySelector("#import-file");
  Object.defineProperty(fileInput, "files", { configurable: true, value: [new w.File([backup], "test-v024-backup.json", { type: "application/json" })] });
  fileInput.dispatchEvent(new w.Event("change", { bubbles: true }));
  await pause(); await pause();
  assertRestored(JSON.parse(w.localStorage.getItem("zhixu-study-v2")), saved, reset.revision);
  assert.equal(w.localStorage.getItem("zhixu-study-v1"), legacyRaw);
  assert.deepEqual(errors, []);
  assert.deepEqual(outgoing, []);
  console.log("PASS DOM: v1 migration preserves source bytes; v2 Blob export, UI reset and File.text restore preserve all fields with increasing revisions");
  console.log("NOT TESTED: browser rendering, CSS widths, real touch, browser-native downloads and screenshots");
  dom.window.close();
})().catch(e => { console.error(e); dom.window.close(); process.exit(1); });
