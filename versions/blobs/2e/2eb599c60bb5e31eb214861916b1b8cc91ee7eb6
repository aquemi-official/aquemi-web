/* Look "audit-skid" -> AuditSkid (design-system/components/AuditSkid): a docs block (the client audit pack) drawn as
   the system the pack describes, each document pinned to the part of the system it covers. One IsoKit line drawing
   sits in the middle of a light sheet: the skid with the generation rack and its control panel, a sample point on the
   product line, the storage tank, the loop pump, the loop header with an analyser on its sample line, a point of use
   and a valved spare tie-in. The documents are numbered callouts down both sides (first half left, the rest right),
   each on a leader to a numbered pin on its part. Pointing at, focusing or clicking a document selects it: a crosshair
   ring glides to its pin, the pin fills, the leader and the part turn flow, the others quiet (selection persists).
   Corners in mono: the block's nav and document count, and the corner word (aria-hidden; the intro says it in words).
   Fields, as docs: h, intro, items [{t, d, key, link, intent}], fold, fold_noun (phones only).
   Added: items[].part (the part the document covers: "ro" generation rack, "sample" sample point, "skid" the skid,
   "analyzer", "outlet" point of use, "tiein" spare tie-in, "tank", "pump", "panel"); corner (short mono word, decorative).
   Concept: pass 9b ind-cdmo.1 (white PP skid centred, the audit-pack documents as numbered callouts on both sides,
   doc code and period in mono corners). */
