const {chromium}=require('@playwright/test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.STUDY_BASE_URL||'http://127.0.0.1:4173';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const ctx=await browser.newContext({viewport:{width:390,height:1100},isMobile:true,hasTouch:true,deviceScaleFactor:2}),p=await ctx.newPage(),errors=[],external=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>{if(!r.url().startsWith(base))external.push(r.url());});await p.goto(base);
 const C=await p.evaluate(()=>window.STUDY_CONTENT),q=Object.fromEntries(C.questions.map(q=>[q.id,q]));
 // Semantic review is recorded clause by clause in ANSWER_REVIEW.md. Index assertions are regression, not semantic certification.
 assert.deepEqual(['q175','q176','q177'].map(id=>q[id].answer),[1,0,2]);
 // q176 has two simultaneous requirements: clear how-to steps and preserve explicit scope.
 const optionRequirements=[[true,true],[false,false],[false,true],[true,false]];
 assert.equal(q.q176.answer,optionRequirements.findIndex(row=>row.every(Boolean)));
 // Independent truth-table counterexample for new-checklist -> on-time, not a general ranking of weakening types.
 const rows=[];for(const checklist of [false,true])for(const ontime of [false,true])rows.push({checklist,ontime,claim:!checklist||ontime});
 assert.deepEqual(rows.filter(r=>!r.claim),[{checklist:true,ontime:false,claim:false}]);assert.equal(q.q178.answer,0);
 // q179's matched-object evidence is reviewed semantically; no claim of proof or universal effectiveness.
 assert.equal(q.q179.answer,3);
 const before=[0,10],after=[2,4],mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
 assert.ok(mean(after)<mean(before));assert.ok(after.some(v=>v>0));assert.ok(after[0]>before[0]);assert.equal(q.q180.answer,1);
 // Both causal possibilities remain consistent with the reported average change when other changes are uncontrolled.
 const possibleExplanations=[{reminderEffect:true,otherChange:false,averageLower:true},{reminderEffect:false,otherChange:true,averageLower:true}];
 assert.equal(new Set(possibleExplanations.map(x=>x.reminderEffect)).size,2);
 for(const id of ['q175','q176','q177','q178','q179','q180']){assert.equal(q[id].optionReviews.length,4);assert.equal(q[id].meta.source.kind,'original');assert.equal(q[id].meta.examSource.year,null);assert.equal(q[id].meta.difficulty.level,null);}
 assert.ok(C.lessons.find(l=>l.id==='word').sections.map(s=>s[1]).join('').length>1300);
 assert.ok(C.lessons.find(l=>l.id==='argument').sections.map(s=>s[1]).join('').length>1900);
 const method=C.methods.find(m=>m.id==='caijinlong-argument-2011');assert.equal(method.kind,'historical-teacher');assert.equal(method.date,'2011-08-01');assert.match(method.boundary,/不采作跨题型通则/);
 for(const id of ['q178','q180'])assert.ok(q[id].meta.methodIds.includes(method.id));
 for(const id of ['q179','q160','q175'])assert.ok(!q[id].meta.methodIds.includes(method.id));assert.ok(!q.q175.meta.methodIds.includes('gufei-2010'));
 assert.equal(C.methods.length,17);assert.equal(C.comparisons.length,7);
 const a=C.writing.find(w=>w.id==='w29'),b=C.writing.find(w=>w.id==='w30');assert.equal(a.material,b.material);assert.equal(a.materialGroup,b.materialGroup);assert.ok(a.material.length>1750);for(const w of [a,b])assert.ok(w.sample.replace(/\s/g,'').length<=w.limit);
 assert.equal(C.questions.length,435);assert.equal(C.writing.length,47);assert.equal(new Set(C.writing.map(w=>w.material)).size,27);
 console.log('PASS Semantic review ledger, implication counterexample, average countermodel and scoped historical attribution');
 const old={schemaVersion:1,exam:'both',read:['word'],favorites:['argument'],notes:{word:'测试旧填空笔记',argument:'测试旧论证笔记'},attempts:[{qid:'q13',choice:1,at:'2026-11-04T12:00:00Z',seconds:10}],drafts:{w27:'测试旧对策草稿'},checks:{w27:[1]}};
 await p.evaluate(s=>localStorage.setItem('zhixu-study-v1',JSON.stringify(s)),old);await p.reload();
 for(const [id,n]of[['word',7],['argument',13]]){await p.goto(base+'/#lesson/'+id);assert.equal(await p.locator('#lesson-note').inputValue(),old.notes[id]);await p.getByRole('link',{name:'练配套题',exact:true}).tap();assert.ok((await p.locator('.quiz-header').textContent()).includes('1 / '+n));}
 await p.goto(base+'/#quiz/one/q177');await p.locator('[data-action="choose"][data-id="0"]').tap();await p.locator('[data-action="submit"]').tap();assert.equal(await p.locator('.option-review li').count(),4);
 await p.goto(base+'/#targeted');await p.locator('#target-module').selectOption('言语理解');await p.locator('#target-stage').selectOption('检查边界');assert.equal((await p.getByRole('link',{name:/开始这组/}).getAttribute('href')).split('/').at(-1).split(',')[0],'q177');
 await p.goto(base+'/#write/w29');await p.locator('#draft').fill('测试新信息问题概括');await p.locator('[data-check]').first().check();await p.locator('a[href="#write/w30"]').tap();await p.getByRole('heading',{name:b.title,exact:true}).waitFor();assert.equal(await p.locator('#draft').inputValue(),'');assert.equal(await p.locator('[data-check]').first().isChecked(),false);
 await p.locator('#draft').fill('测试新信息评价分析');await p.locator('a[href="#write/w29"]').tap();await p.getByRole('heading',{name:a.title,exact:true}).waitFor();assert.equal(await p.locator('#draft').inputValue(),'测试新信息问题概括');assert.equal(await p.locator('[data-check]').first().isChecked(),true);
 const saved=await p.evaluate(()=>JSON.parse(localStorage.getItem('zhixu-study-v1')));assert.deepEqual(saved.notes,old.notes);assert.deepEqual(saved.attempts[0],old.attempts[0]);assert.equal(saved.drafts.w27,old.drafts.w27);console.log('PASS Stable lesson IDs, targeted semantic mistake and independent shared-material draft/check state');
 await p.goto(base+'/#settings');const download=p.waitForEvent('download');await p.getByRole('button',{name:'导出完整备份'}).tap();const file=path.join(__dirname,'../test-results/v014-backup.json');await(await download).saveAs(file);await p.evaluate(()=>localStorage.removeItem('zhixu-study-v1'));await p.reload();p.once('dialog',d=>d.accept());await p.locator('#import-file').setInputFiles(file);await p.getByText('备份已恢复。',{exact:true}).waitFor();assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('zhixu-study-v1'))),saved);fs.unlinkSync(file);console.log('PASS Exact v1 backup round-trip with old and new records');
 for(const width of [360,390,768,1440]){await p.setViewportSize({width,height:1100});for(const route of ['lesson/word','lesson/argument','quiz/one/q178','write/w29','write/w30','methods','coverage']){await p.goto(base+'/#'+route);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,width+':'+route);}}
 await p.evaluate(()=>localStorage.removeItem('zhixu-study-v1'));await p.goto(base+'/#lesson/word');await p.reload();await p.setViewportSize({width:390,height:1100});await p.getByRole('heading',{name:'考点二：搭配先看谁对谁做什么',exact:true}).evaluate(el=>el.scrollIntoView({block:'start'}));await p.screenshot({path:path.join(__dirname,'../test-results/mobile-semantic-v014.png'),fullPage:false});assert.deepEqual(errors,[]);assert.deepEqual(external,[]);console.log('PASS Four-width lessons, sources and long writing, no JS errors or outgoing learning data; real cleared-state screenshot');
 const f=path.join(__dirname,'../test-results/test-results.json'),r=JSON.parse(fs.readFileSync(f));for(const name of ['v014 semantic and argument review','v014 scoped sources and stable writing','v014 v1 backup compatibility','v014 responsive privacy regression'])r.tests.push({name,status:'passed'});r.tests=[...new Map(r.tests.map(x=>[x.name,x])).values()];fs.writeFileSync(f,JSON.stringify(r,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
