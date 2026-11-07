'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(root+'/docs/index.html','utf8');
const candidate='topic-recall-remaining-20261107.js';
const files=[...html.matchAll(/src="\.\/([^\"]+)"/g)].map(m=>m[1]);
// Test both the unintegrated candidate and the final index without double loading it.
if(!files.includes(candidate)){const i=files.findIndex(f=>/^topic-recall-(?:summary|all).*\.js$/.test(f));assert.ok(i>=0);files.splice(i,0,candidate);}
assert.ok(files.indexOf(candidate)>files.indexOf('topic-recall-cards.js'));
assert.ok(files.indexOf(candidate)<files.findIndex(f=>/^topic-recall-(?:summary|all).*\.js$/.test(f)));
const legacy={schemaVersion:1,exam:'fujian',read:['growth','marx-worldview'],favorites:['marx-connection'],notes:{growth:'保留原笔记'},attempts:[],drafts:{w01:'保留原草稿'},checks:{w01:[0]}};
function make(session){const errors=[],requests=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));const dom=new JSDOM(html,{url:'https://recall-remaining.synthetic.example/#course/data/topic/share-analysis',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window;installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=function(){};w.fetch=(...a)=>{requests.push(a);throw Error('Unexpected network');};w.localStorage.setItem('zhixu-study-v1',JSON.stringify(legacy));if(session)w.sessionStorage.setItem('zhixu-topic-recall-v1',session);let originalCards,originalContent;for(const f of files){if(f===candidate){originalCards=JSON.stringify(w.STUDY_TOPIC_RECALL_CARDS);originalContent=JSON.stringify(w.STUDY_CONTENT);}w.eval(fs.readFileSync(root+'/docs/'+f,'utf8'));}return{dom,w,d:w.document,errors,requests,originalCards,originalContent};}
const pause=()=>new Promise(r=>setTimeout(r,25));
const local=w=>JSON.stringify(Object.fromEntries(Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];})));
const route=(c,t)=>navigateHash(c.w,c.w.STUDY_COMPLETE_TOPICS.link(t),()=>{c.w.location.hash=c.w.STUDY_COMPLETE_TOPICS.link(t);});
(async()=>{
 const c=make(),{w,d}=c;await pause();const R=w.STUDY_TOPIC_RECALL,T=w.STUDY_COMPLETE_TOPICS.topics,old=JSON.parse(c.originalCards),ids=new Set();let groups=0,blanks=0;
 assert.equal(T.length,54);assert.deepEqual(Object.keys(R.cards).sort(),Array.from(T,t=>t.id).sort());
 assert.equal(Object.values(old).flat().reduce((n,g)=>n+g.blanks.length,0),28);
 const withoutPart=cards=>JSON.stringify(Array.from(cards,({part,...g})=>g));
 for(const id of Object.keys(old))assert.equal(withoutPart(R.cards[id]),withoutPart(old[id]),'legacy 28 blanks and card text unchanged (reader may remap part anchors)');
 const before=local(w);assert.equal(w.sessionStorage.length,0,'reading does not create session records');
 for(const t of T){const cards=R.cards[t.id],count=cards.reduce((n,g)=>n+g.blanks.length,0);if(!old[t.id]){assert.ok(cards.length>=3&&cards.length<=5,t.id+' 3–5 groups');assert.ok(count>=4&&count<=8,t.id+' 4–8 blanks');}
  for(const g of cards){groups++;assert.ok(!ids.has(g.id),'globally unique group ID '+g.id);ids.add(g.id);assert.ok(g.title&&g.core&&g.boundary&&g.prompt);assert.ok(t.blocks[g.part]);assert.match(g.core,/\*\*[^*]+\*\*/);
   const placeholders=[...g.prompt.matchAll(/\{\{(\d+)\}\}/g)].map(m=>+m[1]);assert.deepEqual(placeholders,Array.from(g.blanks,(_,i)=>i),'ordered unique placeholders '+g.id);
   if(!old[t.id]){assert.equal(g.editorial,true);assert.ok(g.sources.length);for(const s of g.sources){assert.ok(t.sourceLessonIds.includes(s.lessonId));const l=w.STUDY_CONTENT.lessons.find(l=>l.id===s.lessonId);assert.ok(l.sections[s.sectionIndex]);assert.equal(s.sectionTitle,l.sections[s.sectionIndex][0]);}}
   for(const b of g.blanks){blanks++;assert.ok(typeof b.answer==='string'&&b.answer.trim());assert.equal(R.judge(b.answer,b).status,'correct');for(const a of b.accept||[])assert.equal(R.judge(a,b).status,'correct');for(const trap of b.traps||[])for(const a of trap.answers)assert.equal(R.judge(a,b).status,'wrong');assert.equal(R.judge('   ',b).status,'empty');assert.notEqual(R.judge('不是'+b.answer,b).status,'correct');assert.notEqual(R.judge(b.answer+'不对',b).status,'correct');assert.equal(R.judge('尚未识别的表达XYZ',b).status,'review');}
  }
  await route(c,t);assert.equal(d.querySelectorAll('.recall-card').length,1,t.id+' exactly one whole-topic card');assert.equal(d.querySelectorAll('.recall-topic-points>li').length,cards.length);assert.equal(d.querySelectorAll('.recall-topic-points .recall-card').length,0);assert.ok(d.querySelector('.recall-core strong'));
  d.querySelector('[data-recall-action="quiz"]').click();assert.equal(d.querySelectorAll('.recall-card').length,0);assert.equal(d.querySelectorAll('.recall-answer-list').length,0);assert.equal(d.querySelectorAll('[data-recall-blank]').length,count);for(const g of cards)g.blanks.forEach((b,i)=>{const el=d.querySelector('[data-recall-blank="'+g.id+':'+i+'"]');el.value=b.answer;el.dispatchEvent(new w.Event('input',{bubbles:true}));});d.querySelector('[data-recall-form]').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));assert.equal(d.querySelectorAll('.recall-correct').length,count,t.id+' correct all blanks');
 }
 assert.equal(JSON.stringify(w.STUDY_CONTENT),c.originalContent,'no source lesson changes');assert.equal(local(w),before,'legacy records byte-identical');assert.deepEqual(c.errors,[]);assert.deepEqual(c.requests,[]);
 const raw=w.sessionStorage.getItem(R.storageKey);console.log('Saved full-topic recall session: '+raw.length+' characters.');
 const reAll=make(raw);await pause();for(const t of T){await route(reAll,t);assert.equal(reAll.d.querySelectorAll('.recall-correct').length,R.cards[t.id].reduce((n,g)=>n+g.blanks.length,0),'restore '+t.id);}assert.deepEqual(reAll.errors,[]);reAll.dom.window.close();
 // Capacity includes user expressions at the supported 100-character limit, not only short standards.
 const full=JSON.parse(raw);for(const state of Object.values(full.topics))for(const key of Object.keys(state.values))state.values[key]='待核对'.repeat(33)+'甲';
 const fullRaw=JSON.stringify(full);assert.ok(fullRaw.length>16000,'exercise old-cap overflow');const maxed=make(fullRaw);await pause();for(const t of T){await route(maxed,t);const inputs=[...maxed.d.querySelectorAll('[data-recall-blank]')];assert.equal(inputs.length,R.cards[t.id].reduce((n,g)=>n+g.blanks.length,0));for(const input of inputs)assert.equal(input.value.length,100,'100-character answer restored '+t.id);}assert.deepEqual(maxed.errors,[]);maxed.dom.window.close();console.log('Maximum-length full-topic session restored: '+fullRaw.length+' characters.');
 // Seed original 2-topic sessions remain accepted after adding 52 topics.
 const seed=JSON.stringify({version:R.version,topics:{dialectics:{mode:'quiz',values:{'d-map:0':'联系和发展'},submitted:true,revealed:false}}});const re=make(seed);await pause();await route(re,T.find(t=>t.id==='dialectics'));assert.equal(re.d.querySelector('[data-recall-blank="d-map:0"]').value,'联系和发展');assert.equal(re.d.querySelectorAll('.recall-correct').length,1);assert.equal(re.w.localStorage.getItem('zhixu-study-v1'),JSON.stringify(legacy));re.dom.window.close();c.dom.window.close();console.log(`PASS 54 complete summary cards, ${groups} groups, ${blanks} blanks; sources, aliases, negations, unknowns, 54 DOM submissions, legacy records and seeded sessions.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
