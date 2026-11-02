/* Look "response-clock" -> ResponseClock (design-system/components/ResponseClock): what happens when something goes
   wrong, read off the response clock. On a navy band a large stopwatch dial (minute ticks, crown and buttons, one
   hand) carries a numbered station per step around its rim, first at twelve o'clock, clockwise. The step whose text
   names the clock ("…start your plan's response clock") starts a flow arc that runs on round the dial, dashed, as
   the clock runs; it ends nowhere in particular, because the page sets no time. Beside the dial the steps read down
   as a list: huge light number, name, what happens. Pointing at (or focusing) a step turns the hand to its station.
   Fields (a steps block): h, intro, items [{t, d, link}]. A link makes the step's name the link. No hold points (a
   steps block with holds belongs to ProcessSteps or CutoverSchedule). Phones: the dial sits above the list, smaller. */
function rcPt(cx,cy,r,a){var t=(a-90)*Math.PI/180;return [cx+r*Math.cos(t),cy+r*Math.sin(t)]}
LOOKS['response-clock']=function(b,H){var I=b.items||[],n=I.length,K='aq-response-clock',cx=200,cy=210,R=150,span=n>1?300/(n-1):0;
 var start=-1;I.forEach(function(it,i){if(start<0&&/clock/i.test(String(it.d||'')+' '+String(it.t||'')))start=i});
 var ang=I.map(function(it,i){return i*span}),f=function(v){return v.toFixed(1)},ticks='',i;
 for(i=0;i<60;i++){var a=i*6,p0=rcPt(cx,cy,R+18,a),p1=rcPt(cx,cy,R+(i%5?12:6),a);ticks+='M'+f(p0[0])+' '+f(p0[1])+'L'+f(p1[0])+' '+f(p1[1])}
 var arc='';if(start>=0){var a0=ang[start],a1=a0+Math.min(330-a0,300),P0=rcPt(cx,cy,R-16,a0),P1=rcPt(cx,cy,R-16,a1);
  arc='<path class="'+K+'__run" d="M'+f(P0[0])+' '+f(P0[1])+'A'+(R-16)+' '+(R-16)+' 0 '+(a1-a0>180?1:0)+' 1 '+f(P1[0])+' '+f(P1[1])+'"/>'}
 var st=I.map(function(it,i){var p=rcPt(cx,cy,R,ang[i]);return '<g class="'+K+'__st'+(i===start?' is-start':'')+'" data-i="'+i+'"><circle cx="'+f(p[0])+'" cy="'+f(p[1])+'" r="17"/><text x="'+f(p[0])+'" y="'+f(p[1]+4)+'">'+(i<9?'0':'')+(i+1)+'</text></g>'}).join('');
 var dial='<svg class="'+K+'__dial" viewBox="0 0 400 400" aria-hidden="true" focusable="false">'
  +'<path class="'+K+'__crown" d="M186 18h28v14h-28zM192 32h16v12h-16z"/><path class="'+K+'__btn" d="M318 64l14-14 12 12-14 14zM82 64l-14-14-12 12 14 14z"/>'
  +'<circle class="'+K+'__case" cx="'+cx+'" cy="'+cy+'" r="'+(R+30)+'"/><circle class="'+K+'__face" cx="'+cx+'" cy="'+cy+'" r="'+(R+22)+'"/>'
  +'<path class="'+K+'__ticks" d="'+ticks+'"/><circle class="'+K+'__track" cx="'+cx+'" cy="'+cy+'" r="'+(R-16)+'"/>'+arc+st
  +'<g class="'+K+'__hand" style="--a:'+(start>=0?ang[start]:0)+'deg"><path d="M'+cx+' '+(cy+22)+'V'+(cy-R+30)+'"/><circle cx="'+cx+'" cy="'+cy+'" r="7"/></g></svg>';
 var list=I.map(function(it,i){var t=tx(it.t);if(it.link&&wp(it.link))t='<a class="'+K+'__go" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+t+'</a>';
  return '<li class="'+K+'__step'+(i===start?' is-start':'')+'" data-i="'+i+'" data-a="'+ang[i]+'"'+(it.link&&wp(it.link)?'':' tabindex="0"')+'><span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<div class="'+K+'__body"><h3 class="'+K+'__t">'+t+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</div></li>'}).join('');
 return sec(H+'<div class="'+K+'"><div class="'+K+'__fig">'+dial+'</div><ol class="'+K+'__steps" role="list">'+list+'</ol></div>','aq-band--navy '+K+'-sec')};
/* Pointing at a step turns the hand to its station */
(function(){function go(ev,on){var s=ev.target.closest&&ev.target.closest('.aq-response-clock__step');if(!s||s.contains(ev.relatedTarget))return;var r=s.closest('.aq-response-clock'),h=r.querySelector('.aq-response-clock__hand');
 if(on){r.setAttribute('data-rest',r.getAttribute('data-rest')||h.style.getPropertyValue('--a'));h.style.setProperty('--a',s.getAttribute('data-a')+'deg')}else h.style.setProperty('--a',r.getAttribute('data-rest')||'0deg');
 [].forEach.call(r.querySelectorAll('[data-i="'+s.getAttribute('data-i')+'"]'),function(el){el.classList.toggle('is-on',on)})}
 document.addEventListener('mouseover',function(ev){go(ev,true)});document.addEventListener('mouseout',function(ev){go(ev,false)});
 document.addEventListener('focusin',function(ev){go(ev,true)});document.addEventListener('focusout',function(ev){go(ev,false)})})();
