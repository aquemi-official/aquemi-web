/* Look "system-run" -> SystemRun (design-system/components/SystemRun): the package as one continuous water line drawn
   as a navy blueprint (IsoKit). Drinking water enters at the left, runs through the four systems in order (media
   filter, softener, then carbon or bisulfite, drawn as one vessel, the order sys-pretreatment teaches; RO rack and a
   DI/EDI unit, drawn as one stack while DI versus EDI is open, FD-21; PP tank and loop pump; analyser, panel and
   point of use) and
   leaves at the point of use. Each system has a bracket over its equipment with its number and name, and a column
   under the drawing with its line, standard tag and link; pointing at a column lights its equipment.
   Phones: the long drawing gives way to one drawing per system, stacked down a vertical water line: one twin-wall
   pipe runs down the rail from "Drinking water" to "Point of use", and a tee leaves it for each system's drawing at
   the drawing's own inlet pipe, so the path reads as one line (pass 12). Each phone drawing is cropped tight to its
   equipment and the pipe that brings water in (nothing clipped); tag and link share one row.
   Fields (a path block): h, from, to, items [{t, d, tag, link, label}] (label: short bracket name, default t; the
   second system's bracket defaults to "RO and DI/EDI", what the drawing shows, never EDI only: DR-018).
   The drawing itself is fixed: it shows these four systems in this order (IsoKit parts), so the look fits a path block
   of exactly the home page's four systems; other paths keep the WaterPath renderer. */
/* drop repeated points and middle points of straight runs, so isoPipe never gets a zero-length leg */
function srDedupe(p){var o=[];p.forEach(function(q){var l=o[o.length-1];if(l&&Math.abs(l[0]-q[0])+Math.abs(l[1]-q[1])+Math.abs(l[2]-q[2])<1e-6)return;o.push(q)});
 for(var i=o.length-2;i>0;i--){var a=isoV.nrm(isoV.sub(o[i],o[i-1])),c=isoV.nrm(isoV.sub(o[i+1],o[i]));if(isoV.dot(a,c)>0.9999)o.splice(i,1)}return o}
