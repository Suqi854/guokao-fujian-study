"use strict";
(() => {
  const C = window.STUDY_CONTENT,
    KEY = "zhixu-study-v1";
  const $ = (s) => document.querySelector(s),
    esc = (s) =>
      String(s).replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[c],
      );
  const icons = {
    home: '<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
    book: '<path d="M12 5C8 3 5 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-1-10 1zM12 5v15"/>',
    pen: '<path d="m15 3 6 6-12 12H3v-6zM12 6l6 6"/>',
    wrong: '<path d="M5 3h14v18l-7-4-7 4zM9 7l6 6M15 7l-6 6"/>',
    write:
      '<path d="M14 3H4v18h16V11M8 8h3M8 13h5M8 17h8m-1-9 5-5 3 3-5 5-4 1z"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    back: '<path d="M19 12H5m5-5-5 5 5 5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>',
    search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    settings:
      '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3" fill="white"/><circle cx="16" cy="17" r="3" fill="white"/>',
    chart: '<path d="M4 20V10m8 10V4m8 16v-7"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    shield:
      '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z"/><path d="m8 11 3 3 5-5"/>',
  };
  const icon = (n) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[n] || icons.book}</svg>`;
  const lesson = (id) => C.lessons.find((l) => l.id === id),
    question = (id) => C.questions.find((q) => q.id === id),
    writing = (id) => C.writing.find((w) => w.id === id);
  const fresh = () => ({
    schemaVersion: 1,
    exam: "both",
    read: [],
    favorites: [],
    notes: {},
    attempts: [],
    drafts: {},
    checks: {},
  });
  let state = fresh(),
    storageError = "",
    catalogFilter = "全部",
    query = "",
    onlySaved = false,
    quiz = null,
    toastTimer;
  function validate(raw) {
    if (!raw || raw.schemaVersion !== 1) throw Error("备份版本不支持");
    const out = fresh();
    if (!["both", "national", "fujian"].includes(raw.exam))
      throw Error("备考方向无效");
    out.exam = raw.exam;
    for (const name of ["read", "favorites"]) {
      if (
        !Array.isArray(raw[name]) ||
        raw[name].length > 1000 ||
        raw[name].some((id) => typeof id !== "string" || !lesson(id))
      )
        throw Error("知识记录无效");
      out[name] = [...new Set(raw[name])];
    }
    if (!Array.isArray(raw.attempts) || raw.attempts.length > 50000)
      throw Error("答题记录无效");
    out.attempts = raw.attempts.map((a) => {
      if (
        !a ||
        !question(a.qid) ||
        !Number.isInteger(a.choice) ||
        a.choice < 0 ||
        a.choice > 3 ||
        typeof a.at !== "string" ||
        !Number.isFinite(Date.parse(a.at)) ||
        !Number.isFinite(a.seconds) ||
        a.seconds < 0 ||
        a.seconds > 31536000
      )
        throw Error("答题记录内容无效");
      return { qid: a.qid, choice: a.choice, at: a.at, seconds: a.seconds };
    });
    for (const key of ["notes", "drafts"]) {
      if (!raw[key] || typeof raw[key] !== "object" || Array.isArray(raw[key]))
        throw Error("文字记录无效");
      for (const [id, value] of Object.entries(raw[key])) {
        if (
          !(key === "notes" ? lesson(id) : writing(id)) ||
          typeof value !== "string" ||
          value.length > 50000
        )
          throw Error("文字记录内容无效");
        out[key][id] = value;
      }
    }
    if (
      !raw.checks ||
      typeof raw.checks !== "object" ||
      Array.isArray(raw.checks)
    )
      throw Error("自查记录无效");
    for (const [id, values] of Object.entries(raw.checks)) {
      if (
        !writing(id) ||
        !Array.isArray(values) ||
        values.some(
          (i) =>
            !Number.isInteger(i) || i < 0 || i >= writing(id).points.length,
        )
      )
        throw Error("自查记录内容无效");
      out.checks[id] = [...new Set(values)];
    }
    return out;
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = validate(JSON.parse(raw));
  } catch (e) {
    storageError =
      "本机记录无法读取。为保护原记录，暂不覆盖；请到备份页导出原始记录后再重置。";
  }
  function persist() {
    if (storageError) return false;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      storageError =
        "浏览器未能保存记录，可能已满或禁用存储。请立即导出备份；关闭页面前请勿依赖自动保存。";
      showToast(storageError);
      return false;
    }
  }
  function showToast(t) {
    $("#toast").textContent = t;
    $("#toast").classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 4000);
  }
  const btn = (text, href, secondary = false) =>
    `<a class="btn${secondary ? " secondary" : ""}" href="${href}">${text}${icon("arrow")}</a>`;
  const heading = (label, title, sub, extra = "") =>
    `<div class="page-heading"><div><div class="eyebrow">${label}</div><h1>${title}</h1><p class="subtitle">${sub}</p></div>${extra}</div>`;
  const empty = (title, desc, link = "") =>
    `<div class="empty">${icon("book")}<h2>${title}</h2><p>${desc}</p>${link}</div>`;
  const latest = () => {
    const a = {};
    for (const row of state.attempts) a[row.qid] = row;
    return a;
  };
  const wrongIds = () =>
    Object.values(latest())
      .filter((a) => a.choice !== question(a.qid).answer)
      .map((a) => a.qid);
  const correctCount = () =>
    state.attempts.filter((a) => a.choice === question(a.qid).answer).length;
  const dateKey = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };
  const todayAttempts = () =>
    state.attempts.filter((a) => dateKey(a.at) === dateKey(new Date()));
  function nav(active) {
    $("#navigation").innerHTML = [
      ["home", "home", "学习概览"],
      ["learn", "book", "知识地图"],
      ["practice", "pen", "专项练习"],
      ["writing", "write", "申论写作"],
      ["mistakes", "wrong", "错题回顾"],
    ]
      .map(
        ([id, i, label]) =>
          `<a class="nav-item ${active === id ? "active" : ""}" href="#${id}" ${active === id ? 'aria-current="page"' : ""}>${icon(i)}<span>${label}</span>${id === "mistakes" && wrongIds().length ? `<span class="badge">${wrongIds().length}</span>` : ""}</a>`,
      )
      .join("");
  }
  function home() {
    const done = state.read.length,
      total = state.attempts.length,
      wrong = wrongIds().length,
      next = C.lessons.find((l) => !state.read.includes(l.id)) || C.lessons[0];
    const stats = [
      [
        "已读知识",
        done,
        `/ ${C.lessons.length} 篇`,
        "按「标记已读」统计",
        "book",
      ],
      ["今日练习", todayAttempts().length, "次", "每次提交计为一次练习", "pen"],
      [
        "练习正确率",
        total ? Math.round((correctCount() / total) * 100) + "%" : "—",
        "",
        total ? `累计 ${total} 次作答` : "完成第一道题，开始记录",
        "chart",
      ],
      ["待巩固错题", wrong, "题", "再次答对后自动移出", "wrong"],
    ];
    return (
      heading(
        "YOUR STUDY SPACE",
        "把知识，变成你的能力。",
        "一个知识点，一组练习。按自己的节奏，稳稳向前。",
        '<span class="pill green">' + icon("shield") + " 本机记录</span>",
      ) +
      `<div class="stats">${stats.map((s) => `<div class="stat"><div class="stat-label">${s[0]}${icon(s[4])}</div><div class="stat-value">${s[1]}<small>${s[2]}</small></div><div class="stat-foot">${s[3]}</div></div>`).join("")}</div><div class="dashboard-grid"><div><section class="card focus-card"><div class="focus-top"><span class="pill">下一步 · 学懂再练</span><span class="muted" style="font-size:11px">约 ${next.minutes} 分钟</span></div><h2>${next.title}</h2><p>${next.subtitle}</p><div class="focus-bottom">${btn("开始学习", "#lesson/" + next.id)}<small>${done} / ${C.lessons.length} 篇已读 · 不等同掌握</small></div></section><div class="section-head"><h2>切换一种学习方式</h2><a href="#practice">全部练习 →</a></div><div class="compact-links"><a class="compact-link" href="#practice"><span class="tile-icon">${icon("pen")}</span><div><strong>来一组专项练习</strong><small>${C.questions.length} 道原创示例 · 每题都有解析</small></div>${icon("arrow")}</a><a class="compact-link" href="#writing"><span class="tile-icon">${icon("write")}</span><div><strong>把思路写成申论答案</strong><small>${C.writing.length} 个虚构材料练习 · 草稿自动保存</small></div>${icon("arrow")}</a><a class="compact-link" href="#mistakes"><span class="tile-icon">${icon("wrong")}</span><div><strong>回看错题，找到原因</strong><small>${wrong ? `${wrong} 道题等待巩固` : "完成练习后，错题会自动收集在这里"}</small></div>${icon("arrow")}</a></div></div><div class="stack"><section class="panel"><div class="panel-head"><h2>讲练之间，走三步</h2></div>${[
        ["读懂知识", "看公式、适用条件和常见陷阱。"],
        ["带着问题练", "提交答案后，逐题拆解思路。"],
        ["回到错题复盘", "知道为什么错，比多刷一题重要。"],
      ]
        .map(
          (s, i) =>
            `<div class="flow-step"><span class="step-number">0${i + 1}</span><div><strong>${s[0]}</strong><p>${s[1]}</p></div></div>`,
        )
        .join(
          "",
        )}</section><section class="panel"><div class="panel-head"><h2>最近 7 天</h2><span class="pill gray">作答次数</span></div>${activity()}<p class="stat-foot">记录属于这台设备、这个浏览器。</p><a class="text-button" href="#settings">导出一份备份 ${icon("arrow")}</a></section></div></div><div class="note notice">当前为知识基础版，含 ${C.lessons.length} 篇讲义、${C.questions.length} 道原创题和 ${C.writing.length} 个写作练习。尚未导入已有知识手册，也不代表完整考试范围。<a href="#settings">了解覆盖范围</a></div>`
    );
  }
  function activity() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        d,
        n: state.attempts.filter((a) => dateKey(a.at) === dateKey(d)).length,
      });
    }
    const max = Math.max(1, ...days.map((x) => x.n));
    return `<div class="activity">${days.map((x) => `<div class="activity-day" title="${x.d.toLocaleDateString("zh-CN")}：${x.n} 次"><span class="activity-bar" style="height:${Math.max(3, (x.n / max) * 50)}px"></span>${x.d.getMonth() + 1}/${x.d.getDate()}</div>`).join("")}</div>`;
  }
  let diagramStep = 0,
    diagramRule = "xor";

  function methodLinks(l) {
    const entries = C.methods.filter((m) => m.lessons.includes(l.id));
    return entries.length
      ? `<section class="source-panel"><h2>方法出处与对照</h2><p>以下是历史公开资料的阅读索引。本站讲义与题目独立编写，不代表作者授权、认可或提供官方答案。</p>${entries.map((m) => `<p><a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(m.name)} · ${esc(m.date)} ↗</a> · ${esc(m.topic)}</p>`).join("")}<a class="text-button" href="#methods">比较适用任务与方法边界 →</a></section>`
      : "";
  }

  let methodFilter = "all",
    fjClass = "A",
    fjScope = "general",
    fjPolice = false;
  function methodsPage(topicId) {
    if (topicId && C.comparisons.some((t) => t.id === topicId))
      methodFilter = topicId;
    const topics = C.comparisons.filter(
      (t) => methodFilter === "all" || t.id === methodFilter,
    );
    const ids = new Set(topics.flatMap((t) => t.refs));
    const records =
      methodFilter === "all"
        ? C.methods
        : C.methods.filter((m) => ids.has(m.id));
    return (
      heading(
        "COMPARE & PRACTICE",
        "同一个知识点，交叉看方法。",
        "先核对出处，再比较共识与边界，最后用原创练习验证。",
      ) +
      `<div class="filters" aria-label="方法模块"><button class="chip ${methodFilter === "all" ? "active" : ""}" data-action="method-filter" data-id="all">全部</button>${C.comparisons.map((t) => `<button class="chip ${methodFilter === t.id ? "active" : ""}" data-action="method-filter" data-id="${t.id}">${t.filterLabel || t.module}</button>`).join("")}</div><details class="roadmap"><summary>五模块来源盘点 · 哪些还没有两位具名教师</summary>${C.comparisons.map((t) => `<div class="coverage-row"><strong>${t.module}<small>同一知识点 · ${t.refs.length} 份出处</small></strong><p>${esc(t.gap)}</p></div>`).join("")}<p class="stat-foot">当前${C.methods.length}份资料中，${C.methods.filter((m) => m.kind === "historical-teacher").length}份有历史教学身份或关联介绍、${C.methods.filter((m) => m.kind === "author").length}份只核实到作者署名、${C.methods.filter((m) => m.kind === "institution").length}份只核实到机构。定义判断、估算和细节判断已有两份具名教学资料；其余专题仍有缺口。</p></details><div class="comparison-list">${topics
        .map(
          (t) =>
            `<section class="panel comparison-card"><span class="pill gray">${t.module} · 两个可核查出处</span><h2>${esc(t.title)}</h2><div class="comparison-sources">${t.refs
              .map((id) => {
                const m = C.methods.find((m) => m.id === id);
                return `<article><h3>${esc(m.name)}</h3><p>${esc(m.observation)}</p><a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(m.title)} ↗</a><small>${esc(m.date)} · ${esc(m.publisher)}</small></article>`;
              })
              .join(
                "",
              )}</div><h3>共通之处</h3><p>${esc(t.agreement)}</p><h3>侧重点与差异</h3><p>${esc(t.difference)}</p><h3>本站独立结论</h3><p>${esc(t.conclusion)}</p><div class="note">适用边界：${esc(t.boundary)}</div><p class="stat-foot">待补：${esc(t.gap)}</p><div class="actions">${btn("学专题与配套训练", "#lesson/" + t.lesson)}${btn(t.module === "申论方法" ? "写作训练" : "练本专题", t.module === "申论方法" ? "#write/w09" : "#quiz/lesson/" + t.lesson, true)}</div></section>`,
        )
        .join(
          "",
        )}</div><details class="roadmap"><summary>展开本页出处档案 · 身份、年代与使用范围</summary><div class="source-grid method-grid">${records.map((m) => `<article class="panel method-card"><span class="pill gray">${esc(m.topic)} · ${esc(m.date)}</span><h2>${esc(m.name)}</h2><p>${esc(m.identity)}</p><p>${esc(m.application)}</p><p>${esc(m.boundary)}</p><a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer">${esc(m.title)} ↗</a><p class="stat-foot">核对 ${m.checked} · ${esc(m.rights)}</p></article>`).join("")}</div></details><p class="stat-foot">比较为本站独立评论，不是原作者公开论辩或共同结论。原文、商业例题、模板与图片未转载；[<a href="https://www.huatu.com/z/privacy.html" target="_blank" rel="noopener noreferrer">原站版权说明</a>]。资料日期未知处保持未知。</p>`
    );
  }
  function fujianResult() {
    const group = C.fujian.thresholds[fjScope],
      row = group[fjClass];
    return `<section class="panel" id="fujian-result" aria-live="polite"><span class="pill gray">仅2026年度 · ${fjClass}类</span><h2>公告中的最低合格要求</h2><div class="threshold-grid">${row.total === null ? "" : `<div><small>公共科目总分</small><strong>≥ ${row.total}</strong></div>`}<div><small>行政职业能力测验</small><strong>≥ ${row.xingce}</strong></div>${fjPolice ? `<div><small>公安专业科目</small><strong>≥ ${group.police}</strong></div>` : ""}</div><p>以上是合格线，不是某职位进面分数或录用保证。是否适用倾斜政策及专业科目，请核对原通知与具体职位。</p></section>`;
  }
  function fujianPage() {
    return (
      heading(
        "FUJIAN · 2026 SNAPSHOT",
        "福建考情，按年份核对。",
        "2026年度已发布信息的学习快照；不作为2027年度报名或考试安排。",
      ) +
      `<section class="panel"><h2>已核实与待核实分开看</h2><p>2026公告安排：3月14日行测、申论；3月15日公安专业科目。需要其他专业加试的职位另有通知。具体是否参加某科目以职位要求为准。</p><p>2026合格线通知区分A类、B类及加考公安专业科目；下方按通知演示最低合格要求。不是用字母类别猜题型或难度。</p><div class="note">待补：报考指南正文直接读取超时，尚未完整核验2026职位类别与申论卷种对应。因此本页不把A/B、机关层级或国考卷种强行互相映射。</div><a href="${C.fujian.guideUrl}" target="_blank" rel="noopener noreferrer">查看官方2026报考指南 ↗</a></section><section class="panel"><h2>查看2026分类合格线</h2><div class="bank-filters"><label class="bank-field">职位类别<select id="fj-class"><option value="A" ${fjClass === "A" ? "selected" : ""}>A类</option><option value="B" ${fjClass === "B" ? "selected" : ""}>B类</option></select></label><label class="bank-field">通知适用范围<select id="fj-scope"><option value="general" ${fjScope === "general" ? "selected" : ""}>普通标准</option><option value="eligible" ${fjScope === "eligible" ? "selected" : ""}>符合23县倾斜政策的职位</option></select></label></div><label><input type="checkbox" id="fj-police" ${fjPolice ? "checked" : ""}> 职位要求加考公安专业科目</label><p class="stat-foot">倾斜范围包括通知所列县及规定范围内职位，不能只凭居住地选择；请逐条核对原通知。</p></section>${fujianResult()}<section class="panel"><h2>如何安排本站练习</h2><p>先根据目标年份职位表核对笔试科目，再选择需要训练的模块。本网站当前没有福建历年真题库；通用原创练习不等于对应年份原卷。</p><div class="actions">${btn("练通用行测", "#practice")}${btn("练申论方法", "#writing", true)}${btn("福建自然地理", "#lesson/fujian-geography", true)}</div></section><section class="panel"><h2>官方依据与核验边界</h2>${C.fujian.sources.map((x) => `<article class="source-item"><a href="${x.url}" target="_blank" rel="noopener noreferrer">${esc(x.title)} ↗</a><small>${esc(x.publisher)} · ${esc(x.date)}</small><p>${esc(x.scope)}</p></article>`).join("")}<p class="stat-foot">核对 ${C.fujian.checked}；新年度、补充通知和具体职位条件须另查。本页不替代官方报考资格判断。</p></section>`
    );
  }
  function sourcePanel(l) {
    return `<section class="source-panel"><h2>来源与适用范围</h2><p>${esc(l.basis || "独立编写")} · 整理核对 ${esc(l.updated || "2026-11-05")}</p>${(
      l.sources || []
    )
      .map((id) => {
        const src = C.sources[id];
        return `<div class="source-item"><a href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">${esc(src.title)} ↗</a><small>${esc(src.publisher)} · ${esc(src.year)}</small><p>${esc(src.scope)}</p></div>`;
      })
      .join(
        "",
      )}<p class="stat-foot">来源支持其标明的事实或范围；解题步骤、数字例子与练习由本站独立编写，不是官方例题或评分。</p></section>`;
  }
  function arrowFigure(deg, label, marked = false) {
    return `<svg class="study-figure" viewBox="0 0 100 100" role="img" aria-label="${esc(label)}"><rect x="4" y="4" width="92" height="92" rx="14" fill="#fff" stroke="#dfe2ef"/><g transform="rotate(${deg} 50 50)"><path d="M50 76V25m-17 17 17-17 17 17" stroke="#5055db" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${marked ? '<circle cx="24" cy="24" r="5" fill="#202535"/>' : ""}</g></svg>`;
  }
  function gridFigure(bits, label) {
    return `<div class="bit-figure" role="img" aria-label="${esc(label)}：${bits}">${[...bits].map((bit) => `<span class="bit ${bit === "1" ? "filled" : ""}"></span>`).join("")}</div>`;
  }

  let cubeFace = "C",
    cubeBack = false,
    solidView = "front";
  const netCells = [
    ["A", 1, 0],
    ["B", 0, 1],
    ["C", 1, 1],
    ["D", 2, 1],
    ["E", 1, 2],
    ["F", 1, 3],
  ];
  const opposite = { A: "E", E: "A", B: "D", D: "B", C: "F", F: "C" };
  const stacks = [
    [2, 1, 0],
    [1, 3, 1],
  ]; // Near row, then far row; each from left to right.
  function cubeNet(selected = null) {
    return `<svg class="net-figure" viewBox="0 0 192 252" role="img" aria-label="正方体展开图：C上方A、左侧B、右侧D、下方E，E下方F">${netCells.map(([name, x, y]) => `<g><rect x="${x * 60 + 6}" y="${y * 60 + 6}" width="60" height="60" rx="3" fill="${name === selected ? "#595ce8" : selected && name === opposite[selected] ? "#e3b760" : "#f1f2fc"}" stroke="#858ba6"/><text x="${x * 60 + 36}" y="${y * 60 + 44}" text-anchor="middle" fill="${name === selected ? "white" : "#242942"}" font-size="24">${name}</text></g>`).join("")}</svg>`;
  }
  function cubeSolid() {
    const face = cubeBack ? ["A", "F", "B"] : ["A", "C", "D"];
    const points = [
      "80,8 148,45 80,82 12,45",
      "12,45 80,82 80,160 12,123",
      "80,82 148,45 148,123 80,160",
    ];
    const centers = [
      [80, 50],
      [46, 108],
      [114, 108],
    ];
    return `<svg class="cube-figure" viewBox="0 0 160 175" role="img" aria-label="折叠示意：上${face[0]}，左侧可见${face[1]}，右侧可见${face[2]}；只标记面，不表示字母朝向">${face.map((n, i) => `<polygon points="${points[i]}" fill="${n === cubeFace ? "#595ce8" : n === opposite[cubeFace] ? "#e3b760" : ["#f1f2fc", "#e3e5fb", "#d5d9f6"][i]}" stroke="#858ba6"/><text x="${centers[i][0]}" y="${centers[i][1]}" text-anchor="middle" font-size="24" fill="${n === cubeFace ? "white" : "#242942"}">${n}</text>`).join("")}</svg>`;
  }
  function heightMap() {
    return `<div class="height-map" role="img" aria-label="完整柱高：远排从左到右1、3、1；近排从左到右2、1、0。正视方向从近排向远排。"><span>远排</span>${stacks[1].map((n) => `<b>${n}</b>`).join("")}<span>近排</span>${stacks[0].map((n) => `<b class="${n ? "" : "zero"}">${n}</b>`).join("")}<small>↑ 正视方向</small></div>`;
  }
  function projection() {
    const top = solidView === "top",
      heights = top
        ? null
        : solidView === "front"
          ? [0, 1, 2].map((i) => Math.max(...stacks.map((row) => row[i])))
          : stacks.map((row) => Math.max(...row));
    let blocks = [];
    if (top)
      for (let y = 0; y < 2; y++)
        for (let x = 0; x < 3; x++) if (stacks[1 - y][x]) blocks.push([x, y]);

    if (!top)
      for (let x = 0; x < heights.length; x++)
        for (let h = 0; h < heights[x]; h++) blocks.push([x, 2 - h]);
    const label = top
      ? "俯视投影5格"
      : solidView === "front"
        ? "正视轮廓从左到右2、3、1"
        : "侧视轮廓按近排到远排为2、3";
    return `<svg class="projection-figure" viewBox="0 0 150 150" role="img" aria-label="${label}">${blocks.map(([x, y]) => `<rect x="${x * 42 + 12}" y="${y * 42 + 12}" width="40" height="40" rx="3" fill="#7c80e8" stroke="#4c52a3"/>`).join("")}</svg>`;
  }
  function spatialDemo(l) {
    if (l.diagram === "cube-net")
      return `<section class="diagram-box" id="lesson-demo"><div class="panel-head"><h2>动手观察 · 正方体</h2><span class="pill gray">原创示意</span></div><div class="spatial-row">${cubeNet(cubeFace)}<span aria-hidden="true">→</span>${cubeSolid()}</div><div class="filters" aria-label="选择观察的面">${Object.keys(
        opposite,
      )
        .sort()
        .map(
          (n) =>
            `<button class="chip ${n === cubeFace ? "active" : ""}" data-action="cube-face" data-id="${n}" aria-pressed="${n === cubeFace}">${n} 面</button>`,
        )
        .join(
          "",
        )}</div><p class="diagram-caption" aria-live="polite"><strong>${cubeFace} 面</strong>（紫色）与 <strong>${opposite[cubeFace]} 面</strong>（金色）相对；与 ${Object.keys(
        opposite,
      )
        .sort()
        .filter((n) => n !== cubeFace && n !== opposite[cubeFace])
        .join(
          "、",
        )} 相邻。</p><button class="btn secondary" data-action="cube-turn">换一个观察方向</button><p class="stat-foot">右图仅展示三个可见面；隐藏面也保留关系。字母只标面，未模拟字母朝向。</p></section>`;
    return `<section class="diagram-box" id="lesson-demo"><div class="panel-head"><h2>动手观察 · 柱高与投影</h2><span class="pill gray">柱内无空洞</span></div><div class="spatial-row">${heightMap()}<span aria-hidden="true">→</span>${projection()}</div><div class="filters">${[
      ["front", "正视"],
      ["top", "俯视"],
      ["side", "侧视"],
    ]
      .map(
        ([id, label]) =>
          `<button class="chip ${solidView === id ? "active" : ""}" data-action="solid-view" data-id="${id}" aria-pressed="${solidView === id}">${label}</button>`,
      )
      .join(
        "",
      )}</div><p class="diagram-caption" aria-live="polite">${solidView === "front" ? "正视：每列取前后最大值，高度依次 2、3、1。" : solidView === "top" ? "俯视：五个位置有柱子，所以投影占 5 格。" : "侧视：按近排到远排展示，各排最高分别为 2、3。"}</p><p class="stat-foot">柱高表数字是完整高度。总块数为 8；投影格数不是总块数。</p></section>`;
  }

  function diagram(l) {
    if (!l.diagram) return "";
    if (["cube-net", "solid-views"].includes(l.diagram)) return spatialDemo(l);
    if (l.diagram === "rotation")
      return `<section class="diagram-box" id="lesson-demo"><div class="panel-head"><h2>动手观察 · 旋转</h2><span class="pill gray">原创示意</span></div><div class="figure-row">${arrowFigure(0, "起始：箭头向上，黑点左上", true)}<span>→</span>${arrowFigure(diagramStep * 90, `第${diagramStep}步`, true)}</div><p class="diagram-caption" aria-live="polite">已转 ${diagramStep} 步，每步顺时针90°；箭头与黑点一起旋转。</p><div class="actions"><button class="btn" data-action="rotate-demo">下一步 ↻</button><button class="btn secondary" data-action="reset-demo">重置</button></div></section>`;
    const a = "110",
      b = "101",
      result =
        diagramRule === "xor" ? "011" : diagramRule === "union" ? "111" : "100";
    return `<section class="diagram-box" id="lesson-demo"><div class="panel-head"><h2>动手观察 · 叠加</h2><span class="pill gray">黑1 / 白0</span></div><div class="figure-row"><div>A${gridFigure(a, "图A")}</div><span>+</span><div>B${gridFigure(b, "图B")}</div></div><div class="filters">${[
      ["union", "并集"],
      ["intersection", "交集"],
      ["xor", "异或"],
    ]
      .map(
        ([id, text]) =>
          `<button class="chip ${diagramRule === id ? "active" : ""}" aria-pressed="${diagramRule === id}" data-action="overlay-demo" data-id="${id}">${text}</button>`,
      )
      .join(
        "",
      )}</div><div class="figure-row" aria-live="polite"><span>结果</span>${gridFigure(result, "叠加结果")}<strong>${result}</strong></div><p class="diagram-caption">${diagramRule === "xor" ? "不同色才保留黑格。" : diagramRule === "union" ? "至少一幅是黑格就保留。" : "只有两幅都黑才保留。"}</p></section>`;
  }
  function questionGraphic(q) {
    if (!q.graphic) return "";
    if (q.graphic.type === "cube-net")
      return `<div class="question-spatial">${cubeNet()}</div>`;
    if (q.graphic.type === "height-map")
      return `<div class="question-spatial">${heightMap()}</div>`;
    if (q.graphic.type === "bits")
      return `<div class="question-figures">${q.graphic.values.map((bits, i) => `<div>${i === 0 ? "A" : "B"}${gridFigure(bits, `图${i === 0 ? "A" : "B"}`)}</div>`).join("")}<span class="figure-question">?</span></div>`;
    return `<div class="question-figures" aria-label="题目图形序列">${q.graphic.values.map((deg) => arrowFigure(deg, { 0: "向上", 90: "向右", 180: "向下", 270: "向左" }[deg])).join("")}<span class="figure-question">?</span></div>`;
  }
  function coverageRows() {
    return C.coverage
      .map(
        ([cat, included, gap]) =>
          `<div class="coverage-row"><strong>${cat}<small>${C.lessons.filter((l) => l.category === cat).length} 篇 · ${C.questions.filter((q) => lesson(q.lesson).category === cat).length} 道选择题</small></strong><div><p>${included}</p><small>待补：${gap}</small></div></div>`,
      )
      .join("");
  }
  function roadmap() {
    return `<details class="roadmap"><summary>备考路线与实际覆盖 · 展开查看</summary><div class="note">先学基础与方法 → 配套练习 → 错题回看 → 申论材料写作。国考题型参照2026年度官方大纲；新年度和福建具体职位要求应另查公告。本版不是完整教材，也没有两套独立真题库。</div>${coverageRows()}<a class="text-button" href="#sources">查看全部来源、年份与编写边界 →</a> · <a class="text-button" href="#methods">方法出处与对照 →</a></details>`;
  }
  function sourcesPage() {
    return (
      heading(
        "SOURCES & SCOPE",
        "每一条知识，都有边界。",
        "事实查来源，方法看条件，练习用原创。来源核对日期：2026-11-05。",
      ) +
      `<section class="panel"><h2>实际覆盖</h2>${coverageRows()}</section><div class="section-head"><h2>公开参考资料</h2><span class="pill">${Object.keys(C.sources).length} 项</span></div><div class="source-grid">${Object.values(
        C.sources,
      )
        .map(
          (src) =>
            `<article class="panel"><h3><a href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">${esc(src.title)} ↗</a></h3><span class="pill gray">${esc(src.year)}</span><p class="stat-foot">${esc(src.publisher)}</p><p>${esc(src.scope)}</p><small>核对：${src.checked}</small></article>`,
        )
        .join(
          "",
        )}</div><div class="note notice"><a href="#methods">查看历史方法资料与本站独立对照 →</a><br>未复制商业题库、教材图表或官方样题。数学公式为基础演绎，图示与虚构材料由本站独立编写。已有私人知识手册尚未导入。政治与法律页面只覆盖所列基础条目；法规和年度文件可能更新，请以权威文本为准。</div>`
    );
  }
  function lessonCards() {
    const list = C.lessons.filter(
      (l) =>
        (catalogFilter === "全部" || l.category === catalogFilter) &&
        (!onlySaved || state.favorites.includes(l.id)) &&
        (!query ||
          [l.title, l.subtitle, l.category, ...l.tags, ...l.sections.flat()]
            .join(" ")
            .includes(query)),
    );
    return `<p class="stat-foot" aria-live="polite">找到 ${list.length} 篇讲义 · 基础方法整理，非官方教材</p><div class="catalog-grid">${list.map((l) => `<article class="card lesson-card"><div class="card-top"><span class="pill ${l.category === "申论方法" ? "green" : "gray"}">${l.category}</span><button class="small-icon ${state.favorites.includes(l.id) ? "saved" : ""}" data-action="favorite" data-id="${l.id}" aria-pressed="${state.favorites.includes(l.id)}" aria-label="收藏：${l.title}">${icon("star")}</button></div><a href="#lesson/${l.id}"><h3>${l.title}</h3><p>${l.subtitle}</p></a><a class="card-bottom" href="#lesson/${l.id}"><span>${l.minutes} 分钟 · ${l.practice.length ? l.practice.length + " 道配套题" : "写作方法"} ${state.read.includes(l.id) ? "· 已读" : ""}</span>${icon("arrow")}</a></article>`).join("")}</div>${list.length ? "" : empty("没有找到对应讲义", "试试其他关键词，或取消分类和收藏筛选。", '<button class="btn secondary" data-action="reset-search">重置筛选</button>')}`;
  }
  function learn() {
    return (
      heading(
        "KNOWLEDGE MAP",
        "知识地图",
        "先看懂方法，再到练习里检验。收藏值得反复读的内容。",
      ) +
      roadmap() +
      `<label class="search-box">${icon("search")}<input id="search" aria-label="搜索知识点" placeholder="搜索知识点、公式或技巧…" value="${esc(query)}"></label><div class="filters">${C.categories.map((c) => `<button class="chip ${c === catalogFilter ? "active" : ""}" data-action="filter" data-id="${c}" aria-pressed="${c === catalogFilter}">${c}</button>`).join("")}<button class="chip ${onlySaved ? "active" : ""}" data-action="saved-filter" aria-pressed="${onlySaved}">★ 收藏</button></div><div id="catalog">${lessonCards()}</div>`
    );
  }
  function lessonPage(id) {
    const l = lesson(id);
    if (!l) return missing();
    return `<a class="back-link" href="#learn">${icon("back")}知识地图</a><div class="reading-grid"><article class="panel reading"><span class="pill">${l.category} · 基础讲义</span><h1>${l.title}</h1><p class="subtitle">${l.subtitle}</p><span class="muted" style="font-size:12px">约 ${l.minutes} 分钟 · ${l.tags.join(" / ")}</span><div class="formula">${l.formula}</div>${diagram(l)}${l.sections.map((s) => `<section><h2>${s[0]}</h2><p>${s[1]}</p></section>`).join("")}${sourcePanel(l)}${methodLinks(l)}<div class="note">学习讲义并非官方教材。请结合题目限定条件使用；阅读完成不代表已经掌握。</div><div class="actions"><button class="btn" data-action="read" data-id="${l.id}">${icon("check")}${state.read.includes(l.id) ? "已读 · 点击取消" : "标记已读"}</button><button class="btn secondary" data-action="favorite" data-id="${l.id}" aria-pressed="${state.favorites.includes(l.id)}">${icon("star")}${state.favorites.includes(l.id) ? "已收藏" : "收藏讲义"}</button></div></article><aside class="stack sticky"><div class="panel"><h2>把方法用起来</h2><p class="subtitle">${l.practice.length ? `用 ${l.practice.length} 道原创示例题检验理解。` : "读完方法，选一个材料开始写。"}</p><div class="actions">${btn(l.practice.length ? "练配套题" : "去申论写作", l.practice.length ? "#quiz/lesson/" + l.id : "#write/" + (C.writing.find((w) => w.lesson === l.id)?.id || "w01"))}</div></div><div class="panel"><label class="field-label" for="lesson-note">我的笔记</label><textarea id="lesson-note" data-note="${l.id}" rows="7" maxlength="10000" placeholder="记下卡住的地方、适用条件或自己的解法…">${esc(state.notes[l.id] || "")}</textarea><div class="field-meta"><span id="note-status">仅保存在当前浏览器</span></div></div></aside></div>`;
  }

  const bankDefaults = () => ({
    search: "",
    module: "",
    type: "",
    knowledge: "",
    target: "",
    origin: "",
    year: "",
    difficulty: "",
    status: "",
    stage: "",
  });
  let bankFilter = bankDefaults(),
    bankPage = 0;
  function filteredQuestions(f = bankFilter) {
    const wrong = new Set(wrongIds()),
      done = new Set(state.attempts.map((a) => a.qid));
    return C.questions.filter((q) => {
      const m = q.meta;
      const haystack = [
        q.id,
        q.stem,
        lesson(q.lesson).title,
        m.module,
        m.type,
        ...m.tags,
      ]
        .join(" ")
        .toLowerCase();
      return (
        (!f.search || haystack.includes(f.search.toLowerCase())) &&
        (!f.module || m.module === f.module) &&
        (!f.stage || m.trainingStage === f.stage) &&
        (!f.type || m.type === f.type) &&
        (!f.knowledge || m.knowledgeIds.includes(f.knowledge)) &&
        (!f.target || m.applicableExams.includes(f.target)) &&
        (!f.origin ||
          (f.origin === "original"
            ? m.source.kind === "original"
            : m.examSource.system === f.origin)) &&
        (!f.year ||
          (f.year === "none"
            ? m.examSource.year === null
            : String(m.examSource.year) === f.year)) &&
        (!f.difficulty ||
          (f.difficulty === "unrated"
            ? m.difficulty.level === null
            : m.difficulty.level === f.difficulty)) &&
        (!f.status ||
          (f.status === "wrong"
            ? wrong.has(q.id)
            : f.status === "new"
              ? !done.has(q.id)
              : done.has(q.id)))
      );
    });
  }
  function bankSelect(name, label, options) {
    return `<label class="bank-field">${label}<select id="bank-${name}" data-bank="${name}"><option value="">全部</option>${options.map(([v, t]) => `<option value="${esc(v)}" ${bankFilter[name] === String(v) ? "selected" : ""}>${esc(t)}</option>`).join("")}</select></label>`;
  }
  function bankResults() {
    const rows = filteredQuestions(),
      pages = Math.max(1, Math.ceil(rows.length / 12));
    bankPage = Math.min(bankPage, pages - 1);
    const params = new URLSearchParams(
      Object.entries(bankFilter).filter(([, v]) => v),
    ).toString();
    const route = "#quiz/filtered/" + encodeURIComponent(params);
    const wrong = new Set(wrongIds()),
      done = new Set(state.attempts.map((a) => a.qid));
    return `<div class="bank-result-head"><p role="status">找到 <strong>${rows.length}</strong> 道题 · 第 ${bankPage + 1} / ${pages} 页</p>${rows.length ? btn("练习筛选结果", route) : ""}</div>${
      rows.length
        ? `<div class="bank-list">${rows
            .slice(bankPage * 12, (bankPage + 1) * 12)
            .map(
              (q) =>
                `<article class="panel bank-question"><div class="bank-tags"><span class="pill gray">${q.id.toUpperCase()} · ${esc(q.meta.module)}</span><span class="pill ${wrong.has(q.id) ? "" : "gray"}">${wrong.has(q.id) ? "待巩固" : done.has(q.id) ? "已练习" : "未练习"}</span></div><h3>${esc(q.stem)}</h3><p class="stat-foot">${esc(q.meta.type)} · ${esc(q.meta.trainingStage)} · ${q.meta.tags.map(esc).join(" / ")}</p><p class="stat-foot">原创 · 无真题年份 · 难度未标定</p><div class="actions">${btn("做这道题", "#quiz/one/" + q.id)}<a class="text-button" href="#lesson/${q.lesson}">先学知识点 →</a></div></article>`,
            )
            .join(
              "",
            )}</div><div class="bank-pagination"><button class="btn secondary" data-action="bank-prev" ${bankPage === 0 ? "disabled" : ""}>上一页</button><span>${bankPage + 1} / ${pages}</span><button class="btn secondary" data-action="bank-next" ${bankPage === pages - 1 ? "disabled" : ""}>下一页</button></div>`
        : empty(
            "暂时没有匹配的题目",
            "当前全部为原创练习，尚未收录经核验授权的国考或福建历年真题。可放宽条件，继续练已有内容。",
            '<button class="btn secondary" data-action="bank-reset">清除筛选</button>',
          )
    }`;
  }
  function bank() {
    const uniques = (key) =>
      [...new Set(C.questions.map((q) => q.meta[key]))].map((x) => [x, x]);
    const years = [
      ...new Set(
        C.questions
          .map((q) => q.meta.examSource.year)
          .filter((x) => x !== null),
      ),
    ]
      .sort((a, b) => b - a)
      .map((x) => [String(x), String(x)]);
    const levels = [
      ...new Set(
        C.questions.map((q) => q.meta.difficulty.level).filter(Boolean),
      ),
    ].map((x) => [x, x]);
    return (
      heading(
        "QUESTION FINDER",
        "找到此刻需要练的题。",
        "按知识点与题型组合筛选，再用错题记录决定下一步。",
      ) +
      `<a class="back-link" href="#practice">${icon("back")}专项练习</a><section class="panel"><label class="field-label" for="bank-search">搜索题目、知识点或题号</label><input id="bank-search" class="bank-search" type="search" value="${esc(bankFilter.search)}" placeholder="试试：相对面、浓度、q64" maxlength="100"><div class="bank-filters">${bankSelect("module", "模块", uniques("module"))}${bankSelect("type", "题型", uniques("type"))}${bankSelect(
        "stage",
        "训练层次",
        [
          ["识别概念", "识别概念"],
          ["迁移运用", "迁移运用"],
          ["检查边界", "检查边界"],
          ["未分层", "此前题目（未分层）"],
        ],
      )}</div><details class="bank-advanced"><summary>更多筛选 · 知识点、错题、来源与年份</summary><div class="bank-filters">${bankSelect(
        "knowledge",
        "知识点",
        C.lessons.filter((l) => l.practice.length).map((l) => [l.id, l.title]),
      )}${bankSelect("target", "学习方向", [
        ["national", "国考通用练习"],
        ["fujian", "福建省考通用练习"],
      ])}${bankSelect("origin", "题目来源", [
        ["original", "本站原创"],
        ["national", "国考真题（按来源）"],
        ["fujian", "福建真题（按来源）"],
      ])}${bankSelect("year", "考试年份", [["none", "无考试年份（原创）"], ...years])}${bankSelect("difficulty", "难度标定", [["unrated", "未标定"], ...levels])}${bankSelect(
        "status",
        "本机学习状态",
        [
          ["new", "尚未练习"],
          ["wrong", "当前错题"],
          ["done", "已练习"],
        ],
      )}</div></details><div class="actions"><button class="btn secondary" data-action="bank-reset">清除筛选</button></div><p class="stat-foot">训练层次表示编写目标，不是实测难度。学习方向是适用建议，不是真题出处。现有 ${C.questions.length} 道均为原创，无真题年份，难度尚无样本标定。</p></section><div id="bank-results">${bankResults()}</div>`
    );
  }
  function questionMeta(q) {
    const m = q.meta,
      year = m.examSource.year === null ? "无考试年份" : m.examSource.year;
    return `<details class="question-meta"><summary>题目档案 · 来源、条件与难度</summary><p>${esc(m.type)} · ${esc(m.module)} · ${m.tags.map(esc).join(" / ")}</p><p>训练层次：${esc(m.trainingStage)}；目标：${esc(m.trainingGoal)}。</p><p>出处：${esc(m.source.title)}；${esc(year)}。难度：${esc(m.difficulty.level || "未标定")}。用途：${esc(m.purpose)}。</p><p>${esc(m.rights.note)}</p><p>答案核对：${esc(m.answerReview.date)}；${esc(m.answerReview.basis)}</p><p>本题独立编写；<a href="#methods">可查看方法出处与独立对照</a>，相关作者未参与本题或认可其答案。事实依据见<a href="#lesson/${q.lesson}">配套讲义的来源说明</a>。</p></details>`;
  }

  let targetModule = "all";
  function targetRows() {
    const done = latest();
    return C.lessons
      .filter(
        (l) =>
          l.practice.length &&
          (targetModule === "all" || l.category === targetModule),
      )
      .map((l) => ({
        lesson: l,
        wrong: l.practice.filter(
          (id) => done[id] && done[id].choice !== question(id).answer,
        ),
        fresh: l.practice.filter((id) => !done[id]),
      }))
      .filter((r) => r.wrong.length || r.fresh.length)
      .sort(
        (a, b) =>
          b.wrong.length - a.wrong.length || b.fresh.length - a.fresh.length,
      );
  }
  function targetQueue(rows) {
    const ids = [];
    for (const key of ["wrong", "fresh"]) {
      const groups = rows.map((r) => [...r[key]]);
      while (ids.length < 12 && groups.some((g) => g.length)) {
        for (const g of groups)
          if (g.length && ids.length < 12) ids.push(g.shift());
      }
    }
    return ids;
  }
  const targetLink = (ids) => "#quiz/target/" + ids.join(",");
  function targeted() {
    const rows = targetRows(),
      ids = targetQueue(rows);
    const wrong = rows.reduce((n, r) => n + r.wrong.length, 0),
      freshCount = rows.reduce((n, r) => n + r.fresh.length, 0);
    return (
      heading(
        "YOUR NEXT PRACTICE",
        "下一组，从记录出发。",
        "先回看最近答错，再练尚未尝试的题。记录仅在本机计算。",
      ) +
      `<section class="panel"><label class="bank-field">选择练习模块<select id="target-module"><option value="all">全部选择题模块</option>${C.categories
        .filter((c) => !["全部", "申论方法"].includes(c))
        .map(
          (c) =>
            `<option ${targetModule === c ? "selected" : ""}>${esc(c)}</option>`,
        )
        .join(
          "",
        )}</select></label><div class="actions"><span class="pill">${wrong} 道最近答错</span><span class="pill gray">${freshCount} 道尚未练习</span></div><p>未做过不等于薄弱，答对一次也不等于掌握。当前题目均为原创，难度尚未经样本标定。</p>${ids.length ? btn(`开始这组 · ${ids.length} 题`, targetLink(ids)) : btn("自主选择重练", "#bank", true)}<details class="roadmap"><summary>这组题怎样选出来</summary><p>先选最近一次答错的题，再用未做题补足，最多12题。知识点按错题数量、再按未做数量排序，同数按目录顺序；每轮每个知识点取一题，避免单一知识点占满。进入后题号固定，刷新会从本组首题重新开始，已提交记录保留。练完回到本页会重新计算。</p><p>这里不推断能力、考试得分或遗忘周期；申论草稿不自动评分，可到申论写作页训练。</p></details></section><div class="practice-grid">${rows.map((r) => `<section class="card practice-card target-card" data-lesson="${r.lesson.id}"><span class="pill gray">${r.lesson.category}</span><h2>${r.lesson.title}</h2><p class="target-reason">${r.wrong.length ? `最近答错 ${r.wrong.length} 道，建议回看解析。` : "还有未练题，可继续检验理解。"}未练 ${r.fresh.length} 道。</p><div class="actions">${btn("练这个知识点", targetLink(targetQueue([r])))}${btn("先读讲义", "#lesson/" + r.lesson.id, true)}</div></section>`).join("")}</div>${!rows.length ? empty("当前筛选下没有待选题", "本机已有题目的最近一次作答均正确。你仍可自行重练或继续申论写作。", btn("练申论", "#writing")) : ""}`
    );
  }
  function practice() {
    const categories = C.categories.filter(
      (c) => !["全部", "申论方法"].includes(c),
    );
    return (
      heading(
        "PRACTICE LAB",
        "用练习，检验理解。",
        `${C.questions.length} 道原创练习题，每次提交后展开解析。不是历年真题库。`,
      ) +
      `<section class="panel bank-entry"><div><h2>根据本机记录练下一组</h2><p class="subtitle">最近答错优先 · 未练补充 · 最多12题</p></div>${btn("打开针对性练习", "#targeted")}</section><section class="panel bank-entry"><div><h2>按题型与知识点找题</h2><p class="subtitle">组合筛选 · 本机错题 · 题源与年份</p></div>${btn("打开题库检索", "#bank")}</section><div class="practice-grid"><section class="card practice-card"><div class="tile-icon">${icon("chart")}</div><h3>综合练习</h3><p>覆盖当前全部选择题，顺序作答。已做过的题也可以重练。</p><span class="pill">${C.questions.length} 道 · 基础</span>${btn("开始综合练习", "#quiz/all")}</section>${categories
        .map((c) => {
          const count = C.questions.filter(
            (q) => lesson(q.lesson).category === c,
          ).length;
          return `<section class="card practice-card"><div class="tile-icon">${icon("pen")}</div><h3>${c}</h3><p>${(C.coverage.find((row) => row[0] === c) || [])[1] || "从知识点开始练习。"}</p><span class="pill gray">${count} 道 · 原创示例</span>${btn("开始专项练习", "#quiz/category/" + encodeURIComponent(c))}</section>`;
        })
        .join(
          "",
        )}<section class="card practice-card"><div class="tile-icon">${icon("wrong")}</div><h3>错题重练</h3><p>只练最近一次答错的题；再次答对后自动移出错题集。</p><span class="pill gray">${wrongIds().length} 道待巩固</span>${btn("回顾错题", "#mistakes")}</section></div>`
    );
  }
  function makeQuiz(parts) {
    let ids = [];
    if (parts[1] === "all") ids = C.questions.map((q) => q.id);
    else if (parts[1] === "lesson") ids = lesson(parts[2])?.practice || [];
    else if (parts[1] === "category")
      ids = C.questions
        .filter((q) => lesson(q.lesson).category === parts[2])
        .map((q) => q.id);
    else if (parts[1] === "filtered") {
      const f = {
        ...bankDefaults(),
        ...Object.fromEntries(new URLSearchParams(parts[2] || "")),
      };
      ids = filteredQuestions(f).map((q) => q.id);
    } else if (parts[1] === "wrong") ids = wrongIds();
    else if (parts[1] === "one" && question(parts[2])) ids = [parts[2]];
    else if (parts[1] === "target")
      ids = [...new Set((parts[2] || "").split(","))]
        .filter((id) => question(id))
        .slice(0, 12);
    return {
      route: location.hash,
      ids,
      index: 0,
      choice: null,
      submitted: false,
      results: [],
      started: Date.now(),
      questionStart: Date.now(),
      complete: false,
    };
  }
  function quizPage(parts) {
    if (!quiz || quiz.route !== location.hash) quiz = makeQuiz(parts);
    if (!quiz.ids.length)
      return empty(
        "当前没有可练习的题目",
        "可以先选一个专项，或去知识地图阅读。",
        btn("选择专项", "#practice"),
      );
    if (quiz.complete) {
      const n = quiz.results.filter((r) => r.correct).length;
      return `<div class="quiz-wrap">${heading("SESSION COMPLETE", "这一组，完成了。", "把没弄懂的地方，再带回知识点。")}<section class="panel result"><div class="result-number">${n}<small> / ${quiz.ids.length}</small></div><h2>本次答对 ${n} 题</h2><p class="subtitle">共用时 ${Math.max(1, Math.round((Date.now() - quiz.started) / 1000))} 秒 · 所有记录留在本机</p><div class="actions">${btn("查看错题", "#mistakes")}${btn("继续学习", "#learn", true)}<button class="btn secondary" data-action="restart">再练这组</button></div></section></div>`;
    }
    const q = question(quiz.ids[quiz.index]),
      l = lesson(q.lesson),
      correct = quiz.choice === q.answer;
    return `<div class="quiz-wrap"><div class="quiz-header"><a class="back-link" href="#practice" style="margin:0">${icon("back")}退出本组</a><span>${quiz.index + 1} / ${quiz.ids.length} 题 · <span id="elapsed">${Math.floor((Date.now() - quiz.questionStart) / 1000)}</span> 秒</span></div><div class="mini-progress"><span style="width:${(quiz.index / quiz.ids.length) * 100}%"></span></div><section class="panel quiz-card"><span class="pill">${l.category} · 原创示例</span><h1>${q.stem}</h1>${questionGraphic(q)}${questionMeta(q)}<div class="options" role="group" aria-label="选择一个答案">${q.options.map((o, i) => `<button class="option ${quiz.choice === i ? "selected" : ""} ${quiz.submitted && i === q.answer ? "correct" : ""} ${quiz.submitted && quiz.choice === i && !correct ? "incorrect" : ""}" data-action="choose" data-id="${i}" aria-pressed="${quiz.choice === i}" ${quiz.submitted ? "disabled" : ""}><span>${String.fromCharCode(65 + i)}</span><span>${esc(o)}${quiz.submitted && i === q.answer ? " ✓ 正确答案" : ""}${quiz.submitted && quiz.choice === i && !correct ? " · 你的选择" : ""}</span></button>`).join("")}</div>${quiz.submitted ? `<div class="feedback ${correct ? "" : "wrong"}" role="status"><strong>${correct ? "答对了，继续保持。" : "这道题，值得再看一遍。"}</strong><p>${q.explanation}</p><a href="#lesson/${l.id}">回看知识点：${l.title} →</a></div>` : ""}<div class="quiz-actions"><span class="muted" style="font-size:12px">${quiz.submitted ? "提交已记录；答错会进入错题集。" : "选择后提交，即可查看解析。"}</span><button class="btn" data-action="${quiz.submitted ? "next" : "submit"}" ${quiz.choice === null ? "disabled" : ""}>${quiz.submitted ? (quiz.index === quiz.ids.length - 1 ? "查看本组结果" : "下一题") : "提交答案"}${icon("arrow")}</button></div></section></div>`;
  }
  function mistakes() {
    const ids = wrongIds();
    return (
      heading(
        "REVIEW & REFLECT",
        "错题，是下一步的路标。",
        "这里保留最近一次答错的题。再次答对后移出，历史作答仍保留。",
        ids.length ? btn("重练全部", "#quiz/wrong") : "",
      ) +
      (ids.length
        ? ids
            .map((id) => {
              const q = question(id),
                a = latest()[id];
              return `<article class="card wrong-row"><div><span class="pill gray">${lesson(q.lesson).category}</span><p>${q.stem}</p><small>最近作答：${new Date(a.at).toLocaleString("zh-CN")} · 选择 ${String.fromCharCode(65 + a.choice)}</small></div>${btn("重新作答", "#quiz/one/" + id, true)}</article>`;
            })
            .join("")
        : empty(
            "暂时没有待巩固的错题",
            "先做一组练习，系统会自动收集错题。",
            btn("开始练习", "#practice"),
          ))
    );
  }
  let writingType = "all",
    writingStatus = "all",
    writingQuery = "";
  const writingCategory = (w) => w.taskKind || w.type.split("·")[0].trim();
  function writingResults() {
    const rows = C.writing.filter(
      (w) =>
        (writingType === "all" || writingCategory(w) === writingType) &&
        (writingStatus === "all" ||
          (writingStatus === "draft"
            ? !!state.drafts[w.id]?.trim()
            : !state.drafts[w.id]?.trim())) &&
        (!writingQuery ||
          [w.title, w.type, w.task, w.material]
            .join(" ")
            .includes(writingQuery)),
    );
    return `<p class="stat-foot" role="status">当前 ${rows.length} / ${C.writing.length} 个原创练习 · 不是历年真题 · 不提供自动评分</p><div class="writing-cards">${rows.map((w) => `<article class="card writing-card" data-writing="${w.id}"><div class="type"><span class="pill">${w.type}</span>${state.drafts[w.id]?.trim() ? '<span class="pill green">有本机草稿</span>' : ""}</div><h3>${w.title}</h3><p>${w.task}</p><div class="actions">${btn(state.drafts[w.id]?.trim() ? "继续写作" : "开始写作", "#write/" + w.id)}<a class="text-button" href="#lesson/${w.lesson}">先学对应方法 →</a></div><div class="card-bottom"><span>建议练习 ${w.minutes} 分钟</span><span>不超过 ${w.limit} 字</span></div></article>`).join("")}</div>${rows.length ? "" : empty("没有匹配的写作练习", "当前材料组仍有限，可以放宽条件查看已有原创练习。", '<button class="btn secondary" data-action="writing-clear">清除筛选</button>')}`;
  }
  function writingList() {
    return (
      heading(
        "WRITING STUDIO",
        "让思路，落在纸上。",
        "选任务、读材料、写答案。先独立完成，再逐项自查。",
      ) +
      `<section class="panel"><div class="bank-filters"><label class="bank-field">搜索训练<input id="writing-search" type="search" value="${esc(writingQuery)}" placeholder="题目、材料或任务关键词"></label><label class="bank-field">训练任务<select id="writing-type"><option value="all">全部任务</option>${[...new Set(C.writing.map(writingCategory))].map((t) => `<option ${writingType === t ? "selected" : ""}>${esc(t)}</option>`).join("")}</select></label><label class="bank-field">本机草稿<select id="writing-status"><option value="all">全部状态</option><option value="draft" ${writingStatus === "draft" ? "selected" : ""}>已有草稿</option><option value="new" ${writingStatus === "new" ? "selected" : ""}>尚无草稿</option></select></label></div><p class="stat-foot">均为原创虚构材料与参考表达。草稿不等于完成，勾选不等于得分；不提供AI阅卷或分数预测。</p></section><section id="writing-results">${writingResults()}</section><div class="section-head"><h2>先学方法，再组织答案</h2><a href="#learn">知识地图 →</a></div><div class="compact-links">${C.lessons
        .filter((l) => l.category === "申论方法")
        .map(
          (l) =>
            `<a class="compact-link" href="#lesson/${l.id}"><span class="tile-icon">${icon("book")}</span><div><strong>${l.title}</strong><small>${l.subtitle}</small></div>${icon("arrow")}</a>`,
        )
        .join("")}</div>`
    );
  }
  function relatedWriting(w) {
    const related = w.materialGroup
      ? C.writing.filter(
          (x) => x.id !== w.id && x.materialGroup === w.materialGroup,
        )
      : [];
    return related.length
      ? `<div class="note"><strong>同材料，换一个任务</strong><p>材料相同，设问和草稿分别保存；不要直接复用整篇答案。</p>${related.map((x) => `<a class="text-button" href="#write/${x.id}">${esc(x.title)} →</a>`).join("")}</div>`
      : "";
  }
  const countWords = (text) => Array.from(text.replace(/\s/g, "")).length;
  function writePage(id) {
    const w = writing(id);
    if (!w) return missing();
    const value = state.drafts[id] || "",
      count = countWords(value);
    return `<a class="back-link" href="#writing">${icon("back")}申论写作</a>${heading(w.type, w.title, `原创虚构材料 · 建议练习 ${w.minutes} 分钟 · 字数仅作自查`)}<div class="writing-grid"><div class="stack"><section class="panel"><h2>给定材料</h2><p class="material">${w.material}</p><div class="task"><strong>作答任务</strong><br>${w.task}</div>${relatedWriting(w)}<a class="text-button" href="#lesson/${w.lesson}">先看对应方法 →</a></section><section class="panel"><h2>写完后，逐项自查</h2>${w.points.map((p, i) => `<label class="check-item"><input type="checkbox" data-check="${id}" value="${i}" ${(state.checks[id] || []).includes(i) ? "checked" : ""}>${p}</label>`).join("")}<p class="stat-foot">自查勾选只记录你的判断，不代表评分。</p></section></div><section class="panel"><label class="field-label" for="draft">我的答案</label><textarea id="draft" class="writing-area" data-draft="${id}" maxlength="20000" placeholder="先列关键词，再组织成完整答案。输入会自动保存在本机。">${esc(value)}</textarea><div class="field-meta"><span id="draft-status">本机自动保存</span><span id="word-count" class="${count > w.limit ? "over-limit" : ""}">${count} / ${w.limit} 字</span></div><p class="stat-foot">统计非空白字符，包含标点；不等同于答题纸格数。</p><div class="actions"><button class="btn secondary" data-action="export-draft" data-id="${id}">${icon("download")}导出这篇草稿</button></div><details><summary>展开参考要点与表达示例</summary><div class="note">建议先独立作答，再对照查漏。以下是编写者参考，不是官方答案或评分标准。</div><ul>${w.points.map((p) => `<li>${p}</li>`).join("")}</ul><div class="reference">${esc(w.sample)}</div></details></section></div>`;
  }
  function settings() {
    return (
      heading(
        "YOUR DATA, YOUR PACE",
        "把进度，留在自己手里。",
        "备份包含笔记、草稿和作答记录。请保存在私人位置，不要上传公开仓库。",
      ) +
      `<div class="settings-grid"><div class="stack"><section class="panel"><h2>备份与恢复</h2><p>记录只保存在当前设备、浏览器及网站地址下。清除网站数据、换设备或更换网址后不会自动同步，请定期导出。</p><div class="actions"><button class="btn" data-action="backup">${icon("download")}导出完整备份</button><label class="btn secondary file-button" for="import-file">导入备份</label><input class="sr-only" type="file" id="import-file" accept="application/json,.json"></div><p class="stat-foot">导入前会校验文件，并要求确认替换当前记录。建议先导出一次。</p><div id="import-status" role="status"></div>${storageError ? '<button class="btn secondary" data-action="raw-backup">导出当前存储原文</button>' : ""}</section><section class="panel"><h2>当前记录</h2><p>已读 ${state.read.length} 篇 · 收藏 ${state.favorites.length} 篇<br>作答 ${state.attempts.length} 次 · 草稿 ${Object.values(state.drafts).filter(Boolean).length} 篇</p><div class="note">网站无账号、广告、分析追踪或远程同步。打开页面时托管方仍可处理常规访问请求。公开代码中不包含你的学习记录。</div></section><section class="panel danger-zone"><h2>重置本机记录</h2><p>此操作清空本工具的学习记录。其他网站的数据不受影响。请先备份。</p><button class="btn danger" data-action="reset">清空学习记录</button></section></div><div class="stack"><section class="panel"><h2>内容范围 · 知识基础版</h2><p>当前提供 ${C.lessons.length} 篇基础讲义、${C.questions.length} 道原创选择题、${C.writing.length} 个原创虚构材料写作练习。适用于通用方法入门，不声称覆盖国考或福建省考全部大纲。</p><ul><li>已扩展到政治理论、常识、福建地理、平面图形、更多言语数量资料题型，以及材料分析、对策落实、应用文和论证段方法。</li><li>仍未覆盖完整理论与时政、断代史与文学全体系、复杂空间重构、全部言语数量题型和福建文化政策专题。<a class="source" href="#sources">查看逐模块覆盖与来源 →</a></li><li>尚无历年真题库；已有原型和知识手册尚未成功取回，未并入本版。</li><li>备考方向选项仅用于记录目标，不会把同一内容包装成两套专属题库。</li></ul><p>申论参考要点与框架是学习提示，不是官方评分。不要把模板当成固定答案。</p></section><section class="panel"><h2>官方信息入口</h2><p><a class="source" href="#sources">讲义来源、年份与编写边界 →</a>以下是官方招录信息入口，供核对公告与考试要求；它们不是本站原创题目的出处。请以报考年度和具体职位公告为准。</p><a class="source" href="https://bm.scs.gov.cn/pp/gkweb/core/web/ui/business/home/gkhome.html" target="_blank" rel="noopener noreferrer">国家公务员考试专题 ↗</a><a class="source" href="https://gwykl.fujian.gov.cn/" target="_blank" rel="noopener noreferrer">福建省公务员考试录用网 ↗</a><p class="stat-foot">入口检索核对：2026-11-05。本站没有提供报名时间、资格判断或最新政策解读。</p></section></div></div>`
    );
  }
  function missing() {
    return empty(
      "这个页面暂时不存在",
      "请返回知识地图或学习概览。",
      btn("返回概览", "#home"),
    );
  }
  function render({ focus = false } = {}) {
    let parts;
    try {
      parts = (location.hash.slice(1) || "home")
        .split("/")
        .map(decodeURIComponent);
    } catch {
      parts = ["missing"];
    }
    const page = parts[0];
    const active =
      {
        lesson: "learn",
        quiz: "practice",
        bank: "practice",
        targeted: "practice",
        methods: "learn",
        fujian: "learn",
        write: "writing",
      }[page] || page;
    nav(active);
    $("#page-title").textContent =
      {
        home: "学习概览",
        learn: "知识地图",
        practice: "专项练习",
        writing: "申论写作",
        mistakes: "错题回顾",
        settings: "备份与内容说明",
        sources: "资料来源与覆盖",
      }[active] || "学习工作台";
    $("#exam").value = state.exam;
    const views = {
      home,
      learn,
      lesson: () => lessonPage(parts[1]),
      practice,
      targeted,
      bank,
      quiz: () => quizPage(parts),
      mistakes,
      writing: writingList,
      write: () => writePage(parts[1]),
      settings,
      sources: sourcesPage,
      methods: () => methodsPage(parts[1]),
      fujian: fujianPage,
    };
    $("#main").innerHTML =
      (storageError
        ? `<div class="storage-alert" role="alert">${esc(storageError)}</div>`
        : "") + (views[page] || missing)();
    if (focus) {
      window.scrollTo({ top: 0 });
      $("#main").focus({ preventScroll: true });
    }
    document.title = $("#page-title").textContent + " · 知序";
  }
  function saveChoice() {
    if (!quiz || quiz.choice === null || quiz.submitted) return;
    const q = question(quiz.ids[quiz.index]);
    quiz.submitted = true;
    const seconds = Math.round((Date.now() - quiz.questionStart) / 1000);
    const a = {
      qid: q.id,
      choice: quiz.choice,
      at: new Date().toISOString(),
      seconds,
    };
    state.attempts.push(a);
    quiz.results.push({ qid: q.id, correct: quiz.choice === q.answer });
    persist();
    render();
  }
  function download(name, data, type = "application/json") {
    const blob = new Blob([data], { type }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
  function exportBackup() {
    download(
      `zhixu-backup-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(
        { ...state, exportedAt: new Date().toISOString() },
        null,
        2,
      ),
    );
    showToast("已生成备份文件，请保存在私人位置。");
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-action]");
    if (!b) return;
    const id = b.dataset.id,
      a = b.dataset.action;
    if (a === "writing-clear") {
      writingQuery = "";
      writingType = "all";
      writingStatus = "all";
      render();
      $("#writing-search").focus();
    }
    if (a === "rotate-demo" || a === "reset-demo" || a === "overlay-demo") {
      if (a === "rotate-demo") diagramStep = (diagramStep + 1) % 4;
      if (a === "reset-demo") diagramStep = 0;
      if (a === "overlay-demo") diagramRule = id;
      const activeLesson = lesson(location.hash.split("/")[1]);
      if (activeLesson && $("#lesson-demo"))
        $("#lesson-demo").outerHTML = diagram(activeLesson);
    }
    if (["cube-face", "cube-turn", "solid-view"].includes(a)) {
      if (a === "cube-face" && opposite[id]) cubeFace = id;
      if (a === "cube-turn") cubeBack = !cubeBack;
      if (a === "solid-view" && ["front", "top", "side"].includes(id))
        solidView = id;
      const current = lesson(location.hash.split("/")[1]);
      if (current && $("#lesson-demo"))
        $("#lesson-demo").outerHTML = diagram(current);
    }
    if (a === "favorite") {
      state.favorites = state.favorites.includes(id)
        ? state.favorites.filter((x) => x !== id)
        : [...state.favorites, id];
      persist();
      render();
    }
    if (a === "read") {
      state.read = state.read.includes(id)
        ? state.read.filter((x) => x !== id)
        : [...state.read, id];
      persist();
      render();
    }
    if (a === "filter") {
      catalogFilter = id;
      render();
    }
    if (a === "saved-filter") {
      onlySaved = !onlySaved;
      render();
    }
    if (a === "reset-search") {
      catalogFilter = "全部";
      query = "";
      onlySaved = false;
      render();
    }
    if (a === "method-filter") {
      methodFilter = id;
      if (location.hash.includes("methods/")) location.hash = "#methods";
      else render();
    }
    if (a === "bank-reset") {
      bankFilter = bankDefaults();
      bankPage = 0;
      render();
    }
    if (a === "bank-next" || a === "bank-prev") {
      bankPage = Math.max(0, bankPage + (a === "bank-next" ? 1 : -1));
      $("#bank-results").innerHTML = bankResults();
      $("#bank-results").scrollIntoView({ block: "start" });
    }
    if (a === "choose" && quiz && !quiz.submitted) {
      quiz.choice = Number(id);
      render();
    }
    if (a === "submit") saveChoice();
    if (a === "next" && quiz && quiz.submitted) {
      if (quiz.index === quiz.ids.length - 1) quiz.complete = true;
      else {
        quiz.index++;
        quiz.choice = null;
        quiz.submitted = false;
        quiz.questionStart = Date.now();
      }
      render({ focus: true });
    }
    if (a === "restart") {
      const ids = [...quiz.ids];
      quiz = { ...makeQuiz([]), route: location.hash, ids };
      render({ focus: true });
    }
    if (a === "backup") exportBackup();
    if (a === "raw-backup") {
      try {
        download(
          "zhixu-recovery-raw.txt",
          localStorage.getItem(KEY) || "",
          "text/plain",
        );
      } catch {
        showToast("浏览器拒绝读取存储，无法导出原文。");
      }
    }
    if (a === "export-draft") {
      const w = writing(id);
      download(
        `知序-${w.type}-草稿.txt`,
        `${w.title}\n\n${state.drafts[id] || ""}`,
        "text/plain;charset=utf-8",
      );
    }
    if (
      a === "reset" &&
      confirm("确定清空本机所有学习记录吗？此操作无法撤销。请确认已导出备份。")
    ) {
      try {
        localStorage.removeItem(KEY);
        state = fresh();
        storageError = "";
        quiz = null;
        render();
        showToast("学习记录已清空。");
      } catch {
        showToast("浏览器拒绝修改存储，未能清空。");
      }
    }
  });
  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t.id === "writing-search") {
      writingQuery = t.value.trim();
      $("#writing-results").innerHTML = writingResults();
    }
    if (t.id === "bank-search") {
      bankFilter.search = t.value.trim();
      bankPage = 0;
      $("#bank-results").innerHTML = bankResults();
    }
    if (t.id === "search") {
      query = t.value.trim();
      $("#catalog").innerHTML = lessonCards();
    }
    if (t.dataset.note) {
      state.notes[t.dataset.note] = t.value;
      $("#note-status").textContent = persist()
        ? "已保存到本机"
        : "未能保存，请立即备份";
    }
    if (t.dataset.draft) {
      state.drafts[t.dataset.draft] = t.value;
      $("#draft-status").textContent = persist()
        ? "已保存到本机"
        : "未能保存，请立即备份";
      const w = writing(t.dataset.draft),
        n = countWords(t.value);
      $("#word-count").textContent = `${n} / ${w.limit} 字`;
      $("#word-count").classList.toggle("over-limit", n > w.limit);
    }
  });
  document.addEventListener("change", async (e) => {
    const t = e.target;
    if (["writing-type", "writing-status"].includes(t.id)) {
      if (t.id === "writing-type") writingType = t.value;
      else writingStatus = t.value;
      $("#writing-results").innerHTML = writingResults();
    }
    if (t.id === "target-module") {
      targetModule = t.value;
      render();
      $("#target-module").focus();
    }
    if (t.dataset.bank) {
      bankFilter[t.dataset.bank] = t.value;
      bankPage = 0;
      $("#bank-results").innerHTML = bankResults();
    }
    if (["fj-class", "fj-scope", "fj-police"].includes(t.id)) {
      if (t.id === "fj-class") fjClass = t.value;
      if (t.id === "fj-scope") fjScope = t.value;
      if (t.id === "fj-police") fjPolice = t.checked;
      $("#fujian-result").outerHTML = fujianResult();
    }
    if (t.id === "exam") {
      state.exam = t.value;
      persist();
      showToast("已记录备考方向；当前提供通用基础内容。");
    }
    if (t.dataset.check) {
      const id = t.dataset.check,
        n = Number(t.value),
        list = state.checks[id] || [];
      state.checks[id] = t.checked
        ? [...new Set([...list, n])]
        : list.filter((i) => i !== n);
      persist();
    }
    if (t.id === "import-file") {
      const f = t.files[0];
      if (!f) return;
      try {
        if (f.size > 10 * 1024 * 1024) throw Error("文件超过 10 MB");
        const parsed = validate(JSON.parse(await f.text()));
        if (
          confirm(
            `已校验：${parsed.attempts.length} 次作答、${parsed.read.length} 篇已读。是否用这份备份替换本机记录？建议先导出当前备份。`,
          )
        ) {
          try {
            localStorage.setItem(KEY, JSON.stringify(parsed));
          } catch {
            throw Error("浏览器拒绝保存，原记录未替换");
          }
          state = parsed;
          storageError = "";
          quiz = null;
          render();
          showToast("备份已恢复。");
        }
      } catch (err) {
        const msg = "导入失败：" + err.message;
        showToast(msg);
        if ($("#import-status")) $("#import-status").textContent = msg;
      } finally {
        t.value = "";
      }
    }
  });
  window.addEventListener("hashchange", () => {
    if (!location.hash.startsWith("#quiz/")) quiz = null;
    render({ focus: true });
  });
  setInterval(() => {
    if (quiz && !quiz.complete && !quiz.submitted && $("#elapsed"))
      $("#elapsed").textContent = Math.floor(
        (Date.now() - quiz.questionStart) / 1000,
      );
  }, 1000);
  $("#settings-link").innerHTML = icon("settings");
  render();
})();
