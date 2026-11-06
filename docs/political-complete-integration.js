"use strict";
// Compose the two reviewed additions. No storage, user-state migration or network requests.
(() => {
  const C = window.STUDY_CONTENT, P = window.STUDY_COURSE;
  const M = window.STUDY_MAO_DENG_EXPANSION, B = window.STUDY_MARXISM_COURSE;
  if (!C || !M || !B) throw Error('political curriculum: both content bundles are required');
  const order = [
    'marx-worldview','marx-connection','contradiction-method','marx-quantity-negation','marx-categories',
    'practice-cognition','marx-truth-value',
    'productive-relations','marx-social-structure','social-being-people',
    'marx-commodity-value','marx-surplus-capital','marx-capitalism-development','marx-socialism-communism',
    'mao-thought-context','mao-living-soul',...M.lessonIds,
    'six-method-principles','development','modernization','new-quality-productivity','reform-framework-2024',
    'unified-market-rules','new-development-pattern','education-strong-2035'
  ];
  const politicalIds = C.lessons.filter(l => l.category === '政治理论').map(l => l.id);
  if (new Set(order).size !== order.length || order.length !== politicalIds.length || politicalIds.some(id => !order.includes(id))) throw Error('political curriculum: route must include every political lesson once');
  const track = P?.tracks.find(t => t.id === 'politics');
  if (track) {
    const baseUnits = track.units.slice(0, 4);
    const history = track.units.find(u => u.ids.includes('mao-thought-context'));
    const development = track.units.find(u => u.ids.includes('development'));
    const policy = track.units.find(u => u.ids.includes('unified-market-rules'));
    if (!history || !development || !policy) throw Error('political curriculum: missing old course unit');
    track.units = [...baseUnits, {...history, ids:['mao-thought-context','mao-living-soul']}, ...M.courseUnits,
      {...development,title:'新时代思想方法与发展框架',ids:['six-method-principles',...development.ids]}, policy];
    track.brief = '马原基础 → 毛泽东思想 → 改革开放理论 → 新时代框架与政策文本';
    track.start = '32课，分入门、巩固、提升三轮，按原理与理论发展顺序编排。';
    if (track.units.flatMap(u => u.ids).join('|') !== order.join('|')) throw Error('political curriculum: continuous route order mismatch');
  }
  const steps = new Map([...C.theoryTrack.steps,...M.proposedTheorySteps].map(s => [s.lessonId,s]));
  C.theoryTrack.steps = order.map(id => {
    const lesson = C.lessons.find(l => l.id === id);
    return steps.get(id) || {lessonId:id,purpose:lesson.subtitle,bridge:'先核文本年代与对象，再区分理论框架、目标和实施证据。'};
  });
  C.theoryTrack.scope = '32课基础主干路线，含14课马原、6课毛泽东思想、4课改革开放理论及8课新时代框架与指定政策文本。数量不是考试覆盖率；历史理论、政策目标和现实成效分别核对。';
  C.theoryTrack.gaps = [
    '尚未穷尽马克思主义理论全体系、毛泽东思想全部细目、党史、原典与复杂综合材料；本批18课108题只补基础主干。',
    '新时代思想的完整体系、最新中央与福建政策及年度时政仍待分批核验；现有政策课保留各自指定版本，不能视作全部现行政策。',
    '原创练习不是真题，训练层次未经考生样本标定，不提供官方考频、考试覆盖率或分数保证。'
  ];
  const coverage = C.coverageMatrix.find(g => g.module === '政治理论');
  for (const id of M.lessonIds) {
    const l = C.lessons.find(x => x.id === id);
    coverage.topics.push({id,title:l.title,lessonIds:[id],questionIds:[...l.practice],writingIds:[],scope:l.subtitle,status:'intro',remaining:'已编写三轮基础讲解、记忆卡与6道原创练习；全部细目、综合变式和真题尚未覆盖。'});
  }
  for (const g of coverage.gaps) {
    if (g.title === '理论体系与党史专题') g.remaining = '已补马原与毛泽东思想、改革开放理论基础主干；完整原典、思想发展史、党史和更多综合专题仍缺。';
    if (g.title === '理论联系材料的情境题') g.remaining = '本批增加108道原创基础练习；跨主题长材料、政策实施核验和经样本标定的难度仍缺。';
  }
  C.coverage = C.coverage.map(row => row[0] === '政治理论' ? [row[0],politicalIds.map(id=>C.lessons.find(l=>l.id===id).title.split('：')[0]).join('、'),row[2]] : row);
  window.STUDY_POLITICAL_CURRICULUM = {version:'0.39.0',lessonIds:order,newLessonIds:[...B.lessonIds,...M.lessonIds],newQuestionIds:[...B.questionIds,...M.questionIds],scope:C.theoryTrack.scope};
})();
