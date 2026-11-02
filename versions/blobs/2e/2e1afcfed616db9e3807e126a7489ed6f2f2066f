/* Look "gate-line" -> GateLine (design-system/components/GateLine): how an upgrade runs, drawn as one double-line pipe
   on a navy band (pass 9b concept svc-upgrades.4). The pipe is the process axis: each step owns one run of it, a line
   icon above its run and its number, name and line below; a gate valve sits on every joint between two steps, so a
   step is a stage gate the water passes. Your system's water fills the pipe; a legend over the pipe names it with the
   block's lane ("Your system"). A step with a hold puts a "Hold" tag on the gate after it (the water waits there for who
   signs). The step whose line names a (planned) shutdown has a dry run: walls only, dashed, labelled with those words,
   because the system is off while that step is done; the water runs on after it.
   Each step carries its own run and gate, so the same markup reflows: a row of runs at desktop, a vertical pipe down
   the left on phones.
   Fields (a steps block): h, items [{t, d, hold, icon, link}], lane (optional, a drawing label, aria-hidden).
   icon: a line icon name (wIcon); a link makes the step's name the link. */
function glValve(){return '<svg class="aq-gate-line__vsvg" viewBox="-14 -24 28 38" aria-hidden="true" focusable="false"><path class="aq-gate-line__vb" d="M-11 -7V7L11 -7V7Z"/><path class="aq-gate-line__vfill" d="M-11 -7V7L11 -7V7Z"/><path class="aq-gate-line__vs" d="M0 0V-17"/><path class="aq-gate-line__vh" d="M-7 -17H7"/></svg>'}
LOOKS['gate-line']=function(b,H){var I=b.items||[],n=I.length||1,K='aq-gate-line';
 var cut=-1,lab='';I.forEach(function(it,i){var m=String(it.d||'').match(/planned shutdown|shutdown/i);if(cut<0&&m){cut=i;lab=m[0].charAt(0).toUpperCase()+m[0].slice(1)}});
 var li=I.map(function(it,i){var t=tx(it.t);if(it.link&&wp(it.link))t='<a class="'+K+'__go" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+t+'</a>';
  var held=i>0&&I[i-1].hold;
  var run='<span class="'+K+'__run" aria-hidden="true"><span class="'+K+'__walls"></span>'+(i===cut?'<span class="'+K+'__dry"><span class="'+K+'__dl">'+e(lab)+'</span></span>':'<span class="'+K+'__water"></span>')
   +(i>0?'<span class="'+K+'__gate'+(held?' is-hold':'')+'">'+glValve()+(held?'<span class="'+K+'__gk">Hold</span>':'')+'</span>':'')
   +(i===n-1?'<span class="'+K+'__out"></span>':'')+'</span>';
  return '<li class="'+K+'__step'+(i===cut?' is-cut':'')+(it.hold?' is-hold':'')+'" style="--i:'+i+'">'
   +'<span class="'+K+'__ic" aria-hidden="true">'+(isIcon(it.icon)?wIcon(it.icon):'')+'</span>'+run
   +'<div class="'+K+'__txt"><span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><h3 class="'+K+'__t">'+t+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')
   +(it.hold?'<p class="'+K+'__hold"><span class="'+K+'__hk">Hold</span> <span>Signed by '+stepWho(it.hold)+'</span></p>':'')+'</div></li>'}).join('');
 var leg=b.lane?'<p class="'+K+'__legend" aria-hidden="true"><span class="'+K+'__sw"></span>'+tx(b.lane)+'</p>':'';
 return sec(H+leg+'<ol class="'+K+'" role="list" style="--n:'+n+'">'+li+'</ol>','aq-band--navy '+K+'-sec" data-theme="dark')};
