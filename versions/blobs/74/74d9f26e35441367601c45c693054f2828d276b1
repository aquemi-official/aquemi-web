/* Look "pid-routes" -> PidRoutes (design-system/components/PidRoutes): a router table drawn as a P&ID on a navy
   blueprint ground. Three columns (situation, system, start with) joined by pipe runs, each run through its own valve
   symbol; rows whose next cell links the same page are tied by a header line (junction dots where they join, a line
   break where a header crosses a run it does not join), so the shared destinations read as converging pipework.
   Fields: cols (three labels), rows ([situation, system, start]; each cell a string or {t, link, intent}), nav (drawing
   caption). Phones (pass 12, PhoneKit accordion): six tap rows (path number, situation, chevron; 56 px or more), one
   open at a time; the open row draws one short horizontal pipe, System through its valve to Start with (the start box
   is the link, 44 px or more). Without script: each route runs down as a vertical pipe, labels shown. */
LOOKS['pid-routes']=(function(){
 var KINDS=['gate','globe','diaphragm','check','ball'],uid=0;
 function key(c){return c&&typeof c==='object'?(c.link?wsplit(c.link)[0]:String(c.t||'')):String(c||'')}
 /* ISA-5.1 style valve symbols, 28 x 28, body centred on the run */
 function valve(k){var b='<path class="aq-pid-routes__vb" d="M3 8.5 14 14 3 19.5Z M25 8.5 14 14 25 19.5Z"/>',x='';
  if(k==='gate')x='<path class="aq-pid-routes__vs" d="M14 14V5 M9.5 5H18.5"/>';
  else if(k==='globe')x='<circle class="aq-pid-routes__vf" cx="14" cy="14" r="2.6"/><path class="aq-pid-routes__vs" d="M14 11.4V5 M9.5 5H18.5"/>';
  else if(k==='diaphragm')x='<path class="aq-pid-routes__vs" d="M8.5 9.6A5.5 5.5 0 0 1 19.5 9.6 M14 4.1V1.5 M10 1.5H18"/>';
  else if(k==='check')x='<path class="aq-pid-routes__vs" d="M3 19.5 25 8.5"/>';
  else x='<circle class="aq-pid-routes__vb" cx="14" cy="14" r="3.6"/><path class="aq-pid-routes__vs" d="M14 10.4V5 M14 5H21"/>';
  return '<svg class="aq-pid-routes__valve" viewBox="0 0 28 28" aria-hidden="true" focusable="false">'+b+x+'</svg>'}
 /* ties: rows grouped by the page (or text) of column c; a group of two or more gets a header line at x% */
 function ties(R,c,x0){var g={},out=R.map(function(){return []}),n=0;
  R.forEach(function(r,i){var k=key(r[c]);(g[k]=g[k]||[]).push(i)});
  Object.keys(g).forEach(function(k){var m=g[k];if(m.length<2)return;var a=m[0],z=m[m.length-1],x=x0+12*(n++),rs=m.join(' ');
   for(var i=a;i<=z;i++)out[i].push({x:x,rs:rs,part:i===a?'down':i===z?'up':m.indexOf(i)>=0?'join':'cross'})});
  return out}
 function run(i,side,tie,kind,inst){
  var ln='<line class="aq-pid-routes__ln aq-pid-routes__ln--h" x1="0" y1="50" x2="100" y2="50"/><line class="aq-pid-routes__ln aq-pid-routes__ln--v" x1="50" y1="0" x2="50" y2="100"/>',dots='';
  tie.forEach(function(t){var x=t.x,a=' data-rs="'+t.rs+'"';
   if(t.part==='down')ln+='<line class="aq-pid-routes__tie"'+a+' x1="'+x+'" y1="50" x2="'+x+'" y2="100"/>';
   else if(t.part==='up')ln+='<line class="aq-pid-routes__tie"'+a+' x1="'+x+'" y1="0" x2="'+x+'" y2="50"/>';
   else if(t.part==='join')ln+='<line class="aq-pid-routes__tie"'+a+' x1="'+x+'" y1="0" x2="'+x+'" y2="100"/>';
   else ln+='<line class="aq-pid-routes__tie"'+a+' x1="'+x+'" y1="0" x2="'+x+'" y2="38"/><line class="aq-pid-routes__tie"'+a+' x1="'+x+'" y1="62" x2="'+x+'" y2="100"/>';
   if(t.part!=='cross')dots+='<span class="aq-pid-routes__jn" data-rs="'+t.rs+'" style="left:'+x+'%"></span>'});
  return '<div class="aq-pid-routes__run aq-pid-routes__run--'+side+(tie.length?' has-tie':'')+'" data-r="'+i+'" aria-hidden="true">'
   +'<svg class="aq-pid-routes__pipe" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">'+ln+'</svg>'+dots
   +'<span class="aq-pid-routes__port"></span>'+valve(kind)
   +(inst?'<svg class="aq-pid-routes__inst" viewBox="0 0 20 30" focusable="false"><path d="M10 30V18"/><circle cx="10" cy="10" r="8"/><path d="M2 10H18"/></svg>':'')
   +'<svg class="aq-pid-routes__arrow" viewBox="0 0 10 10" focusable="false"><path d="M1 1 9 5 1 9Z"/></svg></div>'}
 return function(b,H){var C=b.cols||[],R=(b.rows||[]).filter(function(r){return r&&r.length}),k=++uid;
  var tA=ties(R,1,26),tB=ties(R,2,24);
  function node(c,i,j){return '<div class="aq-pid-routes__node aq-pid-routes__node--'+(j===1?'sys':'go')+'" data-r="'+i+'"><div class="aq-pid-routes__box">'
   +'<p class="aq-pid-routes__k">'+tx(C[j]||'')+'</p><p class="aq-pid-routes__v">'+tcell(c)+'</p></div></div>'}
  var rows=R.map(function(r,i){var s=r[0]&&typeof r[0]==='object'?r[0].t:r[0];
   return '<li class="aq-pid-routes__route" role="listitem" data-pk-item="'+i+'">'
    +'<button type="button" class="aq-pid-routes__tap" data-pk-head><span class="aq-pid-routes__tn" aria-hidden="true">Path '+(i<9?'0':'')+(i+1)+'</span><span class="aq-pid-routes__tt">'+tx(s)+'</span><span class="aq-phone-kit__chev" aria-hidden="true"></span></button>'
    +'<div class="aq-pid-routes__sit" data-r="'+i+'" data-pk-desk><div class="aq-pid-routes__box"><p class="aq-pid-routes__tag" aria-hidden="true"><span>Path '+(i<9?'0':'')+(i+1)+'</span></p>'
    +'<p class="aq-pid-routes__k aq-pid-routes__k--sit">'+tx(C[0]||'')+'</p><h3 class="aq-pid-routes__t">'+tx(s)+'</h3></div></div>'
    +'<div class="aq-pid-routes__path" data-pk-body>'+run(i,'a',tA[i],KINDS[i%KINDS.length],!tA[i].length&&i%2===0)+node(r[1],i,1)
    +run(i,'b',tB[i],KINDS[(i+2)%KINDS.length],false)+node(r[2],i,2)+'</div></li>'}).join('');
  var ruler='<svg class="aq-pid-routes__ruler" aria-hidden="true" focusable="false"><defs><pattern id="pidr-'+k+'" width="64" height="10" patternUnits="userSpaceOnUse">'
   +'<path d="M0.5 0V10 M16.5 6V10 M32.5 3V10 M48.5 6V10"/></pattern></defs><rect width="100%" height="10" fill="url(#pidr-'+k+')"/></svg>';
  var heads='<div class="aq-pid-routes__heads" aria-hidden="true">'+[0,1,2].map(function(j){return '<p class="aq-pid-routes__head"><span>Column 0'+(j+1)+'</span>'+tx(C[j]||'')+'</p>'}).join('<span></span>')+'</div>';
  var cap='<p class="aq-pid-routes__cap" aria-hidden="true"><span>Aquemi</span><span>'+tx(b.nav||'')+'</span><span>P&amp;ID</span></p>';
  return sec(H+'<div class="aq-pid-routes" style="--n:'+R.length+'">'
   +'<span class="aq-pid-routes__mark aq-pid-routes__mark--tl" aria-hidden="true"></span><span class="aq-pid-routes__mark aq-pid-routes__mark--tr" aria-hidden="true"></span>'
   +heads+ruler+'<ol class="aq-pid-routes__list" role="list" data-pk-picker="accordion" data-pk-open="0">'+rows+'</ol>'+ruler.replace('pidr-'+k,'pidr-'+k+'b').replace('pidr-'+k+')','pidr-'+k+'b)')+cap+'</div>','aq-band--navy aq-pid-routes-band')}
})();
/* Hover or focus on any part of a route lights its whole run (and the header lines it shares); the rest dims */
(function(){
 function set(root,i){root.classList.toggle('has-hot',i!=null);
  [].forEach.call(root.querySelectorAll('[data-r],[data-rs]'),function(el){var on=i!=null&&(el.getAttribute('data-r')===i||(' '+(el.getAttribute('data-rs')||'')+' ').indexOf(' '+i+' ')>=0);el.classList.toggle('is-hot',on)})}
 function over(ev){var t=ev.target.closest&&ev.target.closest('.aq-pid-routes [data-r]');var root=ev.target.closest&&ev.target.closest('.aq-pid-routes');
  if(root)set(root,t?t.getAttribute('data-r'):null)}
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);
 document.addEventListener('mouseout',function(ev){var root=ev.target.closest&&ev.target.closest('.aq-pid-routes');if(root&&!root.contains(ev.relatedTarget))set(root,null)});
 document.addEventListener('focusout',function(ev){var root=ev.target.closest&&ev.target.closest('.aq-pid-routes');if(root&&!root.contains(ev.relatedTarget))set(root,null)});
})();
