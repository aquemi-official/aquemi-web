/* Look "hold-timeline" -> HoldTimeline (pass 9): a steps block drawn as one rising line of stage nodes across a pale
   engraved macro close-up of a PP pipe. Stages climb left to right; each stage's callout hangs off its node like a
   flag on a pole, alternately below-right and above-left, so the line never crosses text. A stage with hold
   ("<who signs>") is a hold point: a ringed node and a "Hold point" stamp naming who signs.
   Item title "<stage>, <duration>": the last top-level comma (outside [] and ()) splits it into the stage name and its
   duration, shown as a mono line (a placeholder as its chip). Optional item field box: true sets that stage's stated
   duration ("at least 12 months") as the boxed figure of the section; no duration is boxed by default (DR-018 rule 3:
   display size is a claim). An item's link (page or page#anchor) makes the stage name a link.
   Optional block field macro: false drops the pipe close-up. The pipe is drawn plain, with no joint or bead profile
   (DR-018: the joining method is open, FD-18). Phones: one vertical line, stages down it.
   Design system: components/HoldTimeline. */
function holdSplit(t){t=String(t||'');var d=0,k=-1;for(var i=0;i<t.length;i++){var c=t.charAt(i);if(c==='['||c==='(')d++;else if((c===']'||c===')')&&d)d--;else if(c===','&&!d&&t.charAt(i+1)===' ')k=i}
 return k<0?[t,'']:[t.slice(0,k),t.slice(k+2)]}
/* The macro: a pipe sweeping through the frame, its round body drawn by engraving lines (closer together towards
   the edges), water as a dashed centre line; no joint drawn. Geometry only, no copy. */
function holdMacro(){var P=[[1180,-160],[640,220],[1120,700],[560,1160]],R=200,K=18,N=72,o='';
 function bz(t){var u=1-t;return [0,1].map(function(a){return u*u*u*P[0][a]+3*u*u*t*P[1][a]+3*u*t*t*P[2][a]+t*t*t*P[3][a]})}
 function nrm(t){var a=bz(Math.max(0,t-0.002)),b=bz(Math.min(1,t+0.002)),dx=b[0]-a[0],dy=b[1]-a[1],l=Math.sqrt(dx*dx+dy*dy)||1;return [-dy/l,dx/l]}
 function off(f,t0,t1){var d='';for(var i=0;i<=N;i++){var t=t0+(t1-t0)*i/N,p=bz(t),q=nrm(t);d+=(i?'L':'M')+(p[0]+q[0]*f).toFixed(1)+' '+(p[1]+q[1]*f).toFixed(1)}return d}
 for(var k=0;k<=K;k++){var f=R*Math.cos(Math.PI*k/K),edge=k===0||k===K;o+='<path class="'+(edge?'aq-hold-timeline__edge':'aq-hold-timeline__ct')+'" d="'+off(f,0,1)+'"/>'}
 o+='<path class="aq-hold-timeline__water" d="'+off(0,0,1)+'"/>';
 return '<div class="aq-hold-timeline__macro" aria-hidden="true"><svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">'+o+'</svg></div>'}
/* Node positions: x in % of the frame. Odd stages hang above-left of their node, even ones below-right; w is the
   callout width, s the node spacing, chosen so same-side callouts never touch and nothing leaves the frame. */
function holdGeo(n){var w=n<=4?30:n<=6?25:21,E=(n-1)%2?n-2:n-1,O=(n-1)%2?n-1:n-2,s=w-2;
 if(E>1)s=Math.min(s,(100-2*w)/(E-1));if(O>1)s=Math.min(s,(98-w)/(O-1));
 var x=[];for(var i=0;i<n;i++)x.push(+(w+(i-1)*s).toFixed(2));return {w:w,x:x}}
LOOKS['hold-timeline']=function(b,H){var I=b.items||[],n=I.length,G=holdGeo(n);
 function who(s){s=String(s);return tx(/^[A-Z][a-z]/.test(s)?s.charAt(0).toLowerCase()+s.slice(1):s)}
 function yf(i){return Math.max(0,Math.min(1000,(0.5+n-1-i)/n*1000))}
 var pts=[[0,yf(-1)]].concat(G.x.map(function(x,i){return [x*10,yf(i)]})).concat([[1000,yf(n)]]).map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ');
 var st=I.map(function(it,i){var sp=holdSplit(it.t),name=sp[0],dur=sp[1],fig=it.box===true&&dur&&dur.indexOf('[')<0&&/\d/.test(dur),
   nm=it.link&&wp(it.link)?'<a href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(name)+'</a>':tx(name);
  return '<li class="aq-hold-timeline__st '+(i%2?'is-up':'is-down')+(it.hold?' is-hold':'')+'" style="--i:'+i+';--x:'+G.x[i]+'%">'
   +'<span class="aq-hold-timeline__pole" aria-hidden="true"></span><span class="aq-hold-timeline__node" aria-hidden="true"><span class="aq-hold-timeline__halo"></span></span>'
   +'<div class="aq-hold-timeline__c">'
   +'<h3 class="aq-hold-timeline__t"><span class="aq-hold-timeline__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+' /</span> '+nm+'</h3>'
   +(dur?(fig?'<p class="aq-hold-timeline__fig">'+tx(dur).replace(/(\d+(?:[.,]\d+)?)/,'<span class="aq-hold-timeline__num">$1</span>')+'</p>':'<p class="aq-hold-timeline__dur">'+tx(dur)+'</p>'):'')
   +(it.d?'<p class="aq-hold-timeline__d">'+tx(it.d)+'</p>':'')
   +(it.hold?'<p class="aq-hold-timeline__hold"><span class="aq-hold-timeline__hk">Hold point</span> Signed by '+who(it.hold)+'</p>':'')
   +'</div></li>'}).join('');
 return '<section class="aq-section aq-hold-timeline-sec">'+(b.macro===false?'':holdMacro())+'<div class="aq-in aq-stack-l">'+H
  +'<div class="aq-hold-timeline" style="--n:'+n+';--w:'+G.w+'%">'
  +'<ol class="aq-hold-timeline__list">'+st
  +'<li class="aq-hold-timeline__band" aria-hidden="true"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none">'
  +'<polyline class="aq-hold-timeline__rail" points="'+pts+'"/><polyline class="aq-hold-timeline__run" points="'+pts+'"/></svg>'
  +'<span class="aq-hold-timeline__drop"></span></li></ol></div></div></section>'};
