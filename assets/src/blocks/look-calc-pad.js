/* Look "calc-pad" -> CalcPad (design-system/components/CalcPad): a grade table (as: "grades") written out as working on
   a squared calculation pad, after pass 12 concept 200 (ind-personal-care.grade, take 2). One derivation line per
   product class, in the order the table gives (loosest to strictest): the class, an arrow, what sets it, an equals
   sign, then the minimum water as the boxed answer at the line's end. Words are set in Geist; mono only for the line
   number and for codes inside the text (GUI-0158, 21 CFR 210, ISO 22716, USP <645>). A key line above the work names
   the columns in the derivation's own order. One answer box is lit steel blue: the first on load, then the line the
   pointer is on or the line tapped. Phones: each line wraps above a full-width answer box.
   Fields, as the grades table: h, intro, cols [class, minimum water, what sets it], rows [[class, minimum, sets]]. No
   new fields. */
(function(){
var K='aq-calc-pad';
var CODE=/\b(GUI-\d{3,5}|ISO \d{4,5}(?:-\d+)?|\d+ CFR \d+(?:\.\d+)?(?: and \d+)?|USP &lt;\d+&gt;)/g;
function code(h){return h.replace(CODE,function(x){return '<span class="'+K+'__code">'+x+'</span>'})}
LOOKS['calc-pad']=function(b,H){var C=b.cols||[],R=b.rows||[];
 var key='<p class="'+K+'__key" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span class="'+K+'__op">&rarr;</span><span>'+tx(C[2]||'')+'</span><span class="'+K+'__op">=</span><span class="'+K+'__keybox">'+tx(C[1]||'')+'</span></p>';
 var lines=R.map(function(r,i){
  return '<li class="'+K+'__line'+(i?'':' is-on')+'" data-i="'+i+'"><span class="'+K+'__no" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<p class="'+K+'__work"><span class="'+K+'__class">'+code(tx(r[0]))+'</span> '
   +'<span class="'+K+'__sets"><span class="'+K+'__op" aria-hidden="true">&rarr;</span> <span class="'+K+'__sr">'+tx(C[2]||'')+': </span>'+code(tx(r[2]||''))+' <span class="'+K+'__op" aria-hidden="true">=</span></span></p>'
   +'<p class="'+K+'__ans"><span class="'+K+'__sr">'+tx(C[1]||'')+': </span>'+code(tx(r[1]||''))+'</p></li>'}).join('');
 return sec(H+'<div class="'+K+'">'+key+'<ol class="'+K+'__lines">'+lines+'</ol></div>',K+'-sec')};
/* the lit answer: the line under the pointer, or the line tapped; it stays where it was left */
function lit(t){var w=t.closest('.'+K);if(!w||t.classList.contains('is-on'))return;[].forEach.call(w.querySelectorAll('.'+K+'__line'),function(l){l.classList.toggle('is-on',l===t)})}
if(typeof document!=='undefined'){
 document.addEventListener('mouseover',function(ev){var t=ev.target.closest&&ev.target.closest('.'+K+'__line');if(t)lit(t)});
 document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.'+K+'__line');if(t)lit(t)})}
})();
