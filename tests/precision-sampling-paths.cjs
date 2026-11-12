"use strict";
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);
for(const m of fs.readFileSync(path.join(root,'docs/index.html'),'utf8').matchAll(/src="\.\/([^\"]+)"/g))if(m[1]!=='app-studio-20261112.js')vm.runInContext(fs.readFileSync(path.join(root,'docs',m[1]),'utf8'),ctx);
const C=JSON.parse(JSON.stringify(ctx.window.STUDY_CONTENT)),q=Object.fromEntries(C.questions.map(x=>[x.id,x])),chosen=id=>q[id].options[q[id].answer];
assert.equal(C.lessons.length,127);assert.equal(C.questions.length,885);assert.equal(C.lessons.filter(l=>l.learningLevels).length,119);assert.equal(C.lessons.filter(l=>!l.learningLevels).length,8);
assert.equal(Object.keys(C.sources).length,80);assert.equal(C.methods.length,17);assert.equal(C.comparisons.length,7);assert.equal(C.writing.length,87);assert.equal(new Set(C.writing.map(w=>w.material)).size,37);
for(const id of ['estimation-boundary','without-replacement','three-set-counting','next-paragraph']){
 const l=C.lessons.find(x=>x.id===id);assert.equal(l.sections.length,9);assert.equal(l.practice.length,9);assert.deepEqual(Object.values(l.learningLevels).flatMap(g=>g.sections),[...Array(9).keys()]);
 for(const g of Object.values(l.learningLevels)){assert.equal(g.questionIds.length,2);assert.ok(g.questionIds.every(id=>q[id].lesson===l.id&&q[id].meta.trainingStage===g.stage));}
}
for(let n=412;n<=435;n++){const x=q['q'+n];assert.equal(x.optionReviews.length,4);assert.equal(x.meta.source.kind,'original');assert.equal(x.meta.examSource.year,null);assert.equal(x.meta.difficulty.level,null);}
console.log('PASS Four nine-section lessons, twelve new paths, 24 original questions and unchanged v1 writing/source identities');
// Ratios are established by cross-multiplication and nearest-value midpoints.
const nearest=(x,choices)=>{const ds=choices.map(n=>Math.abs(x-n)),m=Math.min(...ds);return choices.filter((n,i)=>Math.abs(ds[i]-m)<1e-12);};
assert.ok(9840>199*49);assert.ok(984<199*5);assert.deepEqual(nearest(984/199,[3,5,7,9]),[Number(chosen('q412'))]);assert.notEqual(984/199,5);
const rounded=Array.from({length:999},(_,i)=>i+1).filter(n=>Math.floor((n+50)/100)*100===700);assert.equal(rounded.length,100);assert.equal(rounded[0],650);assert.equal(rounded.at(-1),749);assert.equal(chosen('q413'),'650至749');
assert.ok(196*2>7*50);assert.ok(198*2<9*49); // whole ratio interval lies in (3.5,4.5).
for(let n=1960;n<=1980;n++)for(let d=490;d<=500;d++)assert.deepEqual(nearest(n/d,[4,3,5,6]),[Number(chosen('q414'))]);
for(let n=4025;n<=4035;n++)assert.deepEqual(nearest(n/1000,[4.01,4.03]),[4.03]);assert.deepEqual(nearest(4.02,[4.01,4.03]),[4.01,4.03]);assert.equal(q.q415.answer,2);
const worlds=[[14.96,15.04],[15.04,14.96],[15,15]];for(const w of worlds)assert.deepEqual(w.map(n=>(Math.round(n*10)/10).toFixed(1)),['15.0','15.0']);assert.deepEqual(worlds.map(([a,b])=>Math.sign(a-b)),[-1,1,0]);assert.equal(q.q416.answer,3);
let max=-Infinity;for(const n of [99,100,101])for(const d of [99,100,101])max=Math.max(max,(n-d)/d*100);assert.equal(max.toFixed(2),'2.02');assert.equal(parseFloat(chosen('q417')),2.02);assert.ok(200>2*99); // upper increment 200/99 percent is strictly greater than 2%.
console.log('PASS Exact rounding range, positive-ratio bounds, midpoint ties, opposed hidden originals and ratio-error endpoints');
// Textual comparison is reviewed separately in ANSWER_REVIEW.md; these guard the reviewed task conditions.
assert.deepEqual([430,431,432,433,434,435].map(n=>q['q'+n].answer),[2,0,3,1,2,0]);
assert.ok(q.q433.stem.includes('明确调整安排'));assert.ok(q.q434.stem.includes('无其他文体或顺序要求'));assert.ok(q.q435.stem.includes('再讨论结果'));
// All 3^8 small eight-region populations independently check inclusive pair-intersection identities.
const pop=m=>[1,2,4].filter(bit=>m&bit).length;
for(let code=0;code<6561;code++){
 let n=code;const counts=[];for(let i=0;i<8;i++){counts.push(n%3);n=Math.floor(n/3);}
 const S=[1,2,4].reduce((s,bit)=>s+counts.reduce((a,c,m)=>a+((m&bit)?c:0),0),0);
 const P=[3,5,6].reduce((s,mask)=>s+counts.reduce((a,c,m)=>a+((m&mask)===mask?c:0),0),0),t=counts[7];
 const exact=k=>counts.reduce((a,c,m)=>a+(pop(m)===k?c:0),0);
 assert.equal(S-P+t,counts.slice(1).reduce((a,b)=>a+b,0));assert.equal(S-2*P+3*t,exact(1));assert.equal(P-3*t,exact(2));assert.equal(P-2*t,exact(2)+exact(3));
}
console.log('PASS All6561 finite eight-region populations preserve union, exactly-one, exactly-two and at-least-two identities');
assert.deepEqual([...Array(24)].map((_,i)=>q['q'+(412+i)].answer),[1,3,0,2,3,0,1,2,1,1,2,3,1,3,0,2,1,2,2,0,3,1,2,0]);
const fraction=s=>{const m=s.match(/^(\d+)\/(\d+)$/);assert.ok(m,s);return Number(m[1])/Number(m[2]);};
const ordered=(items,k)=>{if(!k)return [[]];return items.flatMap((x,i)=>ordered(items.filter((_,j)=>j!==i),k-1).map(xs=>[x,...xs]));};
const four=ordered([1,2,3,4],2);assert.equal(four.length,12);assert.equal(four.filter(([a,b])=>a+b===5).length/four.length,fraction(chosen('q418')));
const mixed=ordered(['R1','R2','B1','W1','W2'],2),reds=xs=>xs.filter(x=>x[0]==='R').length;
assert.equal(mixed.length,20);assert.equal(mixed.filter(xs=>reds(xs)===1&&xs.some(x=>x[0]==='B')).length,4);assert.equal(q.q419.answer,2);
const triples=ordered(['R1','R2','R3','B1','B2','B3'],3),conditional=triples.filter(xs=>reds(xs)>=1);assert.equal(triples.length,120);assert.equal(conditional.length,114);assert.equal(conditional.filter(xs=>reds(xs)===2).length,54);assert.equal(54/114,fraction(chosen('q420')));
const six=ordered(['R1','R2','R3','R4','B1','B2'],2);assert.equal(six.filter(xs=>xs[1][0]==='R').length,20);assert.equal(six.filter(xs=>reds(xs)===2).length,12);assert.equal(12/30,2/5);assert.notEqual(12/30,4/9);assert.equal(q.q421.answer,1);
const balls=['R1','R2','B1','B2','B3'],last=[];
for(const first of balls){const rest=balls.filter(x=>x!==first),removed=rest.find(x=>x[0]==='B');assert.ok(removed);const final=rest.filter(x=>x!==removed);assert.equal(final.length,3);last.push(...final);}
assert.equal(last.length,15);assert.equal(last.filter(x=>x[0]==='R').length,8);assert.equal(8/15,fraction(chosen('q422')));
const same=[[0,1],[1,0],[2,3],[3,2]],opposite=[[0,2],[2,0],[1,3],[3,1]];
for(const world of [same,opposite]){assert.ok(world.every(([a,b])=>a!==b));assert.deepEqual(world.map(x=>x[0]).sort(),[0,1,2,3]);assert.deepEqual(world.map(x=>x[1]).sort(),[0,1,2,3]);}
assert.equal(same.filter(([a,b])=>a<2&&b<2).length/4,1/2);assert.equal(opposite.filter(([a,b])=>a<2&&b<2).length,0);assert.equal(q.q423.answer,3);
console.log('PASS Full ordered draw spaces, conditional54/114, unobserved margins, added-removal8/15 and two exact joint-distribution countermodels');
const expand=counts=>counts.flatMap((n,m)=>Array(n).fill(m)),inMask=(rows,mask)=>rows.filter(m=>(m&mask)===mask).length;
let rows=expand([3,4,3,2,2,1,3,2]);assert.equal(rows.length,20);assert.equal(rows.filter(m=>pop(m)>=2).length,parseFloat(chosen('q424')));
const pairWorlds=[[5,1,2,7,3,2,1,4],[14,0,0,7,0,0,0,4]].map(expand);
for(const r of pairWorlds){assert.equal(r.length,25);assert.equal(inMask(r,3),11);assert.equal(inMask(r,7),4);assert.equal(r.filter(m=>m===3).length,7);}
assert.equal(q.q425.answer,3);assert.notEqual(pairWorlds[0].filter(m=>pop(m)>=2).length,pairWorlds[1].filter(m=>pop(m)>=2).length);
rows=expand([12,7,7,8,7,6,6,7]);assert.equal(rows.length,60);assert.equal(rows.filter(Boolean).length,48);assert.equal(rows.reduce((s,m)=>s+pop(m),0),82);assert.equal(rows.filter(m=>pop(m)===2).length,20);assert.equal(inMask(rows,7),parseFloat(chosen('q426')));
rows=expand([3,10,8,8,6,6,5,4]);assert.equal(rows.length,50);assert.deepEqual([1,2,4].map(m=>inMask(rows,m)),[28,25,21]);assert.equal(rows.filter(m=>pop(m)>=2).length,23);assert.equal(chosen('q427'),'至少参加两项的有23人');assert.equal(rows.filter(m=>pop(m)===1).length,24);assert.equal([3,5,6].reduce((s,m)=>s+inMask(rows,m),0),31);
const feasible=[];
for(let t=0;t<=30;t++){
 const counts=[7-t,t,t,9-t,t-1,8-t,7-t,t];if(counts.some(n=>n<0)||counts[4]<2)continue;
 rows=expand(counts);assert.equal(rows.length,30);assert.deepEqual([1,2,4,3,5,6].map(m=>inMask(rows,m)),[17,16,14,9,8,7]);feasible.push({t,outside:counts[0]});
}
assert.deepEqual(feasible.map(x=>x.t),[3,4,5,6,7]);assert.equal(Math.max(...feasible.map(x=>x.outside)),parseFloat(chosen('q428')));
assert.equal(12-8-9+4,-1);assert.equal(8+9-4,13);assert.ok(13>12);assert.equal(12+18+17-8-9-6+4,28);assert.equal(40-28,12);assert.equal(q.q429.answer,2);
console.log('PASS Concrete eight-region reconstructions, distinct compatible worlds, all feasible triple intersections3–7 and local inconsistency despite valid-looking union');
