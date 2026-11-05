const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const base = process.env.STUDY_BASE_URL || 'http://127.0.0.1:4173';
(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
  const context = await browser.newContext({viewport:{width:390,height:1100},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  const p = await context.newPage(), errors=[], external=[];
  p.on('pageerror',e=>errors.push(e.message));
  p.on('request',r=>{if(!r.url().startsWith(base))external.push(r.url());});
  await p.goto(base);
  const C=await p.evaluate(()=>window.STUDY_CONTENT), q=Object.fromEntries(C.questions.map(x=>[x.id,x]));
  // Independently enumerate units and candidate bases; no use of the explanation's arithmetic.
  const oldBooks=Array(96).fill(1), added=Array(120).fill(1).slice(oldBooks.length);
  assert.equal(parseFloat(q.q157.options[q.q157.answer]),added.length/oldBooks.length*100);
  const bases=[[240,20],[330,10]].map(([current,percent])=>Array.from({length:current},(_,i)=>i+1).filter(b=>b*(100+percent)===current*100));
  assert.deepEqual(bases,[[200],[300]]);
  assert.deepEqual(q.q158.options[q.q158.answer].match(/\d+/g).map(Number),[240-bases[0][0],330-bases[1][0]]);
  // Exact integer inequalities for every tested pair of positive weights; explicit counterexamples disprove fixed value/closeness.
  for(let a=1;a<=100;a++)for(let b=1;b<=100;b++){
    const numerator=10*a+30*b,denominator=a+b;
    assert.ok(numerator>10*denominator && numerator<30*denominator);
  }
  assert.equal((10*300+30*100)/400,15);
  assert.equal((10*100+30*300)/400,25);
  assert.equal(q.q159.answer,3);
  // Same actual delivery times give 80% or 95% solely by changing the recorded threshold.
  const lateness=[...Array(16).fill(0),5,8,10,20];
  assert.equal(lateness.filter(t=>t<=0).length/lateness.length,0.8);
  assert.equal(lateness.filter(t=>t<=10).length/lateness.length,0.95);
  assert.equal(q.q160.answer,1);
  // Both populations contain the same 8-support/2-oppose respondent sample.
  const populations=[{yes:8,no:92},{yes:98,no:2}];
  assert.deepEqual(populations.map(x=>x.yes>x.no),[false,true]);
  assert.equal(q.q162.answer,2);
  // q161's semantic evidence-to-conclusion review is documented separately; this is regression only.
  assert.equal(q.q161.answer,3);
  assert.equal(C.questions.length,189);assert.equal(C.writing.length,32);
  for(const id of ['growth','argument'])assert.ok(C.lessons.find(l=>l.id===id).sections.map(s=>s[1]).join('').length>=1300);
  for(const id of ['q157','q158','q159','q160','q161','q162']){
    assert.equal(q[id].optionReviews.length,4);assert.equal(q[id].meta.source.kind,'original');
    assert.equal(q[id].meta.examSource.year,null);assert.equal(q[id].meta.difficulty.level,null);
  }
  assert.equal(q.q160.meta.methodIds.length,0); // No invented named-teacher attribution.
  const a=C.writing.find(w=>w.id==='w23'),b=C.writing.find(w=>w.id==='w24');
  assert.equal(a.material,b.material);assert.equal(a.materialGroup,b.materialGroup);assert.ok(a.material.length>1600);
  for(const w of [a,b])assert.ok(w.sample.replace(/\s/g,'').length<=w.limit);
  assert.equal(new Set(C.writing.map(w=>w.material)).size,24);
  console.log('PASS Independent unit enumeration, weighted-range and causality countermodels; original provenance and material scope');
  const old={schemaVersion:1,exam:'both',read:['growth','argument'],favorites:['growth'],notes:{growth:'测试旧增长笔记',argument:'测试旧论证笔记'},attempts:[{qid:'q09',choice:0,at:'2026-11-04T12:00:00Z',seconds:11}],drafts:{w21:'测试旧概括草稿'},checks:{w21:[1]}};
  await p.evaluate(s=>localStorage.setItem('zhixu-study-v1',JSON.stringify(s)),old);await p.reload();
  for(const [id,count] of [['growth',9],['argument',7]]){
    await p.goto(base+'/#lesson/'+id);assert.equal(await p.locator('#lesson-note').inputValue(),old.notes[id]);
    await p.getByRole('link',{name:'练配套题',exact:true}).tap();assert.ok((await p.locator('.quiz-header').textContent()).includes('1 / '+count));
  }
  await p.goto(base+'/#quiz/one/q159');
  await p.locator('[data-action="choose"][data-id="0"]').tap();await p.locator('[data-action="submit"]').tap();
  assert.equal(await p.locator('.option-review li').count(),4);
  await p.goto(base+'/#targeted');await p.locator('#target-module').selectOption('资料分析');await p.locator('#target-stage').selectOption('检查边界');
  const href=await p.getByRole('link',{name:/开始这组/}).getAttribute('href');assert.equal(href.split('/').at(-1).split(',')[0],'q159');
  await p.goto(base+'/#write/w23');await p.locator('#draft').fill('测试新对策草稿');await p.locator('[data-check]').first().check();
  await p.locator('a[href="#write/w24"]').tap();await p.getByRole('heading',{name:b.title,exact:true}).waitFor();
  assert.equal(await p.locator('#draft').inputValue(),'');assert.equal(await p.locator('[data-check]').first().isChecked(),false);
  await p.locator('#draft').fill('测试内部交流提纲');await p.locator('a[href="#write/w23"]').tap();await p.getByRole('heading',{name:a.title,exact:true}).waitFor();
  assert.equal(await p.locator('#draft').inputValue(),'测试新对策草稿');assert.equal(await p.locator('[data-check]').first().isChecked(),true);
  const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('zhixu-study-v1')));assert.deepEqual(saved.attempts[0],old.attempts[0]);assert.equal(saved.drafts.w21,old.drafts.w21);assert.deepEqual(saved.notes,old.notes);
  console.log('PASS Old lesson records, enlarged practice routes, targeted new error and separate linked writing state');
  await p.goto(base+'/#settings');const download=p.waitForEvent('download');await p.getByRole('button',{name:'导出完整备份'}).tap();
  const file=path.join(__dirname,'../test-results/v011-backup.json');await(await download).saveAs(file);
  await p.evaluate(()=>localStorage.removeItem('zhixu-study-v1'));await p.reload();p.once('dialog',d=>d.accept());await p.locator('#import-file').setInputFiles(file);
  await p.getByText('备份已恢复。',{exact:true}).waitFor();assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('zhixu-study-v1'))),saved);
  fs.unlinkSync(file);console.log('PASS Old and new notes, choices, drafts and checks survive lossless v1 backup round-trip');
  for(const width of [360,390,768,1440]){
    await p.setViewportSize({width,height:1100});
    for(const route of ['lesson/growth','lesson/argument','quiz/one/q160','write/w23','write/w24','coverage']){
      await p.goto(base+'/#'+route);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,width+':'+route);
    }
  }
  await p.evaluate(()=>localStorage.removeItem('zhixu-study-v1'));await p.goto(base+'/#lesson/argument');await p.reload();await p.setViewportSize({width:390,height:1100});
  await p.getByRole('heading',{name:'方法一：沿论证链定位断点',exact:true}).evaluate(el=>el.scrollIntoView({block:'start'}));
  await p.screenshot({path:path.join(__dirname,'../test-results/mobile-argument-v011.png'),fullPage:false});
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
  console.log('PASS Four-width content flow, no page errors or outgoing learning data; cleared-state real screenshot');
  const f=path.join(__dirname,'../test-results/test-results.json'),r=JSON.parse(fs.readFileSync(f));
  for(const name of ['v011 independent math and argument countermodels','v011 stable records and linked writing','v011 v1 backup round-trip','v011 responsive privacy regression'])r.tests.push({name,status:'passed'});
  r.tests=[...new Map(r.tests.map(x=>[x.name,x])).values()];fs.writeFileSync(f,JSON.stringify(r,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
