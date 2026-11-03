/* Look "building-loop" -> BuildingLoop (design-system/components/BuildingLoop): where water goes in a building, on a
   navy band (pass 12 concept 210). A three-storey building section in hairlines (slabs, walls, a stair and lift core,
   a roof plant housing) with the central plant on the ground floor; one pale loop leaves the plant, rises up the
   riser, threads the floors (out along the top floor, back along the middle one, out along the ground floor) and
   returns to the plant. Each item is one numbered stop on the loop: a drop to the fixture it feeds, a numbered ring,
   and a leader to the building's edge, where the item's name is set in the margin (left or right, whichever side
   the stop is on). Under the band, one numbered caption per stop (number, name, line). Pointing at a caption or a
   margin name lights its stop.
   Fields (a grid block, as: "route"): h, intro, items [{t, d, draw}]. draw: the fixture at the stop (washer, analyzer,
   bench, humidifier, hood); without it a bench tap. Up to six stops, placed in flow order on fixed positions
   (top floor left and right, middle floor right and left, ground floor left and right). The drawing carries no copy:
   the names in the margins are the items' own names (aria-hidden; the captions carry them for readers).
   Phones: the section drawing at full width with its numbered stops, then a riser: the pale loop down the left, one
   row per stop (number on the loop, name, line); every stop shown, no fold. */
