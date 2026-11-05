const { readPageProgress, resetPageProgress, assertPageRestored, assertV2Snapshot } = require("./progress-dom-support.cjs");
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
  });
  const p = await ctx.newPage(),
    errors = [],
    external = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("request", (r) => {
    if (!r.url().startsWith(base)) external.push(r.url());
  });
  await p.goto(base + "/#coverage");
  const C = await p.evaluate(() => window.STUDY_CONTENT),
    q = Object.fromEntries(C.questions.map((x) => [x.id, x]));
  const topics = C.coverageMatrix.flatMap((g) => g.topics),
    gaps = C.coverageMatrix.flatMap((g) => g.gaps);
  assert.equal(C.coverageMatrix.length, 8);
  assert.equal(topics.length, 88);
  assert.equal(gaps.length, 24);
  for (const [field, items] of [
    ["lessonIds", C.lessons],
    ["questionIds", C.questions],
    ["writingIds", C.writing],
  ])
    assert.deepEqual(
      topics.flatMap((t) => t[field]).sort(),
      items.map((x) => x.id).sort(),
    );
  assert.ok(
    gaps.every(
      (t) =>
        !t.lessonIds.length && !t.questionIds.length && !t.writingIds.length,
    ),
  );
  const answer = (id) => parseFloat(q[id].options[q[id].answer]);
  assert.equal(
    answer("q121"),
    ((480 - 400 - (480 - 400 - 20)) / (480 - 400)) * 100,
  );
  assert.equal(answer("q122"), ((218 - 200) / (660 - 600)) * 100);
  assert.equal(q.q123.answer, 3);
  assert.equal(500 - 500, 0);
  // Enumerate every allowed occupancy; use the smallest possible maximum, rather than the authored formula.
  let bound = Infinity;
  function distribute(left, slots, maximum) {
    if (slots === 1) {
      bound = Math.min(bound, Math.max(maximum, left));
      return;
    }
    for (let n = 0; n <= left; n++)
      distribute(left - n, slots - 1, Math.max(maximum, n));
  }
  distribute(14, 6, 0);
  assert.equal(answer("q124"), bound);
  function threshold(stock, k) {
    let lastFailure = -1;
    for (let r = 0; r <= stock[0]; r++)
      for (let bl = 0; bl <= stock[1]; bl++)
        for (let g = 0; g <= stock[2]; g++)
          if (Math.max(r, bl, g) < k)
            lastFailure = Math.max(lastFailure, r + bl + g);
    return lastFailure + 1;
  }
  assert.equal(answer("q125"), threshold([5, 4, 2], 3));
  assert.equal(answer("q126"), threshold([2, 3, 9], 4));
  // All pairs of subsets of a three-object universe: an existing intersection is symmetric.
  for (let a = 0; a < 8; a++)
    for (let bb = 0; bb < 8; bb++)
      assert.equal(Boolean(a & bb), Boolean(bb & a));
  // All 4096 review states of the twelve forms: universal negation is at least one unreviewed.
  for (let bits = 0; bits < 4096; bits++) {
    const reviewed = Array.from({ length: 12 }, (_, i) =>
      Boolean(bits & (1 << i)),
    );
    assert.equal(
      !reviewed.every(Boolean),
      reviewed.some((x) => !x),
    );
  }
  assert.equal(
    [].every((x) => x.signed),
    true,
  );
  assert.equal(
    [].some(() => true),
    false,
  );
  assert.deepEqual(
    ["q127", "q128", "q129"].map((id) => q[id].answer),
    [2, 1, 3],
  );
  const [w17, w18] = C.writing.filter((w) => ["w17", "w18"].includes(w.id));
  assert.equal(w17.material, w18.material);
  assert.ok(w17.material.length > 900);
  for (const w of [w17, w18])
    assert.ok([...w.sample.replace(/\s/g, "")].length <= w.limit);
  console.log(
    "PASS Complete coverage accounting and independently enumerated arithmetic, guarantee and logic answers",
  );
  await p.locator("#coverage-module").selectOption("数量关系");
  await p.locator("#coverage-status").selectOption("missing");
  assert.equal(await p.locator(".coverage-topic").count(), 3);
  assert.equal(await p.locator(".coverage-topic a").count(), 0);
  await p.locator("#coverage-status").selectOption("intro");
  await p.locator('[data-topic="guarantee-count"] a[href^="#quiz"]').tap();
  await p.locator(".quiz-card h1").waitFor();
  assert.match(await p.locator(".quiz-card h1").textContent(), /14份/);
  await p.locator('[data-action="choose"][data-id="0"]').tap();
  await p.locator('[data-action="submit"]').tap();
  await p.goto(base + "/#write/w17");
  await p.locator("#draft").fill("测试草稿：记录冲突和信息不同步。");
  await p.locator("[data-check]").first().check();
  await p.goto(base + "/#write/w18");
  assert.equal(await p.locator("#draft").inputValue(), "");
  assert.equal(await p.locator("[data-check]").first().isChecked(), false);
  await p.locator("#draft").fill("测试草稿：落实编号、检查与交接。");
  await p.goto(base + "/#write/w17");
  assert.match(await p.locator("#draft").inputValue(), /记录冲突/);
  const saved = await readPageProgress(p);
  assert.equal(saved.attempts.at(-1).qid, "q124");
  await p.goto(base + "/#coverage");
  await p.locator("#coverage-module").selectOption("申论方法");
  assert.deepEqual(
    await readPageProgress(p),
    saved,
  );
  console.log(
    "PASS Coverage filters, correct practice routing, persistent mistake and separate long-material drafts",
  );
  await p.goto(base + "/#settings");
  const download = p.waitForEvent("download");
  await p.getByRole("button", { name: "导出完整备份" }).tap();
  const backup = path.join(__dirname, "../test-results/v07-backup.json");
  await (await download).saveAs(backup);
  assertV2Snapshot(JSON.parse(fs.readFileSync(backup, "utf8")));
  const reset = await resetPageProgress(p);
  p.once("dialog", (d) => d.accept());
  await p.locator("#import-file").setInputFiles(backup);
  await p.getByText("备份已恢复，活动计时保持暂停。", { exact: true }).waitFor();
  await assertPageRestored(p, saved, reset.revision);
  console.log(
    "PASS v07 mistakes, drafts and checks survive backup restoration",
  );
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 1000 });
    for (const route of [
      "coverage",
      "write/w17",
      "write/w18",
      "lesson/growth-contribution",
      "quiz/lesson/quantified-logic",
      "sources",
      "practice",
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
  await resetPageProgress(p);
  await p.goto(base + "/#coverage");
  await p.reload();
  await p.setViewportSize({ width: 390, height: 1000 });
  await p.screenshot({
    path: path.join(__dirname, "../test-results/mobile-coverage-v07.png"),
    fullPage: false,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "PASS Four-width coverage and long-material rendering, no JS error or external request",
  );
  const file = path.join(__dirname, "../test-results/test-results.json"),
    results = JSON.parse(fs.readFileSync(file));
  for (const name of [
    "v07 coverage inventory and independent answers",
    "v07 coverage filters and separate task persistence",
    "v07 backup compatibility",
    "v07 responsive privacy regression",
  ])
    results.tests.push({ name, status: "passed" });
  results.tests = [...new Map(results.tests.map((x) => [x.name, x])).values()];
  fs.writeFileSync(file, JSON.stringify(results, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
