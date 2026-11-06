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
/* The key: rows numbered by a CSS counter. it: {t, wp | jump | none}. label: eyebrow-style caption over the rows.
   A row that is not a link (its item lives in one section of this page) is a span the keyboard can still reach
   (tabindex 0, round C), so focus lights its part as hover does. o.cols: columns on desktop. */
function hsKey(items,o){o=o||{};
 var rows=items.map(function(it,i){var t='<span class="aq-hero-scene__t">'+tx(it.t)+'</span>',a=' data-k="'+(i+1)+'"';
  return '<li'+a+(it.n?' style="counter-set:aq-hero-scene '+it.n+'"':'')+'>'+(it.wp?'<a class="aq-hero-scene__row" href="#'+e(it.wp)+'" data-wp="'+e(it.wp)+'">'+t+'</a>':it.jump?'<a class="aq-hero-scene__row" href="#'+e(WP)+'" data-jump="'+e(it.jump)+'">'+t+'</a>':'<span class="aq-hero-scene__row" tabindex="0">'+t+'</span>')+'</li>'}).join('');
 var more=o.more?'<a class="aq-hero-scene__more" href="#'+e(WP)+'" data-jump="'+e(o.more.jump)+'">'+tx(o.more.t)+'</a>':'';
 var list=(o.label?'<p class="aq-hero-scene__label">'+e(o.label)+'</p>':'')+'<ol style="--hs-n:'+items.length+'">'+rows+'</ol>'+more,kc='aq-hero-scene__key'+(o.cols===3?' aq-hero-scene__key--c3':o.cols===2?' aq-hero-scene__key--c2':'');
 return o.aria?'<nav class="'+kc+'" aria-label="'+e(o.aria)+'">'+list+'</nav>':'<div class="'+kc+'">'+list+'</div>'}
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
 var tight=[];st.forEach(function(s){pts.push([s.x-36,s.y-36,0],[s.x+36,s.y+36,0],[s.x-36,s.y+36,0],[s.x+36,s.y-36,0],[s.x,s.y,76]);
  tight.push([s.x-27,s.y-27,0],[s.x+27,s.y+27,0],[s.x-27,s.y+27,0],[s.x+27,s.y-27,0],[s.top[0],s.top[1],s.top[2]+44])});
 var F=hsFrame(pts,6),tags=st.map(function(s){return hsTag(s.k,[s.top[0],s.top[1],s.top[2]+6],F)}).join('');
 return hsWrap('ring',hsCrop(F,hsFrame(tight,2),hsDraw(F,ring+back+pk+front,tags)),hsKey(it,{label:idx.label,aria:idx.aria}))}
/* Phone crop (round C, services): the ring's frame keeps 36 units round every station for the desktop; at 600 px and
   under the drawing is shown through a window cut to the stations and their tags (Ft, inside F), so the stations draw
   larger. The window is CSS (--hs-cl/-cr/-ct/-cb: the crop of each side as a share of F), so the tags, placed in
   percent of F, stay on their parts. The sides keep 2 % of F as margin, so the end stations clear the screen edge. */
function hsCrop(F,Ft,draw){var x0=-F.org[0],y0=-F.org[1],x1=-Ft.org[0],y1=-Ft.org[1],c=function(v){return Math.max(0,v).toFixed(4)};
 var cl=c((x1-x0)/F.W-0.02),cr=c((x0+F.W-x1-Ft.W)/F.W-0.02),ct=c((y1-y0)/F.H),cb=c((y0+F.H-y1-Ft.H)/F.H);
 return '<div class="aq-hero-scene__clip" style="--hs-cl:'+cl+';--hs-cr:'+cr+';--hs-ct:'+ct+';--hs-cb:'+cb+';--hs-ar:'+(F.H/F.W).toFixed(4)+'">'+draw+'</div>'}

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
 /* ind-pharma and any other: a make-up tank in PP, flat-topped on its plinth, with its agitator drive (round C: was a
    dished kettle on legs, which read as stainless) */
 var v=hsPart('use',x,y,0,G,K,function(b){var top=hsPPTank(b,0,0,0,12,22);
  b.cyl(0,0,top,'z',7,3.4);b.cyl(5,-3,top,'z',4,1.4);b.port.top=[0,0,top+8];b.port.in=[5,-3,top+4]});return {svg:v,inn:v.ports.in,top:v.ports.top}}
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

