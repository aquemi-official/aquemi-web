/* Look "use-matrix" -> UseMatrix (design-system/components/UseMatrix): an industry-by-use table drawn as one water
   main. A twin-wall pipe runs along the column heads and tees down into every use column; each row is an industry
   (its name the link to its page), each cell a square on the column's drop line: a filled navy square where the
   content sets a grade, an open square where the cell is a dash. The cell's text sits beside its square, and its
   bracketed source (a short "(EMA)", "(ST108:2023)", 24 characters or fewer) is set as a small mono tag. Pointing at a cell
   lights its column and its tee.
   Concept: design-system/inspiration/gemini/194-p12-industries-matrix-take2.png (idea only; its rows, columns and fully
   filled grid are not ours: the blank pattern is the content's own).
   Fields (a table block): cols [row label, use 1 … use n] (2 to 6 uses), rows ([industry string or {t, link}, cell …];
   a cell "—" or "-" or "" is a blank), intro.
   Phones (PhoneKit accordion): a riser down the left with one tap row per industry branching off it, each carrying its
   row in miniature (one numbered square per use, filled or open, the uses named once in a key above); the open row
   lists its set uses as navy chips with their text, its blanks as open chips, and its page as a 48 px row link.
   Without script every row shows open. */
function umBlank(c){var s=String(c&&typeof c==='object'?c.t:c==null?'':c).trim();return !s||s==='—'||s==='-'||s==='–'}
function umText(c){var h=tcell(c);return h.replace(/\s*\(([^()]{1,24})\)/g,' <span class="aq-use-matrix__src">$1</span>')}
LOOKS['use-matrix']=function(b,H){var C=b.cols||[],U=C.slice(1,7),R=(b.rows||[]).filter(function(r){return r&&r.length}),K='aq-use-matrix',n=U.length;
 var num=function(j){return String(j+1)};
 var heads='<div class="'+K+'__heads" aria-hidden="true"><p class="'+K+'__h0">'+tx(C[0]||'')+'</p>'
  +U.map(function(u,j){return '<p class="'+K+'__h" data-c="'+j+'"><span class="'+K+'__drop"><span class="'+K+'__water"></span></span><span class="'+K+'__hn">'+num(j)+'</span>'+tx(u)+'</p>'}).join('')+'</div>';
 var key='<ol class="'+K+'__key" aria-hidden="true">'+U.map(function(u,j){return '<li><span class="'+K+'__ks">'+num(j)+'</span>'+tx(u)+'</li>'}).join('')+'</ol>';
 var rows=R.map(function(r,i){var nm=r[0]&&typeof r[0]==='object'?r[0].t:r[0],go=r[0]&&typeof r[0]==='object'&&r[0].link&&wp(r[0].link)?r[0].link:'';
  var strip=U.map(function(u,j){return '<span class="'+K+'__ms'+(umBlank(r[j+1])?'':' is-set')+'">'+num(j)+'</span>'}).join('');
  var cells=U.map(function(u,j){var c=r[j+1],bl=umBlank(c);
   return '<div class="'+K+'__cell'+(bl?' is-blank':' is-set')+'" data-c="'+j+'"><span class="'+K+'__sq" aria-hidden="true"></span>'
    +'<p class="'+K+'__v"><span class="'+K+'__k">'+tx(u)+'</span> '+(bl?'<span class="'+K+'__dash">—</span><span class="'+K+'__sr">no grade set</span>':umText(c))+'</p></div>'}).join('');
  return '<li class="'+K+'__row" data-pk-item="'+i+'" style="--i:'+i+'">'
   +'<button type="button" class="'+K+'__tap" data-pk-head><span class="'+K+'__tt">'+tx(nm)+'</span><span class="'+K+'__strip" aria-hidden="true">'+strip+'</span><span class="aq-phone-kit__chev" aria-hidden="true"></span></button>'
   +'<h3 class="'+K+'__name" data-pk-desk>'+tcell(r[0])+'</h3>'
   +'<div class="'+K+'__cells" data-pk-body>'+cells+(go?'<a class="aq-phone-kit__go '+K+'__go" href="#'+e(go)+'" data-wp="'+e(go)+'">'+tx(nm)+'</a>':'')+'</div></li>'}).join('');
 return sec(H+'<div class="'+K+'" style="--c:'+n+'">'+heads+key
  +'<ol class="'+K+'__list" role="list" data-pk-picker="accordion" data-pk-open="0">'+rows+'</ol></div>',K+'-sec')};
/* Pointing at a cell (or a column head) lights its column and its tee */
(function(){function col(ev,on){var c=ev.target.closest&&ev.target.closest('.aq-use-matrix [data-c]');if(!c)return;var r=c.closest('.aq-use-matrix');
  [].forEach.call(r.querySelectorAll('[data-c="'+c.getAttribute('data-c')+'"]'),function(el){el.classList.toggle('is-col',on)})}
 document.addEventListener('mouseover',function(ev){col(ev,true)});document.addEventListener('mouseout',function(ev){col(ev,false)});
 document.addEventListener('focusin',function(ev){col(ev,true)});document.addEventListener('focusout',function(ev){col(ev,false)})})();
