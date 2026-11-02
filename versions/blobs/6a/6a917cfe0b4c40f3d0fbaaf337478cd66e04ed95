/* Look "audit-manifold" -> AuditManifold (design-system/components/AuditManifold): an evidence table (who reads, what
   they read, where we answer it) set on a navy blueprint sheet, where the column joins are pipework. Between the
   first and second column, and between the second and third, a twin-wall header runs down the table; at every row a
   branch tees off it, through a diaphragm valve, into the next cell and ends at a flange. Each reader's row is a route:
   the auditor, through what they read, to the page where we answer it. Pointing at or focusing a row opens its valves
   and runs the water along its two branches (motion.js).
   Fields, as the evidence table: h, intro, cols [who, read, answer], rows [who, read, {t, link, intent} or text], fold,
   fold_noun. Concept: ind-meddevice.3 (auditor table on a navy blueprint grid, double-line manifolds with valves
   feeding each row across the columns). */
(function(){
var VALVE='<svg class="aq-audit-manifold__valve" viewBox="0 0 28 22" aria-hidden="true" focusable="false"><path class="aq-audit-manifold__stem" d="M14 15V5M9 4H19"/><path class="aq-audit-manifold__body" d="M3 9L14 15L3 21ZM25 9L14 15L25 21Z"/></svg>';
var GRID='<svg class="aq-audit-manifold__grid" aria-hidden="true" focusable="false"><defs><pattern id="amgrid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24"/></pattern>'
 +'<pattern id="amgrid5" width="120" height="120" patternUnits="userSpaceOnUse"><path class="aq-audit-manifold__g5" d="M120 0H0V120"/></pattern></defs><rect width="100%" height="100%" fill="url(#amgrid)"/><rect width="100%" height="100%" fill="url(#amgrid5)"/></svg>';
function pipe(k){return '<span class="aq-audit-manifold__pipe aq-audit-manifold__pipe--'+k+'" aria-hidden="true"><span class="aq-audit-manifold__hdr"><i class="aq-audit-manifold__w"></i></span>'
 +'<span class="aq-audit-manifold__br"><i class="aq-audit-manifold__w"></i></span>'+VALVE+'<span class="aq-audit-manifold__fl"></span></span>'}
LOOKS['audit-manifold']=function(b,H){var C=b.cols||[],R=b.rows||[],n=R.length;
 var rows=R.map(function(r,i){var go=r[2],lk=go&&typeof go==='object'&&go.link&&wp(go.link);
  var ans=lk?'<a class="aq-audit-manifold__link" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':'')+'>'+tx(go.t)+'</a>'
   :(go?'<span class="aq-audit-manifold__link">'+tcell(go)+'</span>':'');
  return fli('<li class="aq-audit-manifold__row'+(i===0?' is-first':'')+(i===n-1?' is-last':'')+'" data-k="'+i+'">'
   +'<div class="aq-audit-manifold__who"><span class="aq-audit-manifold__no" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><h3 class="aq-audit-manifold__t">'+tx(r[0])+'</h3></div>'
   +pipe('a')+'<div class="aq-audit-manifold__read"><span class="aq-audit-manifold__k">'+tx(C[1]||'')+'</span><p class="aq-audit-manifold__v">'+tx(r[1])+'</p></div>'
   +pipe('b')+'<div class="aq-audit-manifold__go"><span class="aq-audit-manifold__k">'+tx(C[2]||'')+'</span>'+ans+'</div></li>',b,i)}).join('');
 var colh='<p class="aq-audit-manifold__colh" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span></span><span>'+tx(C[1]||'')+'</span><span></span><span>'+tx(C[2]||'')+'</span></p>';
 return '<section class="aq-section aq-band--navy aq-audit-manifold-sec">'+GRID+'<div class="aq-in aq-stack-l">'+H
  +'<div class="aq-audit-manifold">'+colh+wFold(b,n,'<ol class="aq-audit-manifold__rows">'+rows+'</ol>',b.fold_noun)+'</div></div></section>'};
})();
