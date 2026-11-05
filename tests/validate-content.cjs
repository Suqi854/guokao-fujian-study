"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");
const context = { window: {} };
vm.createContext(context);
const scripts = [...fs.readFileSync(path.join(root, "docs/index.html"), "utf8").matchAll(/src="\.\/([^\"]+)"/g)].map(m => m[1]);
for (const file of scripts.filter(f => f !== "app.js")) {
  assert.ok(fs.existsSync(path.join(root, "docs", file)), file);
  vm.runInContext(fs.readFileSync(path.join(root, "docs", file), "utf8"), context, { filename: file });
}
const C = JSON.parse(JSON.stringify(context.window.STUDY_CONTENT));
const q = Object.fromEntries(C.questions.map(v => [v.id, v]));
const lessons = Object.fromEntries(C.lessons.map(v => [v.id, v]));
assert.equal(Object.keys(q).length, 345);
assert.equal(Object.keys(lessons).length, 73);
assert.equal(C.lessons.filter(l => l.learningLevels).length, 42);
assert.equal(C.writing.length, 47);
assert.equal(new Set(C.writing.map(w => w.material)).size, 27);
for (const x of C.questions) {
  assert.ok(lessons[x.lesson], x.id);
  assert.equal(x.options.length, 4, x.id);
  assert.ok(Number.isInteger(x.answer) && x.answer >= 0 && x.answer < 4, x.id);
  assert.ok(lessons[x.lesson].practice.includes(x.id), x.id);
  assert.equal(x.meta.source.kind, "original", x.id);
  assert.equal(x.meta.examSource.year, null, x.id);
  assert.equal(x.meta.difficulty.level, null, x.id);
}
for (const l of C.lessons) {
  for (const id of l.practice) assert.equal(q[id]?.lesson, l.id, id);
  for (const source of l.sources) assert.ok(C.sources[source], l.id + ":" + source);
  if (l.learningLevels) for (const [key, g] of Object.entries(l.learningLevels)) {
    assert.ok(["intro", "practice", "advanced"].includes(key));
    for (const i of g.sections) assert.ok(l.sections[i], l.id + ":" + i);
    for (const id of g.questionIds || []) {
      assert.equal(q[id]?.lesson, l.id, id);
      assert.equal(q[id]?.meta.trainingStage, g.stage, id);
    }
  }
}
const newIds = ["logic", "quantified-logic", "solid-views", "figure-features"];
for (const id of newIds) {
  const l = lessons[id];
  assert.equal(l.sections.length, 9);
  assert.deepEqual(Object.values(l.learningLevels).flatMap(g => g.sections), [...Array(9).keys()]);
  for (const g of Object.values(l.learningLevels)) assert.equal(g.questionIds.length, 2, id + ":" + g.stage);
}
for (let n = 322; n <= 345; n++) {
  assert.equal(q["q" + n].optionReviews.length, 4);
  assert.ok(q["q" + n].optionReviews.every(s => s.trim().length > 0));
}
assert.deepEqual([...Array(24)].map((_, i) => q["q" + (322 + i)].answer), [0,2,3,1,2,0,1,3,0,2,3,1,2,0,3,1,0,2,1,3,2,0,3,1]);
console.log("PASS All 73 lessons, 345 questions, 47 writing tasks and twelve new paths have valid links and explicit provenance");

