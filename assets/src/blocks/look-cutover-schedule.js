/* Look "cutover-schedule" -> CutoverSchedule (design-system/components/CutoverSchedule): how an upgrade runs, set as a
   schedule. Each step is a row: its number, name and what happens on the left; on the right its bar on one shared
   timeline, each bar starting where the last one ends (drawn not to scale: the page gives no durations, so every bar
   is the same length and the sheet says so). A step with a hold ends in a hold diamond with who signs. Above the
   rows runs your system's water line, unbroken through every step except the one whose text names a planned
   shutdown, where the line breaks and the gap is labelled with those words; that step's bar is filled.
   Fields (a steps block with holds): h, items [{t, d, hold, link}], ground, lane (optional: the water line's label,
   a drawing label, aria-hidden). A link makes the step's name the link.
   Phones (pass 12, S10/S8): no bar under each row; one mini schedule (all bars stair-stepped under the water line, its
   break at the shutdown) held under the header as a PhoneKit sticky strip, lighting the bar and the step number of the
   row being read. The rows become compact cards. */
LOOKS['cutover-schedule']=function(b,H){var I=b.items||[],n=I.length||1,K='aq-cutover-schedule',w=100/n;
 var cut=-1,lab='';I.forEach(function(it,i){var m=String(it.d||'').match(/planned shutdown|shutdown/i);if(cut<0&&m){cut=i;lab=m[0].charAt(0).toUpperCase()+m[0].slice(1)}});
 var seg=function(a,c){return '<span class="'+K+'__water" style="left:'+a.toFixed(3)+'%;width:'+(c-a).toFixed(3)+'%"></span>'};
 var lane='<div class="'+K+'__lane" aria-hidden="true"><span class="'+K+'__lk">'+tx(b.lane||'')+'</span><span class="'+K+'__ltrack">'
  +(cut<0?seg(0,100):seg(0,cut*w)+'<span class="'+K+'__gap" style="left:'+(cut*w).toFixed(3)+'%;width:'+w.toFixed(3)+'%"><span class="'+K+'__gl">'+e(lab)+'</span></span>'+seg((cut+1)*w,100))
  +'</span></div>';
 var grid='<span class="'+K+'__grid" aria-hidden="true">'+I.map(function(it,i){return '<span style="left:'+(i*w).toFixed(3)+'%"></span>'}).join('')+'</span>';
 var rows=I.map(function(it,i){var t=tx(it.t);if(it.link&&wp(it.link))t='<a class="'+K+'__go" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+t+'</a>';
  return '<li class="'+K+'__row'+(i===cut?' is-cut':'')+(it.hold?' is-hold':'')+'"><span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<div class="'+K+'__txt"><h3 class="'+K+'__t">'+t+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')
   +(it.hold?'<p class="'+K+'__hold"><span class="'+K+'__hk">Hold</span> <span>Signed by '+stepWho(it.hold)+'</span></p>':'')+'</div>'
   +'<div class="'+K+'__track" aria-hidden="true">'+grid+'<span class="'+K+'__bar" style="left:'+(i*w).toFixed(3)+'%;width:'+w.toFixed(3)+'%">'+(it.hold?'<span class="'+K+'__diamond"></span>':'')+'</span></div></li>'}).join('');
 var foot='<p class="'+K+'__nts" aria-hidden="true">Not to scale</p>';
 /* the phone strip: the step number in view, then the whole schedule in miniature (water line, its gap, every bar) */
 var nn=function(i){return (i<9?'0':'')+(i+1)};
 var mini='<div class="'+K+'__mini" data-pk-fig aria-hidden="true"><span class="'+K+'__mn">'+I.map(function(it,i){return '<span data-pk-key="'+i+'">'+nn(i)+'</span>'}).join('')+'<small>/ '+nn(n-1)+'</small></span>'
  +'<span class="'+K+'__mg"><span class="'+K+'__mk">'+tx(b.lane||'')+'</span><span class="'+K+'__mw">'
  +(cut<0?seg(0,100):seg(0,cut*w)+'<span class="'+K+'__mgap" style="left:'+(cut*w).toFixed(3)+'%;width:'+w.toFixed(3)+'%"></span>'+seg((cut+1)*w,100))+'</span>'
  +'<span class="'+K+'__mb">'+I.map(function(it,i){return '<span class="'+(i===cut?'is-cut':'')+(it.hold?' is-hold':'')+'" data-pk-key="'+i+'" style="left:'+(i*w).toFixed(3)+'%;width:'+w.toFixed(3)+'%;top:'+(i*100/n).toFixed(3)+'%;height:calc('+(100/n).toFixed(3)+'% - 1px)"></span>'}).join('')+'</span></span></div>';
 rows=rows.replace(/<li class="([^"]*)"/g,(function(){var k=0;return function(m,c){return '<li class="'+c+'" data-pk-row="'+(k++)+'"'}})());
 return sec(H+'<div class="'+K+'" style="--n:'+n+'" data-pk-sticky data-pk-h="96">'+mini+lane+'<ol class="'+K+'__rows" role="list">'+rows+'</ol>'+foot+'</div>',K+'-sec')};
