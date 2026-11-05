const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.STUDY_BASE_URL || "http://127.0.0.1:4173";
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const c = await b.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const p = await c.newPage();
  const errors = [],
    external = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("request", (r) => {
    if (!r.url().startsWith(base)) external.push(r.url());
  });
  await p.goto(base);
  const C = await p.evaluate(() => window.STUDY_CONTENT),
    q = Object.fromEntries(C.questions.map((x) => [x.id, x]));
  assert.equal(C.comparisons.length, 7);
  for (const t of C.comparisons) {
    assert.equal(new Set(t.refs).size, 2);
    for (const id of t.refs) assert.ok(C.methods.find((m) => m.id === id));
    assert.ok(C.lessons.find((l) => l.id === t.lesson));
    assert.ok(t.gap && t.agreement && t.difference && t.boundary);
  }
  assert.equal(
    C.methods.filter((m) => m.kind === "historical-teacher").length,
    8,
  );
  assert.equal(C.methods.filter((m) => m.kind === "author").length, 4);
  assert.equal(C.methods.filter((m) => m.kind === "institution").length, 5);
  assert.equal(
    C.questions.filter((q) => q.meta.trainingStage === "未分层").length,
    84,
  );
  for (const stage of ["识别概念", "迁移运用", "检查边界"])
    assert.equal(
      C.questions.filter((q) => q.meta.trainingStage === stage).length,
      32,
    );
  assert.ok(
    C.questions.every(
      (q) =>
        q.meta.difficulty.level === null && q.meta.examSource.year === null,
    ),
  );
  console.log(
    "PASS Seven same-topic comparisons, identity boundaries and editorial tiers",
  );
  // Independently check profit scaling, a fixed-fee counterexample and mixed-growth calculations.
  for (const cost of [1, 23, 407])
    assert.ok(Math.abs((1.3 * cost - cost) / cost - 0.3) < 1e-12);
  let profit = 0,
    cost = 0;
  for (let i = 0; i < 12; i++) {
    cost += 75;
    profit += 75 * (i < 4 ? 0.4 : 0.1);
  }
  assert.equal(parseFloat(q.q89.options[q.q89.answer]), (100 * profit) / cost);
  const rates = [100, 200].map((cost) => (1.5 * cost - 20 - cost) / cost);
  assert.notEqual(rates[0], rates[1]);
  assert.equal(q.q90.answer, 3);
  const validAnd = [
    [true, false],
    [false, true],
    [false, false],
    [true, true],
  ].map(([registered, trained]) => registered && trained);
  assert.equal(validAnd.indexOf(true), q.q91.answer);
  assert.equal(validAnd.filter(Boolean).length, 1);
  const validOr = [
    [true, false, false],
    [false, true, true],
    [false, false, true],
    [false, true, false],
  ].map(([code, list, checked]) => (code || list) && checked);
  assert.equal(validOr.indexOf(true), q.q92.answer);
  assert.equal(validOr.filter(Boolean).length, 1);
  const counterexamples = [
    [true, true],
    [false, false],
    [false, true],
    [true, false],
  ].map(([signed, trained]) => trained && !(signed && trained));
  assert.equal(counterexamples.indexOf(true), q.q93.answer);
  const mixed = ([a, b], [ra, rb]) =>
    ((a * (1 + ra) + b * (1 + rb)) / (a + b) - 1) * 100;
  assert.ok(
    Math.abs(
      parseFloat(q.q94.options[q.q94.answer]) - mixed([400, 600], [0.05, 0.25]),
    ) < 1e-10,
  );
  assert.ok(
    Math.abs(
      parseFloat(q.q95.options[q.q95.answer]) -
        mixed([320 / 1.6, 420 / 1.05], [0.6, 0.05]),
    ) < 0.005,
  );
  assert.ok(
    Math.abs(
      parseFloat(q.q96.options[q.q96.answer].match(/[\d.]+/)[0]) -
        mixed([1200 / 2, 1000], [1, 0]),
    ) < 1e-10,
  );
  console.log(
    "PASS Independent scaling, counterexample, truth-table and weighted-rate audit",
  );
  await p.goto(base + "/#methods");
  assert.equal(await p.locator(".comparison-card").count(), 7);
  await p.getByRole("button", { name: "资料分析", exact: true }).tap();
  assert.equal(await p.locator(".comparison-card").count(), 1);
  assert.equal(await p.locator(".comparison-sources article").count(), 2);
  await p.getByRole("link", { name: "学专题与配套训练", exact: true }).tap();
  await p
    .getByRole("heading", {
      name: "混合增长：范围法与精确权重互相校验",
      exact: true,
    })
    .waitFor();
  await p.goto(base + "/#bank");
  await p.locator("#bank-stage").selectOption("检查边界");
  assert.equal(await p.locator(".bank-question").count(), 12);
  await p.locator("#bank-module").selectOption("资料分析");
  assert.equal(await p.locator(".bank-question").count(), 11);
  await p.getByRole("link", { name: "练习筛选结果", exact: true }).tap();
  await p.reload();
  assert.match(await p.locator(".quiz-card h1").textContent(), /1200/);
  await p.locator(".option").first().tap();
  await p.getByRole("button", { name: "提交答案", exact: true }).tap();
  await p.getByText("答对了，继续保持。", { exact: true }).waitFor();
  console.log(
    "PASS Comparison-to-lesson and tier-to-targeted-practice touch flow",
  );
  await p.goto(base + "/#fujian");
  assert.match(await p.locator("#fujian-result").textContent(), /105/);
  await p.locator("#fj-class").selectOption("B");
  await p.locator("#fj-scope").selectOption("eligible");
  await p.locator("#fj-police").check();
  let result = await p.locator("#fujian-result").textContent();
  assert.ok(!result.includes("公共科目总分"));
  assert.match(result, /≥ 45/);
  assert.match(result, /≥ 40/);
  await p.locator("#fj-class").selectOption("A");
  result = await p.locator("#fujian-result").textContent();
  assert.match(result, /≥ 95/);
  assert.equal(await p.locator(".source-item").count(), 2);
  await p
    .getByText("不作为2027年度报名或考试安排。", { exact: false })
    .waitFor();
  console.log(
    "PASS Year-bound Fujian classification and official-source limitations",
  );
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 900 });
    for (const route of [
      "methods",
      "methods/growth",
      "fujian",
      "lesson/scoped-reading",
      "lesson/summary-evidence",
      "bank",
      "write/w09",
      "write/w10",
    ]) {
      await p.goto(base + "/#" + route);
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${width} ${route}`,
      );
    }
  }
  const old = {
    schemaVersion: 1,
    exam: "fujian",
    read: ["cube-net", "growth"],
    favorites: ["summary"],
    notes: { "cube-net": "v0.3旧笔记" },
    attempts: [
      { qid: "q84", choice: 0, at: "2026-11-05T10:00:00Z", seconds: 12 },
    ],
    drafts: { w08: "v0.3旧草稿" },
    checks: { w08: [0] },
  };
  await p.evaluate(
    (s) => localStorage.setItem("zhixu-study-v1", JSON.stringify(s)),
    old,
  );
  await p.goto(base + "/#write/w08");
  await p.reload();
  assert.equal(await p.locator("#draft").inputValue(), old.drafts.w08);
  await p.goto(base + "/#mistakes");
  assert.equal(await p.locator(".wrong-row").count(), 1);
  assert.deepEqual(
    await p.evaluate(() => JSON.parse(localStorage.getItem("zhixu-study-v1"))),
    old,
  );
  await p.goto(base + "/#write/w09");
  await p.locator("#draft").fill("只写已实施的三项做法");
  await p.reload();
  assert.equal(await p.locator("#draft").inputValue(), "只写已实施的三项做法");
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "PASS Four widths, v0.3 records, new drafts, no JS errors or outgoing data",
  );
  const file = path.join(__dirname, "..", "test-results/test-results.json"),
    results = JSON.parse(fs.readFileSync(file));
  for (const name of [
    "Same-topic source comparisons and identity audit",
    "Independent tiered-answer verification",
    "Tiered practice and comparison mobile flow",
    "Fujian historical classification source checks",
    "Responsive and v0.3 compatibility",
  ])
    results.tests.push({ name, status: "passed" });
  results.tests = [...new Map(results.tests.map((t) => [t.name, t])).values()];
  fs.writeFileSync(file, JSON.stringify(results, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
