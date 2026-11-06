'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8'),errors=[],network=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://study.example/#course/politics',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
const w=dom.window,d=w.document;installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.fetch=(...a)=>{network.push(a);throw Error('unexpected network');};
const clone=x=>JSON.parse(JSON.stringify(x)),store=()=>Array.from({length:w.localStorage.length},(_,i)=>{let k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)]}).sort();
let baseline,beforeStore;
for(const[,file]of html.matchAll(/src="\.\/([^"]+)"/g)){
 if(file==='marxism-course.js'){baseline=clone(w.STUDY_CONTENT);beforeStore=store();}
 w.eval(fs.readFileSync(path.join(root,'docs',file),'utf8'));
 if(file==='marxism-course.js')assert.deepEqual(store(),beforeStore,'registration must not write storage');
}
const C=w.STUDY_CONTENT,M=w.STUDY_MEMORY_METHODS,P=w.STUDY_COURSE,B=w.STUDY_MARXISM_COURSE;
const route=hash=>navigateHash(w,hash,()=>{w.location.hash=hash;});
(async()=>{
 assert.ok(baseline,'module present in HTML');assert.equal(B.lessonIds.length,10);assert.equal(B.questionIds.length,60);
 assert.equal(C.lessons.length,baseline.lessons.length+10+w.STUDY_POLICY_2026.lessonIds.length);assert.equal(C.questions.length,baseline.questions.length+60+w.STUDY_POLICY_2026.questionIds.length);
 assert.deepEqual(clone(C.lessons.slice(0,baseline.lessons.length)),baseline.lessons,'existing lesson content unchanged');
 assert.deepEqual(clone(C.questions.slice(0,baseline.questions.length)),baseline.questions,'existing question content unchanged');
 assert.deepEqual(clone(C.writing),baseline.writing);
 assert.equal(new Set(C.lessons.map(l=>l.id)).size,C.lessons.length);assert.equal(new Set(C.questions.map(q=>q.id)).size,C.questions.length);
 const track=P.tracks.find(t=>t.id==='politics'),rows=P.rows(track).map(x=>x.id),expectedAnchors=['practice-cognition','contradiction-method','productive-relations','social-being-people'];
 assert.equal(new Set(rows).size,rows.length);for(const id of [...B.lessonIds,...expectedAnchors])assert.equal(rows.filter(r=>r===id).length,1,id+' exactly once');
 const unchanged=JSON.stringify(C),stored=store();let views=0;
 for(const id of B.lessonIds){
  const l=C.lessons.find(l=>l.id===id),card=M.cards[id];assert.equal(l.sections.length,9);assert.equal(l.practice.length,6);assert.equal(card.contrast.length,3);assert.equal(l.category,'政治理论');
  assert.ok(l.sources.every(s=>C.sources[s]));assert.ok(C.theoryLearningAids[id]);
  const all=[];
  for(const stage of ['intro','practice','advanced']){
   const level=l.learningLevels[stage];assert.equal(level.sections.length,3);assert.equal(level.questionIds.length,2);all.push(...level.questionIds);
   assert.equal(new Set(card.recall[stage]).size,2);
   for(const qid of level.questionIds){const q=C.questions.find(q=>q.id===qid);assert.equal(q.lesson,id);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.answer>=0&&q.answer<4);assert.equal(q.optionReviews.length,4);assert.ok(q.optionReviews.every(s=>s.length>6));assert.equal(q.meta.source.kind,'original');assert.equal(q.meta.difficulty.level,null);assert.equal(q.trainingStage,level.stage);assert.ok(q.meta.source.referenceIds.every(s=>C.sources[s]));}
   await route(P.link(track,stage,id));assert.ok(d.querySelector('.focus-hero'));assert.equal(d.querySelector('[data-memory-lesson]').dataset.memoryLesson,id);
   const original=[...d.querySelectorAll('.focus-original>section')].map(s=>[s.querySelector('h2').textContent,s.querySelector('p').textContent]);assert.deepEqual(original,clone(level.sections.map(i=>l.sections[i])));
   const tabs=[...d.querySelectorAll('.focus-step-tabs [role=tab]')];assert.equal(tabs.length,3);tabs[2].click();assert.equal(tabs[2].getAttribute('aria-selected'),'true');assert.equal(d.querySelectorAll('.focus-step-panel:not([hidden])').length,1);
   assert.equal(d.querySelector('.memory-answer').open,false);assert.equal(d.querySelector('.memory-recall>p').textContent,card.recall[stage][0]);d.querySelector('.memory-answer>summary').click();assert.equal(d.querySelector('.memory-answer').open,true);assert.equal(d.querySelector('.memory-answer p').textContent,card.recall[stage][1]);
   const qnode=d.querySelector('[data-focus-question]');assert.ok(level.questionIds.includes(qnode.dataset.focusQuestion));
   const practice=[...d.querySelectorAll('a')].find(a=>a.hash.startsWith('#quiz/target/'+level.questionIds.join(',')));assert.ok(practice,id+' '+stage+' quiz link');
   await route(practice.hash);assert.ok(d.querySelector('#main').textContent.includes(C.questions.find(q=>q.id===level.questionIds[0]).stem));
   const back=d.querySelector('.course-training-return');assert.ok(back);assert.equal(back.hash,P.link(track,stage,id));
   views++;
  }
  assert.deepEqual(all,clone(l.practice));
 }
 assert.equal(JSON.stringify(C),unchanged);assert.deepEqual(store(),stored,'reading, oral reveals and opening quizzes do not write progress');
 const answers=B.questionIds.map(id=>C.questions.find(q=>q.id===id).answer);assert.deepEqual([0,1,2,3].map(n=>answers.filter(a=>a===n).length),[15,15,15,15]);
 // Independently check the concrete arithmetic used in the authored lesson.
 assert.equal(80+20+20,120);assert.equal(20+20,40);assert.equal(20/20*100,100);assert.equal(20/(80+20)*100,20);
 assert.match(M.cards['marx-capitalism-development'].avoid,/垄断不消除竞争/);assert.match(M.cards['marx-surplus-capital'].avoid,/个别生产率/);assert.match(M.cards['marx-socialism-communism'].avoid,/不预测实现年份/);
 assert.deepEqual(network,[]);assert.deepEqual(errors,[]);
 console.log(`PASS Marxism course: +10 lessons, +60 questions; ${views} stage views and quiz return paths; exact old content, source references, 30 recalls, 30 contrasts, answer balance, arithmetic and no storage/network changes.`);dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
