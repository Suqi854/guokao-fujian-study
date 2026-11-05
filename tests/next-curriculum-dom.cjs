"use strict";
// Actual application scripts with synthetic storage/locks; not browser pixels or touch.
const {JSDOM,VirtualConsole}=require('jsdom'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {installSerialLocks,navigateHash,withoutRevision}=require('./progress-dom-support.cjs');
assert.match(fs.readFileSync(path.join(__dirname, "..", "docs/style.css"), "utf8"), /\.shenlun-feedback\s*\{[^}]*font-family:\s*"Noto Sans CJK SC"/, "CJK-first system fallback for bracket-led evidence text");
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8'),errors=[],outgoing=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://study.example/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.confirm=()=>true;w.fetch=(...a)=>{outgoing.push(a);throw Error('Unexpected request');};
let now=Date.parse('2026-11-05T15:00:00.000Z'),timer=null,exported=null;w.Date.now=()=>now;w.setInterval=fn=>{timer=fn;return 1;};w.Blob=Blob;w.File=File;w.URL.createObjectURL=b=>{exported=b;return 'blob:next-test';};w.URL.revokeObjectURL=()=>{};
const nativeClick=w.HTMLAnchorElement.prototype.click;w.HTMLAnchorElement.prototype.click=function(){if(!this.download)nativeClick.call(this);};
const legacy={schemaVersion:1,exam:'fujian',read:['scoped-reading'],favorites:['profit-bases'],notes:{'scoped-reading':'synthetic legacy reading note','work-stages':'synthetic legacy work note'},attempts:[{qid:'q01',choice:1,at:'2026-11-04T12:00:00Z',seconds:9}],drafts:{w01:'synthetic original old draft'},checks:{w01:[0]}},rawLegacy=JSON.stringify(legacy);
w.localStorage.setItem('zhixu-study-v1',rawLegacy);
for(const m of html.matchAll(/src="\.\/([^\"]+)"/g))w.eval(fs.readFileSync(path.join(root,'docs',m[1]),'utf8'));
const C=w.STUDY_CONTENT,plain=x=>JSON.parse(JSON.stringify(x)),pause=()=>new Promise(r=>setTimeout(r,10));
async function route(hash){await navigateHash(w,hash,()=>{w.location.hash=hash;});await pause();}
async function action(name,id){const el=d.querySelector('[data-action="'+name+'"]'+(id===undefined?'':'[data-id="'+id+'"]'));assert.ok(el,name);el.click();await pause();}
function input(selector,value){const el=d.querySelector(selector);assert.ok(el,selector);el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));}
const disk=()=>JSON.parse(w.localStorage.getItem('zhixu-study-v2'));
async function awaitView(predicate){for(let i=0;i<200;i++){if(predicate())return;await new Promise(r=>setTimeout(r,5));}throw Error('Expected application view after navigation');}
(async()=>{
 const changed=['scoped-reading','profit-bases','mixed-weights','work-stages','mao-living-soul','unified-market-rules','compare-transfer-writing'];
 for(const id of changed){const lesson=C.lessons.find(l=>l.id===id);for(const level of ['intro','practice','advanced']){const g=lesson.learningLevels[level];await route('#lesson/'+id+'/'+level);const sections=[...d.querySelectorAll('.reading > section:not(.level-guide):not(.diagram-box)')];assert.deepEqual(sections.map(s=>s.querySelector('h2')?.textContent),plain(g.sections.map(i=>lesson.sections[i][0])));assert.deepEqual(sections.map(s=>s.querySelector(':scope > p')?.textContent),plain(g.sections.map(i=>lesson.sections[i][1])));if(g.writingIds?.length)assert.equal(d.querySelector('.level-guide a[href^="#write/"]').hash,'#write/'+g.writingIds[0]);else assert.deepEqual(d.querySelector('.level-guide a[href^="#quiz/"]').hash.split('/').at(-1).split(','),plain(g.questionIds));}}
 await route('#lesson/scoped-reading/intro');assert.equal(d.querySelector('#lesson-note').value,legacy.notes['scoped-reading']);
 const tasks=C.writing.filter(t=>t.id.startsWith('w_next_'));assert.equal(tasks.length,3);
 for(const task of tasks){
  await route('#write/'+task.id);assert.equal(d.querySelector('.material').textContent,task.material);assert.equal(d.querySelector('.reference').textContent,task.sample);
  const feedback=d.querySelector('.shenlun-feedback');assert.ok(feedback,task.id+' teaching is rendered');const ref=feedback.closest('details');assert.equal(ref.open,false,'teaching starts behind optional reference disclosure');ref.open=true;
  assert.deepEqual([...feedback.querySelectorAll('h3')].map(el=>el.textContent),['参考要点依据','常见误区与改写','二稿怎么改']);
  const evidence=[...feedback.querySelectorAll(':scope > ol:first-of-type > li')];assert.equal(evidence.length,task.points.length);
  evidence.forEach((el,i)=>{assert.equal(el.querySelector('p').textContent,task.evidenceDetails[i].reason);for(const n of task.evidenceDetails[i].paragraphs)assert.ok(el.textContent.includes(n==='任务'?'任务要求':'材料【'+n+'】'));});
  const misconceptions=[...feedback.querySelectorAll(':scope > ul > li')];assert.equal(misconceptions.length,task.misconceptions.length);
  misconceptions.forEach((el,i)=>{const m=task.misconceptions[i];assert.deepEqual([...el.querySelectorAll('p')].map(p=>p.textContent),['弱表达：'+m.weak,'问题：'+m.problem,'改写：'+m.revision]);});
  assert.deepEqual([...feedback.querySelectorAll(':scope > ol:last-of-type > li')].map(el=>el.textContent),plain(task.rewriteSteps));
  assert.equal(feedback.querySelector('.stat-foot').textContent,task.reviewNote);
  const related=[...d.querySelectorAll('.task ~ .note a[href^="#write/w_next_"]')];assert.equal(related.length,2);assert.ok(related.every(a=>C.writing.find(t=>t.id===a.hash.split('/')[1]).materialGroup===task.materialGroup));
  input('#draft','synthetic draft '+task.id);const check=d.querySelector('[data-check]');check.checked=true;check.dispatchEvent(new w.Event('change',{bubbles:true}));await pause();
 }
 for(const task of tasks){await route('#write/'+task.id);assert.equal(d.querySelector('#draft').value,'synthetic draft '+task.id);assert.equal(d.querySelector('[data-check]').checked,true);}
 assert.equal(disk().drafts.w01,legacy.drafts.w01);assert.deepEqual(disk().attempts[0],legacy.attempts[0]);assert.equal(w.localStorage.getItem('zhixu-study-v1'),rawLegacy);
 await route('#lesson/compare-transfer-writing/intro');assert.equal(d.querySelectorAll('.level-guide a[href^="#write/w_next_"]').length,1);
 const first=tasks[0];await route('#write/'+first.id);await action('writing-run-start',first.id);now+=3500;await action('writing-run-done',first.id);assert.equal(disk().runs[0].completed,true);assert.equal(disk().runs[0].taskId,first.id);assert.equal(disk().runs[0].elapsedMs,3500);
 const selected=[C.questions.find(q=>q.id.startsWith('rx-')).id,'pol3-01','q01'];await route('#training/ids/'+selected.join(','));input('#run-budget','1');await action('run-start');await awaitView(()=>locationHashStarts('#quiz/timed/')&&d.querySelector('.quiz-card'));
 function locationHashStarts(prefix){return w.location.hash.startsWith(prefix);}
 for(let i=0;i<selected.length;i++){const q=C.questions.find(q=>q.id===selected[i]);now+=1000;await action('run-choose',q.answer);await action('run-submit');await action('run-next');}
 await awaitView(()=>w.location.hash.startsWith('#training/run/'));const run=disk().runs.at(-1);assert.deepEqual(run.items.map(x=>x.qid),selected);assert.equal(w.STUDY_TRAINING.choiceSummary(run).total.correct,3);
 const reading=C.questions.find(q=>q.lesson==='fq-multi-paragraph');await route('#quiz/one/'+reading.id);assert.equal(d.querySelector('.quiz-card h1').textContent,reading.stem);assert.ok(d.querySelector('.quiz-card h1').classList.contains('passage-stem'));assert.equal(d.querySelectorAll('.question-material').length,0,'do not insert embedded passage twice');
 const saved=disk();await route('#settings');await action('backup');const backup=await exported.text();assert.equal(JSON.parse(backup).schemaVersion,2);await action('reset');assert.equal(d.querySelector('#exam').disabled,false);
 const file=d.querySelector('#import-file');Object.defineProperty(file,'files',{configurable:true,value:[new w.File([backup],'synthetic-merged-backup.json',{type:'application/json'})]});file.dispatchEvent(new w.Event('change',{bubbles:true}));await pause();await pause();assert.deepEqual(withoutRevision(disk()),withoutRevision(saved));assert.equal(w.localStorage.getItem('zhixu-study-v1'),rawLegacy);assert.equal(d.querySelector('#exam').disabled,false);
 const payload='0≤r<m & <img src=x onerror=bad()> "literal" <script>bad()</script>';
 const target=tasks[0];target.evidenceDetails[0]={point:payload,paragraphs:[payload],reason:payload};target.misconceptions[0]={weak:payload,problem:payload,revision:payload};target.rewriteSteps[0]=payload;target.reviewNote=payload;
 await route('#write/'+target.id);const feedback=d.querySelector('.shenlun-feedback');assert.ok(feedback.textContent.includes(payload));assert.equal(feedback.querySelectorAll('img,script,[onerror],m').length,0);assert.ok(feedback.querySelector('h3')&&feedback.querySelector('ol'));
 assert.deepEqual(errors,[]);assert.deepEqual(outgoing,[]);
 console.log('PASS Merged app: 21 new/revised lesson views, all3 independent drafts/checks and visible evidence/misconception/rewrite fields, three comparison task links and literal-text safety');
 console.log('PASS New nonnumeric IDs in writing completion, next-batch plus legacy timed runs and full v2 backup restore; exact old v1 bytes and old drafts/attempt preserved');
 console.log('NOT TESTED here: actual browser layout, native download, real locks, phone/touch');dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exit(1);});
