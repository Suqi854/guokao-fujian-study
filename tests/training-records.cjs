"use strict";
// Deterministic pure-model regression tests. No browser, network or dependency installs.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../docs/training-records.js"), "utf8");
const copy = (value) => JSON.parse(JSON.stringify(value));
const start = Date.parse("2026-11-05T08:00:00.000Z");
const stamp = (offset) => new Date(start + offset).toISOString();
const DAY = 86400000;
let count = 0;
function fixture() {
  const C = {
    lessons: [{ id: "math", category: "数量关系" }, { id: "reading", category: "言语理解" }],
    questions: [
      { id: "q1", lesson: "math", stem: "1+1=?", options: ["1", "2", "3", "4"], answer: 1, explanation: "1+1=2" },
      { id: "q2", lesson: "reading", stem: "选择正确的词", options: ["甲", "乙", "丙", "丁"], answer: 0, material: "示例材料" },
      { id: "q3", lesson: "math", stem: "2+2=?", options: ["2", "3", "4", "5"], answer: 2 },
    ],
    writing: [{ id: "w1", lesson: "reading", material: "原创材料", task: "概括材料", limit: 100 }],
  };
  const context = vm.createContext({ window: { STUDY_CONTENT: C } });
  vm.runInContext(source, context, { filename: "training-records.js" });
  const T = context.window.STUDY_TRAINING;
  const choice = (overrides = {}) => T.newChoice({ id: "run-1", now: start, ids: ["q1", "q2", "q3"], budgetSeconds: 120, ...overrides });
  const write = (overrides = {}) => T.newWriting({ id: "run-w", now: start, taskId: "w1", ...overrides });
  return { C, T, choice, write };
}
function test(name, fn) { fn(); count++; console.log("PASS", name); }
function rejects(fn) { assert.throws(fn, /[\u3400-\u9fff]/); }
function valid(T, run) { return T.validate(T.isTerminal(run) ? { runs: [run], activeRun: null } : { runs: [], activeRun: run }); }

test("Constructors retain only requested frozen content and independent arrays", () => {
  const { T, choice, write } = fixture();
  const r = choice();
  assert.deepEqual(copy(r), {
    id: "run-1", kind: "choice", startedAt: stamp(0), endedAt: null, anchorMs: start,
    elapsedMs: 0, budgetMs: 120000, status: "running", clockIssue: "",
    items: copy(r.items), cursor: 0, spentMs: [0, 0, 0], responses: [null, null, null],
  });
  assert.equal(r.items[0].module, "数量关系");
  assert.equal(r.items[1].module, "言语理解");
  assert.equal(r.items[0].answer, 1);
  assert.equal(write().budgetMs, null);
  assert.equal(write().completed, null);
  assert.equal(write().draftChars, null);
  assert.deepEqual(copy(T.empty()), { runs: [], activeRun: null });
  const e = T.empty(); e.runs.push("x"); assert.equal(T.empty().runs.length, 0);
  assert.deepEqual(copy(choice({ now: new Date(start) })), copy(choice({ now: stamp(0) })));
  valid(T, r); valid(T, write());
});

test("Stable content fingerprints include questions, answers, materials and writing tasks", () => {
  const { T, C } = fixture();
  const q = C.questions[0];
  const reorder = Object.fromEntries(Object.entries(q).reverse());
  assert.equal(T.signature(q), T.signature(reorder));
  for (const field of ["stem", "answer", "options", "explanation"]) {
    const changed = copy(q); changed[field] = field === "answer" ? 0 : field === "options" ? ["a", "b", "c", "d"] : "改变";
    assert.notEqual(T.signature(changed), T.signature(q), field);
  }
  const w = C.writing[0];
  assert.notEqual(T.signature({ ...w, material: "新材料" }), T.signature(w));
  assert.notEqual(T.signature({ ...w, task: "新任务" }), T.signature(w));
  const cyclic = {}; cyclic.self = cyclic; rejects(() => T.signature(cyclic));
});

