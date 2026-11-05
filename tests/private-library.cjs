"use strict";
// VM + synthetic localStorage/Web Locks. Not a real-browser security/concurrency test.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.join(__dirname, "..");
const sources = ["local-progress-store.js", "private-library.js"].map(n => fs.readFileSync(path.join(root, "docs", n), "utf8"));
const example = JSON.parse(fs.readFileSync(path.join(root, "docs/private-format-example.json"), "utf8"));
const json = JSON.stringify, clone = x => JSON.parse(json(x));
const tests = [], test = (name, run) => tests.push([name, run]);
function world(seed = {}, noLocks = false) {
  const data = new Map(Object.entries(seed)), writes = [], clients = [];
  let tail = Promise.resolve(), held = false, release, denied = false;
  const locks = { request(name, options, callback) {
    assert.equal(options.mode, "exclusive"); assert.equal(name, "study-progress-store:zhixu-private-library-v1");
    if (denied) return Promise.reject(new Error("locked"));
    const gate = held ? new Promise(r => { release = r; }) : Promise.resolve();
    const job = tail.then(() => gate).then(callback); tail = job.catch(() => {}); return job;
  } };
  const result = { data, writes, hold() { held = true; }, release() { held = false; release?.(); }, deny() { denied = true; } };
  result.client = () => {
    const events = new Set(), errors = [], controls = { read: false, quota: false };
    const storage = { getItem(k) { if (controls.read) throw new Error("read denied"); return data.get(k) ?? null; },
      setItem(k, v) {
        if (controls.quota) throw Object.assign(new Error("quota"), { name: "QuotaExceededError" });
        data.set(k, v); writes.push([k, v]);
      } };
    const w = { navigator: noLocks ? {} : { locks }, localStorage: storage,
      addEventListener(type, fn) { events.add(fn); }, removeEventListener(type, fn) { events.delete(fn); } };
    const context = vm.createContext({ window: w, TextEncoder });
    sources.forEach(s => vm.runInContext(s, context));
    const api = w.PRIVATE_LIBRARY;
    const repo = api.create({ onError: (...x) => errors.push(x) });
    const c = { api, repo, controls, errors, emit(k, v) { events.forEach(fn => fn({ key: k, newValue: v, storageArea: storage })); } };
    clients.push(c); repo.reload(); return c;
  };
  return result;
}
async function importPack(client, p = example) { return client.repo.commit(client.repo.prepare(json(p))); }

