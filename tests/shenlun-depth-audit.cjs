'use strict';
// Narrow regression: six lesson revisions keep all existing practice and task data intact.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const assert = require('node:assert/strict'), crypto = require('node:crypto');
const base = path.join(__dirname, '..'), context = { window: {} };
vm.createContext(context);
const html = fs.readFileSync(path.join(base,'docs/index.html'),'utf8');
for (const [,file] of html.matchAll(/src="\.\/([^\"]+)"/g)) {
  if(file !== 'app.js') vm.runInContext(fs.readFileSync(path.join(base,'docs',file),'utf8'),context,{filename:file});
}
const C = JSON.parse(JSON.stringify(context.window.STUDY_CONTENT));
const digest = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const baseline=require('./fixtures/learning-release-baseline.json');
const oldQuestions=baseline.questionIds.map(id=>C.questions.find(q=>q.id===id));
assert.equal(oldQuestions.length,861);assert.ok(oldQuestions.every(Boolean));
const projected=require('./learning-release-identity-projection.cjs')(C);
assert.equal(Object.keys(baseline.lessonHashes).length,123);
for(const [id,wanted] of Object.entries(baseline.lessonHashes))assert.equal(digest(projected.lessons.find(l=>l.id===id)),wanted,id+' original complete lesson identity outside the six authorized fields');
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
