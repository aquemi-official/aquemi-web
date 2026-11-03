/* Look "train-strip" -> TrainStrip (design-system/components/TrainStrip): one treatment train as a P&ID strip on a
   navy band (pass 12 concept 211). Left to right on one line: the feed through PVC pretreatment housings (grey
   pipe), duplex RO in parallel (two membrane symbols, each behind its own valve), the storage tank, the loop pump and
   UV, the heat exchanger, the endotoxin filter housing, then the PP loop (pale pipe): isolation valves either side of
   the points of use, drops to three taps, the return sensors (a CE bubble and a sample valve), a sanitization port,
   and the return overhead back to the tank top. Every valve is a PP diaphragm valve symbol (body and bonnet, no
   flanges). A numbered marker stands under each station; one numbered caption per stage runs under the strip.
   Pointing at a caption or a station lights the other.
   Fields (a diagram block): h, intro, stages [{t, d, node}]. node: the station the stage is: gen, tank, pump, hx,
   pou, sensors, spray (default by position in that order). The strip is fixed (one train); it carries no copy
   except the P&ID material tags PVC and PP and the CE instrument letters.
   Phones: a riser: the pipe down the left with a P&ID symbol per stage on it (RO, tank, pump, exchanger, valve, CE
   bubble, capped port), one row per stage (number, name, line); every stage shown, no fold. */
