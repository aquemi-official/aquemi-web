/* Look "pack-matrix" -> PackMatrix (design-system/components/PackMatrix): a docs block that is issued again and again
   (one pack per client and period) drawn as that repetition. Left, a matrix of identical packs, one row per client and
   one column per period (aria-hidden; the intro says it in words); one pack is pulled out and a leader runs from it
   to the right, where it lies open as a sheet: its documents in a two-column grid, each with a large light numeral,
   the name and what it holds. Key documents (key: true) carry a flow rule and a flow numeral.
   Fields, as docs: h, intro, items [{t, d, key, link, intent}], fold, fold_noun (phones only).
   Added: matrix {rows, cols, at: [row, col], y, x} (the grid's size, the pack pulled out, the two axis words; all
   decorative). Concept: sys-pw.2 (Swiss grid with one cell that differs) and 45-concept-evidence (records read off). */
(function(){
LOOKS['pack-matrix']=function(b,H){var I=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=I.length,M=b.matrix||{},rr=M.rows||3,cc=M.cols||4,at=M.at||[1,cc-2];
 var cells='';for(var r=0;r<rr;r++)for(var c=0;c<cc;c++){var on=r===at[0]&&c===at[1];cells+='<span class="aq-pack-matrix__pk'+(on?' is-open':'')+'" style="--r:'+(r+1)+';--c:'+(c+1)+'"></span>'}
 var grid='<div class="aq-pack-matrix__grid" aria-hidden="true" style="--rows:'+rr+';--cols:'+cc+';--ar:'+(at[0]+1)+';--ac:'+(at[1]+1)+'">'
  +(M.y?'<span class="aq-pack-matrix__ax aq-pack-matrix__ax--y">'+e(M.y)+'</span>':'')+(M.x?'<span class="aq-pack-matrix__ax aq-pack-matrix__ax--x">'+e(M.x)+'</span>':'')
  +'<span class="aq-pack-matrix__cells">'+cells+'</span><span class="aq-pack-matrix__lead"></span></div>';
 var docs=I.map(function(x,i){var name=x.link&&wp(x.link)?wlink(x.link,x.t,x.intent):tx(x.t);
  return fli('<li class="aq-pack-matrix__doc'+(x.key?' is-key':'')+'"><span class="aq-pack-matrix__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<h3 class="aq-pack-matrix__t">'+name+'</h3>'+(x.d?'<p class="aq-pack-matrix__d">'+tx(x.d)+'</p>':'')+'</li>',b,i)}).join('');
 var sheet='<div class="aq-pack-matrix__sheet"><span class="aq-pack-matrix__strip" aria-hidden="true"><span>'+e(b.nav||'')+'</span><span>'+n+' '+e(b.fold_noun||'documents')+'</span></span>'
  +wFold(b,n,'<ol class="aq-pack-matrix__docs">'+docs+'</ol>',b.fold_noun)+'</div>';
 return sec(H+'<div class="aq-pack-matrix">'+grid+sheet+'</div>','aq-pack-matrix-sec')};
})();
