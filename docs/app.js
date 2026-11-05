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
        )}</section><section class="panel"><div class="panel-head"><h2>最近 7 天</h2><span class="pill gray">作答次数</span></div>${activity()}<p class="stat-foot">记录属于这台设备、这个浏览器。</p><a class="text-button" href="#settings">导出一份备份 ${icon("arrow")}</a></section></div></div><div class="note notice">当前为基础示例版，含 ${C.lessons.length} 篇讲义、${C.questions.length} 道原创题和 ${C.writing.length} 个写作练习。尚未导入已有知识手册，也不代表完整考试范围。<a href="#settings">了解覆盖范围</a></div>`
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
      `<label class="search-box">${icon("search")}<input id="search" aria-label="搜索知识点" placeholder="搜索知识点、公式或技巧…" value="${esc(query)}"></label><div class="filters">${C.categories.map((c) => `<button class="chip ${c === catalogFilter ? "active" : ""}" data-action="filter" data-id="${c}" aria-pressed="${c === catalogFilter}">${c}</button>`).join("")}<button class="chip ${onlySaved ? "active" : ""}" data-action="saved-filter" aria-pressed="${onlySaved}">★ 收藏</button></div><div id="catalog">${lessonCards()}</div>`
    );
  }
  function lessonPage(id) {
    const l = lesson(id);
    if (!l) return missing();
    return `<a class="back-link" href="#learn">${icon("back")}知识地图</a><div class="reading-grid"><article class="panel reading"><span class="pill">${l.category} · 基础讲义</span><h1>${l.title}</h1><p class="subtitle">${l.subtitle}</p><span class="muted" style="font-size:12px">约 ${l.minutes} 分钟 · ${l.tags.join(" / ")}</span><div class="formula">${l.formula}</div>${l.sections.map((s) => `<section><h2>${s[0]}</h2><p>${s[1]}</p></section>`).join("")}<div class="note">方法与例子由本项目编写，非官方教材。请结合题目限定条件使用；阅读完成不代表已经掌握。</div><div class="actions"><button class="btn" data-action="read" data-id="${l.id}">${icon("check")}${state.read.includes(l.id) ? "已读 · 点击取消" : "标记已读"}</button><button class="btn secondary" data-action="favorite" data-id="${l.id}" aria-pressed="${state.favorites.includes(l.id)}">${icon("star")}${state.favorites.includes(l.id) ? "已收藏" : "收藏讲义"}</button></div></article><aside class="stack sticky"><div class="panel"><h2>把方法用起来</h2><p class="subtitle">${l.practice.length ? `用 ${l.practice.length} 道原创示例题检验理解。` : "读完方法，选一个材料开始写。"}</p><div class="actions">${btn(l.practice.length ? "练配套题" : "去申论写作", l.practice.length ? "#quiz/lesson/" + l.id : "#writing")}</div></div><div class="panel"><label class="field-label" for="lesson-note">我的笔记</label><textarea id="lesson-note" data-note="${l.id}" rows="7" maxlength="10000" placeholder="记下卡住的地方、适用条件或自己的解法…">${esc(state.notes[l.id] || "")}</textarea><div class="field-meta"><span id="note-status">仅保存在当前浏览器</span></div></div></aside></div>`;
  }
  function practice() {
    const categories = C.categories.filter(
      (c) => !["全部", "申论方法"].includes(c),
    );
    return (
      heading(
        "PRACTICE LAB",
        "用练习，检验理解。",
        `${C.questions.length} 道原创基础示例题，每次提交后展开解析。不是历年真题库。`,
      ) +
      `<div class="practice-grid"><section class="card practice-card"><div class="tile-icon">${icon("chart")}</div><h3>综合练习</h3><p>覆盖当前全部选择题，顺序作答。已做过的题也可以重练。</p><span class="pill">${C.questions.length} 道 · 基础</span>${btn("开始综合练习", "#quiz/all")}</section>${categories
        .map((c) => {
          const count = C.questions.filter(
            (q) => lesson(q.lesson).category === c,
          ).length;
          return `<section class="card practice-card"><div class="tile-icon">${icon("pen")}</div><h3>${c}</h3><p>${c === "资料分析" ? "增长、比重、平均数，先判断口径再计算。" : c === "判断推理" ? "条件、论证、定义，抓住逻辑链条。" : c === "言语理解" ? "主旨与填空，从结构和语境出发。" : "工程、计数、概率，先识别模型条件。"}</p><span class="pill gray">${count} 道 · 原创示例</span>${btn("开始专项练习", "#quiz/category/" + encodeURIComponent(c))}</section>`;
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
    else if (parts[1] === "wrong") ids = wrongIds();
    else if (parts[1] === "one" && question(parts[2])) ids = [parts[2]];
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
    return `<div class="quiz-wrap"><div class="quiz-header"><a class="back-link" href="#practice" style="margin:0">${icon("back")}退出本组</a><span>${quiz.index + 1} / ${quiz.ids.length} 题 · <span id="elapsed">${Math.floor((Date.now() - quiz.questionStart) / 1000)}</span> 秒</span></div><div class="mini-progress"><span style="width:${(quiz.index / quiz.ids.length) * 100}%"></span></div><section class="panel quiz-card"><span class="pill">${l.category} · 原创示例</span><h1>${q.stem}</h1><div class="options" role="group" aria-label="选择一个答案">${q.options.map((o, i) => `<button class="option ${quiz.choice === i ? "selected" : ""} ${quiz.submitted && i === q.answer ? "correct" : ""} ${quiz.submitted && quiz.choice === i && !correct ? "incorrect" : ""}" data-action="choose" data-id="${i}" aria-pressed="${quiz.choice === i}" ${quiz.submitted ? "disabled" : ""}><span>${String.fromCharCode(65 + i)}</span><span>${esc(o)}${quiz.submitted && i === q.answer ? " ✓ 正确答案" : ""}${quiz.submitted && quiz.choice === i && !correct ? " · 你的选择" : ""}</span></button>`).join("")}</div>${quiz.submitted ? `<div class="feedback ${correct ? "" : "wrong"}" role="status"><strong>${correct ? "答对了，继续保持。" : "这道题，值得再看一遍。"}</strong><p>${q.explanation}</p><a href="#lesson/${l.id}">回看知识点：${l.title} →</a></div>` : ""}<div class="quiz-actions"><span class="muted" style="font-size:12px">${quiz.submitted ? "提交已记录；答错会进入错题集。" : "选择后提交，即可查看解析。"}</span><button class="btn" data-action="${quiz.submitted ? "next" : "submit"}" ${quiz.choice === null ? "disabled" : ""}>${quiz.submitted ? (quiz.index === quiz.ids.length - 1 ? "查看本组结果" : "下一题") : "提交答案"}${icon("arrow")}</button></div></section></div>`;
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
  function writingList() {
    return (
      heading(
        "WRITING STUDIO",
        "让思路，落在纸上。",
        "读材料、写答案、对照要点。草稿仅在当前浏览器自动保存。",
      ) +
      `<div class="note" style="margin-bottom:22px">以下均为原创虚构材料与参考要点，不是真题或官方评分标准；本工具不提供 AI 阅卷、自动打分或分数预测。</div><div class="writing-cards">${C.writing.map((w) => `<article class="card writing-card"><div class="type"><span class="pill">${w.type}</span>${state.drafts[w.id] ? '<span class="pill green">有本机草稿</span>' : ""}</div><h3>${w.title}</h3><p>${w.task}</p>${btn(state.drafts[w.id] ? "继续写作" : "开始写作", "#write/" + w.id)}<div class="card-bottom"><span>建议练习 ${w.minutes} 分钟</span><span>不超过 ${w.limit} 字</span></div></article>`).join("")}</div><div class="section-head"><h2>先学方法，再组织答案</h2><a href="#learn">知识地图 →</a></div><div class="compact-links">${C.lessons
        .filter((l) => l.category === "申论方法")
        .map(
          (l) =>
            `<a class="compact-link" href="#lesson/${l.id}"><span class="tile-icon">${icon("book")}</span><div><strong>${l.title}</strong><small>${l.subtitle}</small></div>${icon("arrow")}</a>`,
        )
        .join("")}</div>`
    );
  }
  const countWords = (text) => Array.from(text.replace(/\s/g, "")).length;
  function writePage(id) {
    const w = writing(id);
    if (!w) return missing();
    const value = state.drafts[id] || "",
      count = countWords(value);
    return `<a class="back-link" href="#writing">${icon("back")}申论写作</a>${heading(w.type, w.title, `原创虚构材料 · 建议练习 ${w.minutes} 分钟 · 字数仅作自查`)}<div class="writing-grid"><div class="stack"><section class="panel"><h2>给定材料</h2><p class="material">${w.material}</p><div class="task"><strong>作答任务</strong><br>${w.task}</div><a class="text-button" href="#lesson/${w.lesson}">先看对应方法 →</a></section><section class="panel"><h2>写完后，逐项自查</h2>${w.points.map((p, i) => `<label class="check-item"><input type="checkbox" data-check="${id}" value="${i}" ${(state.checks[id] || []).includes(i) ? "checked" : ""}>${p}</label>`).join("")}<p class="stat-foot">自查勾选只记录你的判断，不代表评分。</p></section></div><section class="panel"><label class="field-label" for="draft">我的答案</label><textarea id="draft" class="writing-area" data-draft="${id}" maxlength="20000" placeholder="先列关键词，再组织成完整答案。输入会自动保存在本机。">${esc(value)}</textarea><div class="field-meta"><span id="draft-status">本机自动保存</span><span id="word-count" class="${count > w.limit ? "over-limit" : ""}">${count} / ${w.limit} 字</span></div><p class="stat-foot">统计非空白字符，包含标点；不等同于答题纸格数。</p><div class="actions"><button class="btn secondary" data-action="export-draft" data-id="${id}">${icon("download")}导出这篇草稿</button></div><details><summary>展开参考要点与表达示例</summary><div class="note">建议先独立作答，再对照查漏。以下是编写者参考，不是官方答案或评分标准。</div><ul>${w.points.map((p) => `<li>${p}</li>`).join("")}</ul><div class="reference">${esc(w.sample)}</div></details></section></div>`;
  }
  function settings() {
    return (
      heading(
        "YOUR DATA, YOUR PACE",
        "把进度，留在自己手里。",
        "备份包含笔记、草稿和作答记录。请保存在私人位置，不要上传公开仓库。",
      ) +
      `<div class="settings-grid"><div class="stack"><section class="panel"><h2>备份与恢复</h2><p>记录只保存在当前设备、浏览器及网站地址下。清除网站数据、换设备或更换网址后不会自动同步，请定期导出。</p><div class="actions"><button class="btn" data-action="backup">${icon("download")}导出完整备份</button><label class="btn secondary file-button" for="import-file">导入备份</label><input class="sr-only" type="file" id="import-file" accept="application/json,.json"></div><p class="stat-foot">导入前会校验文件，并要求确认替换当前记录。建议先导出一次。</p><div id="import-status" role="status"></div>${storageError ? '<button class="btn secondary" data-action="raw-backup">导出当前存储原文</button>' : ""}</section><section class="panel"><h2>当前记录</h2><p>已读 ${state.read.length} 篇 · 收藏 ${state.favorites.length} 篇<br>作答 ${state.attempts.length} 次 · 草稿 ${Object.values(state.drafts).filter(Boolean).length} 篇</p><div class="note">网站无账号、广告、分析追踪或远程同步。打开页面时托管方仍可处理常规访问请求。公开代码中不包含你的学习记录。</div></section><section class="panel danger-zone"><h2>重置本机记录</h2><p>此操作清空本工具的学习记录。其他网站的数据不受影响。请先备份。</p><button class="btn danger" data-action="reset">清空学习记录</button></section></div><div class="stack"><section class="panel"><h2>内容范围 · 基础示例版</h2><p>当前提供 ${C.lessons.length} 篇基础讲义、${C.questions.length} 道原创选择题、${C.writing.length} 个原创虚构材料写作练习。适用于通用方法入门，不声称覆盖国考或福建省考全部大纲。</p><ul><li>已包含：增长、比重、平均数；条件、论证、定义；主旨与填空；工程、计数、概率；四类申论方法。</li><li>尚未系统覆盖：政治理论、常识、图形推理、完整言语与数量题型、时政与福建地方专题。</li><li>尚无历年真题库；已有原型和知识手册尚未成功取回，未并入本版。</li><li>备考方向选项仅用于记录目标，不会把同一内容包装成两套专属题库。</li></ul><p>申论参考要点与框架是学习提示，不是官方评分。不要把模板当成固定答案。</p></section><section class="panel"><h2>官方信息入口</h2><p>以下是官方招录信息入口，供核对公告与考试要求；它们不是本站原创题目的出处。请以报考年度和具体职位公告为准。</p><a class="source" href="https://bm.scs.gov.cn/pp/gkweb/core/web/ui/business/home/gkhome.html" target="_blank" rel="noopener noreferrer">国家公务员考试专题 ↗</a><a class="source" href="https://gwykl.fujian.gov.cn/" target="_blank" rel="noopener noreferrer">福建省公务员考试录用网 ↗</a><p class="stat-foot">入口检索核对：2026-11-05。本站没有提供报名时间、资格判断或最新政策解读。</p></section></div></div>`
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
      { lesson: "learn", quiz: "practice", write: "writing" }[page] || page;
    nav(active);
    $("#page-title").textContent =
      {
        home: "学习概览",
        learn: "知识地图",
        practice: "专项练习",
        writing: "申论写作",
        mistakes: "错题回顾",
        settings: "备份与内容说明",
      }[active] || "学习工作台";
    $("#exam").value = state.exam;
    const views = {
      home,
      learn,
      lesson: () => lessonPage(parts[1]),
      practice,
      quiz: () => quizPage(parts),
      mistakes,
      writing: writingList,
      write: () => writePage(parts[1]),
      settings,
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
