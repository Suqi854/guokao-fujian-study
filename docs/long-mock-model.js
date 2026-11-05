"use strict";
// Independent candidate protocol. Never reads/writes study-v1/v2 or private-library.
(() => {
  const FORMAT = 'zhixu-long-mock-records', BACKUP = 'zhixu-long-mock-backup';
  const LIMITS = Object.freeze({questions: 200, sessions: 100, minutes: 480, bytes: 2 * 1024 * 1024});
  const MAX_STAMP = 8640000000000000;
  const BACKUP_NOTICE = '仅本页长题组记录，不含主站学习记录或私人题库；恢复后计时暂停，不自动同步。';
  const copy = x => JSON.parse(JSON.stringify(x));
  const fail = message => { throw Error(message); };
  const int = (n, a, b) => Number.isSafeInteger(n) && n >= a && n <= b;
  const obj = x => x && typeof x === 'object' && !Array.isArray(x);
  const idOK = x => typeof x === 'string' && /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/.test(x);
  const str = (x, n=120) => typeof x === 'string' && x.trim().length > 0 && x.length <= n;
  const stamp = x => int(x, 0, MAX_STAMP);
  const terminal = r => ['finished','timeout'].includes(r.status);
  const empty = () => ({format:FORMAT, version:1, revision:0, commitId:null, sessions:[]});
  const content = () => window.STUDY_CONTENT;
  const fingerprint = q => window.STUDY_TRAINING.signature(q);
  const pool = () => content().questions.filter(q => q.meta?.source?.kind === 'original' && q.meta?.rights?.status === 'original' && !q.graphic);
  const modules = () => [...new Set(pool().map(q=>q.meta.module))].map(name=>({name,available:pool().filter(q=>q.meta.module===name).length}));
  function orderModule(name) {
    const groups = new Map();
    for (const q of pool().filter(q=>q.meta.module===name)) { if (!groups.has(q.lesson)) groups.set(q.lesson,[]); groups.get(q.lesson).push(q); }
    const ordered = []; let pos = 0;
    while (ordered.length < [...groups.values()].reduce((n,a)=>n+a.length,0)) { for(const rows of groups.values()) if(rows[pos]) ordered.push(rows[pos]); pos++; }
    return ordered;
  }
  function build({id, title, requests, minutes, now, offset=0}) {
    if (!idOK(id) || !str(title) || !int(minutes,1,LIMITS.minutes) || !stamp(now) || !int(offset,0,10000)) fail('题组名称、编号、预算或时间无效。');
    if(!Array.isArray(requests)||!requests.length||requests.length>20) fail('请至少选择一个模块。');
    const used = new Set(), sections = [];
    for(const request of requests) {
      if(!obj(request)||!str(request.module)||used.has(request.module)||!int(request.count,1,LIMITS.questions)) fail('模块或题数无效，模块不可重复。');
      used.add(request.module); const available=orderModule(request.module);
      if(available.length<request.count) fail(request.module+' 可用题目不足。');
      const chosen=Array.from({length:request.count},(_,i)=>available[(offset+i)%available.length]);
      sections.push({name:request.module,cursor:0,elapsedMs:0,items:chosen.map(q=>({qid:q.id,signature:fingerprint(q),answer:q.answer,optionCount:q.options.length,choice:null,type:q.meta.type,lesson:q.lesson}))});
    }
    if(sections.reduce((n,s)=>n+s.items.length,0)>LIMITS.questions) fail('本候选单组最多200题，这是技术上限，不是考试题量。');
    return validateRun({id,title,kind:'original-custom',official:false,createdAt:now,endedAt:null,status:'paused',budgetMs:minutes*60000,anchorMs:null,elapsedMs:0,section:0,clockIssue:false,sections});
  }
  function validateRun(x) {
    if(!obj(x)||!idOK(x.id)||!str(x.title)||x.kind!=='original-custom'||x.official!==false||!stamp(x.createdAt)||!['paused','running','finished','timeout'].includes(x.status)) fail('长题组记录类型无效。');
    if(!int(x.budgetMs,60000,LIMITS.minutes*60000)||x.budgetMs%60000||!int(x.elapsedMs,0,x.budgetMs)||typeof x.clockIssue!=='boolean') fail('计时预算或累计用时无效。');
    if(x.status==='running'?!stamp(x.anchorMs):x.anchorMs!==null) fail('运行计时锚点无效。');
    if(terminal(x)?!stamp(x.endedAt):x.endedAt!==null) fail('结束时间无效。');
    if((x.status==='timeout')!==(x.elapsedMs===x.budgetMs)) fail('到时状态与用时不一致。');
    if(!Array.isArray(x.sections)||!int(x.sections.length,1,20)||!int(x.section,0,x.sections.length-1)) fail('模块或位置无效。');
    const qids=new Set(), names=new Set(); let elapsed=0;
    const sections=x.sections.map(s=>{
      if(!obj(s)||!str(s.name)||names.has(s.name)||!Array.isArray(s.items)||!int(s.items.length,1,LIMITS.questions)||!int(s.cursor,0,s.items.length-1)||!int(s.elapsedMs,0,x.budgetMs)) fail('模块记录不完整。');
      names.add(s.name); elapsed+=s.elapsedMs;
      const items=s.items.map(q=>{
        if(!obj(q)||!idOK(q.qid)||qids.has(q.qid)||!int(q.optionCount,2,20)||!int(q.answer,0,q.optionCount-1)||(q.choice!==null&&!int(q.choice,0,q.optionCount-1))||!str(q.type)||!idOK(q.lesson)||typeof q.signature!=='string'||!new RegExp('^v1:q'+q.optionCount+':[0-9a-f]{16}$').test(q.signature)) fail('题目快照或答案无效。');
        qids.add(q.qid); return {qid:q.qid,signature:q.signature,answer:q.answer,optionCount:q.optionCount,choice:q.choice,type:q.type,lesson:q.lesson};
      });
      return {name:s.name,cursor:s.cursor,elapsedMs:s.elapsedMs,items};
    });
    if(qids.size>LIMITS.questions||elapsed!==x.elapsedMs) fail('题数超限或模块用时不能对账。');
    return {id:x.id,title:x.title,kind:'original-custom',official:false,createdAt:x.createdAt,endedAt:x.endedAt,status:x.status,budgetMs:x.budgetMs,anchorMs:x.anchorMs,elapsedMs:x.elapsedMs,section:x.section,clockIssue:x.clockIssue,sections};
  }
  function validate(x) {
    if(!obj(x)||x.format!==FORMAT||x.version!==1||!int(x.revision,0,Number.MAX_SAFE_INTEGER)||(x.commitId!==null&&!idOK(x.commitId))||!Array.isArray(x.sessions)||x.sessions.length>LIMITS.sessions) fail('这不是本页的长题组记录；旧学习记录和私人题库不能在这里恢复。');
    if((x.revision===0)!==(x.commitId===null)) fail('提交版本无效。');
    const sessions=x.sessions.map(validateRun); if(new Set(sessions.map(r=>r.id)).size!==sessions.length||sessions.filter(r=>r.status==='running').length>1) fail('记录编号重复或同时运行多个计时器。');
    return {format:FORMAT,version:1,revision:x.revision,commitId:x.commitId,sessions};
  }
  function checkRaw(raw, label='记录') {
    if(typeof raw!=='string'||raw.length>LIMITS.bytes||new TextEncoder().encode(raw).length>LIMITS.bytes) fail(label+'须不超过2 MiB；原文未截断，请保留应急副本。');
    return raw;
  }
  function assertCapacity(state) {
    // Reserve the maximum legal revision/id and complete JSON envelopes. This
    // keeps every accepted state exportable after a running timer is settled.
    const projected=copy(state), id='x'.repeat(128);
    projected.revision=Number.MAX_SAFE_INTEGER;projected.commitId=id;
    for(const r of projected.sessions)if(r.status==='running'){
      r.sections[r.section].elapsedMs+=r.budgetMs-r.elapsedMs;r.elapsedMs=r.budgetMs;
      r.status='timeout';r.anchorMs=null;r.endedAt=MAX_STAMP;
    }
    const backup={format:BACKUP,version:1,exportedAt:MAX_STAMP,notice:BACKUP_NOTICE,records:projected};
    const pending={format:'zhixu-long-mock-intent',id,baseCommitId:id,next:projected};
    try{checkRaw(JSON.stringify(backup));checkRaw(JSON.stringify(pending));}
    catch(_){fail('本页记录达到2 MiB保护上限（含备份及待保存日志封套预留），未截断历史；请导出应急副本。');}
    return state;
  }
  function compatibility(r) {
    const map=new Map(content().questions.map(q=>[q.id,q]));
    return r.sections.flatMap(s=>s.items.filter(i=>{const q=map.get(i.qid);try{return !q||q.graphic||q.meta?.source?.kind!=='original'||fingerprint(q)!==i.signature||q.answer!==i.answer||q.meta.module!==s.name;}catch(_){return true;}}).map(i=>i.qid));
  }
  function settle(run,now) {
    const r=validateRun(run); if(!stamp(now))fail('当前时钟无效。');
    if(r.status!=='running')return r;
    if(now<r.anchorMs){r.status='paused';r.anchorMs=null;r.clockIssue=true;return r;}
    const delta=Math.min(now-r.anchorMs,r.budgetMs-r.elapsedMs);
    const budgetEndedAt=r.anchorMs+delta;
    r.elapsedMs+=delta;r.sections[r.section].elapsedMs+=delta;r.anchorMs=now;
    if(r.elapsedMs===r.budgetMs){r.status='timeout';r.anchorMs=null;r.endedAt=budgetEndedAt;}
    return r;
  }
  function action(run,op,now) {
    let r=settle(run,now);if(terminal(r)&&op.type!=='navigate')return r;
    if(op.type==='pause'){r.status='paused';r.anchorMs=null;}
    else if(op.type==='finish'){r.status='finished';r.anchorMs=null;r.endedAt=now;}
    else if(op.type==='resume'){if(compatibility(r).length)fail('题目缺失或版本变化，请先导出；只可查看统计或结束，不可错配续答。');r.status='running';r.anchorMs=now;}
    else if(op.type==='navigate'){
      if(!int(op.section,0,r.sections.length-1)||!int(op.cursor,0,r.sections[op.section].items.length-1))fail('目标位置无效。');
      r.section=op.section;r.sections[op.section].cursor=op.cursor;
    }else if(op.type==='answer'){
      if(r.status!=='running')fail('请先继续计时，再作答。');if(compatibility(r).length)fail('内容版本已变化，不能提交。');
      const q=r.sections[r.section].items[r.sections[r.section].cursor];
      if(op.choice!==null&&!int(op.choice,0,q.optionCount-1))fail('选项无效。');q.choice=op.choice;
    }else if(op.type!=='tick')fail('未知操作。');
    return validateRun(r);
  }
  function summary(r) {
    const sections=r.sections.map(s=>{const planned=s.items.length,answered=s.items.filter(i=>i.choice!==null).length,correct=s.items.filter(i=>i.choice!==null&&i.choice===i.answer).length;return {name:s.name,planned,answered,correct,wrong:answered-correct,unanswered:planned-answered,elapsedMs:s.elapsedMs};});
    const total=Object.fromEntries(['planned','answered','correct','wrong','unanswered','elapsedMs'].map(k=>[k,sections.reduce((n,s)=>n+s[k],0)]));
    return {sections,total};
  }
  function backup(state,now) {
    const records=validate(state);records.sessions=records.sessions.map(r=>{const settled=settle(r,now);return settled.status==='running'?action(settled,{type:'pause'},now):settled;});
    assertCapacity(records);
    const result={format:BACKUP,version:1,exportedAt:now,notice:BACKUP_NOTICE,records};
    checkRaw(JSON.stringify(result),'备份');return result;
  }
  function prepareImport(raw,current,options={}) {
    checkRaw(raw,'备份');
    const data=JSON.parse(raw);if(!obj(data)||data.format!==BACKUP||data.version!==1||!stamp(data.exportedAt))fail('请选择本页导出的长题组备份，不能混用旧学习记录或私人题库。');
    const incoming=assertCapacity(validate(data.records)),next=validate(current);let added=0,skipped=0;
    for(const run of incoming.sessions){if(run.status==='running')fail('备份中不应有运行中的计时。');const old=next.sessions.find(r=>r.id===run.id);if(old){if(JSON.stringify(old)!==JSON.stringify(run)){if(options.copyConflicts!==true||typeof options.newId!=='function')fail('同编号记录内容冲突，未恢复任何记录。请先分别导出保留。');const recovered=copy(run);recovered.id=options.newId();recovered.title=run.title.slice(0,110)+'（恢复副本）';next.sessions.push(recovered);added++;}else skipped++;}else{next.sessions.push(run);added++;}}
    return {state:assertCapacity(validate(next)),added,skipped,missing:incoming.sessions.reduce((n,r)=>n+compatibility(r).length,0)};
  }
  window.LONG_MOCK_MODEL=Object.freeze({FORMAT,BACKUP,LIMITS,copy,empty,pool,modules,build,validate,validateRun,checkRaw,assertCapacity,settle,action,summary,compatibility,terminal,backup,prepareImport});
})();