/* ---------- round C: shared pieces ---------- */
/* A flat-top PP tank standing on a plinth: plinth slab, flat-bottomed shell with two reinforcing bands, flat top with a
   manway stub and a vent. Returns the height of its top. (Never a dished vessel on legs: that reads as stainless.) */
function hsPPTank(b,u,v,w,r,h){b.bx(u,v,w,2*r+6,2*r+6,4,ISO_K.alt);var z=w+4;b.vessel(u,v,z,r,h,0,0);
 b.band(u,v,z+h*0.34,'z',r);b.band(u,v,z+h*0.68,'z',r);b.cyl(u-r*0.3,v-r*0.25,z+h,'z',2.4,r*0.32);b.cyl(u+r*0.45,v+r*0.2,z+h,'z',4,1.1);return z+h}
/* The block with anchor `from` and its row names: a table row's first cell (or its {t}), a grid item's t; a name is
   cut before a ", [placeholder]" tail ("Head office, [head office, city and province]" -> "Head office"). */
function hsFrom(p,from){var bi=-1,blk=(p.blocks||[]).filter(function(b,i){if(b.anchor===from){bi=i;return true}return false})[0];if(!blk)return null;
 var names=(blk.rows||blk.items||[]).map(function(r){var c=Array.isArray(r)?r[0]:r;var t=c&&typeof c==='object'?String(c.t==null?'':c.t):String(c==null?'':c),i=t.indexOf(', [');return i>0?t.slice(0,i):t});
 return {blk:blk,bi:bi,names:names,more:blk.h?{t:blk.h,jump:jid(blk,bi)}:null}}
/* The scene's stations by key: f.at gives each row of the block its station (in row order; "" for none). Returns the
   key items {t, n: the row number} and, by station, its key index (1, 2 … in key order). */
function hsKeyed(src,at){var it=[],by={};(at||[]).forEach(function(a,i){if(a&&src.names[i]!=null&&!by[a]){it.push({t:src.names[i],n:i+1});by[a]=it.length}});return {it:it,by:by}}

/* ---------- shop-bay (about, careers) ---------- */
/* The shop floor: the package on its test stand in the middle, hosed to a PP test tank, and round it the stations
   where the work is done: a drafting desk, a panel bench and a joining bench (method neutral, FD-18: two PP pipe
   lengths butted on cradles, one plain girth line and a stencilled tag; no heater plate, bead or machine) always
   stand; the binder table and the service van stand only where a row keys them. Key = the rows of the block "from"
   (careers: roles; about: people), f.at naming each row's station: "desk", "panel", "joint", "stand", "table", "van". */
var HS_BAY={desk:[40,40],panel:[218,34],joint:[38,150],table:[126,180],van:[198,142],stand:[124,92]};
function hsBayStation(kind,x,y,k){var K='k'+k,G=1.3;
 if(kind==='desk')return hsStation('svc-design',x,y,k);
 if(kind==='table')return hsStation('svc-cq',x,y,k);
 if(kind==='van')return isoPart('truck',x-34,y-10,0,0.56*G,{id:K,load:false});
 if(kind==='panel')return hsPart('station',x,y,0,0.9*G,K,function(b){/* a bench with a control cabinet standing on it, a cable coil beside */
  hsTable(b,40,20,20);var s=0.9*G,b2=isoB(x-10*s,y,20*s,0.5*G,0);ISO_PARTS.panel(b2,{});b.add(hsSub(b2,'panel'));
  b.cyl(10,2,20,'z',1.6,4.2);b.ring(10,2,21.6,'z',2.6);b.port.top=[-10,0,50]});
 if(kind==='joint')return hsPart('station',x,y,0,0.9*G,K,function(b){
  hsTable(b,46,18,20);[-15,15].forEach(function(u){b.bx(u,0,20,4,10,3.2)});
  b.cyl(-22,0,26.6,'x',21.6,3.4);b.cyl(0.4,0,26.6,'x',21.6,3.4);b.ring(0.2,0,26.6,'x',3.5,ISO_K.ln);
  b.line([3,2.6,23.6],[4,4.2,19.4],ISO_K.th);b.poly([[1.6,4.4,19.6],[7.6,4.4,19.6],[7.6,4.4,15.4],[1.6,4.4,15.4]],ISO_K.eq);b.port.top=[0,0,36]});
 return ''}
