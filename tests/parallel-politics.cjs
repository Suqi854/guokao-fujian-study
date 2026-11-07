"use strict";
// Integration and rollback guards only. They do not prove facts, calibrated difficulty or learning gains.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const root = path.join(__dirname, "..");
const adapter = "parallel-politics.js";
const source = fs.readFileSync(path.join(root, "docs", adapter), "utf8");
const indexScripts = [...fs.readFileSync(path.join(root, "docs/index.html"), "utf8").matchAll(/src="\.\/([^\"]+)"/g)].map(match => match[1]);
const wired = indexScripts.includes(adapter);
// Historical adapter guards; v039 integration independently checks current full entrypoints.
const scripts = indexScripts.filter(file => !["app-topics-20261107.js","political-mao-deng-expansion.js","marxism-course-20261107.js","political-complete-integration.js","policy-current-2026.js"].includes(file));
if (wired) {
  for (const file of ["political-foundations-paths.js", "theory-learning-aids.js", adapter, "catalog.js"]) {
    assert.equal(scripts.filter(item => item === file).length, 1, `${file}: exactly one script entry`);
  }
  assert.ok(scripts.indexOf("political-foundations-paths.js") < scripts.indexOf("theory-learning-aids.js"));
  assert.ok(scripts.indexOf("theory-learning-aids.js") < scripts.indexOf(adapter));
  assert.ok(scripts.indexOf(adapter) < scripts.indexOf("catalog.js"));
} else {
  // Before the parent wires index.html, exercise exactly the same intended insertion point.
  scripts.splice(scripts.indexOf("theory-learning-aids.js"), 1);
  scripts.splice(scripts.indexOf("catalog.js"), 0, "theory-learning-aids.js", adapter);
}

const originalIds = ["practice-cognition", "contradiction-method", "productive-relations", "mao-thought-context"];
const newIds = ["social-being-people", "six-method-principles", "new-quality-productivity", "reform-framework-2024"];
const questionIds = Array.from({ length: 24 }, (_, index) => `pol2-${String(index + 1).padStart(2, "0")}`);
const sourceIds = ["hist-method-2014", "consciousness-lecture-2019", "report20-method-2022", "six-principles-2023", "new-quality-speech-2024", "local-quality-excerpts-2025", "reform-decision-2024"];
const paths = ["intro", "practice", "advanced"];
const publicSourceFields = ["title", "publisher", "year", "url", "scope", "checked"];
const plain = value => JSON.parse(JSON.stringify(value));
const run = (context, file, code) => vm.runInContext(code || fs.readFileSync(path.join(root, "docs", file), "utf8"), context, { filename: file });
const makeContext = () => vm.createContext({ window: {} });
const beforeAdapterScripts = scripts.slice(0, scripts.indexOf(adapter));
function baselineContext() {
  const context = makeContext();
  for (const file of beforeAdapterScripts) run(context, file);
  return context;
}

const context = makeContext();
let before, beforeSnapshot, afterSnapshot;
for (const file of scripts) {
  if (file === adapter) {
    before = context.window.STUDY_CONTENT;
    beforeSnapshot = plain(before);
  }
  run(context, file);
  if (file !== adapter) continue;
  const after = context.window.STUDY_CONTENT;
  afterSnapshot = plain(after);
  assert.notStrictEqual(after, before, "publish a fully prepared snapshot in one assignment");
  assert.deepEqual(plain(before), beforeSnapshot, "the pre-import content object is not mutated");
  assert.equal(after.lessons.length, before.lessons.length + 4);
  assert.equal(after.questions.length, before.questions.length + 24);
  assert.equal(Object.keys(after.sources).length, Object.keys(before.sources).length + 7);
  assert.equal(after.lessons.filter(lesson => lesson.learningLevels).length, before.lessons.filter(lesson => lesson.learningLevels).length + 4);
  assert.equal(after.lessons.filter(lesson => !lesson.learningLevels).length, before.lessons.filter(lesson => !lesson.learningLevels).length);
  for (const [index, lesson] of before.lessons.entries()) assert.strictEqual(after.lessons[index], lesson, lesson.id);
  for (const [index, question] of before.questions.entries()) assert.strictEqual(after.questions[index], question, question.id);
  for (const [id, value] of Object.entries(before.sources)) assert.strictEqual(after.sources[id], value, id);
  for (const id of originalIds) assert.strictEqual(after.theoryLearningAids[id], before.theoryLearningAids[id], id);
  for (const [index, step] of before.theoryTrack.steps.entries()) assert.strictEqual(after.theoryTrack.steps[index], step);
  for (const field of Object.keys(before)) {
    if (!["lessons", "questions", "sources", "theoryLearningAids", "theoryTrack"].includes(field)) assert.strictEqual(after[field], before[field], `unrelated field ${field}`);
  }
  // Reimport is rejected before metadata generation too, and reports the last conflicts.
  const once = JSON.stringify(after);
  assert.throws(() => run(context, adapter), error => {
    assert.match(error.message, /lesson ID conflict: reform-framework-2024/);
    assert.match(error.message, /question ID conflict: pol2-24/);
    assert.match(error.message, /source ID conflict: reform-decision-2024/);
    return true;
  });
  assert.strictEqual(context.window.STUDY_CONTENT, after);
  assert.equal(JSON.stringify(after), once);
}

