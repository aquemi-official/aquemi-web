/* Look "washer-zones" -> WasherZones (design-system/components/WasherZones): a short grid of linked systems (grid) told
   as one package feeding a cabinet washer (pass 12, concept 227, ind-meddevice.4). One IsoKit line drawing on a sheet:
   the generation rack, the storage tank and its loop (supply and return run out to the washer and back), the
   monitoring panel and analyser on the return, and the tie-in valve on a short leg of the drop into the washer. Each item is
   one dashed zone round its part of the drawing, tagged on its corner with the item's number, and one row under it
   (number, the item's standard as a navy chip, title, line, link): the tag numbers key the zones to the rows.
   Zones by the item's icon: ro-membrane -> generation, loop -> storage and loop, conductivity -> monitoring,
   valve -> retrofit tie-in at the washer (else by order). Pointing at or focusing a row lights its zone and quiets the
   others (desktop). Phones: the drawing held in a strip over a swipe rail of cards, one zone per card; the card in
   view frames its zone (the drawing pans and zooms to it) and dots under the rail jump between cards (AQsnap).
   Fields, as grid: h, intro, items [{t, d, icon, tag, link}] (four). Concept: 227 take 2 (idea only: its labels, the
   painted tank name, the wordmark and the two-zone frames are not ours). */