function hsBayStand(cx,cy,k){var K='k'+k,W=100,D=56,Z=12,o='';
 /* the test stand: box-section posts under a frame, the skid on it, on the skid the membrane rack, a PP tank, the panel */
 o+=hsPart('stand',cx,cy,0,1,K,function(b){[[-W/2+3,-D/2+3],[W/2-3,-D/2+3],[-W/2+3,D/2-3],[W/2-3,D/2-3]].forEach(function(q){b.bx(q[0],q[1],0,4,4,Z-3)});
  b.box(-W/2,-D/2,Z-3,W,D,3);b.port.top=[0,0,Z+62]});
 o+=isoPart('skid',cx-W/2+2,cy-D/2+2,Z,1,{w:W-4,d:D-4,id:K})+isoPart('ro',cx-W/2+6,cy-D/2+6,Z+9,0.4,{id:K})+isoPart('panel',cx+30,cy-14,Z+9,0.5,{id:K});
 o+=hsPart('tank',cx+18,cy+12,Z+9,1,K,function(b){hsPPTank(b,0,0,0,10,22)});
 return o}
function wHeroBay(p,f){var src=hsFrom(p,f.from);if(!src)return '';var K=hsKeyed(src,f.at);if(K.it.length<2)return '';
 var X=250,Y=200,body='',tags='',pts=[[0,0,-5],[X,0,-5],[0,Y,-5],[X,Y,-5]],c=HS_BAY.stand,list=[];
 body+='<g class="aq-hero-scene__shell"><path class="aq-iso__eq aq-iso__eq--alt aq-hero-scene__floor" d="'+isoBoxD([0,0,-5],X,Y,5)+'"/>'+
  '<path class="aq-iso__hid aq-hero-scene__bay" d="'+isoPoly([[c[0]-60,c[1]-74,0.2],[c[0]+62,c[1]-74,0.2],[c[0]+62,c[1]+40,0.2],[c[0]-60,c[1]+40,0.2]],true)+'"/></g>';
 /* the PP test tank behind the stand, hosed to the skid: the water runs out to the package */
 var tx=c[0]-22,ty=c[1]-60,ks='k'+(K.by.stand||0),tk=hsPart('test',tx,ty,0,1,ks,function(b){hsPPTank(b,0,0,0,12,26)});
 var hose=isoPipe([[tx+13,ty,10],[tx+30,ty,10],[tx+30,c[1]-26,10],[tx+30,c[1]-26,24]],{r:1.8,flanges:'ends',caps:false,to:ks});
 ['desk','panel','joint','table','van'].forEach(function(kind){if((kind==='table'||kind==='van')&&!K.by[kind])return;var q=HS_BAY[kind];list.push({kind:kind,x:q[0],y:q[1],k:K.by[kind]||0})});
 list.push({kind:'stand',x:c[0],y:c[1],k:K.by.stand||0,stand:true});
 list.sort(function(a,b){return (a.x+a.y)-(b.x+b.y)});
 body+=list.map(function(s){if(s.stand){s.top=[s.x,s.y,74];return tk+hose+hsBayStand(s.x,s.y,s.k)}
  var g=hsBayStation(s.kind,s.x,s.y,s.k);s.top=g&&g.ports&&g.ports.top?g.ports.top:[s.x,s.y,50];return String(g)}).join('');
 list.forEach(function(s){pts.push([s.top[0],s.top[1],s.top[2]+26])});pts.push([c[0]-22,c[1]-60,40]);var F=hsFrame(pts,6);
 list.forEach(function(s){if(s.k)tags+=hsTag(s.k,[s.top[0],s.top[1],s.top[2]+6],F,'',K.it[s.k-1].n)});
 return hsWrap('bay',hsDraw(F,body,tags),hsKey(K.it,{more:src.more,cols:K.it.length===3?3:2}))}

