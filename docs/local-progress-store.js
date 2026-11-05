"use strict";
/*
 * Local-only whole-snapshot storage. normalize is the application's whitelist and
 * validator: it receives a parsed object and must return a schemaVersion 2 object.
 * No network, migration writes, merge policy, or unsafe no-lock fallback lives here.
 */
(() => {
  const LOCK_PREFIX = "study-progress-store:";
  const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

  function create(options = {}) {
    const key = options.key || "zhixu-study-v2";
    const legacyKey = options.legacyKey || "zhixu-study-v1";
    const normalize = options.normalize;
    const onError = typeof options.onError === "function" ? options.onError : () => {};
    if (typeof key !== "string" || typeof legacyKey !== "string" || key === legacyKey)
      throw new TypeError("新旧存储键必须是不同的字符串");
    if (typeof normalize !== "function") throw new TypeError("缺少学习记录校验函数");

    let locks = null;
    try {
      if (window.navigator && window.navigator.locks &&
          typeof window.navigator.locks.request === "function") locks = window.navigator.locks;
    } catch (_) { /* Reading still works when access to Web Locks is restricted. */ }
    const writeSupported = !!locks;
    const lockName = LOCK_PREFIX + key;
    let initialized = false, baselineKnown = false, destroyed = false;
    let baselineRaw = null, baselineLegacyRaw = null, loadedRaw = null;
    let observedStorage = null, blockedFailure = null, conflicted = false;
    let error = "", kind = "", epoch = 0;
    let tail = Promise.resolve();

    const messages = {
      unsupported: "当前浏览器无法使用安全的跨标签页写锁，学习记录为只读。请使用支持 Web Locks 的浏览器并通过 HTTPS 或 localhost 打开，再重新载入。",
      read: "无法读取本地学习记录，浏览器可能禁止了存储访问。原记录未改动，请检查权限后重新载入。",
      parse: "本地学习记录不是有效的 JSON，已停止自动保存。请先导出原始记录，再确认导入有效备份或重置。",
      conflict: "其他标签页已更改学习记录，本页已停止保存以避免覆盖。请先导出需要保留的记录，再重新载入最新数据。",
      quota: "本地存储空间不足，已停止自动保存，原记录未改动。请导出备份并释放空间，再重新载入或确认恢复保存。",
      write: "浏览器拒绝写入本地学习记录，已停止自动保存，原记录未改动。请检查存储权限，再重新载入或确认恢复保存。",
      lock: "无法取得安全的跨标签页写锁，已停止自动保存，原记录未改动。请检查浏览器权限，再重新载入或确认恢复保存。",
      destroyed: "学习记录存储已关闭，请重新载入后再保存。",
    };

    function fail(type, message = messages[type]) {
      const changed = error !== message || kind !== type;
      error = message;
      kind = type;
      if (changed) {
        // UI callbacks cannot turn a rejected write into an exception/success or
        // make a successful localStorage write look like it failed.
        try { onError(message, type); } catch (_) { /* Error reporting is best effort. */ }
      }
      return { ok: false, error: message, kind: type };
    }
    function block(type, message = messages[type]) {
      // Latch before notifying the UI: its error handler may pause an active
      // timer or even request recovery synchronously. Every already-captured
      // snapshot must be invalid before that handler sees the failure.
      epoch += 1;
      blockedFailure = { ok: false, error: message, kind: type };
      return fail(type, message);
    }
    function clearError() { error = ""; kind = ""; }
    function validationMessage(cause) {
      const detail = cause && typeof cause.message === "string" ? cause.message : "内容不符合要求";
      return "学习记录校验失败：" + detail + "。原记录未改动，请检查备份或重新载入。";
    }
    function capture(value) {
      // Normalize first to strip fields outside the application's whitelist,
      // then copy immediately, before the write ever enters the async queue.
      const normalized = normalize(value);
      if (!normalized || typeof normalized !== "object" || Array.isArray(normalized) ||
          normalized.schemaVersion !== 2) throw new Error("校验结果必须是第 2 版记录");
      const copy = JSON.parse(JSON.stringify(normalized));
      if (!copy || typeof copy !== "object" || Array.isArray(copy) || copy.schemaVersion !== 2)
        throw new Error("校验结果无法保存为第 2 版记录");
      return copy;
    }
    function revisionOf(value) {
      if (!value || typeof value !== "object" || !own(value, "revision")) return 0;
      if (!Number.isSafeInteger(value.revision) || value.revision < 0)
        throw new Error("修订编号无效");
      return value.revision;
    }
    function readResult(value) {
      return { value, error, kind, migrationPending: baselineKnown && baselineRaw === null && baselineLegacyRaw !== null, writeSupported };
    }
    function markConflict() {
      conflicted = true;
      return block("conflict");
    }

    function read() {
      if (destroyed) { fail("destroyed"); return readResult(null); }
      // Explicit reload also discards drafts queued against the previous view.
      epoch += 1;
      initialized = true;
      baselineKnown = false;
      blockedFailure = null;
      conflicted = false;
      clearError();
      try {
        observedStorage = window.localStorage;
        const currentRaw = observedStorage.getItem(key);
        // A present but malformed v2 must never fall back to v1.
        const oldRaw = currentRaw === null ? observedStorage.getItem(legacyKey) : null;
        baselineRaw = currentRaw;
        baselineLegacyRaw = oldRaw;
        loadedRaw = currentRaw === null ? oldRaw : currentRaw;
        baselineKnown = true;
      } catch (_) {
        block("read");
        return readResult(null);
      }
      let value = null;
      if (loadedRaw !== null) {
        let parsed;
        try { parsed = JSON.parse(loadedRaw); }
        catch (_) { block("parse"); return readResult(null); }
        try {
          if (baselineRaw !== null) revisionOf(parsed);
          value = capture(parsed);
        } catch (cause) {
          block("validation", validationMessage(cause));
          return readResult(null);
        }
      }
      if (!writeSupported) block("unsupported");
      return readResult(value);
    }

    function getRaw() {
      try {
        const storage = window.localStorage;
        const currentRaw = storage.getItem(key);
        return currentRaw === null ? storage.getItem(legacyKey) : currentRaw;
      } catch (_) {
        const result = block("read");
        const cause = new Error(result.error);
        cause.kind = result.kind;
        throw cause;
      }
    }

    function enqueue(snapshot, replacing) {
      if (destroyed) return Promise.resolve(fail("destroyed"));
      if (!initialized) read();
      if (replacing) epoch += 1;
      // Ordinary saves cannot silently recover a failed write or replace its
      // diagnostic. Recovery requires an explicit read or successful replace.
      else if (blockedFailure) return Promise.resolve({ ...blockedFailure });
      const generation = epoch;
      let captured;
      try { captured = capture(snapshot); }
      catch (cause) { return Promise.resolve(block("validation", validationMessage(cause))); }
      const cancelled = () => ({ ok: false, cancelled: true });
      const stale = () => destroyed || generation !== epoch;
      const run = async () => {
        if (stale()) return cancelled();
        if (conflicted) return fail("conflict");
        if (!baselineKnown) return block("read");
        if (blockedFailure && !replacing) return { ...blockedFailure };
        if (!writeSupported) return block("unsupported");
        try {
          return await locks.request(lockName, { mode: "exclusive" }, () => {
            if (stale()) return cancelled();
            if (conflicted) return fail("conflict");
            let storage, currentRaw, oldRaw;
            try {
              storage = window.localStorage;
              currentRaw = storage.getItem(key);
              oldRaw = currentRaw === null ? storage.getItem(legacyKey) : null;
            } catch (_) { return block("read"); }
            if (currentRaw !== baselineRaw ||
                (currentRaw === null && oldRaw !== baselineLegacyRaw)) return markConflict();

            let revision = 0;
            if (currentRaw !== null) {
              try { revision = revisionOf(JSON.parse(currentRaw)); }
              catch (cause) {
                // Only a user-confirmed replace can repair the *same* damaged
                // baseline. The raw CAS above still protects other tabs' data.
                if (!replacing) return block("validation", validationMessage(cause));
              }
            }
            if (revision === Number.MAX_SAFE_INTEGER)
              return block("validation", validationMessage(new Error("修订编号已达安全上限")));
            const committed = { ...captured, revision: revision + 1 };
            const serialized = JSON.stringify(committed);
            if (stale()) return cancelled();
            try { storage.setItem(key, serialized); }
            catch (cause) {
              const quota = cause && (cause.name === "QuotaExceededError" ||
                cause.name === "NS_ERROR_DOM_QUOTA_REACHED" || cause.code === 22 || cause.code === 1014);
              return block(quota ? "quota" : "write");
            }
            // Never advance these values before the single atomic setItem succeeds.
            baselineRaw = serialized;
            loadedRaw = serialized;
            blockedFailure = null;
            clearError();
            return { ok: true, value: JSON.parse(serialized) };
          });
        } catch (_) {
          if (stale()) return cancelled();
          return block("lock");
        }
      };
      const result = tail.then(run, run);
      // Serialize this page's writes as well as cross-page lock ownership. A
      // later snapshot compares with our successful earlier commit, not its old
      // revision captured when save was called.
      tail = result.then(() => undefined, () => undefined);
      return result;
    }

    function onStorage(event) {
      if (destroyed || !initialized || !baselineKnown) return;
      if (event.storageArea && observedStorage && event.storageArea !== observedStorage) return;
      if ((event.key === key && event.newValue !== baselineRaw) ||
          (event.key === legacyKey && baselineRaw === null && event.newValue !== baselineLegacyRaw) ||
          (event.key === null && (baselineRaw !== null || baselineLegacyRaw !== null))) markConflict();
    }
    window.addEventListener("storage", onStorage);
    return {
      read,
      getRaw,
      save: snapshot => enqueue(snapshot, false),
      replace: snapshot => enqueue(snapshot, true),
      destroy() {
        destroyed = true;
        epoch += 1;
        window.removeEventListener("storage", onStorage);
      },
      get error() { return error; },
      get kind() { return kind; },
      get writeSupported() { return writeSupported; },
      get migrationPending() { return baselineKnown && baselineRaw === null && baselineLegacyRaw !== null; },
      // The exact last loaded/committed source remains available even if a
      // later permission change prevents getRaw from reading the live key.
      get loadedRaw() { return loadedRaw; },
    };
  }
  window.STUDY_PROGRESS_STORE = Object.freeze({ create });
})();
