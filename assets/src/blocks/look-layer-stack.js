/* Look "layer-stack" -> LayerStack (design-system/components/LayerStack): a diagram block whose stages are layers of
   one system (field instruments up to the plant network), drawn as an exploded isometric stack of machined plates,
   the first stage at the bottom, each next one a step higher and further back. Each plate carries its equipment in
   IsoKit line art (analysers on a process pipe, a PLC rack, an operator panel, a historian rack and drums, a network
   switch with a dashed DMZ boundary and firewall). A data riser climbs from plate to plate and a trace crosses each
   plate top; one packet rides it from the instruments to the plant network. Labels alternate right and left of the
   stack, each on a leader from its plate's corner. A stage marked key (the controller that runs on its own) is the
   navy plate. Phones: the stack fills the width (cropped from the same drawing) with each plate tagged 01-05, the labels list
   under it top plate first, so list and drawing read in the same order.
   Fields: stages [{t, d, icon, art, key}], caption. art: instruments | plc | hmi | historian | network (default by
   position). key: true draws that plate navy. */
var LS_ART=['instruments','plc','hmi','historian','network'],LS_W=170,LS_D=80,LS_T=8,LS_SY=44,LS_SZ=70;
/* pass 12 phone: the stage number as a tag on the plate's free corner (the fourth hole), shown only on phones, where
   the leaders are gone and the list runs under the stack (top plate first, so list and drawing read the same way) */
function lsTag(c,i,key){return '<g class="aq-layer-stack__tag'+(key?' is-key':'')+'" data-ls="'+i+'"><circle cx="'+isoF(c[0])+'" cy="'+isoF(c[1])+'" r="15"/><text x="'+isoF(c[0])+'" y="'+isoF(c[1])+'" text-anchor="middle" dominant-baseline="central">'+String(i+1).padStart(2,'0')+'</text></g>'}
function lsPath(d,cls){return '<path class="'+cls+'" d="'+d+'"/>'}
/* one layer: o maps plate-local [x, y, z] (top face at z 0) to world */
function lsLayer(k,o,key){var W=LS_W,D=LS_D,T=LS_T,P=function(x,y,z){return o([x,y,z])},Q=function(a){return a.map(function(p){return o(p)})};
 var s=lsPath(isoPoly(Q([[0,D,-T],[W,D,-T],[W,D,0],[0,D,0]]),1),'aq-layer-stack__front')+lsPath(isoPoly(Q([[W,0,-T],[W,D,-T],[W,D,0],[W,0,0]]),1),'aq-layer-stack__side')
  +lsPath(isoPoly(Q([[0,0,0],[W,0,0],[W,D,0],[0,D,0]]),1),'aq-layer-stack__top')+lsPath(isoPoly(Q([[7,7,0],[W-7,7,0],[W-7,D-7,0],[7,D-7,0]]),1),'aq-layer-stack__inset')
  +[[12,12],[W-12,12],[W-12,D-12]].map(function(q){return lsPath(isoRingD(P(q[0],q[1],0),'z',2.2),'aq-layer-stack__hole')}).join('');
 var g='',B=function(x,y,z,w,d,h,c){return lsPath(isoBoxD(P(x,y,z),w,d,h),c||'aq-iso__eq')},L=function(pts,c){return lsPath(isoPoly(Q(pts)),c||'aq-iso__thin')};
 if(k==='instruments'){
  [58,98,138].forEach(function(x){var a=isoPart('analyzer',P(x,30,0)[0],P(x,30,0)[1],P(x,30,0)[2],0.8);g+=a;
   var sp=a.ports.sample;g+=isoPipe([sp,[sp[0]+3,sp[1],sp[2]],[sp[0]+3,sp[1],P(0,0,10)[2]],[sp[0]+3,P(0,59,0)[1],P(0,0,10)[2]]],{r:1,wall:false,flow:false})});
  g+=isoPipe([P(4,62,10),P(166,62,10)],{r:3,flanges:'ends',cls:'aq-layer-stack__water'})}
 else if(k==='plc'){g+=B(28,28,0,124,4,48)+B(28,32,0,124,12,6,'aq-iso__eq aq-iso__eq--alt')+B(30,32,23,120,4,4);
  var x=34;[24,15,15,15,15,15,15].forEach(function(w,j){g+=B(x,32,8,w,22,34);
   g+=lsPath(isoRingD(P(x+4,54,36),'y',1.4),j===0?'aq-iso__acc':'aq-iso__thin')+L([[x+3,54,14],[x+w-3,54,14]]);
   if(j===0)g+=lsPath(isoPoly(Q([[x+3,54,20],[x+w-3,54,20],[x+w-3,54,30],[x+3,54,30]]),1),'aq-iso__eq aq-iso__eq--glass');x+=w+1.5})}
 else if(k==='hmi'){g+=B(68,40,0,34,24,2)+B(82,49,2,6,6,24);
  g+=B(44,46,24,82,6,46)+lsPath(isoPoly(Q([[49,52,29],[121,52,29],[121,52,65],[49,52,65]]),1),'aq-iso__eq aq-iso__eq--glass')
   +L([[52,52,58],[118,52,58]],'aq-iso__hid')+L([[52,52,40],[60,52,42],[68,52,38],[76,52,41],[84,52,39],[92,52,43],[100,52,46],[108,52,48],[116,52,52]],'aq-iso__trace')}
 else if(k==='historian'){g+=B(30,28,0,46,40,56);
  for(var z=8;z<54;z+=8)g+=L([[33,68,z],[73,68,z]])+lsPath(isoRingD(P(68,68,z+4),'y',1),'aq-iso__acc');
  [0,15,30].forEach(function(z){var c=isoCylD(P(122,46,z),'z',13,17);g+=lsPath(c[0]+c[1],'aq-iso__eq')})}
 else if(k==='network'){g+=lsPath(isoPoly(Q([[110,8,0],[163,8,0],[163,72,0],[110,72,0]]),1),'aq-iso__hid aq-layer-stack__dmz');
  g+=B(28,44,0,66,20,12);for(var u=34;u<90;u+=9)g+=lsPath(isoPoly(Q([[u,64,4],[u+6,64,4],[u+6,64,8],[u,64,8]]),1),'aq-iso__thin');
  g+=B(122,28,0,30,26,28);[9,18].forEach(function(z){g+=L([[122,54,z],[152,54,z]])});[[129,0,9],[144,0,9],[136,9,18],[129,18,28],[144,18,28]].forEach(function(q){g+=L([[q[0],54,q[1]],[q[0],54,q[2]]])});
  g+=isoPipe([P(94,54,6),P(108,54,6),P(108,41,6),P(122,41,6)],{r:1,wall:false,cls:'aq-layer-stack__wire'})+isoPipe([P(152,41,6),P(186,41,6)],{r:1,wall:false,cls:'aq-layer-stack__wire'})
   +isoArrow(P(186,41,6),'x',{size:4});
  var dz=isoP(P(116,72,0));g+='<text class="aq-iso__label aq-layer-stack__dmz-t" x="'+isoF(dz[0])+'" y="'+isoF(dz[1]+12)+'" transform="rotate(30 '+isoF(dz[0])+' '+isoF(dz[1]+12)+')">DMZ</text>'}
 return '<g class="aq-layer-stack__plate'+(key?' is-key':'')+'">'+s+'</g><g class="aq-layer-stack__eqp">'+g+'</g>'}
