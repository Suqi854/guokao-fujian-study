'use strict';
// Historical v0.37 entrypoint projection, reviewed content, and fail-closed adapter boundaries.
// Later adapters are excluded; current release coverage is tested separately.
// This is a content/protocol regression, not independent semantic grading.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, 'docs', name), 'utf8');
const scriptNames = page => [...read(page).matchAll(/src="\.\/([^"]+)"/g)].map(m => m[1]);
const adapters = ['curriculum-v037.js', 'policy-v037.js'];
const laterAdapters = ['political-mao-deng-expansion.js','marxism-course-20261107.js','political-complete-integration.js','policy-current-2026.js','curriculum-v038.js', 'practice-diagnostic-v037.js'];
const targets = ['material-mapping', 'answer-revision'];
const policyLesson = 'fujian-enterprise-service-2025';
const sourceId = 'fujian-four-access-2025';
const baseline = require('./fixtures/v036-public-identities.json');
const historicalCoverage = require('./fixtures/v037-public-identities.json');
const reviewed = require('./fixtures/v037-reviewed-content.json');
const plain = value => JSON.parse(JSON.stringify(value));
const restoreHistoricalCoverage = c => {
  // Freeze only the four historical summaries derived by coverage-map.js.
  // Current v0.38 coverage is checked without this projection in its own suite.
  for (const [key, snapshot] of Object.entries({ coverage: 'baselineCoverage', coverageMatrix: 'baselineCoverageMatrix', coverageAdded: 'baselineCoverageAdded', coverageDeepened: 'baselineCoverageDeepened' })) {
    assert.ok(Array.isArray(historicalCoverage[snapshot]), snapshot + ' frozen v0.37 coverage');
    c.window.STUDY_CONTENT[key] = plain(historicalCoverage[snapshot]);
  }
  delete c.window.STUDY_CONTENT.coveragePracticeExpanded;
};
const canonical = value => value === null || typeof value !== 'object' ? JSON.stringify(value)
  : Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']'
  : '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}';
