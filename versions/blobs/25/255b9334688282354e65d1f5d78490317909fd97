/* Look "witness-plan" -> WitnessPlan (design-system/components/WitnessPlan): the ways to witness a FAT read as ruled
   rows whose leader lines run into the package standing in our test bay (pass 9b concept svc-fat-sat.3). Left, the
   heading and one row per way (mono number, the way, a dash, what it means). Right, an IsoKit light drawing of the
   white PP package inside the test bay's open frame: the skid with its RO rack, the storage tank, the control panel,
   the outlet analyser, a gauge on the feed, the protocol binders on the bench and a camera on the frame. Each way's
   leader runs from its row to the part that way looks at (its "part"), ending at a numbered marker; choosing a way
   (press, or point at it) lights its leader, marker and part. One way is chosen at a time, the first by default.
   Fields (an options block): h, intro, items [{t, d, part}], zones [bay label, remote label] (short drawing labels,
   aria-hidden: the frame and the camera). part: "panel", "camera", "gauge", "documents", "analyzer", "ro" or "tank".
   Leaders are laid out from the rendered rows (ResizeObserver), so they follow wrapping; without them the numbers
   still pair rows and parts. Arrow keys, Home and End move between the ways and choose. The list's first item is the
   sliding indicator (an empty, aria-hidden li that motion.js springs to the chosen row).
   Container under 1080 px: the drawing above the rows, no leaders (the numbered markers pair them). */
var WP_PARTS=['panel','camera','gauge','documents','analyzer','ro','tank'];
function wpScene(){var P='aq-witness-plan'+'__',B=[-62,-26,0],X=300,Yd=172,Z=104,F=function(a,b){return 'M'+isoT(isoP(a))+'L'+isoT(isoP(b))};
 var x0=B[0],y0=B[1],x1=x0+X,y1=y0+Yd;
 /* the test bay frame: back posts and back top edges first, so equipment paints over them */
 var back=F([x0,y0,0],[x0,y0,Z])+F([x1,y0,0],[x1,y0,Z])+F([x0,y1,0],[x0,y1,Z])+F([x0,y0,Z],[x1,y0,Z])+F([x0,y0,Z],[x0,y1,Z])+F([x0,y0,0],[x1,y0,0])+F([x0,y0,0],[x0,y1,0]);
 var front=F([x1,y1,0],[x1,y1,Z])+F([x1,y0,Z],[x1,y1,Z])+F([x0,y1,Z],[x1,y1,Z]);
 var pn=isoPart('panel',-36,40,0,1,{id:'panel'}),sk=isoPart('skid',0,0,0,1,{w:150,d:62,id:'ro'}),ro=isoPart('ro',8,8,9,1,{id:'ro'}),
  tk=isoPart('tank',196,6,0,1,{id:'tank'}),an=isoPart('analyzer',150,104,0,0.9,{id:'analyzer'}),dc=isoPart('binder',40,118,0,0.8,{id:'documents'});
 var feed=isoPipe(isoRoute(ro.ports.out,tk.ports.in,'xzy'),{r:1.8,to:'tank',caps:false});
 var ga=isoPart('gauge',(ro.ports.out[0]+tk.ports.in[0])/2+6,ro.ports.out[1],tk.ports.in[2]+4,1.1,{id:'gauge',value:0.55,face:'y'});
 var smp=isoPipe(isoRoute(tk.ports.out,[an.ports.sample[0],tk.ports.out[1],tk.ports.out[2]],'x').concat([[an.ports.sample[0],an.ports.sample[1],tk.ports.out[2]],an.ports.sample]),{r:1.2,to:'analyzer',caps:false});
 /* the camera on the frame's back-left top corner, looking in (drawn here: IsoKit has no camera) */
 var cb=[x0+6,y0+6,Z-14],cam='<g class="aq-iso__part" data-iso="camera" data-iso-id="camera"><path class="aq-iso__ln" d="'+F([x0,y0,Z-2],[cb[0],cb[1],cb[2]+8])+'"/>'
  +'<path class="aq-iso__eq" d="'+isoBoxD(cb,16,9,8)+'"/><path class="aq-iso__eq" d="'+isoBoxD([cb[0]+16,cb[1]+2,cb[2]+2],4,5,4)+'"/></g>';
 var inner='<path class="aq-iso__ln '+P+'bay" d="'+back+'"/>'+cam+[pn,sk,ro,feed,tk,ga,smp,an,dc].join('')+'<path class="aq-iso__ln '+P+'bay" d="'+front+'"/>';
 var A={panel:pn.ports.top,camera:[cb[0]+8,cb[1]+4,cb[2]+8],gauge:[ga.ports.top[0],ga.ports.top[1],ga.ports.top[2]+2],documents:dc.ports.top,analyzer:an.ports.top,ro:ro.ports.top,tank:tk.ports.top};
 var bx=isoBounds([[x0,y0,0],[x1,y0,0],[x0,y1,0],[x1,y1,0],[x0,y0,Z],[x1,y0,Z],[x0,y1,Z],[x1,y1,Z]],16);
 return {inner:inner,bx:bx,A:A,zone:[x0,y1,Z],camAt:[x0,y0,Z]}}
