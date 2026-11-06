'use strict';
// Usage: node tests/course-timer-context.cjs [repository-root]
// Synthetic DOM integration regression; does not launch a browser or touch user records.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const { JSDOM, VirtualConsole } = require(require.resolve('jsdom', { paths: [root] }));
const { installSerialLocks, navigateHash } = require(path.join(root, 'tests/progress-dom-support.cjs'));
const html = fs.readFileSync(path.join(root, 'docs/index.html'), 'utf8');
const key = 'zhixu-study-v2';
const course = '#course/writing/intro/material-mapping';
const contextual = '#write/w_c37_mapping_intro/course/writing/intro/material-mapping';
const canonical = '#write/w_c37_mapping_intro';
const errors = [];
const live = new Set();
const pause = () => new Promise(resolve => setTimeout(resolve, 15));
function open(hash, raw) {
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM(html, {
    url: 'https://course-timer.example/' + hash,
    runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc,
  });
  const w = dom.window;
  installSerialLocks(w);
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.matchMedia = () => ({ matches: true });
  w.fetch = () => { throw Error('Unexpected network request'); };
  if (raw) w.localStorage.setItem(key, raw);
  for (const [, file] of html.matchAll(/src="\.\/([^\"]+)"/g)) {
    w.eval(fs.readFileSync(path.join(root, 'docs', file), 'utf8'));
  }
  live.add(dom);
  return dom;
}
async function settled(dom) {
  await pause();
  await dom.window.navigator.locks.request('study-progress-store:' + key, { mode: 'exclusive' }, () => {});
  await pause();
}
function state(dom) { return JSON.parse(dom.window.localStorage.getItem(key)); }
function close(dom) { dom.window.close(); live.delete(dom); }
async function route(dom, hash) {
  await navigateHash(dom.window, hash, () => { dom.window.location.hash = hash; });
  await settled(dom);
}
(async () => {
  let dom = open(course);
  await settled(dom);
  assert.equal(dom.window.document.querySelector('.level-guide a[href^="#write/"]').hash, contextual);
  await route(dom, contextual);
  dom.window.document.querySelector('[data-action="writing-run-start"]').click();
  await settled(dom);
  assert.equal(state(dom).activeRun.status, 'running');
  const runId = state(dom).activeRun.id;
  const raw = dom.window.localStorage.getItem(key);
  close(dom);

  dom = open(contextual, raw);
  await settled(dom);
  assert.equal(state(dom).activeRun.id, runId);
  assert.equal(state(dom).activeRun.status, 'running', 'refreshing contextual writing must retain normal writing timer behavior');
  assert.equal(dom.window.document.querySelector('.course-training-return').hash, course);
  await route(dom, course);
  assert.equal(state(dom).activeRun.status, 'paused', 'returning to the lesson pauses the writing timer');
  close(dom);

  dom = open(canonical, raw);
  await settled(dom);
  assert.equal(state(dom).activeRun.status, 'running', 'canonical writing reload control');
  await route(dom, contextual);
  assert.equal(state(dom).activeRun.status, 'running', 'same task with valid course context is not a task departure');
  assert.equal(state(dom).activeRun.id, runId);
  await route(dom, canonical);
  assert.equal(state(dom).activeRun.status, 'running', 'same task without course context is not a task departure');
  close(dom);

  for (const [hash, label] of [
    ['#write/w_c37_mapping_intro/course/no-such-track/intro/material-mapping', 'invalid course suffix'],
    ['#write/w_c37_mapping_intro/course/writing/intro/material-mapping/extra', 'extra course route segment'],
    ['#write/w01/course/writing/intro/summary', 'different writing task'],
    ['#practice', 'unrelated page'],
  ]) {
    dom = open(canonical, raw);
    await settled(dom);
    assert.equal(state(dom).activeRun.status, 'running');
    await route(dom, hash);
    assert.equal(state(dom).activeRun.status, 'paused', label + ' must still pause');
    assert.equal(state(dom).activeRun.id, runId, label + ' must preserve the run');
    close(dom);
  }
  assert.deepEqual(errors, []);
  console.log('PASS course writing timer context: reload, same-task canonical/context navigation, lesson departure, malformed suffix and unrelated-task pause; run identity preserved. Synthetic DOM only.');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => { for (const dom of live) close(dom); });
