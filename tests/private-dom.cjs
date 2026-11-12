"use strict";
// jsdom tests do not establish browser CSP enforcement, download, layout or real locks.
const assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path");
const root = path.join(__dirname, ".."), mainRoot = process.env.STUDY_REPO_ROOT || path.join(root, "../guokao-cloud");
let JSDOM, VirtualConsole;
try { ({ JSDOM, VirtualConsole } = require("jsdom")); }
catch (_) { ({ JSDOM, VirtualConsole } = require(path.join(mainRoot, "node_modules/jsdom"))); }
const html = fs.readFileSync(path.join(root, "docs/private-library.html"), "utf8");
const example = JSON.parse(fs.readFileSync(path.join(root, "docs/private-format-example.json"), "utf8"));
const clone = x => JSON.parse(JSON.stringify(x)), pause = () => new Promise(r => setTimeout(r, 0));
const tests = [], test = (name, run) => tests.push([name, run]);
function fixture({ noLocks = false, seed = {} } = {}) {
  const errors = [], requests = [], downloads = [], vc = new VirtualConsole(); vc.on("jsdomError", e => errors.push(e.message));
  const dom = new JSDOM(html, { url: "https://private.example/private-library.html", runScripts: "outside-only", virtualConsole: vc });
  const w = dom.window, d = w.document;
  w.TextEncoder = TextEncoder; w.Blob = Blob; w.confirm = () => true;
  const outgoing = (...x) => { requests.push(x); throw new Error("No outgoing content allowed"); };
  w.fetch = outgoing; w.XMLHttpRequest = outgoing; w.WebSocket = outgoing; w.navigator.sendBeacon = outgoing;
  const blobs = new Map(); let count = 0;
  w.URL.createObjectURL = blob => { const id = "blob:test-" + (++count); blobs.set(id, blob); return id; };
  w.URL.revokeObjectURL = () => {};
  w.HTMLAnchorElement.prototype.click = function () { if (this.download) downloads.push({ name: this.download, blob: blobs.get(this.href) }); };
  let tail = Promise.resolve(), gate = Promise.resolve(), release;
  if (!noLocks) Object.defineProperty(w.navigator, "locks", { value: { request(name, opts, fn) { const job = tail.then(() => gate).then(fn); tail = job.catch(() => {}); return job; } } });
  for (const [k, v] of Object.entries(seed)) w.localStorage.setItem(k, v);
  w.STUDY_CONTENT = Object.freeze({ questions: Object.freeze([{ id: "q1", meta: { source: "original" } }]) });
  for (const name of ["local-progress-store.js", "private-library.js", "private-workspace-clean.js"]) w.eval(fs.readFileSync(path.join(root, "docs", name), "utf8"));
  const $ = s => d.querySelector(s), change = el => el.dispatchEvent(new w.Event("change", { bubbles: true }));
  return { w, d, $, errors, requests, downloads,
    hold() { gate = new Promise(r => { release = r; }); }, release() { release(); },
    async pick(p, file = null) {
      const text = JSON.stringify(p), f = file || { size: Buffer.byteLength(text), text: async () => text };
      Object.defineProperty($("#private-file"), "files", { configurable: true, value: [f] }); change($("#private-file")); await pause();
    },
    async confirm() { $("#private-rights").checked = true; change($("#private-rights")); $("#private-confirm").click(); await pause(); },
    change, close() { w.privateWorkspace.destroy(); assert.deepEqual(errors, []); assert.deepEqual(requests, []); dom.window.close(); },
  };
}

