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
  return '<li class="aq-doc-hotspots__card aq-doc-hotspots__card--'+(s.left?'l':'r')+(x.key?' is-key':'')+'" data-k="'+i+'" style="top:'+s.top.toFixed(2)+'%">'
   +'<p class="aq-doc-hotspots__code"><span class="aq-doc-hotspots__num" aria-hidden="true">'+num+'</span> / <span>'+e(c)+'</span></p>'
   +'<h3 class="aq-doc-hotspots__t">'+(x.link&&wp(x.link)?wlink(x.link,x.t,x.intent):tx(x.t))+'</h3>'+(x.d?'<p class="aq-doc-hotspots__d">'+tx(x.d)+'</p>':'')+'</li>'}).join('');
 var fig='<div class="aq-doc-hotspots__fig"><span class="aq-illustration aq-doc-hotspots__art" role="img" aria-label="'+e(ART[art]||'')+'" style="'+artMask(art)+'"></span>'+hots+'</div>';
 var svg=leads?'<svg class="aq-doc-hotspots__leads" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true" focusable="false">'+leads+'</svg>':'';
 var more=b.link&&wp(b.link)?'<p class="aq-doc-hotspots__more">'+wBtn(b.link_label||wlabel(b.link),b.link,'link',b.intent)+'</p>':'';
 /* The cards are limestone paper in both themes: data-theme="light" on the list keeps every token inside them (codes,
    badges, placeholders) on its light value, as on .aq-request-menu-wrap (pass 12, F3) */
 return sec(H+'<div class="aq-doc-hotspots" style="--k:'+k+'">'+svg+fig+'<ol class="aq-doc-hotspots__cards" data-theme="light">'+cards+'</ol></div>'+more,'aq-band--navy aq-doc-hotspots-sec')};
