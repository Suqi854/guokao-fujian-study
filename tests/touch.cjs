const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const evidence = path.join(__dirname, "..", "test-results");
fs.mkdirSync(evidence, { recursive: true });
const base = process.env.STUDY_BASE_URL || "http://127.0.0.1:4173";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const p = await ctx.newPage();
  const external = [];
  p.on("request", (r) => {
    if (!r.url().startsWith(base)) external.push(r.url());
  });
  await p.goto(base);
  await p.screenshot({
    path: path.join(evidence, "mobile-home.png"),
    fullPage: true,
  });
  await p.locator('nav a[href="#learn"]').tap();
  await p.getByRole("button", { name: "判断推理", exact: true }).tap();
  assert.equal(await p.locator(".lesson-card").count(), 10);
  await p.locator(".lesson-card h3").first().tap();
  await p.getByRole("link", { name: "练配套题" }).tap();
  await p.locator(".option").first().tap();
  await p.getByRole("button", { name: "提交答案" }).tap();
  await p.locator(".feedback").waitFor();
  await p.screenshot({
    path: path.join(evidence, "mobile-practice.png"),
    fullPage: true,
  });
  await p.locator('nav a[href="#writing"]').tap();
  await p.getByRole("link", { name: "开始写作" }).first().tap();
  await p.locator("#draft").tap();
  await p.locator("#draft").fill("先概括，再归类。");
  await p.locator("summary").tap();
  await p.locator(".reference").waitFor({ state: "visible" });
  await p.reload();
  assert.equal(await p.locator("#draft").inputValue(), "先概括，再归类。");
  assert.deepEqual(external, []);
  console.log(
    "PASS Real touch: navigation, filters, quiz, writing, reload; no outgoing content requests",
  );
  const results = JSON.parse(
    fs.readFileSync(path.join(evidence, "test-results.json")),
  );
  results.tests.push({
    name: "Mobile touch-enabled Chromium interactions and no outgoing requests",
    status: "passed",
  });
  fs.writeFileSync(
    path.join(evidence, "test-results.json"),
    JSON.stringify(results, null, 2),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
