"use strict";
// Pure content/schema guards. These are not a new source or exam-frequency audit.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const root = path.join(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
const run = name => vm.runInContext(fs.readFileSync(path.join(root, "docs", name), "utf8"), context, { filename: name });
// Load the existing content chain only as far as the four verified lessons.
// The aid is loaded explicitly below, so this works before and after UI wiring.
let foundationsLoaded = false;
for (const match of fs.readFileSync(path.join(root, "docs/index.html"), "utf8").matchAll(/src="\.\/([^\"]+)"/g)) {
  if (match[1] === "app-studio-20261112-clean.js" || match[1] === "theory-learning-aids.js") continue;
  run(match[1]);
  if (match[1] === "political-foundations-paths.js") {
    foundationsLoaded = true;
    break;
  }
}
assert.ok(foundationsLoaded, "Load the source-scoped theory lessons before their memory aids");
const original = JSON.stringify(context.window.STUDY_CONTENT);
run("theory-learning-aids.js");
const C = JSON.parse(JSON.stringify(context.window.STUDY_CONTENT));
const { theoryLearningAids: aids, ...unchanged } = C;
assert.equal(JSON.stringify(unchanged), original, "Learning aids must not rewrite lessons, sources, questions or theoryTrack");

const ids = ["practice-cognition", "contradiction-method", "productive-relations", "mao-thought-context"];
assert.deepEqual(Object.keys(aids), ids);
assert.deepEqual(C.theoryTrack.steps.map(step => step.lessonId), ids);
const expectedFields = ["keyPoints", "contrasts", "plainExample", "memoryCue", "recall", "scope", "sourceIds"];
function text(value, min, max, label) {
  assert.equal(typeof value, "string", label);
  assert.equal(value, value.trim(), `${label}: trim text`);
  assert.ok(value.length >= min && value.length <= max, `${label}: length ${value.length}, expected ${min}–${max}`);
  assert.doesNotMatch(value, /<\/?[a-z][^>]*>/i, `${label}: content must remain plain text`);
}
const allText = [];
function collect(value) {
  if (typeof value === "string") allText.push(value);
  else if (Array.isArray(value)) value.forEach(collect);
  else Object.values(value).forEach(collect);
}

for (const id of ids) {
  const aid = aids[id];
  const lesson = C.lessons.find(item => item.id === id);
  assert.ok(lesson, `${id}: existing lesson`);
  assert.deepEqual(Object.keys(aid), expectedFields, `${id}: stable UI fields`);
  assert.ok(aid.keyPoints.length >= 2 && aid.keyPoints.length <= 3, `${id}: 2–3 priorities`);
  assert.equal(new Set(aid.keyPoints.map(point => point.title)).size, aid.keyPoints.length);
  for (const point of aid.keyPoints) {
    assert.deepEqual(Object.keys(point), ["title", "text"]);
    text(point.title, 6, 30, `${id}: priority title`);
    text(point.text, 45, 180, `${id}: priority explanation`);
  }
  assert.ok(aid.contrasts.length >= 1 && aid.contrasts.length <= 2, `${id}: 1–2 contrasts`);
  for (const contrast of aid.contrasts) {
    assert.deepEqual(Object.keys(contrast), ["left", "right", "cue"]);
    for (const side of [contrast.left, contrast.right]) {
      assert.deepEqual(Object.keys(side), ["term", "text"]);
      text(side.term, 3, 30, `${id}: contrast term`);
      text(side.text, 20, 130, `${id}: contrast explanation`);
    }
    assert.notEqual(contrast.left.term, contrast.right.term);
    text(contrast.cue, 20, 130, `${id}: contrast cue`);
  }
  assert.deepEqual(Object.keys(aid.plainExample), ["title", "text"]);
  text(aid.plainExample.title, 8, 35, `${id}: example title`);
  text(aid.plainExample.text, 110, 300, `${id}: example explanation`);
  text(aid.memoryCue, 45, 160, `${id}: memory cue must explain the connection`);
  text(aid.scope, 55, 220, `${id}: retained verification scope`);
  assert.equal(aid.recall.length, 2, `${id}: exactly two open recall prompts`);
  assert.equal(new Set(aid.recall.map(item => item.question)).size, 2);
  for (const recall of aid.recall) {
    assert.deepEqual(Object.keys(recall), ["question", "checkpoints"]);
    text(recall.question, 25, 120, `${id}: open recall question`);
    assert.match(recall.question, /[？?]$/);
    assert.ok(recall.checkpoints.length >= 1 && recall.checkpoints.length <= 3);
    recall.checkpoints.forEach(point => text(point, 20, 135, `${id}: short recall checkpoint`));
  }
  assert.deepEqual(aid.sourceIds, lesson.sources, `${id}: reuse existing source set without adding facts`);
  assert.ok(aid.sourceIds.every(sourceId => C.sources[sourceId]));
  collect(aid);
}

// No unsourced exam priority, guaranteed outcome, or mastery/duration claim.
assert.doesNotMatch(allText.join("\n"), /官方高频|高频考点|必考|必拿|稳拿|押中|包过|提分保证|保证(?:得分|满分|通过|掌握)|背完就|一次(?:学会|掌握)|\d+天(?:掌握|学会)/);
const includesAll = (id, words) => {
  const value = JSON.stringify(aids[id]);
  for (const word of words) assert.ok(value.includes(word), `${id}: preserve ${word}`);
};
includesAll("practice-cognition", ["材料", "解释", "实践检验", "感性", "理性", "直接经验", "间接经验", "条件", "修正", "1937年7月", "2017年", "不是1937年手稿", "不作近年政策依据"]);
includesAll("contradiction-method", ["普遍性", "特殊性", "多组", "同一", "决定性作用", "主要规定", "条件", "不是自动反转", "1937年8月", "2017年", "有修订", "不是1937年未修订原稿"]);
includesAll("productive-relations", ["一般决定作用", "反作用", "物质", "条件", "适合", "阻碍", "不是完整要素清单", "社会制度", "1859年", "2009年", "发布日期未标", "尚未逐项补核", "现行政策"]);
includesAll("mao-thought-context", ["中国革命实践", "主要创立者", "集体智慧", "1945年七大", "指导思想", "写入党章", "1937年", "2012年", "2017年", "不是1945年党章原件", "不等于思想全部内容", "最新党章和政策仍须另核"]);
assert.match(aids["practice-cognition"].plainExample.text, /虚构/);
assert.match(aids["contradiction-method"].plainExample.text, /虚构/);
assert.match(aids["productive-relations"].plainExample.text, /虚构/);
assert.match(aids["mao-thought-context"].plainExample.text, /不是新增革命史事实/);

// Reloading static data may replace the aid object but must not add duplicates.
const once = JSON.stringify(context.window.STUDY_CONTENT);
run("theory-learning-aids.js");
assert.equal(JSON.stringify(context.window.STUDY_CONTENT), once);
console.log("PASS Four theory learning aids: priorities, contrasts, explained examples, memory cues and eight open recall prompts");
console.log("PASS Stable plain-text schema, unchanged source-scoped lessons, historical/version boundaries and no exam-success claims");
console.log("NOT A FACT CHECK: these are content regression guards; source verification remains the existing four-lesson record");
