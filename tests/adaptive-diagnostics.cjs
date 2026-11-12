'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const A = require('../docs/adaptive-diagnostics.js');
const now = Date.parse('2026-11-05T08:00:00.000Z');
const ago = days => new Date(now - days*86400000).toISOString();
const content = { lessons:[{id:'logic',title:'条件推理',category:'判断推理'},{id:'tiny',title:'仅两题',category:'判断推理'}],
  questions:Array.from({length:10},(_,i)=>({id:'q'+i,lesson:i<8?'logic':'tiny',options:['A','B','C','D'],answer:0,revision:1})),
  writing:[{id:'w1',lesson:'writing',title:'概括',points:['找依据','合并同类']}] };
const signature=q=>'test:'+q.id+':'+q.revision;
const blank=()=>({schemaVersion:2,attempts:[],runs:[],activeRun:null,drafts:{},checks:{},notes:{}});
function run(id,ids,days=1,choices=ids.map(()=>0),extra={}) {
  return {id,kind:'choice',status:'finished',endedAt:ago(days),startedAt:ago(days+.001),clockIssue:'',cursor:ids.length-1,
    items:ids.map(qid=>({qid,answer:0,module:'判断推理',signature:signature(content.questions.find(q=>q.id===qid))})),
    responses:ids.map((qid,i)=>choices[i]===null?null:{choice:choices[i],at:ago(days)}),spentMs:ids.map(()=>30000),...extra};
}
const d=state=>A.derive({content,state,signature,now});
const row=report=>report.rows.find(r=>r.lessonId==='logic');
const tests=[];const test=(name,fn)=>tests.push([name,fn]);
test('cold start is unknown, not weak; selection is deterministic',()=>{
  const r=d(blank());assert.equal(row(r).status,'unseen');assert.equal(A.recommend(r).selectedIds.length,6);
  assert.deepEqual(A.recommend(r),A.recommend(d(blank())));
});
test('baseline covers knowledge points without repeating ids or claiming a full assessment',()=>{
  const b=A.baseline(d(blank()),{limit:5});assert.equal(new Set(b.selectedIds).size,5);assert.ok(b.selected.some(x=>x.lessonId==='tiny'));assert.match(b.notice,/不是全科测评/);
});
test('baseline module filter and exhausted pool do not fabricate questions',()=>{
  assert.equal(A.baseline(d(blank()),{module:'不存在'}).selectedIds.length,0);assert.equal(A.baseline(d(blank())).selectedIds.length,10);
});
test('legacy v1 is accepted without inventing a content version',()=>{
  const s={schemaVersion:1,attempts:[{qid:'q0',choice:1,at:ago(1),seconds:30}],drafts:{},checks:{}};
  const r=row(d(s));assert.equal(r.status,'historical');assert.equal(r.counts.wrong,0);assert.deepEqual(r.historicalMismatchIds,['q0']);
});
test('terminal run and mirrored attempts count once',()=>{
  const s=blank();s.runs=[run('r1',['q0'],1,[1])];s.attempts=[{qid:'q0',...s.runs[0].responses[0],seconds:10}];
  const r=d(s);assert.equal(r.events.length,1);assert.equal(r.omitted.mirroredAttempts,1);assert.equal(row(r).timing.submittedMedianSeconds,10);
});
test('two mirrors cannot double count a response',()=>{
  const s=blank();s.runs=[run('r1',['q0'])];s.attempts=Array.from({length:2},()=>({qid:'q0',...s.runs[0].responses[0],seconds:10}));
  assert.equal(d(s).events.length,1);
});
test('active run and its mirror are excluded without inventing a failure',()=>{
  const s=blank();s.activeRun=run('active',['q0'],1,[1],{status:'paused',endedAt:null});s.attempts=[{qid:'q0',...s.activeRun.responses[0],seconds:10}];
  const r=d(s);assert.equal(r.events.length,0);assert.equal(r.omitted.activeResponses,1);assert.ok(!row(r).freshIds.includes('q0'));
});
test('not reached and seen unsubmitted stay separate from wrong',()=>{
  const s=blank();s.runs=[run('r',['q0','q1','q2'],1,[1,null,null],{cursor:1,status:'timeout'})];
  const r=row(d(s));assert.equal(r.counts.wrong,1);assert.equal(r.counts.unsubmitted,2);assert.equal(r.counts.notReached,1);
});
test('one question repeated many times never meets sample requirement',()=>{
  const s=blank();s.runs=Array.from({length:12},(_,i)=>run('r'+i,['q0'],i+1,[1]));
  const r=row(d(s));assert.equal(r.status,'insufficient');assert.equal(r.counts.distinct,1);
});
test('five questions on one day remain insufficient',()=>{
  const s=blank();s.runs=[run('r',['q0','q1','q2','q3','q4'],1,[1,1,0,0,0])];assert.equal(row(d(s)).status,'insufficient');
});
test('five different current-version questions on two days with two wrong trigger review',()=>{
  const s=blank();s.runs=[run('r1',['q0','q1','q2'],2,[1,1,0]),run('r2',['q3','q4'],1,[0,0])];
  const r=row(d(s));assert.equal(r.status,'review');assert.equal(r.evidence.length,5);assert.equal(r.counts.days,2);
  const p=A.recommend(d(s));assert.deepEqual(p.steps[1].ids,['q0','q1']);assert.ok(p.steps[2].ids.every(id=>['q5','q6','q7'].includes(id)));
});
test('wrong then correct on the same question still flags need for different-question checking',()=>{
  const s=blank();s.runs=[run('r1',['q0'],2,[1]),run('r2',['q0'],1,[0])];
  assert.deepEqual(row(d(s)).correctedSameIds,['q0']);assert.equal(row(d(s)).counts.distinct,1);
});
test('changed fingerprint cannot be relabeled with current answer',()=>{
  const s=blank();s.runs=[run('r1',['q0'],1,[0])];s.runs[0].items[0].signature='old';
  const r=d(s);assert.equal(row(r).counts.distinct,0);assert.equal(r.events[0].outcome,'correct');assert.equal(r.events[0].version,'changed-or-unknown');
});
test('changed option count preserves the frozen historical result',()=>{
  const s=blank();s.runs=[run('r1',['q0'],1,[3])];s.runs[0].items[0].answer=3;s.runs[0].items[0].signature='old';
  const revised=JSON.parse(JSON.stringify(content));revised.questions[0].options=['A','B'];
  const r=A.derive({content:revised,state:s,signature,now});assert.equal(r.events[0].outcome,'correct');assert.equal(row(r).counts.distinct,0);
});
test('clock anomalies cannot support recency inference',()=>{
  const s=blank();s.runs=[run('r1',['q0'],1,[1],{clockIssue:'backward'})];assert.equal(row(d(s)).counts.distinct,0);
});
test('newer unversioned record does not let an older verified answer pretend to be latest',()=>{
  const s=blank();s.runs=[run('r1',['q0'],2,[1])];s.attempts=[{qid:'q0',choice:0,at:ago(1),seconds:1}];assert.equal(row(d(s)).counts.distinct,0);
});
test('out-of-order imported arrays use timestamps, not append order',()=>{
  const s=blank();s.runs=[run('r2',['q0'],1,[0]),run('r1',['q0'],2,[1])];assert.equal(row(d(s)).counts.correct,1);
});
test('stale records remain evidence but do not label current weakness',()=>{
  const s=blank();s.runs=[run('r1',['q0'],40,[1])];const r=d(s);assert.equal(row(r).status,'historical');assert.equal(r.events.length,1);
});
test('future timestamps do not contaminate recommendations',()=>{
  const s=blank();s.runs=[run('future',['q0'],-1,[1])];const r=d(s);assert.equal(r.omitted.future,1);assert.equal(row(r).counts.distinct,0);assert.ok(!row(r).freshIds.includes('q0'));
});
test('tiny bank is disclosed instead of lowering the diagnostic threshold',()=>{
  const r=d(blank()).rows.find(x=>x.lessonId==='tiny');assert.ok(r.reasons.some(x=>x.includes('题库不足')));
});
test('draft and self-check records are not auto-scored or echoed',()=>{
  const s=blank();s.drafts.w1='私人材料 SECRET';s.notes.logic='SECRET NOTE';s.checks.w1=[0];
  const r=d(s);assert.equal(r.writing[0].status,'self-check-pending');assert.ok(!JSON.stringify(r).includes('SECRET'));
});
test('same self-check count never asserts writing mastery',()=>{
  const s=blank();s.drafts.w1='写作';s.checks.w1=[0,1];const r=d(s);assert.equal(r.writing[0].status,'self-check-recorded');assert.ok(!('score' in r.writing[0]));
});
test('derive does not mutate the state, content or frozen records',()=>{
  const s=blank();s.runs=[run('r1',['q0'],1,[1])];const before=JSON.stringify({s,content});d(s);assert.equal(JSON.stringify({s,content}),before);
});
test('missing signature capability is conservative, not a current-version guess',()=>{
  const s=blank();s.runs=[run('r1',['q0'])];const r=A.derive({content,state:s,now});assert.equal(row(r).counts.distinct,0);
});
test('actual current content and training model integrate read-only',()=>{
  const root=require('node:path').join(__dirname,'..','docs');const html=fs.readFileSync(root+'/index.html','utf8');const context={window:{}};vm.createContext(context);
  const excluded=new Set(['app-studio-20261112.js','local-progress-store.js','training-workspace.js','shenlun-feedback.js']);
  for(const m of html.matchAll(/src="\.\/([^\"]+\.js)"/g))if(!excluded.has(m[1]))vm.runInContext(fs.readFileSync(root+'/'+m[1],'utf8'),context);
  const C=context.window.STUDY_CONTENT,T=context.window.STUDY_TRAINING,q=C.questions[0],s=blank();
  const r=T.newChoice({id:'synthetic-adaptive',now:now-60000,ids:[q.id],budgetSeconds:120});const response=T.submit(r,q.answer,now-30000);T.finish(r,now,{reason:'finished'});
  s.runs=[r];s.attempts=[{qid:q.id,choice:response.choice,at:response.at,seconds:response.seconds}];
  const before=JSON.stringify({s,C});const result=A.derive({content:C,state:s,signature:T.signature,now});
  assert.equal(result.events.length,1);assert.equal(result.events[0].version,'current');assert.equal(JSON.stringify({s,C}),before);
  console.log(`  Current-content contract: ${C.lessons.length} lessons / ${C.questions.length} questions / ${C.writing.length} writing tasks`);
});
for(const [name,fn] of tests){try{fn();console.log('PASS '+name);}catch(e){console.error('FAIL '+name);throw e;}}
console.log(`${tests.length} focused tests passed. No browser, persistence writes, production data or deployment were exercised.`);
