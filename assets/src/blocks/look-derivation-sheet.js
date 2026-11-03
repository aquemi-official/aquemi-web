/* Look "derivation-sheet" -> DerivationSheet (design-system/components/DerivationSheet): a grade table (as: "grades")
   worked as an engineering derivation on a calculation pad. Each row is a numbered line read left to right like an
   equation: the process step, an arrow, what sets it, a double arrow, and the typical water as the boxed answer. A
   "what sets it" cell that opens with a number and its unit ("20.0 endotoxin units per device (USP <161>); tested to
   USP <85>") is set as the line's hero figure: the number large in Geist Mono Light, the unit beside it, the reference
   and any rest under it. Lines run from the loosest step to the strictest, as the table orders them.
   Fields, as the grades table: cols [step, typical water, what sets it], rows, intro. Concept: sys-pw.0 (numbers as
   heroes, stepping type) on a calculation sheet; the pass 9 "measured editorial" spine.
   Phones (pass 12): a compact card per line (CSS only). When any answer runs over 48 characters the pad gets
   .is-stacked and every answer sits under its step (boxed to its own width) instead of as a chip beside it, so the
   lines read alike. */
(function(){
var NUM=/^(\d+(?:\.\d+)?)\s+([^(;]+?)\s*(?:\(([^)]+)\))?\s*(?:;\s*(.*))?$/;
var GRID='<svg class="aq-derivation-sheet__grid" aria-hidden="true" focusable="false"><defs><pattern id="dsgrid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16"/></pattern>'
 +'<pattern id="dsgrid5" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80"/></pattern></defs><rect width="100%" height="100%" fill="url(#dsgrid)"/><rect class="aq-derivation-sheet__g5" width="100%" height="100%" fill="url(#dsgrid5)"/></svg>';
LOOKS['derivation-sheet']=function(b,H){var C=b.cols||[],R=b.rows||[],long=R.some(function(r){return String(r[1]||'').length>48});
 var lines=R.map(function(r,i){var set=String(r[2]||''),m=set.match(NUM);
  var lim=m?'<p class="aq-derivation-sheet__v"><span class="aq-derivation-sheet__num">'+tx(m[1])+'</span><span class="aq-derivation-sheet__u">'+tx(m[2])+'</span></p>'
    +(m[3]||m[4]?'<p class="aq-derivation-sheet__ref">'+[m[3],m[4]].filter(Boolean).map(tx).join('<span aria-hidden="true"> · </span>')+'</p>':'')
   :'<ul class="aq-derivation-sheet__set">'+set.split(/;\s*/).filter(Boolean).map(function(x){return '<li>'+tx(x)+'</li>'}).join('')+'</ul>';
  return '<li class="aq-derivation-sheet__line'+(m?' is-figure':'')+'"><span class="aq-derivation-sheet__no" aria-hidden="true">('+(i+1)+')</span>'
   +'<div class="aq-derivation-sheet__given"><span class="aq-derivation-sheet__k">'+tx(C[0]||'')+'</span><h3 class="aq-derivation-sheet__t">'+tx(r[0])+'</h3></div>'
   +'<span class="aq-derivation-sheet__op" aria-hidden="true"><svg viewBox="0 0 48 16" focusable="false"><path d="M2 8H44M37 2L45 8L37 14"/></svg></span>'
   +'<div class="aq-derivation-sheet__lim"><span class="aq-derivation-sheet__k">'+tx(C[2]||'')+'</span>'+lim+'</div>'
   +'<span class="aq-derivation-sheet__op is-imp" aria-hidden="true"><svg viewBox="0 0 48 16" focusable="false"><path d="M2 5H42M2 11H42M36 1L46 8L36 15"/></svg></span>'
   +'<div class="aq-derivation-sheet__ans"><span class="aq-derivation-sheet__k">'+tx(C[1]||'')+'</span><p class="aq-derivation-sheet__w">'+tx(r[1])+'</p><span class="aq-derivation-sheet__box" aria-hidden="true"></span></div></li>'}).join('');
 return sec(H+'<div class="aq-derivation-sheet'+(long?' is-stacked':'')+'">'+GRID+'<span class="aq-derivation-sheet__margin" aria-hidden="true"></span><ol class="aq-derivation-sheet__lines">'+lines+'</ol></div>','aq-derivation-sheet-sec')};
})();
