/* Look "trace-lines" -> TraceLines (design-system/components/TraceLines): a traceability table drawn as transit lines.
   Each requirement (a column after the first) is a line that starts at its code, set large, and runs down through
   one station per document (the rows): a node where the document answers it, a dashed pass where it does not
   ("Not applicable"), a terminus at the last. A cell that opens "Met." shows that status as a word chip; sentences
   that open with a test step ("FAT: …", "SAT and OQ: …") branch into a chip per step. The documents are the station
   names down the left, each row a hairline across both lines like an interchange. Pointing at a line dims the other.
   Fields, as a table: cols [row name, requirement…] ("URS-012: conductivity …": the code before the first colon),
   rows (cells strings or {t, link}). Phones: one line at a time, picked by its code chip (PhoneKit chips under the
   readout, which follows the open line), each station with its document name; without script every line shows. */
LOOKS['trace-lines']=(function(){
 function str(c){return String(c&&typeof c==='object'?c.t:c==null?'':c)}
 function cell(c){var s=str(c),o='',met=/^Met\.\s*/.test(s);if(c&&typeof c==='object'&&c.link)return '<p class="aq-trace-lines__p">'+tcell(c)+'</p>';
  if(met){o+='<span class="aq-trace-lines__met">Met</span> ';s=s.replace(/^Met\.\s*/,'')}
  var parts=s.split(/(?:\.)\s+(?=[A-Z])/).map(function(p,i,a){return i<a.length-1?p+'.':p}),steps=[];
  parts.forEach(function(p){var m=p.match(/^((?:[A-Z]{2,4})(?:,? (?:and )?[A-Z]{2,4})*): (.*)$/);if(m)steps.push(m);else o+=tx(p)+' '});
  o=o?'<p class="aq-trace-lines__p">'+o.trim()+'</p>':'';
  if(steps.length)o+='<ul class="aq-trace-lines__tests">'+steps.map(function(m){return '<li><span class="aq-trace-lines__step">'+tx(m[1])+'</span> <span>'+tx(m[2])+'</span></li>'}).join('')+'</ul>';
  return o}
 return function(b,H){var C=b.cols||[],R=b.rows||[],k=C.length-1,n=R.length;
  var docs='<div class="aq-trace-lines__docs" aria-hidden="true"><span class="aq-trace-lines__dh" style="grid-row:1">'+tx(C[0]||'')+'</span>'
   +R.map(function(r,i){return '<span class="aq-trace-lines__doc" style="grid-row:'+(i+2)+'"><span class="aq-trace-lines__dn">'+(i<9?'0':'')+(i+1)+'</span>'+tcell(r[0])+'</span>'}).join('')+'</div>';
  var lines='',j;
  for(j=1;j<=k;j++){var h=str(C[j]),m=h.match(/^([^:]{2,16}):\s*(.+)$/);
   lines+='<div class="aq-trace-lines__line" data-line="'+(j-1)+'" data-pk-item="'+(j-1)+'" style="--col:'+(j+1)+'">'
    +'<button type="button" class="aq-trace-lines__pick" data-pk-head data-line="'+(j-1)+'"><i class="aq-trace-lines__sw" aria-hidden="true"></i>'+tx(m?m[1]:('0'+j))+'</button>'
    +'<div class="aq-trace-lines__body" data-pk-body>'
    +'<div class="aq-trace-lines__head" style="grid-row:1">'+(m?'<span class="aq-trace-lines__code">'+tx(m[1])+'</span>':'')+'<h3 class="aq-trace-lines__req">'+tx(m?m[2]:h)+'</h3></div>'
    +'<ol class="aq-trace-lines__stops" role="list">'+R.map(function(r,i){var s=str(r[j]),na=/^not applicable\.?$/i.test(s.trim());
     return '<li class="aq-trace-lines__st'+(na?' is-na':'')+(i===n-1?' is-end':'')+'" style="grid-row:'+(i+2)+'">'
      +'<span class="aq-trace-lines__k">'+tcell(r[0])+'</span>'+(na?'<p class="aq-trace-lines__p">'+tx(s)+'</p>':cell(r[j]))+'</li>'}).join('')+'</ol></div></div>'}
  /* pass 9b (concept svc-design.3): beside the lines, a readout tile holds the traced limit, figure huge and light on
     flow with its tick scale and an outlined limit tag, over faint pipe ghosts; one face per requirement whose header
     states a limit ("name ≤ 1.3 unit @ condition"), switched by the buttons under it or by pointing at a line */
  var faces='',keys='',fn=0;
  for(j=1;j<=k;j++){var hh=str(C[j]),mm=hh.match(/^([^:]{2,16}):\s*(.+)$/),req=mm?mm[2]:hh,code=mm?mm[1]:'',
    lm=req.match(/^(.*?)\s*(≤|≥|<|>|=)\s*([\d.,]+)\s*([^@]*?)\s*(@.*)?$/);if(!lm)continue;
   var tk='';for(var t=0;t<41;t++)tk+='<i'+(t===30?' class="is-lim"':t%5?'':' class="is-major"')+'></i>';
   faces+='<div class="aq-trace-lines__face" data-line="'+(j-1)+'"'+(fn?' hidden':'')+'>'
    +'<p class="aq-trace-lines__rk">'+tx(code)+(lm[1]?' · '+tx(lm[1]):'')+'</p>'
    +'<p class="aq-trace-lines__fig"><span class="aq-trace-lines__num">'+tx(lm[3])+'</span>'+(lm[4]?'<span class="aq-trace-lines__unit">'+tx(lm[4])+'</span>':'')+'</p>'
    +'<div class="aq-trace-lines__meter"><div class="aq-trace-lines__scale" aria-hidden="true">'+tk+'</div>'
    +'<p class="aq-trace-lines__tag"><span>'+tx(lm[2]+' '+lm[3])+'</span>'+(lm[5]?' <span class="aq-trace-lines__at">'+tx(lm[5])+'</span>':'')+'</p></div></div>';
   keys+='<button type="button" class="aq-trace-lines__key" data-line="'+(j-1)+'" aria-pressed="'+(fn?'false':'true')+'">'+tx(code||('0'+j))+'</button>';fn++}
  var ghost='<svg class="aq-trace-lines__ghost" viewBox="0 0 400 520" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false"><path d="M60 0V150a40 40 0 0 0 40 40H300a40 40 0 0 1 40 40V520M84 0V150a16 16 0 0 0 16 16H300a64 64 0 0 1 64 64V520M0 380H180a30 30 0 0 1 30 30V520M0 404H180a6 6 0 0 1 6 6V520"/><path d="M52 60h40M52 64h40M332 330h40M332 334h40M150 372v40"/></svg>';
  var tile=fn?'<div class="aq-trace-lines__panel">'+ghost+'<div class="aq-trace-lines__tile" data-theme="light" role="group" aria-label="Traced limit">'+faces+'</div>'+(fn>1?'<div class="aq-trace-lines__keys">'+keys+'</div>':'')+'</div>':'';
  return sec(H+'<div class="aq-trace-lines-wrap'+(fn?' has-tile':'')+'"><div class="aq-trace-lines" data-pk-picker="chips" data-pk-open="0" style="--k:'+k+';--n:'+n+'">'+docs+lines+'</div>'+tile+'</div>','aq-trace-lines-sec')}
})();
/* The readout follows the visitor: a key, or pointing at a line, shows that requirement's limit. The swap is ported
   from Subframe Motion "Stock price ticker" (quote-tick), MIT, (c) 2026 Subframe: the new figure rises 8 px (drops
   going back) from 0.2 opacity in 0.22 s on cubic-bezier(0.2, 0.8, 0.2, 1); CSS, so it stands still under reduced
   motion. */