test("Projection settles a whitelist deep copy without touching the saved run", () => {
  const { T, choice } = fixture(); const r = choice(); const before = copy(r);
  const preview = T.project(r, start + 3500);
  assert.equal(preview.elapsedMs, 3500);
  assert.deepEqual(copy(r), before);
  preview.items[0].module = "changed";
  assert.equal(r.items[0].module, "数量关系");
  assert.equal(T.settle(r, start + 3500), r);
  assert.equal(T.settle(r, start + 3500).elapsedMs, 3500);
});

test("Submission emits exactly one attempt event; explanation dwell remains in module time", () => {
  const { T, choice } = fixture(); const r = choice();
  const event = T.submit(r, 1, start + 2500);
  assert.deepEqual(copy(event), { accepted: true, qid: "q1", choice: 1, at: stamp(2500), seconds: 3 });
  assert.equal(r.cursor, 0);
  assert.deepEqual(copy(T.submit(r, 2, start + 5000)), { accepted: false });
  assert.equal(r.responses[0].choice, 1);
  assert.equal(r.spentMs[0], 5000);
  assert.equal(T.advance(r, start + 7000), true);
  assert.equal(r.cursor, 1);
  assert.equal(r.spentMs[0], 7000);
  valid(T, r);
});

test("Pause and resume exclude paused wall time and repeated pause does not add time", () => {
  const { T, choice } = fixture(); const r = choice();
  assert.equal(T.pause(r, start + 5000), true);
  assert.equal(r.anchorMs, null);
  assert.equal(T.pause(r, start + 10000), false);
  assert.equal(T.submit(r, 1, start + 20000).accepted, false);
  assert.equal(T.advance(r, start + 20000, { skip: true }), false);
  assert.equal(r.elapsedMs, 5000);
  assert.equal(T.resume(r, start + 60000), true);
  assert.equal(T.resume(r, start + 61000), false);
  T.settle(r, start + 63000);
  assert.equal(r.elapsedMs, 8000);
  valid(T, r);
});

test("Choice timeout is exact, terminal and frozen across all repeated actions", () => {
  const { T, choice } = fixture(); const r = choice({ budgetSeconds: 10 });
  T.pause(r, start + 3000); T.resume(r, start + 10000);
  assert.equal(T.submit(r, 1, start + 20000).accepted, false);
  assert.equal(r.status, "timeout");
  assert.equal(r.endedAt, stamp(17000));
  assert.equal(r.elapsedMs, 10000);
  assert.equal(r.anchorMs, null);
  const before = copy(r);
  T.settle(r, start + DAY); T.pause(r, start + DAY);
  assert.equal(T.resume(r, start + DAY), false);
  assert.equal(T.finish(r, start + DAY, { reason: "finished" }), false);
  assert.equal(T.advance(r, start + DAY, { skip: true }), false);
  assert.deepEqual(copy(r), before);
  valid(T, r);
});

test("Budget expiry during pause or finish stays timeout, never early or finished", () => {
  const { T, choice } = fixture();
  for (const action of [r => T.pause(r, start + 1000), r => T.finish(r, start + 1000, { reason: "finished" })]) {
    const r = choice({ budgetSeconds: 1 }); assert.equal(action(r), false);
    assert.equal(r.status, "timeout"); assert.equal(r.elapsedMs, 1000); valid(T, r);
  }
});

test("Skip leaves an unsubmitted item, not a wrong answer; no implicit cursor advance", () => {
  const { T, choice } = fixture(); const r = choice({ ids: ["q1", "q2"] });
  assert.equal(T.advance(r, start + 1000), false);
  assert.equal(r.cursor, 0);
  assert.equal(T.advance(r, start + 2000, { skip: true }), true);
  assert.equal(r.responses[0], null);
  T.submit(r, 2, start + 4000);
  assert.equal(T.advance(r, start + 5000), true);
  const s = T.choiceSummary(r);
  assert.equal(r.status, "finished");
  assert.deepEqual(copy(s.total), { planned: 2, submitted: 1, correct: 0, wrong: 1, unsubmitted: 1, spentMs: 5000 });
  valid(T, r);
});