LOOKS['layer-stack']=function(b,H){
 var S=(b.stages||[]).slice(0,6),n=S.length;if(!n)return BLOCKS.diagram(b,H);
 var off=function(i){return function(p){return [p[0],p[1]-LS_SY*i,p[2]+LS_SZ*i]}},pts=[];
 S.forEach(function(s,i){var o=off(i);pts.push(o([0,0,-LS_T]),o([LS_W,0,-LS_T]),o([LS_W,LS_D,-LS_T]),o([0,LS_D,-LS_T]),o([0,0,74]),o([LS_W+20,LS_D,0]))});
 var bx=isoBounds(pts,10),side=280,VX0=bx.x-side,VW=bx.w+2*side,VY0=bx.y-6,VH=bx.h+12,org=[-VX0,-VY0];
 var pc=function(v,a0,aw){return (100*(v-a0)/aw).toFixed(2)+'%'};
 /* the explode axis: a centre line through every plate */
 var c0=isoP(off(0)([LS_W/2,LS_D/2,-LS_T-30])),c1=isoP(off(n-1)([LS_W/2,LS_D/2,90]));
 var body='<path class="aq-layer-stack__axis" d="M'+isoT(c0)+'L'+isoT(c1)+'"/>',route=[],lead='',items='',at=[];
 S.forEach(function(s,i){var o=off(i),k=LS_ART.indexOf(s.art)>=0?s.art:LS_ART[Math.min(i,4)],ri=i%2===0;
  var Pp=function(x,y,z){return isoP(o([x,y,z]))};
  /* the trace across this plate: in where the riser below arrives, out where the next riser leaves */
  var tr=i===0?[[58,40,0],[58,24,0],[12,24,0]]:i===n-1?[[12,24+LS_SY,0],[12,54,0],[26,54,0]]:[[12,24+LS_SY,0],[12,24,0]];
  var trd=tr.map(function(q,j){return (j?'L':'M')+isoT(Pp(q[0],q[1],q[2]))}).join('');
  at.push(route.length);tr.forEach(function(q){route.push(Pp(q[0],q[1],q[2]))});
  var riser='';if(i<n-1){var a=Pp(12,24,0),r2=isoP(off(i)([12,24,LS_SZ-LS_T]));riser='<path class="aq-layer-stack__riser" d="M'+isoT(a)+'L'+isoT(r2)+'"/>'}
  body+='<g class="aq-layer-stack__layer" data-ls="'+i+'" data-dx="'+isoF(-(isoP(0,-LS_SY*i,0)[0]))+'" data-dy="'+isoF(LS_SZ*i-(LS_T+2)*i+LS_SY*i*0.5)+'">'
   +lsLayer(k,o,s.key)+'<path class="aq-layer-stack__trace" d="'+trd+'"/>'+lsTag(k==='instruments'?Pp(22,38,0):Pp(16,LS_D-16,0),i,s.key)+'</g>'+(riser?'<g class="aq-layer-stack__gap" data-ls="'+i+'">'+riser+'</g>':'');
  /* leader from the plate corner out to its label, right for the even layers, left for the odd */
  var cn=ri?Pp(LS_W,0,0):Pp(0,LS_D,0),ex=ri?bx.x+bx.w+30:bx.x-30;
  lead+='<g class="aq-layer-stack__lead" data-ls="'+i+'"><path d="M'+isoT(cn)+'H'+isoF(ex)+'"/><circle cx="'+isoF(cn[0])+'" cy="'+isoF(cn[1])+'" r="2.4"/></g>';
  var pos=(ri?'left:'+pc(ex,VX0,VW):'right:'+pc(VX0+VW-ex,0,VW))+';--ls-w:'+pc(side-40,0,VW);
  items+='<li class="aq-layer-stack__item aq-layer-stack__item--'+(ri?'r':'l')+(s.key?' is-key':'')+'" data-ls="'+i+'" data-art="'+k+'" style="'+pos+';top:'+pc(cn[1],VY0,VH)+'">'
   +idx(i)+'<h3 class="aq-layer-stack__t">'+tx(s.t)+'</h3>'+(s.d?'<p class="aq-layer-stack__d">'+tx(s.d)+'</p>':'')+'</li>'});
 /* the packet's route: plate traces joined by the risers (every point already in final position) */
 var rd=route.map(function(p,j){return (j?'L':'M')+isoT(p)}).join(''),len=[0];for(var j=1;j<route.length;j++)len.push(len[j-1]+Math.hypot(route[j][0]-route[j-1][0],route[j][1]-route[j-1][1]));
 var tot=len[len.length-1]||1,fr=at.map(function(a){return (len[a]/tot).toFixed(3)}).join(' ');
 body+='<path class="aq-layer-stack__route" d="'+rd+'"/>'+lead+'<circle class="aq-layer-stack__packet" r="3" cx="'+isoF(route[0][0])+'" cy="'+isoF(route[0][1])+'"/>';
 var svg=isoSvg(Math.round(VW),Math.round(VH),body,'aq-layer-stack__svg',{origin:org});
 var crop='--ls-zoom:'+(VW/(bx.w)).toFixed(3)+';--ls-shift:'+(-(side-0)/bx.w*100).toFixed(2)+'%';
 /* pass 9b (concept sys-monitoring.0): the title set huge and light on a navy field, cropped by a limestone drawing
    sheet that holds the stack and its numbered callouts and runs off the right and bottom edges */
 return sec('<div class="aq-layer-stack__spread">'+H+'<div class="aq-layer-stack__sheet" data-theme="light"><div class="aq-layer-stack" data-at="'+fr+'" style="'+crop+'"><div class="aq-layer-stack__fig">'+svg+'</div>'
  +'<ol class="aq-layer-stack__list" role="list">'+items+'</ol></div>'+(b.caption?'<p class="aq-small aq-prose">'+tx(b.caption)+'</p>':'')+'</div></div>','aq-band--navy aq-layer-stack-sec')};
/* Pointing at a label or a plate lights both and lifts the plate off the stack (style.css: the lift ported from
   Subframe Motion "Exploded product view" (exploded-camera), MIT, (c) 2026 Subframe: parts glide 600 ms on
   cubic-bezier(0.22, 1, 0.36, 1)) */
(function(){
 function set(root,i){root.classList.toggle('has-hot',i!=null);[].forEach.call(root.querySelectorAll('[data-ls]'),function(el){el.classList.toggle('is-hot',i!=null&&el.getAttribute('data-ls')===i)})}
 document.addEventListener('mouseover',function(ev){var t=ev.target.closest&&(ev.target.closest('.aq-layer-stack__item')||ev.target.closest('.aq-layer-stack__layer')),root=ev.target.closest&&ev.target.closest('.aq-layer-stack');if(root)set(root,t?t.getAttribute('data-ls'):null)});
 document.addEventListener('mouseout',function(ev){var root=ev.target.closest&&ev.target.closest('.aq-layer-stack');if(root&&!root.contains(ev.relatedTarget))set(root,null)});
})();
