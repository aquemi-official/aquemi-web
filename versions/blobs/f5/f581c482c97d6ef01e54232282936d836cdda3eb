/* Look "joint-steps" -> JointSteps (design-system/components/JointSteps): a fabrication sequence told on one joint. A
   navy title column at the left (title and intro), a drawing sheet in the middle with one joint drawn large in
   isometric (IsoKit: two pipe lengths meeting at joint J-01, the joint zone between dashed bounds, the lot marking
   printed on each length, the test coupon beside it, the test cap and gauge on one end, dimension lines for the
   outside diameter and the zone), and the steps on a numbered rail at the right, each with its hold point (HP) or
   witness point (WP) code. As the rail is read, the sheet shows what that step does to the joint (the plan's
   dimensions and tag, the lot markings, the coupon, the joint zone, the test cap, the water through the bore).
   The joint zone carries the method as the block's `method` text (a placeholder while the method is open): the drawing
   never draws a joint profile.
   Fields (a steps block): h, intro, method, items [{t, d, hold, link, stage}]. stage (optional): plan, receive,
   qualify, join, test, clean (default from the step's words). A step whose text names a witness point gets a
   "Witness point" tag (the sentence moves out of the text, unchanged); a hold step gets the stamp "Hold point · Signed
   by …". Phones: title block, sheet, then the rail.
   Phones (pass 12, PhoneKit sticky figure): the sheet rides as a 180 px strip under the header while the rail scrolls;
   the step on the reading line sets the sheet's stage (data-st, as on desktop) and the strip pans to the part that
   stage draws (each stage group names the steps that show it, data-pk-key). Works with reduced motion. PhoneKit holds
   to 600 px; from 601 to 860 px (tablets) the sheet sits sticky beside the rail, the desktop story at a smaller scale. */
