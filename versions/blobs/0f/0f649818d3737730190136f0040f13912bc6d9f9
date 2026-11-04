/* Look "config-cards" -> ConfigCards (design-system/components/ConfigCards): typical configurations as a deck of
   design-basis cards (pass 12, concept 232 projects.configurations take 2; ruling R5). Every card draws the same PP
   package (the RO skid at the left, identical in every card, so the eye learns it once) piped to the use it feeds,
   which changes per card: a tank and loop over a granulation bowl, a proofing vessel fed straight, a tank feeding a
   washer, a loop with three suite drops, a tank feeding a batching vessel and a filler, a riser serving two lab floors.
   Under the drawing: a navy number tag, the title (the link), the [reference capacity, L/h] sentence lifted out as a
   chip, the item's tag ("Design basis") and the rest of the description as ruled spec lines.
   Fields, as grid: h, intro, items [{t, d, tag, link, icon}]. Look-only fields: item "scene" (osd | proof | washer |
   suites | batch | lab) picks the drawing, else it follows the link page (ind-pharma, ind-process, ind-meddevice,
   ind-cdmo, ind-personal-care, ind-hospital-lab); block "spec_labels" (default Use, System, Checks) labels the spec lines
   in order, and an item's own "spec_labels" overrides it for that card. Phones: a scroll-snap rail (one card at 85 % width, the next peeking) with Previous / Next (44 px), a count
   and Show all (the cards stacked). */
