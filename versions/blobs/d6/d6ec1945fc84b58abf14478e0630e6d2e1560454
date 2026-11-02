/* Look "checker-router" -> CheckerRouter (design-system/components/CheckerRouter): a router table (as: "router") set
   as a Swiss checker of square tiles. Each row is one band of six tiles: a navy numeral tile ("01/"), the situation,
   a filler, what you need, a filler, and the start page as a go tile. The fillers alternate navy and paper so the
   rows read as a checkerboard; a paper filler may carry a tiny IsoKit drawing of the row's subject. Pointing at (or
   focusing) a row trades every tile of that band for its inverse, tile by tile in scattered order (a mosaic).
   Fields, as the router: cols (situation, what you need, start with), rows [situation, need, {t, link, intent}].
   Added: draws ["outlet", "", "", "ro", ""] (optional, one per row: an IsoKit part kind drawn in the row's paper filler).
   Concept: pass 9b ind-pharma.0 (checker grid of navy and limestone tiles, slash numerals, two blueprint tiles). */
(function(){
var K='aq-checker-router';
function lk(c){return c&&typeof c==='object'&&c.link&&wp(c.link)?c:null}
/* scattered blink order for the mosaic: a fixed shuffle per row and tile, 0..5 */
function dl(i,j){return (i*5+j*7+((i*j)%3))%6}
function draw(kind){if(!kind||typeof ISO_PARTS==='undefined'||!ISO_PARTS[kind])return '';
 var ro=kind==='ro',p=isoPart(kind,0,0,0,1),bx=isoBounds(ro?[[-4,-4,0],[116,-4,0],[116,40,0],[-4,40,0],[-4,-4,72],[116,40,72]]:[[-34,-34,0],[34,34,0],[-34,34,0],[34,-34,0],[0,0,72]],8);
 return isoSvg(Math.round(bx.w),Math.round(bx.h),p,'aq-iso--ink '+K+'__svg',{origin:[-bx.x,-bx.y]})}
LOOKS['checker-router']=function(b,H){var C=b.cols||[],R=b.rows||[],D=b.draws||[];
 var rows=R.map(function(r,i){var last=r[r.length-1],go=lk(last),mid=r.slice(1,r.length-1),odd=i%2,j=0;
  function t(cls,inner,tag){var d=dl(i,j++);return '<'+(tag||'div')+' class="'+K+'__tile '+cls+'" style="--d:'+d+'">'+inner+'</'+((tag||'div').split(' ')[0])+'>'}
  var fig=draw(D[i]),paper=t('is-paper'+(fig?' has-fig':''),fig),navy=t('is-navy is-fill','');
  var num=t('is-navy '+K+'__num','<span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'<i>/</i></span>');
  var sit=t('is-lime '+K+'__sit','<span class="'+K+'__k">'+tx(C[0]||'')+'</span><h3 class="'+K+'__t">'+tx(r[0])+'</h3>');
  var need=t('is-lime '+K+'__need',mid.map(function(c,k){return '<span class="'+K+'__k">'+tx(C[k+1]||'')+'</span><p class="'+K+'__d">'+tcell(c)+'</p>'}).join(''));
  var cell=go?t('is-lime '+K+'__go','<span class="'+K+'__k">'+tx(C[r.length-1]||'')+'</span><span class="'+K+'__to">'+tx(go.t)+'</span><span class="'+K+'__arrow" aria-hidden="true"></span>',
    'a href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':''))
   :t('is-lime '+K+'__go is-flat','<span class="'+K+'__k">'+tx(C[r.length-1]||'')+'</span><span class="'+K+'__to">'+tcell(last)+'</span>');
  return '<li class="'+K+'__row">'+num+sit+(odd?navy:paper)+need+(odd?paper:navy)+cell+'</li>'}).join('');
 return sec(H+'<ol class="'+K+'" role="list">'+rows+'</ol>',K+'-sec')};
/* the row in hand (pointer or focus) shows its inverse; the mosaic timing is CSS (--d per tile) */
function on(row,v){if(row)row.classList.toggle('is-on',v)}
document.addEventListener('pointerover',function(ev){if(ev.pointerType==='touch')return;var r=ev.target.closest&&ev.target.closest('.'+K+'__row');if(r)on(r,true)});
document.addEventListener('pointerout',function(ev){var r=ev.target.closest&&ev.target.closest('.'+K+'__row');if(r&&!(ev.relatedTarget&&r.contains(ev.relatedTarget))&&!r.contains(document.activeElement))on(r,false)});
document.addEventListener('focusin',function(ev){var r=ev.target.closest&&ev.target.closest('.'+K+'__row');if(r)on(r,true)});
document.addEventListener('focusout',function(ev){var r=ev.target.closest&&ev.target.closest('.'+K+'__row');if(r&&!(ev.relatedTarget&&r.contains(ev.relatedTarget))&&!r.matches(':hover'))on(r,false)});
})();
