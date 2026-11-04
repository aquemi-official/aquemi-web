/* Look "doc-hotspots" -> DocHotspots (design-system/components/DocHotspots): the documents delivered with a system,
   each pinned to the part of the skid it covers. On a navy band the page's equipment drawing (assets/illustrations/
   <page>.webp, painted limestone) stands in the middle; numbered hotspots sit on the parts, and a leader runs from each
   to its document card (limestone paper: "01 / code", name, detail) at the left and right. Hovering a card lights its
   hotspot and leader. Narrow screens: the drawing on top with its numbered hotspots, the cards in a grid below.
   Fields (a docs block): h, intro, items [{t, d, code, key, at: [x, y]}], link, link_label, intent.
   at: the hotspot on the drawing, as fractions of the drawing's box (0–1, from the top left); an item without one
   gets no hotspot. Codes come from the DocList lookup (docCode, blocks/docs.js) unless the item names its own. */
var DH_FIG={l:28,w:44,t:3,h:94};/* the drawing's box inside the 2:1 stage, in % (44 % wide of a 2:1 stage at the drawing's 817:874 ratio = 94 % tall) */
LOOKS['doc-hotspots']=function(b,H){
 var art=b.art||WP,items=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=items.length,k=Math.ceil(n/2);
 var slot=function(i){var left=i%2===0,j=Math.floor(i/2),top=4+j*(92/k);return {left:left,top:top}};
 var hots='',leads='',cards=items.map(function(x,i){var s=slot(i),c=x.code||docCode(String(x.t||''))[0],num=(i<9?'0':'')+(i+1);
  if(x.at&&x.at.length===2){var fx=+x.at[0],fy=+x.at[1],X=DH_FIG.l+DH_FIG.w*fx,Y=DH_FIG.t+DH_FIG.h*fy,ex=s.left?25:75,ey=s.top+5.5,kx=s.left?ex+4:ex-4;
   hots+='<span class="aq-doc-hotspots__hot" data-k="'+i+'" style="left:'+(fx*100).toFixed(2)+'%;top:'+(fy*100).toFixed(2)+'%" aria-hidden="true"><span>'+(i+1)+'</span></span>';
   leads+='<path data-k="'+i+'" d="M'+X.toFixed(2)+' '+(Y/2).toFixed(2)+'L'+kx.toFixed(2)+' '+(ey/2).toFixed(2)+'L'+ex+' '+(ey/2).toFixed(2)+'"/><circle data-k="'+i+'" cx="'+ex+'" cy="'+(ey/2).toFixed(2)+'" r="0.4"/>'}
  return '<li class="aq-doc-hotspots__card aq-doc-hotspots__card--'+(s.left?'l':'r')+(x.key?' is-key':'')+'" data-k="'+i+'" style="--row:'+(Math.floor(i/2)+1)+'">'
   +'<p class="aq-doc-hotspots__code"><span class="aq-doc-hotspots__num" aria-hidden="true">'+num+'</span> / <span>'+e(c)+'</span></p>'
   +'<h3 class="aq-doc-hotspots__t">'+(x.link&&wp(x.link)?wlink(x.link,x.t,x.intent):tx(x.t))+'</h3>'+(x.d?'<p class="aq-doc-hotspots__d">'+tx(x.d)+'</p>':'')+'</li>'}).join('');
 var fig='<div class="aq-doc-hotspots__fig"><span class="aq-illustration aq-doc-hotspots__art" role="img" aria-label="'+e(ART[art]||'')+'" style="'+artMask(art)+'"></span>'+hots+'</div>';
 var svg=leads?'<svg class="aq-doc-hotspots__leads" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true" focusable="false">'+leads+'</svg>':'';
 var more=b.link&&wp(b.link)?'<p class="aq-doc-hotspots__more">'+wBtn(b.link_label||wlabel(b.link),b.link,'link',b.intent)+'</p>':'';
 /* The cards are limestone paper in both themes: data-theme="light" on the list keeps every token inside them (codes,
    badges, placeholders) on its light value, as on .aq-request-menu-wrap (pass 12, F3) */
 return sec(H+'<div class="aq-doc-hotspots" style="--k:'+k+'">'+svg+fig+'<ol class="aq-doc-hotspots__cards" data-theme="light">'+cards+'</ol></div>'+more,'aq-band--navy aq-doc-hotspots-sec')};
