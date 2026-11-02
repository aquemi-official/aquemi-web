/* Look "pq-calendar" -> PqCalendar (design-system/components/PqCalendar): PQ phases beside one instrument readout
   (pass 9b concept svc-cq.3), Swiss data graphics on the limestone band. Left, the phases as a short numbered stack
   ("01 /" in mono), each with what it samples and, where it has one, the hold point. Right, a readout panel: the
   sample count set as the one giant light numeral (points x days), its unit and sum under it, the sampling grid that
   makes it (one dot per sample, a row per sample point, a column per day, the phases split by the dashed hold line),
   and a tick scale of the year (one tick per week: the daily phases solid, the routine plan as short ticks to the
   year's end, its label as the tag at the end). Pointing at or focusing a phase moves a region marker (edge handles)
   over its days on the grid and its weeks on the scale; arrow keys, Home and End step between the phases.
   Fields (a steps block): h, intro, items [{t, d, hold, days}] (days: the phase's span in days for the grid; a phase
   without days is the routine plan that runs on to the end of the year), grid {points, days, rows, cols, unit}
   (the grid's size and axis words; points x days is the total shown), year {weeks, months, label} (52, 12).
   Phones: the phases stack over the panel; the scale keeps the full width with odd months numbered. */
LOOKS['pq-calendar']=function(b,H){var I=b.items||[],G=b.grid||{},Y=b.year||{},NP=+G.points||12,ND=+G.days||28,NW=+Y.weeks||52,NM=+Y.months||12;
 var acc=0,spans=I.map(function(it){var d=+it.days>0?+it.days:0,s=acc;acc+=d;return d?[s,acc]:null}),ends=spans.filter(Boolean).map(function(s){return s[1]});
 var wk=acc/7;
 function who(s){s=String(s);return tx(/^[A-Z][a-z]/.test(s)?s.charAt(0).toLowerCase()+s.slice(1):s)}
 function f(x){return (x*100).toFixed(2)+'%'}
 /* the year as a tick scale: one tick per week */
 var ticks='';for(var w=0;w<NW;w++){var day=w*7,ph=0;while(ph<ends.length&&day>=ends[ph])ph++;var on=ph<ends.length;
  ticks+='<rect class="aq-pq-calendar__wk '+(on?'is-p'+(ph+1):'is-rest')+'" x="'+(w*10+3)+'" y="'+(on?0:14)+'" width="'+(on?4:1.5)+'" height="'+(on?32:18)+'"/>'}
 var year='<svg class="aq-pq-calendar__year" viewBox="0 0 '+(NW*10)+' 32" preserveAspectRatio="none" aria-hidden="true" focusable="false">'+ticks+'</svg>';
 var months='';for(var k=1;k<=NM;k++)months+='<span>'+k+'</span>';
 /* the sampling grid: one dot per sample */
 var dots='',R=5,S=16;for(var d=0;d<ND;d++){var ph=0;while(ph<ends.length-1&&d>=ends[ph])ph++;for(var p=0;p<NP;p++)dots+='<circle class="aq-pq-calendar__dot is-p'+(ph+1)+'" data-d="'+d+'" cx="'+(d*S+S/2)+'" cy="'+(p*S+S/2)+'" r="'+R+'"/>'}
 var holdAt=-1;I.forEach(function(it,i){if(it.hold&&spans[i]&&spans[i][0]>0)holdAt=spans[i][0]});
 var hl=holdAt>0?'<line class="aq-pq-calendar__hl" x1="'+(holdAt*S)+'" y1="-8" x2="'+(holdAt*S)+'" y2="'+(NP*S+8)+'"/>':'';
 var mat='<svg class="aq-pq-calendar__grid" viewBox="0 -8 '+(ND*S)+' '+(NP*S+16)+'" aria-hidden="true" focusable="false">'+dots+hl+'</svg>';
 var reg='<span class="aq-pq-calendar__reg" aria-hidden="true"><i></i><i></i></span>';
 var total=NP*ND;
 var phases=I.map(function(it,i){var sp=spans[i],g=sp?[sp[0]/ND,sp[1]/ND]:null,y=sp?[sp[0]/7/NW,sp[1]/7/NW]:[wk/NW,1];
  return '<li class="aq-pq-calendar__ph '+(sp?'is-p'+(i+1):'is-rest')+'" tabindex="0" style="--g0:'+(g?f(g[0]):'0%')+';--g1:'+(g?f(g[1]-g[0]):'0%')+';--y0:'+f(y[0])+';--y1:'+f(y[1]-y[0])+'">'
  +'<span class="aq-pq-calendar__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'<i>/</i></span>'
  +'<div class="aq-pq-calendar__txt"><h3 class="aq-pq-calendar__t"><span class="aq-pq-calendar__key" aria-hidden="true"></span>'+tx(it.t)+'</h3>'
  +(it.d?'<p class="aq-pq-calendar__d">'+tx(it.d)+'</p>':'')
  +(it.hold?'<p class="aq-pq-calendar__hold"><span>Hold point</span> Signed by '+who(it.hold)+'</p>':'')+'</div></li>'}).join('');
 return sec(H+'<div class="aq-pq-calendar" data-theme="light">'
  +'<ol class="aq-pq-calendar__phases">'+phases+'</ol>'
  +'<div class="aq-pq-calendar__panel">'
  +'<p class="aq-pq-calendar__total"><span class="aq-pq-calendar__num">'+total+'</span><span class="aq-pq-calendar__unit">'+tx(G.unit||'')+'</span>'
  +'<span class="aq-pq-calendar__eq">'+NP+' '+tx(G.rows||'')+' &times; '+ND+' '+tx(G.cols||'')+'</span></p>'
  +'<div class="aq-pq-calendar__zoomed">'+mat+reg+'</div>'
  +'<div class="aq-pq-calendar__strip"><div class="aq-pq-calendar__scale">'+year+reg+'</div><div class="aq-pq-calendar__months" aria-hidden="true">'+months+'</div>'
  +(Y.label?'<span class="aq-pq-calendar__ylab" aria-hidden="true">'+tx(Y.label)+'</span>':'')+'</div>'
  +'</div></div>','aq-band--limestone aq-pq-calendar-sec')};
