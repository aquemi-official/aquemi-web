/* HeroScene (pass 12, round B): drawn hero scenes for the hub pages that had no drawing (S17). Opt-in hero field
   "figure": {"look": "<scene>", …look-only fields}; README: design-system/components/HeroScene/README.md.
   Each scene is one IsoKit line drawing (aria-hidden) with numbered tags, and a key under it whose rows carry the same
   numbers and say what each tag is, in the page's own words: page titles (nav_label) or the row names of one of the
   page's own blocks. Hovering or focusing a key row lights its part of the drawing (CSS :has, no script).
   - module-lineup (systems, concept 222): the hub's modules in water order, each on its own plinth stepping up, one
     pipe through all four; key = the system index (hero field "index": its page ids in that order).
   - service-ring (services, 225): the PP package on a skid at the centre of a shop floor ringed by one station per
     service page, numbered round the ring; key = the services index.
   - site-room (first-system, 229): an empty room with the package's dashed footprint, the water and drain stubs, the
     power point and the door as the way in; key = the rows "keys" names, read from the block with anchor "from".
   - use-fan (projects, 233): the package at the back corner, one PP loop running round a quarter floor split into one
     use scene per industry page ("uses": page ids), a drop from the loop into each scene; key = those pages.
   Numbers are never written into the key's markup (CSS counter, as the hero index); the drawing's tags repeat them. */
var HS_C=Math.cos(Math.PI/6);
function hsN(k){return (k<10?'0':'')+k}
/* the drawing's viewBox from the screen bounds of its 3D extremes */
function hsFrame(pts,pad){var b=isoBounds(pts,pad||8);return {W:Math.ceil(b.w),H:Math.ceil(b.h),org:[-b.x,-b.y]}}
function hsTag(k,p3,F,cls,n){var at=isoPct(isoP(p3),F.W,F.H,F.org);
 return '<span class="aq-hero-scene__tag'+(cls?' '+cls:'')+'" data-k="'+k+'" style="left:'+at.left+';top:'+at.top+'">'+hsN(n||k)+'</span>'}
function hsDraw(F,inner,tags){return '<div class="aq-hero-scene__draw" aria-hidden="true" style="--hs-r:'+F.W+' / '+F.H+'">'+isoSvg(F.W,F.H,inner,'aq-hero-scene__svg',{origin:F.org})+tags+'</div>'}
/* A custom piece built with IsoKit's part builder (isoB), so it draws, lights and animates like a kit part */
function hsPart(kind,x,y,z,s,id,draw){var b=isoB(x,y,z,s||1,0);draw(b);if(!b.port.top)b.port.top=[0,0,30];if(!b.port.base)b.port.base=[0,0,0];return b.done(kind,{id:id})}
/* a second builder's drawing added into a part as plain shapes (no nested aq-iso__part, so motion draws it once) */
function hsSub(b2,kind){return b2.done(kind,{}).svg.replace(/^<g class="aq-iso__part"[^>]*>/,'<g class="aq-hero-scene__sub">')}
/* table: top W x D at height H on four legs (the urs desk, the fusion bench, the binder table) */
function hsTable(b,W,D,H){var u=W/2-2,v=D/2-2;[[-u,-v],[u,-v],[-u,v],[u,v]].forEach(function(q){b.bx(q[0],q[1],0,1.6,1.6,H-1.6)});b.bx(0,0,H-1.6,W,D,1.6);return b}
/* The key: rows numbered by a CSS counter. it: {t, wp | jump | none}. label: eyebrow-style caption over the rows. */
function hsKey(items,o){o=o||{};
 var rows=items.map(function(it,i){var t='<span class="aq-hero-scene__t">'+tx(it.t)+'</span>',a=' data-k="'+(i+1)+'"';
  return '<li'+a+(it.n?' style="counter-set:aq-hero-scene '+it.n+'"':'')+'>'+(it.wp?'<a class="aq-hero-scene__row" href="#'+e(it.wp)+'" data-wp="'+e(it.wp)+'">'+t+'</a>':it.jump?'<a class="aq-hero-scene__row" href="#'+e(WP)+'" data-jump="'+e(it.jump)+'">'+t+'</a>':'<span class="aq-hero-scene__row">'+t+'</span>')+'</li>'}).join('');
 var more=o.more?'<a class="aq-hero-scene__more" href="#'+e(WP)+'" data-jump="'+e(o.more.jump)+'">'+tx(o.more.t)+'</a>':'';
 var list=(o.label?'<p class="aq-hero-scene__label">'+e(o.label)+'</p>':'')+'<ol style="--hs-n:'+items.length+'">'+rows+'</ol>'+more;
 return o.aria?'<nav class="aq-hero-scene__key" aria-label="'+e(o.aria)+'">'+list+'</nav>':'<div class="aq-hero-scene__key">'+list+'</div>'}
