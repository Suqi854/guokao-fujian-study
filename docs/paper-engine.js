'use strict';
// Pure adapter for existing v2 runs. No new storage keys, network, telemetry, timers or implicit writes.
(() => {
  const D=window.STUDY_PAPER_CATALOG,C=window.STUDY_CONTENT,T=window.STUDY_TRAINING;
  if(!D||!C||!T)throw Error('请先加载公共题库、计时模型和短卷目录。');
  const get=id=>D.papers.find(p=>p.id===id);
  const ids=p=>p.sections.flatMap(s=>s.questionIds);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const blank=()=>({planned:0,submitted:0,correct:0,wrong:0,unsubmitted:0,spentMs:0});
  function checked(raw){return T.validate(T.isTerminal(raw)?{runs:[raw],activeRun:null}:{runs:[],activeRun:raw})[T.isTerminal(raw)?'runs':'activeRun'];}
  function validRun(raw){const result=checked(raw);return Array.isArray(result)?result[0]:result;}
  function definitionStatus(id){
    const p=get(id);if(!p)return {available:false,reason:'没有找到这套训练短卷。'};
    const qids=ids(p);if(qids.length<1||qids.length>20||new Set(qids).size!==qids.length)return {available:false,reason:'短卷题序无效或超过现有20题上限。'};
    for(const id of qids){const q=C.questions.find(q=>q.id===id),v=D.questionVersions[id];
      if(!q||!v||T.signature(q)!==v.signature||q.answer!==v.answer||q.options.length!==v.optionCount||q.meta.module!==v.module||q.meta.type!==v.type)return {available:false,reason:'题目内容已更新，请核验后发布新的短卷修订，不沿用旧版本启动。',questionId:id};
    }
    return {available:true,reason:''};
  }
  function trainingHref(id){const status=definitionStatus(id);if(!status.available)throw Error(status.reason);return '#training/paper/'+encodeURIComponent(id);}
  function newRun({paperId,nonce,now,budgetSeconds}={}){
    const status=definitionStatus(paperId);if(!status.available)throw Error(status.reason);
    if(typeof nonce!=='string'||!/^[A-Za-z0-9_-]{1,48}$/.test(nonce))throw Error('请提供1至48位字母、数字、连字符或下划线组成的唯一记录后缀。');
    const p=get(paperId);
    return T.newChoice({id:`paper:${p.id}:r${p.revision}:${nonce}`,now,ids:ids(p),budgetSeconds});
  }
  function identify(r){
    if(r.kind!=='choice')return null;
    const p=D.papers.find(p=>r.id.startsWith(`paper:${p.id}:r${p.revision}:`));
    if(!p)return null;
    const qids=ids(p);
    if(qids.length!==r.items.length||!qids.every((id,i)=>{const v=D.questionVersions[id],item=r.items[i];return item.qid===id&&item.signature===v.signature&&item.answer===v.answer&&item.module===v.module;}))return null;
    return p;
  }
  function paperForRun(raw){return identify(validRun(raw));}
  function typeSummary(raw){
    const r=validRun(raw);if(r.kind!=='choice')throw Error('按题型复盘只适用于选择题，不自动评价申论。');
    const p=identify(r),rows=new Map();
    r.items.forEach((item,i)=>{
      const q=C.questions.find(q=>q.id===item.qid);
      const type=p?D.questionVersions[item.qid].type:q&&T.signature(q)===item.signature&&q.meta?.type?q.meta.type:'历史题型未冻结，无法确认';
      const basis=p?'paper-version-snapshot':type==='历史题型未冻结，无法确认'?'unknown':'matching-current-content';
      const key=JSON.stringify([item.module,type,basis]);if(!rows.has(key))rows.set(key,{module:item.module,type,basis,...blank()});
      const row=rows.get(key);row.planned++;row.spentMs+=r.spentMs[i];const answer=r.responses[i];
      if(answer===null)row.unsubmitted++;else{row.submitted++;row[answer.choice===item.answer?'correct':'wrong']++;}
    });
    return {paperId:p?.id||null,paperRevision:p?.revision||null,types:[...rows.values()],total:T.choiceSummary(r).total,notice:D.timingNotice};
  }
  function catalogHtml(){
    return `<section class="panel"><h1>原创方法训练短卷</h1><p>${esc(D.notice)}</p><p>各卷包含言语理解、判断推理、数量关系、资料分析各5题，不覆盖政治、常识、福建地方知识、图形推理或申论。题型比例和难度未经真实考试校准。</p><p>沿用逐题提交与即时解析；不是整卷统一交卷的考试模式。时间预算由你填写，没有官方分值。</p><div class="practice-grid">${D.papers.map(p=>{const s=definitionStatus(p.id);return `<article class="card"><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p>${s.available?`<a class="btn secondary" href="${esc(trainingHref(p.id))}">选择本卷并填写时间预算</a>`:`<p role="status">${esc(s.reason)}</p>`}</article>`;}).join('')}</div><p>${esc(D.timingNotice)}</p><p>这些题来自已有题库，练过原题会影响表现。只记录作答与用时，不预测国考或福建省考分数。</p></section>`;
  }
  function typeReviewHtml(raw){const s=typeSummary(raw),display=ms=>`${Math.floor(ms/60000)}分${String(Math.floor(ms/1000)%60).padStart(2,'0')}秒`;return `<section class="panel" data-paper-type-review><h2>按题型复盘</h2><p>${esc(s.notice)}</p><div class="practice-grid">${s.types.map(r=>`<article class="card"><h3>${esc(r.module)} · ${esc(r.type)}</h3><p>计划${r.planned} · 已提交${r.submitted} · 未提交${r.unsubmitted}</p><p>正确${r.correct} · 错误${r.wrong}</p><p>运行用时${display(r.spentMs)}</p>${r.basis==='unknown'?'<p>旧记录没有可靠题型版本，未按现行标签猜测。</p>':''}</article>`).join('')}</div><p>未提交不是答错；按整秒显示可能存在舍入差异，原始记录以毫秒核对。少量原创题不能证明题型掌握程度。</p></section>`;}
  window.STUDY_PAPERS=Object.freeze({catalog:D,get,definitionStatus,trainingHref,newRun,paperForRun,typeSummary,catalogHtml,typeReviewHtml});
})();