(function(){
 if(typeof document==='undefined')return;
 function show(w,i){var cur=w.querySelector('.aq-trace-lines__face:not([hidden])'),nx=w.querySelector('.aq-trace-lines__face[data-line="'+i+'"]');if(!nx||nx===cur)return;
  var up=+i>+(cur&&cur.getAttribute('data-line')||0);if(cur)cur.hidden=true;nx.hidden=false;nx.style.setProperty('--tl-dir',up?'8px':'-8px');
  nx.classList.remove('is-tick');void nx.offsetWidth;nx.classList.add('is-tick');
  [].forEach.call(w.querySelectorAll('.aq-trace-lines__key'),function(k){k.setAttribute('aria-pressed',k.getAttribute('data-line')===String(i)?'true':'false')})}
 document.addEventListener('click',function(ev){var k=ev.target.closest&&ev.target.closest('.aq-trace-lines__key');if(k)show(k.closest('.aq-trace-lines-wrap'),k.getAttribute('data-line'))});
 /* pass 12 round C: on phones the lines are a PhoneKit chips picker (one line at a time); the readout follows the open
    line, so the dial and the line in view always name the same requirement */
 document.addEventListener('pk:change',function(ev){var r=ev.target;if(!r.classList||!r.classList.contains('aq-trace-lines')||!ev.detail||!ev.detail.on||ev.detail.key==null)return;
  var w=r.closest('.aq-trace-lines-wrap');if(w)show(w,ev.detail.key)});
 document.addEventListener('mouseover',function(ev){var l=ev.target.closest&&ev.target.closest('.aq-trace-lines__line'),w=l&&l.closest('.aq-trace-lines-wrap');if(w)show(w,l.getAttribute('data-line'))});
})();
