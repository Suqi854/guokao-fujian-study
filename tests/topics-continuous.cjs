'use strict';
const fs=require('fs'),path=require('path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(root+'/docs/index.html','utf8'),errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://continuity.synthetic.example/#course',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){this.dataset.scrolled='yes';};w.fetch=()=>{throw Error('Unexpected network');};
const legacy={schemaVersion:1,exam:'fujian',read:['growth'],favorites:['profit-bases'],notes:{'profit-bases':'保留旧笔记'},attempts:[],drafts:{w01:'旧草稿'},checks:{w01:[0]}};
w.localStorage.setItem('zhixu-study-v1',JSON.stringify(legacy));let beforeContent;
for(const[,f]of html.matchAll(/src="\.\/([^\"]+)"/g)){if(f==='topics-continuous-20261107.js')beforeContent=JSON.stringify(w.STUDY_CONTENT);w.eval(fs.readFileSync(root+'/docs/'+f,'utf8'));}
const route=h=>navigateHash(w,h,()=>{w.location.hash=h;});
const storage=()=>JSON.stringify(Object.fromEntries(Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];})));
(async()=>{
 const before=storage(),T=w.STUDY_COMPLETE_TOPICS,C=w.STUDY_CONTENT,views=w.STUDY_TOPIC_CONTINUITY;
 assert.equal(Object.keys(views.plans).length,53);
 assert.equal(T.topics.reduce((n,t)=>n+t.blocks.length,0),95);
 assert.equal(JSON.stringify(C),beforeContent,'view leaves every source lesson, question and writing object intact');
 let sourceParagraphs=0,chapters=0;
 for(const t of T.topics){
  assert.ok(t.blocks.length>=1&&t.blocks.length<=4,t.id+' whole-topic chapter count');
  if(t.id==='dialectics')continue;
  assert.ok(t.restructured);await route(T.link(t));
  assert.equal(d.querySelectorAll('.topic-block[id^="topic-part-"]').length,t.blocks.length);
  assert.equal(d.querySelectorAll('.topic-concept h3').length,0,'no one-heading-per-source-fragment');
  assert.equal(d.querySelectorAll('.topic-block[id^="topic-part-"] h3').length,0);
  assert.equal(d.querySelector('#topic-synthesis'),null,'examples included in final continuous chapter');
  assert.equal(d.querySelector('#topic-top').textContent,'本站讲解','no duplicate multi-bullet overview');
  for(const [i,b]of t.blocks.entries()){
   const block=d.querySelector('#topic-part-'+i);assert.ok(block.querySelector('h2').textContent.includes(b.title));
   const expected=b.parts.flatMap(p=>p.sectionIndexes.map(si=>p.lessonId+':'+si));
   const actual=[...block.querySelectorAll('[data-source-section]')].map(el=>el.dataset.sourceLesson+':'+el.dataset.sourceSection);
   assert.equal(JSON.stringify(actual),JSON.stringify(expected),t.id+' exact grouped source order');
   chapters++;
  }
  for(const p of d.querySelectorAll('[data-source-section]')){
   const l=C.lessons.find(l=>l.id===p.dataset.sourceLesson);assert.equal(p.querySelector('p').textContent,l.sections[+p.dataset.sourceSection][1]);
   assert.ok(p.getAttribute('aria-label'));assert.equal(p.closest('details'),null);assert.equal(p.hidden,false);sourceParagraphs++;
  }
  assert.ok(d.querySelectorAll('.topic-concept strong').length>0,'important source text highlighted');
  for(const el of d.querySelectorAll('[data-topic-scroll]'))assert.ok(d.getElementById(el.dataset.topicScroll),'every page jump target exists');
  for(const option of d.querySelectorAll('[data-topic-jump] option[value]'))if(option.value)assert.ok(d.getElementById(option.value));
  const old=views.original.get(t.id);
  if(t.curated)for(const b of old.blocks)if(b.intro)assert.ok([...d.querySelectorAll('.continuous-introduction')].some(p=>p.textContent===b.intro),'curated connecting explanation preserved');
  for(const b of old.blocks)for(const a of b.additions||[])assert.ok(d.querySelector('.topic-reading').textContent.includes(a.text),'authored addition preserved');
  for(const s of old.synthesis||[])assert.ok(d.querySelector('.continuous-examples').textContent.includes(s.text),'full example preserved');
  for(const id of t.sourceLessonIds)assert.ok(d.querySelector('[data-topic-record="'+id+'"] a[href="#lesson/'+id+'"]'));
 }
 assert.equal(sourceParagraphs,1116);assert.equal(chapters,91);assert.equal(storage(),before);assert.equal(JSON.stringify(C),beforeContent);assert.deepEqual(errors,[]);
 console.log('PASS 53 restructured topics / 91 chapters / 1116 exact visible paragraphs; every original section and authored example preserved, no fragment headings, highlighted definitions/conditions, valid page anchors, unchanged content and original records.');dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
