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
   (AQsnap, below). Each folder keeps its tab, typed slip, clipped sheets, stamp and navy label, at half the padding,
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
