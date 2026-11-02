/* Look "reader-split" -> ReaderSplit (design-system/components/ReaderSplit): an evidence table (who, what they read,
   where we answer it) on a band split down the middle: the readers stand on the navy half, what each one reads and
   where we answer it sit across the seam on the limestone half, row against row. The seam is a drawn line with one
   node per row; hovering a row lights its node and draws a tie across the seam.
   Fields, as the evidence table: h, intro, cols, rows [who, read, {t, link, intent}], fold, fold_noun.
   Concept: systems.2 (navy/limestone split where the seam is the boundary; STYLE-ATLAS hybrid 4, "battery-limit split,
   calm", in light type). */
(function(){
LOOKS['reader-split']=function(b,H){var C=b.cols||[],R=b.rows||[],n=R.length;
 var rows=R.map(function(r,i){var go=r[2],lk=go&&typeof go==='object'&&go.link&&wp(go.link);
  return fli('<li class="aq-reader-split__row"><div class="aq-reader-split__who">'+idx(i)+'<h3 class="aq-reader-split__t">'+tx(r[0])+'</h3></div>'
   +'<span class="aq-reader-split__tie" aria-hidden="true"><span class="aq-reader-split__node"></span></span>'
   +'<div class="aq-reader-split__what"><p class="aq-reader-split__read">'+tx(r[1])+'</p>'
   +(lk?'<a class="aq-reader-split__go" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':'')+'><span class="aq-reader-split__k">'+tx(C[2]||'')+'</span><span>'+tx(go.t)+'</span></a>'
     :(go?'<p class="aq-reader-split__go"><span class="aq-reader-split__k">'+tx(C[2]||'')+'</span><span>'+tcell(go)+'</span></p>':''))+'</div></li>',b,i)}).join('');
 var colh='<p class="aq-reader-split__colh" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span></p>';
 return '<section class="aq-section aq-band--split aq-reader-split-sec"><span class="aq-reader-split__ground" aria-hidden="true"></span><div class="aq-in"><div class="aq-reader-split">'
  +'<div class="aq-reader-split__head">'+H+'</div>'+colh+wFold(b,n,'<ol class="aq-reader-split__rows">'+rows+'</ol>',b.fold_noun)+'</div></div></section>'};
})();