test("Cross-module totals reconcile all planned, submitted, wrong and unsubmitted time", () => {
  const { T, choice } = fixture(); const r = choice();
  T.submit(r, 1, start + 1000); T.advance(r, start + 3000);
  T.submit(r, 3, start + 5000); T.advance(r, start + 6000);
  T.finish(r, start + 9000);
  const s = T.choiceSummary(r);
  assert.deepEqual(copy(s.modules), [
    { module: "数量关系", planned: 2, submitted: 1, correct: 1, wrong: 0, unsubmitted: 1, spentMs: 6000 },
    { module: "言语理解", planned: 1, submitted: 1, correct: 0, wrong: 1, unsubmitted: 0, spentMs: 3000 },
  ]);
  assert.deepEqual(copy(s.total), { planned: 3, submitted: 2, correct: 1, wrong: 1, unsubmitted: 1, spentMs: 9000 });
  assert.equal(s.modules.reduce((n, m) => n + m.spentMs, 0), r.elapsedMs);
  assert.equal(r.status, "early"); valid(T, r);
});

test("Finished runs and manual early termination are idempotent", () => {
  const { T, choice } = fixture(); const r = choice();
  assert.equal(T.finish(r, start + 3000), true);
  const before = copy(r);
  assert.equal(T.finish(r, start + 9999, { reason: "finished" }), false);
  assert.equal(T.submit(r, 1, start + 10000).accepted, false);
  assert.deepEqual(copy(r), before);
  const other = choice(); assert.equal(T.finish(other, start + 1000, { reason: "finished" }), true);
  assert.equal(other.status, "finished"); valid(T, other);
});

test("Changed content blocks active resume and submit but keeps frozen historical statistics", () => {
  const { T, C, choice } = fixture(); const r = choice();
  T.submit(r, 1, start + 1000); T.pause(r, start + 2000);
  C.questions[0].answer = 2;
  assert.equal(T.compatible(r), false);
  assert.equal(T.resume(r, start + 3000), false);
  assert.equal(T.submit(r, 2, start + 3000).accepted, false);
  valid(T, r);
  T.finish(r, start + 4000);
  assert.equal(T.choiceSummary(r).total.correct, 1);
  assert.equal(T.compatible(r), false); valid(T, r);
  const active = choice({ id: "run-2" }); C.questions[1].stem = "变更内容";
  assert.equal(T.submit(active, 1, start + 1000).accepted, false);
  assert.equal(active.responses[0], null);
});

test("Historical frozen option count remains valid after the current option count changes", () => {
  const { T, C, choice } = fixture(); const r = choice();
  T.submit(r, 3, start + 1000); T.finish(r, start + 2000);
  C.questions[0].options = ["new 1", "new 2"]; C.questions[0].answer = 1;
  valid(T, r); assert.equal(T.compatible(r), false);
  assert.equal(T.choiceSummary(r).total.wrong, 1);
});

test("Backward clock jumps pause without counting the ambiguous interval", () => {
  const { T, choice } = fixture(); const r = choice();
  T.settle(r, start + 3000); T.settle(r, start + 2000);
  assert.equal(r.status, "paused"); assert.equal(r.clockIssue, "backward");
  assert.equal(r.elapsedMs, 3000); assert.equal(r.anchorMs, null);
  assert.equal(T.resume(r, start + 1000), true);
  T.settle(r, start + 2000);
  assert.equal(r.elapsedMs, 4000);
  T.finish(r, start + 2000); valid(T, r);
});

test("Gaps over 24h pause without pretending to know a timeout; exactly 24h can expire", () => {
  const { T, choice } = fixture(); const r = choice();
  T.settle(r, start + 5000); T.settle(r, start + DAY + 5001);
  assert.equal(r.status, "paused"); assert.equal(r.clockIssue, "gap"); assert.equal(r.elapsedMs, 5000);
  T.resume(r, start + DAY + 10000); T.settle(r, start + DAY + 11000);
  assert.equal(r.elapsedMs, 6000); valid(T, r);
  const exact = choice(); T.settle(exact, start + DAY);
  assert.equal(exact.status, "timeout"); assert.equal(exact.endedAt, stamp(120000));
});

