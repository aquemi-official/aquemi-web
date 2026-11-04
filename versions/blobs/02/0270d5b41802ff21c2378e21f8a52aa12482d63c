/* Look "suite-loop" -> SuiteLoop (design-system/components/SuiteLoop): a router table (as: "router") drawn as a plan of
   one shared loop serving several suites, on a limestone band. The loop is a twin-wall pipe round the sheet; every
   situation is a suite (a room in plan: walls, a door swing) fed by its own drop and point-of-use valve off the loop.
   Inside the suite: the situation, the water it needs, the systems link and the start page as the suite's way out.
   Hovering or focusing a suite sends a slug of water along the loop from the supply to its drop and lights the drop. Phones (pass 12): the loop runs across the top as the header and the suites are a snap row
   under it (one ~300 px room a swipe, each hanging off its own drop and valve); the room in view lights its valve
   and drop, and a dot rail under the row jumps between rooms (AQsnap, below).
   Fields, as the router: cols (situation, water, systems, start with), rows (cells: string or {t, link, intent}).
   Concept: industries.0 / home.4 (situations piped from one manifold) set as the CDMO's own plant: one loop, many
   suites (the page drawing ind-cdmo shows the same idea). */
(function(){
var VALVE='<svg viewBox="0 0 22 32" focusable="false"><path class="aq-suite-loop__vb" d="M3 3 L11 16 L19 3 Z M3 29 L11 16 L19 29 Z"/><path class="aq-suite-loop__vs" d="M11 16 H21"/></svg>';
LOOKS['suite-loop']=function(b,H){var C=b.cols||[],R=b.rows||[],n=R.length;
 function lk(c){return c&&typeof c==='object'&&c.link&&wp(c.link)?c:null}
 var suites=R.map(function(r,i){var last=r[r.length-1],go=lk(last),mid=r.slice(1,r.length-1);
  var dl=mid.map(function(c,j){return '<div class="aq-suite-loop__f'+(lk(c)?' is-link':'')+'"><dt>'+tx(C[j+1]||'')+'</dt><dd>'+tcell(c)+'</dd></div>'}).join('');
  var out=go?'<a class="aq-suite-loop__go" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':'')+'><span class="aq-suite-loop__k">'+tx(C[r.length-1]||'')+'</span><span class="aq-suite-loop__to">'+tx(go.t)+'</span></a>'
   :'<p class="aq-suite-loop__go"><span class="aq-suite-loop__k">'+tx(C[r.length-1]||'')+'</span><span class="aq-suite-loop__to">'+tcell(last)+'</span></p>';
  return '<li class="aq-suite-loop__suite'+(i?'':' is-snap')+'" style="--rows:'+(mid.length+3)+'"><span class="aq-suite-loop__drop" aria-hidden="true"><span class="aq-suite-loop__dw"></span><span class="aq-suite-loop__valve">'+VALVE+'</span></span>'
   +'<span class="aq-suite-loop__door" aria-hidden="true"></span>'
   +'<span class="aq-suite-loop__tag" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><h3 class="aq-suite-loop__t">'+tx(r[0])+'</h3><dl class="aq-suite-loop__dl">'+dl+'</dl>'+out+'</li>'}).join('');
 var dots='<div class="aq-suite-loop__dots" role="group" aria-label="Suites">'+R.map(function(r,i){return '<button type="button" class="aq-suite-loop__dot" data-snap-to="'+i+'"'+(i?'':' aria-current="true"')+' aria-label="'+e((i<9?'0':'')+(i+1)+' '+String(r[0]&&r[0].t||r[0]||''))+'"></button>'}).join('')+'</div>';
 var loop='<span class="aq-suite-loop__loop" aria-hidden="true"><span class="aq-suite-loop__water"></span><span class="aq-suite-loop__arrow"></span><span class="aq-suite-loop__beam"></span></span>';
 return sec(H+'<div class="aq-suite-loop'+(n>5?' is-dense':'')+'" data-snap-box style="--n:'+n+'">'+loop+'<ol class="aq-suite-loop__suites" data-snap>'+suites+'</ol>'+dots+'</div>','aq-band--limestone aq-suite-loop-sec" data-theme="light')};
})();
/* Snap rail (phones; pass 12 S11): a [data-snap] scroller whose children snap, and [data-snap-to="i"] buttons (dots or
   numbers) in the same [data-snap-box]. The child nearest the scroller's start edge gets .is-snap and its button
   aria-current (a strip of buttons that scrolls keeps it in view); a button scrolls its child to the start. At the
   rail's end (items that cannot reach the start edge) the tapped child keeps the mark until the reader swipes (_want). State, not motion: it runs with reduced motion (jumps).
   Shared by several looks; each defines it only if it is missing, so any one of them may be retired. */
(function(){if(window.AQsnap)return;window.AQsnap=function(r){var it=[].slice.call(r.children),x=r.getBoundingClientRect().left+(parseFloat(getComputedStyle(r).scrollPaddingLeft)||0),k=0,b=1e9;
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
