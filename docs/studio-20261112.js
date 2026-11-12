"use strict";
(()=>{
 if(typeof document==='undefined')return;
 const main=document.getElementById('main');if(!main)return;
 const bar=document.createElement('div');bar.className='studio-reading-progress';bar.hidden=true;bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);
 const top=document.createElement('button');top.className='studio-top';top.textContent='↑';top.setAttribute('aria-label','回到顶部');top.hidden=true;document.body.appendChild(top);
 const reduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 top.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced()?'auto':'smooth'}));
 let scheduled=false;
 function update(){scheduled=false;const reader=main.querySelector('.topic-reading');bar.hidden=!reader;top.hidden=!reader||window.scrollY<500;if(!reader)return;const rect=reader.getBoundingClientRect();const length=Math.max(1,reader.offsetHeight-window.innerHeight);bar.style.transform=`scaleX(${Math.min(1,Math.max(0,-rect.top/length))})`;const sections=[...reader.querySelectorAll('section[id]')];let active=sections[0]?.id;for(const section of sections){if(section.getBoundingClientRect().top<180)active=section.id;}for(const button of main.querySelectorAll('.topic-toc button')){const id=button.dataset.topicScroll;button.classList.toggle('is-current',!!id&&id===active);}}
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(update);}}
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 new MutationObserver(()=>{schedule();}).observe(main,{childList:true});
 window.addEventListener('hashchange',()=>{main.classList.remove('studio-enter');requestAnimationFrame(()=>{main.classList.add('studio-enter');schedule();});});
 main.classList.add('studio-enter');schedule();
})();
