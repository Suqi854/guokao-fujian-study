"use strict";
// Pure program model: isolated VM windows, synthetic storage, and genuinely
// queued async lock ownership. These tests are NOT real-browser concurrency QA.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const source = fs.readFileSync(path.join(__dirname, "../docs/local-progress-store.js"), "utf8");
const V1 = "zhixu-study-v1", V2 = "zhixu-study-v2", LOCK = "study-progress-store:" + V2;
const plain = value => JSON.parse(JSON.stringify(value));
const raw = value => JSON.stringify(value);
const fresh = (notes = {}) => ({ schemaVersion: 2, revision: 0, notes, attempts: [] });
const legacy = (notes = {}) => ({ schemaVersion: 1, notes, attempts: [] });
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};
function normalize(value) {
  if (!value || ![1, 2].includes(value.schemaVersion)) throw new Error("版本不支持");
  if (!value.notes || typeof value.notes !== "object" || Array.isArray(value.notes) ||
      Object.values(value.notes).some(note => typeof note !== "string")) throw new Error("笔记无效");
  if (!Array.isArray(value.attempts)) throw new Error("练习记录无效");
  return { schemaVersion: 2, revision: value.revision ?? 0, notes: value.notes,
    attempts: value.attempts.map(item => ({ id: item.id, done: item.done })) };
}
function mockLocks() {
  const queues = new Map(), calls = [];
  let active = 0, peak = 0, deny = false;
  function pump(name) {
    const queue = queues.get(name);
    if (!queue || !queue.length) { queues.delete(name); return; }
    const job = queue[0];
    queueMicrotask(async () => {
      active++; peak = Math.max(peak, active);
      try { job.resolve(await job.callback({ name, mode: job.options.mode })); }
      catch (error) { job.reject(error); }
      finally { active--; queue.shift(); pump(name); }
    });
  }
  return {
    calls,
    get active() { return active; },
    get peak() { return peak; },
    get deny() { return deny; },
    set deny(value) { deny = value; },
    request(name, options, callback) {
      calls.push({ name, options });
      if (deny) return Promise.reject(Object.assign(new Error("Denied"), { name: "SecurityError" }));
      return new Promise((resolve, reject) => {
        const queue = queues.get(name) || [];
        queues.set(name, queue);
        queue.push({ options, callback, resolve, reject });
        if (queue.length === 1) pump(name);
      });
    },
  };
}
function world(seed = {}, { noLocks = false } = {}) {
  const data = new Map(Object.entries(seed)), writes = [], locks = mockLocks(), clients = [];
  function client(overrides = {}) {
    const listeners = new Set(), errors = [], controls = { readError: null, writeError: null, storageError: null, failKey: null };
    const storage = {
      getItem(key) {
        if (controls.readError || controls.failKey === key) throw controls.readError || new Error("Read refused");
        return data.has(key) ? data.get(key) : null;
      },
      setItem(key, value) {
        if (controls.writeError) throw controls.writeError;
        assert.equal(locks.active, 1, "all writes must happen while the exclusive lock is held");
        const oldValue = data.has(key) ? data.get(key) : null;
        data.set(key, String(value));
        writes.push({ key, value: String(value), oldValue });
      },
    };
    const window = {
      navigator: noLocks ? {} : { locks },
      get localStorage() {
        if (controls.storageError) throw controls.storageError;
        return storage;
      },
      addEventListener(type, callback) { assert.equal(type, "storage"); listeners.add(callback); },
      removeEventListener(type, callback) { assert.equal(type, "storage"); listeners.delete(callback); },
    };
    vm.runInNewContext(source, { window }, { filename: "local-progress-store.js" });
    const store = window.STUDY_PROGRESS_STORE.create({ key: V2, legacyKey: V1, normalize,
      onError: (message, kind) => errors.push({ message, kind }), ...overrides });
    const result = { store, errors, controls, storage, listeners,
      emit(key, newValue, storageArea = storage) {
        for (const listener of listeners) listener({ key, newValue, storageArea });
      } };
    clients.push(result);
    return result;
  }
  return { data, writes, locks, clients, client };
}
async function holdLock(locks) {
  const entered = deferred(), release = deferred();
  const finished = locks.request(LOCK, { mode: "exclusive" }, async () => {
    entered.resolve(); await release.promise;
  });
  await entered.promise;
  return async () => { release.resolve(); await finished; };
}
const tests = [];
const test = (name, run) => tests.push({ name, run });