assert.ok(before && afterSnapshot, "adapter ran");
const C = plain(context.window.STUDY_CONTENT);
const lessons = Object.fromEntries(C.lessons.map(lesson => [lesson.id, lesson]));
const questions = Object.fromEntries(C.questions.map(question => [question.id, question]));
assert.equal(Object.keys(lessons).length, C.lessons.length, "unique lesson IDs across the loaded site");
assert.equal(Object.keys(questions).length, C.questions.length, "unique question IDs across the loaded site");
assert.deepEqual(C.questions.filter(question => question.id.startsWith("pol2-")).map(question => question.id), questionIds);
assert.deepEqual(C.theoryTrack.steps.map(step => step.lessonId), [...originalIds, 'social-being-people', 'mao-living-soul', 'six-method-principles', 'new-quality-productivity', 'reform-framework-2024', 'unified-market-rules','new-development-pattern','education-strong-2035']);
assert.deepEqual(Object.keys(C.theoryLearningAids), [...originalIds, ...newIds, 'mao-living-soul', 'unified-market-rules','new-development-pattern','education-strong-2035','phase-change','historiography','material-mapping','answer-revision','fujian-enterprise-service-2025','multi-material','full-essay']);
assert.equal(C.theoryTrack.steps.length, 12);
assert.equal(Object.keys(C.theoryLearningAids).length, 19);
assert.match(C.theoryTrack.intro, /十二个主题/);
assert.match(C.theoryTrack.scope, /十二主题/);
for (const phrase of ["2026年完整时政", "十五五正式纲要", "福建专项政策", "福建新年度考试规则", "不是完整", "没有官方评分"]) {
  assert.ok(C.theoryTrack.gaps.join("\n").includes(phrase), `retain coverage boundary: ${phrase}`);
}

for (const id of newIds) {
  const lesson = lessons[id];
  assert.equal(lesson.category, "政治理论");
  assert.equal(lesson.sections.length, 9);
  assert.equal(lesson.practice.length, 6);
  assert.ok(lesson.versionNote && lesson.updated && lesson.basis);
  assert.deepEqual(Object.keys(lesson.learningLevels), paths);
  assert.deepEqual(Object.values(lesson.learningLevels).flatMap(level => level.sections), [...Array(9).keys()]);
  assert.deepEqual(Object.values(lesson.learningLevels).flatMap(level => level.questionIds), lesson.practice);
  assert.ok(lesson.sources.every(sourceId => C.sources[sourceId]));
  for (const path of paths) {
    const level = lesson.learningLevels[path];
    assert.equal(level.questionIds.length, 2);
    assert.ok(level.goal);
    for (const [field, value] of Object.entries(C.learningPaths[path])) {
      if (!["sections", "questionIds", "goal", "stage"].includes(field)) assert.deepEqual(level[field], value, `${id}/${path}/${field}: preserve display field`);
    }
    assert.equal(level.stage, C.learningPaths[path].stage);
    for (const questionId of level.questionIds) {
      assert.equal(questions[questionId].lesson, id);
      assert.equal(questions[questionId].meta.trainingStage, level.stage);
    }
  }
  const aid = C.theoryLearningAids[id];
  assert.deepEqual(Object.keys(aid), ["keyPoints", "contrasts", "plainExample", "memoryCue", "recall", "scope", "sourceIds"]);
  assert.equal(aid.keyPoints.length, 3);
  assert.equal(aid.contrasts.length, 2);
  assert.equal(aid.recall.length, 2);
  assert.ok(aid.plainExample.text && aid.memoryCue && aid.scope);
  assert.deepEqual(aid.sourceIds, lesson.sources);
}
for (const id of questionIds) {
  const question = questions[id];
  assert.equal(question.options.length, 4);
  assert.equal(question.optionReviews.length, 4);
  assert.ok(question.optionReviews.every(review => typeof review === "string" && review.trim()));
  assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4);
  assert.equal(question.explanation, question.optionReviews[question.answer]);
  assert.equal(question.meta.module, "政治理论");
  assert.equal(question.meta.source.kind, "original");
  assert.equal(question.meta.examSource.year, null);
  assert.equal(question.meta.difficulty.level, null);
  assert.deepEqual(question.meta.source.referenceIds, lessons[question.lesson].sources);
  assert.deepEqual(question.meta.knowledgeIds, [question.lesson]);
  assert.equal(question.meta.trainingGoal, question.trainingGoal);
  assert.equal(question.meta.rights.status, "original");
}
for (const id of sourceIds) {
  assert.deepEqual(Object.keys(C.sources[id]), publicSourceFields);
  assert.ok(publicSourceFields.every(field => typeof C.sources[id][field] === "string" && C.sources[id][field].trim()));
  assert.equal(new URL(C.sources[id].url).protocol, "https:");
}
function noPrivateAudit(value) {
  if (!value || typeof value !== "object") return;
  for (const [key, entry] of Object.entries(value)) {
    assert.ok(!["claims", "answerAudit", "claimIds"].includes(key), `private audit field must not be published: ${key}`);
    noPrivateAudit(entry);
  }
}
noPrivateAudit(newIds.map(id => lessons[id]));
noPrivateAudit(questionIds.map(id => questions[id]));
noPrivateAudit(sourceIds.map(id => C.sources[id]));
noPrivateAudit(newIds.map(id => C.theoryLearningAids[id]));

