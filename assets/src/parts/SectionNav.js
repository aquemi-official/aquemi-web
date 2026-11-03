/* SectionNav: sticky numbered jump links to blocks that carry a short nav label (four or more), with a page progress readout.
   Block section ids come from jid(). The scroll-spy below marks the section being read (aria-current) here and in the phone menu. */
function ctaLink(p){return p.primary_cta_link||(/service/i.test(p.primary_cta)?'contact-service':'contact-proposal')}
function jid(b,i){return b.anchor||'s-'+i+'-'+String(b.nav).toLowerCase().replace(/[^a-z0-9]+/g,'-')}
function navJumps(p){var o=[];((p&&p.blocks)||[]).forEach(function(b,i){if(b.nav)o.push({id:jid(b,i),label:b.nav})});return o.length<4?[]:o}
function wSectionNav(p){var j=navJumps(p),segs='';if(!j.length)return '';for(var i=0;i<10;i++)segs+='<i class="aq-section-nav__seg"></i>';
 return '<nav class="aq-section-nav" aria-label="On this page"><div class="aq-in"><span class="aq-section-nav__label" aria-hidden="true">On this page <span>↓</span></span><ol class="aq-section-nav__links">'+
  j.map(function(x,i){return '<li><a href="#'+e(p.id)+'" data-jump="'+e(x.id)+'"><span class="aq-section-nav__num" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'+e(x.label)+'</a></li>'}).join('')+'</ol>'+
  '<div class="aq-section-nav__progress"><span class="aq-section-nav__progress-label" aria-hidden="true">Page progress</span><span class="aq-section-nav__readout"><span class="aq-section-nav__meter" role="progressbar" aria-label="Page progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">'+segs+'</span><span class="aq-section-nav__pct" aria-hidden="true">0%</span></span></div></div></nav>'}
/* Scroll-spy, progress, (phones) tuck-on-scroll-down and hide-at-footer: one passive scroll listener, batched to one update per frame; re-runs when the page re-renders. */
(function(){if(typeof window==='undefined'||!window.addEventListener||!window.requestAnimationFrame)return;
 var q=0,lastY=0,rm=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):null,ph=window.matchMedia?window.matchMedia('(max-width: 860px)'):null;
 function sched(){if(!q)q=requestAnimationFrame(function(){q=0;spy()})}
 function reveal(a){var s=a.closest('.aq-section-nav__links');if(!s||s.scrollWidth<=s.clientWidth)return;var r=a.getBoundingClientRect(),sr=s.getBoundingClientRect();
  if(r.left<sr.left||r.right>sr.right)s.scrollTo({left:s.scrollLeft+r.left-sr.left-(sr.width-r.width)/2,behavior:rm&&rm.matches?'auto':'smooth'})}
 function spy(){var bar=document.querySelector('.aq-section-nav');if(!bar)return;
  var de=document.documentElement,vh=window.innerHeight,y=window.scrollY||de.scrollTop,max=de.scrollHeight-vh,line=bar.getBoundingClientRect().bottom+vh*0.2,act=null,
   links=bar.querySelectorAll('a[data-jump]');
  /* nothing is current until the bar has stuck, i.e. the reader has scrolled past the hero */
  /* Phones: the stuck bar tucks away while the reader scrolls down and comes back on any scroll up */
  var stuck=bar.getBoundingClientRect().top<=1&&y>0;bar.classList.toggle('is-tucked',!!(ph&&ph.matches&&stuck&&(y>lastY+4||(bar.classList.contains('is-tucked')&&y>=lastY-4))));lastY=y;
  /* Pass 12 C (F2): the bar steps away while the footer is in view, so it never sits over the footer's links; it stays if it holds focus */
  var ft=document.querySelector('.aq-footer');bar.classList.toggle('is-footed',!!(ft&&ft.getBoundingClientRect().top<vh&&!bar.contains(document.activeElement)));
  if(bar.getBoundingClientRect().top<=1)links.forEach(function(a){var s=document.getElementById(a.dataset.jump);if(s&&s.getBoundingClientRect().top<=line)act=a.dataset.jump});
  if(links.length&&max>0&&y>=max-2){var l=links[links.length-1],ls=document.getElementById(l.dataset.jump);if(ls&&ls.getBoundingClientRect().top<vh)act=l.dataset.jump}
  document.querySelectorAll('.aq-section-nav a[data-jump], .aq-menu a[data-jump]').forEach(function(a){var on=a.dataset.jump===act;
   if(on===(a.getAttribute('aria-current')==='true'))return;if(on){a.setAttribute('aria-current','true');reveal(a)}else a.removeAttribute('aria-current')});
  var pct=max>0?Math.max(0,Math.min(100,Math.round(y/max*100))):100,m=bar.querySelector('.aq-section-nav__meter');
  if(!m||m.getAttribute('aria-valuenow')===String(pct))return;m.setAttribute('aria-valuenow',pct);
  var on=Math.round(pct/10);m.querySelectorAll('.aq-section-nav__seg').forEach(function(s,i){s.classList.toggle('is-on',i<on)});
  var t=bar.querySelector('.aq-section-nav__pct');if(t&&t.firstChild)t.firstChild.nodeValue=pct+'%'}
 window.addEventListener('scroll',sched,{passive:true});window.addEventListener('resize',sched,{passive:true});window.addEventListener('load',sched);
 if(window.MutationObserver)new MutationObserver(sched).observe(document.documentElement,{childList:true,subtree:true});sched()})();