function hsWrap(kind,draw,key){return '<figure class="aq-hero-scene aq-hero-scene--'+kind+'">'+draw+key+'</figure>'}

/* ---------- module-lineup (systems) ---------- */
/* What stands on each module's plinth, by page id; c is the plinth's top centre. Returns {parts, inn, out, top} */
function hsModule(id,c,k){var x=c[0],y=c[1],z=c[2],K='k'+k,G=1.2,P=function(kind,u,v,s,o){o=o||{};o.id=K;return isoPart(kind,x+u*G,y+v*G,z,s*G,o)};
 if(id==='sys-pretreatment'){var f=P('filter',-12,8,0.9),cb=P('carbon',14,-8,0.9);
  return {parts:[cb,f],inn:f.ports.in,out:cb.ports.out,top:cb.ports.top,link:isoPipe(isoRoute(f.ports.out,cb.ports.in,'xyz'),{r:1.6,to:K,caps:false,wall:false})}}
 if(id==='sys-pw'){var r=isoPart('ro',x-36,y-8,z,0.64,{id:K}),ed=P('edi',4,-26,0.66);
  return {parts:[ed,r],inn:r.ports.in,out:ed.ports.out,top:r.ports.top,link:isoPipe(isoRoute(r.ports.out,ed.ports.in,'zyx'),{r:1.6,to:K,caps:false,wall:false})}}
 if(id==='sys-storage'){var t=P('tank',0,0,0.86);return {parts:[t],inn:t.ports.in,out:t.ports.out,top:t.ports.top}}
 if(id==='sys-monitoring'){var pa=P('panel',8,-8,0.9),an=P('analyzer',-16,10,0.9);return {parts:[pa,an],inn:an.ports.sample,top:pa.ports.top}}
 var m=P('module',0,0,0.8);return {parts:[m],inn:m.ports.in,out:m.ports.out,top:m.ports.top}}
function wHeroLineup(p,idx){var it=idx.items.slice(0,4),n=it.length;if(n<2)return '';
 var S=96,PW=84,PD=70,pts=[],body='',tags='',mods=[];
 var at=function(i){return [S*i,-S*i,10+12*(n-1-i)]};
 it.forEach(function(q,i){var c=at(i),k=i+1;
  body+='<g class="aq-iso__part aq-hero-scene__plinth" data-iso-id="k'+k+'"><path class="aq-iso__eq aq-iso__eq--alt" d="'+isoBoxD([c[0]-PW/2,c[1]-PD/2,0],PW,PD,c[2])+'"/></g>';
  mods.push(hsModule(q.wp,c,k));
  pts.push([c[0]-PW/2,c[1]-PD/2,0],[c[0]+PW/2,c[1]+PD/2,0],[c[0]-PW/2,c[1]+PD/2,0],[c[0]+PW/2,c[1]-PD/2,0],[c[0],c[1],c[2]+100]);
  tags+='';});
 /* one pipe through the line-up: out of each module, along the plinth tops, into the next */
 mods.forEach(function(g,i){var k=i+1;body+=g.parts.join('')+(g.link||'');
  var nx=mods[i+1];if(!nx||!g.out||!nx.inn)return;var a=g.out,b=nx.inn,c1=at(i+1);
  body+=isoPipe(isoRoute(a,b,'xzy',{via:[[c1[0]-PW/2-6,a[1],a[2]],[c1[0]-PW/2-6,a[1],c1[2]+6],[c1[0]-PW/2-6,b[1],c1[2]+6]]}),{r:2,to:'k'+(k+1),caps:false})});
 var F=hsFrame(pts,16);
 it.forEach(function(q,i){var c=at(i);tags+=hsTag(i+1,[c[0]-8,c[1]+PD/2,c[2]*0.5],F,'aq-hero-scene__tag--plinth')});
 return hsWrap('lineup',hsDraw(F,body,tags),hsKey(it,{label:idx.label,aria:idx.aria}))}

