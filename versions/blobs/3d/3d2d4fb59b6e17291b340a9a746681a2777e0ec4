/* Look "fault-knot" -> FaultKnot (design-system/components/FaultKnot): what happens when something goes wrong, as an
   editorial split. The section is limestone with a navy field down its left; the title is set huge and light and runs
   across the colour split (on-navy over the navy, navy over the limestone: a clipped twin of the heading, aria-hidden).
   Right of the title, one drawing in a quiet framed grid: a twin-wall pipe tied in a knot, the water standing in it.
   Along the foot the steps read across, mono "01 / Call" over each line; the first step (call us) stands on the navy.
   Pointing at or focusing a step loosens the knot to that step's stage (shape morph, CSS d transition); by the step
   that restores the water the pipe runs straight and the water runs through it once.
   Concept: research/pass9b/concepts/svc-service.5.png (headline across a navy/limestone split, a knotted-pipe figure,
   five slash-numbered steps, the call step on navy).
   Fields (a steps block): h, intro, items [{t, d, link}]. A link makes the step's name the link. The knot's stage per
   step runs from tied (first) to straight (the step whose text says the water is back, else the last).
   Phones: the navy field sits behind the top of the title (the split runs across the second line), the drawing
   under it full width, the call step as a navy row, the other steps stacked. */
function fkD(amp){var N=220,W=552,cy=180,o='',i;amp=Math.max(0,Math.min(1,+amp||0));
 for(i=0;i<=N;i++){var s=i/N,u=Math.max(0,Math.min(1,(s-0.1)/0.8)),en=Math.pow(Math.sin(Math.PI*u),2),th=2*Math.PI*5.5*u;
  var x=24+W*s-amp*en*(92*Math.sin(th)+30*Math.sin(2.3*th+0.4)),y=cy-amp*en*(112*Math.cos(th)-38*Math.sin(0.37*th+1)+18*Math.cos(1.7*th));
  o+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}
 return o}
window.fkD=fkD;
/* the knot's tension per step: tied at the first, straight from the step that brings the water back */
function fkAmps(I){var n=I.length,back=-1;I.forEach(function(it,i){if(back<0&&/back within|water back|restor/i.test(String(it.d||'')))back=i});
 if(back<1)back=n-1;return I.map(function(it,i){return i>=back?0:+(1-i/back).toFixed(3)})}
LOOKS['fault-knot']=function(b,H){var I=b.items||[],K='aq-fault-knot',A=fkAmps(I),d0=fkD(1);
 var twin=H.replace(/<(\/?)h2\b/g,'<$1p');
 var grid='';for(var g=60;g<600;g+=60)grid+='M'+g+' 12V348';for(var h=60;h<360;h+=60)grid+='M12 '+h+'H588';
 var svg='<svg class="'+K+'__svg" viewBox="0 0 600 360" aria-hidden="true" focusable="false">'
  +'<rect class="'+K+'__frame" x="12" y="12" width="576" height="336"/><path class="'+K+'__grid" d="'+grid+'"/>'
  +'<path class="'+K+'__p '+K+'__wall" d="'+d0+'"/><path class="'+K+'__p '+K+'__bore" d="'+d0+'"/><path class="'+K+'__p '+K+'__flow" d="'+d0+'"/>'
  +'<path class="'+K+'__flange" d="M18 164v32M30 164v32M570 164v32M582 164v32"/></svg>';
 var steps=I.map(function(it,i){var n=(i<9?'0':'')+(i+1),t=tx(it.t),ln=it.link&&wp(it.link);
  if(ln)t='<a class="'+K+'__go" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+t+'</a>';
  return '<li class="'+K+'__step'+(i?'':' is-call')+'" data-i="'+i+'" data-amp="'+A[i]+'"'+(ln?'':' tabindex="0"')+'>'
   +'<h3 class="'+K+'__t"><span class="'+K+'__n" aria-hidden="true">'+n+' /</span> '+t+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 return sec('<div class="'+K+'" style="--n:'+I.length+'"><div class="'+K+'__ground" aria-hidden="true"></div>'
  +'<div class="'+K+'__top"><div class="'+K+'__head"><div class="'+K+'__ground2" aria-hidden="true"></div>'+H+'<div class="'+K+'__twin" aria-hidden="true">'+twin+'</div></div>'
  +'<figure class="'+K+'__fig">'+svg+'</figure></div>'
  +'<ol class="'+K+'__steps" role="list">'+steps+'</ol></div>','aq-band--limestone '+K+'-sec" data-theme="light')};
/* Ported from Subframe Motion "SVG shape morph" (shape-morph), MIT, (c) 2026 Subframe: one path whose commands keep
   their structure morphs by a CSS d transition (0.7 s cubic-bezier(.4,0,.2,1)); keyboard choices land at once.
   fkSet(look, amp, step): amp null returns to the rest state (the scroll story's, else tied). */
function fkSet(r,amp,step){if(!r)return;var rest=r._fkRest!=null?r._fkRest:1,a=amp==null?rest:amp,d=fkD(a);
 [].forEach.call(r.querySelectorAll('.aq-fault-knot__p'),function(p){p.setAttribute('d',d);p.style.d='path("'+d+'")'});
 var on=step!=null?step:(r._fkStep!=null?r._fkStep:-1);
 [].forEach.call(r.querySelectorAll('.aq-fault-knot__step'),function(s){s.classList.toggle('is-on',+s.getAttribute('data-i')===on)});
 var clear=a<0.001;if(clear&&!r.classList.contains('is-clear')){r.classList.remove('is-clear');void r.offsetWidth}r.classList.toggle('is-clear',clear)}
window.fkSet=fkSet;
(function(){function go(ev,on){var s=ev.target.closest&&ev.target.closest('.aq-fault-knot__step');if(!s||s.contains(ev.relatedTarget))return;var r=s.closest('.aq-fault-knot');
 r._fkHover=on;r.classList.toggle('is-key',ev.type.indexOf('focus')===0&&on);r.classList.remove('is-scrub');fkSet(r,on?+s.getAttribute('data-amp'):null,on?+s.getAttribute('data-i'):null)}
 document.addEventListener('mouseover',function(ev){go(ev,true)});document.addEventListener('mouseout',function(ev){go(ev,false)});
 document.addEventListener('focusin',function(ev){go(ev,true)});document.addEventListener('focusout',function(ev){go(ev,false)})})();
