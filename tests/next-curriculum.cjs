"use strict";
// Atomic integration and compatibility guards, not a claim of full semantic review.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8');
const scripts=[...html.matchAll(/src="\.\/([^\"]+)"/g)].map(m=>m[1]).filter(f=>!['app.js','curriculum-v036.js','politics-v036.js','curriculum-v037.js','policy-v037.js'].includes(f)),adapter='next-curriculum.js';
assert.equal(scripts.filter(f=>f===adapter).length,1);assert.ok(scripts.indexOf(adapter)<scripts.indexOf('catalog.js'));
const execute=(c,f)=>vm.runInContext(fs.readFileSync(path.join(root,'docs',f),'utf8'),c,{filename:f});
const context=()=>vm.createContext({window:{}}),plain=x=>JSON.parse(JSON.stringify(x));
function preflight(){const c=context();for(const f of scripts.slice(0,scripts.indexOf(adapter)))execute(c,f);return c;}
const c=context(),base=context();for(const f of scripts){execute(c,f);if(f!==adapter)execute(base,f);}
const C=plain(c.window.STUDY_CONTENT),old=plain(base.window.STUDY_CONTENT),patchIds=['scoped-reading','profit-bases','mixed-weights','work-stages'];
const canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(canonical).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}',hash=v=>crypto.createHash('sha256').update(canonical(v)).digest('hex');
const fixture=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/v030-public-identities.json'),'utf8'));
for(const[name,entries]of Object.entries(fixture.collections))for(const[id,h]of Object.entries(entries)){
 const current=C[name].find(v=>v.id===id);assert.ok(current,name+'/'+id);
 if(name==='lessons'&&patchIds.includes(id)){
  const prior=fixture.revisedLessons[id],rest=v=>Object.fromEntries(Object.entries(v).filter(([key])=>!['sections','minutes','updated','practice','learningLevels'].includes(key)));
  assert.deepEqual(plain(rest(current)),rest(prior),id+' only allowed lesson fields changed');
  assert.deepEqual(plain(current.practice.slice(0,prior.practice.length)),prior.practice,id+' old practice IDs retained');
  assert.equal(current.practice.length,prior.practice.length+9);assert.equal(prior.learningLevels,undefined);assert.ok(current.learningLevels);
 }else assert.equal(hash(current),h,'Existing public object changed: '+name+'/'+id);
}
for(const[id,h]of Object.entries(fixture.sources))assert.equal(hash(C.sources[id]),h);
for(const[id,h]of Object.entries(fixture.theoryLearningAids))assert.equal(hash(C.theoryLearningAids[id]),h);
assert.deepEqual(C.theoryTrack.steps.map(s=>s.lessonId).filter(id=>fixture.theoryStepIds.includes(id)),fixture.theoryStepIds);
assert.deepEqual([C.lessons.length,C.questions.length,C.writing.length,C.lessons.filter(l=>l.learningLevels).length,Object.keys(C.sources).length],[102,669,75,88,40]);
assert.equal(new Set(C.writing.map(w=>w.material)).size,33);assert.equal(C.lessons.filter(l=>!l.learningLevels).length,14);
assert.equal(C.theoryTrack.steps.length,10);assert.equal(Object.keys(C.theoryLearningAids).length,10);
for(const field of ['lessons','questions','writing'])assert.equal(new Set(C[field].map(v=>v.id)).size,C[field].length,field+' unique IDs');
const extra=C.questions.filter(q=>q.id.startsWith('rx-')||q.id.startsWith('pol3-'));assert.equal(extra.length,48);
for(const q of extra){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.optionReviews.length,4);assert.equal(q.explanation,q.optionReviews[q.answer]);assert.equal(q.meta.source.kind,'original');assert.equal(q.meta.examSource.year,null);assert.equal(q.meta.difficulty.level,null);}
for(const stage of ['识别概念','迁移运用','检查边界'])assert.equal(C.questions.filter(q=>q.meta.trainingStage===stage).length,195);
for(const id of patchIds){const l=C.lessons.find(l=>l.id===id);assert.equal(l.sections.length,9);assert.deepEqual(plain(Object.values(l.learningLevels).flatMap(g=>g.sections)),[0,1,2,3,4,5,6,7,8]);for(const g of Object.values(l.learningLevels))assert.equal(g.questionIds.length,3);}
for(const q of old.questions)assert.equal(c.window.STUDY_TRAINING.signature(C.questions.find(v=>v.id===q.id)),base.window.STUDY_TRAINING.signature(q),'Old training fingerprint retained: '+q.id);
const normalized=s=>[...s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'')].length,raw=s=>[...s.replace(/\s/gu,'')].length;
for(const [label,qs,max]of [['reading',extra.filter(q=>q.lesson==='scoped-reading'),3],['political',extra.filter(q=>q.id.startsWith('pol3-')),4]])for(const size of [normalized,raw]){
 const m={atMaximum:0,atMinimum:0,firstMaximum:0,firstMinimum:0};for(const q of qs){const sizes=q.options.map(size);m.atMaximum+=Number(sizes[q.answer]===Math.max(...sizes));m.atMinimum+=Number(sizes[q.answer]===Math.min(...sizes));m.firstMaximum+=Number(q.answer===sizes.indexOf(Math.max(...sizes)));m.firstMinimum+=Number(q.answer===sizes.indexOf(Math.min(...sizes)));}assert.ok(Object.values(m).every(v=>v<=max),label+' option length cue '+JSON.stringify(m));
}
const rx=extra.filter(q=>q.id.startsWith('rx-')),positions=[0,0,0,0];for(const q of rx)positions[q.answer]++;assert.deepEqual(positions,[9,9,9,9]);
const answerStrings=patchIds.map(id=>rx.filter(q=>q.lesson===id).map(q=>q.answer).join(''));assert.equal(new Set(answerStrings).size,4,'Distinct lesson answer sequences');
const work=rx.find(q=>q.id==='rx-work-stages-06');assert.match(work.stem,/0[至—~～到-]20|0\s*到\s*20|0\s*至\s*20/,'Capacity attainability made explicit');
for(const w of C.writing.filter(w=>w.id.startsWith('w_next_'))){const length=raw(w.sample);assert.ok(length<=w.limit);assert.equal(new Set([...w.material.matchAll(/【(\d+)】/g)].map(m=>m[1])).size,10);assert.equal(w.points.length,w.evidenceDetails.length);assert.equal(w.provenance.kind,'original-fictional');assert.equal(w.provenance.officialScore,null);}
// Every preflight failure leaves the original object, arrays and old record references intact.
const cases=[
 ['late question',b=>b.questions.push({id:'pol3-12'}),/question ID conflict/],
 ['late writing',b=>b.writing.push({id:'w_next_compare_advanced'}),/writing ID conflict/],
 ['late source',b=>{b.sources['unified-market-explainer-2025']={title:'keep'};},/source ID conflict/],
 ['late aid',b=>{b.theoryLearningAids['unified-market-rules']={memoryCue:'keep'};},/learning aid ID conflict/],
 ['old lesson already layered',b=>{b.lessons.find(l=>l.id==='work-stages').learningLevels={};},/unexpected unlayered lesson state/],
 ['missing late insertion anchor',b=>{b.theoryTrack.steps=b.theoryTrack.steps.filter(s=>s.lessonId!=='reform-framework-2024');},/missing theory insertion anchor/]
];
for(const[label,prepare,error]of cases){const v=preflight(),b=v.window.STUDY_CONTENT;prepare(b);const snapshot=JSON.stringify(b);assert.throws(()=>execute(v,adapter),error,label);assert.strictEqual(v.window.STUDY_CONTENT,b);assert.equal(JSON.stringify(b),snapshot,label+' atomic rejection');}
const frozen=preflight(),prior=frozen.window.STUDY_CONTENT;function freeze(v){if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;}freeze(prior);const snapshot=JSON.stringify(prior);execute(frozen,adapter);assert.equal(JSON.stringify(prior),snapshot);for(const l of prior.lessons)if(!patchIds.includes(l.id))assert.strictEqual(frozen.window.STUDY_CONTENT.lessons.find(v=>v.id===l.id),l);
const final=c.window.STUDY_CONTENT,serialized=JSON.stringify(final);assert.throws(()=>execute(c,adapter),/next-curriculum preflight rejected/);assert.strictEqual(c.window.STUDY_CONTENT,final);assert.equal(JSON.stringify(final),serialized);
assert.ok(!fs.readFileSync(path.join(root,'docs',adapter),'utf8').match(/\/workspace\/|libfile_|claimIds|answerAudit/),'No private source package metadata');
console.log('PASS Next batch: 102 lessons/669 original questions/75 writing/88 layered, 10 theory themes, exact old identities except four constrained lesson revisions');
console.log('PASS All 519 prior question fingerprints unchanged, atomic late-conflict/frozen-base imports, original provenance and finite option-pattern guards');
