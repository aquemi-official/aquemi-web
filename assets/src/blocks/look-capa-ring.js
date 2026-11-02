/* Look "capa-ring" -> CapaRing (design-system/components/CapaRing): a defect's way from hold to close as one loop that
   closes. On a navy ground the steps sit around a ring, clockwise from the top right: the first three down the right,
   the rest back up the left, each joined to its node by a short leader. A hold step's node is drawn as a closed valve
   and its text names who signs. The water runs the ring once, waits at the hold, lights each node as it arrives and
   closes the loop back at the first: what the steps mean together (nothing is left open). The ring's centre carries the
   record's short name, taken from the first step's text (the abbreviation in it, e.g. "NCR"), or the block's "core".
   Fields (a steps block): h, intro, items [{t, d, hold, link}], core (optional centre word). Six steps fit best (three
   a side); any count works. Pointing at a step lights its node.
   Phones: the ring sits over the steps, which follow as a numbered list. */
LOOKS['capa-ring']=function(b,H){var I=b.items||[],n=I.length,half=Math.ceil(n/2),cx=200,cy=200,r=148;
 var core=b.core||((String(I[0]&&I[0].d||'').match(/\b[A-Z]{3,5}\b/)||[''])[0]);
 var ang=function(i){return (-90+(i+0.5)*360/n)*Math.PI/180},pt=function(i,rr){return [cx+(rr||r)*Math.cos(ang(i)),cy+(rr||r)*Math.sin(ang(i))]};
 var f=function(v){return v.toFixed(1)};
 /* the flow: a full circle from node 1, clockwise, as two arcs */
 var s0=pt(0),opp=[2*cx-s0[0],2*cy-s0[1]],ring='M'+f(s0[0])+' '+f(s0[1])+'A'+r+' '+r+' 0 0 1 '+f(opp[0])+' '+f(opp[1])+'A'+r+' '+r+' 0 0 1 '+f(s0[0])+' '+f(s0[1]);
 var svg='<svg class="aq-capa-ring__svg" viewBox="0 0 400 400" aria-hidden="true" focusable="false">'
  +'<circle class="aq-capa-ring__far" cx="200" cy="200" r="186"/><circle class="aq-capa-ring__base" cx="200" cy="200" r="'+r+'"/>'
  +'<path class="aq-capa-ring__flow" d="'+ring+'"/>';
 for(var t=0;t<72;t++){var a=t*5*Math.PI/180,r1=180,r2=t%6?184:190;svg+='<path class="aq-capa-ring__tick" d="M'+f(cx+r1*Math.cos(a))+' '+f(cy+r1*Math.sin(a))+'L'+f(cx+r2*Math.cos(a))+' '+f(cy+r2*Math.sin(a))+'"/>'}
 I.forEach(function(it,i){var p=pt(i),right=Math.cos(ang(i))>=0,ex=right?400:0;
  svg+='<g class="aq-capa-ring__node'+(it.hold?' is-hold':'')+'" data-i="'+i+'"><path class="aq-capa-ring__lead" d="M'+f(p[0]+(right?16:-16))+' '+f(p[1])+'H'+ex+'"/>'
   +(it.hold?'<rect class="aq-capa-ring__dot" x="'+f(p[0]-15)+'" y="'+f(p[1]-15)+'" width="30" height="30"/><path class="aq-capa-ring__valve" d="M'+f(p[0]-8)+' '+f(p[1]-6)+'L'+f(p[0]+8)+' '+f(p[1]+6)+'V'+f(p[1]-6)+'L'+f(p[0]-8)+' '+f(p[1]+6)+'Z"/>'
    :'<circle class="aq-capa-ring__dot" cx="'+f(p[0])+'" cy="'+f(p[1])+'" r="15"/><text class="aq-capa-ring__no" x="'+f(p[0])+'" y="'+f(p[1]+4.5)+'" text-anchor="middle">'+(i+1)+'</text>')+'</g>'});
 svg+='</svg>';
 var steps=I.map(function(it,i){var who=it.hold?String(it.hold):'',side=i<half?'r':'l',row=i<half?i+1:n-i;
  return '<li class="aq-capa-ring__step is-'+side+(it.hold?' is-hold':'')+'" data-i="'+i+'" style="--row:'+row+'"><span class="aq-capa-ring__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<h3 class="aq-capa-ring__t">'+(it.link&&wp(it.link)?wlink(it.link,it.t):tx(it.t))+'</h3>'+(it.d?'<p class="aq-capa-ring__d">'+tx(it.d)+'</p>':'')
   +(who?'<p class="aq-capa-ring__hold"><span class="aq-capa-ring__hk">Hold</span> <span>Signed by '+tx(/^[A-Z][a-z]/.test(who)?who.charAt(0).toLowerCase()+who.slice(1):who)+'</span></p>':'')+'</li>'}).join('');
 return sec(H+'<div class="aq-capa-ring" style="--rows:'+half+'"><div class="aq-capa-ring__fig">'+svg+(core?'<span class="aq-capa-ring__core" aria-hidden="true">'+e(core)+'</span>':'')+'</div>'
  +'<ol class="aq-capa-ring__steps" role="list">'+steps+'</ol></div>','aq-band--navy aq-capa-ring-sec')};
if(typeof document!=='undefined'&&document.addEventListener)['mouseover','mouseout','focusin','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var s=ev.target.closest&&ev.target.closest('.aq-capa-ring__step');if(!s)return;
 if(/out$/.test(t)&&ev.relatedTarget&&s.contains(ev.relatedTarget))return;var g=s.closest('.aq-capa-ring').querySelector('.aq-capa-ring__node[data-i="'+s.getAttribute('data-i')+'"]');if(g)g.classList.toggle('is-hover',/over|in$/.test(t))})});