/* ---------- site-map (contact-locations) ---------- */
/* The sites on a limestone contour sheet: the office and the shop and test bay at the centre (the base), dashed travel
   rings round them, the service van out on the outer ring and the parts crates. Key = the rows of the block "from"
   (locations), f.at naming each row's site: "office", "shop", "van", "crates". */
function wHeroSiteMap(p,f){var src=hsFrom(p,f.from);if(!src)return '';var K=hsKeyed(src,f.at);if(K.it.length<2)return '';
 var X=250,Y=184,cx=124,cy=92,body='',tags='',S=[];
 var blob=function(c,R,ph){var q=[];for(var i=0;i<40;i++){var a=i/40*2*Math.PI,r=R*(1+0.12*Math.sin(3*a+ph)+0.06*Math.cos(5*a+2*ph));q.push([c[0]+r*Math.cos(a),c[1]+r*0.78*Math.sin(a),0.1])}return isoPoly(q,true)};
 body+='<g class="aq-hero-scene__shell"><path class="aq-iso__eq aq-hero-scene__sheet" d="'+isoBoxD([0,0,-3],X,Y,3)+'"/>'+
  '<path class="aq-iso__thin aq-hero-scene__contour" d="'+blob([212,40],9,0.3)+blob([212,40],18,0.8)+blob([212,40],27,1.2)+blob([30,150],8,2.1)+blob([30,150],16,2.5)+'"/>'+
  '<path class="aq-iso__hid aq-hero-scene__ring" d="'+isoRingD([cx,cy,0.2],'z',46)+isoRingD([cx,cy,0.2],'z',82)+'"/></g>';
 var kk=function(n){return 'k'+(K.by[n]||0)};
 /* the office; the shop with its loading door, a skid on the apron of its test bay */
 var of=isoPart('building',cx-52,cy-38,0,1,{w:40,d:28,h:24,id:kk('office')});S.push({k:K.by.office,top:[cx-32,cy-24,40]});
 var sh=isoPart('building',cx-4,cy-18,0,1,{w:50,d:36,h:28,id:kk('shop')})+isoPart('skid',cx+52,cy-8,0,0.5,{w:52,d:32,id:kk('shop')})+isoPart('module',cx+65,cy,4.5,0.4,{w:40,d:34,h:44,id:kk('shop')});S.push({k:K.by.shop,top:[cx+21,cy,46]});
 /* the service van out on the outer ring */
 var va=Math.PI*0.22,vx=cx+82*Math.cos(va),vy=cy+82*Math.sin(va),van=isoPart('truck',vx-30,vy-8,0,0.66,{id:kk('van'),load:false});S.push({k:K.by.van,top:[vx+6,vy+1,30]});
 /* parts stock: crates on a pallet */
 var px=cx-84,py=cy+50,cr=hsPart('crates',px,py,0,1,kk('crates'),function(b){b.box(-18,-10,0,38,22,2.4,ISO_K.alt);b.box(-17,-9,2.4,17,20,13);b.box(1,-9,2.4,17,20,13);b.box(-12,-6,15.4,17,16,11);
  b.line([-17,11,2.4],[0,11,15.4],ISO_K.th);b.line([1,11,2.4],[18,11,15.4],ISO_K.th);b.line([-12,10,15.4],[5,10,26.4],ISO_K.th);b.port.top=[-3,0,30]});S.push({k:K.by.crates,top:[px-3,py,32]});
 body+=[of,sh,cr,van].join('');
 var pts=[[0,0,-3],[X,0,-3],[0,Y,-3],[X,Y,-3]];S.forEach(function(s){pts.push([s.top[0],s.top[1],s.top[2]+24])});var F=hsFrame(pts,6);
 S.forEach(function(s){if(s.k)tags+=hsTag(s.k,[s.top[0],s.top[1],s.top[2]+4],F,'',K.it[s.k-1].n)});
 return hsWrap('map',hsDraw(F,body,tags),hsKey(K.it,{more:src.more,cols:2}))}

