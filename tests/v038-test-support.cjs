'use strict';
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), crypto = require('node:crypto');
const root = path.join(__dirname, '..');
const baseline = require('./fixtures/v037-public-identities.json');
const adapters = ['curriculum-v038.js', 'practice-diagnostic-v037.js'];
const deepened = ['multi-material', 'full-essay'];
const expanded = ['multi-table', 'pn-compound-logic', 'pn-share-scope', 'on-source-reading', 'on-period-scope', 't35-context-reading', 't35-spatial-transform', 't35-group-statistics'];
const levels = ['intro', 'practice', 'advanced'];
const questionIds = [...Array.from({ length: 12 }, (_, i) => 'c38-' + String(i + 1).padStart(2, '0')), ...Array.from({ length: 24 }, (_, i) => 'd37-transfer-' + String(i + 1).padStart(2, '0'))];
const writingIds = ['w_c38_mapping_intro', 'w_c38_mapping_practice', 'w_c38_mapping_advanced', 'w_c38_essay_intro', 'w_c38_essay_practice', 'w_c38_essay_advanced'];
const additionsFor = id => expanded.includes(id)
  ? questionIds.slice(12 + expanded.indexOf(id) * 3, 15 + expanded.indexOf(id) * 3)
  : questionIds.slice(deepened.indexOf(id) * 6, deepened.indexOf(id) * 6 + 6);
const plain = value => JSON.parse(JSON.stringify(value));
const canonical = value => value === null || typeof value !== 'object' ? JSON.stringify(value)
  : Array.isArray(value) ? '[' + value.map(canonical).join(',') + ']'
  : '{' + Object.keys(value).sort().map(key => JSON.stringify(key) + ':' + canonical(value[key])).join(',') + '}';
const hash = value => crypto.createHash('sha256').update(canonical(value)).digest('hex');
const normalized = value => value.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu, '');
const characters = value => [...value.replace(/\s/gu, '')].length;
const read = file => fs.readFileSync(path.join(root, 'docs', file), 'utf8');
const scriptNames = page => [...read(page).matchAll(/src="\.\/([^"]+)"/g)].map(match => match[1]);
const context = () => {
  const c = { window: {}, TextEncoder };
  for (const name of ['localStorage', 'sessionStorage', 'indexedDB', 'fetch']) for (const target of [c, c.window]) {
    Object.defineProperty(target, name, { get() { throw Error('Unexpected storage/network access: ' + name); } });
  }
  return vm.createContext(c);
};
const execute = (c, file) => vm.runInContext(read(file), c, { filename: file, timeout: 2000 });
const freeze = value => { if (value && typeof value === 'object' && !Object.isFrozen(value)) { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };
module.exports = { root, baseline, adapters, deepened, expanded, levels, questionIds, writingIds, additionsFor, plain, canonical, hash, normalized, characters, read, scriptNames, context, execute, freeze };
