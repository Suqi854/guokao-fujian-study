"use strict";
// Short, verified quotations. Commentary and emphasis are editorial, never part of the source.
(() => {
  const P = window.STUDY_COURSE;
  if (!P || !window.STUDY_COMPLETE_TOPICS || typeof document === 'undefined') return;
  const data = {
    dialectics: {
      title: '矛盾的特殊性与解决方法',
      work: '《矛盾论》', author: '毛泽东', date: '1937年8月',
      source: '共产党员网', pageDate: '2017-08-29', checked: '2026-11-07',
      dateNote: '原作署1937年8月；网页末注明收入选集第一版时有补充、删节和修改，不是未修订手稿。',
      url: 'https://news.12371.cn/2017/08/29/ARTI1504001209326173.shtml',
      location: '第三节“矛盾的特殊性”，以“不同质的矛盾”起首的段落首句。',
      context: '本句讨论矛盾性质与解决方法的对应关系。这里只选一句，其他原理仍需结合全文学习。',
      excerpts: [{ text: '不同质的矛盾，只有用不同质的方法才能解决。', parts: [{ text: '不同质的矛盾', note: 0 }, '，只有用', { text: '不同质的方法', note: 1 }, '才能解决。'] }],
      notes: [
        { term: '不同质的矛盾', text: '先辨认矛盾的性质与具体条件，不能只看表面现象，也不能把矛盾特殊性理解成否认普遍性。' },
        { term: '不同质的方法', text: '处理方法要对应问题性质。例如，信息不通与执行不力应分别找原因，不能不加分析地套同一措施。例子为本站编写。' }
      ],
      blanks: ['不同质的矛盾', '不同质的方法']
    },
    'mao-thought': {
      title: '毛泽东思想活的灵魂',
      work: '《关于建国以来党的若干历史问题的决议》', author: '党的十一届六中全会', date: '1981年6月27日通过',
      source: '理论中国网（中央党史和文献研究院）', pageDate: '1981-06-27', checked: '2026-11-07',
      dateNote: '网页所标日期与文件通过日相同，不据此判断网页实际上线时间。',
      url: 'https://cn.theorychina.org.cn/c/1981-06-27/1488669.shtml',
      location: '第（30）段首句的句末节选；前文说明毛泽东思想活的灵魂有三个基本方面。',
      context: '以下是句末节选，不是整句。三个基本方面由同一份决议概括，不要与革命的三大法宝混淆。',
      excerpts: [{ text: '即实事求是，群众路线，独立自主。', parts: ['即', { text: '实事求是', note: 0 }, '，', { text: '群众路线', note: 1 }, '，', { text: '独立自主', note: 2 }, '。'] }],
      notes: [
        { term: '实事求是', text: '重在从客观实际出发，把理论与实践联系起来；不是拿现成结论去裁剪事实。' },
        { term: '群众路线', text: '既涉及为了谁、依靠谁，也涉及怎样形成并检验工作意见；不能只理解为听取意见。' },
        { term: '独立自主', text: '立足本国实际与自身力量，同时学习有益的外部经验；不等于闭关自守。' }
      ],
      blanks: ['实事求是', '群众路线', '独立自主']
    },
    'reform-theory': {
      title: '计划、市场与社会制度',
      work: '《在武昌、深圳、珠海、上海等地的谈话要点》', author: '邓小平', date: '1992年1月18日至2月21日',
      source: '人民网·邓小平纪念网', pageDate: '2013-08-19', checked: '2026-11-07',
      url: 'https://cpc.people.com.cn/n/2013/0819/c69710-22616543.html',
      location: '人民网“言论精粹”所引段落的末句；原文篇名和谈话时间见该页署注。',
      context: '原段落讨论如何辨别社会制度，反对把计划、市场简单地与某一种制度画等号。',
      excerpts: [{ text: '计划和市场都是经济手段。', parts: ['计划和市场', { text: '都是', note: 0 }, { text: '经济手段', note: 1 }, '。'] }],
      notes: [
        { term: '都是', text: '计划与市场均可用于经济运行。判断社会制度性质，不能只看是否使用其中一种手段。' },
        { term: '经济手段', text: '这里是在区分手段与制度性质，不是在说任何具体政策都同样有效，也不否认二者各有适用条件。' }
      ],
      blanks: ['都是', '经济手段']
    },
    'new-era-framework': {
      title: '把问题意识与整体视角联系起来',
      work: '党的二十大报告', author: '习近平', date: '2022年10月16日',
      fullWork: '《高举中国特色社会主义伟大旗帜 为全面建设社会主义现代化国家而团结奋斗——在中国共产党第二十次全国代表大会上的报告》',
      source: '共产党员网（来源：新华社）', pageDate: '2022-10-25', checked: '2026-11-07',
      url: 'https://www.12371.cn/2022/10/25/ARTI1666705047474465.shtml',
      location: '第二部分“开辟马克思主义中国化时代化新境界”，两段各自的首句；段落间的正文未在此转载。',
      context: '以下两句分别摘自两个段落，不能拼成连续原文。这里只选“六个必须坚持”中的两项。',
      excerpts: [
        { text: '——必须坚持问题导向。', parts: ['——必须坚持', { text: '问题导向', note: 0 }, '。'] },
        { text: '——必须坚持系统观念。', parts: ['——必须坚持', { text: '系统观念', note: 1 }, '。'] }
      ],
      notes: [
        { term: '问题导向', text: '从实践中的真实问题出发，分析症结并寻找解决办法；不能把列出问题当成已经解决。' },
        { term: '系统观念', text: '观察部分之间、局部与全局、眼前与长远的关系，防止只改善一处却把代价转移到其他地方。' }
      ],
      blanks: ['问题导向', '系统观念']
    }
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = s => String(s ?? '').normalize('NFKC').trim().replace(/\s+/g, '');
  const fresh = () => ({ mode: 'read', values: [], submitted: false, seen: false, reset: false });
  const sessions = {};
  const state = id => sessions[id] || (sessions[id] = fresh());
  for (const [id, item] of Object.entries(data)) {
    const terms = item.excerpts.flatMap(e => e.parts.filter(p => typeof p !== 'string').map(p => p.text));
    if (JSON.stringify(terms) !== JSON.stringify(item.blanks)) throw Error('Original blanks mismatch: ' + id);
    for (const e of item.excerpts) if (e.parts.map(p => typeof p === 'string' ? p : p.text).join('') !== e.text) throw Error('Original text mismatch: ' + id);
  }
  const judge = (value, answer) => !normalize(value) ? 'empty' : normalize(value) === normalize(answer) ? 'exact' : 'different';
  function source(item) {
    return `<details class="original-source"><summary>出处与原文链接</summary><p>${esc(item.fullWork || item.work)} · ${esc(item.author)}</p><p>${esc(item.location)}</p><p>${esc(item.source)} · 网页标注 ${esc(item.pageDate)} · 核对 ${esc(item.checked)}</p>${item.dateNote ? `<p>${esc(item.dateNote)}</p>` : ''}<a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">到权威网站读完整原文 ↗</a></details>`;
  }
  function render(id) {
    const item = data[id], s = state(id);
    if (!item) return '';
    let blank = 0;
    const content = s.mode === 'read'
      ? `<p class="original-context">${esc(item.context)}</p><div class="original-quotes">${item.excerpts.map((e, i) => `<blockquote cite="${esc(item.url)}"><p data-original-quote="${i}">${e.parts.map(p => typeof p === 'string' ? esc(p) : `<mark>${esc(p.text)}</mark>`).join('')}</p></blockquote>`).join('')}</div><section class="original-notes" aria-label="学习标注，本站编写"><h3>学习标注 <span>本站编写</span></h3><ul>${item.notes.map(n => `<li><strong>${esc(n.term)}</strong><span>${esc(n.text)}</span></li>`).join('')}</ul></section>`
      : `<form data-original-form="${id}" autocomplete="off"><p class="original-instruction">按原文填关键词。此处检验字词回忆，不判定是否理解或掌握。</p>${item.excerpts.map((e, i) => `<p class="original-fill">${item.excerpts.length > 1 ? `<span class="original-fragment-label">节选 ${i + 1}</span>` : ''}${e.parts.map(p => { if (typeof p === 'string') return esc(p); const n = blank++; return `<input type="text" maxlength="80" spellcheck="false" aria-label="原文第 ${n + 1} 空" data-original-input="${n}" value="${esc(s.values[n] || '')}" placeholder="第 ${n + 1} 空">`; }).join('')}</p>`).join('')}<div data-original-result role="status" aria-live="polite" tabindex="-1">${s.submitted ? results(item, s) : ''}</div><div class="original-actions"><button class="btn" type="submit">核对原文</button><button class="btn secondary" type="button" data-original-action="reset">重新填空</button></div>${s.reset ? `<div class="original-reset" role="group" aria-label="确认清空原文填空"><p>清空本专题这轮原文填空？</p><button class="btn" type="button" data-original-action="reset-confirm">清空重填</button><button class="btn secondary" type="button" data-original-action="reset-cancel">保留答案</button></div>` : ''}<p class="original-foot">本轮仅在当前页面临时保留，刷新后清空；不写入学习记录或成绩。</p></form>`;
    return `<section class="topic-block theory-original" id="topic-original" data-original-topic="${id}" tabindex="-1"><header class="original-head"><span class="original-eyebrow">原文短摘 · 重点标注</span><h2>${s.mode === 'read' ? esc(item.title) : '原文填空'}</h2><p class="original-byline">${esc(item.author)} · ${esc(item.work)}<br>${esc(item.date)}</p></header><div class="original-mode" role="group" aria-label="原文阅读或填空"><button type="button" data-original-action="read" aria-pressed="${s.mode === 'read'}">读原文与标注</button><button type="button" data-original-action="quiz" aria-pressed="${s.mode === 'quiz'}">遮住原文 · 填空</button></div>${content}${source(item)}<p class="original-boundary">高亮与标注由本站添加；下方讲解、例子和记忆卡为本站编写，不是原文。</p></section>`;
  }
  function results(item, s) {
    const statuses = item.blanks.map((answer, i) => judge(s.values[i], answer));
    return `<p class="original-score">${statuses.filter(x => x === 'exact').length} / ${statuses.length} 空与原文一致${s.seen ? ' · 本轮已回看原文或答案' : ''}</p><ul class="original-results">${item.blanks.map((answer, i) => `<li class="original-${statuses[i]}"><strong>第 ${i + 1} 空 · ${statuses[i] === 'exact' ? '与原文一致' : statuses[i] === 'empty' ? '未填' : '表述不同，请对照'}</strong><span>原文用词：${esc(answer)}</span></li>`).join('')}</ul>`;
  }
  const oldRender = P.render;
  P.render = (...args) => {
    const html = oldRender(...args), parts = args[0], id = parts[3];
    if (parts[2] !== 'topic' || !data[id]) return html;
    const tmp = document.createElement('template'); tmp.innerHTML = html;
    const root = tmp.content.querySelector('[data-complete-topic]');
    if (!root) return html;
    const keypoints = root.querySelector('#topic-top');
    keypoints.insertAdjacentHTML('beforebegin', render(id));
    keypoints.querySelector('h2').textContent = '本站讲解 · 重点总览';
    root.querySelector('.topic-toc [data-topic-scroll="topic-top"]').insertAdjacentHTML('beforebegin', '<button type="button" data-topic-scroll="topic-original">原文与标注</button>');
    root.querySelector('option[value="topic-top"]').insertAdjacentHTML('beforebegin', '<option value="topic-original">原文与标注</option>');
    return tmp.innerHTML;
  };
  function replace(root, selector) {
    const id = root.dataset.originalTopic;
    root.outerHTML = render(id);
    const next = document.querySelector('[data-original-topic="' + id + '"]');
    (next.querySelector(selector) || next).focus({ preventScroll: true });
  }
  document.addEventListener('click', e => {
    const button = e.target.closest?.('[data-original-action]'); if (!button) return;
    const root = button.closest('[data-original-topic]'), id = root.dataset.originalTopic, s = state(id), action = button.dataset.originalAction;
    let target = '[data-original-action="' + action + '"]';
    if (action === 'quiz') { s.mode = 'quiz'; s.reset = false; target = '[data-original-input]'; }
    if (action === 'read') { if (s.mode === 'quiz') s.seen = true; s.mode = 'read'; s.reset = false; }
    if (action === 'reset') { s.reset = true; target = '[data-original-action="reset-confirm"]'; }
    if (action === 'reset-cancel') { s.reset = false; target = '[data-original-action="reset"]'; }
    if (action === 'reset-confirm') { sessions[id] = fresh(); sessions[id].mode = 'quiz'; target = '[data-original-input]'; }
    replace(root, target);
  });
  document.addEventListener('input', e => {
    if (!e.target.matches?.('[data-original-input]')) return;
    const root = e.target.closest('[data-original-topic]'), s = state(root.dataset.originalTopic);
    s.values[Number(e.target.dataset.originalInput)] = e.target.value.slice(0, 80);
    if (s.submitted) { s.seen = true; s.submitted = false; root.querySelector('[data-original-result]').textContent = '答案已修改，请重新核对。'; }
    s.reset = false;
    root.querySelector('.original-reset')?.remove();
  });
  document.addEventListener('submit', e => {
    if (!e.target.matches?.('[data-original-form]')) return;
    e.preventDefault();
    const root = e.target.closest('[data-original-topic]'), s = state(root.dataset.originalTopic);
    root.querySelectorAll('[data-original-input]').forEach(input => { s.values[Number(input.dataset.originalInput)] = input.value.slice(0, 80); });
    s.submitted = true; s.reset = false;
    replace(root, '[data-original-result]');
  });
  window.STUDY_THEORY_ORIGINALS = { data, render, judge };
})();
