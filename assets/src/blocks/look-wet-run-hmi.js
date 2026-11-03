/* Look "wet-run-hmi" -> WetRunHmi (design-system/components/WetRunHmi): an explainer (prose, as "explainer") read
   along the test bay's water route. On a navy blueprint ground, one continuous double-wall pipe runs across the
   section and folds down and back up: feed, pump and reverse osmosis, the three-way divert valve with its branch to
   drain (the first point), the outlet's conductivity and TOC elements on the low run (the second), and the data
   record on the last run (the third). Each point sits beside its station, so the pipe is the reading path. A
   two-position switch beside the heading runs the same skid dry or with water: dry, the pipe stays empty, the
   readouts blank and the station markers unlit; with water, the water runs the route, the readouts trace and each
   marker lights as the water reaches its station.
   Fields (a prose block): h, points [{t, d, part, x, y}] (part: "divert", "outlet" or "record", the station the point
   is about; a point without one takes the next free part; x, y optional: the text block's top left in % of the
   drawing, default per part), modes [dry label, wet label] (the switch's two words, default "Dry", "Water").
   at and figure are the fallback renderer's and are ignored here.
   Up to tablet width the route turns vertical: one pipe down the left, the numbered markers on it, the points beside,
   under a compact strip of the skid (pass 12, wrhStrip) that the switch runs dry or with water. */
var WRH_ST={divert:{m:[320,44],p:[320,90],t:[2,44]},outlet:{m:[590,428],p:[590,380],t:[37,3]},record:{m:[878,34],p:[980,90],t:[70,30]}};
var WRH_ROUTE='M0 90H376Q400 90 400 114V356Q400 380 424 380H776Q800 380 800 356V114Q800 90 824 90H1200';
function wrhRoute(){
 var P='aq-wet-run-hmi'+'__',eq=P+'eq',th=P+'thin',tg=P+'tag';
 function L(d,c){return '<path class="'+c+'" d="'+d+'"/>'}
 function T(x,y,s,a){return '<text class="'+tg+'" x="'+x+'" y="'+y+'"'+(a?' text-anchor="'+a+'"':'')+'>'+s+'</text>'}
 var s='';
 /* the pipe: wall, bore, then the water over it (one path, so the water runs the whole route in order) */
 s+=L(WRH_ROUTE,P+'wall')+L(WRH_ROUTE,P+'bore');
 /* branch to drain under the divert valve */
 s+=L('M320 102V150',P+'wall')+L('M320 102V150',P+'bore')+L('M304 158H336M309 165H331M315 172H325',th)+T(344,170,'DRAIN');
 s+=L(WRH_ROUTE,P+'water');
 /* feed and outlet arrows */
 s+=L('M14 78L28 90L14 102',th)+L('M1180 78L1194 90L1180 102',th);
 /* pump */
 s+='<circle class="'+eq+'" cx="76" cy="90" r="22"/>'+L('M64 75L94 90L64 105',th)+T(76,140,'PUMP','middle');
 /* RO */
 s+='<rect class="'+eq+'" x="132" y="64" width="128" height="52"/>'+L('M132 116L260 64',th)+T(196,140,'RO','middle');
 /* three-way divert valve: two triangles on the run, the third to the drain branch, actuator on top */
 s+='<path class="'+eq+'" d="M300 78L320 90L300 102ZM340 78L320 90L340 102ZM308 112L320 90L332 112Z"/>'+L('M320 90V64M308 64H332',th);
 /* outlet elements on the low run: conductivity and TOC on stems, readout bars over them */
 [[548,'COND'],[632,'TOC']].forEach(function(b,i){s+=L('M'+b[0]+' 368V340',th)+'<circle class="'+eq+'" cx="'+b[0]+'" cy="318" r="22"/>'+T(b[0],323,b[1],'middle')
  +'<rect class="'+P+'rd" x="'+(b[0]-22)+'" y="278" width="44" height="6"/><rect class="'+P+'rdv" x="'+(b[0]-22)+'" y="278" width="'+(i?26:34)+'" height="6"/>'});
 /* the record on the last run: a logger with its trend window */
 s+=L('M980 78V64',th)+'<rect class="'+eq+'" x="904" y="4" width="220" height="60"/>';
 s+='<polyline class="'+P+'flat" points="918,44 1006,44"/>';
 s+='<polyline class="'+P+'trend" points="918,46 926,40 934,42 942,34 950,38 958,30 966,34 974,28 982,32 990,26 998,30 1006,27"/>';
 s+=L('M1024 22H1108M1024 34H1096M1024 46H1104',P+'log');
 return '<svg class="'+P+'svg" viewBox="0 0 1200 460" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">'+s+'</svg>'}
