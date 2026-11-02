/* Look "riser-valves" -> RiserValves (design-system/components/RiserValves): a table of response times by request
   (your request, first response, what follows) on a navy sheet with one riser pipe (pass 9b concept contact-service.2).
   A vertical twin-wall riser runs down the gutter between the requests and the answers; at every request a branch tees
   off through a valve into its first response, and a second branch leaves the riser at the foot of the row, runs under
   the first response and turns up into what follows, so the eye is carried from request to response to follow-up.
   Requests written "Severity N: …" show "Severity N" over the rest; the first request without a severity opens under a
   stronger rule. Each value cell is split into lines at "; " outside brackets and parentheses.
   Fields, as a table: cols [your request, first response, what follows], rows [request, first response, what follows],
   intro, nav. Cells may be {t, link, intent}. Design system: components/RiserValves. */
(function(){
function clauses(c){if(c&&typeof c==='object')return [c];var s=String(c==null?'':c),o=[],d=0,st=0;
 for(var i=0;i<s.length;i++){var ch=s[i];if(ch==='('||ch==='[')d++;else if((ch===')'||ch===']')&&d)d--;else if(ch===';'&&!d&&/\s/.test(s[i+1]||'')){o.push(s.slice(st,i));st=i+1}}
 o.push(s.slice(st));return o.map(function(x){return x.trim()}).filter(function(x){return x!==''})}
function cap(s){return typeof s==='string'?s.charAt(0).toUpperCase()+s.slice(1):s}
/* drawn parts (fixed size, never scaled): a gate valve with a lever, and the elbow that turns branch B up */
var VALVE='<svg class="aq-riser-valves__valve" viewBox="-12 -17 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path class="aq-riser-valves__vb" d="M-9 -5L9 5V-5L-9 5Z"/><path class="aq-riser-valves__vs" d="M0 0V-9"/><path class="aq-riser-valves__vl" d="M-6 -10H6"/></svg>';
var ELBOW='<svg class="aq-riser-valves__elb" viewBox="0 0 15 15" width="15" height="15" aria-hidden="true" focusable="false"><path class="aq-riser-valves__ew" d="M0 15A15 15 0 0 0 15 0M0 5A5 5 0 0 0 5 0"/><path class="aq-riser-valves__ef" pathLength="1" d="M0 10A10 10 0 0 0 10 0"/></svg>';
LOOKS['riser-valves']=function(b,H){var C=b.cols||[],R=b.rows||[],seen=false,n=R.length;
 function cell(c,k){return '<div class="aq-riser-valves__cell" data-zone="'+k+'">'
  +(k===1?'<span class="aq-riser-valves__br aq-riser-valves__br--a" aria-hidden="true"><i class="aq-riser-valves__w"></i>'+VALVE+'</span>'
   :'<span class="aq-riser-valves__br aq-riser-valves__br--b" aria-hidden="true"><span class="aq-riser-valves__run"><i class="aq-riser-valves__w"></i></span>'+ELBOW+'<span class="aq-riser-valves__rise"><i class="aq-riser-valves__w"></i></span></span>')
  +'<p class="aq-riser-valves__k">'+tx(C[k]||'')+'</p>'+clauses(c).map(function(x){return '<p class="aq-riser-valves__v">'+tcell(cap(x))+'</p>'}).join('')+'</div>'}
 var rows=R.map(function(r,i){var t=r[0]&&typeof r[0]==='object'?r[0].t:String(r[0]||''),m=t.match(/^Severity\s+(\d+):\s*(.*)$/),sev=m?+m[1]:0;
  var brk=!sev&&!seen&&i>0;if(!sev)seen=true;
  return '<li class="aq-riser-valves__row'+(sev?' is-sev':'')+(sev===1?' is-first-sev':'')+(i===0?' is-top':'')+(i===n-1?' is-end':'')+(brk?' is-break':'')+'"'+(sev?' data-sev="'+sev+'"':'')+'>'
   +'<span class="aq-riser-valves__riser" aria-hidden="true"><i class="aq-riser-valves__w"></i></span>'
   +'<div class="aq-riser-valves__req"><span class="aq-riser-valves__no" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<h3 class="aq-riser-valves__t">'+(sev?'<span class="aq-riser-valves__sev">Severity '+sev+'<span class="aq-riser-valves__sr">: </span></span><span class="aq-riser-valves__what">'+tx(cap(m[2]))+'</span>':tcell(r[0]))+'</h3></div>'
   +cell(r[1],1)+cell(r[2],2)+'</li>'}).join('');
 var head='<p class="aq-riser-valves__colh" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span><span>'+tx(C[2]||'')+'</span></p>';
 return sec(H+'<div class="aq-riser-valves">'+head+'<ol class="aq-riser-valves__rows">'+rows+'</ol></div>','aq-band--navy aq-riser-valves-sec')};
})();
