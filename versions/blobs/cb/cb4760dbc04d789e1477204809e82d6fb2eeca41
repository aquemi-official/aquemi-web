/* IsoKit: the shared isometric line-drawing kit (README: design-system/components/IsoKit/README.md). Every look that
   draws equipment, pipes, water or drawing-sheet furniture builds it here, so all sections read as one hand.
   World axes: x runs to the lower right, y to the lower left, z up; 30° isometric, 1 world unit = 1 user unit along an
   axis. Parts are drawn back to front from solid primitives (boxes, cylinders on any axis, domed shells) filled with the
   ground colour, so whatever stands in front hides what is behind, like a hidden-line drawing.
   isoP(x,y,z) -> [sx,sy]; isoSvg(w,h,inner,cls,o); isoPart(kind,x,y,z,scale,o); isoPipe(pts,o); isoArrow(p,dir,o);
   isoDim(a,b,o); isoLeader(p,to,o); isoSheet(w,h,o). Parts, pipes, dims and leaders return string-like objects
   (concatenate them as strings) that also carry 3D ports and 2D anchor points. window.ISO has the same API. */
var ISO_C=Math.cos(Math.PI/6),ISO_S=0.5,ISO_RX=Math.SQRT2*ISO_C,ISO_RY=Math.SQRT2*ISO_S,isoUid=0;
function isoP(x,y,z){if(x&&x.length)return isoP(x[0],x[1],x[2]);return [(x-y)*ISO_C,(x+y)*ISO_S-(z||0)]}
function isoF(n){n=Math.round(n*10)/10;return n===0?'0':String(n)}
function isoT(p){return isoF(p[0])+' '+isoF(p[1])}
function isoR(svg,extra){var o={svg:svg};for(var k in extra)o[k]=extra[k];o.toString=o.valueOf=function(){return svg};return o}
var isoV={
 add:function(a,b){return [a[0]+b[0],a[1]+b[1],a[2]+b[2]]},sub:function(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]},
 mul:function(a,k){return [a[0]*k,a[1]*k,a[2]*k]},dot:function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]},
 len:function(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])},nrm:function(a){var l=isoV.len(a)||1;return [a[0]/l,a[1]/l,a[2]/l]},
 crs:function(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]},
 /* two unit vectors square to d (for rings round a pipe or a nozzle) */
 perp:function(d){d=isoV.nrm(d);var u=Math.abs(d[2])>0.9?[1,0,0]:[0,0,1],a=isoV.nrm(isoV.crs(u,d));return [a,isoV.crs(d,a)]}};
var ISO_AX={x:[1,0,0],y:[0,1,0],z:[0,0,1],'-x':[-1,0,0],'-y':[0,-1,0],'-z':[0,0,-1]};
function isoAx(a){return typeof a==='string'?ISO_AX[a]:a}
/* Primitives, all in world coordinates; each returns path data or an element string */
function isoPath(d,cls,x){return '<path class="'+cls+'" d="'+d+'"'+(x||'')+'/>'}
function isoPoly(pts,close){return pts.map(function(p,i){return (i?'L':'M')+isoT(isoP(p))}).join('')+(close?'Z':'')}
/* elliptical arc c + A cos t + B sin t (2D vectors) from t0 to t1 as cubic segments; exact affine image of a circle arc */
function isoArc(c,A,B,t0,t1,move){var n=Math.max(1,Math.ceil(Math.abs(t1-t0)/(Math.PI/2)-1e-9)),dt=(t1-t0)/n,k=4/3*Math.tan(dt/4),d='';
 function Q(t){return [c[0]+A[0]*Math.cos(t)+B[0]*Math.sin(t),c[1]+A[1]*Math.cos(t)+B[1]*Math.sin(t)]}
 function D(t){return [-A[0]*Math.sin(t)+B[0]*Math.cos(t),-A[1]*Math.sin(t)+B[1]*Math.cos(t)]}
 if(move!==false)d='M'+isoT(Q(t0));
 for(var i=0;i<n;i++){var a=t0+i*dt,b=a+dt,qa=Q(a),qb=Q(b),da=D(a),db=D(b);
  d+='C'+isoT([qa[0]+k*da[0],qa[1]+k*da[1]])+' '+isoT([qb[0]-k*db[0],qb[1]-k*db[1]])+' '+isoT(qb)}
 return d}
/* circle of radius r round 3D centre c, square to axis ax: full ellipse path data */
function isoRingD(c,ax,r){var pp=isoV.perp(isoAx(ax));return isoArc(isoP(c),isoP(isoV.mul(pp[0],r)),isoP(isoV.mul(pp[1],r)),0,Math.PI*2)+'Z'}
/* the half of that circle that faces the viewer (weld seams, bands and rims on a cylinder) */
function isoBandD(c,ax,r){ax=isoV.nrm(isoAx(ax));var pp=isoV.perp(ax),A=isoP(isoV.mul(pp[0],r)),B=isoP(isoV.mul(pp[1],r)),H=isoP(ax);
 var t1=Math.atan2(B[0]*H[1]-B[1]*H[0],A[0]*H[1]-A[1]*H[0]),tm=t1+Math.PI/2;
 var mid=isoV.add(isoV.mul(pp[0],Math.cos(tm)),isoV.mul(pp[1],Math.sin(tm))),dir=isoV.dot(mid,[1,1,1])>0?1:-1;
 if(Math.abs(H[0])+Math.abs(H[1])<1e-6)return isoRingD(c,ax,r);
 return isoArc(isoP(c),A,B,t1,t1+dir*Math.PI)}
/* solid cylinder from c0 along ax for length L, radius r: body outline then the cap that faces the viewer */
function isoCylD(c0,ax,L,r){ax=isoV.nrm(isoAx(ax));var h=isoV.mul(ax,L),c1=isoV.add(c0,h),near=isoV.dot(ax,[1,1,1])>0;
 var N=near?c1:c0,F=near?c0:c1,pp=isoV.perp(ax),A=isoP(isoV.mul(pp[0],r)),B=isoP(isoV.mul(pp[1],r)),H=isoP(isoV.sub(N,F));
 var nf=isoP(N),ff=isoP(F),cap=isoArc(nf,A,B,0,Math.PI*2)+'Z';
 if(Math.abs(H[0])+Math.abs(H[1])<1e-6)return [cap,''];
 var t1=Math.atan2(B[0]*H[1]-B[1]*H[0],A[0]*H[1]-A[1]*H[0]),tm=t1+Math.PI/2,M=[A[0]*Math.cos(tm)+B[0]*Math.sin(tm),A[1]*Math.cos(tm)+B[1]*Math.sin(tm)];
 var dir=(M[0]*H[0]+M[1]*H[1])<0?1:-1,t2=t1+dir*Math.PI;
 var body=isoArc(ff,A,B,t1,t2)+'L'+isoT([nf[0]+A[0]*Math.cos(t2)+B[0]*Math.sin(t2),nf[1]+A[1]*Math.cos(t2)+B[1]*Math.sin(t2)])+isoArc(nf,A,B,t2,t1+dir*2*Math.PI,false)+'Z';
 return [body,cap]}
/* axis-aligned box from min corner o, sizes w (x), d (y), h (z): its three visible faces */
function isoBoxD(o,w,d,h){var x=o[0],y=o[1],z=o[2],X=x+w,Y=y+d,Z=z+h;
 return isoPoly([[x,y,Z],[X,y,Z],[X,Y,Z],[x,Y,Z]],1)+isoPoly([[X,y,z],[X,Y,z],[X,Y,Z],[X,y,Z]],1)+isoPoly([[x,Y,z],[X,Y,z],[X,Y,Z],[x,Y,Z]],1)}

