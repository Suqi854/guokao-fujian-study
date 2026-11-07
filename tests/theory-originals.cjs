'use strict';
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const {JSDOM, VirtualConsole} = require('jsdom');
const {installSerialLocks, navigateHash} = require('./progress-dom-support.cjs');
const root = path.join(__dirname, '..'), html = fs.readFileSync(root + '/docs/index.html', 'utf8');
const errors = [], requests = [], vc = new VirtualConsole(); vc.on('jsdomError', e => errors.push(e.message));
const dom = new JSDOM(html, {url: 'https://originals.synthetic.example/#course/politics/topic/dialectics', runScripts:'outside-only', pretendToBeVisual:true, virtualConsole:vc});
const w = dom.window, d = w.document;
installSerialLocks(w); w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = function() {};
w.fetch = (...a) => { requests.push(a); throw Error('unexpected network'); };
const legacy = {schemaVersion:1, exam:'fujian', read:['growth','marx-connection'], favorites:['marx-connection'], notes:{'marx-connection':'原有笔记'}, attempts:[], drafts:{w01:'原草稿'}, checks:{w01:[0]}};
w.localStorage.setItem('zhixu-study-v1', JSON.stringify(legacy));
let beforeContent;
for(const [,file] of html.matchAll(/src="\.\/([^\"]+)"/g)) {
  if(file === 'theory-originals-all-20261107.js') beforeContent = JSON.stringify(w.STUDY_CONTENT);
  w.eval(fs.readFileSync(root + '/docs/' + file, 'utf8'));
}
const original = w.STUDY_THEORY_ORIGINALS;
const store = () => JSON.stringify(Object.fromEntries(Array.from({length:w.localStorage.length}, (_,i) => {const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)];})));
const route = h => navigateHash(w, h, () => {w.location.hash = h;});
const click = action => d.querySelector('[data-original-action="' + action + '"]').click();
const input = (i,value) => {const el=d.querySelector('[data-original-input="'+i+'"]');el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
const submit = () => d.querySelector('[data-original-form]').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
(async () => {
  await new Promise(r => setTimeout(r,30));
  const before = store();
  assert.equal(Object.keys(original.data).length,13);
  const expectedTopics=w.STUDY_COMPLETE_TOPICS.topics.filter(t=>t.track==='politics').map(t=>t.id).sort();
  assert.deepEqual(Object.keys(original.data).sort(),Array.from(expectedTopics),'all existing political topic IDs covered');
  const reviewed=JSON.parse(fs.readFileSync(root+'/tests/fixtures/theory-expansion-sources.json','utf8'));
  for(const [id,item] of Object.entries(reviewed))assert.deepEqual(JSON.parse(JSON.stringify(original.data[id])),item,'source-reviewed data fixture: '+id);
  const workTotals={};
  for(const item of Object.values(original.data)){const key=item.fullWork||item.work;workTotals[key]=(workTotals[key]||0)+item.excerpts.reduce((n,e)=>n+[...e.text].length,0);}
  for(const count of Object.values(workTotals))assert.ok(count<=25,'per-work excerpt cap, including multiple passages');
  assert.equal(Object.values(original.data).reduce((n,x)=>n+x.excerpts.length,0),15);
  assert.equal(Object.values(original.data).reduce((n,x)=>n+x.blanks.length,0),28);
  for(const [id,item] of Object.entries(original.data)) {
    await route('#course/politics/topic/'+id);
    const panel=d.querySelector('[data-original-topic]');assert.equal(panel.dataset.originalTopic,id);
    assert.equal(panel.nextElementSibling.id,'topic-top','verified original comes before editorial outline');
    assert.match(d.querySelector('#topic-top h2').textContent,/本站讲解/);
    assert.ok(!panel.closest('details'),'original visible by default');
    assert.equal(panel.querySelector('.original-source').open,false,'source details quiet by default');
    assert.ok(panel.querySelector('blockquote').cite.startsWith('https://'));
    assert.ok(panel.querySelector('.original-notes').textContent.includes('本站编写'));
    assert.ok(panel.querySelector('.original-boundary').textContent.includes('不是原文'));
    assert.ok(panel.querySelector('.original-byline').textContent.includes(item.date));
    assert.ok(panel.querySelector('.original-source').textContent.includes(item.pageDate));
    assert.ok(panel.querySelector('.original-source').textContent.includes(item.checked));
    const excerpts=[...panel.querySelectorAll('[data-original-quote]')];
    assert.equal(excerpts.length,item.excerpts.length);
    excerpts.forEach((p,i)=>assert.equal(p.textContent,item.excerpts[i].text,'highlight leaves every source character intact'));
    assert.ok(item.excerpts.reduce((n,x)=>n+[...x.text].length,0)<=25,'short excerpts only per source');
    const ids=[...d.querySelectorAll('[id]')].map(x=>x.id);assert.equal(ids.length,new Set(ids).size);
    const expected=w.STUDY_COMPLETE_TOPICS.topics.find(t=>t.id===id).sourceLessonIds;
    for(const el of d.querySelectorAll('[data-source-section]')) {
      assert.ok(expected.includes(el.dataset.sourceLesson));
      assert.equal(el.querySelector('p').textContent,w.STUDY_CONTENT.lessons.find(l=>l.id===el.dataset.sourceLesson).sections[Number(el.dataset.sourceSection)][1]);
    }
    click('quiz');
    assert.equal(d.querySelector('.original-quotes'),null);assert.equal(d.querySelector('.original-notes'),null,'no original or note answer leakage');
    assert.equal(d.querySelector('.original-head h2').textContent,'原文填空');
    assert.equal(d.querySelectorAll('[data-original-input]').length,item.blanks.length);
    assert.ok(d.activeElement.matches('[data-original-input]'));
    assert.equal(d.querySelector('.original-results'),null);
    item.blanks.forEach((answer,i)=>input(i,answer));submit();
    assert.equal(d.querySelectorAll('.original-results .original-exact').length,item.blanks.length);
    assert.match(d.querySelector('.original-score').textContent,new RegExp(item.blanks.length+' / '+item.blanks.length));
    input(0,'不是'+item.blanks[0]);assert.equal(d.querySelector('.original-results'),null);submit();
    assert.equal(d.querySelectorAll('.original-different').length,1);assert.match(d.querySelector('.original-score').textContent,/本轮已回看/);
    input(0,'');submit();assert.equal(d.querySelectorAll('.original-empty').length,1);
    input(0,'<img src=x onerror=alert(1)>');submit();assert.equal(d.querySelector('.theory-original img'),null);
    click('read');click('quiz');assert.equal(d.querySelector('[data-original-input="0"]').value,'<img src=x onerror=alert(1)>');
    click('reset');click('reset-cancel');assert.notEqual(d.querySelector('[data-original-input="0"]').value,'');
    click('reset');click('reset-confirm');assert.equal(d.querySelector('[data-original-input="0"]').value,'');assert.equal(d.querySelector('.original-results'),null);
    input(0,'保留这轮');click('reset');input(0,'继续修改');assert.equal(d.querySelector('.original-reset'),null,'typing cancels pending reset');
    assert.equal(original.judge('不是'+item.blanks[0],item.blanks[0]),'different');
    assert.equal(original.judge(' '+item.blanks[0]+' ',item.blanks[0]),'exact');
    assert.equal(original.judge('   ',item.blanks[0]),'empty');
  }
  await route('#course/politics/topic/dialectics');assert.equal(d.querySelector('[data-original-input="0"]').value,'继续修改','route preserves ephemeral values');
  assert.equal(d.querySelectorAll('.topic-recall').length,1,'existing topic summary still present');
  await route('#course/data/topic/growth-analysis');assert.equal(d.querySelector('.theory-original'),null);assert.equal(d.querySelectorAll('.topic-recall').length,1);
  await route('#course/politics/topic/historical-materialism');assert.equal(d.querySelector('[data-original-topic]').dataset.originalTopic,'historical-materialism','all political topics have a scoped short excerpt');
  assert.equal(store(),before,'original study records byte-identical');assert.equal(w.sessionStorage.length,0,'no additional persistence');
  assert.equal(JSON.stringify(w.STUDY_CONTENT),beforeContent);assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
  console.log('PASS original-text candidate: 13 topics / 15 short excerpts / 28 blanks; exact text, metadata, editorial distinction, hidden references, fill/edit/reset/cancel/routes/XSS, no network or legacy-record changes.');
  dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
