'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const base=require('./fixtures/v038-political-baseline.json'),root=path.join(__dirname,'..');
const canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(canonical).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
const hash=v=>crypto.createHash('sha256').update(canonical(v)).digest('hex');
const order=['marx-worldview','marx-connection','contradiction-method','marx-quantity-negation','marx-categories','practice-cognition','marx-truth-value','productive-relations','marx-social-structure','social-being-people','marx-commodity-value','marx-surplus-capital','marx-capitalism-development','marx-socialism-communism','mao-thought-context','mao-living-soul','mao-new-democratic','mao-revolution-methods','mao-socialist-transition','mao-socialist-exploration','deng-core-framework','deng-reform-market','three-represents-theory','scientific-development-theory','six-method-principles','development','modernization','new-quality-productivity','reform-framework-2024','unified-market-rules','new-development-pattern','education-strong-2035'];
let main;
for(const page of ['index.html','long-mock.html']){
 const c={window:{},TextEncoder};vm.createContext(c);
 for(const k of ['localStorage','sessionStorage','indexedDB','fetch'])for(const target of [c,c.window])Object.defineProperty(target,k,{get(){throw Error('unexpected data or network access '+k);}});
 const scripts=[...fs.readFileSync(path.join(root,'docs',page),'utf8').matchAll(/src="\.\/([^"]+)"/g)].map(m=>m[1]);
 for(const file of ['political-mao-deng-expansion.js','marxism-course-20261107.js','political-complete-integration.js'])assert.equal(scripts.filter(x=>x===file).length,1);
 for(const f of scripts)if(!['app-studio-20261112.js','long-mock-workspace.js','long-mock-store.js','policy-current-2026.js'].includes(f))vm.runInContext(fs.readFileSync(path.join(root,'docs',f),'utf8'),c,{filename:f});
 const C=c.window.STUDY_CONTENT,plain=x=>JSON.parse(JSON.stringify(x));
 assert.deepEqual([C.lessons.length,C.questions.length,C.writing.length,C.lessons.filter(l=>l.learningLevels).length,Object.keys(C.sources).length],[123,861,87,115,74]);
 for(const [name,rows]of Object.entries(base.collections))for(const [id,wanted]of Object.entries(rows))assert.equal(hash(require("./learning-release-identity-projection.cjs")(C)[name].find(x=>x.id===id)),wanted,page+' old '+name+'/'+id);
 for(const [name,rows]of Object.entries(base.maps))for(const [id,wanted]of Object.entries(rows))assert.equal(hash(name==='memoryCards'?c.window.STUDY_MEMORY_METHODS.cards[id]:C[name][id]),wanted,page+' old '+name+'/'+id);
 for(const [name,wanted]of Object.entries(base.fixed))assert.equal(hash(C[name]),wanted,page+' old '+name);
 const P=c.window.STUDY_POLITICAL_CURRICULUM;assert.equal(P.newLessonIds.length,18);assert.equal(P.newQuestionIds.length,108);assert.deepEqual(plain(P.lessonIds),order);assert.deepEqual(plain(C.theoryTrack.steps.map(x=>x.lessonId)),order);
 if(c.window.STUDY_COURSE){assert.deepEqual(plain(c.window.STUDY_COURSE.tracks.find(t=>t.id==='politics').units.flatMap(u=>u.ids)),order);assert.equal(c.window.STUDY_COURSE.tracks.reduce((n,t)=>n+t.units.length,0),35);}
 assert.equal(C.lessons.filter(x=>x.category==='政治理论').length,32);assert.equal(C.questions.filter(x=>x.meta.module==='政治理论').length,190);
 for(const name of ['lessons','questions','writing'])assert.equal(new Set(C[name].map(x=>x.id)).size,C[name].length);
 assert.equal(new Set(C.questions.map(q=>q.stem.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,''))).size,861);
 const topics=C.coverageMatrix.flatMap(g=>g.topics);assert.equal(topics.length,123);
 for(const oldGroup of base.coverageMatrix){
  const group=C.coverageMatrix.find(g=>g.module===oldGroup.module);assert.ok(group);
  if(oldGroup.module!=='政治理论')assert.deepEqual(plain(group),oldGroup,'nonpolitical coverage unchanged');
  else{for(const topic of oldGroup.topics)assert.deepEqual(plain(group.topics.find(t=>t.id===topic.id)),topic,'old political topic unchanged');for(const gap of oldGroup.gaps){const got=group.gaps.find(g=>g.id===gap.id);if(['理论体系与党史专题','理论联系材料的情境题'].includes(gap.title))assert.deepEqual({...plain(got),remaining:gap.remaining},gap);else assert.deepEqual(plain(got),gap);}}
 }
 for(const oldRow of base.coverage)if(oldRow[0]!=='政治理论')assert.deepEqual(plain(C.coverage.find(r=>r[0]===oldRow[0])),oldRow);
 for(const step of base.theoryTrack.steps)assert.deepEqual(plain(C.theoryTrack.steps.find(s=>s.lessonId===step.lessonId)),step,'old theory step text unchanged');
 for(const key of Object.keys(base.theoryTrack))if(!['steps','intro','scope','gaps','updated'].includes(key))assert.deepEqual(plain(C.theoryTrack[key]),base.theoryTrack[key],'old theory metadata '+key);

 for(const [field,name]of [['lessonIds','lessons'],['questionIds','questions'],['writingIds','writing']])assert.deepEqual(plain(topics.flatMap(t=>t[field])).sort(),plain(C[name].map(x=>x.id)).sort());
 for(const id of P.newLessonIds){const l=C.lessons.find(x=>x.id===id);assert.equal(l.sections.length,9);assert.equal(l.practice.length,6);assert.ok(l.sources.every(s=>C.sources[s]));assert.ok(c.window.STUDY_MEMORY_METHODS.cards[id]);assert.ok(C.theoryLearningAids[id]);}
 for(const id of P.newQuestionIds){const q=C.questions.find(x=>x.id===id);assert.equal(q.meta.source.kind,'original');assert.equal(q.meta.difficulty.level,null);assert.equal(q.meta.examSource.year,null);assert.equal(q.optionReviews.length,4);assert.ok(q.meta.source.referenceIds.every(s=>C.sources[s]));}
 if(page==='index.html')main=hash(C);else{assert.equal(hash(C),main,'both public question pools contain exactly the same content');const fixed=c.window.FULL_TRAINING_PAPERS.papers.flatMap(p=>p.sections.flatMap(s=>s.items));assert.equal(fixed.length,240);for(const item of fixed)assert.equal(c.window.STUDY_TRAINING.signature(C.questions.find(q=>q.id===item.questionId)),item.signature);assert.equal(c.window.LONG_MOCK_MODEL.pool().length,838);}
}
console.log('PASS historical political integration (policy additions excluded): 123 lessons / 861 questions / 87 writing; exact 105/753/87 baseline records and all old sources, aids/cards preserved; both entrypoint pools match; ordered 32-lesson route, 35 chapters, coverage, new references and 240 fixed-paper signatures.');