test("Finishing a paused run after a clock rollback records the issue instead of fake time", () => {
  const { T, choice } = fixture(); const r = choice();
  T.pause(r, start + 5000); T.finish(r, start - 1000);
  assert.equal(r.elapsedMs, 5000); assert.equal(r.endedAt, stamp(-1000));
  assert.equal(r.clockIssue, "backward"); valid(T, r);
});

test("Writing records page-running time and distinguishes manual completion from stopping", () => {
  const { T, write } = fixture(); const r = write();
  T.settle(r, start + 10000); T.pause(r, start + 15000);
  T.resume(r, start + 60000); T.finish(r, start + 70000, { completed: true, draftChars: 123 });
  assert.equal(r.elapsedMs, 25000); assert.equal(r.completed, true); assert.equal(r.draftChars, 123);
  assert.equal(r.status, "finished"); assert.equal(r.budgetMs, null); valid(T, r);
  const before = copy(r); T.finish(r, start + 80000, { completed: false, draftChars: 5 });
  assert.deepEqual(copy(r), before);
  const early = write(); T.finish(early, start + 5000);
  assert.equal(early.completed, false); assert.equal(early.status, "early"); assert.equal(early.draftChars, 0); valid(T, early);
  const long = write(); T.settle(long, start + 5 * 60 * 60 * 1000);
  assert.equal(long.status, "running"); assert.equal(long.elapsedMs, 18000000);
  rejects(() => T.choiceSummary(long));
});

test("Writing content changes block recovery but allow honest historical termination", () => {
  const { T, C, write } = fixture(); const r = write(); T.pause(r, start + 1000);
  C.writing[0].task = "新设问";
  assert.equal(T.compatible(r), false); assert.equal(T.resume(r, start + 3000), false);
  T.finish(r, start + 3000, { completed: false, draftChars: 20 }); valid(T, r);
});

test("Validation produces a whitelist deep copy and strips extra keys throughout", () => {
  const { T, choice } = fixture(); const r = choice(); T.submit(r, 1, start + 1000);
  r.extra = "discard"; r.items[0].extra = "discard"; r.responses[0].extra = "discard";
  const checked = T.validate({ runs: [], activeRun: r, secrets: "discard" });
  assert.equal(checked.secrets, undefined); assert.equal(checked.activeRun.extra, undefined);
  assert.equal(checked.activeRun.items[0].extra, undefined); assert.equal(checked.activeRun.responses[0].extra, undefined);
  checked.activeRun.responses[0].choice = 2; checked.activeRun.spentMs[0] = 0;
  assert.equal(r.responses[0].choice, 1); assert.equal(r.spentMs[0], 1000);
});

test("History has a hard 500-run cap including space required by an active run", () => {
  const { T, choice } = fixture(); const finished = choice(); T.finish(finished, start + 1000);
  const runs = Array.from({ length: 500 }, (_, i) => ({ ...copy(finished), id: `history-${i}` }));
  assert.equal(T.validate({ runs, activeRun: null }).runs.length, 500);
  rejects(() => T.validate({ runs: [...runs, { ...finished, id: "extra" }], activeRun: null }));
  rejects(() => T.validate({ runs, activeRun: choice({ id: "new" }) }));
  assert.equal(T.validate({ runs: runs.slice(1), activeRun: choice({ id: "new" }) }).runs.length, 499);
  rejects(() => T.validate({ runs: [finished, finished], activeRun: null }));
  rejects(() => T.validate({ runs: [finished], activeRun: choice() }));
});

test("Reject invalid constructors, IDs, duplicates, fractional budgets and dates", () => {
  const { T, choice, write } = fixture();
  for (const overrides of [
    { ids: [] }, { ids: ["q1", "q1"] }, { ids: ["absent"] }, { ids: new Array(21).fill("q1") },
    { budgetSeconds: 0 }, { budgetSeconds: 14401 }, { budgetSeconds: 1.5 }, { budgetSeconds: Infinity },
    { id: "" }, { id: "contains space" }, { now: NaN }, { now: -1 }, { now: 1.5 }, { now: "invalid" },
  ]) rejects(() => choice(overrides));
  rejects(() => write({ taskId: "missing" }));
  assert.equal(choice({ budgetSeconds: 14400 }).budgetMs, 14400000);
  rejects(() => T.validate(null)); rejects(() => T.validate({ runs: [] }));
});

