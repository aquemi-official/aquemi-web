/* Look "duplex-trains" -> DuplexTrains (design-system/components/DuplexTrains): an options block (as: "modules") about
   redundancy, on a limestone band. Top left the heading set huge and light; top right a framed IsoKit drawing of the
   redundant plant: two identical generation trains side by side (drawn twice, the same, which is the point), their
   product lines joining into the storage tank, two loop pumps (duty and standby), the loop header with a valved spare
   tie-in, and a spares box on site. A switch under the drawing swaps the trains: the one in service carries the water,
   the other is marked as being sanitized (the first option's own words: one runs while the other is sanitized).
   Below, the options as numbered cards in one band over a navy strip; pointing at or focusing a card takes the flow
   fill and lights its parts in the drawing (the sanitize card lights the train out of service).
   Fields, as options (modules): h, base, items [{t, d, spot, link}], fold, fold_noun (phones only).
   Added: items[].part ("trains", "pumps", "tank", "sanitize", "spares", "tiein"); trains: [run word, sanitize word,
   button label] (short drawing words, from the first option's copy). base is the loop's drawing label.
   Concept: pass 9b ind-cdmo.2 (huge stacked headline, isometric drawing of twin duplex trains in a frame, numbered
   redundancy cards in a band with one card in steel blue). */
