"use strict";
/* Presentation-only navigation. No storage, scoring, content or route changes. */
(function () {
  if (typeof document === "undefined" || typeof document.getElementById !== "function") return;
  const main = document.getElementById("main");
  if (!main) { standalone(); return; }
  function standalone() {
    const root = document.querySelector("#long-main, #private-workspace");
    if (!root) return;
    const phone = typeof window.matchMedia === "function" && window.matchMedia("(max-width: 600px)").matches;
    function fold(section, label) {
      if (!section) return;
      const box = document.createElement("details"); box.className = "compact-utility"; box.open = !phone;
      const summary = document.createElement("summary"); summary.textContent = label;
      section.before(box); box.append(summary, section);
      return box;
    }
    let items;
    if (root.id === "long-main") {
      const backup = root.querySelector('section[aria-label="本页备份与恢复"]');
      fold(root.querySelector(".notice"), "训练范围与保存说明");
      fold(backup, "长题组备份与恢复（独立保存）");
      items = [["建题组", root.querySelector("#builder")], ["固定卷", root.querySelector("#fixed-papers")], ["记录", root.querySelector("#history")], ["备份", backup]];
    } else {
      const limits = root.querySelector('[aria-labelledby="private-limits"]');
      fold(limits, "私人题库的保存与使用边界");
      items = [["导入", root.querySelector('[aria-labelledby="private-import-title"]')], ["阅读", root.querySelector('[aria-labelledby="private-study-title"]')], ["说明", limits]];
    }
    const nav = document.createElement("nav"); nav.className = "standalone-page-nav"; nav.setAttribute("aria-label", "本页快捷定位");
    for (const [label, target] of items) if (target) {
      const button = document.createElement("button"); button.type = "button"; button.textContent = label;
      button.addEventListener("click", () => {
        for (let node = target.parentElement; node && node !== root; node = node.parentElement) if (node.tagName === "DETAILS") node.open = true;
        target.scrollIntoView({ block: "start" });
        target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true });
      });
      target.classList.add("standalone-jump-target"); nav.append(button);
    }
    root.prepend(nav);
  }
  const disclosure = new Map();
  const disclosureKeys = new WeakMap();
  const compact = () => typeof window.matchMedia === "function" && window.matchMedia("(max-width: 640px)").matches;
  function jump(target) {
    if (!target) return;
    if (target.hidden) {
      target.hidden = false;
      if (disclosureKeys.has(target)) disclosure.set(disclosureKeys.get(target), true);
      const toggle = target.closest(".quiz-card")?.querySelector(".inline-material-toggle");
      if (toggle) { toggle.textContent = "读完后收起长材料"; toggle.setAttribute("aria-expanded", "true"); }
    }
    for (let node = target.parentElement; node && node !== main; node = node.parentElement) {
      if (node.tagName === "DETAILS") node.open = true;
    }
    target.scrollIntoView({ block: "start", behavior: "auto" });
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  function navigation(items, label) {
    const nav = document.createElement("nav");
    nav.className = "mobile-page-nav";
    nav.setAttribute("aria-label", label);
    for (const [text, target] of items.filter(([, target]) => target)) {
      const button = document.createElement("button");
      button.type = "button"; button.textContent = text;
      button.addEventListener("click", () => jump(target));
      nav.append(button);
    }
    return nav;
  }
  function enhance() {
    const page = (location.hash.slice(1) || "home").split("/")[0];
    main.dataset.mobilePage = page;
    const quiz = main.querySelector(".quiz-card");
    if (quiz && !quiz.dataset.mobileEnhanced) {
      quiz.dataset.mobileEnhanced = "true";
      const stem = quiz.querySelector("h1"), options = quiz.querySelector(".options"), feedback = quiz.querySelector(".feedback");
      let material = quiz.querySelector(".question-material"), prompt = stem;
      const original = stem?.textContent || "";
      const split = original.indexOf("【问题】");
      if (compact() && !material && split > 200 && original.slice(split + 4).trim()) {
        const passage = document.createElement("span"), question = document.createElement("span");
        passage.textContent = original.slice(0, split); question.textContent = original.slice(split);
        passage.className = "inline-passage"; question.className = "inline-prompt";
        const key = "inline\n" + location.hash + "\n" + original;
        passage.hidden = compact() && disclosure.get(key) === false;
        disclosureKeys.set(passage, key);
        stem.replaceChildren(passage, question); material = passage; prompt = question;
        const toggle = document.createElement("button"); toggle.type = "button"; toggle.className = "inline-material-toggle";
        toggle.textContent = passage.hidden ? "展开完整长材料" : "读完后收起长材料"; toggle.setAttribute("aria-expanded", String(!passage.hidden));
        toggle.addEventListener("click", () => { passage.hidden = !passage.hidden; disclosure.set(key, !passage.hidden); toggle.textContent = passage.hidden ? "展开完整长材料" : "读完后收起长材料"; toggle.setAttribute("aria-expanded", String(!passage.hidden)); });
        stem.before(toggle);
      }
      if (material?.classList.contains("question-material")) {
        const key = location.hash + "\n" + stem.textContent;
        const box = document.createElement("details"); box.className = "mobile-material";
        box.open = !compact() || disclosure.get(key) !== false;
        const summary = document.createElement("summary"); summary.textContent = "本题材料 · 展开 / 收起";
        material.before(box); box.append(summary, material);
        box.addEventListener("toggle", () => disclosure.set(key, box.open));
      }
      // The provenance stays available, but no longer interrupts stem → answers.
      const metadata = quiz.querySelector(".question-meta");
      if (metadata) quiz.append(metadata);
      const nav = navigation([["设问", prompt], ["材料", material], ["选项", options], ["解析", feedback]], "本题快捷定位");
      quiz.before(nav);
      [prompt, options, material, feedback].filter(Boolean).forEach(node => node.classList.add("mobile-jump-target"));
    }
    const writing = main.querySelector(".writing-grid");
    if (writing && !writing.dataset.mobileEnhanced) {
      writing.dataset.mobileEnhanced = "true";
      const material = writing.querySelector(".material"), task = writing.querySelector(".task"), draft = writing.querySelector("#draft");
      const checks = writing.querySelector(".check-item")?.closest("section");
      const nav = navigation([["材料", material], ["任务", task], ["作答", draft], ["自查", checks]], "申论快捷定位");
      writing.before(nav);
      [material, task, draft, checks].filter(Boolean).forEach(node => node.classList.add("mobile-jump-target"));
    }
    if (page === "practice" && !main.querySelector(".practice-shortcuts")) {
      const entries = [...main.querySelectorAll(":scope > .bank-entry")];
      if (!entries.length) return;
      const links = document.createElement("nav"); links.className = "practice-shortcuts"; links.setAttribute("aria-label", "常用练习入口");
      for (const [text, href] of [["按题型找题", "#bank"], ["薄弱点线索", "#diagnostics"], ["计时与复盘", "#training"], ["长题组 / 固定卷", "./long-mock.html"]]) {
        const link = document.createElement("a"); link.href = href; link.textContent = text; links.append(link);
      }
      entries[0].before(links);
      const more = document.createElement("details"); more.className = "practice-more"; more.open = !compact();
      const summary = document.createElement("summary"); summary.textContent = "其他练习方式与使用说明"; more.append(summary);
      links.after(more); entries.forEach(entry => more.append(entry));
      const grid = main.querySelector(".practice-grid");
      if (grid) {
        const modules = document.createElement("nav"); modules.className = "practice-module-links"; modules.setAttribute("aria-label", "选择练习模块");
        for (const card of grid.querySelectorAll(".practice-card")) {
          const source = card.querySelector("a.btn"), title = card.querySelector("h3");
          if (!source || !title) continue;
          const link = document.createElement("a"); link.href = source.getAttribute("href");
          const name = document.createElement("strong"); name.textContent = title.textContent;
          const count = document.createElement("small"); count.textContent = card.querySelector(".pill")?.textContent || "进入练习";
          link.append(name, count); modules.append(link);
        }
        grid.before(modules);
        const scope = document.createElement("details"); scope.className = "practice-scope"; scope.open = !compact();
        const summary = document.createElement("summary"); summary.textContent = "各模块的内容范围";
        grid.before(scope); scope.append(summary, grid);
      }
    }
  }
  new MutationObserver(records => {
    if (records.some(record => record.target === main)) enhance();
  }).observe(main, { childList: true });
  const phoneMedia = typeof window.matchMedia === "function" ? window.matchMedia("(max-width: 640px)") : null;
  phoneMedia?.addEventListener?.("change", event => {
    if (!event.matches) for (const passage of main.querySelectorAll(".inline-passage[hidden]")) {
      passage.hidden = false;
      if (disclosureKeys.has(passage)) disclosure.set(disclosureKeys.get(passage), true);
      const toggle = passage.closest(".quiz-card")?.querySelector(".inline-material-toggle");
      if (toggle) { toggle.textContent = "读完后收起长材料"; toggle.setAttribute("aria-expanded", "true"); }
    }
  });
  enhance();
})();
