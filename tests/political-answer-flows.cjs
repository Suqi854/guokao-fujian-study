'use strict';
// Actual app handlers with isolated synthetic state, never the user's browser storage.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(root+'/docs/index.html','utf8'),errors=[],requests=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://synthetic-politics.example/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.fetch=(...a)=>{requests.push(a);throw Error('unexpected network');};
let now=Date.parse('2026-11-06T01:00:00Z');w.Date.now=()=>now;w.setInterval=()=>1;
const old={schemaVersion:1,exam:'fujian',read:['growth'],favorites:['growth'],notes:{growth:'保留合成笔记'},attempts:[{qid:'q01',choice:0,at:'2026-11-05T01:00:00Z',seconds:7}],drafts:{w01:'保留合成草稿'},checks:{w01:[0]}};const legacy=JSON.stringify(old);w.localStorage.setItem('zhixu-study-v1',legacy);
for(const[,f]of html.matchAll(/src="\.\/([^"]+)"/g))w.eval(fs.readFileSync(root+'/docs/'+f,'utf8'));
const C=w.STUDY_CONTENT,plain=x=>JSON.parse(JSON.stringify(x)),pause=()=>new Promise(r=>setTimeout(r,8));
(async()=>{
 const ids=w.STUDY_POLITICAL_CURRICULUM.newQuestionIds;assert.equal(ids.length,108);
 for(const [i,id]of ids.entries()){
  const q=C.questions.find(q=>q.id===id),lesson=C.lessons.find(l=>l.id===q.lesson),stage=Object.keys(lesson.learningLevels).find(k=>lesson.learningLevels[k].questionIds.includes(id)),back='#course/politics/'+stage+'/'+q.lesson;
  await navigateHash(w,'#quiz/one/'+id+'/course/politics/'+stage+'/'+q.lesson,()=>{w.location.hash='#quiz/one/'+id+'/course/politics/'+stage+'/'+q.lesson;});
  assert.equal(d.querySelector('.quiz-card h1').textContent,q.stem);assert.deepEqual([...d.querySelectorAll('.option>span:last-child')].map(e=>e.textContent),plain(q.options));assert.equal(d.querySelector('.course-training-return').hash,back);
  now+=1200;const choice=i%3===0?(q.answer+1)%4:q.answer;d.querySelector('[data-action="choose"][data-id="'+choice+'"]').click();await pause();
  const submit=d.querySelector('[data-action="submit"]');submit.click();submit.click();
  for(let n=0;n<100&&!d.querySelector('.quiz-actions').textContent.includes('提交已保存到本机');n++)await pause();
  assert.ok(d.querySelector('.quiz-actions').textContent.includes('提交已保存到本机'),id+' '+d.querySelector('.quiz-actions').textContent+' '+d.querySelector('main').textContent.slice(-500));assert.equal(d.querySelector('.feedback>p').textContent,q.explanation);assert.equal(d.querySelector('.feedback').classList.contains('wrong'),choice!==q.answer);assert.equal(d.querySelectorAll('.option-review li').length,4);
  q.optionReviews.forEach((s,n)=>assert.ok(d.querySelectorAll('.option-review li')[n].textContent.endsWith(s)));
  const saved=JSON.parse(w.localStorage.getItem('zhixu-study-v2'));assert.equal(saved.attempts.length,i+2,'one record per double-click');assert.equal(saved.attempts.at(-1).qid,id);assert.equal(saved.attempts.at(-1).choice,choice);
 }
 const saved=JSON.parse(w.localStorage.getItem('zhixu-study-v2'));assert.equal(saved.attempts.length,109);assert.deepEqual(saved.attempts[0],old.attempts[0]);for(const k of ['notes','drafts','checks','favorites','read'])assert.deepEqual(saved[k],old[k]);assert.equal(w.localStorage.getItem('zhixu-study-v1'),legacy);assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
 console.log('PASS all 108 new question flows: exact text/options, mixed correct/wrong feedback, all 432 option explanations, double-submit de-duplication, course returns, preserved legacy records and no requests. Synthetic DOM, not touch.');dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