/* Part builder: local units times scale, optional quarter turns about z (o.rot) */
var ISO_K={eq:'aq-iso__eq',alt:'aq-iso__eq aq-iso__eq--alt',glass:'aq-iso__eq aq-iso__eq--glass',ln:'aq-iso__ln',th:'aq-iso__thin',hid:'aq-iso__hid',acc:'aq-iso__acc'};
function isoB(x,y,z,s,rot){var out=[],b={s:s};rot=((rot||0)%4+4)%4;
 function R(u,v){return rot===1?[-v,u]:rot===2?[-u,-v]:rot===3?[v,-u]:[u,v]}
 b.p=function(u,v,w){var r=R(u,v);return [x+r[0]*s,y+r[1]*s,z+w*s]};
 b.ax=function(a){a=isoAx(a);var r=R(a[0],a[1]);return [r[0],r[1],a[2]]};
 b.add=function(t){out.push(t);return b};
 b.box=function(u,v,w,W,D,H,cls){var a=b.p(u,v,w),c=b.p(u+W,v+D,w+H);
  return b.add(isoPath(isoBoxD([Math.min(a[0],c[0]),Math.min(a[1],c[1]),a[2]],Math.abs(c[0]-a[0]),Math.abs(c[1]-a[1]),c[2]-a[2]),cls||ISO_K.eq))};
 b.bx=function(u,v,w,W,D,H,cls){return b.box(u-W/2,v-D/2,w,W,D,H,cls)};
 b.cyl=function(u,v,w,ax,L,r,cls){var c=isoCylD(b.p(u,v,w),b.ax(ax),L*s,r*s);return b.add(isoPath(c[0]+c[1],cls||ISO_K.eq))};
 /* nozzle with a flange at its free end */
 b.noz=function(u,v,w,ax,L,r,cls){var a=isoAx(ax),e=isoV.mul(a,L);b.cyl(u,v,w,ax,L,r,cls);
  var fl=Math.max(0.9,r*0.32),q=[u+e[0]-(a[0]*fl),v+e[1]-(a[1]*fl),w+e[2]-(a[2]*fl)];
  return b.cyl(q[0],q[1],q[2],ax,fl,r*1.55,cls)};
 b.ring=function(u,v,w,ax,r,cls){return b.add(isoPath(isoRingD(b.p(u,v,w),b.ax(ax),r*s),cls||ISO_K.th))};
 b.band=function(u,v,w,ax,r,cls){return b.add(isoPath(isoBandD(b.p(u,v,w),b.ax(ax),r*s),cls||ISO_K.th))};
 b.line=function(a,c,cls){return b.add(isoPath(isoPoly([b.p(a[0],a[1],a[2]),b.p(c[0],c[1],c[2])]),cls||ISO_K.ln))};
 b.poly=function(pts,cls,open){return b.add(isoPath(isoPoly(pts.map(function(q){return b.p(q[0],q[1],q[2])}),!open),cls||ISO_K.eq))};
 /* vertical vessel: shell radius r, straight height h from w, domed heads of height kt / kb (0 = flat) */
 b.vessel=function(u,v,w,r,h,kt,kb,cls){var c=isoP(b.p(u,v,w)),R2=r*s,rx=ISO_RX*R2,ry=ISO_RY*R2,top=c[1]-h*s,bot=c[1];
  var rt=kt?Math.sqrt(ry*ry+kt*kt*s*s):ry,rb=kb?Math.sqrt(ry*ry+kb*kb*s*s):ry,L=isoF(c[0]-rx),Rr=isoF(c[0]+rx);
  var d='M'+L+' '+isoF(top)+'A'+isoF(rx)+' '+isoF(rt)+' 0 0 1 '+Rr+' '+isoF(top)+'L'+Rr+' '+isoF(bot)+'A'+isoF(rx)+' '+isoF(rb)+' 0 0 1 '+L+' '+isoF(bot)+'Z';
  b.add(isoPath(d,cls||ISO_K.eq));
  if(kt)b.add(isoPath('M'+L+' '+isoF(top)+'A'+isoF(rx)+' '+isoF(ry)+' 0 0 0 '+Rr+' '+isoF(top),ISO_K.th));
  else b.add(isoPath('M'+L+' '+isoF(top)+'A'+isoF(rx)+' '+isoF(ry)+' 0 0 0 '+Rr+' '+isoF(top)+'A'+isoF(rx)+' '+isoF(ry)+' 0 0 0 '+L+' '+isoF(top)+'Z',cls||ISO_K.eq));
  if(kb)b.add(isoPath('M'+L+' '+isoF(bot)+'A'+isoF(rx)+' '+isoF(ry)+' 0 0 0 '+Rr+' '+isoF(bot),ISO_K.th));
  return b};
 /* height of a dome of radius r and height k at distance q from the axis */
 b.dome=function(r,k,q){return k*Math.sqrt(Math.max(0,1-(q*q)/(r*r)))};
 /* leg with a foot pad, from the floor (w) up to top */
 b.leg=function(u,v,w,top,t){t=t||2.2;b.bx(u,v,w,t*2.2,t*2.2,0.9);return b.bx(u,v,w+0.9,t,t,top-w-0.9)};
 /* flat rectangle on a face: plane 'y' (front, at v), 'x' (side, at u) or 'z' (top, at w) */
 b.rect=function(pl,a0,b0,a1,b1,at,cls){var q=pl==='y'?[[a0,at,b0],[a1,at,b0],[a1,at,b1],[a0,at,b1]]:pl==='x'?[[at,a0,b0],[at,a1,b0],[at,a1,b1],[at,a0,b1]]:[[a0,b0,at],[a1,b0,at],[a1,b1,at],[a0,b1,at]];return b.poly(q,cls||ISO_K.th)};
 b.port={};b.done=function(kind,o){var id=o.id?' data-iso-id="'+o.id+'"':'',cl='aq-iso__part'+(o.cls?' '+o.cls:'');
  var ports={};for(var k in b.port)ports[k]=b.p(b.port[k][0],b.port[k][1],b.port[k][2]);
  return isoR('<g class="'+cl+'" data-iso="'+kind+'"'+id+'>'+out.join('')+'</g>',{ports:ports,at:ports.top?isoP(ports.top):isoP(x,y,z)})};
 return b}

/* Dial face on a plane (normal ax), centre c local, radius r, needle at value 0..1 */
function isoDial(b,u,v,w,ax,r,val){var a=b.ax(ax),pp=isoV.perp(a),c=b.p(u,v,w),i,d='',s=b.s;
 /* face plane basis: keep "up" as z when the face is vertical */
 var e1=Math.abs(a[2])>0.9?pp[0]:isoV.nrm(isoV.crs(a,[0,0,1])),e2=Math.abs(a[2])>0.9?pp[1]:[0,0,1];
 function at(t,k){return isoP(isoV.add(c,isoV.add(isoV.mul(e1,Math.cos(t)*k*r*s),isoV.mul(e2,Math.sin(t)*k*r*s))))}
 for(i=0;i<=10;i++){var t=Math.PI*(1.25-1.5*i/10);d+='M'+isoT(at(t,i%5?0.74:0.64))+'L'+isoT(at(t,0.84))}
 b.add(isoPath(d,ISO_K.th));
 var tv=Math.PI*(1.25-1.5*(val==null?0.62:val));b.add(isoPath('M'+isoT(at(tv+Math.PI,0.12))+'L'+isoT(at(tv,0.7)),ISO_K.ln+' aq-iso__needle'));
 return b}

