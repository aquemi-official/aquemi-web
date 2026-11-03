/* Look "reader-split" -> ReaderSplit (design-system/components/ReaderSplit): an evidence table (who, what they read,
   where we answer it) on a band split down the middle: the readers stand on the navy half, what each one reads and
   where we answer it sit across the seam on the limestone half, row against row. The seam is a drawn line with one
   node per row; hovering a row lights its node and draws a tie across the seam.
   Fields, as the evidence table: h, intro, cols, rows [who, read, {t, link, intent}], fold, fold_noun.
   The first two column names head the halves once (aria-hidden) and are repeated in each row as a label before the
   reader and before the reading, visually hidden at every width (read by assistive tech). The third column's name
   labels each answer on wide screens; on phones the three names show once, as a key above the rows (pass 12, S12).
   Phones (PhoneKit accordion, under 860 px): each reader becomes a 48 px navy head button (index, reader, chevron)
   and its reading and answer the body under it, one open at a time (the first by default). The desktop reader cell
   is the head's data-pk-desk twin; without script every row shows open.
   Concept: systems.2 (navy/limestone split where the seam is the boundary; STYLE-ATLAS hybrid 4, "battery-limit split,
   calm", in light type). */
(function(){
/* pass 12 (F9): a hyphenated word in a phone head is kept on one line ("hand-off", not "hand- / off"); only text
   between tags is touched */
function rsBind(h){return String(h).replace(/(^|>)([^<]+)/g,function(m,a,t){return a+t.replace(/([A-Za-z]+-[A-Za-z]+)/g,'<span class="aq-reader-split__nb">$1</span>')})}
LOOKS['reader-split']=function(b,H){var C=b.cols||[],R=b.rows||[],n=R.length,
  tight=n&&R.every(function(r){return String(r[0]||'').length<=30});/* pass 12 C: short reader names, a 4fr 8fr split */
 var lab=function(j){return C[j]?'<span class="aq-reader-split__lab">'+tx(C[j])+'</span>':''};
 var rows=R.map(function(r,i){var go=r[2],lk=go&&typeof go==='object'&&go.link&&wp(go.link);
  return fli('<li class="aq-reader-split__row" data-pk-item="'+i+'"><h3 class="aq-reader-split__ph"><button type="button" class="aq-reader-split__head-btn" data-pk-head>'+idx(i)+lab(0)+'<span class="aq-reader-split__pt">'+rsBind(tx(r[0]))+'</span><span class="aq-phone-kit__chev" aria-hidden="true"></span></button></h3>'
   +'<div class="aq-reader-split__who" data-pk-desk>'+idx(i)+lab(0)+'<h3 class="aq-reader-split__t">'+tx(r[0])+'</h3></div>'
   +'<span class="aq-reader-split__tie" aria-hidden="true"><span class="aq-reader-split__node"></span></span>'
   +'<div class="aq-reader-split__what" data-pk-body>'+lab(1)+'<p class="aq-reader-split__read">'+tx(r[1])+'</p>'
   +(lk?'<a class="aq-reader-split__go" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':'')+'><span class="aq-reader-split__k">'+tx(C[2]||'')+'</span><span>'+tx(go.t)+'</span></a>'
     :(go?'<p class="aq-reader-split__go"><span class="aq-reader-split__k">'+tx(C[2]||'')+'</span><span>'+tcell(go)+'</span></p>':''))+'</div></li>',b,i)}).join('');
 var colh='<p class="aq-reader-split__colh" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span>'+(C[2]?'<span class="aq-reader-split__colk">'+tx(C[2])+'</span>':'')+'</p>';
 return '<section class="aq-section aq-band--split aq-reader-split-sec'+(tight?' is-tight':'')+'"><span class="aq-reader-split__ground" aria-hidden="true"></span><div class="aq-in"><div class="aq-reader-split">'
  +'<div class="aq-reader-split__head">'+H+'</div>'+colh+wFold(b,n,'<ol class="aq-reader-split__rows" data-pk-picker="accordion" data-pk-open="0">'+rows+'</ol>',b.fold_noun)+'</div></div></section>'};
})();
