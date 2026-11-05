"use strict";
// Optional read-only renderer. Call inside existing reference <details>; never before a user's first attempt by default.
(() => {
  const esc = value => String(value == null ? "" : value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const paragraphs = values => values.map(n => n === "任务" ? "任务要求" : "材料【" + String(n) + "】").join("、");
  window.SHENLUN_FEEDBACK = {
    render(task) {
      if (!task || !Array.isArray(task.evidenceDetails)) return "";
      const evidence = task.evidenceDetails.map(e => `<li><strong>要点 ${esc(e.point)} · ${esc(paragraphs(e.paragraphs || []))}</strong><p>${esc(e.reason)}</p></li>`).join("");
      const errors = (task.misconceptions || []).map(e => `<li><p><strong>弱表达：</strong>${esc(e.weak)}</p><p><strong>问题：</strong>${esc(e.problem)}</p><p><strong>改写：</strong>${esc(e.revision)}</p></li>`).join("");
      const steps = (task.rewriteSteps || []).map(s => `<li>${esc(s)}</li>`).join("");
      return `<section class="shenlun-feedback"><h3>参考要点依据</h3><ol>${evidence}</ol><h3>常见误区与改写</h3><ul>${errors}</ul><h3>二稿怎么改</h3><ol>${steps}</ol><p class="stat-foot">${esc(task.reviewNote || "原创编辑参考，不是官方评分。")}</p></section>`;
    }
  };
})();
