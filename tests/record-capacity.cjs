"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const { test } = require("node:test");
const C = require("../docs/record-capacity.js");
const ISO = "2026-11-05T00:00:00.000Z";
const EXTENDED_ISO = "+275760-09-13T00:00:00.000Z";
const fresh = () => ({ schemaVersion: 2, revision: 0, attempts: [], notes: {} });
const attempt = Object.freeze({ qid: "example", choice: 0, at: ISO, seconds: 1 });
const actualBytes = text => Buffer.byteLength(text, "utf8");

// Fixtures intentionally have no question bank or application runtime. Only one
// boundary test creates a 49,999-element array of nulls (about 250 KiB serialized).
test("fixed production caps; test injection can only reduce them", () => {
  assert.equal(C.MAX_FILE_BYTES, 10485760);
  assert.equal(C.MAX_ATTEMPTS, 50000);
  assert.equal(C.maxFileBytes, C.MAX_FILE_BYTES);
  assert.equal(C.maxAttempts, C.MAX_ATTEMPTS);
  assert.ok(Object.isFrozen(C));
  for (const config of [{ maxFileBytes: 10485761 }, { maxAttempts: 50001 }, { maxFileBytes: 0 }, { maxAttempts: 1.5 }, { maxAttempts: Infinity }, { unknown: 1 }, null])
    assert.throws(() => C.createPolicy(config));
  assert.equal(C.createPolicy({ maxFileBytes: 200, maxAttempts: 2 }).maxFileBytes, 200);
});

test("49,999 -> 50,000 allowed; 50,000 -> 50,001 refused before mutation", () => {
  const state = { attempts: new Array(49999).fill(null) };
  const source = state.attempts;
  const allowed = C.assess(state, { additionalAttempt: attempt });
  assert.equal(allowed.ok, true);
  assert.equal(allowed.attemptCount, 50000);
  assert.equal(allowed.nearLimit, true);
  assert.equal(state.attempts, source);
  assert.equal(source.length, 49999);
  // This represents the caller's successful commit, not a capacity-module write.
  source.push(attempt);
  const last = source[49999];
  const refused = C.assess(state, { additionalAttempt: attempt });
  assert.deepEqual(refused, { ok: false, reason: "attempt-limit", bytes: null, nearLimit: true, attemptCount: 50001 });
  assert.equal(state.attempts, source);
  assert.equal(source.length, 50000);
  assert.equal(source[49999], last);
});

test("count warning starts at 90%; a lowered cap is equally enforced", () => {
  const policy = C.createPolicy({ maxAttempts: 10 });
  const state = { attempts: new Array(8).fill(null) };
  assert.equal(policy.assess(state).nearLimit, false);
  assert.equal(policy.assess(state, { additionalAttempt: {} }).nearLimit, true);
  assert.equal(policy.assess({ attempts: new Array(10).fill(null) }).ok, true);
  assert.equal(policy.assess({ attempts: new Array(10).fill(null) }, { additionalAttempt: {} }).reason, "attempt-limit");
  assert.throws(() => policy.serializeBackup({ attempts: new Array(11).fill(null) }, ISO), { code: "attempt-limit" });
});

test("UTF-8 matches native byte length for ASCII, Chinese, astral, combining and lone surrogates", () => {
  for (const text of ["", "abc", "中文", "é", "e\u0301", "😀𠮷", "\ud800", "\udfff", "\ud800x\udfff", "\ud800\ud800\udc00", "\0\n\t\"\\"]) {
    assert.equal(C.utf8Bytes(text), actualBytes(text));
    assert.equal(C.utf8Bytes(text), new TextEncoder().encode(text).length);
  }
  assert.throws(() => C.utf8Bytes(null), TypeError);
});

test("assessment exact byte boundary is inclusive, counts UTF-8, and does not truncate", () => {
  const state = { ...fresh(), notes: { text: "中文😀" } };
  const before = JSON.stringify(state);
  const measured = C.assess(state).bytes;
  const equal = C.createPolicy({ maxFileBytes: measured });
  const below = C.createPolicy({ maxFileBytes: measured - 1 });
  assert.equal(equal.assess(state).ok, true);
  assert.equal(below.assess(state).ok, false);
  assert.equal(below.assess(state).reason, "file-limit");
  assert.equal(below.assess(state).bytes, measured);
  assert.equal(JSON.stringify(state), before);
  const oneExtraHan = { ...state, notes: { text: state.notes.text + "文" } };
  assert.equal(C.assess(oneExtraHan).bytes - measured, 3);
});

