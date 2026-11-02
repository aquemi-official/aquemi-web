/* Look "visit-plan" -> VisitPlan (design-system/components/VisitPlan): a service visit as a route around the system,
   on one navy drawing band. The whole plant stands in IsoKit line art (on-navy lines), left to right along one water
   line: control panel, pretreatment (media filter, carbon, softener), RO rack and EDI stack, storage tank, loop pump,
   UV unit, the loop supply with its diaphragm valve and TOC analyser out to a point of use, the return overhead to the
   tank, and the report binders and stamp at the end. The technician's walk is a dashed route on the floor in front of
   the plant, with a numbered stop in front of each part the visit checks. The checks are captions along the base of
   the band, one column per stop on hairlines (number, name, what is checked, its link); pointing at one lights its
   parts and its stop. The last item, the signed report, ends the band as one limestone line.
   Concept: research/pass9b/concepts/svc-service.3.png (navy band, line-drawn system, visit checks along its base, the
   signed report as a closing limestone line).
   Fields (a grid block, as: "route"): h, items [{t, d, link, spot, end, part}]. part: the plant stage(s) the stop
   checks, space-separated: panel, toc, pre, gen, tank, loop, uv, wear, report (no part: a caption without a stop).
   "end": true on the last item draws its stop as the sign-off tick and sets it as the closing line. The drawing is
   fixed (one PW package); the stops and captions come from the items. Phones: the walk runs down the band, one stop
   per row with its stage drawn small; the closing line stays last.
   The plant scene (vpPlant) is shared with look "retrofit-plant". */
function vpDedupe(p){var o=[];p.forEach(function(q){var l=o[o.length-1];if(l&&Math.abs(l[0]-q[0])+Math.abs(l[1]-q[1])+Math.abs(l[2]-q[2])<1e-6)return;o.push(q)});
 for(var i=o.length-2;i>0;i--){var a=isoV.nrm(isoV.sub(o[i],o[i-1])),c=isoV.nrm(isoV.sub(o[i+1],o[i]));if(isoV.dot(a,c)>0.9999)o.splice(i,1)}return o}