var ISO_PARTS={
 /* storage tank: domed vertical vessel on four legs, manway, vent, inlet and return on top, outlet low, sight glass */
 tank:function(b,o){var r=20,h=56,z0=16,top=z0+h,kt=9;
  b.leg(-14,-14,0,z0+6);b.leg(14,-14,0,z0+6);b.leg(-14,14,0,z0+6);
  b.vessel(0,0,z0,r,h,kt,5);
  b.band(0,0,z0+h*0.5,'z',r);
  b.cyl(-7,-4,top+b.dome(r,kt,8)-1,'z',5,1.4);
  b.noz(3,4,top+b.dome(r,kt,5)-1.5,'z',5.5,5.2);
  b.noz(10,-3,top+b.dome(r,kt,10.4)-1,'z',6,2.4);b.port.in=[10,-3,top+b.dome(r,kt,10.4)+5];
  b.noz(-3,12,top+b.dome(r,kt,12.4)-1,'z',6,2.2);b.port.ret=[-3,12,top+b.dome(r,kt,12.4)+5];
  b.noz(r-1.5,0,z0+7,'x',9,2.6);b.port.out=[r+7.5,0,z0+7];
  b.cyl(r-1,5,z0+12,'x',3.6,0.7).cyl(r-1,5,top-10,'x',3.6,0.7);b.cyl(r+2.6,5,z0+10,'z',top-z0-18,1.1);
  b.leg(14,14,0,z0+6);b.port.top=[0,0,top+kt+4];b.port.base=[0,0,0]},
 /* media filter: slim domed vessel, multiport head with gauge, graded bed lines (hidden) */
 filter:function(b,o){var r=o.r||11,h=o.h||58,z0=10,top=z0+h,kt=7,bed=o.bed||[0.3,0.48];
  b.leg(-7,-7,0,z0+4,1.8);b.leg(7,-7,0,z0+4,1.8);b.leg(-7,7,0,z0+4,1.8);
  b.vessel(0,0,z0,r,h,kt,5);
  bed.forEach(function(f){b.band(0,0,z0+h*f,'z',r,ISO_K.hid)});
  b.band(0,0,top-6,'z',r);
  b.bx(0,0,top+kt-1.5,9,9,6);b.noz(-4.5,0,top+kt+1.5,'-x',6,2);b.noz(0,4.5,top+kt+1.5,'y',4,1.6);b.noz(4.5,0,top+kt+1.5,'x',6,2);
  b.cyl(1.5,2,top+kt+4.5,'z',2.5,0.6);b.cyl(1.5,1.5,top+kt+7,'y',1.4,2.6);isoDial(b,1.5,2.9,top+kt+7,'y',2.6,0.55);
  b.port.in=[-11.5,0,top+kt+1.5];b.port.out=[11.5,0,top+kt+1.5];
  b.noz(r*0.5,r*0.5,z0+3,'y',r*0.6,1.2);
  b.leg(7,7,0,z0+4,1.8);b.port.top=[0,0,top+kt+11];b.port.base=[0,0,0]},
 /* activated carbon vessel: wider, one bed line, side handhole and sample valve */
 carbon:function(b,o){var r=13,h=50,z0=10,top=z0+h,kt=8;
  b.leg(-8,-8,0,z0+4,2);b.leg(8,-8,0,z0+4,2);b.leg(-8,8,0,z0+4,2);
  b.vessel(0,0,z0,r,h,kt,5);
  b.band(0,0,z0+h*0.62,'z',r,ISO_K.hid);
  b.ring(r*0.62,r*0.62,z0+h*0.3,[1,1,0],3.6,ISO_K.th).ring(r*0.62,r*0.62,z0+h*0.3,[1,1,0],2.6,ISO_K.th);
  b.noz(0,0,top+kt-1,'z',4,4.5);
  b.noz(-6,-4,top+b.dome(r,kt,7.2)-1,'-x',8,2);b.port.in=[-14,-4,top+b.dome(r,kt,7.2)-1];
  b.noz(r-1,0,z0+6,'x',7,2);b.port.out=[r+6,0,z0+6];
  b.noz(0,r-1,z0+h*0.5,'y',3,0.9);b.bx(0,r+2.4,z0+h*0.5-0.9,1.6,1.6,1.8);b.line([0,r+2.4,z0+h*0.5+0.9],[0,r+2.4,z0+h*0.5+3.4]);
  b.leg(8,8,0,z0+4,2);b.port.top=[0,0,top+kt+5];b.port.base=[0,0,0]},
 /* water softener: twin resin vessels with control heads, brine tank behind */
 softener:function(b,o){var r=9,h=48,z0=8,top=z0+h,kt=6;
  b.vessel(34,-18,0,12,34,0,0);b.ring(34,-18,34,'z',6,ISO_K.th);b.band(34,-18,22,'z',12,ISO_K.hid);
  b.line([34,-6,26],[34,-6,30]);
  [-12,10].forEach(function(u,i){b.leg(u-5,-5,0,z0+3,1.6);b.leg(u+5,-5,0,z0+3,1.6);b.leg(u-5,5,0,z0+3,1.6);
   b.vessel(u,0,z0,r,h,kt,4);b.band(u,0,z0+h*0.35,'z',r,ISO_K.hid);
   b.bx(u,0,top+kt-1.5,8,8,5.5);b.bx(u,0,top+kt+4,5,5,2.2,ISO_K.alt);
   b.leg(u+5,5,0,z0+3,1.6)});
  b.noz(-16,0,top+kt+1.5,'-x',6,1.8);b.cyl(-8,0,top+kt+1.5,'x',14,1.5);b.noz(14,0,top+kt+1.5,'x',8,1.8);
  b.add(isoPath(isoPoly([b.p(12,-3,top+kt+1),b.p(30,-3,top+kt+1),b.p(30,-14,top+kt+1),b.p(30,-14,34)]),ISO_K.ln));b.bx(30,-14,34,2.4,2.4,1.2);
  b.port.in=[-22,0,top+kt+1.5];b.port.out=[22,0,top+kt+1.5];b.port.top=[0,0,top+kt+9];b.port.base=[0,0,0]},
 /* reverse osmosis rack: square-tube frame, four membrane housings with end headers, vertical multistage pump, panel */
 ro:function(b,o){var W=112,D=26,H=64,t=2.6,zs=[16,28,40,52],y0=13,pr=5.2;
  function frame(y){b.box(0,y,0,W,t,t);b.box(0,y,H-t,W,t,t);[0,W/2-t/2,W-t].forEach(function(u){b.box(u,y,t,t,t,H-2*t)})}
  frame(0);b.box(0,0,0,t,D,t);b.box(0,0,H-t,t,D,t);
  b.cyl(5,y0,10,'z',zs[3]-6,1.6);
  zs.forEach(function(z){b.cyl(5,y0,z,'x',2.5,1.2);b.cyl(7,y0,z,'x',W-16,pr);
   b.band(13,y0,z,'x',pr);b.band(W-15,y0,z,'x',pr);b.ring(W-9,y0,z,'x',pr*0.62);b.cyl(W-9,y0,z,'x',3,1.2)});
  b.cyl(W-6,y0,10,'z',zs[3]-6,1.6);b.noz(W-6,y0,zs[1]+6,'x',10,1.7);
  b.box(W/2-t/2,0,0,t,D,t);b.box(W-t,0,0,t,D,t);b.box(W-t,0,H-t,t,D,t);b.box(W/2-t/2,0,H-t,t,D,t);
  frame(D-t);
  b.box(W*0.62,D,24,20,4,26);b.rect('y',W*0.62+2.5,38,W*0.62+12.5,46.5,D+4,ISO_K.glass);
  [W*0.62+15.5,W*0.62+17.5].forEach(function(u){b.ring(u,D+4,44,'y',0.7)});b.line([W*0.62+16.5,D+4,27],[W*0.62+16.5,D+4,34]);
  var px=26,py=D+16;b.bx(px,py,0,14,14,2.2);b.cyl(px,py,2.2,'z',20,4.4);
  [7,11,15,19].forEach(function(z){b.band(px,py,2.2+z,'z',4.4)});
  b.cyl(px,py,22.2,'z',3,3);b.vessel(px,py,25,6.4,15,3,0,ISO_K.eq);for(var i=0;i<4;i++)b.band(px,py,28+i*3,'z',6.4);
  b.noz(px-4,py,6,'-x',6,1.8);b.noz(px+4,py,6,'x',5,1.8);
  b.add(isoPath(isoPoly([b.p(px+10,py,6),b.p(px+16,py,6),b.p(px+16,py,10),b.p(px+16,y0+2,10)]),ISO_K.ln));
  b.port.in=[px-10,py,6];b.port.out=[W+4,y0,zs[1]+6];b.port.top=[W/2,D/2,H+2];b.port.base=[W/2,D/2,0]},
 /* electrodeionization stack: end plates, cell pack, tie rods, DC terminal box */
 edi:function(b,o){var L=40,D=22,H=30,z0=4;
  b.box(-1,2,0,4,D-4,z0);b.box(L-3,2,0,4,D-4,z0);
  b.box(0,0,z0,4,D,H);
  b.box(4,1,z0+2,L-8,D-2,H-4);
  var d='';for(var u=6;u<L-4;u+=2.4){d+=isoPoly([b.p(u,D-1,z0+2),b.p(u,D-1,z0+H-2),b.p(u,1,z0+H-2)])}b.add(isoPath(d,ISO_K.th));
  b.box(L-4,0,z0,4,D,H);
  [[1.5,z0+H+1.6],[D-1.5,z0+H+1.6]].forEach(function(q){b.cyl(-3,q[0],q[1],'x',L+6,0.7);b.cyl(L,q[0],q[1],'x',1.4,1.4)});
  b.box(L/2-7,D/2-5,z0+H,14,10,6);b.cyl(L/2+3,D/2+5,z0+H+2.4,'y',2,1);b.cyl(L/2-3,D/2+5,z0+H+2.4,'y',2,1);
  b.noz(L,6,z0+8,'x',5,1.8);b.noz(L,16,z0+H-8,'x',5,1.8);b.noz(L,16,z0+8,'x',5,1.4);
  b.noz(0,D/2,z0+8,'-x',5,1.8);
  b.port.in=[-5,D/2,z0+8];b.port.out=[L+5,16,z0+H-8];b.port.top=[L/2,D/2,z0+H+10];b.port.base=[L/2,D/2,0]},
 /* UV unit: horizontal chamber on saddles, lamp end cap, risers with flanges, intensity sensor */
 uv:function(b,o){var L=60,z=18,r=6.5;
  [10,L-10].forEach(function(u){b.bx(u,0,0,10,12,1.6);b.bx(u,0,1.6,3,8,z-r-1.6+1)});
  b.noz(9,0,z+r-1,'z',7,2.2);b.noz(L-9,0,z+r-1,'z',7,2.2);
  b.cyl(0,0,z,'x',L,r);b.band(6,0,z,'x',r);b.band(L-6,0,z,'x',r);
  b.cyl(L*0.5,r-1,z,'y',3,1.2);b.bx(L*0.5,r+3,z-2.5,4,2.4,5);
  b.cyl(L,0,z,'x',5,4.4);b.ring(L+5,0,z,'x',2.6);b.cyl(L+5,0,z,'x',2.4,1);
  b.port.in=[9,0,z+r+6];b.port.out=[L-9,0,z+r+6];b.port.top=[L/2,0,z+r+12];b.port.base=[L/2,0,0]},
 /* plate heat exchanger: support column, carrying bar, pressure plate, plate pack, fixed frame plate with four ports */
 hx:function(b,o){var D=24,H=46;
  b.box(0,D/2-3,0,4,6,H+4);b.box(0,D/2-2,H,46,4,3);b.box(0,D/2-2,6,46,4,2);
  b.box(14,0,4,4,D,H-6);
  b.box(18,1,6,22,D-2,H-10);
  var d='';for(var u=20;u<40;u+=1.8){d+=isoPoly([b.p(u,D-1,6),b.p(u,D-1,H-4),b.p(u,1,H-4)])}b.add(isoPath(d,ISO_K.th));
  b.box(40,0,0,4,D,H+3);
  [[0.6,H+1.2],[D-0.6,H+1.2],[D-0.6,3]].forEach(function(q){b.cyl(10,q[0],q[1],'x',38,0.6);b.cyl(44,q[0],q[1],'x',1.4,1.2)});
  [[6,H-8],[18,H-8],[6,11],[18,11]].forEach(function(q){b.noz(44,q[0],q[1],'x',5,2.2)});
  b.port.in=[49,6,H-8];b.port.out=[49,18,11];b.port.in2=[49,18,H-8];b.port.out2=[49,6,11];b.port.top=[24,D/2,H+6];b.port.base=[22,D/2,0]},
 /* centrifugal pump: base plate, volute with end suction and top discharge, lantern, motor with cooling fins, fan cowl */
 pump:function(b,o){var z=14;
  b.box(-15,-9,0,62,18,3);
  b.bx(-2,0,3,8,10,2);b.bx(14,0,3,4,14,3.5);b.bx(32,0,3,4,14,3.5);
  b.noz(-6,0,z,'-x',8,3.2);
  b.cyl(-6,0,z,'x',8,10);b.band(-2,0,z,'x',10);
  b.noz(-2,-4,z+8,'z',10,2.8);
  b.cyl(2,0,z,'x',6,5);
  b.cyl(8,0,z,'x',30,8.5);for(var u=12;u<38;u+=3.2)b.band(u,0,z,'x',8.5);
  b.box(18,-4,z+7.6,9,8,5);b.cyl(22.5,4,z+10,'y',2.2,1);
  b.cyl(38,0,z,'x',6,8);b.ring(44,0,z,'x',5.5).ring(44,0,z,'x',3).ring(44,0,z,'x',1);
  b.port.in=[-14,0,z];b.port.out=[-2,-4,z+18];b.port.top=[18,0,z+16];b.port.base=[16,0,0]},
 /* diaphragm valve (handwheel) or ball valve (o.type 'ball', lever); anchor on the pipe centreline, along x */
 valve:function(b,o){var r=o.r||2.6;
  if(o.type==='ball'){b.noz(-3,0,0,'-x',4,r);b.cyl(-3,0,0,'x',6,r*1.7);b.band(0,0,0,'x',r*1.7);b.noz(3,0,0,'x',4,r);
   b.cyl(0,0,r*1.5,'z',2.4,0.9);b.bx(0,0,r*1.5+2.4,3,3,1.4);b.box(-1,-0.8,r*1.5+3,12,1.6,1.1);b.port.top=[0,0,r*2+6]}
  else{b.noz(-3,0,0,'-x',4,r);b.cyl(-3.5,0,0,'x',7,r*1.12);b.box(-3,-2.6,-r*1.25,6,5.2,r*1.25+r*1.1);b.noz(3.5,0,0,'x',4,r);
   b.box(-4.2,-3.6,r*1.1,8.4,7.2,1.4);b.box(-3.5,-3,r*1.1+1.4,7,6,4.2);b.cyl(0,0,r*1.1+5.6,'z',3.2,0.9);
   b.cyl(0,0,r*1.1+8.4,'z',1.2,5.4);var c=r*1.1+9.6,d='';b.ring(0,0,c,'z',4.3);
   [0,1,2,3].forEach(function(i){var t=i*Math.PI/2+0.3;d+=isoPoly([b.p(Math.cos(t)*1.3,Math.sin(t)*1.3,c),b.p(Math.cos(t)*4.3,Math.sin(t)*4.3,c)])});b.add(isoPath(d,ISO_K.th));
   b.cyl(0,0,c-0.4,'z',1.4,1.3);b.port.top=[0,0,c+3]}
  b.port.a=[-7,0,0];b.port.b=[7.5,0,0]},
 /* pressure gauge: stem and socket, case facing the front (o.face 'y' or 'x'), dial with ticks and needle (o.value 0..1) */
 gauge:function(b,o){var R=o.r||5,ax=o.face==='x'?'x':'y',v=ax==='y'?[0,1,0]:[1,0,0];
  b.cyl(0,0,0,'z',3,0.9);b.bx(0,0,3,2.6,2.6,1.8);b.cyl(0,0,4.8,'z',1.2,0.7);
  var c=R+5.6;b.cyl(-v[0]*1.2,-v[1]*1.2,c,ax,2.6,R);b.ring(v[0]*1.4,v[1]*1.4,c,ax,R*0.86);
  isoDial(b,v[0]*1.4,v[1]*1.4,c,ax,R,o.value);b.ring(v[0]*1.4,v[1]*1.4,c,ax,0.6,ISO_K.ln);
  b.port.a=[0,0,0];b.port.top=[0,0,c+R+2]},
 /* analyser / transmitter (TOC, conductivity): instrument box on a post, display, keys, glands, sample line */
 analyzer:function(b,o){var z0=o.post===false?0:20,W=16,D=9,H=20;
  if(z0){b.bx(0,0,0,7,7,1.2);b.bx(0,0,1.2,2.4,2.4,z0-1.2)}
  b.box(-W/2,-D/2,z0,W,D,H);b.box(-W/2-0.8,-D/2-0.8,z0+H,W+1.6,D+1.6,1.4);
  b.rect('y',-W/2+2,z0+H-9,W/2-2,z0+H-2.5,D/2,ISO_K.glass);
  b.add(isoPath(isoPoly([b.p(-W/2+3.5,D/2,z0+H-5.5),b.p(-1,D/2,z0+H-4),b.p(1.5,D/2,z0+H-6.5),b.p(W/2-3.5,D/2,z0+H-4.5)]),ISO_K.th+' aq-iso__trace'));
  [-4,0,4].forEach(function(u){b.ring(u,D/2,z0+5,'y',1)});b.ring(W/2-2.5,D/2,z0+H-11.5,'y',0.8,ISO_K.acc);
  [-4,0,4].forEach(function(u){b.cyl(u,0,z0,'-z',2.4,1)});
  b.noz(W/2,0,z0+6,'x',5,1);b.port.sample=[W/2+5,0,z0+6];b.port.top=[0,0,z0+H+3];b.port.base=[0,0,0]},
 /* control panel: plinth, two-door cabinet, HMI, pilot lights, selector, handles, louvres, glands on top */
 panel:function(b,o){var W=32,D=14,H=50;
  b.bx(0,0,0,W+2,D+2,3);b.bx(0,0,3,W,D,H);b.bx(0,0,H+3,W+1.6,D+1.6,1.2);
  [-9,0,9].forEach(function(u){b.cyl(u,-2,H+4.2,'z',2.4,1.1)});
  var f=D/2;b.line([0,f,5],[0,f,H+1]);
  b.rect('y',-W/2+2,30,-2,45,f);b.rect('y',-W/2+3,31.2,-3,43.8,f,ISO_K.glass);
  b.add(isoPath(isoPoly([b.p(-W/2+5,f,34),b.p(-9,f,38),b.p(-6.5,f,36),b.p(-4.5,f,41)]),ISO_K.th+' aq-iso__trace'));
  [4,8,12].forEach(function(u,i){b.ring(u,f,42,'y',1.3,i===0?ISO_K.acc:ISO_K.th)});b.ring(8,f,36,'y',1.8);b.line([8,f,36],[9.3,f,37.3],ISO_K.th);
  b.line([-1.8,f,22],[-1.8,f,28]);b.line([1.8,f,22],[1.8,f,28]);
  b.rect('y',3,8,13,14,f);
  var d='';for(var z=8;z<16;z+=2)d+=isoPoly([b.p(W/2,-4,z),b.p(W/2,4,z)]);b.add(isoPath(d,ISO_K.th));
  b.port.top=[0,0,H+8];b.port.base=[0,0,0]},
 /* skid base frame: channel perimeter, cross members, lifting lugs, levelling feet (o.w length, o.d depth) */
 skid:function(b,o){var W=o.w||120,D=o.d||60,h=6,t=4,z=3,n=Math.max(1,Math.round(W/45));
  [[0,0],[W,0],[0,D],[W,D]].forEach(function(q,i){if(i<3){b.cyl(q[0]+(q[0]?-3:3),q[1]+(q[1]?-3:3),0,'z',z,1.6);b.bx(q[0]+(q[0]?-3:3),q[1]+(q[1]?-3:3),0,6,6,0.8)}});
  b.box(0,0,z,W,t,h);b.box(0,t,z,t,D-2*t,h);
  for(var i=1;i<n;i++)b.box(W*i/n-t/2,t,z,t,D-2*t,h*0.7);
  b.box(W-t,t,z,t,D-2*t,h);
  b.cyl(W-3,D-3,0,'z',z,1.6);b.bx(W-3,D-3,0,6,6,0.8);
  b.box(0,D-t,z,W,t,h);b.line([1,D,z+1.1],[W-1,D,z+1.1],ISO_K.th).line([1,D,z+h-1.1],[W-1,D,z+h-1.1],ISO_K.th);
  b.line([W,D-t+1,z+1.1],[W,1,z+1.1],ISO_K.th);
  [W*0.15,W*0.85].forEach(function(u){b.poly([[u-3,D,z+h],[u+3,D,z+h],[u+2,D,z+h+4],[u-2,D,z+h+4]],ISO_K.eq);b.ring(u,D,z+h+2,'y',1)});
  b.port.deck=[0,0,z+h];b.port.top=[W/2,D/2,z+h];b.port.base=[W/2,D/2,0]},
 /* point of use: drop from above, diaphragm valve with handwheel, gooseneck spout, sink cabinet; the falling water is a flow */
 outlet:function(b,o){var W=30,D=20,H=28,id='isoc'+(Math.random()*1e6|0).toString(36)+(++isoUid);
  b.box(-W/2,-D/2,0,W,D,H);b.box(-W/2-1,-D/2-1,H,W+2,D+2,1.6);
  var hz=H+1.6,hole=[b.p(-W/2+3,-D/2+3,hz),b.p(W/2-3,-D/2+3,hz),b.p(W/2-3,D/2-3,hz),b.p(-W/2+3,D/2-3,hz)];
  b.add('<clipPath id="'+id+'"><path d="'+isoPoly(hole,1)+'"/></clipPath>');
  b.add(isoPath(isoPoly(hole,1),ISO_K.alt));
  b.add('<g clip-path="url(#'+id+')">'+isoPath(isoPoly([b.p(W/2-3,-D/2+3,hz-7),b.p(-W/2+3,-D/2+3,hz-7),b.p(-W/2+3,D/2-3,hz-7)])+isoPoly([b.p(-W/2+3,-D/2+3,hz),b.p(-W/2+3,-D/2+3,hz-7)]),ISO_K.th)+'</g>');
  b.ring(2,3,hz-6.9,'z',1.6);
  b.line([-W/2+2,D/2+1,H-6],[W/2-2,D/2+1,H-6],ISO_K.th);b.rect('y',-W/2+2.5,3,W/2-2.5,H-8,D/2);b.line([0,D/2,3],[0,D/2,H-8],ISO_K.th);
  b.bx(2,-8,hz,6,6,1.2);b.cyl(2,-8,hz+1.2,'z',30,1.8);b.noz(2,-8,hz+27,'z',5,1.8);
  var sp=hz+13;b.bx(2,-8,sp-3,5.4,5.4,6.5);b.cyl(4.7,-8,sp+0.2,'x',3,0.8);b.cyl(7.7,-8,sp+0.2,'x',1.2,3.6);b.ring(8.9,-8,sp+0.2,'x',2.4);
  b.add(isoPipe([b.p(2,-5.3,sp-1),b.p(2,3,sp-1),b.p(2,3,sp-5)],{r:1.3*b.s,bend:2.6*b.s,flow:false,caps:'end'}));sp-=1;
  b.add('<path class="aq-iso__flow aq-iso__flow--drop" d="'+isoPoly([b.p(2,3,sp-4.6),b.p(2,3,hz-6.5)])+'"'+(o.to?' data-iso-to="'+o.to+'"':'')+'/>');
  b.port.in=[2,-8,hz+32];b.port.top=[2,-8,hz+34];b.port.base=[0,0,0]},
 /* drafting desk: tilted board with a drawing sheet and parallel rule, four legs */
 desk:function(b,o){var W=46,y0=-12,y1=12,z0=44,z1=30;
  b.leg(-W/2+3,-9,0,40,1.4);b.leg(W/2-3,-9,0,40,1.4);
  function at(u,f,dz){return b.p(u,y0+(y1-y0)*f,z0+(z1-z0)*f+(dz||0))}
  b.add(isoPath(isoPoly([at(-W/2,0),at(W/2,0),at(W/2,1),at(-W/2,1)],1)+isoPoly([at(W/2,0),at(W/2,1),at(W/2,1,-2),at(W/2,0,-2)],1)+isoPoly([at(-W/2,1),at(W/2,1),at(W/2,1,-2),at(-W/2,1,-2)],1),ISO_K.eq));
  b.add(isoPath(isoPoly([at(-W/2+5,0.1,0.1),at(W/2-5,0.1,0.1),at(W/2-5,0.86,0.1),at(-W/2+5,0.86,0.1)],1),ISO_K.eq+' aq-iso__eq--sheet'));
  b.add(isoPath(isoPoly([at(-W/2+7,0.16,0.1),at(W/2-7,0.16,0.1),at(W/2-7,0.8,0.1),at(-W/2+7,0.8,0.1)],1)+isoPoly([at(W/2-17,0.8,0.1),at(W/2-17,0.64,0.1),at(W/2-7,0.64,0.1)])+
   isoPoly([at(-W/2+10,0.62,0.1),at(-W/2+18,0.62,0.1),at(-W/2+18,0.3,0.1)])+isoPoly([at(-W/2+18,0.46,0.1),at(-2,0.46,0.1),at(-2,0.26,0.1),at(6,0.26,0.1)]),ISO_K.th));
  b.ring(-2,y0+(y1-y0)*0.46,z0+(z1-z0)*0.46+0.2,[0,(z0-z1),(y1-y0)],2.6);
  b.add(isoPath(isoPoly([at(-W/2-1,0.92,0.2),at(W/2+1,0.92,0.2),at(W/2+1,0.97,0.2),at(-W/2-1,0.97,0.2)],1),ISO_K.eq));
  b.leg(-W/2+3,9,0,z1-1,1.4);b.leg(W/2-3,9,0,z1-1,1.4);
  b.port.top=[0,0,z0+4];b.port.base=[0,0,0]},
 /* documents: two ring binders standing, a stack of sheets in front */
 binder:function(b,o){
  [[-2,0],[6,0],[14,0]].forEach(function(q,i){b.box(q[0],-14,0,7,26,32);b.rect('y',q[0]+1.6,18,q[0]+5.4,27,12);b.ring(q[0]+3.5,12,7,'y',1.6);if(i===1)b.line([q[0]+2.4,12,24],[q[0]+4.6,12,24],ISO_K.th)});
  for(var i=0;i<4;i++)b.box(-30+i*0.6,6-i*0.4,i*1.3,26,18,1.3,i===3?ISO_K.eq+' aq-iso__eq--sheet':ISO_K.eq);
  var d='';[0.25,0.4,0.55,0.7].forEach(function(f,k){d+=isoPoly([b.p(-26,6+18*f-1.2,5.2),b.p(k%2?-14:-10,6+18*f-1.2,5.2)])});b.add(isoPath(d,ISO_K.th));
  b.port.top=[6,0,36];b.port.base=[0,0,0]},
 /* stamp: knob, neck, block, rubber; its imprint on the sheet beside it is the accent */
 stamp:function(b,o){
  if(o.imprint!==false){b.ring(-16,8,0,'z',7,ISO_K.acc).ring(-16,8,0,'z',5.4,ISO_K.acc);b.add(isoPath(isoPoly([b.p(-19,8,0),b.p(-16.5,10,0),b.p(-12.5,5,0)]),ISO_K.acc))}
  b.bx(0,0,0,13,9,1.4,ISO_K.alt);b.bx(0,0,1.4,14,10,4);b.cyl(0,0,5.4,'z',5,2);b.vessel(0,0,11,4.2,1.6,3.6,3.4);
  b.port.top=[0,0,20];b.port.base=[0,0,0]},
 /* flatbed truck: wheels, chassis, deck with stake pockets, cab with windscreen; o.load draws a crated skid on the deck */
 truck:function(b,o){var r=6.4;
  function wheel(u,v){b.cyl(u,v,r,'y',4.4,r);var c=v+4.4;b.ring(u,c,r,'y',r*0.55).ring(u,c,r,'y',1.4)}
  [12,26,78].forEach(function(u){wheel(u,0)});
  b.box(0,4,7,88,18,3);
  b.box(0,0,10,66,26,3);for(var u=6;u<66;u+=10)b.rect('y',u,10.8,u+2,12.2,26);
  if(o.load!==false){b.box(6,3,13,50,20,4);b.box(8,5,17,46,16,20);b.rect('y',8,17,54,37,21,ISO_K.th);
   b.add(isoPath(isoPoly([b.p(8,21,17),b.p(31,21,37),b.p(54,21,17)]),ISO_K.th));
   [18,44].forEach(function(u){b.add(isoPath(isoPoly([b.p(u,26,13),b.p(u,21,37),b.p(u,5,37),b.p(u,0,13)]),ISO_K.ln))})}
  b.box(66,1,10,4,24,24);
  b.box(70,1,10,18,24,24);b.box(70,2,34,12,22,2,ISO_K.alt);
  b.poly([[88,3,22],[88,23,22],[88,23,32],[88,3,32]],ISO_K.glass);b.poly([[72,25,22],[84,25,22],[84,25,32],[74,25,32]],ISO_K.glass);
  b.line([86,25,12],[86,25,32],ISO_K.th);b.line([80,25,20],[83,25,20]);
  b.box(88,0,8,3,26,5);
  [12,26,78].forEach(function(u){wheel(u,22)});
  b.port.top=[44,13,40];b.port.base=[44,13,0]},
 /* clean-room wall: panel joints, vision window, door with vision panel and handle, coved floor line (o.w, o.h) */
 wall:function(b,o){var W=o.w||84,H=o.h||56;
  b.box(0,0,0,W,4,H);
  var d='';for(var u=W/4;u<W;u+=W/4)d+=isoPoly([b.p(u,4,2.4),b.p(u,4,H)]);b.add(isoPath(d+isoPoly([b.p(0,4,2.4),b.p(W,4,2.4)]),ISO_K.th));
  b.rect('y',6,H*0.42,W*0.45,H*0.82,4,ISO_K.eq);b.rect('y',7.6,H*0.42+1.6,W*0.45-1.6,H*0.82-1.6,4,ISO_K.glass);
  var x0=W*0.62,x1=x0+18;b.rect('y',x0,0,x1,H*0.78,4,ISO_K.eq);b.rect('y',x0+1.4,0,x1-1.4,H*0.78-1.4,4,ISO_K.th);
  b.rect('y',x0+5,H*0.46,x1-5,H*0.66,4,ISO_K.glass);b.line([x1-4,4,H*0.36],[x1-4,4,H*0.42]);
  b.port.top=[W/2,2,H+4];b.port.base=[W/2,2,0]},
 /* building: block with parapet, window bands, loading door on the side, roof unit and stack */
 building:function(b,o){var W=o.w||90,D=o.d||52,H=o.h||38;
  b.box(0,0,0,W,D,H);b.box(0,0,H,W,D,2.4,ISO_K.alt);b.box(2.4,2.4,H,W-4.8,D-4.8,0.01);
  b.box(W*0.2,D*0.25,H+2.4,16,12,7);b.cyl(W*0.68,D*0.4,H+2.4,'z',12,2.4);
  [0.3,0.62].forEach(function(f){for(var u=6;u<W-6;u+=10)b.rect('y',u,H*f,u+6,H*f+H*0.18,D,ISO_K.glass)});
  b.rect('x',D*0.3,0,D*0.7,H*0.55,W,ISO_K.eq);var d='';for(var z=3;z<H*0.55;z+=3)d+=isoPoly([b.p(W,D*0.3,z),b.p(W,D*0.7,z)]);b.add(isoPath(d,ISO_K.th));
  b.port.top=[W/2,D/2,H+12];b.port.base=[W/2,D/2,0]},
 /* clipboard lying flat: board, clip, sheet with a checklist (o.ticks how many rows are ticked) */
 clipboard:function(b,o){var n=o.ticks==null?3:o.ticks;
  b.box(-12,-17,0,24,34,1.2);b.box(-11,-15,1.2,22,30,0.3,ISO_K.eq+' aq-iso__eq--sheet');
  for(var i=0;i<5;i++){var v=-10+i*5.4;b.poly([[-8,v,1.6],[-5,v,1.6],[-5,v+3,1.6],[-8,v+3,1.6]],ISO_K.th);
   b.line([-2.5,v+1.5,1.6],[i%2?5:8,v+1.5,1.6],ISO_K.th);
   if(i<n)b.add(isoPath(isoPoly([b.p(-7.6,v+1.2,1.6),b.p(-6.4,v+2.6,1.6),b.p(-3.8,v-0.6,1.6)]),ISO_K.acc))}
  b.box(-6,-18.5,1.2,12,5,2.2);b.ring(0,-16,3.6,'z',2.2);
  b.port.top=[0,0,6];b.port.base=[0,0,0]}};
