"use strict";
// Integration and provenance guards, not a primary-source or semantic fact-check.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8'),context={window:{}};vm.createContext(context);
for(const m of html.matchAll(/src="\.\/([^\"]+)"/g))if(m[1]!=='app.js')vm.runInContext(fs.readFileSync(path.join(root,'docs',m[1]),'utf8'),context,{filename:m[1]});
const C=JSON.parse(JSON.stringify(context.window.STUDY_CONTENT));
const canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(canonical).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}';
const hash=v=>crypto.createHash('sha256').update(canonical(v)).digest('hex');
const before=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/v029-public-identities.json'),'utf8'));
for(const [name,entries]of Object.entries(before.collections))for(const[id,expected]of Object.entries(entries))assert.equal(hash(C[name].find(x=>x.id===id)),expected,'Existing public content changed: '+name+'/'+id);
for(const[id,expected]of Object.entries(before.sources))assert.equal(hash(C.sources[id]),expected,'Existing source changed: '+id);
for(const[id,expected]of Object.entries(before.theoryLearningAids))assert.equal(hash(C.theoryLearningAids[id]),expected,'Existing theory aid changed: '+id);
assert.deepEqual(C.theoryTrack.steps.slice(0,4).map(s=>s.lessonId),before.theoryStepIds);
assert.equal(C.lessons.length,88);assert.equal(C.questions.length,519);assert.equal(C.writing.length,62);assert.equal(new Set(C.writing.map(w=>w.material)).size,30);assert.equal(C.lessons.filter(l=>l.learningLevels).length,70);assert.equal(Object.keys(C.sources).length,35);
for(const name of ['lessons','questions','writing'])assert.equal(new Set(C[name].map(x=>x.id)).size,C[name].length,name+' unique IDs');
const fq=C.questions.filter(q=>q.id.startsWith('fq-')),pol=C.questions.filter(q=>q.id.startsWith('pol2-')),writing=C.writing.filter(w=>w.id.startsWith('w_parallel_'));
assert.equal(fq.length,36);assert.equal(pol.length,24);assert.equal(writing.length,15);
for(const q of [...fq,...pol]){
 assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.optionReviews.length,4);assert.ok(q.options.every(x=>typeof x==='string'&&x.trim()));assert.ok(q.optionReviews.every(x=>typeof x==='string'&&x.trim()));
 assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);assert.equal(q.meta.source.kind,'original');assert.equal(q.meta.examSource.year,null);assert.equal(q.meta.difficulty.level,null);assert.equal(q.answerAudit,undefined,'Internal author audit is not public question content');
}
for(const stage of ['识别概念','迁移运用','检查边界'])assert.equal(C.questions.filter(q=>q.meta.trainingStage===stage).length,145);
const reading=fq.filter(q=>q.lesson==='fq-multi-paragraph');assert.equal(reading.length,9);
for(const q of reading){assert.ok(q.stem.includes('\n'));assert.equal(q.materialId,undefined,'Embedded passage must not render a second external copy');}
const positions=[0,0,0,0];for(const q of fq)positions[q.answer]++;assert.deepEqual(positions,[9,9,9,9]);
let longestRun=1,currentRun=1;for(let i=1;i<fq.length;i++){currentRun=fq[i].answer===fq[i-1].answer?currentRun+1:1;longestRun=Math.max(longestRun,currentRun);}assert.ok(longestRun<=2);
for(const lengthOf of [s=>[...s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'')].length,s=>[...s.replace(/\s/gu,'')].length]){
 const metrics={atMaximum:0,atMinimum:0,firstMaximum:0,firstMinimum:0};for(const q of reading){const sizes=q.options.map(lengthOf);metrics.atMaximum+=Number(sizes[q.answer]===Math.max(...sizes));metrics.atMinimum+=Number(sizes[q.answer]===Math.min(...sizes));metrics.firstMaximum+=Number(q.answer===sizes.indexOf(Math.max(...sizes)));metrics.firstMinimum+=Number(q.answer===sizes.indexOf(Math.min(...sizes)));}
 assert.ok(Object.values(metrics).every(v=>v<=3),'Reading option length cue: '+JSON.stringify(metrics));
}
assert.equal(Object.keys(C.questionMaterials).length,2,'Keep the existing table-material registry unchanged');
assert.equal(C.theoryTrack.steps.length,8);assert.equal(Object.keys(C.theoryLearningAids).length,8);
for(const step of C.theoryTrack.steps){assert.ok(C.lessons.find(l=>l.id===step.lessonId));assert.ok(C.theoryLearningAids[step.lessonId]);}
for(const w of writing){
 const length=[...w.sample.replace(/\s/g,'')].length;assert.ok(length<=w.limit&&length>=(w.minLength||0),w.id+' sample length');
 assert.equal(w.evidenceDetails.length,w.points.length);assert.equal(w.evidenceParagraphs.length,w.points.length);
 const paragraphs=new Set([...w.material.matchAll(/【(\d+)】/g)].map(m=>Number(m[1])));paragraphs.add('任务');
 w.evidenceDetails.forEach((e,i)=>{assert.equal(e.point,i+1);assert.deepEqual(e.paragraphs,w.evidenceParagraphs[i]);assert.ok(e.paragraphs.length&&e.paragraphs.every(n=>paragraphs.has(n)),w.id+' evidence paragraph');assert.ok(e.reason.trim());});
 assert.ok(w.misconceptions.length&&w.misconceptions.every(m=>['weak','problem','revision'].every(k=>m[k]?.trim())));assert.ok(w.rewriteSteps.length>=3);assert.equal(w.provenance.kind,'original-fictional');assert.equal(w.provenance.officialScore,null);assert.equal(w.provenance.examYear,null);assert.equal(w.provenance.difficultyCalibrated,false);
}
for(const group of new Set(writing.map(w=>w.materialGroup))){const tasks=writing.filter(w=>w.materialGroup===group);assert.equal(tasks.length,5);assert.equal(new Set(tasks.map(w=>w.type)).size,5);assert.equal(new Set(tasks.map(w=>w.material)).size,1);}
for(const file of ['parallel-question-bank.js','parallel-politics.js','parallel-shenlun.js']){
 const raw=JSON.stringify(context.window.STUDY_CONTENT);assert.throws(()=>vm.runInContext(fs.readFileSync(path.join(root,'docs',file),'utf8'),context),/exist|conflict|重复|冲突|已存在|already/i,file+' duplicate import');assert.equal(JSON.stringify(context.window.STUDY_CONTENT),raw,file+' rejected atomically');
}
const materialRule=fs.readFileSync(path.join(root,'docs/style.css'),'utf8').match(/\.material\s*\{([^}]+)\}/)?.[1];
assert.ok(materialRule&&materialRule.includes('Noto Sans CJK SC')&&materialRule.includes('system-ui'),'Retain existing CJK font fallbacks after observed desktop glyph failure');
console.log('PASS Four-line merge: 88 lessons/519 original questions/62 writing tasks, stable IDs, metadata, 8 theory themes and 30 distinct materials');
console.log('PASS Hash equality for every old lesson, question, writing task, source and four old memory aids; no duplicate partial imports');
console.log('PASS Embedded reading passages, source-time boundaries, 15 evidence/rewrite contracts and sample lengths; not a fresh semantic fact audit');