function vpPlant(){var R2=2*ISO_C,X=function(c){return c/R2},S={},order=[];
 function put(kind,c,lx,ly,o,dy,s){var x=X(c);return isoPart(kind,x-lx,-x-ly+(dy||0),0,s||1,o)}
 function pts(p){var o=[];for(var k in p.ports)o.push(p.ports[k]);return o}
 function add(id,el,mini){var s=S[id]=S[id]||{parts:[],pts:[],mini:[],c:null};order.push(el);if(el.ports){s.pts=s.pts.concat(pts(el));if(mini!==false)s.mini.push(el)}}
 function link(a,b,to,z){var g=5,pp=vpDedupe([a,[a[0]+g,a[1],a[2]],[a[0]+g,a[1],z],[a[0]+g,b[1],z],[b[0]-g,b[1],z],[b[0]-g,b[1],b[2]],b]);return isoPipe(pp,{to:to,r:2.2,flanges:false,caps:false})}
 function linkTop(a,b,to,z){var g=5,pp=vpDedupe([a,[a[0]+g,a[1],a[2]],[a[0]+g,a[1],z],[a[0]+g,b[1],z],[b[0],b[1],z],b]);return isoPipe(pp,{to:to,r:2.2,flanges:false,caps:false})}
 var pa=put('panel',34,0,0,{id:'panel'});
 var fi=put('filter',112,0,0,{id:'pre'}),ca=put('carbon',168,0,0,{id:'pre'}),so=put('softener',244,0,0,{id:'pre'});
 var ro=put('ro',370,56,13,{id:'gen'}),ed=put('edi',486,20,11,{id:'gen'});
 var tk=put('tank',584,0,0,{id:'tank'}),pu=put('pump',654,16,0,{id:'loop'}),uv=put('uv',738,30,0,{id:'uv'});
 var f0=fi.ports.in,feed=isoPipe(vpDedupe([[f0[0]-30,f0[1]+14,f0[2]],[f0[0]-8,f0[1]+14,f0[2]],[f0[0]-8,f0[1],f0[2]],f0]),{to:'pre',r:2.2,caps:'start',flanges:false});
 add('panel',pa);add('pre',feed,false);add('pre',fi);add('pre',link(fi.ports.out,ca.ports.in,'pre',fi.ports.out[2]+6),false);add('pre',ca);
 add('pre',link(ca.ports.out,so.ports.in,'pre',so.ports.in[2]+8),false);add('pre',so);
 add('gen',link(so.ports.out,ro.ports.in,'gen',so.ports.out[2]+10),false);add('gen',ro);add('gen',link(ro.ports.out,ed.ports.in,'gen',ro.ports.out[2]+4),false);add('gen',ed);
 add('tank',linkTop(ed.ports.out,tk.ports.in,'tank',tk.ports.in[2]+14),false);add('tank',tk);
 add('loop',link(tk.ports.out,pu.ports.in,'loop',tk.ports.out[2]),false);add('loop',pu);
 add('uv',link(pu.ports.out,uv.ports.in,'uv',uv.ports.in[2]),false);add('uv',uv);
 /* loop supply: from the UV out along y, then along x past the analyser and the valve to the point of use */
 var ou=put('outlet',930,0,0,{id:'loop'}),po=uv.ports.out,oi=ou.ports.in,zL=40,yL=oi[1];
 var ax=(po[0]+oi[0])/2-24,an=isoPart('analyzer',ax,yL-16,0,1,{id:'toc'}),sp=an.ports.sample;
 var sup=isoPipe(vpDedupe([po,[po[0]+6,po[1],po[2]],[po[0]+6,po[1],zL],[po[0]+6,yL,zL],[oi[0],yL,zL],oi]),{to:'loop',r:2.2,flanges:false,caps:false});
 var tee=isoPipe(vpDedupe([[sp[0]+6,yL,zL],[sp[0]+6,yL,sp[2]],[sp[0]+6,sp[1],sp[2]],sp]),{to:'toc',r:1.2,flanges:false,caps:false});
 add('toc',an);add('loop',sup,false);add('toc',tee,false);add('loop',ou,false);
 /* return overhead to the tank */
 var E=oi[0]+64,rt=tk.ports.ret,zr=rt[2]+22;
 var ret=isoPipe(vpDedupe([[oi[0],yL,zL],[E,yL,zL],[E,yL,zr],[E,rt[1],zr],[rt[0],rt[1],zr],rt]),{to:'tank',r:2.2,flanges:false,caps:false});
 /* the return's diaphragm valve (wearing parts: diaphragms and seals) on the run past the point of use */
 var va=isoPart('valve',oi[0]+38,yL,zL,1.5,{id:'wear'});
 add('loop',ret,false);add('wear',va);
 /* the report: binders and the stamp on the floor at the end of the walk */
 var bi=put('binder',1090,-6,0,{id:'report'},0,0.9),st=put('stamp',1140,-8,8,{id:'report'},14,1.1);
 add('report',bi);add('report',st);
 /* where each stage's stop stands (screen x): the part the visit checks there */
 var cx=function(q){return isoP(q)[0]};
 var cs={panel:cx(pa.ports.base),pre:176,gen:428,tank:cx(tk.ports.base),loop:cx(ou.ports.base),uv:cx(uv.ports.base),toc:cx(an.ports.base),wear:cx(va.ports.top),report:cx(bi.ports.base)};
 Object.keys(cs).forEach(function(k){if(S[k])S[k].c=cs[k]});
 return {S:S,order:order,X:X}}
/* a stage drawn alone, small (phones and cards) */
function vpMini(st,cls){var P=[];st.mini.forEach(function(p){for(var k in p.ports)P.push(p.ports[k])});
 var bx=isoBounds(P,16),w=Math.max(60,bx.w),h=Math.max(48,bx.h+14);
 return isoSvg(w,h,st.mini.join(''),cls,{origin:[-bx.x+(w-bx.w)/2,-bx.y+10]})}
