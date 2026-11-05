"use strict";
const fs=require("node:fs"),vm=require("node:vm"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.join(__dirname,".."),context={window:{}};vm.createContext(context);
for(const m of fs.readFileSync(path.join(root,"docs/index.html"),"utf8").matchAll(/src="\.\/([^\"]+)"/g))if(m[1]!=="app.js")vm.runInContext(fs.readFileSync(path.join(root,"docs",m[1]),"utf8"),context);
const C=JSON.parse(JSON.stringify(context.window.STUDY_CONTENT)),q=Object.fromEntries(C.questions.map(x=>[x.id,x]));
assert.equal(C.questions.length,519);assert.equal(C.lessons.length,88);assert.equal(C.lessons.filter(l=>l.learningLevels).length,70);
for(const id of ["growth-contribution","multi-table","context-blanks","title-choice"]){
  const l=C.lessons.find(l=>l.id===id);assert.equal(l.sections.length,9);assert.equal(l.practice.length,9);
  assert.deepEqual(Object.values(l.learningLevels).flatMap(g=>g.sections),[...Array(9).keys()]);
  for(const g of Object.values(l.learningLevels)){assert.equal(g.questionIds.length,2);assert.ok(g.questionIds.every(id=>q[id].lesson===l.id&&q[id].meta.trainingStage===g.stage));}
}
assert.deepEqual([...Array(24)].map((_,i)=>q['q'+(364+i)].answer),[1,3,0,2,3,0,1,0,2,1,3,1,0,2,1,3,0,2,0,3,1,2,3,1]);
for(let n=364;n<=387;n++){const x=q['q'+n];assert.equal(x.optionReviews.length,4);assert.equal(x.meta.source.kind,'original');assert.equal(x.meta.examSource.year,null);assert.equal(x.meta.difficulty.level,null);}
console.log('PASS Four exact lessons, twelve two-question paths, original provenance and all 24 frozen answer choices');
const sum=a=>a.reduce((s,n)=>s+n,0),ledger=(before,after)=>({base:sum(before),change:sum(after)-sum(before),parts:after.map((n,i)=>n-before[i])});
const contribution=(x,i)=>{if(!x.change)throw new RangeError('zero total increment');return 100*x.parts[i]/x.change;};
const pull=(x,i)=>{if(!x.base)throw new RangeError('zero base total');return 100*x.parts[i]/x.base;};
let x=ledger([80,120],[100,150]);assert.equal(contribution(x,0),40);assert.equal(pull(x,0),10);assert.equal(x.change/x.base*100,25);
x=ledger([120,280],[150,310]);assert.equal(contribution(x,0),50);assert.equal(pull(x,0),7.5);
assert.equal(72*5/6,60);x=ledger([60,180],[72,228]);assert.equal(contribution(x,0),20);assert.equal(pull(x,0),5);
x=ledger([40,60],[50,50]);assert.throws(()=>contribution(x,0),RangeError);assert.equal(pull(x,0),10);assert.equal(pull(x,1),-10);
x=ledger([40,60],[70,50]);assert.equal(contribution(x,0),150);assert.equal(contribution(x,1),-50);assert.equal(pull(x,0),30);
x=ledger([40,60],[50,30]);assert.equal(contribution(x,0),-50);assert.equal(pull(x,0),10);
assert.equal(100*(8+6)/(10+30),35);
console.log('PASS Independent additive ledgers, distinct denominators, reconstructed bases, zero increments, cancellation and negative growth');
const material=C.questionMaterials['service-pair-v026'];assert.equal(Object.keys(C.questionMaterials).length,2);assert.equal(material.tables.length,2);
assert.deepEqual(material.tables[0].rows,[['甲站','120','150'],['乙站','180','198']]);assert.deepEqual(material.tables[1].rows,[['甲站','25','100'],['乙站','22','110']]);
for(let n=370;n<=375;n++)assert.equal(q['q'+n].materialId,material.id);
for(const x of C.questions)if(x.materialId)assert.ok(C.questionMaterials[x.materialId],x.id);
assert.equal(198/22,9);assert.equal(150/25,6);assert.equal(100*((150+198)-(120+180))/(120+180),16);assert.equal(((150+198)/(25+22)).toFixed(2),'7.40');assert.notEqual((6+9)/2,(150+198)/(25+22));
const visits=Array(100).fill(0).concat(Array(110).fill(0)),distinct=Array.from({length:210},(_,i)=>i);assert.equal(visits.length,distinct.length);assert.equal(new Set(visits).size,1);assert.equal(new Set(distinct).size,210);
const A=new Set(Array.from({length:25},(_,i)=>i+1));
for(let overlap=0;overlap<=22;overlap++){
  const B=new Set([...Array.from({length:overlap},(_,i)=>i+1),...Array.from({length:22-overlap},(_,i)=>i+26)]);
  assert.equal(B.size,22);assert.equal([...B].filter(day=>A.has(day)).length,overlap);
}
console.log('PASS Exact dual-table totals and station-day denominator; valid visit-identity and all 23 calendar-overlap countermodels');
// Semantic judgments are independently reviewed in ANSWER_REVIEW.md, not "proved" by word matching.
assert.ok(q.q380.stem.includes('只按含义'));assert.ok(q.q387.stem.includes('没有规定标题字数或修辞'));
console.log('PASS Semantic boundary questions explicitly state their comparison criteria; prose review remains separate from arithmetic tests');
