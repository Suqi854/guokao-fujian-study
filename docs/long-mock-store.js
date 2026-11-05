"use strict";
// Write-ahead, isolated journal. Durable intent is written synchronously before Web Locks.
// Each writer has a unique journal key; conflict branches are retained, never merged/deleted.
(() => {
  const KEY='zhixu-long-mock-v1', PREFIX=KEY+':pending:', LOCK=KEY+':write';
  function create({window:w=window,onChange=()=>{}}={}) {
    const M=w.LONG_MOCK_MODEL;
    let state=null,baseline=null,cacheRaw=null,busy=false,error='',draft=null,destroyed=false;
    const uuid=()=>w.crypto.randomUUID();
    const notify=()=>{try{onChange();}catch(_){}};
    const block=message=>{error=message;notify();return {ok:false,error:message};};
    const storage=()=>w.localStorage;
    function read() {
      if(busy)return block('保存尚未结束，请稍候。');
      try{const raw=storage().getItem(KEY);cacheRaw=raw;const next=raw===null?M.empty():M.assertCapacity(M.validate(JSON.parse(M.checkRaw(raw))));state=next;baseline=raw;cacheRaw=raw;error='';draft=null;}
      catch(e){state=null;baseline=null;return block('读取失败，原记录未覆盖：'+e.message);}
      if(!w.navigator.locks?.request)block('此浏览器缺少安全写锁，当前只读。请导出后在支持 Web Locks 的 HTTPS 浏览器继续。');
      notify();return {ok:true,state:M.copy(state)};
    }
    function pendings() {
      const result=[];try{const s=storage();for(let i=0;i<s.length;i++){const key=s.key(i);if(!key?.startsWith(PREFIX))continue;const raw=s.getItem(key);try{const p=JSON.parse(M.checkRaw(raw,'待保存日志'));if(p.format!=='zhixu-long-mock-intent'||key!==PREFIX+p.id||(p.baseCommitId!==null&&(typeof p.baseCommitId!=='string'||! /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/.test(p.baseCommitId))))throw Error('日志格式无效');const next=M.assertCapacity(M.validate(p.next));if(next.commitId!==p.id)throw Error('日志编号不一致');result.push({key,id:p.id,baseCommitId:p.baseCommitId,next,raw,valid:true,committed:state?.commitId===p.id});}catch(e){result.push({key,raw,valid:false,error:e.message});}}}catch(e){block('无法读取待保存副本：'+e.message);}return result;
    }
    async function apply(p) {
      try{return await w.navigator.locks.request(LOCK,{mode:'exclusive'},()=>{
        if(destroyed)return {ok:false,error:'页面已关闭；待保存副本保留。'};
        let raw,current;try{raw=storage().getItem(KEY);current=raw===null?M.empty():M.assertCapacity(M.validate(JSON.parse(M.checkRaw(raw))));}catch(e){return block('无法核对本机记录，待保存副本保留：'+e.message);}
        if(current.commitId===p.id){state=current;baseline=raw;cacheRaw=raw;try{storage().removeItem(p.key);}catch(_){}draft=null;error='';return {ok:true,recovered:true};}
        if(current.commitId!==p.baseCommitId)return block('其他标签已更改记录。本页分支已保留，未覆盖另一标签；请先导出本页/待保存副本，再重新载入。');
        if(current.revision===Number.MAX_SAFE_INTEGER||p.next.revision!==current.revision+1)return block('版本不匹配，待保存副本保留。');
        const serialized=JSON.stringify(M.assertCapacity(M.validate(p.next)));
        try{storage().setItem(KEY,serialized);}catch(e){return block('记录保存失败（配额或权限）。待保存日志仍保留，请立即导出，不要清理网站数据：'+e.name);}
        state=M.copy(p.next);baseline=serialized;cacheRaw=serialized;draft=null;error='';
        try{storage().removeItem(p.key);}catch(_){/* Committed id deduplicates leftover journal. */}
        return {ok:true};
      });}catch(e){return block('无法获得写锁；已持久化的待保存副本保留：'+e.message);}finally{busy=false;notify();}
    }
    function save(next) {
      if(busy||destroyed||error||!state)return Promise.resolve(block(error||'当前不能保存，请先检查记录。'));
      let value;try{value=M.validate(next);}catch(e){return Promise.resolve(block(e.message));}
      draft=M.copy(value);
      if(!w.navigator.locks?.request)return Promise.resolve(block('缺少安全写锁，未保存，请导出本页副本。'));
      if(state.revision===Number.MAX_SAFE_INTEGER)return Promise.resolve(block('记录版本已达安全整数上限，原记录未改变；请导出应急副本。'));
      const id=uuid();value.revision=state.revision+1;value.commitId=id;
      try{M.assertCapacity(value);}catch(e){return Promise.resolve(block(e.message));}
      const p={format:'zhixu-long-mock-intent',id,baseCommitId:state.commitId,next:value};p.key=PREFIX+id;
      const raw=JSON.stringify({format:p.format,id,baseCommitId:p.baseCommitId,next:value});
      try{M.checkRaw(raw,'待保存日志');}catch(e){return Promise.resolve(block(e.message));}
      try{storage().setItem(p.key,raw);}catch(e){return Promise.resolve(block('未能保存待保存副本（配额或权限）。最新改动只在本页，离开前请导出应急副本：'+e.name));}
      // No await occurred before the durable journal. Browser exit during lock waiting is recoverable.
      busy=true;notify();return apply(p);
    }
    function recover(key) {
      if(busy||destroyed||!state||!w.navigator.locks?.request)return Promise.resolve(block('当前不能恢复。'));
      const p=pendings().find(p=>p.key===key&&p.valid);if(!p)return Promise.resolve(block('未找到有效待保存副本。'));
      draft=M.copy(p.next);busy=true;error='';notify();return apply(p);
    }
    function onStorage(e){if(e.key===KEY&&e.newValue!==baseline)block('其他标签的记录已变化，本页停止写入。请先导出本页副本，再重新载入；不自动合并。');}
    w.addEventListener('storage',onStorage);
    return {read,save,recover,pendings,snapshot:()=>state&&M.copy(state),pageCopy:()=>M.copy(draft||state),get raw(){return cacheRaw;},get busy(){return busy;},get error(){return error;},get hasDraft(){return !!draft;},destroy(){destroyed=true;w.removeEventListener('storage',onStorage);}};
  }
  window.LONG_MOCK_STORE=Object.freeze({KEY,PREFIX,create});
})();
