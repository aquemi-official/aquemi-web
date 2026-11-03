/* Look "membrane-face" -> MembraneFace (design-system/components/MembraneFace): RO feed targets as a bento around the
   thing they protect. The middle tile is the feed end of a spiral-wound reverse osmosis element, drawn large on navy
   (pressure vessel wall, anti-telescoping spokes, membrane leaves spiralling out from the permeate tube), with the
   block note as its caption; numbered marks on its rim answer the six target tiles around it. Each tile: index,
   parameter, the target set large in Geist Mono (a placeholder or a worded target set in the sans), the basis under a
   hairline. Phones (pass 12, S10): the element with its six ring numbers is the header (the numbers are 44 px buttons),
   the targets a scroll-snap row of compact cards under it; tapping a ring number brings its card into the row, and
   the card in view lights its number on the rim (state in this file, so it works with motion off).
   Behind the drawn face the element's body runs back, a quarter cut away to show the wound leaves (FxCutaway,
   ambient WebGL, aria-hidden, faint limestone on the navy).
   Fields (a spec block): h, caption (eyebrow), intro, rows [{p, v, m, hl}], note. No new fields. */
(function(){
var K='aq-membrane-face';
function f1(n){return Math.round(n*10)/10}
/* "< 0.05 mg/L as Cl₂ [confirm]" -> {pre, c, n, rest}; null when the value has no comparator and number */
function parse(v){var s=String(v||''),m=s.match(/^\s*([^\[<≤>≥\d]*?)\s*([<≤>≥])\s*(\d+(?:\.\d+)?)\s*(.*)$/);return m?{pre:m[1],c:m[2],n:m[3],rest:m[4]}:null}
function spiral(a0,turns,r0,r1){var d='',N=Math.round(turns*48);for(var i=0;i<=N;i++){var t=i/N,a=a0+t*turns*Math.PI*2,r=r0+(r1-r0)*t;d+=(i?'L':'M')+f1(200+r*Math.cos(a))+' '+f1(200+r*Math.sin(a))}return d}
function face(n){var o='',i;
 o+='<circle class="'+K+'__ring '+K+'__ring--wall" cx="200" cy="200" r="178"/><circle class="'+K+'__ring" cx="200" cy="200" r="168"/>';
 o+='<circle class="'+K+'__ring '+K+'__ring--atd" cx="200" cy="200" r="154"/>';
 for(i=0;i<6;i++)o+='<path class="'+K+'__leaf" d="'+spiral(i*Math.PI/3,1.15,30,152)+'"/>';
 var sp='';for(i=0;i<8;i++){var a=i*Math.PI/4+Math.PI/8;sp+='M'+f1(200+34*Math.cos(a))+' '+f1(200+34*Math.sin(a))+'L'+f1(200+152*Math.cos(a))+' '+f1(200+152*Math.sin(a))}
 o+='<path class="'+K+'__spoke" d="'+sp+'"/>';
 o+='<circle class="'+K+'__tube" cx="200" cy="200" r="26"/><circle class="'+K+'__ring" cx="200" cy="200" r="18"/>';
 for(i=0;i<6;i++){var b=i*Math.PI/3;o+='<circle class="'+K+'__hole" cx="'+f1(200+22*Math.cos(b))+'" cy="'+f1(200+22*Math.sin(b))+'" r="1.6"/>'}
 /* rim marks: one per target, towards its tile in the bento (tiles 1, 2 above right; 3, 5 left; 4, 6 right) */
 var ang=[-72,-28,208,14,152,56],mk='';
 for(i=0;i<n&&i<ang.length;i++){var c=ang[i]*Math.PI/180,p0=[200+178*Math.cos(c),200+178*Math.sin(c)],p1=[200+196*Math.cos(c),200+196*Math.sin(c)];
  mk+='<g class="'+K+'__mark" data-i="'+i+'"><path class="'+K+'__tick" d="M'+f1(p0[0])+' '+f1(p0[1])+'L'+f1(p1[0])+' '+f1(p1[1])+'"/><circle class="'+K+'__pin" cx="'+f1(p0[0])+'" cy="'+f1(p0[1])+'" r="3"/>'
   +'<text class="'+K+'__num" x="'+f1(200+212*Math.cos(c))+'" y="'+f1(200+212*Math.sin(c)+4)+'">'+(i<9?'0':'')+(i+1)+'</text></g>'}
 return '<svg class="'+K+'__svg" viewBox="-30 -30 460 460" aria-hidden="true" focusable="false">'+o+mk+'</svg>'}
/* phone: the rim numbers as buttons over the drawing (same angles and radius as face()) */
function jumps(rows){var ang=[-72,-28,208,14,152,56],o='';
 for(var i=0;i<rows.length&&i<ang.length;i++){var c=ang[i]*Math.PI/180,x=(200+212*Math.cos(c)+30)/460*100,y=(200+212*Math.sin(c)+30)/460*100;
  o+='<button type="button" class="'+K+'__jump" data-i="'+i+'" style="left:'+x.toFixed(2)+'%;top:'+y.toFixed(2)+'%" aria-label="'+e((i<9?'0':'')+(i+1)+' '+(rows[i].p||''))+'">'+(i<9?'0':'')+(i+1)+'</button>'}
 return o}
LOOKS['membrane-face']=function(b,H){
 var rows=b.rows||[];
 var tiles=rows.map(function(r,i){var g=parse(r.v);
  var v=g?(g.pre?'<span class="'+K+'__pre">'+tx(g.pre)+'</span>':'')+'<span class="'+K+'__n">'+e(g.c+' '+g.n)+'</span>'+(g.rest?'<span class="'+K+'__u">'+tx(g.rest)+'</span>':'')
   :'<span class="'+K+'__w">'+tx(r.v)+'</span>';
  return '<li class="'+K+'__tile'+(r.hl?' is-hl':'')+'" data-i="'+i+'">'
   +'<h3 class="'+K+'__p">'+idx(i)+'<span>'+tx(r.p)+'</span></h3>'
   +'<p class="'+K+'__v">'+v+'</p>'
   +(r.m?'<p class="'+K+'__m">'+tx(r.m)+'</p>':'')+'</li>'}).join('');
 var core='<figure class="'+K+'__core aq-fx-host"><canvas class="aq-fx-shader" data-gl="cutaway" aria-hidden="true"></canvas><p class="'+K+'__label" aria-hidden="true">RO element · feed end</p>'+'<div class="'+K+'__dial">'+face(rows.length)+jumps(rows)+'</div>'
  +(b.note?'<figcaption class="'+K+'__note">'+tx(b.note)+'</figcaption>':'')+'</figure>';
 var head='<div class="'+K+'__head">'+wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro})+'</div>';
 return sec('<div class="'+K+'" style="--n:'+rows.length+'">'+head+core+'<ol class="'+K+'__tiles" role="list">'+tiles+'</ol></div>',K+'-sec')};
/* phone: a ring number brings its card into the row; the card in view lights its number (and is the ring's current
   one for assistive technology). On arrival the first card is in view, so its number is lit from the start (the
   is-in styles live in the phone rule only, so this changes nothing on desktop, where the ring buttons are hidden). */
function lit(r,k){[].forEach.call(r.querySelectorAll('.'+K+'__jump,.'+K+'__mark,.'+K+'__tile'),function(x){var on=+x.getAttribute('data-i')===k;x.classList.toggle('is-in',on);
 if(x.classList.contains(K+'__jump')){if(on)x.setAttribute('aria-current','true');else x.removeAttribute('aria-current')}})}
function init(n){if(!n||!n.querySelectorAll)return;var a=n.classList&&n.classList.contains(K)?[n]:[].slice.call(n.querySelectorAll('.'+K));
 a.forEach(function(r){if(!r.querySelector('.'+K+'__jump.is-in'))lit(r,0)})}
function row(r){return r.querySelector('.'+K+'__tiles')}
if(typeof document!=='undefined'){
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){init(document)});else init(document);
 if(window.MutationObserver)new MutationObserver(function(M){M.forEach(function(m){[].forEach.call(m.addedNodes,init)})}).observe(document.documentElement,{childList:true,subtree:true});
 document.addEventListener('click',function(x){var j=x.target.closest&&x.target.closest('.'+K+'__jump');if(!j)return;var r=j.closest('.'+K),ol=row(r),k=+j.getAttribute('data-i'),t=ol&&ol.children[k];if(!t)return;
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,pl=parseFloat(getComputedStyle(ol).paddingLeft)||0;
  ol.scrollTo({left:t.getBoundingClientRect().left-ol.getBoundingClientRect().left+ol.scrollLeft-pl,behavior:rm?'auto':'smooth'});lit(r,k)});
 var raf=0;document.addEventListener('scroll',function(x){var ol=x.target;if(!ol.classList||!ol.classList.contains(K+'__tiles')||raf)return;raf=requestAnimationFrame(function(){raf=0;
  var a=ol.getBoundingClientRect().left+(parseFloat(getComputedStyle(ol).paddingLeft)||0),best=0,d=1e9;[].forEach.call(ol.children,function(t,i){var q=Math.abs(t.getBoundingClientRect().left-a);if(q<d){d=q;best=i}});lit(ol.closest('.'+K),best)})},true);
}
/* hover or focus on a target lights its mark on the element's rim */
if(typeof document!=='undefined')['mouseover','mouseout','focusin','focusout'].forEach(function(ev){document.addEventListener(ev,function(x){
 var t=x.target.closest&&x.target.closest('.'+K+'__tile');if(!t)return;var on=ev==='mouseover'||ev==='focusin',r=t.closest('.'+K),mk=r&&r.querySelector('.'+K+'__mark[data-i="'+t.getAttribute('data-i')+'"]');
 t.classList.toggle('is-pointed',on);if(mk)mk.classList.toggle('is-pointed',on)})});
})();
