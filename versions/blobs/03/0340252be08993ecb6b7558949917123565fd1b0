/* Look "versus-spread" -> VersusSpread (design-system/components/VersusSpread): a FAT versus SAT table (table, as
   "versus") set as an editorial spread. A navy mast bleeds off the left edge of the page with the heading at display
   scale in light type; under it the comparison sits on the page ground as a numbered, hairline-ruled table (test,
   then the FAT column, then the SAT column), closed by the conclusion row. At the right, one line drawing: the
   installed system in elevation (the skid with its RO housings, pump, control panel, outlet instrument and divert
   valve to drain, the field piping up to the storage tank, the distribution loop with its points of use, the site's
   utilities), with two boundaries: the test bay's around the skid (FAT) and the site's around everything (SAT).
   Pointing at or focusing a row lights the parts that test covers, so the reader sees what FAT can and cannot reach;
   the conclusion row lights the FAT boundary itself. The script adds a reading lens (see motion.js).
   Fields, as a versus table: cols [test, FAT label, SAT label] (the two labels also tag the drawing's boundaries),
   rows [[test, FAT cell, SAT cell]] (strings or {t, link}), conclusion [label, FAT side, SAT side], fold, fold_noun
   (the fold applies on phones only), row_parts (optional, one string per row: space-separated drawing parts the test
   covers, any of skid, ro, pump, panel, inst, valve, pipe, tank, loop, pou, util).
   Phones (pass 12): the mast full width; under it the drawing at 240 px beside a FAT / SAT switch (two 48 px buttons
   styled as the two boundaries) that lights that boundary and switches every row, the conclusion included, to that
   side's cell; all rows show (no fold). Tapping a row still lights its parts and names it under the switch.
   Verify fix (V5): the drawing and the switch are a PhoneKit sticky strip (200 px) over the rows, so the switch stays
   in reach to row 08 and the conclusion, and the row on the reading line lights its parts (and the conclusion the
   test bay); the side label is said once, by the switch (screen readers keep it per cell). 600-860 px: no switch,
   both sides side by side under a sticky two-column head.
   Round C: under 600 px the strip's drawing is cropped to the zone the row on the reading line tests (data-zone: the
   test bay, or the site loop once a test reaches the field piping, tank, loop or points of use), at the strip's full
   height with 1.5 px strokes and no labels. */
var VS_PARTS=['skid','ro','pump','panel','inst','valve','pipe','tank','loop','pou','util'];
function vsFig(C){var P='aq-versus-spread'+'__';
 function G(p,inner){return '<g class="'+P+'part" data-p="'+p+'">'+inner+'</g>'}
 function pipe(d){return '<path class="'+P+'wall" d="'+d+'"/><path class="'+P+'bore" d="'+d+'"/><path class="'+P+'water" d="'+d+'"/>'}
 function L(d,c){return '<path class="'+P+(c||'eq')+'" d="'+d+'"/>'}
 var s='';
 /* boundaries: the site around everything, the test bay around the skid */
 s+='<rect class="'+P+'bound '+P+'bound--sat" x="8" y="40" width="384" height="552"/>';
 s+='<rect class="'+P+'bound '+P+'bound--fat" data-p="fat" x="24" y="300" width="212" height="236"/>';
 /* utilities: the site's header under the skid, two connections up to it */
 s+=G('util',L('M24 572H236M88 572V520M150 572V520M80 566H96M142 566H158','thin'));
 /* skid piping: RO outlet to the riser, inside the test bay */
 s+=G('skid pipe',pipe('M180 443H196V300'));
 /* field piping: the riser up and over to the storage tank */
 s+=G('pipe',pipe('M196 300V70H310V96'));
 /* distribution loop: tank down, round the points of use, back into the tank */
 s+=G('loop pipe',pipe('M348 214H370V560H252V200H272'));
 /* skid: frame, two membrane housings, pump */
 s+=G('skid',L('M40 420H216V520H40Z')+L('M40 508H216','thin'));
 s+=G('ro',L('M52 436H180V450H52Z')+L('M52 460H180V474H52Z')+L('M180 443V467','thin'));
 s+=G('pump skid',L('M81 498A11 11 0 1 1 59 498A11 11 0 1 1 81 498Z')+L('M65 491L77 498L65 505','thin'));
 /* control panel, door ajar */
 s+=G('panel',L('M40 344H80V404H40Z')+L('M48 354H72M48 362H66M48 370H70','thin')+L('M80 344L92 352V412L80 404','thin'));
 /* outlet instrument on the riser */
 s+=G('inst',L('M196 400H180','thin')+L('M180 400A10 10 0 1 1 160 400A10 10 0 1 1 180 400Z'));
 /* three-way divert valve on the riser, branch to drain */
 s+=G('valve',L('M188 344L196 356L204 344ZM188 368L196 356L204 368Z')+L('M196 356H140V374M128 378H152M132 384H148M137 390H143','thin'));
 /* storage tank, polypropylene (fix round, N6): a flat-bottom cylinder on its plinth, a low-cone roof with the
    riser's nozzle at the crown, the loop leaving by a side outlet at the foot; never a dished-head vessel */
 s+=G('tank',L('M272 112H348V224H272Z')+L('M266 224H354V232H266Z','thin')+L('M272 112L310 100L348 112','thin')+L('M310 100V96','thin')+L('M272 140H348','thin'));
 /* loop pump (on the loop's drop by the tank) and points of use */
 s+=G('loop',L('M379 250A9 9 0 1 1 361 250A9 9 0 1 1 379 250Z'));
 s+=G('pou',L('M370 360H346V376M370 470H346V486','thin')+L('M350 354L356 360L350 366ZM362 354L356 360L362 366Z')+L('M350 464L356 470L350 476ZM362 464L356 470L362 476Z'));
 return '<svg class="'+P+'svg" viewBox="0 0 400 600" aria-hidden="true" focusable="false">'+s+'</svg>'
  +'<span class="'+P+'tag '+P+'tag--sat" aria-hidden="true">'+tx(C[2]||'')+'</span>'
  +'<span class="'+P+'tag '+P+'tag--fat" aria-hidden="true">'+tx(C[1]||'')+'</span>'}
