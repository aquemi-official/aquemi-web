/* Look "suite-loop" -> SuiteLoop (design-system/components/SuiteLoop): a router table (as: "router") drawn as a plan of
   one shared loop serving several suites, on a limestone band. The loop is a twin-wall pipe round the sheet; every
   situation is a suite (a room in plan: walls, a door swing) fed by its own drop and point-of-use valve off the loop.
   Inside the suite: the situation, the water it needs, the systems link and the start page as the suite's way out.
   Hovering or focusing a suite sends a slug of water along the loop from the supply to its drop and lights the drop. Phones (pass 12): the loop runs across the top as the header and the suites are a snap row
   under it (one ~300 px room a swipe, each hanging off its own drop and valve); the room in view lights its valve
   and drop, and a dot rail under the row jumps between rooms (AQsnap, the shared copy in parts/Snap.js).
   Fields, as the router: cols (situation, water, systems, start with), rows (cells: string or {t, link, intent}).
   Concept: industries.0 / home.4 (situations piped from one manifold) set as the CDMO's own plant: one loop, many
   suites (the page drawing ind-cdmo shows the same idea). */
(function(){
var VALVE='<svg viewBox="0 0 22 32" focusable="false"><path class="aq-suite-loop__vb" d="M3 3 L11 16 L19 3 Z M3 29 L11 16 L19 29 Z"/><path class="aq-suite-loop__vs" d="M11 16 H21"/></svg>';
LOOKS['suite-loop']=function(b,H){var C=b.cols||[],R=b.rows||[],n=R.length;
 function lk(c){return c&&typeof c==='object'&&c.link&&wp(c.link)?c:null}
 var suites=R.map(function(r,i){var last=r[r.length-1],go=lk(last),mid=r.slice(1,r.length-1);
  var dl=mid.map(function(c,j){return '<div class="aq-suite-loop__f'+(lk(c)?' is-link':'')+'"><dt>'+tx(C[j+1]||'')+'</dt><dd>'+tcell(c)+'</dd></div>'}).join('');
  var out=go?'<a class="aq-suite-loop__go" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':'')+'><span class="aq-suite-loop__k">'+tx(C[r.length-1]||'')+'</span><span class="aq-suite-loop__to">'+tx(go.t)+'</span></a>'
   :'<p class="aq-suite-loop__go"><span class="aq-suite-loop__k">'+tx(C[r.length-1]||'')+'</span><span class="aq-suite-loop__to">'+tcell(last)+'</span></p>';
  return '<li class="aq-suite-loop__suite'+(i?'':' is-snap')+'" style="--rows:'+(mid.length+3)+'"><span class="aq-suite-loop__drop" aria-hidden="true"><span class="aq-suite-loop__dw"></span><span class="aq-suite-loop__valve">'+VALVE+'</span></span>'
   +'<span class="aq-suite-loop__door" aria-hidden="true"></span>'
   +'<span class="aq-suite-loop__tag" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><h3 class="aq-suite-loop__t">'+tx(r[0])+'</h3><dl class="aq-suite-loop__dl">'+dl+'</dl>'+out+'</li>'}).join('');
 var dots='<div class="aq-suite-loop__dots" role="group" aria-label="Suites">'+R.map(function(r,i){return '<button type="button" class="aq-suite-loop__dot" data-snap-to="'+i+'"'+(i?'':' aria-current="true"')+' aria-label="'+e((i<9?'0':'')+(i+1)+' '+String(r[0]&&r[0].t||r[0]||''))+'"></button>'}).join('')+'</div>';
 var loop='<span class="aq-suite-loop__loop" aria-hidden="true"><span class="aq-suite-loop__water"></span><span class="aq-suite-loop__arrow"></span><span class="aq-suite-loop__beam"></span></span>';
 return sec(H+'<div class="aq-suite-loop'+(n>5?' is-dense':'')+'" data-snap-box style="--n:'+n+'">'+loop+'<ol class="aq-suite-loop__suites" data-snap>'+suites+'</ol>'+dots+'</div>','aq-band--limestone aq-suite-loop-sec" data-theme="light')};
})();
