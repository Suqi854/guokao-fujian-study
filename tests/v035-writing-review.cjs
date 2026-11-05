'use strict';
// Bounded, read-only content check. No dependencies, browser, user storage, or network.
// Integrated: node tests/v035-writing-review.cjs /path/to/site
// Before integration: append /path/to/fujian-governance-v035.js
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const site = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const docs = path.join(site, 'docs');
const sha = x => crypto.createHash('sha256').update(x).digest('hex');
const hashes = new Map();
const read = file => {
  const bytes = fs.readFileSync(file);
  assert.ok(bytes.length < 4 * 1024 * 1024, `bounded file size: ${file}`);
  hashes.set(file, sha(bytes));
  return bytes.toString('utf8');
};
const html = read(path.join(docs, 'index.html'));
const scripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']\.\/([^"']+)["'][^>]*>/g)]
  .map(m => m[1]).filter(name => name !== 'app.js');
assert.ok(scripts.length > 0 && scripts.length < 100, 'bounded local script inventory');
const context = { window: {} };
for (const property of ['localStorage', 'sessionStorage', 'indexedDB']) {
  Object.defineProperty(context, property, { get() { throw new Error(`Unexpected user storage access: ${property}`); } });
  Object.defineProperty(context.window, property, { get() { throw new Error(`Unexpected user storage access: window.${property}`); } });
}
vm.createContext(context);
for (const name of scripts) {
  const file = path.resolve(docs, name);
  assert.ok(file.startsWith(docs + path.sep), 'scripts must remain inside docs');
  vm.runInContext(read(file), context, { filename: name, timeout: 1000 });
}
const prefix = 'w_fj_v035_';
const plain = x => JSON.parse(JSON.stringify(x));
if (process.argv[3]) {
  const before = plain(context.window.STUDY_CONTENT);
  assert.equal(before.writing.filter(w => w.id.startsWith(prefix)).length, 0,
    'candidate append mode expects v035 not to be installed');
  vm.runInContext(read(path.resolve(process.argv[3])), context, { filename: 'v035-candidate', timeout: 1000 });
  const after = plain(context.window.STUDY_CONTENT);
  for (const key of ['lessons', 'writing', 'questions']) {
    assert.deepEqual(after[key].slice(0, before[key].length), before[key], `existing ${key} unchanged`);
  }
}
const C = plain(context.window.STUDY_CONTENT);
const tasks = C.writing.filter(w => w.id.startsWith(prefix));
assert.equal(tasks.length, 10);
assert.equal(new Set(C.writing.map(w => w.id)).size, C.writing.length);
const old = C.writing.filter(w => !w.id.startsWith(prefix));
const lesson = C.lessons.find(l => l.id === 'writing-fj-governance-v035');
assert.ok(lesson);
const normalize = s => s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu, '');
const count = s => [...s.replace(/\s/gu, '')].length;
const expected = {
  market_summary: [0, 220, [2, 3, 4]],
  market_analysis: [0, 320, [1, 2, 3, 4, 7, 9]],
  market_proposal: [0, 300, [5, 6, 7, 8]],
  market_document: [0, 450, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
  market_essay: [800, 1000, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
  canal_summary: [0, 220, [2, 3, 4]],
  canal_analysis: [0, 320, [1, 2, 3, 4, 5, 9]],
  canal_proposal: [0, 320, [4, 5, 6, 7, 8]],
  canal_document: [0, 420, [1, 2, 3, 4, 5, 6, 7, 8, 9]],
  canal_essay: [900, 1100, [1, 2, 3, 4, 5, 6, 7, 8, 9]]
};
const summary = [];
for (const [short, [min, max, scope]] of Object.entries(expected)) {
  const w = tasks.find(w => w.id === prefix + short);
  assert.ok(w, short);
  assert.equal(w.lesson, lesson.id);
  assert.equal(w.minLength || 0, min);
  assert.equal(w.limit, max);
  assert.ok(count(w.sample) >= min && count(w.sample) <= max, `${w.id} length`);
  const paragraphs = [...w.material.matchAll(/^【(\d+)】(.+)$/gm)];
  assert.deepEqual(paragraphs.map(m => Number(m[1])), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.match(w.material, /原创虚构/);
  assert.equal(w.points.length, w.evidenceParagraphs.length);
  assert.equal(w.points.length, w.evidenceDetails.length);
  w.evidenceDetails.forEach((e, i) => {
    assert.equal(e.point, i + 1);
    assert.deepEqual(e.paragraphs, w.evidenceParagraphs[i]);
    assert.ok(e.paragraphs.length > 0 && e.reason.trim());
    for (const p of e.paragraphs) assert.ok(p === '任务' || scope.includes(p), `${w.id}: reference in prompt scope`);
  });
  assert.equal(w.misconceptions.length, 2);
  for (const m of w.misconceptions) {
    for (const key of ['weak', 'problem', 'revision']) assert.ok(m[key]?.trim());
    assert.notEqual(normalize(m.weak), normalize(m.revision));
  }
  assert.ok(w.rewriteSteps.length >= 3);
  assert.equal(w.provenance.kind, 'original-fictional');
  assert.equal(w.provenance.officialScore, null);
  assert.equal(w.provenance.examYear, null);
  assert.equal(w.provenance.difficultyCalibrated, false);
  for (const o of old) for (const key of ['task', 'sample']) {
    assert.notEqual(normalize(w[key]), normalize(o[key]), `${w.id}: no exact old ${key} duplicate`);
  }
  summary.push({ id: w.id, characters: count(w.sample), min, max, points: w.points.length });
}
for (const key of ['title', 'task', 'sample']) {
  assert.equal(new Set(tasks.map(w => normalize(w[key]))).size, tasks.length, `new ${key} unique`);
}
const kinds = ['归纳概括', '综合分析', '提出对策', '应用写作', '文章写作'];
for (const group of ['market', 'canal']) {
  const ws = tasks.filter(w => w.materialGroup === `fj-v035-${group}`);
  assert.equal(ws.length, 5);
  assert.deepEqual(ws.map(w => w.taskKind).sort(), [...kinds].sort());
  assert.equal(new Set(ws.map(w => w.material)).size, 1);
}
const assigned = Object.entries(lesson.learningLevels).flatMap(([level, value]) => {
  assert.ok(value.sections.every(i => Number.isInteger(i) && lesson.sections[i]));
  for (const id of value.writingIds) assert.equal(tasks.find(w => w.id === id)?.learningLevel, level);
  return value.writingIds;
});
assert.deepEqual([...assigned].sort(), tasks.map(w => w.id).sort());
assert.equal(tasks.reduce((sum, w) => sum + w.points.length, 0), 48);
assert.equal(tasks.reduce((sum, w) => sum + w.misconceptions.length, 0), 20);

// Targeted editorial regressions only. They do not automate semantic grading.
const editorialChecks = rows => {
  const get = short => rows.find(w => w.id === prefix + short);
  const canal = get('canal_summary');
  assert.match(canal.points[3], /商定/);
  assert.match(canal.sample, /商定沿用同一记录/);
  assert.match(canal.evidenceDetails[3].reason, /不表示各环节均已完成/);
  const essay = get('market_essay');
  assert.match(essay.sample, /记录影响条件/);
  assert.doesNotMatch(essay.sample, /记录变化原因/);
  assert.ok(get('market_analysis').evidenceDetails[2].paragraphs.includes(3));
  assert.match(get('market_document').sample, /须由有关方面按职责确认后公告/);
  assert.match(get('canal_document').sample, /联络组不代定施工办法或用水优先/);
  assert.match(get('canal_essay').sample, /杉源尚处在试行中/);
};
editorialChecks(tasks);
let mutationChecks = 0;
for (const mutate of [
  rows => { const w = rows.find(w => w.id === prefix + 'canal_summary'); w.sample = w.sample.replace('商定沿用', '沿用'); },
  rows => { const w = rows.find(w => w.id === prefix + 'market_essay'); w.sample = w.sample.replace('记录影响条件', '记录变化原因'); },
  rows => { const w = rows.find(w => w.id === prefix + 'market_analysis'); w.evidenceDetails[2].paragraphs = w.evidenceDetails[2].paragraphs.filter(p => p !== 3); }
]) {
  const copy = plain(tasks); mutate(copy);
  assert.throws(() => editorialChecks(copy)); mutationChecks++;
}

// Text overlap is a diagnostic, never a claim of semantic novelty or plagiarism.
const body = material => {
  const lines = material.split('\n');
  if (lines.length > 1 && /原创虚构/.test(lines[0])) lines.shift();
  return normalize(lines.join('\n').replace(/^【[^】]*原创虚构[^】]*】/, '').replace(/【\d+】/g, ''));
};
const shingles = (s, n) => { const a = [...s], out = new Set(); for (let i = 0; i + n <= a.length; i++) out.add(a.slice(i, i + n).join('')); return out; };
const oldMaterials = [...new Map(old.map(w => [w.material, w])).values()];
const overlaps = [];
for (const group of ['market', 'canal']) {
  const w = tasks.find(w => w.materialGroup === `fj-v035-${group}`);
  for (const o of oldMaterials) assert.notEqual(body(w.material), body(o.material), `${w.id}: new material body`);
  for (const n of [6, 8]) {
    const a = shingles(body(w.material), n);
    let best = { ratio: 0, oldTask: null, shared: [] };
    for (const o of oldMaterials) {
      const b = shingles(body(o.material), n), shared = [...a].filter(x => b.has(x));
      const ratio = shared.length / Math.min(a.size, b.size);
      if (ratio > best.ratio) best = { ratio, oldTask: o.id, shared: shared.slice(0, 6) };
    }
    overlaps.push({ group, n, ...best });
  }
}
for (const [file, before] of hashes) assert.equal(sha(fs.readFileSync(file)), before, 'read source unchanged during test');
console.log(JSON.stringify({
  result: 'pass', mode: process.argv[3] ? 'isolated-candidate' : 'integrated-index',
  counts: { lessons: C.lessons.length, questions: C.questions.length, writing: C.writing.length,
    uniqueMaterials: new Set(C.writing.map(w => w.material)).size },
  reviewed: { materialGroups: 2, tasks: 10, referencePoints: 48, misconceptionRewrites: 20 },
  sampleLengths: summary, targetedMutationChecks: mutationChecks, overlapDiagnostics: overlaps,
  limits: ['This is a bounded content test, not the full-site regression or browser/UI acceptance.',
    'No real user records, storage, network, installation, or publication were accessed.',
    'Semantic evidence, state, authority, and conceptual overlap were reviewed manually in REVIEW.md.',
    'Character counts include punctuation and titles and are not official examination counts.',
    'No official score, calibrated difficulty, or guaranteed 70+ result is established.']
}, null, 2));
