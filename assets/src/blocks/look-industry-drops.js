/* Look "industry-drops" -> IndustryDrops (design-system/components/IndustryDrops): one Purified Water header main, one
   drop per served industry (pass 12, concept 219, home.2). A package (tank, loop pump, RO rack) stands at the left; its
   supply rises into a twin-wall header that runs along the top of the first row of outlets, turns down at the end and
   comes back along the next row, and returns into the tank: a loop, never a dead leg. Every item hangs off the main on
   its own drop that ends in a small isometric point-of-use vignette (chosen by the item's link page: granulation bowl,
   two suite outlets, rinse bath, washer-disinfector, cream kettle with mixer, spray rinse over a conveyor; any other page
   gets a plain outlet), then its number, title (the link), line and standard as a mono tag. The main and drops are one
   measured SVG over the grid (redrawn on resize, like the ported beam below); the drawings are aria-hidden.
   Phone (container 860 px and under): PhoneKit chips. The main runs down the left edge; the outlets are a 2-column grid
   of tiles (number, vignette, title), each teed off the main, and the open tile's card (title link, line, tag) runs
   full width under them.
   Fields, as grid: h, intro, items [{t, d, tag, link}]. Concept: 219-p12-home-industries (header main from the package
   with drops to numbered point-of-use vignettes; phone: main down the left, 2-column outlet tiles). */
