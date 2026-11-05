'use strict';
// Final application DOM with synthetic records. Not mobile pixels/native dialogs.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash,withoutRevision}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(root+'/docs/index.html','utf8'),errors=[],outgoing=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://candidate.example/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.confirm=()=>true;w.fetch=(...a)=>{outgoing.push(a);throw Error('Unexpected outgoing request');};
let now=Date.parse('2026-11-05T22:00:00Z'),exported;w.Date.now=()=>now;w.setInterval=()=>1;w.Blob=Blob;w.File=File;w.URL.createObjectURL=b=>{exported=b;return 'blob:v036-test';};w.URL.revokeObjectURL=()=>{};const nativeClick=w.HTMLAnchorElement.prototype.click;w.HTMLAnchorElement.prototype.click=function(){if(!this.download)nativeClick.call(this);};
const legacy={schemaVersion:1,exam:'fujian',read:['phase-change','historiography'],favorites:['phase-change'],notes:{'phase-change':'synthetic old heat note','historiography':'synthetic old history note'},attempts:[{qid:'q51',choice:0,at:'2026-11-04T12:00:00Z',seconds:8}],drafts:{w01:'synthetic retained writing draft'},checks:{w01:[0]}};
const legacyRaw=JSON.stringify(legacy);w.localStorage.setItem('zhixu-study-v1',legacyRaw);w.localStorage.setItem('zhixu-private-library-v1','private sentinel');w.localStorage.setItem('zhixu-long-mock-v1','long sentinel');
const originalGet=w.Storage.prototype.getItem,reads=[];w.Storage.prototype.getItem=function(key){reads.push(key);assert.ok(!['zhixu-private-library-v1','zhixu-long-mock-v1'].includes(key),'Main app must not read another record namespace');return originalGet.call(this,key);};
for(const m of html.matchAll(/src="\.\/([^"]+)"/g))w.eval(fs.readFileSync(root+'/docs/'+m[1],'utf8'));
const C=w.STUDY_CONTENT,plain=x=>JSON.parse(JSON.stringify(x)),pause=()=>new Promise(r=>setTimeout(r,8)),disk=()=>JSON.parse(w.localStorage.getItem('zhixu-study-v2'));
async function route(hash){await navigateHash(w,hash,()=>{w.location.hash=hash;});await pause();}
async function action(name,id){const e=d.querySelector('[data-action="'+name+'"]'+(id===undefined?'':'[data-id="'+id+'"]'));assert.ok(e,name);e.click();await pause();}
function input(sel,value){const e=d.querySelector(sel);assert.ok(e,sel);e.value=value;e.dispatchEvent(new w.Event('input',{bubbles:true}));}
async function awaitView(test){for(let i=0;i<200;i++){if(test())return;await pause();}throw Error('Expected rendered application view');}
(async()=>{
 await route('#theory');assert.equal(d.querySelectorAll('[data-theory-lesson]').length,12);assert.match(d.querySelector('main').textContent,/2023.*2025/s);assert.equal(d.querySelector('[data-theory-lesson="phase-change"]'),null,'Science learning aid is not a political-route node');
 for(const id of ['phase-change','historiography','new-development-pattern','education-strong-2035']){
  await route('#lesson/'+id+'/intro');const l=C.lessons.find(l=>l.id===id),aid=C.theoryLearningAids[id],main=d.querySelector('main');assert.equal(d.querySelector('h1').textContent,l.title);assert.ok(main.textContent.includes(aid.memoryCue));assert.equal(d.querySelector('[data-theory-recall]').open,false);assert.ok(main.textContent.includes('不是官方考频排序'));assert.equal(d.querySelectorAll('.level-guide a[href^="#quiz/"]').length,1);
  if(legacy.notes[id])assert.equal(d.querySelector('#lesson-note').value,legacy.notes[id],'Old note survives lesson deepening');
 }
 const next=C.questions.filter(q=>/^c36-|^pol36-/.test(q.id));assert.equal(next.length,30);
 for(const q of next){
  await route('#quiz/one/'+q.id);assert.equal(d.querySelector('.quiz-card h1').textContent,q.stem);assert.deepEqual([...d.querySelectorAll('.option > span:last-child')].map(e=>e.textContent),plain(q.options));now+=1100;await action('choose',q.answer);await action('submit');await awaitView(()=>d.querySelector('.option-review'));assert.equal(d.querySelector('.feedback > p').textContent,q.explanation);assert.equal(d.querySelectorAll('.option-review li').length,4);q.optionReviews.forEach((t,i)=>assert.ok(d.querySelectorAll('.option-review li')[i].textContent.endsWith(t)));assert.ok(d.querySelector('.quiz-actions').textContent.includes('提交已保存到本机'));
 }
 assert.equal(disk().attempts.length,31);assert.deepEqual(disk().attempts[0],legacy.attempts[0]);assert.deepEqual(disk().read,legacy.read);assert.deepEqual(disk().favorites,legacy.favorites);assert.equal(disk().notes['phase-change'],legacy.notes['phase-change']);assert.equal(disk().drafts.w01,legacy.drafts.w01);assert.equal(w.localStorage.getItem('zhixu-study-v1'),legacyRaw);
 const selected=[next.find(q=>q.lesson==='historiography').id,'pol36-07','q51'];await route('#training/ids/'+selected.join(','));input('#run-budget','1');await action('run-start');await awaitView(()=>w.location.hash.startsWith('#quiz/timed/')&&d.querySelector('.quiz-card'));
 for(const id of selected){const q=C.questions.find(q=>q.id===id);now+=1000;await action('run-choose',q.answer);await action('run-submit');await action('run-next');}
 await awaitView(()=>w.location.hash.startsWith('#training/run/'));const run=disk().runs.at(-1);assert.deepEqual(run.items.map(q=>q.qid),selected);assert.equal(w.STUDY_TRAINING.choiceSummary(run).total.correct,3);assert.equal(w.STUDY_TRAINING.choiceSummary(run).total.unsubmitted,0);assert.ok(d.querySelector('main').textContent.includes('未提交不是答错'));
 const saved=disk();await route('#settings');assert.ok(d.querySelector('main').textContent.includes('分别导出学习记录、私人题库、长题组三份备份'));await action('backup');const backup=await exported.text();assert.equal(JSON.parse(backup).schemaVersion,2);assert.equal(JSON.parse(backup).attempts.length,34);await action('reset');const file=d.querySelector('#import-file');Object.defineProperty(file,'files',{configurable:true,value:[new w.File([backup],'synthetic-v036.json',{type:'application/json'})]});file.dispatchEvent(new w.Event('change',{bubbles:true}));await pause();await pause();assert.deepEqual(withoutRevision(disk()),withoutRevision(saved));assert.equal(w.localStorage.getItem('zhixu-study-v1'),legacyRaw);
 assert.equal(originalGet.call(w.localStorage,'zhixu-private-library-v1'),'private sentinel');assert.equal(originalGet.call(w.localStorage,'zhixu-long-mock-v1'),'long sentinel');assert.deepEqual(errors,[]);assert.deepEqual(outgoing,[]);
 console.log('PASS v036 actual app: new four lesson/memory entries and12-step route,30 items and120 option explanations, old notes/read/favorites/v1 bytes, mixed new-old timed run, v2 backup restore, foreign namespaces untouched');
 console.log('NOT TESTED here: real browser pixels, mobile/touch, native downloads, real concurrent tabs or physical durability');dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exit(1);});