/* ---------- reply-flow (contact-proposal) ---------- */
/* Paper in, paper out: the URS sheets and the tender form travel to the engineer's desk, and a stamped reply leaves it.
   Key = f.keys, each a cell of the block "from" (requests) as it stands; tags in key order. */
function wHeroReply(p,f){var src=hsFrom(p,f.from);if(!src)return '';var cells=[];(src.blk.rows||[]).forEach(function(r){(r||[]).forEach(function(c){cells.push(c&&typeof c==='object'?String(c.t||''):String(c==null?'':c))})});
 var it=(f.keys||[]).filter(function(t){return cells.indexOf(t)>=0}).slice(0,3).map(function(t){return {t:t}});if(it.length<3)return '';
 var X=216,Y=104,G=1.45,body='',tags='';
 body+='<g class="aq-hero-scene__shell"><path class="aq-iso__eq aq-iso__eq--alt aq-hero-scene__floor" d="'+isoBoxD([0,0,-4],X,Y,4)+'"/></g>';
 /* 01 the URS: a stack of ruled sheets; 02 the tender form: a clipboard with its form */
 var urs=hsPart('urs',28,26,0,G*0.9,'k1',function(b){for(var i=0;i<4;i++)b.box(-13+i*0.5,-17-i*0.4,i*1.1,26,34,1.1,i===3?ISO_K.eq+' aq-iso__eq--sheet':ISO_K.eq);
  var d='';for(var j=0;j<6;j++)d+=isoPoly([b.p(-9.5,-12+j*4.6,4.5),b.p(j%2?6:9,-12+j*4.6,4.5)]);b.add(isoPath(d,ISO_K.th));b.port.top=[0,0,8]});
 var tdr=isoPart('clipboard',30,78,0,G,{id:'k2',ticks:0});
 /* the engineer's desk; 03 the reply out of it, the stamp beside its imprint */
 var desk=isoPart('desk',112,52,0,G,{id:'k0'});
 var rep=hsPart('reply',186,52,0,G*0.9,'k3',function(b){b.box(-13,-17,0,26,34,1.1,ISO_K.eq+' aq-iso__eq--sheet');var d='';for(var j=0;j<4;j++)d+=isoPoly([b.p(-9.5,-12+j*4.6,1.2),b.p(j%2?4:8,-12+j*4.6,1.2)]);b.add(isoPath(d,ISO_K.th));
  var q=b.p(4,8,1.2),b2=isoB(q[0],q[1],q[2],0.9*G,0);ISO_PARTS.stamp(b2,{});b.add(hsSub(b2,'stamp'));b.port.top=[0,0,20]});
 /* the way the paper goes: dashed, an arrow into the desk from each side and one out of it */
 var R=isoPoly([[46,26,0.2],[76,26,0.2],[76,42,0.2],[86,42,0.2]])+isoPoly([[50,78,0.2],[76,78,0.2],[76,62,0.2],[86,62,0.2]])+isoPoly([[140,52,0.2],[160,52,0.2]]);
 body+=urs+tdr+'<path class="aq-iso__hid aq-hero-scene__route" d="'+R+'"/>'+isoArrow([86,42,0.2],'x',{size:5,cls:'aq-hero-scene__arrow'})+isoArrow([86,62,0.2],'x',{size:5,cls:'aq-hero-scene__arrow'})+isoArrow([160,52,0.2],'x',{size:5,cls:'aq-hero-scene__arrow'})+desk+rep;
 var F=hsFrame([[0,0,-4],[X,0,-4],[0,Y,-4],[X,Y,-4],[28,26,30],[112,52,80],[186,52,44]],6);
 tags=hsTag(1,[28,26,16],F)+hsTag(2,[30,78,12],F)+hsTag(3,[186,52,30],F);
 return hsWrap('reply',hsDraw(F,body,tags),hsKey(it,{more:src.more,cols:3}))}

