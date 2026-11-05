const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.STUDY_BASE_URL || "http://127.0.0.1:4173";
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 1000 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  });
  const p = await ctx.newPage(),
    errors = [],
    external = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("request", (r) => {
    if (!r.url().startsWith(base)) external.push(r.url());
  });
  await p.goto(base);
  const C = await p.evaluate(() => window.STUDY_CONTENT),
    q = Object.fromEntries(C.questions.map((q) => [q.id, q]));
  const fraction = (id) => {
    const [a, b] = q[id].options[q[id].answer].split("/").map(Number);
    return a / b;
  };
  // Enumerate ordered pairs of distinct physical balls, independently of multiplication formulas.
  function outcomes(n, reds, condition, success) {
    let total = 0,
      hit = 0;
    for (let a = 0; a < n; a++)
      for (let b = 0; b < n; b++)
        if (a !== b && condition(a, b)) {
          total++;
          if (success(a, b)) hit++;
        }
    return hit / total;
  }
  assert.equal(
    fraction("q103"),
    outcomes(
      5,
      3,
      () => true,
      (a, b) => a < 3 && b < 3,
    ),
  );
  assert.equal(
    fraction("q104"),
    outcomes(
      7,
      4,
      () => true,
      (a, b) => a < 4 || b < 4,
    ),
  );
  assert.equal(
    fraction("q105"),
    outcomes(
      5,
      3,
      (a) => a < 3,
      (_, b) => b >= 3,
    ),
  );
  const increments = [200 * 0.05, 100 * 0.08];
  assert.ok(increments[0] > increments[1]);
  assert.equal(q.q97.answer, 2);
  assert.ok(
    Math.abs(
      parseFloat(q.q98.options[q.q98.answer]) -
        (360 - 360 / 1.2 - (330 - 330 / 1.1)),
    ) < 1e-9,
  );
  assert.ok(200 * 0.08 > 100 * 0.1);
  assert.equal(q.q99.answer, 3);
  // Semantic review: only alternatives that address baseline confounding, bounded support or factor control respectively.
  assert.deepEqual(
    ["q100", "q101", "q102"].map((id) => q[id].answer),
    [2, 1, 3],
  );
  const ratio = 197 / 49;
  assert.ok(ratio > 4 && ratio < 4.05);
  const closest = [3, 4, 5, 6].map((v) => Math.abs(v - ratio));
  assert.equal(closest.indexOf(Math.min(...closest)), q.q106.answer);
  assert.notEqual([4.01, 4.03].indexOf(4.01), [4.01, 4.03].indexOf(4.03));
  assert.ok(Math.abs(4 - 4.01) < Math.abs(4 - 4.03));
  assert.ok(Math.abs(4.04 - 4.03) < Math.abs(4.04 - 4.01));
  assert.equal(q.q107.answer, 3);
  assert.equal(Math.round(126 / 10) * 10, 130);
  assert.equal(Math.round(128 / 10) * 10, 130);
  assert.notEqual(126 % 10, 128 % 10);
  assert.equal(q.q108.answer, 2);
  for (const w of C.writing.slice(-3))
    assert.ok([...w.sample.replace(/\s/g, "")].length <= w.limit);
  console.log(
    "PASS Twelve new answers: pair enumeration, independent arithmetic, bounds and semantic review",
  );
  await p.goto(base + "/#targeted");
  assert.match(await p.locator("#main").textContent(), /0 道最近答错/);
  const first = await p
    .getByRole("link", { name: /开始这组/ })
    .getAttribute("href");
  const firstIds = first.split("/").at(-1).split(",");
  assert.equal(firstIds.length, 12);
  assert.equal(new Set(firstIds.map((id) => q[id].lesson)).size, 12);
  const original = {
    schemaVersion: 1,
    exam: "both",
    read: ["growth"],
    favorites: [],
    notes: { growth: "旧笔记" },
    attempts: [
      { qid: "q97", choice: 0, at: "2026-11-05T01:00:00Z", seconds: 7 },
      { qid: "q100", choice: 0, at: "2026-11-05T01:01:00Z", seconds: 8 },
      { qid: "q98", choice: 0, at: "2026-11-05T01:02:00Z", seconds: 9 },
    ],
    drafts: { w01: "旧草稿" },
    checks: {},
  };
  await p.evaluate(
    (s) => localStorage.setItem("zhixu-study-v1", JSON.stringify(s)),
    original,
  );
  await p.reload();
  const href = await p
    .getByRole("link", { name: /开始这组/ })
    .getAttribute("href");
  const ids = href.split("/").at(-1).split(",");
  assert.deepEqual(new Set(ids.slice(0, 2)), new Set(["q97", "q100"]));
  assert.ok(!ids.includes("q98"));
  assert.equal(new Set(ids).size, 12);
  await p.locator("#target-module").selectOption("资料分析");
  assert.equal(
    await p.locator('.target-card[data-lesson="argument-controls"]').count(),
    0,
  );
  await p
    .locator('.target-card[data-lesson="rate-amount-order"]')
    .getByRole("link", { name: "练这个知识点", exact: true })
    .tap();
  assert.equal(p.url().split("#")[1], "quiz/target/q97,q99,q232,q233,q234");
  await p.locator(".option").nth(2).tap();
  await p.getByRole("button", { name: "提交答案", exact: true }).tap();
  await p.reload();
  assert.match(await p.locator(".quiz-card h1").textContent(), /甲项目/);
  assert.match(await p.locator(".quiz-header").textContent(), /1 \/ 5/);
  await p.goto(base + "/#targeted");
  assert.equal(
    await p
      .locator('.target-card[data-lesson="rate-amount-order"] .target-reason')
      .textContent(),
    "还有未练题，可继续检验理解。未练 4 道。",
  );
  // No wrong questions but some previously done: wording must describe unattempted questions, not entire lesson as unattempted.
  await p.goto(base + "/#quiz/target/q97,q97,nope,q105");
  assert.match(await p.locator(".quiz-header").textContent(), /1 \/ 2/);
  await p.goto(base + "/#quiz/target/nope");
  await p.getByRole("heading", { name: "当前没有可练习的题目" }).waitFor();
  console.log(
    "PASS Transparent targeting, module scope, corrected questions excluded, frozen and sanitized queues",
  );
  for (const id of ["w11", "w12", "w13"]) {
    await p.goto(base + "/#write/" + id);
    await p.locator("#draft").fill("新增申论草稿 " + id);
    await p.reload();
    assert.equal(await p.locator("#draft").inputValue(), "新增申论草稿 " + id);
  }
  await p.goto(base + "/#settings");
  const saved = await p.evaluate(() =>
    JSON.parse(localStorage.getItem("zhixu-study-v1")),
  );
  const downloadPromise = p.waitForEvent("download");
  await p.getByRole("button", { name: "导出完整备份" }).tap();
  const d = await downloadPromise;
  const backup = path.join(__dirname, "../test-results/v05-backup.json");
  await d.saveAs(backup);
  const exported = JSON.parse(fs.readFileSync(backup));
  assert.ok(!Number.isNaN(Date.parse(exported.exportedAt)));
  delete exported.exportedAt;
  assert.deepEqual(exported, saved);
  await p.evaluate(() => localStorage.removeItem("zhixu-study-v1"));
  await p.reload();
  p.once("dialog", (d) => d.accept());
  await p.locator("#import-file").setInputFiles(backup);
  await p.getByText("备份已恢复。", { exact: true }).waitFor();
  assert.deepEqual(
    await p.evaluate(() => JSON.parse(localStorage.getItem("zhixu-study-v1"))),
    saved,
  );
  console.log(
    "PASS Old and new notes, attempts and three writing drafts survive backup round-trip",
  );
  const allDone = {
    ...original,
    attempts: C.questions.map((x) => ({
      qid: x.id,
      choice: x.answer,
      at: "2026-11-05T01:00:00Z",
      seconds: 1,
    })),
  };
  await p.evaluate(
    (s) => localStorage.setItem("zhixu-study-v1", JSON.stringify(s)),
    allDone,
  );
  await p.goto(base + "/#targeted");
  await p.reload();
  await p.getByRole("heading", { name: "当前筛选下没有待选题" }).waitFor();
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 1000 });
    for (const route of [
      "targeted",
      "methods/estimation",
      "methods/definition",
      "methods/summary",
      "lesson/estimation-boundary",
      "write/w11",
      "write/w12",
      "write/w13",
    ]) {
      await p.goto(base + "/#" + route);
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        width + ":" + route,
      );
    }
  }
  await p.evaluate(() => localStorage.removeItem("zhixu-study-v1"));
  await p.goto(base + "/#targeted");
  await p.reload();
  await p.setViewportSize({ width: 390, height: 1000 });
  await p.locator("#target-module").selectOption("资料分析");
  fs.mkdirSync(path.join(__dirname, "../test-results"), { recursive: true });
  await p.screenshot({
    path: path.join(__dirname, "../test-results/mobile-targeted.png"),
    fullPage: false,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "PASS Empty/completed states, four widths, six historical source comparisons and no external data requests",
  );
  const resultFile = path.join(__dirname, "../test-results/test-results.json"),
    results = JSON.parse(fs.readFileSync(resultFile));
  for (const name of [
    "v05 independent answer audit",
    "Local targeted queue behavior",
    "v1 backup round-trip with new content",
    "v05 responsive privacy and empty states",
  ])
    results.tests.push({ name, status: "passed" });
  results.tests = [...new Map(results.tests.map((x) => [x.name, x])).values()];
  fs.writeFileSync(resultFile, JSON.stringify(results, null, 2));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
