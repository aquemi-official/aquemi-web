/* Look "loop-circuit" -> LoopCircuit (design-system/components/LoopCircuit): how a storage and distribution loop works,
   drawn as one blueprint P&ID strip on a navy band under a display-scale headline (pass 9b concept sys-storage.1).
   The strip is cut into one column per stage and every station stands over its own caption: generation feed with its
   isolating valve, the tank in section (vent filter, water level, spray ball), loop pump, shell-and-tube exchanger,
   the points of use on short drops, the return sensors (CE, TE, FE and a dashed AE for TOC), and the return riser
   with a detail of the spray ball wetting the tank head. The column rules run up through the drawing; the captions sit
   on a numbered row underneath. Pointing at a caption lights its station.
   Phones (pass 12, S10): the strip turns into a vertical circuit: the supply pipe runs down the left edge through the
   stations (generation, tank, pump, exchanger, outlets, return sensors), turns at the foot and the return comes back up
   the right edge past the spray ball's marker into the tank head; each stop's text sits between the two pipes.
   Fields (a diagram block): h, stages (or items) [{t, d, spot | icon, node}]. node: which station of the strip the
   stage is: gen, tank, pump, hx, pou, sensors, spray (default by position in that order). */
(function(){
var NODE=['gen','tank','pump','hx','pou','sensors','spray'];
/* the point on the water's route where each station sits (the scroll marker lights the station there) */
var AT={gen:[60,300],tank:[282,200],pump:[500,300],hx:[700,300],pou:[900,300],sensors:[1100,300],spray:[340,96]};
var Y=300,FEED='M0 '+Y+'H120V40H262V78',LOOP='M300 262V'+Y+'H1290A40 40 0 0 0 1330 260V64A40 40 0 0 0 1290 24H340V72',
 ROUTE=FEED+'V250H300V'+Y+'H1290A40 40 0 0 0 1330 260V64A40 40 0 0 0 1290 24H340V96';
var K='aq-loop-circuit';function P(d,c,x){return '<path class="'+K+'__'+c+'"'+(x||'')+' d="'+d+'"/>'}
function C(x,y,r,c){return '<circle class="'+K+'__'+c+'" cx="'+x+'" cy="'+y+'" r="'+r+'"/>'}
function valve(x,y,v){return v?P('M'+(x-8)+' '+(y-9)+'H'+(x+8)+'L'+(x-8)+' '+(y+9)+'H'+(x+8)+'Z','eq'):P('M'+(x-9)+' '+(y-8)+'V'+(y+8)+'L'+(x+9)+' '+(y-8)+'V'+(y+8)+'Z','eq')}
function strip(){
 var g='';
 /* column rules: the caption grid runs up through the drawing */
 for(var i=1;i<7;i++)g+=P('M'+i*200+' 0V400','col');
 /* pipes, the water over them (filled on scroll), equipment on top */
 g+=P(FEED,'pipe')+P(LOOP,'pipe')+P(FEED,'flow aq-loop-circuit__flow--feed')+P(LOOP,'flow aq-loop-circuit__flow--loop');
 g+='<path class="'+K+'__route" d="'+ROUTE+'"/>';
 [[180,Y,'r'],[1220,Y,'r'],[1330,170,'u'],[1000,24,'l'],[600,24,'l'],[120,170,'u']].forEach(function(a){var x=a[0],y=a[1],d=a[2]==='r'?'M'+(x-5)+' '+(y-6)+'l8 6l-8 6':a[2]==='l'?'M'+(x+5)+' '+(y-6)+'l-8 6l8 6':'M'+(x-6)+' '+(y+5)+'l6 -8l6 8';g+=P(d,'chev')});
 /* 01 generation: incoming PW, isolating valve, flow arrow */
 g+='<g class="'+K+'__node" data-node="gen">'+valve(64,Y)+P('M64 292V276M56 276H72','ln')+P('M0 '+(Y-14)+'V'+(Y+14),'thin')+'</g>';
 /* 02 tank in section: dished head, vent filter, level and water, nozzles */
 var tank='<g class="'+K+'__node" data-node="tank">'
  +P('M230 110C230 80 260 66 300 66C340 66 370 80 370 110V240C370 256 340 262 300 262C260 262 230 256 230 240Z','eq')
  +'<g class="'+K+'__water">'+P('M234 150H366','level');
 for(var y=164;y<=246;y+=14)tank+=P('M'+(y>236?246:234)+' '+y+'H'+(y>236?354:366),'hatch');
 tank+='</g>'+P('M300 66V46','ln')+P('M288 14H312V46H288Z','eq')+P('M294 20V40M300 20V40M306 20V40','thin')+P('M300 14V4','thin')
  +P('M244 262L238 292M356 262L362 292M226 292H252M348 292H374','thin')+'</g>';
 /* 07 spray ball inside the head, fed by the return */
 var jets=[[244,140],[252,160],[276,150],[300,146],[324,150],[348,160],[356,140],[262,118],[338,118]];
 var spray='<g class="'+K+'__node" data-node="spray">'+P('M340 72V92L308 104','hid')
  +'<g class="'+K+'__spray">'+jets.map(function(q){return P('M300 108L'+q[0]+' '+q[1],'jet')}).join('')+'</g>'+C(300,108,7,'eq')
  /* detail on the return riser: the ball wetting the head, enlarged */
  +C(1240,170,62,'det')+P('M1198 140C1218 126 1262 126 1282 140','thin')
  +'<g class="'+K+'__spray">'+[[1186,196],[1200,216],[1224,226],[1240,228],[1256,226],[1280,216],[1294,196],[1194,160],[1286,160]].map(function(q){return P('M1240 168L'+q[0]+' '+q[1],'jet')}).join('')+'</g>'
  +P('M1240 108V154','ln')+C(1240,168,13,'eq')+C(1235,164,2.5,'pt')+C(1246,172,2.5,'pt')+C(1242,160,2.5,'pt')
  +'<text class="'+K+'__tx" x="1240" y="94">A</text><text class="'+K+'__tx" x="278" y="98">A</text></g>';
 /* 03 loop pump */
 var pump='<g class="'+K+'__node" data-node="pump">'+C(500,Y,24,'eq')+P('M476 '+(Y-24)+'H500','ln')+P('M490 '+(Y-12)+'L514 '+Y+'L490 '+(Y+12)+'Z','ln')+P('M478 '+(Y+22)+'L470 '+(Y+40)+'H530L522 '+(Y+22),'thin')+'</g>';
 /* 04 shell-and-tube exchanger: tubes, tube sheets, utility nozzles */
 var hx='<g class="'+K+'__node" data-node="hx">'+P('M652 '+(Y-18)+'H748V'+(Y+18)+'H652Z','eq')+P('M664 '+(Y-18)+'V'+(Y+18)+'M736 '+(Y-18)+'V'+(Y+18),'ln')
  +P('M664 '+(Y-8)+'H736M664 '+Y+'H736M664 '+(Y+8)+'H736','thin')+P('M684 '+(Y-18)+'V'+(Y-36)+'M716 '+(Y+18)+'V'+(Y+36),'thin')+'</g>';
 /* 05 points of use: zero-static valves on short drops, each with its outlet */
 var pou='<g class="'+K+'__node" data-node="pou">'+[850,900,950].map(function(x){
  return P('M'+x+' '+Y+'V'+(Y+14),'ln')+valve(x,Y+23,1)+P('M'+(x-8)+' '+(Y+23)+'H'+(x-18),'thin')+P('M'+x+' '+(Y+32)+'V'+(Y+48),'ln')+P('M'+x+' '+(Y+56)+'q-3 5 0 8q3-3 0-8','drop')}).join('')+'</g>';
 /* 06 return sensors: conductivity, temperature, flow, TOC (dashed: standard or option) */
 var sens='<g class="'+K+'__node" data-node="sensors">'+[['CE',1040],['TE',1080],['FE',1120],['AE',1160]].map(function(q,i){
  return P('M'+q[1]+' '+(Y-34)+'V'+Y,'ln')+C(q[1],Y-50,16,'eq'+(i===3?' is-opt':''))+'<text class="'+K+'__tx" x="'+q[1]+'" y="'+(Y-46)+'">'+q[0]+'</text>'}).join('')+'</g>';
 g+=tank+spray+pump+hx+pou+sens;
 return '<svg class="'+K+'__svg" viewBox="0 0 1400 400" aria-hidden="true" focusable="false">'+g+'</svg>'}
LOOKS['loop-circuit']=function(b,H){
 var I=b.stages||b.items||[],n=I.length,nodes=I.map(function(it,i){return it.node||NODE[i]||''}),nums=I.map(function(it,i){return (i<9?'0':'')+(i+1)});
 var at=nodes.map(function(id){return AT[id]?AT[id].join(','):''});
 var list=I.map(function(it,i){var g=wSpot(it.spot||it.icon,'','aq-spot--on-navy aq-loop-circuit__glyph');
  var pipes='<span class="'+K+'__sp" aria-hidden="true"></span><span class="'+K+'__rp" aria-hidden="true"></span>'
   +(nodes[i]==='tank'?'<span class="'+K+'__tt" aria-hidden="true"></span><span class="'+K+'__ts" aria-hidden="true"></span>':'')+(i===n-1?'<span class="'+K+'__bt" aria-hidden="true"></span>':'');
  return '<li class="'+K+'__stage" data-node="'+e(nodes[i])+'" data-at="'+at[i]+'">'+pipes+'<span class="'+K+'__mark" aria-hidden="true">'+g+'</span>'
   +'<p class="'+K+'__no" aria-hidden="true">'+nums[i]+'</p><h3 class="'+K+'__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 var html=sec(H+'<div class="'+K+'" style="--n:'+n+'"><div class="'+K+'__strip">'+strip()+'</div><ol class="'+K+'__stages" role="list">'+list+'</ol></div>','aq-band--navy aq-loop-circuit-sec');
 return html.replace(/^<section class="([^"]*)"/,'<section class="$1" data-theme="dark"')};
/* Pointing at a stage lights its station on the strip (colour only) */
function hl(ev,on){var s=ev.target.closest&&ev.target.closest('.aq-loop-circuit__stage');if(!s||s.contains(ev.relatedTarget))return;var r=s.closest('.aq-loop-circuit'),id=s.getAttribute('data-node');
 [].forEach.call(r.querySelectorAll('.aq-loop-circuit__svg [data-node="'+id+'"]'),function(el){el.classList.toggle('is-hot',on)});s.classList.toggle('is-hot',on)}
document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)});
})();
