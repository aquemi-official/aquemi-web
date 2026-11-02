/* Look "numeral-index" -> NumeralIndex (design-system/components/NumeralIndex): a router table (as: "router") set as a
   Swiss index of situations. Each row opens with a huge light outline numeral, the situation in large light type with
   what you need under a hairline, and the start page as a square go-cell (page icon, label, arrow) at the right. The
   rules draw across, the numerals fill with flow on hover or focus.
   Fields, as the router: cols (situation, what you need, start with), rows [situation, need, {t, link, intent}].
   A row with more than three cells shows the middle ones as further "need" lines. Design system: components/NumeralIndex. */
(function(){
LOOKS['numeral-index']=function(b,H){var C=b.cols||[],R=b.rows||[];
 function lk(c){return c&&typeof c==='object'&&c.link&&wp(c.link)?c:null}
 var rows=R.map(function(r,i){var last=r[r.length-1],go=lk(last),mid=r.slice(1,r.length-1);
  var need=mid.map(function(c,j){return '<p class="aq-numeral-index__need"><span class="aq-numeral-index__k">'+tx(C[j+1]||'')+'</span>'+tcell(c)+'</p>'}).join('');
  var cell=go?'<a class="aq-numeral-index__go" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':'')+'>'
    +'<span class="aq-numeral-index__k">'+tx(C[r.length-1]||'')+'</span>'+(pageIcon(go.link)?wIcon(pageIcon(go.link),'aq-numeral-index__ic'):'')
    +'<span class="aq-numeral-index__to">'+tx(go.t)+'</span><span class="aq-numeral-index__arrow" aria-hidden="true"></span></a>'
   :'<p class="aq-numeral-index__go is-flat"><span class="aq-numeral-index__k">'+tx(C[r.length-1]||'')+'</span><span class="aq-numeral-index__to">'+tcell(last)+'</span></p>';
  return '<li class="aq-numeral-index__row"><span class="aq-numeral-index__rule" aria-hidden="true"></span>'
   +'<span class="aq-numeral-index__n" aria-hidden="true"><span>'+(i<9?'0':'')+(i+1)+'</span></span>'
   +'<div class="aq-numeral-index__body"><h3 class="aq-numeral-index__t">'+tx(r[0])+'</h3>'+need+'</div>'+cell+'</li>'}).join('');
 return sec(H+'<ol class="aq-numeral-index">'+rows+'</ol>','aq-numeral-index-sec')};
})();
