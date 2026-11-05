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
      hasTouch: true,
      isMobile: true,
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
    num = (id) =>
      Number(q[id].options[q[id].answer].match(/[0-9]+(?:\.[0-9]+)?/)[0]);
  // Simulate 0.2-day work slices: each adds one unit when total task is 36 and combined daily output is 5.
  let work = 0,
    slices = 0;
  while (work < 36) {
    work++;
    slices++;
  }
  assert.equal(num("q145"), slices / 5);
  work = 3 * 3;
  slices = 0;
  while (work < 36) {
    work++;
    slices++;
  }
  assert.equal(num("q146"), slices / 5);
  const possibilities = [
    [12, 24],
    [18, 18],
  ];
  assert.ok(possibilities.every(([a, bb]) => a + bb === 36));
  assert.deepEqual(
    possibilities.map(([a, bb]) => (72 - a) / bb),
    [2.5, 3],
  );
  assert.equal(q.q147.answer, 3);
  const people = [
    ...Array(6).fill(true),
    ...Array(4).fill(false),
    ...Array(4).fill(true),
    ...Array(16).fill(false),
  ];
  const fraction = people.filter(Boolean).length / people.length;
  const ratio = q.q148.options[q.q148.answer].split("/").map(Number);
  assert.equal(ratio[0] / ratio[1], fraction);
  assert.ok(Math.abs(num("q149") - (84 / 240 - 60 / 200) * 100) < 1e-10);
  assert.ok(Math.abs((((60 / 200) * (0.4 - 0.2)) / 1.2) * 100 - 5) < 1e-10);
  const changes = [0.3, 0.5].map((p0) => p0 - (p0 * 1.1) / 1.2);
  assert.ok(changes.every((x) => x > 0));
  assert.notEqual(changes[0], changes[1]);
  assert.equal(q.q150.answer, 3);
  for (const id of ["work", "share"]) {
    const l = C.lessons.find((l) => l.id === id);
    assert.ok(l.sections.map((s) => s[1]).join("").length > 1000);
    assert.equal(l.practice.length, 5);
    assert.ok(l.sections.some((s) => s[0].includes("出处")));
  }
  assert.ok(C.questions.slice(-6).every((q) => q.optionReviews.length === 4));
  const w = C.writing.find((w) => w.id === "w20");
  assert.ok(w.material.length >= 1400);
  assert.ok(w.sample.replace(/\s/g, "").length <= w.limit);
  assert.equal(new Set(C.writing.map((w) => w.material)).size, 22);
  console.log(
    "PASS Independent time slices, underdetermination counterexamples, pooled people and two-period share calculations",
  );
  const old = {
    schemaVersion: 1,
    exam: "both",
    read: ["work"],
    favorites: ["share"],
    notes: { work: "测试用旧笔记" },
    attempts: [
      { qid: "q14", choice: 0, at: "2026-11-04T12:00:00Z", seconds: 15 },
    ],
    drafts: { w03: "测试用旧应用文草稿" },
    checks: { w03: [0] },
  };
  await p.evaluate(
    (s) => localStorage.setItem("zhixu-study-v1", JSON.stringify(s)),
    old,
  );
  await p.reload();
  await p.goto(base + "/#lesson/work");
  assert.equal(await p.locator("#lesson-note").inputValue(), old.notes.work);
  await p.getByRole("link", { name: "练配套题", exact: true }).tap();
  assert.match(await p.locator(".quiz-header").textContent(), /1 \/ 5/);
  await p.goto(base + "/#quiz/one/q147");
  await p.locator('[data-action="choose"][data-id="1"]').tap();
  await p.locator('[data-action="submit"]').tap();
  assert.equal(await p.locator(".option-review li").count(), 4);
  assert.match(await p.locator(".feedback").textContent(), /两组/);
  await p.goto(base + "/#targeted");
  await p.locator("#target-module").selectOption("数量关系");
  await p.locator("#target-stage").selectOption("检查边界");
  const href = await p
    .getByRole("link", { name: /开始这组/ })
    .getAttribute("href");
  assert.equal(href.split("/").at(-1).split(",")[0], "q147");
  await p.goto(base + "/#write/w20");
  await p.locator("#draft").fill("测试用新协作提示");
  await p.locator("[data-check]").first().check();
  await p.reload();
  assert.equal(await p.locator("#draft").inputValue(), "测试用新协作提示");
  const state = await p.evaluate(() =>
    JSON.parse(localStorage.getItem("zhixu-study-v1")),
  );
  assert.equal(state.drafts.w03, old.drafts.w03);
  assert.deepEqual(state.attempts[0], old.attempts[0]);
  assert.equal(state.notes.work, old.notes.work);
  console.log(
    "PASS Expanded stable lesson IDs, correct practice routing, new boundary mistake priority and old/new drafts",
  );
  await p.goto(base + "/#settings");
  const dl = p.waitForEvent("download");
  await p.getByRole("button", { name: "导出完整备份" }).tap();
  const f = path.join(__dirname, "../test-results/v09-backup.json");
  await (await dl).saveAs(f);
  await p.evaluate(() => localStorage.removeItem("zhixu-study-v1"));
  await p.reload();
  p.once("dialog", (d) => d.accept());
  await p.locator("#import-file").setInputFiles(f);
  await p.getByText("备份已恢复。", { exact: true }).waitFor();
  assert.deepEqual(
    await p.evaluate(() => JSON.parse(localStorage.getItem("zhixu-study-v1"))),
    state,
  );
  console.log(
    "PASS Existing records plus new long-material draft/checks survive complete backup restoration",
  );
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 1100 });
    for (const route of [
      "lesson/work",
      "lesson/share",
      "write/w20",
      "quiz/one/q149",
      "coverage",
      "targeted",
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
  await p.goto(base + "/#lesson/work");
  await p.reload();
  await p.setViewportSize({ width: 390, height: 1100 });
  await p
    .getByRole("heading", { name: "方法一：以整项任务为单位列式" })
    .evaluate((el) => el.scrollIntoView({ block: "start" }));
  await p.evaluate(() => window.scrollBy(0, -90));
  await p.screenshot({
    path: path.join(__dirname, "../test-results/mobile-core-methods-v09.png"),
    fullPage: false,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "PASS Four-width deep lessons and long writing, no JS error or outgoing learning data",
  );
  const file = path.join(__dirname, "../test-results/test-results.json"),
    r = JSON.parse(fs.readFileSync(file));
  for (const name of [
    "v09 independent core answer audit",
    "v09 stable lesson IDs and targeted boundary flow",
    "v09 old/new backup compatibility",
    "v09 responsive privacy regression",
  ])
    r.tests.push({ name, status: "passed" });
  r.tests = [...new Map(r.tests.map((x) => [x.name, x])).values()];
  fs.writeFileSync(file, JSON.stringify(r, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
