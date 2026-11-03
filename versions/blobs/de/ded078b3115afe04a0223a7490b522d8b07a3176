/* Look "grade-switch" -> GradeSwitch (design-system/components/GradeSwitch): a short grade table (as: "grades") set as
   a selector panel on the page ground (the core's alternating surface; the URS line above sits on the sunken ground). Each product is a strip on one plate: its name, a selector with one slot per
   water grade (the knob sits in the minimum; a slot your specification may call for shows as a dashed open slot), then
   the minimum as written and the note. The selector is a picture of the row (aria-hidden); the words carry it.
   Fields, as the grades table: cols, rows [product, minimum, note]. A note may be {t, link} (rendered through tcell),
   so a row can close with a pointer, e.g. the last row's {"t": "If this is your first system", "link": "first-system"}.
   Added: positions [{id, t}] (the selector's slots, left to right), switch [["potable", "pw?"], …] (one list per row:
   slot ids; "?" = where your specification or the monograph calls for it, drawn open). Concept sys-pw.4 (tactile
   option tags) and the HMI selector of 50-concept-limit-gauges. */
(function(){
LOOKS['grade-switch']=function(b,H){var C=b.cols||[],R=b.rows||[],P=b.positions||[],S=b.switch||[],np=P.length;
 var rows=R.map(function(r,i){var on={};(S[i]||[]).forEach(function(t){on[t.replace(/\?$/,'')]=/\?$/.test(t)?'alt':'on'});
  var first=-1;P.forEach(function(p,k){if(on[p.id]==='on'&&first<0)first=k});
  var slots=P.map(function(p,k){var st=on[p.id];return '<span class="aq-grade-switch__slot'+(st?' is-'+st:'')+'"><span>'+tx(p.t)+'</span></span>'}).join('');
  var sw='<div class="aq-grade-switch__sw" style="--np:'+np+';--k:'+Math.max(first,0)+'" aria-hidden="true"><span class="aq-grade-switch__track">'+slots
   +(first>=0?'<span class="aq-grade-switch__knob"><span>'+tx(P[first].t)+'</span></span>':'')+'</span>'
   +'<span class="aq-grade-switch__ticks">'+P.map(function(){return '<i></i>'}).join('')+'</span></div>';
  return '<li class="aq-grade-switch__row"><div class="aq-grade-switch__prod">'+idx(i)+'<h3 class="aq-grade-switch__t">'+tx(r[0])+'</h3></div>'+sw
   +'<div class="aq-grade-switch__txt"><p class="aq-grade-switch__min"><span class="aq-grade-switch__k">'+tx(C[1]||'')+'</span>'+tx(r[1])+'</p>'
   +(r[2]?'<p class="aq-grade-switch__note">'+tcell(r[2])+'</p>':'')+'</div></li>'}).join('');
 var screws='<span class="aq-grade-switch__screw" aria-hidden="true"></span>'.repeat(4);
 return sec(H+'<div class="aq-grade-switch">'+screws+'<p class="aq-grade-switch__colh"><span>'+tx(C[0]||'')+'</span><span aria-hidden="true">'+P.map(function(p){return e(p.t)}).join(' · ')+'</span></p><ol class="aq-grade-switch__rows">'+rows+'</ol></div>','aq-grade-switch-sec')};
})();