LOOKS['witness-plan']=function(b,H){var I=b.items||[],Z=b.zones||['',''],S=wpScene(),W=Math.round(S.bx.w),Hh=Math.round(S.bx.h),org=[-S.bx.x,-S.bx.y],seen={};
 function part(it){return WP_PARTS.indexOf(it.part)>-1?it.part:'ro'}
 var svg=isoSvg(W,Hh,S.inner,'aq-witness-plan__svg',{origin:org});
 var mk=I.map(function(it,i){var k=part(it),n=seen[k]=(seen[k]||0)+1,at=isoPct(isoP(S.A[k]),W,Hh,org);
  return '<span class="aq-witness-plan__mk'+(i?'':' is-on')+'" data-i="'+i+'" style="left:'+at.left+';top:'+at.top+';--k:'+(n-1)+'" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'}).join('');
 var zl=function(s,p,c){var at=isoPct(isoP(p),W,Hh,org);return s?'<span class="aq-witness-plan__zone '+c+'" style="left:'+at.left+';top:'+at.top+'" aria-hidden="true">'+tx(s)+'</span>':''};
 var list=I.map(function(it,i){return '<li><button type="button" class="aq-witness-plan__opt" data-i="'+i+'" data-part="'+e(part(it))+'" aria-pressed="'+(i?'false':'true')+'">'
  +'<span class="aq-witness-plan__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'.</span>'
  +'<span class="aq-witness-plan__t">'+tx(it.t)+'</span>'+(it.d?'<span class="aq-witness-plan__d">'+tx(it.d)+'</span>':'')+'</button></li>'}).join('');
 return sec('<div class="aq-witness-plan">'+'<div class="aq-witness-plan__side">'+H+'<ol class="aq-witness-plan__list"><li class="aq-witness-plan__ind" aria-hidden="true"></li>'+list+'</ol></div>'
  +'<div class="aq-witness-plan__fig"><div class="aq-witness-plan__sheet">'+svg+zl(Z[0],S.zone,'is-bay')+zl(Z[1],S.camAt,'is-cam')+mk+'</div></div>'
  +'<svg class="aq-witness-plan__leads" aria-hidden="true" focusable="false"></svg></div>','aq-witness-plan-sec')};
