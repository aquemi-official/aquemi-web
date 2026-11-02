/* Look "colophon" -> Colophon (design-system/components/Colophon): a spec block of company facts set as a split
   ledger (pass 9b, concept about.0). A navy band with a limestone strip down its left edge; the section title is set
   very large and straddles the edge of the strip, so the colour split runs through the headline (limestone type on
   navy, navy type on limestone: an aria-hidden copy of the title clipped to the strip) and on down through the facts
   ledger: number and item on the strip, the fact and the evidence on the navy. The highlighted row's value is split at
   its first full stop (words unchanged): the first sentence as the fact, the rest under it, quieter.
   Fields: h, caption (eyebrow), intro, cols [item, fact, evidence], rows [{p, v, m, hl, link, link_label, intent}],
   note, fold, fold_noun. */
function cphGo(r){return r.link&&wp(r.link)?'<a class="aq-colophon__go" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'"'+(r.intent?' data-intent="'+e(r.intent)+'"':'')+'>'+tx(r.link_label||wlabel(r.link))+'</a>':''}
LOOKS['colophon']=function(b,H){var R=b.rows||[],C=b.cols||[],num=function(i){return (i<9?'0':'')+(i+1)};
 var items=R.map(function(r,i){var v=String(r.v||''),a=v,z='';
  if(r.hl){var k=v.search(/\.\s+(?=[A-Z\[])/);if(k>=0){a=v.slice(0,k+1);z=v.slice(k+1).trim()}}
  return fli('<li class="aq-colophon__row'+(r.hl?' is-hl':'')+'" style="--i:'+i+'">',b,i)
   +'<div class="aq-colophon__p"><span class="aq-colophon__n" aria-hidden="true">'+num(i)+' /</span><h3 class="aq-colophon__pt">'+tx(r.p)+'</h3></div>'
   +'<div class="aq-colophon__v"><p class="aq-colophon__va">'+tx(a)+'</p>'+(z?'<p class="aq-colophon__vz">'+tx(z)+'</p>':'')+'</div>'
   +'<p class="aq-colophon__m">'+(r.m?'<span class="aq-colophon__ev">'+tx(r.m)+'</span>':'')+cphGo(r)+'</p></li>'}).join('');
 var head=C.length?'<div class="aq-colophon__head" aria-hidden="true">'+C.slice(0,3).map(function(c){return '<span>'+tx(c)+'</span>'}).join('')+'</div>':'';
 var list='<ol class="aq-colophon__rows" role="list">'+items+'</ol>';
 return sec('<div class="aq-colophon"><span class="aq-colophon__strip" aria-hidden="true"></span>'
  +'<div class="aq-colophon__mast">'+H+'<p class="aq-colophon__ghost" aria-hidden="true">'+tx(b.h)+'</p></div>'
  +head+wFold(b,R.length,list,b.fold_noun||'facts')+wSpecNote(b)+'</div>','aq-band--navy aq-colophon-sec')};
