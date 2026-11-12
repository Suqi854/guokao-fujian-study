'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..')),clone=x=>JSON.parse(JSON.stringify(x));
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
let main;const counts=[];
for(const page of ['index.html','long-mock.html']){
 const c={window:{},TextEncoder};vm.createContext(c);
 for(const k of ['localStorage','sessionStorage','indexedDB','fetch'])for(const o of [c,c.window])Object.defineProperty(o,k,{get(){throw Error('unexpected access '+k);}});
 const files=[...fs.readFileSync(path.join(root,'docs',page),'utf8').matchAll(/src="\.\/([^"]+)"/g)].map(m=>m[1]);
 assert.equal(files.filter(f=>f==='policy-current-2026.js').length,1);
 assert.ok(files.indexOf('policy-current-2026.js')>files.indexOf('political-complete-integration.js'));
 let before,beforeCards,beforeAids;
 for(const f of files)if(!['app-studio-20261112.js','long-mock-workspace.js','long-mock-store.js'].includes(f)){
  if(f==='policy-current-2026.js'){before=clone(c.window.STUDY_CONTENT);beforeCards=clone(c.window.STUDY_MEMORY_METHODS.cards);beforeAids=clone(c.window.STUDY_CONTENT.theoryLearningAids);}
  vm.runInContext(fs.readFileSync(path.join(root,'docs',f),'utf8'),c,{filename:f});
 }
 const C=c.window.STUDY_CONTENT,B=c.window.STUDY_POLICY_2026,M=c.window.STUDY_MEMORY_METHODS;
 assert.deepEqual([C.lessons.length,C.questions.length,C.writing.length,C.lessons.filter(l=>l.learningLevels).length,Object.keys(C.sources).length],[127,885,87,119,80]);
 assert.equal(C.lessons.filter(l=>l.category==='政治理论').length,35);assert.equal(C.questions.filter(q=>q.meta.module==='政治理论').length,208);
 if(c.window.STUDY_COURSE)assert.equal(c.window.STUDY_COURSE.tracks.reduce((n,t)=>n+t.units.length,0),37);
 assert.equal(B.lessonIds.length,4);assert.equal(B.questionIds.length,24);assert.equal(B.newSourceIds.length,6);
 assert.deepEqual([C.lessons.length,C.questions.length,C.writing.length],[before.lessons.length+4,before.questions.length+24,before.writing.length]);
 for(const k of ['lessons','questions','writing'])for(const old of before[k])assert.deepEqual(clone(C[k].find(x=>x.id===old.id)),old,'old '+k+'/'+old.id);
 for(const [id,s]of Object.entries(before.sources))assert.deepEqual(clone(C.sources[id]),s,'old source '+id);
 for(const [id,s]of Object.entries(beforeCards))assert.deepEqual(clone(M.cards[id]),s,'old card '+id);
 for(const [id,s]of Object.entries(beforeAids))assert.deepEqual(clone(C.theoryLearningAids[id]),s,'old aid '+id);
 for(const old of before.coverageMatrix)for(const topic of old.topics)assert.deepEqual(clone(C.coverageMatrix.find(g=>g.module===old.module).topics.find(t=>t.id===topic.id)),topic,'old coverage topic');
 for(const name of ['lessons','questions','writing'])assert.equal(new Set(C[name].map(x=>x.id)).size,C[name].length);
 const norm=s=>s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'');assert.equal(new Set(C.questions.map(q=>norm(q.stem))).size,C.questions.length);
 const answers=[],reviewedCorrect=require('./fixtures/policy-reviewed-correct-options.json').answers;
 assert.deepEqual(Object.keys(reviewedCorrect),clone(B.questionIds));for(const id of B.questionIds){const q=C.questions.find(q=>q.id===id);assert.equal(q.options[q.answer],reviewedCorrect[id],id+' reviewed correct meaning preserved after option permutation');}
 for(const id of B.lessonIds){const l=C.lessons.find(x=>x.id===id),card=M.cards[id];assert.equal(l.sections.length,9);assert.equal(l.practice.length,6);assert.ok(l.sources.every(s=>C.sources[s]));assert.ok(card.sourceIds.every(s=>C.sources[s]));assert.ok(C.theoryLearningAids[id]);const all=[];
  for(const [key,g]of Object.entries(l.learningLevels)){assert.equal(g.sections.length,3);assert.equal(g.questionIds.length,2);assert.equal(g.stage,C.learningPaths[key].stage);assert.equal(card.recall[key].length,2);all.push(...g.questionIds);
   for(const qid of g.questionIds){const q=C.questions.find(q=>q.id===qid);assert.equal(q.lesson,id);assert.equal(q.trainingGoal,g.goal);assert.equal(q.meta.trainingGoal,g.goal);assert.equal(q.trainingStage,g.stage);assert.equal(q.meta.trainingStage,g.stage);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.optionReviews.length,4);assert.equal(q.explanation,q.optionReviews[q.answer]);assert.equal(q.meta.source.kind,'original');assert.equal(q.meta.difficulty.level,null);assert.equal(q.meta.examSource.year,null);assert.ok(q.meta.source.referenceIds.every(s=>C.sources[s]));answers.push(q.answer);}
  }assert.deepEqual(all,clone(l.practice));
 }
 assert.deepEqual(answers,[1,0,3,1,0,1,0,3,3,2,2,3,0,1,2,3,2,1,3,2,0,1,0,2]);
 // Independent policy facts: exact source/region/year/metric distinctions.
 const q=id=>C.questions.find(q=>q.id===id),text=id=>C.lessons.find(l=>l.id===id).sections.map(s=>s.join(' ')).join(' ');
 assert.equal(q('policy26-04-01').options[q('policy26-04-01').answer],'50万人');assert.match(q('policy26-04-01').stem,/原文表述/);
 assert.match(text('policy-national-report-2026'),/4.5%—5%/);assert.match(text('policy-national-report-2026'),/1200万人以上/);
 assert.match(text('policy-fujian-report-2026'),/513万吨以上/);assert.match(text('policy-plan15-official-2026'),/年均增长7%以上/);assert.match(text('policy-plan15-official-2026'),/五年规划期累计目标/);
 for(const [id,s]of [['policy26-02-04','fujian-report-official-2026'],['policy26-02-05','national-report-official-2026'],['policy26-03-01','national-plan15-official-2026'],['policy26-03-01','fujian-report-official-2026']])assert.ok(q(id).meta.source.referenceIds.includes(s));
 const political=C.lessons.filter(l=>l.category==='政治理论').map(l=>l.id);assert.deepEqual(clone(C.theoryTrack.steps.map(s=>s.lessonId)).sort(),clone(political).sort());
 if(c.window.STUDY_COURSE){const tracks=c.window.STUDY_COURSE.tracks,ids=tracks.flatMap(t=>t.units.flatMap(u=>u.ids));assert.equal(ids.length,new Set(ids).size);assert.deepEqual(clone(ids).sort(),clone(C.lessons.map(l=>l.id)).sort());for(const id of B.lessonIds){const track=tracks.find(t=>t.units.some(u=>u.ids.includes(id)));assert.equal(track.id,id==='policy-fujian-report-2026'?'fujian':'politics');}}
 const beforeRetry=hash(C),beforeRetryCards=hash(M.cards);assert.throws(()=>vm.runInContext(fs.readFileSync(path.join(root,'docs/policy-current-2026.js'),'utf8'),c),/rejected before mutation/);assert.equal(hash(C),beforeRetry);assert.equal(hash(M.cards),beforeRetryCards);
 if(page==='index.html')main=hash(C);else{assert.equal(hash(C),main,'entrypoint content equality');const papers=c.window.FULL_TRAINING_PAPERS.papers.flatMap(p=>p.sections.flatMap(s=>s.items));assert.equal(papers.length,240);for(const item of papers)assert.equal(c.window.STUDY_TRAINING.signature(C.questions.find(q=>q.id===item.questionId)),item.signature);}
 counts.push([page,C.lessons.length,C.questions.length,C.writing.length,C.theoryTrack.steps.length]);
}
console.log('PASS policy: +4 lessons / 36 sections / 24 reviewed questions / 4 cards / 6 new sources; all previous content preserved, unique IDs/stems, 12 level groups, complete references, atomic collision rejection, course/coverage integration, both entrypoints and 240 fixed signatures.',JSON.stringify(counts));