function srStages(){
 /* each stage: its parts and the pipes inside it, in water order; ports carry the run from stage to stage */
 var S=[],Z=86,feedZ=60;
 function at(c){return c/(2*ISO_C)}                       /* diagonal x = -y: screen centre c -> t */
 function P(kind,c,o,dx,dy){var t=at(c);return isoPart(kind,t+(dx||0),-t+(dy||0),0,1,o)}
 function link(a,b,to,mode,z){var g=5,h=z==null?Z:z,pts=[a,[a[0]+g,a[1],a[2]]];
  if(mode==='top'){pts.push([a[0]+g,a[1],h],[a[0]+g,b[1],h],[b[0],b[1],h],b)}
  else {pts.push([a[0]+g,a[1],h],[a[0]+g,b[1],h],[b[0]-g,b[1],h],[b[0]-g,b[1],b[2]],b)}
  return isoPipe(srDedupe(pts),{to:to,r:2.2,flanges:false,caps:false})}
 /* 1 pretreatment */
 var fi=P('filter',62,{id:'s0'}),so=P('softener',134,{id:'s0'},0,0),ca=P('carbon',212,{id:'s0'});
 var f0=fi.ports.in,feed=isoPipe(srDedupe([[f0[0]-40,f0[1],feedZ],[f0[0]-8,f0[1],feedZ],[f0[0]-8,f0[1],f0[2]],f0]),{to:'s0',r:2.2,caps:'start',flanges:false});
 S.push({inlet:feed.start,parts:[feed,fi,link(fi.ports.out,so.ports.in,'s0','side',so.ports.in[2]+8),so,link(so.ports.out,ca.ports.in,'s0','side',ca.ports.in[2]+6),ca],span:[22,240],feed:feed});
 /* 2 PW generation: RO rack anchored at its min corner (screen centre 0.866 (2t + 31.5)), EDI after it */
 var tr=(352/ISO_C-31.5)/2,ro=isoPart('ro',tr,-tr,0,1,{id:'s1'}),te=(468/ISO_C-9)/2,ed=isoPart('edi',te,-te,0,1,{id:'s1'});
 var l1=link(ca.ports.out,ro.ports.in,'s1','side',ca.ports.out[2]+10);
 S.push({inlet:l1.start,parts:[l1,ro,link(ro.ports.out,ed.ports.in,'s1','side',ro.ports.out[2]+4),ed],span:[282,500]});
 /* 3 storage: tank fed from the top, loop pump at its outlet */
 var ta=P('tank',600,{id:'s2'}),tp=(672/ISO_C-16)/2,pu=isoPart('pump',tp,-tp,0,1,{id:'s2'});
 var l2=link(ed.ports.out,ta.ports.in,'s2','top',ta.ports.in[2]+14);
 S.push({inlet:l2.start,parts:[l2,ta,link(ta.ports.out,pu.ports.in,'s2','side',ta.ports.out[2]),pu],span:[560,720]});
 /* 4 monitoring: the loop runs behind the panel to the point of use; the analyser draws its sample from a tee */
 var tpa=436,pa=isoPart('panel',tpa,-tpa-40,0,1,{id:'s3'}),tan=484,an=isoPart('analyzer',tan,-tan-14,0,1,{id:'s3'}),sp=an.ports.sample;
 var to=930/(2*ISO_C),ou=isoPart('outlet',to,-to,0,1,{id:'s3'}),po=pu.ports.out,oi=ou.ports.in,zL=36,yL=oi[1];
 var loop=isoPipe(srDedupe([po,[po[0],po[1],zL],[po[0],yL,zL],[oi[0],yL,zL],oi]),{to:'s3',r:2.2,flanges:false,caps:false});
 var tee=isoPipe(srDedupe([[sp[0]+6,yL,zL],[sp[0]+6,yL,sp[2]],[sp[0]+6,sp[1],sp[2]],sp]),{to:'s3',r:1.2,flanges:false,caps:false});
 S.push({inlet:loop.start,parts:[loop,pa,tee,an,ou],span:[770,968]});
 return S}
