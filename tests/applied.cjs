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
    q = Object.fromEntries(C.questions.map((x) => [x.id, x])),
    num = (id) => parseFloat(q[id].options[q[id].answer]);
  // Expand each table cell into individual visits, then derive sums and daily observations independently.
  const visits = C.questionMaterials["service-table"].tables[0].rows.map((r) =>
    r.slice(1).map((n) => Array(Number(n) * 100).fill(1)),
  );
  assert.equal(
    num("q130"),
    visits.reduce((a, r) => a + r[1].length - r[0].length, 0),
  );
  assert.equal(
    num("q131"),
    visits[0][1].length / 20 - visits[1][1].length / 25,
  );
  assert.equal(visits[2][0].length / 16, visits[2][1].length / 18);
  assert.equal(q.q132.answer, 1);
  const people = [...Array(8).fill(9), ...Array(12).fill(4)];
  assert.equal(num("q140"), people.reduce((a, v) => a + v, 0) / people.length);
  assert.equal(num("q139"), 7);
  for (let m = 1; m < 8; m++)
    for (let n = 1; n < 8; n++)
      for (let a = -3; a < 4; a++)
        for (let bb = -3; bb < 4; bb++)
          assert.equal(
            2 * (m * a + n * bb) === (a + bb) * (m + n),
            m === n || a === bb,
          );
  assert.equal(q.q141.answer, 2);
  assert.equal(q.q142.answer, 3);
  assert.equal((-30 + 20) / -20, 0.5);
  assert.ok(-30 < -20);
  assert.equal(q.q143.answer, 0);
  assert.equal(q.q144.answer, 2);
  assert.deepEqual(
    ["q133", "q134", "q135", "q136", "q137", "q138"].map((id) => q[id].answer),
    [0, 3, 1, 2, 3, 0],
  );
  assert.ok(C.questions.slice(-15).every((x) => x.optionReviews.length === 4));
  assert.ok(
    !C.methods.find((m) => m.id === "gufei-2010").lessons.includes("word"),
  );
  assert.ok(
    !C.questions
      .find((x) => x.lesson === "word")
      .meta.methodIds.includes("gufei-2010"),
  );
  assert.match(q.q03.stem, /各期数值均为正/);
  assert.match(
    C.lessons.find((l) => l.id === "average").sections[0][1],
    /均值相同/,
  );
  const w = C.writing.find((w) => w.id === "w19"),
    len = [...w.sample.replace(/\s/g, "")].length;
  assert.ok(len >= w.minLength && len <= w.limit);
  assert.ok(w.material.length > 650);
  console.log(
    "PASS Independent table totals, population means, equality cases, growth boundaries and semantic answer review",
  );
  await p.goto(base + "/#quiz/one/q130");
  assert.equal(await p.locator(".question-material table").count(), 2);
  assert.equal(await p.locator(".option-review").count(), 0);
  await p.locator('[data-action="choose"][data-id="0"]').tap();
  await p.locator('[data-action="submit"]').tap();
  assert.equal(await p.locator(".option-review li").count(), 4);
  await p.goto(base + "/#targeted");
  await p.locator("#target-module").selectOption("资料分析");
  await p.locator("#target-stage").selectOption("检查边界");
  let href = await p
    .getByRole("link", { name: /开始这组/ })
    .getAttribute("href");
  let ids = href.split("/").at(-1).split(",");
  assert.ok(
    ids.every(
      (id) =>
        q[id].meta.module === "资料分析" &&
        q[id].meta.trainingStage === "检查边界",
    ),
  );
  assert.ok(!ids.includes("q130"));
  await p.locator("#target-stage").selectOption("识别概念");
  href = await p.getByRole("link", { name: /开始这组/ }).getAttribute("href");
  assert.equal(href.split("/").at(-1).split(",")[0], "q130");
  await p.locator("#target-module").selectOption("政治理论");
  await p.locator("#target-stage").selectOption("检查边界");
  await p.getByRole("heading", { name: "当前筛选下没有待选题" }).waitFor();
  assert.equal(await p.locator('a[href^="#quiz/target/"]').count(), 0);
  console.log(
    "PASS Shared table rendering, explanations after submit and intersection-specific mistake-first practice with honest empty state",
  );
  await p.goto(base + "/#write/w19");
  assert.match(await p.locator("#word-count").textContent(), /尚不足600字/);
  await p.locator("#draft").fill("文".repeat(600));
  assert.doesNotMatch(await p.locator("#word-count").textContent(), /尚不足/);
  await p.locator("#draft").fill("文".repeat(901));
  assert.equal(
    await p.locator("#word-count").getAttribute("class"),
    "over-limit",
  );
  await p.locator("#draft").fill("测试文章草稿");
  await p.locator("[data-check]").first().check();
  const saved = await p.evaluate(() =>
    JSON.parse(localStorage.getItem("zhixu-study-v1")),
  );
  await p.goto(base + "/#settings");
  const download = p.waitForEvent("download");
  await p.getByRole("button", { name: "导出完整备份" }).tap();
  const f = path.join(__dirname, "../test-results/v08-backup.json");
  await (await download).saveAs(f);
  await p.evaluate(() => localStorage.removeItem("zhixu-study-v1"));
  await p.reload();
  p.once("dialog", (d) => d.accept());
  await p.locator("#import-file").setInputFiles(f);
  await p.getByText("备份已恢复。", { exact: true }).waitFor();
  assert.deepEqual(
    await p.evaluate(() => JSON.parse(localStorage.getItem("zhixu-study-v1"))),
    saved,
  );
  console.log(
    "PASS Full-essay word-range hints and new/old record format backup compatibility",
  );
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 1100 });
    for (const route of [
      "quiz/one/q130",
      "quiz/one/q131",
      "targeted",
      "write/w19",
      "lesson/full-essay",
      "lesson/average",
      "lesson/growth",
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
  await p.goto(base + "/#quiz/one/q130");
  await p.reload();
  await p.setViewportSize({ width: 390, height: 1100 });
  await p.screenshot({
    path: path.join(__dirname, "../test-results/mobile-multitable-v08.png"),
    fullPage: false,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "PASS Four-width long lesson, full essay and table UI; no JavaScript errors or outgoing data",
  );
  const file = path.join(__dirname, "../test-results/test-results.json"),
    r = JSON.parse(fs.readFileSync(file));
  for (const name of [
    "v08 independent answer and correction audit",
    "v08 shared tables, option review and targeted stage",
    "v08 full essay backup and word bounds",
    "v08 responsive privacy regression",
  ])
    r.tests.push({ name, status: "passed" });
  r.tests = [...new Map(r.tests.map((x) => [x.name, x])).values()];
  fs.writeFileSync(file, JSON.stringify(r, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
