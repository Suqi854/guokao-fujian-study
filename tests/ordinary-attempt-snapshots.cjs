"use strict";
// Actual application + synthetic DOM/storage/clock. Not physical-device QA.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8');
const scripts=[...html.matchAll(/src="\.\/([^"]+)"/g)].map(m=>m[1]);
const key='zhixu-study-v2',day=86400000,base=Date.parse('2026-11-06T08:00:00.000Z');
const blank=()=>({schemaVersion:2,revision:0,exam:'fujian',read:[],favorites:[],notes:{},attempts:[],drafts:{},checks:{},runs:[],activeRun:null});
const pause=()=>new Promise(r=>setTimeout(r,15));
async function setup({state=blank(),prepare,legacy=false}={}){
 const errors=[],requests=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM(html,{url:'https://ordinary-snapshot.example/#home',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
 const w=dom.window,d=w.document;let now=base,blob=null;
 installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.Date.now=()=>now;w.confirm=()=>true;
 w.Blob=Blob;w.File=File;w.URL.createObjectURL=b=>{blob=b;return 'blob:ordinary-test';};w.URL.revokeObjectURL=()=>{};
 const anchor=w.HTMLAnchorElement.prototype.click;w.HTMLAnchorElement.prototype.click=function(){if(!this.download)anchor.call(this);};
 w.fetch=(...args)=>{requests.push(args);throw Error('Unexpected outbound request');};
 for(const file of scripts.filter(f=>f!=='app.js'))w.eval(fs.readFileSync(path.join(root,'docs',file),'utf8'));
 prepare?.({w,state});
 w.localStorage.setItem(legacy?'zhixu-study-v1':key,JSON.stringify(state));
 w.eval(fs.readFileSync(path.join(root,'docs/app.js'),'utf8'));await pause();
 return {w,d,C:w.STUDY_CONTENT,T:w.STUDY_TRAINING,clock:n=>{now=n;},disk:()=>JSON.parse(w.localStorage.getItem(key)),
  async route(hash){await navigateHash(w,hash,()=>{w.location.hash=hash;});await pause();},
  async choose(q,correct=true){await this.route('#quiz/one/'+q.id);d.querySelector('[data-action="choose"][data-id="'+(correct?q.answer:(q.answer+1)%q.options.length)+'"]').click();await pause();const b=d.querySelector('[data-action="submit"]');b.click();b.click();await pause();await pause();},
  report(){return w.STUDY_ADAPTIVE.derive({content:this.C,state:this.disk(),signature:this.T.signature,now});},
  async backup(){await this.route('#settings');d.querySelector('[data-action="backup"]').click();await pause();return JSON.parse(await blob.text());},
  async restore(data){await this.route('#settings');const input=d.querySelector('#import-file');Object.defineProperty(input,'files',{configurable:true,value:[new File([JSON.stringify(data)],'synthetic.json',{type:'application/json'})]});input.dispatchEvent(new w.Event('change',{bubbles:true}));await pause();await pause();},
  async close(){await pause();assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);w.close();}
 };
}
const cases=[];const test=(name,fn)=>cases.push([name,fn]);
test('ordinary answers persist version snapshots once and can meet diagnostic evidence rules',async()=>{
 const e=await setup();try{
  const questions=e.C.questions.filter(q=>q.lesson==='growth').slice(0,5);
  for(let i=0;i<questions.length;i++){e.clock(base-(i<3?2:1)*day+i*5000);await e.choose(questions[i],i>=2);}
  e.clock(base);assert.equal(e.disk().attempts.length,5,'double clicks do not duplicate');assert.equal(e.disk().runs.length,0,'ordinary practice does not fabricate timed groups');
  for(const a of e.disk().attempts){const q=e.C.questions.find(q=>q.id===a.qid);assert.equal(a.snapshot.schemaVersion,1);assert.equal(a.snapshot.signature,e.T.signature(q));assert.equal(a.snapshot.answer,q.answer);assert.equal(a.snapshot.optionCount,q.options.length);assert.equal(a.snapshot.clockIssue,false);}
  const row=e.report().rows.find(r=>r.lessonId==='growth');assert.equal(row.status,'review');assert.equal(row.counts.distinct,5);assert.equal(row.counts.wrong,2);assert.equal(row.counts.days,2);
  const raw=e.w.localStorage.getItem(key);await e.route('#diagnostics/lesson/growth');assert.match(e.d.querySelector('main').textContent,/不同题 5 道，对 3 道，错 2 道/);assert.equal(e.w.localStorage.getItem(key),raw,'diagnostics stay read-only');
 }finally{await e.close();}
});
test('v2 export, import and reload preserve snapshots; old v1/v2 attempts stay unversioned',async()=>{
 const old={qid:'q01',choice:0,at:new Date(base-day).toISOString(),seconds:12};const state=blank();state.attempts=[old];
 const e=await setup({state});let exported;try{await e.choose(e.C.questions.find(q=>q.id==='q02'));exported=await e.backup();assert.ok(!('snapshot'in exported.attempts[0]));assert.ok(exported.attempts[1].snapshot);await e.restore(exported);assert.deepEqual(e.disk().attempts,exported.attempts);}finally{await e.close();}
 const reloaded=await setup({state:exported});try{assert.equal(reloaded.report().events.filter(x=>x.version==='current').length,1);assert.equal(reloaded.report().events.filter(x=>x.version==='unrecorded').length,1);assert.deepEqual((await reloaded.backup()).attempts,exported.attempts);}finally{await reloaded.close();}
 const v1={...blank(),schemaVersion:1,attempts:[old]};delete v1.revision;delete v1.runs;delete v1.activeRun;
 const legacy=await setup({state:v1,legacy:true});try{const raw=legacy.w.localStorage.getItem('zhixu-study-v1');await legacy.choose(legacy.C.questions.find(q=>q.id==='q02'));assert.equal(legacy.w.localStorage.getItem('zhixu-study-v1'),raw);assert.ok(!legacy.disk().attempts[0].snapshot);assert.ok(legacy.disk().attempts[1].snapshot);}finally{await legacy.close();}
});
test('changed question, shared material or option count retains frozen outcome but is excluded',async()=>{
 const e=await setup();try{
  const q=e.C.questions.find(q=>q.materialId);assert.ok(q);await e.choose(q,true);assert.equal(e.report().events[0].version,'current');
  e.C.questionMaterials[q.materialId].note+=' synthetic changed material';let report=e.report();assert.equal(report.events[0].version,'changed-or-unknown');assert.equal(report.events[0].outcome,'correct');
  const backup=await e.backup();q.answer=(q.answer+1)%q.options.length;q.options=q.options.slice(0,2);await e.restore(backup);report=e.report();assert.equal(report.events[0].version,'changed-or-unknown');assert.equal(report.events[0].outcome,'correct');assert.equal(report.rows.find(r=>r.lessonId===q.lesson).counts.distinct,0);
 }finally{await e.close();}
});
test('malformed, unsupported or internally inconsistent snapshots reject import without overwriting',async()=>{
 const e=await setup();try{await e.choose(e.C.questions[0]);const good=await e.backup();
  const variants=[null,{}, {...good.attempts[0].snapshot,schemaVersion:2},{...good.attempts[0].snapshot,signature:'invalid'},{...good.attempts[0].snapshot,optionCount:3},{...good.attempts[0].snapshot,clockIssue:'false'},{...good.attempts[0].snapshot,answer:(good.attempts[0].snapshot.answer+1)%4}];
  for(const snapshot of variants){const bad=JSON.parse(JSON.stringify(good));bad.attempts[0].snapshot=snapshot;const raw=e.w.localStorage.getItem(key);await e.restore(bad);assert.match(e.d.querySelector('#import-status').textContent,/导入失败/);assert.equal(e.w.localStorage.getItem(key),raw);}
 }finally{await e.close();}
});
test('clock rollback is recorded and excluded instead of being a normal zero-second result',async()=>{
 const e=await setup();try{const q=e.C.questions[0];await e.route('#quiz/one/'+q.id);e.clock(base-5000);e.d.querySelector('[data-action="choose"][data-id="'+q.answer+'"]').click();await pause();e.d.querySelector('[data-action="submit"]').click();await pause();await pause();const a=e.disk().attempts[0];assert.equal(a.snapshot.clockIssue,true);assert.equal(a.seconds,0);e.clock(base);assert.equal(e.report().rows.find(r=>r.lessonId===q.lesson).counts.distinct,0);}finally{await e.close();}
});
test('failed write retains prior disk and discloses page-only evidence',async()=>{
 const e=await setup();try{const raw=e.w.localStorage.getItem(key),set=e.w.Storage.prototype.setItem;e.w.Storage.prototype.setItem=function(){throw new e.w.DOMException('synthetic quota','QuotaExceededError');};await e.choose(e.C.questions[0]);assert.equal(e.w.localStorage.getItem(key),raw);assert.match(e.d.querySelector('main').textContent,/提交仅在本页，未保存/);await e.route('#diagnostics');assert.match(e.d.querySelector('main').textContent,/尚未确认保存/);e.w.Storage.prototype.setItem=set;}finally{await e.close();}
});
test('timed mirrors still deduplicate and active timed responses remain excluded',async()=>{
 const e=await setup({prepare:({w,state})=>{const T=w.STUDY_TRAINING,q=w.STUDY_CONTENT.questions[0],r=T.newChoice({id:'mirror-test',now:base-day,ids:[q.id],budgetSeconds:60});const event=T.submit(r,q.answer,base-day+1000);state.attempts.push({qid:q.id,choice:q.answer,at:event.at,seconds:1,snapshot:T.attemptSnapshot(q)});T.advance(r,base-day+2000);state.runs.push(r);}});
 try{assert.equal(e.report().events.length,1);assert.equal(e.report().omitted.mirroredAttempts,1);const state=e.disk();state.activeRun=state.runs.pop();state.activeRun.status='paused';state.activeRun.endedAt=null;state.activeRun.anchorMs=null;await e.restore(state);assert.equal(e.report().events.length,0);assert.equal(e.report().omitted.activeResponses,1);}finally{await e.close();}
});
(async()=>{for(const [name,fn]of cases){await fn();console.log('PASS '+name);}console.log('PASS '+cases.length+' ordinary-attempt snapshot integration scenarios');})().catch(e=>{console.error(e);process.exit(1);});
