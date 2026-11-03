/* Look "standards-orbit" -> StandardsOrbit (design-system/components/StandardsOrbit): a standards map drawn as orbits
   round the plant. The Purified Water plant sits in the middle of a navy blueprint ground (IsoKit: RO rack on its skid,
   control panel, storage tank and loop to a point of use, the qualification binders); two elliptical
   orbit rings run round it; each zone is a node on the outer ring with its title and standards beside it, and an arc
   runs from the node in to the part that zone governs. Hovering or focusing a zone lights its arc, node and part.
   Fields, as the standards map: zones [{t, codes, to, spot}]. to: the section that holds the proof (the title jumps
   there); each code is a chip that scrolls to the row naming it (standardsmap.js handles data-smap-code clicks).
   spot picks the drawn part the arc touches: ro-skid -> RO rack, storage-tank -> tank and loop, gauge -> control panel,
   weld -> skid frame (fabrication), binder -> binders; any other spot gets a node with no arc. Zones take the slots left top, right
   top, right bottom, left bottom, bottom in order (five at most on the rings; more stack under the stage).
   Phones: the plant on top, the zones as a list strung on a vertical orbit line down the left, chips under each title.
   Pass 12 phones: the plant carries a numbered pin (01-05) on the part each zone governs and holds as a 180 px sticky
   strip under the header (PhoneKit sticky figure, under 600 px; tablets keep the large figure); the zone in view lights
   its pin. Chips are 44 px, two columns. */
var SO_PART={'ro-skid':'gen','storage-tank':'sto',gauge:'ctl',weld:'mat',binder:'qual'};
function soScene(){
 var sk=isoPart('skid',0,0,0,1,{w:150,d:64,id:'mat'}),ro=isoPart('ro',12,10,9,1,{id:'gen'}),
  tk=isoPart('tank',236,4,0,1.15,{id:'sto'}),ou=isoPart('outlet',236,128,0,1,{id:'sto',to:'sto'}),
  pn=isoPart('panel',318,96,0,1,{id:'ctl'}),bd=isoPart('binder',128,150,0,1.1,{id:'qual'});
 var o=ro.ports.out||[124,23,30],ti=tk.ports.in;
 var feed=isoPipe(isoRoute(o,ti,'xzy',{via:[[o[0]+14,o[1],o[2]],[o[0]+14,o[1],ti[2]+10],[ti[0],o[1],ti[2]+10]]}),{r:2.4,to:'sto',caps:false});
 var tout=tk.ports.out,oin=ou.ports.in;
 var sup=isoPipe(isoRoute(tout,oin,'xyz',{via:[[tout[0]+14,tout[1],tout[2]],[tout[0]+14,oin[1],tout[2]],[oin[0],oin[1],tout[2]]]}),{r:2.4,to:'sto',caps:false,flanges:'all'});
 var tr=tk.ports.ret,ret=isoPipe(isoRoute([oin[0]-10,oin[1],tout[2]+6],tr,'zyx',{via:[[oin[0]-10,oin[1],tr[2]+8],[oin[0]-10,tr[1],tr[2]+8],[tr[0],tr[1],tr[2]+8]]}),{r:2,to:'sto',caps:false});
 var inner=[sk,ro,feed,tk,sup,ret,bd,ou,pn].join('');
 var pts=[[0,0,0],[0,0,80],[150,0,0],[150,64,0],[0,64,0],[236,-20,110],[262,4,0],[236,150,0],[236,128,80],[100,170,0],[128,130,40],[340,96,0],[318,110,60],[300,80,60]],bx=isoBounds(pts,14),W=Math.round(bx.w),H=Math.round(bx.h),org=[-bx.x,-bx.y];
 function at(p){var q=isoP(p);return [q[0]+org[0],q[1]+org[1]]}
 var A={gen:at([64,22,50]),sto:at([236,4,74]),ctl:at([318,96,40]),mat:at([0,64,9]),qual:at([128,140,34])};
 return {svg:isoSvg(W,H,inner,'aq-iso--navy aq-standards-orbit__svg',{origin:org}),W:W,H:H,A:A}}