/* module: a plain closed equipment module (a box standing on its footprint, o.w x o.d x o.h; 40 x 40 x 50): inset
   front panel, a nameplate line in flow across its top, inset top panel. Ports: in (front, low, where a riser enters),
   out (right side, low), top, base. */
ISO_PARTS.module=function(b,o){var W=o.w||40,D=o.d||40,H=o.h||50,f=D/2;
 b.bx(0,0,0,W,D,H);
 b.rect('y',-W/2+6,8,W/2-6,H-8,f);
 b.line([-W/2+10,f,H-14],[W/2-10,f,H-14],ISO_K.acc);
 b.rect('z',-W/2+8,-D/2+8,W/2-8,D/2-8,H);
 b.port.in=[0,f,16];b.port.out=[W/2,0,16];b.port.top=[0,0,H];b.port.base=[0,0,0]};
ISO_PARTS.board=ISO_PARTS.desk;ISO_PARTS.documents=ISO_PARTS.binder;ISO_PARTS.cleanroom=ISO_PARTS.wall;
ISO_PARTS.vessel=ISO_PARTS.tank;ISO_PARTS.instrument=ISO_PARTS.analyzer;

/* isoPart(kind, x, y, z, scale, opts): one piece of equipment as <g class="aq-iso__part" data-iso="kind">.
   opts: id (data-iso-id, the stage name a pipe's `to` lights), rot (quarter turns about z), cls, plus per-part options.
   Returns a string-like object with .ports (3D points: in, out, top, base and part-specific) and .at (2D top point). */