test("byte warning starts at exactly 90%", () => {
  const state = fresh();
  const initial = C.assess(state).bytes;
  const withText = { ...state, padding: "" };
  const base = C.assess(withText).bytes;
  const target = Math.ceil(Math.max(initial, base) / 9) * 9;
  withText.padding = "x".repeat(target - base);
  const policy = C.createPolicy({ maxFileBytes: target / 9 * 10 });
  assert.equal(policy.assess(withText).bytes, target);
  assert.equal(policy.assess(withText).nearLimit, true);
  withText.padding = withText.padding.slice(0, -1);
  assert.equal(policy.assess(withText).nearLimit, false);
});

test("assessment reserves enough for max-safe revision growth and longest ISO time", () => {
  const state = fresh();
  const projected = C.assess(state, { additionalAttempt: attempt });
  const future = { ...state, revision: Number.MAX_SAFE_INTEGER, attempts: [attempt] };
  const exported = C.serializeBackup(future, EXTENDED_ISO);
  assert.ok(projected.bytes >= actualBytes(exported));
  assert.ok(C.assess({ attempts: [] }).bytes >= actualBytes(C.serializeBackup({ revision: Number.MAX_SAFE_INTEGER, attempts: [] }, EXTENDED_ISO)));
  assert.equal(state.revision, 0);
  assert.equal(state.attempts.length, 0);
  assert.equal(Object.hasOwn(state, "exportedAt"), false);
});

test("normal export is compact JSON and preserves all application fields", () => {
  const state = { ...fresh(), custom: { text: "中\n文\ud800", list: [true, null, -0, 2.3] }, exportedAt: "old" };
  const before = JSON.stringify(state);
  const output = C.serializeBackup(state, ISO);
  const parsed = JSON.parse(output);
  assert.equal(output, JSON.stringify(parsed));
  assert.equal(parsed.exportedAt, ISO);
  assert.equal(parsed.custom.text, state.custom.text);
  assert.deepEqual(Object.keys(parsed).sort(), Object.keys(state).sort());
  assert.equal(JSON.stringify(state), before);
  assert.equal(output.includes("\n"), false);
});

test("normal export and import File.size gate use the same actual UTF-8 cap", () => {
  const state = { ...fresh(), notes: { text: "😀汉字" } };
  const expected = C.serializeBackup(state, ISO);
  const size = actualBytes(expected);
  const policy = C.createPolicy({ maxFileBytes: size });
  const backup = policy.serializeBackup(state, ISO);
  // The browser importer must use file.size > policy.maxFileBytes, not .length.
  const importedFileSize = new Blob([backup]).size;
  assert.equal(importedFileSize, size);
  assert.ok(importedFileSize <= policy.maxFileBytes);
  assert.ok(backup.length < importedFileSize);
  assert.throws(() => C.createPolicy({ maxFileBytes: size - 1 }).serializeBackup(state, ISO), error =>
    error instanceof C.CapacityError && error.code === "file-limit" && error.bytes === size && error.limit === size - 1);
  const oversized = { ...state, notes: { text: state.notes.text + "汉" } };
  assert.throws(() => policy.serializeBackup(oversized, ISO), { code: "file-limit" });
  assert.equal(state.notes.text, "😀汉字");
});

test("export checks actual bytes, not new-save reserve, so older near-cap data can be backed up", () => {
  const state = fresh();
  const exact = actualBytes(C.serializeBackup(state, ISO));
  const policy = C.createPolicy({ maxFileBytes: exact });
  assert.equal(policy.assess(state).reason, "file-limit");
  assert.equal(actualBytes(policy.serializeBackup(state, ISO)), exact);
});

test("frozen source and proposed attempt remain unchanged", () => {
  const notes = Object.freeze({ text: "保留" });
  const attempts = Object.freeze([]);
  const state = Object.freeze({ schemaVersion: 2, revision: 0, notes, attempts });
  assert.equal(C.assess(state, { additionalAttempt: attempt }).ok, true);
  assert.equal(JSON.parse(C.serializeBackup(state, ISO)).notes.text, "保留");
  assert.equal(state.notes, notes);
  assert.equal(state.attempts, attempts);
  assert.equal(Object.hasOwn(state, "exportedAt"), false);
});

test("does not validate app schema, question IDs or migrate v1/v2 roots", () => {
  const arbitrary = { schemaVersion: 999, attempts: [{ futureShape: "no question bank lookup" }] };
  assert.equal(C.assess(arbitrary).ok, true);
  const old = { schemaVersion: 1, attempts: [] };
  const exported = JSON.parse(C.serializeBackup(old, ISO));
  assert.equal(exported.schemaVersion, 1);
  assert.equal(Object.hasOwn(exported, "revision"), false);
  assert.equal(Object.hasOwn(old, "revision"), false);
});

