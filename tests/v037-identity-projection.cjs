'use strict';
// Scoped compatibility view for historical identity fixtures only. The final
// v037 checks separately lock approved text, all699 old questions and75 writing.
const assert=require('node:assert/strict'),base=require('./fixtures/v036-public-identities.json');
const plain=x=>JSON.parse(JSON.stringify(x));
module.exports=function projection(C){
 const ids=['material-mapping','answer-revision'],added='fujian-enterprise-service-2025';
 if(!C.lessons.some(l=>l.id===added)&&!ids.some(id=>C.lessons.find(l=>l.id===id)?.learningLevels))return C;
 const allowed=new Set(['sections','minutes','updated','practice','learningLevels','versionNote','basis']);
 const lessons=C.lessons.map(l=>{
  if(!ids.includes(l.id))return l;
  const old=base.revisedLessons[l.id],rest=o=>Object.fromEntries(Object.entries(o).filter(([k])=>!allowed.has(k)));
  assert.deepEqual(plain(rest(l)),rest(old),l.id+' unrelated fields unchanged');
  assert.equal(l.sections.length,9);assert.ok(l.learningLevels);assert.equal(l.practice.length,old.practice.length+6);assert.deepEqual(plain(l.practice.slice(0,old.practice.length)),old.practice);
  return old;
 });
 const without=(o,keys)=>Object.fromEntries(Object.entries(o).filter(([k])=>!keys.includes(k)));
 assert.deepEqual(plain(C.theoryTrack),base.baselineTheoryTrack,'v037 does not change political route');
 return {...C,lessons,sources:without(C.sources,['fujian-four-access-2025']),theoryLearningAids:without(C.theoryLearningAids,[...ids,added])};
};