LOOKS['visit-plan']=function(b,H){var I=b.items||[],K='aq-visit-plan',pl=vpPlant(),S=pl.S,X=pl.X;
 var parts=function(it){return String(it.part||'').split(/\s+/).filter(function(k){return S[k]})};
 /* walk: a stop on the floor in front of the first stage each item checks; a smooth walk through the stops */
 var stops=[];I.forEach(function(it,i){var ps=parts(it);if(!ps.length)return;var c=S[ps[0]].c,x=c/(2*ISO_C),F=stops.length%2?150:100;stops.push({i:i,x:x,F:F,ps:ps})});
 /* stops too close to read apart (two checks on neighbouring parts) are spread to at least half the mean spacing */
 if(stops.length>2){var gap=(stops[stops.length-1].x-stops[0].x)/(stops.length-1)*0.5;for(var j=1;j<stops.length-1;j++){if(stops[j].x-stops[j-1].x<gap){var mid=(stops[j].x+stops[j-1].x)/2;stops[j-1].x=Math.min(stops[j-1].x,mid-gap/2);stops[j].x=mid+gap/2}}}
 stops.forEach(function(s){s.p=[s.x+s.F/2,-s.x+s.F/2,0]});
 var allP=[];Object.keys(S).forEach(function(k){allP=allP.concat(S[k].pts)});allP=allP.concat(stops.map(function(s){return s.p}));
 var bx=isoBounds(allP,28),VW=1080,sc=VW/bx.w,VH=Math.round(bx.h*sc+24),org=[-bx.x,-bx.y+12/sc];
 var T=function(q){var s=isoP(q);return [(s[0]+org[0])*sc,(s[1]+org[1])*sc]};
 var SP=stops.map(function(s){return T(s.p)}),f=function(n){return n.toFixed(1)},wd='',acc=[0];
 if(SP.length){var s0=[Math.max(24,SP[0][0]-40),SP[0][1]];wd='M'+f(s0[0])+' '+f(s0[1])+'L'+f(SP[0][0])+' '+f(SP[0][1]);acc=[SP[0][0]-s0[0]];
  for(var k=1;k<SP.length;k++){var a=SP[k-1],c=SP[k],dx=(c[0]-a[0])/2;wd+='C'+f(a[0]+dx)+' '+f(a[1])+' '+f(c[0]-dx)+' '+f(c[1])+' '+f(c[0])+' '+f(c[1]);acc.push(acc[k-1]+Math.hypot(c[0]-a[0],c[1]-a[1]))}}
 var tot=acc[acc.length-1]||1;
 var marks=stops.map(function(s,k){var t=T(s.p),it=I[s.i],n=(s.i<9?'0':'')+(s.i+1),end=it.end&&s.i===I.length-1;
  return '<g class="'+K+'__mark'+(end?' is-end':'')+'" data-stop="'+s.i+'" data-f="'+(acc[k]/tot).toFixed(3)+'"><path class="'+K+'__pin" d="M'+t[0].toFixed(1)+' '+t[1].toFixed(1)+'v-18"/><circle cx="'+t[0].toFixed(1)+'" cy="'+(t[1]-30).toFixed(1)+'" r="13"/>'
   +(end?'<path class="'+K+'__tick" d="M'+(t[0]-5.5).toFixed(1)+' '+(t[1]-30).toFixed(1)+'l4 4 7.5-8.5"/>':'<text x="'+t[0].toFixed(1)+'" y="'+(t[1]-26).toFixed(1)+'">'+n+'</text>')+'</g>'}).join('');
 var drawing='<g transform="scale('+sc.toFixed(4)+') translate('+org[0].toFixed(1)+' '+org[1].toFixed(1)+')">'+pl.order.join('')+'</g>';
  var svg='<svg class="aq-iso aq-iso--navy '+K+'__svg" viewBox="0 0 '+VW+' '+VH+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">'
  +drawing+'<path class="'+K+'__walk" d="'+wd+'"/>'+marks+'</svg>';
 var cards=I.map(function(it,i){var ps=parts(it),end=it.end&&i===I.length-1,n=(i<9?'0':'')+(i+1);
  var mini=ps.length?vpMini(S[ps[0]],'aq-iso--navy '+K+'__mini'):'';
  var inner='<span class="'+K+'__fig" aria-hidden="true">'+mini+'<span class="'+K+'__n">'+(end?'<svg viewBox="0 0 16 16" focusable="false"><path d="M3 8.5 6.5 12 13 4.5"/></svg>':n)+'</span></span>'
   +(end?'<span class="'+K+'__cap">Sign-off</span>':'')+'<h3 class="'+K+'__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'');
  return '<li class="'+K+'__stop'+(end?' is-end':'')+'" data-stop="'+i+'" data-parts="'+ps.join(' ')+'">'+(it.link&&wp(it.link)?'<a class="'+K+'__body" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+inner+'</a>':'<div class="'+K+'__body" tabindex="0">'+inner+'</div>')+'</li>'}).join('');
 var ends=I.length&&I[I.length-1].end?1:0;
 return sec(H+'<div class="'+K+'" style="--n:'+I.length+';--cols:'+(I.length-ends)+'"><div class="'+K+'__sheet">'+svg+'</div><ol class="'+K+'__stops" role="list">'+cards+'</ol></div>','aq-band--navy '+K+'-sec')};
/* Pointing at (or focusing) a stop's card lights its parts and its stop on the drawing */
(function(){function hl(ev,on){var s=ev.target.closest&&ev.target.closest('.aq-visit-plan__stop');if(!s||s.contains(ev.relatedTarget))return;var r=s.closest('.aq-visit-plan'),svg=r.querySelector('.aq-visit-plan__svg');
 String(s.getAttribute('data-parts')||'').split(' ').forEach(function(id){if(id)[].forEach.call(svg.querySelectorAll('[data-iso-id="'+id+'"]'),function(el){el.classList.toggle('is-lit',on)})});
 [].forEach.call(r.querySelectorAll('[data-stop="'+s.getAttribute('data-stop')+'"]'),function(el){el.classList.toggle('is-on',on)})}
 document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)});
 document.addEventListener('focusin',function(ev){hl(ev,true)});document.addEventListener('focusout',function(ev){hl(ev,false)})})();
