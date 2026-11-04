/* Look "proof-folders" -> ProofFolders (design-system/components/ProofFolders): an evidence table as a drawer of manila
   folders, one per standard, stacked so each tab shows over the folder in front of it. The standard is set large on
   the ground beside its folder; inside, what we design to is typed on a slip, the proof is a fan of clipped sheets
   (one per ";" item) struck with a rubber stamp of the standard's code, and where we show it is the folder's navy
   index label (the row's link).
   Fields, as a table: cols [standard, what we design to, proof, where we show it], rows (cells strings or {t, link}),
   fold, fold_noun. The code on the tab and the stamp is the standard cell up to its number ("USP <645>", "Ph. Eur.
   0008"), else its first word ("EMA"); the rest of the cell is the standard's title under it.
   Phones (pass 12, S11): the folders are a snap row at 85 % width (the next folder peeking), every standard in the
   row, folded or not; over it a strip of the folders' codes (44 px tabs) jumps to a folder and follows the swipe
   (AQsnap, parts/Snap.js). Each folder keeps its tab, typed slip, clipped sheets, stamp and navy label, at half the padding,
   with the sheets inside the gutter. */
function pfCode(s){s=String(s||'');var m=s.match(/^(.*?(?:<\d+>|\b\d[\d.]*))\s+(\S.*)$/);return m?[m[1],m[2]]:[s.split(/\s+/)[0],s.slice(s.split(/\s+/)[0].length).trim()]}
LOOKS['proof-folders']=function(b,H){var C=b.cols||[],R=b.rows||[];
 var k=function(i){return '<p class="aq-proof-folders__k">'+tx(C[i]||'')+'</p>'};
 var heads='<div class="aq-proof-folders__cols" aria-hidden="true">'+C.slice(0,4).map(function(c){return '<span>'+tx(c)+'</span>'}).join('')+'</div>';
 var list='<ol class="aq-proof-folders__list" role="list" data-snap>'+R.map(function(r,i){
  var name=String(r[0]&&typeof r[0]==='object'?r[0].t:r[0]||''),c=pfCode(name),proof=String(r[2]&&typeof r[2]==='object'?r[2].t:r[2]||'');
  var sheets=proof.split(/\s*;\s*/).filter(Boolean).map(function(x,j){return '<li class="aq-proof-folders__sheet" style="--j:'+j+'">'+tx(x.charAt(0).toUpperCase()+x.slice(1))+'</li>'}).join('');
  var go=r[3]!=null?tcell(r[3]):'';
  return fli('<li class="aq-proof-folders__row'+(i?'':' is-snap')+'" style="--i:'+i+'">',b,i)
   +idx(i)+'<div class="aq-proof-folders__std"><h3 class="aq-proof-folders__name"><span class="aq-proof-folders__code">'+tx(c[0])+'</span>'+(c[1]?' <span class="aq-proof-folders__title">'+tx(c[1])+'</span>':'')+'</h3></div>'
   +'<div class="aq-proof-folders__folder" data-theme="light">'
    +'<span class="aq-proof-folders__tab" aria-hidden="true">'+tx(c[0])+'</span>'
    +'<div class="aq-proof-folders__how">'+k(1)+'<p class="aq-proof-folders__slip">'+tcell(r[1])+'</p></div>'
    +'<div class="aq-proof-folders__proof">'+k(2)+'<span class="aq-proof-folders__clip" aria-hidden="true"></span><ul class="aq-proof-folders__sheets">'+sheets+'</ul>'
     +'<span class="aq-proof-folders__stamp" aria-hidden="true"><span>'+tx(c[0])+'</span><span>'+tx(C[2]||'')+'</span></span></div>'
    +(go?'<div class="aq-proof-folders__go">'+k(3)+'<p class="aq-proof-folders__label">'+go+'</p></div>':'')
   +'</div></li>'}).join('')+'</ol>';
 var tabs='<div class="aq-proof-folders__tabs" role="group" aria-label="'+e(String(C[0]&&C[0].t||C[0]||''))+'">'+R.map(function(r,i){var c=pfCode(String(r[0]&&typeof r[0]==='object'?r[0].t:r[0]||''));
  return '<button type="button" class="aq-proof-folders__tb" data-snap-to="'+i+'"'+(i?'':' aria-current="true"')+'>'+tx(c[0])+'</button>'}).join('')+'</div>';
 return sec(H+'<div class="aq-proof-folders" data-snap-box>'+heads+tabs+wFold(b,R.length,list,b.fold_noun||'standards')+'</div>','aq-proof-folders-sec')};
/* Snap rail: AQsnap lives in assets/src/parts/Snap.js (pass 12 round C; this look's copy removed) */
/* the code strip (phones): is-more while it can still scroll on, so its right edge fades (round C); checked on the
   strip's own scroll and, through a ResizeObserver on each strip, whenever its size changes. New strips are found as
   other looks find theirs (decision-valve): the observer only asks for an unmarked strip, so a batch with none costs
   one querySelector (round C verify F9) */
(function(){if(typeof document==='undefined'||!document.addEventListener)return;
 var S='.aq-proof-folders__tabs',RO=typeof ResizeObserver!=='undefined'?new ResizeObserver(function(E){E.forEach(function(x){more(x.target)})}):null,queued=0;
 function more(t){t.classList.toggle('is-more',t.scrollWidth>t.clientWidth+1&&t.scrollLeft+t.clientWidth<t.scrollWidth-2)}
 function scan(){queued=0;[].forEach.call(document.querySelectorAll(S+':not([data-pfm])'),function(t){t.setAttribute('data-pfm','');if(RO)RO.observe(t);more(t)})}
 function soon(){if(!queued){queued=1;requestAnimationFrame(scan)}}
 document.addEventListener('scroll',function(ev){var t=ev.target;if(t&&t.nodeType===1&&t.classList.contains('aq-proof-folders__tabs'))more(t)},true);
 if(!RO)addEventListener('resize',function(){[].forEach.call(document.querySelectorAll(S),more)});
 if(typeof MutationObserver!=='undefined')new MutationObserver(function(){if(!queued&&document.querySelector(S+':not([data-pfm])'))soon()}).observe(document.documentElement,{childList:true,subtree:true});
 if(document.readyState!=='loading')soon();else document.addEventListener('DOMContentLoaded',soon)})();
