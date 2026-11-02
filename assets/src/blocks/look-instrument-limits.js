/* Look "instrument-limits" -> InstrumentLimits (design-system/components/InstrumentLimits): a spec block of levels
   (as "gauges") read off two instruments on a dark panel. The first row with a figure (the action level) is an analog
   dial: a 240° scale with its limit as the red-line wedge, the limit's figure as the readout under it, the level word
   in its status colour. A row without a figure (the alert level, set from data) is a chart recorder: sample traces in
   two runs, the dial's limit as the action line along the top, and the alert line drawn in after the runs, from the
   data, then carried on across the rest of the chart; its value is the words of the row. Each faceplate names the
   level, gives the basis as tags (split at ";") and keeps the row's link.
   Fields, as a spec block (as "gauges"): h, intro, rows [{p, v, m, level, hl, link, link_label}], note. level:
   "action" (or "alert") names the status word and colour. Decoration only: the dial scale and the recorder traces
   carry no figures beyond the row's own limit.
   Phones: the faceplates stack, each instrument above its words. */
function ilNum(v){var m=String(v||'').match(/^\s*[≤≥<>=]?\s*(\d+(?:[.,]\d+)?)/);return m?parseFloat(m[1].replace(',','.')):NaN}
function ilDial(lim){var cx=150,cy=150,r=112,a0=150,a1=390,max=lim*1.5,P=function(a,rr){var t=a*Math.PI/180;return [(cx+rr*Math.cos(t)).toFixed(1),(cy+rr*Math.sin(t)).toFixed(1)]};
 function arc(f,t,rr){var p=P(f,rr),q=P(t,rr);return 'M'+p[0]+' '+p[1]+'A'+rr+' '+rr+' 0 '+(t-f>180?1:0)+' 1 '+q[0]+' '+q[1]}
 var s='<path class="aq-instrument-limits__scale" d="'+arc(a0,a1,r)+'"/>',al=a0+(a1-a0)*(lim/max);
 for(var i=0;i<=30;i++){var a=a0+(a1-a0)*i/30,p=P(a,r),q=P(a,r-(i%5?8:16));s+='<path class="aq-instrument-limits__tick'+(i%5?'':' is-major')+'" d="M'+p[0]+' '+p[1]+'L'+q[0]+' '+q[1]+'"/>'}
 s+='<path class="aq-instrument-limits__red" d="'+arc(al,a1,r-4)+'"/>';
 var z=P(a0,r-30),l=P(al,r+20);
 s+='<text class="aq-instrument-limits__sl" x="'+z[0]+'" y="'+z[1]+'" text-anchor="middle">0</text><text class="aq-instrument-limits__sl is-lim" x="'+l[0]+'" y="'+l[1]+'" text-anchor="middle">'+lim+'</text>';
 var n=P(al,r-6);s+='<g class="aq-instrument-limits__needle" style="transform-origin:'+cx+'px '+cy+'px"><path d="M'+cx+' '+cy+'L'+n[0]+' '+n[1]+'"/></g><circle class="aq-instrument-limits__hub" cx="'+cx+'" cy="'+cy+'" r="7"/>';
 return '<svg class="aq-instrument-limits__dial" viewBox="0 0 300 236" aria-hidden="true" focusable="false" data-a0="'+a0+'" data-al="'+al.toFixed(1)+'">'+s+'</svg>'}
function ilRecorder(lim){var W=520,Hh=240,top=28,s='',x;
 for(x=0;x<=W;x+=40)s+='<path class="aq-instrument-limits__gl" d="M'+x+' 0V'+Hh+'"/>';for(var y=0;y<=Hh;y+=40)s+='<path class="aq-instrument-limits__gl" d="M0 '+y+'H'+W+'"/>';
 s+='<path class="aq-instrument-limits__act" d="M0 '+top+'H'+W+'"/>';
 /* two runs of samples (decorative), then the alert line set from them */
 var seed=7,rnd=function(){seed=(seed*9301+49297)%233280;return seed/233280},pts=[];
 [[12,100],[118,206]].forEach(function(run){for(var k=run[0];k<=run[1];k+=7){pts.push([k,176+rnd()*40-(rnd()>0.85?30:0)])}});
 s+='<path class="aq-instrument-limits__band" d="M0 0H212V'+Hh+'H0Z"/>';
 s+=pts.map(function(p){return '<circle class="aq-instrument-limits__pt" cx="'+p[0]+'" cy="'+p[1].toFixed(1)+'" r="3"/>'}).join('');
 s+='<path class="aq-instrument-limits__alert" d="M0 128H'+W+'"/>';
 return '<svg class="aq-instrument-limits__rec" viewBox="0 0 '+W+' '+Hh+'" aria-hidden="true" focusable="false">'+s+'</svg>'}
LOOKS['instrument-limits']=function(b,H){var R=b.rows||[],lim=NaN;R.some(function(r){var n=ilNum(r.v);if(!isNaN(n)){lim=n;return true}});
 function tags(m){return m?'<ul class="aq-instrument-limits__basis">'+String(m).split(/;\s*/).map(function(t){return '<li>'+tx(t)+'</li>'}).join('')+'</ul>':''}
 var plates=R.map(function(r,i){var n=ilNum(r.v),dial=!isNaN(n),lv=r.level||(dial?'action':'alert');
  return '<li class="aq-instrument-limits__plate '+(dial?'is-dial':'is-rec')+'">'
   +'<span class="aq-instrument-limits__screws" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'
   +'<h3 class="aq-instrument-limits__p">'+tx(r.p)+'</h3>'
   +'<div class="aq-instrument-limits__face">'+(dial?ilDial(n):ilRecorder(lim)+(isNaN(lim)?'':'<span class="aq-instrument-limits__rl" aria-hidden="true">'+lim+'</span>'))+'</div>'
   +'<p class="aq-instrument-limits__v'+(dial?'':' is-words')+'">'+tx(r.v)+'</p>'
   +'<p class="aq-instrument-limits__lv is-'+e(lv)+'">'+e(lv.charAt(0).toUpperCase()+lv.slice(1))+'</p>'
   +tags(r.m)+wGaugeGo(r)+'</li>'}).join('');
 return '<section class="aq-section aq-instrument-limits-sec" data-theme="dark"><div class="aq-in aq-stack-l">'+H
  +'<ol class="aq-instrument-limits">'+plates+'</ol>'+wSpecNote(b)+'</div></section>'};
