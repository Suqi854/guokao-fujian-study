'use strict';
const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(root+'/docs/index.html','utf8');
const file='knowledge-integration-20261108.js';
const files=[...html.matchAll(/src="\.\/([^\"]+)"/g)].map(m=>m[1]);
if(!files.includes(file))files.splice(files.indexOf('app-studio-20261112.js'),0,file);
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://integration.synthetic.example/#course',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};
w.fetch=()=>{throw Error('Unexpected fetch');};
w.sessionStorage.setItem('zhixu-topic-recall-v1',JSON.stringify({version:'20261107.1',topics:{estimation:{mode:'cards',values:{'ki-d-001:0':'49'},submitted:false,revealed:false}}}));
let originalQ,originalWriting,originalSections,originalLevels;
for(const f of files){if(f===file){originalQ=w.STUDY_CONTENT.questions.map(q=>JSON.stringify(q));originalWriting=JSON.stringify(w.STUDY_CONTENT.writing);originalSections=w.STUDY_CONTENT.lessons.map(l=>[l.id,JSON.stringify(l.sections)]);originalLevels=w.STUDY_CONTENT.lessons.map(l=>[l.id,JSON.stringify(l.learningLevels)]);}w.eval(fs.readFileSync(root+'/docs/'+f,'utf8'));}
const route=h=>navigateHash(w,h,()=>{w.location.hash=h;});
(async()=>{
 const K=w.STUDY_KNOWLEDGE_INTEGRATION,C=w.STUDY_CONTENT;
 assert.equal(K.sections.length,289);assert.equal(K.questionIds.length,277);assert.equal(K.cardIds.length,281);
 assert.equal(C.questions.length,1162);assert.equal(new Set(C.questions.map(q=>q.id)).size,1162);
 assert.deepEqual(C.questions.slice(0,885).map(q=>JSON.stringify(q)),originalQ);
 assert.ok(Array.isArray(C.writing)&&C.writing.length===87,'non-vacuous writing coverage');assert.equal(JSON.stringify(C.writing),originalWriting);
 for(const l of C.lessons)for(const [level,group]of Object.entries(l.learningLevels||{}))for(const i of group.sections||[])assert.ok(Number.isInteger(i)&&l.sections[i],l.id+'/'+level+' valid section '+i);
 const touched=new Set(K.sections.map(s=>s.lessonId));for(const[id,text]of originalLevels)if(!touched.has(id))assert.equal(JSON.stringify(C.lessons.find(l=>l.id===id).learningLevels),text,'untouched learning path '+id);
 for(const[id,text]of originalSections){const old=JSON.parse(text),now=C.lessons.find(l=>l.id===id).sections;assert.equal(JSON.stringify(now.slice(0,old.length)),text);}
 for(const id of K.questionIds){const q=C.questions.find(q=>q.id===id);assert.equal(q.options.length,4);assert.equal(q.optionReviews.length,4);assert.ok(q.answer>=0&&q.answer<4);assert.ok(q.explanation.length>8);assert.equal(q.meta.source.kind,'original');}
 const topics=[...new Set(K.sections.map(x=>x.topicId))];assert.equal(topics.length,19);
 for(const id of topics){const t=w.STUDY_COMPLETE_TOPICS.topics.find(t=>t.id===id);await route(w.STUDY_COMPLETE_TOPICS.link(t));
 assert.equal(d.querySelectorAll('.recall-topic-card').length,1,'one summary card per topic');
 const more=d.querySelector('[data-knowledge-recall-more]');assert.ok(more,'supplementary recall is expandable');assert.equal(more.open,false);assert.ok(more.querySelectorAll('li').length>0);
 for(const a of K.sections.filter(x=>x.topicId===id)){const node=d.getElementById(a.id);assert.ok(node,id+' anchor '+a.id);const lesson=C.lessons.find(l=>l.id===a.lessonId);assert.equal(node.querySelector('p').textContent,lesson.sections[a.sectionIndex][1]);assert.ok(node.querySelector('.knowledge-practice-link a'));}
 assert.ok(d.querySelectorAll('[data-source-section]').length>=K.sections.filter(x=>x.topicId===id).length);
 }
 await route('#course/data/topic/estimation');
 d.querySelector('[data-recall-action=quiz]').click();await new Promise(r=>setTimeout(r,0));assert.ok(d.querySelector('[data-recall-blank]'));assert.equal(d.querySelector('[data-recall-blank="ki-d-001:0"]').value,'49','newly registered blank restored from saved session');
 d.querySelector('[data-recall-action=reset]').click();d.querySelector('[data-recall-action=reset-confirm]').click();assert.equal(d.querySelector('[data-recall-blank="ki-d-001:0"]').value,'','reset does not resurrect hydrated value');
 d.querySelector('[data-recall-action=cards]').click();await new Promise(r=>setTimeout(r,0));assert.equal(d.querySelectorAll('.recall-topic-card').length,1);assert.ok(d.querySelector('[data-knowledge-recall-more]'));
 assert.deepEqual(errors,[]);console.log('PASS: 151 source items integrated, 289 added sections / 277 original questions / 281 recall elements in 19 topics; 885 old questions and old lesson sections intact; 19 complete-topic DOM renders and all new anchors valid.');
 dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
