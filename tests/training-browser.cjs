"use strict";
// Prepared browser acceptance suite. Run only where system Chromium is permitted.
// This file being present or syntax-valid is NOT evidence the browser cases ran.
const {chromium}=require('@playwright/test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {readPageProgress}=require('./progress-dom-support.cjs');
const base=(process.env.STUDY_BASE_URL||'http://127.0.0.1:4173').replace(/\/$/,''),out=path.join(__dirname,'../test-results');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,acceptDownloads:true}),page=await ctx.newPage(),errors=[],external=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(base))external.push(r.url());});
 try{
  await page.goto(base+'/#training/ids/q01,q02');
  assert.equal(await page.evaluate(()=>typeof navigator.locks?.request),'function','requires actual browser Web Locks, not a fallback');
  await page.locator('#run-budget').fill('1');await page.locator('[data-action="run-start"]').tap();
  await page.waitForURL('**/#quiz/timed/*');const first=await readPageProgress(page),id=first.activeRun.id;
  assert.deepEqual(first.activeRun.items.map(i=>i.qid),['q01','q02']);
  await page.waitForTimeout(1100);await page.locator('[data-action="run-pause"]').tap();
  const paused=await readPageProgress(page);assert.ok(paused.activeRun.elapsedMs>=1000);assert.equal(paused.activeRun.status,'paused');
  await page.reload();assert.equal((await readPageProgress(page)).activeRun.elapsedMs,paused.activeRun.elapsedMs);
  await page.locator('[data-action="run-resume"]').tap();
  await page.locator('[data-action="run-choose"][data-id="'+first.activeRun.items[0].answer+'"]').tap();
  await page.locator('[data-action="run-submit"]').tap();await page.locator('.feedback').waitFor();
  await page.locator('[data-action="run-next"]').tap();await page.locator('[data-action="run-skip"]').tap();
  await page.waitForURL('**/#training/run/'+id);const ended=await readPageProgress(page);
  assert.equal(ended.activeRun,null);assert.equal(ended.attempts.length,1);assert.equal(ended.runs.length,1);
  const summary=await page.evaluate(r=>window.STUDY_TRAINING.choiceSummary(r),ended.runs[0]);
  assert.equal(summary.total.correct,1);assert.equal(summary.total.wrong,0);assert.equal(summary.total.unsubmitted,1);
  assert.equal(summary.total.spentMs,ended.runs[0].elapsedMs);
  for(const route of ['training','write/w01','lesson/practice-cognition/intro']){
   await page.goto(base+'/#'+route);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'390px '+route);
  }
  await page.locator('[data-theory-recall] > summary').tap();assert.equal(await page.locator('[data-theory-recall]').getAttribute('open'),'');
  const a=await ctx.newPage(),b=await ctx.newPage();await a.goto(base+'/#lesson/logic');await b.goto(base+'/#lesson/logic');
  await a.locator('#lesson-note').fill('synthetic tab A retained');
  await a.locator('#note-status').filter({hasText:'已保存到本机'}).waitFor();const diskA=await readPageProgress(a);
  await b.locator('#lesson-note').fill('synthetic tab B unsaved copy');
  await b.locator('#storage-save-error').filter({hasText:/其他标签页/}).waitFor();
  assert.deepEqual(await b.evaluate(()=>JSON.parse(localStorage.getItem('zhixu-study-v2'))),diskA,'stale tab cannot overwrite A');
  await b.evaluate(()=>{location.hash='#settings';});await b.locator('[data-action="backup"]').waitFor();const download=b.waitForEvent('download');await b.locator('[data-action="backup"]').tap();
  fs.mkdirSync(out,{recursive:true});const f=path.join(out,'synthetic-v030-stale-tab-backup.json');await(await download).saveAs(f);
  assert.equal(JSON.parse(fs.readFileSync(f)).notes.logic,'synthetic tab B unsaved copy','conflicting page can export its own unsaved text');fs.unlinkSync(f);
  await a.close();await b.close();
  const old={schemaVersion:1,exam:'fujian',read:['logic'],favorites:[],notes:{logic:'synthetic original v1'},attempts:[],drafts:{w01:'synthetic legacy draft'},checks:{w01:[0]}},raw=JSON.stringify(old);
  const legacyCtx=await browser.newContext({viewport:{width:1280,height:900}});
  await legacyCtx.addInitScript(raw=>{if(localStorage.getItem('zhixu-study-v1')===null&&localStorage.getItem('zhixu-study-v2')===null)localStorage.setItem('zhixu-study-v1',raw);},raw);
  const legacy=await legacyCtx.newPage();await legacy.goto(base+'/#lesson/logic');assert.equal(await legacy.locator('#lesson-note').inputValue(),old.notes.logic);
  assert.equal(await legacy.evaluate(()=>localStorage.getItem('zhixu-study-v2')),null);
  await legacy.locator('#lesson-note').fill('synthetic migrated note');const migrated=await readPageProgress(legacy);
  assert.equal(migrated.schemaVersion,2);assert.equal(migrated.drafts.w01,old.drafts.w01);assert.equal(await legacy.evaluate(()=>localStorage.getItem('zhixu-study-v1')),raw);
  await legacyCtx.close();assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log('PASS Real browser: native locks, touch fixed run, pause/reload, correct/skipped module totals, 390px pages, details, stale-tab protection and exact v1 preservation');
  fs.writeFileSync(path.join(out,'v030-training-browser.json'),JSON.stringify({at:new Date().toISOString(),status:'passed',limitations:['one Chromium implementation, not physical iOS/Android','no actual quota failure, background throttling or 60-second timeout test']},null,2));
 }finally{await ctx.close();await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
