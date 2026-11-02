/* Look "washer-trace" -> WasherTrace (design-system/components/WasherTrace): an explainer (prose, as "explainer")
   told as the water's way from the loop into the machine, on a limestone sheet. One IsoKit line drawing (pass 9b,
   concept ind-meddevice.1): the loop comes in at floor level, a pump lifts it into a header, the header carries a
   diaphragm valve and drops into the washer through a sample point, and the water runs on into the wash chamber
   (the washer is drawn here from IsoKit primitives: the kit has no washer part). Each point is a callout on a leader
   from its part (point 1 at the header, 2 at the sample point, 3 in the chamber). Over the drawing, a navy readout:
   a ruler of the route from the loop to the chamber with each point marked where it sits along the water's way, a
   cursor at the water's reach, the reached point's number set huge and its name in an outlined tag.
   Each callout's title is a button: pointing at it or focusing it runs the water to that point (motion.js).
   Fields: h, intro, points [{t, d}] (the first three take the drawing's stations in order; at and figure are not
   used by this look). Concept: ind-meddevice.1 (route schematic with three stations under a navy flow readout). */
(function(){
var K=1.3;
function wtWasher(){var b=isoB(0,0,0,1,0),W=150,D=120,H=165,f=D;
 b.box(0,0,0,W,D,H);
 /* control strip with a display and a status line */
 b.rect('y',14,140,W-14,158,f);b.rect('y',22,144,62,154,f,'aq-iso__eq aq-iso__eq--glass');b.line([96,f,149],[130,f,149],'aq-iso__acc');
 /* the chamber opening and its door frame */
 b.rect('y',14,14,W-14,134,f);b.rect('y',20,20,W-20,128,f,'aq-iso__eq aq-iso__eq--alt');
 return b.done('washer',{id:'chamber'})}
/* the wash chamber seen through the opening: back wall, floor, left wall, a rack and the spray arm, clipped to the opening */
function wtCavity(){var x0=20,x1=130,z0=20,z1=128,yf=120,yb=34,P=function(p){return isoT(isoP(p))};
 var clip='M'+P([x0,yf,z0])+'L'+P([x1,yf,z0])+'L'+P([x1,yf,z1])+'L'+P([x0,yf,z1])+'Z';
 var back=isoPoly([[x0,yb,z0],[x1,yb,z0],[x1,yb,z1],[x0,yb,z1]],1),floor=isoPoly([[x0,yb,z0],[x1,yb,z0],[x1,yf,z0],[x0,yf,z0]],1),left=isoPoly([[x0,yb,z0],[x0,yf,z0],[x0,yf,z1],[x0,yb,z1]],1);
 /* two instrument baskets on their racks, wire mesh on the fronts */
 var rack='';[[48,22],[86,20]].forEach(function(q){var z=q[0];rack+=isoBoxD([32,48,z],86,60,q[1])+isoPoly([[x0,48,z],[x1,48,z]]);
  for(var i=1;i<8;i++){var u=32+i*86/8;rack+=isoPoly([[u,108,z],[u,108,z+q[1]]])}rack+=isoPoly([[32,108,z+q[1]/2],[118,108,z+q[1]/2]])});
 var arm=isoPoly([[40,70,34],[118,70,34]]),jets='';for(var j=0;j<5;j++){var a=48+j*16;jets+=isoPoly([[a,70,36],[a,70,42]])}
 return '<defs><clipPath id="wt-cav"><path d="'+clip+'"/></clipPath></defs><g clip-path="url(#wt-cav)" class="aq-iso__part" data-iso-id="chamber">'
  +isoPath(back,'aq-iso__eq aq-iso__eq--alt')+isoPath(floor,'aq-iso__eq aq-iso__eq--alt')+isoPath(left,'aq-iso__eq')+isoPath(rack,'aq-iso__thin')+isoPath(arm+jets,'aq-iso__ln')
  +'<path class="aq-iso__flow" data-iso-to="chamber" d="M'+P([110,70,128])+'L'+P([110,70,40])+'L'+P([46,70,40])+'"/></g>'}
function wtScene(){
 var pu=isoPart('pump',-200,60,0,1.6,{id:'loop'}),pi=pu.ports.in,po=pu.ports.out,y0=po[1],zH=235,xd=110,xv=40;
 var p1=isoPipe([[-380,pi[1],pi[2]],pi],{r:3.4,id:'loop',to:'loop',caps:'start',flanges:'ends'});
 var p2=isoPipe([po,[po[0],y0,zH],[xv,y0,zH]],{r:3.4,id:'loop',to:'inlet',caps:false,flanges:'ends'});
 var p3=isoPipe([[xv,y0,zH],[xd,y0,zH],[xd,y0,165]],{r:3.4,id:'inlet',to:'chamber',caps:false,flanges:'ends'});
 var vl=isoPart('valve',xv,y0,zH,1.6,{id:'inlet'});
 var sp=isoPipe([[xd,y0,198],[xd,y0+24,198]],{r:1.6,id:'inlet',flow:false,caps:'end'}),sv=isoPart('valve',xd,y0+18,198,0.9,{id:'inlet',type:'ball',rot:1});
 var inner=[p1,pu,wtWasher(),p2,p3,wtCavity(),vl,sp,sv,isoArrow([-330,pi[1],pi[2]],'x',{size:7}),isoArrow([-60,y0,zH],'x',{size:7})].join('');
 /* the stations: where each point's leader starts (3D), and the route length to it (screen, for the readout's ruler) */
 var A=[[po[0],y0,zH],[xd,y0+24,198],[80,70,52]];
 function L2(pts){var s=0;for(var i=1;i<pts.length;i++){var a=isoP(pts[i-1]),c=isoP(pts[i]);s+=Math.hypot(c[0]-a[0],c[1]-a[1])}return s}
 var l1=L2([[-380,pi[1],pi[2]],pi]),l2=L2([po,[po[0],y0,zH],[xv,y0,zH]]),l3=L2([[xv,y0,zH],[xd,y0,zH],[xd,y0,165]])+L2([[110,70,128],[110,70,40],[46,70,40]]);
 var T=l1+l2+l3,stops=[l1/T,(l1+l2)/T,1];
 return {inner:inner,A:A,stops:stops}}
LOOKS['washer-trace']=function(b,H){var P=(b.points||[]).slice(0,3),n=P.length,S=wtScene(),W=1200,HH=680,org=[640,470];
 function at(p){var q=isoP(p);return [org[0]+q[0]*K,org[1]+q[1]*K]}
 /* leaders in viewBox space: 1 left from the header, 2 and 3 right to the callout column */
 var X=[330,860,860],Y=[null,null,526],ends=[],lead='';
 S.A.slice(0,n).forEach(function(a,i){var s=at(a),y=Y[i]==null?s[1]:Y[i],e=[X[i],y],mid=i===2?[s[0]+(y-s[1])*0.9,y]:e;
  lead+='<g class="aq-washer-trace__lead" data-k="'+i+'"><path d="M'+isoF(s[0])+' '+isoF(s[1])+'L'+isoF(mid[0])+' '+isoF(mid[1])+'L'+isoF(e[0])+' '+isoF(e[1])+'"/><circle cx="'+isoF(s[0])+'" cy="'+isoF(s[1])+'" r="3.2"/></g>';
  ends.push({x:e[0]/W*100,y:e[1]/HH*100,sx:s[0]/W*100,sy:s[1]/HH*100})});
 var svg='<svg class="aq-iso aq-iso--limestone aq-washer-trace__svg" viewBox="0 0 '+W+' '+HH+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">'
  +'<g transform="translate('+org[0]+' '+org[1]+') scale('+K+')">'+S.inner+'</g><g class="aq-washer-trace__leads">'+lead+'</g></svg>';
 var nums=P.map(function(p,i){return '<span class="aq-washer-trace__pin" data-k="'+i+'" style="left:'+ends[i].sx.toFixed(2)+'%;top:'+ends[i].sy.toFixed(2)+'%" aria-hidden="true">'+(i+1)+'</span>'}).join('');
 var pts=P.map(function(p,i){var E=ends[i];return '<li class="aq-washer-trace__pt'+(i===0?' is-left':'')+'" data-k="'+i+'" style="--x:'+E.x.toFixed(2)+'%;--y:'+E.y.toFixed(2)+'%">'
  +'<span class="aq-washer-trace__n" aria-hidden="true">0'+(i+1)+'</span><h3 class="aq-washer-trace__t"><button type="button" class="aq-washer-trace__go" data-k="'+i+'">'+tx(p.t)+'</button></h3>'
  +(p.d?'<p class="aq-washer-trace__d">'+tx(p.d)+'</p>':'')+'</li>'}).join('');
 /* readout: ruler ticks, the stations marked where they sit along the route, the reached point huge */
 var ticks='';for(var t=0;t<=40;t++)ticks+='<path d="M'+(t*10)+' '+(t%5?14:8)+'V22"/>';
 var marks=P.map(function(p,i){return '<span class="aq-washer-trace__mark" data-k="'+i+'" style="left:'+(S.stops[i]*100).toFixed(2)+'%">0'+(i+1)+'</span>'}).join('');
 var last=P[n-1]||{t:''};
 var read='<div class="aq-washer-trace__read" aria-hidden="true" style="--reach:1"><div class="aq-washer-trace__ruler"><svg viewBox="0 0 400 22" preserveAspectRatio="none" focusable="false">'+ticks+'</svg>'+marks+'<span class="aq-washer-trace__cur"></span></div>'
  +'<p class="aq-washer-trace__big"><span class="aq-washer-trace__rn">0'+n+'</span><span class="aq-washer-trace__of">/ 0'+n+'</span></p><p class="aq-washer-trace__tag">'+tx(last.t)+'</p></div>';
 return sec(H+'<div class="aq-washer-trace" data-stops="'+S.stops.map(function(s){return s.toFixed(4)}).join(' ')+'"><div class="aq-washer-trace__fig"><div class="aq-washer-trace__draw">'+svg+nums+'</div>'+read+'</div><ol class="aq-washer-trace__pts">'+pts+'</ol></div>','aq-band--limestone aq-washer-trace-sec')};
})();