function isoPart(kind,x,y,z,s,o){o=o||{};var f=ISO_PARTS[kind];if(!f)return isoR('',{ports:{},at:isoP(x,y,z)});
 var b=isoB(x,y,z,s||1,o.rot);f(b,o);return b.done(kind,o)}

/* isoPipe(points3d, opts): a pipe run with rounded elbows.
   opts: r (radius, 2.4), bend (elbow radius, 3 x r), wall (twin-wall, default true; false draws one centre line),
   flow (default true: the water path, class aq-iso__flow, motion draws it along the run), to (stage id the water lights
   on arrival), from, flanges ('ends' | 'all' | false), caps (pipe-end rings: true, 'start', 'end', false), cls.
   Returns a string-like object with .d (centreline path data), .start, .end (2D). */
function isoPipe(pts,o){o=o||{};var r=o.r||2.4,bend=o.bend||r*3,n=pts.length,i,V=isoV;if(n<2)return isoR('',{});
 var cl='M'+isoT(isoP(pts[0])),samp=[isoP(pts[0])],corners=[];
 for(i=1;i<n;i++){var p=pts[i];
  if(i<n-1){var d1=V.sub(p,pts[i-1]),d2=V.sub(pts[i+1],p),l1=V.len(d1),l2=V.len(d2);d1=V.nrm(d1);d2=V.nrm(d2);
   var ang=Math.acos(Math.max(-1,Math.min(1,V.dot(d1,d2))));
   if(ang<1e-3){cl+='L'+isoT(isoP(p));samp.push(isoP(p));continue}
   var R=Math.min(bend,l1/2,l2/2),S=V.sub(p,V.mul(d1,R)),E=V.add(p,V.mul(d2,R)),k=4/3*Math.tan(ang/4)*R/Math.tan(ang/2),
    c1=V.add(S,V.mul(d1,k)),c2=V.sub(E,V.mul(d2,k));
   cl+='L'+isoT(isoP(S))+'C'+isoT(isoP(c1))+' '+isoT(isoP(c2))+' '+isoT(isoP(E));samp.push(isoP(S));
   var A=isoP(S),B=isoP(c1),C=isoP(c2),Dd=isoP(E);
   for(var j=1;j<=10;j++){var t=j/10,u=1-t;samp.push([u*u*u*A[0]+3*u*u*t*B[0]+3*u*t*t*C[0]+t*t*t*Dd[0],u*u*u*A[1]+3*u*u*t*B[1]+3*u*t*t*C[1]+t*t*t*Dd[1]])}
   corners.push(p)}
  else{cl+='L'+isoT(isoP(p));samp.push(isoP(p))}}
 var dir0=V.nrm(V.sub(pts[1],pts[0])),dir1=V.nrm(V.sub(pts[n-1],pts[n-2])),out='',id=o.id?' data-iso-id="'+o.id+'"':'',to=o.to?' data-iso-to="'+o.to+'"':'',from=o.from?' data-iso-from="'+o.from+'"':'';
 if(o.wall!==false){var w=ISO_RX*r,L=[],Rt=[];
  for(i=0;i<samp.length;i++){var a=samp[Math.max(0,i-1)],c=samp[Math.min(samp.length-1,i+1)],tx=c[0]-a[0],ty=c[1]-a[1],tl=Math.sqrt(tx*tx+ty*ty)||1,nx=-ty/tl,ny=tx/tl;
   L.push([samp[i][0]+nx*w,samp[i][1]+ny*w]);Rt.push([samp[i][0]-nx*w,samp[i][1]-ny*w])}
  var pl=function(q){return q.map(function(p,i){return (i?'L':'M')+isoT(p)}).join('')};
  out+=isoPath(pl(L)+pl(Rt.slice().reverse()).replace('M','L')+'Z','aq-iso__pipe-body')+isoPath(pl(L),'aq-iso__pipe-wall')+isoPath(pl(Rt),'aq-iso__pipe-wall')}
 else out+=isoPath(cl,'aq-iso__pipe-line');
 var caps=o.caps==null?(o.wall!==false):o.caps,fl=o.flanges;
 function flange(p,d){var c=isoCylD(V.sub(p,V.mul(d,0.6)),d,1.2,r*1.6);return isoPath(c[0]+c[1],'aq-iso__eq aq-iso__flange')}
 if(fl==='ends'||fl==='all'||fl===true){out+=flange(pts[0],dir0)+flange(pts[n-1],dir1);
  if(fl==='all')for(i=1;i<n-1;i++){var q=pts[i],dd=V.nrm(V.sub(pts[i+1],q)),R2=Math.min(bend,V.len(V.sub(pts[i+1],q))/2);out+=flange(V.add(q,V.mul(dd,R2+r*0.8)),dd)}}
 else if(caps&&o.wall!==false){if(caps!=='end')out+=isoPath(isoRingD(pts[0],dir0,r),'aq-iso__eq');if(caps!=='start')out+=isoPath(isoRingD(pts[n-1],dir1,r),'aq-iso__eq')}
 if(o.flow!==false)out+='<path class="aq-iso__flow'+(o.wall===false?' aq-iso__flow--line':'')+'" d="'+cl+'"'+to+from+'/>';
 return isoR('<g class="aq-iso__pipe'+(o.cls?' '+o.cls:'')+'"'+id+to+'>'+out+'</g>',{d:cl,start:isoP(pts[0]),end:isoP(pts[n-1])})}

