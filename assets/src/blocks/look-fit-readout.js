/* Look "fit-readout" -> FitReadout (design-system/components/FitReadout): a fit test read off an instrument. A navy
   readout plots the loop material's pressure rating falling as it heats, with one limit line where the rated range
   ends (beyond it the field is hatched out); beside it the first rows are the numbered rule tiles (the test), and the
   remaining rows are outlined tags (what is not served, or where another page answers), each linking its home.
   The readout's words come from the highlighted row (hl, else the first): its two axis words are the condition split at
   "and" ("Temperature and pressure"), and the axis numbers are drawn only when its answer states a range ("0 to 80 °C");
   with none, the axis is bare. The caption is the readout's title strip.
   Concept: design-system/inspiration/gemini/193-p12-industries-fit.png (idea only: never its axis figures or tags).
   Fields (a spec block): h, intro, caption, rows [{p, v, m, link, link_label, hl}], tiles (how many rows are tiles,
   default 3). Phones: the readout first at full width, then the tiles stacked, then the tags stacked. */
function frAxis(r){var w=String(r&&r.p||'').split(/\s+and\s+/i),cap=function(s){s=String(s||'').trim();return s.charAt(0).toUpperCase()+s.slice(1)};
 var m=String(r&&r.v||'').match(/(-?\d+(?:[.,]\d+)?)\s*(?:to|–|-)\s*(-?\d+(?:[.,]\d+)?)\s*(°\s?[CF])/);
 return {x:w.length===2?cap(w[0]):'',y:w.length===2?cap(w[1]):'',lo:m?m[1]:'',hi:m?m[2]+' '+m[3].replace(/\s/g,''):''}}
function frChart(r,k){var a=frAxis(r),W=360,Hh=250,x0=46,x1=338,y0=208,y1=22,lim=x0+(x1-x0)*0.78,id='frh-'+k;
 /* the rating curve: full at the cold end, falling faster as it heats, ending at the limit line */
 var pts=[],i,t;for(i=0;i<=24;i++){t=i/24;pts.push([x0+(lim-x0)*t,y1+18+(y0-y1-46)*Math.pow(t,1.7)])}
 var d='M'+pts.map(function(p){return p[0].toFixed(1)+' '+p[1].toFixed(1)}).join('L'),end=pts[pts.length-1];
 var ticks='';for(i=0;i<=12;i++){var tx_=x0+(x1-x0)*i/12;ticks+='M'+tx_.toFixed(1)+' '+y0+'v'+(i%3?4:7)}
 for(i=0;i<=8;i++){var ty=y0-(y0-y1)*i/8;ticks+='M'+x0+' '+ty.toFixed(1)+'h-'+(i%2?4:7)}
 return '<svg class="aq-fit-readout__chart" viewBox="0 0 '+W+' '+Hh+'" aria-hidden="true" focusable="false">'
  +'<defs><pattern id="'+id+'" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V8"/></pattern></defs>'
  +'<rect class="aq-fit-readout__out" x="'+lim.toFixed(1)+'" y="'+y1+'" width="'+(x1-lim).toFixed(1)+'" height="'+(y0-y1)+'" fill="url(#'+id+')"/>'
  +'<path class="aq-fit-readout__grid" d="M'+x0+' '+y1+'H'+x1+'M'+x0+' '+((y0+y1)/2)+'H'+x1+'M'+((x0+x1)/2)+' '+y1+'V'+y0+'"/>'
  +'<path class="aq-fit-readout__ax" d="M'+x0+' '+y1+'V'+y0+'H'+x1+ticks+'"/>'
  +'<path class="aq-fit-readout__curve" d="'+d+'"/>'
  +'<path class="aq-fit-readout__tail" d="M'+end[0].toFixed(1)+' '+end[1].toFixed(1)+'Q'+(lim+26).toFixed(1)+' '+(end[1]+18).toFixed(1)+' '+(x1-6)+' '+(y0-8)+'"/>'
  +'<path class="aq-fit-readout__lim" d="M'+lim.toFixed(1)+' '+(y1-6)+'V'+(y0+4)+'"/>'
  +'<circle class="aq-fit-readout__dot" cx="'+pts[0][0].toFixed(1)+'" cy="'+pts[0][1].toFixed(1)+'" r="4.5"/>'
  +'<circle class="aq-fit-readout__end" cx="'+end[0].toFixed(1)+'" cy="'+end[1].toFixed(1)+'" r="4.5"/>'
  +(a.y?'<text class="aq-fit-readout__lab" transform="translate(16 '+((y0+y1)/2)+') rotate(-90)" text-anchor="middle">'+e(a.y)+'</text>':'')
  +(a.x?'<text class="aq-fit-readout__lab" x="'+((x0+lim)/2).toFixed(1)+'" y="'+(Hh-6)+'" text-anchor="middle">'+e(a.x)+'</text>':'')
  +(a.lo!==''?'<text class="aq-fit-readout__val" x="'+x0+'" y="'+(y0+22)+'" text-anchor="middle">'+e(a.lo)+'</text>':'')
  +(a.hi?'<text class="aq-fit-readout__val aq-fit-readout__val--lim" x="'+lim.toFixed(1)+'" y="'+(y0+22)+'" text-anchor="middle">'+e(a.hi)+'</text>':'')
  +'</svg>'}
var frUid=0;
LOOKS['fit-readout']=function(b,H){var R=b.rows||[],K='aq-fit-readout',T=Math.min(R.length,b.tiles>0?b.tiles:3),hl=R.filter(function(r){return r&&r.hl})[0]||R[0];
 var link=function(r,cls){return r.link&&wp(r.link)?'<a class="'+K+'__go'+(cls?' '+cls:'')+'" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':''};
 var readout='<figure class="'+K+'__readout">'+(b.caption?'<p class="'+K+'__cap" aria-hidden="true"><span>'+tx(b.caption)+'</span><span class="'+K+'__led"></span></p>':'')
  +frChart(hl,++frUid)+'</figure>';
 var tiles='<ol class="'+K+'__tiles" role="list">'+R.slice(0,T).map(function(r,i){
  return '<li class="'+K+'__tile'+(r===hl?' is-hl':'')+'" style="--i:'+i+'">'+idx(i)+'<h3 class="'+K+'__t">'+tx(r.p)+'</h3>'
   +(r.v?'<p class="'+K+'__v">'+tx(r.v)+'</p>':'')+(r.m?'<p class="'+K+'__m">'+tx(r.m)+'</p>':'')+link(r)+'</li>'}).join('')+'</ol>';
 var tags=R.length>T?'<ul class="'+K+'__tags" role="list">'+R.slice(T).map(function(r,i){var no=/^not\b/i.test(String(r.v||''));
  return '<li class="'+K+'__tag'+(no?' is-not':'')+'" style="--i:'+i+'"><p class="'+K+'__tp">'+tx(r.p)+'</p>'
   +(r.v?'<p class="'+K+'__tv">'+tx(r.v)+'</p>':'')+(r.m?'<p class="'+K+'__tm">'+tx(r.m)+'</p>':'')+link(r,K+'__go--tag')+'</li>'}).join('')+'</ul>':'';
 return sec(H+'<div class="'+K+'">'+readout+tiles+tags+'</div>',K+'-sec')};
