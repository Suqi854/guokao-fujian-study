'use strict';
// Independent bounded long-session safety checks. No browser, network, or real storage.
// Usage: node v033-long-boundaries.cjs [site-root]
// Default intentionally reads the final integration tree, not the candidate copy.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = process.argv[2] || path.join(__dirname,'..');
const NOW = 1793872800000;
const bytes = x => new TextEncoder().encode(typeof x === 'string' ? x : JSON.stringify(x)).length;
const clone = x => JSON.parse(JSON.stringify(x));
const outcomes = [];
function setup(seed = []) {
  const data = new Map(seed), access = [];
  let gate = null, release = null;
  let queue = Promise.resolve();
  const storage = {
    get length() { return data.size; },
    key(i) { return [...data.keys()][i] ?? null; },
    getItem(k) { access.push(['get', k]); return data.get(k) ?? null; },
    setItem(k, v) { access.push(['set', k]); data.set(k, String(v)); },
    removeItem(k) { access.push(['remove', k]); data.delete(k); }
  };
  const w = {
    STUDY_CONTENT: { questions: [] },
    STUDY_TRAINING: { signature: () => 'v1:q4:0000000000000000' },
    localStorage: storage,
    crypto: { randomUUID: crypto.randomUUID },
    navigator: { locks: { request(name, options, callback) {
      const p = queue.then(async () => { if (gate) await gate; return callback(); });
      queue = p.catch(() => {}); return p;
    } } },
    addEventListener() {}, removeEventListener() {}
  };
  const context = vm.createContext({ window: w, TextEncoder });
  for (const file of ['long-mock-model.js', 'long-mock-store.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, 'docs', file), 'utf8'), context, { filename: file });
  }
  return { w, M: w.LONG_MOCK_MODEL, S: w.LONG_MOCK_STORE, data, access,
    hold() { gate = new Promise(r => { release = r; }); },
    release() { gate = null; release?.(); }
  };
}
function run(id = 'run-0', count = 1) {
  return { id, title: 'Test', kind: 'original-custom', official: false,
    createdAt: NOW, endedAt: null, status: 'paused', budgetMs: 60000,
    anchorMs: null, elapsedMs: 0, section: 0, clockIssue: false,
    sections: [{ name: 'M', cursor: 0, elapsedMs: 0,
      items: Array.from({ length: count }, (_, n) => ({ qid: 'q-' + n,
        signature: 'v1:q4:0000000000000000', answer: 0, optionCount: 4,
        choice: null, type: 'T', lesson: 'L' })) }] };
}
function record(M, count = 1, questions = 1) {
  return { ...M.empty(), sessions: Array.from({ length: count }, (_, n) => run('run-' + n, questions)) };
}
function nearLimit(M) {
  const state = record(M, 1, 200);
  state.revision = 1;
  state.commitId = '00000000-0000-0000-0000-000000000000';
  const target = M.LIMITS.bytes - 8;
  while (state.sessions.length < M.LIMITS.sessions) {
    state.sessions.push(run('run-' + state.sessions.length, 200));
    if (bytes(state) > target) { state.sessions.pop(); break; }
  }
  let extra = target - bytes(state);
  for (const r of state.sessions) {
    for (const q of r.sections[0].items) {
      const n = Math.min(extra, 119); q.type += 'x'.repeat(n); extra -= n;
      if (!extra) return M.validate(state);
    }
  }
  throw Error('Fixture cannot reach boundary');
}
async function check(name, fn) {
  try { await fn(); outcomes.push({ name, ok: true }); console.log('PASS', name); }
  catch (e) { outcomes.push({ name, ok: false, error: e.message }); console.log('FAIL', name + ':', e.message); }
}
(async () => {
  await check('closed-before-lock journal replays; stale sibling cannot overwrite', async () => {
    const { M, S, data, hold, release } = setup();
    const a = S.create(); a.read(); assert.equal((await a.save(record(M))).ok, true);
    const initial = data.get(S.KEY);
    hold(); const update = a.snapshot(); update.sessions[0].title = 'Closed tab';
    const p = a.save(update); assert.equal(a.pendings().length, 1);
    a.destroy(); release(); assert.equal((await p).ok, false); assert.equal(data.get(S.KEY), initial);
    const b = S.create(); b.read(); assert.equal((await b.recover(b.pendings()[0].key)).ok, true);
    const c = S.create(), d = S.create(); c.read(); d.read();
    const c1 = c.snapshot(), d1 = d.snapshot(); c1.sessions[0].title = 'C'; d1.sessions[0].title = 'D';
    const results = await Promise.all([c.save(c1), d.save(d1)]);
    assert.equal(results.filter(x => x.ok).length, 1); assert.equal(d.pendings().length, 1);
    assert.equal(d.pageCopy().sessions[0].title, 'D');
  });
  await check('long absence consumes budget; rollback pauses without negative time', () => {
    const { M } = setup(); const r = run(); r.status = 'running'; r.anchorMs = NOW;
    const timeout = M.settle(r, NOW + 24 * 3600000);
    assert.equal(timeout.status, 'timeout'); assert.equal(timeout.elapsedMs, 60000);
    assert.equal(timeout.endedAt, NOW + 60000, 'end timestamp must be the exhausted-budget time, not the next visit');
    assert.equal(timeout.sections[0].elapsedMs, 60000);
    const back = M.settle(r, NOW - 1000);
    assert.equal(back.status, 'paused'); assert.equal(back.elapsedMs, 0); assert.equal(back.clockIssue, true);
    assert.equal(M.action(r, { type: 'answer', choice: 0 }, NOW + 60000).sections[0].items[0].choice, null);
  });
  await check('any successfully persisted record exports a normally importable backup', async () => {
    const { M, S } = setup(); const repo = S.create(); repo.read();
    const state = nearLimit(M); const saved = await repo.save(state);
    if (!saved.ok) {
      assert.ok(repo.pageCopy(), 'rejected record must retain an emergency copy');
      return; // A tighter envelope-aware write boundary is an acceptable correction.
    }
    const backup = JSON.stringify(M.backup(repo.snapshot(), NOW));
    assert.doesNotThrow(() => M.prepareImport(backup, M.empty()), `saved=${bytes(repo.snapshot())}; backup=${bytes(backup)}; limit=${M.LIMITS.bytes}`);
  });
  await check('accepted near-boundary record really exports, imports, and retains all questions', async () => {
    const { M, S } = setup(); const state = nearLimit(M);
    // Leave a small explicit envelope allowance so this path must succeed.
    let remove = 4096;
    for (const r of state.sessions) for (const q of r.sections[0].items) {
      const n = Math.min(remove, q.type.length - 1); q.type = q.type.slice(0, q.type.length - n); remove -= n;
    }
    assert.equal(remove, 0);
    const repo = S.create(); repo.read(); assert.equal((await repo.save(state)).ok, true);
    const backup = JSON.stringify(M.backup(repo.snapshot(), NOW));
    const imported = M.prepareImport(backup, M.empty());
    assert.equal(imported.added, state.sessions.length);
    assert.equal(imported.state.sessions.reduce((n, r) => n + M.summary(r).total.planned, 0), state.sessions.length * 200);
  });
  await check('oversized durable pending record cannot bypass the persistence byte limit', async () => {
    const { M, S, data } = setup(); const next = nearLimit(M);
    next.sessions[0].title += 'x'.repeat(32);
    next.commitId = crypto.randomUUID();
    const key = S.PREFIX + next.commitId;
    data.set(key, JSON.stringify({ format: 'zhixu-long-mock-intent', id: next.commitId, baseCommitId: null, next }));
    const before = data.get(key); const repo = S.create(); repo.read();
    const result = await repo.recover(key);
    assert.equal(result.ok, false, 'oversized pending unexpectedly committed: ' + bytes(next));
    assert.equal(data.has(S.KEY), false, 'no oversized primary should be written');
    assert.equal(data.get(key), before, 'rejected journal must remain exportable');
  });
  await check('oversized main and pending raw text stay unreadable and preserved', async () => {
    const { M, S, data } = setup();
    const raw = JSON.stringify(record(M)) + ' '.repeat(M.LIMITS.bytes);
    data.set(S.KEY, raw); const broken = S.create();
    assert.equal(broken.read().ok, false); assert.equal(broken.raw, raw); assert.equal(data.get(S.KEY), raw);
    data.delete(S.KEY);
    const next = record(M); next.revision = 1; next.commitId = crypto.randomUUID();
    const key = S.PREFIX + next.commitId;
    const journal = JSON.stringify({ format: 'zhixu-long-mock-intent', id: next.commitId, baseCommitId: null, next, padding: 'x'.repeat(M.LIMITS.bytes) });
    data.set(key, journal); const repo = S.create(); repo.read();
    assert.equal(repo.pendings()[0].valid, false);
    assert.equal((await repo.recover(key)).ok, false); assert.equal(data.get(key), journal); assert.equal(data.has(S.KEY), false);
  });
  await check('restore merging two legal-sized halves rejects an over-capacity result without mutation', () => {
    const { M } = setup(); const full = nearLimit(M), mid = Math.floor(full.sessions.length / 2);
    const current = { ...M.empty(), sessions: full.sessions.slice(0, mid) };
    const incoming = { ...M.empty(), sessions: full.sessions.slice(mid) };
    const raw = JSON.stringify(M.backup(incoming, NOW)); const before = JSON.stringify(current);
    assert.ok(bytes(raw) < M.LIMITS.bytes);
    assert.throws(() => M.prepareImport(raw, current), /2 MiB|上限/);
    assert.equal(JSON.stringify(current), before);
  });
  await check('valid pending backup IDs cannot contain unbounded base-commit data', () => {
    const { M, S, data } = setup(); const next = record(M); next.revision = 1; next.commitId = crypto.randomUUID();
    const key = S.PREFIX + next.commitId;
    data.set(key, JSON.stringify({ format: 'zhixu-long-mock-intent', id: next.commitId, baseCommitId: 'x'.repeat(129), next }));
    const repo = S.create(); repo.read(); assert.equal(repo.pendings()[0].valid, false); assert.equal(data.has(key), true);
  });
  await check('session/question/section node limits reject without truncation', () => {
    const { M } = setup();
    assert.throws(() => M.validate(record(M, 101)));
    assert.throws(() => M.validate(record(M, 1, 201)));
    const tooMany = run();
    tooMany.sections = Array.from({ length: 21 }, (_, i) => ({ ...clone(tooMany.sections[0]), name: 'Module-' + i, items: [{ ...clone(tooMany.sections[0].items[0]), qid: 'q-' + i }] }));
    assert.throws(() => M.validateRun(tooMany));
    const manyAcross = run(); manyAcross.sections = [run('A', 120).sections[0], run('B', 81).sections[0]];
    manyAcross.sections[1].name = 'M2'; manyAcross.sections[1].items.forEach(q => { q.qid += '-second'; });
    assert.throws(() => M.validateRun(manyAcross));
  });
  await check('revision exhaustion creates no invalid unrecoverable pending journal', async () => {
    const { M, S, data } = setup(); const current = record(M);
    current.revision = Number.MAX_SAFE_INTEGER; current.commitId = crypto.randomUUID();
    data.set(S.KEY, JSON.stringify(current));
    const repo = S.create(); repo.read(); const next = repo.snapshot(); next.sessions[0].title = 'Uncommitted edit';
    assert.equal((await repo.save(next)).ok, false);
    assert.equal(repo.pendings().length, 0, 'save wrote an invalid MAX_SAFE_INTEGER + 1 revision journal');
    assert.equal(repo.pageCopy().sessions[0].title, 'Uncommitted edit');
    assert.equal(JSON.parse(data.get(S.KEY)).revision, Number.MAX_SAFE_INTEGER);
  });
  await check('missing content, malformed records, and colliding restore IDs preserve originals', () => {
    const { M, S, data } = setup(); const original = record(M);
    assert.equal(M.compatibility(original.sessions[0]).length, 1);
    assert.throws(() => M.action(original.sessions[0], { type: 'resume' }, NOW));
    const before = JSON.stringify(original), backup = M.backup(original, NOW);
    backup.records.sessions[0].title += ' changed';
    assert.throws(() => M.prepareImport(JSON.stringify(backup), original, { copyConflicts: true, newId: () => 'run-0' }));
    assert.equal(JSON.stringify(original), before);
    data.set(S.KEY, '{damaged'); const repo = S.create(); assert.equal(repo.read().ok, false);
    assert.equal(repo.raw, '{damaged'); assert.equal(data.get(S.KEY), '{damaged');
  });
  await check('model/store perform zero reads or writes of study/private values', async () => {
    const { M, S, access } = setup([
      ['zhixu-study-v1', 'sentinel'], ['zhixu-study-v2', 'sentinel'], ['zhixu-private-library-v1', 'sentinel']
    ]);
    const repo = S.create(); repo.read(); await repo.save(record(M)); repo.pendings();
    assert.ok(access.every(([, key]) => key === S.KEY || key.startsWith(S.PREFIX)), JSON.stringify(access));
  });
  console.log(JSON.stringify({ root, passed: outcomes.filter(x => x.ok).length, failed: outcomes.filter(x => !x.ok).length, outcomes }, null, 2));
  if (outcomes.some(x => !x.ok)) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