/* ---------- service-ring (services) ---------- */
/* One station per service page, drawn at floor point (x, y); returns a part (ports.top for the tag) */
function hsStation(id,x,y,k){var K='k'+k,G=1.3;
 if(id==='svc-design')return isoPart('desk',x,y,0,0.72*G,{id:K});
 if(id==='svc-service')return isoPart('truck',x-34,y-10,0,0.56*G,{id:K});
 if(id==='svc-cq')return hsPart('station',x,y,0,0.9*G,K,function(b){hsTable(b,30,20,18);var bd=ISO_PARTS.binder;b.port.top=[0,0,46];
  /* binders on the table top: draw them through a second builder raised to the table height */
  var b2=isoB(x,y,18*0.9*G,0.8*G,0);bd(b2,{});b.add(hsSub(b2,'binder'))});
 if(id==='urs-guide')return hsPart('station',x,y,0,0.9*G,K,function(b){hsTable(b,34,22,22);var b2=isoB(x,y,22*0.9*G,0.8*G,0);ISO_PARTS.clipboard(b2,{ticks:2});b.add(hsSub(b2,'clipboard'));b.port.top=[0,0,30]});
 if(id==='project-plan')return hsPart('station',x,y,0,0.9*G,K,function(b){/* schedule board on two posts, bars on its face */
  b.bx(-15,0,0,2,2,40);b.bx(15,0,0,2,2,40);b.bx(-15,0,0,8,8,1.2);b.bx(15,0,0,8,8,1.2);b.box(-19,-1,14,38,2,26);
  [[-15,-3,34],[-9,3,29],[-2,10,24],[5,15,19]].forEach(function(r){b.line([r[0],1.05,r[2]],[r[1],1.05,r[2]],ISO_K.acc)});
  b.line([-17,1.05,37],[17,1.05,37],ISO_K.th);b.port.top=[0,0,46]});
 if(id==='svc-fabrication')return hsPart('station',x,y,0,0.9*G,K,function(b){hsTable(b,40,18,20);
  b.cyl(-19,0,24,'x',15,3.2);b.cyl(4,0,24,'x',15,3.2);b.bx(0,0,20,6,14,10);b.rect('y',-2,22,2,28,7,ISO_K.acc);b.port.top=[0,0,38]});
 if(id==='svc-fat-sat')return hsPart('station',x,y,0,0.9*G,K,function(b){/* test cart on castors: tank, gauge, hose */
  [[-12,-7],[12,-7],[-12,7],[12,7]].forEach(function(q){b.cyl(q[0],q[1],0,'z',3,2)});b.bx(0,0,3,32,20,3);
  b.vessel(-6,0,6,7,18,3,0);b.bx(9,0,6,10,14,16);b.cyl(9,7,16,'y',1.4,3.4);b.ring(9,8.4,16,'y',2.6);b.port.top=[0,0,34]});
 if(id==='svc-upgrades')return hsPart('station',x,y,0,0.9*G,K,function(b){/* lifting gantry over a module */
  [-22,22].forEach(function(u){b.bx(u,-10,0,2,2,50);b.bx(u,10,0,2,2,50);b.bx(u,0,0,3,26,2)});
  b.bx(0,0,50,48,3,3);b.bx(4,0,44,6,6,6);b.line([7,0,44],[7,0,32]);
  b.bx(4,0,0,22,18,26);b.rect('y',-3,6,11,20,9);b.port.top=[0,0,56]});
 return isoPart('module',x,y,0,0.6*G,{id:K})}
function wHeroRing(p,idx){var it=idx.items.slice(0,8),n=it.length;if(n<3)return '';
 var R=166,pts=[],st=[],a0=-135;
 it.forEach(function(q,i){var a=(a0+360*i/n)*Math.PI/180,x=R*Math.cos(a),y=R*Math.sin(a);st.push({wp:q.wp,x:x,y:y,k:i+1,d:x+y})});
 /* the package at the centre: skid, membrane rack, tank and panel; drawn between the back and front stations */
 var pk='<g class="aq-hero-scene__pkg">'+isoPart('skid',-52,-32,0,1,{w:104,d:64})+isoPart('ro',-46,-26,9,0.5)+isoPart('tank',26,4,9,0.62)+isoPart('panel',28,-20,9,0.6)+'</g>';
 var ring='<path class="aq-iso__hid" d="'+isoRingD([0,0,0],'z',R)+'"/>',back='',front='';
 st.slice().sort(function(a,b){return a.d-b.d}).forEach(function(s){var g=hsStation(s.wp,s.x,s.y,s.k);s.top=g.ports.top||[s.x,s.y,40];if(s.d<0)back+=g;else front+=g});
 st.forEach(function(s){pts.push([s.x-36,s.y-36,0],[s.x+36,s.y+36,0],[s.x-36,s.y+36,0],[s.x+36,s.y-36,0],[s.x,s.y,76])});
 var F=hsFrame(pts,6),tags=st.map(function(s){return hsTag(s.k,[s.top[0],s.top[1],s.top[2]+6],F)}).join('');
 return hsWrap('ring',hsDraw(F,ring+back+pk+front,tags),hsKey(it,{label:idx.label,aria:idx.aria}))}

