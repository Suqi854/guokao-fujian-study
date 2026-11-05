"use strict";
// Structural/version guards do not replace the separate primary-source and prose review.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),ctx={window:{}};vm.createContext(ctx);
for(const m of fs.readFileSync(path.join(root,'docs/index.html'),'utf8').matchAll(/src="\.\/([^\"]+)"/g))if(m[1]!=='app.js')vm.runInContext(fs.readFileSync(path.join(root,'docs',m[1]),'utf8'),ctx);
const C=JSON.parse(JSON.stringify(ctx.window.STUDY_CONTENT)),q=Object.fromEntries(C.questions.map(x=>[x.id,x])),ids=['practice-cognition','contradiction-method','productive-relations','mao-thought-context'];
assert.equal(C.lessons.length,102);assert.equal(C.questions.length,669);assert.equal(C.lessons.filter(l=>l.learningLevels).length,88);assert.equal(C.lessons.filter(l=>!l.learningLevels).length,14);assert.equal(Object.keys(C.sources).length,40);
assert.equal(C.writing.length,75);assert.equal(new Set(C.writing.map(w=>w.material)).size,33);assert.equal(C.methods.length,17);assert.equal(C.comparisons.length,7);
const trackIds=[...ids,'social-being-people','mao-living-soul','six-method-principles','new-quality-productivity','reform-framework-2024','unified-market-rules'];
assert.deepEqual(Object.keys(C.learningPaths),['intro','practice','advanced']);assert.deepEqual(C.theoryTrack.steps.map(s=>s.lessonId),trackIds);assert.equal(new Set(C.theoryTrack.steps.map(s=>s.lessonId)).size,10);
for(const id of ids){const l=C.lessons.find(l=>l.id===id);assert.equal(l.category,'政治理论');assert.equal(l.sections.length,9);assert.equal(l.practice.length,6);assert.ok(l.versionNote);assert.ok(l.sources.every(id=>C.sources[id]));assert.deepEqual(Object.values(l.learningLevels).flatMap(g=>g.sections),[...Array(9).keys()]);for(const g of Object.values(l.learningLevels)){assert.equal(g.questionIds.length,2);assert.ok(g.questionIds.every(id=>q[id].lesson===l.id&&q[id].meta.trainingStage===g.stage));}}
assert.deepEqual([...Array(24)].map((_,i)=>q['q'+(436+i)].answer),[2,0,3,1,1,3,0,2,3,0,2,1,2,1,0,3,0,2,1,3,3,0,1,2]);
for(let n=436;n<=459;n++){const x=q['q'+n];assert.equal(x.optionReviews.length,4);assert.equal(x.meta.source.kind,'original');assert.equal(x.meta.examSource.year,null);assert.equal(x.meta.difficulty.level,null);assert.equal(x.meta.module,'政治理论');}
for(const stage of ['识别概念','迁移运用','检查边界'])assert.equal(C.questions.filter(q=>q.meta.trainingStage===stage).length,195);
assert.equal(C.lessons.filter(l=>l.category==='政治理论').length,12);assert.equal(C.questions.filter(q=>q.meta.module==='政治理论').length,70);
assert.ok(C.sources['mao-practice-1937'].year.includes('1937年7月'));assert.ok(C.sources['mao-practice-1937'].year.includes('2017-08-29'));
assert.ok(C.sources['mao-contradiction-1937'].scope.includes('有修订'));assert.ok(C.sources['marx-preface-1859'].year.includes('2009'));assert.ok(C.sources['marx-preface-1859'].year.includes('网页发布日期未标'));
assert.ok(C.sources['mao-seventh-1945'].year.includes('1945'));assert.ok(C.sources['mao-seventh-1945'].year.includes('2012-11-23'));assert.ok(C.sources['mao-seventh-1945'].scope.includes('不是1945党章原件'));
assert.equal(new URL(C.sources['marx-preface-1859'].url).hostname,'2d.hep.com.cn');
assert.ok(C.lessons.find(l=>l.id==='mao-thought-context').sources.includes('mao-contradiction-1937'));
assert.ok(q.q444.stem.includes('对过程发展起决定性作用'));assert.ok(q.q445.stem.includes('仅按题设给定'));assert.ok(q.q446.optionReviews.some(s=>s.includes('相互依存不等于')));
console.log('PASS Four source-scoped theory lessons, twelve exact paths, 24 original questions, distinct historical/web/edition years and unchanged v1 identities');
console.log('NOT A FACT CHECK: answer indices and phrase guards only prevent drift; primary-source and semantic review are recorded separately');

// An observable item-quality guard, not a difficulty calibration or semantic proof.
const recent=Array.from({length:24},(_,i)=>q['q'+(436+i)]),visibleLength=s=>[...s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'')].length;
const metrics={uniqueLongest:0,atMaximum:0,uniqueShortest:0,atMinimum:0,firstLongest:0,firstShortest:0,positions:[0,0,0,0]};
for(const x of recent){const sizes=x.options.map(visibleLength),a=x.answer,others=sizes.filter((_,i)=>i!==a);metrics.positions[a]++;metrics.uniqueLongest+=Number(sizes[a]>Math.max(...others));metrics.atMaximum+=Number(sizes[a]===Math.max(...sizes));metrics.uniqueShortest+=Number(sizes[a]<Math.min(...others));metrics.atMinimum+=Number(sizes[a]===Math.min(...sizes));metrics.firstLongest+=Number(a===sizes.indexOf(Math.max(...sizes)));metrics.firstShortest+=Number(a===sizes.indexOf(Math.min(...sizes)));}
assert.deepEqual(metrics.positions,[6,6,6,6]);assert.ok(metrics.atMaximum<=8&&metrics.atMinimum<=8,JSON.stringify(metrics));assert.ok(metrics.firstLongest<=8&&metrics.firstShortest<=8,JSON.stringify(metrics));
let run=1,maxRun=1;for(let i=1;i<recent.length;i++){run=recent[i].answer===recent[i-1].answer?run+1:1;maxRun=Math.max(maxRun,run);}assert.ok(maxRun<=2);
for(let period=1;period<=6;period++)assert.ok(!recent.every((x,i)=>x.answer===recent[i%period].answer),'repeating answer cycle '+period);
console.log('PASS Observable option-length/position guard '+JSON.stringify(metrics)+'; not evidence of calibrated difficulty');
const rawMetrics={uniqueLongest:0,atMaximum:0,uniqueShortest:0,atMinimum:0,firstLongest:0,firstShortest:0};
for(const x of recent){const sizes=x.options.map(s=>[...s.replace(/\s/gu,'')].length),a=x.answer,others=sizes.filter((_,i)=>i!==a);rawMetrics.uniqueLongest+=Number(sizes[a]>Math.max(...others));rawMetrics.atMaximum+=Number(sizes[a]===Math.max(...sizes));rawMetrics.uniqueShortest+=Number(sizes[a]<Math.min(...others));rawMetrics.atMinimum+=Number(sizes[a]===Math.min(...sizes));rawMetrics.firstLongest+=Number(a===sizes.indexOf(Math.max(...sizes)));rawMetrics.firstShortest+=Number(a===sizes.indexOf(Math.min(...sizes)));}
assert.ok(rawMetrics.atMaximum<=8&&rawMetrics.atMinimum<=8,JSON.stringify(rawMetrics));assert.ok(rawMetrics.firstLongest<=8&&rawMetrics.firstShortest<=8,JSON.stringify(rawMetrics));
console.log('PASS Including-punctuation length guard '+JSON.stringify(rawMetrics)+'; normalized and raw counts are both disclosed');
