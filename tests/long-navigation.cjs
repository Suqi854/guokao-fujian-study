'use strict';
// Bounded main-page navigation and three-backup copy regression; synthetic state only.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{JSDOM,VirtualConsole}=require('jsdom');
const {installSerialLocks,navigateHash}=require('./progress-dom-support.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'docs/index.html'),'utf8'),scripts=[...html.matchAll(/src="\.\/([^"]+)"/g)].map(m=>m[1]);
(async()=>{
 const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM(html,{url:'https://isolated-study.example/#settings',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc}),w=dom.window,d=w.document;
 w.TextEncoder=TextEncoder;w.Blob=Blob;w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.setInterval=()=>1;installSerialLocks(w);w.fetch=()=>{throw Error('No network allowed');};
 const get=w.Storage.prototype.getItem;w.Storage.prototype.getItem=function(k){assert.ok(!/^zhixu-(?:private|long)/.test(k),'main page never reads independent record values');return get.call(this,k);};
 for(const f of scripts)w.eval(fs.readFileSync(path.join(root,'docs',f),'utf8'));
 await new Promise(r=>setTimeout(r,20));
 assert.match(d.querySelector('main').textContent,/学习记录、私人题库、长题组三份备份/);
 assert.doesNotMatch(d.querySelector('main').textContent,/两份备份/);
 assert.match(d.querySelector('main').textContent,/私人题库仅接收UTF-8 JSON/);
 assert.equal(d.querySelector('a[href="./long-mock.html"]').textContent,'打开长题组与其独立备份 →');
 await navigateHash(w,'#practice',()=>{w.location.hash='#practice';});await new Promise(r=>setTimeout(r,20));
 assert.equal(d.querySelector('a[href="./long-mock.html"]').textContent,'打开长题组');
 assert.match(d.querySelector('main').textContent,/669 道原创练习/);assert.deepEqual(errors,[]);dom.window.close();
 console.log('PASS bounded main DOM: long-page links, three separate backups, no stale two-backup instruction, independent value reads forbidden');
})().catch(e=>{console.error(e);process.exit(1);});
