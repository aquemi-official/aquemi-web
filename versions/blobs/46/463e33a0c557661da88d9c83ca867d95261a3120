/* Look "stage-tiles" -> StageTiles (design-system/components/StageTiles): ordered stages as a Swiss row of tiles on
   navy and limestone, each led by a huge light slash numeral ("01/"). The heading sits in a navy band over the first
   tiles; with six stages the last two stack in a column at the right (05 beside the heading, 06 under it), so the
   stages read left to right and then down. A stage with art "piping" carries a small blueprint of a pipe run (twin
   walls, fusion joints at the bends, flow arrows) in place of its numeral: the stage that checks the drawing (IQ).
   Fields (a steps block): h, intro, items [{t, d, link, label, art}]. label: a short line over the stage name (shown
   only when the name does not already contain it); art: "piping" for the drawing tile.
   Container under 1080 px: the heading over a three-column grid; phones: one column, numeral beside the words. */
function stPiping(){var P='aq-stage-tiles'+'__',run='M-6 34H58Q72 34 72 48V98Q72 112 86 112H148Q162 112 162 98V48Q162 34 176 34H246',br='M118 112V166';
 var g='';for(var x=20;x<240;x+=20)g+='M'+x+' 0V160';for(var y=20;y<160;y+=20)g+='M0 '+y+'H240';
 function jt(x,y,v){return '<path class="'+P+'jt" d="'+(v?'M'+(x-6)+' '+y+'H'+(x+6):'M'+x+' '+(y-6)+'V'+(y+6))+'"/>'}
 function ar(x,y,r){return '<path class="'+P+'ar" d="M-4 -4L2 0L-4 4" transform="translate('+x+' '+y+') rotate('+r+')"/>'}
 return '<svg class="'+P+'svg" viewBox="0 0 240 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">'
  +'<path class="'+P+'grid" d="'+g+'"/>'
  +'<path class="'+P+'pw" d="'+run+'"/><path class="'+P+'pw" d="'+br+'"/><path class="'+P+'pi" d="'+run+'"/><path class="'+P+'pi" d="'+br+'"/>'
  +'<path class="'+P+'water" d="'+run+'"/><path class="'+P+'water" d="'+br+'"/>'
  +jt(58,34,0)+jt(72,48,1)+jt(72,98,1)+jt(86,112,0)+jt(148,112,0)+jt(162,98,1)+jt(162,48,1)+jt(176,34,0)+jt(118,124,1)
  +ar(32,34,0)+ar(72,74,90)+ar(140,112,0)+ar(162,72,-90)+ar(208,34,0)+ar(118,146,90)
  +'<path class="'+P+'tb" d="M168 128H236V156H168ZM168 140H236M200 140V156"/></svg>'}
LOOKS['stage-tiles']=function(b,H){var I=b.items||[],n=I.length;
 var tiles=I.map(function(it,i){var nm=it.link&&wp(it.link)?'<a href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':tx(it.t),art=it.art==='piping';
  var lab=it.label&&String(it.t).toLowerCase().indexOf(String(it.label).toLowerCase())<0?'<span class="aq-stage-tiles__lab">'+tx(it.label)+'</span>':'';
  return '<li class="aq-stage-tiles__tile '+(i%3?'is-navy':'is-lime')+(art?' has-art':'')+'" style="--i:'+i+'">'
   +(art?'<div class="aq-stage-tiles__art">'+stPiping()+'</div>':'')
   +'<span class="aq-stage-tiles__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'<i>/</i></span>'
   +'<div class="aq-stage-tiles__body">'+lab+'<h3 class="aq-stage-tiles__t">'+nm+'</h3>'+(it.d?'<p class="aq-stage-tiles__d">'+tx(it.d)+'</p>':'')+'</div></li>'}).join('');
 return sec('<div class="aq-stage-tiles'+(n===6?' is-six':'')+'" style="--n:'+n+'"><div class="aq-stage-tiles__head">'+H+'</div>'
  +'<ol class="aq-stage-tiles__list">'+tiles+'</ol></div>','aq-stage-tiles-sec')};
