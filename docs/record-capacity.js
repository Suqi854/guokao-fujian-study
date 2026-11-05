/* Pure capacity checks only. No app-content validation, storage, truncation or I/O. */
(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.STUDY_RECORD_CAPACITY = api;
})(typeof globalThis === "object" ? globalThis : this, function () {
  "use strict";
  const MAX_FILE_BYTES = 10 * 1024 * 1024;
  const MAX_ATTEMPTS = 50000;
  // Date.toISOString() uses at most 27 ASCII bytes, including extended years.
  const RESERVED_EXPORTED_AT = "+275760-09-13T00:00:00.000Z";
  // Enough for adding/replacing `revision` with any nonnegative safe integer.
  // Applied only to assessment, never emitted into the backup or the state.
  const REVISION_RESERVE_BYTES = 32;
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

  class CapacityError extends Error {
    constructor(code, message, details) {
      super(message);
      this.name = "CapacityError";
      this.code = code;
      Object.assign(this, details || {});
    }
  }
  const invalid = () => new CapacityError("invalid-structure", "记录必须是可完整序列化的普通 JSON 数据，且 attempts 必须是数组。");

  function utf8Bytes(value) {
    if (typeof value !== "string") throw new TypeError("UTF-8 字节计数只接受字符串。");
    // Same byte count as TextEncoder/Blob, including replacement of lone surrogates.
    let bytes = 0;
    for (let i = 0; i < value.length; i++) {
      const c = value.charCodeAt(i);
      if (c < 0x80) bytes++;
      else if (c < 0x800) bytes += 2;
      else if (c >= 0xd800 && c <= 0xdbff && i + 1 < value.length &&
          value.charCodeAt(i + 1) >= 0xdc00 && value.charCodeAt(i + 1) <= 0xdfff) {
        bytes += 4; i++;
      } else bytes += 3;
    }
    return bytes;
  }

  function plain(value) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
    const proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
  }
  function attemptsOf(state) {
    if (!plain(state)) throw invalid();
    const descriptor = Object.getOwnPropertyDescriptor(state, "attempts");
    if (!descriptor || !own(descriptor, "value") || !descriptor.enumerable || !Array.isArray(descriptor.value)) throw invalid();
    return descriptor.value;
  }

  // Structural JSON safety only. In particular, never invoke getters/toJSON or
  // silently discard unsupported values. Application schema validation stays external.
  function assertJsonData(value, ancestors, depth) {
    if (value === null || typeof value === "string" || typeof value === "boolean") return;
    if (typeof value === "number" && Number.isFinite(value)) return;
    if (typeof value !== "object" || depth > 100 || ancestors.has(value)) throw invalid();
    const array = Array.isArray(value);
    if (array ? Object.getPrototypeOf(value) !== Array.prototype : !plain(value)) throw invalid();
    ancestors.add(value);
    try {
      const descriptors = Object.getOwnPropertyDescriptors(value);
      // JSON.stringify consults toJSON even when it is not enumerable.
      for (let proto = value; proto; proto = Object.getPrototypeOf(proto)) {
        const method = Object.getOwnPropertyDescriptor(proto, "toJSON");
        if (method && (!own(method, "value") || typeof method.value === "function")) throw invalid();
      }
      const keys = Reflect.ownKeys(descriptors);
      if (array && keys.filter(key => key !== "length").length !== value.length) throw invalid();
      for (const key of keys) {
        const entry = descriptors[key];
        if (array && key === "length") continue;
        if (!entry.enumerable) {
          if (array) throw invalid();
          continue;
        }
        if (typeof key !== "string" || !own(entry, "value")) throw invalid();
        if (array && (!/^(0|[1-9]\d*)$/.test(key) || Number(key) >= value.length)) throw invalid();
        assertJsonData(entry.value, ancestors, depth + 1);
      }
    } finally { ancestors.delete(value); }
  }
  function ensureJsonData(value) { assertJsonData(value, new WeakSet(), 0); }
  function cloneRoot(state, attempts, exportedAt) {
    // Define properties rather than assigning them, so __proto__ stays ordinary data.
    const copy = Object.create(null);
    for (const key of Object.keys(state)) {
      if (key === "attempts" || key === "exportedAt") continue;
      Object.defineProperty(copy, key, { value: state[key], enumerable: true });
    }
    copy.attempts = attempts;
    copy.exportedAt = exportedAt;
    return copy;
  }
  function timestampOK(value) {
    if (typeof value !== "string" || value.length > RESERVED_EXPORTED_AT.length) return false;
    try { return new Date(value).toISOString() === value; } catch (_) { return false; }
  }

  function createPolicy(options) {
    const supplied = options === undefined ? {} : options;
    if (!plain(supplied) || Object.keys(supplied).some(key => !["maxFileBytes", "maxAttempts"].includes(key)))
      throw new TypeError("容量策略只能降低 maxFileBytes 或 maxAttempts。");
    const maxFileBytes = supplied.maxFileBytes === undefined ? MAX_FILE_BYTES : supplied.maxFileBytes;
    const maxAttempts = supplied.maxAttempts === undefined ? MAX_ATTEMPTS : supplied.maxAttempts;
    if (!Number.isSafeInteger(maxFileBytes) || maxFileBytes < 1 || maxFileBytes > MAX_FILE_BYTES ||
        !Number.isSafeInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > MAX_ATTEMPTS)
      throw new RangeError("容量策略不能放宽生产上限。");

    function assess(state, options) {
      let attemptCount = null;
      try {
        const attempts = attemptsOf(state);
        const opts = options === undefined ? {} : options;
        if (!plain(opts)) throw invalid();
        const addition = Object.getOwnPropertyDescriptor(opts, "additionalAttempt");
        if (addition && (!own(addition, "value") || !plain(addition.value))) throw invalid();
        attemptCount = attempts.length + (addition ? 1 : 0);
        if (attemptCount > maxAttempts)
          return { ok: false, reason: "attempt-limit", bytes: null, nearLimit: true, attemptCount };
        ensureJsonData(state);
        if (addition) ensureJsonData(addition.value);
        const projectedAttempts = addition ? attempts.concat([addition.value]) : attempts;
        const json = JSON.stringify(cloneRoot(state, projectedAttempts, RESERVED_EXPORTED_AT));
        const bytes = utf8Bytes(json) + REVISION_RESERVE_BYTES;
        return {
          ok: bytes <= maxFileBytes,
          reason: bytes <= maxFileBytes ? null : "file-limit",
          bytes,
          nearLimit: bytes >= maxFileBytes * 0.9 || attemptCount >= maxAttempts * 0.9,
          attemptCount
        };
      } catch (_) {
        return { ok: false, reason: "invalid-structure", bytes: null, nearLimit: false, attemptCount };
      }
    }

    function serializeBackup(snapshot, exportedAt) {
      let attempts;
      try { attempts = attemptsOf(snapshot); ensureJsonData(snapshot); }
      catch (_) { throw invalid(); }
      if (attempts.length > maxAttempts)
        throw new CapacityError("attempt-limit", "答题记录已超过允许上限，原记录未截断；请使用存储原文应急备份。", { attemptCount: attempts.length, limit: maxAttempts });
      if (!timestampOK(exportedAt))
        throw new CapacityError("invalid-exported-at", "备份时间必须是有效的 ISO 时间字符串。");
      const json = JSON.stringify(cloneRoot(snapshot, attempts, exportedAt));
      const bytes = utf8Bytes(json);
      if (bytes > maxFileBytes)
        throw new CapacityError("file-limit", "学习记录备份超过文件上限，原记录未截断；请使用存储原文应急备份。", { bytes, limit: maxFileBytes, attemptCount: attempts.length });
      return json;
    }

    return Object.freeze({ assess, serializeBackup, maxFileBytes, maxAttempts });
  }
  return Object.freeze({ MAX_FILE_BYTES, MAX_ATTEMPTS, REVISION_RESERVE_BYTES, utf8Bytes, CapacityError, createPolicy, ...createPolicy() });
});