/* isoArrow(p, dir, opts): a flow chevron lying on the run at p pointing along dir (a 3D vector or 'x', '-y'…).
   opts: size (5), len (shaft length behind the head, 0), cls. Drawn in flow. */
function isoArrow(p,dir,o){o=o||{};var d=isoV.nrm(isoAx(dir)),s=o.size||5,pl=Math.abs(d[2])>0.9?[1,-1,0]:isoV.crs(d,[0,0,1]);pl=isoV.nrm(pl);
 var tip=isoV.add(p,isoV.mul(d,s*0.5)),back=isoV.sub(tip,isoV.mul(d,s)),w1=isoV.add(back,isoV.mul(pl,s*0.55)),w2=isoV.sub(back,isoV.mul(pl,s*0.55));
 var dd=isoPoly([w1,tip,w2]);if(o.len)dd+=isoPoly([isoV.sub(tip,isoV.mul(d,o.len)),tip]);
 return '<path class="aq-iso__arrow'+(o.cls?' '+o.cls:'')+'" d="'+dd+'"/>'}

/* isoDim(a, b, opts): dimension line between 3D points a and b, offset by opts.off (3D vector), with extension lines,
   oblique ticks and an optional short drawing label opts.text (mono, aria-hidden with the svg).
   Returns a string-like object with .mid (2D label slot) and .angle (degrees, the line's slope on screen). */
