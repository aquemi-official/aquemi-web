/* Look "response-lanes" -> ResponseLanes (design-system/components/ResponseLanes): a table of response times by request
   (your request, first response, what follows) drawn as lanes on one clock. Each request is a lane: it starts where you
   call or send and runs right through its first response (one stop per clause of that cell, split at "; ") and on into
   what follows (the same), every stop a node on the line with its clock beneath it, placeholders and all. A request
   written "Severity N: …" is set with N as a huge light numeral, so the four severities read as a calm scale from
   production stopped down to routine; the other requests follow under a stronger rule with no numeral. Severity 1's
   lane is drawn in flow. Stops sit at even spacing: the lanes show the order of events, never a time scale.
   Fields, as a table: cols [your request, first response, what follows] (the two value labels head the lane zones),
   rows [request, first response, what follows], intro, nav. Cells may be {t, link, intent}. Design system:
   components/ResponseLanes. */
(function(){
/* clauses: a cell split at "; " outside brackets and parentheses ("Annex 15, 11; GUI-0029, 7" inside a parenthesis stays one) */
function clauses(c){if(c&&typeof c==='object')return [c];var s=String(c==null?'':c),o=[],d=0,st=0;
 for(var i=0;i<s.length;i++){var ch=s[i];if(ch==='('||ch==='[')d++;else if((ch===')'||ch===']')&&d)d--;else if(ch===';'&&!d&&/\s/.test(s[i+1]||'')){o.push(s.slice(st,i));st=i+1}}
 o.push(s.slice(st));return o.map(function(x){return x.trim()}).filter(function(x){return x!==''})}
function cap(s){return typeof s==='string'?s.charAt(0).toUpperCase()+s.slice(1):s}
LOOKS['response-lanes']=function(b,H){var C=b.cols||[],R=b.rows||[],seen=false;
 var rows=R.map(function(r,i){var t=r[0]&&typeof r[0]==='object'?r[0].t:String(r[0]||''),m=t.match(/^Severity\s+(\d+):\s*(.*)$/),sev=m?+m[1]:0;
  var brk=!sev&&!seen&&i>0;if(!sev)seen=true;
  function zone(c,k){var E=clauses(c);return '<div class="aq-response-lanes__zone" data-zone="'+k+'"><p class="aq-response-lanes__zk">'+tx(C[k]||'')+'</p><ol class="aq-response-lanes__stops">'
   +E.map(function(x){return '<li><span class="aq-response-lanes__node" aria-hidden="true"></span><span class="aq-response-lanes__v">'+tcell(cap(x))+'</span></li>'}).join('')+'</ol></div>'}
  return '<li class="aq-response-lanes__row'+(sev===1?' is-first':'')+(sev?' is-sev':'')+(brk?' is-break':'')+'"'+(sev?' data-sev="'+sev+'"':'')+'>'
   +'<div class="aq-response-lanes__req">'
    +(sev?'<span class="aq-response-lanes__num" aria-hidden="true">'+sev+'</span>':'')
    +'<h3 class="aq-response-lanes__t">'+(sev?'<span class="aq-response-lanes__sev">Severity '+sev+'<span class="aq-response-lanes__sr">: </span></span><span class="aq-response-lanes__what">'+tx(cap(m[2]))+'</span>':tcell(r[0]))+'</h3></div>'
   +'<div class="aq-response-lanes__lane"><span class="aq-response-lanes__line" aria-hidden="true"><i></i></span><span class="aq-response-lanes__start" aria-hidden="true"></span>'+zone(r[1],1)+zone(r[2],2)+'</div></li>'}).join('');
 var head='<p class="aq-response-lanes__head" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+wIcon('clock','aq-response-lanes__ic')+tx(C[1]||'')+'</span><span>'+tx(C[2]||'')+'</span></p>';
 return sec(H+'<div class="aq-response-lanes">'+head+'<ol class="aq-response-lanes__rows">'+rows+'</ol></div>','aq-response-lanes-sec')};
})();
