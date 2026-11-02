/* Look "record-anatomy" -> RecordAnatomy (design-system/components/RecordAnatomy): an explainer (prose, as
   "explainer") of what a published record carries, set as a drawing sheet (pass 9b, concept projects.1): a sparse
   limestone sheet with a zone band, the section title large in its open left half, a drawing field of four specimen
   drawings on the right (one per point: nothing on it is a value), and the points themselves as the sheet's title
   block in the lower right, one row per field (Figure, Method, Report, Approval), so every published figure reads as
   signed off like a drawing. Pointing at or focusing a title-block row moves a lit window over its drawing (the
   others quieten). Drawings: the figure an empty bracketed value with a bar under a dashed limit, the method a
   sampling map and a row of sample ticks, the report a numbered document, the approval two signature lines and a
   stamp.
   Fields: h, intro, points [{t, d, fig}]. fig (optional): figure, method, report, approval, the zone's drawing
   (default by order). Phones: no drawing field; each title-block row carries its own drawing above its text. */
(function(){
function S(inner){return '<svg class="aq-record-anatomy__svg" viewBox="0 0 360 120" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false">'+inner+'</svg>'}
function P(d,c){return '<path class="aq-record-anatomy'+'__'+(c||'ln')+'" d="'+d+'"/>'}
var RA_FIG={
 /* the figure: an empty value in brackets, a bar standing under a dashed limit line */
 figure:function(){return '<text class="aq-record-anatomy__br" x="0" y="92">[</text><text class="aq-record-anatomy__br" x="128" y="92">]</text>'
  +P('M30 96H124','hid')+P('M30 104H70','thin')
  +P('M196 108H352','ln')+P('M196 34H352','limit')+P('M226 108V70H262V108','fill')+P('M292 108V58H328V108','ln')
  +P('M196 108V30','thin')+P('M192 34H196M192 58H196M192 82H196','thin')},
 /* the method: a loop with its sampling points, then the samples over the period as ticks on a time line */
 method:function(){var t='';for(var i=0;i<14;i++)t+='M'+(176+i*12)+' 92V'+(i%7===0?72:80);
  return P('M14 30H128V96H14Z','ln')+P('M14 30H128','flow')+'<circle class="aq-record-anatomy__pt" cx="52" cy="30" r="5"/><circle class="aq-record-anatomy__pt" cx="128" cy="62" r="5"/><circle class="aq-record-anatomy__pt" cx="70" cy="96" r="5"/>'
   +P('M170 92H346','ln')+P(t,'tick')+P('M170 106H346','thin')+P('M170 101V111M346 101V111','thin')},
 /* the report: a document with its number, ruled text and a results table */
 report:function(){return P('M20 8H104L124 28V114H20Z','sheet')+P('M104 8V28H124','ln')+P('M34 26H74','flow')+P('M34 44H108M34 54H100M34 64H108','thin')+P('M34 78H110V104H34ZM34 91H110M60 78V104M86 78V104','thin')
  +P('M170 40H346','ln')+P('M170 40V22H232V40','thin')+'<text class="aq-record-anatomy__no" x="178" y="35">No.</text>'+P('M244 31H340','hid')+P('M170 72H300M170 86H330M170 100H280','thin')},
 /* the approval: two signature lines, the second engineer's and the client's quality unit, and a stamp */
 approval:function(){return P('M16 84C32 62 42 94 58 74S82 66 98 80','imp')+P('M182 78C196 58 210 92 224 68S246 72 264 76','imp')+'<g class="aq-record-anatomy__sig">'+P('M14 82C30 60 40 92 56 72S80 64 96 78','flow')+'</g>'+P('M10 92H150','ln')+P('M10 100H60','thin')
  +'<g class="aq-record-anatomy__sig">'+P('M180 76C194 56 208 90 222 66S244 70 262 74','flow')+'</g>'+P('M176 92H316','ln')+P('M176 100H226','thin')
  +'<g class="aq-record-anatomy__stamp"><circle class="aq-record-anatomy__ln" cx="320" cy="44" r="26"/><circle class="aq-record-anatomy__thin" cx="320" cy="44" r="20"/>'+P('M308 45L317 54L334 34','flow')+'</g>'}
};
var RA_ORDER=['figure','method','report','approval'];
LOOKS['record-anatomy']=function(b,H){var Pt=(b.points||[]).slice(0,4),num=function(i){return (i<9?'0':'')+(i+1)};
 var figs=Pt.map(function(p,i){return RA_FIG[p.fig]?p.fig:RA_ORDER[i%4]});
 var zones=figs.map(function(f,i){return '<div class="aq-record-anatomy__zone is-'+f+'" data-z="'+i+'"><span class="aq-record-anatomy__mark">'+num(i)+'</span>'+S(RA_FIG[f]())+'</div>'}).join('');
 var rows=Pt.map(function(p,i){
  return '<li class="aq-record-anatomy__row" data-z="'+i+'" tabindex="0" style="--i:'+i+'"><span class="aq-record-anatomy__no-c" aria-hidden="true">'+num(i)+'</span>'
   +'<h3 class="aq-record-anatomy__t">'+tx(p.t)+'</h3>'+(p.d?'<p class="aq-record-anatomy__d">'+tx(p.d)+'</p>':'')
   +'<div class="aq-record-anatomy__mini" aria-hidden="true">'+S(RA_FIG[figs[i]]())+'</div></li>'}).join('');
 var band=function(n,c,f){var o='';for(var i=0;i<n;i++)o+='<span>'+f(i)+'</span>';return '<div class="aq-record-anatomy__band aq-record-anatomy__band--'+c+'" aria-hidden="true">'+o+'</div>'};
 return sec('<div class="aq-record-anatomy" data-theme="light"><div class="aq-record-anatomy__sheet">'
  +band(6,'x',function(i){return i+1})+band(3,'y',function(i){return 'ABC'[i]})
  +'<div class="aq-record-anatomy__title">'+H+'</div>'
  +'<div class="aq-record-anatomy__field" aria-hidden="true"><span class="aq-record-anatomy__lens"></span>'+zones+'</div>'
  +'<ol class="aq-record-anatomy__block" role="list">'+rows+'</ol></div></div>','aq-band--limestone aq-record-anatomy-sec')};
/* Ported from Subframe Motion "Guided inspection" (guided-inspection), MIT, (c) 2026 Subframe
   The lit window: pointing at or focusing a title-block row glides a framed window onto that row's drawing (left,
   top, width, height, 0.55 s cubic-bezier(.22,.75,.22,1), the library's values, as a CSS transition so it is
   instant under reduced motion) and the other drawings quieten; leaving the block lets the window go. */
function raLens(w,i){var f=w.querySelector('.aq-record-anatomy__field'),L=f&&f.querySelector('.aq-record-anatomy__lens');if(!L)return;
 var z=i==null?null:f.querySelector('.aq-record-anatomy__zone[data-z="'+i+'"]');
 [].forEach.call(f.querySelectorAll('.aq-record-anatomy__zone'),function(el){el.classList.toggle('is-on',el===z)});
 [].forEach.call(w.querySelectorAll('.aq-record-anatomy__row'),function(el){el.classList.toggle('is-on',z&&el.getAttribute('data-z')===String(i))});
 f.classList.toggle('is-guided',!!z);if(!z)return;
 if(!f.classList.contains('has-lens')){L.style.transition='none';requestAnimationFrame(function(){L.style.transition=''})}
 f.classList.add('has-lens');L.style.left=z.offsetLeft+'px';L.style.top=z.offsetTop+'px';L.style.width=z.offsetWidth+'px';L.style.height=z.offsetHeight+'px'}
function raOff(w){var f=w.querySelector('.aq-record-anatomy__field');raLens(w,null);if(f)f.classList.remove('has-lens')}
if(typeof document!=='undefined'&&document.addEventListener){
 ['mouseover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var r=ev.target.closest&&ev.target.closest('.aq-record-anatomy__row');if(!r)return;var w=r.closest('.aq-record-anatomy');if(w._raTour)return;raLens(w,r.getAttribute('data-z'))})});
 ['mouseout','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var r=ev.target.closest&&ev.target.closest('.aq-record-anatomy__block');if(!r||(ev.relatedTarget&&r.contains(ev.relatedTarget)))return;var w=r.closest('.aq-record-anatomy');if(w._raTour)return;raOff(w)})});
 window.AQrecordLens={to:raLens,off:raOff}}
})();
