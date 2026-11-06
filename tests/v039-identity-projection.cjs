'use strict';
// Historical-fixture view only. The complete v039 integration test independently
// checks every old record hash and the exact current 32-lesson route and coverage.
const assert=require('node:assert/strict'),base=require('./fixtures/v038-political-baseline.json');
const ids=['marx-worldview','marx-connection','marx-quantity-negation','marx-categories','marx-truth-value','marx-social-structure','marx-commodity-value','marx-surplus-capital','marx-capitalism-development','marx-socialism-communism','mao-new-democratic','mao-revolution-methods','mao-socialist-transition','mao-socialist-exploration','deng-core-framework','deng-reform-market','three-represents-theory','scientific-development-theory'];
module.exports=function projection(C){
 C=require("./learning-release-identity-projection.cjs")(C);
 if(!C.lessons.some(l=>ids.includes(l.id)))return C;
 assert.equal(C.lessons.filter(l=>ids.includes(l.id)).length,18,'complete political addition');
 const newQs=C.questions.filter(q=>ids.includes(q.lesson));assert.equal(newQs.length,108);
 return {...C,sources:Object.fromEntries(Object.entries(C.sources).filter(([id])=>id in base.maps.sources)),theoryLearningAids:Object.fromEntries(Object.entries(C.theoryLearningAids).filter(([id])=>!ids.includes(id) && !['policy-fourth-plenum-2025','policy-plan15-official-2026','policy-national-report-2026','policy-fujian-report-2026'].includes(id))),theoryTrack:base.theoryTrack,coverageMatrix:base.coverageMatrix,coverage:base.coverage};
};