function soF(n){return (Math.round(n*10)/10).toString()}
LOOKS['standards-orbit']=function(b,H){
 var Z=b.zones||[],S=soScene(),SW=1200,SH=720,cx=600,cy=320,pw=470,ph=pw*S.H/S.W,px=cx-pw/2,py=cy-ph/2+10;
 /* outer and inner rings */
 var R=[[385,262],[300,200]],slots=[[208,'l'],[332,'r'],[28,'r'],[152,'l'],[90,'b']];
 function ring(k,deg){var a=deg*Math.PI/180;return [cx+R[k][0]*Math.cos(a),cy+R[k][1]*Math.sin(a)]}
 function inPlant(p){return [px+p[0]*pw/S.W,py+p[1]*ph/S.H]}
 var rings='<ellipse vector-effect="non-scaling-stroke" class="aq-standards-orbit__ring" cx="'+cx+'" cy="'+cy+'" rx="'+R[0][0]+'" ry="'+R[0][1]+'"/><ellipse vector-effect="non-scaling-stroke" class="aq-standards-orbit__ring aq-standards-orbit__ring--in" cx="'+cx+'" cy="'+cy+'" rx="'+R[1][0]+'" ry="'+R[1][1]+'"/>'
  +'<ellipse vector-effect="non-scaling-stroke" class="aq-standards-orbit__ring aq-standards-orbit__ring--far" cx="'+cx+'" cy="'+cy+'" rx="'+(R[0][0]+70)+'" ry="'+(R[0][1]+40)+'"/>';
 var ticks='';for(var t=0;t<360;t+=15){var a=ring(0,t),c=ring(0,t+0.01),n=[a[0]-cx,a[1]-cy],l=Math.sqrt(n[0]*n[0]+n[1]*n[1]);ticks+='<line class="aq-standards-orbit__tick" x1="'+soF(a[0])+'" y1="'+soF(a[1])+'" x2="'+soF(a[0]+n[0]/l*(t%45?4:9))+'" y2="'+soF(a[1]+n[1]/l*(t%45?4:9))+'"/>'}
 var arcs='',nodes='',lab='';
 Z.forEach(function(z,i){var sl=slots[i];if(!sl)return;var deg=sl[0],nd=ring(0,deg),pid=SO_PART[z.spot],tg=pid&&S.A[pid]?inPlant(S.A[pid]):null;
  if(tg){/* an arc: leaves the node along the ring, then turns in to the part */
   var a=deg*Math.PI/180,dir=deg>90&&deg<270?1:-1,tan=[-R[0][0]*Math.sin(a)*dir,R[0][1]*Math.cos(a)*dir],tl=Math.sqrt(tan[0]*tan[0]+tan[1]*tan[1]),k=150;
   if(sl[1]==='b')tan=[(tg[0]<cx?-1:1)*1,0],tl=1;
   var c1=[nd[0]+tan[0]/tl*k,nd[1]+tan[1]/tl*k],c2=[tg[0]+(nd[0]-tg[0])*0.15,tg[1]+(nd[1]-tg[1])*0.55];
   arcs+='<path vector-effect="non-scaling-stroke" class="aq-standards-orbit__arc" data-so="'+i+'" d="M'+soF(nd[0])+' '+soF(nd[1])+' C'+soF(c1[0])+' '+soF(c1[1])+' '+soF(c2[0])+' '+soF(c2[1])+' '+soF(tg[0])+' '+soF(tg[1])+'"/>'
    +'<circle class="aq-standards-orbit__end" data-so="'+i+'" cx="'+soF(tg[0])+'" cy="'+soF(tg[1])+'" r="4"/>'}
  nodes+='<g class="aq-standards-orbit__node" data-so="'+i+'"><circle class="aq-standards-orbit__halo" cx="'+soF(nd[0])+'" cy="'+soF(nd[1])+'" r="11"/><circle class="aq-standards-orbit__dot" cx="'+soF(nd[0])+'" cy="'+soF(nd[1])+'" r="5"/></g>';
  var to=z.to||'',ttl=to?'<a href="#'+e(WP)+'" data-jump="'+e(to)+'">'+tx(z.t)+'</a>':tx(z.t);
  lab+='<li class="aq-standards-orbit__zone is-'+sl[1]+'" data-pk-row="'+i+'" data-so="'+i+'"'+(pid?' data-part="'+pid+'"':'')+' style="--x:'+(100*nd[0]/SW).toFixed(2)+'%;--y:'+(100*nd[1]/SH).toFixed(2)+'%">'
   +'<div class="aq-standards-orbit__head">'+idx(i)+'<h3 class="aq-standards-orbit__t">'+ttl+'</h3></div>'
   +'<ul class="aq-standards-orbit__codes">'+(z.codes||[]).map(function(c){var ct=c&&typeof c==='object'?c.t:c,cto=(c&&typeof c==='object'&&c.to)||to;
    return '<li><a class="aq-standards-orbit__code" href="#'+e(WP)+'" data-smap-code="'+e(ct)+'" data-smap-to="'+e(cto)+'">'+tx(ct)+'</a></li>'}).join('')+'</ul></li>'});
 var orbit='<svg class="aq-standards-orbit__orbits" viewBox="0 0 '+SW+' '+SH+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">'+rings+'<g>'+ticks+'</g>'+arcs+nodes+'</svg>';
 /* phone pins: one per zone on the part it governs (zones with no drawn part pin the skid frame) */
 var pins=Z.map(function(z,i){if(!slots[i])return '';var pid=SO_PART[z.spot],a=S.A[pid&&S.A[pid]?pid:'mat'];
  return '<span class="aq-standards-orbit__pin" data-pk-key="'+i+'" style="left:'+(100*a[0]/S.W).toFixed(2)+'%;top:'+(100*a[1]/S.H).toFixed(2)+'%">'+(i<9?'0':'')+(i+1)+'</span>'}).join('');
 var plant='<div class="aq-standards-orbit__plant" aria-hidden="true" data-pk-fig style="left:'+(100*px/SW).toFixed(2)+'%;top:'+(100*py/SH).toFixed(2)+'%;width:'+(100*pw/SW).toFixed(2)+'%"><div class="aq-standards-orbit__pan" style="--so-pw:'+S.W+';--so-ph:'+S.H+'">'+S.svg+pins+'</div></div>';
 return sec(H+'<div class="aq-standards-orbit" data-pk-sticky data-pk-h="180" data-pk-bp="599"><div class="aq-standards-orbit__stage" style="--sw:'+SW+';--sh:'+SH+'">'+orbit+plant
  +'<ol class="aq-standards-orbit__zones">'+lab+'</ol></div></div>','aq-band--navy aq-standards-orbit-sec')};