/* pass 12: the compact strip shown up to tablet width (the wide route is hidden there): the same skid in 360 x 150
   units at about 1:1 on a phone, so its tags read at 12 px or more: feed, pump, RO, the divert valve with its drain,
   COND and TOC on the outlet with their readouts, the logger with its trend, and the points' numbers on their
   stations (markers keyed by part). Same classes as the wide route, so the dry / water switch drives it the same way. */
function wrhStrip(parts){
 var P='aq-wet-run-hmi'+'__',eq=P+'eq',th=P+'thin',tg=P+'tag',R='M0 72H360';
 function L(d,c){return '<path class="'+c+'" d="'+d+'"/>'}
 function T(x,y,s,a){return '<text class="'+tg+'" x="'+x+'" y="'+y+'"'+(a?' text-anchor="'+a+'"':'')+'>'+s+'</text>'}
 var s=L(R,P+'wall')+L(R,P+'bore')+L('M150 80V112',P+'wall')+L('M150 80V112',P+'bore')+L(R,P+'water');
 s+=L('M2 64L10 72L2 80',th)+L('M350 64L358 72L350 80',th);
 s+='<circle class="'+eq+'" cx="30" cy="72" r="13"/>'+L('M23 63L41 72L23 81',th)+T(30,104,'PUMP','middle');
 s+='<rect class="'+eq+'" x="56" y="58" width="62" height="28"/>'+L('M56 86L118 58',th)+T(87,104,'RO','middle');
 s+='<path class="'+eq+'" d="M138 64L150 72L138 80ZM162 64L150 72L162 80ZM143 84L150 72L157 84Z"/>'+L('M150 72V56M142 56H158',th);
 s+=L('M138 118H162M142 124H158M146 130H154',th)+T(150,146,'DRAIN','middle');
 [[198,'COND'],[240,'TOC']].forEach(function(b,i){s+=L('M'+b[0]+' 64V44',th)+'<circle class="'+eq+'" cx="'+b[0]+'" cy="36" r="8"/>'
  +'<rect class="'+P+'rd" x="'+(b[0]-16)+'" y="14" width="32" height="5"/><rect class="'+P+'rdv" x="'+(b[0]-16)+'" y="14" width="'+(i?19:25)+'" height="5"/>'+T(b[0],100,b[1],'middle')});
 s+=L('M318 64V52',th)+'<rect class="'+eq+'" x="284" y="10" width="68" height="42"/><polyline class="'+P+'flat" points="290,38 346,38"/>'
  +'<polyline class="'+P+'trend" points="290,40 297,34 304,36 311,28 318,32 325,24 332,28 339,21 346,24"/>';
 var at={divert:[150,30],outlet:[219,128],record:[318,104]};
 parts.forEach(function(k,i){var a=at[k];if(!a)return;s+='<g class="'+P+'smk" data-part="'+k+'"><circle cx="'+a[0]+'" cy="'+a[1]+'" r="12"/><text x="'+a[0]+'" y="'+a[1]+'" text-anchor="middle" dominant-baseline="central">'+(i<9?'0':'')+(i+1)+'</text></g>'});
 return '<svg class="'+P+'strip" viewBox="0 0 360 150" aria-hidden="true" focusable="false">'+s+'</svg>'}
