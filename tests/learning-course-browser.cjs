'use strict';
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const errors = [], outgoing = [], base = process.env.STUDY_BASE_URL || 'http://127.0.0.1:4178/';
  for (const width of [320, 375, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width < 700 ? 844 : 950 }, deviceScaleFactor: 1, hasTouch: width < 700, isMobile: width < 700 });
    const page = await context.newPage(); page.on('pageerror', e => errors.push(e.message)); page.on('request', r => { if (!r.url().startsWith(base)) outgoing.push(r.url()); });
    await page.goto(base + '#course/data/intro'); await page.locator('[data-course-overview]').waitFor();
    async function checkWidth(label) {
      const sizes = await page.evaluate(() => ({ actual: document.documentElement.scrollWidth, viewport: window.innerWidth }));
      assert.ok(sizes.actual <= sizes.viewport + 1, `${width} ${label}: ${JSON.stringify(sizes)}`);
    }
    await checkWidth('overview');
    assert.equal(await page.locator('.course-unit[open]').count(), 1);
    if (width === 390 || width === 1440) await page.screenshot({ path: path.join(__dirname, `../test-results/course-${width}-overview.png`), fullPage: true });
    await page.locator('.course-unit li a').first().click(); await page.locator('[data-course-reader=growth]').waitFor();
    await checkWidth('reader');
    await page.locator('.course-connection summary').click();
    if (width === 390 || width === 1440) await page.screenshot({ path: path.join(__dirname, `../test-results/course-${width}-reader.png`), fullPage: true });
    await page.locator('.course-reader > .course-reading-nav [rel=next]').click(); await page.locator('[data-course-reader=rate-amount-order]').waitFor();
    await page.goBack(); await page.locator('[data-course-reader=growth]').waitFor();
    await page.goForward(); await page.locator('[data-course-reader=rate-amount-order]').waitFor();
    await page.locator('.course-jump summary').click();
    await page.locator('[aria-label="选择学习轮次"]').selectOption('#course/data/practice/rate-amount-order');
    await page.waitForURL('**/#course/data/practice/rate-amount-order');
    await page.locator('.course-jump summary').click();
    await page.locator('[aria-label="跳到指定课程"]').selectOption('#course/data/practice/multi-table');
    await page.locator('[data-course-reader=multi-table]').waitFor(); await checkWidth('long title');
    await page.locator('.level-guide a[href^="#quiz/"]').click(); await page.locator('.quiz-card').waitFor();
    assert.equal(await page.locator('.course-training-return').getAttribute('href'), '#course/data/practice/multi-table');
    await page.reload(); await page.locator('.course-training-return').waitFor();
    await page.locator('.course-training-return').click(); await page.locator('[data-course-reader=multi-table]').waitFor();
    await page.locator('.course-jump summary').click();
    await page.locator('[aria-label="选择学习科目"]').selectOption('#course/writing/practice');
    await page.locator('[data-course-overview=writing]').waitFor(); await checkWidth('writing overview');
    await page.locator('.course-unit li a').first().click(); await page.locator('[data-course-reader=material-mapping]').waitFor();
    await page.locator('.level-guide a[href^="#write/"]').first().click(); await page.locator('#draft').waitFor();
    await page.locator('#draft').fill('合成验收草稿，不是真实用户材料。'); await page.locator('#draft').blur();
    await page.reload(); await page.locator('#draft').waitFor(); assert.equal(await page.locator('#draft').inputValue(), '合成验收草稿，不是真实用户材料。');
    await page.locator('.course-training-return').click(); await page.locator('[data-course-reader=material-mapping]').waitFor(); await checkWidth('writing reader');
    await page.goto(base + '#course/general/advanced/history-periods'); await page.locator('.course-level-warning').waitFor(); await checkWidth('unlayered');
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('zhixu-study-v2')).read.length), 0);
    await context.close();
  }
  assert.deepEqual(errors, []); assert.deepEqual(outgoing, []); await browser.close();
  console.log('PASS real headless Chromium: 320/375/390/768/1440 widths, no horizontal overflow; chapter open, previous/next, Back/Forward, stage/subject/lesson select, quiz return after reload, writing draft persistence, unlayered disclosure, zero invented read state. Not physical iOS/Android or keyboard validation.');
})().catch(e => { console.error(e); process.exit(1); });
