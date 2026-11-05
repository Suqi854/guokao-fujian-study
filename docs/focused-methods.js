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
  C.methods.push({
  "id": "luozhixiang-2021",
  "name": "罗志祥",
  "kind": "author",
  "identity": "页面署名罗志祥并标示青岛分院；仅确认历史文章署名，未据此认定现任教师职务，也不关联同名其他人士。",
  "title": "2022国家公务员备考之行程问题中的平均速度",
  "date": "2021-10-25",
  "publisher": "华图教育（页面来源青岛分院）",
  "url": "https://www.huatu.com/2021/1025/2313233.html",
  "topic": "等距与等时平均速率",
  "observation": "正文明确区分按路程分半与按时间分半的条件。",
  "application": "本站独立推导：先将每段路程与时间写清，再用总路程除总时间；在条件满足时与简式交叉核对。",
  "boundary": "只关联等距/等时两题，不作为相遇、追及或停留题的出处。页面公式多为图片，本站未声称逐图核验；公式与例题独立推导，未复制商业原题。尚无第二位具名教师来源，不能视作双教师交叉核验。",
  "lessons": [
    "travel"
  ],
  "questionIds": [
    "q163",
    "q164"
  ],
  "checked": "2026-11-05",
  "rights": "仅提供出处链接与独立评论；无全文、例题、图片或课程转载授权。"
});
  for (const q of C.questions)
    q.meta.methodIds = C.methods
      .filter((m) => m.questionIds ? m.questionIds.includes(q.id) : m.lessons.includes(q.lesson))
      .map((m) => m.id);
})();
