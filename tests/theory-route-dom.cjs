"use strict";
// Actual application DOM execution; no browser pixels, mobile layout or native download claims.
const { installSerialLocks, assertV2Snapshot, assertEmptySnapshot, assertRestored, withoutRevision } = require("./progress-dom-support.cjs");
const {JSDOM,VirtualConsole}=require('jsdom'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8'),errors=[],outgoing=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://study.example/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
installSerialLocks(w);
w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.confirm=()=>true;w.fetch=(...a)=>{outgoing.push(a);throw Error('Unexpected outgoing request');};
let exported;w.Blob=Blob;w.File=File;w.URL.createObjectURL=b=>{exported=b;return 'blob:theory-test';};w.URL.revokeObjectURL=()=>{};
const originalClick=w.HTMLAnchorElement.prototype.click;w.HTMLAnchorElement.prototype.click=function(){if(!this.download)originalClick.call(this);};
const old={schemaVersion:1,exam:'fujian',read:['logic'],favorites:['logic'],notes:{logic:'测试旧逻辑笔记','practice-cognition':'测试实践笔记','contradiction-method':'测试矛盾笔记','productive-relations':'测试生产关系笔记','mao-thought-context':'测试思想背景笔记'},attempts:[{qid:'q07',choice:0,at:'2026-11-04T12:00:00Z',seconds:10}],drafts:{w47:'测试保留旧文章草稿'},checks:{w47:[0,2]}};
const legacyRaw=JSON.stringify(old);w.localStorage.setItem('zhixu-study-v1',legacyRaw);for(const m of html.matchAll(/src="\.\/([^\"]+)"/g))w.eval(fs.readFileSync(path.join(root,'docs',m[1]),'utf8'));
const C=w.STUDY_CONTENT,pause=()=>new Promise(r=>setTimeout(r,10)),plain=x=>JSON.parse(JSON.stringify(x));
async function navigate(action){const moved=new Promise((resolve,reject)=>{let timer;const done=()=>{clearTimeout(timer);resolve();};w.addEventListener('hashchange',done,{once:true});timer=setTimeout(()=>{w.removeEventListener('hashchange',done);reject(Error('Expected hash navigation'));},1500);});action();await moved;await pause();}
async function route(h){if(w.location.hash===h){await pause();return;}await navigate(()=>{w.location.hash=h;});}
async function click(sel){const e=d.querySelector(sel);assert.ok(e,sel);if(e.tagName==='A'&&e.hash&&e.hash!==w.location.hash)await navigate(()=>e.click());else{e.click();await pause();}}
(async()=>{
 const expectedIds=['practice-cognition','contradiction-method','productive-relations','mao-thought-context','social-being-people','mao-living-soul','six-method-principles','new-quality-productivity','reform-framework-2024','unified-market-rules','new-development-pattern','education-strong-2035'];
 assert.deepEqual(plain(C.theoryTrack.steps.map(step=>step.lessonId)),plain(w.STUDY_POLITICAL_CURRICULUM.lessonIds));
 assert.equal(d.querySelectorAll('[data-study-routes] a').length,4);await click('[data-study-routes] a[href="#theory"]');assert.equal(w.location.hash,'#theory');assert.equal(d.querySelector('#page-title').textContent,'政治理论入门');assert.equal(d.querySelector('#navigation .active').getAttribute('href'),'#course');
 assert.equal(d.querySelectorAll('[data-theory-lesson]').length,35);assert.equal(d.querySelector('h1').textContent,C.theoryTrack.title);assert.ok(d.querySelector('main').textContent.includes('已标记已读 0 / 35'));
 for(const step of C.theoryTrack.steps){const panel=d.querySelector('[data-theory-lesson="'+step.lessonId+'"]');assert.ok(!panel.querySelector('.stat-foot').textContent.includes('。。'),'version notice ends in one full stop');for(const level of ['intro','practice','advanced'])assert.ok(panel.querySelector('a[href="#lesson/'+step.lessonId+'/'+level+'"]'));assert.ok(panel.querySelector('a[href="#quiz/lesson/'+step.lessonId+'"]'));}
 for(const id of expectedIds.slice(4))for(const level of ['intro','practice','advanced']){
  const lesson=C.lessons.find(item=>item.id===id),group=lesson.learningLevels[level];
  await click('[data-theory-lesson="'+id+'"] a[href="#lesson/'+id+'/'+level+'"]');
  assert.equal(d.querySelector('.reading h1').textContent,lesson.title);assert.ok(d.querySelector('[data-theory-aids="'+id+'"]'));
  const practice=d.querySelector('.level-guide a[href^="#quiz/"]');assert.ok(practice,id+':'+level);
  assert.deepEqual(practice.getAttribute('href').split('/').at(-1).split(','),plain(group.questionIds));
  await click('.level-guide a[href^="#quiz/"]');assert.match(d.querySelector('.quiz-header').textContent,/1 \/ 2/);
  await route('#theory');assert.ok(d.querySelector('main').textContent.includes('已标记已读 0 / 35'));
 }
 await click('a[href="#lesson/practice-cognition/intro"]');assert.equal(d.querySelector('#lesson-note').value,old.notes['practice-cognition']);await click('[data-action="read"][data-id="practice-cognition"]');await click('a[href="#theory"]');assert.ok(d.querySelector('main').textContent.includes('已标记已读 1 / 35'));
 await route('#lesson/practice-cognition/intro');await click('a[href="#theory"]');assert.ok(d.querySelector('main').textContent.includes('已标记已读 1 / 35'));
 await route('#lesson/practice-cognition/intro');await click('[data-action="read"][data-id="practice-cognition"]');await click('a[href="#theory"]');assert.ok(d.querySelector('main').textContent.includes('已标记已读 0 / 35'));
 await click('a[href="#targeted"]');assert.ok(d.querySelector('#target-module'));await route('#theory');await click('a[href="#writing"]');await route('#write/w47');assert.equal(d.querySelector('#draft').value,old.drafts.w47);
 await route('#learn');assert.ok(d.querySelector('[data-study-routes] a[href="#theory"]'));assert.equal(d.querySelector('#exam').value,'fujian');
 const saved=JSON.parse(w.localStorage.getItem('zhixu-study-v2'));assertV2Snapshot(saved);assert.equal(saved.revision,2);assert.deepEqual(withoutRevision(saved),{...old,schemaVersion:2,runs:[],activeRun:null});assert.equal(w.localStorage.getItem('zhixu-study-v1'),legacyRaw);
 await route('#settings');await click('[data-action="backup"]');const data=await exported.text();const backup=JSON.parse(data);assertV2Snapshot(backup);assert.ok(Number.isFinite(Date.parse(backup.exportedAt)));delete backup.exportedAt;assert.deepEqual(backup,saved);await click('[data-action="reset"]');const reset=JSON.parse(w.localStorage.getItem('zhixu-study-v2'));assertEmptySnapshot(reset);assert.equal(reset.revision,saved.revision+1);assert.equal(w.localStorage.getItem('zhixu-study-v1'),legacyRaw);const input=d.querySelector('#import-file');Object.defineProperty(input,'files',{configurable:true,value:[new w.File([data],'synthetic-theory-backup.json',{type:'application/json'})]});input.dispatchEvent(new w.Event('change',{bubbles:true}));await pause();await pause();assertRestored(JSON.parse(w.localStorage.getItem('zhixu-study-v2')),saved,reset.revision);assert.equal(w.localStorage.getItem('zhixu-study-v1'),legacyRaw);
 console.log('PASS Theory route: 32 ordered themes, 96 level links, eighteen exact post-foundation lesson-to-quiz paths, both study lines, repeated read/back/toggle flows and v1-source preservation with exact v2 restore');
 const track=C.theoryTrack;track.title='<m>理论 & "边界"';track.intro='<img src=x onerror=alert(1)>只作文字';track.scope='a<b 且 b>0';track.steps[0].purpose='<script>not executed</script>';track.steps[0].bridge='<svg onload=alert(1)>';track.reflection[0]='<em>文字</em>';track.gaps[0]='0≤r<m';await route('#theory');
 assert.equal(d.querySelector('h1').textContent,track.title);assert.ok(d.querySelector('main').textContent.includes(track.intro));assert.ok(d.querySelector('main').textContent.includes(track.scope));assert.ok(d.querySelector('main').textContent.includes(track.steps[0].purpose));assert.ok(d.querySelector('main').textContent.includes(track.steps[0].bridge));assert.ok(d.querySelector('main').textContent.includes(track.reflection[0]));assert.ok(d.querySelector('main').textContent.includes(track.gaps[0]));assert.equal(d.querySelectorAll('main img,main script,main [onerror],main [onload],main m').length,0);
 assert.deepEqual(errors,[]);assert.deepEqual(outgoing,[]);assert.equal(w.localStorage.getItem('zhixu-study-v1'),legacyRaw);assertRestored(JSON.parse(w.localStorage.getItem('zhixu-study-v2')),saved,reset.revision);
 console.log('PASS Theory text escaping, no automatic read marking or outgoing requests; NOT TESTED real browser, phone or touch');dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exit(1);});
