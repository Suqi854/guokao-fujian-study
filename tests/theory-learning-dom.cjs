"use strict";
// Application parsing and state tests only, not pixels or real browser interaction.
const {JSDOM,VirtualConsole}=require('jsdom'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8'),errors=[],vc=new VirtualConsole();
vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://study.example/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
const old={schemaVersion:1,exam:'fujian',read:[],favorites:[],notes:{'practice-cognition':'synthetic retained note'},attempts:[],drafts:{},checks:{}};
const original=JSON.stringify(old);w.localStorage.setItem('zhixu-study-v1',original);
require('./progress-dom-support.cjs').installSerialLocks(w);
for(const m of html.matchAll(/src="\.\/([^\"]+)"/g))w.eval(fs.readFileSync(path.join(root,'docs',m[1]),'utf8'));
const {navigateHash}=require('./progress-dom-support.cjs');
const C=w.STUDY_CONTENT,pause=()=>new Promise(r=>setTimeout(r,10));
async function route(h){await navigateHash(w,h,()=>{w.location.hash=h;});await pause();}
const plain=x=>JSON.parse(JSON.stringify(x));
(async()=>{
 const expectedIds=['practice-cognition','contradiction-method','productive-relations','mao-thought-context','social-being-people','six-method-principles','new-quality-productivity','reform-framework-2024','mao-living-soul','unified-market-rules','new-development-pattern','education-strong-2035','phase-change','historiography','material-mapping','answer-revision','fujian-enterprise-service-2025','multi-material','full-essay'];
 assert.deepEqual(Object.keys(C.theoryLearningAids),[...expectedIds,...w.STUDY_MAO_DENG_EXPANSION.lessonIds,...w.STUDY_MARXISM_COURSE.lessonIds]);assert.deepEqual(plain(C.theoryTrack.steps.map(step=>step.lessonId)),plain(w.STUDY_POLITICAL_CURRICULUM.lessonIds));
 for(const [id,a] of Object.entries(C.theoryLearningAids))for(const level of ['', '/intro','/practice','/advanced']){
  await route('#lesson/'+id+level);
  const el=d.querySelector('[data-theory-aids="'+id+'"]');assert.ok(el,id+level);
  assert.deepEqual([...el.querySelectorAll('.theory-key-points > li > strong')].map(x=>x.textContent),plain(a.keyPoints.map(p=>p.title)));
  assert.deepEqual([...el.querySelectorAll('.theory-key-points > li > span')].map(x=>x.textContent),plain(a.keyPoints.map(p=>p.text)));
  assert.ok(el.textContent.includes(a.plainExample.text));assert.ok(el.textContent.includes(a.memoryCue));assert.ok(el.textContent.includes(a.scope));
  assert.equal(el.querySelectorAll('.theory-contrast').length,a.contrasts.length);
  assert.equal(el.querySelectorAll('[data-theory-recall] .theory-recall-item').length,a.recall.length);
  for(const r of a.recall){assert.ok(el.textContent.includes(r.question));for(const c of r.checkpoints)assert.ok(el.textContent.includes(c));}
  assert.equal(el.querySelector('[data-theory-recall]').open,false);
  assert.ok([...el.querySelectorAll('.theory-recall-item details')].every(x=>!x.open));
 }
 await route('#lesson/practice-cognition/intro');
 assert.equal(d.querySelector('#lesson-note').value,old.notes['practice-cognition']);
 const recall=d.querySelector('[data-theory-recall]');recall.open=true;recall.querySelector('details').open=true;await pause();
 assert.equal(w.localStorage.getItem('zhixu-study-v1'),original);assert.equal(w.localStorage.getItem('zhixu-study-v2'),null,'reading and opening recall do not invent records');
 assert.match(d.querySelector('[data-theory-aids]').textContent,/不代表官方考频/);
 const payload='0≤r<m & <img src=x onerror=bad()> "literal" <script>bad()</script>';
 const a=C.theoryLearningAids['practice-cognition'];
 a.keyPoints[0]={title:payload,text:payload};a.memoryCue=payload;a.plainExample={title:payload,text:payload};a.contrasts[0]={left:{term:payload,text:payload},right:{term:payload,text:payload},cue:payload};a.recall[0]={question:payload,checkpoints:[payload]};a.scope=payload;
 await route('#lesson/practice-cognition/advanced');
 const el=d.querySelector('[data-theory-aids]');assert.ok(el.textContent.includes(payload));
 assert.equal(el.querySelector('.theory-key-points strong').textContent,payload);assert.equal(el.querySelector('.theory-key-points span').textContent,payload);
 assert.equal(el.querySelectorAll('img,script,[onerror],m').length,0,'all authored aid fields remain literal text');
 assert.ok(el.querySelector('details > summary'));assert.equal(w.localStorage.getItem('zhixu-study-v2'),null);assert.deepEqual(errors,[]);
 console.log('PASS Theory aids: nineteen topic aids × four views, exact key points, examples, contrasts and recall, no fabricated progress, legacy note and literal-text safety');
 console.log('NOT TESTED: real browser details interaction, CSS/mobile width or touch');dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exit(1);});
