/* Look "check-ledger" -> CheckLedger (design-system/components/CheckLedger): a router table of checks a buyer can run
   (what you check, route, what it does not prove, time to arrange) set as a ledger of tiles (pass 9b, concept
   projects.0). Each check is one row of square-cornered tiles headed by a navy tile carrying its slash numeral
   ("01/"); then the route (the link, set as the row's action), what you check, what it does not prove, and the time
   to arrange in mono at the right edge. Column names run over the grid like a schedule's header; on phones each tile
   carries its own name. Optional fitting tiles: small navy blueprint drawings of PP fittings set into a row's route
   and "does not prove" tiles, as texture (no meaning, aria-hidden).
   Fields (a table, as "router"): h, intro, cols [check, route, does not prove, time], rows (cells strings or
   {t, link, intent}), fold, fold_noun. New optional field: fits {"<row index>": [route tile fig, does-not-prove tile
   fig]}, figs "cross", "tee" or "valve" (null for none). */
(function(){
function clFit(k){var o=[],pts;
 if(k==='valve'){o.push(isoPipe([[0,0,0],[64,0,0]],{r:4.2,flanges:'ends',caps:true,flow:false}),isoPart('valve',32,0,0,2.2));pts=[[0,0,-6],[64,0,-6],[32,0,34],[0,0,8],[64,0,8]]}
 else if(k==='tee'){o.push(isoPipe([[0,0,0],[64,0,0]],{r:4.2,flanges:'ends',caps:true,flow:false}),isoPipe([[32,0,6],[32,0,40]],{r:4.2,flanges:'ends',caps:'end',flow:false}));pts=[[0,0,-6],[64,0,-6],[32,0,48],[0,0,8],[64,0,8]]}
 else {o.push(isoPipe([[32,-34,0],[32,0,0]],{r:4.2,flanges:'ends',caps:'start',flow:false}),isoPipe([[0,0,0],[64,0,0]],{r:4.2,flanges:'ends',caps:true,flow:false}),isoPipe([[32,6,0],[32,34,0]],{r:4.2,flanges:'ends',caps:'end',flow:false}));pts=[[0,0,-8],[64,0,-8],[32,-34,8],[32,34,-8],[0,0,8],[64,0,8]]}
 var bx=isoBounds(pts,10),W=Math.round(bx.w),H=Math.round(bx.h);
 return '<span class="aq-check-ledger__fit" aria-hidden="true">'+isoSvg(W,H,o.join(''),'aq-iso--navy aq-check-ledger__fit-svg',{origin:[-bx.x,-bx.y]})+'</span>'}
LOOKS['check-ledger']=function(b,H){var C=b.cols||[],R=b.rows||[],F=b.fits||{},num=function(i){return (i<9?'0':'')+(i+1)};
 var k=function(j){return '<span class="aq-check-ledger__k">'+tx(C[j]||'')+'</span>'};
 /* visual column order: route, what you check, what it does not prove, time */
 var head='<div class="aq-check-ledger__head" aria-hidden="true"><span class="aq-check-ledger__hn"></span>'
  +[1,0,2,3].map(function(j,x){return '<span class="aq-check-ledger__hc" data-col="'+x+'"><span class="aq-check-ledger__hi">'+num(x)+' /</span> '+tx(C[j]||'')+'</span>'}).join('')+'</div>';
 var rows=R.map(function(r,i){var go=r[1],gl=go&&typeof go==='object'&&go.link&&wp(go.link),f=F[String(i)]||[];
  var btn=gl?'<a class="aq-check-ledger__go" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':'')+'><span>'+tx(go.t)+'</span></a>':'<span class="aq-check-ledger__go is-plain">'+tcell(go)+'</span>';
  return fli('<li class="aq-check-ledger__row" style="--i:'+i+'">',b,i)
   +'<div class="aq-check-ledger__n" aria-hidden="true"><span class="aq-check-ledger__nv">'+num(i)+'/</span></div>'
   +'<div class="aq-check-ledger__c aq-check-ledger__c--t" data-col="1">'+k(0)+'<h3 class="aq-check-ledger__t">'+tcell(r[0])+'</h3></div>'
   +'<div class="aq-check-ledger__c aq-check-ledger__c--go'+(f[0]?' has-fit':'')+'" data-col="0">'+k(1)+btn+(f[0]?clFit(f[0]):'')+'</div>'
   +'<div class="aq-check-ledger__c aq-check-ledger__c--no'+(f[1]?' has-fit':'')+'" data-col="2">'+k(2)+'<p class="aq-check-ledger__no">'+tcell(r[2])+'</p>'+(f[1]?clFit(f[1]):'')+'</div>'
   +'<div class="aq-check-ledger__c aq-check-ledger__c--time" data-col="3">'+k(3)+'<p class="aq-check-ledger__time">'+tcell(r[3])+'</p></div></li>'}).join('');
 var body='<div class="aq-check-ledger">'+head+'<ol class="aq-check-ledger__rows" role="list">'+rows+'</ol></div>';
 return sec(H+wFold(b,R.length,body,b.fold_noun||'checks'),'aq-check-ledger-sec')};
})();