const truth = n => Array.from({length: 2 ** n}, (_, mask) => Array.from({length:n}, (_, i) => Boolean(mask & (1 << i))));
const implies = (a, b) => !a || b;
assert.ok(truth(2).filter(([entry, registered]) => implies(entry, registered) && entry).every(([, registered]) => registered));
assert.ok(truth(2).filter(([pass, full]) => implies(pass, full) && !full).every(([pass]) => !pass));
const chained = truth(3).filter(([approved, checked, registered]) => implies(approved, checked) && implies(checked, registered) && !registered);
assert.ok(chained.every(([approved, checked]) => !approved && !checked));
assert.deepEqual(truth(2).filter(([a, b]) => (a || b) && a).map(([, b]) => b).sort(), [false, true]);
assert.ok(truth(2).every(([p, qq]) => (!implies(p, qq)) === (p && !qq)));
const compound = truth(3).filter(([a, b, approved]) => implies(a && b, approved) && !approved);
assert.ok(compound.every(([a, b]) => !a || !b));
assert.ok(compound.some(([a]) => a) && compound.some(([, b]) => b));
// Regions encode whether any witness exists in each of the 8 A/B/C memberships.
const worlds = Array.from({length:256}, (_, mask) => [...Array(8).keys()].filter(i => mask & (1 << i)));
const some = (w, f) => w.some(f), all = (w, f) => w.every(f), A = n => Boolean(n & 1), B = n => Boolean(n & 2), CC = n => Boolean(n & 4);
assert.ok(worlds.filter(w => some(w, n => A(n) && B(n))).every(w => some(w, n => B(n) && A(n))));
assert.ok(worlds.filter(w => all(w, n => implies(A(n), B(n)))).every(w => !some(w, n => A(n) && !B(n))));
assert.ok(worlds.every(w => !all(w, A) === some(w, n => !A(n))));
assert.ok(worlds.filter(w => some(w, n => A(n) && B(n)) && all(w, n => implies(B(n), CC(n)))).every(w => some(w, n => A(n) && CC(n))));
const reading = truth(4).map(([as, ah, bs, bh]) => [[as, ah], [bs, bh]]);
const readEach = reading.filter(w => w.every(person => person.some(Boolean)));
assert.ok(readEach.some(w => ![0, 1].some(book => w.every(person => person[book]))));
assert.ok(reading.every(w => !w.every(person => person.some(Boolean)) === w.some(person => person.every(v => !v))));
console.log("PASS Independent truth states, 256 membership worlds and reader/book quantifier counterexamples");

const model = require("../docs/visual-models.js");
const independentRotate = rows => rows[0].split("").map((_, x) => rows.map(r => r[x]).reverse().join(""));
const independentParts = (rows, bit, sealed) => {
  const cells = new Set();
  rows.forEach((row, y) => [...row].forEach((v, x) => { if (v === bit) cells.add(y * 3 + x); }));
  let total = 0;
  while (cells.size) {
    const group = new Set([cells.values().next().value]);
    for (const n of group) {
      const x = n % 3, y = Math.floor(n / 3);
      for (const other of cells) if (Math.abs(other % 3 - x) + Math.abs(Math.floor(other / 3) - y) === 1) group.add(other);
    }
    for (const n of group) cells.delete(n);
    if (!sealed || [...group].every(n => n % 3 === 1 && Math.floor(n / 3) === 1)) total++;
  }
  return total;
};
for (let n = 0; n < 512; n++) {
  const bits = n.toString(2).padStart(9, "0"), rows = [bits.slice(0,3),bits.slice(3,6),bits.slice(6)];
  const f = model.features(rows), turned = independentRotate(rows);
  assert.equal(f.black, bits.split("").filter(v => v === "1").length);
  assert.equal(f.parts, independentParts(rows, "1", false));
  assert.equal(f.holes, independentParts(rows, "0", true));
  assert.deepEqual(model.rotate(rows), turned);
  assert.deepEqual(model.rotate(model.rotate(model.rotate(model.rotate(rows)))), rows);
  assert.deepEqual(model.mirror(model.mirror(rows)), rows);
  const ff = model.features(turned);
  assert.deepEqual([ff.black,ff.parts,ff.holes,ff.central,ff.axes.length], [f.black,f.parts,f.holes,f.central,f.axes.length]);
}
assert.equal(model.features(q.q343.graphic.values).central, true);
assert.deepEqual(model.features(q.q343.graphic.values).axes, []);
assert.deepEqual(q.q345.graphic.values.map(r => model.features(r).parts), [1, 2]);
let heights = ["23", "10"], directions = [], front = [];
for (let i = 0; i < 4; i++) {
  directions.push([...heights].reverse().join("/"));
  front.push([0,1].map(x => Math.max(...heights.map(r => Number(r[x])))).join(""));
  heights = independentRotate(heights);
}
assert.deepEqual(directions, ["10/23", "03/12", "32/01", "21/30"]);
assert.deepEqual(front, ["23", "13", "32", "31"]);
assert.ok(!directions.includes("01/32"));
const sums = [];
for (let n = 0; n < 81; n++) {
  const v = [...Array(4).keys()].map(i => Math.floor(n / (3 ** i)) % 3);
  if ([[0,1],[2,3],[0,2],[1,3]].every(([a,b]) => Math.max(v[a],v[b]) === 2)) sums.push(v.reduce((a,b) => a+b,0));
}
assert.equal(sums.length, 17);
assert.equal(Math.min(...sums), 4);
assert.equal(Math.max(...sums), 8);
console.log("PASS All 512 square-grid models, four exact height rotations and all 81 bounded height tables");
