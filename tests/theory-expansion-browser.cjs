'use strict';
const { chromium } = require('playwright');
const fs = require('fs'), assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:1050}}), errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4187/#course/politics/topic/historical-materialism');
 await page.waitForSelector('[data-original-topic="historical-materialism"]');
 await page.locator('[data-original-topic]').scrollIntoViewIfNeeded();
 await page.screenshot({path:'evidence/theory-history-desktop.png'});
 const ids=await page.evaluate(()=>Object.keys(window.STUDY_THEORY_ORIGINALS.data));
 assert.equal(ids.length,13);
 const report=[];
 for(const width of [1440,390]){
   await page.setViewportSize({width,height:1050});
   for(const id of ids){
     await page.goto('http://127.0.0.1:4187/#course/politics/topic/'+id);
     await page.waitForSelector('[data-original-topic="'+id+'"]');
     const quotes=await page.locator('[data-original-quote]').allTextContents();
     const expected=await page.evaluate(id=>window.STUDY_THEORY_ORIGINALS.data[id].excerpts.map(x=>x.text),id);
     assert.deepEqual(quotes,expected);
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,id+' horizontal overflow at '+width);
     const answers=await page.evaluate(id=>window.STUDY_THEORY_ORIGINALS.data[id].blanks,id);
     await page.locator('[data-original-action="quiz"]').click();
     for(let n=0;n<answers.length;n++)await page.locator('[data-original-input="'+n+'"]').fill(answers[n]);
     await page.locator('[data-original-form] [type="submit"]').click();
     assert.equal(await page.locator('.original-exact').count(),answers.length);
     await page.locator('[data-original-action="read"]').click();
     report.push({topic:id,width,quotes:quotes.length,blanks:answers.length,overflow:false});
   }
 }
 await page.goto('http://127.0.0.1:4187/#course/politics/topic/education-policy');
 await page.locator('[data-original-topic]').scrollIntoViewIfNeeded();
 await page.screenshot({path:'evidence/theory-education-narrow.png'});
 await page.setViewportSize({width:1440,height:1050});
 await page.goto('http://127.0.0.1:4187/#course/politics/topic/national-report');
 await page.locator('[data-original-topic]').scrollIntoViewIfNeeded();
 await page.screenshot({path:'evidence/theory-report-desktop.png'});
 await page.locator('[data-original-action="quiz"]').click();
 await page.locator('[data-original-input="0"]').fill('更加积极');
 await page.locator('[data-original-input="1"]').fill('宽松');
 await page.locator('[data-original-form] [type="submit"]').click();
 assert.equal(await page.locator('.original-exact').count(),1);assert.equal(await page.locator('.original-different').count(),1);
 await page.screenshot({path:'evidence/theory-report-fill.png'});
 assert.deepEqual(errors,[]);fs.writeFileSync('evidence/browser-report.json',JSON.stringify({browser:'system Chromium headless, local candidate only',report,errors},null,2));
 await browser.close();console.log('PASS browser: 13 topics x desktop/narrow, 28 original blanks, all quotes exact, no horizontal overflow or page errors; screenshots saved.');
})().catch(e=>{console.error(e);process.exitCode=1});