/* pointing at or focusing a phase moves the region markers to its days and weeks; arrows, Home, End step the phases */
(function(){function pick(li,on){var w=li.closest('.aq-pq-calendar');if(!w)return;
  if(on){['--g0','--g1','--y0','--y1'].forEach(function(k){w.style.setProperty(k,li.style.getPropertyValue(k))});w.setAttribute('data-on',li.classList.contains('is-rest')?'rest':'grid')}
  else w.removeAttribute('data-on')}
 ['pointerover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var l=ev.target.closest&&ev.target.closest('.aq-pq-calendar__ph');if(l&&!(t==='pointerover'&&ev.pointerType==='touch'))pick(l,true)})});
 ['pointerout','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var l=ev.target.closest&&ev.target.closest('.aq-pq-calendar__ph');if(l&&!(ev.relatedTarget&&ev.relatedTarget.closest&&ev.relatedTarget.closest('.aq-pq-calendar__ph')))pick(l,false)})});
 document.addEventListener('keydown',function(ev){var l=ev.target.closest&&ev.target.closest('.aq-pq-calendar__ph');if(!l)return;
  var o=[].slice.call(l.parentNode.children),i=o.indexOf(l),n=o.length,k=ev.key,j=k==='ArrowDown'||k==='ArrowRight'?Math.min(n-1,i+1):k==='ArrowUp'||k==='ArrowLeft'?Math.max(0,i-1):k==='Home'?0:k==='End'?n-1:-1;
  if(j<0)return;ev.preventDefault();o[j].focus()})})();
