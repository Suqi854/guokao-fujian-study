const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path");
const base = process.env.STUDY_BASE_URL || "http://127.0.0.1:4173";
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const ctx = await b.newContext({
      viewport: { width: 390, height: 1000 },
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
  // Independently construct 40 individuals in disjoint regions. Pairwise intersections include the triple intersection.
  const masks = [];
  for (const [mask, n] of [
    [0, 6],
    [1, 8],
    [2, 5],
    [4, 4],
    [3, 6],
    [5, 4],
    [6, 3],
    [7, 4],
  ])
    for (let i = 0; i < n; i++) masks.push(mask);
  for (const [mask, n] of [
    [1, 22],
    [2, 18],
    [4, 15],
    [3, 10],
    [5, 8],
    [6, 7],
    [7, 4],
  ])
    assert.equal(masks.filter((x) => (x & mask) === mask).length, n);
  const bits = (n) => n.toString(2).replace(/0/g, "").length,
    answer = (id) => parseFloat(q[id].options[q[id].answer]);
  assert.equal(answer("q118"), masks.filter((x) => x === 0).length);
  assert.equal(answer("q119"), masks.filter((x) => bits(x) === 2).length);
  assert.equal(answer("q120"), masks.filter((x) => bits(x) === 1).length);
  let units = 9,
    steps = 0;
  while (units < 36) {
    units++;
    steps++;
  }
  assert.equal(answer("q115"), steps / 5);
  let processed = 0,
    hours = 0;
  while (processed < 50) {
    processed += 6 + (hours < 2 ? 4 : 0);
    hours++;
  }
  assert.equal(processed, 50);
  assert.equal(answer("q116"), hours);
  assert.equal(answer("q117"), 60 / (8 + 6 - 2));
  // Manual semantic review recorded in ANSWER_REVIEW.md: preserve limits, plans and evidence; resolve both sides of a gap.
  assert.deepEqual(
    ["q109", "q110", "q111", "q112", "q113", "q114"].map((id) => q[id].answer),
    [1, 2, 3, 0, 1, 3],
  );
  for (const w of C.writing.filter((w) => ["w14", "w15", "w16"].includes(w.id)))
    assert.ok([...w.sample.replace(/\s/g, "")].length <= w.limit);
  const compare = C.comparisons.find((x) => x.id === "detail-reading");
  assert.deepEqual(compare.refs, ["gufei-2010", "gaoshuang-2011"]);
  assert.ok(
    compare.refs.every(
      (id) => C.methods.find((m) => m.id === id).kind === "historical-teacher",
    ),
  );
  console.log(
    "PASS Disjoint-person enumeration, staged-work checks, six semantic answers and historical identity boundaries",
  );
  await p.goto(base + "/#writing");
  assert.equal(await p.locator(".writing-card").count(), 20);
  await p.locator("#writing-search").fill("预约上门");
  assert.equal(await p.locator(".writing-card").count(), 2);
  await p.locator("#writing-type").selectOption("归纳概括");
  assert.equal(await p.locator(".writing-card").count(), 1);
  assert.equal(
    await p.locator(".writing-card").getAttribute("data-writing"),
    "w15",
  );
  await p.locator("#writing-status").selectOption("draft");
  await p.getByRole("heading", { name: "没有匹配的写作练习" }).waitFor();
  await p.getByRole("button", { name: "清除筛选" }).tap();
  assert.equal(await p.locator(".writing-card").count(), 20);
  await p.locator("#writing-search").fill("<img src=x onerror=alert(1)>");
  assert.equal(await p.locator("#writing-results img").count(), 0);
  await p.getByRole("button", { name: "清除筛选" }).tap();
  await p.goto(base + "/#write/w15");
  await p.locator("#draft").fill("共同点：核验、登记、协调。");
  await p.locator("[data-check]").first().check();
  await p.getByRole("link", { name: /同一材料：为什么不宜只留一种方式/ }).tap();
  await p
    .getByRole("heading", {
      name: "同一材料：为什么不宜只留一种方式",
      exact: true,
    })
    .waitFor();
  assert.equal(await p.locator("#draft").inputValue(), "");
  assert.equal(await p.locator("[data-check]").first().isChecked(), false);
  await p.locator("#draft").fill("差异条件需要保留，不直接评选优劣。");
  await p.reload();
  assert.match(await p.locator("#draft").inputValue(), /差异条件/);
  await p.getByRole("link", { name: /固定窗口与预约上门怎样比较/ }).tap();
  await p
    .getByRole("heading", { name: "固定窗口与预约上门怎样比较", exact: true })
    .waitFor();
  assert.match(await p.locator("#draft").inputValue(), /共同点/);
  assert.equal(await p.locator("[data-check]").first().isChecked(), true);
  await p.goto(base + "/#writing");
  await p.locator("#writing-status").selectOption("draft");
  assert.equal(await p.locator(".writing-card").count(), 2);
  console.log(
    "PASS Task/search/draft intersection, empty-state reset and separately persisted answers to shared material",
  );
  await p.goto(base + "/#settings");
  const saved = await p.evaluate(() =>
      JSON.parse(localStorage.getItem("zhixu-study-v1")),
    ),
    download = p.waitForEvent("download");
  await p.getByRole("button", { name: "导出完整备份" }).tap();
  const f = path.join(__dirname, "../test-results/v06-backup.json");
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
    "PASS New shared-material drafts and checks survive full backup restore without migration",
  );
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 1000 });
    for (const route of [
      "writing",
      "write/w14",
      "write/w15",
      "write/w16",
      "lesson/three-set-counting",
      "lesson/cohesion-reference",
      "methods/detail-reading",
      "quiz/lesson/work-stages",
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
  await p.setViewportSize({ width: 390, height: 1000 });
  await p.locator("#writing-search").fill("预约上门");
  await p.locator("#main h1").tap();
  await p.screenshot({
    path: path.join(__dirname, "../test-results/mobile-writing-v06.png"),
    fullPage: false,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "PASS Focused lessons, method comparisons and writing at four widths with no JS errors or external content requests",
  );
  const file = path.join(__dirname, "../test-results/test-results.json"),
    results = JSON.parse(fs.readFileSync(file));
  for (const name of [
    "v06 independent answer and source audit",
    "Writing filters and linked-task persistence",
    "v06 backup compatibility",
    "v06 responsive and privacy regression",
  ])
    results.tests.push({ name, status: "passed" });
  results.tests = [...new Map(results.tests.map((x) => [x.name, x])).values()];
  fs.writeFileSync(file, JSON.stringify(results, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