/* Hover or focus a zone: its arc, node and drawn part light (the zone list drives it, so a keyboard reaches it too) */
function soLight(z,on){var w=z&&z.closest('.aq-standards-orbit');if(!w)return;var i=z.getAttribute('data-so'),p=z.getAttribute('data-part');
 [].forEach.call(w.querySelectorAll('[data-so="'+i+'"]'),function(el){el.classList.toggle('is-on',on)});
 if(p)[].forEach.call(w.querySelectorAll('[data-iso-id="'+p+'"]'),function(el){el.classList.toggle('is-lit',on)});
 w.classList.toggle('is-focus',on)}
if(typeof document!=='undefined'&&document.addEventListener){
 ['mouseover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var z=ev.target.closest&&ev.target.closest('.aq-standards-orbit__zone');if(z)soLight(z,true)})});
 /* phones (PhoneKit strip): the zone in view lights its drawn part too; switching off clears it */
 document.addEventListener('pk:change',function(ev){var w=ev.target;if(!w.classList||!w.classList.contains('aq-standards-orbit'))return;
  [].forEach.call(w.querySelectorAll('.aq-standards-orbit__plant [data-iso-id].is-lit'),function(el){el.classList.remove('is-lit')});
  var z=ev.detail&&ev.detail.on&&w.querySelector('.aq-standards-orbit__zone[data-pk-row="'+ev.detail.key+'"]'),p=z&&z.getAttribute('data-part');
  if(p)[].forEach.call(w.querySelectorAll('.aq-standards-orbit__plant [data-iso-id="'+p+'"]'),function(el){el.classList.add('is-lit')})});
 ['mouseout','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var z=ev.target.closest&&ev.target.closest('.aq-standards-orbit__zone');if(z&&!(ev.relatedTarget&&z.contains(ev.relatedTarget)))soLight(z,false)})})}
