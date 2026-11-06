'use strict';
// Only the six user-authorized sections/updated revisions are projected.
// Original objects come from the blob-verified main 0b92788 baseline, not candidate output.
const assert=require('node:assert/strict'),base=require('./fixtures/learning-release-baseline.json');
const plain=x=>JSON.parse(JSON.stringify(x));
module.exports=C=>({...C,lessons:C.lessons.map(l=>{
 const old=base.lessons.find(x=>x.id===l.id);if(!old)return l;
 const omit=o=>Object.fromEntries(Object.entries(o).filter(([k])=>!['sections','updated'].includes(k)));
 assert.deepEqual(plain(omit(l)),omit(old),l.id+' only sections/updated may change');
 return old;
})});