(function(){
var K='aq-industry-drops';
/* one point-of-use scene per industry page: {g: markup, tap: 3D top of the inlet stub, pts: 3D bounds} */
function idScene(link){var k=String(link||'').split('#')[0],b,g=[],tap,pts,pipe=function(p,o){var r=isoPipe(p,o||{r:2.2,caps:'start'});g.push(r);return r};
 if(k==='ind-pharma'){/* granulation bowl on a pedestal, chopper at the side */
  b=isoB(0,0,0,1);b.bx(0,0,0,30,30,4).cyl(0,0,4,'z',12,6).vessel(0,0,20,26,14,0,10).ring(0,0,34,'z',22.5).band(0,0,26,'z',26);
  b.noz(0,24,26,'y',7,3.4).cyl(0,31,26,'y',8,5.5);g.push(b.done('bowl',{}));
  tap=[0,0,74];pipe([tap,[0,0,40]]);pts=[[-30,-30,0],[30,30,0],[-26,26,0],[26,-26,34],[0,40,26],tap]}
 else if(k==='ind-cdmo'){/* two suite outlets fed from one tee */
  var s=0.72,A=isoPart('outlet',-28,0,0,s),B=isoPart('outlet',28,0,0,s),ia=A.ports.in,ib=B.ports.in,zh=ia[2]+8;
  g.push(A,B);tap=[0,ia[1],zh+22];pipe([[ia[0],ia[1],ia[2]],[ia[0],ia[1],zh],[ib[0],ib[1],zh],[ib[0],ib[1],ib[2]]],{r:2,caps:'ends'});
  pipe([tap,[0,ia[1],zh]],{r:2,caps:'start'});pts=[[-42,-10,0],[42,10,0],[-42,10,0],[42,-10,0],[0,-10,zh+8],tap]}
 else if(k==='ind-meddevice'){/* open rinse bath with a parts basket */
  b=isoB(0,0,0,1);b.leg(-26,-10,0,10).leg(26,-10,0,10).box(-32,-15,8,64,30,22).leg(-26,10,0,10).leg(26,10,0,10);
  b.rect('z',-29,-12,29,12,30,ISO_K.alt);b.poly([[-29,12,30],[-29,-12,30],[29,-12,30]],ISO_K.th,true);
  b.line([-29,-12,30],[-29,-12,26],ISO_K.th).line([-32,15,24],[32,15,24],ISO_K.th);
  b.box(-12,-6,24,24,12,14,ISO_K.th);b.line([-12,0,38],[0,0,46],ISO_K.th).line([0,0,46],[12,0,38],ISO_K.th);g.push(b.done('bath',{}));
  tap=[20,-4,70];pipe([tap,[20,-4,34]]);pts=[[-34,-17,0],[34,17,0],[-34,17,0],[34,-17,30],tap]}
 else if(k==='ind-hospital-lab'){/* washer-disinfector: cabinet, vertical glass door with rack shelves, control strip */
  b=isoB(0,0,0,1);b.box(-20,-17,0,40,34,58);b.line([-20,17,4],[20,17,4],ISO_K.th);
  b.rect('y',-15,8,15,47,17,ISO_K.glass);b.line([-13,17,20],[13,17,20],ISO_K.th).line([-13,17,33],[13,17,33],ISO_K.th);
  b.rect('y',-18,50,18,55,17,ISO_K.th);b.rect('y',6,51,14,54,17,ISO_K.alt);b.line([11,17,24],[11,17,32],ISO_K.ln);g.push(b.done('washer',{}));
  tap=[-6,-6,84];pipe([tap,[-6,-6,58]]);pts=[[-20,-17,0],[20,17,0],[-20,17,0],[20,-17,58],tap]}
 else if(k==='ind-personal-care'){/* cream kettle on three legs, mixer motor on a bridge */
  b=isoB(0,0,0,1);b.leg(-12,-10,0,22).leg(12,-10,0,22).leg(0,14,0,22).vessel(0,0,20,18,26,6,9).band(0,0,33,'z',18);
  b.noz(0,16,8,'y',4,2).bx(0,0,51,30,8,3).cyl(0,0,54,'z',14,6).cyl(0,0,68,'z',3,3.6);g.push(b.done('kettle',{}));
  tap=[-10,8,82];pipe([tap,[-10,8,49]]);pts=[[-20,-20,0],[20,20,0],[-20,20,0],[20,-20,71],tap]}
 else if(k==='ind-process'){/* spray rinse bar over a conveyor with parts */
  b=isoB(0,0,0,1);b.leg(-30,-6,0,16).leg(30,-6,0,16).box(-34,-9,16,68,18,4).leg(-30,6,0,16).leg(30,6,0,16);
  b.cyl(-34,-9,18,'y',18,2.6).cyl(34,-9,18,'y',18,2.6);b.bx(-18,0,20,9,9,5).bx(0,0,20,9,9,5).bx(18,0,20,9,9,5);g.push(b.done('conveyor',{}));
  pipe([[-24,0,40],[24,0,40]],{r:2,caps:'ends'});
  [-18,0,18].forEach(function(x){g.push(isoPath(isoPoly([[x,0,38],[x,0,35.5]]),ISO_K.ln));g.push('<path class="aq-iso__flow aq-iso__flow--drop" d="'+isoPoly([[x,0,34],[x,0,27]])+'"/>')});
  tap=[0,0,66];pipe([tap,[0,0,42]]);pts=[[-38,-11,0],[38,11,0],[-38,11,0],[38,-11,20],tap]}
 else{var o=isoPart('outlet',0,0,0,1);g.push(o);tap=o.ports.top;pts=[[-16,-11,0],[16,11,0],[-16,11,0],[16,-11,30],tap]}
 return {g:g.join(''),tap:tap,pts:pts}}
/* every vignette on one sheet size and scale, its floor on one line, so a row of outlets reads level */
var VW=150,VH=106;
function idFig(link,cls){var sc=idScene(link),bx=isoBounds(sc.pts,0),fl=Math.max.apply(null,sc.pts.map(function(p){return isoP(p)[1]}));
 var org=[VW/2-(bx.x+bx.w/2),VH-6-fl],t=isoPct(isoP(sc.tap),VW,VH,org);
 return {svg:isoSvg(VW,VH,sc.g,cls,{origin:org}),org:org,tap:t}}
/* the package: RO rack behind, tank, loop pump at the left; supply riser up from the pump, return riser down into the tank */
function idPkg(){var r=isoPart('ro',88,-39,0,0.5,{id:'ro',rot:2}),t=isoPart('tank',0,0,0,0.9,{id:'tank'}),p=isoPart('pump',-58,0,0,0.8,{id:'pump',rot:2});
 var pd=[-58-1.6,3.2,25.6],ZS=112,ZR=96,tr=t.ports.ret;
 var suc=isoPipe([[-46.8,0,11.2],[-8,0,11.2]],{r:2,caps:false,flow:false});
 var feed=isoPipe(isoRoute(r.ports.out||[44,-40,30],t.ports.in,'zxy'),{r:1.8,caps:false});
 var sup=isoPipe([pd,[pd[0],pd[1],ZS]],{r:2.4,caps:'end'}),ret=isoPipe([[tr[0],tr[1],ZR],tr],{r:2.4,caps:'start'});
 var inner=[r,feed,p,suc,t,sup,ret,isoArrow([pd[0],pd[1],ZS-26],'z',{size:4}),isoArrow([tr[0],tr[1],ZR-12],'-z',{size:4})].join('');
 var bx=isoBounds([[-80,-14,0],[-80,14,0],[30,-52,0],[90,-39,0],[86,-52,46],[24,24,0],[pd[0],pd[1],ZS],[tr[0],tr[1],ZR]],6),org=[-bx.x,-bx.y],W=Math.round(bx.w),H=Math.round(bx.h);
 return {svg:isoSvg(W,H,inner,'',{origin:org}),out:isoPct(isoP([pd[0],pd[1],ZS]),W,H,org),ret:isoPct(isoP([tr[0],tr[1],ZR]),W,H,org)}}
LOOKS['industry-drops']=function(b,H){var I=b.items||[],pk=idPkg();
 var items=I.map(function(it,i){var no=(i<9?'0':'')+(i+1),lk=it.link&&wp(it.link),f=idFig(it.link,''),mini=idFig(it.link,'aq-iso--current');
  var title=lk?'<a class="'+K+'__go" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':tx(it.t);
  return '<li class="'+K+'__item" data-k="'+i+'" data-pk-item="'+i+'">'
   +'<button type="button" class="'+K+'__chip" data-pk-head><span class="'+K+'__no">'+no+'</span><span class="'+K+'__mini" aria-hidden="true">'+mini.svg+'</span><span class="'+K+'__ct">'+tx(it.t)+'</span></button>'
   +'<div class="'+K+'__body" data-pk-body>'
    +'<div class="'+K+'__fig" aria-hidden="true">'+f.svg+'<span class="'+K+'__tap" style="left:'+f.tap.left+';top:'+f.tap.top+'"></span></div>'
    +'<span class="'+K+'__no" aria-hidden="true">'+no+'</span>'
    +'<h3 class="'+K+'__t">'+title+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')
    +(it.tag?'<span class="'+K+'__tag">'+tx(it.tag)+'</span>':'')
   +'</div></li>'}).join('');
 return sec(H+'<div class="'+K+'" style="--n:'+I.length+'">'
  +'<svg class="'+K+'__main" aria-hidden="true" focusable="false"></svg>'
  +'<div class="'+K+'__pkg" aria-hidden="true">'+pk.svg+'<span class="'+K+'__out" style="left:'+pk.out.left+';top:'+pk.out.top+'"></span><span class="'+K+'__ret" style="left:'+pk.ret.left+';top:'+pk.ret.top+'"></span></div>'
  +'<ol class="'+K+'__list" data-pk-picker="chips" data-pk-open="0">'+items+'</ol></div>',K+'-sec')};

/* The main and the drops: one SVG measured over the grid, redrawn whenever the section changes size.
   Ported from Subframe Motion "Animated beam connections" (animated-beam), MIT, (c) 2026 Subframe (kept: paths measured
   from the nodes' boxes and re-run by a ResizeObserver; replaced: the curved beams with an orthogonal twin-wall pipe
   with rounded elbows, routed as a loop). Each run is three strokes on one path (wall, bore, water), all walls first
   so the tees merge. Nothing here animates; motion.js plays the water. */
var NS='http://www.w3.org/2000/svg';
function rnd(P,r){var d='M'+P[0][0].toFixed(1)+' '+P[0][1].toFixed(1);
 for(var i=1;i<P.length;i++){var a=P[i-1],c=P[i],n=P[i+1];
  if(!n){d+='L'+c[0].toFixed(1)+' '+c[1].toFixed(1);break}
  var l1=Math.hypot(c[0]-a[0],c[1]-a[1]),l2=Math.hypot(n[0]-c[0],n[1]-c[1]),q=Math.min(r,l1/2,l2/2);
  var p1=[c[0]-(c[0]-a[0])/(l1||1)*q,c[1]-(c[1]-a[1])/(l1||1)*q],p2=[c[0]+(n[0]-c[0])/(l2||1)*q,c[1]+(n[1]-c[1])/(l2||1)*q];
  d+='L'+p1[0].toFixed(1)+' '+p1[1].toFixed(1)+'Q'+c[0].toFixed(1)+' '+c[1].toFixed(1)+' '+p2[0].toFixed(1)+' '+p2[1].toFixed(1)}
 return d}
function pth(svg,role,k){var s='[data-r="'+role+'"]'+(k!=null?'[data-k="'+k+'"]':''),p=svg.querySelector(s);
 if(!p){p=document.createElementNS(NS,'path');p.setAttribute('data-r',role);if(k!=null)p.setAttribute('data-k',k);p.setAttribute('class',K+'__'+role.split('-')[0]+(role.indexOf('drop')>=0?' '+K+'__drop':''));
  var grp=svg.querySelector('g[data-l="'+role.split('-')[0]+'"]');if(!grp){grp=document.createElementNS(NS,'g');grp.setAttribute('data-l',role.split('-')[0]);svg.appendChild(grp)}grp.appendChild(p)}
 return p}
function lay(w){var svg=w.querySelector('.'+K+'__main');if(!svg)return;
 if(getComputedStyle(svg).display==='none'){w.removeAttribute('data-laid');return}
 var R=w.getBoundingClientRect(),o=w.querySelector('.'+K+'__out'),rt=w.querySelector('.'+K+'__ret'),list=w.querySelector('.'+K+'__list');if(!o||!rt||!list||!R.width)return;
 svg.setAttribute('viewBox','0 0 '+Math.round(R.width)+' '+Math.round(R.height));
 function pt(el){var r=el.getBoundingClientRect();return [r.left-R.left,r.top-R.top]}
 var li=[].slice.call(w.querySelectorAll('.'+K+'__item')),rows=[],gap=parseFloat(getComputedStyle(list).columnGap)||24,LR=list.getBoundingClientRect(),HY=12;
 li.forEach(function(x){var r=x.getBoundingClientRect(),t=Math.round(r.top-R.top),row=rows.filter(function(q){return Math.abs(q.top-t)<4})[0];
  if(!row){row={top:t,bot:0,items:[]};rows.push(row)}row.bot=Math.max(row.bot,r.bottom-R.top);row.items.push(x)});
 rows.sort(function(a,b){return a.top-b.top});if(!rows.length)return;
 var O=pt(o),T=pt(rt),xL=LR.left-R.left-gap/2,xR=LR.right-R.left+gap/2,xT=LR.left-R.left-Math.max(16,gap)*0.9,P=[O];
 /* supply: up from the pump to the first row's header, then a serpentine along the rows' headers */
 rows.forEach(function(row,i){var y=row.top+HY,ltr=i%2===0;
  if(i===0){P.push([O[0],y])}else{P.push([ltr?xL:xR,y])}
  P.push([ltr?xR:xL,y]);row.y=y});
 /* return: an even row count ends at the left: straight back; an odd count runs down the right and back under the rows */
 var last=rows[rows.length-1];
 if(rows.length%2===0){P[P.length-1]=[xT,last.y]}
 else{var yb=last.bot+HY+8;P.push([xR,yb]);P.push([xT,yb])}
 var yh=Math.min(T[1]-14,(rows.length>1?rows[1].y:last.bot)-20);P.push([xT,yh]);P.push([T[0],yh]);P.push(T);
 var d=rnd(P,14);['wall-main','bore-main','water-main'].forEach(function(r){pth(svg,r).setAttribute('d',d)});
 /* drops: from the row header to each vignette's inlet, an arrowhead short of it */
 rows.forEach(function(row){row.items.forEach(function(x){var k=x.getAttribute('data-k'),tp=x.querySelector('.'+K+'__tap');if(!tp)return;var q=pt(tp),dd='M'+q[0].toFixed(1)+' '+row.y.toFixed(1)+'V'+(q[1]-9).toFixed(1);
  ['wall-drop','bore-drop','water-drop'].forEach(function(r){pth(svg,r,k).setAttribute('d',dd)});
  pth(svg,'head-drop',k).setAttribute('d','M'+(q[0]-5).toFixed(1)+' '+(q[1]-8).toFixed(1)+'L'+q[0].toFixed(1)+' '+(q[1]-2).toFixed(1)+'L'+(q[0]+5).toFixed(1)+' '+(q[1]-8).toFixed(1))})});
 var live={};li.forEach(function(x){live[x.getAttribute('data-k')]=1});
 [].forEach.call(svg.querySelectorAll('path[data-k]'),function(p){if(!live[p.getAttribute('data-k')])p.parentNode.removeChild(p)});
 w.setAttribute('data-laid','')}
function pick(w,k){if(!w)return;[].forEach.call(w.querySelectorAll('.'+K+'__drop'),function(p){p.classList.toggle('is-on',p.getAttribute('data-k')===k)});
 [].forEach.call(w.querySelectorAll('.'+K+'__item'),function(x){x.classList.toggle('is-on',x.getAttribute('data-k')===k)})}
window.AQindustryDrops={lay:lay,pick:pick};
if(typeof document!=='undefined'&&document.addEventListener){
 if(window.ResizeObserver&&window.MutationObserver){var ro=new ResizeObserver(function(es){es.forEach(function(en){lay(en.target)})});
  var scan=function(n){if(n.nodeType!==1)return;var L=n.matches('.'+K)?[n]:[].slice.call(n.querySelectorAll('.'+K));L.forEach(function(w){if(w.__idl)return;w.__idl=1;ro.observe(w);lay(w)})};
  new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,scan)})}).observe(document.documentElement,{childList:true,subtree:true});
  if(document.body)scan(document.body)}
 /* pointing at or focusing an outlet lights its drop (desktop); a pointer leaving the grid clears it */
 document.addEventListener('pointerover',function(ev){if(ev.pointerType==='touch'||!ev.target.closest)return;var it=ev.target.closest('.'+K+'__item'),w=ev.target.closest('.'+K);if(w)pick(w,it?it.getAttribute('data-k'):null)});
 document.addEventListener('focusin',function(ev){var it=ev.target.closest&&ev.target.closest('.'+K+'__item');if(it)pick(it.closest('.'+K),it.getAttribute('data-k'))});
 /* phone: after a chip opens its card, bring the card into view if it landed under the fold */
 document.addEventListener('click',function(ev){var c=ev.target.closest&&ev.target.closest('.'+K+'__chip');if(!c)return;
  requestAnimationFrame(function(){var bd=c.closest('.'+K).querySelector('.'+K+'__body:not([hidden])');if(!bd)return;
   if(bd.getBoundingClientRect().bottom>innerHeight-16)bd.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})})})}
})();