test("Reject damaged choice records without modifying the input", () => {
  const { T, choice } = fixture();
  const damages = [
    r => { r.items = []; }, r => { r.items.push(r.items[0]); r.spentMs.push(0); r.responses.push(null); },
    r => { r.items[0].qid = "unknown"; }, r => { r.items[0].answer = 5; },
    r => { r.items[0].answer = 0; }, r => { r.items[0].module = "虚构模块"; },
    r => { r.items[0].signature = "bad"; }, r => { r.responses = []; },
    r => { r.spentMs = []; }, r => { r.spentMs[0] = -1; }, r => { r.spentMs[0] = 1; },
    r => { r.spentMs[0] = 0.5; r.elapsedMs = 0.5; }, r => { r.elapsedMs = Number.MAX_SAFE_INTEGER; },
    r => { r.budgetMs = 0; }, r => { r.budgetMs = 14400001; }, r => { r.elapsedMs = 120001; },
    r => { r.cursor = -1; }, r => { r.cursor = 3; }, r => { r.cursor = 0.5; },
    r => { r.responses[0] = { choice: 4, at: stamp(0) }; },
    r => { r.responses[0] = { choice: -1, at: stamp(0) }; },
    r => { r.responses[0] = { choice: 1, at: "not a time" }; },
    r => { r.responses[0] = { choice: 1, at: stamp(1000) }; },
    r => { r.responses[1] = { choice: 1, at: stamp(0) }; },
    r => { r.spentMs[1] = 1; r.elapsedMs = 1; r.anchorMs += 1; },
    r => { r.anchorMs = null; }, r => { r.anchorMs = start - 1; },
    r => { r.endedAt = stamp(0); }, r => { r.startedAt = null; },
    r => { r.startedAt = "2026-02-30T00:00:00.000Z"; },
    r => { r.status = "unknown"; }, r => { r.clockIssue = "maybe"; },
    r => { r.kind = "exam"; }, r => { r.id = "x".repeat(129); },
  ];
  for (const damage of damages) {
    const r = choice(); damage(r); const before = copy(r);
    rejects(() => T.validate({ runs: [], activeRun: r })); assert.deepEqual(copy(r), before);
  }
});

test("Reject terminal/active confusion, inconsistent timeout and corrupted writing fields", () => {
  const { T, choice, write } = fixture();
  const running = choice(); rejects(() => T.validate({ runs: [running], activeRun: null }));
  const done = choice(); T.finish(done, start + 1000);
  rejects(() => T.validate({ runs: [], activeRun: done }));
  rejects(() => T.validate({ runs: [{ ...done, endedAt: null }], activeRun: null }));
  rejects(() => T.validate({ runs: [{ ...done, anchorMs: start }], activeRun: null }));
  rejects(() => T.validate({ runs: [{ ...done, status: "timeout" }], activeRun: null }));
  const timeout = choice({ budgetSeconds: 1 }); T.settle(timeout, start + 1000);
  rejects(() => T.validate({ runs: [{ ...timeout, status: "early" }], activeRun: null }));
  for (const damage of [r => r.budgetMs = 1000, r => r.completed = true, r => r.draftChars = -1, r => r.draftChars = 10000001, r => r.signature = "bad", r => r.taskId = "absent"]) {
    const w = write(); damage(w); rejects(() => valid(T, w));
  }
  const w = write(); T.finish(w, start + 1000, { completed: true });
  rejects(() => valid(T, { ...w, completed: false }));
  rejects(() => valid(T, { ...w, status: "timeout" }));
});

test("Invalid submissions are rejected while elapsed reading time still settles", () => {
  const { T, choice } = fixture(); const r = choice();
  for (const answer of [-1, 4, 1.5, NaN, "1", null]) assert.equal(T.submit(r, answer, start + 1000).accepted, false);
  assert.equal(r.elapsedMs, 1000); assert.equal(r.responses[0], null);
  const before = copy(r); rejects(() => T.finish(r, start + 2000, { reason: "invalid" }));
  assert.deepEqual(copy(r), before);
});

