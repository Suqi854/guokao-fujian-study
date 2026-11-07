'use strict';
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(root+'/docs/index.html','utf8'),errors=[],requests=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
const dom=new JSDOM(html,{url:'https://topics.synthetic.example/#course',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){this.dataset.scrolled='yes';};w.fetch=(...a)=>{requests.push(a);throw Error('Unexpected network');};
const legacy={schemaVersion:1,exam:'fujian',read:['growth','marx-connection'],favorites:['marx-connection'],notes:{'marx-connection':'原笔记 <script>不能执行</script>',growth:'基期笔记'},attempts:[],drafts:{w01:'原草稿'},checks:{w01:[0]}};
w.localStorage.setItem('zhixu-study-v1',JSON.stringify(legacy));
let beforeContent;
for(const[,f]of html.matchAll(/src="\.\/([^\"]+)"/g)){if(f==='complete-topics.js')beforeContent=JSON.stringify(w.STUDY_CONTENT);w.eval(fs.readFileSync(root+'/docs/'+f,'utf8'));if(f==='complete-topics.js')assert.equal(JSON.stringify(w.STUDY_CONTENT),beforeContent,'view does not mutate content');}
const C=w.STUDY_CONTENT,T=w.STUDY_COMPLETE_TOPICS,P=w.STUDY_COURSE,plain=x=>JSON.parse(JSON.stringify(x));
const route=h=>navigateHash(w,h,()=>{w.location.hash=h;}),pause=()=>new Promise(r=>setTimeout(r,20));
const store=()=>JSON.stringify(Object.fromEntries(Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];})));
(async()=>{
 const before=store();let sections=0;
 assert.equal(d.querySelector('[data-topic-directory]').dataset.topicDirectory,'data');
 const all=T.topics.flatMap(t=>t.sourceLessonIds);assert.equal(all.length,127);assert.equal(new Set(all).size,127);assert.deepEqual(plain(all).sort(),plain(C.lessons.map(l=>l.id)).sort());
 for(const track of P.tracks){await route('#course/'+track.id);assert.equal(d.querySelectorAll('.topic-cards li').length,T.topics.filter(t=>t.track===track.id).length);assert.equal(d.querySelector('[aria-label="选择学习轮次"]'),null);}
 for(const t of T.topics){
  await route(T.link(t));assert.equal(d.querySelector('h1').textContent,t.title);assert.equal(d.querySelector('.focus-step-tabs'),null);assert.equal(d.querySelector('.focus-original'),null);
  const seen=[];for(const s of d.querySelectorAll('[data-source-section]')){const id=s.dataset.sourceLesson,i=+s.dataset.sourceSection,l=C.lessons.find(l=>l.id===id);assert.equal(s.querySelector('p').textContent,l.sections[i][1]);assert.equal(s.closest('details'),null,'core knowledge never hidden');assert.ok(!s.hidden);seen.push(id+':'+i);sections++;}
  assert.deepEqual(seen.sort(),plain(t.sourceLessonIds.flatMap(id=>C.lessons.find(l=>l.id===id).sections.map((_,i)=>id+':'+i))).sort());
  const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(ids.length,new Set(ids).size,'No duplicate DOM id '+t.id);
  for(const a of d.querySelectorAll('.topic-practice-list a')){const p=a.hash.slice(1).split('/');assert.ok(P.trainingReturn(p).includes(T.link(t)));if(p[0]==='write')assert.ok(C.writing.some(x=>x.id===p[1]&&t.sourceLessonIds.includes(x.lesson)));}
  for(const id of t.sourceLessonIds){const card=w.STUDY_MEMORY_METHODS.cards[id];if(card){const root=d.querySelector('[data-memory-lesson=\"'+id+'\"]');assert.ok(root,id+' memory card');for(const r of Object.values(card.recall))for(const text of r)assert.ok(root.textContent.includes(text),id+' all recall preserved');}}
  const allTasks=C.writing.filter(x=>t.sourceLessonIds.includes(x.lesson));assert.equal(d.querySelectorAll('.topic-practice-list a[href^="#write/"]').length,allTasks.length);
  const jump=d.querySelector('[data-topic-jump]');jump.value='topic-part-1';jump.dispatchEvent(new w.Event('change',{bubbles:true}));if(t.blocks[1]){assert.equal(d.querySelector('#topic-part-1').dataset.scrolled,'yes');assert.equal(jump.value,'','jump resets so same section can be selected again');d.querySelector('[data-topic-top]').click();delete d.querySelector('#topic-part-1').dataset.scrolled;jump.value='topic-part-1';jump.dispatchEvent(new w.Event('change',{bubbles:true}));assert.equal(d.querySelector('#topic-part-1').dataset.scrolled,'yes','repeat same selection jumps');assert.equal(jump.value,'');}
 }
 assert.equal(store(),before,'navigation, revealing and anchors do not write');
 for(const t of T.topics){const count=t.sourceLessonIds.reduce((n,id)=>n+C.lessons.find(l=>l.id===id).practice.length,0);if(!count)continue;await route('#quiz/topic/'+t.id+'/course/'+t.track+'/topic/'+t.id);assert.ok(d.querySelector('.quiz-header').textContent.includes('1 / '+count+' 题'),t.id+' complete question count');}

 await route('#course/politics/topic/dialectics');
 assert.equal(d.querySelector('[data-note="marx-connection"]').value,legacy.notes['marx-connection']);assert.equal(d.querySelector('.complete-topic script'),null);
 assert.equal(d.querySelectorAll('.topic-addition').length,6);assert.ok(d.querySelector('#topic-part-3').textContent.includes('外因通过内因起作用'));
 const note=d.querySelector('[data-note="contradiction-method"]');note.value='专题笔记 & 条件';note.dispatchEvent(new w.Event('input',{bubbles:true}));await pause();
 d.querySelector('[data-action="read-topic"]').click();await pause();
 const saved=JSON.parse(w.localStorage.getItem('zhixu-study-v2'));assert.deepEqual(saved.read.sort(),['growth','marx-connection','contradiction-method','marx-quantity-negation','marx-categories'].sort());assert.equal(saved.notes['contradiction-method'],'专题笔记 & 条件');assert.deepEqual(saved.drafts,legacy.drafts);assert.deepEqual(saved.favorites,legacy.favorites);assert.equal(w.localStorage.getItem('zhixu-study-v1'),JSON.stringify(legacy));assert.ok(d.querySelector('[data-action="read-topic"]').disabled);
 const q=d.querySelector('.topic-practice-row[href^="#quiz/"]').hash;await route(q);assert.equal(d.querySelector('.course-training-return').hash,'#course/politics/topic/dialectics');assert.ok(d.querySelector('.quiz-card'));await route(d.querySelector('.course-training-return').hash);
 await route('#course/writing/topic/summary-topic');const task=d.querySelector('.topic-practice-row[href^="#write/"]').hash;await route(task);assert.ok(d.querySelector('#draft'));assert.equal(d.querySelector('.course-training-return').hash,'#course/writing/topic/summary-topic');
 await route('#course/reasoning/topic/plane-figures');let b=d.querySelector('[data-topic-lesson="rotation"] [data-action="rotate-demo"]');b.click();await pause();assert.match(d.querySelector('[data-topic-lesson="rotation"] .diagram-caption').textContent,/已转 1 步/);assert.ok(d.querySelector('[data-topic-lesson="overlay"]'),'other diagram remains');
 await route('#home');assert.ok(d.querySelector('.focus-bottom a').hash.includes('/topic/'));
 for(const bad of ['#course/data/topic/nope','#course/politics/topic/growth-analysis','#course/data/topic/growth-analysis/extra']){await route(bad);assert.match(d.querySelector('h1').textContent,/没有找到/);}
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);console.log(`PASS ${T.topics.length} full topics / 127 unique source lessons / ${sections} exact visible sections, 3 curated maps, all writing tasks, navigation, unique IDs, legacy notes/read/drafts, batch read, practice return, diagrams and no automatic records/network.`);dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