(function(){
var K='aq-duplex-trains';
var PARTS={trains:'trainA trainB',pumps:'pumpA pumpB',tank:'tank',sanitize:'off',spares:'spares',tiein:'tiein'};
function scene(base){var o=[],lab={};
 var A=isoPart('ro',0,0,0,1,{id:'trainA'}),B=isoPart('ro',0,96,0,1,{id:'trainB'});
 var ta=A.ports.out,tb=B.ports.out,xj=ta[0]+18,yj=(ta[1]+tb[1])/2,zj=ta[2];
 var tk=isoPart('tank',196,yj,0,1,{id:'tank'}),ti=tk.ports.in,zU=104;
 var pa=isoPipe([ta,[xj,ta[1],zj],[xj,yj,zj]],{r:2,id:'trainA',to:'tank',caps:false,flanges:'ends'});
 var pb=isoPipe([tb,[xj,tb[1],zj],[xj,yj,zj]],{r:2,id:'trainB',to:'tank',caps:false,flanges:'ends'});
 var pj=isoPipe([[xj,yj,zj],[xj,yj,zU],[ti[0],yj,zU],[ti[0],ti[1],zU],ti],{r:2.2,id:'tank',to:'tank',caps:false});
 var to=tk.ports.out,xm=to[0]+12;
 var PA=isoPart('pump',268,yj-22,0,1,{id:'pumpA'}),PB=isoPart('pump',268,yj+22,0,1,{id:'pumpB'});
 var ia=PA.ports.in,ib=PB.ports.in;
 var pt=isoPipe([to,[xm,to[1],to[2]],[xm,to[1],ia[2]]],{r:2.2,id:'tank',to:'pumpA',caps:false});
 var sa=isoPipe([[xm,to[1],ia[2]],[xm,ia[1],ia[2]],ia],{r:2,id:'pumpA',to:'pumpA',caps:false});
 var sb=isoPipe([[xm,to[1],ib[2]],[xm,ib[1],ib[2]],ib],{r:2,id:'pumpB',to:'pumpB',caps:false});
 var oa=PA.ports.out,ob=PB.ports.out,zL=78,xh=oa[0]+20,xe=430;
 var da=isoPipe([oa,[oa[0],oa[1],zL],[xh,oa[1],zL]],{r:2,id:'pumpA',to:'loop',caps:false});
 var db=isoPipe([ob,[ob[0],ob[1],zL],[xh,ob[1],zL],[xh,oa[1],zL]],{r:2,id:'pumpB',to:'loop',caps:false});
 var hd=isoPipe([[xh,oa[1],zL],[xe,oa[1],zL]],{r:2.6,id:'loop',to:'loop',caps:'end',flanges:'ends'});
 var xt=388,tie=isoPipe([[xt,oa[1],zL],[xt,oa[1]+30,zL]],{r:2,id:'tiein',flow:false,caps:'end',flanges:'ends'}),tv=isoPart('valve',xt,oa[1]+18,zL,1,{id:'tiein',rot:1});
 var fut='<path class="aq-iso__hid '+K+'__fut" data-iso-id="tiein" d="'+isoPoly([[xt,oa[1]+34,zL],[xt,oa[1]+70,zL],[xt,oa[1]+70,0]])+'"/>';
 var sp=isoPart('module',330,yj+70,0,1,{id:'spares',w:30,d:22,h:20});
 o.push(A,pa,B,pb,pj,tk,pt,PA,sa,PB,sb,da,db,hd,tie,tv,fut,sp,isoArrow([xe-24,oa[1],zL],'x'));
 lab.A=A.ports.top;lab.B=B.ports.top;lab.base=[xe-6,oa[1]+14,zL-18];
 var bx=isoBounds([[0,0,0],[0,122,0],[116,122,0],[116,0,70],[56,0,96],[xj,yj,zU+4],[196,yj,100],[xe,oa[1],zL+6],[xe,oa[1],0],[xt,oa[1]+70,0],[360,yj+92,0],[xe+10,oa[1]+30,0]],14);
 return {inner:o.join(''),lab:lab,w:Math.round(bx.w),h:Math.round(bx.h),org:[-bx.x,-bx.y]}}
LOOKS['duplex-trains']=function(b,H){var I=b.items||[],n=I.length,S=scene(b.base),T=b.trains||[],run=T[0]||'',off=T[1]||'',btn=T[2]||'';
 function tag(k,p,state){var a=isoPct(isoP(p),S.w,S.h,S.org);return '<span class="'+K+'__tag" data-train="'+k+'" style="left:'+a.left+';top:'+a.top+'"><b>'+k+'</b><span class="'+K+'__st" data-run>'+e(run)+'</span><span class="'+K+'__st" data-off>'+e(off)+'</span></span>'}
 var bp=isoPct(isoP(S.lab.base),S.w,S.h,S.org);
 var fig='<figure class="'+K+'__fig"><div class="'+K+'__plate" aria-hidden="true">'+isoSvg(S.w,S.h,S.inner,'aq-iso--limestone '+K+'__svg',{origin:S.org})+tag('A',S.lab.A)+tag('B',S.lab.B)
  +(b.base?'<span class="'+K+'__base" style="left:'+bp.left+';top:'+bp.top+'">'+e(b.base)+'</span>':'')+'</div>'
  +(btn?'<button type="button" class="'+K+'__swap" aria-pressed="false"><svg class="'+K+'__ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 9h14l-4-4M20 15H6l4 4"/></svg><span class="'+K+'__bl">'+e(btn)+'</span><span class="'+K+'__run" aria-hidden="true"><span data-a>A</span><span data-b>B</span></span></button>':'')+'</figure>';
 var cards=I.map(function(it,i){var lk=it.link&&wp(it.link),p=PARTS[it.part]||'';
  return fli('<li class="'+K+'__card" tabindex="0" data-part="'+e(p)+'"><span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<h3 class="'+K+'__t">'+(lk?'<a href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':tx(it.t))+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</li>',b,i)}).join('');
 var list='<div class="'+K+'__band">'+wFold(b,n,'<ol class="'+K+'__cards" role="list" style="--n:'+n+'">'+cards+'</ol>',b.fold_noun)+'</div>';
 return sec(H+'<div class="'+K+'" data-run="A">'+fig+list+'</div>','aq-band--limestone '+K+'-sec')};
/* Card to parts, and the swap (both work without motion; motion.js adds the moves). */
(function(){
 function ids(w,c){var p=c.getAttribute('data-part')||'',r=w.getAttribute('data-run')||'A';return p.replace('off','train'+(r==='A'?'B':'A')).split(' ').filter(Boolean)}
 function show(w,c){var on=c?ids(w,c):[];w.classList.toggle('is-pointing',!!c);
  [].forEach.call(w.querySelectorAll('.'+K+'__card'),function(x){x.classList.toggle('is-on',x===c)});
  [].forEach.call(w.querySelectorAll('svg.aq-iso [data-iso-id]'),function(x){x.classList.toggle('is-on',on.indexOf(x.getAttribute('data-iso-id'))>-1)})}
 window.AQduplex={show:show};
 function at(ev){return ev.target.closest&&ev.target.closest('.'+K+'__card')}
 document.addEventListener('pointerover',function(ev){var c=at(ev);if(c&&ev.pointerType!=='touch')show(c.closest('.'+K),c)});
 document.addEventListener('pointerout',function(ev){var c=at(ev);if(!c||(ev.relatedTarget&&c.contains(ev.relatedTarget)))return;var w=c.closest('.'+K);show(w,w.querySelector('.'+K+'__card:focus-within'))});
 document.addEventListener('focusin',function(ev){var c=at(ev);if(c)show(c.closest('.'+K),c)});
 document.addEventListener('focusout',function(ev){var c=at(ev);if(c&&!(ev.relatedTarget&&c.closest('.'+K).contains(ev.relatedTarget)))show(c.closest('.'+K),null)});
 document.addEventListener('click',function(ev){var s=ev.target.closest&&ev.target.closest('.'+K+'__swap');if(!s)return;var w=s.closest('.'+K),r=w.getAttribute('data-run')==='A'?'B':'A';
  w.setAttribute('data-run',r);s.setAttribute('aria-pressed',r==='B'?'true':'false');var c=w.querySelector('.'+K+'__card.is-on');if(c)show(w,c);
  if(window.AQduplexRun)window.AQduplexRun(w,r)});
})();
})();
