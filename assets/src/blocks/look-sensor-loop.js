/* Look "sensor-loop" -> SensorLoop (design-system/components/SensorLoop): a spec block of control points or signals
   drawn where each one sits on one storage and distribution loop, as a flat P&ID on a navy sheet (pass 12, after
   concept 202, ind-personal-care.microbes; the pass 9 IsoKit drawing it replaces is in git history). The loop: the
   tank, the supply run with the circulation pump and, in water order, only the measuring points the rows name, then
   the points of use (and sample tees when a row names sample ports) hanging off the supply, and the return run back
   to the tank. Every measuring point carries an instrument balloon with its real tag letters over the row number
   (FIT flow, CIT conductivity, AIT TOC, TIT temperature, XV divert valve, SP sample point; the UV unit is tagged UV);
   hoses carry the row number at their ends. The rows are keyed notes along the foot, each with its number and tag.
   Pointing at a note lights its marks. Phones: the same loop recomposed vertically (the supply a riser, balloons left
   of it, branches and hoses to the right, the return up the left edge), then every note in one column.
   Fields: h, caption (the eyebrow), intro, rows [{p, v, m, site}], note, fold, fold_noun (phones only). site: flow |
   uv | cond | toc | temp | divert | data; a row without a site is placed by its words ("sample" -> sample tees,
   "hose" / "point of use" / "outlet" -> the hoses) or is a note only. */
