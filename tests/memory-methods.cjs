"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8');
const errors=[],outgoing=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://study.example/#course',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
const w=dom.window,d=w.document;installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
w.fetch=(...args)=>{outgoing.push(args);throw Error('unexpected outgoing request');};
const snapshot=()=>Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];}).sort();
let baseContent,baseStorage;
for(const[,file]of html.matchAll(/src="\.\/([^"]+)"/g)){
  if(file==='memory-methods.js'){baseContent=JSON.stringify(w.STUDY_CONTENT);baseStorage=snapshot();}
  w.eval(fs.readFileSync(path.join(root,'docs',file),'utf8'));
  if(file==='memory-methods.js'){assert.equal(JSON.stringify(w.STUDY_CONTENT),baseContent);assert.deepEqual(snapshot(),baseStorage);}
}
const C=w.STUDY_CONTENT,P=w.STUDY_COURSE,M=w.STUDY_MEMORY_METHODS;
const route=hash=>navigateHash(w,hash,()=>{w.location.hash=hash;});
const expected=['growth','rate-amount-order','share','average','compound-growth','mixed-growth','logic','definition','argument','mainidea','word','detail-reading','profit-discount','work','summary','proposal','practice-cognition','contradiction-method','productive-relations','mao-thought-context','social-being-people','mao-living-soul','six-method-principles','new-quality-productivity','reform-framework-2024','unified-market-rules','new-development-pattern','education-strong-2035'];
(async()=>{
  assert.deepEqual(Object.keys(M.cards),[...expected,...w.STUDY_MAO_DENG_EXPANSION.lessonIds,...w.STUDY_MARXISM_COURSE.lessonIds,...w.STUDY_POLICY_2026.lessonIds]);assert.equal(C.lessons.length,127);assert.equal(C.questions.length,885);assert.equal(C.writing.length,87);
  const contentBefore=JSON.stringify(C),stored=snapshot();let views=0;
  for(const [id,card]of Object.entries(M.cards)){
    assert.ok(C.lessons.some(l=>l.id===id));
    for(const field of ['cue','applies','example','avoid'])assert.ok(typeof card[field]==='string'&&card[field].length>=10,id+field);
    assert.equal(card.contrast.length,3);if(card.sourceIds)assert.ok(card.sourceIds.every(s=>C.sources[s]),id+' has resolvable source IDs');assert.equal(new Set(Object.values(card.recall).map(r=>r[0])).size,3);
    const track=P.tracks.find(t=>P.rows(t).some(r=>r.id===id));
    for(const stage of ['intro','practice','advanced']){
      await route(P.link(track,stage,id));
      const node=d.querySelector('[data-memory-lesson]');assert.equal(node.dataset.memoryLesson,id);assert.equal(d.querySelectorAll('.memory-card').length,1);
      assert.equal(node.querySelector('.memory-cue').textContent,card.cue);assert.ok(node.querySelector('.memory-applies').textContent.includes(card.applies));
      assert.equal(node.querySelector('.memory-explain').open,false);assert.equal(node.querySelector('.memory-answer').open,false);
      assert.equal(node.querySelector('.memory-recall h3').textContent,'自测');
      assert.equal(node.querySelector('.memory-answer summary').textContent,'答案');
      assert.equal(node.querySelector('.memory-scope'),null);
      assert.equal(node.querySelector('.memory-recall>p').textContent,card.recall[stage][0]);
      assert.equal(node.querySelector('.memory-answer p').textContent,card.recall[stage][1]);
      node.querySelector('.memory-explain>summary').click();assert.equal(node.querySelector('.memory-explain').open,true);
      node.querySelector('.memory-answer>summary').click();assert.equal(node.querySelector('.memory-answer').open,true);
      node.querySelector('.memory-answer>summary').click();assert.equal(node.querySelector('.memory-answer').open,false);
      assert.equal(node.querySelectorAll('input,textarea,script,a,iframe').length,0);views++;
    }
  }
  await route('#course/data/intro/growth');assert.equal(d.querySelector('.memory-answer').open,false,'return resets reveal');
  await route('#course/reasoning/intro/cube-net');assert.equal(d.querySelector('.memory-card'),null,'no fabricated coverage for unauthored lessons');
  await route('#lesson/growth');assert.equal(d.querySelector('.memory-card'),null,'old complete lesson route unchanged');
  assert.equal(M.render('missing','intro'),'');assert.equal(M.render('growth','unknown'),'');
  const saved=M.cards.growth.cue;M.cards.growth.cue='<img src=x onerror=alert(1)> & test';
  const fragment=d.createElement('div');fragment.innerHTML=M.render('growth','intro');assert.equal(fragment.querySelector('img'),null);assert.equal(fragment.querySelector('.memory-cue').textContent,M.cards.growth.cue);M.cards.growth.cue=saved;
  assert.equal(JSON.stringify(C),contentBefore);assert.deepEqual(snapshot(),stored,'reading/reveals never change any localStorage key');assert.deepEqual(outgoing,[]);assert.deepEqual(errors,[]);
  // Independent numeric spot checks, including exceptions to shortcuts.
  const eq=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
  eq((75-60)/60,.25);eq(80/(1-.2),100);eq(100.4/1.25,80.32);
  eq((1+.2)/(1+.5)-1,-.2);eq((2*10+8*20)/10,18);eq((2*10+8*10)/10,10);
  eq(1.2*.8-1,-.04);eq(1/(1-.2)-1,.25);eq((100*.2+300*0)/400,.05);eq((100*.2+300*.2)/400,.2);
  eq((150*.8-100)/100,.2);eq(1/(1/6+1/3),2);
  assert.match(M.cards.growth.avoid,/下降 100%/);assert.match(M.cards['rate-amount-order'].applies,/不能为 −100%/);assert.match(M.cards['mixed-growth'].avoid,/下降 100%/);
  // Keep official names and the two different contradiction levels exact.
  assert.match(M.cards['new-quality-productivity'].applies,/高科技高效能高质量/);
  assert.match(M.cards['contradiction-method'].contrast[2][1],/主要矛盾.*次要矛盾.*主要方面.*次要方面/);
  assert.match(M.cards['mao-living-soul'].contrast[0][1],/实事求是、群众路线、独立自主/);
  assert.match(M.cards['mao-living-soul'].contrast[1][1],/统一战线、武装斗争、党的建设/);
  assert.match(M.cards['mao-living-soul'].contrast[2][1],/理论联系实际、密切联系群众、批评与自我批评/);
  assert.match(M.cards['reform-framework-2024'].example,/2029.*本《决定》/);
  assert.match(M.cards['education-strong-2035'].contrast[1][1],/2027.*阶段性成效.*2035.*建成教育强国/);
  console.log(`PASS memory methods: 28 authored lessons, ${views} stage-specific oral recalls; hidden/repeated reveals, original question/content counts, every storage key unchanged, missing lesson/stage, escaping and numeric exceptions verified.`);dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