/* ---------- compliance-matrix (compliance, concept 234) ---------- */
/* A ruled compliance matrix: f.cols (five heads: the clause, the three answers, the proof), rows numbered 01-04 whose
   clause, answer and proof come from f.rows ([{c: clause, t: answer column 1-3, d: proof}], up to six; the older
   f.cells (one clause and one proof for every row) with f.ticks still works), one flow tick per row in its answer column; and, tucked under its lower-right corner, a small PP package: a flat-top PP tank on
   its plinth piped with bead-ringed PP pipe to a generation module, the water leaving to the loop. Decoration
   (aria-hidden): the headline and lead carry the meaning. */
function wHeroMatrix(p,f){var cols=(f.cols||[]).slice(0,5),cell=f.cells||[],R=(f.rows&&f.rows.length?f.rows:(f.ticks||[1,1,2,1]).map(function(t){return {c:cell[0],t:t,d:cell[1]}})).slice(0,6);if(cols.length<5)return '';
 var tick='<svg class="aq-hero-scene__tick" viewBox="0 0 16 16" width="16" height="16" focusable="false"><path d="M3,8.5 L6.5,12 L13,4.5"/></svg>';
 var head=cols.map(function(c,i){return '<span class="aq-hero-scene__mx-th'+(i>0&&i<4?' is-mark':'')+'">'+tx(c)+'</span>'}).join('');
 var rows=R.map(function(x,r){var t=+x.t||1,o='<span class="aq-hero-scene__mx-c" data-r="'+(r+1)+'"><b>'+hsN(r+1)+'</b>'+tx(x.c||'')+'</span>';
  for(var j=1;j<4;j++)o+='<span class="aq-hero-scene__mx-m'+(j===t?' is-on':'')+'" data-r="'+(r+1)+'">'+(j===t?tick:'')+'</span>';
  return o+'<span class="aq-hero-scene__mx-d" data-r="'+(r+1)+'">'+tx(x.d||'')+'</span>'}).join('');
 var body='<path class="aq-iso__eq aq-iso__eq--alt aq-hero-scene__floor" d="'+isoBoxD([0,0,-4],112,52,4)+'"/>';
 var tank=hsPart('tank',24,26,0,1,'k1',function(b){hsPPTank(b,0,0,0,12,30)});
 var mod=isoPart('module',76,26,0,0.62,{w:40,d:36,h:52,id:'k1'});
 var pipe=isoPipe([[36.5,26,10],[63.6,26,10]],{r:2,flanges:'all',caps:false,to:'k1'})+isoPipe([[76,14.8,26],[76,4,26],[76,4,44],[104,4,44]],{r:2,flanges:'all',caps:'end',bend:5});
 body+=tank+pipe+mod+isoArrow([106,4,44],'x',{size:4.5});
 var F=hsFrame([[0,0,-4],[112,0,-4],[0,52,-4],[112,52,-4],[0,0,50],[112,0,52],[24,26,40]],4);
 var svg='<div class="aq-hero-scene__draw" style="--hs-r:'+F.W+' / '+F.H+'">'+isoSvg(F.W,F.H,body,'aq-hero-scene__svg',{origin:F.org})+'</div>';
 return '<figure class="aq-hero-scene aq-hero-scene--matrix" aria-hidden="true"><div class="aq-hero-scene__mx">'+(f.title?'<p class="aq-hero-scene__mx-h">'+tx(f.title)+'</p>':'')+
  '<div class="aq-hero-scene__mx-grid">'+head+rows+'</div></div><div class="aq-hero-scene__inset">'+svg+'</div></figure>'}

/* The hero's scene for this page, or '' (unknown look, too few rows: the hero falls back to its other figure) */
function wHeroScene(p){var f=p.figure||{},L=f.look;
 if(L==='module-lineup'||L==='service-ring'){var idx=heroBigIndex(p)||heroIndex(p);if(!idx)return '';return L==='module-lineup'?wHeroLineup(p,idx):wHeroRing(p,idx)}
 if(L==='site-room')return wHeroRoom(p,f);
 if(L==='use-fan')return wHeroFan(p,f);
 if(L==='shop-bay')return wHeroBay(p,f);
 if(L==='site-map')return wHeroSiteMap(p,f);
 if(L==='reply-flow')return wHeroReply(p,f);
 if(L==='compliance-matrix')return wHeroMatrix(p,f);
 return ''}