function isoDim(a,b,o){o=o||{};var V=isoV,off=o.off||[0,0,0],ol=V.len(off),on=ol?V.nrm(off):[0,0,1],ext=o.ext==null?3:o.ext;
 var A=V.add(a,off),B=V.add(b,off),u=V.nrm(V.sub(b,a)),tk=V.mul(V.nrm(V.add(u,on)),2.6);
 var d=(ol?isoPoly([V.add(a,V.mul(on,1.5)),V.add(A,V.mul(on,ext))])+isoPoly([V.add(b,V.mul(on,1.5)),V.add(B,V.mul(on,ext))]):'')+isoPoly([A,B])+isoPoly([V.sub(A,tk),V.add(A,tk)])+isoPoly([V.sub(B,tk),V.add(B,tk)]);
 var pa=isoP(A),pb=isoP(B),mid=[(pa[0]+pb[0])/2,(pa[1]+pb[1])/2],ang=Math.atan2(pb[1]-pa[1],pb[0]-pa[0])*180/Math.PI;
 if(ang>90)ang-=180;if(ang<-90)ang+=180;
 var t=o.text?'<text class="aq-iso__label" text-anchor="middle" transform="translate('+isoT(mid)+') rotate('+isoF(ang)+')" dy="-3">'+String(o.text).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})+'</text>':'';
 return isoR('<g class="aq-iso__dim'+(o.cls?' '+o.cls:'')+'"><path class="aq-iso__dim-line" d="'+d+'"/>'+t+'</g>',{mid:mid,angle:ang})}

/* isoLeader(p, to, opts): callout leader from a 3D point on a part to a label anchor. to is a 2D point [x,y] (same
   space as isoP) or {dx,dy} relative to the start. opts.shelf: horizontal landing length (12; 0 for none).
   Returns a string-like object with .start, .end (2D: where the HTML label goes) and .side ('left'|'right'). */
