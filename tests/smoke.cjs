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
    headless: true,
    args: ["--no-sandbox"],
  });
  const results = [];
  let page;
  async function test(name, fn) {
    await fn();
    results.push({ name, status: "passed" });
    console.log("PASS", name);
  }
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    acceptDownloads: true,
  });
  page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base);
  await test("Empty first-run dashboard", async () => {
    assert.equal(
      await page.locator(".stat-value").nth(0).innerText(),
      "0/ 15 篇",
    );
    await page.screenshot({
      path: path.join(evidence, "desktop-home.png"),
      fullPage: true,
    });
  });
  await test("Search, filtering, read progress, favorites and note persistence", async () => {
    await page.goto(base + "/#learn");
    await page.locator("#search").fill("基期");
    assert.equal(await page.locator(".lesson-card").count(), 1);
    await page.locator(".lesson-card h3").click();
    await page.getByRole("button", { name: "标记已读", exact: true }).click();
    await page.getByRole("button", { name: "收藏讲义", exact: true }).click();
    await page
      .locator("#lesson-note")
      .fill("先圈出时间与分母。<script>unsafe</script>");
    await page.reload();
    assert.equal(
      await page.locator("#lesson-note").inputValue(),
      "先圈出时间与分母。<script>unsafe</script>",
    );
    await page.getByRole("button", { name: "已读 · 点击取消" }).waitFor();
  });
  await test("Submit once, explanation, wrong collection and correction", async () => {
    await page.goto(base + "/#quiz/one/q01");
    await page.locator(".option").nth(0).click();
    await page.getByRole("button", { name: "提交答案" }).click();
    await page.locator(".feedback.wrong").waitFor();
    assert.equal(
      await page.evaluate(
        () =>
          JSON.parse(localStorage.getItem("zhixu-study-v1")).attempts.length,
      ),
      1,
    );
    await page.goto(base + "/#mistakes");
    assert.equal(await page.locator(".wrong-row").count(), 1);
    await page.getByRole("link", { name: "重新作答" }).click();
    await page.locator(".option").nth(1).click();
    await page.getByRole("button", { name: "提交答案" }).click();
    await page.getByRole("button", { name: "查看本组结果" }).click();
    await page.getByRole("heading", { name: "本次答对 1 题" }).waitFor();
    await page.goto(base + "/#mistakes");
    assert.equal(await page.locator(".wrong-row").count(), 0);
  });
  await test("Multi-question quiz completion and restart", async () => {
    await page.goto(base + "/#quiz/lesson/growth");
    for (let i = 0; i < 3; i++) {
      await page.locator(".option").nth([1, 1, 2][i]).click();
      await page.getByRole("button", { name: "提交答案" }).click();
      await page
        .getByRole("button", { name: i === 2 ? "查看本组结果" : "下一题" })
        .click();
    }
    await page.getByRole("heading", { name: "本次答对 3 题" }).waitFor();
    await page.getByRole("button", { name: "再练这组" }).click();
    assert.equal(await page.locator(".option").count(), 4);
  });
  await test("Writing autosave, word count, checklists and references", async () => {
    await page.goto(base + "/#write/w01");
    await page.locator("#draft").fill("一是延长服务时间。\n二是保留线下窗口。");
    await page.locator("[data-check]").first().check();
    await page.reload();
    assert.match(await page.locator("#draft").inputValue(), /保留线下窗口/);
    assert.equal(await page.locator("[data-check]").first().isChecked(), true);
    assert.equal(
      await page.locator("#word-count").textContent(),
      "18 / 180 字",
    );
    await page.locator("summary").click();
    await page.locator(".reference").waitFor({ state: "visible" });
    await page.locator("#draft").fill("文".repeat(181));
    assert.equal(
      await page.locator("#word-count").getAttribute("class"),
      "over-limit",
    );
  });
  let backupPath;
  await test("Backup export and lossless restore", async () => {
    await page.goto(base + "/#settings");
    const wait = page.waitForEvent("download");
    await page.getByRole("button", { name: "导出完整备份" }).click();
    const dl = await wait;
    backupPath = path.join(evidence, "test-backup.json");
    await dl.saveAs(backupPath);
    const before = JSON.parse(fs.readFileSync(backupPath));
    assert.equal(before.attempts.length, 5);
    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: "清空学习记录" }).click();
    assert.equal(
      await page.evaluate(() => localStorage.getItem("zhixu-study-v1")),
      null,
    );
    page.once("dialog", (d) => d.accept());
    await page.locator("#import-file").setInputFiles(backupPath);
    await page.getByText("备份已恢复。", { exact: true }).waitFor();
    const after = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("zhixu-study-v1")),
    );
    delete before.exportedAt;
    assert.deepEqual(after, before);
  });
  await test("Malformed import leaves records unchanged", async () => {
    const before = await page.evaluate(() =>
      localStorage.getItem("zhixu-study-v1"),
    );
    await page
      .locator("#import-file")
      .setInputFiles({
        name: "bad.json",
        mimeType: "application/json",
        buffer: Buffer.from(
          '{"schemaVersion":1,"exam":"national","read":["unknown"]}',
        ),
      });
    await page
      .locator("#import-status")
      .filter({ hasText: "导入失败" })
      .waitFor();
    assert.equal(
      await page.evaluate(() => localStorage.getItem("zhixu-study-v1")),
      before,
    );
  });
  await test("Cancel restore and reset do not change records", async () => {
    const before = await page.evaluate(() =>
      localStorage.getItem("zhixu-study-v1"),
    );
    page.once("dialog", (d) => d.dismiss());
    await page.locator("#import-file").setInputFiles(backupPath);
    await page.waitForTimeout(100);
    assert.equal(
      await page.evaluate(() => localStorage.getItem("zhixu-study-v1")),
      before,
    );
    page.once("dialog", (d) => d.dismiss());
    await page.getByRole("button", { name: "清空学习记录" }).click();
    assert.equal(
      await page.evaluate(() => localStorage.getItem("zhixu-study-v1")),
      before,
    );
  });
  await test("Invalid route safely recovers", async () => {
    await page.goto(base + "/#lesson/missing");
    await page.getByRole("heading", { name: "这个页面暂时不存在" }).waitFor();
    await page.goto(base + "/#%broken");
    await page.getByRole("heading", { name: "这个页面暂时不存在" }).waitFor();
  });
  for (const width of [360, 390, 768, 1440])
    await test(`Responsive layout ${width}px across all screens`, async () => {
      await page.setViewportSize({ width, height: 844 });
      for (const route of [
        "home",
        "learn",
        "lesson/growth",
        "practice",
        "quiz/one/q01",
        "writing",
        "write/w01",
        "mistakes",
        "settings",
      ]) {
        await page.goto(base + "/#" + route);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        );
        assert.equal(overflow, false, `${width} ${route}`);
      }
    });
  await test("Mobile navigation, quiz and writing interactions", async () => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/#home");
    await page.screenshot({
      path: path.join(evidence, "mobile-home.png"),
      fullPage: true,
    });
    await page.locator('nav a[href="#practice"]').click();
    await page.getByRole("link", { name: "开始专项练习" }).first().click();
    await page
      .locator(".option")
      .nth(1)
      .tap({ force: true })
      .catch(() => page.locator(".option").nth(1).click());
    await page.getByRole("button", { name: "提交答案" }).click();
    await page.locator(".feedback").waitFor();
    await page.screenshot({
      path: path.join(evidence, "mobile-practice.png"),
      fullPage: true,
    });
    await page.locator('nav a[href="#writing"]').click();
    await page.getByRole("link", { name: "继续写作" }).first().click();
    await page.locator("#draft").fill("手机端写作测试。");
    await page.reload();
    assert.equal(await page.locator("#draft").inputValue(), "手机端写作测试。");
  });
  await test("No JavaScript errors", async () => assert.deepEqual(errors, []));
  await ctx.close();
  const corrupt = await browser.newContext();
  await corrupt.addInitScript(() =>
    localStorage.setItem("zhixu-study-v1", "broken"),
  );
  const bad = await corrupt.newPage();
  await test("Corrupt stored data is preserved and reported", async () => {
    await bad.goto(base + "/#lesson/growth");
    await bad.locator(".storage-alert").waitFor();
    await bad.getByRole("button", { name: "标记已读" }).click();
    assert.equal(
      await bad.evaluate(() => localStorage.getItem("zhixu-study-v1")),
      "broken",
    );
  });
  await corrupt.close();
  fs.writeFileSync(
    path.join(evidence, "test-results.json"),
    JSON.stringify({ date: new Date().toISOString(), tests: results }, null, 2),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
