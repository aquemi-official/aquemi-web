/* Look "return-slips" -> ReturnSlips (design-system/components/ReturnSlips): a table of what each request returns, set as
   an exchange on a limestone band. Each row is one situation: what you have, set large and light on the left; a short
   pipe with its arrow carries it across; on the right, what comes back is dealt out as paper slips, one per returned
   item, each with its own "When" and "Cost" fields. A "What comes back" cell holding several items joined by " · " gives
   one slip per item, and the "When" and "Cost" cells are split the same way when they hold the same number of parts
   (otherwise each slip shows the whole cell). A {t, link, intent} cell becomes a slip whose title is the link.
   Fields, as a table: cols [situation, what comes back, when, cost] (labels used as the slip field names), rows, fold,
   fold_noun. Each slip's ruled header has one mark per slip in its row, its own in flow (slip 2 of 4 lights the second).
   Hover or focus on a row runs its pipe in flow and lifts its slips. Design system: components/ReturnSlips. */
(function(){
function parts(c){return c&&typeof c==='object'?[c]:String(c==null?'':c).split(/\s+·\s+/)}
function cap(s){return typeof s==='string'?s.charAt(0).toUpperCase()+s.slice(1):s}
LOOKS['return-slips']=function(b,H){var C=b.cols||[],R=b.rows||[];
 var rows=R.map(function(r,i){var got=parts(r[1]),when=parts(r[2]),cost=parts(r[3]),n=got.length;
  var wSplit=when.length===n,cSplit=cost.length===n;
  var slips=got.map(function(g,k){var w=wSplit?when[k]:r[2],c=cSplit?cost[k]:r[3];
   return '<li class="aq-return-slips__slip" style="--k:'+k+'"><span class="aq-return-slips__ruling" aria-hidden="true">'+got.map(function(_,j){return '<i'+(j===k?' class="is-k"':'')+'></i>'}).join('')+'</span>'
    +'<p class="aq-return-slips__t">'+tcell(cap(g))+'</p>'
    +'<dl class="aq-return-slips__f">'
     +(w!=null&&w!==''?'<div><dt>'+wIcon('clock','aq-return-slips__ic')+tx(C[2]||'When')+'</dt><dd>'+tcell(w)+'</dd></div>':'')
     +(c!=null&&c!==''?'<div><dt>'+tx(C[3]||'Cost')+'</dt><dd>'+tcell(c)+'</dd></div>':'')
    +'</dl></li>'}).join('');
  return fli('<li class="aq-return-slips__row" style="--n:'+n+'">',b,i)
   +'<div class="aq-return-slips__have"><span class="aq-return-slips__i" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><h3 class="aq-return-slips__s">'+tcell(r[0])+'</h3></div>'
   +'<span class="aq-return-slips__pipe" aria-hidden="true"><i></i></span>'
   +'<ol class="aq-return-slips__slips" aria-label="'+e(C[1]||'What comes back')+'">'+slips+'</ol></li>'}).join('');
 var head='<p class="aq-return-slips__cols" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span></p>';
 return sec('<div class="aq-return-slips-wrap" data-theme="light">'+H+'<div class="aq-return-slips">'+head+wFold(b,R.length,'<ol class="aq-return-slips__rows">'+rows+'</ol>',b.fold_noun||'rows')+'</div></div>','aq-band--limestone aq-return-slips-sec')};
})();
