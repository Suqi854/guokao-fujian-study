"use strict";
// Full-topic reading is a view over stable lesson IDs; it never migrates records.
(() => {
 const C=window.STUDY_CONTENT,P=window.STUDY_COURSE;
 // Historic snapshot tests and older partial bundles retain their original reader.
 if(!window.STUDY_POLITICAL_CURRICULUM || !window.STUDY_POLICY_2026) return;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const lesson=id=>C.lessons.find(l=>l.id===id);
 const definitions={
 data:[
 ['growth-analysis','增长分析','增长率与增长量、排序、间隔增长、混合权重','growth rate-amount-order compound-growth mixed-growth mixed-weights'],
 ['share-analysis','比重与贡献','比重、百分点、两期结构、贡献率与拉动','share pn-share-scope growth-contribution'],
 ['average-analysis','平均数','总量与份数、两期平均数与分母','average'],
 ['estimation','估算与精度','近似、误差与选项区分','estimation-boundary'],
 ['data-materials','统计材料与口径','多表、期间、指数、分组与合成','multi-table on-period-scope fq-index-caliber t35-group-statistics']],
 reasoning:[
 ['formal-logic','形式逻辑与条件推理','充分必要、量词、复合条件、排列约束','logic quantified-logic pn-compound-logic arrangement'],
 ['definition-analysis','定义判断','要素、必要条件、连接关系与边界','definition definition-conditions'],
 ['analogy-analysis','类比推理','关系层级、方向与二次辨析','analogy'],
 ['argument-analysis','论证判断','削弱加强、因果、桥梁与必要前提','argument argument-controls on-argument-chain'],
 ['plane-figures','平面图形规律','数量属性、位置变换、叠加','figure-features rotation overlay'],
 ['spatial-figures','空间图形','展开图、视图、翻滚与截面','cube-net solid-views t35-spatial-transform']],
 verbal:[
 ['context-words','逻辑填空','语境、搭配、多空与近义辨析','word context-blanks pn-context-contrast'],
 ['central-meaning','主旨与标题','结构、中心、对策边界与标题','mainidea scoped-reading title-choice'],
 ['detail-reading-topic','细节判断','范围、程度、时间与改写','detail-reading detail-boundaries'],
 ['cohesion','语句表达','排序、衔接、指代与下文推断','sentence-order sentence-link cohesion-reference next-paragraph'],
 ['long-reading','长材料阅读','跨段依据、多来源立场与长语境','fq-multi-paragraph on-source-reading t35-context-reading']],
 quant:[
 ['profit','利润与折扣','基数、方程、特值与比例','profit-discount profit-bases'],
 ['concentration','浓度与混合','溶质守恒、混合与比例','mixture'],
 ['geometry','几何与比例','长度、面积、体积与缩放','geometry-scale'],
 ['work-process','工程与动态存量','效率、分段、净消耗与顺序','work work-stages fq-dynamic-stock'],
 ['travel-topic','行程问题','相遇、追及、速度与路程','travel'],
 ['scheduling','周期与统筹','周期、起点、可行方案与最短证明','t35-period-schedule'],
 ['counting','计数与整数约束','整除余数、排列组合、容斥与分类','remainders count inclusion three-set-counting fq-integer-count'],
 ['probability-guarantee','概率与至少保证','等可能、不放回、条件与最不利情形','probability without-replacement guarantee-count']],
 politics:[
 ['materialism','马原总图与唯物论','理论定位、物质意识、运动规律','marx-worldview'],
 ['dialectics','唯物辩证法','联系、发展、矛盾、三大规律与基本范畴','marx-connection contradiction-method marx-quantity-negation marx-categories'],
 ['cognition','认识论','实践认识、真理检验、真理与价值','practice-cognition marx-truth-value'],
 ['historical-materialism','唯物史观','生产力与生产关系、社会结构、群众史观','productive-relations marx-social-structure social-being-people'],
 ['political-economy','政治经济学','商品价值、剩余价值、资本运行与垄断','marx-commodity-value marx-surplus-capital marx-capitalism-development'],
 ['scientific-socialism','科学社会主义','理论基石、发展阶段与人的发展','marx-socialism-communism'],
 ['mao-thought','毛泽东思想','形成、活的灵魂、革命、改造与建设探索','mao-thought-context mao-living-soul mao-new-democratic mao-revolution-methods mao-socialist-transition mao-socialist-exploration'],
 ['reform-theory','改革开放理论','邓小平理论、三个代表、科学发展观','deng-core-framework deng-reform-market three-represents-theory scientific-development-theory'],
 ['new-era-framework','新时代发展框架','思想方法、发展理念、现代化、新质生产力与改革','six-method-principles development modernization new-quality-productivity reform-framework-2024'],
 ['market-pattern','市场与发展格局','统一大市场、双循环及适用边界','unified-market-rules new-development-pattern'],
 ['education-policy','教育强国','育人要求、建设任务与规划目标','education-strong-2035'],
 ['plan15','十五五规划','四中全会、建议原则与正式纲要','policy-fourth-plenum-2025 policy-plan15-official-2026'],
 ['national-report','2026全国政府工作报告','年度目标、政策工具与重点任务','policy-national-report-2026']],
 general:[
 ['constitutional-law','宪法基础','国家机构与公民权利义务','state-organs constitutional-rights'],
 ['civil-law','民事行为能力','年龄、行为条件与效力','civil-capacity'],
 ['administrative-law','行政复议','对象、条件与救济程序','admin-review'],
 ['price-index','价格指数','总体、权重与个体变化','cpi'],
 ['physical-change','物态变化','六种变化、吸放热与观察对象','phase-change'],
 ['history-framework','历史与文化基础','时间框架、史书体例与造纸印刷','history-periods historiography paper-printing']],
 fujian:[
 ['fujian-geography-topic','福建地理','山海格局与空间联系','fujian-geography'],
 ['enterprise-policy','福建企业服务','2025“四通四到”指定文本','fujian-enterprise-service-2025'],
 ['fujian-report','2026福建政府工作报告','年度目标、产业与地方治理','policy-fujian-report-2026']],
 writing:[
 ['evidence-revision','材料取证与答案修改','材料索引、证据回指、错稿与二稿','material-mapping answer-revision'],
 ['summary-topic','归纳概括','审题、取证、归类、成答与长材料核查','summary summary-evidence multi-material'],
 ['comparison-writing','比较归纳与迁移','同维度比较、机制解释与条件迁移','compare-materials compare-transfer-writing'],
 ['explanation-writing','综合分析与句意解释','含义、依据、原因与论证','analysis-writing explain-in-context'],
 ['proposal-writing','提出对策','问题、主体、措施与落实条件','proposal action-design'],
 ['document-writing','应用写作','身份、受众、目的与文体','document audience-writing'],
 ['essay-writing','文章写作','论证段、提纲、篇章与完整文章','paragraph-evidence essay full-essay'],
 ['transfer-writing','综合材料写作','跨主题与地方治理的材料迁移','writing-transfer writing-fj-governance-v035']]
 };
 const topics=Object.entries(definitions).flatMap(([track,defs])=>defs.map(([id,title,summary,ids])=>({id,track,title,summary,sourceLessonIds:ids.split(' ')})));
 const curated=window.STUDY_TOPIC_EDITS||[];
 for(const edit of curated){const t=topics.find(t=>t.id===edit.id);if(!t)throw Error('Unknown complete topic '+edit.id);if([...edit.sourceLessonIds].sort().join('|')!==[...t.sourceLessonIds].sort().join('|'))throw Error('Topic source mismatch '+edit.id);Object.assign(t,edit);}
 const cleanTitle=s=>String(s).replace(/^(?:入门|巩固|提升|基础|进阶)[：:·\s]+/,'');
 for(const t of topics){
   t.sourceLessonIds.forEach(id=>{if(!lesson(id))throw Error('Missing topic lesson '+id);});
   if(!t.blocks)t.blocks=t.sourceLessonIds.map((id,i)=>({id:'part-'+(i+1),title:lesson(id).title.split('：')[0],intro:lesson(id).subtitle,parts:[{lessonId:id,sectionIndexes:lesson(id).sections.map((_,i)=>i)}]}));
   if(!t.keyPoints)t.keyPoints=t.sourceLessonIds.map(id=>({title:lesson(id).title.split('：')[0],text:lesson(id).formula})).filter(x=>x.text).slice(0,6);
   t.scope=t.scope||'本页连读本站已收录的全部相关讲义，保留概念、例子与条件。属于基础选编，完整考试范围与更多变式仍见覆盖说明。';
   t.curated=curated.some(x=>x.id===t.id);
 }
 const lessonIds=topics.flatMap(t=>t.sourceLessonIds);
 if(lessonIds.length!==C.lessons.length||new Set(lessonIds).size!==C.lessons.length)throw Error('Complete topic coverage mismatch');
 for(const t of topics){const actual=t.blocks.flatMap(b=>b.parts.flatMap(p=>p.sectionIndexes.map(i=>p.lessonId+':'+i))).sort(),expected=t.sourceLessonIds.flatMap(id=>lesson(id).sections.map((_,i)=>id+':'+i)).sort();if(actual.join('|')!==expected.join('|'))throw Error('Complete topic section mismatch '+t.id);}
 const link=t=>`#course/${t.track}/topic/${t.id}`;
 const forLesson=id=>topics.find(t=>t.sourceLessonIds.includes(id));
 function topicSelect(track){return `<label class="topic-subject">科目<select data-topic-route aria-label="选择专题科目">${P.tracks.map(t=>`<option value="#course/${t.id}" ${t.id===track?'selected':''}>${esc(t.title)}</option>`).join('')}</select></label>`;}
 const readCount=(t,state)=>t.sourceLessonIds.filter(id=>state.read.includes(id)).length;
 function overview(track,state){const group=topics.filter(t=>t.track===track.id),next=group.find(t=>readCount(t,state)<t.sourceLessonIds.length)||group[0];return `<section class="topic-directory" data-topic-directory="${track.id}"><header class="topic-directory-head"><span class="topic-eyebrow">专题学习</span><h1>${esc(track.title)}</h1><p>一个专题，一页学完。概念、方法、例解与易混点放在一起。</p></header><div class="topic-directory-toolbar">${topicSelect(track.id)}<a href="#learn">查找单篇讲义</a></div><div class="topic-directory-summary"><strong>${group.length} 个专题</strong><span>含原 ${P.rows(track).length} 篇讲义，已读与笔记继续保留</span><a href="${link(next)}">${readCount(next,state)?'继续学习':'开始学习'} →</a></div><ol class="topic-cards">${group.map((t,i)=>`<li><a href="${link(t)}"><span class="topic-number">${String(i+1).padStart(2,'0')}</span><div><h2>${esc(t.title)}</h2><p>${esc(t.summary)}</p><small>${t.blocks.length} 个部分 · ${t.sourceLessonIds.reduce((n,id)=>n+lesson(id).practice.length,0)} 道配套题${readCount(t,state)?` · 原讲义已读 ${readCount(t,state)}/${t.sourceLessonIds.length}`:''}</small></div><span aria-hidden="true">→</span></a></li>`).join('')}</ol><details class="topic-scope"><summary>内容范围与已有记录</summary><p>本站 ${C.lessons.length} 篇讲义整合为 ${topics.length} 个专题。增长分析、唯物辩证法、归纳概括已按知识关系重编；其他专题合并全部已有正文，仍需继续逐项深化，不代表完整教材或全部考点。</p><p>已读按原讲义记录，专题全部标记已读后显示读完。不以浏览、用时或自测展开自动判定掌握。</p><a href="#coverage">查看内容与缺口</a></details></section>`;}
 function paragraph(text){
   // Preserve every character. Only a condition/misconception sentence gets emphasis.
   const sentences=String(text).match(/[^。！？]+[。！？]?/g)||[String(text)];
   const caution=sentences.findIndex(s=>/不等于|不意味着|不能把|不能直接|不一定|不必然|必须|只有.*才|前提是/.test(s));
   return `<p>${sentences.map((s,i)=>i===caution?`<strong class="topic-condition">${esc(s)}</strong>`:esc(s)).join('')}</p>`;
 }
 function sourceExtras(id,renderLesson){const l=lesson(id),tmp=document.createElement('template');tmp.innerHTML=renderLesson(id,'');const diagram=tmp.content.querySelector('.diagram-box');if(diagram){diagram.dataset.topicLesson=id;diagram.id='topic-diagram-'+id;}
 const aid=tmp.content.querySelector('.theory-learning-aids');return {diagram:diagram?.outerHTML||'',aid:aid?.outerHTML||''};}
 function memoryResources(id){
  const M=window.STUDY_MEMORY_METHODS,card=M?.cards[id];if(!card)return '';
  const tmp=document.createElement('template');tmp.innerHTML=M.render(id,'intro');
  const root=tmp.content.querySelector('.memory-card');if(!root)return '';
  root.querySelector('.memory-recall')?.remove();
  const labels={intro:'概念自测',practice:'运用自测',advanced:'边界自测'};
  for(const stage of ['intro','practice','advanced']){const r=card.recall[stage];if(r)root.insertAdjacentHTML('beforeend',`<div class="memory-recall" data-topic-recall="${stage}"><h3>${labels[stage]}</h3><p>${esc(r[0])}</p><details class="memory-answer"><summary>答案</summary><p>${esc(r[1])}</p></details></div>`);}
  return tmp.innerHTML;
 }
 function reader(t,state,renderLesson){
  const group=topics.filter(x=>x.track===t.track),index=group.indexOf(t),track=P.tracks.find(x=>x.id===t.track),count=readCount(t,state),extras=new Map(t.sourceLessonIds.map(id=>[id,sourceExtras(id,renderLesson)]));
  const qids=[...new Set(t.sourceLessonIds.flatMap(id=>lesson(id).practice))],tasks=C.writing.filter(w=>t.sourceLessonIds.includes(w.lesson));
  const context=`/course/${t.track}/topic/${t.id}`,sectionList=t.blocks.map((b,i)=>({id:'topic-part-'+i,title:`${i+1}. ${b.title}`}));
  const sections=t.blocks.map((b,i)=>`<section class="topic-block" id="topic-part-${i}" tabindex="-1"><header><span class="topic-block-number">${String(i+1).padStart(2,'0')}</span><div><h2>${esc(b.title)}</h2>${b.intro?`<p>${esc(b.intro)}</p>`:''}</div></header>${(b.additions||[]).map(a=>`<section class="topic-addition"><h3>${esc(a.title)}</h3>${paragraph(a.text)}</section>`).join('')}${b.parts.map(p=>{const l=lesson(p.lessonId);return p.sectionIndexes.map(si=>{const s=l.sections[si];return `<section class="topic-concept" data-source-lesson="${esc(l.id)}" data-source-section="${si}"><h3>${esc(cleanTitle(s[0]))}</h3>${paragraph(s[1])}</section>`;}).join('');}).join('')}</section>`).join('');
  const diagrams=t.sourceLessonIds.map(id=>extras.get(id).diagram).filter(Boolean).join('');
  const toc=sectionList.concat(t.synthesis?.length?[{id:'topic-synthesis',title:'综合例解与易混'}]:[],diagrams?[{id:'topic-diagrams',title:'交互图示'}]:[],[{id:'topic-practice',title:'配套练习与写作'},{id:'topic-records',title:'笔记与已读记录'}]);
  const nav=`<nav class="topic-bottom-nav" aria-label="专题前后导航"><a href="${index?link(group[index-1]):'#course/'+t.track}">${index?'← 上一专题':'← 科目目录'}</a><a href="#course/${t.track}">${index+1}/${group.length} · 目录</a>${group[index+1]?`<a href="${link(group[index+1])}">下一专题 →</a>`:'<span>本科目末专题</span>'}</nav>`;
  return `<div class="complete-topic" data-complete-topic="${t.id}"><a class="topic-back" href="#course/${t.track}">← ${esc(track.title)} · 专题目录</a><header class="topic-hero"><span class="topic-eyebrow">完整专题 · ${index+1} / ${group.length}</span><h1>${esc(t.title)}</h1><p>${esc(t.summary)}</p><div class="topic-hero-meta"><span>${t.blocks.length} 个部分</span><span>${qids.length} 道原创题${tasks.length?' · '+tasks.length+' 项写作':''}</span><span>${count===t.sourceLessonIds.length?'已标记读完':count?'原讲义已读 '+count+'/'+t.sourceLessonIds.length:'尚未标记读完'}</span></div></header><div class="topic-mobile-toc"><label for="topic-jump">本页目录</label><select id="topic-jump" data-topic-jump aria-label="跳到本页知识部分"><option value="">选择本页部分</option><option value="topic-top">重点总览</option>${toc.map(x=>`<option value="${x.id}">${esc(x.title)}</option>`).join('')}</select><button type="button" data-topic-top aria-label="回到专题开头">↑</button></div><div class="topic-layout"><aside class="topic-toc" aria-label="专题目录"><strong>本页目录</strong><button type="button" data-topic-scroll="topic-top">重点总览</button>${toc.map(x=>`<button type="button" data-topic-scroll="${x.id}">${esc(x.title)}</button>`).join('')}<a href="#course/${t.track}">返回科目目录</a></aside><article class="topic-reading"><section class="topic-keypoints" id="topic-top" tabindex="-1"><h2>先抓住这些重点</h2><ul>${t.keyPoints.map(k=>`<li><strong>${esc(k.title)}</strong><span>${esc(k.text)}</span></li>`).join('')}</ul></section>${sections}${t.synthesis?.length?`<section class="topic-synthesis" id="topic-synthesis" tabindex="-1"><h2>综合例解与易混</h2>${t.synthesis.map(s=>`<section><h3>${esc(s.title)}</h3>${paragraph(s.text)}</section>`).join('')}</section>`:''}${diagrams?`<section class="topic-block" id="topic-diagrams" tabindex="-1"><h2>交互图示</h2>${diagrams}</section>`:''}<section class="topic-block" id="topic-practice" tabindex="-1"><h2>配套练习与写作</h2><p>以下沿用原题号与作答记录。原创训练，不是真题或实测难度。</p><div class="topic-practice-list">${t.sourceLessonIds.map(id=>{const l=lesson(id);return l.practice.length?`<a class="topic-practice-row" href="#quiz/lesson/${id}${context}"><strong>${esc(l.title.split('：')[0])}</strong><span>${l.practice.length} 题 →</span></a>`:'';}).join('')}${qids.length?`<a class="btn" href="#quiz/topic/${t.id}${context}">练本专题全部 ${qids.length} 题</a>`:''}${tasks.map(w=>`<a class="topic-practice-row" href="#write/${w.id}${context}"><strong>${esc(w.title)}</strong><span>${esc(w.type)} · 写作 →</span></a>`).join('')}</div></section><section class="topic-block" id="topic-records" tabindex="-1"><h2>笔记与已读记录</h2><p>保留原讲义笔记、收藏与已读状态；标记读完只记录已读。</p><button class="btn" data-action="read-topic" data-id="${t.id}" ${count===t.sourceLessonIds.length?'disabled':''}>${count===t.sourceLessonIds.length?'本专题已标记读完':'标记本专题读完'}</button><div class="topic-record-list">${t.sourceLessonIds.map(id=>{const l=lesson(id);return `<details data-topic-record="${id}"><summary>${esc(l.title.split('：')[0])}<span>${state.read.includes(id)?'已读':'未读'}${state.notes[id]?' · 有笔记':''}</span></summary><label for="topic-note-${id}">我的笔记</label><textarea id="topic-note-${id}" data-note="${id}" rows="5" maxlength="10000">${esc(state.notes[id]||'')}</textarea><div class="actions"><button class="btn secondary" data-action="read" data-id="${id}">${state.read.includes(id)?'取消本部分已读':'标记本部分已读'}</button><button class="btn secondary" data-action="favorite" data-id="${id}" aria-pressed="${state.favorites.includes(id)}">${state.favorites.includes(id)?'已收藏 · 取消':'收藏本部分'}</button><a href="#lesson/${id}">查看原讲义</a></div></details>`;}).join('')}</div><p class="stat-foot" id="note-status">仅保存在当前浏览器</p></section><details class="topic-scope"><summary>记忆卡、来源与内容范围</summary><p>${esc(t.scope)}</p><p>${(t.sources||[]).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>`).join(" · ")}</p><p><a href="#sources">资料来源</a> · <a href="#coverage">覆盖与缺口</a> · <a href="#settings">备份记录</a></p>${t.sourceLessonIds.map(id=>`<details><summary>${esc(lesson(id).title.split('：')[0])} · 复习资料</summary><p>更新 ${esc(lesson(id).updated||'2026-11-05')}${lesson(id).versionNote?' · '+esc(lesson(id).versionNote):''}</p>${extras.get(id).aid}${memoryResources(id)}</details>`).join('')}</details>${nav}</article></div></div>`;
 }
 const oldRender=P.render,oldReturn=P.trainingReturn;
 P.render=(parts,state,renderLesson)=>{
   const track=P.tracks.find(t=>t.id===(parts[1]||'data'));
   if(track&&parts.length<=2)return overview(track,state);
   if(track&&parts[2]==='topic'&&parts.length===4){const t=topics.find(t=>t.track===track.id&&t.id===parts[3]);if(t)return reader(t,state,renderLesson);}
   const legacy=oldRender(parts,state,renderLesson),t=forLesson(parts[3]);
   return t&&t.track===track?.id&&parts.length===4&&P.stages.some(s=>s.id===parts[2])?`<a class="topic-legacy-link" href="${link(t)}">打开完整专题：${esc(t.title)} →</a>${legacy}`:legacy;
 };
 P.trainingReturn=parts=>{const offset=parts[0]==='quiz'?3:parts[0]==='write'?2:-1;if(offset>=0&&parts[offset]==='course'&&parts[offset+2]==='topic'&&parts.length===offset+4){const t=topics.find(t=>t.track===parts[offset+1]&&t.id===parts[offset+3]);return t?`<a class="course-training-return" href="${link(t)}">← 返回完整专题：${esc(t.title)}</a>`:'';}return oldReturn(parts);};
 P.entry=()=>'<a class="course-entry" href="#course"><strong>按完整专题学习</strong><span aria-hidden="true">→</span></a>';
 function scrollToPart(id){const el=document.getElementById(id);if(!el)return;el.scrollIntoView({behavior:'auto',block:'start'});el.focus({preventScroll:true});}
 if(typeof document!=='undefined')document.addEventListener('change',e=>{const x=e.target;if(x.matches?.('[data-topic-route]')&&x.value.startsWith('#course/'))location.hash=x.value;if(x.matches?.('[data-topic-jump]')){scrollToPart(x.value);x.value='';}});
 if(typeof document!=='undefined')document.addEventListener('click',e=>{const b=e.target.closest?.('[data-topic-scroll],[data-topic-top]');if(b)scrollToPart(b.dataset.topicScroll||'topic-top');});
 window.STUDY_COMPLETE_TOPICS={topics,forLesson,link,overview,reader};
})();
