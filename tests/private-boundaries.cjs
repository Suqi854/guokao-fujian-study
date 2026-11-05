'use strict';
// Independent, synthetic-only regression cases. No existing suite, server, or browser.
// Final-source target defaults to the integration checkout, not parallel_import.
// Prepared for the parent's single final regression run; not executed by the reviewer.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const ROOT = path.resolve(process.env.STUDY_REPO_ROOT || path.join(__dirname,'..'));
const DOCS = path.join(ROOT, 'docs');
const source = name => fs.readFileSync(path.join(DOCS, name), 'utf8');

function boot() {
  const memory = new Map();
  const writes = [];
  const window = {
    localStorage: {
      getItem: key => memory.get(key) ?? null,
      setItem: (key, value) => { writes.push([key, value]); memory.set(key, value); }
    },
    navigator: { locks: { request: async (_name, _options, fn) => fn() } },
    addEventListener() {}, removeEventListener() {}
  };
  const context = vm.createContext({ window, TextEncoder });
  for (const name of ['local-progress-store.js', 'private-library.js'])
    vm.runInContext(source(name), context, { filename: name });
  return { M: window.PRIVATE_LIBRARY, memory, writes };
}

const stable = value => JSON.stringify(value);
function assertReadable(env, repo) {
  const { M, memory } = env;
  if (memory.has(M.KEY)) M.normalize(JSON.parse(memory.get(M.KEY)));
  const reread = M.create();
  try {
    const result = reread.reload();
    assert.equal(result.error, '', 'Successfully retained/committed library must reload');
    assert.equal(stable(reread.snapshot().packs), stable(repo.snapshot().packs));
  } finally { reread.destroy(); }
}

async function assertBackupRoundtrip(env, repo) {
  const backup = repo.exportBackup();
  assert.ok(env.M.bytes(backup) <= env.M.LIMITS.backupBytes);
  env.M.parse(backup);
  const destination = boot();
  const restored = destination.M.create();
  try {
    assert.equal(restored.reload().error, '');
    const result = await restored.commit(restored.prepare(backup));
    assert.equal(result.ok, true, 'Exported backup must restore into a clean library');
    assert.equal(stable(restored.snapshot().packs), stable(repo.snapshot().packs));
    assertReadable(destination, restored);
  } finally { restored.destroy(); }
}

async function commitOrSafeRefusal(env, repo, input, expectedReason) {
  const beforeRaw = env.memory.get(env.M.KEY);
  const beforeSnapshot = stable(repo.snapshot());
  const beforeWrites = env.writes.length;
  let result;
  let refusal;
  try {
    result = await repo.commit(repo.prepare(input));
    if (!result.ok) refusal = new Error(result.error || 'Save rejected without a diagnostic');
  } catch (error) { refusal = error; }
  if (refusal) {
    assert.match(String(refusal.message), expectedReason, 'Refusal must be a capacity/node diagnostic');
    assert.equal(env.memory.get(env.M.KEY), beforeRaw, 'Refused import must not change storage');
    assert.equal(stable(repo.snapshot()), beforeSnapshot, 'Refused import must not change memory');
    assert.equal(env.writes.length, beforeWrites, 'Refused import must not write even temporarily');
  } else {
    assert.equal(result.ok, true);
  }
  assertReadable(env, repo);
  await assertBackupRoundtrip(env, repo);
  return refusal ? 'safely refused' : 'committed and recoverable';
}

async function revisionDigitBoundary() {
  const env = boot();
  const { M, memory } = env;
  const lib = M.fresh();
  lib.revision = 9;
  for (let p = 0; p < 3; p++) {
    const pack = { format: M.PACK, version: 1, packId: 'revision-' + p,
      title: 'synthetic', sourceNote: 'synthetic', materials: [], papers: [], questions: [] };
    for (let q = 0; q < 50; q++) pack.questions.push({ id: 'q' + q, type: 'writing',
      stem: 'x'.repeat(13000), module: 'm', materialIds: [], explanation: '' });
    lib.packs.push(pack);
  }
  // Construct the old troublesome size without normalizing the combined target.
  // A corrected implementation is allowed to reject this target before mutation.
  let needed = M.LIMITS.libraryBytes - M.bytes(stable(lib));
  assert.ok(needed >= 0, 'Synthetic starting data must fit the announced byte limit');
  for (const pack of lib.packs) for (const question of pack.questions) {
    const added = Math.min(30000, needed);
    question.explanation = 'x'.repeat(added);
    needed -= added;
  }
  assert.equal(needed, 0, 'Synthetic data must reach the byte boundary exactly');
  assert.equal(M.bytes(stable(lib)), M.LIMITS.libraryBytes);
  for (const pack of lib.packs) assert.ok(M.bytes(stable(pack)) <= M.LIMITS.fileBytes);
  const incoming = lib.packs.pop();
  memory.set(M.KEY, stable(M.normalize(lib)));
  const repo = M.create();
  try {
    assert.equal(repo.reload().error, '');
    const outcome = await commitOrSafeRefusal(env, repo, stable(incoming), /上限|超过|容量|字节|MiB|空间/);
    if (outcome.startsWith('committed')) assert.equal(repo.snapshot().revision, 10);
    return 'revision 9 → 10 at byte boundary: ' + outcome;
  } finally { repo.destroy(); }
}

function nodeCount(value) {
  return 1 + (value !== null && typeof value === 'object'
    ? Object.values(value).reduce((n, child) => n + nodeCount(child), 0) : 0);
}