var SR_CROP=[[2,32,216,105],[-47,56,270,133],[-68,4,223,144],[-105,0,296,133]];
LOOKS['system-run']=function(b,H){
 var I=(b.items||[]).slice(0,4),S=srStages(),W=1000,Hh=180,org=[0,120];
 /* a dimension line on the floor in front of each system (blueprint furniture, no figures); the fourth keeps the space for the point-of-use label */
 var dims=S.slice(0,3).map(function(s){var a=s.span[0]+10,c=s.span[1]-10,ta=a/(2*ISO_C),tc=c/(2*ISO_C);return isoDim([ta,-ta,0],[tc,-tc,0],{off:[36,36,0],ext:2})}).join('');
 var big=dims+S.map(function(s){return s.parts.join('')+(s.extra||'')}).join('');
 var sheet=isoSheet(W,Hh+60,{grid:'iso',gridStep:22,title:false,m:0,band:8,cols:8,rows:3});
 var svg=isoSvg(W,Hh+60,big,'aq-iso--navy aq-system-run__svg',{origin:[org[0],org[1]+60],under:sheet});
 var brackets=I.map(function(it,i){var s=S[i];if(!s)return '';var l=s.span[0]/W*100,w=(s.span[1]-s.span[0])/W*100;
  return '<span class="aq-system-run__bracket" data-stage="s'+i+'" style="left:'+l.toFixed(2)+'%;width:'+w.toFixed(2)+'%"><span class="aq-system-run__bn">'+(i<9?'0':'')+(i+1)+'</span>'+tx(it.label||(i===1?'RO and DI/EDI':it.t))+'</span>'}).join('');
 var f0=S[0].feed.start,fin=isoPct([f0[0],f0[1]],W,Hh+60,[org[0],org[1]+60]);
 var ends='<span class="aq-system-run__end aq-system-run__end--in" style="left:'+fin.left+';top:'+fin.top+'">'+tx(b.from||'Drinking water')+'</span>'
  +'<span class="aq-system-run__end aq-system-run__end--out">'+tx(b.to||'Point of use')+'</span>';
 var fig='<div class="aq-system-run__fig" aria-hidden="true">'+svg+'<div class="aq-system-run__brackets">'+brackets+'</div>'+ends+'</div>';
 var cols=I.map(function(it,i){var s=S[i],mini='';
  /* phone crop: the stage's equipment and its inlet pipe, measured once in the old 180-high crop (x from span[0]-8);
     the drawing is fixed, so the boxes are too. The tee joins the rail at the inlet pipe's start. */
  if(s){var x0=s.span[0]-8,c=SR_CROP[i]||[0,0,s.span[1]-s.span[0]+16,Hh],vx=c[0]-4,vy=c[1]-4,vw=c[2]+8,vh=c[3]+8,o=[org[0]-x0-vx,org[1]-vy];
   mini=isoSvg(vw,vh,s.parts.join('')+(s.extra||''),'aq-iso--navy aq-system-run__mini',{origin:o}).replace('xMidYMid','xMinYMid');
   var q=s.inlet||[0,0];mini+='<i class="aq-system-run__tee" style="top:'+(100*(q[1]+o[1])/vh).toFixed(2)+'%;--tx:'+(100*(q[0]+o[0])/vw).toFixed(2)+'%"></i>'}
  var inner='<span class="aq-system-run__mark" aria-hidden="true"></span>'
   +'<span class="aq-system-run__mini-wrap" aria-hidden="true">'+mini+'</span>'
   +'<p class="aq-system-run__code" aria-hidden="true">'+(i<9?'0':'')+(i+1)+' / '+(I.length<10?'0':'')+I.length+'</p>'
   +'<h3 class="aq-system-run__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="aq-system-run__d">'+tx(it.d)+'</p>':'')
   +'<p class="aq-system-run__foot">'+(it.tag?'<span class="aq-tag">'+tx(it.tag)+'</span>':'')
   +(it.link&&wp(it.link)?'<span class="aq-system-run__go">'+tx(wlabel(it.link))+'</span>':'')+'</p>';
  return '<li class="aq-system-run__item">'+(it.link&&wp(it.link)?'<a class="aq-system-run__stage" data-stage="s'+i+'" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+inner+'</a>'
   :'<div class="aq-system-run__stage" data-stage="s'+i+'">'+inner+'</div>')+'</li>'}).join('');
 var pin='<p class="aq-system-run__pend aq-system-run__pend--in" aria-hidden="true">'+tx(b.from||'Drinking water')+'</p>',pout='<p class="aq-system-run__pend aq-system-run__pend--out" aria-hidden="true">'+tx(b.to||'Point of use')+'</p>';
 return sec(H+'<div class="aq-system-run">'+fig+pin+'<ol class="aq-system-run__stages">'+cols+'</ol>'+pout+'</div>','aq-band--navy aq-system-run-sec')};
/* Pointing at (or focusing) a system's column lights its equipment in the drawing (no motion: a colour change) */
(function(){function hl(ev,on){var s=ev.target.closest&&ev.target.closest('.aq-system-run__stage');if(!s)return;var r=s.closest('.aq-system-run'),id=s.getAttribute('data-stage');
 if(on&&s.contains(ev.relatedTarget))return;if(!on&&s.contains(ev.relatedTarget))return;
 [].forEach.call(r.querySelectorAll('.aq-system-run__svg [data-iso-id="'+id+'"], .aq-system-run__svg [data-iso-to="'+id+'"]'),function(el){el.classList.toggle('is-lit',on)});
 [].forEach.call(r.querySelectorAll('.aq-system-run__bracket[data-stage="'+id+'"]'),function(el){el.classList.toggle('is-on',on)})}
 document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)});
 document.addEventListener('focusin',function(ev){hl(ev,true)});document.addEventListener('focusout',function(ev){hl(ev,false)})})();
