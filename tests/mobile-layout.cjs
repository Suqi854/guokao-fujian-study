'use strict';
// Static CSS/DOM guards only: these do not emulate or validate a real phone layout.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..', 'docs');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
function stylesheet(file, maxWidth) {
  const dom = new JSDOM('<!doctype html><style></style>');
  dom.window.document.querySelector('style').textContent = read(file);
  const rules = [...dom.window.document.styleSheets[0].cssRules];
  const mobile = rules.filter(rule => rule.media && rule.conditionText.replaceAll(' ', '') === `(max-width:${maxWidth}px)`);
  assert.ok(mobile.length, `${file}: phone media query exists`);
  // Return final matching declaration within the phone media queries, not a pixel claim.
  return { dom, value(selector, property) {
    let value = '';
    for (const group of mobile) for (const rule of group.cssRules) {
      if (rule.selectorText?.split(',').map(s => s.trim().replaceAll('"', '').replaceAll("'", '')).includes(selector)) {
        value = rule.style.getPropertyValue(property) || value;
      }
    }
    return value.trim();
  }};
}
for (const [html, css, maxWidth] of [
  ['index.html', 'style.css', 640],
  ['long-mock.html', 'long-mock.css', 600],
  ['private-library.html', 'private-library.css', 600],
]) {
  const dom = new JSDOM(read(html));
  const viewport = dom.window.document.querySelector('meta[name=viewport]').content;
  assert.match(viewport, /width=device-width/);
  assert.match(viewport, /viewport-fit=cover/);
  assert.doesNotMatch(viewport, /user-scalable=no|maximum-scale=1(?:,|$)/);
  const sheet = stylesheet(css, maxWidth);
  for (const selector of ['input', 'select', 'textarea']) assert.equal(sheet.value(selector, 'font-size'), '16px', `${css}: ${selector} avoids small phone form text`);
  assert.equal(sheet.value('input[type=file]', 'width'), '100%', `${css}: file chooser constrained`);
  assert.equal(sheet.value('input[type=file]', 'min-width'), '0');
  assert.equal(sheet.value('main', 'overflow-wrap'), 'anywhere', `${css}: long content can wrap`);
  assert.equal(sheet.value('summary', 'min-height'), '44px', `${css}: expandable sections touch target`);
  // jsdom drops valid max()/env() padding declarations, so inspect this syntax directly.
  assert.match(read(css), /padding-left:\s*max\(14px,\s*env\(safe-area-inset-left\)\)/);
  // No body overflow hiding: a guard must not disguise content that remains too wide.
  assert.doesNotMatch(read(css), /(?:html|body)\s*\{[^}]*overflow(?:-x)?\s*:\s*(?:hidden|clip)/);
  sheet.dom.window.close(); dom.window.close();
}
const main = stylesheet('style.css', 640);
assert.equal(main.value('#navigation', 'grid-template-columns'), 'repeat(5, minmax(0, 1fr))');
assert.equal(main.value('.nav-item', 'min-height'), '52px');
assert.equal(main.value('.top-actions select', 'font-size'), '16px');
assert.equal(main.value('.bank-field select', 'font-size'), '16px');
assert.equal(main.value('.quiz-actions', 'flex-wrap'), 'wrap');
assert.ok(main.value('.workspace', 'padding-bottom').includes('safe-area-inset-bottom'));
assert.ok(main.value('html', 'scroll-padding-bottom').includes('safe-area-inset-bottom'));
main.dom.window.close();
const long = stylesheet('long-mock.css', 600);
assert.equal(long.value('fieldset', 'min-width'), '0');
assert.equal(long.value('#module-inputs', 'grid-template-columns'), 'repeat(2,minmax(0,1fr))');
assert.equal(long.value('#status', 'position'), 'static', 'long warnings must not stick over the question on phones');
long.dom.window.close();
const privatePage = stylesheet('private-library.css', 600);
assert.equal(privatePage.value('fieldset', 'min-width'), '0');
assert.equal(privatePage.value('.private-actions select', 'width'), '100%');
privatePage.dom.window.close();
console.log('PASS phone CSS/DOM guards: viewport/zoom, safe areas, navigation, form text, file inputs, wrapping, long-mock and private-library.');
console.log('NOT TESTED: rendered widths, touch interactions, iOS keyboard/zoom or physical devices.');
