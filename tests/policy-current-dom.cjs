'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..')),html=fs.readFileSync(root+'/docs/index.html','utf8'),errors=[],requests=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://policy-synthetic.example/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.fetch=(...a)=>{requests.push(a);throw Error('unexpected request');};
let now=Date.parse('2026-11-06T01:00:00Z');w.Date.now=()=>now;w.setInterval=()=>1;
const old={schemaVersion:1,exam:'fujian',read:['growth'],favorites:['growth'],notes:{growth:'保留合成笔记'},attempts:[{qid:'q01',choice:0,at:'2026-11-05T01:00:00Z',seconds:7}],drafts:{w01:'保留合成草稿'},checks:{w01:[0]}};const legacy=JSON.stringify(old);w.localStorage.setItem('zhixu-study-v1',legacy);
for(const[,f]of html.matchAll(/src="\.\/([^"]+)"/g))w.eval(fs.readFileSync(root+'/docs/'+f,'utf8'));
const C=w.STUDY_CONTENT,B=w.STUDY_POLICY_2026,plain=x=>JSON.parse(JSON.stringify(x)),pause=()=>new Promise(r=>setTimeout(r,8)),route=h=>navigateHash(w,h,()=>{w.location.hash=h;});
const store=()=>Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];}).sort();
(async()=>{
 const before=store();let views=0;
 for(const id of B.lessonIds){const l=C.lessons.find(l=>l.id===id),track=l.category==='福建专题'?'fujian':'politics';for(const stage of ['intro','practice','advanced']){
  await route('#course/'+track+'/'+stage+'/'+id);assert.equal(d.querySelector('[data-course-reader]')?.dataset.courseReader,id);
  assert.equal(d.querySelector('[data-memory-lesson]')?.dataset.memoryLesson,id);const lev=l.learningLevels[stage];
  assert.deepEqual([...d.querySelectorAll('.focus-original>section')].map(s=>[s.querySelector('h2').textContent,s.querySelector('p').textContent]),plain(lev.sections.map(i=>l.sections[i])));
  const tabs=[...d.querySelectorAll('.focus-step-tabs [role=tab]')];assert.equal(tabs.length,3);tabs[2].click();assert.equal(tabs[2].getAttribute('aria-selected'),'true');assert.equal(d.querySelectorAll('.focus-step-panel:not([hidden])').length,1);
  assert.equal(d.querySelector('.memory-answer').open,false);d.querySelector('.memory-answer>summary').click();assert.equal(d.querySelector('.memory-answer').open,true);assert.equal(d.querySelector('.memory-answer p').textContent,w.STUDY_MEMORY_METHODS.cards[id].recall[stage][1]);
  const quiz=[...d.querySelectorAll('a')].find(a=>a.hash.startsWith('#quiz/target/'+lev.questionIds.join(',')));assert.ok(quiz,id+'/'+stage+' target practice');await route(quiz.hash);assert.equal(d.querySelector('.course-training-return').hash,'#course/'+track+'/'+stage+'/'+id);views++;
 }}
 assert.deepEqual(store(),before,'reading/revealing/opening practice must not record completion');
 for(const [i,id]of B.questionIds.entries()){
  const q=C.questions.find(q=>q.id===id),l=C.lessons.find(l=>l.id===q.lesson),stage=Object.keys(l.learningLevels).find(k=>l.learningLevels[k].questionIds.includes(id)),track=l.category==='福建专题'?'fujian':'politics',back='#course/'+track+'/'+stage+'/'+q.lesson;
  await route('#quiz/one/'+id+'/course/'+track+'/'+stage+'/'+q.lesson);assert.equal(d.querySelector('.quiz-card h1').textContent,q.stem);assert.deepEqual([...d.querySelectorAll('.option>span:last-child')].map(e=>e.textContent),plain(q.options));assert.equal(d.querySelector('.course-training-return').hash,back);
  now+=1200;const choice=i%3===0?(q.answer+1)%4:q.answer;d.querySelector('[data-action="choose"][data-id="'+choice+'"]').click();await pause();const submit=d.querySelector('[data-action="submit"]');submit.click();submit.click();
  for(let n=0;n<100&&!d.querySelector('.quiz-actions').textContent.includes('提交已保存到本机');n++)await pause();
  assert.ok(d.querySelector('.quiz-actions').textContent.includes('提交已保存到本机'),id);assert.equal(d.querySelector('.feedback>p').textContent,q.explanation);assert.equal(d.querySelector('.feedback').classList.contains('wrong'),choice!==q.answer);assert.equal(d.querySelectorAll('.option-review li').length,4);q.optionReviews.forEach((s,n)=>assert.ok(d.querySelectorAll('.option-review li')[n].textContent.endsWith(s)));
  const saved=JSON.parse(w.localStorage.getItem('zhixu-study-v2'));assert.equal(saved.attempts.length,i+2);assert.equal(saved.attempts.at(-1).qid,id);assert.equal(saved.attempts.at(-1).choice,choice);
 }
 const saved=JSON.parse(w.localStorage.getItem('zhixu-study-v2'));assert.equal(saved.attempts.length,25);assert.deepEqual(saved.attempts[0],old.attempts[0]);for(const k of ['notes','drafts','checks','favorites','read'])assert.deepEqual(saved[k],old[k]);assert.equal(w.localStorage.getItem('zhixu-study-v1'),legacy);
 await route('#sources');for(const id of B.newSourceIds)assert.ok([...d.querySelectorAll('a')].some(a=>a.href===C.sources[id].url),'source rendered '+id);
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);console.log('PASS policy DOM: '+views+' course-level views, exact text, collapsed recalls, 24 answer flows, 96 option explanations, mixed right/wrong, repeated-submit de-duplication, return context, legacy records and source links. Synthetic DOM, not touch.');dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
