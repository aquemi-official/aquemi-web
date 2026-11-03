/* BackToTop: a floating button that returns the reader to the top. Pass 12 (S1): it shows only when it is wanted and
   never sits on what is being read: hidden until the reader is two screens down, hidden again while they scroll down
   (reading on), shown when they scroll back up (looking for the top) or while it has keyboard focus. Two screens down
   it is also armed: in the tab order but invisible, so a keyboard reader tabbing past the footer reaches it and it
   appears. It moves focus to the logo link, so keyboard and screen-reader users land at the start of the page too.
   Smooth scroll unless reduced motion is set. One scroll listener for the whole site, batched to one update per frame;
   each render writes a fresh button. */
function wBackToTop(){return '<button class="aq-back-to-top" type="button" id="wtop"><span class="aq-back-to-top__arrow" aria-hidden="true">↑</span><span class="aq-back-to-top__label">Back to top</span></button>'}
if(typeof document!=='undefined'){
 var topY=0,topUp=false,topQ=0;
 var topSync=function(){topQ=0;var b=document.getElementById('wtop'),y=window.scrollY||0,dy=y-topY;
  /* direction with a small dead band, so a finger's jitter does not flicker it */
  if(dy>6){topUp=false;topY=y}else if(dy<-6){topUp=true;topY=y}
  if(b){b.classList.toggle('is-armed',y>window.innerHeight*2);b.classList.toggle('is-shown',y>window.innerHeight*2&&(topUp||document.activeElement===b))}};
 var topSched=function(){if(!topQ)topQ=window.requestAnimationFrame?requestAnimationFrame(topSync):(topSync(),0)};
 window.addEventListener('scroll',topSched,{passive:true});window.addEventListener('resize',topSched);
 document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('#wtop');if(!b)return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
  var home=document.querySelector('.aq-nav__home');if(home)home.focus({preventScroll:true});topUp=false;b.classList.remove('is-shown')});
}
