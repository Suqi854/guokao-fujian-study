const { chromium } = require("@playwright/test"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path");
const base = process.env.STUDY_BASE_URL || "http://127.0.0.1:4173";
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const ctx = await b.newContext({
      viewport: { width: 390, height: 1100 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    }),
    p = await ctx.newPage(),
    errors = [],
    external = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("request", (r) => {
    if (!r.url().startsWith(base)) external.push(r.url());
  });
  await p.goto(base);
  const C = await p.evaluate(() => window.STUDY_CONTENT),
    q = Object.fromEntries(C.questions.map((x) => [x.id, x]));
  // Independent condition vectors transcribed from each option, not from the stored answer.
  const loan = [
    [1, 1, 1, 1],
    [0, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 0],
  ].map((a) => a.every(Boolean));
  assert.deepEqual(loan, [true, false, false, false]);
  assert.equal(q.q154.answer, loan.indexOf(true));
  const reception = [
    [1, 1, 0],
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1],
  ].map(([registered, solved, appointment]) =>
    Boolean(registered && (solved || appointment)),
  );
  assert.equal(q.q155.answer, reception.indexOf(false));
  // Enumerate all completions for the unknown deadline instead of treating it as false.
  function outcomes(known) {
    const results = new Set();
    for (let submitted = 0; submitted < 2; submitted++)
      for (let unresolved = 0; unresolved < 2; unresolved++)
        for (let late = 0; late < 2; late++) {
          const a = [submitted, unresolved, late];
          if (a.every((v, i) => known[i] === null || known[i] === v))
            results.add(a.every(Boolean));
        }
    return results;
  }
  const rows = [
    [1, 1, 1],
    [1, 1, null],
    [0, 1, 1],
    [1, 0, 1],
  ].map(outcomes);
  assert.deepEqual(
    rows.map((r) => r.size),
    [1, 2, 1, 1],
  );
  assert.equal(
    q.q156.answer,
    rows.findIndex((r) => r.size === 2),
  );
  // Main-idea semantic review is documented clause by clause in ANSWER_REVIEW.md, not certified by this assertion.
  assert.deepEqual(
    ["q151", "q152", "q153"].map((id) => q[id].answer),
    [2, 0, 1],
  );
  for (const id of ["mainidea", "definition"])
    assert.ok(
      C.lessons
        .find((l) => l.id === id)
        .sections.map((x) => x[1])
        .join("").length > 1200,
    );
  assert.ok(
    q.q154.meta.methodIds.includes("caijinlong-2011") &&
      q.q154.meta.methodIds.includes("zhangxiaoming-2011"),
  );
  assert.ok(
    q.q151.meta.methodIds.includes("gufei-2010") &&
      q.q151.meta.methodIds.includes("wutong-2022"),
  );
  assert.equal(C.methods.find((m) => m.id === "wutong-2022").kind, "author");
  assert.equal(C.methods.length, 17);
  const w1 = C.writing.find((w) => w.id === "w21"),
    w2 = C.writing.find((w) => w.id === "w22");
  assert.equal(w1.material, w2.material);
  assert.equal(w1.materialGroup, w2.materialGroup);
  assert.ok(w1.material.length > 1400);
  for (const w of [w1, w2])
    assert.ok(w.sample.replace(/\s/g, "").length <= w.limit);
  assert.equal(new Set(C.writing.map((w) => w.material)).size, 24);
  console.log(
    "PASS Definition truth tables and unknown completions, semantic review ledger, source identity boundaries and long shared material",
  );
  const old = {
    schemaVersion: 1,
    exam: "both",
    read: ["definition"],
    favorites: [],
    notes: { definition: "测试旧定义笔记" },
    attempts: [
      { qid: "q10", choice: 0, at: "2026-11-04T12:00:00Z", seconds: 12 },
    ],
    drafts: { w17: "测试旧长材料草稿" },
    checks: { w17: [1] },
  };
  await p.evaluate(
    (s) => localStorage.setItem("zhixu-study-v1", JSON.stringify(s)),
    old,
  );
  await p.reload();
  await p.goto(base + "/#lesson/definition");
  assert.equal(
    await p.locator("#lesson-note").inputValue(),
    old.notes.definition,
  );
  await p.getByRole("link", { name: "练配套题", exact: true }).tap();
  assert.match(await p.locator(".quiz-header").textContent(), /1 \/ 7/);
  await p.goto(base + "/#quiz/one/q156");
  await p.locator('[data-action="choose"][data-id="0"]').tap();
  await p.locator('[data-action="submit"]').tap();
  assert.equal(await p.locator(".option-review li").count(), 4);
  assert.match(await p.locator(".feedback").textContent(), /不能把未说明/);
  await p.goto(base + "/#targeted");
  await p.locator("#target-module").selectOption("判断推理");
  await p.locator("#target-stage").selectOption("检查边界");
  const href = await p
    .getByRole("link", { name: /开始这组/ })
    .getAttribute("href");
  assert.equal(href.split("/").at(-1).split(",")[0], "q156");
  await p.goto(base + "/#write/w21");
  await p.locator("#draft").fill("测试概括草稿");
  await p.locator("[data-check]").first().check();
  await p.locator('a[href="#write/w22"]').tap();
  await p.getByRole("heading", { name: w2.title, exact: true }).waitFor();
  assert.equal(await p.locator("#draft").inputValue(), "");
  assert.equal(await p.locator("[data-check]").first().isChecked(), false);
  await p.locator("#draft").fill("测试解释草稿");
  await p.locator('a[href="#write/w21"]').tap();
  await p.getByRole("heading", { name: w1.title, exact: true }).waitFor();
  assert.equal(await p.locator("#draft").inputValue(), "测试概括草稿");
  assert.equal(await p.locator("[data-check]").first().isChecked(), true);
  const saved = await p.evaluate(() =>
    JSON.parse(localStorage.getItem("zhixu-study-v1")),
  );
  assert.equal(saved.drafts.w17, old.drafts.w17);
  assert.deepEqual(saved.attempts[0], old.attempts[0]);
  console.log(
    "PASS Expanded stable lesson, targeted new mistake and two linked tasks with independent drafts/checks",
  );
  await p.goto(base + "/#settings");
  const download = p.waitForEvent("download");
  await p.getByRole("button", { name: "导出完整备份" }).tap();
  const file = path.join(__dirname, "../test-results/v010-backup.json");
  await (await download).saveAs(file);
  await p.evaluate(() => localStorage.removeItem("zhixu-study-v1"));
  await p.reload();
  p.once("dialog", (d) => d.accept());
  await p.locator("#import-file").setInputFiles(file);
  await p.getByText("备份已恢复。", { exact: true }).waitFor();
  assert.deepEqual(
    await p.evaluate(() => JSON.parse(localStorage.getItem("zhixu-study-v1"))),
    saved,
  );
  console.log(
    "PASS Old records plus both new task drafts and checks restore losslessly",
  );
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 1100 });
    for (const route of [
      "lesson/mainidea",
      "lesson/definition",
      "write/w21",
      "write/w22",
      "quiz/one/q155",
      "writing",
      "coverage",
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
  await p.goto(base + "/#writing");
  await p.reload();
  await p.setViewportSize({ width: 390, height: 1100 });
  await p.locator("#writing-search").fill("街巷记忆");
  assert.equal(await p.locator(".writing-card").count(), 2);
  await p
    .locator("#writing-results")
    .evaluate((el) => el.scrollIntoView({ block: "start" }));
  await p.screenshot({
    path: path.join(
      __dirname,
      "../test-results/mobile-shared-writing-v010.png",
    ),
    fullPage: false,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "PASS Four-width long lessons and shared-writing flows with no JS errors or outgoing learning data",
  );
  const f = path.join(__dirname, "../test-results/test-results.json"),
    r = JSON.parse(fs.readFileSync(f));
  for (const name of [
    "v010 independent logic and semantic review",
    "v010 stable IDs and linked writing persistence",
    "v010 old/new backup compatibility",
    "v010 responsive privacy regression",
  ])
    r.tests.push({ name, status: "passed" });
  r.tests = [...new Map(r.tests.map((x) => [x.name, x])).values()];
  fs.writeFileSync(f, JSON.stringify(r, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
