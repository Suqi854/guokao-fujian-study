'use strict';
// Bounded group contracts against final source. No browser, network, real storage or semantic question re-audit.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const A=require('../docs/adaptive-diagnostics.js');
const source=path.join(__dirname,'..'),candidate=path.join(source,'docs')+path.sep;
const baselineCommit='91c1761b4512073b6c89dbfc66dc30a5c1f48892';
const baselineFiles=new Map();
function baseline(file){if(!baselineFiles.has(file))baselineFiles.set(file,fs.readFileSync(path.join(source,'docs',file),'utf8'));return baselineFiles.get(file);}
const now=Date.parse('2026-11-05T18:00:00.000Z'),day=86400000;
const baseState=()=>({schemaVersion:2,revision:0,exam:'fujian',attempts:[],runs:[],activeRun:null,notes:{},drafts:{},checks:{},read:[],favorites:[]});
const copy=x=>JSON.parse(JSON.stringify(x));
function environment(content){
  const context=vm.createContext({window:{STUDY_CONTENT:content}});
  vm.runInContext(baseline('training-records.js'),context);
  return {C:content,T:context.window.STUDY_TRAINING};
}
function fixture(){
  const q=(id,extra={})=>({id,lesson:'logic',options:['A','B','C','D'],answer:0,meta:{module:'判断推理'},...extra});
  return {categories:['全部','判断推理','言语理解'],lessons:[{id:'logic',title:'测试条件推理',category:'判断推理'}],
    questions:[q('q1',{materialGroup:'g1'}),q('q2',{materialGroup:'g1'}),q('q3',{materialGroup:'g2'}),q('q4',{materialId:'m1'}),q('q5'),q('q6'),q('q7',{materialGroup:'g3'}),q('q8',{materialGroup:'g3'}),q('q9',{materialId:'m1'})],
    questionMaterials:{m1:{title:'合成测试材料',note:'不用于公开题库',tables:[{columns:['测试列'],rows:[[1]]}]}},
    writing:[{id:'w1',lesson:'logic',title:'合成写作任务',points:['核对依据','检查范围']}]};
}
function finish(e,id,ids,days=1,wrongIds=[]){
  let at=now-days*day;
  const r=e.T.newChoice({id,now:at,ids,budgetSeconds:600});
  for(const qid of ids){const q=e.C.questions.find(q=>q.id===qid);at+=1000;assert.equal(e.T.submit(r,wrongIds.includes(qid)?(q.answer+1)%q.options.length:q.answer,at).accepted,true);assert.equal(e.T.advance(r,at),true);}
  return r;
}
function derive(e,s=baseState()){return A.derive({content:e.C,state:{...s,...e.T.validate(s)},signature:e.T.signature,now});}
const row=(r,id='logic')=>r.rows.find(r=>r.lessonId===id);
const transfer=(r,id='logic',limit=6)=>A.recommend(r,{lessonId:id,limit}).steps.find(s=>s.kind==='transfer');
const tests=[];function test(name,fn){tests.push([name,fn]);}
const deepFreeze=o=>{if(o&&typeof o==='object'&&!Object.isFrozen(o)){Object.values(o).forEach(deepFreeze);Object.freeze(o);}return o;};

// Use actual current content plus candidate once, retaining all original object identities.
const live=(()=>{
  const c=vm.createContext({window:{}}),html=baseline('index.html');
  let oldQuestions,oldLessons,oldCopies;
  for(const [,file] of html.matchAll(/src="\.\/([^"]+)"/g)){
    if(file==='app.js'||file==='practice-next.js')continue;
    if(file==='coverage-map.js'){
      oldQuestions=c.window.STUDY_CONTENT.questions.slice();oldLessons=c.window.STUDY_CONTENT.lessons.slice();
      oldCopies=copy(oldQuestions);
      vm.runInContext(fs.readFileSync(candidate+'practice-next.js','utf8'),c);
    }
    vm.runInContext(file==='adaptive-diagnostics.js'||file==='adaptive-workspace.js'?fs.readFileSync(path.join(source,'docs',file),'utf8'):baseline(file),c);
  }
  return {C:c.window.STUDY_CONTENT,T:c.window.STUDY_TRAINING,oldQuestions,oldLessons,oldCopies};
})();