(function(){
var K=1.45,ZONE={'ro-membrane':0,loop:1,conductivity:2,valve:3};
/* cabinet washer, min corner at (x, y): body, control strip with a display, door with its window, louvres on the side */
function wzWasher(x,y){var b=isoB(x,y,0,1,0),W=92,D=72,H=104,f=D;
 b.box(0,0,0,W,D,H);b.box(-2,-2,H,W+4,D+4,3);
 b.rect('y',10,86,W-10,98,f);b.rect('y',14,88.5,44,95.5,f,'aq-iso__eq aq-iso__eq--glass');b.line([58,f,92],[80,f,92],'aq-iso__acc');
 b.rect('y',10,8,W-10,80,f);b.rect('y',20,24,W-20,72,f,'aq-iso__eq aq-iso__eq--glass');b.line([W-16,f,40],[W-16,f,54]);
 var d='';for(var z=16;z<44;z+=6)d+=isoPoly([b.p(W,14,z),b.p(W,D-14,z)]);b.add(isoPath(d,'aq-iso__thin'));
 b.port.top=[W/2,D/2,H+3];return b.done('washer',{id:'tie'})}
function wzScene(){
 var ro=isoPart('ro',0,0,0,1,{id:'gen'}),tk=isoPart('tank',170,-60,0,1,{id:'loop'});
 var pn=isoPart('panel',272,-100,0,1,{id:'mon'}),an=isoPart('analyzer',240,-92,0,1,{id:'mon'});
 var wx=292,wy=-230,zh=150,xs=204,xr=216,yh=-200,yr=-188,xd=328;
 var o=ro.ports.out,ti=tk.ports.in,to=tk.ports.out,tr=tk.ports.ret;
 /* generation to storage: up out of the rack, over and down into the tank */
 var p1=isoPipe([o,[o[0]+10,o[1],o[2]],[o[0]+10,o[1],112],[o[0]+10,ti[1],112],[ti[0],ti[1],112],ti],{r:2.6,id:'gen',to:'loop',caps:false});
 /* the loop: out of the tank low, up the riser, along the header to the washer (supply) ... */
 var p2=isoPipe([to,[xs,to[1],to[2]],[xs,to[1],zh],[xs,yh,zh],[xd+30,yh,zh]],{r:2.6,id:'loop',to:'tie',caps:false});
 /* ... the tie-in: a drop off the supply, then a short level leg that runs forward under the return and carries the
    valve inline (along y), then down into the washer top; the handwheel sits clear below the return in the drawing
    (pass 12 build B verify, finding 2) */
 var yv=-168,zv=124,p3=isoPipe([[xd,yh,zh],[xd,yh,zv],[xd,yv,zv],[xd,yv,107]],{r:2,id:'tie',flow:false,caps:'end'}),vl=isoPart('valve',xd,-184,zv,1.3,{id:'tie',rot:1,r:1.54});
 /* ... and back: the return turns at the far end, runs home past the analyser and drops into the tank */
 var p4=isoPipe([[xd+30,yh,zh],[xd+30,yr,zh],[xr,yr,zh],[xr,tr[1],zh],[tr[0],tr[1],zh],tr],{r:2.6,id:'loop',from:'tie',to:'mon',caps:false});
 var sp=isoPipe([an.ports.top,[an.ports.top[0],an.ports.top[1],zh-6],[xr,an.ports.top[1],zh-6]],{r:1,id:'mon',flow:false,caps:false});
 var arrows=[isoArrow([xs,-130,zh],'-y',{size:6}),isoArrow([266,yh,zh],'x',{size:6}),isoArrow([xr,-130,zh],'y',{size:6})].join('');
 /* zones: the parts each groups, and the 3D points its frame holds */
 var Z=[
  {k:'gen',svg:[ro,p1].join(''),pts:[[-6,0,0],[118,0,0],[118,54,0],[-6,54,0],[0,0,70],[118,26,70]]},
  {k:'loop',svg:[tk].join(''),pts:[[144,-86,0],[196,-34,0],[144,-86,104],[196,-34,104],[144,-34,0],[196,-86,104]]},
  {k:'mon',svg:[an,sp,pn].join(''),pts:[[230,-112,0],[292,-88,0],[230,-80,0],[292,-112,62],[230,-112,62],[240,-92,44]]},
  {k:'tie',svg:[wzWasher(wx,wy),p3,vl].join(''),pts:[[wx-4,wy-4,0],[wx+96,wy-4,0],[wx+96,wy+76,0],[wx-4,wy+76,0],[wx-4,wy-4,110],[wx+96,wy+76,110],[xd,yh,140]]}];
 /* back to front: generation, storage, the washer and tie-in, the monitoring in front; the loop runs over them */
 var inner='<g class="aq-washer-zones__z" data-z="0">'+Z[0].svg+'</g><g class="aq-washer-zones__z" data-z="1">'+Z[1].svg+'</g>'
  +'<g class="aq-washer-zones__z" data-z="3">'+Z[3].svg+'</g><g class="aq-washer-zones__z" data-z="2">'+Z[2].svg+'</g>'
  +'<g class="aq-washer-zones__z aq-washer-zones__z--loop" data-z="1">'+p2+p4+arrows+'</g>';
 return {inner:inner,Z:Z,top:[[xs-4,yh,zh+6],[xd+34,yh,zh+6],[xd+34,yr,zh+6],[xs,-60,zh+6]]}}
LOOKS['washer-zones']=function(b,H){var I=(b.items||[]).slice(0,4),n=I.length,S=wzScene(),used={},map=[];
 /* each item takes its zone by icon, or the next free one */
 I.forEach(function(it,i){var z=ZONE[it.icon];if(z==null||used[z])z=null;map[i]=z;if(z!=null)used[z]=1});
 map=map.map(function(z){if(z!=null)return z;for(var j=0;j<4;j++)if(!used[j]){used[j]=1;return j}return 0});
 /* the viewBox: every zone's frame plus the loop header, scaled by K */
 var all=[];S.Z.forEach(function(z){all=all.concat(z.pts)});all=all.concat(S.top);
 var bx=isoBounds(all,14),W=Math.round(bx.w*K),HH=Math.round(bx.h*K),org=[-bx.x*K,-bx.y*K];
 var frames='',tags='',zr=[];
 S.Z.forEach(function(z,j){var f=isoBounds(z.pts,9),x=f.x*K+org[0],y=f.y*K+org[1],w=f.w*K,h=f.h*K;zr[j]={x:x,y:y,w:w,h:h};
  frames+='<rect class="aq-washer-zones__frame" data-z="'+j+'" x="'+isoF(x)+'" y="'+isoF(y)+'" width="'+isoF(w)+'" height="'+isoF(h)+'"/>'});
 /* tags on each frame's top right corner; zone 2's sits bottom left, clear of the riser's bend into the header */
 var CORNER=['tr','bl','tr','tr'];
 I.forEach(function(it,i){var r=zr[map[i]],bl=CORNER[map[i]]==='bl',L=bl?r.x:r.x+r.w,T=bl?r.y+r.h:r.y;
  tags+='<span class="aq-washer-zones__tag'+(bl?' aq-washer-zones__tag--bl':'')+'" data-z="'+map[i]+'" data-k="'+i+'" style="left:'+(L/W*100).toFixed(2)+'%;top:'+(T/HH*100).toFixed(2)+'%">'+(i<9?'0':'')+(i+1)+'</span>'});
 var svg='<svg class="aq-iso aq-washer-zones__svg" viewBox="0 0 '+W+' '+HH+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">'
  +'<g transform="translate('+isoF(org[0])+' '+isoF(org[1])+') scale('+K+')">'+S.inner+'</g><g class="aq-washer-zones__frames">'+frames+'</g></svg>';
 var cams=zr.map(function(r){return [(r.x+r.w/2)/W,(r.y+r.h/2)/HH,r.w/W,r.h/HH].map(function(v){return v.toFixed(4)}).join(' ')}).join(',');
 var rows=I.map(function(it,i){var lk=it.link&&wp(it.link),no=(i<9?'0':'')+(i+1);
  var inner='<span class="aq-washer-zones__no" aria-hidden="true">'+no+'</span>'+(it.tag?'<span class="aq-washer-zones__chip">'+tx(it.tag)+'</span>':'')
   +'<h3 class="aq-washer-zones__t">'+tx(it.t)+'</h3>'+(it.d?'<span class="aq-washer-zones__d">'+tx(it.d)+'</span>':'')
   +(lk?'<span class="aq-washer-zones__arrow" aria-hidden="true"></span>':'');
  return '<li class="aq-washer-zones__row'+(i?'':' is-snap')+'" data-z="'+map[i]+'" data-k="'+i+'">'+(lk?'<a class="aq-washer-zones__in" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+inner+'</a>':'<div class="aq-washer-zones__in">'+inner+'</div>')+'</li>'}).join('');
 var dots=n>1?'<div class="aq-washer-zones__dots" role="group" aria-label="'+e(String(b.h||'Systems'))+'">'+I.map(function(it,i){return '<button type="button" class="aq-washer-zones__dot" data-snap-to="'+i+'"'+(i?'':' aria-current="true"')+' aria-label="'+e(String(it.t||''))+'"><span>'+(i<9?'0':'')+(i+1)+'</span></button>'}).join('')+'</div>':'';
 return sec(H+'<div class="aq-washer-zones" data-snap-box data-cams="'+cams+'" style="--n:'+n+'"><div class="aq-washer-zones__fig" aria-hidden="true"><div class="aq-washer-zones__cam" style="--ar:'+(W/HH).toFixed(4)+'">'+svg+tags+'</div></div>'
  +'<ol class="aq-washer-zones__rows" data-snap>'+rows+'</ol>'+dots+'</div>','aq-washer-zones-sec')};
/* Zone focus. Desktop: pointing at or focusing a row lights its zone (frame and tag in flow, the other zones quiet);
   leaving the rows clears it. Phones: the card in view (AQsnap's .is-snap) is the zone the camera frames.
   The camera is ported from Subframe Motion "Guided inspection" (guided-inspection), MIT, (c) 2026 Subframe: one
   transform pans and zooms the drawing so the stop is centred, eased in 550 ms (.22,.75,.22,1) in CSS; instant under
   reduced motion. State, not motion: it runs with reduced motion too. */
function wzSet(w,z){if(w.getAttribute('data-on')===String(z))return;if(z==null||z<0){w.removeAttribute('data-on')}else w.setAttribute('data-on',z);
 [].forEach.call(w.querySelectorAll('[data-z]'),function(x){x.classList.toggle('is-on',z!=null&&z>=0&&x.getAttribute('data-z')===String(z))})}
function wzCam(w,z){var c=(w.getAttribute('data-cams')||'').split(',')[z];if(!c)return;c=c.split(' ').map(Number);
 var fig=w.querySelector('.aq-washer-zones__fig');if(!fig)return;var fw=fig.clientWidth||1,fh=fig.clientHeight||1;
 /* the drawing fills the strip's height; zoom so the zone takes about 80 % of the strip, never under 1 or over 2.2 */
 var cam=w.querySelector('.aq-washer-zones__cam');if(!cam)return;var cw=cam.offsetWidth||fw,ch=cam.offsetHeight||fh;
 /* a wide strip (tablet, 600 px and over) shows the whole drawing at 1x; the lit zone still marks the card in view */
 var s=fw>=600?1:Math.max(1,Math.min(2.2,0.8*Math.min(fw/(c[2]*cw),fh/(c[3]*ch))));
 var tx=fw/2-c[0]*cw*s,ty=fh/2-c[1]*ch*s;tx=Math.min(0,Math.max(fw-cw*s,tx));ty=Math.min(0,Math.max(fh-ch*s,ty));
 cam.style.setProperty('--zs',s.toFixed(3));cam.style.setProperty('--zx',tx.toFixed(1)+'px');cam.style.setProperty('--zy',ty.toFixed(1)+'px')}
function wzNarrow(w){var fig=w.querySelector('.aq-washer-zones__fig');return fig&&getComputedStyle(fig).getPropertyValue('--wz-phone').trim()==='1'}
function wzSync(w){var r=w.querySelector('.aq-washer-zones__row.is-snap');if(!wzNarrow(w))return;var z=r?+r.getAttribute('data-z'):0;wzSet(w,z);wzCam(w,z)}
function wzInit(w){if(w._wz)return;w._wz=1;var rail=w.querySelector('[data-snap]');
 if(rail&&window.MutationObserver)new MutationObserver(function(){wzSync(w)}).observe(rail,{subtree:true,attributes:true,attributeFilter:['class']});
 wzSync(w)}
if(typeof document!=='undefined'&&document.addEventListener){
 var sq=0;function scan(){sq=0;[].forEach.call(document.querySelectorAll('.aq-washer-zones'),wzInit)}
 if(window.MutationObserver)new MutationObserver(function(){if(!sq)sq=requestAnimationFrame(scan)}).observe(document.documentElement,{childList:true,subtree:true});
 document.addEventListener('DOMContentLoaded',scan);
 var rt=null;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){[].forEach.call(document.querySelectorAll('.aq-washer-zones'),function(w){if(wzNarrow(w))wzSync(w);else wzSet(w,null)})},120)});
 document.addEventListener('pointerover',function(ev){if(ev.pointerType!=='mouse')return;var t=ev.target.closest&&ev.target.closest('.aq-washer-zones__row');if(!t)return;var w=t.closest('.aq-washer-zones');if(w&&!wzNarrow(w))wzSet(w,+t.getAttribute('data-z'))});
 document.addEventListener('pointerout',function(ev){if(ev.pointerType!=='mouse')return;var t=ev.target.closest&&ev.target.closest('.aq-washer-zones__rows');if(!t||(ev.relatedTarget&&t.contains(ev.relatedTarget)))return;var w=t.closest('.aq-washer-zones');if(w&&!wzNarrow(w)&&!t.contains(document.activeElement))wzSet(w,null)});
 document.addEventListener('focusin',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-washer-zones__row');if(!t)return;var w=t.closest('.aq-washer-zones');if(w&&!wzNarrow(w))wzSet(w,+t.getAttribute('data-z'))});
 document.addEventListener('focusout',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-washer-zones__rows');if(!t||(ev.relatedTarget&&t.contains(ev.relatedTarget)))return;var w=t.closest('.aq-washer-zones');if(w&&!wzNarrow(w))wzSet(w,null)})}
})();
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
