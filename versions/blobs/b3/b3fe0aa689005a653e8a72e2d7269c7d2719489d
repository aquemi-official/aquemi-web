/* BackToTop: a floating button that returns the reader to the top. Pass 12 (S1, round C): it never sits on a line
   being read or scrolled past. It is hidden until the reader is two screens down; from there it shows only once the
   page has been still for about 600 ms, and only if the reader was last scrolling up (looking for the top) or has
   reached the page end (the footer's bottom in view, not its top: mid-footer it would park on the phone disclosure
   chevrons; at the end the footer keeps clear room for it); the next scroll, in either direction, hides it again at once. Two screens down it is also armed:
   in the tab order but invisible, so a keyboard reader tabbing past the footer reaches it and it appears while it has
   focus. It moves focus to the logo link, so keyboard and screen-reader users land at the start of the page too.
   Smooth scroll unless reduced motion is set. One scroll listener for the whole site, batched to one update per frame;
   each render writes a fresh button. */
function wBackToTop(){return '<button class="aq-back-to-top" type="button" id="wtop"><span class="aq-back-to-top__arrow" aria-hidden="true">↑</span><span class="aq-back-to-top__label">Back to top</span></button>'}
if(typeof document!=='undefined'){
 var topY=0,topUp=false,topQ=0,topIdle=0,topRest=false;
 var topSync=function(){topQ=0;var b=document.getElementById('wtop'),y=window.scrollY||0,dy=y-topY,f=document.querySelector('.aq-footer');
  /* direction with a small dead band, so a finger's jitter does not flicker it */
  if(dy>6){topUp=false;topY=y}else if(dy<-6){topUp=true;topY=y}
  var fr=f&&f.getBoundingClientRect(),armed=y>window.innerHeight*2,foot=fr&&fr.bottom<=window.innerHeight+2,
   /* phones and tablets (the 44 px square): mid-footer, in either direction, the square would sit on the disclosure
      chevrons, so it waits for the page end (or for the footer to leave the view) */
   midFoot=b&&fr&&!foot&&fr.top<window.innerHeight&&b.offsetWidth<=48;
  if(b){b.classList.toggle('is-armed',armed);b.classList.toggle('is-shown',armed&&((topRest&&(topUp||foot)&&!midFoot)||document.activeElement===b))}};
 var topSched=function(){if(!topQ)topQ=window.requestAnimationFrame?requestAnimationFrame(topSync):(topSync(),0)};
 /* every scroll hides it and restarts the 600 ms rest timer; the timer's end shows it (if armed and wanted) */
 var topScroll=function(){topRest=false;clearTimeout(topIdle);topIdle=setTimeout(function(){topRest=true;topSched()},600);topSched()};
 window.addEventListener('scroll',topScroll,{passive:true});window.addEventListener('resize',topSched);
 document.addEventListener('focusin',function(ev){if(ev.target&&ev.target.id==='wtop')topSched()});
 document.addEventListener('focusout',function(ev){if(ev.target&&ev.target.id==='wtop')setTimeout(topSched,0)});
 document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('#wtop');if(!b)return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
  var home=document.querySelector('.aq-nav__home');if(home)home.focus({preventScroll:true});topUp=false;topRest=false;b.classList.remove('is-shown')});
}
