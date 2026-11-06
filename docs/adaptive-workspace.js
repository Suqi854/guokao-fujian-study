"use strict";
// Renderer-owned templates only. The evidence module and progress snapshot remain read-only.
(() => {
  function create({C,T,A,esc,btn,heading,getState,getError,isSaving}) {
    const outcome=e=>e.outcome==='correct'?'当时答对':e.outcome==='wrong'?'当时答错':e.outcome==='current-key-match'?'与当前答案相符（历史版本未记录）':e.outcome==='current-key-mismatch'?'与当前答案不符（历史版本未记录）':e.reach==='not-reached'?'尚未进入，未提交':'看过或跳过，未提交';
    const date=at=>new Date(at).toLocaleString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false});
    function page(parts=[]) {
      if(!A?.derive)return heading('LOCAL EVIDENCE','薄弱点线索','分析模块尚未就绪，原学习记录没有改变。');
      let report;
      try { report=A.derive({content:C,state:getState(),signature:T.signature,now:Date.now(),timeZone:'Asia/Shanghai'}); }
      catch { return heading('LOCAL EVIDENCE','薄弱点线索','这次无法核对记录，未生成建议，也没有改写记录。')+btn('返回训练记录','#training'); }
      const selectedLesson=parts[1]==='lesson'?parts[2]:null;
      const modules=C.categories.filter(m=>m!=='全部'&&C.questions.some(q=>q.meta.module===m));
      const module=modules.includes(parts[1])?parts[1]:null;
      let rows=report.rows.filter(r=>(!module||r.module===module)&&(!selectedLesson||r.lessonId===selectedLesson));
      const total=rows.length,all=parts[2]==='all',events=new Map(report.events.map(e=>[e.ref,e]));
      rows=rows.slice(0,all||selectedLesson?rows.length:12);
      const baselineReport=selectedLesson?{...report,rows:report.rows.filter(row=>row.lessonId===selectedLesson)}:report;
      const baseline=A.baseline(baselineReport,{module,limit:12});
      const changed=Boolean(getError()||isSaving());
      const cards=rows.map(row=>{
        const plan=A.recommend(report,{lessonId:row.lessonId,limit:6});
        const historyOnly=!row.wrongIds.length&&row.historicalMismatchIds.length>0;
        const steps=plan.steps.map(step=>{
          const label=historyOnly&&step.kind==='review'?'复核历史不匹配题；当时题目版本未记录，不直接当作可靠错题':step.label;
          const href=step.kind==='transfer'&&step.ids.length?'#training/ids/'+step.ids.join(','):step.href;
          return `<li><p>${esc(label)}</p>${href?btn(step.kind==='read'?'读讲义':step.kind==='transfer'?'用固定题组检验':'打开这些题',href,true):''}</li>`;
        }).join('');
        const evidence=row.evidenceRefs.slice(-12).map(ref=>events.get(ref)).filter(Boolean);
        return `<section class="panel diagnostic-card" data-diagnostic-lesson="${esc(row.lessonId)}"><span class="pill gray">${esc(row.module)} · ${esc(row.label)}</span><h2>${esc(row.title)}</h2><p class="diagnostic-counts">当前版本记录：不同题 ${row.counts.distinct} 道，对 ${row.counts.correct} 道，错 ${row.counts.wrong} 道，分布 ${row.counts.days} 个作答日。</p><p class="diagnostic-groups">覆盖 ${row.counts.groups} 个题/条件组，其中 ${row.counts.wrongGroups} 组有答错；同组多个设问不增加观察组数。</p><p class="stat-foot">另有未提交 ${row.counts.unsubmitted} 次（其中尚未进入 ${row.counts.notReached} 次） · 版本或时间依据不足 ${row.counts.uncertain} 道 · 本站同知识点 ${row.counts.pool} 题 / ${row.counts.poolGroups} 个题/条件组</p><ul>${row.reasons.map(reason=>`<li>${esc(reason)}</li>`).join('')}</ul><details><summary>按这几步复盘与练习</summary><ol>${steps}</ol><p class="stat-foot">${esc(plan.notice)}</p></details><details><summary>核对作答依据 · 最近最多12条</summary>${evidence.length?`<ol>${evidence.map(e=>`<li>${esc(e.qid.toUpperCase())} · ${esc(date(e.at))}（北京时间） · ${esc(outcome(e))}<br><small>${esc(e.ref)}${e.version!=='current'?' · 版本不可比':''}${e.clockIssue?' · 时钟待核':''}</small></li>`).join('')}</ol>`:'<p>尚无可展示的作答依据，未做不等于薄弱。</p>'}</details></section>`;
      }).join('');
      const writing=report.writing.filter(w=>w.hasDraft||w.manualCompletedCount>0).slice(0,6);
      return heading('LOCAL EVIDENCE','薄弱点线索','用本机记录解释下一步，不把少量练习当能力或分数预测。')+
        `${changed?'<p class="storage-alert" role="status">本页含尚未确认保存的记录，只是当前页面的建议；请先确认保存或导出本页副本。</p>':''}<section class="panel"><p>${esc(report.notice)}</p><div class="actions">${btn('全部知识点','#diagnostics/all',!module&&!selectedLesson)}${modules.map(m=>btn(m,'#diagnostics/'+encodeURIComponent(m),module!==m)).join('')}</div><p class="stat-foot">共 ${total} 个知识点，显示 ${rows.length} 个；优先显示已有复核线索。观察日按北京时间，计时组结束后才纳入。</p><div class="actions">${baseline.href?btn('先做一组建立记录 · '+baseline.selectedIds.length+'题',baseline.href):'<p>所选范围暂无未接触的其他题/条件组，可到题库做同组变式或自主重练。</p>'}${btn('自主选择题目','#bank',true)}${btn('训练记录与复盘','#training',true)}</div><p class="stat-foot">${esc(baseline.notice)}</p></section><details class="panel"><summary>规则、旧记录与时间边界</summary><p>最近${report.rule.windowDays}天、同一题目版本，至少${report.rule.minDistinct}道不同题且${report.rule.minGroups}个题/条件组、${report.rule.minDays}个作答日才作本轮观察；达到观察门槛后，最近答错至少${report.rule.minWrong}道且涉及${report.rule.minWrongGroups}个组才建议优先复核。这些是透明的产品规则，不是官方标准、统计显著性或经验证的能力阈值。</p><p>新版普通刷题提交会保存题目版本与当时答案，版本一致且时间正常时可纳入观察；计时组仍须结束后才纳入。旧逐题记录没有当时的题目版本，只列历史线索，不会按现在的内容补造。重复同题不增加不同题数；共用材料或条件只计一个观察组，同组多个错题也只计一个错误组。未标注关联的题暂按单题一组，不代表统计独立；重做答对仍须其他题/条件组检验，同组未答题只能作同组变式。未提交与答错分开，未进入不等于不会做。用时含阅读和可能的后台停留，不贴“速度差”或“粗心”标签。</p><p>计划只在你选择后开题，不自动改写记录、安排提醒或上传个人数据。另一天复测是建议，目前没有自动保存计划或前后得分比较。</p></details><div class="stack">${cards||'<section class="panel"><h2>这个范围暂无题目</h2><p>可调整模块或回到题库，不生成虚假的薄弱结论。</p></section>'}</div>${total>rows.length?`<div class="actions">${btn('显示这个模块的全部知识点','#diagnostics/'+encodeURIComponent(module||'all')+'/all',true)}</div>`:''}<section class="panel"><h2>申论先看流程，不自动评分</h2><p>草稿、勾选和手动完成只是过程记录，不能据此判断材料能力或得分。未勾选不等于答案缺点；建议选一处材料依据或表达，完成二稿再自查。</p>${writing.map(w=>`<article class="diagnostic-writing"><h3>${esc(w.title)}</h3><p>${w.hasDraft?'已有草稿':'未留草稿'} · 自查 ${w.checkedCount}/${w.checkpointCount} 项 · 手动完成 ${w.manualCompletedCount} 次</p><p>${esc(w.advice)}</p>${btn('回到材料与改写指导','#write/'+w.taskId,true)}</article>`).join('')||'<p>尚无写作过程记录，可以先选一个任务独立作答。</p>'}${btn('打开申论写作','#writing',true)}</section>`;
    }
    return Object.freeze({page});
  }
  window.STUDY_ADAPTIVE_UI=Object.freeze({create});
})();
