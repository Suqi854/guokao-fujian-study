"use strict";
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8'),errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://study.example/#course/data/intro/growth',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.fetch=()=>{throw Error('unexpected outgoing request');};
for(const[,f]of html.matchAll(/src="\.\/([^"]+)"/g))w.eval(fs.readFileSync(path.join(root,'docs',f),'utf8'));
const C=w.STUDY_CONTENT,P=w.STUDY_COURSE,route=hash=>navigateHash(w,hash,()=>{w.location.hash=hash;});
const omitted=new Set(['方法归属与答后检查','历史出处与使用边界','历史出处与本站对照的归属','复盘与来源边界','练习复盘与出处边界','来源边界与复盘检查','两个出处的同与异']);
(async()=>{
  const before=JSON.stringify(C),storage=w.localStorage.getItem('zhixu-study-v2');let views=0,checks=0;
  for(const track of P.tracks)for(const stage of P.stages)for(const row of P.rows(track)){
    await route(P.link(track,stage.id,row.id));const l=C.lessons.find(l=>l.id===row.id),level=l.learningLevels?.[stage.id];
    assert.ok(d.querySelector('.focus-hero'));assert.equal(d.querySelector('.focus-original').open,false);
    const expected=(level?level.sections.map(i=>l.sections[i]):l.sections).filter(s=>!omitted.has(s[0]));
    const actual=[...d.querySelectorAll('.focus-original>section')].map(s=>[s.querySelector('h2').textContent,s.querySelector('p').textContent]);
    assert.deepEqual(actual,JSON.parse(JSON.stringify(expected)),l.id+' exact original teaching preserved');
    const tabs=[...d.querySelectorAll('.focus-step-tabs [role=tab]')];
    if(tabs.length){assert.equal(d.querySelectorAll('.focus-step-panel:not([hidden])').length,1);tabs.at(-1).click();assert.equal(d.querySelectorAll('.focus-step-panel:not([hidden])').length,1);assert.equal(tabs.at(-1).getAttribute('aria-selected'),'true');tabs.at(-1).dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));assert.equal(tabs[0].getAttribute('aria-selected'),'true');}
    const qnode=d.querySelector('[data-focus-question]');if(qnode){const q=C.questions.find(q=>q.id===qnode.dataset.focusQuestion);assert.equal(qnode.querySelector('.focus-question').textContent,q.stem);assert.deepEqual([...qnode.querySelectorAll('.focus-options li')].map(n=>n.textContent),JSON.parse(JSON.stringify(q.options)));assert.ok(qnode.querySelector('.focus-answer').textContent.includes(q.explanation));assert.equal(qnode.querySelector('.focus-answer').open,false);assert.ok(qnode.querySelector('a').hash.endsWith('/course/'+track.id+'/'+stage.id+'/'+l.id));checks++;}
    views++;
  }
  assert.equal(JSON.stringify(C),before);assert.equal(w.localStorage.getItem('zhixu-study-v2'),storage,'reading and reveals never write attempts');
  await route('#course/data/intro/growth');assert.match(d.querySelector('.focus-takeaway').textContent,/分母/);assert.equal(d.querySelectorAll('.focus-worked-steps li').length,3);assert.match(d.querySelector('.focus-worked-steps').textContent,/50 ÷ 200 = 25%/);
  await route('#course/data/practice/growth');assert.match(d.querySelector('.focus-worked-steps').textContent,/150 ÷ 1.25 = 120/);assert.equal(d.querySelector('[data-focus-question]').dataset.focusQuestion,'q230');
  await route('#course/data/advanced/growth');assert.match(d.querySelector('.focus-worked-steps').textContent,/120.48 ÷ 1.2 = 100.4/);assert.equal(d.querySelector('[data-focus-question]').dataset.focusQuestion,'q231');
  await route('#course/data/intro/rate-amount-order');const button=d.querySelector('.focus-next');button.click();assert.equal(d.querySelectorAll('.focus-step-panel:not([hidden])').length,1);assert.equal(d.activeElement.id,'focus-step-1');
  await route('#lesson/growth/intro');assert.equal(d.querySelector('.focus-hero'),null,'complete old lesson route unchanged');
  assert.deepEqual(errors,[]);console.log(`PASS focused reader: ${views} course views, ${checks} linked self-checks, exact originals, single-step navigation/keyboard/focus, no content or storage mutations; growth maths and old lesson route preserved.`);dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