function isoLeader(p,to,o){o=o||{};var s=isoP(p),e=to.length?to:[s[0]+(to.dx||0),s[1]+(to.dy||0)],sh=o.shelf==null?12:o.shelf,dir=e[0]>=s[0]?1:-1,end=[e[0]+dir*sh,e[1]];
 var d='M'+isoT(s)+'L'+isoT(e)+(sh?'L'+isoT(end):'');
 return isoR('<g class="aq-iso__leader'+(o.cls?' '+o.cls:'')+'"><path class="aq-iso__leader-line" d="'+d+'"/><circle class="aq-iso__leader-dot" cx="'+isoF(s[0])+'" cy="'+isoF(s[1])+'" r="'+(o.dot||1.6)+'"/></g>',{start:s,end:end,side:dir>0?'right':'left'})}

/* isoSheet(w, h, opts): drawing-sheet furniture in screen space as a quiet background layer: border, zone band with
   numbers and letters, centring marks, title block, optional isometric grid. opts: m (outer margin 10), band (zone band
   10), cols, rows (zone counts), title (true or {w,h}), grid ('iso' | false), gridStep (24), sheet ('A1'-style tag). */
function isoSheet(w,h,o){o=o||{};var m=o.m==null?10:o.m,bd=o.band==null?10:o.band,cols=o.cols||Math.max(2,Math.round(w/180)),rows=o.rows||Math.max(2,Math.round(h/170));
 var x0=m,y0=m,x1=w-m,y1=h-m,ix0=x0+bd,iy0=y0+bd,ix1=x1-bd,iy1=y1-bd,d='',t='',i,txt=function(x,y,s){return '<text class="aq-iso__sheet-t" x="'+isoF(x)+'" y="'+isoF(y)+'" text-anchor="middle" dominant-baseline="central">'+s+'</text>'};
 d+='M'+x0+' '+y0+'H'+x1+'V'+y1+'H'+x0+'Z';
 var g='';
 if(o.grid==='iso'){var st=o.gridStep||24,tn=Math.tan(Math.PI/6),gd='';
  var seg=function(x,y,dx,dy){var ts=[],T=[[ix0,'x'],[ix1,'x'],[iy0,'y'],[iy1,'y']];T.forEach(function(q){var tt=q[1]==='x'?(dx?(q[0]-x)/dx:NaN):(dy?(q[0]-y)/dy:NaN);if(isFinite(tt)){var px=x+dx*tt,py=y+dy*tt;if(px>=ix0-0.01&&px<=ix1+0.01&&py>=iy0-0.01&&py<=iy1+0.01)ts.push(tt)}});
   if(ts.length<2)return '';ts.sort(function(a,b){return a-b});return 'M'+isoF(x+dx*ts[0])+' '+isoF(y+dy*ts[0])+'L'+isoF(x+dx*ts[ts.length-1])+' '+isoF(y+dy*ts[ts.length-1])}
  var span=(ix1-ix0)*tn+(iy1-iy0);for(var c=-span;c<=span+(iy1-iy0);c+=st){gd+=seg(ix0,iy0+c,1,tn)+seg(ix0,iy0+c,1,-tn)}
  for(var x=ix0+st*ISO_C;x<ix1;x+=st*ISO_C*2)gd+='M'+isoF(x)+' '+iy0+'V'+iy1;
  g='<path class="aq-iso__grid" d="'+gd+'"/>'}
 d+='M'+ix0+' '+iy0+'H'+ix1+'V'+iy1+'H'+ix0+'Z';
 var cw=(ix1-ix0)/cols,rh=(iy1-iy0)/rows;
 for(i=1;i<cols;i++){var X=ix0+cw*i;d+='M'+isoF(X)+' '+y0+'v'+bd+'M'+isoF(X)+' '+y1+'v'+(-bd)}
 for(i=1;i<rows;i++){var Y=iy0+rh*i;d+='M'+x0+' '+isoF(Y)+'h'+bd+'M'+x1+' '+isoF(Y)+'h'+(-bd)}
 for(i=0;i<cols;i++){t+=txt(ix0+cw*(i+0.5),y0+bd/2,i+1)+txt(ix0+cw*(i+0.5),y1-bd/2,i+1)}
 for(i=0;i<rows;i++){var L=String.fromCharCode(65+rows-1-i);t+=txt(x0+bd/2,iy0+rh*(i+0.5),L)+txt(x1-bd/2,iy0+rh*(i+0.5),L)}
 var cx=w/2,cy=h/2,c='M'+isoF(cx)+' '+iy0+'l-3 -5h6z'+'M'+isoF(cx)+' '+iy1+'l-3 5h6z'+'M'+ix0+' '+isoF(cy)+'l-5 -3v6z'+'M'+ix1+' '+isoF(cy)+'l5 -3v6z';
 var tb='';if(o.title!==false&&o.title!=null){var tw=(o.title&&o.title.w)||Math.min(220,(ix1-ix0)*0.36),th=(o.title&&o.title.h)||42,tx=ix1-tw,ty=iy1-th;
  tb='M'+isoF(tx)+' '+isoF(ty)+'H'+ix1+'M'+isoF(tx)+' '+isoF(ty)+'V'+iy1+'M'+isoF(tx)+' '+isoF(ty+th/3)+'H'+ix1+'M'+isoF(tx)+' '+isoF(ty+th*2/3)+'H'+ix1+
   'M'+isoF(tx+tw*0.22)+' '+isoF(ty+th/3)+'V'+iy1+'M'+isoF(tx+tw*0.62)+' '+isoF(ty)+'V'+iy1+'M'+isoF(tx+tw*0.82)+' '+isoF(ty+th*2/3)+'V'+iy1}
 return '<g class="aq-iso__sheet">'+g+'<path class="aq-iso__sheet-line" d="'+d+tb+'"/><path class="aq-iso__sheet-mark" d="'+c+'"/>'+t+'</g>'}

/* isoSvg(w, h, inner, cls, opts): the drawing's <svg class="aq-iso …">, decorative (aria-hidden) unless opts.label.
   opts.origin [ox,oy] shifts the iso world (isoP space) into the viewBox; opts.fit 'slice' crops instead of letterboxing. */
function isoSvg(w,h,inner,cls,o){o=o||{};var org=o.origin||[0,0],lab=o.label?' role="img" aria-label="'+String(o.label).replace(/"/g,'&quot;')+'"':' aria-hidden="true"';
 return '<svg class="aq-iso'+(cls?' '+cls:'')+'" viewBox="0 0 '+isoF(w)+' '+isoF(h)+'" preserveAspectRatio="xMidYMid '+(o.fit||'meet')+'"'+lab+' focusable="false">'+
  (o.under||'')+'<g transform="translate('+isoF(org[0])+' '+isoF(org[1])+')">'+inner+'</g></svg>'}
/* isoRoute(a, b, order, opts): an orthogonal run from 3D point a to b, moving one axis at a time in the given order
   ('zxy' = rise or drop first, then along x, then y). opts.via: extra 3D points to pass through first. Returns points
   for isoPipe. */
function isoRoute(a,b,order,o){o=o||{};var pts=[a],cur=a.slice(),stops=(o.via||[]).concat([b]);order=order||'xyz';
 stops.forEach(function(t){order.split('').forEach(function(k){var i='xyz'.indexOf(k);if(Math.abs(cur[i]-t[i])>1e-6){cur=cur.slice();cur[i]=t[i];pts.push(cur)}})});
 return pts}
/* where a 2D point lands as a percentage of the viewBox, for positioning HTML labels over the svg */
function isoPct(p,w,h,origin){origin=origin||[0,0];return {left:(100*(p[0]+origin[0])/w).toFixed(2)+'%',top:(100*(p[1]+origin[1])/h).toFixed(2)+'%'}}
/* bounds of a set of 3D points on screen, to size a viewBox: {x,y,w,h} */
function isoBounds(pts,pad){pad=pad||0;var a=1e9,b=1e9,c=-1e9,d=-1e9;pts.forEach(function(p){var q=isoP(p);a=Math.min(a,q[0]);b=Math.min(b,q[1]);c=Math.max(c,q[0]);d=Math.max(d,q[1])});return {x:a-pad,y:b-pad,w:c-a+2*pad,h:d-b+2*pad}}
if(typeof window!=='undefined')window.ISO={P:isoP,svg:isoSvg,part:isoPart,pipe:isoPipe,arrow:isoArrow,dim:isoDim,leader:isoLeader,sheet:isoSheet,pct:isoPct,bounds:isoBounds,route:isoRoute,
 parts:Object.keys(ISO_PARTS),v:isoV,ring:isoRingD,band:isoBandD,cyl:isoCylD,box:isoBoxD};
