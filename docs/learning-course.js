"use strict";
// An editorial order over existing lessons, not new content or mastery evidence.
(() => {
  const C = window.STUDY_CONTENT;
  const stages = [
    { id: "intro", label: "第一轮 · 懂概念", task: "说清概念，跟着例子走一遍" },
    { id: "practice", label: "第二轮 · 会运用", task: "换个情境，再独立做一次" },
    { id: "advanced", label: "第三轮 · 辨边界", task: "解释条件，找反例和不能推出的结论" },
  ];
  const unit = (title, goal, bridge, check, ids) => ({ title, goal, bridge, check, ids: ids.split(" ") });
  const tracks = [
    { id: "data", title: "资料分析", brief: "量与率 → 分母与权重 → 多表与口径", start: "先能区分现期、基期、部分和整体；不用先背完公式。", units: [
      unit("先把量与率读准确", "同一个变化分别用增长量和增长率表达，再用估算检查答案是否能区分。", "先固定基期，才能判断增长率和增长量为什么可能排序不同。", "能否给出一个增长率更高、增长量反而更小的例子？估算误差会不会改变选项？", "growth rate-amount-order estimation-boundary"),
      unit("围绕分母理解结构", "把比重、平均数和贡献率放在一起，逐题写出分子、分母与单位。", "上一章解决“增多少”；这一章先问“占谁、平均到谁、贡献给谁”，再谈变化。", "能否解释百分点与百分比为什么不同，并找出平均数和贡献率各自的分母？", "share average growth-contribution pn-share-scope"),
      unit("把多个变化接起来", "区分跨时间的连乘和跨部分的加权，再用范围与精确计算互相检查。", "已有量、率、分母概念后，再处理多段增长和混合总体，避免把不同权重直接平均。", "间隔增长为什么不能直接相加？混合增长为什么看基期权重？", "compound-growth mixed-growth mixed-weights"),
      unit("从公式走向完整材料", "把对象、时期、单位、指标定义对齐，判断现有信息究竟能支持什么结论。", "前面公式成立的前提是口径一致；跨表、指数和分组数据会把这个前提藏起来。", "跨表合并前核了哪些口径？分组平均数变化能否直接说明每个组都改善？", "multi-table on-period-scope fq-index-caliber t35-group-statistics"),
    ] },
    { id: "reasoning", title: "判断推理", brief: "条件与关系 → 论证 → 图形与空间", start: "先分清题目是在问必然推出、符合定义，还是增强/削弱论证。", units: [
      unit("先把条件翻译对", "先画充分必要条件，再加入量词、否定与复合限制，最后检查是否存在反例。", "不先固定条件方向，后面的排列和论证会把“可能”误当“必然”。", "能否区分逆命题与逆否命题，并为不能必然推出的结论构造反例？", "logic quantified-logic pn-compound-logic arrangement"),
      unit("把判断依据列成清单", "定义看必要要素及其连接关系，类比看关系层级与方向。", "沿用上一章的条件意识，但定义判断不等于形式推理，类比也不只比较词面相近。", "删去一个条件后还符合定义吗？类比两组的关系和方向一致吗？", "definition definition-conditions analogy"),
      unit("从结论往回找论据", "先找论据与结论之间的缺口，再区分因果干扰、必要前提和结论范围。", "已经能核条件后，转向“论据能支持多强的结论”，而不是把所有论证都当必然推理。", "这条补充信息是在补桥梁、排除别因，还是改变结论适用范围？", "argument argument-controls on-argument-chain"),
      unit("建立统一的图形观察口径", "先确定数什么、看什么，再检查位置和叠加规则是否在所有图形中一致。", "文字条件转为图形规则时，也要先定义对象与操作，不能看到一个巧合就定规律。", "选定的数量、旋转或叠加规则能解释全部已知图形吗？", "figure-features rotation overlay"),
      unit("把平面关系迁移到空间", "从相对面、观察方向和投影入手，再处理翻滚与截面。", "上一章关注平面操作；空间题要额外固定视角，不能把二维旋转直接当作立体翻转。", "展开图、视图与截面各保留了什么信息，又丢失了什么信息？", "cube-net solid-views t35-spatial-transform"),
    ] },
    { id: "verbal", title: "言语理解", brief: "语境约束 → 中心与细节 → 衔接 → 长材料", start: "每次选择都回到原文依据，先说清题目要找中心、细节还是衔接。", units: [
      unit("从语境限定词义", "用搭配、逻辑和语义范围限制选项，再处理多空与相近表达。", "先形成“凭文中条件选词”的习惯，后面的段落阅读仍用同一套证据意识。", "你排除的词具体违反哪条语境条件，而不是仅仅读着不顺？", "word context-blanks pn-context-contrast"),
      unit("分开中心与细节", "先找段落结构和中心，再核主旨选项边界；细节逐项核范围、程度与时间。", "读懂词句不等于抓住中心；中心选择也不能替代逐项核对细节。", "哪个选项扩大了原文范围？对策是否真是原文中心，而非你认为合理？", "mainidea scoped-reading title-choice detail-reading detail-boundaries"),
      unit("让句子前后接得上", "从句际绑定和指代关系判断顺序，再看待补句和后文承担什么任务。", "已有中心和细节判断后，再用话题推进检查句间关系，而非只靠一个连接词。", "这句话怎样承接前文，又给后文留下了什么说明任务？", "sentence-order sentence-link cohesion-reference next-paragraph"),
      unit("把依据扩展到多段、多来源", "用段落分工组织依据，区分不同来源的立场与版本，再做长语境核对。", "短段中的中心、范围、衔接同时出现在长材料中；先定位依据再综合，别凭印象选。", "结论来自哪一段、哪个来源？不同来源是在冲突，还是对象或用途不同？", "fq-multi-paragraph on-source-reading t35-context-reading"),
    ] },
    { id: "quant", title: "数量关系", brief: "量与比例 → 过程 → 计数 → 概率与保证", start: "先写已知量、未知量和单位，再决定列式、设特值或分类。", units: [
      unit("先识别不变的量与基准", "用利润、浓度和几何比例理解基准变化与守恒，比较设未知数和设特值。", "先找百分比的分母和不变的量，后面过程题的等量关系才有依据。", "每个百分比的基准是谁？长度放大后，面积和体积为何不能沿用同一倍数？", "profit-discount profit-bases mixture geometry-scale"),
      unit("把过程分段列出来", "先学效率与速度，再按条件变化分段，处理动态存量和周期统筹。", "静态等量关系变成随时间发生的过程，关键是每个阶段重新确认效率、起点与库存。", "在哪个时刻条件改变？最短或最早的结论有没有可行方案与下界两方面依据？", "work travel work-stages fq-dynamic-stock t35-period-schedule"),
      unit("有约束地计数", "用整除缩小取值域，再分清排列组合、交集和整数分类。", "不再只求一个量，而是数所有满足条件的情况；先界定范围，避免重复或漏计。", "分类是否互斥且穷尽？算的是有序安排、无序选取，还是集合交并？", "remainders count inclusion three-set-counting fq-integer-count"),
      unit("分清概率与必然保证", "先确认等可能，再处理不放回的条件变化，最后用最不利情况理解至少保证。", "计数是概率的基础，但“概率很高”和“无论怎样都保证”是两类不同问题。", "后一次抽取的样本空间是否改变？至少保证题能否构造刚好还不满足的情形？", "probability without-replacement guarantee-count"),
    ] },
    { id: "politics", title: "政治理论", brief: "认识与方法 → 历史背景 → 发展与政策文本", start: "从概念与原文背景读起；历史文本、政策目标和现实效果分开。", units: [
      unit("先建立分析问题的方法", "把实践、认识、矛盾层级与社会发展条件联系起来，说明每个判断的对象与证据。", "这些概念提供后续阅读的分析方法，不用背一个术语替代具体解释。", "能否说清材料、解释与检验的区别，以及两种“主要”各比较什么？", "practice-cognition contradiction-method productive-relations social-being-people"),
      unit("放回历史与实践背景", "把思想形成背景与具体方法连起来，区分历史地位、方法要求和材料中的实际运用。", "有了认识与矛盾的方法框架，再看历史形成与活的灵魂，避免只记并列名称。", "实事求是、群众路线和独立自主怎样联系？一个材料例子能支持多大的结论？", "mao-thought-context mao-living-soul six-method-principles"),
      unit("理解发展框架与目标", "区分发展理念、现代化特色、生产力要求和改革文本的不同层级。", "把方法用于阅读发展论述时，要先认概念层级，再找联系，不能把名称互相替代。", "一项表述讲理念、特色、任务还是时间目标？材料是否足以证明已实现？", "development modernization new-quality-productivity reform-framework-2024"),
      unit("带着边界读具体政策", "按文本对象、任务与时间核对市场、发展格局和教育内容。", "从总体框架进入具体文本后，更要保留发布日期、目标期限与现行核验边界。", "这是规划目标还是实施结果？原文的时间和适用范围是什么？", "unified-market-rules new-development-pattern education-strong-2035"),
    ] },
    { id: "general", title: "常识判断", brief: "国家与法律 → 经济与物理 → 历史框架", start: "现有专题是常识入门选读，不是常识全范围教材。", units: [
      unit("先分主体、权利与程序", "把国家机构职权、权利义务、民事能力与行政复议分开学习。", "先确定谁在什么关系中行动，再谈权利、行为效力与救济程序，不能只记年龄或名称。", "题目中的主体、行为和条件分别是什么？法律概念有没有被扩大成现实办事承诺？", "state-organs constitutional-rights civil-capacity admin-review"),
      unit("用对象和条件解释现象", "价格指数看总体与个体，物态变化看对象、过程与吸放热。", "这两课不是同一条学科规律；共同训练的是固定观察对象，再避免从局部跳到总体。", "价格总体变化能否说明每样商品都变了？吸放热以哪个对象为准？", "cpi phase-change"),
      unit("先搭时间框架，再辨类别", "用历史顺序安放事件，再区分史书体例与技术作用。", "时间框架帮助定位，但不能代替体例分类；“发生在何时”和“属于什么”分开回答。", "史书体例与记述范围为什么是两列？造纸与印刷分别解决哪一步？", "history-periods historiography paper-printing"),
    ] },
    { id: "fujian", title: "福建专题", brief: "地理框架 → 指定政策文本", start: "只组织目前两门福建专题；地方治理写作放在申论主线。", units: [
      unit("先有空间框架", "从山海位置与地理联系建立福建的空间认识。", "先能说明位置关系，再把地方材料放回空间背景；不从地理直接推断政策效果。", "能否不用照读讲义，说清福建山海格局的基本关系？", "fujian-geography"),
      unit("再读有年份的政策样本", "把2025年企业服务文本的做法、对象和期限拆开核对。", "从空间背景进入政策阅读，两者提供不同信息；政策课只据指定历史文本，不代表已核现行状态。", "哪些是文本中的工作要求，哪些仍需现实证据才能判断成效？", "fujian-enterprise-service-2025"),
    ] },
    { id: "writing", title: "申论方法", brief: "材料证据 → 题型作答 → 论证成文 → 修改迁移", start: "先建立材料依据，再写答案；选择辨析只能辅助理解，不能替代实际写作。", units: [
      unit("先把材料变成证据", "建立材料索引，再把概括要点接回材料，区分同一维度下的异同。", "后面所有题型都依赖材料证据。先解决“从哪里来、回答什么”，再考虑表达。", "每个要点能否接回材料？合并材料时是否保留了作答对象与限制？", "material-mapping summary summary-evidence compare-materials multi-material"),
      unit("按题目任务组织答案", "分别练分析解释、措施设计和应用写作，保留对象、原因、动作与受众。", "已有证据后，按设问改变组织方式；不能把概括、对策和应用文写成同一套模板。", "这份答案的对象和任务是什么？对策回应了哪项问题，应用文服务哪个受众？", "analysis-writing explain-in-context proposal action-design document audience-writing"),
      unit("让段落共同证明观点", "从论证段到文章结构，再写完整文章，检查理由与总论点的关系。", "短答案的证据意识继续保留，但文章还需要段落分工，不能把要点简单拼成长文。", "每个段落在证明什么？理由如何支持观点，而不是换句话重复观点？", "paragraph-evidence essay full-essay"),
      unit("用修改检验迁移", "先修正空话与证据跳步，再迁移到跨主题、比较分析和地方治理材料。", "文章写完不是结束；先针对证据和任务修改，再看换材料后方法是否仍成立。", "修改前后具体补了哪条证据、条件或机制？换材料后哪些写法必须调整？", "answer-revision writing-transfer compare-transfer-writing writing-fj-governance-v035"),
    ] },
  ];

  const esc = value => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const lesson = id => C.lessons.find(l => l.id === id);
  const rows = track => track.units.flatMap((u, unitIndex) => u.ids.map(id => ({ id, unit: u, unitIndex })));
  const link = (track, stage, id) => `#course/${track.id}/${stage}${id ? "/" + id : ""}`;
  function entry() {
    return '<a class="course-entry" href="#course"><span><strong>按体系连续学</strong><small>选科目 → 读一章 → 做对应练习 → 接着学下一课</small></span><span aria-hidden="true">→</span></a>';
  }
  function selects(track, stage, current) {
    return `<div class="course-selects"><label>科目<select data-course-jump aria-label="选择学习科目">${tracks.map(t => `<option value="${link(t, stage)}" ${t === track ? "selected" : ""}>${esc(t.title)}</option>`).join("")}</select></label><label>学习轮次<select data-course-jump aria-label="选择学习轮次">${stages.map(s => `<option value="${link(track, s.id, current)}" ${s.id === stage ? "selected" : ""}>${esc(s.label)}</option>`).join("")}</select></label></div>`;
  }
  function unitSummary(track, stage, u, i, state) {
    const count = u.ids.filter(id => state.read.includes(id)).length;
    return `<details class="course-unit" data-course-unit="${i}" ${i === 0 ? "open" : ""}><summary><span class="course-number">${i + 1}</span><span><strong>${esc(u.title)}</strong><small>${u.ids.length}课 · 已标记已读 ${count}/${u.ids.length}</small></span><span aria-hidden="true">⌄</span></summary><div class="course-unit-body"><p>${esc(u.goal)}</p><p class="course-bridge"><strong>为什么接着学：</strong>${esc(u.bridge)}</p><ol>${u.ids.map(id => { const l = lesson(id); return `<li><a href="${link(track, stage, id)}"><span>${esc(l.title)}</span><small>${l.learningLevels?.[stage] ? esc(stages.find(s => s.id === stage).task) : "完整讲义 · 暂未分层"}${state.read.includes(id) ? " · 已标记已读" : ""}</small><span class="course-row-arrow" aria-hidden="true">→</span></a></li>`; }).join("")}</ol><details class="course-check"><summary>学完这一章，合上讲义自检</summary><p>${esc(u.check)}</p><p class="course-muted">自己解释并找例子，再回看讲义。这里不自动判定掌握。</p></details></div></details>`;
  }
  function overview(track, stage, state) {
    const list = rows(track), next = list.find(r => !state.read.includes(r.id)) || list[0];
    const count = list.filter(r => state.read.includes(r.id)).length;
    return `<section class="course-page" data-course-overview="${track.id}"><header class="course-head"><div><span class="course-eyebrow">连续学习 · 先有框架，再学知识点</span><h1>${esc(track.title)}</h1><p>${esc(track.brief)}</p></div><a href="#learn">搜索全部讲义 ↗</a></header>${selects(track, stage)}<div class="course-start"><p>${esc(track.start)}</p><div class="course-start-actions"><a class="btn" href="${link(track, stage, next.id)}">${count && count < list.length ? "从未标记的课开始" : count === list.length ? "从第一课重读" : "开始第一章"} →</a><span>${track.units.length}章 · ${list.length}课 · 已标记已读 ${count}/${list.length}</span></div></div><p class="course-muted">当前轮次只打开该课已有的对应讲解；未分层课保留完整讲义。已读是整课手动标记，不代表本轮完成或已掌握。</p><div class="course-chapters">${track.units.map((u, i) => unitSummary(track, stage, u, i, state)).join("")}</div><details class="course-scope"><summary>学习顺序、范围与其他入口</summary><p>这是一条可跳读的编辑学习顺序，不是能力等级、考试难度或官方考频排序。共组织现有${C.lessons.length}课，未新增题目或扩充考试覆盖；没有自动记录本轮完成。基础、迁移与边界使用已有讲义，不要求读完整个科目后才可练习。</p><p><a href="#coverage">查看覆盖与缺口</a> · <a href="#theory">政治理论原文路线</a> · <a href="#writing">申论写作任务</a> · <a href="#learn">全部讲义与搜索</a></p></details></section>`;
  }
  function reader(track, stage, id, state, renderLesson) {
    const list = rows(track), index = list.findIndex(r => r.id === id), current = list[index], l = lesson(id);
    const before = list[index - 1], after = list[index + 1];
    const stageIndex = stages.findIndex(s => s.id === stage), nextStage = stages[stageIndex + 1];
    const hasLevel = Boolean(l.learningLevels?.[stage]);
    const nextHref = after ? link(track, stage, after.id) : nextStage ? link(track, nextStage.id) : link(track, stage);
    const nextText = after ? "下一课 →" : nextStage ? "本轮末课 · 选下一轮 →" : "回到科目目录 →";
    const navigation = `<nav class="course-reading-nav" aria-label="连续学习导航">${before ? `<a href="${link(track, stage, before.id)}" rel="prev">← 上一课</a>` : `<a href="${link(track, stage)}">← 科目目录</a>`}<a href="${link(track, stage)}">${index + 1}/${list.length}课 · 目录</a><a href="${nextHref}" ${after ? 'rel="next"' : ""}>${nextText}</a></nav>`;
    const allIds = track.units.flatMap(u => u.ids);
    const context = `<section class="course-context"><p class="course-eyebrow">${esc(track.title)} / 第${current.unitIndex + 1}章 · ${esc(current.unit.title)}</p><details class="course-jump"><summary>切换科目、轮次或课程 · 当前第${index + 1}课</summary>${selects(track, stage, id)}<label>章节与课程<select data-course-jump aria-label="跳到指定课程">${track.units.map((u, ui) => `<optgroup label="${ui + 1}. ${esc(u.title)}">${u.ids.map(lid => `<option value="${link(track, stage, lid)}" ${lid === id ? "selected" : ""}>${allIds.indexOf(lid) + 1}. ${esc(lesson(lid).title)}</option>`).join("")}</optgroup>`).join("")}</select></label></details><details class="course-connection"><summary>这课与前后知识怎样连接？</summary><p><strong>本章要解决：</strong>${esc(current.unit.goal)}</p><p>${esc(current.unit.bridge)}</p>${before ? `<p><strong>先回想：</strong><a href="${link(track, stage, before.id)}">${esc(lesson(before.id).title)}</a>。${before.unit === current.unit ? "沿用前一课的方法，留意本课新增的对象与条件。" : "上一章结束后，带着它的自检问题再进入这一章。"}</p>` : `<p><strong>起点：</strong>${esc(track.start)}</p>`}${after ? `<p><strong>接下来：</strong><a href="${link(track, stage, after.id)}">${esc(lesson(after.id).title)}</a>${after.unit !== current.unit ? "，进入“" + esc(after.unit.title) + "”。" : "，继续本章的同一条学习线。"}</p>` : `<p>本课是本轮末课；回顾各章自检问题后，可自行选择下一轮。页面不会自动判定你已学完。</p>`}</details>${!hasLevel ? '<p class="course-level-warning">这课暂未编写分层讲解，本页展示完整讲义；切换轮次不会出现新的内容。</p>' : ""}</section>`;
    const goal = hasLevel ? l.learningLevels[stage].goal : l.subtitle;
    const lastInUnit = id === current.unit.ids.at(-1);
    // Keep the course context in the URL, including after reload or browser Back.
    // Existing quiz/write routes read their original leading segments unchanged.
    const body = renderLesson(id, hasLevel ? stage : "").replace(/href="(#(?:quiz|write)\/[^"]+)"/g,
      (_, href) => `href="${href}/course/${track.id}/${stage}/${id}"`);
    return `<div class="course-reader" data-course-reader="${id}">${navigation}${context}<div class="course-lesson-body">${body}</div><section class="course-exit"><h2>读完这课，再往下走</h2><p><strong>先自检：</strong>${esc(goal).replace(/[。]+$/, "")}。试着不用照读讲义解释一次，再完成本页对应练习${track.id === "writing" ? "或实际写作" : ""}。</p>${lastInUnit ? `<p><strong>本章收束：</strong>${esc(current.unit.check)}</p>` : ""}${after ? `<p><strong>下一课：</strong>${esc(lesson(after.id).title)}${after.unit !== current.unit ? "。" + esc(after.unit.bridge) : "。"}</p>` : '<p>你已到达本轮目录末尾，这只表示浏览位置。是否需要重读或换轮次，由你根据自检和练习决定。</p>'}${navigation}<p class="course-muted">翻课、做题和打开下一轮都不会自动标记已读，也不记录或宣称掌握。</p></section></div>`;
  }
  function trainingReturn(parts) {
    if (!["quiz", "write"].includes(parts[0])) return "";
    const offset = parts[0] === "quiz" ? 3 : 2;
    if (parts[offset] !== "course" || parts.length !== offset + 4) return "";
    const track = tracks.find(t => t.id === parts[offset + 1]), stage = parts[offset + 2], id = parts[offset + 3];
    if (!track || !stages.some(s => s.id === stage) || !rows(track).some(r => r.id === id)) return "";
    return `<a class="course-training-return" href="${link(track, stage, id)}">← 返回连续课程：${esc(lesson(id).title)}</a>`;
  }
  function render(parts, state, renderLesson) {
    const track = tracks.find(t => t.id === (parts[1] || "data")), stage = parts[2] || "intro";
    const id = parts[3];
    if (!track || !stages.some(s => s.id === stage) || parts.length > 4 || (id && !rows(track).some(r => r.id === id))) {
      return '<section class="panel"><h1>没有找到这条学习路径</h1><p>课程链接可能已改动，请从科目目录重新选择。</p><a class="btn" href="#course">回到连续学习</a></section>';
    }
    return id ? reader(track, stage, id, state, renderLesson) : overview(track, stage, state);
  }
  if (typeof document !== "undefined") document.addEventListener("change", event => {
    const target = event.target;
    if (target.matches?.("select[data-course-jump]") && target.value.startsWith("#course/")) location.hash = target.value;
  });
  window.STUDY_COURSE = { tracks, stages, rows, link, entry, render, trainingReturn };
})();
