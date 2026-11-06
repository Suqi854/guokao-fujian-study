'use strict';
// Execute the actual index/long-mock scripts with synthetic data and locks.
// This checks rendered application flows, not native downloads, mobile pixels,
// physical storage durability, or real simultaneous browser tabs.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const { installSerialLocks, navigateHash, withoutRevision } = require('./progress-dom-support.cjs');
const root = path.join(__dirname, '..');
const baseline = require('./fixtures/v036-public-identities.json');
const plain = value => JSON.parse(JSON.stringify(value));
const chars = value => [...value.replace(/\s/gu, '')].length;
const pause = () => new Promise(resolve => setTimeout(resolve, 8));
const targets = ['multi-material', 'full-essay'];
const policyLesson = 'fujian-enterprise-service-2025';
const legacy = {
  schemaVersion: 1, exam: 'fujian', read: targets, favorites: ['multi-material'],
  notes: { 'multi-material': 'synthetic v1 material note', 'full-essay': 'synthetic v1 essay note' },
  attempts: [{ qid: 'q51', choice: 0, at: '2026-11-04T12:00:00Z', seconds: 8 }],
  drafts: { w01: 'synthetic retained v1 writing draft' }, checks: { w01: [0] }
};
const legacyRaw = JSON.stringify(legacy);
const alive = new Set();
function setup({ page = 'index.html', v2 = null } = {}) {
  const html = fs.readFileSync(path.join(root, 'docs', page), 'utf8');
  const errors = [], outgoing = [], calls = [], vc = new VirtualConsole();
  vc.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(html, { url: 'https://candidate.example/' + page, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  alive.add(dom);
  const w = dom.window, d = w.document, isMain = page === 'index.html';
  installSerialLocks(w); w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {};
  w.TextEncoder = TextEncoder; w.Blob = Blob; w.File = File; w.confirm = () => true;
  w.fetch = (...args) => { outgoing.push(args); throw Error('Unexpected network request'); };
  let now = Date.parse('2026-11-05T22:00:00Z'), exported = null;
  w.Date.now = () => now; w.setInterval = () => 1;
  w.URL.createObjectURL = blob => { exported = blob; return 'blob:synthetic-v038'; }; w.URL.revokeObjectURL = () => {};
  const nativeClick = w.HTMLAnchorElement.prototype.click;
  w.HTMLAnchorElement.prototype.click = function () { if (!this.download) nativeClick.call(this); };
  const originals = Object.fromEntries(['getItem', 'setItem', 'removeItem'].map(name => [name, w.Storage.prototype[name]]));
  const sentinels = isMain ? {
    'zhixu-private-library-v1': 'private sentinel', 'zhixu-private-library-v1:pending:synthetic': 'private pending sentinel',
    'zhixu-long-mock-v1': 'long sentinel', 'zhixu-long-mock-v1:pending:synthetic': 'long pending sentinel'
  } : { 'zhixu-study-v1': legacyRaw, 'zhixu-study-v2': 'current study sentinel', 'zhixu-private-library-v1': 'private sentinel' };
  for (const [key, value] of Object.entries(sentinels)) w.localStorage.setItem(key, value);
  if (isMain) { w.localStorage.setItem('zhixu-study-v1', legacyRaw); if (v2) w.localStorage.setItem('zhixu-study-v2', JSON.stringify(v2)); }
  const forbidden = key => isMain ? /^zhixu-(?:private-library|long-mock)-/.test(key) : /^zhixu-(?:study|private-library)-/.test(key);
  for (const name of ['getItem', 'setItem', 'removeItem']) w.Storage.prototype[name] = function (key, ...args) {
    calls.push([name, key]); assert.equal(forbidden(key), false, page + ': must not access foreign namespace ' + key);
    if (isMain && name !== 'getItem') assert.notEqual(key, 'zhixu-study-v1', 'legacy bytes are immutable');
    return originals[name].call(this, key, ...args);
  };
  w.Storage.prototype.clear = () => { throw Error('Namespace-wide clear is forbidden'); };
  for (const match of html.matchAll(/src="\.\/([^"]+)"/g)) w.eval(fs.readFileSync(path.join(root, 'docs', match[1]), 'utf8'));
  const env = {
    w, d, C: w.STUDY_CONTENT, errors, outgoing, calls,
    get exported() { return exported; }, advance(ms) { now += ms; },
    raw(key) { return originals.getItem.call(w.localStorage, key); },
    disk() { return JSON.parse(w.localStorage.getItem(isMain ? 'zhixu-study-v2' : 'zhixu-long-mock-v1')); },
    async barrier() { await w.navigator.locks.request('study-progress-store:zhixu-study-v2', { mode: 'exclusive' }, () => {}); await pause(); },
    async route(hash) { await navigateHash(w, hash, () => { w.location.hash = hash; }); await pause(); },
    async click(selector, twice = false) { const element = d.querySelector(selector); assert.ok(element, selector); assert.equal(element.disabled, false, selector + ' enabled'); element.click(); if (twice) element.click(); await pause(); },
    async action(name, id, twice = false) { await env.click('[data-action="' + name + '"]' + (id === undefined ? '' : '[data-id="' + id + '"]'), twice); },
    async input(selector, value) { const element = d.querySelector(selector); assert.ok(element, selector); element.value = value; element.dispatchEvent(new w.Event('input', { bubbles: true })); await env.barrier(); },
    async until(predicate) { for (let i = 0; i < 200; i++) { if (predicate()) return; await pause(); } throw Error('Expected rendered/saved view: ' + w.location.hash); },
    async import(raw) { const file = d.querySelector('#import-file'); assert.ok(file); Object.defineProperty(file, 'files', { configurable: true, value: [new w.File([raw], 'synthetic-v038.json', { type: 'application/json' })] }); file.dispatchEvent(new w.Event('change', { bubbles: true })); await pause(); await env.barrier(); },
    verifyIsolation() { for (const [key, value] of Object.entries(sentinels)) assert.equal(env.raw(key), value, key + ' exact bytes retained'); assert.deepEqual(errors, []); assert.deepEqual(outgoing, []); },
    close() { env.verifyIsolation(); dom.window.close(); alive.delete(dom); }
  };
  return env;
}
async function retainedRecords(e, expected) {
  for (const id of targets) {
    await e.route('#lesson/' + id + '/intro');
    assert.equal(e.d.querySelector('#lesson-note').value, expected.notes[id], id + ' old note visible after deepening');
    assert.equal(e.d.querySelector('[data-action="favorite"][data-id="' + id + '"]').getAttribute('aria-pressed'), String(expected.favorites.includes(id)));
    assert.equal(e.d.querySelector('[data-action="read"]').textContent.includes('已读 · 点击取消'), expected.read.includes(id));
  }
  await e.route('#write/w01'); assert.equal(e.d.querySelector('#draft').value, expected.drafts.w01);
  assert.equal(e.d.querySelector('[data-check]').checked, expected.checks.w01.includes(0));
}
(async () => {
 let e=setup(), {C,d,w}=e;
 assert.deepEqual([C.lessons.length,C.questions.length,C.writing.length],[105,753,87]);
 await retainedRecords(e,legacy);
 assert.equal(e.raw('zhixu-study-v2'),null,'reading legacy alone does not migrate');
 for(const id of targets){
  const lesson=C.lessons.find(l=>l.id===id);
  for(const level of ['intro','practice','advanced']){
   await e.route('#lesson/'+id+'/'+level);
   const g=lesson.learningLevels[level];
   assert.deepEqual([...d.querySelectorAll('.reading > section:not(.level-guide) > h2')].map(el=>el.textContent),plain(g.sections.map(i=>lesson.sections[i][0])));
   const writing=g.writingIds[0];
   assert.ok(d.querySelector('a[href="#write/'+writing+'"]'));
   await e.route('#write/'+writing);
   assert.ok(d.querySelector('#draft'));
   await e.input('#draft','合成测试 v038 '+writing);
   await e.route('#lesson/'+id+'/'+level);
   await e.route('#write/'+writing);
   assert.equal(d.querySelector('#draft').value,'合成测试 v038 '+writing);
  }
 }
 for(const q of C.questions.filter(q=>/^c38-|^d37-transfer-/.test(q.id))){
  await e.route('#quiz/one/'+q.id);
  assert.ok(d.querySelector('[data-action="choose"]'),q.id+' renders');
  await e.action('choose',q.answer);
  await e.action('submit',undefined,true);
  await e.barrier();
  assert.equal(d.querySelectorAll('.option-review li').length,4,q.id+' four explanations');
 }
 await e.route('#coverage');
 assert.match(d.body.textContent,/本轮深化/);
 assert.match(d.body.textContent,/本轮扩充练习/);
 await retainedRecords(e,legacy);
 const saved=e.disk(); assert.ok(saved);
 const keys=Object.keys(saved); assert.ok(keys.length>0);
 e.close(); e=setup({v2:saved});
 await retainedRecords(e,legacy);
 for(const task of e.C.writing.filter(x=>x.id.startsWith('w_c38_'))){
  await e.route('#write/'+task.id);
  assert.equal(e.d.querySelector('#draft').value,'合成测试 v038 '+task.id);
 }
 e.close();
 const long=setup({page:'long-mock.html'});
 assert.equal(long.C.questions.length,753);long.close();
 console.log('PASS v038: six lecture/writing routes and draft reloads, 36 answer explanations, coverage labels, legacy notes/favorites/read state, isolated storage and long-page content; simulated DOM only');
})().catch(error=>{for(const dom of alive)dom.window.close();console.error(error);process.exitCode=1;});