test("selecting a valid file previews without a write; cancel fully resets", async () => {
  const x = fixture(); try {
    await x.pick(example); assert.equal(x.$("#private-preview").hidden, false); assert.equal(x.w.localStorage.length, 0);
    assert.equal(x.$("#private-confirm").disabled, true); x.$("#private-cancel").click();
    assert.equal(x.$("#private-preview").hidden, true); assert.equal(x.$("#private-rights").checked, false);
    assert.equal(x.w.localStorage.length, 0); assert.match(x.$("#private-status").textContent, /已取消/);
  } finally { x.close(); }
});
test("HTML/script/event/url payloads in every content surface remain inert literal text", async () => {
  const x = fixture(); try {
    const p = clone(example), evil = '<img src="https://evil.test/x" onerror="window.pwned=1"><script>window.pwned=1</script>';
    p.title = evil; p.sourceNote = evil; p.materials[0].title = evil; p.materials[0].text = evil;
    p.questions[0].stem = evil; p.questions[0].module = evil.slice(0, 70); p.questions[0].options[0] = evil; p.questions[0].explanation = evil;
    p.papers[0].title = evil; p.papers[0].sourceNote = evil; p.papers[0].sections[0].title = evil;
    await x.pick(p); await x.confirm();
    assert.equal(x.$("#private-preview").hidden, true); assert.equal(x.w.pwned, undefined);
    assert.equal(x.$("#private-reader").querySelectorAll("img,script,iframe,svg,a,[onerror]").length, 0);
    assert.ok(x.$("#private-reader").textContent.includes(evil));
    x.$("#private-paper").value = "0"; x.change(x.$("#private-paper"));
    assert.equal(x.$("#private-reader").querySelectorAll("img,script,iframe,svg,a,[onerror]").length, 0);
    assert.equal(x.w.STUDY_CONTENT.questions.length, 1); assert.equal(x.w.STUDY_CONTENT.questions[0].meta.source, "original");
  } finally { x.close(); }
});
test("question navigation keeps temporary answers; refresh does not claim persistence", async () => {
  const x = fixture(); try {
    await x.pick(example); await x.confirm(); const radio = x.$('input[name="private-answer"][value="2"]'); radio.checked = true; x.change(radio);
    x.$("#private-next").click(); assert.ok(x.$("#private-reader textarea"));
    const textarea = x.$("#private-reader textarea"); textarea.value = "临时作文"; textarea.dispatchEvent(new x.w.Event("input"));
    x.$("#private-prev").click(); assert.equal(x.$('input[name="private-answer"][value="2"]').checked, true);
    x.$("#private-next").click(); assert.equal(x.$("#private-reader textarea").value, "临时作文");
    assert.ok(!x.w.localStorage.getItem(x.w.PRIVATE_LIBRARY.KEY).includes("临时作文"));
    assert.match(x.d.body.textContent, /刷新、离开或关闭页面即丢失/);
  } finally { x.close(); }
});
test("late file read cannot resurrect canceled or newer preview", async () => {
  const x = fixture(); try {
    let resolve;
    await x.pick(example, { size: 100, text: () => new Promise(r => { resolve = r; }) });
    x.$("#private-cancel").click(); resolve(JSON.stringify(example)); await pause();
    assert.equal(x.$("#private-preview").hidden, true);
    let oldResolve;
    await x.pick(example, { size: 100, text: () => new Promise(r => { oldResolve = r; }) });
    const newer = clone(example); newer.packId = "newer"; await x.pick(newer); oldResolve("bad json"); await pause();
    assert.equal(x.$("#private-preview").hidden, false); await x.confirm();
    assert.equal(x.w.privateWorkspace.repo.snapshot().packs[0].packId, "newer");
  } finally { x.close(); }
});
test("oversized file is rejected before reading; false declared size still validated", async () => {
  const x = fixture(); try {
    let reads = 0; await x.pick(null, { size: 2 * 1024 * 1024 + 1, text: async () => { reads++; return "{}"; } });
    assert.equal(reads, 0); assert.equal(x.$("#private-preview").hidden, true);
    await x.pick(null, { size: 1, text: async () => " ".repeat(2 * 1024 * 1024 + 1) });
    assert.match(x.$("#private-status").textContent, /2 MiB/); assert.equal(x.w.localStorage.length, 0);
  } finally { x.close(); }
});
test("repeated confirmation while lock waits commits once and leaves current navigation", async () => {
  const x = fixture(); try {
    await x.pick(example); x.hold(); await x.confirm(); assert.equal(x.$("#private-confirm").disabled, true);
    assert.equal(x.$("#private-cancel").disabled, true); x.$("#private-cancel").click();
    assert.ok(!x.$("#private-status").textContent.includes("已取消"));
    await x.confirm(); x.release(); await pause(); await pause();
    assert.equal(x.w.privateWorkspace.repo.snapshot().revision, 1); assert.equal(x.w.privateWorkspace.repo.snapshot().packs.length, 1);
  } finally { x.close(); }
});
test("export uses a private filename and round-trippable blob, never includes study data", async () => {
  const x = fixture({ seed: { "zhixu-study-v1": "old exact data", "zhixu-study-v2": "new exact data" } }); try {
    await x.pick(example); await x.confirm(); x.$("#private-export").click();
    assert.equal(x.downloads.length, 1); assert.match(x.downloads[0].name, /^zhixu-private-backup-/);
    const text = await x.downloads[0].blob.text(); assert.equal(x.w.PRIVATE_LIBRARY.parse(text).length, 1);
    assert.ok(!text.includes("old exact data")); assert.ok(!text.includes("new exact data"));
    assert.equal(x.w.localStorage.getItem("zhixu-study-v1"), "old exact data"); assert.equal(x.w.localStorage.getItem("zhixu-study-v2"), "new exact data");
  } finally { x.close(); }
});
test("missing locks and corrupt storage never show successful persistence", async () => {
  for (const config of [{ noLocks: true }, { seed: { "zhixu-private-library-v1": "bad JSON" } }]) {
    const x = fixture(config); try {
      assert.equal(x.$("#private-file").disabled, true); assert.equal(x.$("#private-confirm").disabled, true);
      assert.match(x.$("#private-status").textContent, /只读|损坏或格式不兼容/);
      assert.ok(!x.$("#private-status").textContent.includes("已保存"));
    } finally { x.close(); }
  }
});
test("deletion cancel keeps content and confirm only removes private package", async () => {
  const x = fixture({ seed: { "zhixu-study-v2": "sentinel" } }); try {
    await x.pick(example); await x.confirm(); x.w.confirm = () => false; x.$("#private-remove").click(); await pause();
    assert.equal(x.w.privateWorkspace.repo.snapshot().packs.length, 1);
    x.w.confirm = () => true; x.$("#private-remove").click(); await pause();
    assert.equal(x.w.privateWorkspace.repo.snapshot().packs.length, 0); assert.equal(x.w.localStorage.getItem("zhixu-study-v2"), "sentinel");
  } finally { x.close(); }
});
test("component destruction during file read does not commit or update detached UI", async () => {
  const x = fixture(); let resolve;
  await x.pick(example, { size: 100, text: () => new Promise(r => { resolve = r; }) });
  x.w.privateWorkspace.destroy(); resolve(JSON.stringify(example)); await pause();
  assert.equal(x.w.localStorage.length, 0); assert.deepEqual(x.requests, []); x.w.close();
});

(async () => { for (const [name, run] of tests) { await run(); console.log("PASS " + name); } console.log(`PASS ${tests.length} private DOM tests (not browser QA)`); })().catch(e => { console.error(e); process.exitCode = 1; });