(function(){var NS='http://www.w3.org/2000/svg';
 /* lay the leaders out from the rendered rows: row end, along the row, then into the part's marker */
 function lay(w){var svg=w.querySelector('.aq-witness-plan__leads');if(!svg)return;
  var wr=w.getBoundingClientRect();svg.setAttribute('viewBox','0 0 '+Math.round(wr.width)+' '+Math.round(wr.height));
  while(svg.firstChild)svg.removeChild(svg.firstChild);if(getComputedStyle(svg).display==='none')return;
  [].forEach.call(w.querySelectorAll('.aq-witness-plan__opt'),function(o){var i=o.getAttribute('data-i'),k=w.querySelector('.aq-witness-plan__mk[data-i="'+i+'"]');if(!k)return;
   var r=o.getBoundingClientRect(),m=k.getBoundingClientRect(),y=r.bottom-wr.top,x0=r.left-wr.left,x1=r.right-wr.left,tx=m.left-wr.left,ty=m.top+m.height/2-wr.top,kx=Math.max(x1+12,tx-Math.abs(ty-y)*0.6);
   var d='M'+x0.toFixed(1)+' '+y.toFixed(1)+'H'+kx.toFixed(1)+'L'+tx.toFixed(1)+' '+ty.toFixed(1),p=document.createElementNS(NS,'path');
   p.setAttribute('d',d);p.setAttribute('class','aq-witness-plan__lead'+(o.getAttribute('aria-pressed')==='true'?' is-on':''));p.setAttribute('data-i',i);svg.appendChild(p)})}
 function show(w,o){var i=o?o.getAttribute('data-i'):'-1',pt=o?o.getAttribute('data-part'):'';
  [].forEach.call(w.querySelectorAll('.aq-witness-plan__mk, .aq-witness-plan__lead'),function(x){x.classList.toggle('is-on',x.getAttribute('data-i')===i)});
  [].forEach.call(w.querySelectorAll('.aq-witness-plan__svg [data-iso-id]'),function(x){x.classList.toggle('is-lit',x.getAttribute('data-iso-id')===pt)})}
 window.AQwitness={lay:lay,show:show};
 if(window.ResizeObserver&&window.MutationObserver){var ro=new ResizeObserver(function(es){es.forEach(function(en){lay(en.target)})});
  var scan=function(n){if(n.nodeType!==1)return;var L=n.matches('.aq-witness-plan')?[n]:[].slice.call(n.querySelectorAll('.aq-witness-plan'));
   L.forEach(function(w){if(w.__wpl)return;w.__wpl=1;ro.observe(w);show(w,w.querySelector('.aq-witness-plan__opt[aria-pressed="true"]'))})};
  new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,scan)})}).observe(document.documentElement,{childList:true,subtree:true});
  if(document.body)scan(document.body)}
 document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-witness-plan__opt');if(!t)return;var w=t.closest('.aq-witness-plan');
  [].forEach.call(w.querySelectorAll('.aq-witness-plan__opt'),function(o){o.setAttribute('aria-pressed',o===t?'true':'false')});show(w,t)});
 document.addEventListener('pointerover',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-witness-plan__opt');if(!t||ev.pointerType==='touch')return;show(t.closest('.aq-witness-plan'),t)});
 document.addEventListener('pointerout',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-witness-plan__list');if(!t||(ev.relatedTarget&&t.contains(ev.relatedTarget)))return;
  var w=t.closest('.aq-witness-plan');show(w,w.querySelector('.aq-witness-plan__opt[aria-pressed="true"]'))});
 /* arrow keys, Home and End move between the ways and choose (the rows act as one control) */
 document.addEventListener('keydown',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-witness-plan__opt');if(!t)return;
  var o=[].slice.call(t.closest('.aq-witness-plan__list').querySelectorAll('.aq-witness-plan__opt')),i=o.indexOf(t),n=o.length,k=ev.key,j=-1;
  if(k==='ArrowDown'||k==='ArrowRight')j=(i+1)%n;else if(k==='ArrowUp'||k==='ArrowLeft')j=(i+n-1)%n;else if(k==='Home')j=0;else if(k==='End')j=n-1;
  if(j<0)return;ev.preventDefault();o[j].focus();o[j].click()})})();
