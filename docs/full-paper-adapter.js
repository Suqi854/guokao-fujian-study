"use strict";
// Candidate integration helper only. No storage, DOM, network or source-content mutation.
(() => {
  const fail = message => { throw Error(message); };
  function createRun(paperId, { id, minutes, now } = {}) {
    const catalog = window.FULL_TRAINING_PAPERS;
    const M = window.LONG_MOCK_MODEL, T = window.STUDY_TRAINING, C = window.STUDY_CONTENT;
    if (!catalog || !M || !T || !C) fail('题卷目录或长题组模型尚未加载。');
    const paper = catalog.papers.find(p => p.id === paperId);
    if (!paper || paper.revision !== 1 || paper.official !== false || paper.isPastExam !== false) fail('未知或不支持的训练卷版本。');
    if (!Number.isSafeInteger(minutes) || minutes < 1 || minutes > M.LIMITS.minutes) fail('请明确设置1–480分钟训练预算，不能当作官方考试时长。');
    const seen = new Set();
    const sections = paper.sections.map(section => ({
      name: section.module, cursor: 0, elapsedMs: 0,
      items: section.items.map(item => {
        if (seen.has(item.questionId)) fail('卷内题号重复。');
        seen.add(item.questionId);
        const matches = C.questions.filter(q => q.id === item.questionId);
        if (matches.length !== 1) fail('题号缺失或不唯一：'+item.questionId);
        const q = matches[0];
        if (q.graphic || q.meta?.source?.kind !== 'original' || q.meta?.rights?.status !== 'original') fail('题目来源或资源不符合本卷要求：'+q.id);
        if (q.meta.module !== section.module || q.meta.type !== item.type || q.lesson !== item.lesson || T.signature(q) !== item.signature) fail('题目或共用材料版本变化，不能悄悄换题：'+q.id);
        return { qid: q.id, signature: item.signature, answer: q.answer, optionCount: q.options.length, choice: null, type: q.meta.type, lesson: q.lesson };
      })
    }));
    if (seen.size !== 120) fail('本卷必须恰有120个不同题号。');
    const run = M.validateRun({id,title:paper.title+'（原创模拟·非真题·r1）',kind:'original-custom',official:false,createdAt:now,endedAt:null,status:'paused',budgetMs:minutes*60000,anchorMs:null,elapsedMs:0,section:0,clockIssue:false,sections});
    if (M.compatibility(run).length) fail('题目版本不能与现有长题组兼容。');
    return run;
  }
  window.FULL_PAPER_ADAPTER = Object.freeze({ createRun });
})();
