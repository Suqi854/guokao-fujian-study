'use strict';
// Actual entrypoint/content/protocol regression. Frozen expectations come from
// the v0.37 Git baseline and independently reviewed source JSON, never from the
// integrated site's output. Passing this is not a new semantic or expert review.
const assert = require('node:assert/strict');
const { baseline, adapters, deepened, expanded, levels, questionIds, writingIds, additionsFor, plain, hash, normalized, characters, read, scriptNames, context, execute, freeze } = require('./v038-test-support.cjs');
const reviewed = require('./fixtures/v038-reviewed-content.json');
assert.equal(baseline.baseCommit, '38d99cbf1b9b404bfa2224625b5e38950910b565');
assert.equal(reviewed.baseCommit, baseline.baseCommit);
assert.match(reviewed.reviewScope, /independent/i);
const changed = [...deepened, ...expanded];
for (const page of ['index.html', 'long-mock.html']) {
  const scripts = scriptNames(page);
  for (const adapter of adapters) {
    assert.equal(scripts.filter(file => file === adapter).length, 1, page + ': exactly one ' + adapter);
    for (const prerequisite of ['catalog.js', 'theory-learning-aids.js', 'curriculum-v037.js', 'policy-v037.js']) assert.ok(scripts.indexOf(prerequisite) >= 0 && scripts.indexOf(adapter) > scripts.indexOf(prerequisite), adapter + ' after ' + prerequisite);
    assert.ok(scripts.indexOf(adapter) < scripts.indexOf('coverage-map.js'), adapter + ' before derived coverage');
  }
}
for (const file of adapters) {
  const embedded = read(file).match(/\bconst B\s*=\s*([\s\S]+?);\s*const C\s*=\s*window\.STUDY_CONTENT;/);
  assert.ok(embedded, file + ' self-contained reviewed JSON input');
  assert.equal(hash(JSON.parse(embedded[1])), reviewed.adapterPayloads[file], file + ' entire approved payload, including source and review metadata');
}
const contentScripts = scriptNames('index.html').filter(file => file !== 'app.js');
const c = context(); for (const file of contentScripts) execute(c, file);
const C = c.window.STUDY_CONTENT, T = c.window.STUDY_TRAINING;
assert.deepEqual([C.lessons.length, C.questions.length, C.writing.length, C.lessons.filter(l => l.learningLevels).length, C.lessons.filter(l => !l.learningLevels).length, Object.keys(C.sources).length, Object.keys(C.theoryLearningAids).length], [105, 753, 87, 97, 8, 43, 19]);
assert.deepEqual([Object.keys(baseline.collections.lessons).length, Object.keys(baseline.collections.questions).length, Object.keys(baseline.questionSignatures).length, Object.keys(baseline.collections.writing).length, Object.keys(baseline.writingSignatures).length], [105, 717, 717, 81, 81]);
let untouched = 0;
for (const [collection, rows] of Object.entries(baseline.collections)) for (const [id, expected] of Object.entries(rows)) {
  const row = C[collection].find(item => item.id === id); assert.ok(row, id + ' retained');
  if (collection === 'lessons' && changed.includes(id)) continue;
  assert.equal(hash(row), expected, id + ' complete old record unchanged'); if (collection === 'lessons') untouched++;
}
assert.equal(untouched, 95);
for (const [id, expected] of Object.entries(baseline.questionSignatures)) assert.equal(T.signature(C.questions.find(q => q.id === id)), expected, id + ' old question signature');
for (const [id, expected] of Object.entries(baseline.writingSignatures)) assert.equal(T.signature(C.writing.find(w => w.id === id)), expected, id + ' old writing signature');
for (const [key, expected] of Object.entries(baseline.immutableParts)) if (key !== 'theoryLearningAids') assert.equal(hash(C[key]), expected, key + ' old global unchanged');
assert.deepEqual(Object.keys(C.sources), baseline.baselineSourceIds, 'no added or removed source');
for (const [id, expected] of Object.entries(baseline.sourceHashes)) assert.equal(hash(C.sources[id]), expected);
for (const [id, expected] of Object.entries(baseline.learningAidHashes)) assert.equal(hash(C.theoryLearningAids[id]), expected);
assert.deepEqual(Object.keys(C.theoryLearningAids).filter(id => !baseline.baselineAidIds.includes(id)).sort(), [...deepened].sort());
const allowed = new Set(['minutes', 'sections', 'updated', 'basis', 'versionNote', 'learningLevels', 'practice']);
const omit = (object, keys) => Object.fromEntries(Object.entries(object).filter(([key]) => !keys.has(key)));
for (const id of deepened) {
  const old = baseline.revisedLessons[id], lesson = C.lessons.find(l => l.id === id);
  assert.deepEqual(plain(omit(lesson, allowed)), omit(old, allowed), id + ' only approved lecture fields changed');
  assert.deepEqual(plain(lesson.practice), [...old.practice, ...additionsFor(id)]);
  assert.equal(lesson.sections.length, 9); assert.deepEqual(Object.keys(lesson.learningLevels), levels);
  const aid = C.theoryLearningAids[id]; assert.ok(aid.memoryCue && aid.recall.length >= 2 && aid.sourceIds.every(id => C.sources[id]));
  for (const [i, key] of levels.entries()) {
    const guide = lesson.learningLevels[key]; assert.deepEqual(plain(guide.sections), [i * 3, i * 3 + 1, i * 3 + 2]);
    assert.deepEqual(plain(guide.questionIds), additionsFor(id).slice(i * 2, i * 2 + 2));
    assert.deepEqual(plain(guide.writingIds), [writingIds[deepened.indexOf(id) * 3 + i]]); assert.equal(guide.stage, C.learningPaths[key].stage);
  }
}
for (const id of expanded) {
  const old = baseline.revisedLessons[id], lesson = C.lessons.find(l => l.id === id), added = additionsFor(id);
  assert.deepEqual(plain(omit(lesson, new Set(['practice', 'learningLevels']))), omit(old, new Set(['practice', 'learningLevels'])), id + ' no lecture/global metadata changes');
  assert.deepEqual(plain(lesson.practice), [...old.practice, ...added]); assert.deepEqual(Object.keys(lesson.learningLevels), Object.keys(old.learningLevels));
  for (const [i, key] of levels.entries()) assert.deepEqual(plain(lesson.learningLevels[key]), { ...old.learningLevels[key], questionIds: [...old.learningLevels[key].questionIds, added[i]] }, id + '/' + key + ' only one appended question');
}
for (const collection of ['lessons', 'questions', 'writing']) {
  assert.equal(new Set(C[collection].map(row => row.id)).size, C[collection].length);
  for (const [id, expected] of Object.entries(reviewed.collections[collection])) assert.equal(hash(C[collection].find(row => row.id === id)), expected, id + ' exact independently reviewed content');
}
assert.deepEqual([Object.keys(reviewed.collections.lessons).length, Object.keys(reviewed.collections.questions).length, Object.keys(reviewed.collections.writing).length], [10, 36, 6]);
for (const [id, expected] of Object.entries(reviewed.learningAids)) assert.equal(hash(C.theoryLearningAids[id]), expected);
const questions = C.questions.filter(q => !Object.hasOwn(baseline.collections.questions, q.id));
assert.deepEqual(plain(questions.map(q => q.id)).sort(), [...questionIds].sort());
assert.equal(new Set(C.questions.map(q => normalized(q.stem))).size, 753, 'all normalized stems distinct');
const stages = Object.fromEntries(levels.map(key => [C.learningPaths[key].stage, 0]));
for (const q of questions) {
  assert.equal(q.options.length, 4); assert.equal(new Set(q.options).size, 4); assert.equal(q.optionReviews.length, 4);
  assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4); assert.equal(q.explanation, q.optionReviews[q.answer]);
  assert.ok(q.optionReviews.every(text => text.trim().length > 8));
  assert.equal(q.meta.source.kind, 'original'); assert.equal(q.meta.rights.status, 'original'); assert.equal(q.meta.examSource.year, null); assert.equal(q.meta.difficulty.level, null);
  assert.equal(q.meta.answerReview.status, 'editorial-reviewed', 'independent editorial review is distinct from author self-check');
  assert.equal(q.meta.trainingStage, q.trainingStage); assert.ok(Object.hasOwn(stages, q.trainingStage)); stages[q.trainingStage]++;
  assert.ok(q.meta.source.referenceIds.every(id => C.sources[id]));
  const lesson = C.lessons.find(l => l.id === q.lesson); assert.ok(lesson.practice.includes(q.id));
  const key = levels.find(key => C.learningPaths[key].stage === q.trainingStage); assert.ok(lesson.learningLevels[key].questionIds.includes(q.id));
}
assert.deepEqual(Object.values(stages), [12, 12, 12]); assert.equal(questions.reduce((sum, q) => sum + q.optionReviews.length, 0), 144);
const layered = C.lessons.filter(l => l.learningLevels).flatMap(l => levels.flatMap(key => l.learningLevels[key].questionIds || []));
assert.equal(layered.length, 604); assert.equal(new Set(layered).size, 604);
assert.ok(questionIds.every(id => layered.includes(id)), "all 36 new choices have explicit path references");
for (const [index, key] of levels.entries()) {
  assert.equal(C.lessons.filter(l => l.learningLevels).reduce((sum, l) => sum + (l.learningLevels[key].questionIds || []).length, 0), [199, 202, 203][index]);
  assert.equal(C.questions.filter(q => q.meta.trainingStage === C.learningPaths[key].stage).length, 223);
}
assert.equal(C.questions.filter(q => Object.hasOwn(stages, q.meta.trainingStage)).length, 669);
const transfers = questions.filter(q => q.id.startsWith('d37-transfer-'));
assert.equal(new Set(transfers.map(q => q.materialGroup)).size, 24);
for (const q of transfers) {
  assert.equal(q.materialGroup, q.id + '-condition'); assert.deepEqual(plain(q.materialIds), [q.id + '-material']);
  assert.ok(q.stem.includes(reviewed.transferMaterials[q.id].text), q.id + ' complete original material remains in the rendered stem');
  assert.equal(reviewed.transferMaterials[q.id].id, q.materialIds[0]);
}
const emptyState = { attempts: [], runs: [], activeRun: null, notes: {}, drafts: {}, checks: {}, read: [], favorites: [] };
const report = c.window.STUDY_ADAPTIVE.derive({ content: C, state: emptyState, signature: T.signature, now: 1793916000000 });
assert.match(report.notice, /不同组不保证统计独立/);
for (const id of expanded) {
  const row = report.rows.find(row => row.lessonId === id), old = baseline.baselineLessonGroups[id];
  assert.equal(row.counts.pool, old.pool + 3); assert.equal(row.counts.poolGroups, old.poolGroups + 3);
  assert.ok([5, 6].includes(row.counts.poolGroups)); assert.equal(row.status, 'unseen'); assert.equal(row.label, '尚无作答记录');
  assert.deepEqual([row.counts.distinct, row.counts.groups, row.counts.days], [0, 0, 0], 'pool diversity does not create user evidence');
}
assert.deepEqual([report.rule.minDistinct, report.rule.minGroups, report.rule.minDays], [5, 5, 2]);
const writing = C.writing.filter(w => !Object.hasOwn(baseline.collections.writing, w.id));
assert.deepEqual(plain(writing.map(w => w.id)).sort(), [...writingIds].sort());
assert.equal(new Set(writing.map(w => w.materialGroup)).size, 2); assert.equal(new Set(C.writing.map(w => w.material)).size, 37);
const limits = [200, 330, 420, 260, 450, 1000], lengths = [];
for (const task of writing) {
  const index = writingIds.indexOf(task.id), count = characters(task.sample); assert.equal(task.limit, limits[index]);
  assert.ok(count > 0 && count <= task.limit, task.id + ' reference character limit');
  if (task.id.endsWith('essay_practice')) assert.ok(count >= 300);
  if (task.id.endsWith('essay_advanced')) { assert.ok(count >= 800 && count <= 1000, 'complete 800–1000 character essay'); assert.match(task.task, /800[—–－-]1000|800至1000/); }
  assert.ok(task.task.includes(String(task.limit))); assert.match(task.material, /原创虚构/);
  assert.deepEqual([...task.material.matchAll(/^【(\d+)】/gm)].map(m => Number(m[1])), [1, 2, 3, 4, 5, 6, 7, 8]);
  assert.equal(task.points.length, task.evidenceParagraphs.length); assert.equal(task.points.length, task.evidenceDetails.length);
  const scope = reviewed.writingEvidenceScopes[task.id]; assert.ok(Array.isArray(scope) && scope.length);
  task.evidenceDetails.forEach((e, i) => {
    assert.equal(e.point, i + 1); assert.deepEqual(plain(e.paragraphs), plain(task.evidenceParagraphs[i])); assert.ok(e.reason.trim() && e.paragraphs.length);
    for (const n of e.paragraphs) assert.ok(n === '任务' || scope.includes(n), task.id + ' evidence within task scope');
  });
  assert.ok(task.misconceptions.length > 0);
  for (const m of task.misconceptions) { for (const key of ['weak', 'problem', 'revision']) assert.ok(m[key]?.trim()); assert.notEqual(normalized(m.weak), normalized(m.revision)); }
  assert.ok(task.rewriteSteps.length >= 3 && task.rewriteSteps.every(step => step.trim())); assert.match(task.reviewNote, /不是官方/); assert.match(task.reviewNote, /字数/);
  assert.deepEqual(plain(task.provenance), { kind: 'original-fictional', examYear: null, officialScore: null, difficultyCalibrated: false });
  const guide = C.lessons.find(l => l.id === task.lesson).learningLevels[task.learningLevel]; assert.ok(guide.writingIds.includes(task.id)); assert.equal(guide.stage, task.trainingStage);
  lengths.push({ id: task.id, characters: count, limit: task.limit });
}
// Coverage may update only the ten changed lesson links and scoped gap text.
assert.deepEqual(plain(C.coverageAdded), []); assert.deepEqual(plain(C.coverageDeepened), deepened); assert.deepEqual(plain(C.coveragePracticeExpanded), expanded);
assert.deepEqual(plain(C.coverage), baseline.baselineCoverage);
const topics = C.coverageMatrix.flatMap(group => group.topics); assert.equal(topics.length, 105); assert.equal(new Set(topics.map(topic => topic.id)).size, 105);
assert.deepEqual(plain(topics.map(topic => topic.id)).sort(), plain(C.lessons.map(l => l.id)).sort());
const allowedGaps = new Set(['gap-资料分析-0', 'gap-资料分析-1', 'gap-判断推理-1', 'gap-判断推理-2', 'gap-言语理解-0', 'gap-申论方法-0']);
for (const oldGroup of baseline.baselineCoverageMatrix) {
  const group = C.coverageMatrix.find(g => g.module === oldGroup.module); assert.ok(group); assert.deepEqual(Object.keys(group), Object.keys(oldGroup));
  assert.equal(group.topics.length, oldGroup.topics.length); assert.equal(group.gaps.length, oldGroup.gaps.length);
  for (const oldTopic of oldGroup.topics) {
    const topic = group.topics.find(t => t.id === oldTopic.id), lesson = C.lessons.find(l => l.id === oldTopic.id); assert.ok(topic);
    if (!changed.includes(topic.id)) assert.deepEqual(plain(topic), oldTopic);
    else {
      assert.deepEqual(plain(omit(topic, new Set(['questionIds', 'writingIds']))), omit(oldTopic, new Set(['questionIds', 'writingIds'])));
      assert.deepEqual(plain(topic.questionIds), plain(lesson.practice)); assert.deepEqual(plain(topic.writingIds), plain(C.writing.filter(w => w.lesson === lesson.id).map(w => w.id)));
      assert.deepEqual(plain(topic.writingIds.slice(0, oldTopic.writingIds.length)), oldTopic.writingIds);
    }
  }
  for (const oldGap of oldGroup.gaps) {
    const gap = group.gaps.find(g => g.id === oldGap.id); assert.ok(gap);
    if (!allowedGaps.has(gap.id)) assert.deepEqual(plain(gap), oldGap);
    else { assert.deepEqual(plain(omit(gap, new Set(['remaining']))), omit(oldGap, new Set(['remaining']))); assert.ok(gap.remaining.trim()); assert.match(gap.remaining, /仍|不足|不代表/); }
  }
}
assert.deepEqual(plain(C.theoryTrack), baseline.baselineTheoryTrack);
// Actual pre-v038 script stream gives the isolated input. Expectations above
// remain Git-frozen; no expected hashes are generated from this stream.
const old = context(); for (const file of contentScripts) if (!adapters.includes(file)) execute(old, file);
const previous = old.window.STUDY_CONTENT; assert.deepEqual([previous.lessons.length, previous.questions.length, previous.writing.length], [105, 717, 81]);
const isolated = () => { const test = context(); test.window.STUDY_CONTENT = plain(previous); return test; };
const normalizedCollections = content => ({ ...content, questions: [...content.questions].sort((a, b) => a.id.localeCompare(b.id)) });
let orderResult;
for (const order of [adapters, [...adapters].reverse()]) {
  const test = isolated(), before = test.window.STUDY_CONTENT, bytes = JSON.stringify(before); freeze(before);
  for (const file of order) execute(test, file);
  const after = test.window.STUDY_CONTENT; assert.equal(JSON.stringify(before), bytes, 'deep-frozen input unchanged');
  assert.deepEqual([after.lessons.length, after.questions.length, after.writing.length], [105, 753, 87]);
  for (const collection of ['questions', 'writing']) for (const row of before[collection]) assert.equal(after[collection].find(item => item.id === row.id), row, row.id + ' old object reference');
  for (const row of before.lessons) if (!changed.includes(row.id)) assert.equal(after.lessons.find(item => item.id === row.id), row, row.id + ' old lesson reference');
  const result = hash(normalizedCollections(after)); if (orderResult) assert.equal(result, orderResult, 'both orders produce identical records'); else orderResult = result;
  for (const file of order) { const bytes = JSON.stringify(after); assert.throws(() => execute(test, file), /rejected|conflict/); assert.equal(test.window.STUDY_CONTENT, after); assert.equal(JSON.stringify(after), bytes, 'duplicate load atomic'); }
}
let rejectedCases = 0;
function rejectsAtomically(file, mutate, message) {
  const test = isolated(); execute(test, adapters.find(other => other !== file)); mutate(test.window.STUDY_CONTENT);
  const before = test.window.STUDY_CONTENT, bytes = JSON.stringify(before);
  assert.throws(() => execute(test, file), /rejected|conflict|drift/, message); assert.equal(test.window.STUDY_CONTENT, before); assert.equal(JSON.stringify(before), bytes, message + ' no partial mutation'); rejectedCases++;
}
for (const id of changed) rejectsAtomically(deepened.includes(id) ? adapters[0] : adapters[1], C => { C.lessons.find(l => l.id === id).subtitle += ' drift'; }, id + ' unrelated drift');
for (const file of adapters) {
  const sample = questions.find(q => q.id.startsWith(file === adapters[0] ? 'c38-' : 'd37-transfer-'));
  rejectsAtomically(file, C => { C.questions.push(plain(sample)); }, file + ' ID conflict');
  rejectsAtomically(file, C => { C.questions.push({ ...plain(sample), id: 'synthetic-collision', stem: '  ' + sample.stem + '！！！' }); }, file + ' normalized stem conflict');
}
rejectsAtomically(adapters[0], C => { C.lessons.find(l => l.id === deepened[0]).learningLevels = {}; }, 'already-layered lecture');
rejectsAtomically(adapters[0], C => { C.writing.push(plain(writing[0])); }, 'writing ID conflict');
rejectsAtomically(adapters[0], C => { C.theoryLearningAids[deepened[0]] = { synthetic: true }; }, 'learning aid conflict');
rejectsAtomically(adapters[1], C => { C.lessons.find(l => l.id === expanded[0]).learningLevels.intro.questionIds.reverse(); }, 'existing practice path drift');
const long = context(); for (const file of scriptNames('long-mock.html')) if (!['long-mock-workspace.js', 'long-mock-store.js'].includes(file)) execute(long, file);
assert.equal(hash(long.window.STUDY_CONTENT), hash(C), 'both public entrypoints load identical content');
const M = long.window.LONG_MOCK_MODEL; assert.equal(M.pool().length, 730); assert.equal(M.modules().length, 8);
const presetIds = new Set();
for (const offset of [0, 10, 20]) {
  const run = M.build({ id: 'synthetic-preset-' + offset, title: 'Synthetic preset', requests: baseline.longPresetRequests, minutes: 60, now: 1793916000000, offset });
  assert.equal(M.summary(run).total.planned, 60); const ids = run.sections.flatMap(s => s.items.map(i => i.qid));
  assert.deepEqual(plain(ids), baseline.longPresetIds[offset], 'exact previous 60-question preset retained');
  for (const id of ids) { assert.ok(!presetIds.has(id)); presetIds.add(id); }
}
assert.equal(presetIds.size, 180);
assert.equal(hash(long.window.FULL_TRAINING_PAPERS), baseline.fixedPaperCatalogHash, 'entire fixed-paper catalog unchanged');
const fixed = long.window.FULL_TRAINING_PAPERS.papers.flatMap(p => p.sections.flatMap(s => s.items));
assert.equal(fixed.length, 240); assert.deepEqual(plain(fixed), baseline.fixedPaperReferences, 'all 240 exact fixed references retained');
for (const item of fixed) assert.equal(T.signature(C.questions.find(q => q.id === item.questionId)), item.signature);
console.log('PASS v038 actual entrypoints 105/753/87, 97 layered: all 717 old question and 81 old writing signatures, 95 untouched lessons, ten strictly scoped lesson updates; 43 sources and 17 old aids unchanged');
console.log('PASS 36 reviewed choices/144 option explanations, 6 evidence-linked writing tasks/2 materials, 24 explicitly grouped transfers, empty-user evidence gates, 604 explicit path questions and 669 stage-tagged questions, scoped coverage, frozen/two-order/duplicate safety and ' + rejectedCases + ' atomic conflicts, long pool 730 and unchanged fixed 240/three exact 60 presets');
console.log('Reference lengths (non-whitespace Unicode characters, not official examination scoring): ' + JSON.stringify(lengths));
