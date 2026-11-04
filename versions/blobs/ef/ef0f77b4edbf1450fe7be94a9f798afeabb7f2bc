/* Look "scope-seam" -> ScopeSeam (design-system/components/ScopeSeam): a spec block of what fits the package and what
   does not, after pass 12 concept 203 (ind-personal-care.fit). The band splits navy and limestone; the divide is the
   seam where the package's material stops. In the navy half an ambient loop is drawn whole (tank, pump, loop, flow
   arrows); in the limestone half a loop the package cannot serve is drawn dashed, outside the seam; two tie-in nodes sit
   on the seam where the two meet. Under the drawing each half lists its own rows, numbered down the page; the limit row
   (the condition that is the seam itself) sits on the seam across both grounds. Each loop is named by its half's first
   row (no new words). Phones: the navy block (head, package rows, then the ambient loop) over the limestone block; the
   seam is a rule carrying the two nodes and its name; the loop's branches cross it through the nodes into the dashed
   loop, then the limit card and the other rows. Every row
   shows on phones (no fold: the limit and both site rows are what the section is for).
   Fields: h, intro, rows [{p, v, m, side, link, link_label}] (side: "package" | "site" | "limit"; default site), sides
   [package label, site label], seam (the seam's name). cols, fold and fold_noun are read by other looks, not here. */
(function(){
var K='aq-scope-seam';
function ar(x,y,d,c){return '<path class="'+K+'__arrow'+(c?' '+c:'')+'" d="M'+(x-5*d)+' '+(y-5)+'L'+x+' '+y+'L'+(x-5*d)+' '+(y+5)+'"/>'}
function dn(x,y){return '<path class="'+K+'__arrow is-p" d="M'+(x-5)+' '+(y-5)+'L'+x+' '+y+'L'+(x+5)+' '+(y-5)+'"/>'}
/* the ambient loop, inside: storage tank, pump, the loop round to two branches that end at the seam (x 600). Phones
   (is-p): the drawing sits right above the seam, so the two branches turn down (x 570, 540) and leave by the bottom edge,
   crossing the seam rule through its two nodes (90 % and 95 % of the drawing's width). */
function drawIn(){return '<svg class="'+K+'__svg" viewBox="0 0 600 240" aria-hidden="true" focusable="false">'
 +'<path class="'+K+'__loop" d="M126 196H180M216 196H500Q520 196 520 176V64Q520 44 500 44H118Q98 44 98 64V78"/>'
 +'<path class="'+K+'__loop is-d" d="M520 92H600M520 152H600"/>'
 +'<path class="'+K+'__loop is-p" d="M520 92H570V262M520 152H540V262"/>'
 +'<rect class="'+K+'__tank" x="70" y="78" width="56" height="130" rx="12"/><path class="'+K+'__tankl" d="M70 104H126"/>'
 +'<circle class="'+K+'__pump" cx="198" cy="196" r="18"/><path class="'+K+'__pumpt" d="M190 184L212 196L190 208Z"/>'
 +'<path class="'+K+'__valve" d="M300 34L300 54L324 34L324 54Z"/>'
 +ar(380,196,1)+ar(560,92,1,'is-d')+ar(560,152,1,'is-d')+ar(240,44,-1)+dn(570,224)+dn(540,224)
 +'<rect class="'+K+'__node" x="593" y="85" width="14" height="14"/><rect class="'+K+'__node" x="593" y="145" width="14" height="14"/></svg>'}
/* the loop outside: dashed, from the two tie-ins round a heat exchanger and back. Phones (is-p): the tie-ins come
   down from above the top edge (x 540, 570; the overrun is clipped at the seam rule) into the loop's right side. */
function drawOut(){return '<svg class="'+K+'__svg" viewBox="0 0 600 240" aria-hidden="true" focusable="false">'
 +'<path class="'+K+'__dash is-d" d="M0 92H80M0 152H80M80 92V44H500V196H80V152"/>'
 +'<path class="'+K+'__dash is-p" d="M540 -600V92H500M570 -600V152H500M500 92V44H80V196H500V152"/>'
 +'<circle class="'+K+'__hx" cx="150" cy="122" r="22"/><path class="'+K+'__hxz" d="M128 122L136 112L144 132L152 112L160 132L166 122L172 122"/>'
 +'<path class="'+K+'__dash" d="M150 100V44M150 144V196"/></svg>'}
LOOKS['scope-seam']=function(b,H){
 var R=b.rows||[],SD=b.sides||['',''],pk=[],st=[],lim=null;
 R.forEach(function(r){if(r.side==='limit'&&!lim)lim=r;else if(r.side==='package')pk.push(r);else st.push(r)});
 var n=0;
 function item(r){var lk=r.link&&wp(r.link)?'<a class="'+K+'__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':'';
  return '<li class="'+K+'__item"><span class="'+K+'__no" aria-hidden="true">'+(++n<10?'0':'')+n+'</span><div class="'+K+'__body"><h3 class="'+K+'__p">'+tx(r.p)+'</h3>'
   +(r.v?'<p class="'+K+'__v">'+tx(r.v)+'</p>':'')+(r.m?'<p class="'+K+'__m">'+tx(r.m)+'</p>':'')+lk+'</div></li>'}
 var listIn=pk.map(item).join(''),listOut=st.map(item).join('');
 function fig(svg,lab,cls){return '<figure class="'+K+'__fig '+cls+'">'+svg+(lab?'<figcaption class="'+K+'__lab" aria-hidden="true">'+tx(lab)+'</figcaption>':'')+'</figure>'}
 var seam='<div class="'+K+'__seam"><span class="'+K+'__nodes" aria-hidden="true"><span class="'+K+'__nd"></span><span class="'+K+'__nd"></span></span>'
  +(b.seam?'<p class="'+K+'__seamt">'+tx(b.seam)+'</p>':'')+'</div>';
 var limit=lim?'<div class="'+K+'__limit"><h3 class="'+K+'__p">'+tx(lim.p)+'</h3>'+(lim.v?'<p class="'+K+'__v">'+tx(lim.v)+'</p>':'')+(lim.m?'<p class="'+K+'__m">'+tx(lim.m)+'</p>':'')+'</div>':'';
 var inner='<div class="'+K+'">'
  +'<div class="'+K+'__in"><div class="'+K+'__head">'+H+'</div>'
   +(SD[0]?'<p class="'+K+'__side is-in">'+tx(SD[0])+'</p>':'')
   +fig(drawIn(),pk[0]&&pk[0].p,'is-in')
   +'<ol class="'+K+'__list is-in" role="list">'+listIn+'</ol></div>'
  +'<div class="'+K+'__out">'+seam+limit
   +(SD[1]?'<p class="'+K+'__side is-out">'+tx(SD[1])+'</p>':'')
   +fig(drawOut(),st[0]&&st[0].p,'is-out')
   +'<ol class="'+K+'__list is-out" role="list">'+listOut+'</ol></div></div>';
 return '<section class="aq-section '+K+'-sec"><div class="aq-in">'+inner+'</div></section>'};
})();
