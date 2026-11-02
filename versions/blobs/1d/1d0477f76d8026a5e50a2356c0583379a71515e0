/* Look "stage-stacks" -> StageStacks (design-system/components/StageStacks): what each project stage issues, drawn as the
   turnover package building up. On a navy ground the stages stand along one project axis, left to right; above each
   stage its documents are stacked as sheets of paper, one sheet per document, so each stack's height is what that stage
   adds to the file; under the axis, the stage's name with its clause, then your step and who approves it on a signature
   rule. The table's column names label the three bands once, in the margin left of the first stage. The axis is a stage
   rail: each node is a button; pointing at a stage, focusing its node or pressing it (pressed holds it) seeks the water
   back or on to that stage, and the stacks still ahead go quiet, so the file reads as it stands at that stage.
   Fields, as a table: cols [stage, your step and who approves, documents issued], rows [[stage, step, documents]]
   (cells strings or {t, link}); stage cells "Name · clause" set the clause under the name; documents are split at ";".
   fold, fold_noun: on phones only (desktop shows the whole axis). Phones: the axis runs down the left, each stage's
   sheets wrap beside it, then its step. */
function stDocs(c){return String(c&&typeof c==='object'?c.t:c||'').split(/\s*;\s*/).filter(Boolean)}
LOOKS['stage-stacks']=function(b,H){var C=b.cols||[],R=b.rows||[];
 var k=function(i,cls){return '<p class="aq-stage-stacks__k'+(cls?' '+cls:'')+'">'+tx(C[i]||'')+'</p>'};
 var list=R.map(function(r,i){var s=String(r[0]&&typeof r[0]==='object'?r[0].t:r[0]||''),p=s.split(/\s+·\s+/),num=(i<9?'0':'')+(i+1);
  var docs=stDocs(r[2]).map(function(d,j){return '<li class="aq-stage-stacks__doc" style="--j:'+j+'">'+tx(d)+'</li>'}).join('');
  return fli('<li class="aq-stage-stacks__stage" style="--i:'+i+'">',b,i)
   +'<div class="aq-stage-stacks__head">'+k(0,'is-ph')+'<h3 class="aq-stage-stacks__name"><span class="aq-stage-stacks__no" aria-hidden="true">'+num+'</span><span class="aq-stage-stacks__nm">'+(r[0]&&typeof r[0]==='object'?tcell({t:p[0],link:r[0].link}):tx(p[0]))+'</span>'
    +(p[1]?'<span class="aq-stage-stacks__ref">'+tx(p.slice(1).join(' · '))+'</span>':'')+'</h3></div>'
   +'<div class="aq-stage-stacks__pile">'+k(2,'is-ph')+'<ul class="aq-stage-stacks__docs" role="list" data-theme="light">'+docs+'</ul></div>'
   +'<span class="aq-stage-stacks__axis"><span class="aq-stage-stacks__run" aria-hidden="true"></span><button type="button" class="aq-stage-stacks__node" aria-pressed="false" aria-label="'+e('Show the file up to '+p[0])+'"></button></span>'
   +'<div class="aq-stage-stacks__who">'+k(1,'is-ph')+'<p class="aq-stage-stacks__step">'+tcell(r[1])+'</p></div></li>'}).join('');
 return sec(H+'<div class="aq-stage-stacks" data-n="'+R.length+'" style="--n:'+R.length+'">'+wFold(b,R.length,'<ol class="aq-stage-stacks__list" role="list">'+list+'</ol>',b.fold_noun||'stages')+'</div>','aq-band--navy aq-stage-stacks-sec')};
/* Stage rail. Ported from Subframe Motion "Chapter timeline scrubber" (cue-scrubber), MIT, (c) 2026 Subframe: one reach
   value is sought (0.5-0.9 s by distance, power2.inOut; a third faster on the way back to the whole file), the water
   fills each stage's run as far as the reach, and stages it has not reached go quiet. Reduced motion: the reach jumps.
   Pointing at a stage or focusing its node seeks it; pressing a node holds that stage until it is pressed again. */
function stRail(el){if(el._st)return el._st;var S=[].slice.call(el.querySelectorAll('.aq-stage-stacks__stage')),n=S.length,st={reach:n,pin:-1,tw:null};el._st=st;
 st.apply=function(){var r=st.reach,v=innerWidth<860;S.forEach(function(s,i){var run=s.querySelector('.aq-stage-stacks__run'),f=Math.max(0,Math.min(1,r-i));
  if(run)run.style.transform=r>=n?'':(v?'scaleY(':'scaleX(')+f.toFixed(3)+')';s.classList.toggle('is-ahead',r<n&&i>r+0.001)})};
 st.seek=function(k,back){var to=k<0?n:k,red=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  S.forEach(function(s,i){s.classList.toggle('is-sel',i===k)});if(st.tw)st.tw.kill();
  if(red||!window.gsap){st.reach=to;st.apply();return}
  var d=Math.min(0.9,0.5+Math.abs(to-st.reach)*0.08)*(back?0.67:1);st.tw=gsap.to(st,{reach:to,duration:d,ease:'power2.inOut',onUpdate:st.apply,onComplete:st.apply})};
 return st}
if(typeof document!=='undefined'&&document.addEventListener){
 var stIdx=function(s){return [].indexOf.call(s.parentNode.children,s)};
 document.addEventListener('mouseover',function(ev){var s=ev.target.closest&&ev.target.closest('.aq-stage-stacks__stage');if(!s||innerWidth<860)return;var el=s.closest('.aq-stage-stacks'),st=stRail(el);if(st.pin<0)st.seek(stIdx(s))});
 document.addEventListener('mouseout',function(ev){var el=ev.target.closest&&ev.target.closest('.aq-stage-stacks__list');if(!el||(ev.relatedTarget&&el.contains(ev.relatedTarget)))return;var st=stRail(el.closest('.aq-stage-stacks'));if(st.pin<0)st.seek(-1,true)});
 document.addEventListener('focusin',function(ev){var b=ev.target.closest&&ev.target.closest('.aq-stage-stacks__node');if(!b)return;var st=stRail(b.closest('.aq-stage-stacks'));if(st.pin<0)st.seek(stIdx(b.closest('.aq-stage-stacks__stage')))});
 document.addEventListener('focusout',function(ev){var b=ev.target.closest&&ev.target.closest('.aq-stage-stacks__node');if(!b||(ev.relatedTarget&&ev.relatedTarget.closest&&ev.relatedTarget.closest('.aq-stage-stacks__node')))return;var st=stRail(b.closest('.aq-stage-stacks'));if(st.pin<0)st.seek(-1,true)});
 document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('.aq-stage-stacks__node');if(!b)return;var el=b.closest('.aq-stage-stacks'),st=stRail(el),k=stIdx(b.closest('.aq-stage-stacks__stage'));
  st.pin=st.pin===k?-1:k;[].forEach.call(el.querySelectorAll('.aq-stage-stacks__node'),function(x){x.setAttribute('aria-pressed',x===b&&st.pin===k?'true':'false')});st.seek(st.pin,st.pin<0)})}
