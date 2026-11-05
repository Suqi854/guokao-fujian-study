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
  const data = await p.evaluate(() => window.STUDY_CONTENT);
  const qs = Object.fromEntries(data.questions.map((q) => [q.id, q]));
  // Reconstruct normals from neighboring net cells, independently of the app's opposite lookup.
  const cells = {
    A: [1, 0],
    B: [0, 1],
    C: [1, 1],
    D: [2, 1],
    E: [1, 2],
    F: [1, 3],
  };
  const frames = {
    C: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
  };
  const pending = ["C"];
  const neg = (v) => v.map((n) => -n),
    dot = (a, b) => a.reduce((v, n, i) => v + n * b[i], 0);
  while (pending.length) {
    const from = pending.shift(),
      [u, v, n] = frames[from];
    for (const [to, [x, y]] of Object.entries(cells)) {
      if (frames[to]) continue;
      const dx = x - cells[from][0],
        dy = y - cells[from][1];
      if (Math.abs(dx) + Math.abs(dy) !== 1) continue;
      frames[to] =
        dx === 1
          ? [neg(n), v, u]
          : dx === -1
            ? [n, v, neg(u)]
            : dy === 1
              ? [u, neg(n), v]
              : [u, n, neg(v)];
      pending.push(to);
    }
  }
  assert.equal(
    new Set(Object.values(frames).map((f) => f[2].join(","))).size,
    6,
  );
  assert.equal(
    qs.q64.options.findIndex((x) => dot(frames.C[2], frames[x][2]) === -1),
    qs.q64.answer,
  );
  const canMeet = (triple) =>
    triple.every((a, i) =>
      triple.slice(i + 1).every((b) => dot(frames[a][2], frames[b][2]) === 0),
    );
  const candidates = qs.q65.options.map((x) => x.split("、")).map(canMeet);
  assert.equal(candidates.filter(Boolean).length, 1);
  assert.equal(candidates.indexOf(true), qs.q65.answer);
  const rotations = [
    ["A", "C"],
    ["B", "D"],
    ["C", "E"],
    ["D", "F"],
  ].map(([a, b]) => dot(frames[a][2], frames[b][2]) === -1);
  assert.equal(rotations.indexOf(true), qs.q66.answer);
  // A voxel set separately checks projections and total blocks; no app data is reused here.
  const voxels = [];
  [
    [2, 1, 0],
    [1, 3, 1],
  ].forEach((row, y) =>
    row.forEach((h, x) => {
      for (let z = 0; z < h; z++) voxels.push([x, y, z]);
    }),
  );
  const front = [0, 1, 2].map((x) =>
    Math.max(...voxels.filter((v) => v[0] === x).map((v) => v[2] + 1)),
  );
  assert.equal(qs.q67.options[qs.q67.answer], front.join("、"));
  assert.equal(
    parseFloat(qs.q68.options[qs.q68.answer]),
    new Set(voxels.map(([x, y]) => `${x},${y}`)).size,
  );
  assert.equal(parseFloat(qs.q69.options[qs.q69.answer]), voxels.length);
  const value = (id) => parseFloat(qs[id].options[qs[id].answer]);
  const ratio = qs.q76.options[qs.q76.answer].split("∶").map(Number);
  assert.equal(ratio[0] / ratio[1], (2 / 3) ** 2);
  // Enumerate unit grid cells outside the original rectangle instead of reusing area-difference expression.
  let walkway = 0;
  for (let x = -1; x < 13; x++)
    for (let y = -1; y < 9; y++)
      if (x < 0 || x >= 12 || y < 0 || y >= 8) walkway++;
  assert.equal(value("q77"), walkway);
  assert.equal(value("q78"), 6 ** 3 / 2 ** 3);
  assert.ok(Math.abs(value("q79") - ((80 * 1.5 * 0.8) / 80 - 1) * 100) < 1e-10);
  const cost1 = Array.from({ length: 200 }, (_, i) => i + 1).find(
    (n) => n * 1.2 === 120,
  );
  const cost2 = Array.from({ length: 200 }, (_, i) => i + 1).find(
    (n) => n * 0.8 === 120,
  );
  assert.equal(qs.q80.options[qs.q80.answer], `亏损${cost1 + cost2 - 240}元`);
  assert.equal(qs.q81.options[qs.q81.answer], "八折");
  assert.equal(1.25 * 0.8, 1);
  assert.equal(value("q82"), (100 * 0.2) / 0.1 - 100);
  assert.equal(value("q83"), ((100 * 0.1 + 200 * 0.25) / (100 + 200)) * 100);
  assert.ok(Math.abs(value("q84") - ((200 * 0.1) / (200 - 50)) * 100) < 0.005);
  console.log(
    "PASS Independent cube folding, voxel projections and nine numerical answers",
  );
  for (const q of data.questions) {
    assert.equal(q.meta.source.kind, "original");
    assert.equal(q.meta.examSource.year, null);
    assert.equal(q.meta.difficulty.level, null);
    assert.equal(q.meta.rights.status, "original");
    for (const m of q.meta.methodIds)
      assert.ok(data.methods.find((x) => x.id === m));
  }
  assert.equal(data.methods.length, 17);
  assert.ok(
    data.methods.every(
      (x) => x.checked && x.date && x.url.startsWith("https://"),
    ),
  );
  console.log("PASS Provenance, unknown difficulty/year and method references");
  await p.goto(base + "/#lesson/cube-net");
  await p.getByRole("button", { name: "A 面", exact: true }).tap();
  assert.match(
    await p.locator(".diagram-caption").textContent(),
    /A 面.*E 面.*B、C、D、F/,
  );
  await p.locator("#lesson-note").fill("折叠测试笔记");
  await p.getByRole("button", { name: "换一个观察方向" }).tap();
  await p
    .getByRole("img", {
      name: "折叠示意：上A，左侧可见F，右侧可见B；只标记面，不表示字母朝向",
      exact: true,
    })
    .waitFor();
  assert.equal(await p.locator("#lesson-note").inputValue(), "折叠测试笔记");
  await p.goto(base + "/#lesson/solid-views");
  assert.equal(await p.locator(".projection-figure rect").count(), 6);
  await p.getByRole("button", { name: "俯视", exact: true }).tap();
  assert.equal(await p.locator(".projection-figure rect").count(), 5);
  await p.getByRole("button", { name: "侧视", exact: true }).tap();
  assert.equal(await p.locator(".projection-figure rect").count(), 5);
  console.log(
    "PASS Touch net selection, view switching, projections and note retention",
  );
  await p.goto(base + "/#bank");
  assert.match(
    await p.locator("#bank-results [role=status]").textContent(),
    /213/,
  );
  assert.equal(await p.locator(".bank-question").count(), 12);
  await p.getByRole("button", { name: "下一页", exact: true }).tap();
  assert.match(await p.locator(".bank-question").first().textContent(), /Q13/);
  await p.getByRole("button", { name: "清除筛选", exact: true }).tap();
  await p.locator("#bank-module").selectOption("数量关系");
  await p.locator("#bank-type").selectOption("浓度问题");
  await p.locator(".bank-advanced summary").tap();
  await p.locator("#bank-knowledge").selectOption("mixture");
  await p.locator("#bank-year").selectOption("none");
  await p.locator("#bank-difficulty").selectOption("unrated");
  assert.equal(await p.locator(".bank-question").count(), 3);
  await p.getByRole("link", { name: "练习筛选结果", exact: true }).tap();
  await p.reload();
  assert.match(await p.locator(".quiz-header").textContent(), /1 \/ 3/);
  assert.match(await p.locator(".quiz-card h1").textContent(), /100克/);
  await p.locator(".option").first().tap();
  await p.getByRole("button", { name: "提交答案" }).tap();
  await p.goto(base + "/#bank");
  await p.getByRole("button", { name: "清除筛选", exact: true }).tap();
  await p.locator(".bank-advanced summary").tap();
  await p.locator("#bank-status").selectOption("wrong");
  assert.equal(await p.locator(".bank-question").count(), 1);
  assert.match(await p.locator(".bank-question").textContent(), /Q82/);
  await p.getByRole("button", { name: "清除筛选", exact: true }).tap();
  await p.locator(".bank-advanced summary").tap();
  await p.locator("#bank-origin").selectOption("national");
  assert.equal(await p.locator(".bank-question").count(), 0);
  await p.getByRole("heading", { name: "暂时没有匹配的题目" }).waitFor();
  await p.locator("#bank-origin").selectOption("fujian");
  assert.equal(await p.locator(".bank-question").count(), 0);
  await p.getByRole("button", { name: "清除筛选", exact: true }).first().tap();
  await p.locator(".bank-advanced summary").tap();
  await p.locator("#bank-target").selectOption("national");
  assert.match(
    await p.locator("#bank-results [role=status]").textContent(),
    /211/,
  );
  await p.locator("#bank-target").selectOption("fujian");
  assert.match(
    await p.locator("#bank-results [role=status]").textContent(),
    /213/,
  );
  await p.locator("#bank-search").fill("q64");
  assert.equal(await p.locator(".bank-question").count(), 1);
  await p.locator("#bank-search").fill("<script>alert(1)</script>");
  assert.equal(await p.locator(".bank-question").count(), 0);
  assert.equal(await p.locator("main script").count(), 0);
  console.log(
    "PASS Combined filters, pagination, reloadable practice URL, wrong-only, honest empty true-exam source and safe search",
  );
  for (const width of [360, 390, 768, 1440]) {
    await p.setViewportSize({ width, height: 900 });
    for (const route of [
      "bank",
      "methods",
      "lesson/cube-net",
      "lesson/solid-views",
      "quiz/one/q64",
      "quiz/one/q67",
      "write/w07",
      "write/w08",
    ]) {
      await p.goto(base + "/#" + route);
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${width}: ${route}`,
      );
    }
  }
  await p.goto(base + "/#methods");
  assert.equal(await p.locator(".method-card").count(), 17);
  await p.locator("details.roadmap").last().locator("summary").tap();
  await p.getByText("尚未核实教师职务", { exact: false }).waitFor();
  console.log("PASS Spatial, bank, method and writing pages at four widths");
  for (const id of ["w07", "w08"]) {
    await p.goto(base + "/#write/" + id);
    await p.locator("#draft").fill("测试新训练草稿");
    await p.reload();
    assert.equal(await p.locator("#draft").inputValue(), "测试新训练草稿");
  }
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "PASS New drafts persist; no JS errors or outbound learning data",
  );
  const file = path.join(__dirname, "..", "test-results", "test-results.json");
  const results = JSON.parse(fs.readFileSync(file));
  for (const name of [
    "Independent cube/voxel/numerical audit",
    "Honest question provenance and method references",
    "Spatial demo touch and notes",
    "Searchable bank and filtered practice",
    "New pages at four widths",
    "New drafts and privacy regression",
  ])
    results.tests.push({ name, status: "passed" });
  results.tests = [...new Map(results.tests.map((t) => [t.name, t])).values()];
  fs.writeFileSync(file, JSON.stringify(results, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
