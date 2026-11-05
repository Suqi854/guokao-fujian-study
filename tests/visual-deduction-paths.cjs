"use strict";
const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.STUDY_BASE_URL || "http://127.0.0.1:4173";
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium", args: ["--no-sandbox"] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 1100 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, acceptDownloads: true });
  const p = await ctx.newPage(), errors = [], external = [];
  p.on("pageerror", e => errors.push(e.message));
  p.on("request", r => { if (!r.url().startsWith(base)) external.push(r.url()); });
  await p.goto(base);
  const C = await p.evaluate(() => window.STUDY_CONTENT);
  const q = Object.fromEntries(C.questions.map(x => [x.id, x]));
  const ids = ["logic", "quantified-logic", "solid-views", "figure-features"];
  const old = { schemaVersion: 1, exam: "both", read: ["logic"], favorites: ["solid-views"], notes: { logic: "测试旧条件笔记", "solid-views": "测试旧柱高笔记", "figure-features": "测试图形笔记" }, attempts: [{ qid: "q07", choice: 0, at: "2026-11-04T12:00:00Z", seconds: 10 }], drafts: { w01: "测试早期草稿", ...Object.fromEntries(Array.from({ length: 15 }, (_, i) => ["w" + (33 + i), "测试保留写作" + (33 + i)])) }, checks: { w01: [0], w37: [1], w47: [0, 2] } };
  await p.evaluate(s => localStorage.setItem("zhixu-study-v1", JSON.stringify(s)), old);
  await p.reload();
  for (const level of ["intro", "practice", "advanced"]) for (const id of ids) {
    const l = C.lessons.find(x => x.id === id), g = l.learningLevels[level];
    await p.goto(base + "/#lesson/" + id + "/" + level);
    await p.getByRole("heading", { name: l.title, exact: true }).waitFor();
    assert.deepEqual(await p.locator(".reading > section:not(.level-guide):not(.diagram-box) > h2").allTextContents(), g.sections.map(i => l.sections[i][0]));
    assert.equal(await p.locator(".source-panel").count(), 0);
    const link = p.getByRole("link", { name: "练本路径 · 2题", exact: true });
    assert.deepEqual((await link.getAttribute("href")).split("/").at(-1).split(","), g.questionIds);
    await link.tap();
    await p.locator(".quiz-header").waitFor();
    assert.match(await p.locator(".quiz-header").textContent(), /1 \/ 2/);
  }
  console.log("PASS Twelve exact lesson paths retain their sections and two-question groups");
  await p.goto(base + "/#lesson/figure-features/practice");
  await p.getByRole("button", { name: "中心对称与轴对称", exact: true }).tap();
  assert.match(await p.locator(".diagram-caption").textContent(), /黑格 5 · 连通部分 1 · 孔洞 0/);
  assert.match(await p.locator(".diagram-caption").textContent(), /中心对称：是.*没有对称轴/);
  const original = await p.locator(".feature-grid").getAttribute("aria-label");
  for (let i = 0; i < 4; i++) await p.getByRole("button", { name: "顺时针转90°", exact: true }).tap();
  assert.equal(await p.locator(".feature-grid").getAttribute("aria-label"), original);
  for (let i = 0; i < 2; i++) await p.getByRole("button", { name: "左右镜像", exact: true }).tap();
  assert.equal(await p.locator(".feature-grid").getAttribute("aria-label"), original);
  await p.getByRole("button", { name: "角点接触", exact: true }).tap();
  assert.match(await p.locator(".diagram-caption").textContent(), /黑格 5 · 连通部分 5 · 孔洞 0/);
  await p.getByRole("button", { name: "外圈与孔洞", exact: true }).tap();
  assert.match(await p.locator(".diagram-caption").textContent(), /黑格 8 · 连通部分 1 · 孔洞 1/);
  assert.equal(await p.locator("#lesson-note").inputValue(), old.notes["figure-features"]);
  await p.goto(base + "/#lesson/solid-views/practice");
  for (const expected of ["1、3", "3、2", "3、1", "2、3"]) {
    await p.getByRole("button", { name: "柱高整体转90°", exact: true }).tap();
    assert.ok((await p.locator(".rotation-caption").textContent()).includes("正视高度从左到右 " + expected));
  }
  assert.equal(await p.locator(".projection-figure rect").count(), 6);
  await p.getByRole("button", { name: "俯视", exact: true }).tap();
  assert.equal(await p.locator(".projection-figure rect").count(), 5);
  assert.equal(await p.locator("#lesson-note").inputValue(), old.notes["solid-views"]);
  console.log("PASS Finite-grid counts, repeated rotate/mirror controls, fixed-view height rotation and note retention");
  for (let n = 340; n <= 343; n++) {
    await p.goto(base + "/#quiz/one/q" + n);
    await p.locator(".quiz-card").waitFor();
    assert.equal(await p.locator(".question-features .feature-grid rect").count(), 9);
    assert.equal(await p.locator(".question-figures .study-figure").count(), 0);
  }
  await p.goto(base + "/#quiz/one/q345");
  assert.equal(await p.locator(".question-features .feature-grid rect").count(), 18);
  for (const id of ["q327", "q345"]) {
    await p.goto(base + "/#quiz/one/" + id);
    await p.locator('[data-action="choose"][data-id="' + ((q[id].answer + 1) % 4) + '"]').tap();
    await p.locator('[data-action="submit"]').tap();
    assert.equal(await p.locator(".option-review li").count(), 4);
  }
  await p.goto(base + "/#targeted");
  await p.locator("#target-module").selectOption("判断推理");
  await p.locator("#target-stage").selectOption("检查边界");
  const queue = (await p.getByRole("link", { name: /开始这组/ }).getAttribute("href")).split("/").at(-1).split(",");
  assert.deepEqual(new Set(queue.slice(0, 2)), new Set(["q327", "q345"]));
  assert.ok(queue.every(id => q[id].meta.module === "判断推理" && q[id].meta.trainingStage === "检查边界"));
  console.log("PASS Real grid drawings, all option explanations and targeted mistake priority");
  const saved = await p.evaluate(() => JSON.parse(localStorage.getItem("zhixu-study-v1")));
  for (const key of ["notes", "drafts", "checks"]) assert.deepEqual(saved[key], old[key]);
  assert.deepEqual(saved.attempts[0], old.attempts[0]);
  await p.goto(base + "/#settings");
  const download = p.waitForEvent("download");
  await p.getByRole("button", { name: "导出完整备份" }).tap();
  const evidence = path.join(__dirname, "../test-results");
  fs.mkdirSync(evidence, { recursive: true });
  const file = path.join(evidence, "v024-backup.json");
  await (await download).saveAs(file);
  await p.evaluate(() => localStorage.removeItem("zhixu-study-v1"));
  await p.reload();
  p.once("dialog", d => d.accept());
  await p.locator("#import-file").setInputFiles(file);
  await p.getByText("备份已恢复。", { exact: true }).waitFor();
  assert.deepEqual(await p.evaluate(() => JSON.parse(localStorage.getItem("zhixu-study-v1"))), saved);
  fs.unlinkSync(file);
  console.log("PASS Exact v1 restore retains old notes, all prior-stage drafts, checks and new mistakes");
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 1100 });
    for (const route of ["learn/intro", ...ids.map(id => "lesson/" + id + "/advanced"), "quiz/one/q340", "quiz/one/q343", "quiz/one/q345", "write/w47", "coverage"]) {
      await p.goto(base + "/#" + route);
      assert.equal(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, width + ":" + route);
    }
  }
  await p.evaluate(() => localStorage.removeItem("zhixu-study-v1"));
  await p.goto(base + "/#lesson/figure-features/practice");
  await p.reload();
  await p.setViewportSize({ width: 390, height: 1100 });
  await p.getByRole("heading", { name: "动手观察 · 数量与属性", exact: true }).waitFor();
  await p.screenshot({ path: path.join(evidence, "mobile-visual-deduction-v024.png"), fullPage: false });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log("PASS Four viewport widths, no JavaScript errors or outgoing records, clean cloud-browser screenshot");
  const resultsFile = path.join(evidence, "test-results.json");
  const result = fs.existsSync(resultsFile) ? JSON.parse(fs.readFileSync(resultsFile)) : { tests: [] };
  for (const name of ["v024 twelve reasoning paths", "v024 visual controls and notes", "v024 grid graphics and targeted mistakes", "v024 exact v1 restore", "v024 responsive privacy regression"]) result.tests.push({ name, status: "passed" });
  result.tests = [...new Map(result.tests.map(x => [x.name, x])).values()];
  fs.writeFileSync(resultsFile, JSON.stringify(result, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
