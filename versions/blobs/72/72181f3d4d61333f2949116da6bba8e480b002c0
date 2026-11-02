/* Look "standard-tiles" -> StandardTiles (design-system/components/StandardTiles): a short grid of linked items set as a
   Swiss tile grid, three across (pass 9b, concept ind-meddevice.2). Each item is one linked tile, alternately navy and
   limestone: a huge slash-numbered count ("01/") in Geist Mono Light, a hairline, the title and one line, and its
   standard or control tag in an outlined mono tag. Two more tiles fill the grid: a navy blueprint tile that draws the
   item being pointed at (IsoKit line drawings chosen by the item's icon: ro-membrane -> RO rack, loop -> tank and
   loop, conductivity -> analyser and control panel, valve -> a valve on a run with a gauge; first item by default),
   and a flow-blue block that sets that item's tag large. Both are aria-hidden: they repeat what the tiles say.
   Fields, as grid: h, intro, items [{t, d, icon, tag, link}]. Concept: ind-meddevice.2 (3 + 3 tile grid of slash-numbered
   navy and limestone link tiles, one blueprint tile, one abstract steel-blue tile). */
(function(){
function stDraw(icon,i){var inner='',pts;
 if(icon==='ro-membrane'){inner=isoPart('ro',0,0,0,1,{id:'s'})+'';pts=[[0,0,0],[112,0,0],[112,26,0],[0,26,0],[0,0,80],[112,26,70]]}
 else if(icon==='loop'){var tk=isoPart('tank',0,0,0,1,{id:'s'}),pu=isoPart('pump',62,30,0,1,{id:'s'});
  var lp=isoPipe(isoRoute(tk.ports.out,pu.ports.in,'xyz'),{r:2.2,caps:false});
  var rt=isoPipe([pu.ports.out,[pu.ports.out[0],pu.ports.out[1],96],[0,pu.ports.out[1],96],[0,0,96]],{r:2.2,caps:false});
  inner=[tk,lp,pu,rt].join('');pts=[[-24,-24,0],[90,40,0],[0,0,100],[60,40,100],[-24,24,0]]}
 else if(icon==='conductivity'){var an=isoPart('analyzer',0,30,0,1.3,{id:'s'}),pn=isoPart('panel',60,0,0,1.3,{id:'s'});
  var ln=isoPipe([[-40,60,14],[90,60,14]],{r:2.2,caps:'ends'});inner=[pn,ln,an].join('');pts=[[-40,60,14],[90,60,14],[60,0,72],[0,30,70],[40,-10,0],[90,60,0]]}
 else if(icon==='valve'){var p1=isoPipe([[-60,0,24],[70,0,24]],{r:3,caps:'ends',flanges:'all'}),vl=isoPart('valve',0,0,24,2,{id:'s'}),gg=isoPart('gauge',40,0,27,1.6,{id:'s'});
  inner=[p1,vl,gg].join('');pts=[[-64,0,24],[74,0,24],[0,0,50],[40,0,48],[-64,0,10]]}
 else return '';
 var bx=isoBounds(pts,16),W=Math.round(bx.w),H=Math.round(bx.h);
 return '<span class="aq-standard-tiles__layer'+(i===0?' is-on':'')+'" data-k="'+i+'">'+isoSvg(W,H,inner,'aq-iso--navy',{origin:[-bx.x,-bx.y]})+'</span>'}
LOOKS['standard-tiles']=function(b,H){var I=b.items||[],n=I.length;
 var tiles=I.map(function(it,i){var lk=it.link&&wp(it.link);
  var inner='<span class="aq-standard-tiles__no" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'<span class="aq-standard-tiles__sl">/</span></span>'
   +(it.tag?'<span class="aq-standard-tiles__tag">'+tx(it.tag)+'</span>':'')
   +'<div class="aq-standard-tiles__body"><h3 class="aq-standard-tiles__t">'+tx(it.t)+'</h3>'+(it.d?'<span class="aq-standard-tiles__d">'+tx(it.d)+'</span>':'')+'</div>'
   +(lk?'<span class="aq-standard-tiles__arrow" aria-hidden="true"></span>':'');
  return '<li class="aq-standard-tiles__tile '+(i%2?'is-stone':'is-navy')+'" data-k="'+i+'">'+(lk?'<a class="aq-standard-tiles__in" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+inner+'</a>':'<div class="aq-standard-tiles__in">'+inner+'</div>')+'</li>'}).join('');
 var layers=I.map(function(it,i){return stDraw(it.icon,i)}).join(''),first=I[0]||{};
 var extra=(layers?'<li class="aq-standard-tiles__plate" aria-hidden="true"><span class="aq-standard-tiles__frame"></span>'+layers+'</li>':'')
  +'<li class="aq-standard-tiles__block" aria-hidden="true"><span class="aq-standard-tiles__wedge"></span><span class="aq-standard-tiles__big">'+tx(first.tag||'')+'</span></li>';
 return sec(H+'<ol class="aq-standard-tiles" style="--n:'+n+'">'+tiles+extra+'</ol>','aq-standard-tiles-sec')};
/* Pointing at or focusing a tile shows its drawing on the blueprint tile and its tag on the flow block.
   Ported from Subframe Motion "Hover image preview list" (project-index), MIT, (c) 2026 Subframe: mouse pointer-enter or
   focus selects, the selection persists (no reset on leave), the panel shows the selected layer in 240 ms
   (.2/.85/.25/1, CSS); instant under reduced motion. */
function stPick(t){var w=t.closest('.aq-standard-tiles');if(!w||t.classList.contains('is-on'))return;var k=t.getAttribute('data-k');
 [].forEach.call(w.querySelectorAll('.aq-standard-tiles__tile'),function(x){x.classList.toggle('is-on',x===t)});
 var L=w.querySelectorAll('.aq-standard-tiles__layer[data-k="'+k+'"]');if(L.length)[].forEach.call(w.querySelectorAll('.aq-standard-tiles__layer'),function(x){x.classList.toggle('is-on',x.getAttribute('data-k')===k)});
 var tag=t.querySelector('.aq-standard-tiles__tag'),big=w.querySelector('.aq-standard-tiles__big');
 if(big&&tag){big.innerHTML=tag.innerHTML;big.classList.remove('is-tick');void big.offsetWidth;big.classList.add('is-tick')}}
if(typeof document!=='undefined'&&document.addEventListener){
 document.addEventListener('pointerover',function(ev){if(ev.pointerType!=='mouse')return;var t=ev.target.closest&&ev.target.closest('.aq-standard-tiles__tile');if(t)stPick(t)});
 document.addEventListener('focusin',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-standard-tiles__tile');if(t)stPick(t)})}
})();
