'use strict';
// Narrow regression: six lesson revisions keep all existing practice and task data intact.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const assert = require('node:assert/strict'), crypto = require('node:crypto');
const base = path.join(__dirname, '..'), context = { window: {} };
vm.createContext(context);
const html = fs.readFileSync(path.join(base,'docs/index.html'),'utf8');
for (const [,file] of html.matchAll(/src="\.\/([^\"]+)"/g)) {
  if(file !== 'app-topics-20261107.js') vm.runInContext(fs.readFileSync(path.join(base,'docs',file),'utf8'),context,{filename:file});
}
const C = JSON.parse(JSON.stringify(context.window.STUDY_CONTENT));
const digest = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const baseline=require('./fixtures/learning-release-baseline.json');
const oldQuestions=baseline.questionIds.map(id=>C.questions.find(q=>q.id===id));
assert.equal(oldQuestions.length,861);assert.ok(oldQuestions.every(Boolean));
const projected=require('./learning-release-identity-projection.cjs')(C);
// One subsequently source-reviewed correction is checked exactly, then normalized only
// for this historical identity comparison. No other field or identity lock is relaxed.
const currentCategories=C.lessons.find(l=>l.id==='marx-categories');
assert.equal(currentCategories.sections[3][1],"可能性是现实事物中潜在而尚未实现的发展趋势，现实性是已经存在的状态。可能转化为现实需要相应条件；社区建设等社会实践还需要人的实际活动，不能把这一要求泛化到所有自然过程。虚构社区已有方案、场地与试点结果，只能说明有一定实施基础；资金未落实、工程未完成，就不能把“有希望建成”写成“已经建成”。",'exact reviewed possibility/reality correction');
const historicalCategories=JSON.parse(JSON.stringify(projected.lessons.find(l=>l.id==='marx-categories')));
historicalCategories.sections[3][1]="可能性是包含在现实中的发展趋势和条件，现实性是已经存在的状态。把可能变为现实需要条件及相应活动。虚构社区已有方案、场地与试点结果，只能说明有一定实施基础；资金未落实、工程未完成，就不能把“有希望建成”写成“已经建成”。";
assert.equal(Object.keys(baseline.lessonHashes).length,123);
for(const [id,wanted] of Object.entries(baseline.lessonHashes))assert.equal(digest(id==='marx-categories'?historicalCategories:projected.lessons.find(l=>l.id===id)),wanted,id+' original complete lesson identity outside the six authorized fields');
assert.equal(digest(oldQuestions),'900ea08768eeefb215d8cda49f3b8f20e2e75549418497181f5fe9809bd375fd','all 861 original question objects unchanged');
assert.equal(digest(C.writing),'d9f02bb37f014b41eb1da92e152349d1e0e10aae24afac340f0e69532220c8ab','all 87 existing writing task objects unchanged');
const pairs = {'summary-evidence':'w09','action-design':'w11','audience-writing':'w12','paragraph-evidence':'w13','explain-in-context':'w14','compare-materials':'w15'};
for(const [id, taskId] of Object.entries(pairs)){
  const lesson=C.lessons.find(l=>l.id===id), text=lesson.sections.map(s=>s[1]).join('\n');
  assert.ok(lesson,'lesson ID retained');
  assert.ok(text.length>=800,'substantive explanation, not empty section labels');
  assert.ok(lesson.sections.some(s=>s[0].startsWith('例解：')),'worked example');
  assert.ok(lesson.sections.some(s=>s[0].startsWith('改错：')),'concrete revision');
  assert.ok(text.includes(taskId),'example connected to an existing task');
  assert.equal(C.writing.find(w=>w.id===taskId).lesson,id,'existing lesson/task relationship retained');
  assert.equal(lesson.learningLevels,undefined,'does not claim three new levels');
  assert.equal(lesson.updated,'2026-11-06');
}
assert.equal(C.lessons.length,127);assert.equal(C.questions.length,885);assert.equal(C.writing.length,87);
assert.equal(C.lessons.filter(l=>l.learningLevels).length,119);
console.log('PASS Six existing shenlun lessons have worked examples and error revision. All 861 original question and 87 task objects and IDs remain unchanged; integrated totals include the policy additions.');