test("Actual base content works without metadata catalog and is not treated as an official score", () => {
  const ctx = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../docs/content.js"), "utf8"), ctx);
  vm.runInContext(source, ctx);
  const T = ctx.window.STUDY_TRAINING;
  const r = T.newChoice({ id: "actual", now: start, ids: ["q01", "q02"], budgetSeconds: 60 });
  assert.equal(r.items[0].module, "资料分析");
  T.submit(r, r.items[0].answer, start + 1000); T.advance(r, start + 2000); T.advance(r, start + 3000, { skip: true });
  assert.equal(T.choiceSummary(r).total.correct, 1); assert.equal(T.choiceSummary(r).total.unsubmitted, 1);
  assert.equal("score" in T.choiceSummary(r).total, false); valid(T, r);
  const w = T.newWriting({ id: "actual-w", now: start, taskId: "w01" });
  T.finish(w, start + 1000, { completed: false, draftChars: 30 }); valid(T, w);
});
test("Sparse arrays are rejected rather than silently skipping validation", () => {
  const { T, choice } = fixture();
  rejects(() => choice({ ids: new Array(1) }));
  rejects(() => T.validate({ runs: new Array(1), activeRun: null }));
  for (const field of ["items", "responses", "spentMs"]) {
    const r = choice(); delete r[field][0]; rejects(() => valid(T, r));
  }
});

test("Deterministic mixed interruptions always leave valid accounting and frozen terminal records", () => {
  let seed = 0x716308;
  const random = (n) => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed % n; };
  for (let sequence = 0; sequence < 100; sequence++) {
    const { T, choice, write } = fixture();
    const r = sequence % 2 ? choice() : write(); let now = start;
    for (let step = 0; step < 35; step++) {
      now += [0, 100, 1000, 7000, -3000, DAY + 1][random(6)];
      const before = T.isTerminal(r) ? copy(r) : null;
      switch (random(7)) {
        case 0: T.settle(r, now); break;
        case 1: T.pause(r, now); break;
        case 2: T.resume(r, now); break;
        case 3: T.submit(r, random(4), now); break;
        case 4: T.advance(r, now, { skip: Boolean(random(2)) }); break;
        case 5: T.project(r, now); break;
        case 6: if (step > 20) T.finish(r, now, { completed: Boolean(random(2)), draftChars: 50 }); break;
      }
      valid(T, r);
      if (before) assert.deepEqual(copy(r), before);
      if (r.kind === "choice") assert.equal(r.spentMs.reduce((a, b) => a + b, 0), r.elapsedMs);
    }
  }
});

