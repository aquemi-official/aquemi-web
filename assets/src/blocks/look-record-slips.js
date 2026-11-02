/* Look "record-slips" -> RecordSlips (design-system/components/RecordSlips): each process of the quality system and the
   record it leaves behind. A process is set large and light on the ground with what it controls under it; at its right
   edge a slot, and out of the slot comes a paper slip: the record you can inspect, one line per record (split at ";"),
   each with an empty box an auditor ticks. The records are the evidence; the slips make them the thing you hold.
   Pointing at a process feeds its slip a little further out. The column names head the list once (desktop) or label
   each row (phones).
   Fields, as a table: cols [process, what it controls, record you can inspect], rows (cells strings or {t, link}),
   fold, fold_noun (phones only: desktop shows every process). Phones: the slot runs under the process and the slip
   hangs below it. */
LOOKS['record-slips']=function(b,H){var C=b.cols||[],R=b.rows||[];
 var k=function(i){return C[i]?'<p class="aq-record-slips__k">'+tx(C[i])+'</p>':''};
 var list=R.map(function(r,i){var recs=String(r[2]&&typeof r[2]==='object'?r[2].t:r[2]||'').split(/\s*;\s*/).filter(Boolean);
  return fli('<li class="aq-record-slips__row" style="--i:'+i+'">',b,i)
   +'<div class="aq-record-slips__proc">'+idx(i)+'<h3 class="aq-record-slips__name">'+tcell(r[0])+'</h3>'+k(1)+'<p class="aq-record-slips__ctl">'+tcell(r[1])+'</p></div>'
   +'<div class="aq-record-slips__feed"><span class="aq-record-slips__slot" aria-hidden="true"></span>'
   +'<div class="aq-record-slips__slip" data-theme="light">'+k(2)+'<ul class="aq-record-slips__recs" role="list">'
   +recs.map(function(x,j){x=x.charAt(0).toUpperCase()+x.slice(1);return '<li style="--j:'+j+'"><span class="aq-record-slips__box" aria-hidden="true"></span><span>'+tx(x)+'</span></li>'}).join('')
   +'</ul></div></div></li>'}).join('');
 var cols='<div class="aq-record-slips__cols" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[2]||'')+'</span></div>';
 return sec(H+'<div class="aq-record-slips">'+cols+wFold(b,R.length,'<ol class="aq-record-slips__list" role="list">'+list+'</ol>',b.fold_noun||'processes')+'</div>','aq-record-slips-sec')};