LOOKS['versus-spread']=function(b,H){var C=b.cols||[],R=b.rows||[],K=b.conclusion||[],RP=b.row_parts||[],n=R.length;
 function parts(s){return String(s||'').split(/\s+/).filter(function(p){return VS_PARTS.indexOf(p)>-1}).join(' ')}
 function na(c){var t=c&&typeof c==='object'?c.t:c;return /^not possible\b/i.test(String(t||''))}
 function cell(c,k){return '<div class="aq-versus-spread__c aq-versus-spread__c--'+k+(na(c)?' is-na':'')+'" role="cell">'
  +'<span class="aq-versus-spread__k" aria-hidden="true">'+tx(C[k==='fat'?1:2]||'')+'</span>'+tcell(c)+'</div>'}
 var rows=R.map(function(r,i){return fli('<div class="aq-versus-spread__row" role="row" tabindex="0" data-i="'+i+'" data-pk-row="'+i+'" data-parts="'+parts(RP[i])+'">'
  +'<div class="aq-versus-spread__test" role="rowheader"><span class="aq-versus-spread__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
  +'<span class="aq-versus-spread__tn">'+tcell(r[0])+'</span></div>'+cell(r[1],'fat')+cell(r[2],'sat')+'</div>',b,i)}).join('');
 var head='<div class="aq-versus-spread__hrow" role="row">'+[0,1,2].map(function(k){return '<span class="aq-versus-spread__h" role="columnheader">'+tx(C[k]||'')+'</span>'}).join('')+'</div>';
 var end=K.length?'<div class="aq-versus-spread__end" role="row" tabindex="0" data-i="'+n+'" data-pk-row="'+n+'" data-parts="fat">'
  +'<div class="aq-versus-spread__test" role="rowheader"><span class="aq-versus-spread__reuse">'+tx(K[0]||'')+'</span></div>'
  +cell(K[1]||'','fat')+cell(K[2]||'','sat')+'</div>':'';
 var table=wFold(b,n,'<div class="aq-versus-spread__table" role="table" aria-label="'+e(b.h||'')+'">'+head
  +'<div class="aq-versus-spread__rows" role="rowgroup"><span class="aq-versus-spread__lens" aria-hidden="true"></span>'+rows+'</div></div>',b.fold_noun||'tests');
 var mast='<div class="aq-versus-spread__mast" data-theme="dark"><div class="aq-versus-spread__top" aria-hidden="true"><span>'+tx(b.nav||'')+'</span><span>'+e(wCount(b,n,'tests'))+'</span></div>'+H+'</div>';
 var fig='<figure class="aq-versus-spread__fig" data-pk-fig><div class="aq-versus-spread__art">'+vsFig(C)+'</div>'
  +'<figcaption class="aq-versus-spread__now" aria-hidden="true"><span class="aq-versus-spread__count">'+String(n).padStart(2,'0')+' '+e(b.fold_noun||'tests')+'</span>'
  +'<span class="aq-versus-spread__now-t"></span></figcaption>'
  +'<div class="aq-versus-spread__mode" role="group" aria-label="'+e((C[1]||'')+' / '+(C[2]||''))+'">'
  +['fat','sat'].map(function(k,j){return '<button type="button" class="aq-versus-spread__mb aq-versus-spread__mb--'+k+'" data-vs-side="'+k+'" aria-pressed="'+(j?'false':'true')+'">'+tx(C[j+1]||k.toUpperCase())+'</button>'}).join('')+'</div></figure>';
 return '<section class="aq-section aq-versus-spread-sec"><div class="aq-in"><div class="aq-versus-spread" data-side="fat" data-zone="bay" data-pk-sticky data-pk-h="200" style="--n:'+n+'">'+mast+fig
  +'<div class="aq-versus-spread__body">'+table+end+'</div></div></div></section>'};
