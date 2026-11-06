"use strict";
// Presentation-only teaching layer. Existing lesson text, question IDs and stores stay intact.
(() => {
  const esc = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const growth = {
    intro: {
      takeaway: "算增长率，分母一定找原来的数。",
      goal: "先分清“多了多少”和“相对原来多了多少”。",
      terms: [["基期", "原来的数"], ["增长量", "多出来多少"], ["增长率", "多出来的 ÷ 原来的"]],
      example: "去年接待 200 人次，今年 250 人次。同比增长多少？",
      steps: [["找起点", "去年 200 人次", "题目问同比，比较的是上年同期。200 就是分母。"], ["算多了多少", "250 − 200 = 50 人次", "这是增长量，有“人次”这样的数量单位。"], ["算相对多了多少", "50 ÷ 200 = 25%", "这是增长率。先算差，再除以原来的数。"]],
      pitfall: "别用 50 ÷ 250。那是在问新增量占今年总量的比例，不是同比增长率。",
      boundary: "常规计算前，确认基期为正、对象和统计口径一致。同比、环比及累计期间以题干为准。",
      qid: "q157"
    },
    practice: {
      takeaway: "只给现期和增速，先把基期还原出来。",
      goal: "先找原来，再算变化，最后回代检查。",
      terms: [["增长 25%", "变成原来的 1.25 倍"], ["下降 20%", "剩下原来的 0.8 倍"], ["变化量", "现期 − 基期"]],
      example: "增长 25% 后，服务量为 150 人次。增加了多少人次？",
      steps: [["写出倍数", "1 + 25% = 1.25", "现在的数包含“原来的”以及“新增的”两部分。"], ["还原原来", "150 ÷ 1.25 = 120 人次", "用现期除以倍数，不是直接乘增长率。"], ["求差并检查", "150 − 120 = 30 人次", "再算 30 ÷ 120 = 25%，与题目吻合。"]],
      pitfall: "150 × 25% = 37.5 是错的：25% 的基数是原来的 120，不是现在的 150。",
      boundary: "下降时用带负号的增长率。变化量可以是负数，“减少量”则写减少的正数大小。",
      qid: "q230"
    },
    advanced: {
      takeaway: "原数据是近似数，反推结果就未必唯一。",
      goal: "先检查条件与精度，不被计算器的小数位迷惑。",
      terms: [["口径", "对象、时间、单位相配"], ["分母", "零基期不能直接除"], ["精度", "舍入后可能有多个原值"]],
      example: "现期连续数量四舍五入为 120，增长率 20% 准确。基期一定是 100 吗？",
      steps: [["先试一个原值", "120 ÷ 1.2 = 100", "这是一个可能的答案，但还不能说它唯一。"], ["再找一个可能", "120.48 ÷ 1.2 = 100.4", "120.48 四舍五入到整数也会报告为 120。"], ["比较两个结果", "100 和 100.4 都可能", "相同的已知条件，能得到不同原值，所以不能确定唯一基期。"]],
      pitfall: "多保留计算小数位，不能找回原数据在四舍五入时丢掉的信息。",
      boundary: "上述例子按连续数量与通常四舍五入规则。更完整的零负基期、合并权重与区间条件，见本轮讲义。",
      qid: "q231"
    }
  };
  const sentences = text => String(text).match(/[^。！？]+[。！？]?/g) || [String(text)];
  function questionCard(l, stage, curated) {
    const C = window.STUDY_CONTENT;
    const ids = curated ? [curated.qid] : (l.learningLevels?.[stage]?.questionIds || l.practice || []);
    const q = ids.map(id => C.questions.find(q => q.id === id)).find(q => q && !q.graphic && !q.materialId && !q.materialIds && !q.materialGroup);
    if (!q) return "";
    return `<section class="focus-check" data-focus-question="${esc(q.id)}"><div class="focus-section-label"><span>02</span><h2>${curated ? "换一组数，自己试试" : "做一道题，检验理解"}</h2></div><p class="focus-question">${esc(q.stem)}</p><ol class="focus-options" type="A">${q.options.map(o => `<li>${esc(o)}</li>`).join("")}</ol><details class="focus-answer"><summary>想好后，展开答案与原因</summary><p><strong>答案：${"ABCD"[q.answer]}</strong></p><p>${esc(q.explanation)}</p></details><a class="focus-practice-link" href="#quiz/one/${esc(q.id)}">独立作答并记录这题 →</a><small>展开答案不产生作答记录；进入练习提交后才会记录。</small></section>`;
  }
  function customTeaching(data) {
    return `<div class="focus-mainline"><div class="focus-section-label"><span>01</span><h2>跟着一个例子走</h2></div><p class="focus-example-question">${esc(data.example)}</p><ol class="focus-worked-steps">${data.steps.map((s,i) => `<li><span class="focus-step-number">${i+1}</span><div><h3>${esc(s[0])}</h3><strong class="focus-calculation">${esc(s[1])}</strong><p>${esc(s[2])}</p></div></li>`).join("")}</ol><p class="focus-pitfall"><strong>最容易错：</strong>${esc(data.pitfall)}</p><p class="focus-boundary">${esc(data.boundary)}</p></div>`;
  }
  function guidedTeaching(sections) {
    const primary = sections.filter(s => !/补充|复盘|出处|归属/.test(s[0]));
    const steps = (primary.length ? primary : sections).slice(0, 4);
    return `<div class="focus-mainline" data-focus-steps><div class="focus-section-label"><span>01</span><h2>一次弄懂一个知识点</h2></div><div class="focus-step-tabs" role="tablist" aria-label="本轮知识点">${steps.map((s,i) => `<button type="button" role="tab" id="focus-tab-${i}" aria-controls="focus-step-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-focus-step="${i}"><span>${i+1}</span>${esc(s[0].replace(/^[^：]+：/, ""))}</button>`).join("")}</div>${steps.map((s,i) => {const parts=sentences(s[1]), examples=parts.slice(1).filter(p=>/例如|比如|举例|设原来|假设/.test(p)), rest=parts.slice(1).filter(p=>!examples.includes(p));return `<section class="focus-step-panel" role="tabpanel" id="focus-step-${i}" aria-labelledby="focus-tab-${i}" tabindex="0" ${i ? "hidden" : ""}><span class="focus-step-count">知识点 ${i+1} / ${steps.length}</span><h3>${esc(s[0].replace(/^[^：]+：/, ""))}</h3><p class="focus-key-sentence">${esc(parts[0])}</p>${examples.length ? `<div class="focus-inline-example"><strong>用例子理解</strong>${examples.map(p=>`<p>${esc(p)}</p>`).join("")}</div>` : ""}<div class="focus-explanation">${rest.map(p=>`<p>${esc(p)}</p>`).join("")}</div>${i < steps.length-1 ? `<button type="button" class="btn secondary focus-next" data-focus-step="${i+1}">看懂了，接着看第 ${i+2} 点 →</button>` : '<p class="focus-finish-hint">接着用下面的题目检验，不需要先背下全文。</p>'}</section>`;}).join("")}</div>`;
  }
  function transform(html, l, stage) {
    const template=document.createElement("template"); template.innerHTML=html;
    const reading=template.content.querySelector(".reading"); if(!reading)return html;
    const originalSections=[...reading.querySelectorAll(":scope > section:not(.level-guide):not(.diagram-box)")];
    if(!originalSections.length)return html;
    const selected=l.learningLevels?.[stage];
    const sections=originalSections.map(s=>[s.querySelector("h2")?.textContent || "讲解",s.querySelector("p")?.textContent || ""]);
    const data=l.id === "growth" ? growth[stage] : null;
    const formula=reading.querySelector(":scope > .formula"), guide=reading.querySelector(":scope > .level-guide"), aid=reading.querySelector(":scope > .theory-learning-aids");
    const heading=reading.querySelector("h1"), subtitle=reading.querySelector(":scope > .subtitle");
    const metadata=subtitle?.nextElementSibling;if(metadata?.matches("span.muted"))metadata.remove();
    reading.classList.add("focus-reading");
    const hero=document.createElement("div");hero.className="focus-hero";
    hero.innerHTML=`<span class="focus-kicker">本轮先抓住这一点</span><p class="focus-takeaway">${esc(data?.takeaway || selected?.goal || l.subtitle)}</p>${data ? `<p class="focus-goal">${esc(data.goal)}</p><dl class="focus-terms">${data.terms.map(t=>`<div><dt>${esc(t[0])}</dt><dd>${esc(t[1])}</dd></div>`).join("")}</dl>` : `<p class="focus-goal">先理解下面的关键句，再看解释和例子。</p>`}`;
    if(formula&&!data)hero.append(formula);else formula?.remove();
    subtitle.after(hero);
    const main=document.createElement("div");main.className="focus-teaching";main.innerHTML=data ? customTeaching(data) : guidedTeaching(sections);hero.after(main);
    const check=document.createElement("div");check.innerHTML=questionCard(l,stage,data);main.after(check);
    const memoryHTML=window.STUDY_MEMORY_METHODS?.render(l.id,stage);
    if(memoryHTML)main.insertAdjacentHTML("beforebegin",memoryHTML);
    const practice=document.createElement("div");practice.className="focus-practice";
    if(guide){practice.append(guide);guide.querySelector("h2").textContent="再练一组，看看能否独立运用";}
    check.after(practice);
    const original=document.createElement("details");original.className="focus-original";original.dataset.focusOriginal="true";
    original.innerHTML=`<summary><span><strong>本轮完整讲义与补充</strong><small>${sections.length} 个原文知识点 · 需要时再查</small></span><span aria-hidden="true">＋</span></summary><p class="focus-original-note">完整保留原有条件、推导与边界。先完成上面的学习主线，遇到疑问再展开对照。</p>`;
    originalSections.forEach(s=>original.append(s));if(aid)original.append(aid);practice.after(original);
    // Existing diagrams remain interactive; only change their position, not their markup or IDs.
    const diagram=reading.querySelector(":scope > .diagram-box");if(diagram)main.after(diagram);
    const oldPaths=reading.querySelector(".learning-paths");oldPaths?.remove();
    return template.innerHTML;
  }
  function showStep(root,index,focus) {
    const tabs=[...root.querySelectorAll('[role="tab"]')], panels=[...root.querySelectorAll('[role="tabpanel"]')];
    if(!tabs[index]||!panels[index])return;
    tabs.forEach((t,i)=>{t.setAttribute("aria-selected",String(i===index));t.tabIndex=i===index?0:-1;});
    panels.forEach((p,i)=>{p.hidden=i!==index;});
    if(focus)panels[index].focus({preventScroll:true});
  }
  if(typeof document !== "undefined") document.addEventListener("click",e=>{const b=e.target.closest?.("[data-focus-step]");if(b)showStep(b.closest("[data-focus-steps]"),Number(b.dataset.focusStep),b.classList.contains("focus-next"));});
  if(typeof document !== "undefined") document.addEventListener("keydown",e=>{const tab=e.target.closest?.('[role="tab"][data-focus-step]');if(!tab||!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;const root=tab.closest("[data-focus-steps]"),tabs=[...root.querySelectorAll('[role="tab"]')],i=tabs.indexOf(tab);let next=e.key==="Home"?0:e.key==="End"?tabs.length-1:(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;e.preventDefault();showStep(root,next,false);tabs[next].focus();});
  window.STUDY_FOCUSED_READER={transform};
})();
