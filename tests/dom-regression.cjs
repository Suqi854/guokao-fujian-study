"use strict";
// Runs actual app scripts in a DOM, not in a browser. No layout, touch or pixel claims.
const { JSDOM, VirtualConsole } = require("jsdom");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "docs/index.html"), "utf8");
const errors = [], outgoing = [];
const vc = new VirtualConsole();
vc.on("jsdomError", e => errors.push(e.message));
const dom = new JSDOM(html, { url: "https://study.example/", runScripts: "outside-only", pretendToBeVisual: true, virtualConsole: vc });
const w = dom.window, d = w.document;
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
const old = { schemaVersion: 1, exam: "both", read: ["logic"], favorites: ["solid-views"], notes: { logic: "测试旧条件笔记", "solid-views": "测试旧柱高笔记", "figure-features": "测试图形笔记", remainders: "测试旧余数笔记", "geometry-scale": "测试旧几何笔记", arrangement: "测试旧排列笔记" }, attempts: [{ qid: "q07", choice: 0, at: "2026-11-04T12:00:00Z", seconds: 10 }], drafts: { w01: "测试早期草稿", ...Object.fromEntries(Array.from({ length: 15 }, (_, i) => ["w" + (33 + i), "测试保留写作" + (33 + i)])) }, checks: { w01: [0], w37: [1], w47: [0, 2] } };
w.localStorage.setItem("zhixu-study-v1", JSON.stringify(old));
for (const m of html.matchAll(/src="\.\/([^\"]+)"/g)) w.eval(fs.readFileSync(path.join(root, "docs", m[1]), "utf8") + "\n//# sourceURL=" + m[1]);
const C = w.STUDY_CONTENT, questions = Object.fromEntries(C.questions.map(q => [q.id, q]));
const plain = v => JSON.parse(JSON.stringify(v));
const pause = () => new Promise(resolve => setTimeout(resolve, 10));
async function route(hash) { w.location.hash = hash; await pause(); }
async function click(selector) { const el = d.querySelector(selector); assert.ok(el, selector); el.click(); await pause(); }
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
  for (const id of ["logic", "quantified-logic", "solid-views", "figure-features", "arrangement", "remainders", "geometry-scale"]) for (const level of ["intro", "practice", "advanced"]) {
    await route("#lesson/" + id + "/" + level);
    const group = C.lessons.find(l => l.id === id).learningLevels[level];
    const link = d.querySelector('.level-guide a[href^="#quiz/"]');
    assert.ok(link, id + ":" + level);
    assert.deepEqual(link.getAttribute("href").split("/").at(-1).split(","), plain(group.questionIds));
    link.click(); await pause();
    assert.match(text(".quiz-header"), /1 \/ 2/);
  }
  console.log("PASS DOM: all 73 full lessons, every existing learning path and twenty-one exact recent quiz paths");
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
  for (let n = 322; n <= 363; n++) {
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
  for (const id of ["w01", "w33", "w37", "w42", "w47"]) {
    await route("#write/" + id);
    assert.equal(d.querySelector("#draft").value, old.drafts[id]);
  }
  console.log("PASS DOM: all 42 recent actual answer flows, four-option feedback, targeted mistakes and old writing drafts");
  const saved = JSON.parse(w.localStorage.getItem("zhixu-study-v1"));
  assert.deepEqual(saved.drafts, old.drafts);
  assert.deepEqual(saved.checks, old.checks);
  assert.deepEqual(saved.attempts[0], old.attempts[0]);
  await route("#settings");
  await click('button[data-action="backup"]');
  assert.ok(exported instanceof Blob);
  const backup = await exported.text();
  assert.equal(JSON.parse(backup).schemaVersion, 1);
  w.localStorage.removeItem("zhixu-study-v1");
  const fileInput = d.querySelector("#import-file");
  Object.defineProperty(fileInput, "files", { configurable: true, value: [new w.File([backup], "test-v024-backup.json", { type: "application/json" })] });
  fileInput.dispatchEvent(new w.Event("change", { bubbles: true }));
  await pause(); await pause();
  assert.deepEqual(JSON.parse(w.localStorage.getItem("zhixu-study-v1")), saved);
  assert.deepEqual(errors, []);
  assert.deepEqual(outgoing, []);
  console.log("PASS DOM: actual Blob export and File.text import restore v1 notes, all drafts, checks and attempts exactly");
  console.log("NOT TESTED: browser rendering, CSS widths, real touch, browser-native downloads and screenshots");
  dom.window.close();
})().catch(e => { console.error(e); dom.window.close(); process.exit(1); });
