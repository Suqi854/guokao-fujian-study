"use strict";
// Actual application regression with synthetic local storage/locks, not browser or mobile QA.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const root = require('node:path').join(__dirname,'..');
const { JSDOM, VirtualConsole } = require('jsdom');
const html = fs.readFileSync(root + '/docs/index.html', 'utf8');
const pause = () => new Promise(resolve => setTimeout(resolve, 15));
const V1 = 'zhixu-study-v1', V2 = 'zhixu-study-v2';
const fresh = () => ({ schemaVersion: 2, revision: 1, exam: 'both', read: [], favorites: [], notes: {}, attempts: [], drafts: {}, checks: {}, runs: [], activeRun: null });
async function fixture({ hash = '#settings', seed, noLocks = false, legacyOnly = false, empty = false, initialTime } = {}) {
  const errors = [], vc = new VirtualConsole();
  vc.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(html, { url: 'https://study.example/' + hash, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window, d = w.document;
  let now = initialTime ?? Date.now(), held = false, jobs = [], interval = null, tail=Promise.resolve(), exported=null, downloadName='';
  w.Date.now = () => now;
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.setInterval = callback => { interval = callback; return 1; };
  w.confirm = () => true;
  w.Blob=Blob;w.File=File;w.URL.createObjectURL=b=>{exported=b;return 'blob:training-backup';};w.URL.revokeObjectURL=()=>{};
  const click=w.HTMLAnchorElement.prototype.click;w.HTMLAnchorElement.prototype.click=function(){if(this.download)downloadName=this.download;else click.call(this);};
  if (!noLocks) Object.defineProperty(w.navigator, 'locks', { value: {
    request: (name, options, callback) => new Promise((resolve, reject) => {
      const gate=held?new Promise(open=>jobs.push(open)):Promise.resolve();
      const job=tail.then(()=>gate).then(callback);tail=job.catch(()=>{});job.then(resolve,reject);
    }),
  } });
  for (const m of html.matchAll(/src="\.\/([^"]+)"/g)) if (m[1] !== 'app.js') w.eval(fs.readFileSync(root + '/docs/' + m[1], 'utf8'));
  const state = fresh();
  seed?.(state, w, now);
  if(legacyOnly){const old={...state,schemaVersion:1};delete old.revision;delete old.runs;delete old.activeRun;w.localStorage.setItem(V1,JSON.stringify(old));}
  else if(!empty)w.localStorage.setItem(V2, JSON.stringify(state));
  w.eval(fs.readFileSync(root + '/docs/app.js', 'utf8'));
  await pause();
  const x = { w, d, errors, now: () => now, advance: ms => { now += ms; }, tick: () => interval(),
    hold: () => { held = true; }, release: () => { held = false; jobs.splice(0).forEach(job => job()); },
    disk: () => JSON.parse(w.localStorage.getItem(V2)), exported:()=>exported, downloadName:()=>downloadName,
    choose: async (action,id) => {const el=d.querySelector('[data-action="'+action+'"]'+(id===undefined?'':'[data-id="'+id+'"]'));assert.ok(el,action);el.click();await pause();},
    route: async hash => { w.location.hash = hash; await pause(); },
    input: (selector, value) => { const el = d.querySelector(selector); assert.ok(el, selector); el.value = value; el.dispatchEvent(new w.Event('input', { bubbles: true })); },
    close: async () => { await pause(); assert.deepEqual(errors, []); dom.window.close(); },
  };
  return x;
}
const cases = [];
function test(name, run) { cases.push({ name, run }); }

test('replacement rejects old-state input while waiting for the lock', async () => {
  const x = await fixture({ seed: state => { state.notes.logic = 'old history sentinel'; } });
  try {
    const legacy = ' { "original": "preserve exact v1 bytes" }\n';
    x.w.localStorage.setItem(V1, legacy);
    x.hold(); x.d.querySelector('[data-action="reset"]').click(); await pause();
    await x.route('#lesson/logic');
    assert.ok(x.d.querySelector('#replace-status'));
    assert.ok([...x.d.querySelectorAll('input,textarea,select,button')].every(el => el.disabled));
    // A synthetic bubbling input verifies the handler guard, beyond disabled UI.
    const probe = x.d.createElement('textarea'); probe.dataset.note = 'logic'; probe.value = 'stale overwrite';
    x.d.body.append(probe); probe.dispatchEvent(new x.w.Event('input', { bubbles: true })); probe.remove();
    x.release(); await pause(); await pause();
    assert.deepEqual(x.disk().notes, {});
    assert.equal(x.d.querySelector('[data-note]').value, '');
    assert.equal(x.w.localStorage.getItem(V1), legacy);
  } finally { await x.close(); }
});

test('incompatible active choice does not pair current options with frozen answers', async () => {
  const x = await fixture({ hash: '#quiz/timed/run-compat', seed: (state, w, now) => {
    const T = w.STUDY_TRAINING, q = w.STUDY_CONTENT.questions[0];
    state.activeRun = T.newChoice({ id: 'run-compat', now: now - 1000, ids: [q.id], budgetSeconds: 120 });
    T.submit(state.activeRun, q.answer, now - 500); T.pause(state.activeRun, now);
    q.answer = (q.answer + 1) % q.options.length;
    q.options[state.activeRun.items[0].answer] = 'NEW INCORRECT OPTION';
    q.explanation = 'NEW EXPLANATION';
  } });
  try {
    assert.match(x.d.querySelector('#main').textContent, /内容已变更/);
    assert.equal(x.d.querySelector('.option.correct'), null);
    assert.doesNotMatch(x.d.querySelector('#main').textContent, /NEW INCORRECT OPTION|NEW EXPLANATION/);
  } finally { await x.close(); }
});

test('shared material is part of choice compatibility', async () => {
  const x = await fixture();
  try {
    const T = x.w.STUDY_TRAINING;
    const run = T.newChoice({ id: 'run-material', now: x.now(), ids: ['q130'], budgetSeconds: 120 });
    x.w.STUDY_CONTENT.questionMaterials['service-table'].tables[0].rows[0][1] = '999999999';
    assert.equal(T.compatible(run), false);
  } finally { await x.close(); }
});

test('unsupported Web Locks pauses an existing running record on initial load', async () => {
  const x = await fixture({ noLocks: true, hash: '#quiz/timed/read-only', seed: (state, w, now) => {
    state.activeRun = w.STUDY_TRAINING.newChoice({ id: 'read-only', now, ids: ['q01'], budgetSeconds: 60 });
  } });
  try {
    assert.equal(x.d.querySelector('[data-run-status]').textContent, '已暂停');
    x.advance(61000); x.tick(); await pause();
    assert.equal(x.w.location.hash, '#quiz/timed/read-only');
    assert.equal(x.d.querySelector('[data-run-status]').textContent, '已暂停');
    assert.equal(x.disk().activeRun.status, 'running'); // No unsupported write was attempted.
  } finally { await x.close(); }
});

test('late start-save completion does not override a newer navigation', async () => {
  const x = await fixture({ hash: '#training' });
  try {
    x.input('#run-count', '1'); x.input('#run-budget', '1');
    x.hold(); x.d.querySelector('[data-action="run-start"]').click(); await pause();
    await x.route('#lesson/logic'); x.release(); await pause(); await pause();
    assert.equal(x.w.location.hash, '#lesson/logic');
    assert.equal(x.disk().activeRun.status, 'paused');
  } finally { await x.close(); }
});

test('first write failure cancels already queued pre-error running snapshots', async () => {
  const x = await fixture({ hash: '#write/w01', seed: (state, w, now) => {
    state.activeRun = w.STUDY_TRAINING.newWriting({ id: 'run-write-failure', now, taskId: 'w01' });
  } });
  try {
    const originalRaw = x.w.localStorage.getItem(V2), originalSet = x.w.Storage.prototype.setItem;
    let calls = 0;
    x.w.Storage.prototype.setItem = function (key, value) {
      if (key === V2 && calls++ === 0) throw new x.w.DOMException('first snapshot too large', 'QuotaExceededError');
      return originalSet.call(this, key, value);
    };
    x.hold(); x.input('#draft', 'bigger first draft'); x.input('#draft', 'smaller');
    await pause(); x.release(); await pause(); await pause();
    assert.equal(x.w.localStorage.getItem(V2), originalRaw, 'a later pre-error snapshot must not write after the first failure');
    assert.equal(calls, 1, 'no later queued setItem');
    await x.route('#training');
    assert.equal(x.d.querySelector('[data-run-status]').textContent, '已暂停');
    assert.match(x.d.querySelector('.storage-alert').textContent, /存储空间不足|保存/);
  } finally { await x.close(); }
});

test('fixed cross-module run records correct/wrong/skipped and exact time including feedback', async()=>{
 const x=await fixture({hash:'#training'});
 try{
  const C=x.w.STUDY_CONTENT,T=x.w.STUDY_TRAINING;
  const ids=['资料分析','判断推理','数量关系'].map(m=>C.questions.find(q=>q.meta.module===m).id);
  await x.route('#training/ids/'+ids.join(','));x.input('#run-budget','1');await x.choose('run-start');
  let run=x.disk().activeRun;assert.deepEqual(run.items.map(i=>i.qid),ids);assert.equal(run.budgetMs,60000);
  x.advance(5000);await x.choose('run-choose',C.questions.find(q=>q.id===ids[0]).answer);await x.choose('run-submit',run.id);
  assert.equal(x.disk().attempts.length,1);
  const duplicate=x.d.createElement('button');duplicate.dataset.action='run-submit';duplicate.dataset.id=run.id;x.d.body.append(duplicate);duplicate.click();await pause();duplicate.remove();assert.equal(x.disk().attempts.length,1);
  x.advance(2000);await x.choose('run-pause',run.id);x.advance(10000);x.tick();assert.equal(x.disk().activeRun.elapsedMs,7000);await x.choose('run-resume',run.id);await x.choose('run-next',run.id);
  x.advance(3000);await x.choose('run-skip',run.id);x.advance(2000);const wrong=(C.questions.find(q=>q.id===ids[2]).answer+1)%4;await x.choose('run-choose',wrong);await x.choose('run-submit',run.id);x.advance(1000);await x.choose('run-next',run.id);
  const saved=x.disk();assert.equal(saved.activeRun,null);assert.equal(saved.runs.length,1);run=saved.runs[0];assert.equal(run.status,'finished');assert.equal(run.elapsedMs,13000);assert.deepEqual(run.spentMs,[7000,3000,3000]);
  const summary=T.choiceSummary(run).total;assert.deepEqual(JSON.parse(JSON.stringify(summary)),{planned:3,submitted:2,correct:1,wrong:1,unsubmitted:1,spentMs:13000});assert.equal(saved.attempts.length,2);
  const raw=x.w.localStorage.getItem(V2);x.advance(600000);x.tick();await pause();assert.equal(x.w.localStorage.getItem(V2),raw);
 }finally{await x.close();}
});

test('budget expires without converting unsubmitted items to errors',async()=>{
 const x=await fixture({hash:'#training'});
 try{x.input('#run-count','2');x.input('#run-budget','1');await x.choose('run-start');const id=x.disk().activeRun.id;x.advance(60001);x.tick();await pause();await pause();const s=x.disk();assert.equal(s.activeRun,null);assert.equal(s.runs[0].id,id);assert.equal(s.runs[0].status,'timeout');assert.equal(s.runs[0].elapsedMs,60000);assert.equal(s.attempts.length,0);assert.equal(x.w.STUDY_TRAINING.choiceSummary(s.runs[0]).total.unsubmitted,2);assert.equal(x.w.location.hash,'#training/run/'+id);}finally{await x.close();}
});

test('reload retains cursor and responses; station navigation pauses and returning does not auto-resume',async()=>{
 let x=await fixture({hash:'#training'}),saved,now,id;
 try{x.input('#run-count','2');x.input('#run-budget','2');await x.choose('run-start');id=x.disk().activeRun.id;x.advance(2000);const q=x.w.STUDY_CONTENT.questions.find(q=>q.id===x.disk().activeRun.items[0].qid);await x.choose('run-choose',q.answer);await x.choose('run-submit',id);await x.choose('run-next',id);saved=x.disk();now=x.now();}finally{await x.close();}
 x=await fixture({hash:'#quiz/timed/'+id,initialTime:now+2000,seed:s=>Object.assign(s,saved)});
 try{assert.equal(x.disk().activeRun.cursor,1);assert.equal(x.disk().attempts.length,1);assert.match(x.d.querySelector('.quiz-header').textContent,/2 \/ 2/);await x.route('#learn');assert.equal(x.disk().activeRun.status,'paused');const elapsed=x.disk().activeRun.elapsedMs;x.advance(20000);await x.route('#quiz/timed/'+id);assert.equal(x.disk().activeRun.status,'paused');assert.equal(x.disk().activeRun.elapsedMs,elapsed);assert.equal(x.disk().attempts.length,1);}finally{await x.close();}
});

test('legacy migration preserves exact v1 and writing completion is separate from drafts/checks',async()=>{
 const x=await fixture({legacyOnly:true,hash:'#write/w01',seed:s=>{s.notes.logic='旧笔记';s.drafts.w01='旧草稿';s.checks.w01=[0];}});
 try{const legacy=x.w.localStorage.getItem(V1);assert.equal(x.disk(),null);await x.choose('writing-run-start','w01');assert.equal(x.w.localStorage.getItem(V1),legacy);assert.equal(x.disk().schemaVersion,2);x.input('#draft','新正文 甲乙');await pause();x.advance(4000);await x.choose('run-pause',x.disk().activeRun.id);await x.route('#write/w02');x.input('#draft','第二任务');await pause();assert.equal(x.d.querySelector('[data-action="writing-run-start"]'),null);x.advance(5000);await x.route('#write/w01');await x.choose('run-resume',x.disk().activeRun.id);x.advance(3000);await x.choose('writing-run-done','w01');let s=x.disk();assert.equal(s.runs.length,1);assert.equal(s.runs[0].completed,true);assert.equal(s.runs[0].elapsedMs,7000);assert.equal(s.runs[0].draftChars,[...'新正文甲乙'].length);assert.equal(s.drafts.w02,'第二任务');assert.deepEqual(s.checks.w01,[0]);assert.equal(x.w.localStorage.getItem(V1),legacy);
 await x.route('#write/w02');await x.choose('writing-run-start','w02');x.advance(2000);await x.route('#training');await x.choose('run-end',x.disk().activeRun.id);s=x.disk();assert.equal(s.runs[1].completed,false);assert.equal(s.runs[1].draftChars,4);assert.equal(s.runs[1].elapsedMs,2000);
 }finally{await x.close();}
});

test('complete v2 backup pauses activity, imports atomically and rejects invalid or cancelled data',async()=>{
 const x=await fixture({hash:'#training'});
 try{x.input('#run-count','1');x.input('#run-budget','2');await x.choose('run-start');x.advance(5000);const b=x.d.createElement('button');b.dataset.action='backup';x.d.body.append(b);b.click();await pause();b.remove();const backup=JSON.parse(await x.exported().text());assert.equal(backup.schemaVersion,2);assert.equal(backup.activeRun.status,'paused');assert.equal(backup.activeRun.elapsedMs,5000);assert.equal(x.disk().activeRun.status,'running');await x.route('#settings');
 const doImport=async data=>{const input=x.d.querySelector('#import-file');Object.defineProperty(input,'files',{configurable:true,value:[new x.w.File([JSON.stringify(data)],'synthetic-records.json',{type:'application/json'})]});input.dispatchEvent(new x.w.Event('change',{bubbles:true}));await pause();await pause();};
 await doImport(backup);let restored=x.disk();assert.equal(restored.activeRun.status,'paused');assert.equal(restored.activeRun.elapsedMs,5000);assert.ok(restored.revision>backup.revision);const raw=x.w.localStorage.getItem(V2);
 const bad=JSON.parse(JSON.stringify(backup));bad.activeRun.items[0].qid='unknown';await doImport(bad);assert.equal(x.w.localStorage.getItem(V2),raw);assert.match(x.d.querySelector('#import-status').textContent,/导入失败/);
 x.w.confirm=()=>false;await doImport({...backup,notes:{logic:'不应覆盖'}});assert.equal(x.w.localStorage.getItem(V2),raw);
 }finally{await x.close();}
});

test('changed writing task cannot be marked complete for the frozen old task', async () => {
  const x = await fixture({ hash: '#write/w01', seed: (state,w,now) => {
    state.activeRun=w.STUDY_TRAINING.newWriting({id:'writing-changed',now:now-1000,taskId:'w01'});
    w.STUDY_TRAINING.pause(state.activeRun,now);
    w.STUDY_CONTENT.writing.find(w=>w.id==='w01').task+=' changed task';
  }});
  try {
    assert.ok(x.d.querySelector('[data-action="writing-run-done"]').disabled);
    // Handler must reject synthetic events too, not rely only on disabled UI.
    const el=x.d.querySelector('[data-action="writing-run-done"]');
    el.disabled=false;el.click();await pause();
    assert.equal(x.disk().activeRun.id,'writing-changed');assert.equal(x.disk().runs.length,0);
    await x.choose('writing-run-end','w01');
    assert.equal(x.disk().activeRun,null);assert.equal(x.disk().runs[0].completed,false);
    assert.equal(x.disk().runs[0].status,'early');
  } finally { await x.close(); }
});

test('raw backup falls back to exact cached bytes after a later SecurityError and labels it non-latest',async()=>{
 const x=await fixture({noLocks:true});const get=x.w.Storage.prototype.getItem;
 try{const raw=x.w.localStorage.getItem(V2);x.w.Storage.prototype.getItem=function(){throw new x.w.DOMException('blocked after initial read','SecurityError');};
  await x.choose('raw-backup');assert.equal(await x.exported().text(),raw);
  assert.equal(x.downloadName(),'zhixu-recovery-cached-not-latest.txt');assert.match(x.d.querySelector('#toast').textContent,/缓存.*不保证是最新/);
 }finally{x.w.Storage.prototype.getItem=get;await x.close();}
});

test('raw backup honestly reports unavailable current storage and absent cache without generating an empty file',async()=>{
 const x=await fixture({noLocks:true,empty:true});const get=x.w.Storage.prototype.getItem;
 try{x.w.Storage.prototype.getItem=function(){throw new x.w.DOMException('blocked','SecurityError');};await x.choose('raw-backup');
  assert.equal(x.exported(),null);assert.equal(x.downloadName(),'');assert.match(x.d.querySelector('#toast').textContent,/没有可用缓存.*未生成原文文件/);
 }finally{x.w.Storage.prototype.getItem=get;await x.close();}
});

test('raw backup exports readable storage exactly without a cached-file claim',async()=>{
 const x=await fixture({noLocks:true});
 try{const raw=x.w.localStorage.getItem(V2);await x.choose('raw-backup');assert.equal(await x.exported().text(),raw);assert.equal(x.downloadName(),'zhixu-recovery-raw.txt');assert.match(x.d.querySelector('#toast').textContent,/当前可读取/);}finally{await x.close();}
});

test('end confirmation counts dialog dwell and freezes completion time sampled after acceptance',async()=>{
 const x=await fixture({hash:'#quiz/timed/confirm-early',seed:(s,w,now)=>{s.activeRun=w.STUDY_TRAINING.newChoice({id:'confirm-early',now:now-5000,ids:['q01'],budgetSeconds:60});}});
 try{let prompt='';x.w.confirm=text=>{prompt=text;x.advance(10000);return true;};await x.choose('run-end','confirm-early');const r=x.disk().runs[0];
  assert.equal(r.status,'early');assert.equal(r.elapsedMs,15000);assert.equal(r.endedAt,new Date(x.now()).toISOString());assert.deepEqual(r.spentMs,[15000]);assert.match(prompt,/弹窗停留时间继续计入运行计时/);assert.match(prompt,/预算已到/);
 }finally{await x.close();}
});

test('crossing budget inside end confirmation archives timeout at the exact budget, not early at the click',async()=>{
 const x=await fixture({hash:'#quiz/timed/confirm-timeout',seed:(s,w,now)=>{s.activeRun=w.STUDY_TRAINING.newChoice({id:'confirm-timeout',now:now-55000,ids:['q01','q02'],budgetSeconds:60});}});
 try{x.w.confirm=()=>{x.advance(10000);return true;};await x.choose('run-end','confirm-timeout');const s=x.disk(),r=s.runs[0];
  assert.equal(s.activeRun,null);assert.equal(r.status,'timeout');assert.equal(r.elapsedMs,60000);assert.equal(r.endedAt,new Date(x.now()-5000).toISOString());assert.equal(s.attempts.length,0);assert.equal(x.w.STUDY_TRAINING.choiceSummary(r).total.unsubmitted,2);
 }finally{await x.close();}
});

test('paused confirmation excludes dialog dwell but records the actual confirmation completion date',async()=>{
 const x=await fixture({hash:'#quiz/timed/confirm-paused',seed:(s,w,now)=>{s.activeRun=w.STUDY_TRAINING.newChoice({id:'confirm-paused',now:now-10000,ids:['q01'],budgetSeconds:60});w.STUDY_TRAINING.pause(s.activeRun,now-5000);}});
 try{x.w.confirm=()=>{x.advance(80000);return true;};await x.choose('run-end','confirm-paused');const r=x.disk().runs[0];assert.equal(r.status,'early');assert.equal(r.elapsedMs,5000);assert.equal(r.endedAt,new Date(x.now()).toISOString());}finally{await x.close();}
});

test('cancelled end confirmation does not end early and subsequent tick still counts dialog time toward timeout',async()=>{
 const x=await fixture({hash:'#quiz/timed/confirm-cancel',seed:(s,w,now)=>{s.activeRun=w.STUDY_TRAINING.newChoice({id:'confirm-cancel',now:now-55000,ids:['q01'],budgetSeconds:60});}});
 try{x.w.confirm=()=>{x.advance(10000);return false;};await x.choose('run-end','confirm-cancel');assert.equal(x.disk().runs.length,0);assert.equal(x.disk().activeRun.status,'running');x.tick();await pause();await pause();assert.equal(x.disk().runs[0].status,'timeout');assert.equal(x.disk().runs[0].elapsedMs,60000);}finally{await x.close();}
});

test('replacement restores shell controls on success and failure without enabling deliberately disabled controls',async()=>{
 for(const failWrite of [false,true]){
  const x=await fixture();const originalSet=x.w.Storage.prototype.setItem;
  try{const raw=x.w.localStorage.getItem(V2),probe=x.d.createElement('button');probe.disabled=true;probe.textContent='intentionally disabled test shell control';x.d.body.append(probe);
   assert.equal(x.d.querySelector('#exam').disabled,false);
   if(failWrite)x.w.Storage.prototype.setItem=function(){throw new x.w.DOMException('test quota','QuotaExceededError');};
   await x.choose('reset');assert.equal(x.d.querySelector('#exam').disabled,false,'header is usable after the replacement settles');assert.equal(probe.disabled,true,'originally disabled control stays disabled');
   if(failWrite){assert.equal(x.w.localStorage.getItem(V2),raw);assert.match(x.d.querySelector('#storage-save-error').textContent,/空间不足/);}
   else{const exam=x.d.querySelector('#exam');exam.value='fujian';exam.dispatchEvent(new x.w.Event('change',{bubbles:true}));await pause();assert.equal(x.disk().exam,'fujian');}
   probe.remove();
  }finally{x.w.Storage.prototype.setItem=originalSet;await x.close();}
 }
});

test('module review distinguishes repeat attempts, unique questions and unknown old batches',async()=>{
 const x=await fixture({legacyOnly:true,hash:'#training',seed:(s,w)=>{const q=w.STUDY_CONTENT.questions.find(q=>q.meta.module==='资料分析');s.attempts=[{qid:q.id,choice:q.answer,seconds:5,at:'2026-11-01T10:00:00Z'},{qid:q.id,choice:(q.answer+1)%4,seconds:9,at:'2026-11-01T10:01:00Z'}];}});
 try{const card=x.d.querySelector('[data-module-review="资料分析"]');assert.match(card.textContent,/已做不同题 1/);assert.match(card.textContent,/最近提交正确 0/);assert.match(card.textContent,/累计提交 2 次/);assert.match(card.textContent,/0分14秒/);assert.match(x.d.querySelector('#main').textContent,/旧作答不能还原历史题组/);assert.equal(x.disk(),null);}finally{await x.close();}
});

(async () => {
  let failed = 0;
  for (const { name, run } of cases) {
    try { await run(); console.log('PASS training DOM:', name); }
    catch (error) { failed++; console.error('FAIL training DOM:', name, '\n', error.stack); }
  }
  console.log(`Training DOM cases: ${cases.length - failed}/${cases.length} passed. Synthetic locks only; no actual browser or mobile QA.`);
  if (failed) process.exitCode = 1;
})();
