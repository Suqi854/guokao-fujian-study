'use strict';
// Only for older identity fixtures: the explicitly authorized v0.36 two-lesson
// deepening and appended theory records. Final v0.36 tests separately validate
// all replacement text, 669 old question signatures and 100 untouched lessons.
const assert=require('node:assert/strict'),base=require('./fixtures/v035-public-identities.json');
const plain=x=>JSON.parse(JSON.stringify(x));
module.exports=function projection(C){
 // Undo only the separately constrained v0.37 revisions before older comparisons.
 C=require('./v037-identity-projection.cjs')(C);
 const ids=['phase-change','historiography'],additions=['new-development-pattern','education-strong-2035'];
 if(!additions.some(id=>C.lessons.some(l=>l.id===id)))return C;
 assert.ok(additions.every(id=>C.lessons.some(l=>l.id===id)),'Both v0.36 theory lessons must be present');
 const permitted=new Set(['sections','minutes','updated','practice','learningLevels','versionNote']);
 const lessons=C.lessons.map(l=>{
  if(!ids.includes(l.id))return l;
  const old=base.revisedLessons[l.id],rest=o=>Object.fromEntries(Object.entries(o).filter(([key])=>!permitted.has(key)));
  assert.deepEqual(plain(rest(l)),rest(old),l.id+' non-authorized fields unchanged');
  assert.equal(l.sections.length,9);assert.ok(l.learningLevels);assert.equal(l.practice.length,old.practice.length+9);assert.deepEqual(plain(l.practice.slice(0,old.practice.length)),old.practice);
  return old;
 });
 const without=(o,ids)=>Object.fromEntries(Object.entries(o).filter(([k])=>!ids.includes(k)));
 const steps=C.theoryTrack.steps.filter(s=>!additions.includes(s.lessonId));
 assert.deepEqual(plain(steps),base.baselineTheoryTrack.steps,'All old theory steps preserved');
 const oldTrack=base.baselineTheoryTrack;
 return {...C,lessons,sources:without(C.sources,['development-pattern-speech-2023','education-outline-2025']),theoryLearningAids:without(C.theoryLearningAids,[...ids,...additions]),theoryTrack:{...C.theoryTrack,intro:oldTrack.intro,scope:oldTrack.scope,gaps:oldTrack.gaps,steps}};
};