(function(){
var K='aq-train-strip',NODE=['gen','tank','pump','hx','pou','sensors','spray'];
var AT={gen:[185,222],tank:[330,250],pump:[505,250],hx:[700,268],pou:[970,290],sensors:[1140,250],spray:[1290,284]};
function P(d,c){return '<path class="'+K+'__'+c+'" d="'+d+'"/>'}
function C(x,y,r,c){return '<circle class="'+K+'__'+c+'" cx="'+x+'" cy="'+y+'" r="'+r+'"/>'}
function T(x,y,t,c){return '<text class="'+K+'__'+(c||'tag')+'" x="'+x+'" y="'+y+'">'+t+'</text>'}
/* PP diaphragm valve: bow-tie body, domed bonnet, no flanges; v: on a vertical line */
function valve(x,y,v){return v?P('M'+(x-8)+' '+(y-8)+'H'+(x+8)+'L'+(x-8)+' '+(y+8)+'H'+(x+8)+'Z','eq')+P('M'+(x+8)+' '+(y-5)+'a5 5 0 0 1 0 10','ln')
 :P('M'+(x-8)+' '+(y-8)+'V'+(y+8)+'L'+(x+8)+' '+(y-8)+'V'+(y+8)+'Z','eq')+P('M'+(x-5)+' '+(y-8)+'a5 5 0 0 1 10 0','ln')}
function ro(x,y){return P('M'+x+' '+(y-12)+'h70v24h-70Z','eq')+P('M'+x+' '+(y+12)+'L'+(x+70)+' '+(y-12),'ln')}
function strip(){var g='';
 /* pipes: PVC feed and pretreatment (grey), PP from the RO on (pale), the water over them */
 g+=P('M0 170H110','pvc')+P('M110 170V130H250V170M110 170V210H250V170M250 170H300','pp');
 g+=P('M330 230V250H1360V40H330V70','pp '+K+'__loop');
 /* 01 generation: two PVC pretreatment housings, then duplex RO in parallel */
 g+='<g class="'+K+'__node" data-ts="gen">'+P('M30 200V146q0-10 10-10t10 10V200Z','eq '+K+'__pvceq')+P('M66 200V146q0-10 10-10t10 10V200Z','eq '+K+'__pvceq')
  +valve(132,130)+valve(132,210)+ro(152,130)+ro(152,210)+T(28,228,'PVC')+'</g>';
 /* 02 storage tank (domed head, level, return inlet) */
 g+='<g class="'+K+'__node" data-ts="tank">'+P('M300 230V92q0-22 30-22t30 22V230Z','eq')+P('M306 130H354','level')+P('M310 230v12M350 230v12','ln')+'</g>';
 /* 03 loop pump and UV */
 g+='<g class="'+K+'__node" data-ts="pump">'+C(450,250,18,'eq')+P('M443 239L462 250L443 261Z','ln')+P('M436 268h28','ln')
  +P('M530 236h60v28h-60Z','eq')+P('M540 258l14-16 4 8 14-14','ln')+P('M566 234l6-2-1 6','ln')+'</g>';
 /* 04 heat exchanger */
 g+='<g class="'+K+'__node" data-ts="hx">'+C(700,250,18,'eq')+P('M684 250l5-8 6 16 6-16 6 16 5-8','ln')+'</g>';
 /* 05 endotoxin filter housing, isolation valves either side of the points of use, three taps */
 g+='<g class="'+K+'__node" data-ts="pou">'+P('M808 276V232q0-10 12-10t12 10V276Z','eq')+P('M820 284V276','ln')
  +valve(880,250)+valve(1060,250);
 [920,970,1020].forEach(function(x){g+=P('M'+x+' 250V286','pp')+valve(x,270,1)+P('M'+(x-5)+' 290h10','ln')});
 g+='</g>'+T(1000,30,'PP');
 /* 06 return sensors: conductivity bubble and a sample valve */
 g+='<g class="'+K+'__node" data-ts="sensors">'+P('M1120 250V224','ln')+C(1120,210,14,'eq')+T(1120,214,'CE','ce')+P('M1170 250V270','pp')+valve(1170,270,1)+'</g>';
 /* 07 sanitization port: capped tee with its valve */
 g+='<g class="'+K+'__node" data-ts="spray">'+P('M1290 250V284','pp')+valve(1290,268,1)+P('M1282 286h16','cap')+'</g>';
 /* flow arrows */
 [[770,250,'r'],[1230,250,'r'],[900,40,'l'],[600,40,'l']].forEach(function(a){var x=a[0],y=a[1];g+=P(a[2]==='r'?'M'+(x-6)+' '+(y-7)+'l9 7l-9 7':'M'+(x+6)+' '+(y-7)+'l-9 7l9 7','chev')});
 return g}
var GLYPH={
 gen:'<path class="'+K+'__eq" d="M4 10h24v12H4Z"/><path class="'+K+'__ln" d="M4 22L28 10"/>',
 tank:'<path class="'+K+'__eq" d="M8 28V9q0-6 8-6t8 6v19Z"/><path class="'+K+'__level" d="M10 14h12"/>',
 pump:'<circle class="'+K+'__eq" cx="16" cy="16" r="11"/><path class="'+K+'__ln" d="M12 9.5L23 16L12 22.5Z"/>',
 hx:'<circle class="'+K+'__eq" cx="16" cy="16" r="11"/><path class="'+K+'__ln" d="M6 16l3-5 4 10 4-10 4 10 3-5"/>',
 pou:'<path class="'+K+'__eq" d="M8 8H24L8 24H24Z"/><path class="'+K+'__ln" d="M24 11a5 5 0 0 1 0 10"/>',
 sensors:'<circle class="'+K+'__eq" cx="16" cy="16" r="11"/><text class="'+K+'__ce" x="16" y="20">CE</text>',
 spray:'<path class="'+K+'__eq" d="M8 6H24L8 22H24Z"/><path class="'+K+'__ln" d="M24 9a5 5 0 0 1 0 10"/><path class="'+K+'__cap" d="M9 28h14"/>'};
function no(i){return (i<9?'0':'')+(i+1)}
LOOKS['train-strip']=function(b,H){var S=b.stages||b.items||[],n=S.length;if(!n)return sec(H,'aq-band--navy '+K+'-sec');
 var nodes=S.map(function(s,i){return s.node&&AT[s.node]?s.node:NODE[i]||null});
 var marks=nodes.map(function(k,i){if(!k)return '';var a=AT[k],x=a[0],y=310;
  return '<g class="'+K+'__mark" data-ts="'+k+'">'+P('M'+x+' '+(a[1]+2)+'V'+(y-18),'lead')+C(x,y,18,'mk')+T(x,y,no(i),'mkn')+'</g>'}).join('');
 var svg='<svg class="'+K+'__svg" viewBox="0 0 1400 330" aria-hidden="true" focusable="false">'+strip()+marks+'</svg>';
 var rows=S.map(function(s,i){var k=nodes[i];return '<li class="'+K+'__stage"'+(k?' data-ts="'+k+'"':'')+'>'
   +'<span class="'+K+'__glyph" aria-hidden="true">'+(k?'<svg viewBox="0 0 32 32" focusable="false">'+GLYPH[k]+'</svg>':'')+'</span>'
   +'<span class="'+K+'__no" aria-hidden="true">'+no(i)+'</span><h3 class="'+K+'__t">'+tx(s.t)+'</h3>'+(s.d?'<p class="'+K+'__d">'+tx(s.d)+'</p>':'')+'</li>'}).join('');
 var inner='<div class="'+K+'" style="--n:'+n+'"><div class="'+K+'__strip">'+svg+'</div><ol class="'+K+'__stages" role="list">'+rows+'</ol></div>';
 return sec(H+inner,'aq-band--navy '+K+'-sec')};
function set(root,k){root.classList.toggle('has-hot',!!k);[].forEach.call(root.querySelectorAll('[data-ts]'),function(el){el.classList.toggle('is-hot',!!k&&el.getAttribute('data-ts')===k)})}
['mouseover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var root=ev.target.closest&&ev.target.closest('.'+K);if(!root)return;var el=ev.target.closest('[data-ts]');set(root,el?el.getAttribute('data-ts'):null)})});
document.addEventListener('mouseout',function(ev){var root=ev.target.closest&&ev.target.closest('.'+K);if(root&&!root.contains(ev.relatedTarget))set(root,null)});
})();