/* ---------- site-room (first-system) ---------- */
function wHeroRoom(p,f){var bi=-1,blk=(p.blocks||[]).filter(function(b,i){if(b.anchor===f.from){bi=i;return true}return false})[0];if(!blk)return '';
 var rows=blk.rows||[],want=(f.keys||[]).slice(0,5),it=[];
 want.forEach(function(w){var r=rows.filter(function(q){return q.p===w})[0];if(r)it.push({t:r.p,n:rows.indexOf(r)+1})});if(it.length<5)return '';
 var X=200,Y=150,Hw=76,T=6,body='';
 /* walls: the back two, cut at the top (their cut faces sunken), then the floor slab */
 body+='<g class="aq-hero-scene__shell"><path class="aq-iso__eq aq-iso__eq--alt" d="'+isoBoxD([-T,-T,-4],T,Y+T,Hw+4)+'"/><path class="aq-iso__eq" d="'+isoBoxD([0,-T,-4],X,T,Hw+4)+'"/>'+
  '<path class="aq-iso__eq" d="'+isoBoxD([0,0,-6],X,Y,6)+'"/></g>';
 /* 05 the door in the right wall, its leaf open into the room, and the way in: a dashed route to the footprint */
 var dx=150,dw=28,dh=62,door=hsPart('door',0,0,0,1,'k5',function(b){b.poly([[dx,0.1,0],[dx+dw,0.1,0],[dx+dw,0.1,dh],[dx,0.1,dh]],ISO_K.alt);
  b.poly([[dx,0,0],[dx,24,0],[dx,24,dh-2],[dx,0,dh-2]],ISO_K.eq);b.line([dx,18,dh*0.45],[dx,20.5,dh*0.45]);b.port.top=[dx+dw/2,0,dh+6]});
 var route=isoPoly([[dx+dw/2,6,0.2],[dx+dw/2,62,0.2],[140,62,0.2]]);
 /* 01 the package: its footprint dashed on the floor and its outline dashed in the air, waiting for it */
 var fx=48,fy=58,fw=88,fd=56,fh=58,ghost=hsPart('footprint',0,0,0,1,'k1',function(b){
  b.add(isoPath(isoPoly([[fx,fy,0.2],[fx+fw,fy,0.2],[fx+fw,fy+fd,0.2],[fx,fy+fd,0.2]],true),'aq-iso__hid aq-hero-scene__foot'));
  var c=[[fx,fy+fd],[fx+fw,fy+fd],[fx+fw,fy],[fx,fy]],d='';c.forEach(function(q){d+=isoPoly([[q[0],q[1],0.2],[q[0],q[1],fh]])});
  d+=isoPoly([[fx,fy,fh],[fx+fw,fy,fh],[fx+fw,fy+fd,fh],[fx,fy+fd,fh]],true);b.add(isoPath(d,'aq-iso__hid'));b.port.top=[fx+fw/2,fy+fd/2,fh]});
 /* 02 water supply: a stub out of the left wall with its valve, the room's one flow line */
 var wy=88,wz=32,water=hsPart('water',0,0,0,1,'k2',function(b){b.port.top=[16,wy,wz+8]})+
  isoPipe([[-T,wy,wz],[22,wy,wz]],{r:2.2,caps:'end',flanges:false,to:'k2'})+isoPart('valve',12,wy,wz,0.9,{id:'k2'});
 /* 03 drain: a floor drain grate between the footprint and the wall */
 var drain=hsPart('drain',24,124,0,1,'k3',function(b){b.poly([[-9,-9,0.3],[9,-9,0.3],[9,9,0.3],[-9,9,0.3]],ISO_K.eq);
  for(var u=-5;u<=5;u+=3.3)b.line([u,-6,0.4],[u,6,0.4],ISO_K.th);b.port.top=[0,0,2]});
 /* 04 power: an isolator box on the right wall with its conduit up the wall */
 var power=hsPart('power',0,0,0,1,'k4',function(b){b.box(98,0,30,16,5,20);b.rect('y',101,33,111,47,5);b.line([108,5,40],[108,7.5,44]);b.line([106,1,50],[106,1,Hw],ISO_K.ln);b.port.top=[106,4,52]});
 body+=water+power+door+'<path class="aq-iso__hid aq-hero-scene__route" d="'+route+'"/>'+isoArrow([140,62,0.2],'-x',{size:5,cls:'aq-hero-scene__arrow'})+drain+ghost;
 var F=hsFrame([[-T,-T,Hw],[X,-T,Hw],[-T,Y,Hw],[X,Y,-6],[-T,Y,-6],[X,-T,-6]],8);
 /* the tags and key rows carry the block's own row numbers, so the hero and the block name each item alike */
 var tags=hsTag(1,[fx+fw/2,fy+fd/2,fh+8],F,'',it[0].n)+hsTag(2,[16,wy,wz+12],F,'',it[1].n)+hsTag(3,[24,124,12],F,'',it[2].n)+hsTag(4,[106,4,56],F,'',it[3].n)+hsTag(5,[dx+dw/2,0,dh+10],F,'',it[4].n);
 return hsWrap('room',hsDraw(F,body,tags),hsKey(it,{more:blk.h?{t:blk.h,jump:jid(blk,bi)}:null}))}

