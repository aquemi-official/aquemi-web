/* Look "marking-match" -> MarkingMatch (design-system/components/MarkingMatch): supplier control as two rules and a
   clean schedule. The block's two standing rules come first as headline-sized facts (a mono label, the rule set large
   and light; a fact may carry a small line glyph: "gate", a pipe run whose water stops at a closed valve). Under them
   the supplies as a ruled table between vertical hairlines: numbered supply, what we require, how we verify it (each
   check led by a flow tick). Pointing at a cell lights its row and its column head (chart-crosshair, motion.js).
   Fields, as a table: facts [{k (short label), v (the rule; [placeholders] allowed), glyph ("gate", optional)}], cols
   [supply, what we require, how we verify it], rows (cells strings or {t, link}), fold, fold_noun (phones only).
   Phones: facts stack; each supply stacks its three cells with the column names as small labels. */
LOOKS['marking-match']=function(b,H){var C=b.cols||[],R=b.rows||[],F=b.facts||[];
 var nn=function(i){return (i<9?'0':'')+(i+1)};
 var gate='<svg class="aq-marking-match__gate" viewBox="0 0 132 72" aria-hidden="true" focusable="false">'
  +'<path class="aq-marking-match__pw" d="M2 30H50M2 46H50M82 30H130M82 46H130"/>'
  +'<path class="aq-marking-match__vb" d="M50 22V54L82 22V54Z"/><path class="aq-marking-match__vs" d="M66 38V10M56 8H76"/>'
  +'<path class="aq-marking-match__wf" d="M2 38H46"/><path class="aq-marking-match__gt" d="M66 24V52"/></svg>';
 var facts=F.length?'<div class="aq-marking-match__facts">'+F.map(function(f,i){
  return '<div class="aq-marking-match__fact'+(f.glyph?' has-glyph':'')+'"><p class="aq-marking-match__fk"><span aria-hidden="true">'+nn(i)+' / </span>'+tx(f.k||'')+'</p>'
   +'<p class="aq-marking-match__fv">'+tx(f.v||'')+'</p>'+(f.glyph==='gate'?gate:'')+'</div>'}).join('')+'</div>':'';
 var k=function(i){return C[i]?'<p class="aq-marking-match__k">'+tx(C[i])+'</p>':''};
 var tick='<svg class="aq-marking-match__ok" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8.5L6.5 12L13 4.5"/></svg>';
 var head='<div class="aq-marking-match__head" aria-hidden="true">'+[0,1,2].map(function(i){return '<span data-c="'+i+'">'+tx(C[i]||'')+'</span>'}).join('')+'<i class="aq-marking-match__colbar"></i></div>';
 var rows=R.map(function(r,i){
  return fli('<li class="aq-marking-match__row" style="--i:'+i+'">',b,i)
   +'<div class="aq-marking-match__c" data-c="0">'+k(0)+'<h3 class="aq-marking-match__name"><span class="aq-marking-match__n" aria-hidden="true">'+nn(i)+' /</span><span>'+tcell(r[0])+'</span></h3></div>'
   +'<div class="aq-marking-match__c" data-c="1">'+k(1)+'<p>'+tcell(r[1])+'</p></div>'
   +'<div class="aq-marking-match__c" data-c="2">'+k(2)+'<p class="aq-marking-match__how">'+tick+'<span>'+tcell(r[2])+'</span></p></div></li>'}).join('');
 return sec(H+'<div class="aq-marking-match">'+facts+'<div class="aq-marking-match__table">'+head+wFold(b,R.length,'<ol class="aq-marking-match__list" role="list">'+rows+'</ol>',b.fold_noun||'supplies')
  +'<i class="aq-marking-match__band" aria-hidden="true"></i></div></div>','aq-marking-match-sec')};
