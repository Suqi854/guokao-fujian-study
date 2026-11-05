"use strict";
const fs = require("node:fs"), vm = require("node:vm"), path = require("node:path"), assert = require("node:assert/strict");
const root = path.join(__dirname, ".."), context = { window: {} };
vm.createContext(context);
for (const m of fs.readFileSync(path.join(root, "docs/index.html"), "utf8").matchAll(/src="\.\/([^\"]+)"/g)) if (m[1] !== "app.js") vm.runInContext(fs.readFileSync(path.join(root, "docs", m[1]), "utf8"), context);
const C = JSON.parse(JSON.stringify(context.window.STUDY_CONTENT)), q = Object.fromEntries(C.questions.map(x => [x.id, x]));
assert.equal(C.lessons.length, 97);
assert.equal(C.questions.length, 621);
assert.equal(C.lessons.filter(l => l.learningLevels).length, 83);
for (const id of ["arrangement", "remainders", "geometry-scale"]) {
  const l = C.lessons.find(l => l.id === id);
  assert.equal(l.sections.length, 9);
  assert.deepEqual(Object.values(l.learningLevels).flatMap(g => g.sections), [...Array(9).keys()]);
  for (const g of Object.values(l.learningLevels)) {
    assert.equal(g.questionIds.length, 2);
    assert.ok(g.questionIds.every(id => q[id].lesson === l.id && q[id].meta.trainingStage === g.stage));
  }
}
assert.deepEqual([...Array(18)].map((_, i) => q["q" + (346 + i)].answer), [0,2,3,1,2,0,1,3,0,2,3,1,2,0,3,1,0,2]);
for (let n = 346; n <= 363; n++) {
  const x = q["q" + n];
  assert.equal(x.optionReviews.length, 4);
  assert.equal(x.meta.source.kind, "original");
  assert.equal(x.meta.examSource.year, null);
  assert.equal(x.meta.difficulty.level, null);
}
assert.ok(C.lessons.find(l => l.id === "remainders").sections[2][1].includes("非负整数除以10"));
assert.ok(C.lessons.find(l => l.id === "geometry-scale").sections[8][0].includes("最值"));
console.log("PASS Three exact nine-section lessons, nine nonempty two-question paths and original uncalibrated metadata");

const permutations = a => a.length ? a.flatMap((x, i) => permutations(a.filter((_, j) => j !== i)).map(rest => [x, ...rest])) : [[]];
const pos = (w, x) => w.indexOf(x);
const before = (w, a, b) => pos(w, a) < pos(w, b);
const immediate = (w, a, b) => pos(w, b) === pos(w, a) + 1;
const three = permutations(["A", "B", "C"]), four = permutations(["A", "B", "C", "D"]), five = permutations(["A", "B", "C", "D", "E"]);
assert.equal(three.length, 6); assert.equal(four.length, 24); assert.equal(five.length, 120);
assert.deepEqual(three.filter(w => before(w, "A", "B") && before(w, "B", "C")), [["A", "B", "C"]]);
const w347 = four.filter(w => pos(w, "C") === 0 && immediate(w, "A", "B"));
const options347 = [["C","B","A","D"],["C","A","D","B"],["C","D","A","B"],["A","B","C","D"]];
assert.deepEqual(options347.map(w => pos(w,"C") === 0 && immediate(w,"A","B")), [false,false,true,false]);
assert.equal(w347.length, 2);
const w348 = four.filter(w => ![0,3].includes(pos(w,"A")) && immediate(w,"A","B") && before(w,"C","D"));
assert.deepEqual(w348.map(w => w.join("")), ["CABD", "CDAB"]);
const statements348 = [w => pos(w,"A") === 1, w => pos(w,"D") === 3, w => pos(w,"B") === 3, w => pos(w,"C") === 0];
assert.deepEqual(statements348.map(f => w348.every(f)), [false,false,false,true]);
const w349 = five.filter(w => pos(w,"C") === 0 && immediate(w,"A","B") && Math.abs(pos(w,"D") - pos(w,"C")) !== 1);
assert.deepEqual(w349.map(w => w.join("")), ["CABDE", "CABED", "CEABD", "CEDAB"]);
assert.equal(w349.length, 4);
const w350 = four.filter(w => before(w,"A","B") && before(w,"C","D"));
assert.equal(w350.length, 6);
const statements350 = [w => pos(w,"A") === 0, w => before(w,"B","C"), w => before(w,"A","D") || before(w,"C","B"), w => Math.abs(pos(w,"B") - pos(w,"D")) === 1];
assert.deepEqual(statements350.map(f => w350.every(f)), [false,false,true,false]);
assert.equal(three.filter(w => before(w,"A","B") && before(w,"B","C") && before(w,"C","A")).length, 0);
console.log("PASS All 6/24/120 complete permutations, unique feasible options, exact four-scheme count, disjunction and cyclic inconsistency");