LOOKS['joint-steps']=(function(){
 var R=34,KEYS=null;
 function pick(t){t=String(t||'');return /plan/i.test(t)?'plan':/receive|material/i.test(t)?'receive':/qualif|test joint/i.test(t)?'qualify':/join|weld|record/i.test(t)?'join':/test|survey/i.test(t)?'test':/clean|turn|rinse/i.test(t)?'clean':'plan'}
 var WIT=/\s*Witness point\.\s*/;
 function g(st,inner){return '<g class="aq-joint-steps__st" data-st="'+st+'"'+(KEYS&&KEYS[st]?' data-pk-key="'+KEYS[st].join(' ')+'"':'')+'>'+inner+'</g>'}
 function drawing(){var o=[];
  /* the test coupon lying beside the joint (behind it in drawing order) */
  o.push(g('qualify',isoPipe([[-150,-150,-R],[-150,-70,-R]],{r:11,caps:true,flow:false})
   +isoPath(isoRingD([-150,-114,-R],'y',13),'aq-iso__hid')+isoPath(isoRingD([-150,-106,-R],'y',13),'aq-iso__hid')));
  /* two lengths meeting at the joint, the water through them */
  o.push(isoPipe([[0,230,0],[0,6,0]],{r:R,caps:true,id:'len'}),isoPipe([[0,-6,0],[0,-230,0]],{r:R,caps:'end',id:'len'}));
  /* lot marking on each length */
  var pr=function(a,b){return isoPath(isoPoly([[R*0.5,a,R*0.82],[R*0.5,b,R*0.82]]),'aq-joint-steps__print')};
  o.push(g('receive',pr(200,70)+pr(-60,-190)));
  /* the joint zone between dashed bounds */
  o.push(g('join',isoPath(isoRingD([0,14,0],'y',R+5),'aq-joint-steps__zone')+isoPath(isoRingD([0,-14,0],'y',R+5),'aq-joint-steps__zone')
   +isoPath(isoPoly([[0,14,R+5],[0,-14,R+5]])+isoPoly([[R+5,14,0],[R+5,-14,0]]),'aq-joint-steps__zone')));
  /* test cap and gauge on the far end */
  o.push(g('test',isoPipe([[0,-232,0],[0,-252,0]],{r:R+5,caps:true,flow:false})+isoPart('gauge',0,-244,R+5,1.6,{value:0.6})));
  /* the plan: dimensions and the joint's tag */
  o.push(g('plan',isoDim([0,160,-R],[0,160,R],{off:[60,0,0],text:'OD'})+isoDim([0,14,R],[0,-14,R],{off:[0,0,34]})));
  return o.join('')}
 return function(b,H){var I=b.items||[],n=I.length;KEYS={};I.forEach(function(it,i){var st=it.stage||pick(it.t);(KEYS[st]=KEYS[st]||[]).push(i)});
  var pts=[[0,240,0],[0,-260,0],[0,240,-R],[0,-260,R+50],[-150,-160,-R-12],[R+70,160,0],[0,-20,R+70],[-150,-60,-R-12]],bx=isoBounds(pts,26),W=Math.round(bx.w),Hh=Math.round(bx.h),org=[-bx.x,-bx.y];
  var tag=isoLeader([0,0,R],{dx:-50,dy:-70},{shelf:16}),at=isoPct(tag.end,W,Hh,org);
  var svg=isoSvg(W,Hh,drawing()+g('join',tag),'aq-joint-steps__svg',{origin:org,under:isoSheet(W,Hh,{grid:'iso',title:true})});
  var lab='<span class="aq-joint-steps__tag aq-joint-steps__tag--'+(tag.side||'left')+'" style="left:'+at.left+';top:'+at.top+'"><b aria-hidden="true">J-01</b>'+(b.method?' <span>'+tx(b.method)+'</span>':'')+'</span>';
  var steps=I.map(function(it,i){var st=it.stage||pick(it.t),d=String(it.d||''),wit=WIT.test(d),num=(i<9?'0':'')+(i+1);if(wit)d=d.replace(WIT,' ').trim();
   var code=it.hold?'HP':wit?'WP':'';
   return '<li class="aq-joint-steps__step'+(i===0?' is-on':'')+'" data-st="'+st+'" data-i="'+i+'" data-pk-row="'+i+'" tabindex="0">'
    +'<span class="aq-joint-steps__n" aria-hidden="true">'+num+(code?'<small>'+code+'</small>':'')+'</span>'
    +'<div class="aq-joint-steps__txt"><h3 class="aq-joint-steps__t">'+stepTitle(it)+'</h3>'+(d?'<p class="aq-joint-steps__d">'+tx(d)+'</p>':'')
    +((wit||it.hold)?'<p class="aq-joint-steps__tags">'+(wit?'<span class="aq-joint-steps__wit">Witness point</span>':'')
      +(it.hold?'<span class="aq-joint-steps__stamp"><span>Hold point</span> <span>Signed by '+stepWho(it.hold)+'</span></span>':'')+'</p>':'')
    +'</div></li>'}).join('');
  KEYS=null;
  return sec('<div class="aq-joint-steps" data-pk-sticky data-pk-bp="600" data-pk-h="180" data-pk-zoom="1"><div class="aq-joint-steps__title">'+H+'</div>'
   +'<div class="aq-joint-steps__sheet"><div class="aq-joint-steps__fig aq-iso-figure" data-pk-fig data-st="'+(I[0]?(I[0].stage||pick(I[0].t)):'')+'">'+svg+lab+'</div></div>'
   +'<ol class="aq-joint-steps__rail" role="list">'+steps+'</ol></div>','aq-joint-steps-sec')}
})();
/* JointSteps: pointing at (or focusing) a step shows its stage on the sheet (the scroll story in motion.js does the same
   as the rail is read); on phones PhoneKit's step on the reading line does it (pk:change), with or without motion */
(function(){function show(r,s){if(!r||!s)return;if(r.AQset)r.AQset(+s.getAttribute('data-i'));else{
  [].forEach.call(r.querySelectorAll('.aq-joint-steps__step.is-on'),function(x){x.classList.remove('is-on')});s.classList.add('is-on');var f=r.querySelector('.aq-joint-steps__fig');if(f)f.setAttribute('data-st',s.getAttribute('data-st'))}}
 function on(ev){var s=ev.target.closest&&ev.target.closest('.aq-joint-steps__step');if(s)show(s.closest('.aq-joint-steps'),s)}
 document.addEventListener('mouseover',on);document.addEventListener('focusin',on);
 document.addEventListener('pk:change',function(ev){var r=ev.target;if(!r.classList||!r.classList.contains('aq-joint-steps')||!ev.detail||!ev.detail.on||ev.detail.index<0)return;
  show(r,r.querySelectorAll('.aq-joint-steps__step')[ev.detail.index])})})();
