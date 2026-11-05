"use strict";
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);
for(const m of fs.readFileSync(path.join(root,'docs/index.html'),'utf8').matchAll(/src="\.\/([^\"]+)"/g))if(m[1]!=='app.js')vm.runInContext(fs.readFileSync(path.join(root,'docs',m[1]),'utf8'),ctx);
const C=JSON.parse(JSON.stringify(ctx.window.STUDY_CONTENT)),q=Object.fromEntries(C.questions.map(x=>[x.id,x]));
assert.equal(C.lessons.length,91);assert.equal(C.questions.length,567);assert.equal(C.lessons.filter(l=>l.learningLevels).length,77);assert.equal(Object.keys(C.sources).length,40);
for(const id of ['cpi','fujian-geography','constitutional-rights','admin-review']){
  const l=C.lessons.find(l=>l.id===id);assert.equal(l.sections.length,9);assert.ok(l.versionNote);
  assert.deepEqual(Object.values(l.learningLevels).flatMap(g=>g.sections),[...Array(9).keys()]);
  for(const g of Object.values(l.learningLevels)){assert.equal(g.questionIds.length,2);assert.ok(g.questionIds.every(id=>q[id].lesson===l.id&&q[id].meta.trainingStage===g.stage));}
  assert.ok(l.sources.every(id=>C.sources[id]));
}
assert.deepEqual([...Array(24)].map((_,i)=>q['q'+(388+i)].answer),[1,3,0,2,3,0,1,3,2,1,3,0,1,2,2,1,3,0,2,0,1,3,0,2]);
for(let n=388;n<=411;n++){const x=q['q'+n];assert.equal(x.optionReviews.length,4);assert.equal(x.meta.source.kind,'original');assert.equal(x.meta.examSource.year,null);assert.equal(x.meta.difficulty.level,null);}
console.log('PASS Four version-scoped lessons, twelve exact paths and 24 original uncalibrated questions');
assert.equal(102-100,2);
// Read the actual published question data and derive all numeric choices independently.
const basketMatch=q.q390.stem.match(/甲商品(\d+)份、乙商品(\d+)份。两商品基期单价(\d+)元、(\d+)元，比较期为(\d+)元、(\d+)元/);
assert.ok(basketMatch);const [qa,qb,pa,pb,ca,cb]=basketMatch.slice(1).map(Number);
const baseOutlays=[qa*pa,qb*pb],currentOutlays=[qa*ca,qb*cb];
const base=baseOutlays.reduce((a,b)=>a+b),current=currentOutlays.reduce((a,b)=>a+b),basketIndex=current/base*100;
assert.notEqual(baseOutlays[0],baseOutlays[1]);assert.deepEqual(baseOutlays,[30,20]);assert.equal(base,50);assert.equal(current,51);assert.equal(basketIndex,102);
const choiceValues=q.q390.options.map(Number);assert.deepEqual(choiceValues,[102,110,90,100]);
assert.deepEqual(choiceValues.map(x=>x===basketIndex),[true,false,false,false]);assert.equal(choiceValues[q.q390.answer],basketIndex);
assert.equal(ca*100/pa,choiceValues[1]);assert.equal(cb*100/pb,choiceValues[2]);
const unweightedIndex=(ca*100/pa+cb*100/pb)/2;assert.equal(unweightedIndex,choiceValues[3]);assert.notEqual(unweightedIndex,basketIndex);
assert.equal((baseOutlays[0]*(ca*100/pa)+baseOutlays[1]*(cb*100/pb))/base,basketIndex);
assert.ok(q.q390.optionReviews[0].includes('51÷50×100=102'));
assert.ok(q.q390.optionReviews[3].includes('60%和40%'));
assert.equal(10200*98/100,9996);assert.equal((9996-10000)/100,-0.04);
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10);near((102/100-1)*100,2);assert.equal(((102/103-1)*100).toFixed(2),'-0.97');
// Each world has the same last/current year-on-year indices 103 and 102.
const worlds=[{oldPrevious:100,oldCurrent:100,previous:103,current:102},{oldPrevious:100,oldCurrent:102,previous:103,current:104.04}];
for(const w of worlds){near(w.previous/w.oldPrevious*100,103);near(w.current/w.oldCurrent*100,102);}
assert.ok(worlds[0].current<worlds[0].previous);assert.ok(worlds[1].current>worlds[1].previous);
console.log('PASS Exact toy basket, chained price arithmetic, two distinct comparison bases and opposite month-on-month countermodels');
// This finite predicate checks the conditions in the reviewed constitutional wording,
// not real election registration, office qualifications or a person's legal status.
const eligible=(age,citizen,deprived)=>citizen&&age>=18&&!deprived;
assert.deepEqual([[17,true,false],[19,true,true],[20,true,false],[20,false,false]].map(args=>eligible(...args)),[false,false,true,false]);
assert.ok(eligible(18,true,false));assert.ok(!eligible(18,true,true));assert.ok(!eligible(80,false,false));
const constitution=C.lessons.find(l=>l.id==='constitutional-rights');assert.ok(constitution.versionNote.includes('2018年'));
const review=C.lessons.find(l=>l.id==='admin-review');assert.ok(review.versionNote.includes('2026-07-01'));
assert.ok(C.sources['admin-review-law'].url.startsWith('https://www.mee.gov.cn/'));
assert.ok(C.sources['admin-review-rules-2026'].url.startsWith('https://legalinfo.moj.gov.cn/'));
assert.ok(C.sources['cpi-rebase-2026'].year.includes('2026'));
assert.ok(review.sections[8][1].includes('不能再把2007版'));
assert.ok(constitution.sections[0][1].includes('不以成年作为公民身份条件'));
assert.ok(q.q400.optionReviews[2].includes('不以成年作为公民身份条件'));
assert.ok(constitution.sections[6][1].includes('国家的、社会的、集体的利益和其他公民的合法的自由和权利'));
assert.ok(!constitution.sections[6][1].includes('相应公共利益'));
assert.ok(constitution.sections[5][1].includes('通信检查的具体事由、主体和法定程序，本课尚未覆盖'));
assert.ok(review.sections[5][1].includes('未告知情形的具体最长期间、起算点及与其他期间的适用关系，本课尚未覆盖'));
console.log('PASS Reviewed condition endpoints and explicit 2018/2023/2026 source-version guards; legal and geographical facts require separate primary-text review');
