/* Look "record-sheet" -> RecordSheet (design-system/components/RecordSheet): each process of the quality system and the
   record it leaves, set as a ruled schedule on a drawing sheet. Three columns (process, what it controls, record you
   can inspect) between vertical hairlines; the sheet's right margin carries the row numbers as numbered notes, and a
   title block closes the sheet (the block's nav name, the counts of processes and records). Every record is followed
   by a small hairline glyph of its kind (register, log, report, certificate, list, request, minutes, check, records),
   so the record column reads as a vocabulary of the papers an auditor asks for.
   The glyph kind comes from the record's own words (register, log, certificate, list, minutes, request or assessment,
   CAPA or check, report or NCR, records); anything else is a plain sheet.
   Fields, as a table: cols [process, what it controls, record you can inspect], rows (cells strings or {t, link}),
   fold, fold_noun (phones only: desktop shows every process). Records split at ";".
   Phones: the sheet keeps its border; each process stacks name, what it controls and its records, with the column
   names as small labels; the title block runs full width under the list. */
LOOKS['record-sheet']=(function(){
 var G={
  register:['M4 3H24V19H4ZM9 3V19M9 8H24M9 12H24M9 16H24',''],
  log:['M4 3H24V19H4ZM12 7.5H21M12 11.5H21M12 15.5H18','M7 7.5H9M7 11.5H9M7 15.5H9'],
  report:['M6 2H18L23 7V20H6ZM18 2V7H23M9 11H20M9 14.5H20','M9 18H15'],
  cert:['M3 4H25V18H3ZM7 8H16M7 11.5H13','M20 10.5A2.6 2.6 0 1 1 20 15.7A2.6 2.6 0 1 1 20 10.5M18.6 15.4L17.8 20L20 18.7L22.2 20L21.4 15.4'],
  list:['M10 5H23M10 11H23M10 17H19','M4.5 5H7M4.5 11H7M4.5 17H7'],
  request:['M6 2H22V20H6ZM9 6.5H19M9 10H19','M10 15H18M15.2 12.2L18 15L15.2 17.8'],
  minutes:['M6 2H22V20H6ZM9 6.5H19M9 10H19','M9 16C10.6 12.6 11.8 18.6 13.6 14.6S16.6 17.8 19.4 14.2'],
  check:['M6 2H22V20H6ZM9 6.5H19','M10 13L13 16L19 9.5'],
  stack:['M9 2H24V15H9ZM6 5V18H21M3 8V21H18M12 6.5H21M12 10H18',''],
  sheet:['M6 2H22V20H6ZM9 7H19M9 10.5H19M9 14H16','']};
 function kind(s){s=String(s||'');return /certificat/i.test(s)?'cert':/register/i.test(s)?'register':/\blogs?\b/i.test(s)?'log':/minutes/i.test(s)?'minutes':/\blist\b/i.test(s)?'list'
  :/request|assessment/i.test(s)?'request':/CAPA|check/.test(s)?'check':/reports?\b|\bNCR\b/.test(s)?'report':/records/i.test(s)?'stack':'sheet'}
 function glyph(s){var g=G[kind(s)],all=g[0]+g[1];
  return '<svg class="aq-record-sheet__g" viewBox="0 0 28 22" aria-hidden="true" focusable="false"><path class="aq-record-sheet__imp" d="'+all+'" transform="translate(0.8 0.9)"/>'
   +'<path class="aq-record-sheet__ink" pathLength="1" d="'+g[0]+'"/>'+(g[1]?'<path class="aq-record-sheet__acc" pathLength="1" d="'+g[1]+'"/>':'')+'</svg>'}
 var nn=function(i){return (i<9?'0':'')+(i+1)};
 return function(b,H){var C=b.cols||[],R=b.rows||[],count=0;
  var k=function(i){return C[i]?'<p class="aq-record-sheet__k">'+tx(C[i])+'</p>':''};
  var rows=R.map(function(r,i){var recs=String(r[2]&&typeof r[2]==='object'?r[2].t:r[2]||'').split(/\s*;\s*/).filter(Boolean);count+=recs.length;
   return fli('<li class="aq-record-sheet__row" style="--i:'+i+'">',b,i)
    +'<div class="aq-record-sheet__c aq-record-sheet__proc"><span class="aq-record-sheet__pn" aria-hidden="true">'+nn(i)+'</span>'+k(0)+'<h3 class="aq-record-sheet__name">'+tcell(r[0])+'</h3></div>'
    +'<div class="aq-record-sheet__c aq-record-sheet__ctl">'+k(1)+'<p>'+tcell(r[1])+'</p></div>'
    +'<div class="aq-record-sheet__c aq-record-sheet__recs">'+k(2)+'<ul role="list">'
    +recs.map(function(x,j){x=x.charAt(0).toUpperCase()+x.slice(1);return '<li style="--j:'+j+'"><span>'+tx(x)+'</span>'+glyph(x)+'</li>'}).join('')+'</ul></div>'
    +'<span class="aq-record-sheet__no" aria-hidden="true">'+nn(i)+'</span></li>'}).join('');
  var head='<div class="aq-record-sheet__cols" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span><span>'+tx(C[2]||'')+'</span><span></span></div>';
  var noun=b.fold_noun||'processes',rn=String(C[2]||'').match(/^\s*(\w+)/),rec=rn?rn[1].toLowerCase()+'s':'records';
  var tb='<div class="aq-record-sheet__tb" aria-hidden="true"><span class="aq-record-sheet__tbt">'+tx(b.nav||C[0]||'')+'</span>'
   +'<span>'+nn(R.length-1)+' '+e(noun)+'</span><span>'+nn(count-1)+' '+e(rec)+'</span></div>';
  return sec(H+'<div class="aq-record-sheet">'+head+wFold(b,R.length,'<ol class="aq-record-sheet__list" role="list">'+rows+'</ol>',noun)+tb+'</div>','aq-record-sheet-sec')}})();
