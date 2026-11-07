'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const crypto=require('node:crypto');
const base=path.join(__dirname,'..'),here=__dirname,plain=x=>JSON.parse(JSON.stringify(x));
const html=fs.readFileSync(path.join(base,'docs/index.html'),'utf8'),scripts=[...html.matchAll(/src="\.\/([^\"]+)"/g)].map(m=>m[1]).filter(f=>f!=='app-topics-20261107.js');
assert.equal(scripts.filter(f=>f==='practice-next.js').length,1);
assert.ok(scripts.indexOf('focused-methods.js')<scripts.indexOf('practice-next.js')&&scripts.indexOf('practice-next.js')<scripts.indexOf('coverage-map.js'));
const adapter=fs.readFileSync(path.join(base,'docs/practice-next.js'),'utf8');
function load(include){const c=vm.createContext({window:{}});for(const f of scripts){if(['practice-overnight.js','practice-targeted-v035.js','fujian-governance-v035.js','curriculum-v036.js','politics-v036.js','curriculum-v037.js','policy-v037.js','curriculum-v038.js','practice-diagnostic-v037.js','political-mao-deng-expansion.js','marxism-course-20261107.js','political-complete-integration.js','policy-current-2026.js'].includes(f)||(f==='practice-next.js'&&!include))continue;vm.runInContext(fs.readFileSync(path.join(base,'docs',f),'utf8'),c,{filename:f});}return c;}
const orig=load(false),extended=load(true),old=orig.window.STUDY_CONTENT,now=extended.window.STUDY_CONTENT;
const oldQ=new Set(old.questions.map(q=>q.id)),oldL=new Set(old.lessons.map(l=>l.id));
const data=plain({questions:now.questions.filter(q=>!oldQ.has(q.id)),lessons:now.lessons.filter(l=>!oldL.has(l.id)),papers:extended.window.STUDY_PRACTICE_NEXT.papers});
const qs=data.questions,ls=data.lessons,byid=Object.fromEntries(qs.map(q=>[q.id,q]));
assert.equal(qs.length,27);assert.equal(ls.length,3);assert.equal(data.papers.length,3);
assert.equal(new Set(qs.map(q=>q.id)).size,27);assert.equal(new Set(ls.map(q=>q.id)).size,3);
const stats={questionCount:27,lessonCount:3,stages:{},positions:[0,0,0,0],lengthMetrics:{},logicModels:{},numericChecks:[]};
for(const q of qs){
 assert.equal(q.options.length,4);assert.equal(q.optionReviews.length,4);assert.equal(new Set(q.options).size,4);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<=3);assert.ok(q.options.every(s=>typeof s==='string'&&s.trim()));assert.ok(q.optionReviews.every(s=>typeof s==='string'&&s.trim()));
 assert.equal(q.meta.source.kind,'original');assert.equal(q.meta.examSource.year,null);assert.equal(q.meta.difficulty.level,null);assert.equal(q.meta.rights.status,'original');assert.deepEqual(q.meta.source.referenceIds,[]);assert.deepEqual(q.meta.knowledgeIds,[q.lesson]);assert.equal(q.trainingStage,q.meta.trainingStage);
 stats.stages[q.trainingStage]=(stats.stages[q.trainingStage]||0)+1;stats.positions[q.answer]++;
}
assert.deepEqual(Object.values(stats.stages),[9,9,9]);assert.deepEqual(stats.positions,[7,7,7,6]);
let longestRun=1,run=1;for(let i=1;i<qs.length;i++){run=qs[i].answer===qs[i-1].answer?run+1:1;longestRun=Math.max(run,longestRun);}assert.ok(longestRun<=2);stats.longestAnswerRun=longestRun;
for(const l of ls){
 assert.equal(l.practice.length,9);assert.equal(l.sections.length,9);assert.ok(l.practice.every(id=>byid[id]?.lesson===l.id));
 for(const [i,p]of Object.values(l.learningLevels).entries()){assert.equal(p.questionIds.length,3);assert.deepEqual(p.questionIds,l.practice.slice(i*3,i*3+3));assert.deepEqual(p.sections,[3*i,3*i+1,3*i+2]);assert.ok(p.questionIds.every(id=>byid[id].trainingStage===p.stage));}
 const subset=qs.filter(q=>q.lesson===l.id),metrics={};
 for(const [name,size]of Object.entries({normalized:s=>[...s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'')].length,raw:s=>[...s.replace(/\s/gu,'')].length})){
  const m={atMaximumIncludingTies:0,atMinimumIncludingTies:0,uniqueMaximum:0,uniqueMinimum:0,firstMaximum:0,firstMinimum:0,allEqual:0};
  for(const q of subset){const z=q.options.map(size),mx=Math.max(...z),mn=Math.min(...z);m.atMaximumIncludingTies+=Number(z[q.answer]===mx);m.atMinimumIncludingTies+=Number(z[q.answer]===mn);m.uniqueMaximum+=Number(z[q.answer]===mx&&z.filter(n=>n===mx).length===1);m.uniqueMinimum+=Number(z[q.answer]===mn&&z.filter(n=>n===mn).length===1);m.firstMaximum+=Number(q.answer===z.indexOf(mx));m.firstMinimum+=Number(q.answer===z.indexOf(mn));m.allEqual+=Number(mx===mn);}
  assert.equal(m.uniqueMaximum,0,l.id+' unique-longest cue');assert.ok(m.firstMaximum<=3&&m.firstMinimum<=3,l.id+' first-item length heuristic');metrics[name]=m;
 }
 stats.lengthMetrics[l.id]=metrics;
}
for(const p of data.papers){const ids=p.sections.flatMap(s=>s.questionIds);assert.equal(ids.length,9);assert.equal(new Set(ids).size,9);assert.ok(ids.every(id=>byid[id]));assert.equal(p.durationSeconds,null);assert.equal(p.scoring.officialScale,false);}
assert.equal(new Set(data.papers.flatMap(p=>p.sections.flatMap(s=>s.questionIds))).size,27);
// Exhaustive truth models independent from stored answers.
function bits(n){return Array.from({length:1<<n},(_,i)=>Array.from({length:n},(_,j)=>!!(i&(1<<j))));}
const selected=bits(5).filter(([A,B,C,D,E])=>[A,B,C,D,E].filter(Boolean).length===3&&(!A||B)&&(C!==D)&&!(D&&E));stats.logicModels.selection=selected.map(s=>s.map((v,i)=>v?'甲乙丙丁戊'[i]:'').join(''));assert.equal(selected.length,3);
function answer(id,results){const q=byid[id],indices=results.flatMap((v,i)=>v?[i]:[]);assert.equal(indices.length,1,id+' unique semantic model answer');assert.equal(q.answer,indices[0],id+' answer');}
answer('pn-compound-logic-01',byid['pn-compound-logic-01'].options.map(o=>selected.every(s=>s['甲乙丙丁戊'.indexOf(o)])));
for(const [n,forced]of [[2,4],[3,3]]){const q=byid[`pn-compound-logic-0${n}`],models=selected.filter(s=>s[forced]);answer(q.id,q.options.map(o=>models.every(s=>o.split('和').every(x=>s['甲乙丙丁戊'.indexOf(x)]))));}
function perms(a){if(!a.length)return [[]];return a.flatMap((v,i)=>perms(a.filter((_,j)=>i!==j)).map(p=>[v,...p]));}
const order=perms('甲乙丙丁戊己'.split('')).filter(p=>p.indexOf('甲')<p.indexOf('丁')&&p.indexOf('戊')===p.indexOf('丙')+1&&![0,5].includes(p.indexOf('乙'))&&p.indexOf('己')<p.indexOf('乙'));stats.logicModels.order=order.map(p=>p.join(''));assert.equal(order.length,18);
answer('pn-compound-logic-04',byid['pn-compound-logic-04'].options.map(o=>order.some(p=>p.join('、')===o)));
const possibleD=[...new Set(order.filter(p=>p[1]==='乙').map(p=>p.indexOf('丁')+1))].sort();assert.deepEqual(possibleD,[4,6]);answer('pn-compound-logic-05',byid['pn-compound-logic-05'].options.map(o=>JSON.stringify([...o.matchAll(/\d/g)].map(m=>Number(m[0])))===JSON.stringify(possibleD)));
answer('pn-compound-logic-06',byid['pn-compound-logic-06'].options.map(o=>order.filter(p=>p[2]==='丙').every(p=>p.indexOf('丁')+1===Number(o.match(/\d/)[0]))));
const switches=bits(5).filter(([A,B,C,D,E])=>(!A||B)&&(C!==D)&&(!B||C)&&(!D||E)&&(E===!A));stats.logicModels.switches=switches.map(s=>s.map((v,i)=>v?'甲乙丙丁戊'[i]:'').join(''));assert.equal(switches.length,4);
answer('pn-compound-logic-07',byid['pn-compound-logic-07'].options.map(o=>{const [left,right]=o.split('，则'),a='甲乙丙丁戊'.indexOf(left[0]),b='甲乙丙丁戊'.indexOf(right[0]),ln=left.includes('未'),rn=right.includes('未');return switches.every(s=>(ln?!s[a]:s[a])? (rn?!s[b]:s[b]):true);}));
answer('pn-compound-logic-08',byid['pn-compound-logic-08'].options.map(o=>switches.filter(s=>s.filter(Boolean).length===3).every(s=>o.split('和').every(x=>s['甲乙丙丁戊'.indexOf(x)]))));
answer('pn-compound-logic-09',byid['pn-compound-logic-09'].options.map(o=>{const s='甲乙丙丁戊'.split('').map(v=>o.includes(v));return switches.some(m=>JSON.stringify(m)===JSON.stringify(s))&&!s[3]&&!s[0];}));
// Rational arithmetic is computed in a separate Python verifier for exactness; these are cross-checks.
function numeric(n,correct,parse=s=>Number(s.match(/\d+(?:\.\d+)?/)[0]),tol=1e-8){const q=byid[`pn-share-scope-${String(n).padStart(2,'0')}`];answer(q.id,q.options.map(o=>Math.abs(parse(o)-correct)<tol));stats.numericChecks.push({id:q.id,result:correct});}
numeric(1,270/750*100);numeric(2,(270/750-180/600)*100);numeric(3,(270/750/(180/600)-1)*100);numeric(4,((1230+460)/(1500+500)-(960+720)/(1200+800))*100);numeric(5,(1200*1230/1500+800*460/500)/(1200+800)*100);numeric(6,Math.round(1230/1690*1000)/10);numeric(7,Math.round((84+66-10)/240*1000)/10);numeric(8,Math.round(((84+66-10)/240-(70+60-8)/200)*1000)/10,s=>(s.includes('下降')?-1:1)*Number(s.match(/\d+(?:\.\d+)?/)[0]));
const predicates={
 '两站点数据直接相加所得占比提高了2个百分点':Math.abs(((84+66)/240-(70+60)/200)*100-2)<1e-8,
 '甲乙至少一站参与的任务量同比增长约14.8%':Math.round(((84+66-10)/(70+60-8)-1)*1000)/10===14.8,
 '甲参与而乙未参与的任务占全区比重本期更高':(84-10)/240>(70-8)/200,
 '两站点共同参与的任务量占全区比重上期与本期相同':10*200===8*240};answer('pn-share-scope-09',byid['pn-share-scope-09'].options.map(o=>predicates[o]));stats.numericChecks.push({id:'pn-share-scope-09',result:'14.8%'});
