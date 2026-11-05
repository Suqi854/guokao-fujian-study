"use strict";
(() => {
  const M=window.LONG_MOCK_MODEL,doc=window.document,$=s=>doc.querySelector(s);
  const node=(tag,text)=>{const e=doc.createElement(tag);if(text!==undefined)e.textContent=text;return e;};
  let selected='',offset=0,alive=true,importTicket=0;
  const repo=window.LONG_MOCK_STORE.create({onChange:()=>{if(alive)sync();}});
  const say=text=>$('#status').textContent=text;
  const current=()=>repo.snapshot()?.sessions.find(r=>r.id===selected);
  const download=(data,name)=>{const raw=typeof data==='string'?data:JSON.stringify(data);const url=URL.createObjectURL(new Blob([raw],{type:'application/json;charset=utf-8'}));const a=node('a');a.href=url;a.download=name+'-'+new Date().toISOString().slice(0,10)+'.json';doc.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  const savedText='已保存到本机。本页记录不含主站学习记录或私人题库。';
  function sync(){
    const blocked=repo.busy||!!repo.error||!repo.snapshot();
    for(const e of doc.querySelectorAll('#create input,#create button,#builder [data-preset],#fixed-papers input,#fixed-papers button,#resume,#pause,#finish,#question input,#question button,#prev,#next,#next-unanswered,#sections button,#import'))e.disabled=blocked;
    $('#reload').disabled=repo.busy;$('#export').disabled=!repo.snapshot();$('#export').textContent=repo.hasDraft||repo.busy||repo.error?'导出已保存记录（不含待提交）':'导出已保存长题组备份';$('#emergency').disabled=!repo.pageCopy()&&repo.raw===null;
    const r=current();if(r){const end=M.terminal(r);$('#resume').disabled=blocked||end||r.status==='running'||M.compatibility(r).length>0;$('#pause').disabled=blocked||r.status!=='running';$('#finish').disabled=blocked||end;
      for(const e of doc.querySelectorAll('#question input,#question button'))e.disabled=blocked||r.status!=='running'||end||M.compatibility(r).length>0;
    }
    if(repo.error)say(repo.error);else if(repo.busy)say('改动已写入待保存日志，正在核对并提交。请等待“已保存”。');
  }
  async function commit(next){const result=await repo.save(next);if(!alive)return result;if(result.ok){say(savedText);render();}else{renderPending();sync();}return result;}
  async function act(op){try{const state=repo.snapshot(),i=state.sessions.findIndex(r=>r.id===selected);if(i<0)return;state.sessions[i]=M.action(state.sessions[i],op,Date.now());await commit(state);}catch(e){say(e.message);render();}}
  function renderPending(){const box=$('#pending-list');box.replaceChildren();const ps=repo.pendings();$('#pending-panel').hidden=!ps.length;for(const p of ps){const row=node('div');row.append(node('p',p.valid?(p.committed?'已提交但尚未清理的日志：':'待保存分支：')+p.id:'损坏的待保存日志，原文仍保留。'));const exp=node('button',p.valid?'导出这份待保存记录':'导出日志原文');exp.onclick=()=>{download(p.valid?M.backup(p.next,Date.now()):p.raw,'zhixu-long-mock-pending');say('已生成待保存副本，请确认浏览器实际保存文件。');};row.append(exp);if(p.valid){const b=node('button','尝试恢复这份');b.disabled=repo.busy||!window.navigator.locks?.request;b.onclick=async()=>{if(!window.confirm('仅在原版本未变化时恢复；不会覆盖其他标签的新记录。继续？'))return;const r=await repo.recover(p.key);if(r.ok){say(savedText);render();}else{renderPending();sync();}};row.append(b);}box.append(row);}}
  function render(){
    const state=repo.snapshot(),history=$('#history');history.replaceChildren();
    if(!state){$('#reader').hidden=true;sync();renderPending();return;}
    for(const r of [...state.sessions].reverse()){const s=M.summary(r).total;const b=node('button',`${r.title} · ${s.planned}题 · 已做${s.answered}/未做${s.unanswered} · ${{paused:'暂停',running:'计时中',finished:'已交卷',timeout:'到时'}[r.status]}`);b.onclick=()=>{selected=r.id;render();};history.append(b);}
    if(!state.sessions.length)history.append(node('p','暂无本页记录。'));
    const r=current();$('#reader').hidden=!r;
    if(r){$('#run-title').textContent=r.title;$('#run-meta').textContent=`原创训练记录 · 非官方 · ${M.summary(r).total.planned}题 · 总预算${r.budgetMs/60000}分钟（自选）`;renderSections(r);renderQuestion(r);renderClock();}
    renderPending();sync();
  }
  function renderSections(r){const holder=$('#sections');holder.replaceChildren();const result=M.summary(r),report=$('#report');report.replaceChildren();r.sections.forEach((s,index)=>{const count=result.sections[index];const b=node('button',`${s.name} ${count.answered}/${count.planned}，未做${count.unanswered}`);b.classList.toggle('selected',index===r.section);b.onclick=()=>act({type:'navigate',section:index,cursor:s.cursor});holder.append(b);});
    if(M.terminal(r)){const s=result.total;report.append(node('h3','训练结果（题数，不是分数）'),node('p',`共${s.planned}题：答对${s.correct}，答错${s.wrong}，未做${s.unanswered}。未做单列，不计作答错。`));for(const row of result.sections)report.append(node('p',`${row.name}：对${row.correct} / 错${row.wrong} / 未做${row.unanswered}；运行${Math.round(row.elapsedMs/1000)}秒。`));report.append(node('p','模块用时含阅读、切换前停留与未暂停离开的时间；不是纯答题用时。不根据少量题目推断能力等级。'));
      const weak=result.sections.filter(s=>s.wrong>0);if(weak.length)report.append(node('p','复习线索：先回看'+weak.map(s=>s.name+'错'+s.wrong+'题').join('、')+'的解析与对应讲义，再换题验证；未做题可能是时间或取舍，不直接判薄弱。'));
    }
  }
  function renderQuestion(r){const target=$('#question');target.replaceChildren();const s=r.sections[r.section],item=s.items[s.cursor],q=window.STUDY_CONTENT.questions.find(q=>q.id===item.qid),missing=M.compatibility(r);
    target.append(node('h3',`${s.name} · 第${s.cursor+1}/${s.items.length}题 · ${item.qid}`));
    if(missing.length){target.append(node('p',`有${missing.length}题缺失或版本变化。保留原记录和统计，可导出或交卷；不能错配继续作答。请使用匹配内容版本恢复，不要把私人题包导入这里。`));return;}
    if(q.materialId){const m=window.STUDY_CONTENT.questionMaterials[q.materialId];target.append(node('h4',m.title),node('p',m.note));for(const t of m.tables){const wrap=node('div');wrap.className='table-wrap';const table=node('table');table.append(node('caption',t.caption));const head=node('thead'),hr=node('tr');t.columns.forEach(c=>{const th=node('th',c);th.scope='col';hr.append(th);});head.append(hr);table.append(head);const body=node('tbody');t.rows.forEach(row=>{const tr=node('tr');row.forEach((cell,i)=>{const c=node(i?'td':'th',String(cell));if(!i)c.scope='row';tr.append(c);});body.append(tr);});table.append(body);wrap.append(table);target.append(wrap);}}
    target.append(node('p',q.stem));const group=node('fieldset');group.append(node('legend',M.terminal(r)?'你的作答':'选项（更改即保存，交卷后看解析）'));q.options.forEach((text,i)=>{const label=node('label'),input=node('input');input.type='radio';input.name='long-answer';input.checked=item.choice===i;input.value=String(i);input.onchange=()=>act({type:'answer',choice:i});label.append(input,node('span',String.fromCharCode(65+i)+'. '+text));group.append(label);});target.append(group);
    if(!M.terminal(r)){const clear=node('button','标为未做');clear.onclick=()=>act({type:'answer',choice:null});target.append(clear);}else{const detail=node('details');detail.append(node('summary','查看本题原创解析'),node('p','参考答案：'+String.fromCharCode(65+item.answer)),node('p',q.explanation));q.optionReviews?.forEach((text,i)=>detail.append(node('p',String.fromCharCode(65+i)+'：'+text)));const a=node('a','回看对应讲义');a.href='./index.html#lesson/'+encodeURIComponent(item.lesson);detail.append(a);target.append(detail);}
  }
  function renderClock(){const r=current();if(!r)return;const settled=M.settle(r,Date.now()),remain=Math.max(0,r.budgetMs-settled.elapsedMs);$('#clock').textContent=`剩余 ${Math.floor(remain/60000)}:${String(Math.floor(remain/1000)%60).padStart(2,'0')} · ${{paused:'已暂停',running:'计时中',finished:'已交卷',timeout:'已到时'}[settled.status]}${settled.clockIssue?' · 时钟异常，请核对设备时间':''}`;}
  async function tick(){renderClock();if(repo.busy||repo.error)return;const state=repo.snapshot();const index=state?.sessions.findIndex(r=>r.status==='running');if(index===undefined||index<0)return;const r=M.settle(state.sessions[index],Date.now());if(r.status!=='running'){state.sessions[index]=r;await commit(state);}}
  function navigate(delta){const r=current();if(!r)return;let si=r.section,ci=r.sections[si].cursor+delta;if(ci<0&&si>0){si--;ci=r.sections[si].items.length-1;}else if(ci>=r.sections[si].items.length&&si<r.sections.length-1){si++;ci=0;}ci=Math.max(0,Math.min(r.sections[si].items.length-1,ci));act({type:'navigate',section:si,cursor:ci});}
  $('#prev').onclick=()=>navigate(-1);$('#next').onclick=()=>navigate(1);
  $('#next-unanswered').onclick=()=>{const r=current();if(!r)return;const list=r.sections.flatMap((s,section)=>s.items.map((q,cursor)=>({section,cursor,q}))),pos=list.findIndex(x=>x.section===r.section&&x.cursor===r.sections[r.section].cursor);for(let n=1;n<=list.length;n++){const next=list[(pos+n)%list.length];if(next.q.choice===null){act({type:'navigate',section:next.section,cursor:next.cursor});return;}}say('本组没有未做题。');};
  $('#resume').onclick=()=>{if(repo.snapshot().sessions.some(r=>r.status==='running'&&r.id!==selected)){say('请先暂停正在计时的另一组。');return;}act({type:'resume'});};$('#pause').onclick=()=>act({type:'pause'});
  $('#finish').onclick=()=>{const r=current();if(r&&window.confirm(`当前未做${M.summary(r).total.unanswered}题。交卷后不可改答，确认结束？`))act({type:'finish'});};
  $('#export').onclick=()=>{try{const pending=repo.hasDraft||repo.busy||!!repo.error;download(M.backup(repo.snapshot(),Date.now()),pending?'zhixu-long-mock-saved-only-backup':'zhixu-long-mock-backup');say(pending?'仅导出已保存主记录，不含待提交或仅在本页的最新改动。请勿关闭当前页，另导出应急页副本及需要的待保存日志；没有自动丢弃或合并。':'已生成已保存长题组备份（导出副本的计时暂停，当前训练不变）。请确认浏览器实际保存；不含主站学习记录或私人题库。');}catch(e){say(e.message);}};
  $('#emergency').onclick=()=>{try{const page=repo.pageCopy();if(page){try{download(M.backup(page,Date.now()),'zhixu-long-mock-page-copy');}catch(e){download(page,'zhixu-long-mock-page-raw');say('已生成未截断的应急原文。此文件可能超过本页恢复限制，不能当作已验证的可导入备份；请保留文件及本机原记录。');return;}}else if(repo.raw!==null)download(repo.raw,'zhixu-long-mock-raw-damaged');say('已生成应急页副本，不保证是其他标签的最新内容。与本机同编号记录冲突时不会自动恢复，请保留两份。');}catch(e){say('应急导出失败：'+e.message);}};
  $('#reload').onclick=()=>{if((repo.error||repo.hasDraft)&&!window.confirm('重新载入会放弃仅在本页的改动；待保存日志仍保留。已导出应急副本后继续？'))return;repo.read();if(!repo.error)say('已重新载入。请检查待保存副本后再继续。');render();};
  $('#import').onchange=async()=>{const f=$('#import').files[0],ticket=++importTicket;$('#import').value='';if(!f)return;try{if(f.size>M.LIMITS.bytes)throw Error('文件超过2 MiB。');const text=await f.text();if(!alive||ticket!==importTicket)return;const prepared=M.prepareImport(text,repo.snapshot(),{copyConflicts:$('#copy-conflicts').checked,newId:()=>window.crypto.randomUUID()});if(!window.confirm(`追加${prepared.added}组，跳过${prepared.skipped}组；${prepared.missing}道题版本缺失或变化，不能续答。已有记录不替换。确认恢复？`))return;if(prepared.added)await commit(prepared.state);else say('没有需要追加的记录。');}catch(e){say('恢复失败，原记录未变：'+e.message);}};
  const inputs=$('#module-inputs');for(const m of M.modules()){const l=node('label',m.name+'（可用'+m.available+'题）'),i=node('input');i.type='number';i.min='0';i.max=String(m.available);i.step='1';i.value=['福建专题','申论方法'].includes(m.name)?'0':'10';i.dataset.module=m.name;l.append(i);inputs.append(l);}
  $('#scope').textContent=`当前公开题库${window.STUDY_CONTENT.questions.length}题均为原创。本候选可用${M.pool().length}题；图形题尚未接入本页，未计入可选范围。现有内容不足以代表完整考试范围，也未按真实题型比例或难度标定。新增空间题为文字/坐标模型，不代表图示视觉训练。申论方法模块仅为选择辨析辅助，不替代主观写作，也不是行测标准模块；便捷60题方案默认不选该模块。`;
  for(const b of doc.querySelectorAll('[data-preset]'))b.onclick=()=>{offset=Number(b.dataset.preset);$('#title').value='原创60题长题组 '+({0:'A',10:'B',20:'C'}[offset]);for(const i of inputs.querySelectorAll('input'))i.value=['福建专题','申论方法'].includes(i.dataset.module)?'0':'10';say('已填入便捷配置。总预算仍由你设置；建立后可在各模块中作答。');};
  function hasRunning(state){return state.sessions.some(r=>r.status==='running');}
  async function createFixed(paperId){
    if(repo.busy||repo.error||!repo.snapshot()){say('当前记录尚不可安全编辑，请等待保存或先处理提示。');return;}
    try{
      const state=repo.snapshot();
      if(hasRunning(state))throw Error('请先暂停正在计时的题组并确认已保存，再建立另一组，避免切走后继续计时。');
      if(state.sessions.length>=M.LIMITS.sessions)throw Error('已达100组，不会自动删除历史。请先导出。');
      const minutes=Number($('#fixed-minutes').value);
      if(!Number.isSafeInteger(minutes)||minutes<1||minutes>M.LIMITS.minutes)throw Error('请先明确设置固定卷1–480分钟自选预算；不是官方考试时长。');
      if(!window.FULL_PAPER_ADAPTER?.createRun)throw Error('固定训练卷组件未加载，现有题组与备份仍保留。');
      const run=window.FULL_PAPER_ADAPTER.createRun(paperId,{id:window.crypto.randomUUID(),minutes,now:Date.now()});
      if(!window.confirm(`${run.title}：120道已有原创题，自选预算${minutes}分钟；非官方、非真题、无官方分值。建立后初始暂停，计入本页记录容量。确认建立？`)){say('已取消建立，已有记录未变。');return;}
      state.sessions.push(run);const result=await commit(state);
      if(result.ok){selected=run.id;render();}
    }catch(e){say('未建立固定卷：'+e.message);}
  }
  const fixedList=$('#fixed-paper-list');
  if(window.FULL_TRAINING_PAPERS?.papers?.length&&window.FULL_PAPER_ADAPTER?.createRun){
    for(const paper of window.FULL_TRAINING_PAPERS.papers){const b=node('button','建立'+paper.title+'（初始暂停）');b.type='button';b.dataset.fixedPaper=paper.id;b.onclick=()=>createFixed(paper.id);fixedList.append(b);}
  }else fixedList.append(node('p','固定训练卷组件未加载；可继续使用原有60题配置、自组训练与独立备份。'));
  $('#create').onsubmit=async e=>{e.preventDefault();try{if(repo.busy||repo.error||!repo.snapshot())return;const state=repo.snapshot();if(hasRunning(state))throw Error('请先暂停正在计时的题组并确认已保存，再建立另一组，避免切走后继续计时。');if(state.sessions.length>=M.LIMITS.sessions)throw Error('已达100组，不会自动删除历史。请先导出。');const requests=[...inputs.querySelectorAll('input')].filter(i=>Number(i.value)>0).map(i=>({module:i.dataset.module,count:Number(i.value)}));const run=M.build({id:window.crypto.randomUUID(),title:$('#title').value,minutes:Number($('#minutes').value),requests,now:Date.now(),offset});state.sessions.push(run);const result=await commit(state);if(result.ok){selected=run.id;render();}}catch(e){say(e.message);}};
  window.addEventListener('beforeunload',e=>{if(repo.busy||repo.hasDraft){e.preventDefault();e.returnValue='';}});
  window.addEventListener('pageshow',()=>{if(alive){tick();render();}});
  // No unload mutation is required: each accepted interaction has a synchronous journal.
  // A timer uses its last durable wall-clock anchor even after refresh/close.
  repo.read();if(!repo.error)say(savedText);const initialSessions=repo.snapshot()?.sessions||[];selected=initialSessions.find(r=>r.status==='running')?.id||initialSessions.filter(r=>!M.terminal(r)).at(-1)?.id||initialSessions.at(-1)?.id||'';render();tick();setInterval(tick,1000);
  window.LONG_MOCK_WORKSPACE={repo,render};
})();