test('actual integration retains 594 questions, 94 lessons, all 567 old question objects/signatures and 91 lesson objects',()=>{
  assert.equal(live.C.questions.length,594);assert.equal(live.C.lessons.length,94);
  for(const q of live.oldQuestions)assert.equal(live.C.questions.find(n=>n.id===q.id),q);
  for(const l of live.oldLessons)assert.equal(live.C.lessons.find(n=>n.id===l.id),l);
  for(const q of live.oldCopies)assert.equal(live.T.signature(q),live.T.signature(live.C.questions.find(n=>n.id===q.id)));
});
test('actual candidate 6 questions / 2 groups / 2 days stays insufficient whether all correct or all wrong',()=>{
  const ids=live.C.questions.filter(q=>q.lesson==='pn-compound-logic').slice(0,6).map(q=>q.id);
  for(const wrong of [[],ids]){const s=baseState();s.runs=[finish(live,'day-a',ids.slice(0,3),2,wrong),finish(live,'day-b',ids.slice(3),1,wrong)];const r=row(derive(live,s),'pn-compound-logic');assert.equal(r.counts.distinct,6);assert.equal(r.counts.groups,2);assert.equal(r.counts.days,2);assert.equal(r.status,'insufficient');assert.equal(r.counts.wrongGroups,wrong.length?2:0);}
});
test('actual candidate 9 questions / 3 groups cannot reach 5-group rule; material/condition pool limit is visible',()=>{
  for(const lesson of ['pn-compound-logic','pn-share-scope']){const ids=live.C.questions.filter(q=>q.lesson===lesson).map(q=>q.id),s=baseState();s.runs=[0,1,2].map(i=>finish(live,'group-'+i,ids.slice(i*3,i*3+3),3-i));const r=row(derive(live,s),lesson);assert.equal(r.counts.distinct,9);assert.equal(r.counts.groups,3);assert.equal(r.status,'insufficient');assert(r.reasons.some(s=>s.includes('9题、3个题/条件组')&&s.includes('题库不足')));}
});
test('actual same-group siblings are no longer called transfer; two new groups provide one question each',()=>{
  const s=baseState();s.runs=[finish(live,'seen-one',['pn-compound-logic-01'],1,['pn-compound-logic-01'])];
  const r=derive(live,s),t=transfer(r,'pn-compound-logic');
  assert.deepEqual(Array.from(t.ids),['pn-compound-logic-04','pn-compound-logic-07']);
  assert(!t.ids.includes('pn-compound-logic-02'));assert(!t.ids.includes('pn-compound-logic-03'));
  assert.match(t.label,/题\/条件组，各选1题/);
});
test('5 different groups / 2 days can support observation; 2 errors from one group do not trigger review',()=>{
  const e=environment(fixture()),s=baseState();s.runs=[finish(e,'a',['q1','q2','q3'],2,['q1','q2']),finish(e,'b',['q4','q5','q6'])];
  const r=row(derive(e,s));assert.equal(r.counts.distinct,6);assert.equal(r.counts.groups,5);assert.equal(r.counts.wrong,2);assert.equal(r.counts.wrongGroups,1);assert.equal(r.status,'observe');
});
test('at least 2 errors across 2 groups supports review only after 5-group / 2-day gate',()=>{
  const e=environment(fixture()),s=baseState();s.runs=[finish(e,'a',['q1','q2','q3'],2,['q1','q3']),finish(e,'b',['q4','q5','q6'])];assert.equal(row(derive(e,s)).status,'review');assert.equal(row(derive(e,s)).counts.wrongGroups,2);
  s.runs=[finish(e,'one-day',['q1','q2','q3','q4','q5','q6'],1,['q1','q3'])];assert.equal(row(derive(e,s)).status,'insufficient');
});
test('5 unmarked single questions retain ordinary behavior and explicitly do not guarantee independence',()=>{
  const c=fixture();for(const q of c.questions){delete q.materialGroup;delete q.materialId;}const e=environment(c),s=baseState();s.runs=[finish(e,'a',['q1','q2','q3'],2),finish(e,'b',['q4','q5'])];const r=derive(e,s);assert.equal(row(r).counts.groups,5);assert.equal(row(r).status,'stable');assert.match(r.notice,/未标注关联的题暂按单题一组；不同组不保证统计独立/);
});
test('repeated same question and sibling outcomes retain latest-per-q behavior without inflating group count',()=>{
  const e=environment(fixture()),s=baseState();s.runs=[finish(e,'a',['q1'],3,['q1']),finish(e,'b',['q1'],2),finish(e,'c',['q2'],1,['q2'])];const r=row(derive(e,s));assert.equal(r.counts.distinct,2);assert.equal(r.counts.groups,1);assert.equal(r.counts.wrongGroups,1);assert.equal(r.status,'insufficient');assert.deepEqual(r.correctedSameIds,['q1']);
});
test('legacy unversioned attempts stay historical but exclude exposed-group siblings from transfer',()=>{
  const e=environment(fixture()),s=baseState();s.attempts=[{qid:'q1',choice:1,at:new Date(now-day).toISOString(),seconds:5}];const r=derive(e,s);assert.equal(row(r).status,'historical');assert.equal(row(r).counts.groups,0);assert.deepEqual(row(r).historicalMismatchIds,['q1']);assert(!transfer(r).ids.includes('q2'));
});
test('active runs and mirrored attempts remain excluded; all pending groups cannot appear as fresh transfer',()=>{
  const e=environment(fixture()),s=baseState();const at=now-60000;s.activeRun=e.T.newChoice({id:'active',ids:['q1','q3'],now:at,budgetSeconds:600});const event=e.T.submit(s.activeRun,1,at+1000);e.T.pause(s.activeRun,at+2000);s.attempts=[{qid:event.qid,choice:event.choice,at:event.at,seconds:event.seconds}];const r=derive(e,s);assert.equal(r.events.length,0);assert.equal(r.omitted.activeResponses,1);assert.equal(row(r).counts.groups,0);assert(!transfer(r).ids.some(id=>['q1','q2','q3'].includes(id)));
});
test('terminal mirror de-duplication and timing remain unchanged',()=>{
  const e=environment(fixture()),s=baseState();s.runs=[finish(e,'one',['q1'],1,['q1'])];const a={qid:'q1',...s.runs[0].responses[0],seconds:7};s.attempts=[a,{...a}];const r=derive(e,s);assert.equal(r.events.length,1);assert.equal(r.omitted.mirroredAttempts,2);assert.equal(row(r).counts.distinct,1);assert.equal(row(r).counts.groups,1);assert.equal(row(r).timing.submittedMedianSeconds,7);
});
test('changed version, clock anomaly and future timestamps do not become current group evidence, but imply exposure',()=>{
  for(const kind of ['changed','clock','future']){const e=environment(fixture()),s=baseState();s.runs=[finish(e,'one',['q1'],kind==='future'?-1:1,['q1'])];if(kind==='changed')s.runs[0].items[0].signature='v1:q4:0000000000000000';if(kind==='clock')s.runs[0].clockIssue='backward';const r=derive(e,s);assert.equal(row(r).counts.groups,0);assert(!transfer(r).ids.includes('q2'));}
});
test('newer unversioned response suppresses older confirmed evidence, including the group count',()=>{
  const e=environment(fixture()),s=baseState();s.runs=[finish(e,'old',['q1'],2,['q1'])];s.attempts=[{qid:'q1',choice:0,at:new Date(now-day).toISOString(),seconds:1}];const r=derive(e,s);assert.equal(row(r).counts.distinct,0);assert.equal(row(r).counts.groups,0);assert(!transfer(r).ids.includes('q2'));
});
test('seen-but-unsubmitted blocks sibling transfer; not-reached alone is not treated as exposure or an error',()=>{
  const e=environment(fixture()),s=baseState();s.activeRun=null;const at=now-day,r=e.T.newChoice({id:'interrupted',ids:['q1','q3'],now:at,budgetSeconds:600});e.T.finish(r,at+1000);s.runs=[r];const d=derive(e,s);assert.equal(row(d).counts.unsubmitted,2);assert.equal(row(d).counts.notReached,1);assert.equal(row(d).counts.wrongGroups,0);assert(!transfer(d).ids.some(id=>['q1','q2'].includes(id)));assert(transfer(d).ids.includes('q3'));
});
test('materialId siblings coalesce without adding or altering materialGroup on questions',()=>{
  const e=environment(fixture()),s=baseState(),before=JSON.stringify(e.C);s.runs=[finish(e,'material-a',['q4'],2),finish(e,'material-b',['q9'],1)];const r=row(derive(e,s));assert.equal(r.counts.distinct,2);assert.equal(r.counts.groups,1);assert.equal(r.status,'insufficient');assert.equal(JSON.stringify(e.C),before);
});
test('both material fields form transitive groups; unrelated equal strings in different fields remain separate',()=>{
  const c=fixture();c.questions[0].materialGroup='bridge-a';c.questions[0].materialId='m1';c.questions[1].materialGroup='bridge-a';c.questions[2].materialGroup='m1';const e=environment(c),r=derive(e);assert.equal(r.questionGroups.q1,r.questionGroups.q2);assert.equal(r.questionGroups.q1,r.questionGroups.q4);assert.equal(r.questionGroups.q1,r.questionGroups.q9);assert.notEqual(r.questionGroups.q3,r.questionGroups.q4);
  const reordered=copy(c);reordered.questions.reverse();assert.deepEqual(derive(environment(reordered)).questionGroups,r.questionGroups);
});
test('baseline deduplicates groups across lessons and modules, preserves module filtering, and never fills with sibling questions',()=>{
  const c=fixture();c.lessons.push({id:'verbal',title:'跨课组测试',category:'言语理解'});c.questions[1].lesson='verbal';c.questions[1].meta.module='言语理解';const e=environment(c),r=derive(e),b=A.baseline(r,{limit:12});assert.equal(b.selectedIds.length,6);assert.equal(new Set(b.selected.map(q=>q.groupId)).size,6);assert(!(b.selectedIds.includes('q1')&&b.selectedIds.includes('q2')));assert.equal(A.baseline(r,{limit:12,module:'言语理解'}).selectedIds.length,1);
  const s=baseState();s.runs=[finish(e,'other-lesson',['q2'])];const after=derive(e,s);assert(!A.baseline(after,{module:'判断推理'}).selectedIds.includes('q1'));
});
test('when all groups were exposed, do not fill transfer with unsubmitted siblings',()=>{
  const e=environment(fixture()),s=baseState();s.runs=[finish(e,'all-groups',['q1','q3','q4','q5','q6','q7'])];const r=derive(e,s);assert.deepEqual(transfer(r).ids,[]);assert.match(transfer(r).label,/同组变式或重练，但不作为新组迁移检验/);assert.deepEqual(A.baseline(r).selectedIds,[]);assert.equal(A.baseline(r).href,null);assert(row(r).freshIds.includes('q2'),'old q-level count retained separately');
});
test('derive/recommend/baseline accept deep-frozen inputs without mutation or echoing private drafts/notes',()=>{
  const e=environment(fixture()),s=baseState();s.runs=[finish(e,'one',['q1'],1,['q1'])];s.notes.logic='PRIVATE_NOTE';s.drafts.w1='PRIVATE_DRAFT';s.checks.w1=[0];deepFreeze(e.C);deepFreeze(s);const before=JSON.stringify({C:e.C,s});const r=A.derive({content:e.C,state:s,signature:e.T.signature,now});A.recommend(r);A.baseline(r);assert.equal(JSON.stringify({C:e.C,s}),before);assert(!JSON.stringify(r).includes('PRIVATE_'));assert.equal(r.writing[0].checkedCount,1);assert.equal(r.writing[0].status,'self-check-pending');assert(!('score' in r.writing[0]));
});
test('renderer shows question/group/error-group counts and updated rules with safe literal escaping',()=>{
  const e=environment(fixture()),s=baseState();e.C.lessons[0].title='<img src=x onerror=bad()> test';s.runs=[finish(e,'a',['q1','q2','q3'],2,['q1','q2']),finish(e,'b',['q4','q5','q6'])];
  const ctx=vm.createContext({window:{},Date:class extends Date{static now(){return now;}}});vm.runInContext(fs.readFileSync(path.join(source,'docs','adaptive-workspace.js'),'utf8'),ctx);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ui=ctx.window.STUDY_ADAPTIVE_UI.create({C:e.C,T:e.T,A,esc,btn:(label,href)=>'<a href="'+esc(href)+'">'+esc(label)+'</a>',heading:(_a,b,c)=>'<h1>'+esc(b)+'</h1><p>'+esc(c)+'</p>',getState:()=>s,getError:()=>'',isSaving:()=>false});
  const before=JSON.stringify(s),html=ui.page(['diagnostics','lesson','logic']);
  assert.match(html,/不同题 6 道，对 4 道，错 2 道/);assert.match(html,/覆盖 5 个题\/条件组，其中 1 组有答错/);assert.match(html,/至少5道不同题且5个题\/条件组、2个作答日/);assert.match(html,/最近答错至少2道且涉及2个组/);assert.match(html,/不代表统计独立/);assert(!html.includes('<img'));assert(html.includes('&lt;img'));assert.equal(JSON.stringify(s),before);
});
test('module and renderer contain no persistence or network calls; observation logic never rewrites question metadata',()=>{
  for(const f of ['adaptive-diagnostics.js','adaptive-workspace.js']){const s=fs.readFileSync(path.join(source,'docs',f),'utf8');assert(!/\b(?:localStorage|sessionStorage|fetch|XMLHttpRequest|WebSocket|sendBeacon|indexedDB)\b/.test(s));assert(!/\.meta\s*=/.test(s));}
});
let passed=0;
for(const [name,fn] of tests){try{fn();passed++;console.log('PASS '+name);}catch(error){console.error('FAIL '+name);throw error;}}
console.log(`${passed} bounded cases passed. Synthetic inputs only; no old suite, browser, network, persistence, deployment or answer recalculation.`);
