"use strict";
const assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path");
const { JSDOM, VirtualConsole } = require("jsdom");
const { installSerialLocks, navigateHash } = require("./progress-dom-support.cjs");
const root = path.join(__dirname, ".."), html = fs.readFileSync(path.join(root, "docs/index.html"), "utf8");
const errors = [], outgoing = [], vc = new VirtualConsole(); vc.on("jsdomError", e => errors.push(e.message));
const dom = new JSDOM(html, { url: "https://study.example/#course", runScripts: "outside-only", pretendToBeVisual: true, virtualConsole: vc });
const w = dom.window, d = w.document; installSerialLocks(w); w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {};
w.fetch = (...args) => { outgoing.push(args); throw Error("Unexpected network request"); };
let contentBefore;
for (const [, file] of html.matchAll(/src="\.\/([^\"]+)"/g)) {
  if (file === "learning-course.js") contentBefore = JSON.stringify(w.STUDY_CONTENT);
  w.eval(fs.readFileSync(path.join(root, "docs", file), "utf8"));
  if (file === "learning-course.js") assert.equal(JSON.stringify(w.STUDY_CONTENT), contentBefore, "curriculum does not mutate content");
}
const C = w.STUDY_CONTENT, P = w.STUDY_COURSE, plain = x => JSON.parse(JSON.stringify(x));
const route = hash => navigateHash(w, hash, () => { w.location.hash = hash; });
const pause = () => new Promise(r => setTimeout(r, 10));
const getState = () => w.localStorage.getItem("zhixu-study-v2");
(async () => {
  assert.equal(d.querySelector('#navigation .active').getAttribute('href'), '#course');
  assert.equal(d.querySelector('#navigation a[href="#learn"]'), null);
  await route('#learn'); assert.ok(d.querySelector('#search')); assert.equal(d.querySelector('#navigation .active').getAttribute('href'), '#course');
  await route('#course');
  const ids = plain(P.tracks.flatMap(t => P.rows(t).map(r => r.id)));
  assert.equal(ids.length, 105); assert.equal(new Set(ids).size, 105);
  assert.deepEqual(ids.slice().sort(), plain(C.lessons.map(l => l.id)).sort());
  assert.equal(P.tracks[0].id, "data"); assert.ok(P.tracks.some(t => t.id === "writing"));
  assert.equal(C.lessons.filter(l => l.learningLevels).length, 97);
  for (const track of P.tracks) for (const u of track.units) {
    for (const key of ["goal", "bridge", "check"]) assert.ok(u[key].length > 12);
    for (const id of u.ids) assert.equal(C.lessons.find(l => l.id === id).category, track.title);
  }
  const initial = getState();
  let lessonViews = 0, exactQuizLinks = 0, writingLinks = 0;
  for (const t of P.tracks) for (const s of P.stages) {
    await route(P.link(t, s.id));
    assert.equal(d.querySelectorAll(".course-unit").length, t.units.length);
    assert.equal(d.querySelectorAll(".course-unit[open]").length, 1, "long chapter lists collapsed by default");
    for (const row of P.rows(t)) {
      const l = C.lessons.find(l => l.id === row.id), level = l.learningLevels?.[s.id];
      await route(P.link(t, s.id, l.id));
      assert.equal(d.querySelector(".reading h1").textContent, l.title);
      assert.equal(d.querySelector("[data-course-reader]").dataset.courseReader, l.id);
      assert.equal(Boolean(d.querySelector(".course-level-warning")), !level);
      assert.ok(d.querySelector(".course-connection").textContent.includes(row.unit.bridge));
      assert.equal(d.querySelector("[aria-label='跳到指定课程'] option:checked").value, P.link(t, s.id, l.id));
      for (const a of d.querySelectorAll(".level-guide a")) {
        const parts = a.hash.slice(1).split("/");
        assert.deepEqual(parts.slice(-4), ["course", t.id, s.id, l.id]);
        if (parts[0] === "quiz") {
          const expected = level.questionIds || l.practice.filter(id => C.questions.find(q => q.id === id)?.meta.trainingStage === level.stage);
          assert.deepEqual(parts[2].split(","), plain([...new Set(expected)])); exactQuizLinks++;
        } else { assert.ok(level.writingIds.includes(parts[1])); writingLinks++; }
      }
      const expectedSections = level ? level.sections.map(i => l.sections[i]) : l.sections;
      for (const [title] of expectedSections) {
        if (!/方法归属与答后检查|历史出处与使用边界|历史出处与本站对照的归属|复盘与来源边界|练习复盘与出处边界|来源边界与复盘检查|两个出处的同与异/.test(title)) assert.ok(d.querySelector(".reading").textContent.includes(title), l.id + ":" + title);
      }
      lessonViews++;
    }
  }
  assert.equal(getState(), initial, "navigation does not fabricate reading/stage completion");
  await route("#course/data/intro/growth");
  const source = d.querySelector(".level-guide a[href^='#quiz/']").hash;
  await route(source); assert.ok(d.querySelector(".quiz-card"));
  assert.equal(d.querySelector(".course-training-return").hash, "#course/data/intro/growth");
  await route("#course/data/intro/growth");
  const next = d.querySelector(".course-reading-nav a[rel='next']").hash;
  assert.equal(next, "#course/data/intro/rate-amount-order"); await route(next);
  assert.equal(d.querySelector(".course-reading-nav a[rel='prev']").hash, "#course/data/intro/growth");
  await route("#course/data/intro/t35-group-statistics");
  assert.equal(d.querySelector(".course-reading-nav a:last-child").hash, "#course/data/practice");
  await route("#course/writing/intro/material-mapping");
  const task = d.querySelector(".level-guide a[href^='#write/']").hash;
  await route(task); assert.ok(d.querySelector("#draft")); assert.equal(d.querySelector(".course-training-return").hash, "#course/writing/intro/material-mapping");
  await route("#write/w01"); assert.equal(d.querySelector(".course-training-return"), null);
  await route("#course/data/intro/growth");
  const select = d.querySelector("[aria-label='选择学习轮次']"); select.value = "#course/data/practice/growth";
  await navigateHash(w, select.value, () => select.dispatchEvent(new w.Event("change", { bubbles: true })));
  assert.equal(d.querySelector(".level-guide .pill").textContent, C.learningPaths.practice.label);
  d.querySelector("#lesson-note").value = "课程笔记保留 <test>"; d.querySelector("#lesson-note").dispatchEvent(new w.Event("input", { bubbles: true })); await pause();
  d.querySelector("[data-action='read']").click(); await pause();
  await route("#lesson/growth"); assert.equal(d.querySelector("#lesson-note").value, "课程笔记保留 <test>"); assert.match(d.querySelector("[data-action='read']").textContent, /已读/);
  await route("#course/data/intro"); assert.match(d.querySelector(".course-start-actions").textContent, /1\/14/);
  const stored = getState();
  for (const h of ["#course/nope", "#course/data/nope", "#course/data/intro/summary", "#course/data/intro/growth/extra"]) { await route(h); assert.match(d.querySelector("h1").textContent, /没有找到/); }
  assert.equal(P.trainingReturn(["quiz", "one", "q01", "course", "data", "intro", "summary"]), "");
  assert.equal(P.trainingReturn(["write", "w01", "course", "data", "intro", "growth", "extra"]), "");
  const u = P.tracks[0].units[0], saved = u.bridge; u.bridge = '<img src=x onerror=alert(1)> a < b';
  await route("#course/data"); assert.ok(d.querySelector(".course-bridge").textContent.includes(u.bridge)); assert.equal(d.querySelector(".course-page img"), null); u.bridge = saved;
  assert.equal(getState(), stored); assert.deepEqual(errors, []); assert.deepEqual(outgoing, []);
  console.log(`PASS continuous course: 105 unique existing lessons / 8 subjects, ${lessonViews} course views, ${exactQuizLinks} exact level quiz links, ${writingLinks} writing links; previous/next, stage jump, chapter closure, unlayered disclosure, malformed routes, read/note compatibility, no automatic completion or outgoing requests.`);
  dom.window.close();
})().catch(e => { console.error(e); dom.window.close(); process.exitCode = 1; });
