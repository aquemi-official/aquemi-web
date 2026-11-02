/* Look "fusion-bench" -> FusionBench (design-system/components/FusionBench): the fabrication standard as a shop drawing
   with its parts list. On a navy blueprint ground, an isometric of the joining bench (IsoKit primitives; the kit has no
   fusion machine, so it is drawn here): pipe stock on the rack behind, the bench frame, two pipe lengths held in the
   machine's clamps and fused at a bead, a test coupon, the written procedure on a clipboard, the machine's data
   logger, a test cap with its gauge on one pipe end, the open bore at the other with the rinse water running out, and
   the certificate binders. A numbered balloon on a leader marks the part each row is about; under the drawing the
   rows are the drawing's parts list, balloon number first. Pointing at (or focusing into) a row lights its part.
   Fields, as a spec block: h, caption, cols [item, what we do, standard and record], rows [{p, v, m, part}], fold,
   fold_noun. part (optional): stock, bead, coupon, exam, bore, binder, clipboard, logger, rinse, gauge (default from
   the item's words). The fold applies on phones only. Phones: the drawing on top, the list in one column. */
LOOKS['fusion-bench']=(function(){
 function scene(){var Z=9,Y=35,PZ=Z+30,o=[],A={};
  /* pipe stock on the rack behind */
  var st=isoB(0,0,0,1);[[-46,6],[-46,24],[-30,6],[-38,15]].forEach(function(q){st.cyl(-10,q[0],q[1],'x',190,7)});st.box(-14,-58,0,6,40,4);st.box(170,-58,0,6,40,4);
  o.push(st.done('stock',{id:'stock'}));A.stock=[90,-38,22];
  /* bench frame */
  var sk=isoPart('skid',-10,0,0,1,{w:250,d:80,id:'bench'});o.push(sk);
  /* the machine: bed, fixed and moving clamps round two pipe lengths fused at a bead */
  var m=isoB(0,0,0,1);m.box(20,18,Z,170,34,7);m.box(26,52,Z,160,4,4,ISO_K.alt);
  /* back halves of the clamps first, then the pipes, then the front jaws */
  [44,70,118,144].forEach(function(x){m.box(x-6,20,Z+7,12,30,12)});
  /* the heater plate, parked upright on its stand behind the pipe */
  m.box(196,18,Z+7,10,8,26);m.cyl(198,22,Z+38,'x',4,17);m.ring(202,22,Z+38,'x',12,ISO_K.th);m.line([200,22,Z+55],[200,22,Z+64]);
  m.cyl(-36,Y,PZ,'x',129,9);m.cyl(95,Y,PZ,'x',140,9);
  o.push(m.done('machine',{id:'machine'}));
  var bd=isoB(0,0,0,1);bd.cyl(91,Y,PZ,'x',6,11.5);bd.ring(94,Y,PZ,'x',9.5,ISO_K.th);
  o.push(bd.done('bead',{id:'bead'}));A.bead=[94,Y,PZ+11];A.exam=[94,Y+9,PZ-6];
  var jw=isoB(0,0,0,1);[44,70,118,144].forEach(function(x){jw.cyl(x-5,Y,PZ,'x',10,13);jw.line([x,Y,PZ+13],[x,Y,PZ+20])});
  o.push(jw.done('clamps',{id:'clamps'}));
  /* test cap and gauge on the left end; the open bore on the right end */
  var cap=isoB(0,0,0,1);cap.cyl(-44,Y,PZ,'x',8,11);o.push(cap.done('cap',{id:'gauge'}));
  o.push(isoPart('gauge',-40,Y,PZ+11,1.2,{value:0.62,id:'gauge'}));A.gauge=[-40,Y,PZ+22];
  var bo=isoB(0,0,0,1);bo.ring(235,Y,PZ,'x',6.5,ISO_K.ln);bo.ring(235,Y,PZ,'x',4.5,ISO_K.hid);o.push(bo.done('bore',{id:'bore'}));A.bore=[235,Y-4,PZ+4];
  /* the rinse water runs out of the bore to the drain */
  var p1=isoP(235,Y+5,PZ-3),p2=isoP(246,Y+5,PZ-12),p3=isoP(250,Y+5,0);
  o.push('<path class="aq-iso__flow aq-iso__flow--drop" d="M'+isoT(p1)+'Q'+isoT(p2)+' '+isoT(p3)+'"/>');
  var dr=isoB(0,0,0,1);dr.ring(250,Y+5,0.5,'z',7,ISO_K.th);o.push(dr.done('drain',{id:'rinse'}));A.rinse=[248,Y+5,10];
  /* on the bench front: clipboard, test coupon, data logger */
  o.push(isoPart('clipboard',8,64,Z,0.9,{id:'clipboard'}));A.clipboard=[8,64,Z+2];
  var cp=isoB(0,0,0,1);cp.box(80,62,Z,4,8,12);cp.box(100,62,Z,4,8,12);cp.box(80,62,Z+12,24,8,3);o.push(cp.done('coupon',{id:'coupon'}));A.coupon=[92,66,Z+15];
  o.push(isoPart('analyzer',176,66,Z,1,{post:false,id:'logger'}));A.logger=[176,66,Z+20];
  /* certificate binders on the floor in front */
  o.push(isoPart('binder',272,44,0,0.9,{id:'binder'}));A.binder=[272,44,26];
  return {svg:o.join(''),A:A}}
 /* where each balloon sits, offset from its anchor (screen units) */
 var OFF={stock:[-40,-46],bead:[0,-70],exam:[-30,62],gauge:[-36,-46],bore:[34,-50],rinse:[46,30],clipboard:[-56,40],coupon:[-10,70],logger:[54,-30],binder:[40,-40]};
 function pick(s){s=String(s||'');return /certificate/i.test(s)?'binder':/^material/i.test(s)?'stock':/test joint/i.test(s)?'coupon':/examin|visual/i.test(s)?'exam':/joining|joint/i.test(s)?'bead':/surface/i.test(s)?'bore':/procedure|welder/i.test(s)?'clipboard':/machine/i.test(s)?'logger':/clean|rinse|flush/i.test(s)?'rinse':/pressure/i.test(s)?'gauge':''}
 return function(b,H){var C=b.cols||[],R=b.rows||[],S=scene(),bx=isoBounds([[-52,-62,0],[292,-62,0],[-52,100,0],[292,100,0],[-52,-62,80],[292,100,70],[-52,100,70]],20),W=Math.round(bx.w),Hh=Math.round(bx.h),org=[-bx.x,-bx.y],leads='',balls='';
  R.forEach(function(r,i){var pt=S.A[r.part]?r.part:pick(r.p);if(!pt)return;var o=OFF[pt]||[0,-50],L=isoLeader(S.A[pt],{dx:o[0],dy:o[1]},{shelf:0}),at=isoPct(L.end,W,Hh,org);
   leads+='<g data-k="'+i+'" data-part="'+pt+'">'+L+'</g>';
   balls+='<span class="aq-fusion-bench__ball" data-k="'+i+'" style="left:'+at.left+';top:'+at.top+'" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'});
  var svg=isoSvg(W,Hh,S.svg+leads,'aq-iso--navy',{origin:org,under:isoSheet(W,Hh,{grid:'iso',m:8,band:10})});
  var fig='<div class="aq-fusion-bench__fig aq-iso-figure aq-iso-figure--navy">'+svg+balls+'</div>';
  var k=function(i){return C[i]?'<span class="aq-fusion-bench__k">'+tx(C[i])+'</span>':''};
  var head='<div class="aq-fusion-bench__cols" aria-hidden="true"><span>No.</span>'+[0,1,2].map(function(i){return '<span>'+tx(C[i]||'')+'</span>'}).join('')+'</div>';
  var list='<ol class="aq-fusion-bench__list" role="list">'+R.map(function(r,i){
   return fli('<li class="aq-fusion-bench__row" data-k="'+i+'">',b,i)+'<span class="aq-fusion-bench__no" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
    +'<h3 class="aq-fusion-bench__p">'+tx(r.p)+'</h3>'
    +'<p class="aq-fusion-bench__v">'+k(1)+tx(r.v)+'</p>'
    +'<p class="aq-fusion-bench__m">'+k(2)+tx(r.m)+'</p></li>'}).join('')+'</ol>';
  var cap=b.caption?'<p class="aq-fusion-bench__cap" aria-hidden="true"><span>'+tx(b.caption)+'</span><span>'+R.length+' items</span></p>':'';
  return sec(H+'<div class="aq-fusion-bench"><div class="aq-fusion-bench__stage">'+fig+'</div><div class="aq-fusion-bench__parts">'+cap+head+wFold(b,R.length,list,b.fold_noun||'rows')+'</div></div>','aq-band--navy aq-fusion-bench-sec')}
})();
/* FusionBench: pointing at (or focusing into) a parts-list row lights its balloon, leader and part */
(function(){function hl(ev,on){var f=ev.target.closest&&ev.target.closest('.aq-fusion-bench__row');if(!f)return;var r=f.closest('.aq-fusion-bench'),k=f.getAttribute('data-k');
 f.classList.toggle('is-on',on);[].forEach.call(r.querySelectorAll('[data-k="'+k+'"]'),function(x){x.classList.toggle('is-on',on)});
 var g=r.querySelector('g[data-k="'+k+'"]'),svg=r.querySelector('svg.aq-iso');if(g&&svg&&window.AQiso)AQiso.light(svg,g.getAttribute('data-part'),on);
 else if(g&&svg)[].forEach.call(svg.querySelectorAll('[data-iso-id="'+g.getAttribute('data-part')+'"]'),function(p){p.classList.toggle('is-lit',on)})}
 document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)});
 document.addEventListener('focusin',function(ev){hl(ev,true)});document.addEventListener('focusout',function(ev){hl(ev,false)})})();
