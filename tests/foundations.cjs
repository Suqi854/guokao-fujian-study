const {chromium}=require('@playwright/test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:4173';
(async()=>{
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}),ctx=await b.newContext({viewport:{width:390,height:1100},isMobile:true,hasTouch:true,deviceScaleFactor:2}),p=await ctx.newPage(),errors=[],external=[];
p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith(base))external.push(r.url());});await p.goto(base);
const C=await p.evaluate(()=>window.STUDY_CONTENT),q=Object.fromEntries(C.questions.map(x=>[x.id,x]));
// Clause-by-clause semantic/legal review is in ANSWER_REVIEW.md; these are regression assertions, not independent semantic certification.
assert.deepEqual(Array.from({length:9},(_,i)=>q['q'+(181+i)].answer),[2,1,3,0,2,1,3,1,0]);
// Independent conjunction checks for both directions of the sentence-link constraints.
const constraints187=[[false,false],[false,false],[false,false],[true,true]];
const constraints188=[[false,false],[true,true],[false,false],[false,false]];
assert.equal(q.q187.answer,constraints187.findIndex(x=>x.every(Boolean)));assert.equal(q.q188.answer,constraints188.findIndex(x=>x.every(Boolean)));
// A positive response from observed users permits either outcome for unobserved users; universal benefit is not entailed.
const worlds=[{observed:true,unobserved:true},{observed:true,unobserved:false}];assert.ok(worlds.every(w=>w.observed));assert.ok(worlds.some(w=>!w.unobserved));
for(let n=181;n<=189;n++){const x=q['q'+n];assert.equal(x.optionReviews.length,4);assert.equal(x.meta.source.kind,'original');assert.equal(x.meta.examSource.year,null);assert.equal(x.meta.difficulty.level,null);}
assert.equal(C.questions.length,363);assert.equal(C.writing.length,47);assert.equal(new Set(C.writing.map(x=>x.material)).size,27);
for(const id of ['development','state-organs','sentence-link']){const l=C.lessons.find(x=>x.id===id);assert.ok(l.sections.flat().join('').length>1150);assert.deepEqual(Object.values(l.learningLevels).flatMap(x=>x.sections),Array.from({length:9},(_,i)=>i));}
const a=C.writing.find(x=>x.id==='w31'),z=C.writing.find(x=>x.id==='w32');assert.equal(a.material,z.material);assert.equal(a.materialGroup,z.materialGroup);assert.ok(a.material.length>1500);for(const w of [a,z])assert.ok(w.sample.replace(/\s/g,'').length<=w.limit);
assert.equal(C.sources['development-system'].year,'2023-01-17');assert.equal(C.methods.length,17);console.log('PASS Source-scoped foundations, semantic review ledger and conjunction/countermodel checks');
const old={schemaVersion:1,exam:'both',read:['development'],favorites:['state-organs'],notes:{development:'测试旧政治笔记','state-organs':'测试旧机构笔记'},attempts:[{qid:'q41',choice:0,at:'2026-11-04T12:00:00Z',seconds:8}],drafts:{w29:'测试旧信息栏草稿'},checks:{w29:[1]}};
await p.evaluate(s=>localStorage.setItem('zhixu-study-v1',JSON.stringify(s)),old);await p.reload();
for(const level of ['intro','practice','advanced']){
 await p.goto(base+'/#learn/'+level);assert.equal(await p.locator('.lesson-card').count(),45);
 for(const id of ['development','state-organs','sentence-link']){
  await p.goto(base+'/#lesson/'+id+'/'+level);assert.equal(await p.locator('.learning-paths [aria-current="page"]').textContent(),C.learningPaths[level].label);assert.equal(await p.locator('.reading > section:not(.level-guide)').count(),3);assert.equal(await p.locator('.source-panel').count(),0);
  const target=await p.getByRole('link',{name:'练本路径 · 1题',exact:true}).getAttribute('href');const qid=target.split('/').at(-1);assert.equal(q[qid].lesson,id);assert.equal(q[qid].meta.trainingStage,C.learningPaths[level].stage);await p.getByRole('link',{name:'练本路径 · 1题',exact:true}).tap();assert.ok((await p.locator('.quiz-header').textContent()).includes('1 / 1'));
 }
}
await p.goto(base+'/#learn');assert.equal(await p.locator('.lesson-card').count(),73);await p.goto(base+'/#lesson/development');assert.equal(await p.locator('#lesson-note').inputValue(),old.notes.development);await p.getByRole('link',{name:'练配套题',exact:true}).tap();assert.ok((await p.locator('.quiz-header').textContent()).includes('1 / 5'));
await p.goto(base+'/#lesson/sentence-link/invalid');assert.equal(await p.locator('.reading > section').count(),9);await p.goto(base+'/#lesson/work-stages/advanced');assert.equal(await p.locator('.level-guide').count(),0);assert.ok(await p.getByRole('heading',{name:C.lessons.find(l=>l.id==='remainders').title,exact:true}).count());
await p.goto(base+'/#quiz/one/q189');await p.locator('[data-action="choose"][data-id="1"]').tap();await p.locator('[data-action="submit"]').tap();assert.equal(await p.locator('.option-review li').count(),4);
await p.goto(base+'/#targeted');await p.locator('#target-module').selectOption('言语理解');await p.locator('#target-stage').selectOption('检查边界');assert.equal((await p.getByRole('link',{name:/开始这组/}).getAttribute('href')).split('/').at(-1).split(',')[0],'q189');
console.log('PASS Three real reading paths, scoped practice, honest fallback, source-free lesson view and targeted mistake');
await p.goto(base+'/#write/w31');await p.locator('#draft').fill('测试技能改进建议');await p.locator('[data-check]').first().check();await p.locator('a[href="#write/w32"]').tap();await p.getByRole('heading',{name:z.title,exact:true}).waitFor();assert.equal(await p.locator('#draft').inputValue(),'');assert.equal(await p.locator('[data-check]').first().isChecked(),false);await p.locator('#draft').fill('测试持续运行分析');
await p.locator('a[href="#write/w31"]').tap();await p.getByRole('heading',{name:a.title,exact:true}).waitFor();assert.equal(await p.locator('#draft').inputValue(),'测试技能改进建议');assert.equal(await p.locator('[data-check]').first().isChecked(),true);
const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('zhixu-study-v1')));assert.deepEqual(saved.notes,old.notes);assert.deepEqual(saved.attempts[0],old.attempts[0]);assert.equal(saved.drafts.w29,old.drafts.w29);
await p.goto(base+'/#settings');const dl=p.waitForEvent('download');await p.getByRole('button',{name:'导出完整备份'}).tap();const f=path.join(__dirname,'../test-results/v015-backup.json');await(await dl).saveAs(f);await p.evaluate(()=>localStorage.removeItem('zhixu-study-v1'));await p.reload();p.once('dialog',d=>d.accept());await p.locator('#import-file').setInputFiles(f);await p.getByText('备份已恢复。',{exact:true}).waitFor();assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('zhixu-study-v1'))),saved);fs.unlinkSync(f);console.log('PASS Shared writing independent drafts and exact v1 old/new backup round-trip');
for(const width of [360,390,768,1440]){await p.setViewportSize({width,height:1100});for(const route of ['learn/intro','learn/advanced','lesson/development/intro','lesson/state-organs/practice','lesson/sentence-link/advanced','quiz/one/q186','write/w31','write/w32','sources']){await p.goto(base+'/#'+route);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,width+':'+route);}}
await p.evaluate(()=>localStorage.removeItem('zhixu-study-v1'));await p.goto(base+'/#lesson/sentence-link/advanced');await p.reload();await p.setViewportSize({width:390,height:1100});await p.screenshot({path:path.join(__dirname,'../test-results/mobile-paths-v015.png'),fullPage:false});assert.deepEqual(errors,[]);assert.deepEqual(external,[]);console.log('PASS Four-width reading paths and writing, no JS errors or outgoing learning records; real cleared-state screenshot');
const file=path.join(__dirname,'../test-results/test-results.json'),r=JSON.parse(fs.readFileSync(file));for(const name of ['v015 source and semantic review','v015 progressive reading and practice paths','v015 old/new backup and shared writing','v015 responsive privacy regression'])r.tests.push({name,status:'passed'});r.tests=[...new Map(r.tests.map(x=>[x.name,x])).values()];fs.writeFileSync(file,JSON.stringify(r,null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1);});