(function(){
var K='aq-audit-skid';
function scene(){var dz=9,o=[],pins={};
 var sk=isoPart('skid',0,0,0,1,{w:240,d:120,id:'skid'});
 var tk=isoPart('tank',150,34,dz,1,{id:'tank'});
 var pu=isoPart('pump',206,34,dz,1,{id:'pump'});
 var pn=isoPart('panel',26,98,dz,1,{id:'panel'});
 var ro=isoPart('ro',48,80,dz,1,{id:'ro'});
 var ol=isoPart('outlet',304,38,0,1,{id:'outlet',to:'outlet'});
 var an=isoPart('analyzer',270,84,0,1,{id:'analyzer'});
 var a=ro.ports.out,ti=tk.ports.in,zH=112,xr=a[0]+12;
 /* generation product line up and over into the tank, the sample point on its riser */
 var p1=isoPipe([a,[xr,a[1],a[2]],[xr,a[1],zH],[xr,ti[1],zH],[ti[0],ti[1],zH],ti],{r:2,id:'ro',to:'tank',flanges:'ends',caps:false});
 var sz=78,sp=isoPipe([[xr,a[1],sz],[xr,a[1]+18,sz]],{r:1.3,id:'sample',flow:false,caps:'end'}),sv=isoPart('valve',xr,a[1]+12,sz,0.8,{id:'sample',type:'ball',rot:1});
 /* tank to pump, pump up into the loop header */
 var t=tk.ports.out,pi=pu.ports.in,po=pu.ports.out,yh=po[1],zL=104,xe=424;
 var p2=isoPipe([t,[pi[0]-6,t[1],t[2]],[pi[0]-6,pi[1],pi[2]],pi],{r:2,id:'tank',to:'pump',caps:false});
 var p3=isoPipe([po,[po[0],yh,zL],[xe,yh,zL],[xe,yh,zL-46]],{r:2.4,id:'pump',to:'loop',flanges:'ends',caps:'end'});
 /* drop to the point of use, sample line to the analyser, the spare tie-in (valved, blanked) */
 var oi=ol.ports.in,p4=isoPipe([[oi[0],yh,zL],[oi[0],oi[1],zL],oi],{r:1.8,id:'loop',to:'outlet',caps:false});
 var as=an.ports.sample,p5=isoPipe([[as[0],yh,zL],[as[0],yh,as[2]+18],[as[0],as[1],as[2]+18],as],{r:1.2,id:'loop',to:'analyzer',caps:false});
 var xt=388,p6=isoPipe([[xt,yh,zL],[xt,yh+30,zL]],{r:2,id:'tiein',flow:false,caps:'end',flanges:'ends'}),tv=isoPart('valve',xt,yh+18,zL,1,{id:'tiein',rot:1});
 o.push(sk,tk,pu,pn,p2,p1,ro,sp,sv,p3,p6,tv,p5,an,p4,ol,isoArrow([340,yh,zL],'x'),isoArrow([xe,yh,zL-30],'-z'));
 /* where each document's pin sits (3D) */
 pins.ro=ro.ports.top;pins.sample=[xr,a[1]+18,sz];pins.skid=[18,120,dz-3];pins.tank=tk.ports.top;pins.pump=po;pins.panel=pn.ports.top;
 pins.analyzer=an.ports.top;pins.outlet=[oi[0],oi[1],oi[2]-6];pins.tiein=[xt,yh+30,zL];
 var bx=isoBounds([[0,0,0],[240,0,0],[0,120,0],[240,120,0],[48,106,80],[150,34,120],[xe,yh,zL+4],[xe,yh,0],[304,48,0],[xt,yh+30,zL+6],[270,90,0]],14);
 return {inner:o.join(''),pins:pins,w:Math.round(bx.w),h:Math.round(bx.h),org:[-bx.x,-bx.y]}}
LOOKS['audit-skid']=function(b,H){var I=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=I.length,half=Math.ceil(n/2),S=scene();
 var pins=I.map(function(x,i){var p=S.pins[x.part]||S.pins.skid,a=isoPct(isoP(p),S.w,S.h,S.org);
  return '<span class="'+K+'__pin'+(x.key?' is-key':'')+'" data-i="'+i+'" style="left:'+a.left+';top:'+a.top+'">'+(i<9?'0':'')+(i+1)+'</span>'}).join('');
 var fig='<div class="'+K+'__fig" aria-hidden="true">'+isoSvg(S.w,S.h,S.inner,K+'__svg',{origin:S.org})+pins+'<span class="'+K+'__ring"></span></div>';
 var docs=I.map(function(x,i){var L=i<half,name=x.link&&wp(x.link)?wlink(x.link,x.t,x.intent):tx(x.t);
  return fli('<li class="'+K+'__doc '+(L?'is-l':'is-r')+(x.key?' is-key':'')+'" tabindex="0" data-i="'+i+'" data-part="'+e(S.pins[x.part]?x.part:'skid')+'" style="--row:'+((L?i:i-half)+1)+'">'
   +'<span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><h3 class="'+K+'__t">'+name+'</h3>'+(x.d?'<p class="'+K+'__d">'+tx(x.d)+'</p>':'')+'</li>',b,i)}).join('');
 var corners='<span class="'+K+'__corner is-l" aria-hidden="true">'+e(b.nav||'')+' · '+n+' '+e(b.fold_noun||'documents')+'</span>'+(b.corner?'<span class="'+K+'__corner is-r" aria-hidden="true">'+e(b.corner)+'</span>':'');
 var body='<div class="'+K+'" style="--rows:'+half+'">'+fig+wFold(b,n,'<ol class="'+K+'__docs" role="list">'+docs+'</ol>',b.fold_noun)
  +'<svg class="'+K+'__leads" aria-hidden="true" focusable="false"></svg>'+corners+'</div>';
 return sec(H+body,K+'-sec')};
/* Leaders and selection (works without motion and under reduced motion; the CSS transitions are dropped there).
   Ported from Subframe Motion "Image hotspots" (atlas-hotspots), MIT, (c) 2026 Subframe (kept: one selection shared by
   the numbered pins and the list, the crosshair ring gliding to the chosen pin in 0.25 s cubic-bezier(.2,.8,.2,1), the
   chosen pin filling and growing to 1.12, the list row taking the accent; replaced: the print with the IsoKit system,
   the detail line with each document's own callout and a leader to its part). */
(function(){var NS='http://www.w3.org/2000/svg';
 function lay(w){var svg=w.querySelector('.'+K+'__leads');if(!svg)return;var wr=w.getBoundingClientRect();
  svg.setAttribute('viewBox','0 0 '+Math.max(1,Math.round(wr.width))+' '+Math.max(1,Math.round(wr.height)));
  while(svg.firstChild)svg.removeChild(svg.firstChild);if(getComputedStyle(svg).display==='none')return;
  [].forEach.call(w.querySelectorAll('.'+K+'__doc'),function(it){if(it.offsetParent===null)return;var i=it.getAttribute('data-i'),k=w.querySelector('.'+K+'__pin[data-i="'+i+'"]'),t=it.querySelector('.'+K+'__t');if(!k||!t)return;
   var r=it.getBoundingClientRect(),tr=t.getBoundingClientRect(),m=k.getBoundingClientRect(),L=it.classList.contains('is-l'),
    y=tr.top+Math.min(tr.height,24)/2-wr.top,x0=(L?r.right+6:r.left-6)-wr.left,mx=m.left+m.width/2-wr.left,my=m.top+m.height/2-wr.top,
    rr=m.width/2+2,kx=L?Math.min(mx-rr-8,Math.max(x0+20,mx-Math.abs(my-y)*0.58-rr)):Math.max(mx+rr+8,Math.min(x0-20,mx+Math.abs(my-y)*0.58+rr));
   var dx=mx-kx,dy=my-y,l=Math.sqrt(dx*dx+dy*dy)||1,ex=mx-dx/l*rr,ey=my-dy/l*rr;
   var p=document.createElementNS(NS,'path');p.setAttribute('d','M'+x0.toFixed(1)+' '+y.toFixed(1)+'H'+kx.toFixed(1)+'L'+ex.toFixed(1)+' '+ey.toFixed(1));
   p.setAttribute('class',K+'__lead'+(it.classList.contains('is-on')?' is-on':''));p.setAttribute('data-i',i);svg.appendChild(p)})}
 function show(w,it){var i=it?it.getAttribute('data-i'):null,pt=it?it.getAttribute('data-part'):null;w.classList.toggle('is-pointing',!!it);
  [].forEach.call(w.querySelectorAll('.'+K+'__pin, .'+K+'__lead, .'+K+'__doc'),function(x){x.classList.toggle('is-on',x.getAttribute('data-i')===i)});
  [].forEach.call(w.querySelectorAll('svg.aq-iso [data-iso-id]'),function(x){x.classList.toggle('is-on',x.getAttribute('data-iso-id')===pt)});
  var ring=w.querySelector('.'+K+'__ring'),pin=i!=null&&w.querySelector('.'+K+'__pin[data-i="'+i+'"]');
  if(ring&&pin){ring.style.left=pin.style.left;ring.style.top=pin.style.top;ring.classList.add('is-on')}else if(ring)ring.classList.remove('is-on')}
 window.AQauditSkid={lay:lay,show:show};
 if(window.ResizeObserver&&window.MutationObserver){var ro=new ResizeObserver(function(es){es.forEach(function(en){lay(en.target)})});
  var scan=function(n){if(n.nodeType!==1)return;var L=n.matches('.'+K)?[n]:[].slice.call(n.querySelectorAll('.'+K));L.forEach(function(w){if(w.__asl)return;w.__asl=1;ro.observe(w)})};
  new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,scan)})}).observe(document.documentElement,{childList:true,subtree:true});
  if(document.body)scan(document.body)}
 function at(ev){return ev.target.closest&&ev.target.closest('.'+K+'__doc')}
 document.addEventListener('pointerover',function(ev){var it=at(ev);if(it&&ev.pointerType!=='touch')show(it.closest('.'+K),it)});
 document.addEventListener('focusin',function(ev){var it=at(ev);if(it)show(it.closest('.'+K),it)});
 document.addEventListener('click',function(ev){var it=at(ev);if(it)show(it.closest('.'+K),it)});
})();
})();