/* Point at or focus a row: light the parts its test covers, name it under the drawing. vsShow is shared with motion.js
   (the reading lens drives the same state); i = -1 clears. Works without GSAP and under reduced motion. */
function vsShow(w,i){if(!w)return;var rows=[].slice.call(w.querySelectorAll('[data-parts]')),r=rows.filter(function(x){return +x.getAttribute('data-i')===i})[0];
 var on=r?(' '+r.getAttribute('data-parts')+' '):'';w.classList.toggle('has-on',!!r);
 rows.forEach(function(x){x.classList.toggle('is-on',x===r)});
 /* pass 12 round C: the zone the phone strip crops to (CSS reads it only while PhoneKit is on): the site loop for a
    test that reaches the field piping, tank, loop or points of use, else the test bay */
 w.setAttribute('data-zone',r?(/ (pipe|tank|loop|pou) /.test(on)?'site':'bay'):(w.getAttribute('data-side')==='sat'?'site':'bay'));
 [].forEach.call(w.querySelectorAll('.aq-versus-spread__part, .aq-versus-spread__bound--fat'),function(p){var ps=p.getAttribute('data-p').split(' ');
  p.classList.toggle('is-on',ps.some(function(k){return on.indexOf(' '+k+' ')>-1}))});
 var c=w.querySelector('.aq-versus-spread__count'),t=w.querySelector('.aq-versus-spread__now-t'),total=rows.length-(w.querySelector('.aq-versus-spread__end')?1:0);
 if(!c||!t)return;
 if(!c.hasAttribute('data-all'))c.setAttribute('data-all',c.textContent);
 if(!r){c.textContent=c.getAttribute('data-all');t.textContent='';return}
 var nm=r.querySelector('.aq-versus-spread__tn, .aq-versus-spread__reuse');
 c.textContent=i<total?String(i+1).padStart(2,'0')+' / '+String(total).padStart(2,'0'):'';t.textContent=nm?nm.textContent:''}
window.vsShow=vsShow;
(function(){function row(ev){return ev.target.closest&&ev.target.closest('.aq-versus-spread [data-parts]')}
 function back(w){vsShow(w,w&&w.hasAttribute('data-lens')?+w.getAttribute('data-lens'):-1)}
 document.addEventListener('pointerover',function(ev){var r=row(ev);if(!r||ev.pointerType==='touch')return;var w=r.closest('.aq-versus-spread');w.setAttribute('data-hold','');vsShow(w,+r.getAttribute('data-i'))});
 document.addEventListener('pointerout',function(ev){var r=row(ev);if(!r||(ev.relatedTarget&&r.contains(ev.relatedTarget)))return;var w=r.closest('.aq-versus-spread');
  if(ev.relatedTarget&&ev.relatedTarget.closest&&ev.relatedTarget.closest('.aq-versus-spread [data-parts]'))return;w.removeAttribute('data-hold');back(w)});
 document.addEventListener('focusin',function(ev){var r=row(ev);if(!r)return;var w=r.closest('.aq-versus-spread');w.setAttribute('data-hold','');vsShow(w,+r.getAttribute('data-i'))});
 /* phones: the FAT / SAT switch (state, not motion: works with motion off) */
 document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('[data-vs-side]');if(!b)return;var w=b.closest('.aq-versus-spread');if(!w)return;
  w.setAttribute('data-side',b.getAttribute('data-vs-side'));[].forEach.call(w.querySelectorAll('[data-vs-side]'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false')})});
 /* phones: the row on PhoneKit's reading line lights its parts on the sticky strip (index -1 clears) */
 document.addEventListener('pk:change',function(ev){var w=ev.target;if(!w||!w.classList||!w.classList.contains('aq-versus-spread')||w.hasAttribute('data-hold'))return;
  var k=ev.detail&&ev.detail.on&&ev.detail.key!=null?+ev.detail.key:-1;vsShow(w,k>=0?k:-1)});
 document.addEventListener('focusout',function(ev){var r=row(ev);if(!r)return;var w=r.closest('.aq-versus-spread');if(ev.relatedTarget&&ev.relatedTarget.closest&&ev.relatedTarget.closest('.aq-versus-spread [data-parts]'))return;w.removeAttribute('data-hold');back(w)})})();