/* ---------- use-fan (projects) ---------- */
/* One use scene at floor point (x, y), fed from the loop above at height hz; returns {svg, inn (3D), top (3D)} */
function hsUse(id,x,y,k){var K='k'+k,G=1.3;
 if(id==='ind-hospital-lab'){var o=isoPart('outlet',x,y,0,0.9*G,{id:K});return {svg:o,inn:o.ports.in,top:o.ports.top}}
 if(id==='ind-meddevice'){var w=hsPart('use',x,y,0,G,K,function(b){b.bx(0,0,0,26,22,38);b.rect('y',-9,6,9,30,11,ISO_K.glass);b.line([-6,11,9],[6,11,9],ISO_K.th);
  b.rect('z',-9,-7,9,7,38);b.port.top=[0,0,38];b.port.in=[0,-4,38]});return {svg:w,inn:w.ports.in,top:w.ports.top}}
 if(id==='ind-personal-care'){var f=hsPart('use',x,y,0,G,K,function(b){/* filler over a short conveyor, bottles on it */
  b.bx(0,0,0,40,12,14);b.line([-20,6,12],[20,6,12],ISO_K.th);[-12,-2,8].forEach(function(u){b.vessel(u,0,14,2.6,7,1.6,0)});
  b.bx(4,-10,0,4,4,34);b.bx(-2,0,26,16,10,8);b.cyl(-2,0,24,'z',2,1.2);b.port.top=[-2,0,34];b.port.in=[-2,0,34]});return {svg:f,inn:f.ports.in,top:f.ports.top}}
 if(id==='ind-process'){var r=hsPart('use',x,y,0,G,K,function(b){/* rinse conveyor through a spray arch */
  b.bx(0,0,0,42,14,12);b.line([-21,7,10],[21,7,10],ISO_K.th);[-14,-4,6,16].forEach(function(u){b.box(u-3,-4,12,6,8,4)});
  b.poly([[-2,-9,12],[-2,-9,28],[-2,9,28],[-2,9,12]],ISO_K.ln,true);[-5,0,5].forEach(function(v){b.line([-2,v,27],[-2,v,22],ISO_K.acc)});
  b.port.top=[-2,0,30];b.port.in=[-2,0,28]});return {svg:r,inn:r.ports.in,top:r.ports.top}}
 /* ind-pharma and any other: a make-up kettle on legs with its agitator drive */
 var v=hsPart('use',x,y,0,G,K,function(b){b.leg(-8,-8,0,12);b.leg(8,-8,0,12);b.leg(-8,8,0,12);b.vessel(0,0,10,12,18,5,4);
  b.cyl(0,0,33,'z',8,3.4);b.cyl(5,-3,31,'z',4,1.4);b.port.top=[0,0,41];b.port.in=[5,-3,35]});return {svg:v,inn:v.ports.in,top:v.ports.top}}