(function(){
var TAG={flow:'FIT',uv:'UV',cond:'CIT',toc:'AIT',temp:'TIT',divert:'XV',sample:'SP'};
var SUP=['uv','toc','cond','temp','divert'];
function f1(n){return Math.round(n*10)/10}
function nn(i){return (i<9?'0':'')+(i+1)}
function siteOf(r){if(!r)return '';if(r.site)return r.site;var p=String(r.p||'').toLowerCase();
 if(/sample/.test(p))return 'sample';if(/hose|point(s)? of use|outlet/.test(p))return 'pou';return ''}
/* one loop, two orientations. Run coordinate t along the supply; v off it (+ = branch side, - = toward the return). */
function plan(R){var at={};R.forEach(function(r,i){var s=siteOf(r);if(s&&at[s]==null)at[s]=i});
 var M=[{k:'pump'}];SUP.forEach(function(k){if(at[k]!=null)M.push({k:k,i:at[k]})});
 for(var j=0;j<2;j++){if(at.sample!=null)M.push({k:'sample',i:at.sample,more:j>0});M.push({k:'pou',i:at.pou,more:j>0})}
 return {M:M,at:at}}
function scene(R,ph){var P=plan(R),M=P.M,at=P.at,n=M.length;
 var RV=ph?-180:-190,g=ph?66:Math.min(150,(1000-200)/Math.max(n-1,1)),t0=ph?112:200,tank=ph?40:96,end=t0+(n-1)*g+(ph?46:70);
 var map=ph?function(t,v){return [200+v,t]}:function(t,v){return [t,270+v]};
 var T=function(t,v){var q=map(t,v);return f1(q[0])+' '+f1(q[1])};
 var tr=function(t){var q=map(t,0);return ph?'matrix(0 1 1 0 '+f1(q[0])+' '+f1(q[1])+')':'translate('+f1(q[0])+' '+f1(q[1])+')'};
 var o='',b='',tags='';
 /* pipes: supply from the tank down to the run, along it to the end, across to the return, back to the tank top */
 var pipe='M'+T(tank,-36)+'L'+T(tank,0)+'L'+T(end,0)+'L'+T(end,RV)+'L'+T(tank,RV)+'L'+T(tank,-160);
 o+='<path class="aq-sensor-loop__wall" d="'+pipe+'"/><path class="aq-sensor-loop__bore" d="'+pipe+'"/>';
 /* flow arrows on the runs */
 var arr=function(t,v,d){return '<path class="aq-sensor-loop__arrow" transform="'+(ph?'matrix(0 '+d+' '+d+' 0 ':'matrix('+d+' 0 0 '+d+' ')+T(t,v).replace(' ',' ')+')" d="M-5 -5L3 0L-5 5"/>'};
 o+=arr(t0+g*0.5,0,1)+arr((tank+end)/2,RV,-1);
 /* the tank between the runs */
 var a=map(tank-34,-160),c=map(tank+34,-36),x0=Math.min(a[0],c[0]),y0=Math.min(a[1],c[1]),w=Math.abs(c[0]-a[0]),h=Math.abs(c[1]-a[1]);
 o+='<rect class="aq-sensor-loop__tank" x="'+f1(x0)+'" y="'+f1(y0)+'" width="'+f1(w)+'" height="'+f1(h)+'" rx="22"/>';
 /* marks */
 var ball=function(i,k,t,v,more){var q=map(t,v);return '<g class="aq-sensor-loop__ball'+(more?' is-more':'')+'" data-sl="'+i+'"><circle cx="'+f1(q[0])+'" cy="'+f1(q[1])+'" r="22"/>'
  +'<path class="aq-sensor-loop__bar" d="M'+f1(q[0]-22)+' '+f1(q[1])+'h44"/><text class="aq-sensor-loop__tg" x="'+f1(q[0])+'" y="'+f1(q[1]-6)+'">'+TAG[k]+'</text><text class="aq-sensor-loop__nu" x="'+f1(q[0])+'" y="'+f1(q[1]+15)+'">'+nn(i)+'</text></g>'};
 var stem=function(i,t,v0,v1){return '<path class="aq-sensor-loop__stem" data-sl="'+i+'" d="M'+T(t,v0)+'L'+T(t,v1)+'"/>'};
 M.forEach(function(mk,j){var t=t0+j*g,k=mk.k,i=mk.i,s='',hl=i!=null?' data-sl="'+i+'"':'';
  if(k==='pump')s='<circle class="aq-sensor-loop__eq" cx="0" cy="0" r="17"/><path class="aq-sensor-loop__ink" d="M-7 -10L11 0L-7 10Z"/>';
  else if(k==='uv')s='<rect class="aq-sensor-loop__eq" x="-30" y="-13" width="60" height="26"/><path class="aq-sensor-loop__thin" d="M-22 0H22"/>';
  else if(k==='cond')s='<rect class="aq-sensor-loop__eq" x="-11" y="-11" width="22" height="22"/><path class="aq-sensor-loop__thin" d="M-4 -11V-22M4 -11V-22"/>';
  else if(k==='toc')s='<path class="aq-sensor-loop__thin" d="M0 0V-24"/><rect class="aq-sensor-loop__eq" x="-13" y="-44" width="26" height="20"/>';
  else if(k==='temp')s='<path class="aq-sensor-loop__thin" d="M0 -6V-22"/><circle class="aq-sensor-loop__eq" cx="0" cy="-26" r="4"/>';
  else if(k==='divert')s='<path class="aq-sensor-loop__eq" d="M-12 -9L12 9V-9L-12 9Z"/><path class="aq-sensor-loop__thin" d="M0 0V-20M-8 -20H8M0 9V40M-5 34L0 40L5 34"/>';
  else if(k==='sample')s='<path class="aq-sensor-loop__thin" d="M0 0V40"/><path class="aq-sensor-loop__eq" d="M-8 22L8 38H-8L8 22Z"/>';
  else if(k==='pou')s='<path class="aq-sensor-loop__thin" d="M0 0V28"/><path class="aq-sensor-loop__eq" d="M-8 28L8 44H-8L8 28Z"/>'
   +(i!=null?'<path class="aq-sensor-loop__hose" d="M0 44C0 64 22 60 22 82C22 98 8 102 8 110"/><path class="aq-sensor-loop__thin" d="M4 110H12"/>':'');
  b+='<g class="aq-sensor-loop__mk" transform="'+tr(t)+'"'+hl+'>'+s+'</g>';
  if(i==null||k==='pump')return;
  if(k==='pou'){var q=map(t+(ph?34:30),ph?100:126);tags+='<text class="aq-sensor-loop__ht'+(mk.more?' is-more':'')+'" data-sl="'+i+'" x="'+f1(q[0])+'" y="'+f1(q[1])+'">'+nn(i)+'</text>';return}
  var top=k==='toc'?-44:k==='temp'?-30:k==='cond'?-22:k==='divert'?-20:k==='uv'?-13:-1;
  b+=stem(i,t,top,-62)+ball(i,k,t,-84,mk.more)});
 /* return-run instrument: the flow element, its balloon inside the loop */
 if(at.flow!=null){var tf=end-(ph?40:40);
  b+='<g class="aq-sensor-loop__mk" transform="'+tr(tf)+'" data-sl="'+at.flow+'"><g transform="translate(0 '+RV+')"><rect class="aq-sensor-loop__eq" x="-14" y="-9" width="28" height="18"/><path class="aq-sensor-loop__thin" d="M-14 9L14 -9"/></g></g>'
   +stem(at.flow,tf,RV+9,RV+44)+ball(at.flow,'flow',tf,RV+66)}
 /* data recording: a recorder inside the loop with a dashed signal line from each balloon (desktop only) */
 if(at.data!=null&&!ph){var rx=end-280,ry=100,bus='',xs=[];M.forEach(function(mk,j){if(mk.i==null||mk.k==='pou'||mk.k==='pump'||mk.more)return;var t=t0+j*g;xs.push(t);bus+='M'+f1(t)+' 164V146'});
  if(xs.length)bus+='M'+f1(Math.min.apply(0,xs.concat(rx+50)))+' 146H'+f1(Math.max.apply(0,xs.concat(rx+50)))+'M'+f1(rx+50)+' 146V138';
  b+='<path class="aq-sensor-loop__bus" d="'+bus+'"/><g data-sl="'+at.data+'" class="aq-sensor-loop__mk"><rect class="aq-sensor-loop__eq" x="'+f1(rx)+'" y="'+f1(ry)+'" width="100" height="38"/><path class="aq-sensor-loop__thin" d="M'+f1(rx+10)+' '+f1(ry+26)+'l16 -8l12 6l16 -12l14 4l20 -6"/></g>'
   +'<text class="aq-sensor-loop__ht" data-sl="'+at.data+'" x="'+f1(rx+50)+'" y="'+f1(ry-8)+'">'+nn(at.data)+'</text>'}
 var vb=ph?'0 0 340 '+f1(end+48):'0 30 1160 '+(at.pou!=null?400:300);
 return '<svg class="aq-sensor-loop__svg aq-sensor-loop__svg--'+(ph?'p':'d')+'" viewBox="'+vb+'" aria-hidden="true" focusable="false">'+o+b+tags+'</svg>'}
LOOKS['sensor-loop']=function(b,H){H=wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro});
 var R=b.rows||[];
 var notes=R.map(function(r,i){var s=siteOf(r),tg=TAG[s]||'';
  return fli('<li class="aq-sensor-loop__card" data-sl="'+i+'"><p class="aq-sensor-loop__n" aria-hidden="true"><span>'+nn(i)+'</span>'+(tg?'<span class="aq-sensor-loop__ntag">'+tg+'</span>':'')+'</p>'
   +'<h3 class="aq-sensor-loop__p">'+tx(r.p)+'</h3>'+(r.v?'<p class="aq-sensor-loop__v">'+tx(r.v)+'</p>':'')+(r.m?'<p class="aq-sensor-loop__m">'+tx(r.m)+'</p>':'')+'</li>',b,i)}).join('');
 var inner='<div class="aq-sensor-loop"><div class="aq-sensor-loop__fig">'+scene(R,false)+scene(R,true)+'</div><ol class="aq-sensor-loop__cards" role="list">'+notes+'</ol></div>';
 var note=b.note?'<p class="aq-sensor-loop__note">'+tx(b.note)+'</p>':'';
 return sec(H+wFold(b,R.length,inner,b.fold_noun||'signals')+note,'aq-sensor-loop-sec')};
/* pointing at a note (or a mark) lights the note and its marks */
function set(root,i){[].forEach.call(root.querySelectorAll('[data-sl]'),function(el){el.classList.toggle('is-hot',i!=null&&el.getAttribute('data-sl')===i)});root.classList.toggle('has-hot',i!=null)}
if(typeof document!=='undefined'){
 document.addEventListener('mouseover',function(ev){var root=ev.target.closest&&ev.target.closest('.aq-sensor-loop');if(!root)return;var t=ev.target.closest('[data-sl]');set(root,t?t.getAttribute('data-sl'):null)});
 document.addEventListener('mouseout',function(ev){var root=ev.target.closest&&ev.target.closest('.aq-sensor-loop');if(root&&!root.contains(ev.relatedTarget))set(root,null)})}
})();