assert.equal(old.questions.length,567);assert.equal(now.questions.length,594);assert.equal(now.lessons.length,old.lessons.length+3);
for(const item of old.questions){const n=now.questions.find(q=>q.id===item.id);assert.equal(JSON.stringify(n),JSON.stringify(item),'Existing question unchanged '+item.id);assert.equal(extended.window.STUDY_TRAINING.signature(n),orig.window.STUDY_TRAINING.signature(item));}
for(const item of old.lessons)assert.equal(JSON.stringify(now.lessons.find(l=>l.id===item.id)),JSON.stringify(item),'Existing lesson unchanged '+item.id);
const canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?'['+v.map(canonical).join(',')+']':'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}',hash=v=>crypto.createHash('sha256').update(canonical(v)).digest('hex');
const fixture=JSON.parse(fs.readFileSync(path.join(here,'fixtures/v032-public-identities.json'),'utf8'));
for(const[name,entries]of Object.entries(fixture.collections))for(const[id,expected]of Object.entries(entries))assert.equal(hash(require("./learning-release-identity-projection.cjs")(now)[name].find(v=>v.id===id)),expected,'v0.32 identity: '+name+'/'+id);
for(const[name,expected]of Object.entries(fixture.immutableParts))assert.equal(hash(now[name]),expected,'v0.32 immutable global: '+name);
const normalized=s=>s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'');const oldStems=new Set(old.questions.map(q=>normalized(q.stem)));for(const q of qs)assert.ok(!oldStems.has(normalized(q.stem)),'Exact stem duplicate '+q.id);
for(const l of ls)assert.ok(now.coverageMatrix.some(m=>m.topics.some(t=>t.id===l.id)),'Coverage sees candidate '+l.id);
for(const q of qs)assert.equal(JSON.stringify(now.questions.find(v=>v.id===q.id).meta.answerReview),JSON.stringify(q.meta.answerReview),'Generic catalog must not overwrite explicit review basis');
const snapshot=JSON.stringify(now);assert.throws(()=>vm.runInContext(adapter,extended),/Duplicate candidate IDs/);assert.equal(JSON.stringify(extended.window.STUDY_CONTENT),snapshot,'Duplicate re-import atomic');
// A deep-frozen input content graph is supported without mutating old references.
function freeze(x){if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
freeze(old);vm.runInContext(adapter,orig);assert.equal(orig.window.STUDY_CONTENT.questions.length,594);for(const q of old.questions)assert.strictEqual(orig.window.STUDY_CONTENT.questions.find(v=>v.id===q.id),q);
stats.integration={baselineQuestions:567,candidateOnlyTotal:594,unchangedOldQuestions:567,unchangedOldLessons:old.lessons.length,oldTrainingFingerprintsUnchanged:true,exactStemDuplicates:0,adapterRepeatedImport:'atomic rejection',frozenBase:'supported',deployed:false};
fs.mkdirSync(path.join(base,'test-results'),{recursive:true});fs.writeFileSync(path.join(base,'test-results/v033-practice-validation.json'),JSON.stringify(stats,null,2)+'\n');
console.log('PASS 27 questions / 3 topics / 3 reference-only sets; stage and option audits');console.log('PASS 9 logic questions independently solved by exhaustive models (3 selection, 18 order, 4 switch states)');console.log('PASS 9 data questions by independent numeric expressions; 9 language answers require semantic review');console.log('PASS focused v0.33 package VM (newer packages excluded): 594 total; 567 old questions and fingerprints unchanged, old lessons unchanged; atomic duplicate rejection and frozen base');