function wHeroFan(p,f){var it=(f.uses||[]).map(function(id){var q=wp(id);return q?{t:q.nav_label||q.headline,wp:q.id}:null}).filter(Boolean).slice(0,5),n=it.length;if(n<3)return '';
 var R=196,Rf=R+36,H=86,body='',pts=[],sc=[];
 /* the quarter floor: its rim, its two edges and the dividers between the scenes */
 var arc=isoArc(isoP([0,0,0]),isoP([Rf,0,0]),isoP([0,Rf,0]),0,Math.PI/2,false),floor='M'+isoT(isoP([0,0,0]))+'L'+isoT(isoP([Rf,0,0]))+arc+'Z',div='';
 for(var j=1;j<n;j++){var b=(j/n)*Math.PI/2;div+=isoPoly([[48*Math.cos(b),48*Math.sin(b),0],[Rf*Math.cos(b),Rf*Math.sin(b),0]])}
 body+='<path class="aq-iso__eq aq-iso__eq--alt aq-hero-scene__floor" d="'+floor+'"/><path class="aq-iso__thin aq-hero-scene__div" d="'+div+'"/>';
 /* the package's floor pad, meeting the quarter floor at its apex, so the skid stands on something */
 body+='<path class="aq-iso__eq aq-iso__eq--alt aq-hero-scene__floor" d="'+isoPoly([[-78,-66,0],[0,-66,0],[0,0,0],[-78,0,0]],true)+'"/>';
 /* the package at the back corner */
 var pk=isoPart('skid',-70,-58,0,1,{w:58,d:44,id:'pkg'}),ro=isoPart('module',-48,-36,9,0.62,{id:'pkg',h:58}),tk=isoPart('tank',-24,-30,9,0.56,{id:'pkg'});
 body+='<g class="aq-hero-scene__pkg">'+pk+ro+tk+'</g>';
 /* scenes: 01 at the left, round to the right; drawn back to front */
 it.forEach(function(q,i){var a=(90-(i+0.5)*90/n)*Math.PI/180,x=R*Math.cos(a),y=R*Math.sin(a);sc.push({q:q,x:x,y:y,a:a,k:i+1,g:hsUse(q.wp,x,y,i+1)})});
 /* the loop: up out of the package, along one edge, round the rim, back along the other edge */
 var loop=[[-12,-30,40],[-12,-30,H],[-6,-6,H],[R,-6,H]],steps=24;
 for(var s=1;s<steps;s++){var t=(s/steps)*Math.PI/2;loop.push([R*Math.cos(t),R*Math.sin(t),H])}
 loop.push([-6,R,H],[-6,-6+12,H],[-34,-6+12,H],[-34,6,H],[-34,6,48]);
 var drops='';sc.forEach(function(s){var a=[s.x,s.y,H],b=s.g.inn;drops+=isoPipe([[b[0],b[1],H],b],{r:1.8,to:'k'+s.k,caps:false})});
 sc.slice().sort(function(a,b){return (a.x+a.y)-(b.x+b.y)}).forEach(function(s){body+=s.g.svg});
 body+=isoPipe(loop,{r:2.4,bend:6,caps:false})+drops;
 pts.push([0,0,0],[Rf,0,0],[0,Rf,0],[Rf*0.7071,Rf*0.7071,0],[-78,-66,0],[-70,-58,0],[-12,-58,0],[-70,-14,0],[-12,-30,H+8],[R,0,H+8],[0,R,H+8]);
 var F=hsFrame(pts,10),tags=sc.map(function(s){return hsTag(s.k,[(R+24)*Math.cos(s.a),(R+24)*Math.sin(s.a),0],F,'aq-hero-scene__tag--floor')}).join('');
 var lab=wp('industries');
 return hsWrap('fan',hsDraw(F,body,tags),hsKey(it,{label:(lab?lab.section:'Industries')+' · '+n+' pages',aria:'Industry pages'}))}

/* The hero's scene for this page, or '' (unknown look, too few rows: the hero falls back to its other figure) */
function wHeroScene(p){var f=p.figure||{},L=f.look;
 if(L==='module-lineup'||L==='service-ring'){var idx=heroBigIndex(p)||heroIndex(p);if(!idx)return '';return L==='module-lineup'?wHeroLineup(p,idx):wHeroRing(p,idx)}
 if(L==='site-room')return wHeroRoom(p,f);
 if(L==='use-fan')return wHeroFan(p,f);
 return ''}
