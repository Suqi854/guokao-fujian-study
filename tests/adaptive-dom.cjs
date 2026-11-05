"use strict";
// Actual app DOM with synthetic records. Does not assert visual layout or real storage limits.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash,withoutRevision}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8'),scripts=[...html.matchAll(/src="\.\/([^\"]+)"/g)].map(m=>m[1]),now=Date.parse('2026-11-05T15:00:00.000Z');
const blank=()=>({schemaVersion:2,revision:0,exam:'fujian',read:[],favorites:[],notes:{},attempts:[],drafts:{},checks:{},runs:[],activeRun:null});
const pause=()=>new Promise(r=>setTimeout(r,10));
function setup(prepare){
 const errors=[],requests=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM(html,{url:'https://isolated-study.example/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
 installSerialLocks(w);w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.Date.now=()=>now;w.confirm=()=>true;
 w.fetch=(...args)=>{requests.push(args);throw Error('Unexpected outbound request');};
 for(const f of scripts.filter(f=>f!=='app.js'))w.eval(fs.readFileSync(path.join(root,'docs',f),'utf8'));
 const state=blank();if(prepare)prepare({w,d,state,C:w.STUDY_CONTENT,T:w.STUDY_TRAINING});
 const raw=JSON.stringify(state);w.localStorage.setItem('zhixu-study-v2',raw);w.eval(fs.readFileSync(path.join(root,'docs/app.js'),'utf8'));
 return {w,d,dom,errors,requests,state,raw,async route(hash){await navigateHash(w,hash,()=>{w.location.hash=hash;});await pause();},close(){assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);dom.window.close();}};
}
function finished(T,ids,day,wrong=0,id='synthetic-'+day){
 const at=now-day*86400000,r=T.newChoice({id,now:at,ids,budgetSeconds:600});
 ids.forEach((qid,i)=>{const item=r.items[i],choice=i<wrong?(item.answer+1)%4:item.answer;T.submit(r,choice,at+1000+i*2000);T.advance(r,at+2000+i*2000);});
 return r;
}
(async()=>{
 let e=setup();await e.route('#diagnostics');assert.equal(e.d.querySelector('#page-title').textContent,'薄弱点线索');assert.ok(e.d.querySelector('main').textContent.includes('未做不等于薄弱'));assert.equal(e.d.querySelectorAll('[data-diagnostic-lesson]').length,12);
 const baseline=e.d.querySelector('a[href^="#training/ids/"]');assert.ok(baseline);const baselineIds=baseline.hash.split('/').at(-1).split(',');assert.equal(new Set(baselineIds).size,baselineIds.length);assert.ok(baselineIds.length<=12);
 assert.equal(e.w.localStorage.getItem('zhixu-study-v2'),e.raw,'opening evidence does not write progress');await e.route('#diagnostics/'+encodeURIComponent('资料分析'));assert.ok([...e.d.querySelectorAll('[data-diagnostic-lesson]')].every(card=>card.textContent.includes('资料分析')));assert.equal(e.w.localStorage.getItem('zhixu-study-v2'),e.raw);e.close();
 e=setup(({state})=>{state.attempts=[{qid:'q01',choice:0,at:new Date(now-86400000).toISOString(),seconds:15}];});await e.route('#diagnostics/lesson/growth');let card=e.d.querySelector('[data-diagnostic-lesson="growth"]');assert.ok(card.textContent.includes('当前版本记录：不同题 0 道'));assert.ok(card.textContent.includes('历史版本未记录'));assert.ok(card.textContent.includes('复核历史不匹配题'));assert.ok(!card.textContent.includes('建议优先复核'));assert.equal(e.w.localStorage.getItem('zhixu-study-v2'),e.raw);for(const link of e.d.querySelectorAll('a[href^="#training/ids/"]'))for(const id of link.hash.split('/').at(-1).split(','))assert.equal(e.w.STUDY_CONTENT.questions.find(q=>q.id===id).lesson,'growth','single-lesson baseline respects the selected scope');e.close();
 e=setup(({state,C,T})=>{const ids=C.questions.filter(q=>q.lesson==='growth').slice(0,5).map(q=>q.id);state.runs=[finished(T,ids.slice(0,3),2,2,'synthetic-days-a'),finished(T,ids.slice(3),1,0,'synthetic-days-b')];state.attempts=state.runs.flatMap(r=>r.responses.map((a,i)=>({qid:r.items[i].qid,choice:a.choice,at:a.at,seconds:1})));});await e.route('#diagnostics/lesson/growth');card=e.d.querySelector('[data-diagnostic-lesson="growth"]');assert.ok(card.textContent.includes('不同题 5 道，对 3 道，错 2 道'));assert.ok(card.textContent.includes('建议优先复核'));assert.ok(card.textContent.includes('分布 2 个作答日'));assert.equal(e.d.querySelectorAll('.diagnostic-card details').length,2);assert.ok([...e.d.querySelectorAll('.diagnostic-card details')].every(x=>!x.open));assert.equal(e.w.localStorage.getItem('zhixu-study-v2'),e.raw,'derive never rewrites evidence or mirrors');e.close();
 e=setup(({state,T})=>{state.runs=[finished(T,['q01'],1,1,'synthetic-changed')];state.runs[0].items[0].signature='v1:q4:0000000000000000';});await e.route('#diagnostics/lesson/growth');card=e.d.querySelector('[data-diagnostic-lesson="growth"]');assert.ok(card.textContent.includes('不同题 0 道，对 0 道，错 0 道'));assert.ok(card.textContent.includes('版本不可比'));e.close();
 e=setup(({state,T})=>{state.activeRun=T.newChoice({id:'synthetic-pending',now:now-30000,ids:['q01'],budgetSeconds:600});});await e.route('#diagnostics/lesson/growth');card=e.d.querySelector('[data-diagnostic-lesson="growth"]');assert.ok(card.textContent.includes('不同题 0 道'));const ids=[...card.querySelectorAll('a[href^="#training/ids/"]')].flatMap(a=>a.hash.split('/').at(-1).split(','));assert.ok(!ids.includes('q01'),'pending group not recommended as fresh');e.close();
 e=setup(({state})=>{state.drafts.w01='SYNTHETIC PRIVATE DRAFT';state.notes.growth='SYNTHETIC PRIVATE NOTE';state.checks.w01=[0];});await e.route('#diagnostics');assert.ok(e.d.querySelector('main').textContent.includes('自查 1/'));assert.ok(!e.d.querySelector('main').textContent.includes('SYNTHETIC PRIVATE'));assert.ok(!e.d.querySelector('main').textContent.includes('预计得分'));assert.equal(e.w.localStorage.getItem('zhixu-study-v2'),e.raw);e.close();
 const payload='0≤r<m & <img src=x onerror=bad()> "literal" <script>bad()</script>';
 e=setup(({C})=>{C.lessons.find(l=>l.id==='growth').title=payload;});await e.route('#diagnostics/lesson/growth');card=e.d.querySelector('[data-diagnostic-lesson]');assert.ok(card.textContent.includes(payload));assert.equal(card.querySelectorAll('img,script,[onerror],m').length,0);e.close();
 e=setup();await e.route('#lesson/growth');const set=e.w.Storage.prototype.setItem;e.w.Storage.prototype.setItem=function(){throw new e.w.DOMException('synthetic quota','QuotaExceededError');};let note=e.d.querySelector('#lesson-note');note.value='synthetic unsaved note';note.dispatchEvent(new e.w.Event('input',{bubbles:true}));await pause();await pause();await e.route('#diagnostics');assert.ok(e.d.querySelector('main').textContent.includes('含尚未确认保存的记录'));assert.equal(e.w.localStorage.getItem('zhixu-study-v2'),e.raw);e.w.Storage.prototype.setItem=set;e.close();
 console.log('PASS Adaptive actual app DOM: empty/module/lesson views, legacy uncertainty, 5 distinct/2-day evidence, mirror de-duplication, changed/active exclusion, literal text and unsaved warning');
 console.log('PASS Diagnostics are read-only and never echo private draft/note content; no score prediction or network requests');
})().catch(error=>{console.error(error);process.exit(1);});
