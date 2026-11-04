/* Snap rail (phones; pass 12 S11): a [data-snap] scroller whose children snap, and [data-snap-to="i"] buttons (dots or
   numbers) in the same [data-snap-box]. The child nearest the scroller's start edge gets .is-snap and its button
   aria-current (a strip of buttons that scrolls keeps it in view); a button scrolls its child to the start. At the
   rail's end (items that cannot reach the start edge) the tapped child keeps the mark until the reader swipes (_want). State, not motion: it runs with reduced motion (jumps).
   The one shared copy (pass 12 C, parts/Snap.js): parts load before blocks, so every look that draws a snap rail
   (issued-set, stage-stacks, washer-zones, plan-checker, suite-loop, proof-folders) finds it. It stays guarded (it
   defines AQsnap only if it is missing) so a page that loads it twice, or an old look still carrying a copy, is safe. */
(function(){if(typeof window==='undefined'||window.AQsnap)return;window.AQsnap=function(r){var it=[].slice.call(r.children),x=r.getBoundingClientRect().left+(parseFloat(getComputedStyle(r).scrollPaddingLeft)||0),k=0,b=1e9;
 it.forEach(function(c,i){var d=Math.abs(c.getBoundingClientRect().left-x);if(d<b-1){b=d;k=i}});
 if(r.scrollLeft>0&&r.scrollLeft+r.clientWidth>=r.scrollWidth-2)k=r._want!=null&&r._want>=k&&it[r._want]?r._want:it.length-1;
 it.forEach(function(c,i){c.classList.toggle('is-snap',i===k)});
 var bx=r.closest('[data-snap-box]')||r.parentNode;[].forEach.call(bx.querySelectorAll('[data-snap-to]'),function(t){if(+t.getAttribute('data-snap-to')!==k){t.removeAttribute('aria-current');return}t.setAttribute('aria-current','true');
  var s=t.parentNode;if(s.scrollWidth>s.clientWidth+1){var a=t.getBoundingClientRect().left-s.getBoundingClientRect().left+s.scrollLeft,z=a+t.offsetWidth;if(a<s.scrollLeft)s.scrollLeft=a;else if(z>s.scrollLeft+s.clientWidth)s.scrollLeft=z-s.clientWidth}});return k};
 var q=null;document.addEventListener('scroll',function(ev){var r=ev.target;if(!r||r.nodeType!==1||!r.hasAttribute('data-snap'))return;if(q!==r){q=r;requestAnimationFrame(function(){window.AQsnap(q);q=null})}},true);
 document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('[data-snap-to]');if(!t)return;var bx=t.closest('[data-snap-box]'),r=bx&&bx.querySelector('[data-snap]');if(!r)return;
  var c=r.children[+t.getAttribute('data-snap-to')];if(!c)return;r._want=+t.getAttribute('data-snap-to');var red=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var L=r.scrollLeft+c.getBoundingClientRect().left-r.getBoundingClientRect().left-(parseFloat(getComputedStyle(r).scrollPaddingLeft)||0),still=Math.abs(Math.max(0,Math.min(L,r.scrollWidth-r.clientWidth))-r.scrollLeft)<1;
  r.scrollTo({left:L,behavior:red?'auto':'smooth'});
  if(red||still)window.AQsnap(r)});
 ['pointerdown','touchstart','wheel','keydown'].forEach(function(n){document.addEventListener(n,function(ev){var r=ev.target.closest&&ev.target.closest('[data-snap]');if(r)r._want=null},{capture:true,passive:true})})})();
