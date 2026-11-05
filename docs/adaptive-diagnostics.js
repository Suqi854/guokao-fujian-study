"use strict";
/* Read-only local study evidence. No storage, network, score prediction or AI calls.
 * Input must be the application's already validated v1/v2 snapshot.
 * Integration deliberately leaves the existing persistence schema unchanged.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.STUDY_ADAPTIVE = api;
})(typeof window === "object" ? window : globalThis, function () {
  const VERSION = "local-evidence-1";
  const DAY = 86400000;
  const RULE = Object.freeze({ windowDays: 30, minDistinct: 5, minDays: 2, minWrong: 2 });
  const terminal = new Set(["finished", "early", "timeout"]);
  const labels = Object.freeze({ unseen: "尚无作答记录", insufficient: "样本不足，先补练", review: "建议优先复核", observe: "有错误线索，继续观察", stable: "本轮记录较稳", historical: "仅有历史或未确认版本的记录" });
  const keyOf = (a) => JSON.stringify([a.qid, a.choice, a.at]);
  const median = (values) => { const a = values.slice().sort((x,y) => x-y), n=a.length; return n ? (a[Math.floor((n-1)/2)] + a[Math.floor(n/2)])/2 : null; };
  function derive({ content, state, signature, now = Date.now(), timeZone = "Asia/Shanghai" }) {
    if (!content || !Array.isArray(content.questions) || !Array.isArray(content.lessons) || !state || !Array.isArray(state.attempts)) throw new TypeError("需要内容和已校验的本机记录。");
    if (!Number.isFinite(now)) throw new TypeError("分析时间无效。");
    const date = new Intl.DateTimeFormat("en-CA", {timeZone, year:"numeric", month:"2-digit", day:"2-digit"});
    const questions = new Map(content.questions.map(q => [q.id, q]));
    const lessons = new Map(content.lessons.map(l => [l.id, l]));
    if (questions.size !== content.questions.length || lessons.size !== content.lessons.length) throw new TypeError("内容编号重复。");
    const signatures = new Map();
    const currentSignature = q => { if (!signatures.has(q.id)) signatures.set(q.id, typeof signature === "function" ? signature(q) : null); return signatures.get(q.id); };
    const events = [], mirrored = new Set(), pendingIds = new Set(), recordedIds = new Set(), omitted = { invalid:0, future:0, mirroredAttempts:0, duplicateLegacy:0, activeResponses:0 };
    let order = 0;
    const attemptsByKey = new Map();
    for (const a of state.attempts) { if (a && !attemptsByKey.has(keyOf(a))) attemptsByKey.set(keyOf(a), a); }
    const add = event => { if(event.reach==="submitted")recordedIds.add(event.qid); const ms=Date.parse(event.at); if (!Number.isFinite(ms)) {omitted.invalid++;return;} if(ms>now){omitted.future++;return;} events.push({...event, ms, order:order++}); };
    for (const run of [...(state.runs || []), ...(state.activeRun ? [state.activeRun] : [])]) {
      if (!run || run.kind !== "choice" || !Array.isArray(run.items)) continue;
      const ended = terminal.has(run.status);
      run.items.forEach((item, index) => {
        const q=questions.get(item.qid), response=run.responses?.[index];
        if(response) mirrored.add(keyOf({qid:item.qid, ...response}));
        if(!ended){ if(response)omitted.activeResponses++;pendingIds.add(item.qid);return; }
        if(!q || !lessons.has(q.lesson)){omitted.invalid++;return;}
        const fingerprint=currentSignature(q);
        const sameVersion=Boolean(fingerprint && item.signature===fingerprint && item.answer===q.answer);
        const choice = response ? response.choice : null;
        if(response && (!Number.isInteger(choice) || choice<0 || choice>19 || (sameVersion && choice>=q.options.length))){omitted.invalid++;return;}
        const matching=response && attemptsByKey.get(keyOf({qid:item.qid,...response}));
        const seconds=matching && Number.isFinite(matching.seconds) && matching.seconds>=0 ? matching.seconds : null;
        add({ref:`run:${run.id}:${index}`, source:"training", runId:run.id, qid:q.id, lessonId:q.lesson,
          at:response ? response.at : run.endedAt, choice, frozenAnswer:item.answer,
          outcome:response ? (choice===item.answer ? "correct" : "wrong") : "unsubmitted",
          reach:response ? "submitted" : index>run.cursor ? "not-reached" : "seen-but-unsubmitted",
          version:sameVersion ? "current" : "changed-or-unknown", clockIssue:run.clockIssue || "",
          submittedSeconds:seconds, pageElapsedMs:Number.isFinite(run.spentMs?.[index]) ? run.spentMs[index] : null});
      });
    }
    const legacySeen = new Set();
    state.attempts.forEach((a,index) => {
      if(!a){omitted.invalid++;return;}
      const key=keyOf(a);
      if(mirrored.has(key)){omitted.mirroredAttempts++;return;}
      if(legacySeen.has(key)){omitted.duplicateLegacy++;return;} legacySeen.add(key);
      const q=questions.get(a.qid);
      if(!q || !lessons.has(q.lesson) || !Number.isInteger(a.choice) || a.choice<0 || a.choice>=q.options.length){omitted.invalid++;return;}
      add({ref:`attempt:${index}`, source:"legacy-attempt", qid:q.id, lessonId:q.lesson, at:a.at, choice:a.choice,
        frozenAnswer:null, outcome:a.choice===q.answer ? "current-key-match" : "current-key-mismatch", reach:"submitted",
        version:"unrecorded", clockIssue:"unknown", submittedSeconds:Number.isFinite(a.seconds) && a.seconds>=0 ? a.seconds : null, pageElapsedMs:null});
    });
    events.sort((a,b) => a.ms-b.ms || a.order-b.order);
    const cutoff=now-RULE.windowDays*DAY;
    const rows=[];
    for(const lesson of content.lessons){
      const pool=content.questions.filter(q=>q.lesson===lesson.id);
      if(!pool.length)continue;
      const records=events.filter(e=>e.lessonId===lesson.id), latest=new Map();
      for(const e of records) if(e.reach==="submitted") latest.set(e.qid,e);
      const selected=[...latest.values()];
      const eligible=selected.filter(e=>e.version==="current" && !e.clockIssue && e.ms>=cutoff);
      const days=new Set(eligible.map(e=>date.format(new Date(e.ms))));
      const wrong=eligible.filter(e=>e.outcome==="wrong"), correct=eligible.filter(e=>e.outcome==="correct");
      const sufficient=eligible.length>=RULE.minDistinct && days.size>=RULE.minDays;
      const status=eligible.length ? !sufficient ? "insufficient" : wrong.length>=RULE.minWrong ? "review" : wrong.length ? "observe" : "stable" : records.length ? "historical" : "unseen";
      const uncertain=selected.filter(e=>e.version!=="current" || e.clockIssue);
      const submittedIds=new Set(records.filter(e=>e.reach==="submitted").map(e=>e.qid));
      const freshIds=pool.filter(q=>!submittedIds.has(q.id) && !recordedIds.has(q.id) && !pendingIds.has(q.id)).map(q=>q.id);
      const correctedSameIds=correct.filter(e=>records.some(old=>old.qid===e.qid && old.ms<=e.ms && old.ref!==e.ref && old.version==="current" && old.outcome==="wrong")).map(e=>e.qid);
      const evidence=eligible.map(e=>({ref:e.ref,qid:e.qid,at:e.at,outcome:e.outcome}));
      const reasons=[`最近${RULE.windowDays}天、当前题目版本的不同题：${eligible.length}道（对${correct.length}、错${wrong.length}），分布在${days.size}个作答日。`];
      if(!sufficient) reasons.push(`暂不判定薄弱：观察门槛为至少${RULE.minDistinct}道不同题、${RULE.minDays}个作答日；这只是保守展示规则，不是经验证的能力标准。`);
      if(uncertain.length)reasons.push(`${uncertain.length}道最近作答缺少可比版本或时间依据，仅作历史线索。`);
      if(correctedSameIds.length)reasons.push(`${correctedSameIds.length}道题重做后答对，仍需不同题目检验迁移，不能据此确认掌握。`);
      const unanswered=records.filter(e=>e.outcome==="unsubmitted");
      if(unanswered.length)reasons.push(`另有${unanswered.length}次训练内未提交，未计入错误；其中${unanswered.filter(e=>e.reach==="not-reached").length}次尚未进入该题。`);
      if(pool.length<RULE.minDistinct)reasons.push(`本站该知识点仅${pool.length}题，题库不足以达到观察门槛，不归因为学习能力。`);
      rows.push({lessonId:lesson.id,title:lesson.title,module:lesson.category,status,label:labels[status],reasons,
        counts:{distinct:eligible.length,correct:correct.length,wrong:wrong.length,days:days.size,unsubmitted:unanswered.length,notReached:unanswered.filter(e=>e.reach==="not-reached").length,uncertain:uncertain.length,pool:pool.length},
        wrongIds:wrong.map(e=>e.qid), historicalMismatchIds:uncertain.filter(e=>e.outcome==="current-key-mismatch").map(e=>e.qid),
        correctedSameIds, freshIds, evidence, evidenceRefs:records.map(e=>e.ref),
        timing:{submittedMedianSeconds:median(eligible.map(e=>e.submittedSeconds).filter(x=>x!==null)),count:eligible.filter(e=>e.submittedSeconds!==null).length,
          interpretation:"提交前运行秒数的描述统计，含阅读及可能的后台停留；不是纯解题速度，不用于薄弱排序。"}});
    }
    const writing=(content.writing || []).map(task=>{
      const hasDraft=typeof state.drafts?.[task.id]==="string" && Boolean(state.drafts[task.id].trim());
      const checked=[...new Set(state.checks?.[task.id] || [])].filter(i=>Number.isInteger(i)&&i>=0&&i<(task.points?.length||0));
      const completed=(state.runs||[]).filter(r=>r.kind==="writing"&&r.taskId===task.id&&r.completed===true).length;
      return {taskId:task.id,title:task.title,lessonId:task.lesson,hasDraft,checkedCount:checked.length,checkpointCount:task.points?.length||0,manualCompletedCount:completed,
        status:hasDraft ? checked.length<(task.points?.length||0) ? "self-check-pending" : "self-check-recorded" : "not-started",
        advice:hasDraft ? "逐项对照材料段号和参考要点，选一个尚未确认的要点修改二稿；勾选只代表自查声明。" : "先读材料、标注依据，再写一个任务；没有草稿不等于能力薄弱。"};
    });
    const priority={review:0,observe:1,insufficient:2,historical:3,unseen:4,stable:5};
    rows.sort((a,b)=>priority[a.status]-priority[b.status] || b.counts.wrong-a.counts.wrong || content.lessons.findIndex(l=>l.id===a.lessonId)-content.lessons.findIndex(l=>l.id===b.lessonId));
    return {version:VERSION, generatedAt:new Date(now).toISOString(), timeZone, rule:{...RULE}, rows,writing,events,omitted,
      notice:"依据本机记录的规则建议，不是AI阅卷、分数预测或能力认证；题目训练目标不代表实测难度。活动训练结束后才纳入。"};
  }
  function recommend(report, { lessonId, limit=6 }={}) {
    if(!Number.isInteger(limit)||limit<1||limit>12)throw new TypeError("每组建议1至12题。");
    const row=lessonId ? report.rows.find(r=>r.lessonId===lessonId) : report.rows[0];
    if(!row)return null;
    const wrong=row.wrongIds.length ? row.wrongIds : row.historicalMismatchIds;
    const reviewIds=wrong.slice(0,Math.min(2,limit));
    const transferIds=row.freshIds.filter(id=>!reviewIds.includes(id)).slice(0,limit-reviewIds.length);
    return {version:report.version,generatedAt:report.generatedAt,lessonId:row.lessonId,basis:row.reasons.slice(),evidence:row.evidence.slice(),
      steps:[{kind:"read",label:`回看“${row.title}”的适用条件与例题`,href:`#lesson/${encodeURIComponent(row.lessonId)}`},
        {kind:"review",label:reviewIds.length ? "回看原错题，说明排除其他选项的依据" : "暂无可确认错题，不凑造错题",ids:reviewIds,href:reviewIds.length ? `#quiz/target/${reviewIds.join(",")}` : null},
        {kind:"transfer",label:transferIds.length ? `换${transferIds.length}道尚未提交过的同知识点题验证` : "同知识点未练题不足；可自主重练，但不能替代异题检验",ids:transferIds,href:transferIds.length ? `#quiz/target/${transferIds.join(",")}` : null},
        {kind:"retest",label:"完成讲解和异题练习后，另一天再做一组；展示前后题目与结果，不宣称遗忘周期或掌握率。",ids:[],href:null}],
      selectedIds:[...reviewIds,...transferIds],notice:"建议为确定性规则；实际进入题组时仍需冻结题号和内容指纹。未经用户选择不自动开题或改写记录。"};
  }
  function baseline(report, {limit=12,module=null}={}) {
    if(!Number.isInteger(limit)||limit<1||limit>12)throw new TypeError("摸底每组1至12题。");
    const groups=new Map();
    for(const row of report.rows){
      if(module && row.module!==module)continue;
      if(!groups.has(row.module))groups.set(row.module,[]);
      groups.get(row.module).push({row,ids:row.freshIds.slice()});
    }
    // Round-robin across modules and, within each module, knowledge points.
    const queues=[...groups.entries()].map(([name,rows])=>{
      const queue=[];
      while(rows.some(r=>r.ids.length))for(const r of rows)if(r.ids.length)queue.push({qid:r.ids.shift(),lessonId:r.row.lessonId,module:name});
      return queue;
    });
    const selected=[];
    while(selected.length<limit && queues.some(q=>q.length))for(const queue of queues)if(queue.length&&selected.length<limit)selected.push(queue.shift());
    return {version:report.version,kind:"baseline",selectedIds:selected.map(x=>x.qid),selected,
      href:selected.length ? `#training/ids/${selected.map(x=>x.qid).join(",")}` : null,
      notice:"跨模块、知识点轮流选择尚未提交过的题目，仅建立少量观察记录；不是全科测评、官方模考或能力分级。题库不足时不凑数。"};
  }
  return Object.freeze({derive,recommend,baseline,VERSION,RULE});
});
