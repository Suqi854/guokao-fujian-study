"use strict";
(() => {
  const C = window.STUDY_CONTENT;
  C.methods.push({
    id: "gaoshuang-2011",
    name: "郜爽",
    title: "手机报：名师郜爽公务员考试言语理解备考秘籍",
    date: "2011-10-18",
    publisher: "华图教育",
    url: "https://www.huatu.com/a/ziliao/gwy/qita/2011/1018/130612.html",
    topic: "细节限定与语句衔接",
    observation:
      "历史资料提醒检查细节中的时间、数量和逻辑变化，也讨论衔接句如何照应上下文。",
    application:
      "本站练法：列出原句限制，与选项逐项核对，再将候选衔接句代回两端。",
    boundary: "不能只凭相同词语选择答案；文章所述历史考试特点不转作当前考情。该页依据v0.6留存核验；v0.8独立复核未能访问，不表述为本轮重新读通。",
    kind: "historical-teacher",
    identity:
      "页面有郜爽介绍与教学特色段，描述当时研究及教学工作；作者栏为华图教育，不推断现任职务。",
    lessons: [
      "detail-reading",
      "detail-boundaries",
      "cohesion-reference",
      "sentence-link",
    ],
    checked: "2026-11-05",
    rights: "仅作链接索引与独立评论；未取得原文、商业题目及课程转载授权。",
  });
  C.comparisons.push({
    id: "detail-reading",
    module: "言语理解",
    filterLabel: "言语理解 · 细节",
    title: "忠实改写：语义对应与细节限制",
    lesson: "detail-boundaries",
    refs: ["gufei-2010", "gaoshuang-2011"],
    agreement: "都要求把选项放回材料含义中核对，不能以词面熟悉程度代替理解。",
    difference:
      "顾斐资料讨论问题定位与语义对应；郜爽资料把检查细化到时间、数量、概念和逻辑变化。二者互补，不是彼此相反。",
    conclusion:
      "本站独立练法：先确认设问方向，再比较对象、状态、范围和逻辑；表达改了但这些限制未变，才可能是忠实改写。",
    boundary:
      "没有交代不等于已经否定，相关不等于唯一因果；本站的逻辑检验与原创反例不冒充作者共同提出。",
    gap: "已核实两位具名教师的历史资料；仍缺不同题型的大样本学习效果证据，不声称固定提分。",
  });
  const taskKinds = {
    w01: "归纳概括",
    w02: "提出对策",
    w03: "应用写作",
    w04: "文章写作",
    w05: "综合分析",
    w06: "提出对策",
    w07: "归纳概括",
    w08: "提出对策",
    w09: "归纳概括",
    w10: "归纳概括",
    w11: "提出对策",
    w12: "应用写作",
    w13: "文章写作",
    w14: "综合分析",
    w15: "归纳概括",
    w16: "综合分析",
  };
  for (const w of C.writing) if (taskKinds[w.id]) w.taskKind = taskKinds[w.id];
  const g = C.methods.find((m) => m.id === "gufei-2010");
  g.lessons.push("detail-boundaries");
  C.writing.find((w) => w.id === "w15").materialGroup = "service-modes";
  C.writing.find((w) => w.id === "w16").materialGroup = "service-modes";
  for (const q of C.questions)
    q.meta.methodIds = C.methods
      .filter((m) => m.lessons.includes(q.lesson))
      .map((m) => m.id);
})();