test("valid v1 is read-only until an explicit save; original bytes survive migration", async () => {
  const old = ' { "schemaVersion": 1, "notes": {"intro":"旧笔记"}, "attempts": [] }\n';
  const w = world({ [V1]: old }), { store } = w.client();
  const result = store.read();
  assert.equal(result.error, ""); assert.equal(result.migrationPending, true);
  assert.equal(result.writeSupported, true); assert.equal(result.value.schemaVersion, 2);
  assert.equal(result.value.notes.intro, "旧笔记"); assert.equal(store.getRaw(), old);
  assert.equal(store.loadedRaw, old); assert.equal(w.writes.length, 0); assert.equal(w.data.has(V2), false);
  const committed = await store.save(result.value);
  assert.equal(committed.ok, true); assert.equal(committed.value.revision, 1);
  assert.equal(store.migrationPending, false); assert.equal(w.data.get(V1), old);
  assert.equal(w.writes.length, 1); assert.equal(w.writes[0].key, V2);
  assert.equal(store.getRaw(), w.data.get(V2));
});
test("an absent v1/v2 reads null and does not manufacture storage", async () => {
  const w = world(), { store } = w.client(), result = store.read();
  assert.equal(result.value, null); assert.equal(result.migrationPending, false);
  assert.equal(store.getRaw(), null); assert.equal(w.writes.length, 0);
  assert.equal((await store.save(fresh())).value.revision, 1);
});
test("v2 wins without even reading v1; revisions come from stored v2", async () => {
  const w = world({ [V1]: raw(legacy({ a: "old" })), [V2]: raw({ ...fresh({ a: "new" }), revision: 6 }) });
  const { store, controls } = w.client(); controls.failKey = V1;
  assert.equal(store.read().value.notes.a, "new");
  assert.equal(store.migrationPending, false);
  const saved = await store.save({ ...fresh({ a: "changed" }), revision: 9999 });
  assert.equal(saved.value.revision, 7); assert.equal(w.writes.length, 1);
});
test("corrupt v2 does not fall back or silently autosave, and original bytes export", async () => {
  const corrupt = '{"schemaVersion":2,broken';
  const w = world({ [V1]: raw(legacy({ safe: "old" })), [V2]: corrupt }), { store } = w.client();
  const loaded = store.read(); assert.equal(loaded.value, null); assert.equal(loaded.kind, "parse");
  assert.match(loaded.error, /JSON/); assert.equal(loaded.migrationPending, false);
  assert.equal(store.getRaw(), corrupt); assert.equal(store.loadedRaw, corrupt);
  assert.equal((await store.save(fresh())).ok, false);
  assert.equal(w.data.get(V2), corrupt); assert.equal(w.writes.length, 0);
});
test("empty-string v2 is present and corrupt, not missing", async () => {
  const w = world({ [V1]: raw(legacy()), [V2]: "" }), { store } = w.client();
  assert.equal(store.read().kind, "parse"); assert.equal(store.getRaw(), "");
  assert.equal((await store.save(fresh())).ok, false); assert.equal(w.data.get(V2), "");
});
test("invalid v2 data is preserved, and confirmed replacement can recover it", async () => {
  const invalid = raw({ schemaVersion: 2, revision: 8, notes: null, attempts: [] });
  const w = world({ [V2]: invalid }), { store } = w.client();
  assert.equal(store.read().kind, "validation"); assert.equal(store.loadedRaw, invalid);
  assert.equal((await store.save(fresh())).kind, "validation");
  const recovery = await store.replace(fresh({ recovered: "yes" }));
  assert.equal(recovery.ok, true); assert.equal(recovery.value.revision, 9);
  assert.equal(store.error, ""); assert.equal((await store.save(fresh())).value.revision, 10);
});
test("corrupt JSON replacement preserves v1 and starts valid revision 1", async () => {
  const old = raw(legacy({ saved: "yes" })), w = world({ [V2]: "broken", [V1]: old }), { store } = w.client();
  store.read(); const result = await store.replace(fresh());
  assert.equal(result.ok, true); assert.equal(result.value.revision, 1); assert.equal(w.data.get(V1), old);
});
test("corrupt legacy remains exportable and unchanged when explicitly replaced into v2", async () => {
  const corrupt = '{"old":broken', w = world({ [V1]: corrupt }), { store } = w.client();
  const result = store.read(); assert.equal(result.kind, "parse"); assert.equal(result.migrationPending, true);
  assert.equal(store.getRaw(), corrupt); assert.equal((await store.save(fresh())).ok, false);
  assert.equal((await store.replace(fresh())).ok, true); assert.equal(w.data.get(V1), corrupt);
});
test("invalid stored revision blocks normal save; confirmed replace repairs it", async () => {
  const w = world({ [V2]: raw({ ...fresh(), revision: -1 }) }), { store } = w.client();
  assert.equal(store.read().kind, "validation");
  assert.equal((await store.save(fresh())).ok, false);
  assert.equal((await store.replace(fresh())).value.revision, 1);
});
test("two stores with identical baselines cannot lose the winning write without storage events", async () => {
  const initial = raw({ ...fresh({ original: "keep" }), revision: 4 });
  const w = world({ [V2]: initial }), a = w.client().store, b = w.client().store;
  a.read(); b.read();
  const results = await Promise.all([a.save(fresh({ winner: "A" })), b.save(fresh({ winner: "B" }))]);
  assert.equal(results.filter(result => result.ok).length, 1);
  assert.equal(results.filter(result => result.kind === "conflict").length, 1);
  assert.equal(w.writes.length, 1); assert.equal(w.writes[0].oldValue, initial);
  assert.equal(JSON.parse(w.data.get(V2)).notes.winner, "A");
  assert.equal(w.locks.peak, 1);
  assert.ok(w.locks.calls.every(call => call.name === LOCK && call.options.mode === "exclusive"));
});
test("same-page synchronous saves are ordered and do not conflict with themselves", async () => {
  const w = world(), { store } = w.client(); store.read();
  const results = await Promise.all([store.save(fresh({ a: "first" })), store.save(fresh({ a: "second" })), store.save(fresh({ a: "third" }))]);
  assert.deepEqual(results.map(result => result.ok), [true, true, true]);
  assert.deepEqual(results.map(result => result.value.revision), [1, 2, 3]);
  assert.equal(JSON.parse(w.data.get(V2)).notes.a, "third");
});
test("snapshot whitelist and deep copy run at call time, before lock acquisition", async () => {
  const w = world(), { store } = w.client(); store.read(); const release = await holdLock(w.locks);
  const input = fresh({ a: "at call" }); input.extra = "must not persist";
  input.attempts.push({ id: "q1", done: false, extra: "omit" });
  const pending = store.save(input); input.notes.a = "too late"; input.attempts[0].done = true;
  input.attempts.push({ id: "q2", done: true });
  await release(); const result = await pending;
  assert.deepEqual(plain(result.value), { schemaVersion: 2, revision: 1, notes: { a: "at call" }, attempts: [{ id: "q1", done: false }] });
  result.value.notes.a = "mutated return value";
  assert.equal(JSON.parse(w.data.get(V2)).notes.a, "at call");
});
test("CAS re-reads only after waiting for lock ownership", async () => {
  const original = raw(fresh({ a: "initial" })), w = world({ [V2]: original }), { store } = w.client();
  store.read(); const release = await holdLock(w.locks), pending = store.save(fresh({ a: "stale" }));
  await Promise.resolve();
  const external = raw({ ...fresh({ a: "external" }), revision: 1 }); w.data.set(V2, external);
  await release(); assert.equal((await pending).kind, "conflict");
  assert.equal(w.data.get(V2), external); assert.equal(w.writes.length, 0);
});
test("legacy v1 changes before first migration are detected without storage events", async () => {
  const old = raw(legacy({ a: "read" })), changed = raw(legacy({ a: "old tab updated" }));
  const w = world({ [V1]: old }), { store } = w.client(); store.read();
  w.data.set(V1, changed);
  assert.equal((await store.save(fresh({ a: "stale" }))).kind, "conflict");
  assert.equal(w.data.has(V2), false); assert.equal(w.data.get(V1), changed);
});
test("a new legacy record appearing after empty read also blocks migration", async () => {
  const w = world(), { store } = w.client(); store.read(); w.data.set(V1, raw(legacy({ a: "new old tab" })));
  assert.equal((await store.replace(fresh())).kind, "conflict"); assert.equal(w.data.has(V2), false);
});
test("legacy changes after successful v2 migration do not affect v2 writes", async () => {
  const w = world({ [V1]: raw(legacy()) }), { store, emit } = w.client();
  store.read(); await store.save(fresh()); const old = raw(legacy({ x: "later" }));
  w.data.set(V1, old); emit(V1, old);
  assert.equal(store.error, ""); assert.equal((await store.save(fresh())).value.revision, 2);
  assert.equal(w.data.get(V1), old);
});
test("replace cancels already lock-waiting and not-yet-started older saves", async () => {
  const w = world(), { store, errors } = w.client(); store.read(); const release = await holdLock(w.locks);
  const a = store.save(fresh({ a: "old one" })); await Promise.resolve();
  const b = store.save(fresh({ a: "old two" }));
  const reset = store.replace(fresh({ a: "reset" }));
  const newer = store.save(fresh({ a: "after reset" }));
  await release();
  assert.deepEqual(plain(await a), { ok: false, cancelled: true });
  assert.deepEqual(plain(await b), { ok: false, cancelled: true });
  assert.equal((await reset).value.revision, 1); assert.equal((await newer).value.revision, 2);
  assert.deepEqual(w.writes.map(write => JSON.parse(write.value).notes.a), ["reset", "after reset"]);
  assert.equal(errors.length, 0);
});
test("a later replace cancels an older queued replace as well", async () => {
  const w = world(), { store } = w.client(); store.read(); const release = await holdLock(w.locks);
  const old = store.replace(fresh({ a: "old import" })), latest = store.replace(fresh({ a: "latest import" }));
  await release(); assert.equal((await old).cancelled, true); assert.equal((await latest).ok, true);
  assert.equal(w.writes.length, 1); assert.equal(JSON.parse(w.data.get(V2)).notes.a, "latest import");
});
test("reset after an already committed save does not resurrect any older queued draft", async () => {
  const w = world(), { store } = w.client(); store.read(); await store.save(fresh({ a: "saved" }));
  const old = store.save(fresh({ a: "old draft" })), reset = store.replace(fresh());
  assert.equal((await old).cancelled, true); assert.equal((await reset).value.revision, 2);
  assert.deepEqual(JSON.parse(w.data.get(V2)).notes, {});
});
test("replace cannot bypass conflict, even after corrupt initial data", async () => {
  const w = world({ [V2]: "broken" }), { store } = w.client(); store.read();
  const external = raw({ ...fresh({ a: "another page" }), revision: 12 }); w.data.set(V2, external);
  assert.equal((await store.replace(fresh())).kind, "conflict");
  assert.equal((await store.replace(fresh())).kind, "conflict"); assert.equal(w.data.get(V2), external);
  const reloaded = store.read(); assert.equal(reloaded.value.notes.a, "another page");
  assert.equal((await store.replace(fresh())).value.revision, 13);
});
test("explicit read reload cancels queued snapshots and refreshes the CAS baseline", async () => {
  const w = world(), { store } = w.client(); store.read(); const release = await holdLock(w.locks);
  const old = store.save(fresh({ old: "draft" }));
  w.data.set(V2, raw({ ...fresh({ a: "new" }), revision: 5 }));
  assert.equal(store.read().value.revision, 5); const saved = store.save(fresh({ a: "updated after reload" }));
  await release(); assert.equal((await old).cancelled, true); assert.equal((await saved).value.revision, 6);
});
test("quota failures never advance baseline or revision and replacement can retry", async () => {
  const original = raw({ ...fresh({ a: "original" }), revision: 2 }), w = world({ [V2]: original });
  const { store, controls } = w.client(); store.read();
  controls.writeError = Object.assign(new Error("Full"), { name: "QuotaExceededError" });
  assert.equal((await store.save(fresh())).kind, "quota"); assert.equal(store.loadedRaw, original);
  assert.equal(w.data.get(V2), original); assert.equal(w.writes.length, 0);
  controls.writeError = null; assert.equal((await store.replace(fresh())).value.revision, 3);
});
test("first failed write cancels the second queued running draft even after quota is freed", async () => {
  const original = raw({ ...fresh({ run: "paused", draft: "original" }), revision: 7 });
  const w = world({ [V2]: original });
  let memory = fresh({ run: "running", draft: "first" }), notifications = 0, reentrantSave;
  const client = w.client({ onError: (message, kind) => {
    notifications++;
    assert.equal(kind, "quota"); assert.match(message, /停止自动保存/);
    memory.notes.run = "paused";
    // The browser would allow the second write. It must still be invalidated,
    // because its pre-error running state no longer represents the paused UI.
    client.controls.writeError = null;
    reentrantSave = client.store.save(memory);
  } });
  const { store, controls } = client; store.read();
  controls.writeError = Object.assign(new Error("Full once"), { name: "QuotaExceededError" });
  const first = store.save(memory);
  memory.notes.draft = "second"; const second = store.save(memory);
  assert.equal((await first).kind, "quota");
  assert.deepEqual(plain(await second), { ok: false, cancelled: true });
  assert.equal((await reentrantSave).kind, "quota");
  assert.equal(memory.notes.run, "paused"); assert.equal(w.data.get(V2), original);
  assert.equal(store.loadedRaw, original); assert.equal(w.writes.length, 0); assert.equal(notifications, 1);
  const lockAttempts = w.locks.calls.length;
  assert.equal((await store.save(fresh({ run: "running", draft: "old retry" }))).kind, "quota");
  assert.equal(w.locks.calls.length, lockAttempts); assert.equal(store.kind, "quota");
  const recovered = await store.replace(memory);
  assert.equal(recovered.ok, true); assert.equal(recovered.value.revision, 8);
  assert.equal(recovered.value.notes.run, "paused"); assert.equal(store.error, "");
  assert.equal((await store.save(fresh({ run: "paused", draft: "new safe work" }))).value.revision, 9);
});
test("a CAS blocker cancels other queued snapshots and replacement still cannot bypass it", async () => {
  const original = raw(fresh({ a: "original" })), external = raw({ ...fresh({ a: "external" }), revision: 1 });
  const w = world({ [V2]: original }), { store } = w.client(); store.read();
  w.data.set(V2, external);
  const first = store.save(fresh({ a: "first stale" })), second = store.save(fresh({ a: "second stale" }));
  assert.equal((await first).kind, "conflict"); assert.equal((await second).cancelled, true);
  assert.equal((await store.replace(fresh())).kind, "conflict");
  assert.equal(w.data.get(V2), external); assert.equal(w.writes.length, 0);
  store.read(); assert.equal((await store.save(fresh({ a: "reloaded" }))).value.revision, 2);
});
test("lock denial cancels queued drafts even when permission is restored by the error handler", async () => {
  const original = raw(fresh()), w = world({ [V2]: original });
  const { store } = w.client({ onError: () => { w.locks.deny = false; } }); store.read();
  w.locks.deny = true;
  const first = store.save(fresh({ a: "first" })), second = store.save(fresh({ a: "second" }));
  assert.equal((await first).kind, "lock"); assert.equal((await second).cancelled, true);
  assert.equal((await store.save(fresh())).kind, "lock"); assert.equal(w.data.get(V2), original);
  assert.equal((await store.replace(fresh())).ok, true);
});
test("denied storage writes latch until explicit replacement without a false conflict", async () => {
  const old = raw(legacy({ a: "keep" })), w = world({ [V1]: old }), { store, controls } = w.client();
  store.read(); controls.writeError = Object.assign(new Error("Denied"), { name: "SecurityError" });
  assert.equal((await store.save(fresh())).kind, "write"); assert.equal(store.loadedRaw, old);
  assert.equal(w.data.has(V2), false); assert.equal(w.data.get(V1), old);
  controls.writeError = null;
  assert.equal((await store.save(fresh())).kind, "write"); assert.equal(w.writes.length, 0);
  assert.equal((await store.replace(fresh())).value.revision, 1);
});
test("missing Web Locks is explicitly read-only, without a fallback write", async () => {
  const old = raw(legacy({ a: "available" })), w = world({ [V1]: old }, { noLocks: true });
  const { store, errors } = w.client(), loaded = store.read();
  assert.equal(loaded.value.notes.a, "available"); assert.equal(loaded.writeSupported, false);
  assert.equal(loaded.kind, "unsupported"); assert.match(loaded.error, /只读/); assert.equal(store.writeSupported, false);
  assert.equal((await store.save(fresh())).kind, "unsupported");
  assert.equal((await store.replace(fresh())).kind, "unsupported");
  assert.equal(store.getRaw(), old); assert.equal(w.writes.length, 0); assert.equal(w.locks.calls.length, 0);
  assert.equal(errors.length, 1);
});
test("lock permission rejection reports failure with original storage untouched", async () => {
  const original = raw(fresh({ a: "original" })), w = world({ [V2]: original }), { store } = w.client();
  store.read(); w.locks.deny = true;
  assert.equal((await store.save(fresh())).kind, "lock"); assert.equal(w.data.get(V2), original);
  assert.equal(store.loadedRaw, original); w.locks.deny = false;
  assert.equal((await store.replace(fresh())).value.revision, 1);
});
test("read permission denial is explicit; no write can proceed from an unknown baseline", async () => {
  const original = raw(fresh()), w = world({ [V2]: original }), { store, controls } = w.client();
  controls.storageError = Object.assign(new Error("Denied"), { name: "SecurityError" });
  const loaded = store.read(); assert.equal(loaded.kind, "read"); assert.equal(loaded.value, null);
  assert.throws(() => store.getRaw(), error => error.kind === "read" && /无法读取/.test(error.message));
  controls.storageError = null;
  assert.equal((await store.replace(fresh())).kind, "read"); assert.equal(w.data.get(V2), original);
  store.read(); assert.equal((await store.save(fresh())).ok, true);
});
test("read denial inside the acquired lock cannot write or advance the baseline", async () => {
  const original = raw({ ...fresh(), revision: 3 }), w = world({ [V2]: original });
  const { store, controls } = w.client(); store.read(); controls.readError = new Error("Denied later");
  assert.equal((await store.save(fresh())).kind, "read"); assert.equal(store.loadedRaw, original);
  assert.equal(w.writes.length, 0); controls.readError = null;
  assert.equal((await store.save(fresh())).kind, "read");
  store.read();
  assert.equal((await store.save(fresh())).value.revision, 4);
});
test("getRaw always returns the current source, does not advance CAS, and loadedRaw survives denied export", async () => {
  const original = raw(fresh({ a: "original" })), external = raw({ ...fresh({ a: "external" }), revision: 1 });
  const w = world({ [V2]: original }), { store, controls } = w.client(); store.read();
  w.data.set(V2, external); assert.equal(store.getRaw(), external); assert.equal(store.loadedRaw, original);
  controls.readError = new Error("Denied"); assert.throws(() => store.getRaw()); assert.equal(store.loadedRaw, original);
  controls.readError = null; assert.equal((await store.save(fresh())).kind, "read");
  assert.equal((await store.replace(fresh())).kind, "conflict");
  assert.equal(w.data.get(V2), external);
});
test("storage events warn early without overwriting memory or touching any key", async () => {
  const original = raw(fresh({ a: "original" })), w = world({ [V2]: original });
  const { store, emit, errors } = w.client(), loaded = store.read();
  emit(V2, original); emit("unrelated", "change"); emit(V2, "wrong area", {});
  assert.equal(errors.length, 0);
  const changed = raw({ ...fresh({ a: "external" }), revision: 1 });
  w.data.set(V2, changed); emit(V2, changed);
  assert.equal(store.kind, "conflict"); assert.equal(errors.length, 1);
  assert.equal(loaded.value.notes.a, "original"); assert.equal(store.loadedRaw, original);
  assert.equal(w.writes.length, 0); assert.equal((await store.replace(fresh())).kind, "conflict");
});
test("legacy storage events and clear events stop stale writes", async () => {
  for (const eventKey of [V1, null]) {
    const w = world({ [V1]: raw(legacy()) }), { store, emit } = w.client(); store.read();
    emit(eventKey, null); assert.equal(store.kind, "conflict");
    assert.equal((await store.save(fresh())).kind, "conflict"); assert.equal(w.writes.length, 0);
  }
});
test("invalid snapshot and throwing error callback cannot touch persisted bytes", async () => {
  const original = raw(fresh()), w = world({ [V2]: original });
  const { store } = w.client({ onError: () => { throw new Error("UI callback failed"); } }); store.read();
  const result = await store.save({ schemaVersion: 2, notes: null });
  assert.equal(result.kind, "validation"); assert.equal(w.data.get(V2), original);
  assert.equal((await store.save(fresh({ a: "valid" }))).kind, "validation");
  assert.equal((await store.replace(fresh({ a: "valid" }))).ok, true);
});
test("failed replacement validation still invalidates older queued drafts", async () => {
  const original = raw(fresh({ a: "keep" })), w = world({ [V2]: original }), { store } = w.client();
  store.read(); const release = await holdLock(w.locks), older = store.save(fresh({ a: "stale" }));
  const replacement = await store.replace({ schemaVersion: 2, notes: null });
  assert.equal(replacement.kind, "validation"); await release();
  assert.equal((await older).cancelled, true); assert.equal(w.data.get(V2), original);
});
test("malformed normalize output and unsafe revision overflow are rejected", async () => {
  const w = world(), { store } = w.client({ normalize: () => ({ schemaVersion: 1 }) });
  store.read(); assert.equal((await store.save(fresh())).kind, "validation"); assert.equal(w.writes.length, 0);
  const x = world({ [V2]: raw({ ...fresh(), revision: Number.MAX_SAFE_INTEGER }) }), s = x.client().store;
  s.read(); assert.equal((await s.save(fresh())).kind, "validation"); assert.equal(x.writes.length, 0);
});
test("destroy removes its listener and cancels pending writes", async () => {
  const w = world(), { store, listeners, emit, errors } = w.client(); store.read();
  const release = await holdLock(w.locks), pending = store.save(fresh());
  assert.equal(listeners.size, 1); store.destroy(); assert.equal(listeners.size, 0);
  emit(V2, "anything"); assert.equal(errors.length, 0);
  await release(); assert.equal((await pending).cancelled, true); assert.equal(w.writes.length, 0);
  assert.equal((await store.save(fresh())).kind, "destroyed");
});
test("save without read establishes a safe initial baseline and remains whitelist-only", async () => {
  const w = world({ [V1]: raw(legacy({ old: "data" })) }), { store } = w.client();
  const result = await store.save(fresh({ current: "data" }));
  assert.equal(result.ok, true); assert.equal(result.value.revision, 1);
  assert.ok(w.data.has(V1)); assert.equal(w.writes.length, 1);
});

(async () => {
  for (const { name, run } of tests) {
    await run();
    console.log("PASS local-progress-store:", name);
  }
  console.log(`PASS ${tests.length} local-progress-store program-model tests (not real-browser concurrency tests)`);
})().catch(error => { console.error(error); process.exitCode = 1; });
