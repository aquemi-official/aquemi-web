/* Look "option-checker" -> OptionChecker (design-system/components/OptionChecker): an options block as a Swiss grid.
   Left, a checkerboard field of navy, limestone and sunken squares with one navy blueprint tile (two by two) that draws
   the control system the options configure: the panel with its PLC and operator screen, the historian, the DMZ with
   its one-way exit, the plant bus. Right, the section title large in the top cell, then the options as cells (two
   wide, then three) under huge light slash numerals. Pointing at an option (or focusing its link) lights its part in
   the blueprint tile. Concept: research/pass9b/concepts/sys-monitoring.4.png.
   Fields: h, intro (optional; printed under the title in the top cell through wSecHead, as option-taps does), items
   [{t, d, link, intent, part}]. part: plc | historian | remote | bus | panel (the blueprint part the
   option sets; none: no part lights). Phones: the field shortens to a full-width 4 x 2 band (the blueprint tile
   centred, a navy and limestone square at each side, set as a true checker through data-r / data-c), then the
   cells stack with a 44 px numeral (pass 12). */
var OC_PAT=['n','l','n','s','s','b','b','n','l','b','b','l','n','s','n','l'];
function ocPlate(){
 var p=function(k,inner){return '<g class="aq-option-checker__part" data-part="'+k+'">'+inner+'</g>'};
 return '<svg class="aq-option-checker__bp" viewBox="0 0 200 200" aria-hidden="true" focusable="false">'
  +'<path class="aq-option-checker__grid" d="M0 50H200M0 100H200M0 150H200M50 0V200M100 0V200M150 0V200"/>'
  +p('panel','<rect x="18" y="26" width="84" height="118"/><path d="M24 32V138M98 60v14"/>')
  +p('plc','<rect x="28" y="40" width="64" height="24"/><path d="M38 40v24M46 40v24M54 40v24M62 40v24M70 40v24M78 40v24"/>')
  +'<g class="aq-option-checker__fixed"><rect x="36" y="82" width="48" height="32"/><path d="M42 104l8-6 7 4 8-9 7 5 6-3M60 114v8M50 122h20"/></g>'
  +p('historian','<path d="M132 40v34c0 5 10 8 20 8s20-3 20-8V40"/><ellipse cx="152" cy="40" rx="20" ry="7"/><path d="M132 52c0 5 10 8 20 8s20-3 20-8M132 63c0 5 10 8 20 8s20-3 20-8"/>')
  +p('remote','<rect x="124" y="100" width="56" height="34" stroke-dasharray="4 3"/><path d="M136 110h18v14h-18zM136 117h18M145 110v7M140 117v7M150 117v7M154 117H192M186 112l6 5-6 5"/>')
  +p('bus','<path d="M8 168H192M60 144V168M152 82V100M145 134V168M30 168v10M90 168v10M170 168v10"/><circle cx="60" cy="168" r="2.5"/><circle cx="145" cy="168" r="2.5"/>')
  +'<path class="aq-option-checker__link" d="M102 52H132"/></svg>'}
LOOKS['option-checker']=function(b,H){
 var I=b.items||[];if(!I.length)return BLOCKS.options(b,H);
 var tiles=OC_PAT.map(function(k,j){var r=Math.floor(j/4)+1,c=j%4+1;if(k==='b'&&(j!==5))return '';
  return k==='b'?'<div class="aq-option-checker__tile aq-option-checker__tile--b" data-r="2" style="grid-row:2/span 2;grid-column:2/span 2">'+ocPlate()+'</div>'
   :'<div class="aq-option-checker__tile aq-option-checker__tile--'+k+'" data-r="'+r+'" data-c="'+c+'" style="grid-row:'+r+';grid-column:'+c+'"></div>'}).join('');
 var top=I.length>3?2:I.length,cells=I.map(function(it,i){
  var t=it.link&&wp(it.link)?wlink(it.link,it.t,it.intent).replace('</a>',' <span class="aq-option-checker__arrow" aria-hidden="true">&rarr;</span></a>'):tx(it.t);
  return '<li class="aq-option-checker__cell'+(i<top?' aq-option-checker__cell--wide':'')+'"'+(it.part?' data-part="'+e(it.part)+'"':'')+'>'
   +'<span class="aq-option-checker__n" aria-hidden="true"><span class="aq-option-checker__num">'+(i<9?'0':'')+(i+1)+'</span><span class="aq-option-checker__sl">/</span></span>'
   +'<h3 class="aq-option-checker__t">'+t+'</h3>'+(it.d?'<p class="aq-option-checker__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 return sec('<div class="aq-option-checker" style="--oc-top:'+top+';--oc-rest:'+Math.max(1,I.length-top)+'">'
  +'<div class="aq-option-checker__field" aria-hidden="true">'+tiles+'</div>'
  +'<div class="aq-option-checker__body"><div class="aq-option-checker__head">'+H+'</div><ol class="aq-option-checker__cells" role="list">'+cells+'</ol></div></div>','aq-option-checker-sec')};
/* Pointing at an option, or focusing its link, lights the part of the control system it sets */
(function(){
 if(typeof document==='undefined')return;
 function set(root,k){[].forEach.call(root.querySelectorAll('[data-part]'),function(el){el.classList.toggle('is-hot',!!k&&el.getAttribute('data-part')===k)});root.classList.toggle('has-hot',!!k)}
 function hit(ev){var c=ev.target.closest&&ev.target.closest('.aq-option-checker__cell'),root=ev.target.closest&&ev.target.closest('.aq-option-checker');if(root)set(root,c&&c.getAttribute('data-part'))}
 document.addEventListener('mouseover',hit);document.addEventListener('focusin',hit);
 document.addEventListener('mouseout',function(ev){var root=ev.target.closest&&ev.target.closest('.aq-option-checker');if(root&&!root.contains(ev.relatedTarget))set(root,null)});
 document.addEventListener('focusout',function(ev){var root=ev.target.closest&&ev.target.closest('.aq-option-checker');if(root&&!root.contains(ev.relatedTarget))set(root,null)});
})();