/* Pass 12 C: the cards sit in two in-flow columns of the stage (one ordered list, so the reading order stays 01-06;
   left cards in grid column 1, right cards in column 3, one row per pair, a space-4 gap), so a long card pushes the next
   one down instead of running under it, and a tall set grows the stage below its 2:1. This layout pass then redraws
   every leader in the stage's real pixels: from its hotspot, out on an elbow, to the middle of its card's code line,
   with the drawing centred on the stage's height.
   The static paths above (100 x 50 units, a 2:1 stage) are the fallback before it runs. */
(function(){var K='aq-doc-hotspots';
 function f1(n){return (Math.round(n*10)/10).toString()}
 function layout(el){var sv=el.querySelector('.'+K+'__leads'),fig=el.querySelector('.'+K+'__fig');
  /* bail unless the component CSS has the leaders absolute over the stage: an in-flow svg (no stylesheet yet, a
     partial load, a reader mode) grows with its viewBox, which would grow the stage and loop through the ResizeObserver */
  var cs=sv&&getComputedStyle(sv);
  if(!sv||!fig||cs.display==='none'||cs.position!=='absolute'){if(fig)fig.style.top='';return}var W=el.clientWidth,Ht=el.clientHeight;if(!W||!Ht||Ht>W*2)return;
  /* when the cards grow the stage past 2:1, the drawing stays centred on its height */
  fig.style.top=f1(Math.max((Ht-fig.offsetHeight)/2,Ht*0.03))+'px';
  [].forEach.call(el.querySelectorAll('.'+K+'__card'),function(c){var k=c.getAttribute('data-k'),h=el.querySelector('.'+K+'__hot[data-k="'+k+'"]'),
    pa=sv.querySelector('path[data-k="'+k+'"]'),dt=sv.querySelector('circle[data-k="'+k+'"]');if(!h||!pa)return;
   var left=c.classList.contains(K+'__card--l'),code=c.querySelector('.'+K+'__code'),
    hx=fig.offsetLeft+h.offsetLeft,hy=fig.offsetTop+h.offsetTop,
    ex=left?c.offsetLeft+c.offsetWidth:c.offsetLeft,ey=c.offsetTop+(code?code.offsetTop+code.offsetHeight/2:24),kx=left?ex+W*0.04:ex-W*0.04;
   pa.setAttribute('d','M'+f1(hx)+' '+f1(hy)+'L'+f1(kx)+' '+f1(ey)+'L'+f1(ex)+' '+f1(ey));
   if(dt){dt.setAttribute('cx',f1(ex));dt.setAttribute('cy',f1(ey));dt.setAttribute('r','4')}});
  sv.setAttribute('viewBox','0 0 '+f1(W)+' '+f1(Ht))}
 function scan(){[].forEach.call(document.querySelectorAll('.'+K),function(el){if(!el._dhRO&&typeof ResizeObserver!=='undefined'){el._dhRO=new ResizeObserver(function(){layout(el)});el._dhRO.observe(el)}layout(el)})}
 var queued=0;function soon(){if(queued)return;queued=1;requestAnimationFrame(function(){queued=0;scan()})}
 if(typeof window!=='undefined')window.AQdocHotspots={layout:layout,scan:scan};
 if(typeof document!=='undefined'){
  /* only added elements are looked at, so text-only changes (SectionNav's progress readout on every scroll) cost a loop
     over the records and no document-wide query */
  if(typeof MutationObserver!=='undefined')new MutationObserver(function(ms){var hit=0;
   for(var i=0;i<ms.length&&!hit;i++)for(var j=0;j<ms[i].addedNodes.length;j++){var a=ms[i].addedNodes[j];
    if(a.nodeType===1&&((a.classList&&a.classList.contains(K))||a.querySelector('.'+K+':not([data-dh])'))){hit=1;break}}
   if(!hit)return;[].forEach.call(document.querySelectorAll('.'+K+':not([data-dh])'),function(el){el.setAttribute('data-dh','')});soon()}).observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState!=='loading')soon();else document.addEventListener('DOMContentLoaded',soon);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon)}
})();
