/* Look "drawing-register" -> DrawingRegister (design-system/components/DrawingRegister): where water goes, set as a
   drawing register on a limestone sheet (pass 12 concept 209). A row of framed outline drawings, one per item, each
   with its mono sheet code ("01 / WD") and name; one steel-blue viewfinder stands over the selected drawing, and under
   the row the selected item's detail: its drawing at large in a dimensioned frame (hairline extension and dimension
   lines, no figures) beside its notes (the item's name and line) and a title block (Aquemi, the section, the item,
   "01 / 06"). Pointing at a drawing (mouse), focusing it or tapping it moves the viewfinder and the detail there;
   the first item is selected as rendered. Drawings are front-and-side outline views drawn here, one per kind:
   washer (a washer-disinfector cabinet: control strip, glazed door with rack shelves, plinth), ultrasonic (open tank
   with basket and tap), sink (worktop basin, gooseneck tap, lumen flushing hose and gun), endoscope (top-loading
   reprocessor with its own feed filter), cart (tunnel cabinet with a cart behind the glazed door), sterilizer (chamber
   cabinet with its water feed valve only, no steam plant), else a plain cabinet. No dialysis equipment and no steam
   generator is ever drawn.
   Fields (a grid block, as: "route"): h, nav, items [{t, d, draw, link}]. draw: the drawing kind (washer, ultrasonic,
   sink, endoscope, cart, sterilizer); without it the kind is read from the name. The sheet code is the kind's
   initials (WD, UC, MS, ER, CW, SF), a drawing label only. Every item's name and line are always in the page (the
   detail is a visual copy, aria-hidden).
   Phones: the drawings two to a row, the selected one framed in steel blue, then the viewfinder block (the drawing on
   steel blue, its notes, the title block). */
