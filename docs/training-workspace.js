"use strict";
// Local-only training workspace. Counts and elapsed time are not official exam scores.
(() => {
  function create({ C, T, getState, save, render, notify, getError, questionMaterial, questionGraphic, questionMeta, optionReview, recordAttempt, canRecordAttempt }) {
    const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const button = (label, action, id = '', disabled = false) => `<button class="btn secondary" data-action="${action}" data-id="${esc(id)}" ${disabled ? 'disabled' : ''}>${esc(label)}</button>`;
    const link = (label, href) => `<a class="btn secondary" href="${esc(href)}">${esc(label)}</a>`;
    const time = ms => { const s = Math.max(0, Math.floor(ms / 1000)); return `${Math.floor(s / 60)}分${String(s % 60).padStart(2,'0')}秒`; };
    const date = value => new Date(value).toLocaleString('zh-CN');
    const qById = id => C.questions.find(q => q.id === id), wById = id => C.writing.find(w => w.id === id);
    const P=window.STUDY_PAPERS;
    const paperOf=run=>{try{return P?.paperForRun(run)||null;}catch{return null;}};
    const types = C.categories.filter(c => !['全部','申论方法'].includes(c));
    let module = 'all', mode = 'new', count = 5, budget = '', message = '', busy = false, historyPage = 0, navigationVersion = 0;
    const choices = new Map();
    const state = () => getState();
    const latest = () => { const out = {}; for (const a of state().attempts) out[a.qid] = a; return out; };
    const routeFor = run => run.kind === 'choice' ? '#quiz/timed/' + run.id : '#write/' + run.taskId;
    const newId = () => 'run-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,10);
    const blocked = () => busy || Boolean(getError());
    const statusName = run => ({running:'计时中',paused:'已暂停',finished:run.kind === 'writing' ? '手动完成' : '题组结束',early:'提前结束',timeout:'到时结束'}[run.status] || run.status);
    function archive() {
      const run = state().activeRun;
      if (!run || !T.isTerminal(run)) return false;
      if (!state().runs.some(x => x.id === run.id)) state().runs.push(JSON.parse(JSON.stringify(run)));
      state().activeRun = null;
      return true;
    }
    async function commit() {
      const ok = await save();
      if (!ok && getError()) message = '本页变更尚未写入本机，请先到备份页导出本页副本。';
      return ok;
    }
    function projected(run) { return T.project(run, Date.now()); }
    function timer(run) {
      const p = projected(run);
      return `<div class="actions"><span class="pill" data-run-status>${esc(statusName(p))}</span><strong data-run-elapsed>${time(p.elapsedMs)}</strong>${p.budgetMs !== null ? `<span data-run-remaining>剩余 ${time(Math.max(0,p.budgetMs-p.elapsedMs))}</span>` : ''}</div>${p.clockIssue ? '<p class="storage-alert">存在未计入的异常或中断区间（如时钟变化、长间隔或保存受限）；请核对后再继续。</p>' : ''}`;
    }
    function activeCard() {
      const run = state().activeRun;
      if (!run) return '';
      const compatible = T.compatible(run);
      return `<section class="panel" data-active-training><h2>有一项尚未结束的训练</h2><p>${run.kind === 'choice' ? `${run.items.length}道原创题` : esc(wById(run.taskId).title)} · 开始 ${esc(date(run.startedAt))}</p>${timer(run)}${!compatible ? '<p class="storage-alert">题目或任务内容已变更，不能按旧快照继续。可结束保存旧记录，再开新训练。</p>' : ''}<div class="actions">${link('打开这项训练',routeFor(run))}${button('提前结束并记录','run-end',run.id,blocked())}</div></section>`;
    }
    function pool() {
      const done = latest();
      return C.questions.filter(q => (module === 'all' || q.meta.module === module) && (mode === 'all' || (mode === 'new' ? !done[q.id] : done[q.id] && done[q.id].choice !== q.answer)));
    }
    function proposed(parts) {
      if(parts?.[1]==='paper'){const status=P?.definitionStatus(parts[2]);if(!status?.available)throw Error(status?.reason||'短卷尚未加载。');return P.get(parts[2]).sections.flatMap(s=>s.questionIds);}
      if (parts?.[1] !== 'ids') return null;
      const ids = (parts[2] || '').split(',');
      if (!ids.length || ids.length > 20 || new Set(ids).size !== ids.length || ids.some(id => !qById(id))) throw Error('这组题号无效，请返回针对性练习重新选择。');
      return ids;
    }
    function forms(parts) {
      let fixed = null, error = '';
      try { fixed = proposed(parts); } catch (e) { error = e.message; }
      const available = fixed ? fixed.length : pool().length, paper=parts?.[1]==='paper'&&!error?P.get(parts[2]):null;
      return `<section class="panel"><h2>开一组自选限时训练</h2><p>原创方法训练，非真题。预算由你填写，不代表任何正式试卷时长。</p>${paper?`<p data-selected-paper><strong>${esc(paper.title)}</strong> · 修订${paper.revision}，固定20题。原题重复接触会影响表现，不预测考试分数。</p>`:''}${fixed ? `<p>来自指定题组，固定 ${fixed.length} 题。</p>` : `<div class="bank-filters"><label class="bank-field">模块<select id="run-module"><option value="all">全部选择题模块</option>${types.map(c=>`<option ${module===c?'selected':''}>${esc(c)}</option>`).join('')}</select></label><label class="bank-field">题目状态<select id="run-mode"><option value="new" ${mode==='new'?'selected':''}>只练未做题</option><option value="wrong" ${mode==='wrong'?'selected':''}>只练当前错题</option><option value="all" ${mode==='all'?'selected':''}>全部题，可重练</option></select></label><label class="bank-field">题数（1至20）<input id="run-count" type="number" min="1" max="20" value="${count}"></label></div>`}<div class="bank-filters"><label class="bank-field">本组预算分钟（1至240）<input id="run-budget" type="number" min="1" max="240" step="1" value="${esc(budget)}" placeholder="由你填写"></label></div><p>当前可选 ${available} 题，按目录顺序固定题号。运行时按经过时间计，后台及刷新继续；站内离开本组会自动暂停。未提交不算答错。</p><p class="stat-foot">模块计时包含该题阅读、作答及解析停留；暂停不计。未暂停就关闭页面，恢复时仍按运行时间核算。系统时钟异常的区间另作提示，不假装精确作答时间。</p>${error ? `<p role="alert">${esc(error)}</p>` : ''}<div class="actions">${button('固定题组并开始计时','run-start',paper?'paper:'+paper.id:fixed ? fixed.join(',') : '',blocked()||!!state().activeRun||state().runs.length>=500||!available||!!error)}${link('回到普通针对性练习','#targeted')}</div>${state().activeRun ? '<p>请先继续或结束已有训练，再开新组，避免同时计时。</p>' : ''}${state().runs.length>=500?'<p>已有500组历史，请先完整备份并整理；不会自动删除旧记录。</p>':''}<p role="status" id="training-message">${esc(message)}</p></section>`;
    }
    function moduleCards(rows) {
      return `<div class="practice-grid">${rows.map(r=>`<section class="card practice-card"><h3>${esc(r.module)}</h3><p>计划 ${r.planned} · 已提交 ${r.submitted} · 未提交 ${r.unsubmitted}</p><p>正确 ${r.correct} · 错误 ${r.wrong}</p><strong>${time(r.spentMs)}</strong></section>`).join('')}</div>`;
    }
    function overview() {
      const done = latest(), rows = types.map(module => {
        const ids=C.questions.filter(q=>q.meta.module===module).map(q=>q.id), a=state().attempts.filter(a=>ids.includes(a.qid));
        return {module,total:ids.length,distinct:ids.filter(id=>done[id]).length,correct:ids.filter(id=>done[id]&&done[id].choice===qById(id).answer).length,attempts:a.length,ms:a.reduce((n,a)=>n+a.seconds*1000,0)};
      });
      const writingRuns=state().runs.filter(r=>r.kind==='writing'), completed=writingRuns.filter(r=>r.completed), distinct=new Set(completed.map(r=>r.taskId)).size;
      return `<section class="panel"><h2>当前题库的逐题复盘</h2><p>以下按每道题最近一次提交及当前答案统计，不同题数和累计次数分开。旧作答不能还原历史题组，也不会补造批次或未提交记录。</p><div class="practice-grid">${rows.map(r=>`<section class="card practice-card" data-module-review="${esc(r.module)}"><h3>${esc(r.module)}</h3><p>已做不同题 ${r.distinct} / ${r.total} · 未做 ${r.total-r.distinct}</p><p>最近提交正确 ${r.correct} · 最近提交错误 ${r.distinct-r.correct}</p><p>累计提交 ${r.attempts} 次 · 单题提交耗时合计 ${time(r.ms)}</p></section>`).join('')}</div><p class="stat-foot">旧耗时为打开单题至提交的正计时，可能包含后台停留，不是完整批次耗时。未做不等于薄弱；没有难度标定，不能据此换算官方分值或预测总分。</p></section><section class="panel"><h2>申论记录</h2><p>本机有草稿 ${C.writing.filter(w=>state().drafts[w.id]?.trim()).length} / ${C.writing.length} 项；手动完成 ${completed.length} 次、${distinct} 个不同任务；累计记录 ${time(writingRuns.reduce((n,r)=>n+r.elapsedMs,0))}。</p><p>草稿、勾选自查、计时和手动完成是四种不同记录，不互相当作得分或完成证明。</p>${link('选择申论任务','#writing')}</section>`;
    }
    function history() {
      const runs=[...state().runs].reverse(), pages=Math.max(1,Math.ceil(runs.length/10));historyPage=Math.min(historyPage,pages-1);
      return `<section class="panel"><h2>计时训练记录</h2>${getError()?'<p class="storage-alert">本页可能含未保存变更，不能当作已经落盘；请先导出本页副本。</p>':''}<p>${runs.length} 组 · 第 ${historyPage+1} / ${pages} 页 · 最多500组，不自动删旧记录</p><div class="stack">${runs.slice(historyPage*10,historyPage*10+10).map(r=>`<article class="card"><span class="pill gray">${r.kind==='choice'?'选择题':'申论'} · ${esc(statusName(r))}</span><h3>${r.kind==='choice'?r.items.length+'道原创题':esc(wById(r.taskId).title)}</h3><p>${esc(date(r.startedAt))} · ${time(r.elapsedMs)}${r.kind==='writing'?' · '+(r.completed?'手动完成':'未标记完成'):''}</p>${r.clockIssue?'<p>含待核时钟提示，不能据此认定精确用时。</p>':''}${link('查看本次记录','#training/run/'+r.id)}</article>`).join('')||'<p>尚无已结束的计时训练，旧作答不会被猜成某一组。</p>'}</div><div class="actions">${button('上一页','run-history-prev','',historyPage===0)}${button('下一页','run-history-next','',historyPage>=pages-1)}${button('导出学习记录备份','backup')}</div></section>`;
    }
    function details(id) {
      const run=state().runs.find(r=>r.id===id);
      if(!run)return '<section class="panel"><h1>没有找到这次记录</h1>'+link('返回复盘台','#training')+'</section>';
      return `<section class="panel"><h1>${esc(paperOf(run)?.title||'本次训练记录')}</h1>${paperOf(run)?'<p>固定原创方法短卷；卷名及修订仅在公共目录指纹完全吻合时识别，不是完整模考。</p>':''}<p>${esc(statusName(run))} · ${esc(date(run.startedAt))}至${esc(date(run.endedAt))} · 用时 ${time(run.elapsedMs)}</p><p>已结束用时冻结，不随打开此页增长。显示按整秒截取，分项显示相加与合计可能有数秒差；原始记录按毫秒保存。${run.clockIssue?'存在时钟待核提示。':''}</p>${!T.compatible(run)?'<p>内容已更新：历史按开始本组时保存的模块和答案判断，不用当前版本反推原成绩。</p>':''}${run.kind==='choice'?`<p>本组 ${run.items.length} 题 · 预算 ${time(run.budgetMs)} · 未提交不是答错。</p>${moduleCards(T.choiceSummary(run).modules)}${P?P.typeReviewHtml(run):''}<ol>${run.items.map((item,i)=>`<li>${esc(item.qid.toUpperCase())} · ${esc(item.module)} · ${run.responses[i]?(run.responses[i].choice===item.answer?'正确':'错误'):'未提交'} · ${time(run.spentMs[i])} ${link('另开普通重练','#quiz/one/'+item.qid)}</li>`).join('')}</ol>`:`<p>${esc(wById(run.taskId).title)} · ${run.completed?'手动标记完成':'结束但未标记完成'} · 结束时草稿 ${run.draftChars} 个非空白字符。</p><p>这里记录的是计时器运行时长，非纯写字时间；不提供官方阅卷或分数。</p>${link('回到草稿','#write/'+run.taskId)}`}${link('看本机薄弱点线索','#diagnostics')}${link('返回复盘台','#training')}</section>`;
    }
    function page(parts) {
      if(parts?.[1]==='run')return details(parts[2]);
      return `<header class="page-heading"><span class="eyebrow">LOCAL TRAINING RECORDS</span><h1>训练记录与复盘</h1><p>看清做了什么、花了多久，再决定下一步；不把原创练习换成考试分数。</p></header>${activeCard()}${forms(parts)}${overview()}${history()}`;
    }
    function quizPage(id) {
      const run=state().activeRun;
      if(!run||run.kind!=='choice'||run.id!==id)return `<section class="panel"><h1>这组已结束或不在进行中</h1>${link('查看训练记录','#training')}</section>`;
      const p=projected(run), item=run.items[run.cursor], q=qById(item.qid), response=run.responses[run.cursor], key=run.id+':'+run.cursor, choice=response?response.choice:(choices.get(key)??null), compatible=T.compatible(run), disabled=blocked()||run.status!=='running'||!compatible;
      if(!compatible)return `<section class="panel"><h1>内容已变更，旧训练不能继续</h1>${timer(run)}<p>不把当前题面与历史答案混在一起。结束旧记录后可另开新组，已提交记录会保留。</p>${button('结束旧记录','run-end',run.id,busy)}${link('看本机薄弱点线索','#diagnostics')}${link('返回复盘台','#training')}</section>`;
      return `<div class="quiz-wrap"><div class="quiz-header">${link('离开并暂停','#training')}<span>${run.cursor+1} / ${run.items.length} 题</span></div><section class="panel"><h2>自选限时 · 原创训练</h2>${timer(run)}<p>预算 ${time(run.budgetMs)}；到时结束并保留未提交题。模块计时包含当前题阅读、作答及解析停留。</p>${!compatible?'<p class="storage-alert">题目内容已变更，请结束旧记录后重新开始。</p>':''}<div class="actions">${button(run.status==='running'?'暂停计时':'继续计时',run.status==='running'?'run-pause':'run-resume',run.id,blocked()||!compatible)}${button('提前结束并记录','run-end',run.id,busy)}</div></section><section class="panel quiz-card"><span class="pill">${esc(item.module)} · 非真题</span><h1 class="${q.stem.includes("\n") ? "passage-stem" : ""}">${esc(q.stem)}</h1>${questionMaterial(q)}${questionGraphic(q)}${questionMeta(q)}<div class="options" role="group" aria-label="选择一个答案">${q.options.map((o,i)=>`<button class="option ${choice===i?'selected':''} ${response&&i===item.answer?'correct':''} ${response&&choice===i&&choice!==item.answer?'incorrect':''}" data-action="run-choose" data-id="${i}" aria-pressed="${choice===i}" ${disabled||response?'disabled':''}><span>${String.fromCharCode(65+i)}</span><span>${esc(o)}${response&&i===item.answer?' ✓ 正确答案':''}</span></button>`).join('')}</div>${response?`<div class="feedback ${choice===item.answer?'':'wrong'}" role="status"><strong>${choice===item.answer?'本题正确':'本题待复盘'}</strong><p>${esc(q.explanation)}</p>${optionReview(q)}</div>`:''}<div class="actions">${response?button(run.cursor===run.items.length-1?'结束并查看记录':'下一题','run-next',run.id,disabled):button('提交并记录','run-submit',run.id,disabled||choice===null)}${!response?button('跳过并保留未提交','run-skip',run.id,disabled):''}</div><p>选择未提交不计答题；暂停时不能提交。结束确认弹窗停留时间也计入运行计时；已暂停则不计。计时记录不是监考、难度或分数标定。</p></section></div>`;
    }
    function writingPanel(taskId) {
      const run=state().activeRun, own=run?.kind==='writing'&&run.taskId===taskId;
      if(run&&!own)return `<section class="panel"><h2>本次写作计时</h2><p>另一项训练尚未结束；草稿仍可正常编辑，当前任务未另开计时。</p>${link('查看已有训练','#training')}</section>`;
      return `<section class="panel" data-writing-timer><h2>本次写作计时与完成</h2><p>自选开始，手动暂停或完成。记录页面训练运行时长，不是纯写字时间；草稿和勾选不会自动变成完成。</p>${own?`${timer(run)}<div class="actions">${button(run.status==='running'?'暂停计时':'继续计时',run.status==='running'?'run-pause':'run-resume',run.id,blocked()||!T.compatible(run))}${button('标记本次完成并保存','writing-run-done',taskId,blocked()||!T.compatible(run))}${button('结束但未完成','writing-run-end',taskId,busy)}</div>${!T.compatible(run)?'<p>任务内容已变更，请结束旧记录后另开一次。</p>':''}`:`<div class="actions">${button('开始记录本次用时','writing-run-start',taskId,blocked()||state().runs.length>=500)}${link('查看用时与完成记录','#training')}</div>`}<p class="stat-foot">后台或未暂停关闭页面时计时仍会按经过时间恢复；站内离开该任务会自动暂停。完成只表示你手动结束本次，不代表官方评分。</p></section>`;
    }
    function finalizeIfNeeded() { if(archive())return true;return false; }
    async function handle(action,id) {
      if(!['run-start','run-pause','run-resume','run-submit','run-next','run-skip','run-end','run-choose','writing-run-start','writing-run-done','writing-run-end','run-history-prev','run-history-next'].includes(action))return false;
      if(action.startsWith('run-history-')){historyPage=Math.max(0,historyPage+(action.endsWith('prev')?-1:1));render();return true;}
      const run=state().activeRun;
      if(action==='run-choose'){if(run?.kind==='choice'&&run.status==='running'&&!blocked()&&T.compatible(run)&&!run.responses[run.cursor]){choices.set(run.id+':'+run.cursor,Number(id));render();}return true;}
      if(busy)return true;
      if(getError()){notify('本机保存受限，请先导出本页副本并处理保存提示。');return true;}
      const originHash=location.hash, originState=state(), originNavigation=navigationVersion;
      busy=true;message='';
      try {
        const now=Date.now();
        if(action==='run-start'){
          if(run)throw Error('请先结束或继续已有训练。');if(state().runs.length>=500)throw Error('已有500组记录，请先备份并整理，不会自动删除。');
          const paperId=id?.startsWith('paper:')?id.slice(6):null;let ids=paperId?P.get(paperId)?.sections.flatMap(s=>s.questionIds):id?id.split(','):pool().slice(0,count).map(q=>q.id);const minutes=Number(budget);
          if(!Number.isInteger(minutes)||minutes<1||minutes>240)throw Error('请填写1至240的整数分钟预算。');
          if(!id&&(!Number.isInteger(count)||count<1||count>20||pool().length<count))throw Error('题数应为1至20且不超过当前可选题数。');
          let freshId=newId(),suffix=0;while(state().runs.some(r=>r.id===freshId))freshId=newId()+'-'+(++suffix);
          const nextRun=paperId?P.newRun({paperId,nonce:freshId,now,budgetSeconds:minutes*60}):T.newChoice({id:freshId,now,ids,budgetSeconds:minutes*60});
          if(state().runs.some(r=>r.id===nextRun.id))throw Error('训练记录标识冲突，请重新开始。');
          state().activeRun=nextRun;const startedRun=state().activeRun;const ok=await commit();if(ok&&state()===originState&&state().activeRun?.id===startedRun.id&&navigationVersion===originNavigation&&location.hash===originHash)location.hash=routeFor(startedRun);
        } else if(action==='writing-run-start'){
          if(run)throw Error('已有其他计时训练，请先处理。');if(state().runs.length>=500)throw Error('已达500组，请先备份并整理。');state().activeRun=T.newWriting({id:newId(),now,taskId:id});await commit();
        } else if(run){
          if(action==='run-pause')T.pause(run,now);
          if(action==='run-resume')T.resume(run,now);
          if(action==='run-submit'&&run.kind==='choice'){
            const choice=choices.get(run.id+':'+run.cursor), proposedRun=JSON.parse(JSON.stringify(run)), result=T.submit(proposedRun,choice,now);
            if(result.accepted){const capacity=canRecordAttempt?canRecordAttempt(result,proposedRun):{ok:true};if(!capacity.ok)throw Error(capacity.reason);Object.assign(run,proposedRun);recordAttempt(result);}
            else {Object.assign(run,proposedRun);if(!T.isTerminal(run))message='未接受重复、暂停或超时的提交。';}
          }
          if(action==='run-next')T.advance(run,now,{skip:false});
          if(action==='run-skip')T.advance(run,now,{skip:true});
          if(action==='run-end'){
            const question=run.kind==='writing'?'结束这次写作计时但不标记完成？草稿会保留。':'结束并保存本次记录？未提交题保持未提交，不算错误。';
            const timing='确认弹窗停留时间继续计入运行计时；已暂停则不计。'+(run.kind==='choice'?'若预算已到，将按到时结束记录。':'');
            if(!confirm(question+'\n'+timing))return true;
            // Native confirmation can block the event loop for a long time.
            // Settle at confirmation completion, never at the earlier click.
            T.finish(run,Date.now(),{completed:false,draftChars:run.kind==='writing'?[...(state().drafts[run.taskId]||'').replace(/\s/g,'')].length:0,reason:'early'});
          }
          if(action==='writing-run-done'||action==='writing-run-end'){
            if(run.kind!=='writing'||run.taskId!==id)throw Error('不是当前正在记录的写作任务。');
            if(action==='writing-run-done'&&!T.compatible(run))throw Error('任务内容已变更，请结束旧记录，不将新版任务标记为旧版完成。');
            T.finish(run,now,{completed:action==='writing-run-done',draftChars:[...(state().drafts[id]||'').replace(/\s/g,'')].length,reason:'early'});
          }
          const finished=finalizeIfNeeded();const ok=await commit();if(ok&&finished&&run.kind==='choice'&&state()===originState&&navigationVersion===originNavigation&&location.hash===originHash)location.hash='#training/run/'+run.id;
        }
      }catch(e){message=e.message;notify(e.message);}finally{busy=false;render();}
      return true;
    }
    function change(t) {
      if(!['run-module','run-mode','run-count','run-budget'].includes(t.id))return false;
      if(t.id==='run-module')module=t.value;if(t.id==='run-mode')mode=t.value;if(t.id==='run-count')count=Number(t.value);if(t.id==='run-budget')budget=t.value;
      if(t.id==='run-module'||t.id==='run-mode'){count=Math.max(1,Math.min(count,pool().length||1));render();}return true;
    }
    async function routeChanged(hash) {
      navigationVersion++;
      if(getError()){suspendForStorageError();return;}
      const run=state().activeRun;if(!run||run.status!=='running')return;
      if(hash!==routeFor(run)||!T.compatible(run)){T.pause(run,Date.now());finalizeIfNeeded();await commit();}
      else { const p=projected(run);if(T.isTerminal(p)||p.status!==run.status||p.clockIssue!==run.clockIssue){T.settle(run,Date.now());finalizeIfNeeded();await commit();} }
    }
    function tick() {
      if(getError()){suspendForStorageError();return;}
      const run=state().activeRun;if(!run)return;
      const p=projected(run);
      for(const el of document.querySelectorAll('[data-run-elapsed]'))el.textContent=time(p.elapsedMs);
      for(const el of document.querySelectorAll('[data-run-remaining]'))el.textContent='剩余 '+time(Math.max(0,p.budgetMs-p.elapsedMs));
      for(const el of document.querySelectorAll('[data-run-status]'))el.textContent=statusName(p);
      if(run.status==='running'&&(T.isTerminal(p)||p.status!==run.status||p.clockIssue!==run.clockIssue)){
        const reference=state(),nav=navigationVersion,hash=location.hash;T.settle(run,Date.now());const id=run.id,finished=finalizeIfNeeded();commit().then(ok=>{if(state()!==reference||navigationVersion!==nav||location.hash!==hash)return;if(ok&&finished&&hash==='#quiz/timed/'+id)location.hash='#training/run/'+id;else render();});
      }
    }
    function suspendForStorageError(){const run=state().activeRun;if(run&&run.status==="running"){run.status="paused";run.anchorMs=null;run.clockIssue="gap";}}
    return {page,quizPage,writingPanel,handle,change,routeChanged,tick,suspendForStorageError,resetView(){choices.clear();message="";historyPage=0;}};
  }
  window.STUDY_TRAINING_UI={create};
})();
