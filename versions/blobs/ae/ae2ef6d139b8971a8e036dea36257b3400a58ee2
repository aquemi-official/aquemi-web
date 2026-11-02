/* Look "decision-plant" -> DecisionPlant (design-system/components/DecisionPlant): an options block of decisions set
   round one hairline process schematic of the plant they size (a flat elevation drawn here, IsoKit has no elevations:
   feed and pretreatment vessel, the membrane train, a second train drawn dashed as the option, the storage tank, the
   loop pump, the distribution header with its points of use, the return, and the drawing's title block). Each decision
   is a numbered callout at the left or right; a leader runs from it into the part it decides, ending in its number.
   Pointing at (or focusing) a decision lights its leader and part and quiets the rest.
   Fields, as options: h, items [{t, d, link, link_label}], fold, fold_noun (phones only).
   Added: items[].part ("feed", "membranes", "trains", "tank", "headers", "loop" or "sheet": the title block, for a
   decision that is the specification's own), items[].side ("l" or "r"), items[].row (1-3, the callout's row on its side);
   gate (the title block's word, "URS"; aria-hidden). Concept: pass 9b ind-pharma.3 (central hairline schematic, five
   decisions as numbered callouts on both sides, leader lines into the plant). */
(function(){
var K='aq-decision-plant',W=760,Hh=372;
/* anchors in viewBox units: where each part's leader ends */
var A={feed:[66,206],membranes:[236,166],trains:[236,276],tank:[436,170],headers:[652,92],loop:[560,52],sheet:[626,311]};
function scene(gate){var o=[],P=function(d,c,id){o.push('<path class="'+K+'__'+c+'"'+(id?' data-part="'+id+'"':'')+' d="'+d+'"/>')};
 var G=function(id,inner){return '<g class="'+K+'__part" data-part="'+id+'">'+inner+'</g>'},S=function(d,c){return '<path class="'+K+'__'+c+'" d="'+d+'"/>'};
 /* sheet border and title block */
 o.push(S('M8 8H752V364H8Z','frame'));
 o.push(G('sheet',S('M596 300H752V364H596Z','eq')+S('M596 322H752M660 322V364','thin')+(gate?'<text class="'+K+'__gate" x="678" y="354">'+e(gate)+'</text>':'')+S('M604 311H648M668 311H740','thin')));
 /* water route (drawn under the equipment, the flow runs it) */
 var route='M8 262H40 M90 262H118V196H140 M330 196H372V128H400 M436 300V326H510 M510 300V92H732 M732 92V52H436V110';
 o.push(S(route,'pipe'));
 /* feed and pretreatment vessel */
 o.push(G('feed',S('M40 296V146Q40 118 65 118Q90 118 90 146V296Z','eq')+S('M40 236H90M40 252H90','hid')+S('M52 296V312M78 296V312','ln')+S('M60 118V108H70V118','ln')));
 /* membrane train A: rack with four pressure vessels */
 var t='';[150,170,190,210].forEach(function(y){t+=S('M150 '+y+'H320A6 6 0 0 1 320 '+(y+12)+'H150A6 6 0 0 1 150 '+y+'Z','eq')});
 o.push(G('membranes',S('M140 140H330V232H140Z','ln')+t+S('M140 232V246M330 232V246','ln')));
 /* train B: the option, dashed */
 var u='';[262,282].forEach(function(y){u+=S('M150 '+y+'H320A6 6 0 0 1 320 '+(y+12)+'H150A6 6 0 0 1 150 '+y+'Z','opt')});
 o.push(G('trains',S('M140 252H330V302H140Z','opt')+u+S('M118 262V280H140M330 280H372V196','opt')+S('M352 274L362 280L352 286ZM372 274L362 280L372 286Z','eq')));
 /* storage tank */
 o.push(G('tank',S('M400 300V140Q400 106 436 106Q472 106 472 140V300Z','eq')+S('M400 168H472','hid')+S('M408 300V318M464 300V318','ln')+S('M428 106V98H444V106','ln')));
 /* loop pump */
 o.push(G('pump',S('M510 300m-14 0a14 14 0 1 0 28 0a14 14 0 1 0 -28 0','eq')+S('M502 314H518V322H502Z','ln')));
 /* header with three points of use and an isolation valve; the return */
 var pou='';[580,640,700].forEach(function(x){pou+=S('M'+x+' 92V128M'+(x-8)+' 128H'+(x+8)+'M'+x+' 128V140','ln')+S('M'+(x-6)+' 106L'+x+' 112L'+(x-6)+' 118ZM'+(x+6)+' 106L'+x+' 112L'+(x+6)+' 118Z','eq')});
 o.push(G('headers',S('M510 92H732','main')+pou+S('M604 86L612 92L604 98ZM620 86L612 92L620 98Z','eq')));
 o.push(G('loop',S('M732 92V52H436V106','main')+S('M560 46L568 52L560 58Z','eqf')));
 /* the water */
 o.push('<path class="'+K+'__flow" d="M8 262H40V296 M65 296V262H118V196H140H330H372V128H400 M436 300V326H510V92H732V52H436V106"/>');
 return '<svg class="'+K+'__svg" viewBox="0 0 '+W+' '+Hh+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">'+o.join('')+'</svg>'}
LOOKS['decision-plant']=function(b,H){var I=b.items||[],n=I.length,rows={l:0,r:0};
 var items=I.map(function(it,i){var p=A[it.part]?it.part:'tank',sd=it.side==='l'?'l':'r',rw=it.row||++rows[sd];
  var lk=it.link&&wp(it.link)?'<a class="'+K+'__link" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.link_label||wlabel(it.link))+'</a>':'';
  return fli('<li class="'+K+'__item is-'+sd+'" tabindex="0" data-i="'+i+'" data-part="'+p+'" style="--row:'+rw+'">'
   +'<span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><h3 class="'+K+'__t">'+tx(it.t)+'</h3>'
   +(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+lk+'</li>',b,i)}).join('');
 var mk=I.map(function(it,i){var a=A[it.part]||A.tank;return '<span class="'+K+'__mk" data-i="'+i+'" style="left:'+(a[0]/W*100).toFixed(2)+'%;top:'+(a[1]/Hh*100).toFixed(2)+'%" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'}).join('');
 var body='<div class="'+K+'"><div class="'+K+'__fig">'+scene(b.gate)+mk+'</div><ol class="'+K+'__list" role="list">'+items+'</ol>'
  +'<svg class="'+K+'__leads" aria-hidden="true" focusable="false"></svg></div>';
 return sec(H+wFold(b,n,body,b.fold_noun),K+'-sec')};
(function(){var NS='http://www.w3.org/2000/svg';
 /* leaders from the rendered callouts: out of the callout at its title, along to the part's x, then into the marker */
 function lay(w){var svg=w.querySelector('.'+K+'__leads');if(!svg)return;var wr=w.getBoundingClientRect();
  svg.setAttribute('viewBox','0 0 '+Math.max(1,Math.round(wr.width))+' '+Math.max(1,Math.round(wr.height)));
  while(svg.firstChild)svg.removeChild(svg.firstChild);if(getComputedStyle(svg).display==='none')return;
  [].forEach.call(w.querySelectorAll('.'+K+'__item'),function(it){if(it.offsetParent===null)return;var i=it.getAttribute('data-i'),k=w.querySelector('.'+K+'__mk[data-i="'+i+'"]'),t=it.querySelector('.'+K+'__t');if(!k||!t)return;
   var r=it.getBoundingClientRect(),tr=t.getBoundingClientRect(),m=k.getBoundingClientRect(),L=it.classList.contains('is-l'),
    y=tr.top+Math.min(tr.height,28)/2-wr.top,x0=(L?r.right+8:r.left-8)-wr.left,mx=m.left+m.width/2-wr.left,my=m.top+m.height/2-wr.top;
    var kx=L?Math.max(x0+16,mx-Math.abs(my-y)*0.6-12):Math.min(x0-16,mx+Math.abs(my-y)*0.6+12);
   var d='M'+x0.toFixed(1)+' '+y.toFixed(1)+'H'+kx.toFixed(1)+'L'+mx.toFixed(1)+' '+my.toFixed(1),p=document.createElementNS(NS,'path');
   p.setAttribute('d',d);p.setAttribute('class',K+'__lead');p.setAttribute('data-i',i);svg.appendChild(p)})}
 function show(w,it){var i=it?it.getAttribute('data-i'):null,pt=it?it.getAttribute('data-part'):null;w.classList.toggle('is-pointing',!!it);
  [].forEach.call(w.querySelectorAll('.'+K+'__mk, .'+K+'__lead, .'+K+'__item'),function(x){x.classList.toggle('is-on',x.getAttribute('data-i')===i)});
  [].forEach.call(w.querySelectorAll('.'+K+'__part'),function(x){x.classList.toggle('is-on',x.getAttribute('data-part')===pt)})}
 window.AQdecision={lay:lay,show:show};
 if(window.ResizeObserver&&window.MutationObserver){var ro=new ResizeObserver(function(es){es.forEach(function(en){lay(en.target)})});
  var scan=function(n){if(n.nodeType!==1)return;var L=n.matches('.'+K)?[n]:[].slice.call(n.querySelectorAll('.'+K));L.forEach(function(w){if(w.__dpl)return;w.__dpl=1;ro.observe(w)})};
  new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,scan)})}).observe(document.documentElement,{childList:true,subtree:true});
  if(document.body)scan(document.body)}
 function at(ev){return ev.target.closest&&ev.target.closest('.'+K+'__item')}
 document.addEventListener('pointerover',function(ev){var it=at(ev);if(it&&ev.pointerType!=='touch')show(it.closest('.'+K),it)});
 document.addEventListener('pointerout',function(ev){var it=at(ev);if(!it||(ev.relatedTarget&&it.contains(ev.relatedTarget)))return;var w=it.closest('.'+K),f=w.querySelector('.'+K+'__item:focus-within');show(w,f||null)});
 document.addEventListener('focusin',function(ev){var it=at(ev);if(it)show(it.closest('.'+K),it)});
 document.addEventListener('focusout',function(ev){var it=at(ev);if(it&&!(ev.relatedTarget&&it.closest('.'+K).contains(ev.relatedTarget)))show(it.closest('.'+K),null)});
 document.addEventListener('click',function(ev){var it=at(ev);if(it)show(it.closest('.'+K),it)});
})();
})();
