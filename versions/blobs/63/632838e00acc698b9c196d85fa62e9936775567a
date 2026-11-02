/* Look "winding-route" -> WindingRoute (design-system/components/WindingRoute): a treatment train as one winding pipe
   across a navy band. Each stage is a stop on the wave (high, low, high …) with its line glyph on the far side of the
   curve; under the band, a column per stage: "01 / label", the stage name and its line. Water enters on a fan of feed
   lines at the left and leaves on a fan at the right. Phones: the pipe turns vertical and winds down the left edge,
   one bend per stage, the text beside it.
   Fields (a diagram block): h, stages (or items) [{t, d, spot | icon, label, fx}]. label: a short stop name for the
   mono code ("Feed", "RO 1"; default the first word of t). fx: "gas" draws a few rising bubbles over that stop.
   optional: true (or the word to show, a string) marks a stage fitted only on some systems (DR-018 rule 2: optional
   equipment is never drawn as standard): its stop is drawn dashed (node ring, and the phone bend) and its mono code
   carries "Where fitted" (or the given word) after the label; the class is-optional is set on the stop. */
function wrWave(n){var d='M0 50',x0=0,y0=50,i;
 for(i=0;i<n;i++){var x=100*i+50,y=i%2?25:75;d+='C'+(x0+(x-x0)/2)+' '+y0+' '+(x-(x-x0)/2)+' '+y+' '+x+' '+y;x0=x;y0=y}
 return d+'C'+(x0+25)+' '+y0+' '+(100*n-25)+' 50 '+(100*n)+' 50'}
LOOKS['winding-route']=function(b,H){
 var I=b.stages||b.items||[],n=I.length,W=100*n,wave=wrWave(n);
 var fanIn=[30,42,58,70].map(function(y){return 'M0 '+y+'C10 '+y+' 12 50 24 50'}).join(''),
  fanOut=[30,50,70].map(function(y){return 'M'+(W-24)+' 50C'+(W-12)+' 50 '+(W-10)+' '+y+' '+W+' '+y}).join('');
 var line='<svg class="aq-winding-route__line" viewBox="0 0 '+W+' 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
  +'<path class="aq-winding-route__fan" d="'+fanIn+'"/><path class="aq-winding-route__pipe" d="'+wave+'"/><path class="aq-winding-route__flow" d="'+wave+'"/>'
  +'<path class="aq-winding-route__fan aq-winding-route__fan--out" d="'+fanOut+'"/></svg>';
 var gas='<span class="aq-winding-route__gas" aria-hidden="true">'+[[-14,-30],[10,-44],[-4,-62],[18,-74],[-20,-86],[4,-98],[-10,-116],[14,-128],[0,-146]].map(function(p){return '<i style="--gx:'+p[0]+';--gy:'+p[1]+'"></i>'}).join('')+'</span>';
 var stops=I.map(function(it,i){var high=i%2===1,lab=it.label||String(it.t||'').split(/\s+/)[0],opt=it.optional?(typeof it.optional==='string'?it.optional:'Where fitted'):'',g=wSpot(it.spot||it.icon,'','aq-spot--on-navy aq-winding-route__glyph');
  var seg='<svg class="aq-winding-route__seg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M50 0C50 25 '+(high?70:30)+' 25 '+(high?70:30)+' 50S50 75 50 100"'+(opt?' stroke-dasharray="8 6"':'')+'/></svg>';
  return '<li class="aq-winding-route__stop '+(high?'is-high':'is-low')+(i===0?' is-first':'')+(i===n-1?' is-last':'')+(opt?' is-optional':'')+'" style="--k:'+i+'">'
   +'<div class="aq-winding-route__mark" aria-hidden="true">'+seg+'<span class="aq-winding-route__tail"></span>'+g+(it.fx==='gas'?gas:'')+'<span class="aq-winding-route__node"'+(opt?' style="border-style:dashed"':'')+'></span></div>'
   +'<div class="aq-winding-route__text"><p class="aq-winding-route__code"><span>'+(i<9?'0':'')+(i+1)+'</span> / '+tx(lab)+(opt?' · '+tx(opt):'')+'</p>'
   +'<h3 class="aq-winding-route__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="aq-winding-route__d">'+tx(it.d)+'</p>':'')+'</div></li>'}).join('');
 return sec(H+'<div class="aq-winding-route" style="--n:'+n+'">'+line+'<span class="aq-winding-route__drop" aria-hidden="true"></span><ol class="aq-winding-route__stops">'+stops+'</ol></div>','aq-band--navy aq-winding-route-sec')};
