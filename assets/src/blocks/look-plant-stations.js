/* Look "plant-stations" -> PlantStations (design-system/components/PlantStations): a grid block of the points water is
   used at in a plant, drawn as an isometric plant room (IsoKit), after pass 12 concept 201 (ind-personal-care.uses,
   take 2). The package stands in the back corner; a dashed route runs from it round the room to one numbered station
   per item, and the station's tag (12 px and up, real HTML over the drawing) is keyed once to the numbered row beside
   it. Each station is drawn by what its item names (a batching vessel for ingredient water, a point of use with its
   hose for a rinse, a bench for a laboratory, a second line for household products; a point of use otherwise), never
   with a label of its own. Pointing at a row lights its station and tag. Up to six stations; items past six are listed
   without one. Phones: the plan, trimmed to the room, then every row (no fold: each row has a tag on the plan).
   Fields (a grid block): h, intro, items [{t, d, link}]. No new fields. */
(function(){
var K='aq-plant-stations',W=360,D=280,HW=72;
/* station slots round the loop (loop: x 120..255, y 100..175 on the floor); drop = the dashed branch to the station */
var SLOT=[{p:[292,60],drop:[[255,100],[292,100],[292,80]]},{p:[300,206],drop:[[255,175],[300,175],[300,194]]},
 {p:[182,240],drop:[[182,175],[182,226]]},{p:[60,194],drop:[[120,175],[82,175]]},
 {p:[62,112],drop:[[120,112],[84,112]]},{p:[330,140],drop:[[255,140],[316,140]]}];
function kind(t){t=String(t||'').toLowerCase();
 if(/household|second line|soap|detergent/.test(t))return 'line';
 if(/\blab|\bqc\b|quality control|testing/.test(t))return 'lab';
 if(/ingredient|batch|emulsion|formulat|mix/.test(t))return 'vessel';
 return 'rinse'}
function g(id,inner){return '<g class="aq-iso__part" data-iso-id="'+id+'">'+inner+'</g>'}
function eq(d,c){return '<path class="aq-iso__eq'+(c?' '+c:'')+'" d="'+d+'"/>'}
function bottles(x,y,z,n,gap){var o='';for(var i=0;i<n;i++){var c=isoCylD([x+i*gap,y,z],'z',9,2.6);o+=eq(c[0]+c[1])}return o}
function station(k,x,y,id){
 if(k==='vessel'){var t=isoPart('tank',x,y,0,0.8,{id:id}),top=t.ports.top||[x,y,62];
  return {svg:t+g(id,eq(isoBoxD([top[0]-5,top[1]-5,top[2]+2],10,10,9))+'<path class="aq-iso__ln" d="'+isoPoly([[top[0],top[1],top[2]+2],[top[0],top[1],top[2]-6]])+'"/>'),top:[top[0],top[1],top[2]+12]}}
 if(k==='lab')return {svg:g(id,eq(isoBoxD([x-30,y-13,0],60,26,30))+'<path class="aq-iso__thin" d="'+isoPoly([[x-30,y+13,22],[x+30,y+13,22]])+'"/>'+bottles(x-16,y-2,30,4,9)),top:[x,y,44]};
 if(k==='line'){var md=isoPart('module',x-6,y,0,0.7,{id:id});
  return {svg:md+g(id,eq(isoBoxD([x+8,y-5,12],44,10,4))+bottles(x+16,y,16,3,11)),top:[x,y,40]}}
 var o=isoPart('outlet',x,y,0,1,{id:id});return {svg:o,top:o.ports.top||[x,y,34]}}
LOOKS['plant-stations']=function(b,H){var I=(b.items||[]),n=Math.min(I.length,SLOT.length);
 /* the room: floor slab, two back walls, the route on the floor */
 var room=eq(isoBoxD([0,0,-6],W,D,6),'aq-iso__eq--alt')
  +eq(isoPoly([[0,0,0],[W,0,0],[W,0,HW],[0,0,HW]],1))+eq(isoPoly([[0,0,0],[0,D,0],[0,D,HW],[0,0,HW]],1))
  +'<path class="aq-iso__thin" d="'+isoPoly([[0,0,HW*0.55],[W,0,HW*0.55]])+isoPoly([[0,0,HW*0.55],[0,D,HW*0.55]])+'"/>';
 var route='<path class="'+K+'__route" d="'+isoPoly([[172,58,0],[172,100,0]])+isoPoly([[120,100,0],[255,100,0],[255,175,0],[120,175,0]],1)+'"/>';
 var drops='';for(var i=0;i<n;i++)drops+='<path class="'+K+'__route '+K+'__drop" data-i="'+i+'" d="'+isoPoly(SLOT[i].drop.map(function(q){return [q[0],q[1],0]}))+'"/>';
 var arrows=isoArrow([200,100,0],'x',{size:7})+isoArrow([255,140,0],'y',{size:7})+isoArrow([150,175,0],'-x',{size:7})+isoArrow([172,80,0],'y',{size:7});
 /* the package in the back corner: RO rack and its tank */
 var ro=isoPart('ro',22,14,0,1,{id:'pkg'}),tk=isoPart('tank',176,36,0,1,{id:'pkg'});
 var pkg=ro+tk;
 /* stations back to front */
 var order=[];for(i=0;i<n;i++)order.push(i);order.sort(function(a,c){return (SLOT[a].p[0]+SLOT[a].p[1])-(SLOT[c].p[0]+SLOT[c].p[1])});
 var st={},parts='';order.forEach(function(i){var s=station(kind(I[i].t),SLOT[i].p[0],SLOT[i].p[1],'st'+i);st[i]=s;parts+=s.svg});
 var bb=isoBounds([[0,0,HW+16],[W,0,HW+16],[0,D,-6],[W,D,-6],[W,0,-6],[0,D,HW+16]],10),org=[-bb.x,-bb.y];
 var svg=isoSvg(bb.w,bb.h,room+route+drops+arrows+pkg+parts,K+'__svg',{origin:org});
 var tags='';for(i=0;i<n;i++){var at=isoPct(isoP(st[i].top),bb.w,bb.h,org);
  tags+='<span class="'+K+'__tag" data-i="'+i+'" style="left:'+at.left+';top:'+at.top+'" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'}
 var rows=I.map(function(it,i){var inner='<span class="'+K+'__no" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><span class="'+K+'__txt"><span class="'+K+'__t">'+tx(it.t)+'</span>'+(it.d?'<span class="'+K+'__d">'+tx(it.d)+'</span>':'')+'</span>';
  var go=it.link&&wp(it.link);
  return '<li class="'+K+'__row" data-i="'+i+'">'+(go?'<a class="'+K+'__in" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+inner+'</a>':'<div class="'+K+'__in">'+inner+'</div>')+'</li>'}).join('');
 return sec(H+'<div class="'+K+'"><div class="'+K+'__plan aq-iso-figure">'+svg+tags+'</div><ol class="'+K+'__rows" role="list">'+rows+'</ol></div>',K+'-sec')};
/* pointing at a row (or focusing its link) lights its station, branch and tag */
function hot(w,i){[].forEach.call(w.querySelectorAll('[data-i]'),function(x){x.classList.toggle('is-hot',x.getAttribute('data-i')===i)});
 [].forEach.call(w.querySelectorAll('.aq-iso__part[data-iso-id^="st"]'),function(p){p.classList.toggle('is-lit',i!=null&&p.getAttribute('data-iso-id')==='st'+i)})}
if(typeof document!=='undefined'){
 var over=function(ev){var t=ev.target.closest&&ev.target.closest('.'+K+'__row');if(!t)return;var w=t.closest('.'+K);hot(w,t.getAttribute('data-i'))};
 var out=function(ev){var w=ev.target.closest&&ev.target.closest('.'+K);if(w&&!w.contains(ev.relatedTarget))hot(w,null)};
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);document.addEventListener('mouseout',out);document.addEventListener('focusout',out)}
})();
