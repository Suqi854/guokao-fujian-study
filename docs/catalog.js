"use strict";
// Provenance is separate from intended study use. Null means unknown/not applicable, never an inferred year or difficulty.
(() => {
  const C = window.STUDY_CONTENT;
  const types = {
    growth: "增长计算",
    share: "比重计算",
    average: "平均数计算",
    logic: "条件推理",
    argument: "论证评价",
    definition: "定义判断",
    mainidea: "主旨概括",
    word: "逻辑填空",
    work: "工程问题",
    count: "排列组合",
    probability: "概率计算",
    "compound-growth": "间隔与年均增长",
    "mixed-growth": "混合增长",
    rotation: "平面图形旋转",
    overlay: "图形叠加",
    analogy: "类比推理",
    arrangement: "排列推理",
    "sentence-order": "语句排序",
    "detail-reading": "细节判断",
    travel: "行程问题",
    inclusion: "集合容斥",
    remainders: "余数问题",
    development: "理论概念",
    modernization: "理论概念",
    "state-organs": "国家机构",
    "civil-capacity": "民事行为能力",
    cpi: "经济常识",
    "phase-change": "物理常识",
    "fujian-geography": "福建自然地理",
    "history-periods": "历史分期",
    historiography: "史书体例",
    "paper-printing": "古代科技",
    "cube-net": "空间重构",
    "solid-views": "立体投影",
    "sentence-link": "语句衔接",
    "context-blanks": "逻辑填空",
    "geometry-scale": "几何计算",
    "profit-discount": "经济利润",
    mixture: "浓度问题",
  };
  C.catalogVersion = 1;
  C.methods = []; // Only add named-teacher methods once identity, exact source and usage rights are reviewed.
  for (const q of C.questions) {
    const l = C.lessons.find((x) => x.id === q.lesson);
    q.meta = {
      module: l.category,
      type: l.questionType || types[l.id] || "基础练习",
      trainingStage: q.trainingStage || "未分层",
      trainingGoal: q.trainingGoal || "此前版本基础练习，尚未逐题分层",
      knowledgeIds: [l.id],
      tags: [...l.tags],
      applicableExams:
        l.category === "福建专题" ? ["fujian"] : ["national", "fujian"],
      examSource: { system: null, year: null, paper: null, number: null },
      difficulty: { level: null, basis: null },
      purpose: "基础方法练习；不是经考生样本标定的难度",
      source: {
        kind: "original",
        title: "本站原创练习",
        url: null,
        referenceIds: [...l.sources],
      },
      rights: {
        status: "original",
        note: "题干、选项、解析与图示独立编写；参考来源仅支持注明事实，不代表获准转载来源全文。",
      },
      answerReview: {
        status: "reviewed",
        date: "2026-11-05",
        basis: "按题干条件独立推导；事实题核对讲义所列公开来源。",
      },
      methodIds: [],
    };
  }
})();
