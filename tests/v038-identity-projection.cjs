'use strict';
// Historical identity view only. v038-integration locks the approved replacement
// text independently; this function cannot hide unrelated old-record changes.
const assert = require('node:assert/strict');
const { baseline, deepened, expanded, levels, questionIds, additionsFor, plain } = require('./v038-test-support.cjs');
module.exports = function projection(C) {
  if (!C.questions.some(q => questionIds.includes(q.id)) && !deepened.some(id => C.lessons.find(l => l.id === id)?.learningLevels)) return C;
  const permitted = new Set(['minutes', 'sections', 'updated', 'basis', 'versionNote', 'learningLevels', 'practice']);
  const omit = (o, keys) => Object.fromEntries(Object.entries(o).filter(([key]) => !keys.has(key)));
  const lessons = C.lessons.map(lesson => {
    if (!deepened.includes(lesson.id) && !expanded.includes(lesson.id)) return lesson;
    const old = baseline.revisedLessons[lesson.id], ids = additionsFor(lesson.id);
    const present = ids.filter(id => C.questions.some(q => q.id === id));
    if (!present.length) { assert.deepEqual(plain(lesson), old, lesson.id + ' no partial hidden revision'); return lesson; }
    assert.equal(present.length, ids.length, lesson.id + ' complete addition batch');
    assert.deepEqual(plain(lesson.practice), [...old.practice, ...ids], lesson.id + ' exact practice append');
    if (deepened.includes(lesson.id)) {
      assert.deepEqual(plain(omit(lesson, permitted)), omit(old, permitted), lesson.id + ' unrelated fields unchanged');
      assert.equal(lesson.sections.length, 9);
      assert.deepEqual(Object.keys(lesson.learningLevels), levels);
      for (const [i, level] of levels.entries()) {
        assert.deepEqual(plain(lesson.learningLevels[level].questionIds), ids.slice(i * 2, i * 2 + 2));
        assert.deepEqual(plain(lesson.learningLevels[level].sections), [i * 3, i * 3 + 1, i * 3 + 2]);
      }
      return old;
    }
    // Remove only the three explicit appended IDs. Retain and check every
    // original learning-level field, including original question ordering.
    const restored = { ...lesson, practice: lesson.practice.filter(id => !ids.includes(id)), learningLevels: Object.fromEntries(Object.entries(lesson.learningLevels).map(([level, guide]) => {
      const added = ids[levels.indexOf(level)];
      assert.deepEqual(plain(guide.questionIds), [...old.learningLevels[level].questionIds, added], lesson.id + '/' + level + ' exact append');
      return [level, { ...guide, questionIds: guide.questionIds.filter(id => !ids.includes(id)) }];
    })) };
    assert.deepEqual(plain(restored), old, lesson.id + ' only appended practice/level IDs may change');
    return restored;
  });
  const theoryLearningAids = Object.fromEntries(Object.entries(C.theoryLearningAids).filter(([id]) => !deepened.includes(id)));
  return { ...C, lessons, theoryLearningAids };
};