test("whitelist, line endings, trimming and pure text preservation", () => {
  const { api } = world().client(), p = clone(example);
  p.title = "  标题\r\n第二行  "; p.questions[0].stem = '<script>alert(1)</script> 1 < 2';
  const out = api.parse(json(p))[0];
  assert.equal(out.title, "标题\n第二行"); assert.equal(out.questions[0].stem, p.questions[0].stem);
  p.questions[0].image = "https://bad.test/";
  assert.throws(() => api.parse(json(p)), /不支持的字段/);
});
test("safe JSON rejects malformed, too deep, pollution and control characters", () => {
  const { api } = world().client();
  for (const input of ["{", "null", "[]", '{"__proto__":{"polluted":true}}', "[".repeat(14) + "0" + "]".repeat(14)]) assert.throws(() => api.parse(input));
  const p = clone(example); p.title = "bad\u202eX"; assert.throws(() => api.parse(json(p)), /控制字符/);
  p.title = "bad\u0000"; assert.throws(() => api.parse(json(p)), /控制字符/);
  assert.equal({}.polluted, undefined);
});
test("UTF-8 byte limits include Chinese and BOM; no character-count shortcut", () => {
  const { api } = world().client();
  assert.equal(api.bytes("汉"), 3); assert.equal(api.parse("\ufeff" + json(example)).length, 1);
  assert.throws(() => api.parse(" ".repeat(2 * 1024 * 1024 + 1)), /2 MiB/);
  const p = clone(example); p.questions = Array.from({ length: 150 }, (_, i) => ({ ...p.questions[0], id: "q" + i, stem: "汉".repeat(2500) })); p.papers = [];
  assert.ok(json(p).length < 1024 * 1024); assert.throws(() => api.parse(json(p)), /1 MiB/);
});
test("duplicate and missing IDs, unsafe IDs and invalid answer indices reject", () => {
  const { api } = world().client();
  const mutate = fn => { const p = clone(example); fn(p); assert.throws(() => api.parse(json(p))); };
  mutate(p => p.questions.push(p.questions[0])); mutate(p => p.materials.push(p.materials[0]));
  mutate(p => p.questions[0].id = "../evil"); mutate(p => p.packId = "constructor");
  mutate(p => p.questions[0].materialIds = ["missing"]); mutate(p => p.papers[0].sections[0].questionIds = ["missing"]);
  mutate(p => p.papers[0].sections[1].questionIds = ["q1"]); mutate(p => p.questions[0].answer = 4);
  mutate(p => p.questions[0].answer = -1); mutate(p => p.questions[0].answer = "C");
  mutate(p => p.questions[1].answer = 0); mutate(p => p.questions[0].options = ["same", "same"]);
});
test("missing answer allowed only as unscored reading and writing has no answer", () => {
  const { api } = world().client(), p = clone(example); delete p.questions[0].answer;
  assert.equal(api.parse(json(p))[0].questions[0].answer, null);
  assert.equal(Object.hasOwn(api.parse(json(p))[0].questions[1], "answer"), false);
});
test("import is preview then one atomic write; old v1/v2 bytes are unchanged", async () => {
  const seed = { "zhixu-study-v1": ' {"schemaVersion":1,"sentinel":"old"}\n', "zhixu-study-v2": '{"schemaVersion":2,"sentinel":"new"}' };
  const w = world(seed), c = w.client(), before = c.repo.snapshot();
  const plan = c.repo.prepare(json(example)); assert.equal(w.writes.length, 0); assert.equal(c.repo.snapshot().packs.length, 0);
  assert.ok((await c.repo.commit(plan)).ok); assert.equal(w.writes.length, 1); assert.equal(w.writes[0][0], c.api.KEY);
  for (const [k, v] of Object.entries(seed)) assert.equal(w.data.get(k), v);
  assert.equal(before.packs.length, 0); assert.equal(c.repo.snapshot().revision, 1);
});
test("identical imports are idempotent; changed same-ID packages cannot overwrite", async () => {
  const w = world(), c = w.client(); await importPack(c);
  const raw = w.data.get(c.api.KEY), plan = c.repo.prepare(json(example));
  assert.equal(plan.skipped, 1); assert.equal((await c.repo.commit(plan)).unchanged, true); assert.equal(w.writes.length, 1);
  const p = clone(example); p.questions[0].answer = 1;
  assert.throws(() => c.repo.prepare(json(p)), /ID 冲突/); assert.equal(w.data.get(c.api.KEY), raw);
});
test("different packages may reuse local question IDs without collision", async () => {
  const w = world(), c = w.client(); await importPack(c);
  const p = clone(example); p.packId = "different"; await importPack(c, p);
  assert.equal(c.repo.snapshot().packs.length, 2);
});
test("private backup round-trip restores self-contained materials and papers", async () => {
  const a = world().client(); await importPack(a);
  const backup = a.repo.exportBackup(), b = world().client(); await b.repo.commit(b.repo.prepare(backup));
  assert.deepEqual(clone(a.repo.snapshot()), clone(b.repo.snapshot()));
  assert.ok(a.api.bytes(backup) <= a.api.LIMITS.backupBytes);
  const snapshot = a.repo.snapshot(); snapshot.packs[0].title = "evil";
  assert.notEqual(a.repo.snapshot().packs[0].title, "evil");
});
test("old study v1/v2 backups are routed back with no private storage change", async () => {
  const w = world(), c = w.client(); await importPack(c); const raw = w.data.get(c.api.KEY);
  for (const schemaVersion of [1, 2]) assert.throws(() => c.repo.prepare(json({ schemaVersion, attempts: [] })), /主站/);
  assert.equal(w.data.get(c.api.KEY), raw);
});
test("a bad package in a multi-package backup rolls back the whole import", async () => {
  const w = world(), c = w.client(); await importPack(c);
  const backup = JSON.parse(c.repo.exportBackup()), p = clone(example); p.packId = "valid-new";
  const bad = clone(example); bad.packId = "bad"; bad.questions[0].answer = 99;
  backup.library.packs.push(p, bad); const raw = w.data.get(c.api.KEY);
  assert.throws(() => c.repo.prepare(json(backup)), /答案下标/); assert.equal(w.data.get(c.api.KEY), raw);
  assert.equal(c.repo.snapshot().packs.length, 1);
});
test("quota failure leaves both persisted and in-memory prior state unchanged", async () => {
  const w = world(), c = w.client(); await importPack(c); const raw = w.data.get(c.api.KEY);
  const p = clone(example); p.packId = "new"; const plan = c.repo.prepare(json(p)); c.controls.quota = true;
  const result = await c.repo.commit(plan); assert.equal(result.ok, false); assert.equal(result.kind, "quota");
  assert.equal(w.data.get(c.api.KEY), raw); assert.equal(c.repo.snapshot().packs.length, 1);
  assert.ok(c.repo.exportBackup().includes(example.packId));
});
test("stale tab loses CAS and never overwrites another tab", async () => {
  const w = world(), a = w.client(), b = w.client(), plan = b.repo.prepare(json(example));
  await importPack(a); const raw = w.data.get(a.api.KEY);
  const result = await b.repo.commit(plan); assert.equal(result.ok, false); assert.equal(result.kind, "conflict");
  assert.equal(w.data.get(a.api.KEY), raw); assert.equal(w.writes.length, 1);
});
test("storage event invalidates pending import and error remains until reload", async () => {
  const w = world(), a = w.client(), b = w.client(), plan = b.repo.prepare(json(example));
  await importPack(a); b.emit(a.api.KEY, w.data.get(a.api.KEY));
  await assert.rejects(() => b.repo.commit(plan), /其他标签页/); b.repo.reload();
  await assert.rejects(() => b.repo.commit(plan), /预览已失效/);
});
test("concurrent repeated clicks cannot duplicate or interleave writes", async () => {
  const w = world(), c = w.client(), plan = c.repo.prepare(json(example));
  w.hold(); const promise = c.repo.commit(plan); assert.equal(c.repo.busy, true);
  await assert.rejects(() => c.repo.commit(plan), /正在保存/); assert.throws(() => c.repo.reload(), /正在保存/);
  w.release(); assert.equal((await promise).ok, true); assert.equal(w.writes.length, 1);
});
test("reload or another successful commit invalidates stale preview", async () => {
  const c = world().client(), a = c.repo.prepare(json(example)), b = c.repo.prepare(json(example));
  await c.repo.commit(a); await assert.rejects(() => c.repo.commit(b), /预览已失效/);
  const plan = c.repo.prepare(json(example)); c.repo.reload(); await assert.rejects(() => c.repo.commit(plan), /预览已失效/);
});
test("no Web Locks is read-only, denied lock writes nothing", async () => {
  const w = world({}, true), c = w.client(); assert.throws(() => c.repo.prepare(json(example)), /只读/); assert.equal(w.writes.length, 0);
  const w2 = world(), c2 = w2.client(), plan = c2.repo.prepare(json(example)); w2.deny();
  const result = await c2.repo.commit(plan); assert.equal(result.ok, false); assert.equal(result.kind, "lock"); assert.equal(w2.writes.length, 0);
});
test("corrupt storage never falls back to empty or overwrites; exact raw recoverable", () => {
  const w = world({ "zhixu-private-library-v1": '{"broken":' }), c = w.client();
  assert.equal(c.repo.snapshot(), null); assert.throws(() => c.repo.prepare(json(example)), /JSON/);
  assert.throws(() => c.repo.exportBackup(), /没有通过校验/); assert.equal(c.repo.raw().text, '{"broken":'); assert.equal(w.writes.length, 0);
});
test("read revocation returns cached raw labelled as stale, without fake empty export", async () => {
  const w = world(), c = w.client(); await importPack(c); const original = w.data.get(c.api.KEY); c.controls.read = true;
  assert.equal(c.repo.raw().text, original); assert.equal(c.repo.raw().cached, true);
});
test("delete is staged, does not touch study records, and backup can restore", async () => {
  const w = world({ "zhixu-study-v2": "sentinel" }), c = w.client(); await importPack(c); const backup = c.repo.exportBackup();
  const plan = c.repo.prepareRemoval(example.packId); assert.equal(c.repo.snapshot().packs.length, 1);
  await c.repo.commit(plan); assert.equal(c.repo.snapshot().packs.length, 0); assert.equal(w.data.get("zhixu-study-v2"), "sentinel");
  await c.repo.commit(c.repo.prepare(backup)); assert.equal(c.repo.snapshot().packs.length, 1);
});
test("maximum question count accepted; over-count and total size reject", async () => {
  const w = world(), c = w.client(), p = clone(example); p.papers = [];
  p.questions = Array.from({ length: 1000 }, (_, i) => ({ ...p.questions[0], id: "q" + i, stem: "原创测试题 " + i }));
  assert.ok((await importPack(c, p)).ok);
  p.packId = "second"; await importPack(c, p); p.packId = "third"; await importPack(c, p);
  p.packId = "fourth"; assert.throws(() => c.repo.prepare(json(p)), /最多 3000/);
  p.questions.push({ ...p.questions[0], id: "q1000" }); assert.throws(() => c.api.parse(json(p)), /数量/);
  const huge = clone(example); huge.papers = []; huge.questions = Array.from({ length: 1000 }, (_, i) => ({ ...huge.questions[0], id: "q" + i, stem: "汉".repeat(900) }));
  assert.throws(() => c.api.normalize({ ...c.api.fresh(), packs: [huge] }), /2 MiB/);
});
test("large multi-package backup remains within the import limit and round-trips", async () => {
  const c = world().client(), p = clone(example); p.papers = [];
  p.questions = Array.from({ length: 200 }, (_, i) => ({ ...p.questions[0], id: "q" + i, stem: "汉".repeat(900) }));
  for (let i = 0; i < 3; i++) { p.packId = "large-" + i; assert.ok((await importPack(c, p)).ok); }
  const backup = c.repo.exportBackup(); assert.ok(c.api.bytes(backup) > 1024 * 1024); assert.ok(c.api.bytes(backup) < 2 * 1024 * 1024);
  const other = world().client(); await other.repo.commit(other.repo.prepare(backup));
  assert.deepEqual(clone(other.repo.snapshot().packs), clone(c.repo.snapshot().packs));
});

(async () => { for (const [name, run] of tests) { await run(); console.log("PASS " + name); } console.log(`PASS ${tests.length} private model tests (synthetic only)`); })().catch(e => { console.error(e); process.exitCode = 1; });
