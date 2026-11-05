const {chromium}=require('@playwright/test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:4173';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const ctx=await browser.newContext({viewport:{width:390,height:1100},isMobile:true,hasTouch:true,deviceScaleFactor:2}),p=await ctx.newPage(),errors=[],external=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith(base))external.push(r.url());});await p.goto(base);
 const C=await p.evaluate(()=>window.STUDY_CONTENT),q=Object.fromEntries(C.questions.map(x=>[x.id,x])),num=id=>parseFloat(q[id].options[q[id].answer]);
 // Individual task/person constructions, independent of the explanations' stored formulas.
 const tasks=[...Array(10).fill(30),...Array(30).fill(10)];assert.equal(num('q169'),tasks.reduce((s,v)=>s+v,0)/tasks.length);
 const before=Array(100).fill(10),after=Array(110).fill(11),sum=a=>a.reduce((s,v)=>s+v,0);
 assert.equal((sum(after)-sum(before))*100/sum(before),21);assert.equal((after.length-before.length)*100/before.length,10);
 assert.equal(num('q170'),(sum(after)/after.length-sum(before)/before.length)*100/(sum(before)/before.length));
 // Exact tenths for errors: check every permitted integer-grid pair and attain both endpoints.
 let maximum=0;const estimates=[];
 for(let e1=-5;e1<=5;e1++)for(let e2=-5;e2<=5;e2++){
  const trueSum=10*(100+e1)+30*(200+e2),errorTenths=trueSum/40-175;
  assert.ok(Math.abs(errorTenths)<=5);maximum=Math.max(maximum,Math.abs(errorTenths));estimates.push(trueSum/400);
 }
 assert.equal(maximum,5);assert.equal(Math.min(...estimates),17);assert.equal(Math.max(...estimates),18);assert.equal(q.q171.answer,3);
 const baseUnits=[...Array(80).fill('A'),...Array(120).fill('B')];
 const added=[...Array(20).fill('A'),...Array(6).fill('B')];assert.equal(num('q172'),added.length/baseUnits.length*100);
 const roots=[[120,20],[220,10]].map(([a,r])=>Array.from({length:a},(_,i)=>i+1).filter(b=>b*(100+r)===100*a));assert.deepEqual(roots,[[100],[200]]);
 assert.equal(num('q173'),Number(((340-(roots[0][0]+roots[1][0]))/(roots[0][0]+roots[1][0])*100).toFixed(2)));
 const oldPopulation=[...Array(40).fill(true),...Array(60).fill(false)],newPopulation=[...Array(48).fill(true),...Array(66).fill(false)];
 const proportion=a=>a.filter(Boolean).length/a.length;
 assert.equal(num('q174'),Number(((proportion(newPopulation)-proportion(oldPopulation))*100).toFixed(2)));
 assert.ok(Math.abs((proportion(newPopulation)/proportion(oldPopulation)-1)*100-100/19)<1e-10);
 // Algebraic counterexample: positive TOTAL base does not suffice for the positive-weight range rule.
 assert.equal((100*0.1-50*0.3)/(100-50),-0.1);
 for(const id of ['q169','q170','q171','q172','q173','q174']){assert.equal(q[id].optionReviews.length,4);assert.equal(q[id].meta.source.kind,'original');assert.equal(q[id].meta.examSource.year,null);assert.equal(q[id].meta.difficulty.level,null);}
 for(const id of ['average','mixed-growth'])assert.ok(C.lessons.find(l=>l.id===id).sections.map(s=>s[1]).join('').length>1350);
 assert.match(C.lessons.find(l=>l.id==='average').sections[0][1],/均值相同/);
 assert.equal(C.methods.length,17);assert.equal(C.comparisons.length,7);
 const a=C.writing.find(w=>w.id==='w27'),b=C.writing.find(w=>w.id==='w28');assert.equal(a.material,b.material);assert.equal(a.materialGroup,b.materialGroup);assert.ok(a.material.length>1750);for(const w of [a,b])assert.ok(w.sample.replace(/\s/g,'').length<=w.limit);
 assert.equal(C.questions.length,291);assert.equal(C.writing.length,47);assert.equal(new Set(C.writing.map(w=>w.material)).size,27);
 console.log('PASS Independent unit constructions, error extrema, base enumeration and percentage-point checks with positive-weight counterexample');
 const old={schemaVersion:1,exam:'both',read:['average'],favorites:['mixed-growth'],notes:{average:'测试旧平均数笔记','mixed-growth':'测试旧混合增长笔记'},attempts:[{qid:'q06',choice:1,at:'2026-11-04T12:00:00Z',seconds:12}],drafts:{w25:'测试旧问题概括'},checks:{w25:[1]}};
 await p.evaluate(s=>localStorage.setItem('zhixu-study-v1',JSON.stringify(s)),old);await p.reload();
 for(const [id,n]of[['average',10],['mixed-growth',8]]){await p.goto(base+'/#lesson/'+id);assert.equal(await p.locator('#lesson-note').inputValue(),old.notes[id]);await p.getByRole('link',{name:'练配套题',exact:true}).tap();assert.ok((await p.locator('.quiz-header').textContent()).includes('1 / '+n));}
 await p.goto(base+'/#quiz/one/q171');await p.locator('[data-action="choose"][data-id="0"]').tap();await p.locator('[data-action="submit"]').tap();assert.equal(await p.locator('.option-review li').count(),4);
 await p.goto(base+'/#targeted');await p.locator('#target-module').selectOption('资料分析');await p.locator('#target-stage').selectOption('检查边界');assert.equal((await p.getByRole('link',{name:/开始这组/}).getAttribute('href')).split('/').at(-1).split(',')[0],'q171');
 await p.goto(base+'/#write/w27');await p.locator('#draft').fill('测试新共享空间对策');await p.locator('[data-check]').first().check();await p.locator('a[href="#write/w28"]').tap();await p.getByRole('heading',{name:b.title,exact:true}).waitFor();assert.equal(await p.locator('#draft').inputValue(),'');assert.equal(await p.locator('[data-check]').first().isChecked(),false);
 await p.locator('#draft').fill('测试新评价分析');await p.locator('a[href="#write/w27"]').tap();await p.getByRole('heading',{name:a.title,exact:true}).waitFor();assert.equal(await p.locator('#draft').inputValue(),'测试新共享空间对策');assert.equal(await p.locator('[data-check]').first().isChecked(),true);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('zhixu-study-v1')));assert.deepEqual(saved.notes,old.notes);assert.deepEqual(saved.attempts[0],old.attempts[0]);assert.equal(saved.drafts.w25,old.drafts.w25);console.log('PASS Stable notes and attempts, expanded practice, targeted boundary error and distinct new writing state');
 await p.goto(base+'/#settings');const download=p.waitForEvent('download');await p.getByRole('button',{name:'导出完整备份'}).tap();const file=path.join(__dirname,'../test-results/v013-backup.json');await(await download).saveAs(file);await p.evaluate(()=>localStorage.removeItem('zhixu-study-v1'));await p.reload();p.once('dialog',d=>d.accept());await p.locator('#import-file').setInputFiles(file);await p.getByText('备份已恢复。',{exact:true}).waitFor();assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('zhixu-study-v1'))),saved);fs.unlinkSync(file);console.log('PASS Exact v1 backup round-trip for all old and new learning state');
 for(const width of [360,390,768,1440]){await p.setViewportSize({width,height:1100});for(const route of ['lesson/average','lesson/mixed-growth','quiz/one/q174','write/w27','write/w28','coverage']){await p.goto(base+'/#'+route);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,width+':'+route);}}
 await p.evaluate(()=>localStorage.removeItem('zhixu-study-v1'));await p.goto(base+'/#lesson/average');await p.reload();await p.setViewportSize({width:390,height:1100});await p.getByRole('heading',{name:'平均数增长：分子分母都在变',exact:true}).evaluate(el=>el.scrollIntoView({block:'start'}));await p.screenshot({path:path.join(__dirname,'../test-results/mobile-weighted-v013.png'),fullPage:false});assert.deepEqual(errors,[]);assert.deepEqual(external,[]);console.log('PASS Four-width lessons and shared writing, no JS errors or outgoing learning data; real cleared-state screenshot');
 const f=path.join(__dirname,'../test-results/test-results.json'),r=JSON.parse(fs.readFileSync(f));for(const name of ['v013 independent weighted arithmetic and bounds','v013 stable IDs and separate shared writing','v013 v1 backup compatibility','v013 responsive privacy regression'])r.tests.push({name,status:'passed'});r.tests=[...new Map(r.tests.map(x=>[x.name,x])).values()];fs.writeFileSync(f,JSON.stringify(r,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