// Last-item conflicts must be rejected with no partial additions, source changes or record changes.
const rollbackCases = [
  ["late lesson collision", content => content.lessons.push({ id: newIds.at(-1) }), /lesson ID conflict/],
  ["late question collision", content => content.questions.push({ id: questionIds.at(-1) }), /question ID conflict/],
  ["late source collision", content => { content.sources[sourceIds.at(-1)] = { title: "existing source must survive" }; }, /source ID conflict/],
  ["late aid collision", content => { content.theoryLearningAids[newIds.at(-1)] = { memoryCue: "existing aid must survive" }; }, /learning aid ID conflict/],
  ["late step collision", content => content.theoryTrack.steps.push({ lessonId: newIds.at(-1) }), /theory step ID conflict/],
  ["missing base aid", content => { delete content.theoryLearningAids[originalIds.at(-1)]; }, /load original theory learning aids first/],
  ["missing display path", content => { delete content.learningPaths.advanced; }, /missing learning path/],
  ["catalog already processed", content => { content.catalogVersion = 1; }, /before catalog.js/]
];
for (const [label, prepare, expected] of rollbackCases) {
  const test = baselineContext();
  const content = test.window.STUDY_CONTENT;
  content.testLegacyRecords = { answers: { q436: 2, q459: 1 }, mistakes: ["q459"], writing: ["w1"] };
  prepare(content);
  const snapshot = JSON.stringify(content);
  assert.throws(() => run(test, adapter), expected, label);
  assert.strictEqual(test.window.STUDY_CONTENT, content, `${label}: no publication`);
  assert.equal(JSON.stringify(content), snapshot, `${label}: full rollback`);
}

// A frozen baseline proves the adapter does not secretly mutate legacy objects or nested paths.
const frozenContext = baselineContext();
const frozen = frozenContext.window.STUDY_CONTENT;
function freeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(freeze);
  return Object.freeze(value);
}
freeze(frozen);
const frozenSnapshot = JSON.stringify(frozen);
run(frozenContext, adapter);
assert.equal(JSON.stringify(frozen), frozenSnapshot);
assert.equal(frozenContext.window.STUDY_CONTENT.questions.length, frozen.questions.length + 24);
assert.strictEqual(frozenContext.window.STUDY_CONTENT.questions[0], frozen.questions[0]);

// Final-state duplicate loading is rejected without touching generated metadata or legacy content.
const finalObject = context.window.STUDY_CONTENT;
const finalSnapshot = JSON.stringify(finalObject);
assert.throws(() => run(context, adapter), /parallel-politics preflight rejected/);
assert.strictEqual(context.window.STUDY_CONTENT, finalObject);
assert.equal(JSON.stringify(finalObject), finalSnapshot);

console.log(`PASS Political package via ${wired ? "actual index.html" : "baseline scripts + intended adapter insertion"}: 4 lessons, 24 stable pol2 IDs, 7 public sources, 12 display-ready paths, 8 theory steps and 8 learning aids`);
console.log("PASS Metadata, unique IDs, original object identities, frozen-baseline import, late-conflict rollback and duplicate-import rejection");
console.log("NOT A FACT CHECK: source reading and question reasoning remain in the separate internal package; these are integration regression checks only");
