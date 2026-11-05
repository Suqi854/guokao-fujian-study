"use strict";
// Text must be checked after HTML parsing, not only in the authored data or headings.
const { JSDOM, VirtualConsole } = require("jsdom");
const { navigateHash, installSerialLocks } = require("./progress-dom-support.cjs");
const assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path");
const root = path.join(__dirname, ".."), html = fs.readFileSync(path.join(root, "docs/index.html"), "utf8");
const errors = [], vc = new VirtualConsole();
vc.on("jsdomError", e => errors.push(e.message));
const dom = new JSDOM(html, { url: "https://study.example/", runScripts: "outside-only", pretendToBeVisual: true, virtualConsole: vc });
const w = dom.window, d = w.document;
installSerialLocks(w);
w.scrollTo = () => {};
w.HTMLElement.prototype.scrollIntoView = () => {};
let downloadBlob, downloadName;
w.Blob = Blob;
w.URL.createObjectURL = blob => { downloadBlob = blob; return "blob:text-regression"; };
w.URL.revokeObjectURL = () => {};
const anchorClick = w.HTMLAnchorElement.prototype.click;
w.HTMLAnchorElement.prototype.click = function () { if (this.download) downloadName = this.download; else anchorClick.call(this); };
for (const m of html.matchAll(/src="\.\/([^\"]+)"/g)) w.eval(fs.readFileSync(path.join(root, "docs", m[1]), "utf8"));
const C = w.STUDY_CONTENT;
const pause = () => new Promise(resolve => setTimeout(resolve, 10));
async function route(hash) { await navigateHash(w,hash,()=>{w.location.hash=hash;}); await pause(); }
async function action(name, id) { const el = d.querySelector(`[data-action="${name}"]${id === undefined ? "" : `[data-id="${id}"]`}`); assert.ok(el); el.click(); await pause(); }
function exactText(el, expected, label) {
  assert.ok(el, label);
  assert.equal(el.textContent, expected, label);
  assert.equal(el.childElementCount, 0, label + " must not parse content as markup");
}
const visible = sections => sections.filter(s => s && !/来源|归属|出处/.test(s[0]));
function assertLesson(l, sections, label) {
  exactText(d.querySelector(".reading h1"), l.title, label + " title");
  exactText(d.querySelector(".reading > .subtitle"), l.subtitle, label + " subtitle");
  exactText(d.querySelector(".reading > .formula"), l.formula, label + " formula");
  const nodes = [...d.querySelectorAll(".reading > section:not(.level-guide):not(.diagram-box)")];
  assert.equal(nodes.length, sections.length, label + " section count");
  nodes.forEach((el, i) => {
    exactText(el.querySelector(":scope > h2"), sections[i][0], label + ":" + i + " heading");
    exactText(el.querySelector(":scope > p"), sections[i][1], label + ":" + i + " body");
  });
}
(async () => {
  const remainder = C.lessons.find(l => l.id === "remainders");
  await route("#lesson/remainders/intro");
  exactText(d.querySelector(".reading > section:not(.level-guide):not(.diagram-box) > p"), remainder.sections[0][1], "regression: 0≤r<m retains the whole first paragraph");
  let sections = 0, paths = 0;
  for (const l of C.lessons) {
    await route("#lesson/" + l.id);
    const full = visible(l.sections);
    assertLesson(l, full, l.id + ":full");
    sections += full.length;
    for (const [level, group] of Object.entries(l.learningLevels || {})) {
      await route("#lesson/" + l.id + "/" + level);
      assertLesson(l, visible(group.sections.map(i => l.sections[i])), l.id + ":" + level);
      paths++;
    }
  }
  console.log("PASS Parsed output preserves every character in " + C.lessons.length + " lessons, " + sections + " full-view sections and " + paths + " learning paths");
  for (const q of C.questions) {
    await route("#quiz/one/" + q.id);
    exactText(d.querySelector(".quiz-card h1"), q.stem, q.id + " stem");
    if (q.materialId) {
      const material = C.questionMaterials[q.materialId];
      exactText(d.querySelector('.question-material > h2'), material.title, q.id + ' material title');
      exactText(d.querySelector('.question-material > p'), material.note, q.id + ' material note');
      const tables = [...d.querySelectorAll('.question-material table')];
      assert.equal(tables.length, material.tables.length);
      tables.forEach((table, i) => {
        const expected = material.tables[i];
        exactText(table.querySelector('caption'), expected.caption, q.id + ' table caption');
        assert.deepEqual([...table.querySelectorAll('thead th')].map(el => el.textContent), JSON.parse(JSON.stringify(expected.columns)));
        assert.deepEqual([...table.querySelectorAll('tbody tr')].map(row => [...row.children].map(el => el.textContent)), JSON.parse(JSON.stringify(expected.rows)));
      });
    }
    [...d.querySelectorAll(".option > span:nth-child(2)")].forEach((el, i) => exactText(el, q.options[i], q.id + " option " + i));
    await action("choose", q.answer);
    await action("submit");
    exactText(d.querySelector(".feedback > p"), q.explanation, q.id + " explanation");
    if (q.optionReviews) [...d.querySelectorAll(".option-review li")].forEach((el, i) => {
      const label = el.querySelector("strong").textContent;
      assert.equal(el.textContent, label + " " + q.optionReviews[i], q.id + " option explanation " + i);
      assert.equal(el.children.length, 1, "only renderer-owned option label may be markup");
    });
  }
  console.log("PASS All " + C.questions.length + " parsed question stems, options, explanations and option reviews match authored text");
  for (const task of C.writing) {
    await route("#write/" + task.id);
    exactText(d.querySelector(".page-heading h1"), task.title, task.id + " title");
    exactText(d.querySelector(".material"), task.material, task.id + " material");
    assert.equal(d.querySelector(".task").textContent, "作答任务" + task.task, task.id + " task");
    [...d.querySelectorAll(".check-item")].forEach((el, i) => assert.equal(el.textContent, task.points[i], task.id + " check point " + i));
    [...d.querySelectorAll("details > ul > li")].forEach((el, i) => exactText(el, task.points[i], task.id + " reference point " + i));
    exactText(d.querySelector(".reference"), task.sample, task.id + " reference sample");
  }
  console.log("PASS All " + C.writing.length + " writing materials, tasks, points and samples retain their text and renderer structure");

  // Deliberately hostile-looking DATA must stay literal, while real template markup survives.
  const payload = '0≤r<m; a<b & c>d "quote" <img src=x onerror="bad()"><strong>literal</strong>';
  const l = C.lessons.find(l => l.id === "geometry-scale"), oldLesson = { title:l.title, subtitle:l.subtitle, formula:l.formula, sections:l.sections, tags:l.tags };
  Object.assign(l, { title:payload, subtitle:payload, formula:payload, sections:[[payload,payload]], tags:[payload] });
  await route("#lesson/geometry-scale");
  assertLesson(l, l.sections, "hostile literal data");
  assert.equal(d.querySelectorAll(".reading img,.reading script").length, 0);
  assert.ok(d.querySelector('.reading a[href="#sources"]'));
  await route("#learn");
  const card = [...d.querySelectorAll(".lesson-card")].find(el => el.querySelector('a[href="#lesson/geometry-scale"]'));
  exactText(card.querySelector("h3"), payload, "catalog title");
  assert.equal(card.querySelector('[data-action="favorite"]').getAttribute("aria-label"), "收藏：" + payload);
  assert.equal(card.querySelectorAll("img,script,[onerror]").length,0);
  Object.assign(l, oldLesson);
  const q = C.questions.find(q => q.id === "q352"), oldQ = { stem:q.stem, explanation:q.explanation, options:q.options, optionReviews:q.optionReviews };
  Object.assign(q, { stem:payload, explanation:payload, options:[payload,"B","C","D"], optionReviews:[payload,payload,payload,payload] });
  await route("#quiz/one/q352");
  exactText(d.querySelector(".quiz-card h1"), payload, "literal question stem");
  await action("choose", q.answer); await action("submit");
  exactText(d.querySelector(".feedback > p"), payload, "literal question explanation");
  assert.equal(d.querySelectorAll(".quiz-card img,.quiz-card script,[onerror]").length,0);
  Object.assign(q,oldQ);
  const task = C.writing[0], oldTask = {title:task.title,type:task.type,material:task.material,task:task.task,points:task.points,sample:task.sample};
  Object.assign(task,{title:payload,type:payload,material:payload,task:payload,points:[payload],sample:payload});
  await route("#write/" + task.id);
  exactText(d.querySelector(".page-heading h1"),payload,"literal writing title");
  exactText(d.querySelector(".material"),payload,"literal writing material");
  assert.equal(d.querySelector(".task").textContent,"作答任务"+payload);
  assert.equal(d.querySelectorAll("main img,main script,main [onerror]").length,0);
  assert.ok(d.querySelector(".task > strong") && d.querySelector(".task > br"));
  const draft = 'plain draft <literal> & text';
  d.querySelector('#draft').value = draft;
  d.querySelector('#draft').dispatchEvent(new w.Event('input', {bubbles:true}));
  await action('export-draft', task.id);
  assert.equal(downloadName, '知序-' + payload + '-草稿.txt', 'plain TXT filename is not HTML encoded');
  assert.equal(await downloadBlob.text(), payload + '\n\n' + draft, 'plain TXT contents are not HTML encoded');
  Object.assign(task,oldTask);
  const writingLesson = C.lessons.find(l => l.learningLevels?.intro?.writingIds?.length);
  const group = writingLesson.learningLevels.intro, oldIds = group.writingIds;
  const example = C.writing.find(x => x.id === oldIds[0]);
  const extraTask = {...example, id:'text-regression-task', title:payload};
  C.writing.push(extraTask);
  group.writingIds = [example.id, extraTask.id];
  await route('#lesson/' + writingLesson.id + '/intro');
  const taskLink = d.querySelector('.level-guide a[href="#write/text-regression-task"]');
  assert.equal(taskLink.textContent, '写作任务 2 · ' + payload, 'button labels are escaped exactly once');
  assert.equal(taskLink.children.length, 1);
  assert.equal(taskLink.firstElementChild.tagName.toLowerCase(), 'svg', 'renderer-owned arrow remains an SVG');
  group.writingIds = oldIds;
  C.writing.pop();
  await route('#coverage');
  assert.ok(d.querySelector('main').textContent.includes('当前70课已逐层编写，18课仍待分层'));
  await route("#lesson/figure-features/practice");
  assert.equal(d.querySelectorAll(".feature-grid rect").length,9);
  await action("feature-turn");
  assert.equal(d.querySelectorAll(".feature-grid rect").length,9);
  await route("#lesson/cube-net/practice");
  assert.ok(d.querySelector(".net-figure") && d.querySelector(".cube-figure"));
  assert.deepEqual(errors,[]);
  console.log("PASS Literal < > & quotes and tag-shaped content cannot create nodes; legitimate links, labels, SVGs and controls remain intact");
  console.log("NOT TESTED: real browser pixels, phone widths or touch events");
  dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exit(1);});
