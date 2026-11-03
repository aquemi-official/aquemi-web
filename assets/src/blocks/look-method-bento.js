/* Look "method-bento" -> MethodBento (design-system/components/MethodBento): a short comparison table (one row per
   method) set as a bento of method tiles, each explained by a drawing. The row whose figure is a temperature scale
   is the wide navy tile (a thermometer rail with the zones the row names: solid up to the first mark, dashed between
   marks, struck past the last); the others are paper tiles with a line drawing ("chemical": a dosing point on the pipe
   with the sanitant dispersing and a test tube for the residual; "uv": a UV chamber with its lamp sleeve and rays).
   The section intro becomes an empty, dashed tile for the method that is not offered (absent), so what is missing
   reads as a gap in the set, not a footnote. Each tile: number, method name large, then the other columns as a
   short list under their column names.
   Fields (a table block): h, intro, cols, rows [[method, how, fit, trade-off]], anchor, figs [name per row: "chemical",
   "hot", "uv"], scale {row, marks [{v, l}]} (the temperature figure: marks in °C along a 0–100 rail), absent (the
   missing method's name, shown large in outline on the dashed tile with the intro). scale.base: the reading below the
   first mark (motion.js turns the rail into a probe the visitor can drag along it, with detents at the marks). Without absent the intro stays in
   the section head (sys-storage: the single ozone line lives there, DR-013).
   Pass 12 layout: desktop reads as a table drawn as tiles: the temperature scale runs as a full-width navy band under
   the heading, the hot-water column hangs from it in navy, and the three methods stand as equal columns whose
   number, name, drawing and three column rows line up across (subgrid). Under 900 px a 3-segment switch (PhoneKit
   chips, the method names) shows one method card at a time, its drawing or scale on top. */
(function(){
var K='aq-method-bento';function P(d,c){return '<path class="'+K+'__'+(c||'ln')+'" d="'+d+'"/>'}
var FIG={
 chemical:function(){var o=P('M10 70H230M10 92H230')+P('M10 81H230','fl')+P('M52 10H92V40H52Z','fill')+P('M72 40V70','ln')+P('M60 22H84','th')
  +P('M72 50q-3 5 0 8q3-3 0-8','fl');var s=3;function r(){s=(s*9301+49297)%233280;return s/233280}
  for(var i=0;i<26;i++){var x=82+i*5.4,sp=(x-82)/140*9;o+='<circle class="aq-method-bento__dot" cx="'+x.toFixed(1)+'" cy="'+(81+(r()-0.5)*2*sp).toFixed(1)+'" r="1.4"/>'}
  return o+P('M204 14V54A6 6 0 0 0 216 54V14M200 14H220','ln')+P('M205 40H215','fl')},
 /* pass 12: hot water, drawn for the hot-water column under the band: the loop's pipe heated through an exchanger
    (shell and coil), heat rising off the run, the check at the far (coldest) end */
 hot:function(){var o=P('M10 70H230M10 92H230')+P('M10 81H230','fl')+P('M40 12H110V44H40Z','fill')+P('M48 28l8 -8l8 16l8 -16l8 16l8 -16l8 8','th')
  +P('M58 44V70M92 44V70','ln');for(var x=128;x<=188;x+=20)o+=P('M'+x+' 62q-4 -6 0 -12q4 -6 0 -12','ray');
  return o+'<circle class="aq-method-bento__fill" cx="214" cy="40" r="12"/>'+P('M214 52V70','ln')+P('M214 46V33','fl')},
 uv:function(){var o=P('M30 40H210A20 20 0 0 1 210 80H30A20 20 0 0 1 30 40Z','fill')+P('M36 55H204V65H36Z','fl')+P('M210 60H232M226 54V66','ln')
  +P('M60 80V96M180 80V96M52 96H68M172 96H188','ln');
  for(var x=52;x<=188;x+=17)o+=P('M'+x+' 52q-3 -3 0 -6q3 -3 0 -6M'+x+' 68q-3 3 0 6q3 3 0 6','ray');return o}
};
function fig(n){return FIG[n]?'<svg class="aq-method-bento__fig" viewBox="0 0 240 110" aria-hidden="true" focusable="false">'+FIG[n]()+'</svg>':''}
function scale(sc){var M=(sc&&sc.marks)||[],a=M.length?M[0].v:100,z=M.length?M[M.length-1].v:100,t='';
 for(var v=0;v<=100;v+=5)t+=P('M'+(v*10)+' '+(v%10?44:40)+'V52','tick');
 var svg='<span class="aq-method-bento__bulb" aria-hidden="true"></span><svg class="aq-method-bento__rail" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
  +P('M0 20H'+(a*10),'hot')+P('M'+(a*10)+' 20H'+(z*10),'hot is-review')+P('M'+(z*10)+' 20H1000','hot is-out')
  +P('M0 30H1000','base')+t+'</svg>';
 var lab=M.map(function(k,i){return '<li class="aq-method-bento__mark'+(i===0&&M.length>1?' is-left':'')+'" style="--at:'+k.v+'%"><span class="aq-method-bento__mv">'+e(k.v)+' °C</span><span class="aq-method-bento__ml">'+tx(k.l)+'</span></li>'}).join('');
 return '<div class="aq-method-bento__scale"'+(sc.base?' data-base="'+e(sc.base)+'"':'')+'>'+svg+'<ul class="aq-method-bento__marks" role="list">'+lab+'</ul></div>'}
LOOKS['method-bento']=function(b,H){
 var R=b.rows||[],C=b.cols||[],F=b.figs||[],sc=b.scale||null,hasAbs=!!b.absent;
 if(hasAbs)H=wSecHead({eyebrow:b.eyebrow,h:b.h});
 var tiles=R.map(function(r,i){var hot=sc&&sc.row===i,f=F[i]||'',cls='aq-method-bento__tile'+(hot?' is-hot':'')+' is-'+(i===0?'a':i===1?'b':'c');
  var dl='<dl class="aq-method-bento__dl">'+r.slice(1).map(function(c,j){return '<div><dt>'+e(C[j+1]||'')+'</dt><dd>'+tcell(c)+'</dd></div>'}).join('')+'</dl>';
  /* phones: the method's name is also its segment in the switch (a PhoneKit chip, hidden on desktop) */
  return '<li class="'+cls+'" data-pk-item="'+i+'"><button type="button" class="aq-method-bento__seg" data-pk-head>'+tx(typeof r[0]==='object'&&r[0]?r[0].t:r[0])+'</button>'
   +'<div class="aq-method-bento__card" data-pk-body><p class="aq-method-bento__no" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</p><h3 class="aq-method-bento__t">'+tcell(r[0])+'</h3>'
   +(hot?scale(sc)+fig(f):fig(f))+dl+'</div></li>'}).join('');
 var gap=hasAbs?'<li class="aq-method-bento__tile aq-method-bento__gap"><p class="aq-method-bento__ghost" aria-hidden="true">'+tx(b.absent)+'</p><p class="aq-method-bento__gapt">'+tx(b.intro||'')+'</p></li>':'';
 return sec('<div class="aq-method-bento'+(sc?' has-band':'')+'"><div class="aq-method-bento__head">'+H+'</div><ol class="aq-method-bento__tiles" role="list" data-pk-picker="chips" data-pk-bp="900" data-pk-open="0">'+tiles+gap+'</ol></div>','aq-method-bento-sec')};
})();
