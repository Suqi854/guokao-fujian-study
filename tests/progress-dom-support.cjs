"use strict";
// Test-only protocol helpers. Synthetic locks are confined to JSDOM tests;
// Playwright exercises the browser's actual Web Locks implementation.
const assert = require("node:assert/strict");

const CURRENT_KEY = "zhixu-study-v2";
const LEGACY_KEY = "zhixu-study-v1";
const RESTORED_TOAST = "备份已恢复，活动计时保持暂停。";
const RESET_TOAST = "当前新版记录已重置，旧版原文副本未改动。";

function installSerialLocks(window) {
  const queues = new Map();
  Object.defineProperty(window.navigator, "locks", {
    configurable: true,
    value: {
      request(name, options, callback) {
        if (typeof options === "function") { callback = options; options = {}; }
        assert.equal(options.mode || "exclusive", "exclusive");
        assert.equal(typeof callback, "function");
        const result = (queues.get(name) || Promise.resolve()).then(() =>
          callback({ name, mode: "exclusive" }));
        // A rejected owner must release the lock for the next queued request.
        queues.set(name, result.then(() => undefined, () => undefined));
        return result;
      },
    },
  });
}

async function navigateHash(window, target, activate) {
  if (window.location.hash === target) { activate(); return; }
  await new Promise((resolve, reject) => {
    let timer;
    const changed = event => {
      if (new window.URL(event.newURL).hash !== target) return;
      window.removeEventListener("hashchange", changed); clearTimeout(timer); resolve();
    };
    window.addEventListener("hashchange", changed);
    timer = setTimeout(() => { window.removeEventListener("hashchange", changed); reject(Error("Expected actual hash navigation: " + target)); }, 2000);
    activate();
  });
  // Let an application's async hashchange continuation run after the event.
  await new Promise(resolve => setTimeout(resolve, 0));
}

function assertV2Snapshot(snapshot) {
  assert.ok(snapshot && typeof snapshot === "object" && !Array.isArray(snapshot));
  assert.equal(snapshot.schemaVersion, 2);
  assert.ok(Number.isSafeInteger(snapshot.revision) && snapshot.revision >= 0);
  assert.ok(Array.isArray(snapshot.runs));
  assert.ok(Object.hasOwn(snapshot, "activeRun"));
  assert.ok(snapshot.activeRun === null || typeof snapshot.activeRun === "object");
}

function withoutRevision(snapshot) {
  const { revision, ...fields } = snapshot;
  return fields;
}

function assertEmptySnapshot(snapshot) {
  assertV2Snapshot(snapshot);
  assert.deepEqual(withoutRevision(snapshot), {
    schemaVersion: 2, exam: "both", read: [], favorites: [], notes: {},
    attempts: [], drafts: {}, checks: {}, runs: [], activeRun: null,
  });
}

function assertRestored(actual, expected, previousRevision) {
  assertV2Snapshot(actual);
  assertV2Snapshot(expected);
  assert.equal(actual.revision, previousRevision + 1, "restore commits the next local revision");
  assert.deepEqual(withoutRevision(actual), withoutRevision(expected));
}

const legacyBytes = new WeakMap();
async function assertLegacyPageUnchanged(page) {
  assert.ok(legacyBytes.has(page), "capture the legacy fixture before checking preservation");
  assert.equal(await page.evaluate(key => localStorage.getItem(key), LEGACY_KEY), legacyBytes.get(page), "legacy source bytes must remain unchanged");
}

async function seedPageLegacy(page, legacy) {
  assert.equal(legacy.schemaVersion, 1);
  const raw = JSON.stringify(legacy);
  // Fixture setup only, never used for backup restoration. A reload discards
  // the previous test flow's queued edits; the following reload establishes
  // the seeded raw baseline before any user action is dispatched.
  await page.reload();
  await page.evaluate(({ raw, key, legacyKey }) => {
    localStorage.removeItem(key);
    localStorage.setItem(legacyKey, raw);
  }, { raw, key: CURRENT_KEY, legacyKey: LEGACY_KEY });
  legacyBytes.set(page, raw);
  await page.reload();
  assert.equal(await page.evaluate(key => localStorage.getItem(key), CURRENT_KEY), null, "reading a v1 fixture must not eagerly migrate it");
  await assertLegacyPageUnchanged(page);
}

async function readPageProgress(page) {
  // A real lock barrier waits for all saves already queued by this page before
  // reading, rather than assuming the UI event's synchronous render was a commit.
  await page.evaluate(key => {
    if (!navigator.locks?.request) throw Error("Browser regression requires real Web Locks");
    return navigator.locks.request("study-progress-store:" + key, {mode:"exclusive"}, () => {});
  }, CURRENT_KEY);
  await page.waitForFunction(key => localStorage.getItem(key) !== null, CURRENT_KEY);
  const snapshot = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), CURRENT_KEY);
  assertV2Snapshot(snapshot);
  if (legacyBytes.has(page)) await assertLegacyPageUnchanged(page);
  return snapshot;
}

async function resetPageProgress(page) {
  const legacy = await page.evaluate(key => localStorage.getItem(key), LEGACY_KEY);
  if (legacyBytes.has(page)) await assertLegacyPageUnchanged(page);
  else legacyBytes.set(page, legacy);
  await page.goto(page.url().split("#")[0] + "#settings");
  const before = await page.evaluate(key => JSON.parse(localStorage.getItem(key)), CURRENT_KEY);
  if (before) assertV2Snapshot(before);
  page.once("dialog", dialog => dialog.accept());
  await page.locator('[data-action="reset"]').click();
  await page.locator("#toast").filter({ hasText: RESET_TOAST }).waitFor({ state: "visible" });
  const empty = await readPageProgress(page);
  assertEmptySnapshot(empty);
  assert.equal(empty.revision, (before?.revision || 0) + 1);
  await assertLegacyPageUnchanged(page);
  return empty;
}

async function assertPageRestored(page, expected, previousRevision) {
  await page.locator("#toast").filter({ hasText: RESTORED_TOAST }).waitFor({ state: "visible" });
  const actual = await readPageProgress(page);
  assertRestored(actual, expected, previousRevision);
  await assertLegacyPageUnchanged(page);
}

module.exports = {
  CURRENT_KEY, LEGACY_KEY, RESTORED_TOAST, RESET_TOAST,
  installSerialLocks, navigateHash, assertV2Snapshot, withoutRevision, assertEmptySnapshot,
  assertRestored, seedPageLegacy, readPageProgress, resetPageProgress,
  assertPageRestored, assertLegacyPageUnchanged,
};