(function(){
var P='aq-config-cards'+'__';
/* the package: skid and RO rack, the same in every card; returns its markup and the outlet port */
function ccPack(){var sk=isoPart('skid',0,0,0,1,{w:72,d:36}),ro=isoPart('ro',4,3,9,0.56,{id:'pk'});return {svg:sk+''+ro,out:ro.ports.out}}
function ccRun(pts,to,o){o=o||{};return isoPipe(pts,{r:1.7,bend:4.5,caps:o.caps==null?false:o.caps,to:to,flow:o.flow})}
/* custom pieces drawn from the kit's builder (same primitives and classes as IsoKit parts) */
/* customer vessels as flat-bottom PP vessels on a plinth (weld bands, nozzle stubs; no legs or dished heads), kept lower and squatter than the storage tank so they read as the customer's machines */
function ccBowl(x,y,id){var b=isoB(x,y,0,1);b.cyl(0,0,0,'z',4,18.2);b.vessel(0,0,4,17,14,0,0);b.band(0,0,11,'z',17);
 b.cyl(0,0,18,'z',3,5.5);b.cyl(0,0,21,'z',9,3.6);
 b.port.in=[-6,0,18];b.port.top=[0,0,30];b.port.base=[0,0,0];return b.done('bowl',{id:id})}
function ccVat(x,y,id){var b=isoB(x,y,0,1);b.cyl(0,0,0,'z',4,21.4);b.vessel(0,0,4,20,30,0,0);b.band(0,0,19,'z',20);
 b.stub(-7,6,33.6,'z',7.4,2.2);b.cyl(6,-5,33.6,'z',4.4,4);
 b.stub(19,0,14,'x',6,2);b.port.in=[-7,6,41];b.port.top=[0,0,44];b.port.base=[0,0,0];return b.done('vat',{id:id})}
/* the washer is the kit's washer part */
function ccWasher(x,y,id){return isoPart('washer',x,y,0,1,{id:id,w:34,d:30,h:42})}
function ccBatch(x,y,id){var b=isoB(x,y,0,1);b.cyl(0,0,0,'z',4,18.2);b.vessel(0,0,4,17,32,0,0);[12,20,28].forEach(function(z){b.band(0,0,z,'z',17)});
 b.bx(0,0,36,10,10,7);b.cyl(0,0,43,'z',8,3.2);
 b.stub(-9,6,35.6,'z',4.4,1.8);b.port.in=[-9,6,40];b.port.top=[0,0,51];b.port.base=[0,0,0];return b.done('batch',{id:id})}
function ccFiller(x,y,id){var b=isoB(x,y,0,1),W=34,D=18;b.bx(0,0,0,W,D,20);b.rect('y',-W/2+3,3,W/2-3,16,D/2);
 b.bx(0,0,20,W,4,2);[-10,0,10].forEach(function(u){b.cyl(u,0,10,'z',10,1.4);b.bx(u,5,20,5,8,6,'aq-iso__eq aq-iso__eq--alt')});
 b.cyl(0,-2,22,'z',10,2.2);b.port.in=[0,-2,32];b.port.top=[0,0,32];b.port.base=[0,0,0];return b.done('filler',{id:id})}
/* lab floor: an open floor plate (lines only) on four posts, so what stands on the floor below still shows */
function ccFloor(x0,y0,z,w,d){var c=[[x0,y0,z],[x0+w,y0,z],[x0+w,y0+d,z],[x0,y0+d,z]],s='';
 s+='<path class="aq-iso__thin" d="'+isoPoly(c,1)+isoPoly([[x0,y0+d,z-2],[x0+w,y0+d,z-2],[x0+w,y0,z-2]])+isoPoly([[x0,y0+d,z],[x0,y0+d,z-2]])+isoPoly([[x0+w,y0+d,z],[x0+w,y0+d,z-2]])+isoPoly([[x0+w,y0,z],[x0+w,y0,z-2]])+'"/>';
 return s}
function ccPosts(x0,y0,z0,z1,w,d){var s='';[[x0,y0],[x0+w,y0],[x0+w,y0+d],[x0,y0+d]].forEach(function(q){s+=isoPoly([[q[0],q[1],z0],[q[0],q[1],z1]])});return '<path class="aq-iso__hid" d="'+s+'"/>'}

/* one scene per use; every scene starts from the package at the same place */
var SCENE={'ind-pharma':'osd','ind-process':'proof','ind-meddevice':'washer','ind-cdmo':'suites','ind-personal-care':'batch','ind-hospital-lab':'lab'};
function ccScene(k){var pk=ccPack(),O=pk.out,L=[pk.svg],X=O[0]+12;
 function feedTo(T,zUp){var I=T.ports.in,up=zUp||I[2]+8;return ccRun([O,[X,O[1],O[2]],[X,O[1],up],[X,I[1],up],[I[0],I[1],up],I],'u')}
 if(k==='osd'){var T=isoPart('tank',112,-22,0,0.62,{id:'u'}),G=ccBowl(160,-70,'u'),zH=74;
  L.push(G,T,feedTo(T),ccRun([T.ports.out,[146,-22,T.ports.out[2]],[146,-22,zH],[146,-92,zH],[T.ports.ret[0],-92,zH],[T.ports.ret[0],T.ports.ret[1],zH],T.ports.ret],'u'),
   ccRun([[146,-70,zH],[150,-70,zH],[150,-70,G.ports.in[2]+4],[G.ports.in[0],-70,G.ports.in[2]+4],G.ports.in],'u'))}
 else if(k==='proof'){var V=ccVat(150,-48,'u'),vl=isoPart('valve',X+30,V.ports.in[1],V.ports.in[2]+10,1.0);
  L.push(V,ccRun([O,[X,O[1],O[2]],[X,O[1],V.ports.in[2]+10],[X,V.ports.in[1],V.ports.in[2]+10],[V.ports.in[0],V.ports.in[1],V.ports.in[2]+10],V.ports.in],'u'),vl)}
 else if(k==='washer'){var T2=isoPart('tank',110,-18,0,0.55,{id:'u'}),Wa=ccWasher(166,-66,'u'),o2=T2.ports.out;
  L.push(Wa,T2,feedTo(T2),ccRun([o2,[150,o2[1],o2[2]],[150,o2[1],56],[150,-66,56],[Wa.ports.in[0],-66,56],[Wa.ports.in[0],Wa.ports.in[1],56],Wa.ports.in],'u'),
   isoPart('valve',150,-40,56,1.2,{rot:1}))}
 else if(k==='suites'){var T3=isoPart('tank',108,-14,0,0.55,{id:'u'}),zS=70,xS=150,ys=[-30,-62,-94],us=ys.map(function(y){return isoPart('outlet',xS+8,y,0,0.6,{id:'u'})}),o3=T3.ports.out;
  us.slice().reverse().forEach(function(u){L.push(u)});
  L.push(T3,feedTo(T3),ccRun([o3,[xS-6,o3[1],o3[2]],[xS-6,o3[1],zS],[xS-6,-108,zS],[T3.ports.ret[0],-108,zS],[T3.ports.ret[0],T3.ports.ret[1],zS],T3.ports.ret],'u'));
  us.forEach(function(u){var p=u.ports.in;L.push(ccRun([[xS-6,p[1],zS],[p[0],p[1],zS],p],'u'))})}
 else if(k==='batch'){var T4=isoPart('tank',108,-14,0,0.55,{id:'u'}),B=ccBatch(154,-52,'u'),F=ccFiller(188,-92,'u'),o4=T4.ports.out;
  L.push(F,B,T4,feedTo(T4),ccRun([o4,[132,o4[1],o4[2]],[132,o4[1],62],[132,B.ports.in[1],62],[B.ports.in[0],B.ports.in[1],62],B.ports.in],'u'),
   ccRun([[132,-30,62],[132,-92,62],[F.ports.in[0],-92,62],F.ports.in],'u'))}
 else if(k==='lab'){var x0=118,y0=-98,w=74,d=62,z1=44,u1=isoPart('outlet',x0+24,y0+44,0,0.55,{id:'u'}),u2=isoPart('outlet',x0+50,y0+20,z1,0.55,{id:'u'}),u0=isoPart('outlet',x0+50,y0+20,0,0.55,{id:'u'});
  L.push(ccPosts(x0,y0,0,z1,w,d),u0,u1,ccFloor(x0,y0,z1,w,d),u2,ccPosts(x0,y0,z1,z1+36,w,d),ccFloor(x0,y0,z1+36,w,d).replace('aq-iso__thin','aq-iso__hid'));
  var R=x0-6,zr=z1+30,zl=z1-6;
  L.push(ccRun([O,[R,O[1],O[2]],[R,O[1],zl],[R,u1.ports.in[1],zl],[u1.ports.in[0],u1.ports.in[1],zl],u1.ports.in],'u'),
   ccRun([[R,O[1],zl],[R,O[1],zr],[R,u2.ports.in[1],zr],[u2.ports.in[0],u2.ports.in[1],zr],u2.ports.in],'u'),
   ccRun([[R,u0.ports.in[1],zl],[u0.ports.in[0],u0.ports.in[1],zl],u0.ports.in],'u'))}
 return L.join('')}
/* one viewBox for every card (the package sits at the same place in each), the union of the six scenes' drawn bounds */
var VB={x:-35,y:-74,w:304,h:156};
function ccSvg(k){return isoSvg(VB.w,VB.h,ccScene(k),'aq-iso--raised '+P+'svg',{origin:[-VB.x,-VB.y]})}
function ccLines(d){return String(d||'').replace(/\.\s+(?=[A-Z\[])/g,'.\u0001').split('\u0001').map(function(s){return s.trim()}).filter(Boolean)}
LOOKS['config-cards']=function(b,H){H=String(H).replace(/ · /g,'&nbsp;· ');var I=b.items||[],n=I.length,lab=b.spec_labels||['Use','System','Checks'];
 var cards=I.map(function(it,i){var labs=it.spec_labels||lab,k=it.scene||SCENE[it.link]||'osd',ls=ccLines(it.d),cap='',rest=[],no=(i<9?'0':'')+(i+1),lk=it.link&&wp(it.link);
  ls.forEach(function(s){if(!cap&&/^\[[^\]]*capacity[^\]]*\]\.?$/i.test(s))cap=s.replace(/\.$/,'');else rest.push(s)});
  var t=lk?'<a class="'+P+'a" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'<span class="'+P+'go" aria-hidden="true"></span></a>':tx(it.t);
  return '<li class="'+P+'card" data-k="'+i+'" data-scene="'+e(k)+'">'
   +'<div class="'+P+'fig" aria-hidden="true">'+ccSvg(k)+'<span class="'+P+'no">'+no+'</span></div>'
   +'<div class="'+P+'body"><h3 class="'+P+'t">'+t+'</h3>'
   +((cap||it.tag)?'<p class="'+P+'meta">'+(cap?'<span class="'+P+'cap">'+tx(cap)+'</span>':'')+(it.tag?'<span class="'+P+'tag">'+tx(it.tag)+'</span>':'')+'</p>':'')
   +(rest.length?'<dl class="'+P+'spec">'+rest.map(function(s,j){return '<div class="'+P+'row">'+(labs[j]?'<dt>'+tx(labs[j])+'</dt>':'<dt aria-hidden="true"></dt>')+'<dd>'+tx(s)+'</dd></div>'}).join('')+'</dl>':'')
   +'</div></li>'}).join('');
 var ctl='<div class="'+P+'ctl"><span class="'+P+'hint" aria-hidden="true">Swipe</span><span class="'+P+'count" aria-live="polite"><span class="'+P+'at">01</span> / '+(n<10?'0':'')+n+'</span>'
  +'<button type="button" class="'+P+'btn '+P+'prev" aria-label="Previous configuration" disabled></button><button type="button" class="'+P+'btn '+P+'next" aria-label="Next configuration"></button>'
  +'<button type="button" class="'+P+'all" aria-pressed="false">Show all '+n+'</button></div>';
 return sec(H+'<div class="aq-config-cards" style="--n:'+n+'"><ol class="'+P+'list" tabindex="-1">'+cards+'</ol>'+ctl+'</div>','aq-config-cards-sec')};
/* Phone rail: Previous / Next move one card (smooth, instant under reduced motion), the count follows the scroll, Show
   all stacks the cards. The rail's controls and monospace count follow Subframe Motion "Parallax image carousel"
   (parallax-plates), MIT, (c) 2026 Subframe: arrows centre the next plate with a short ease-out, the count tracks it. */
function ccIdx(list){var c=list.querySelectorAll('.'+P+'card'),x=list.scrollLeft+parseFloat(getComputedStyle(list).scrollPaddingLeft||0),best=0,bd=1e9;
 [].forEach.call(c,function(el,i){var d=Math.abs(el.offsetLeft-list.offsetLeft-x);if(d<bd){bd=d;best=i}});return best}
function ccSync(root){var list=root.querySelector('.'+P+'list');if(!list)return;var i=ccIdx(list),n=list.children.length,at=root.querySelector('.'+P+'at'),
 pv=root.querySelector('.'+P+'prev'),nx=root.querySelector('.'+P+'next'),end=list.scrollLeft+list.clientWidth>=list.scrollWidth-4;
 if(end)i=n-1;if(at)at.textContent=(i<9?'0':'')+(i+1);if(pv)pv.disabled=i<=0;if(nx)nx.disabled=i>=n-1}
if(typeof document!=='undefined'&&document.addEventListener){
 var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
 document.addEventListener('click',function(ev){var bt=ev.target.closest&&ev.target.closest('.'+P+'btn, .'+P+'all');if(!bt)return;var root=bt.closest('.aq-config-cards'),list=root&&root.querySelector('.'+P+'list');if(!list)return;
  if(bt.classList.contains(P+'all')){var on=!root.classList.contains('is-all');root.classList.toggle('is-all',on);bt.setAttribute('aria-pressed',on?'true':'false');
   bt.textContent=on?'Show as a rail':'Show all '+list.children.length;if(!on)list.scrollLeft=0;ccSync(root);return}
  var c=list.children,i=ccIdx(list)+(bt.classList.contains(P+'next')?1:-1);i=Math.max(0,Math.min(c.length-1,i));
  list.scrollTo({left:c[i].offsetLeft-list.offsetLeft-parseFloat(getComputedStyle(list).scrollPaddingLeft||0),behavior:rm&&rm.matches?'auto':'smooth'})});
 /* the count is aria-live: update it once the swipe settles, not on every scroll frame */
 var tm=null;document.addEventListener('scroll',function(ev){var t=ev.target;if(!(t&&t.classList&&t.classList.contains(P+'list')))return;
  clearTimeout(tm);tm=setTimeout(function(){ccSync(t.closest('.aq-config-cards'))},120)},true)}
})();