(function(){
var K='aq-building-loop',W=760,HH=440,X0=60,X1=700;
var SLOTS=[[200,86],[560,86],[560,196],[230,196],[290,306],[580,306]];
var PICK={1:[0],2:[0,1],3:[0,1,2],4:[0,1,2,3],5:[0,1,2,3,5],6:[0,1,2,3,4,5]};
var FLOOR={86:180,196:290,306:400};
function P(d,c){return '<path class="'+K+'__'+c+'" d="'+d+'"/>'}
function R(x,y,w,h,c){return P('M'+x+' '+y+'h'+w+'v'+h+'h'+(-w)+'Z',c||'fx')}
var FIX={
 washer:function(x,f){return R(x-20,f-56,40,56)+P('M'+(x-20)+' '+(f-48)+'h40','fl')+R(x-15,f-44,30,38,'fl')+R(x-11,f-40,22,16,'fl')+P('M'+(x-9)+' '+(f-30)+'h18','fl')},
 analyzer:function(x,f){return P('M'+(x-30)+' '+(f-30)+'h60M'+(x-26)+' '+(f-30)+'V'+f+'M'+(x+26)+' '+(f-30)+'V'+f,'fx')+R(x-18,f-58,30,28)+R(x-14,f-54,14,10,'fl')},
 bench:function(x,f){return P('M'+(x-34)+' '+(f-30)+'h68M'+(x-30)+' '+(f-30)+'V'+f+'M'+(x+30)+' '+(f-30)+'V'+f,'fx')+P('M'+(x+14)+' '+(f-30)+'v-18q0-6 6-6t6 6v4','fx')+R(x-24,f-44,7,14,'fl')+R(x-14,f-40,6,10,'fl')},
 humidifier:function(x,f){return P('M'+(x-8)+' '+(f-62)+'V'+(f-110)+'M'+(x+8)+' '+(f-62)+'V'+(f-110),'fl')+R(x-20,f-62,40,24)+P('M'+(x-12)+' '+(f-50)+'h24','fl')+P('M'+x+' '+(f-38)+'v8','fl')},
 hood:function(x,f){return P('M'+(x-28)+' '+(f-22)+'h56M'+(x-24)+' '+(f-22)+'V'+f+'M'+(x+24)+' '+(f-22)+'V'+f,'fx')+P('M'+(x-28)+' '+(f-22)+'V'+(f-74)+'h56V'+(f-22)+'M'+(x-28)+' '+(f-44)+'L'+(x-20)+' '+(f-66)+'h48','fx')}};
var TOP={washer:56,analyzer:58,bench:54,humidifier:62,hood:74};
function topOf(s){return s.f-TOP[s.k]}
function kindOf(it){if(it.draw&&FIX[it.draw])return it.draw;var t=String(it.t||'').toLowerCase();
 return /wash|autoclave/.test(t)?'washer':/analy[sz]er/.test(t)?'analyzer':/humidif/.test(t)?'humidifier':/culture|hood|molecular/.test(t)?'hood':'bench'}
function no(i){return (i<9?'0':'')+(i+1)}
function building(){var g='',f;
 g+=P('M0 400H'+W,'gr');
 /* walls, slabs, roof parapet and plant housing */
 g+=P('M'+X0+' 400V64H'+X1+'V400','wall')+P('M'+X0+' 70H'+X1+'M'+X0+' 180H'+X1+'M'+X0+' 290H'+X1,'slab');
 g+=P('M330 64V36H410V64','wall')+P('M342 46h56','hair');
 /* core: stair and lift with a door on each floor */
 g+=P('M350 70V400M410 70V400','hair');[180,290,400].forEach(function(y){g+=R(366,y-58,26,58,'hair')});
 /* windows on the outer walls */
 [180,290,400].forEach(function(y){g+=P('M'+X0+' '+(y-84)+'v44M'+X1+' '+(y-84)+'v44','win')});
 return g}
/* the central plant on the ground floor: tank and RO skid (drawn over the loop's ends) */
function plant(){return P('M92 400V346q0-12 15-12t15 12V400','fx')+R(134,358,56,42)+P('M142 368h40M142 380h40','fl')}
function loop(){var r=14;
 return 'M162 358V330H76V'+(86+r)+'q0-'+r+' '+r+'-'+r+'H'+(670-r)+'q'+r+' 0 '+r+' '+r+'V'+(196-r)+'q0 '+r+'-'+r+' '+r+'H'+(130+r)+'q-'+r+' 0-'+r+' '+r+'V'+(306-r)+'q0 '+r+' '+r+' '+r+'H'+(670-r)+'q'+r+' 0 '+r+' '+r+'V'+(418-r)+'q0 '+r+'-'+r+' '+r+'H107V400'}
LOOKS['building-loop']=function(b,H){var I=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}).slice(0,6),n=I.length;if(!n)return sec(H,'aq-band--navy '+K+'-sec');
 var pick=PICK[n],stops=I.map(function(it,i){var s=SLOTS[pick[i]];return {x:s[0],y:s[1],f:FLOOR[s[1]],side:s[0]<380?'l':'r',k:kindOf(it)}});
 var g=building()+P(loop(),'loop')+P(loop(),'glint')+plant();
 stops.forEach(function(s,i){var edge=s.side==='l'?X0:X1,top=topOf(s);
  var my=s.y+(top-s.y)/2;
  g+='<g class="'+K+'__stop" data-bl="'+i+'">'+FIX[s.k](s.x,s.f)+P('M'+s.x+' '+s.y+'V'+top,'drop')
   +P('M'+(s.side==='l'?s.x-16:s.x+16)+' '+my+'H'+edge,'lead')+R(edge-4,my-4,8,8,'tick')
   +'<circle class="'+K+'__ring" cx="'+s.x+'" cy="'+my+'"/><text class="'+K+'__num" x="'+s.x+'" y="'+my+'">'+no(i)+'</text></g>'});
 var svg='<svg class="'+K+'__svg" viewBox="0 0 '+W+' '+HH+'" aria-hidden="true" focusable="false">'+g+'</svg>';
 var lab=function(side){return '<div class="'+K+'__margin '+K+'__margin--'+side+'" aria-hidden="true">'+stops.map(function(s,i){if(s.side!==side)return '';
   var my=s.y+(topOf(s)-s.y)/2;
   return '<span class="'+K+'__label" data-bl="'+i+'" style="--y:'+(my/HH).toFixed(4)+'"><span class="'+K+'__lt">'+tx(I[i].t)+'</span> <span class="'+K+'__ln">['+no(i)+']</span></span>'}).join('')+'</div>'};
 var caps=I.map(function(it,i){return '<li class="'+K+'__cap" data-bl="'+i+'"><span class="'+K+'__no" aria-hidden="true">'+no(i)+'</span><h3 class="'+K+'__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 var inner='<div class="'+K+'" style="--n:'+n+'"><div class="'+K+'__fig">'+lab('l')+'<div class="'+K+'__draw">'+svg+'</div>'+lab('r')+'</div><ol class="'+K+'__caps" role="list">'+caps+'</ol></div>';
 return sec(H+inner,'aq-band--navy '+K+'-sec')};
function set(root,i){root.classList.toggle('has-hot',i!=null);[].forEach.call(root.querySelectorAll('[data-bl]'),function(el){el.classList.toggle('is-hot',i!=null&&el.getAttribute('data-bl')===i)})}
['mouseover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var root=ev.target.closest&&ev.target.closest('.'+K);if(!root)return;var el=ev.target.closest('[data-bl]');set(root,el?el.getAttribute('data-bl'):null)})});
document.addEventListener('mouseout',function(ev){var root=ev.target.closest&&ev.target.closest('.'+K);if(root&&!root.contains(ev.relatedTarget))set(root,null)});
})();