LOOKS['wet-run-hmi']=function(b,H){var Pt=b.points||[],M=b.modes||['Dry','Water'],used={},free=['divert','outlet','record'];
 var parts=Pt.map(function(p){var k=WRH_ST[p.part]?p.part:'';if(!k||used[k])k=free.filter(function(f){return !used[f]})[0]||'record';used[k]=1;return k});
 function pc(v){return (Math.round(v/12*10)/10)+'%'}
 function n2(i){return (i<9?'0':'')+(i+1)}
 var marks=Pt.map(function(p,i){var a=WRH_ST[parts[i]].m;return '<span class="aq-wet-run-hmi__mk" data-part="'+parts[i]+'" style="left:'+pc(a[0])+';top:'+(Math.round(a[1]/4.6*10)/10)+'%" aria-hidden="true">'+n2(i)+'</span>'}).join('');
 var list=Pt.map(function(p,i){var t=WRH_ST[parts[i]].t,x=p.x!=null?+p.x:t[0],y=p.y!=null?+p.y:t[1];
  return '<li class="aq-wet-run-hmi__pt" data-part="'+parts[i]+'" tabindex="0" style="left:'+x+'%;top:'+y+'%">'
  +'<span class="aq-wet-run-hmi__n" aria-hidden="true">'+n2(i)+'</span>'
  +'<h3 class="aq-wet-run-hmi__t">'+tx(p.t)+'</h3>'+(p.d?'<p class="aq-wet-run-hmi__d">'+tx(p.d)+'</p>':'')+'</li>'}).join('');
 var sw='<div class="aq-wet-run-hmi__switch" role="group" aria-label="'+e(M[0]+' / '+M[1])+'"><span class="aq-wet-run-hmi__thumb" aria-hidden="true"></span>'
  +'<button type="button" class="aq-wet-run-hmi__mode" data-wrh-mode="dry" aria-pressed="false">'+tx(M[0])+'</button>'
  +'<button type="button" class="aq-wet-run-hmi__mode" data-wrh-mode="wet" aria-pressed="true">'+tx(M[1])+'</button></div>';
 return '<section class="aq-section aq-wet-run-hmi-sec" data-theme="dark"><div class="aq-in"><div class="aq-wet-run-hmi is-wet">'
  +'<div class="aq-wet-run-hmi__head">'+H+sw+'</div>'
  +'<div class="aq-wet-run-hmi__fig">'+wrhRoute()+marks+wrhStrip(parts)+'<ol class="aq-wet-run-hmi__pts">'+list+'</ol></div></div></div></section>'};
/* the switch: dry or with water (the page reads complete in the "with water" state without script); arrow keys move
   between the two positions. wrhMode is shared with motion.js. */
function wrhMode(w,wet){if(!w)return;w.classList.toggle('is-wet',wet);w.classList.toggle('is-dry',!wet);
 [].forEach.call(w.querySelectorAll('[data-wrh-mode]'),function(x){x.setAttribute('aria-pressed',(x.getAttribute('data-wrh-mode')==='wet')===wet?'true':'false')})}
window.wrhMode=wrhMode;window.WRH_ST=WRH_ST;
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('[data-wrh-mode]');if(!t)return;wrhMode(t.closest('.aq-wet-run-hmi'),t.getAttribute('data-wrh-mode')==='wet')});
document.addEventListener('keydown',function(ev){var t=ev.target.closest&&ev.target.closest('[data-wrh-mode]');if(!t||!/^(ArrowLeft|ArrowRight|Home|End)$/.test(ev.key))return;
 ev.preventDefault();var wet=ev.key==='ArrowRight'||ev.key==='End',o=t.parentNode.querySelector('[data-wrh-mode="'+(wet?'wet':'dry')+'"]');if(o){o.focus();o.click()}});
