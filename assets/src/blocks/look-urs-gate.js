/* Look "urs-gate" -> UrsGate (design-system/components/UrsGate): an options block of decisions that must be made before
   a gate, set as one project line running into it. The decisions stand along the line, alternately above and below,
   each on a stem with a huge light numeral; the line ends at the gate: a bar and the gate's word as giant outline
   type, cropped by the page edge (decorative; the heading names it). Hover or focus a decision and its stem and node
   light. Fields, as options: h, items [{t, d, link, link_label}], fold, fold_noun (phones only).
   Added: gate (the word set large, "URS"), gate_label (the small mark on the bar, "Approved"); both aria-hidden.
   Concepts: services.0 (giant cropped outline type) and services.1 (nodes on a line to a hold point). */
(function(){
LOOKS['urs-gate']=function(b,H){var I=b.items||[],n=I.length;
 var items=I.map(function(it,i){var lk=it.link&&wp(it.link)?'<a class="aq-urs-gate__link" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.link_label||wlabel(it.link))+'</a>':'';
  return fli('<li class="aq-urs-gate__item'+(i%2?' is-low':'')+'" style="--c:'+(2*i+1)+'"><span class="aq-urs-gate__stem" aria-hidden="true"><span class="aq-urs-gate__node"></span></span>'
   +'<span class="aq-urs-gate__n" aria-hidden="true"><span>'+(i<9?'0':'')+(i+1)+'</span></span><h3 class="aq-urs-gate__t">'+tx(it.t)+'</h3>'
   +(it.d?'<p class="aq-urs-gate__d">'+tx(it.d)+'</p>':'')+lk+'</li>',b,i)}).join('');
 var gate='<div class="aq-urs-gate__gate" aria-hidden="true"><span class="aq-urs-gate__bar"></span>'+(b.gate_label?'<span class="aq-urs-gate__mark">'+e(b.gate_label)+'</span>':'')
  +(b.gate?'<span class="aq-urs-gate__word">'+e(b.gate)+'</span>':'')+'</div>';
 var body='<div class="aq-urs-gate" style="--cols:'+(2*n+1)+'"><span class="aq-urs-gate__axis" aria-hidden="true"><span class="aq-urs-gate__water"></span></span>'
  +'<ol class="aq-urs-gate__list">'+items+'</ol>'+gate+'</div>';
 return sec(H+wFold(b,n,body,b.fold_noun),'aq-urs-gate-sec')};
})();