test("malformed structures, cycles and lossy JSON types fail explicitly", () => {
  const cyclic = fresh(); cyclic.self = cyclic;
  const sparse = []; sparse.length = 1;
  const extras = []; extras.foo = "would otherwise disappear";
  const cases = [null, [], {}, { attempts: null }, { attempts: {} }, { attempts: sparse }, { attempts: extras },
    { attempts: [], invalid: undefined }, { attempts: [], invalid: NaN }, { attempts: [], invalid: Infinity },
    { attempts: [], invalid: 1n }, { attempts: [], invalid: () => 1 }, { attempts: [], invalid: Symbol("x") },
    { attempts: [], invalid: new Date(ISO) }, cyclic];
  for (const state of cases) {
    assert.equal(C.assess(state).ok, false);
    assert.equal(C.assess(state).reason, "invalid-structure");
    assert.throws(() => C.serializeBackup(state, ISO), { code: "invalid-structure" });
  }
  for (const additionalAttempt of [null, undefined, 1, "x", [], new Date(ISO)])
    assert.equal(C.assess(fresh(), { additionalAttempt }).reason, "invalid-structure");
});

test("does not execute getters or toJSON hooks", () => {
  let calls = 0;
  const getter = fresh(); Object.defineProperty(getter, "text", { enumerable: true, get() { calls++; return "bad"; } });
  const serializer = fresh(); serializer.toJSON = () => { calls++; return {}; };
  const hiddenSerializer = fresh(); Object.defineProperty(hiddenSerializer, "toJSON", { value() { calls++; return {}; } });
  const getterAttempts = {}; Object.defineProperty(getterAttempts, "attempts", { enumerable: true, get() { calls++; return []; } });
  for (const state of [getter, serializer, hiddenSerializer, getterAttempts]) {
    assert.equal(C.assess(state).reason, "invalid-structure");
    assert.throws(() => C.serializeBackup(state, ISO), { code: "invalid-structure" });
  }
  const options = {}; Object.defineProperty(options, "additionalAttempt", { get() { calls++; return {}; } });
  assert.equal(C.assess(fresh(), options).reason, "invalid-structure");
  assert.equal(calls, 0);
});

test("shared references are allowed without treating them as cycles", () => {
  const shared = { message: "重复引用不是循环" };
  const state = { attempts: [], one: shared, two: shared };
  assert.equal(C.assess(state).ok, true);
  const output = JSON.parse(C.serializeBackup(state, ISO));
  assert.deepEqual(output.one, output.two);
});

test("__proto__ remains own JSON data, without prototype pollution", () => {
  const state = JSON.parse('{"attempts":[],"__proto__":{"polluted":true}}');
  const output = JSON.parse(C.serializeBackup(state, ISO));
  assert.equal(Object.hasOwn(output, "__proto__"), true);
  assert.equal(output.__proto__.polluted, true);
  assert.equal({}.polluted, undefined);
});

test("invalid export timestamp is explicit; standard and extended ISO are accepted", () => {
  for (const value of [null, undefined, "", "2026-11-05", "2026-11-05T00:00:00Z", new Date(ISO), "x".repeat(100)])
    assert.throws(() => C.serializeBackup(fresh(), value), { code: "invalid-exported-at" });
  assert.equal(JSON.parse(C.serializeBackup(fresh(), EXTENDED_ISO)).exportedAt, EXTENDED_ISO);
});

test("classic browser script works with no Node, TextEncoder, storage or network", () => {
  const source = fs.readFileSync(require.resolve("../docs/record-capacity.js"), "utf8");
  const context = vm.createContext({});
  vm.runInContext(source, context);
  assert.equal(vm.runInContext("STUDY_RECORD_CAPACITY.MAX_FILE_BYTES", context), 10485760);
  assert.equal(vm.runInContext("STUDY_RECORD_CAPACITY.assess({attempts:[],notes:{x:'中文😀'}}).ok", context), true);
  const output = vm.runInContext(`STUDY_RECORD_CAPACITY.serializeBackup({attempts:[]}, ${JSON.stringify(ISO)})`, context);
  assert.equal(JSON.parse(output).exportedAt, ISO);
  assert.equal(vm.runInContext("STUDY_RECORD_CAPACITY.utf8Bytes('中文😀')", context), 10);
});