async function backupEnvelopeNodeBoundary() {
  const env = boot();
  const { M } = env;
  const lib = M.fresh();
  for (let p = 0; p < 3; p++) {
    const pack = { format: M.PACK, version: 1, packId: 'nodes-' + p,
      title: 'p', sourceNote: 's', materials: [], questions: [], papers: [] };
    for (let m = 0; m < 7; m++) pack.materials.push({ id: 'm' + m, title: 'm', text: 'x' });
    for (let q = 0; q < 1000; q++) pack.questions.push({ id: 'q' + q, type: 'writing',
      stem: 'x', module: 'm', materialIds: Array.from({ length: 6 }, (_, i) => 'm' + i), explanation: '' });
    for (let r = 0; r < 20; r++) pack.papers.push({ id: 'r' + r, title: 'r', sourceNote: '',
      sections: [{ id: 's', title: 's', questionIds: pack.questions.map(q => q.id) }] });
    lib.packs.push(pack);
  }
  let needed = M.LIMITS.treeNodes - nodeCount(lib);
  assert.ok(needed >= 0 && needed <= 3000, 'Expected synthetic node boundary is reachable');
  for (const pack of lib.packs) for (const question of pack.questions)
    if (needed > 0) { question.materialIds.push('m6'); needed--; }
  assert.equal(nodeCount(lib), M.LIMITS.treeNodes);
  for (const pack of lib.packs) assert.ok(M.bytes(stable(pack)) <= M.LIMITS.fileBytes);
  const repo = M.create();
  try {
    assert.equal(repo.reload().error, '');
    const outcomes = [];
    for (const pack of lib.packs)
      outcomes.push(await commitOrSafeRefusal(env, repo, stable(pack), /节点|嵌套|过多|上限|容量/));
    assert.equal(outcomes[0], 'committed and recoverable', 'First small pack must not be blanket-rejected');
    assert.equal(outcomes[1], 'committed and recoverable', 'Two packs are well below the node limit');
    return 'backup envelope at ' + M.LIMITS.treeNodes + ' library nodes: ' + outcomes.join('; ');
  } finally { repo.destroy(); }
}

async function removeOnePackPreservesOtherResponses() {
  const { JSDOM } = createRequire(path.join(ROOT, 'package.json'))('jsdom');
  const dom = new JSDOM(source('private-library.html'), {
    url: 'https://private.example.invalid/private-library.html', runScripts: 'outside-only'
  });
  const w = dom.window;
  w.TextEncoder = TextEncoder;
  Object.defineProperty(w.navigator, 'locks', {
    value: { request: async (_name, _options, fn) => fn() }
  });
  let confirmed = 0;
  w.confirm = () => { confirmed++; return true; };
  try {
    for (const name of ['local-progress-store.js', 'private-library.js', 'private-workspace.js'])
      w.eval(source(name));
    const repo = w.privateWorkspace.repo;
    const pack = id => ({ format: w.PRIVATE_LIBRARY.PACK, version: 1, packId: id,
      title: id, sourceNote: 'synthetic only', questions: [
        { id: 'writing', type: 'writing', stem: 'Synthetic writing task' },
        { id: 'choice', type: 'single-choice', stem: 'Synthetic choice', options: ['A', 'B'], answer: 1 }
      ] });
    for (const id of ['A', 'B']) assert.equal((await repo.commit(repo.prepare(stable(pack(id))))).ok, true);
    const $ = selector => w.document.querySelector(selector);
    $('#private-reload').click();
    const choosePack = id => {
      const index = repo.snapshot().packs.findIndex(item => item.packId === id);
      assert.ok(index >= 0, 'Requested pack must exist: ' + id);
      $('#private-pack').value = String(index);
      $('#private-pack').dispatchEvent(new w.Event('change'));
    };
    const typeDraft = text => {
      $('textarea').value = text;
      $('textarea').dispatchEvent(new w.Event('input'));
    };
    choosePack('B');
    typeDraft('DRAFT FOR B');
    $('#private-next').click();
    const selected = w.document.querySelectorAll('input[type="radio"]')[1];
    selected.checked = true;
    selected.dispatchEvent(new w.Event('change'));
    choosePack('A');
    typeDraft('DRAFT FOR DELETED A');
    $('#private-remove').click();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(repo.busy, false, 'Synthetic async deletion must settle');
    assert.equal(confirmed, 1, 'Deletion requires an explicit confirmation');
    assert.equal(stable(repo.snapshot().packs.map(item => item.packId)), '["B"]');
    assert.equal($('textarea').value, 'DRAFT FOR B', 'Deleting A must not erase B writing');
    $('#private-next').click();
    assert.equal(w.document.querySelectorAll('input[type="radio"]')[1].checked, true,
      'Deleting A must not erase B single-choice response');
    // Deleting A must still clean A's own response, not merely retain the entire Map.
    assert.equal((await repo.commit(repo.prepare(stable(pack('A'))))).ok, true);
    $('#private-reload').click();
    choosePack('A');
    assert.equal($('textarea').value, '', 'Reimported A must not inherit deleted A draft');
    return 'delete A preserves B draft + choice, and clears only A responses';
  } finally {
    if (w.privateWorkspace) w.privateWorkspace.destroy();
    w.close();
  }
}

(async () => {
  console.log('Private boundary regressions; source: ' + DOCS);
  let failures = 0;
  for (const [name, test] of [
    ['revision-digit-capacity', revisionDigitBoundary],
    ['backup-envelope-nodes', backupEnvelopeNodeBoundary],
    ['delete-pack-response-isolation', removeOnePackPreservesOtherResponses]
  ]) {
    try { console.log('PASS ' + name + ': ' + await test()); }
    catch (error) { failures++; console.error('FAIL ' + name + '\n' + error.stack); }
  }
  console.log('SUMMARY ' + (3 - failures) + '/3 passed; synthetic-only, not browser verification');
  if (failures) process.exitCode = 1;
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
