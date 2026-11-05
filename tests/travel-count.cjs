const { readPageProgress, seedPageLegacy, resetPageProgress, assertPageRestored, assertV2Snapshot } = require("./progress-dom-support.cjs");
const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const base = process.env.STUDY_BASE_URL || 'http://127.0.0.1:4173';
(async () => {
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const ctx=await browser.newContext({viewport:{width:390,height:1100},isMobile:true,hasTouch:true,deviceScaleFactor:2});
 const p=await ctx.newPage(),errors=[],external=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith(base))external.push(r.url());});
 await p.goto(base);const C=await p.evaluate(()=>window.STUDY_CONTENT),q=Object.fromEntries(C.questions.map(q=>[q.id,q]));
 const number=id=>Number(q[id].options[q[id].answer]);
 // Simulate distance minute by minute, rather than applying either average formula.
 let meters=0,minutes=0;
 for(const speed of [600,900]){let section=0;while(section<108000){section+=speed;meters+=speed;minutes++;}}
 assert.equal(number('q163'),meters/1000/(minutes/60));
 meters=0;minutes=0;for(const speed of [500,2500/3])for(let i=0;i<40;i++){meters+=speed;minutes++;}
 assert.ok(Math.abs(number('q164')-meters/1000/(minutes/60))<1e-10);
 meters=0;minutes=0;for(const [speed,ticks] of [[500,60],[0,30],[1000,30]])for(let i=0;i<ticks;i++){meters+=speed;minutes++;}
 assert.equal(number('q165'),meters/1000/(minutes/60));assert.equal(minutes,120);
 // Enumerate set partitions by adding each distinct person to an existing block or a new block.
 // Canonical insertion order gives every unlabelled partition once, independent of factorial formulas.
 function partitions(n){let result=[[]];for(let person=0;person<n;person++){const next=[];for(const blocks of result){for(let i=0;i<=blocks.length;i++){const copy=blocks.map(b=>[...b]);if(i===copy.length)copy.push([person]);else copy[i].push(person);next.push(copy);}}result=next;}return result;}
 const sizeKey=blocks=>blocks.map(b=>b.length).sort().join(',');
 const pairs=partitions(6).filter(b=>sizeKey(b)==='2,2,2');assert.equal(pairs.length,15);assert.equal(number('q166'),pairs.length);
 const mixed=partitions(5).filter(b=>sizeKey(b)==='1,2,2');assert.equal(mixed.length,15);assert.equal(number('q168'),mixed.length);
 const sequences=[];for(let a=0;a<4;a++)for(let b=0;b<4;b++)sequences.push([a,b]);
 assert.deepEqual(q.q167.options[q.q167.answer].split('、').map(Number),[sequences.length,sequences.filter(([a,b])=>a!==b).length]);
 // Repeated-card multisets have nonuniform ordering multiplicities: no universal divide-by-two.
 assert.equal(new Set(sequences.map(a=>a.slice().sort().join(','))).size,10);
 assert.notEqual(sequences.length/2,10);
 for(const id of ['q163','q164','q165','q166','q167','q168']){assert.equal(q[id].optionReviews.length,4);assert.equal(q[id].meta.source.kind,'original');assert.equal(q[id].meta.difficulty.level,null);}
 for(const id of ['travel','count'])assert.ok(C.lessons.find(l=>l.id===id).sections.map(s=>s[1]).join('').length>1300);
 const source=C.methods.find(m=>m.id==='luozhixiang-2021');assert.equal(source.kind,'author');assert.equal(source.date,'2021-10-25');
 assert.ok(q.q163.meta.methodIds.includes(source.id));assert.ok(q.q164.meta.methodIds.includes(source.id));
 for(const id of ['q35','q36','q165','q166'])assert.ok(!q[id].meta.methodIds.includes(source.id));
 assert.equal(C.methods.length,17);assert.equal(C.comparisons.length,7);
 const a=C.writing.find(w=>w.id==='w25'),b=C.writing.find(w=>w.id==='w26');assert.equal(a.material,b.material);assert.equal(a.materialGroup,b.materialGroup);assert.ok(a.material.length>1800);
 for(const w of [a,b])assert.ok(w.sample.replace(/\s/g,'').length<=w.limit);
 assert.equal(C.questions.length,621);assert.equal(C.writing.length,65);assert.equal(new Set(C.writing.map(w=>w.material)).size,31);
 console.log('PASS Minute simulation, unique set-partition enumeration, ordered draws and scoped author attribution');
 const old={schemaVersion:1,exam:'both',read:['travel'],favorites:['count'],notes:{travel:'测试旧行程笔记',count:'测试旧计数笔记'},attempts:[{qid:'q16',choice:1,at:'2026-11-04T12:00:00Z',seconds:9}],drafts:{w23:'测试旧对策草稿'},checks:{w23:[0]}};
 await seedPageLegacy(p, old);await p.reload();
 for(const id of ['travel','count']){await p.goto(base+'/#lesson/'+id);assert.equal(await p.locator('#lesson-note').inputValue(),old.notes[id]);await p.getByRole('link',{name:'练配套题',exact:true}).tap();assert.ok((await p.locator('.quiz-header').textContent()).includes('1 / '+(id==='travel'?8:8)));}
 await p.goto(base+'/#quiz/one/q168');await p.locator('[data-action="choose"][data-id="1"]').tap();await p.locator('[data-action="submit"]').tap();assert.equal(await p.locator('.option-review li').count(),4);
 await p.goto(base+'/#targeted');await p.locator('#target-module').selectOption('数量关系');await p.locator('#target-stage').selectOption('检查边界');
 assert.equal((await p.getByRole('link',{name:/开始这组/}).getAttribute('href')).split('/').at(-1).split(',')[0],'q168');
 await p.goto(base+'/#write/w25');await p.locator('#draft').fill('测试新问题概括');await p.locator('[data-check]').first().check();
 await p.locator('a[href="#write/w26"]').tap();await p.getByRole('heading',{name:b.title,exact:true}).waitFor();assert.equal(await p.locator('#draft').inputValue(),'');assert.equal(await p.locator('[data-check]').first().isChecked(),false);
 await p.locator('#draft').fill('测试新句意解释');await p.locator('a[href="#write/w25"]').tap();await p.getByRole('heading',{name:a.title,exact:true}).waitFor();assert.equal(await p.locator('#draft').inputValue(),'测试新问题概括');assert.equal(await p.locator('[data-check]').first().isChecked(),true);
 const saved=await readPageProgress(p);assert.deepEqual(saved.notes,old.notes);assert.deepEqual(saved.attempts[0],old.attempts[0]);assert.equal(saved.drafts.w23,old.drafts.w23);
 console.log('PASS Existing records, eight/five-question routes, targeted mistake priority and distinct shared-material drafts/checks');
 await p.goto(base+'/#settings');const download=p.waitForEvent('download');await p.getByRole('button',{name:'导出学习记录备份'}).tap();const file=path.join(__dirname,'../test-results/v012-backup.json');await(await download).saveAs(file);
  assertV2Snapshot(JSON.parse(fs.readFileSync(file, "utf8")));
 const reset = await resetPageProgress(p);p.once('dialog',d=>d.accept());await p.locator('#import-file').setInputFiles(file);await p.getByText('备份已恢复，活动计时保持暂停。',{exact:true}).waitFor();
  await assertPageRestored(p, saved, reset.revision);fs.unlinkSync(file);
 console.log('PASS Old and new data restores exactly through v2 backup');
 for(const width of [360,390,768,1440]){await p.setViewportSize({width,height:1100});for(const route of ['lesson/travel','lesson/count','quiz/one/q168','write/w25','write/w26','methods','coverage']){await p.goto(base+'/#'+route);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,width+':'+route);}}
 await resetPageProgress(p);await p.goto(base+'/#lesson/travel');await p.reload();await p.setViewportSize({width:390,height:1100});
 await p.getByRole('heading',{name:'巩固：等时与等距为什么不同',exact:true}).evaluate(el=>el.scrollIntoView({block:'start'}));await p.screenshot({path:path.join(__dirname,'../test-results/mobile-travel-v012.png'),fullPage:false});
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);console.log('PASS Four-width mobile lessons and writing with no JS errors or outgoing learning data; real cleared-state screenshot');
 const f=path.join(__dirname,'../test-results/test-results.json'),r=JSON.parse(fs.readFileSync(f));for(const name of ['v012 independent travel and partition enumeration','v012 scoped sources and stable linked tasks','v012 v2 backup compatibility','v012 responsive privacy regression'])r.tests.push({name,status:'passed'});r.tests=[...new Map(r.tests.map(x=>[x.name,x])).values()];fs.writeFileSync(f,JSON.stringify(r,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