(function(){
var K='aq-drawing-register',DX=12,DY=-7;
var CODE={washer:'WD',ultrasonic:'UC',sink:'MS',endoscope:'ER',cart:'CW',sterilizer:'SF',cabinet:'EQ'};
function kindOf(it){if(it.draw&&CODE[it.draw])return it.draw;var t=String(it.t||'').toLowerCase();
 return /washer-disinfector|washer disinfector/.test(t)?'washer':/ultrason/.test(t)?'ultrasonic':/sink|lumen/.test(t)?'sink':/endoscop/.test(t)?'endoscope':/cart/.test(t)?'cart':/sterili[sz]er|autoclave/.test(t)?'sterilizer':'cabinet'}
function P(d,c){return '<path class="'+K+'__'+(c||'ln')+'" d="'+d+'"/>'}
function R(x,y,w,h,c){return P('M'+x+' '+y+'h'+w+'v'+h+'h'+(-w)+'Z',c||'th')}
function O(x,y,r,c){return '<circle class="'+K+'__'+(c||'th')+'" cx="'+x+'" cy="'+y+'" r="'+r+'"/>'}
/* a box seen from the front with its top and right side receding */
function box(x,y,w,h){var a=x+DX,b=y+DY;return P('M'+x+' '+y+'h'+w+'v'+h+'h'+(-w)+'Z','eq')+P('M'+x+' '+y+'L'+a+' '+b+'H'+(a+w)+'L'+(x+w)+' '+y+'Z','eq')+P('M'+(x+w)+' '+y+'L'+(a+w)+' '+b+'V'+(b+h)+'L'+(x+w)+' '+(y+h)+'Z','eq')}
function valve(x,y){return P('M'+(x-5)+' '+(y-5)+'L'+(x+5)+' '+(y+5)+'V'+(y-5)+'L'+(x-5)+' '+(y+5)+'Z','eq')+P('M'+x+' '+y+'V'+(y-8)+'M'+(x-4)+' '+(y-8)+'H'+(x+4),'ln')}
var DRAW={
 washer:function(){var g=box(26,18,56,72);
  g+=P('M26 28H82','th')+R(31,21,16,5)+O(62,23.5,1.6)+O(68,23.5,1.6)+O(74,23.5,1.6);
  g+=R(30,32,48,52,'ln')+R(35,37,38,30);
  for(var y=47;y<=59;y+=12){g+=P('M37 '+y+'H71','th');for(var x=40;x<=68;x+=5)g+=P('M'+x+' '+y+'v-3','th')}
  g+=P('M74 50V60','hd')+P('M26 86H82','th')+P('M94 70H106V94','wa');return g},
 ultrasonic:function(){var g=box(16,50,76,34);
  g+=P('M23 48.5L31 44H99L91 48.5Z','th')+P('M38 46.5q3-1.4 6 0t6 0t6 0t6 0t6 0','wa');
  g+=P('M38 46v-7h7v7M83 46v-7h7v7','ln')+R(22,58,20,9)+O(80,67,4.5)+O(68,67,2.4)+P('M20 84v4M88 84v4','ln');
  g+=P('M112 14H100V26','wa')+P('M100 28v6','wa');return g},
 sink:function(){var g=box(8,50,92,8);
  g+=P('M30 49L37 45H84L77 49Z','th')+P('M30 58V72H77V58','th')+P('M12 58V92M96 58V92M12 84H96','th');
  g+=P('M57 45V22Q57 14 65 14Q73 14 73 22V27','ln')+P('M73 29V41','wa');
  g+=P('M92 45V32','ln')+P('M92 32C104 30 110 46 102 60C98 68 104 74 110 70','th')+P('M107 66L116 63L118 69L110 72Z','eq');return g},
 endoscope:function(){var g=box(24,40,58,50);
  g+=P('M36 33L40 12H98L94 33','th')+'<ellipse class="'+K+'__th" cx="59" cy="36.5" rx="17" ry="2.6"/><ellipse class="'+K+'__th" cx="59" cy="36.5" rx="10" ry="1.5"/>';
  g+=R(29,45,22,9)+O(60,49.5,1.6)+O(66,49.5,1.6)+P('M24 60H82M53 60V90','th')+P('M48 70v8M58 70v8','hd');
  g+=R(6,50,10,28,'eq')+P('M6 54H16','th')+P('M0 46H11V50','wa')+P('M16 72H24','wa');return g},
 cart:function(){var g=box(8,16,92,74);
  g+=P('M88 16V90','th')+R(90,22,7,10)+O(93.5,40,1.6)+O(93.5,46,1.6);
  g+=R(12,20,72,66,'ln')+R(17,25,62,46);
  g+=P('M24 30V64M72 30V64M24 40H72M24 52H72M22 64H74','th')+O(28,66.5,2.4)+O(68,66.5,2.4)+P('M80 48V58','hd')+P('M2 90H118','th');return g},
 sterilizer:function(){var g=box(34,16,58,74);
  g+=P('M34 26H92','th')+R(39,19,14,5)+O(84,21.5,1.6);
  g+=P('M42 32h42a3 3 0 0 1 3 3v44a3 3 0 0 1-3 3h-42a3 3 0 0 1-3-3v-44a3 3 0 0 1 3-3Z','ln')+R(45,38,36,38,'dash')+P('M42 44h-3M42 70h-3','hd')+P('M70 57H84','hd')+P('M34 86H92','th');
  g+=P('M0 78H34','wa')+valve(17,78);return g},
 cabinet:function(){return box(26,22,58,68)+P('M26 32H84','th')+R(31,25,16,5)+R(32,38,46,44,'ln')}};
function svg(k,cls){return '<svg class="'+K+'__svg'+(cls?' '+cls:'')+'" viewBox="-4 4 128 96" aria-hidden="true" focusable="false">'+(DRAW[k]||DRAW.cabinet)()+'</svg>'}
function no(i){return (i<9?'0':'')+(i+1)}
LOOKS['drawing-register']=function(b,H){var I=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=I.length;if(!n)return sec(H,K+'-sec');
 var kinds=I.map(kindOf),N=no(n-1);
 var cells=I.map(function(it,i){var code=no(i)+' / '+CODE[kinds[i]];
  var name=it.link&&wp(it.link)?'<a class="'+K+'__go" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':tx(it.t);
  return '<li class="'+K+'__item'+(i?'':' is-on')+'" data-i="'+i+'"><button type="button" class="'+K+'__cell" aria-pressed="'+(i?'false':'true')+'">'
   +'<span class="'+K+'__frame">'+svg(kinds[i])+'</span><span class="'+K+'__code" aria-hidden="true">'+e(code)+'</span>'
   +'<span class="'+K+'__name">'+tx(it.t)+'</span></button>'+(it.link&&wp(it.link)?'<p class="'+K+'__link">'+name+'</p>':'')
   +(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 var panes=I.map(function(it,i){return '<div class="'+K+'__pane'+(i?'':' is-on')+'" data-i="'+i+'">'
   +'<div class="'+K+'__zoom"><span class="'+K+'__dim '+K+'__dim--h"></span><span class="'+K+'__dim '+K+'__dim--v"></span>'+svg(kinds[i],K+'__svg--big')+'</div>'
   +'<div class="'+K+'__notes"><p class="'+K+'__nl">Notes</p><p class="'+K+'__nt">'+tx(it.t)+'</p>'+(it.d?'<p class="'+K+'__nd">'+tx(it.d)+'</p>':'')
   +'<p class="'+K+'__tb"><span>Aquemi</span><span>'+tx(b.nav||'')+'</span><span class="'+K+'__tbn">'+no(i)+' / '+N+'</span><span class="'+K+'__tbc">'+e(CODE[kinds[i]])+'</span></p></div></div>'}).join('');
 var inner='<div class="'+K+'" style="--n:'+n+';--sel:0"><div class="'+K+'__strip"><ol class="'+K+'__cells" role="list">'+cells+'</ol><span class="'+K+'__vf" aria-hidden="true"></span></div>'
  +'<div class="'+K+'__detail" aria-hidden="true">'+panes+'</div></div>';
 return sec(H+inner,'aq-band--limestone '+K+'-sec" data-theme="light')};
/* selection: works without the motion layer and under reduced motion (the glide is a CSS transition, off there) */
function sel(it){var r=it.closest('.'+K);if(!r)return;var i=it.getAttribute('data-i');r.style.setProperty('--sel',i);
 [].forEach.call(r.querySelectorAll('.'+K+'__item'),function(x){var on=x===it;x.classList.toggle('is-on',on);var bt=x.querySelector('.'+K+'__cell');if(bt)bt.setAttribute('aria-pressed',on?'true':'false')});
 [].forEach.call(r.querySelectorAll('.'+K+'__pane'),function(p){p.classList.toggle('is-on',p.getAttribute('data-i')===i)})}
function item(ev){return ev.target.closest&&ev.target.closest('.'+K+'__item')}
document.addEventListener('pointerover',function(ev){if(ev.pointerType!=='mouse')return;var it=item(ev);if(it&&!it.classList.contains('is-on'))sel(it)});
document.addEventListener('focusin',function(ev){var it=item(ev);if(it)sel(it)});
document.addEventListener('click',function(ev){var it=item(ev);if(it)sel(it)});
})();
