/* BackToTop: a floating button that returns the reader to the top. It shows as soon as the reader is one screen down
   and stays while they scroll on, in either direction, so the top is always one press away; back within the first
   screen it fades out. On phones and tablets (the 44 px square) it steps aside while the footer is partly in view, so
   it never sits on the footer's disclosure chevrons, and comes back at the page end (the footer keeps clear room for
   it there). It moves focus to the logo link, so keyboard and screen-reader users land at the start of the page too.
   Smooth scroll unless reduced motion is set. One scroll listener for the whole site, batched to one update per frame;
   each render writes a fresh button. */
function wBackToTop(){return '<button class="aq-back-to-top" type="button" id="wtop"><span class="aq-back-to-top__arrow" aria-hidden="true">↑</span><span class="aq-back-to-top__label">Back to top</span></button>'}
if(typeof document!=='undefined'){
 var topQ=0,topHold=false;
 var topSync=function(){topQ=0;var b=document.getElementById('wtop');if(!b)return;var y=window.scrollY||0,f=document.querySelector('.aq-footer'),
   fr=f&&f.getBoundingClientRect(),on=y>window.innerHeight,foot=fr&&fr.bottom<=window.innerHeight+2,
   midFoot=fr&&!foot&&fr.top<window.innerHeight&&b.offsetWidth<=48;
  /* after a press it stays down for the trip to the top */
  if(!on)topHold=false;
  b.classList.toggle('is-shown',(on&&!midFoot&&!topHold)||document.activeElement===b)};
 var topSched=function(){if(!topQ)topQ=window.requestAnimationFrame?requestAnimationFrame(topSync):(topSync(),0)};
 window.addEventListener('scroll',topSched,{passive:true});window.addEventListener('resize',topSched);
 if(window.MutationObserver)new MutationObserver(function(){var b=document.getElementById('wtop');if(b&&!b.hasAttribute('data-seen')){b.setAttribute('data-seen','');topSched()}}).observe(document.documentElement,{childList:true,subtree:true});
 document.addEventListener('focusin',function(ev){if(ev.target&&ev.target.id==='wtop')topSched()});
 document.addEventListener('focusout',function(ev){if(ev.target&&ev.target.id==='wtop')setTimeout(topSched,0)});
 document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('#wtop');if(!b)return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
  var home=document.querySelector('.aq-nav__home');if(home)home.focus({preventScroll:true});topHold=true;b.classList.remove('is-shown')});
}
