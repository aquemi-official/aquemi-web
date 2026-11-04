/* Look "project-run" -> ProjectRun (design-system/components/ProjectRun): ordered steps told as one run you scroll
   along. Desktop with motion: the steps scroll past on the left, large, while a sticky stage on the right holds the
   current step's drawing (the linked page's equipment illustration), its number set huge, and the run itself: a pipe
   along the bottom with a stop per step that the water fills as you scroll, lighting each stop it reaches.
   Without motion (no script, reduced motion) and on phones the same steps stack down a vertical run, each with its
   drawing beside it, so nothing depends on scrolling.
   Fields (a steps block): h, items [{t, d, link, art, label}]. art: an illustration id from ART (Hero.js); default
   the link's page when it has one. label: short stop name on the run (default t).
   Phones (pass 12, PhoneKit sticky figure): the stage comes back as a 132 px strip held under the header, a small
   version of the desktop stage: the current step's drawing, its number with the stop name, and the 6-stop run whose
   water fills to the current stop. The steps scroll under it as short rows (node, title link 44 px, one paragraph)
   on the vertical run; the step on the reading line drives the strip (state, not motion, so it holds with reduced
   motion). Without script the phone keeps the static stack with a drawing per step. */
(function(){
LOOKS['project-run']=function(b,H){var I=b.items||[],n=I.length;
 function art(it){var a=it.art||wsplit(it.link||'')[0];return ART[a]?a:''}
 function pic(it,cls){var a=art(it);return a?'<span class="aq-illustration aq-illustration--ink '+cls+'" aria-hidden="true" style="'+artMask(a)+'"></span>':''}
 var num=function(i){return (i<9?'0':'')+(i+1)};
 var stage='<div class="aq-project-run__stage" aria-hidden="true" data-pk-fig>'
  +'<p class="aq-project-run__num"><span class="aq-project-run__cur">01</span><span class="aq-project-run__of">/ '+num(n-1)+'</span><span class="aq-project-run__now">'+(I[0]?tx(I[0].label||I[0].t):'')+'</span></p>'
  +'<div class="aq-project-run__arts">'+I.map(function(it,i){return pic(it,'aq-project-run__art'+(i?'':' is-on'))}).join('')+'</div>'
  +'<div class="aq-project-run__run"><span class="aq-project-run__pipe"><span class="aq-project-run__water"></span><span class="aq-project-run__drop"></span></span>'
  +I.map(function(it,i){return '<span class="aq-project-run__stop'+(i?'':' is-on')+'" style="--k:'+i+'"><i class="aq-project-run__dot"></i><span class="aq-project-run__lab">'+tx(it.label||it.t)+'</span></span>'}).join('')+'</div></div>';
 var steps=I.map(function(it,i){var go=it.link&&wp(it.link);
  return '<li class="aq-project-run__step'+(i?'':' is-on')+'" style="--k:'+i+'" data-pk-row="'+i+'"><span class="aq-project-run__node" aria-hidden="true">'+num(i)+'</span>'
   +pic(it,'aq-project-run__pic')
   +'<div class="aq-project-run__text"><p class="aq-project-run__code" aria-hidden="true">'+num(i)+' / '+num(n-1)+'</p>'
   +'<h3 class="aq-project-run__t">'+(go?wlink(it.link,it.t):tx(it.t))+'</h3>'+(it.d?'<p class="aq-project-run__d">'+tx(it.d)+'</p>':'')+'</div></li>'}).join('');
 return sec(H+'<div class="aq-project-run" data-pk-sticky data-pk-h="132" style="--n:'+n+'">'+stage+'<ol class="aq-project-run__steps">'+steps+'</ol></div>')};
/* PhoneKit's step change drives the phone strip: drawing, number, stop name, water (the desktop live stage is motion's) */
function phone(el,k){var q=function(s){return [].slice.call(el.querySelectorAll(s))},n=q('.aq-project-run__step').length,on=k>=0;
 q('.aq-project-run__step').forEach(function(s,j){s.classList.toggle('is-on',on?j===k:j===0);s.classList.toggle('is-past',on&&j<k)});
 q('.aq-project-run__node').forEach(function(d,j){d.classList.toggle('is-wet',on&&j<k)});
 q('.aq-project-run__art').forEach(function(a,j){a.classList.toggle('is-on',on?j===k:j===0)});
 var st=q('.aq-project-run__stop');st.forEach(function(s,j){s.classList.toggle('is-on',on?j===k:j===0);s.classList.toggle('is-past',on&&j<k)});
 var c=el.querySelector('.aq-project-run__cur'),w=el.querySelector('.aq-project-run__now'),r=el.querySelector('.aq-project-run__run'),i=on?k:0;
 if(c)c.textContent=(i<9?'0':'')+(i+1);if(w&&st[i])w.textContent=st[i].textContent;
 if(r){if(on)r.style.setProperty('--f',(n>1?i/(n-1):1).toFixed(4));else r.style.removeProperty('--f')}}
if(typeof document!=='undefined')document.addEventListener('pk:change',function(ev){var el=ev.target;if(!el.classList||!el.classList.contains('aq-project-run')||el.classList.contains('is-live'))return;
 phone(el,ev.detail&&ev.detail.on?ev.detail.index:-1)});
})();