const hash = value => crypto.createHash('sha256').update(canonical(value)).digest('hex');
const normalized = text => text.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu, '');
const characters = text => [...text.replace(/\s/gu, '')].length;
const context = () => {
  const c = { window: {}, TextEncoder };
  for (const name of ['localStorage', 'sessionStorage', 'indexedDB', 'fetch']) {
    for (const target of [c, c.window]) Object.defineProperty(target, name, { get() { throw Error('Unexpected storage/network access: ' + name); } });
  }
  return vm.createContext(c);
};
const execute = (c, file) => vm.runInContext(read(file), c, { filename: file, timeout: 2000 });
const contentScripts = scriptNames('index.html').filter(file => file !== 'app-topics-20261107.js' && !laterAdapters.includes(file));
for (const file of adapters) {
  const embedded = read(file).match(/\bconst B = ([\s\S]+?);\s*const C=window\.STUDY_CONTENT;/);
  assert.ok(embedded, file + ' self-contained reviewed payload');
  assert.equal(hash(JSON.parse(embedded[1])), reviewed.adapterPayloads[file], file + ' complete approved input, including source/validity boundaries');
}
for (const page of ['index.html', 'long-mock.html']) {
  const scripts = scriptNames(page);
  for (const file of adapters) {
    assert.equal(scripts.filter(name => name === file).length, 1, page + ': one adapter ' + file);
    for (const prerequisite of ['catalog.js', 'theory-learning-aids.js', 'curriculum-v036.js', 'politics-v036.js']) {
      assert.ok(scripts.indexOf(prerequisite) >= 0 && scripts.indexOf(file) > scripts.indexOf(prerequisite), file + ' after ' + prerequisite);
    }
    assert.ok(scripts.indexOf(file) < scripts.indexOf('coverage-map.js'), file + ' before derived coverage');
  }
}
const c = context();
for (const file of contentScripts) execute(c, file);
restoreHistoricalCoverage(c);
const C = c.window.STUDY_CONTENT, T = c.window.STUDY_TRAINING;
assert.deepEqual([C.lessons.length, C.questions.length, C.writing.length, C.lessons.filter(l => l.learningLevels).length, C.lessons.filter(l => !l.learningLevels).length, Object.keys(C.sources).length], [105, 717, 81, 95, 10, 43]);
assert.deepEqual([Object.keys(baseline.collections.lessons).length, Object.keys(baseline.collections.questions).length, Object.keys(baseline.collections.writing).length, Object.keys(baseline.questionSignatures).length], [104, 699, 75, 699]);
let oldLessonCount = 0;
for (const [collection, rows] of Object.entries(baseline.collections)) {
  for (const [id, expected] of Object.entries(rows)) {
    const item = require("./learning-release-identity-projection.cjs")(C)[collection].find(row => row.id === id);
    assert.ok(item, collection + '/' + id + ' retained');
    if (collection === 'lessons' && targets.includes(id)) continue;
    assert.equal(hash(item), expected, collection + '/' + id + ' unchanged');
    if (collection === 'lessons') oldLessonCount++;
  }
}
assert.equal(oldLessonCount, 102);
for (const [id, expected] of Object.entries(baseline.writingSignatures)) assert.equal(T.signature(C.writing.find(w => w.id === id)), expected, id + ' old writing signature');
for (const [id, expected] of Object.entries(baseline.questionSignatures)) assert.equal(T.signature(C.questions.find(q => q.id === id)), expected, id + ' old training signature');
// Do not project the newly permitted records out of this final regression.
for (const [key, expected] of Object.entries(baseline.immutableParts)) {
  if (!['sources', 'theoryLearningAids'].includes(key)) assert.equal(hash(C[key]), expected, key + ' fully unchanged');
}
for (const [id, expected] of Object.entries(baseline.sourceHashes)) assert.equal(hash(C.sources[id]), expected, id + ' old source retained');
for (const [id, expected] of Object.entries(baseline.learningAidHashes)) assert.equal(hash(C.theoryLearningAids[id]), expected, id + ' old learning aid retained');
assert.deepEqual(Object.keys(C.sources).filter(id => !baseline.baselineSourceIds.includes(id)), [sourceId]);
assert.deepEqual(Object.keys(C.theoryLearningAids).filter(id => !baseline.baselineAidIds.includes(id)).sort(), [...targets, policyLesson].sort());
const permitted = new Set(['minutes', 'sections', 'updated', 'basis', 'versionNote', 'learningLevels', 'practice']);
const withoutPermitted = lesson => Object.fromEntries(Object.entries(lesson).filter(([key]) => !permitted.has(key)));
for (const id of targets) {
  const old = baseline.revisedLessons[id], lesson = C.lessons.find(l => l.id === id);
  assert.deepEqual(plain(withoutPermitted(lesson)), withoutPermitted(old), id + ' only scoped deepening fields changed');
  assert.deepEqual(plain(lesson.practice.slice(0, old.practice.length)), old.practice, id + ' old practice prefix retained');
  assert.equal(lesson.practice.length, old.practice.length + 6);
  assert.equal(lesson.sections.length, 9);
}
for (const collection of ['lessons', 'questions', 'writing']) {
  for (const [id, expected] of Object.entries(reviewed.collections[collection])) assert.equal(hash(C[collection].find(row => row.id === id)), expected, id + ' full independently reviewed content');
}
for (const [id, expected] of Object.entries(reviewed.sources)) assert.equal(hash(C.sources[id]), expected, id + ' reviewed source');
for (const [id, expected] of Object.entries(reviewed.learningAids)) assert.equal(hash(C.theoryLearningAids[id]), expected, id + ' reviewed aid');
assert.deepEqual([Object.keys(reviewed.collections.lessons).length, Object.keys(reviewed.collections.questions).length, Object.keys(reviewed.collections.writing).length], [3, 18, 6]);
const newQuestions = C.questions.filter(q => !Object.hasOwn(baseline.collections.questions, q.id));
assert.equal(newQuestions.length, 18);
assert.deepEqual(plain(newQuestions.map(q => q.id)).sort(), [...Array.from({ length: 12 }, (_, i) => 'c37-' + String(i + 1).padStart(2, '0')), ...Array.from({ length: 6 }, (_, i) => 'pol37-' + String(i + 1).padStart(2, '0'))].sort());
const stages = { '识别概念': 0, '迁移运用': 0, '检查边界': 0 };
for (const q of newQuestions) {
  assert.equal(q.options.length, 4); assert.equal(new Set(q.options).size, 4); assert.equal(q.optionReviews.length, 4);
  assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4);
  assert.equal(q.explanation, q.optionReviews[q.answer]);
  assert.equal(q.meta.source.kind, 'original'); assert.equal(q.meta.rights.status, 'original');
  assert.equal(q.meta.examSource.year, null); assert.equal(q.meta.difficulty.level, null);
  assert.equal(q.meta.answerReview.status, 'editorial-reviewed');
  assert.equal(q.meta.trainingStage, q.trainingStage); assert.ok(Object.hasOwn(stages, q.trainingStage)); stages[q.trainingStage]++;
  assert.ok(q.meta.source.referenceIds.length && q.meta.source.referenceIds.every(id => C.sources[id]));
  assert.ok(q.optionReviews.every(text => text.trim().length > 8));
  const lesson = C.lessons.find(l => l.id === q.lesson);
  assert.ok(lesson.practice.includes(q.id));
  if (q.id.startsWith('pol37-')) assert.match(q.stem, /2025/);
}
assert.deepEqual(Object.values(stages), [6, 6, 6]);
assert.equal(newQuestions.reduce((sum, q) => sum + q.optionReviews.length, 0), 72);
for (const collection of ['lessons', 'questions', 'writing']) assert.equal(new Set(C[collection].map(row => row.id)).size, C[collection].length);
assert.equal(new Set(C.questions.map(q => normalized(q.stem))).size, 717, 'all normalized stems distinct');
const newWriting = C.writing.filter(w => !Object.hasOwn(baseline.collections.writing, w.id));
assert.equal(newWriting.length, 6);
assert.equal(new Set(newWriting.map(w => w.materialGroup)).size, 2);
assert.equal(new Set(C.writing.map(w => w.material)).size, 35, '35 distinct public material bodies');
const limits = { w_c37_mapping_intro: [100, [2, 3]], w_c37_mapping_practice: [160, [1, 2, 3]], w_c37_mapping_advanced: [180, [3, 4, 5]], w_c37_revision_intro: [100, [1, 3]], w_c37_revision_practice: [130, [2]], w_c37_revision_advanced: [200, [1, 2, 3, 4, 5]] };
const lengths = [];
for (const task of newWriting) {
  assert.ok(limits[task.id], 'known scoped writing ID');
  const [limit, scope] = limits[task.id];
  assert.equal(task.limit, limit); assert.ok(characters(task.sample) > 0 && characters(task.sample) <= limit, task.id + ' reference length');
  assert.ok(task.task.includes(String(limit))); assert.match(task.material, /原创虚构/);
  assert.deepEqual([...task.material.matchAll(/^【(\d+)】/gm)].map(m => Number(m[1])), [1, 2, 3, 4, 5]);
  assert.equal(task.points.length, task.evidenceParagraphs.length); assert.equal(task.points.length, task.evidenceDetails.length);
  task.evidenceDetails.forEach((e, i) => {
    assert.equal(e.point, i + 1); assert.deepEqual(plain(e.paragraphs), plain(task.evidenceParagraphs[i]));
    assert.ok(e.reason.trim() && e.paragraphs.length);
    for (const n of e.paragraphs) assert.ok(n === '任务' || scope.includes(n), task.id + ' evidence within prompt scope');
  });
  assert.ok(task.misconceptions.length > 0);
  for (const m of task.misconceptions) { for (const key of ['weak', 'problem', 'revision']) assert.ok(m[key]?.trim()); assert.notEqual(normalized(m.weak), normalized(m.revision)); }
  assert.ok(task.rewriteSteps.length >= 3 && task.rewriteSteps.every(step => step.trim()));
  assert.match(task.reviewNote, /不是官方/); assert.match(task.reviewNote, /字数/);
  assert.deepEqual(plain(task.provenance), { kind: 'original-fictional', examYear: null, officialScore: null, difficultyCalibrated: false });
  const level = C.lessons.find(l => l.id === task.lesson).learningLevels[task.learningLevel];
  assert.ok(level.writingIds.includes(task.id)); assert.equal(task.trainingStage, level.stage);
  lengths.push({ id: task.id, characters: characters(task.sample), limit });
}
for (const id of [...targets, policyLesson]) {
  const l = C.lessons.find(row => row.id === id);
  assert.deepEqual(Object.keys(l.learningLevels), ['intro', 'practice', 'advanced']);
  const allQuestions = [], allWriting = [];
  Object.entries(l.learningLevels).forEach(([key, g], i) => {
    assert.deepEqual(plain(g.sections), [i * 3, i * 3 + 1, i * 3 + 2]);
    assert.equal(g.questionIds.length, 2); assert.equal(g.stage, C.learningPaths[key].stage);
    for (const qid of g.questionIds) { const q = newQuestions.find(q => q.id === qid); assert.equal(q?.lesson, id); assert.equal(q.trainingStage, g.stage); }
    if (targets.includes(id)) { assert.equal(g.writingIds.length, 1); assert.equal(newWriting.find(w => w.id === g.writingIds[0])?.learningLevel, key); }
    allQuestions.push(...g.questionIds); allWriting.push(...(g.writingIds || []));
  });
  assert.equal(new Set(allQuestions).size, 6); assert.equal(new Set(allWriting).size, targets.includes(id) ? 3 : 0);
  const aid = C.theoryLearningAids[id];
  assert.ok(aid.memoryCue && aid.recall.length >= 2 && aid.sourceIds.every(id => C.sources[id]));
}
// Derived coverage is checked as a scoped append/update, not an immutable hash.
assert.deepEqual(plain(C.coverageAdded), [policyLesson]);
assert.deepEqual(plain(C.coverageDeepened), targets);
const topics = C.coverageMatrix.flatMap(group => group.topics);
assert.equal(topics.length, 105); assert.equal(new Set(topics.map(topic => topic.id)).size, 105);
assert.deepEqual(plain(topics.map(topic => topic.id)).sort(), plain(C.lessons.map(lesson => lesson.id)).sort());
for (const topic of topics) {
  const lesson = C.lessons.find(lesson => lesson.id === topic.id);
  assert.deepEqual(plain(topic.lessonIds), [lesson.id]);
  assert.deepEqual(plain(topic.questionIds), plain(lesson.practice));
  assert.deepEqual(plain(topic.writingIds), plain(C.writing.filter(writing => writing.lesson === lesson.id).map(writing => writing.id)));
}
for (const oldGroup of baseline.baselineCoverageMatrix) {
  const current = C.coverageMatrix.find(group => group.module === oldGroup.module);
  assert.ok(current);
  for (const oldTopic of oldGroup.topics) {
    const topic = current.topics.find(topic => topic.id === oldTopic.id); assert.ok(topic);
    if (!targets.includes(oldTopic.id)) assert.deepEqual(plain(topic), oldTopic, oldTopic.id + ' old coverage topic unchanged');
    else {
      const { questionIds, writingIds, ...rest } = topic;
      const { questionIds: oldQuestions, writingIds: oldWriting, ...oldRest } = oldTopic;
      assert.deepEqual(plain(rest), oldRest, oldTopic.id + ' topic only gains practice links');
      assert.deepEqual(plain(questionIds.slice(0, oldQuestions.length)), oldQuestions);
      assert.deepEqual(plain(writingIds.slice(0, oldWriting.length)), oldWriting);
    }
  }
  for (const oldGap of oldGroup.gaps) {
    const gap = current.gaps.find(gap => gap.id === oldGap.id); assert.ok(gap);
    const allowed = (oldGroup.module === '福建专题' && oldGap.id.endsWith('-2')) || (oldGroup.module === '申论方法' && oldGap.id.endsWith('-0'));
    if (!allowed) assert.deepEqual(plain(gap), oldGap, oldGap.id + ' old gap unchanged');
    else { const { remaining, ...rest } = gap, { remaining: oldText, ...oldRest } = oldGap; assert.deepEqual(plain(rest), oldRest); assert.ok(remaining.trim()); }
  }
}
for (const oldRow of baseline.baselineCoverage) {
  const row = C.coverage.find(row => row[0] === oldRow[0]);
  if (oldRow[0] !== '福建专题') assert.deepEqual(plain(row), oldRow, oldRow[0] + ' coverage row unchanged');
  else assert.deepEqual(plain(row), [oldRow[0], oldRow[1] + '、' + C.lessons.find(l => l.id === policyLesson).title.split('：')[0], oldRow[2]]);
}
assert.match(C.coverageMatrix.find(group => group.module === '福建专题').gaps[2].remaining, /2025.*历史.*未确认现行/);
assert.match(C.coverageMatrix.find(group => group.module === '申论方法').gaps[0].remaining, /2组.*6短写/);
assert.deepEqual(plain(C.theoryTrack), baseline.baselineTheoryTrack, 'political route fully unchanged');
assert.equal(C.theoryTrack.steps.length, 12);
assert.equal(C.lessons.find(l => l.id === policyLesson).category, '福建专题');
const historical = C.lessons.find(l => l.id === policyLesson);
for (const field of ['subtitle', 'versionNote']) { assert.match(historical[field], /2025.*历史/); assert.match(historical[field], /未确认.*修订.*废止/); }
assert.match(C.sources[sourceId].year, /2025-04-20.*2025-04-25.*2027-12-31/);
assert.match(C.sources[sourceId].scope, /未确认|未核/); assert.match(C.sources[sourceId].scope, /不称现行已核/);
assert.match(C.theoryLearningAids[policyLesson].scope, /未确认.*修订.*废止/);
// Base snapshots from the actual index, not the author's isolated fixture.
const old = context(); for (const file of contentScripts) if (!adapters.includes(file)) execute(old, file);
const previous = old.window.STUDY_CONTENT;
assert.deepEqual([previous.lessons.length, previous.questions.length, previous.writing.length], [104, 699, 75]);
const freeze = object => { if (object && typeof object === 'object' && !Object.isFrozen(object)) { Object.values(object).forEach(freeze); Object.freeze(object); } return object; };
const isolated = () => { const c = context(); c.window.STUDY_CONTENT = plain(previous); return c; };
const normalizedCollections = content => ({ ...content, questions: [...content.questions].sort((a, b) => a.id.localeCompare(b.id)) });
let orderResult;
for (const order of [adapters, [...adapters].reverse()]) {
  const test = isolated(), before = test.window.STUDY_CONTENT;
  const oldBytes = JSON.stringify(before); freeze(before);
  for (const file of order) execute(test, file);
  const after = test.window.STUDY_CONTENT;
  assert.equal(JSON.stringify(before), oldBytes, 'deep-frozen baseline unchanged');
  assert.deepEqual([after.lessons.length, after.questions.length, after.writing.length], [105, 717, 81]);
  for (const collection of ['questions', 'writing']) for (const row of before[collection]) assert.equal(after[collection].find(x => x.id === row.id), row, collection + ' old object reference');
  for (const row of before.lessons) if (!targets.includes(row.id)) assert.equal(after.lessons.find(x => x.id === row.id), row, row.id + ' old lesson reference');
  const result = hash(normalizedCollections(after));
  if (orderResult) assert.equal(result, orderResult, 'both adapter orders give identical records'); else orderResult = result;
  for (const file of order) {
    const state = after, bytes = JSON.stringify(after);
    assert.throws(() => execute(test, file), /rejected|conflict/);
    assert.equal(test.window.STUDY_CONTENT, state, file + ' duplicate does not replace content');
    assert.equal(JSON.stringify(test.window.STUDY_CONTENT), bytes, file + ' duplicate is atomic');
  }
}
let rejectedCases = 0;
function rejectsAtomically(file, mutate, message) {
  const test = isolated();
  const other = adapters.find(name => name !== file); execute(test, other);
  mutate(test.window.STUDY_CONTENT);
  const before = test.window.STUDY_CONTENT, bytes = JSON.stringify(before);
  assert.throws(() => execute(test, file), /rejected|conflict|drift/, message);
  assert.equal(test.window.STUDY_CONTENT, before, message + ': same content object');
  assert.equal(JSON.stringify(before), bytes, message + ': no partial mutations'); rejectedCases++;
}
for (const id of targets) rejectsAtomically(adapters[0], C => { C.lessons.find(l => l.id === id).subtitle += ' drift'; }, id + ' drift');
rejectsAtomically(adapters[0], C => { C.lessons.find(l => l.id === targets[0]).learningLevels = {}; }, 'already-layered target');
for (const file of adapters) {
  const sample = newQuestions.find(q => q.id.startsWith(file === adapters[0] ? 'c37-' : 'pol37-'));
  rejectsAtomically(file, C => { C.questions.push(plain(sample)); }, file + ' question ID conflict');
  rejectsAtomically(file, C => { C.questions.push({ ...plain(sample), id: 'synthetic-collision', stem: '  ' + sample.stem + '！！！' }); }, file + ' normalized stem conflict');
  rejectsAtomically(file, C => { C.theoryLearningAids[file === adapters[0] ? targets[0] : policyLesson] = { synthetic: true }; }, file + ' aid conflict');
}
rejectsAtomically(adapters[0], C => { C.writing.push(plain(newWriting[0])); }, 'writing ID conflict');
rejectsAtomically(adapters[1], C => { C.sources[sourceId] = { synthetic: true }; }, 'source conflict');
rejectsAtomically(adapters[1], C => { C.lessons.push(plain(historical)); }, 'lesson ID conflict');
// The shared long-paper entrypoint must load exactly the same published content.
const long = context();
for (const file of scriptNames('long-mock.html')) if (!['long-mock-workspace.js', 'long-mock-store.js', ...laterAdapters].includes(file)) execute(long, file);
restoreHistoricalCoverage(long);
assert.equal(hash(long.window.STUDY_CONTENT), hash(C));
const M = long.window.LONG_MOCK_MODEL;
assert.equal(M.pool().length, 694, 'generic original text pool includes 12 method-choice and 6 policy items');
assert.equal(M.modules().length, 8);
const presetRequests = M.modules().filter(m => !['福建专题', '申论方法'].includes(m.name)).map(m => ({ module: m.name, count: 10 }));
const presetIds = new Set();
for (const offset of [0, 10, 20]) {
  const run = M.build({ id: 'synthetic-preset-' + offset, title: 'Synthetic preset', requests: presetRequests, minutes: 60, now: 1793916000000, offset });
  assert.equal(M.summary(run).total.planned, 60);
  for (const item of run.sections.flatMap(section => section.items)) { assert.ok(!presetIds.has(item.qid)); presetIds.add(item.qid); }
}
assert.equal(presetIds.size, 180);
const custom = M.build({ id: 'synthetic-method-choice', title: 'Method choices only', requests: [{ module: '申论方法', count: 12 }], minutes: 15, now: 1793916000000 });
assert.equal(M.summary(custom).total.planned, 12);
assert.equal(custom.official, false);
assert.ok(custom.sections[0].items.every(item => newQuestions.some(q => q.id === item.qid && q.id.startsWith('c37-'))));
assert.ok(!Object.hasOwn(M.summary(custom).total, 'score'), 'choice counts are not automated writing scores');
assert.equal(hash(long.window.FULL_TRAINING_PAPERS), baseline.fixedPaperCatalogHash, 'complete fixed-paper catalog unchanged');
const fixed = long.window.FULL_TRAINING_PAPERS.papers.flatMap(p => p.sections.flatMap(s => s.items));
assert.equal(fixed.length, 240);
for (const item of fixed) { assert.ok(baseline.questionSignatures[item.questionId]); assert.equal(T.signature(C.questions.find(q => q.id === item.questionId)), item.signature); }
console.log('PASS v037 final 105/717/81, 95 layered: 699 old question identities/signatures, 75 old writing, 102 untouched lessons, full reviewed additions, 42 old sources and 14 old aids retained');
console.log('PASS 18 new questions/72 option explanations, 6 evidence-linked short writes, unchanged 12-step theory route, frozen/two-order/duplicate safety and ' + rejectedCases + ' atomic conflict cases, long pool 694, three exact 60-question presets, optional method choices and fixed 240');
console.log('Reference lengths (non-whitespace Unicode characters, not official examination scoring): ' + JSON.stringify(lengths));
