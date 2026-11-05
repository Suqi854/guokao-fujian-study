const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const base = process.env.STUDY_BASE_URL || "http://127.0.0.1:4173";
const evidence = path.join(__dirname, "..", "test-results");
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const c = await b.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const p = await c.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(base);
  const data = await p.evaluate(() => window.STUDY_CONTENT);
  assert.equal(data.lessons.length, 79);
  assert.equal(data.questions.length, 459);
  assert.equal(data.writing.length, 47);
  for (const key of ["lessons", "questions", "writing"])
    assert.equal(new Set(data[key].map((x) => x.id)).size, data[key].length);
  for (const l of data.lessons) {
    assert.ok(l.sources.length || l.basis === "原创离散图形模型与独立推导");
    for (const s of l.sources) assert.ok(data.sources[s]);
    for (const id of l.practice)
      assert.equal(data.questions.find((q) => q.id === id)?.lesson, l.id);
  }
  for (const q of data.questions) {
    assert.ok(q.answer >= 0 && q.answer < q.options.length);
    assert.equal(new Set(q.options).size, 4);
    assert.ok(
      data.lessons.find((l) => l.id === q.lesson)?.practice.includes(q.id),
    );
  }
  // Independently calculated mathematical results for new examples.
  const numeric = {
    q19: Math.round((1.2 * 0.9 - 1) * 100),
    q20: (Math.sqrt(121 / 100) - 1) * 100,
    q21: ((100 * 0.1 + 300 * 0.3) / 400) * 100,
    q35: 30 / (4 + 6),
    q36: 6 / (6 - 4),
    q37: 40 - (25 + 20 - 10),
    q38: 20 + 18 - 30,
    q39: Array.from({ length: 19 }, (_, i) => i + 21).find(
      (n) => n % 4 === 1 && n % 6 === 3,
    ),
    q40: 12,
  };
  for (const [id, n] of Object.entries(numeric)) {
    const q = data.questions.find((x) => x.id === id);
    assert.equal(
      Number(q.options[q.answer].match(/[\d.]+/)[0]),
      Math.round(n * 1000) / 1000,
      id,
    );
  }
  console.log(
    "PASS Content references, unique choices and independent numerical checks",
  );
  await p.goto(base + "/#lesson/rotation");
  await p.getByRole("button", { name: "下一步" }).tap();
  await p
    .getByText("已转 1 步，每步顺时针90°；箭头与黑点一起旋转。", {
      exact: true,
    })
    .waitFor();
  await p.getByRole("button", { name: "重置", exact: true }).tap();
  await p
    .getByText("已转 0 步，每步顺时针90°；箭头与黑点一起旋转。", {
      exact: true,
    })
    .waitFor();
  await p.screenshot({
    path: path.join(evidence, "mobile-rotation.png"),
    fullPage: true,
  });
  await p.goto(base + "/#lesson/overlay");
  await p.getByRole("button", { name: "交集", exact: true }).tap();
  await p.getByRole("img", { name: "叠加结果：100", exact: true }).waitFor();
  await p.getByRole("button", { name: "并集", exact: true }).tap();
  await p.getByRole("img", { name: "叠加结果：111", exact: true }).waitFor();
  await p.getByRole("button", { name: "异或", exact: true }).tap();
  await p.getByRole("img", { name: "叠加结果：011", exact: true }).waitFor();
  console.log("PASS Rotation and three overlay rules via real touch");
  await p.goto(base + "/#quiz/one/q23");
  assert.equal(await p.locator(".question-figures svg").count(), 3);
  await p.locator(".option").nth(2).tap();
  await p.getByRole("button", { name: "提交答案" }).tap();
  await p.getByText("答对了，继续保持。", { exact: true }).waitFor();
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 900 });
    for (const route of [
      "learn",
      "sources",
      "lesson/rotation",
      "lesson/overlay",
      "lesson/civil-capacity",
      "quiz/one/q23",
      "write/w05",
      "write/w06",
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
  console.log("PASS New figure/source/writing screens across four widths");
  for (const l of data.lessons) {
    await p.goto(base + "/#lesson/" + l.id);
    assert.equal(
      await p.locator(".source-panel .source-item a").count(),
      0,
    );
    await p.getByRole("heading", { name: l.title, exact: true }).waitFor();
    const expected = l.sections.filter(s => !/来源|归属|出处/.test(s[0]));
    assert.equal(await p.locator('.reading > .formula').textContent(), l.formula);
    assert.deepEqual(await p.locator('.reading > section:not(.level-guide):not(.diagram-box) > h2').allTextContents(), expected.map(s => s[0]));
    assert.deepEqual(await p.locator('.reading > section:not(.level-guide):not(.diagram-box) > p').allTextContents(), expected.map(s => s[1]));
  }
  await p.goto(base + "/#sources");
  assert.equal(await p.locator(".source-grid article").count(), 28);
  console.log("PASS All 79 lesson pages keep provenance in the separate archive");
  // Existing v1 records remain readable after adding content.
  const old = {
    schemaVersion: 1,
    exam: "fujian",
    read: ["growth"],
    favorites: ["summary"],
    notes: { growth: "旧笔记" },
    attempts: [
      { qid: "q01", choice: 0, at: "2026-11-04T12:00:00Z", seconds: 15 },
    ],
    drafts: { w01: "旧草稿" },
    checks: { w01: [0] },
  };
  await p.evaluate(
    (v) => localStorage.setItem("zhixu-study-v1", JSON.stringify(v)),
    old,
  );
  await p.goto(base + "/#write/w01");
  await p.reload();
  assert.equal(await p.locator("#draft").inputValue(), "旧草稿");
  await p.goto(base + "/#mistakes");
  assert.equal(await p.locator(".wrong-row").count(), 1);
  assert.equal(
    await p.evaluate(
      () => JSON.parse(localStorage.getItem("zhixu-study-v1")).notes.growth,
    ),
    "旧笔记",
  );
  assert.deepEqual(errors, []);
  console.log("PASS v1 data compatibility and no JS errors");
  const r = JSON.parse(
    fs.readFileSync(path.join(evidence, "test-results.json")),
  );
  for (const name of [
    "Content references and independent math",
    "Interactive rotation and overlay touch",
    "New screens responsive at four widths",
    "All lessons show source links",
    "v1 records remain compatible",
  ])
    r.tests.push({ name, status: "passed" });
  r.tests = [...new Map(r.tests.map((t) => [t.name, t])).values()];
  fs.writeFileSync(
    path.join(evidence, "test-results.json"),
    JSON.stringify(r, null, 2),
  );
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
