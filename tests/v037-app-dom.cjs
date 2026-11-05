'use strict';
// Execute the actual index/long-mock scripts with synthetic data and locks.
// This checks rendered application flows, not native downloads, mobile pixels,
// physical storage durability, or real simultaneous browser tabs.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const { installSerialLocks, navigateHash, withoutRevision } = require('./progress-dom-support.cjs');
const root = path.join(__dirname, '..');
const baseline = require('./fixtures/v036-public-identities.json');
const plain = value => JSON.parse(JSON.stringify(value));
const chars = value => [...value.replace(/\s/gu, '')].length;
const pause = () => new Promise(resolve => setTimeout(resolve, 8));
const targets = ['material-mapping', 'answer-revision'];
const policyLesson = 'fujian-enterprise-service-2025';
const legacy = {
  schemaVersion: 1, exam: 'fujian', read: targets, favorites: ['material-mapping'],
  notes: { 'material-mapping': 'synthetic v1 material note', 'answer-revision': 'synthetic v1 revision note' },
  attempts: [{ qid: 'q51', choice: 0, at: '2026-11-04T12:00:00Z', seconds: 8 }],
  drafts: { w01: 'synthetic retained v1 writing draft' }, checks: { w01: [0] }
};
const legacyRaw = JSON.stringify(legacy);
const alive = new Set();
function setup({ page = 'index.html', v2 = null } = {}) {
  const html = fs.readFileSync(path.join(root, 'docs', page), 'utf8');
  const errors = [], outgoing = [], calls = [], vc = new VirtualConsole();
  vc.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(html, { url: 'https://candidate.example/' + page, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  alive.add(dom);
  const w = dom.window, d = w.document, isMain = page === 'index.html';
  installSerialLocks(w); w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {};
  w.TextEncoder = TextEncoder; w.Blob = Blob; w.File = File; w.confirm = () => true;
  w.fetch = (...args) => { outgoing.push(args); throw Error('Unexpected network request'); };
  let now = Date.parse('2026-11-05T22:00:00Z'), exported = null;
  w.Date.now = () => now; w.setInterval = () => 1;
  w.URL.createObjectURL = blob => { exported = blob; return 'blob:synthetic-v037'; }; w.URL.revokeObjectURL = () => {};
  const nativeClick = w.HTMLAnchorElement.prototype.click;
  w.HTMLAnchorElement.prototype.click = function () { if (!this.download) nativeClick.call(this); };
  const originals = Object.fromEntries(['getItem', 'setItem', 'removeItem'].map(name => [name, w.Storage.prototype[name]]));
  const sentinels = isMain ? {
    'zhixu-private-library-v1': 'private sentinel', 'zhixu-private-library-v1:pending:synthetic': 'private pending sentinel',
    'zhixu-long-mock-v1': 'long sentinel', 'zhixu-long-mock-v1:pending:synthetic': 'long pending sentinel'
  } : { 'zhixu-study-v1': legacyRaw, 'zhixu-study-v2': 'current study sentinel', 'zhixu-private-library-v1': 'private sentinel' };
  for (const [key, value] of Object.entries(sentinels)) w.localStorage.setItem(key, value);
  if (isMain) { w.localStorage.setItem('zhixu-study-v1', legacyRaw); if (v2) w.localStorage.setItem('zhixu-study-v2', JSON.stringify(v2)); }
  const forbidden = key => isMain ? /^zhixu-(?:private-library|long-mock)-/.test(key) : /^zhixu-(?:study|private-library)-/.test(key);
  for (const name of ['getItem', 'setItem', 'removeItem']) w.Storage.prototype[name] = function (key, ...args) {
    calls.push([name, key]); assert.equal(forbidden(key), false, page + ': must not access foreign namespace ' + key);
    if (isMain && name !== 'getItem') assert.notEqual(key, 'zhixu-study-v1', 'legacy bytes are immutable');
    return originals[name].call(this, key, ...args);
  };
  w.Storage.prototype.clear = () => { throw Error('Namespace-wide clear is forbidden'); };
  for (const match of html.matchAll(/src="\.\/([^"]+)"/g)) w.eval(fs.readFileSync(path.join(root, 'docs', match[1]), 'utf8'));
  const env = {
    w, d, C: w.STUDY_CONTENT, errors, outgoing, calls,
    get exported() { return exported; }, advance(ms) { now += ms; },
    raw(key) { return originals.getItem.call(w.localStorage, key); },
    disk() { return JSON.parse(w.localStorage.getItem(isMain ? 'zhixu-study-v2' : 'zhixu-long-mock-v1')); },
    async barrier() { await w.navigator.locks.request('study-progress-store:zhixu-study-v2', { mode: 'exclusive' }, () => {}); await pause(); },
    async route(hash) { await navigateHash(w, hash, () => { w.location.hash = hash; }); await pause(); },
    async click(selector, twice = false) { const element = d.querySelector(selector); assert.ok(element, selector); assert.equal(element.disabled, false, selector + ' enabled'); element.click(); if (twice) element.click(); await pause(); },
    async action(name, id, twice = false) { await env.click('[data-action="' + name + '"]' + (id === undefined ? '' : '[data-id="' + id + '"]'), twice); },
    async input(selector, value) { const element = d.querySelector(selector); assert.ok(element, selector); element.value = value; element.dispatchEvent(new w.Event('input', { bubbles: true })); await env.barrier(); },
    async until(predicate) { for (let i = 0; i < 200; i++) { if (predicate()) return; await pause(); } throw Error('Expected rendered/saved view: ' + w.location.hash); },
    async import(raw) { const file = d.querySelector('#import-file'); assert.ok(file); Object.defineProperty(file, 'files', { configurable: true, value: [new w.File([raw], 'synthetic-v037.json', { type: 'application/json' })] }); file.dispatchEvent(new w.Event('change', { bubbles: true })); await pause(); await env.barrier(); },
    verifyIsolation() { for (const [key, value] of Object.entries(sentinels)) assert.equal(env.raw(key), value, key + ' exact bytes retained'); assert.deepEqual(errors, []); assert.deepEqual(outgoing, []); },
    close() { env.verifyIsolation(); dom.window.close(); alive.delete(dom); }
  };
  return env;
}
async function retainedRecords(e, expected) {
  for (const id of targets) {
    await e.route('#lesson/' + id + '/intro');
    assert.equal(e.d.querySelector('#lesson-note').value, expected.notes[id], id + ' old note visible after deepening');
    assert.equal(e.d.querySelector('[data-action="favorite"][data-id="' + id + '"]').getAttribute('aria-pressed'), String(expected.favorites.includes(id)));
    assert.equal(e.d.querySelector('[data-action="read"]').textContent.includes('已读 · 点击取消'), expected.read.includes(id));
  }
  await e.route('#write/w01'); assert.equal(e.d.querySelector('#draft').value, expected.drafts.w01);
  assert.equal(e.d.querySelector('[data-check]').checked, expected.checks.w01.includes(0));
}
(async () => {
  let e = setup(), { C, d, w } = e;
  await retainedRecords(e, legacy);
  assert.equal(e.raw('zhixu-study-v2'), null, 'read-only v1 viewing must not eagerly migrate');
  await e.route('#theory');
  assert.deepEqual([...d.querySelectorAll('[data-theory-lesson]')].map(node => node.dataset.theoryLesson), baseline.baselineTheoryTrack.steps.map(s => s.lessonId));
  for (const id of [...targets, policyLesson]) assert.equal(d.querySelector('[data-theory-lesson="' + id + '"]'), null, 'nonpolitical lesson is not a route node');
  for (const id of [...targets, policyLesson]) for (const level of ['intro', 'practice', 'advanced']) {
    await e.route('#lesson/' + id + '/' + level);
    const lesson = C.lessons.find(l => l.id === id), guide = lesson.learningLevels[level], aid = C.theoryLearningAids[id];
    assert.equal(d.querySelector('h1').textContent, lesson.title);
    const sections = [...d.querySelectorAll('.reading > section:not(.level-guide):not(.diagram-box)')];
    assert.deepEqual(sections.map(section => section.querySelector('h2')?.textContent), plain(guide.sections.map(i => lesson.sections[i][0])));
    assert.deepEqual(sections.map(section => section.querySelector(':scope > p')?.textContent), plain(guide.sections.map(i => lesson.sections[i][1])));
    assert.ok(d.querySelector('main').textContent.includes(aid.memoryCue)); assert.ok(d.querySelector('main').textContent.includes(guide.goal));
    assert.equal(d.querySelector('[data-theory-recall]').open, false);
    const quiz = d.querySelector('.level-guide a[href^="#quiz/"]'); assert.ok(quiz); assert.equal(quiz.hash, '#quiz/target/' + guide.questionIds.join(','));
    const writes = [...d.querySelectorAll('.level-guide a[href^="#write/"]')]; assert.equal(d.querySelectorAll('.level-guide .actions > a').length, 1 + (guide.writingIds || []).length, 'Training links use existing wrapping/gap layout');
    assert.deepEqual(writes.map(a => a.hash), plain((guide.writingIds || []).map(id => '#write/' + id)));
    if (id === policyLesson) { assert.ok(d.querySelector('main').textContent.includes(lesson.versionNote)); assert.match(d.querySelector('main').textContent, /未确认.*修订.*废止/); }
  }
  await e.route('#sources');
  const source = C.sources['fujian-four-access-2025'];
  const link = [...d.querySelectorAll('main a')].find(a => a.href === source.url); assert.ok(link, 'historical source link rendered');
  const article = link.closest('article'); assert.ok(article.textContent.includes(source.year)); assert.ok(article.textContent.includes(source.scope)); assert.match(article.textContent, /不称现行已核/);
  const questions = C.questions.filter(q => /^(c37|pol37)-/.test(q.id)); assert.equal(questions.length, 18);
  for (const q of questions) {
    await e.route('#quiz/one/' + q.id);
    assert.equal(d.querySelector('.quiz-card h1').textContent, q.stem);
    assert.deepEqual([...d.querySelectorAll('.option > span:last-child')].map(node => node.textContent), plain(q.options));
    e.advance(1100); await e.action('choose', q.answer); await e.action('submit', undefined, true);
    await e.until(() => d.querySelector('.option-review'));
    assert.equal(d.querySelector('.feedback > p').textContent, q.explanation);
    const reviews = [...d.querySelectorAll('.option-review li')]; assert.equal(reviews.length, 4);
    q.optionReviews.forEach((text, i) => assert.ok(reviews[i].textContent.endsWith(text)));
    assert.ok(d.querySelector('.quiz-actions').textContent.includes('提交已保存到本机'));
  }
  assert.equal(e.disk().attempts.length, 19, '18 double-submit-safe new attempts plus old attempt');
  assert.deepEqual(e.disk().attempts[0], legacy.attempts[0]);
  const writing = C.writing.filter(task => task.id.startsWith('w_c37_')); assert.equal(writing.length, 6);
  const drafts = {};
  for (const task of writing) {
    await e.route('#write/' + task.id);
    assert.equal(d.querySelector('.material').textContent, task.material);
    assert.equal(d.querySelector('.reference').textContent, task.sample);
    assert.ok(d.querySelector('.task').textContent.includes(task.task));
    assert.equal(d.querySelector('.text-button[href^="#lesson/"]').hash, '#lesson/' + task.lesson + '/' + task.learningLevel);
    const feedback = d.querySelector('.shenlun-feedback'); assert.ok(feedback); assert.equal(feedback.closest('details').open, false);
    feedback.closest('details').open = true;
    assert.deepEqual([...feedback.querySelectorAll('h3')].map(h => h.textContent), ['参考要点依据', '常见误区与改写', '二稿怎么改']);
    const evidence = [...feedback.querySelectorAll(':scope > ol:first-of-type > li')]; assert.equal(evidence.length, task.points.length);
    evidence.forEach((node, i) => { assert.equal(node.querySelector('p').textContent, task.evidenceDetails[i].reason); for (const n of task.evidenceDetails[i].paragraphs) assert.ok(node.textContent.includes(n === '任务' ? '任务要求' : '材料【' + n + '】')); });
    const mistakes = [...feedback.querySelectorAll(':scope > ul > li')]; assert.equal(mistakes.length, task.misconceptions.length);
    mistakes.forEach((node, i) => { const m = task.misconceptions[i]; assert.deepEqual([...node.querySelectorAll('p')].map(p => p.textContent), ['弱表达：' + m.weak, '问题：' + m.problem, '改写：' + m.revision]); });
    assert.deepEqual([...feedback.querySelectorAll(':scope > ol:last-of-type > li')].map(node => node.textContent), plain(task.rewriteSteps));
    assert.equal(feedback.querySelector('.stat-foot').textContent, task.reviewNote);
    assert.match(d.querySelector('main').textContent, /不代表评分/);
    await e.input('#draft', task.sample); assert.equal(d.querySelector('#word-count').textContent, chars(task.sample) + ' / ' + task.limit + ' 字');
    assert.equal(d.querySelector('#word-count').classList.contains('over-limit'), false);
    await e.input('#draft', '甲'.repeat(task.limit + 1)); assert.equal(d.querySelector('#word-count').classList.contains('over-limit'), true);
    drafts[task.id] = 'synthetic new draft ' + task.id + '\n甲 乙 😀'; await e.input('#draft', drafts[task.id]);
    assert.equal(d.querySelector('#word-count').textContent, chars(drafts[task.id]) + ' / ' + task.limit + ' 字');
    const check = d.querySelector('[data-check]'); check.checked = true; check.dispatchEvent(new w.Event('change', { bubbles: true })); await e.barrier();
    await e.action('export-draft', task.id); assert.equal(await e.exported.text(), task.title + '\n\n' + drafts[task.id]);
  }
  for (const task of writing) { await e.route('#write/' + task.id); assert.equal(d.querySelector('#draft').value, drafts[task.id]); assert.equal(d.querySelector('[data-check]').checked, true); }
  const first = writing[0]; await e.route('#write/' + first.id); await e.action('writing-run-start', first.id); e.advance(3500); await e.action('writing-run-done', first.id);
  const writingRun = e.disk().runs[0]; assert.equal(writingRun.completed, true); assert.equal(writingRun.taskId, first.id); assert.equal(writingRun.elapsedMs, 3500);
  assert.equal(Object.hasOwn(writingRun, 'score'), false, 'completion is not automated writing scoring');
  const selected = ['c37-01', 'pol37-03', 'q51'];
  await e.route('#training/ids/' + selected.join(',')); await e.input('#run-budget', '1'); await e.action('run-start');
  await e.until(() => w.location.hash.startsWith('#quiz/timed/') && d.querySelector('.quiz-card'));
  for (const id of selected) { const q = C.questions.find(q => q.id === id); e.advance(1000); await e.action('run-choose', q.answer); await e.action('run-submit'); await e.action('run-next'); }
  await e.until(() => w.location.hash.startsWith('#training/run/'));
  const run = e.disk().runs.at(-1); assert.deepEqual(run.items.map(item => item.qid), selected);
  assert.equal(w.STUDY_TRAINING.choiceSummary(run).total.correct, 3); assert.equal(w.STUDY_TRAINING.choiceSummary(run).total.unsubmitted, 0);
  assert.match(d.querySelector('main').textContent, /未提交不是答错/);
  const saved = e.disk(); assert.equal(saved.attempts.length, 22);
  for (const key of ['read', 'favorites', 'notes']) assert.deepEqual(saved[key], legacy[key], key + ' old state retained');
  assert.equal(saved.drafts.w01, legacy.drafts.w01); assert.deepEqual(saved.checks.w01, legacy.checks.w01); assert.equal(e.raw('zhixu-study-v1'), legacyRaw);
  await e.route('#settings'); assert.match(d.querySelector('main').textContent, /分别导出学习记录、私人题库、长题组三份备份/);
  await e.action('backup'); const backup = await e.exported.text(); assert.equal(JSON.parse(backup).schemaVersion, 2);
  for (const task of writing) assert.equal(JSON.parse(backup).drafts[task.id], drafts[task.id]);
  await e.action('reset'); await e.import(backup); assert.deepEqual(withoutRevision(e.disk()), withoutRevision(saved));
  assert.equal(e.raw('zhixu-study-v1'), legacyRaw); e.close();
  // Actual cold boot from v2 verifies existing notes/read/favorites, old drafts,
  // the new nonnumeric writing IDs, and both training run kinds.
  const v2Seed = { ...saved, revision: 77, notes: { ...saved.notes, 'material-mapping': 'synthetic preexisting v2 material note', 'answer-revision': 'synthetic preexisting v2 revision note' } };
  e = setup({ v2: v2Seed }); ({ C, d, w } = e);
  await retainedRecords(e, v2Seed);
  for (const task of writing) { await e.route('#write/' + task.id); assert.equal(d.querySelector('#draft').value, drafts[task.id]); assert.equal(d.querySelector('[data-check]').checked, true); }
  assert.deepEqual(e.disk(), v2Seed, 'read-only v2 reload retains complete snapshot');
  await e.route('#settings'); await e.import(legacyRaw); assert.equal(e.disk().drafts.w01, legacy.drafts.w01); assert.deepEqual(e.disk().notes, legacy.notes); assert.deepEqual(e.disk().attempts, legacy.attempts);
  await e.import(backup); assert.deepEqual(withoutRevision(e.disk()), withoutRevision(saved));
  const payload = '<img src=x onerror=bad()> & <script>bad()</script> 😀';
  const task = C.writing.find(t => t.id === first.id); task.evidenceDetails[0].reason = payload; task.misconceptions[0].revision = payload; task.rewriteSteps[0] = payload; task.reviewNote = payload;
  await e.route('#write/' + task.id); assert.ok(d.querySelector('.shenlun-feedback').textContent.includes(payload)); assert.equal(d.querySelectorAll('.shenlun-feedback img,.shenlun-feedback script,.shenlun-feedback [onerror]').length, 0);
  assert.equal(e.raw('zhixu-study-v1'), legacyRaw); e.close();
  // Actual long-paper UI: all presets remain 60 despite the eighth module.
  e = setup({ page: 'long-mock.html' }); ({ C, d, w } = e); await pause();
  assert.equal(w.LONG_MOCK_MODEL.pool().length, 694); assert.equal(w.LONG_MOCK_MODEL.modules().length, 8);
  assert.match(d.querySelector('#scope').textContent, /申论方法.*选择辨析.*不替代主观写作.*不是行测标准模块/);
  const inputs = () => [...d.querySelectorAll('#module-inputs input')];
  assert.equal(inputs().reduce((sum, input) => sum + Number(input.value), 0), 60);
  assert.equal(d.querySelector('[data-module="申论方法"]').value, '0');
  for (const preset of ['0', '10', '20']) {
    await e.click('[data-preset="' + preset + '"]'); assert.equal(inputs().reduce((sum, input) => sum + Number(input.value), 0), 60);
    assert.equal(d.querySelector('[data-module="申论方法"]').value, '0');
    await e.click('#create button[type="submit"]'); await e.until(() => e.disk()?.sessions.length === Number(preset) / 10 + 1);
    const run = e.disk().sessions.at(-1); assert.equal(w.LONG_MOCK_MODEL.summary(run).total.planned, 60); assert.ok(run.sections.every(s => s.name !== '申论方法')); assert.equal(run.status, 'paused');
  }
  for (const input of inputs()) input.value = input.dataset.module === '申论方法' ? '12' : '0';
  d.querySelector('#title').value = 'Synthetic method-choice group';
  await e.click('#create button[type="submit"]'); await e.until(() => e.disk()?.sessions.length === 4);
  const custom = e.disk().sessions.at(-1); assert.deepEqual(custom.sections.map(s => s.name), ['申论方法']); assert.equal(custom.sections[0].items.length, 12); assert.equal(custom.official, false);
  await e.click('#resume'); e.advance(1000); await e.click('#question input[value="0"]'); await e.click('#finish');
  assert.equal(e.disk().sessions.at(-1).status, 'finished'); assert.ok(d.querySelector('#question details'));
  assert.equal(Object.hasOwn(w.LONG_MOCK_MODEL.summary(e.disk().sessions.at(-1)).total, 'score'), false);
  assert.match(d.querySelector('#scope').textContent, /不替代主观写作/); e.close();
  console.log('PASS v037 actual app: 9 lesson-level routes, historical validity/source notice, 18 quiz flows/72 option reviews, six short writes with all evidence/rewrite fields, literal-text safety and character limits');
  console.log('PASS synthetic v1/v2 notes/read/favorites/old drafts; six independent new drafts/checks and text exports; writing completion, mixed timed run, full v2 backup/reset/import, v1 import and foreign-namespace read/write isolation');
  console.log('PASS actual long-paper UI: three exact 60-question presets; optional 12 method-choice questions with explicit no-subjective-writing boundary; isolated records');
  console.log('NOT TESTED: real browser layout/mobile/touch, native file dialogs/download persistence, physical durability or real concurrent tabs');
})().catch(error => { console.error(error); for (const dom of alive) dom.window.close(); process.exit(1); });