test("Actual shared two-table material changes invalidate active fingerprints but preserve history", () => {
  const context = vm.createContext({ window: {} });
  const docs = path.join(__dirname, "../docs");
  const scripts = [...fs.readFileSync(path.join(docs, "index.html"), "utf8").matchAll(/src="\.\/([^\"]+)"/g)].map(match => match[1]);
  const modelIndex = scripts.indexOf("training-records.js");
  assert.ok(modelIndex > 0, "content scripts precede the training model");
  for (const file of scripts.slice(0, modelIndex)) vm.runInContext(fs.readFileSync(path.join(docs, file), "utf8"), context, { filename: file });
  vm.runInContext(source, context);
  const C = context.window.STUDY_CONTENT, T = context.window.STUDY_TRAINING;
  for (const [qid, materialId] of [["q130", "service-table"], ["q371", "service-pair-v026"]]) {
    const q = C.questions.find(question => question.id === qid);
    assert.equal(q.materialId, materialId);
    assert.equal(C.questionMaterials[materialId].tables.length, 2);
    const originalMaterial = copy(C.questionMaterials[materialId]);
    const mutations = [
      m => { m.title += "（改版）"; },
      m => { m.note += "统计口径调整。"; },
      m => { m.tables[0].caption += "（调整单位）"; },
      m => { m.tables[0].columns[1] += "（调整期间）"; },
      m => { m.tables[0].rows[0][1] = "999"; },
      m => { m.tables[1].rows[0][1] = "888"; },
    ];
    for (const mutate of mutations) {
      C.questionMaterials[materialId] = copy(originalMaterial);
      const active = T.newChoice({ id: `active-${qid}`, now: start, ids: [qid], budgetSeconds: 60 });
      const paused = T.newChoice({ id: `paused-${qid}`, now: start, ids: [qid], budgetSeconds: 60 });
      const history = T.newChoice({ id: `history-${qid}`, now: start, ids: [qid], budgetSeconds: 60 });
      T.pause(paused, start + 1000);
      T.submit(history, q.answer, start + 1000); T.advance(history, start + 2000);
      const previousSummary = copy(T.choiceSummary(history));
      assert.equal(T.compatible(active), true);
      mutate(C.questionMaterials[materialId]);
      assert.notEqual(T.signature(q), active.items[0].signature);
      assert.equal(T.compatible(active), false);
      assert.equal(T.resume(paused, start + 3000), false);
      assert.equal(T.submit(active, q.answer, start + 3000).accepted, false);
      assert.equal(T.advance(active, start + 4000, { skip: true }), false);
      assert.equal(active.responses[0], null);
      valid(T, active); valid(T, paused); valid(T, history);
      assert.deepEqual(copy(T.choiceSummary(history)), previousSummary);
      assert.equal(T.compatible(history), false);
      assert.equal(T.finish(active, start + 5000), true);
      valid(T, active);
    }
    C.questionMaterials[materialId] = originalMaterial;
    const before = T.signature(q);
    const unrelatedId = materialId === "service-table" ? "service-pair-v026" : "service-table";
    const unrelated = copy(C.questionMaterials[unrelatedId]);
    C.questionMaterials[unrelatedId].note += "与本题无关的材料修改";
    assert.equal(T.signature(q), before, "only referenced shared material belongs to this fingerprint");
    C.questionMaterials[unrelatedId] = unrelated;
    C.questionMaterials[materialId] = Object.fromEntries(Object.entries(originalMaterial).reverse());
    assert.equal(T.signature(q), before, "shared material key order is irrelevant");
  }
});

test("Missing, inherited and incomplete shared-material references are explicitly rejected", () => {
  const { C, T, choice } = fixture();
  C.questions[0].materialId = "shared";
  const make = () => choice({ ids: ["q1"] });
  assert.throws(make, /共用材料引用不存在/);
  C.questionMaterials = {};
  assert.throws(() => T.signature(C.questions[0]), /共用材料引用不存在/);
  const shared = { title: "共用材料", note: "虚构", tables: [{ caption: "表1", columns: ["a"], rows: [["1"]] }] };
  C.questionMaterials = Object.create({ shared });
  assert.throws(make, /共用材料引用不存在/);
  C.questionMaterials = { shared: { title: "不完整" } };
  assert.throws(make, /共用材料内容不完整/);
  C.questionMaterials = { shared };
  const run = make(); T.pause(run, start + 1000);
  delete C.questionMaterials.shared;
  assert.equal(T.compatible(run), false);
  assert.throws(() => T.resume(run, start + 3000), /共用材料引用不存在/);
  assert.equal(run.status, "paused");
  C.questionMaterials.shared = shared;
  C.questions[0].materialId = null;
  assert.throws(make, /共用材料引用不存在/);
});

test("Inline explanation and writing reference dependencies are already covered", () => {
  const { C, T, choice, write } = fixture();
  C.questions[0].optionReviews = ["理由一", "理由二", "理由三", "理由四"];
  const choiceRun = choice(); T.pause(choiceRun, start + 1000);
  C.questions[0].optionReviews[0] = "修改逐项解析";
  assert.equal(T.compatible(choiceRun), false);
  assert.equal(T.resume(choiceRun, start + 2000), false);
  for (const field of ["material", "task", "points", "sample"]) {
    const task = C.writing[0]; task.points = ["参考要点"]; task.sample = "参考表达";
    const original = copy(task);
    const run = write(); T.pause(run, start + 1000);
    task[field] = field === "points" ? ["修改参考要点"] : "修改内容";
    assert.equal(T.compatible(run), false, field);
    assert.equal(T.resume(run, start + 2000), false, field);
    T.finish(run, start + 2000); valid(T, run);
    C.writing[0] = original;
  }
});

console.log(`PASS ${count} training-record model scenarios`);
