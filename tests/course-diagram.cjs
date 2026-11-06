'use strict';
// Usage: node tests/course-diagram.cjs [repository-root]
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
  const dom = open('#course');
  const w = dom.window, d = w.document, C = w.STUDY_CONTENT, P = w.STUDY_COURSE;
  await settled(dom);
  const initial = w.localStorage.getItem(key);
  const action = async (name, id) => {
    const selector = `[data-action="${name}"]` + (id === undefined ? '' : `[data-id="${id}"]`);
    const button = d.querySelector(selector);
    assert.ok(button, selector + ' exists');
    button.click(); await settled(dom);
  };
  const lessonByDiagram = type => C.lessons.find(l => l.diagram === type);
  const visit = async type => {
    const l = lessonByDiagram(type);
    assert.ok(l, type + ' lesson exists');
    const track = P.tracks.find(t => P.rows(t).some(row => row.id === l.id));
    await route(dom, P.link(track, 'intro', l.id));
    assert.ok(d.querySelector('#lesson-demo'), type + ' interactive content exists in course');
  };
  await visit('rotation');
  await action('reset-demo');
  assert.match(d.querySelector('.diagram-caption').textContent, /已转 0 步/);
  await action('rotate-demo');
  assert.match(d.querySelector('.diagram-caption').textContent, /已转 1 步/);
  await action('reset-demo');
  assert.match(d.querySelector('.diagram-caption').textContent, /已转 0 步/);

  const overlay = C.lessons.find(l => l.diagram && !['figure-features', 'cube-net', 'solid-views', 'rotation'].includes(l.diagram));
  assert.ok(overlay, 'overlay lesson exists');
  await visit(overlay.diagram);
  for (const [rule, result] of [['union', '111'], ['intersection', '100'], ['xor', '011']]) {
    await action('overlay-demo', rule);
    assert.equal(d.querySelector(`[data-action="overlay-demo"][data-id="${rule}"]`).getAttribute('aria-pressed'), 'true');
    assert.equal(d.querySelector('#lesson-demo .figure-row strong').textContent, result);
  }

  await visit('figure-features');
  await action('feature-example', 1);
  assert.match(d.querySelector('.diagram-caption').textContent, /黑格 5 · 连通部分 1 · 孔洞 0/);
  const original = d.querySelector('.feature-grid').getAttribute('aria-label');
  for (let i = 0; i < 4; i++) await action('feature-turn');
  for (let i = 0; i < 2; i++) await action('feature-mirror');
  assert.equal(d.querySelector('.feature-grid').getAttribute('aria-label'), original);
  await action('feature-example', 2);
  assert.match(d.querySelector('.diagram-caption').textContent, /黑格 5 · 连通部分 5 · 孔洞 0/);
  await action('feature-reset');
  assert.match(d.querySelector('.diagram-caption').textContent, /已顺时针转 0°/);

  await visit('cube-net');
  await action('cube-face', 'B');
  assert.equal(d.querySelector('[data-action="cube-face"][data-id="B"]').getAttribute('aria-pressed'), 'true');
  const before = d.querySelector('#lesson-demo').innerHTML;
  await action('cube-turn');
  assert.notEqual(d.querySelector('#lesson-demo').innerHTML, before);

  await visit('solid-views');
  await action('solid-view', 'top');
  assert.equal(d.querySelectorAll('.projection-figure rect').length, 5);
  await action('solid-view', 'front');
  assert.equal(d.querySelectorAll('.projection-figure rect').length, 6);
  await action('solid-reset');
  for (const result of ['1、3', '3、2', '3、1', '2、3']) {
    await action('solid-turn');
    assert.ok(d.querySelector('.rotation-caption').textContent.includes('正视高度从左到右 ' + result));
  }
  assert.equal(w.localStorage.getItem(key), initial, 'diagram interactions do not save fabricated learning records');
  assert.deepEqual(errors, []);
  close(dom);
  console.log('PASS course diagram integration: rotation/reset, overlay rules, feature selection/rotation/mirror/reset, cube face/direction and solid view/rotation; no storage side effects. Synthetic DOM only.');
})().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => { for (const dom of live) close(dom); });
