/* Look "cost-balance" -> CostBalance (design-system/components/CostBalance): what it costs to run, drawn as a balance
   around the system, the way a process engineer draws a mass balance. A dashed system boundary stands in the middle
   with the treatment train inside it as a row of flat line glyphs on one water line; every running cost is a stream
   crossing the boundary: the items that go in (plan, membranes, media, energy, chemicals) arrive from the left on
   ruled wires with an arrowhead at the boundary, the item that leaves (water to drain) runs out to the right as water.
   Each stream carries the item, its interval or amount in mono, and what sets it.
   Fields as a spec block: h, cols, rows [{p, v, m, link, side}], fold, fold_noun, note. side: "out" puts a row on the
   leaving side (default: in). glyphs (optional): icon names for the train inside the boundary (default softener,
   carbon-filter, ro-membrane, edi, uv, tank). A row's link makes its name the link. Desktop shows every stream; the
   fold applies on phones, where the balance runs top to bottom: streams in, the boundary, streams out. */
LOOKS['cost-balance']=function(b,H){var R=b.rows||[],C=b.cols||[],K='aq-cost-balance';
 var G=(b.glyphs||['softener','carbon-filter','ro-membrane','edi','uv','tank']).filter(isIcon);
 var setBy=C[2]||'',item=function(r,i,side){var nm=r.link&&wp(r.link)?wlink(r.link,r.p):tx(r.p);
  return fli('<li class="'+K+'__s '+K+'__s--'+side+'"><span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<div class="'+K+'__txt"><h3 class="'+K+'__p">'+nm+'</h3><p class="'+K+'__v">'+tx(r.v)+'</p>'
   +(r.m?'<p class="'+K+'__m">'+(setBy?'<span class="'+K+'__mk">'+tx(setBy)+'</span> ':'')+tx(r.m)+'</p>':'')+'</div>'
   +'<span class="'+K+'__wire" aria-hidden="true"><span class="'+K+'__line"></span><span class="'+K+'__head"></span></span></li>',b,i)};
 var ins='',outs='';R.forEach(function(r,i){if(r&&r.side==='out')outs+=item(r,i,'out');else ins+=item(r,i,'in')});
 var train='<div class="'+K+'__sys" aria-hidden="true"><span class="'+K+'__edge"></span><div class="'+K+'__train"><span class="'+K+'__water"></span>'
  +G.map(function(g){return '<span class="'+K+'__g">'+wIcon(g,K+'__ic')+'</span>'}).join('')+'</div></div>';
 var inner='<div class="'+K+'"><ol class="'+K+'__in" role="list">'+ins+'</ol>'+train+'<ol class="'+K+'__out" role="list">'+outs+'</ol></div>';
 var note=b.note?'<p class="'+K+'__note">'+tx(b.note)+'</p>':'';
 return sec(H+wFold(b,R.length,inner,b.fold_noun||'items')+note,K+'-sec')};
