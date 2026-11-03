/* Look "record-trail" -> RecordTrail (design-system/components/RecordTrail): the quality system as one record trail
   (pass 12 concept 240). Each process is a station on a single rail: its node, its name and what it controls, and a
   cord dropping the record sheet it leaves (the records listed on the sheet, each with a hairline glyph of its kind).
   Desktop: four stations a row; the rail turns down the right lane, runs back along the gutter and carries on into
   the next row, so eight processes read as one line; after the last station it drops into a stack of sheets captioned
   with the process count (no record count: the records are not a fixed number on the page). A key over the trail names the three parts (node = process, text = what it controls, sheet =
   record you can inspect) from the block's column names.
   Fields, as a table: cols [process, what it controls, record you can inspect], rows (cells strings or {t, link}),
   nav, fold, fold_noun (phones only: desktop shows every station). Records split at ";".
   Phones: the rail runs down the left; each station stacks name, what it controls and its sheet beside it; the
   stack closes the trail. Replaces RecordSheet on cmp-quality (that look stays in the library). */
LOOKS['record-trail']=(function(){
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
 function glyph(s){var g=G[kind(s)];
  return '<svg class="aq-record-trail__g" viewBox="0 0 28 22" aria-hidden="true" focusable="false"><path class="aq-record-trail__ink" d="'+g[0]+'"/>'
   +(g[1]?'<path class="aq-record-trail__acc" d="'+g[1]+'"/>':'')+'</svg>'}
 /* the stack the trail ends in: five sheets fanned on a pile, the top one ruled */
 var STACK='<svg class="aq-record-trail__pile" viewBox="0 0 120 64" aria-hidden="true" focusable="false">'
  +[4,3,2,1].map(function(k){var x=6+k*3,y=14+k*7;return '<path class="aq-record-trail__ps" d="M'+x+' '+y+'L'+(x+78)+' '+(y-8)+'L'+(x+102)+' '+(y+4)+'L'+(x+24)+' '+(y+12)+'Z"/>'}).join('')
  +'<path class="aq-record-trail__ps" d="M6 14L84 6L108 18L30 26Z"/><path class="aq-record-trail__pr" d="M28 14L76 9M34 17L82 12M40 20L72 16.6"/></svg>';
 var nn=function(i){return (i<9?'0':'')+(i+1)};
 return function(b,H){var C=b.cols||[],R=b.rows||[],n=R.length,per=4;
  var sr=function(i,after){return C[i]?'<span class="aq-record-trail__k">'+tx(C[i])+(after||'')+'</span>':''};
  var rows=R.map(function(r,i){var recs=String(r[2]&&typeof r[2]==='object'?r[2].t:r[2]||'').split(/\s*;\s*/).filter(Boolean);
   var endRow=(i+1)%per===0||i===n-1,last=i===n-1,rest=last?(per-1-i%per):0;
   return fli('<li class="aq-record-trail__st'+(endRow?' is-row-end':'')+(last?' is-last':'')+'" style="--i:'+i+(rest?';--rt-rest:'+rest:'')+'" data-rt="'+i+'">',b,i)
    +'<i class="aq-record-trail__rail" aria-hidden="true"></i><i class="aq-record-trail__node" aria-hidden="true"></i>'
    +(endRow&&!last?'<i class="aq-record-trail__turn" aria-hidden="true"><i class="aq-record-trail__tr"></i><i class="aq-record-trail__tl"></i></i>':'')
    +(last?'<i class="aq-record-trail__end" aria-hidden="true"></i>':'')
    +'<div class="aq-record-trail__hang">'
    +'<h3 class="aq-record-trail__name"><span class="aq-record-trail__n" aria-hidden="true">'+nn(i)+'</span><span>'+tcell(r[0])+'</span></h3>'
    +'<p class="aq-record-trail__ctl">'+sr(1,': ')+tcell(r[1])+'</p></div>'
    +'<div class="aq-record-trail__sheet"><p class="aq-record-trail__sk">'+sr(2)+'</p><ul role="list">'
    +recs.map(function(x,j){x=x.charAt(0).toUpperCase()+x.slice(1);return '<li style="--j:'+j+'"><span>'+tx(x)+'</span>'+glyph(x)+'</li>'}).join('')+'</ul></div></li>'}).join('');
  var key='<p class="aq-record-trail__key" aria-hidden="true"><span class="aq-record-trail__kn"><i></i>'+tx(C[0]||'')+'</span>'
   +'<span class="aq-record-trail__kc"><i></i>'+tx(C[1]||'')+'</span><span class="aq-record-trail__ks"><i></i>'+tx(C[2]||'')+'</span></p>';
  var noun=b.fold_noun||'processes';
  var stack='<div class="aq-record-trail__stack" aria-hidden="true"><span class="aq-record-trail__count">'+nn(n-1)+' '+e(noun)+'</span>'+STACK+'</div>';
  return sec(H+'<div class="aq-record-trail">'+key+'<div class="aq-record-trail__run">'
   +wFold(b,n,'<ol class="aq-record-trail__list" role="list">'+rows+'</ol>',noun)+stack+'</div></div>','aq-record-trail-sec')}})();
