/* Look "levelling-sheet" -> LevellingSheet (design-system/components/LevellingSheet): quotes levelled line by line
   (pass 12 build D, concept 250, audit row 31). On the limestone ground, the lines to level and what to ask of every
   quote run down the left; beside them three sheets stand on the same ruled lines: Quote A, Quote B and ours. On A and
   B a line is either written (two grey strokes) or a gap (hatched blank cell); on ours every line is written and links
   to where we state it. A navy straightedge lies across the line in hand and glides to the line pointed at or
   focused (Subframe "Chart crosshair", see style.css and the script below).
   Fields, as the evidence table: h, intro, cols [line, ask, where ours states it], rows [line, ask, {t, link, intent}].
   quotes (look-only, optional): the two other quotes' sheet labels, default ["Quote A", "Quote B"] (a French page sets
   its own; the field needs adding to NOT_COPY before a page uses it).
   The concept's row labels and figures are not used: the rows are the block's. The two other quotes are drawing
   furniture (aria-hidden): which of their lines are gaps is a fixed pattern, not a claim about any supplier.
   Phones (860 and under): one checklist of the lines, about 1,000 px for eight: number and line, then A and B as
   small boxes (written or hatched) at the right, the ask under it, and our answer as the row's link (the whole row is
   the 44 px+ target). */
(function(){
/* which lines the two other quotes leave blank (a fixed, spread pattern) */
function lsGap(q,i){return q==='a'?i%3===1:(i%4===0||i%4===3)}
LOOKS['levelling-sheet']=function(b,H){var C=b.cols||[],R=b.rows||[],n=R.length,Q=Array.isArray(b.quotes)&&b.quotes.length===2?b.quotes:['Quote A','Quote B'];
 var cell=function(q,i){var g=lsGap(q,i);return '<span class="aq-levelling-sheet__c is-'+q+(g?' is-gap':' is-said')+'" aria-hidden="true"><span class="aq-levelling-sheet__q">'+q.toUpperCase()+'</span><i></i><i></i></span>'};
 var rows=R.map(function(r,i){var go=r[2],lk=go&&typeof go==='object'&&go.link&&wp(go.link);
  var ours=lk?'<a class="aq-levelling-sheet__go" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':'')+'><span class="aq-levelling-sheet__k">'+tx(C[2]||'')+': </span><span class="aq-levelling-sheet__gt">'+tx(go.t)+'</span></a>'
   :(go?'<p class="aq-levelling-sheet__go"><span class="aq-levelling-sheet__k">'+tx(C[2]||'')+': </span><span class="aq-levelling-sheet__gt">'+tcell(go)+'</span></p>':'');
  return '<li class="aq-levelling-sheet__row" data-i="'+i+'">'
   +'<div class="aq-levelling-sheet__line">'+idx(i)+'<h3 class="aq-levelling-sheet__t">'+tx(r[0])+'</h3></div>'
   +'<p class="aq-levelling-sheet__ask"><span class="aq-levelling-sheet__k">'+tx(C[1]||'')+': </span>'+tx(r[1])+'</p>'
   +cell('a',i)+cell('b',i)
   +'<div class="aq-levelling-sheet__c is-ours"><span class="aq-levelling-sheet__tick" aria-hidden="true"></span>'+ours+'</div></li>'}).join('');
 var heads='<p class="aq-levelling-sheet__h is-line" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span></p>'
  +'<p class="aq-levelling-sheet__h is-a" aria-hidden="true">'+tx(Q[0])+'</p><p class="aq-levelling-sheet__h is-b" aria-hidden="true">'+tx(Q[1])+'</p>'
  +'<p class="aq-levelling-sheet__h is-ours" aria-hidden="true">'+tx(C[2]||'')+'</p>';
 return '<section class="aq-section aq-section--alt aq-levelling-sheet-sec"><div class="aq-in aq-stack-l">'+H
  +'<div class="aq-levelling-sheet" style="--ls-n:'+n+'">'
  +'<span class="aq-levelling-sheet__paper is-a" aria-hidden="true"></span><span class="aq-levelling-sheet__paper is-b" aria-hidden="true"></span><span class="aq-levelling-sheet__paper is-ours" aria-hidden="true"></span>'
  +heads+'<ol class="aq-levelling-sheet__rows" role="list">'+rows+'</ol>'
  +'<span class="aq-levelling-sheet__edge" aria-hidden="true"></span></div></div></section>'};
/* the straightedge: lies across the line in hand (the first by default) and glides to the line pointed at or focused
   (Ported from Subframe Motion "Chart crosshair" (chart-crosshair), MIT, (c) 2026 Subframe: kept the rule that snaps
   to the hovered row with a short strong ease-out and jumps for keyboard focus; replaced the chart with the sheet's
   ruled lines). The glide is a CSS transition on --ls-y (instant under reduced motion). */
function place(w,i,jump){var r=w.querySelector('.aq-levelling-sheet__row[data-i="'+i+'"]'),ed=w.querySelector('.aq-levelling-sheet__edge');if(!r||!ed)return;
 if(getComputedStyle(ed).display==='none')return;
 var wr=w.getBoundingClientRect(),rr=r.getBoundingClientRect(),y=rr.bottom-wr.top;
 if(jump)ed.classList.add('is-jump');ed.style.setProperty('--ls-y',y.toFixed(1)+'px');if(jump){void ed.offsetWidth;ed.classList.remove('is-jump')}
 [].forEach.call(w.querySelectorAll('.aq-levelling-sheet__row'),function(x){x.classList.toggle('is-on',x===r)});w.setAttribute('data-on',i)}
window.AQlevel={place:place};
if(window.ResizeObserver&&window.MutationObserver){var ro=new ResizeObserver(function(es){es.forEach(function(en){var w=en.target;place(w,w.getAttribute('data-on')||'0',true)})});
 var scan=function(n){if(n.nodeType!==1)return;var L=n.matches('.aq-levelling-sheet')?[n]:[].slice.call(n.querySelectorAll('.aq-levelling-sheet'));
  L.forEach(function(w){if(w.__lsl)return;w.__lsl=1;ro.observe(w);place(w,'0',true)})};
 new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,scan)})}).observe(document.documentElement,{childList:true,subtree:true});
 if(document.body)scan(document.body)}
var rowOf=function(t){return t&&t.closest&&t.closest('.aq-levelling-sheet__row')};
document.addEventListener('pointerover',function(ev){var r=rowOf(ev.target);if(!r||ev.pointerType==='touch')return;place(r.closest('.aq-levelling-sheet'),r.getAttribute('data-i'))});
document.addEventListener('focusin',function(ev){var r=rowOf(ev.target);if(r)place(r.closest('.aq-levelling-sheet'),r.getAttribute('data-i'),true)});
})();
