'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const base=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const modulePath=path.resolve(process.argv[3]||path.join(__dirname,'../docs/political-mao-deng-expansion.js'));
const code=fs.readFileSync(modulePath,'utf8');
function context(){const c={window:{}};vm.createContext(c);for(const m of fs.readFileSync(path.join(base,'docs/index.html'),'utf8').matchAll(/src="\.\/([^\"]+)"/g)){if(m[1]==='app-studio-20261112-clean.js'||m[1]==='political-mao-deng-expansion.js'||m[1]==='political-complete-integration.js')continue;vm.runInContext(fs.readFileSync(path.join(base,'docs',m[1]),'utf8'),c,{filename:m[1]});}return c;}
const c=context(),before=JSON.parse(JSON.stringify(c.window.STUDY_CONTENT));
const oldCards=JSON.parse(JSON.stringify(c.window.STUDY_MEMORY_METHODS.cards));
vm.runInContext(code,c,{filename:'political-mao-deng-expansion.js'});
const C=JSON.parse(JSON.stringify(c.window.STUDY_CONTENT)),E=JSON.parse(JSON.stringify(c.window.STUDY_MAO_DENG_EXPANSION));
assert.equal(C.lessons.length,before.lessons.length+8);assert.equal(C.questions.length,before.questions.length+48);assert.equal(Object.keys(C.sources).length,Object.keys(before.sources).length+12);
assert.deepEqual(C.lessons.slice(0,before.lessons.length),before.lessons);assert.deepEqual(C.questions.slice(0,before.questions.length),before.questions);
for(const [id,s]of Object.entries(before.sources))assert.deepEqual(C.sources[id],s);
for(const [id,a]of Object.entries(before.theoryLearningAids))assert.deepEqual(C.theoryLearningAids[id],a);
for(const [id,a]of Object.entries(oldCards))assert.deepEqual(JSON.parse(JSON.stringify(c.window.STUDY_MEMORY_METHODS.cards[id])),a);
assert.deepEqual(C.theoryTrack,before.theoryTrack,'parent owns route integration');
const Q=C.questions.filter(q=>E.questionIds.includes(q.id));
for(const id of E.lessonIds){const l=C.lessons.find(x=>x.id===id);assert.ok(l);assert.equal(l.sections.length,9);assert.equal(l.practice.length,6);assert.equal(C.theoryLearningAids[id].keyPoints.length,3);assert.equal(C.theoryLearningAids[id].contrasts.length,2);assert.ok(l.sources.every(s=>C.sources[s]));const sections=[];
 for(const [level,g]of Object.entries(l.learningLevels)){sections.push(...g.sections);assert.equal(g.questionIds.length,2);for(const qid of g.questionIds){const q=Q.find(q=>q.id===qid);assert.equal(q.lesson,id);assert.equal(q.trainingStage,g.stage);assert.equal(q.meta.trainingStage,g.stage);}
 const html=c.window.STUDY_MEMORY_METHODS.render(id,level);assert.ok(html.includes('data-memory-lesson="'+id+'"'));assert.ok(html.includes('memory-answer'));assert.ok(!html.includes('不自动判定掌握'));assert.ok(html.includes('自测'));}
 assert.deepEqual(sections,[0,1,2,3,4,5,6,7,8]);}
assert.deepEqual(E.courseUnits.flatMap(u=>u.ids),E.lessonIds);assert.deepEqual(E.proposedTheorySteps.map(s=>s.lessonId),E.lessonIds);
const normalize=s=>s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'');
assert.equal(new Set(C.questions.map(q=>normalize(q.stem))).size,C.questions.length,'normalized stems globally unique');
for(const q of Q){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.optionReviews.length,4);assert.equal(q.explanation,q.optionReviews[q.answer]);assert.equal(q.meta.source.kind,'original');assert.equal(q.meta.examSource.year,null);assert.equal(q.meta.difficulty.level,null);assert.deepEqual(q.meta.knowledgeIds,[q.lesson]);assert.ok(q.meta.source.referenceIds.every(id=>C.sources[id]));assert.equal(q.meta.module,'政治理论');}
const metrics={positions:[0,0,0,0],atMaximum:0,atMinimum:0,rawAtMaximum:0,rawAtMinimum:0,maxRun:1};let run=1;
Q.forEach((q,i)=>{metrics.positions[q.answer]++;for(const [k,sizes]of [['',q.options.map(s=>[...normalize(s)].length)],['raw',q.options.map(s=>[...s.replace(/\s/gu,'')].length)]]){metrics[k?'rawAtMaximum':'atMaximum']+=Number(sizes[q.answer]===Math.max(...sizes));metrics[k?'rawAtMinimum':'atMinimum']+=Number(sizes[q.answer]===Math.min(...sizes));}if(i){run=q.answer===Q[i-1].answer?run+1:1;metrics.maxRun=Math.max(metrics.maxRun,run);}});
assert.deepEqual(metrics.positions,[12,12,12,12]);assert.ok(metrics.atMaximum<=16,JSON.stringify(metrics));assert.ok(metrics.atMinimum<=16,JSON.stringify(metrics));assert.ok(metrics.rawAtMaximum<=16,JSON.stringify(metrics));assert.ok(metrics.rawAtMinimum<=16,JSON.stringify(metrics));assert.ok(metrics.maxRun<=2);for(let p=1;p<=8;p++)assert.ok(!Q.every((q,i)=>q.answer===Q[i%p].answer),'cyclic key '+p);
const stable=JSON.stringify(c.window.STUDY_CONTENT);assert.throws(()=>vm.runInContext(code,c),/rejected before mutation/);assert.equal(JSON.stringify(c.window.STUDY_CONTENT),stable,'duplicate load must be atomic');
const bad=context();bad.window.STUDY_CONTENT.lessons.push({id:'mao-new-democratic'});const old=JSON.stringify(bad.window.STUDY_CONTENT);assert.throws(()=>vm.runInContext(code,bad),/lesson collision/);assert.equal(JSON.stringify(bad.window.STUDY_CONTENT),old,'conflict must be atomic');
assert.ok(!/localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|sendBeacon/.test(code));
console.log('PASS 8 lessons, 72 sections, 48 original questions, 24 stage recall prompts, 12 added sources, unchanged old identities/content and no persistence');
console.log('PASS additive validation, stage references, source links, memory render, duplicate-load atomicity, collision rejection');
console.log('OPTION METRICS '+JSON.stringify(metrics));
console.log('NOT A FACT CHECK OR DIFFICULTY CALIBRATION: source and semantic review are separate from structural guards.');