const mod = (n, m) => ((n % m) + m) % m;
const ints = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
assert.equal(7 * 4 + 3, Number(q.q352.options[q.q352.answer]));
assert.deepEqual([15,21,27,34].map(n => mod(n,5)), [0,1,2,4]);
assert.deepEqual(ints(20,60).filter(n => mod(n,4) === 1 && mod(n,6) === 3), [21,33,45,57]);
assert.deepEqual(ints(1,100).filter(n => mod(n,6) === 4 && mod(n,8) === 6), [22,46,70,94]);
assert.deepEqual(ints(0,23).filter(n => mod(n,6) === 1 && mod(n,8) === 2), []);
assert.deepEqual(ints(1,20).filter(n => mod(2*n,6) === 2), [1,4,7,10,13,16,19]);
for (const n of ints(-25,25)) for (const m of ints(1,12)) {
  const quotient = Math.floor(n / m), remainder = n - quotient * m;
  assert.ok(remainder >= 0 && remainder < m);
  assert.equal(mod(n,m), remainder);
}
assert.equal(mod(-7,5),3);
const gcd = (a,b) => b ? gcd(b,a%b) : a;
let checks = 0;
for (const a of ints(1,12)) for (const b of ints(1,12)) {
  const g = gcd(a,b), period = a*b/g;
  for (const r of ints(0,a-1)) for (const s of ints(0,b-1)) {
    const solutions = ints(0,period-1).filter(n => mod(n,a) === r && mod(n,b) === s);
    assert.equal(solutions.length, mod(r-s,g) === 0 ? 1 : 0);
    if (solutions.length) assert.ok(mod(solutions[0]+period,a) === r && mod(solutions[0]+period,b) === s);
    checks++;
  }
}
console.log("PASS Exact bounded remainder solutions, negative Euclidean convention and " + checks + " small-modulus compatibility/period cases");

assert.equal(20 * 3 * 3 / (2 * 2), 45);
assert.equal(8 * 5 / 2, 20);
assert.equal((150 * 80 - 100 * 100) / 100, 20);
assert.equal(6 * 6 - 4 * 4, 20); // coefficient of pi; no decimal approximation used.
assert.equal(100 * 100, 10000);
assert.equal(100 * 100 * 100, 1000000);
const areas = ints(1,9).map(x => x*(10-x));
assert.deepEqual(areas, [9,16,21,24,25,24,21,16,9]);
assert.equal(Math.min(...areas),9); assert.equal(Math.max(...areas),25);
for (const tenths of ints(1,99)) assert.equal(tenths * (100-tenths), 2500 - (tenths-50)**2);
assert.ok((1/100) * (10-1/100) > 0 && (1/100) * (10-1/100) < 1/10);
assert.deepEqual([[6,6],[3,12]].map(([a,b]) => a*b), [36,36]);
assert.deepEqual([[6,6],[3,12]].map(([a,b]) => 2*(a+b)), [24,30]);
assert.notEqual(6*12,6*3);
console.log("PASS Exact scale/area arithmetic, dimensional units, every integer perimeter-20 rectangle and equal-area counterexamples");
