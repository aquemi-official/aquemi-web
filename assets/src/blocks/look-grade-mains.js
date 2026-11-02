/* Look "grade-mains" -> GradeMains (design-system/components/GradeMains): a grade table (as: "grades") drawn as water
   mains on a navy blueprint. One horizontal header (main) per water grade runs across the band; every product or
   process step stands at the top of its own column and drops a line down to the main(s) it takes water from, with a
   valve at each tap: a filled valve for the minimum grade, an open one for a grade the note allows or asks for. A main
   we do not supply is drawn dashed. Under each column: the grade as written and the note.
   Fields, as the grades table: cols, rows [step, grade, note], fold, fold_noun (phones only; desktop shows every column).
   Added: lanes [{id, t, note, off}] (the mains, top to bottom; off: drawn dashed), taps [["pw", "wfi?"], …] (one list per
   row: lane ids; "?" marks an alternative, drawn open). Concept 46-concept-grade-lanes. */
(function(){
var VALVE='<svg viewBox="0 0 32 22" focusable="false"><path class="aq-grade-mains__vb" d="M3 5 L16 13 L3 21 Z M29 5 L16 13 L29 21 Z"/><path class="aq-grade-mains__vs" d="M16 13 V3 M10 2.5 H22"/></svg>';
LOOKS['grade-mains']=function(b,H){var R=b.rows||[],L=b.lanes||[],T=b.taps||[],n=R.length,nl=L.length,C=b.cols||[];
 var li={};L.forEach(function(l,k){li[l.id]=k});
 var lanes=L.map(function(l,k){return '<p class="aq-grade-mains__lname'+(l.off?' is-off':'')+'" style="--lr:'+(k+2)+';--lc:'+(k+2)+'">'
   +'<span class="aq-grade-mains__lt">'+tx(l.t)+'</span>'+(l.note?'<span class="aq-grade-mains__ln">'+tx(l.note)+'</span>':'')+'</p>'
   +'<span class="aq-grade-mains__pipe'+(l.off?' is-off':'')+'" style="--lr:'+(k+2)+';--lc:'+(k+2)+'" aria-hidden="true"><span class="aq-grade-mains__water"></span></span>'}).join('');
 var forms=R.map(function(r,j){var taps=(T[j]||[]).map(function(t){var alt=/\?$/.test(t),id=t.replace(/\?$/,'');return {k:li[id],alt:alt}}).filter(function(t){return t.k!=null});
  var deep=taps.reduce(function(a,t){return Math.max(a,t.k)},0);
  var st='--gc:'+(j+2)+';--deep:'+(deep+1)+';--pr:'+(2+2*j)+';--pf:'+(3+2*j)+';--pd:'+(deep+3);
  var tp=taps.map(function(t){return '<span class="aq-grade-mains__tap'+(t.alt?' is-alt':'')+'" style="--tr:'+(t.k+2)+';--pc:'+(t.k+2)+'" aria-hidden="true">'+VALVE+'</span>'}).join('');
  var lab=taps.map(function(t){return L[t.k].t+(t.alt?' (alternative)':'')}).join(', ');
  return fli('<li class="aq-grade-mains__form" style="'+st+'">'
   +'<div class="aq-grade-mains__head">'+idx(j)+'<h3 class="aq-grade-mains__t">'+tx(r[0])+'</h3></div>'
   +'<span class="aq-grade-mains__drop" aria-hidden="true"></span>'+tp
   +'<div class="aq-grade-mains__foot"><p class="aq-grade-mains__g"><span class="aq-grade-mains__k">'+tx(C[1]||'')+'</span>'+tx(r[1])+'</p>'
   +(r[2]?'<p class="aq-grade-mains__note">'+tx(r[2])+'</p>':'')+'<span class="aq-grade-mains__sr">'+e(lab)+'</span></div></li>',b,j)}).join('');
 var cap='<p class="aq-grade-mains__cap" aria-hidden="true"><span>Aquemi</span><span>'+e(b.nav||'')+'</span><span>'+e(wCount(b,n,''))+'</span></p>';
 var grid='<div class="aq-grade-mains" style="--n:'+n+';--nl:'+nl+';--fr:'+(nl+2)+';--pspan:'+(2*n)+'">'
  +'<p class="aq-grade-mains__colh">'+tx(C[0]||'')+'</p>'+lanes+'<ol class="aq-grade-mains__forms">'+forms+'</ol></div>';
 return sec(H+wFold(b,n,grid,b.fold_noun)+cap,'aq-band--navy aq-grade-mains-sec')};
})();
