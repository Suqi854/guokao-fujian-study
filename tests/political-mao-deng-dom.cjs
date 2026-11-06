'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const {JSDOM,VirtualConsole}=require(path.join(base,'node_modules/jsdom'));
const {installSerialLocks,navigateHash}=require(path.join(base,'tests/progress-dom-support.cjs'));
const code=fs.readFileSync(path.join(__dirname,'../docs/political-mao-deng-expansion.js'),'utf8');
const html=fs.readFileSync(path.join(base,'docs/index.html'),'utf8');const errors=[],requests=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://study.example/#course',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.fetch=(...x)=>{requests.push(x);throw Error('unexpected network');};
const snapshot=()=>Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];}).sort();
for(const[,file]of html.matchAll(/src="\.\/([^"]+)"/g)){
 if(file==='political-mao-deng-expansion.js'||file==='political-complete-integration.js')continue;
 w.eval(fs.readFileSync(path.join(base,'docs',file),'utf8'));
 if(file==='memory-methods.js'){const old=snapshot();w.eval(code);assert.deepEqual(snapshot(),old);}
 if(file==='learning-course-focus.js'){
  // Test-only integration. Production ordering and theoryTrack are owned by the parent.
  w.STUDY_COURSE.tracks.find(t=>t.id==='politics').units.splice(2,0,...w.STUDY_MAO_DENG_EXPANSION.courseUnits);
 }
}
const route=h=>navigateHash(w,h,()=>{w.location.hash=h;});
(async()=>{const old=snapshot();let views=0;
for(const id of w.STUDY_MAO_DENG_EXPANSION.lessonIds)for(const stage of ['intro','practice','advanced']){
 await route('#course/politics/'+stage+'/'+id);assert.equal(d.querySelector('[data-course-reader]')?.dataset.courseReader,id);
 const card=d.querySelector('[data-memory-lesson]');assert.equal(card?.dataset.memoryLesson,id);assert.equal(card.querySelector('.memory-answer').open,false);
 card.querySelector('.memory-answer>summary').click();assert.equal(card.querySelector('.memory-answer').open,true);
 const l=w.STUDY_CONTENT.lessons.find(l=>l.id===id);assert.ok(d.querySelector('main').textContent.includes(l.learningLevels[stage].goal));
 const quiz=[...d.querySelectorAll('a')].find(a=>a.hash.startsWith('#quiz/one/'+l.learningLevels[stage].questionIds[0]));assert.ok(quiz,'quiz link '+id+'/'+stage);assert.ok(quiz.hash.includes('/course/politics/'+stage+'/'+id));views++;
}
assert.deepEqual(snapshot(),old,'reading and recall disclosure must not create progress');
await route('#lesson/three-represents-theory/intro');const aid=d.querySelector('[data-theory-aids="three-represents-theory"]');assert.ok(aid);assert.equal(aid.querySelectorAll('.theory-contrast').length,2);assert.equal(aid.querySelectorAll('.theory-recall-item').length,3);
await route('#quiz/one/md39-43/course/politics/intro/scientific-development-theory');assert.ok(d.querySelector('main').textContent.includes('科学发展观'));assert.ok(d.querySelector('.course-training-return'));
assert.deepEqual(requests,[]);assert.deepEqual(errors,[]);console.log('PASS DOM: '+views+' new course-stage views, hidden/revealed recall, lesson aids, practice links/context return, no reading writes or outgoing requests.');console.log('NOT TESTED: real-browser pixels, mobile touch or production deployment.');dom.window.close();})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
