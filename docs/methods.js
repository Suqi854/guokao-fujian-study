"use strict";
// Bibliographic pointers and brief original commentary, not reproductions of courses, templates or commercial questions.
(() => {
  const C = window.STUDY_CONTENT;
  C.methods = [
    {
      id: "gufei-2010",
      name: "顾斐",
      identity: "该历史页面标题标注为华图老师；不推断现任职务。",
      title: "言语理解与表达之片段阅读答题技巧",
      date: "2010-06-07",
      publisher: "华图网校",
      url: "https://wx.huatu.com/htnews/html/ziliao/20100607/11632.html",
      topic: "言语阅读",
      observation: "这份资料关注读题顺序，以及选项与文段意思的对应。",
      application:
        "本站练法：先判断问主旨还是细节，再逐项核对对象、范围与语气。",
      boundary:
        "词语相近不等于逻辑等价；历史页面中的时间指标不作为当前考试要求。",
      lessons: ["mainidea", "word", "sentence-link", "detail-reading"],
    },
    {
      id: "caijinlong-2011",
      name: "蔡金龙",
      identity:
        "页面将其介绍为当时华图判断推理教研人员；页面作者栏为华图教育。",
      title: "手机报：名师蔡金龙定义判断题型巧解",
      date: "2011-11-07",
      publisher: "华图教育",
      url: "https://www.huatu.com/a/ziliao/gwy/qita/2011/1107/140605.html",
      topic: "定义判断",
      observation: "这份资料把题目给定的定义作为选项判断依据。",
      application:
        "本站练法：把必要条件列成清单，逐个检查选项有没有缺项或偷换条件。",
      boundary: "条件间是“且”还是“或”必须按题干处理；只找相同关键词不够。",
      lessons: ["definition"],
    },
    {
      id: "zhongjun-2007",
      name: "钟君",
      identity:
        "华图发布的2007年访谈中，主持人称其为申论辅导专家；不认定为官方阅卷标准。",
      title: "钟君关于2007年北京社招申论的访谈",
      date: "2007-07-03",
      publisher: "华图教育网（历史访谈）",
      url: "https://www.huatu.com/a/fangtan/2007/0703/9553.html",
      topic: "申论材料结构",
      observation: "访谈强调依据材料，并梳理材料之间的关系。",
      application:
        "本站练法：先区分现象、原因、影响与做法，再按本题任务取舍和组织。",
      boundary:
        "这是一场特定年份访谈；其中分数、扣分、热点预测等说法未转作本站规则。",
      lessons: ["summary", "analysis-writing", "material-mapping", "proposal"],
    },
    {
      id: "caodewei-2022",
      name: "曹德伟",
      identity: "页面署名已核对；尚未核实教师职务，因此仅标为文章作者。",
      title: "乡镇公务员申论基础题型——归纳概括题解题技巧",
      date: "2022-02-16",
      publisher: "中公乡镇公务员考试网",
      url: "https://xzgwy.offcn.com/2022/sl_0216/34934.html",
      topic: "申论作答对象",
      observation: "文章着重将题目所问的对象与材料信息对应起来。",
      application:
        "本站练法：给每条提纲补上“回答哪一问、由哪条事实支持”，删除无关内容。",
      boundary: "不将“多写关键词”理解为堆近义词；公开文章不等于官方评分细则。",
      lessons: ["summary", "material-mapping", "answer-revision"],
    },
  ].map((m) => ({
    ...m,
    checked: "2026-11-05",
    rights:
      "仅提供出处索引与本站独立评论；未获课程、例题、模板或全文转载授权。",
  }));
  for (const q of C.questions)
    q.meta.methodIds = C.methods
      .filter((m) => m.lessons.includes(q.lesson))
      .map((m) => m.id);
})();
