'use strict';
// Independent v0.34 content checks. No dependencies, network, writes, or site suites.
// Integrated: node tests/overnight-content.cjs [site-root]
// Isolated candidate: node independent-content-check.cjs <site-root> <candidate-import.js>
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8');
const scripts=[...html.matchAll(/<script src="\.\/([^"]+)"/g)].map(m=>m[1]).filter(f=>!['app.js','practice-targeted-v035.js','fujian-governance-v035.js','curriculum-v036.js','politics-v036.js','curriculum-v037.js','policy-v037.js','curriculum-v038.js','practice-diagnostic-v037.js'].includes(f));
const c=vm.createContext({window:{}});
for(const f of scripts)vm.runInContext(fs.readFileSync(path.join(root,'docs',f),'utf8'),c,{filename:f});
const snapshot=JSON.stringify(c.window.STUDY_CONTENT.questions);
if(process.argv[3])vm.runInContext(fs.readFileSync(path.resolve(process.argv[3]),'utf8'),c,{filename:process.argv[3]});
const plain=x=>JSON.parse(JSON.stringify(x)),all=plain(c.window.STUDY_CONTENT.questions);
const qs=all.filter(q=>/^on-(source-reading|argument-chain|period-scope)-\d\d$/.test(q.id));
const old=all.filter(q=>!qs.some(n=>n.id===q.id));
assert.equal(qs.length,27);assert.equal(old.length,594);
if(process.argv[3])assert.equal(JSON.stringify(old),snapshot,'Existing questions changed');
const by=Object.fromEntries(qs.map(q=>[q.id,q]));
const stats={questions:27,oldQuestions:594,answers:{},positions:[0,0,0,0],numeric:{},logic:{},materials:{},lengths:{},scope:'Independent arithmetic/models plus manual-review answer locks; not a full site or learner-validity test.'};
function unique(id,truth){assert.equal(truth.filter(Boolean).length,1,id+' must have one supported option');const ix=truth.findIndex(Boolean);assert.equal(by[id].answer,ix,id+' key');stats.answers[id]='ABCD'[ix];}
function manual(id,text){unique(id,by[id].options.map(o=>o===text));}
for(const q of qs){
 assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.optionReviews.length,4);
 assert.equal(q.explanation,q.optionReviews[q.answer]);assert.equal(q.meta.answerReview.status,'editorial-reviewed');
 assert.equal(q.meta.source.kind,'original');assert.equal(q.meta.difficulty.level,null);assert.equal(q.meta.examSource.year,null);
 stats.positions[q.answer]++;
 if(q.materialGroup){const material=q.stem.split('\n\n【问题】')[0];assert.equal(q.materialIds[0],q.materialGroup);const existing=stats.materials[q.materialGroup];if(existing)assert.equal(existing.text,material);else stats.materials[q.materialGroup]={text:material,ids:[]};stats.materials[q.materialGroup].ids.push(q.id);}
}
assert.deepEqual(stats.positions,[7,7,7,6]);assert.equal(Object.keys(stats.materials).length,6);
for(const m of Object.values(stats.materials)){assert.equal(m.ids.length,3);m.sha256=crypto.createHash('sha256').update(m.text).digest('hex');delete m.text;}
// Independently adjudicated semantic keys. These are regression locks, not proofs by software.
const language=[
'两人分别关注追溯历史和完成导航，可以相互配合',
'同时违背保留历史痕迹与核实现行对应关系这两项要求',
'各方对展示思路的认可有记录，但上线与效果仍待核实',
'可以选取片段展示，但应使选择和背景能够被核查',
'录制日志标明收尾活动，时间与片段在母版中的位置对应',
'剪辑本身不等于伪造，仍须检查呈现方式和具体解释',
'还原旧事件的适用要求，避免用新版一概评价过去的操作',
'步骤符合当时适用的甲版，不能因后来升级判定顺序错误',
'方案试图区分现场操作与历史查询，实际执行仍需另行核验'];
language.forEach((text,i)=>manual(`on-source-reading-${String(i+1).padStart(2,'0')}`,text));
const logicManual={
1:'采用护角有望减少因边角破损导致的报废',
2:'其余环节合计的平均耗时增加量小于2分钟',
3:'两个月这台设备分别实际运行了多少小时',
5:'两方案发车间隔都受规则约束固定为20分钟',
6:'两批被检查产品各自实际包含的缺陷产品数量',
7:'结论超出了测试条件，无线正常启用时可以不靠有线回传',
8:'流量的下降有另一条足够路径，不能据此反推分流道启用',
9:'已比方案中甲最低，但其他可行方案仍可能费用更低'};
for(const [i,text]of Object.entries(logicManual))manual(`on-argument-chain-${String(i).padStart(2,'0')}`,text);
// 01: directed support graph. Only reduced-scrap is both derived and a support.
const edges=[['experiment','reduced-scrap'],['history','reduced-scrap'],['reduced-scrap','expense']];
const middle=['history','expense','reduced-scrap','experiment'].filter(x=>edges.some(e=>e[1]===x)&&edges.some(e=>e[0]===x));assert.deepEqual(middle,['reduced-scrap']);stats.logic.middle=middle;
// 02: exact doubled-minute grid verifies total delta=-2+restDelta, including negative changes.
for(let d=-20;d<=20;d++)assert.equal(-4+d<0,d<4);
const oldSplit=[10,10],newSplit=[9,7],oldRest=[5,5],newRest=[6,6];
assert.equal(newSplit.reduce((a,b)=>a+b)-oldSplit.reduce((a,b)=>a+b),-4);
assert.ok(newSplit.some((v,i)=>v-oldSplit[i]!==-2));
assert.ok(newRest.reduce((a,b)=>a+b)>oldRest.reduce((a,b)=>a+b));
assert.ok(newSplit.reduce((a,b)=>a+b)+newRest.reduce((a,b)=>a+b)<oldSplit.reduce((a,b)=>a+b)+oldRest.reduce((a,b)=>a+b));
assert.ok(5<10 && 3+10<5+10); // C is not necessary: old sorting need not exceed the other stage.
stats.logic.necessaryCounterexample={oldSplit,newSplit,oldRest,newRest,sortingNotLongest:{old:[5,10],new:[3,10]}};
// 03: runtime may make the observed rate lower or higher, with the same fault counts.
assert.ok(3/100<6/100);assert.ok(3/25>6/100);stats.logic.runtimeWitnesses=[[100,100],[100,25]];
// 04: two-object exhaustive first-order models for L=list,D=dry,R=room,N=no cooler.
const bits=n=>Array.from({length:2**n},(_,mask)=>Array.from({length:n},(_,i)=>!!(mask&(1<<i))));
const models=bits(8).map(v=>[v.slice(0,4),v.slice(4)]).filter(ms=>ms.some(([L])=>L)&&ms.every(([L,D,R,N])=>(!L||D)&&(!R||N)));
const rules={
'所有不需要冷柜的样品都可以接受干燥处理':ms=>ms.every(([L,D,R,N])=>!N||D),
'所有可以接受干燥处理的样品都可以常温保存':ms=>ms.every(([L,D,R,N])=>!D||R),
'有些可以常温保存的样品也可接受干燥处理':ms=>ms.some(([L,D,R,N])=>R&&D),
'所有可在常温下保存的样品都可以接受干燥处理':ms=>ms.every(([L,D,R,N])=>!R||D)};
const bridge=by['on-argument-chain-04'];
unique(bridge.id,bridge.options.map(o=>{assert.ok(rules[o]);const admissible=models.filter(rules[o]);assert.ok(admissible.length);return admissible.every(ms=>ms.every(([L,D,R,N])=>!L||N));}));
stats.logic.bridgeModels=models.length;
// 05: the counterfact leaves the proposed intermediate quantity unchanged.
assert.equal(20-20,0);assert.ok(8<12);stats.logic.plan={oldJourney:12,newJourney:8,oldInterval:20,newInterval:20};
// 06: both rankings of missed-defect proportions are possible.
const missed=(found,actual)=>1-found/actual;assert.ok(missed(30,30)<missed(40,80));assert.ok(missed(30,60)>missed(40,40));stats.logic.defectWitnesses=[[30,80],[60,40]];
// 07/08: explicit countermodels preserve every given implication.
assert.equal(false||true,true);stats.logic.wireless={wired:false,wireless:true,success:true};
const implicationModels=bits(3).filter(([P,R,Q])=>(!P||Q)&&(!R||Q));assert.ok(implicationModels.some(([P,R,Q])=>!P&&R&&Q));assert.ok(implicationModels.some(([P,R,Q])=>P&&R&&Q));stats.logic.implicationModels=implicationModels;
// 09: fixed observed order admits both a cheaper and a dearer unexamined scheme.
assert.ok(10<20&&20<30&&5<10&&15>10);stats.logic.costWitnesses=[[10,20,30,5],[10,20,30,15]];
// Exact rational arithmetic, rather than the package author's formulas/test implementation.
const f=(n,d=1)=>[BigInt(n),BigInt(d)], add=(a,b)=>[a[0]*b[1]+b[0]*a[1],a[1]*b[1]], sub=(a,b)=>[a[0]*b[1]-b[0]*a[1],a[1]*b[1]], div=(a,b)=>[a[0]*b[1],a[1]*b[0]], mul=(a,b)=>[a[0]*b[0],a[1]*b[1]], eq=(a,b)=>a[0]*b[1]===b[0]*a[1], val=a=>Number(a[0])/Number(a[1]);
const roundTenth=a=>Number((a[0]*20n+a[1])/(a[1]*2n))/10;
const growth=(current,base)=>sub(div(f(current),f(base)),f(1));
function numberAnswer(i,expected,percentage=false){const id=`on-period-scope-${String(i).padStart(2,'0')}`,target=percentage?roundTenth(mul(expected,f(100))):val(expected);unique(id,by[id].options.map(o=>Number(o.replace('%',''))===target));stats.numeric[id]=target;}
const past=[120,300,510,760],current=[144,354,594,874];
const increments=x=>x.map((v,i)=>v-(x[i-1]||0)),p=increments(past),n=increments(current);
assert.deepEqual(p,[120,180,210,250]);assert.deepEqual(n,[144,210,240,280]);
numberAnswer(1,f(n[1]));numberAnswer(2,growth(n[2],p[2]),true);
const first=growth(current[1],past[1]),second=growth(current[3]-current[1],past[3]-past[1]),annual=growth(current[3],past[3]);
const statements={
'2026年第四季度完成量同比增长16.0%':eq(growth(n[3],p[3]),f(16,100)),
'2026年下半年增速比上半年低约5.0个百分点':roundTenth(mul(sub(first,second),f(100)))===5,
'2026年全年增速等于两个半年增速的算术平均':eq(annual,div(add(first,second),f(2))),
'2026年第三季度当期同比增加了84千件':n[2]-p[2]===84};
unique('on-period-scope-03',by['on-period-scope-03'].options.map(o=>{assert.ok(o in statements);return statements[o]}));
stats.numeric.halfYear={first:val(first),second:val(second),gapPoints:val(mul(sub(first,second),f(100))),annual:val(annual)};
const arrivals=[200,180,240],finished=[220,160,260];let stock=120;const ends=arrivals.map((v,i)=>(stock+=v-finished[i]));
numberAnswer(4,f(stock));numberAnswer(5,f(finished.reduce((a,b)=>a+b),120+arrivals.reduce((a,b)=>a+b)),true);
// 06: 2 business days per month are allowed; early/late bulk posting preserves every monthly total.
function daily(early){let s=120;return arrivals.flatMap((a,i)=>{const initial=s;s+=a-finished[i];assert.ok(s>=0);return early?[s,s]:[initial,s]});}
const early=daily(true),late=daily(false);assert.deepEqual(early.filter((_,i)=>i%2),ends);assert.deepEqual(late.filter((_,i)=>i%2),ends);assert.notEqual(early.reduce((a,b)=>a+b),late.reduce((a,b)=>a+b));
manual('on-period-scope-06','需补每日待办或等价记录，三个时点不足以确定日均待办');stats.numeric.dailyWitnesses={early,late,earlyMean:early.reduce((a,b)=>a+b)/6,lateMean:late.reduce((a,b)=>a+b)/6};
// 07-09: solve via set sums and construct two full nonnegative daily sequences.
const sequences=[[40,56,60,61,62,63,78,68,63],[50,56,50,61,62,63,78,78,63]],sum=a=>a.reduce((x,y)=>x+y,0);
for(const days of sequences){assert.ok(days.every(n=>Number.isInteger(n)&&n>=0));assert.equal(sum(days.slice(0,7)),420);assert.equal(sum(days.slice(1,8)),448);assert.equal(sum(days.slice(2,9)),455);assert.equal(days[8],63);}
numberAnswer(7,f(63-(455-448)));assert.equal(sequences[0][7]-sequences[0][0],28);assert.equal(sequences[1][7]-sequences[1][0],28);assert.notEqual(sequences[0][7],sequences[1][7]);
manual('on-period-scope-08','差额28表示6月8日咨询量比6月1日多28件');numberAnswer(9,f(455+40+(63-(455-448))));stats.numeric.rollingWitnesses=sequences;
// Structural and cue audit. Length statistics do not substitute for semantic review.
for(const lesson of ['on-source-reading','on-argument-chain','on-period-scope']){
 const subset=qs.filter(q=>q.lesson===lesson);assert.equal(subset.length,9);
 const metrics={firstLongest:0,firstShortest:0,uniqueLongest:0,uniqueShortest:0};
 for(const q of subset){const z=q.options.map(s=>[...s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'')].length),max=Math.max(...z),min=Math.min(...z);metrics.firstLongest+=Number(q.answer===z.indexOf(max));metrics.firstShortest+=Number(q.answer===z.indexOf(min));metrics.uniqueLongest+=Number(z[q.answer]===max&&z.filter(n=>n===max).length===1);metrics.uniqueShortest+=Number(z[q.answer]===min&&z.filter(n=>n===min).length===1);}
 stats.lengths[lesson]=metrics;
 const l=plain(c.window.STUDY_CONTENT.lessons.find(l=>l.id===lesson));assert.deepEqual(new Set(l.practice),new Set(subset.map(q=>q.id)));const refs=Object.values(l.learningLevels).flatMap(g=>g.questionIds);assert.equal(refs.length,9);assert.equal(new Set(refs).size,9);
 for(const g of Object.values(l.learningLevels)){assert.equal(g.questionIds.length,3);assert.ok(g.questionIds.every(id=>by[id]?.trainingStage===g.stage));}
}
let run=1,maxRun=1;for(let i=1;i<qs.length;i++){run=qs[i].answer===qs[i-1].answer?run+1:1;maxRun=Math.max(maxRun,run);}assert.equal(maxRun,2);stats.answerSequence=qs.map(q=>'ABCD'[q.answer]).join('');stats.maxAnswerRun=maxRun;
const normalize=s=>s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'');const existingStems=new Set(old.map(q=>normalize(q.stem)));assert.ok(qs.every(q=>!existingStems.has(normalize(q.stem))));stats.exactOldDuplicates=0;
assert.equal(Object.keys(stats.answers).length,27);
console.log(JSON.stringify(stats,null,2));console.log('PASS independent review: 27 answer locks, exact numeric recomputation, logical countermodels, 6 material groups, synchronized keys/reviews, cue and exact-duplicate checks.');
