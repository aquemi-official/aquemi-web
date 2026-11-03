/* Look "strata-run" -> StrataRun (design-system/components/StrataRun): a diagram block (stages from feed water to
   points of use) as one water run stepping down a terrace of stacked paper slabs. Each stage stands on its own slab
   (the first highest, each next one a step lower and nearer), its equipment drawn with IsoKit; one pipe carries the
   water down the terraces from slab to slab, the loop runs overhead back to the tank, and a cut-paper stream in
   flow-tint runs behind the whole terrace. The stage names hang over their slab as a row of labels whose left
   hairline drops to the part (one leader per stage). The base line (monitoring) is a dashed signal bus along the foot
   of the terrace. Phones (pass 12): the run turns vertical: each stage's slab drawing runs wide, alternating left and
   right, and one pipe zigzags down between them, in at one corner of a slab and out at the other, then down the page
   edge past the stage's text to the next slab. The text sits under its slab.
   Fields: stages [{t, d, icon|spot, link, art}], base, base_link, caption. art: what stands on the slab, one of
   feed, pretreatment, generation, storage, loop, outlets (default by position). link: a page id or page#anchor. */
var SR_ART=['feed','pretreatment','generation','storage','loop','outlets'];
/* One stage's equipment on a slab whose top centre is (x, y, z); id is the stage id the water lights. Returns
   {parts: [markup in back-to-front order], inn: 3D port the water enters, out: 3D port it leaves, top: leader target} */
function srStage(kind,x,y,z,id){var P=function(k,u,v,s,o){o=o||{};o.id=o.id||id;return isoPart(k,x+u,y+v,z,s,o)},r={parts:[]};
 if(kind==='feed'){var va=isoPart('valve',x+2,y,z+26,1.1,{id:id,type:'ball'}),ga=isoPart('gauge',x+22,y,z+26+2.6,1,{id:id,value:0.55});
  r.parts=[va,ga];r.inn=[x-18,y,z];r.out=[x+34,y,z+26];r.top=ga.ports.top;r.thru=[[x-18,y,z-4],[x-18,y,z+26],[x+34,y,z+26]]}
 else if(kind==='pretreatment'){var f=P('filter',-22,0,1),c=P('carbon',20,0,1);r.parts=[f,c];r.inn=f.ports.in;r.out=c.ports.out;r.top=f.ports.top;
  r.link=isoPipe(isoRoute(f.ports.out,c.ports.in,'xyz',{via:[[f.ports.out[0]+6,f.ports.out[1],f.ports.out[2]]]}),{r:2,to:id,caps:false})}
 else if(kind==='generation'){var ro=P('ro',-52,-14,0.86),ed=P('edi',34,-34,0.9);r.parts=[ed,ro];r.inn=ro.ports.in;r.out=ed.ports.out;r.top=ro.ports.top;
  r.link=isoPipe(isoRoute(ro.ports.out,ed.ports.in,'zyx',{via:[[ro.ports.out[0]+4,ro.ports.out[1],ro.ports.out[2]]]}),{r:2,to:id,caps:false})}
 else if(kind==='storage'){var t=P('tank',0,0,1.12);r.parts=[t];r.inn=t.ports.in;r.out=t.ports.out;r.top=t.ports.top;r.ret=t.ports.ret}
 else if(kind==='loop'){var pu=P('pump',-26,10,1),uv=P('uv',-2,-16,0.9),an=isoPart('analyzer',x+34,y+22,z,0.9,{id:'mon'});
  r.parts=[uv,pu,an];r.inn=pu.ports.in;r.out=uv.ports.out;r.top=uv.ports.top;r.mon=an.ports.sample;
  r.link=isoPipe(isoRoute(pu.ports.out,uv.ports.in,'zyx'),{r:2,to:id,caps:false})}
 else {var o1=P('outlet',-34,0,0.9),o2=P('outlet',0,0,0.9),o3=P('outlet',34,0,0.9);r.parts=[o1,o2,o3];r.drops=[o1.ports.in,o2.ports.in,o3.ports.in];r.top=o1.ports.top}
 return r}
/* A paper slab: a stack of sheets, each a little inset over the one below, sheet edges as hairlines on the faces */
function srSlab(x,y,z,w,d){var out='',n=Math.max(2,Math.round(z/9)),h=z/n,i;
 for(i=0;i<n;i++){var ins=(n-1-i)*0,o=[x-w/2+ins,y-d/2+ins,i*h];
  out+='<path class="aq-strata-run__slab'+(i===n-1?' is-top':'')+'" d="'+isoBoxD(o,w-2*ins,d-2*ins,h)+'"/>'}
 return '<g class="aq-strata-run__stack">'+out+'</g>'}
function srScene(S,mini){
 var n=S.length,P=140,A=106.8,B=54.8,Z0=14+9*(n-1),pts=[],slabs='',body='',stg=[];
 var at=function(i){return mini?[0,0,22]:[A*i,-B*i,Z0-9*i]};
 S.forEach(function(s,i){var c=at(i),k=SR_ART.indexOf(s.art)>=0?s.art:SR_ART[Math.min(i,5)],w=k==='generation'?124:k==='outlets'?118:k==='feed'?60:100,d=k==='generation'?84:70;
  slabs+=srSlab(c[0],c[1],c[2],w,d);stg.push(srStage(k,c[0],c[1],c[2],'s'+i));
  pts.push([c[0]-w/2,c[1]-d/2,0],[c[0]+w/2,c[1]+d/2,0],[c[0]-w/2,c[1]+d/2,0],[c[0]+w/2,c[1]-d/2,0],[c[0],c[1],c[2]+110])});
 if(mini){var g=stg[0];return {svg:slabs+(g.thru?isoPipe(g.thru,{r:2.4,caps:'start',flow:false}):'')+g.parts.join('')+(g.link||''),pts:pts,stg:stg}}
 /* the water: feed in, stage to stage down the terrace, the loop header over the outlets and back to the tank */
 var lead=[],tank=null,loopOut=null,mon=null;
 stg.forEach(function(g,i){var c=at(i),id='s'+i;
  if(i===0&&g.thru)body+=isoPipe(g.thru,{r:2.4,to:id,caps:'start',flanges:'ends'});
  body+=g.parts.join('')+(g.link||'');
  if(g.ret)tank=g;if(g.mon)mon=g.mon;
  var nx=stg[i+1];if(!nx)return;var a=g.out||g.inn,b=nx.inn,nc=at(i+1),id2='s'+(i+1);
  if(nx.drops){/* distribution header: over the outlets, a drop to each, then back overhead to the tank */
   var hz=nc[2]+74,hy=nc[1]-22,x0=a[0]+8;loopOut=a;
   body+=isoPipe(isoRoute(a,[nx.drops[0][0],hy,hz],'xzy',{via:[[x0,a[1],a[2]],[x0,a[1],hz]]}).concat([[nx.drops[2][0]+26,hy,hz]]),{r:2.2,to:id2,caps:false});
   nx.drops.forEach(function(p){body+=isoPipe([[p[0],hy,hz],[p[0],p[1],hz],p],{r:1.6,to:id2,caps:false})});
   if(tank)body+=isoPipe([[nx.drops[2][0]+26,hy,hz],[nx.drops[2][0]+26,hy-22,hz],[nx.drops[2][0]+26,hy-22,hz+22],[tank.ret[0],hy-22,hz+22],[tank.ret[0],tank.ret[1],hz+22],tank.ret],{r:2.2,caps:false,cls:'aq-strata-run__return'});
   return}
  var mx=(a[0]+b[0])/2;
  body+=isoPipe(isoRoute(a,b,'xzy',{via:[[mx>a[0]+6?mx:a[0]+10,a[1],a[2]],[mx>a[0]+6?mx:a[0]+10,a[1],b[2]]]}),{r:2.4,to:id2,caps:false})});
 return {svg:slabs+body,pts:pts,stg:stg,at:at,P:P}}
LOOKS['strata-run']=function(b,H){
 var S=(b.stages||[]).slice(0,6),n=S.length;if(!n)return BLOCKS.diagram(b,H);
 var sc=srScene(S),P=140,W=P*n,org=[52,0],bx=isoBounds(sc.pts,0),top=bx.y-14,Hh=Math.ceil(bx.h+30);org=[52,-top];
 /* leaders: from each stage's top part straight up to the label row (the label's left hairline carries it on) */
 var lead='',stream='';
 sc.stg.forEach(function(g,i){var p=isoP(g.top),x=P*i+1.5-org[0];
  lead+='<path class="aq-strata-run__lead" data-stage="s'+i+'" d="M'+isoF(x)+' '+isoF(-org[1])+'V'+isoF(p[1]-14)+'H'+isoF(p[0])+'V'+isoF(p[1]-2)+'"/>'
   +'<circle class="aq-strata-run__dot" data-stage="s'+i+'" cx="'+isoF(p[0])+'" cy="'+isoF(p[1]-2)+'" r="2.2"/>'});
 /* the stream: a cut-paper band behind the terrace, from the top left to the bottom right */
 var c0=isoP(sc.at(0)),c1=isoP(sc.at(n-1)),u=function(p,dx,dy){return isoF(p[0]+org[0]+dx)+' '+isoF(p[1]+org[1]+dy)};
 stream='<path class="aq-strata-run__edge" d="M'+u(c0,-140,-30+6)+'C'+u(c0,60,-70+6)+' '+u(c1,-220,-40+6)+' '+u(c1,120,-50+6)+'L'+u(c1,140,70+6)+'C'+u(c1,-120,120+6)+' '+u(c0,120,40+6)+' '+u(c0,-140,80+6)+'Z"/>'
  +'<path class="aq-strata-run__stream" d="M'+u(c0,-140,-30)+'C'+u(c0,60,-70)+' '+u(c1,-220,-40)+' '+u(c1,120,-50)+'L'+u(c1,140,70)+'C'+u(c1,-120,120)+' '+u(c0,120,40)+' '+u(c0,-140,80)+'Z"/>';
 /* the signal bus: monitoring and controls along the foot of the terrace, a riser into every slab */
 var bus='',fy=function(i){var c=sc.at(i);return [c[0],c[1]+48,0]},bp=[];for(var i=0;i<n;i++)bp.push(isoP(fy(i)));
 bus='<path class="aq-strata-run__bus" d="M'+isoT([bp[0][0]-60,bp[0][1]-(60*0.577)])+bp.map(function(p){return 'L'+isoT(p)}).join('')+'"/>'
  +bp.map(function(p,i){var c=sc.at(i),q=isoP([c[0],c[1]+35,c[2]*0.5]);return '<path class="aq-strata-run__bus is-riser" d="M'+isoT(p)+'L'+isoT(q)+'"/><circle class="aq-strata-run__node" cx="'+isoF(p[0])+'" cy="'+isoF(p[1])+'" r="2"/>'}).join('');
 var svg=isoSvg(W,Hh,'<g class="aq-strata-run__bus-g" data-iso-id="mon">'+bus+'</g>'+sc.svg+lead,'aq-strata-run__svg',{origin:org,under:stream});
 /* labels */
 var items=S.map(function(s,i){var k=SR_ART.indexOf(s.art)>=0?s.art:SR_ART[Math.min(i,5)],m=srScene([{art:k}],true),mb=isoBounds(m.pts,6);
  var mini=isoSvg(Math.round(mb.w),Math.round(mb.h),m.svg,'aq-strata-run__mini',{origin:[-mb.x,-mb.y]});
  /* phone pipe: where the slab's left and right corners sit (mid-height of the slab), as fractions of the drawing */
  var sw=k==='generation'?124:k==='outlets'?118:k==='feed'?60:100,sd=k==='generation'?84:70,cl=isoP([-sw/2,sd/2,11]),cr=isoP([sw/2,-sd/2,11]);
  var pipe='<span class="aq-strata-run__pp aq-strata-run__pp--iv"></span><span class="aq-strata-run__pp aq-strata-run__pp--ih"></span>'
   +(i<n-1?'<span class="aq-strata-run__pp aq-strata-run__pp--oh"></span><span class="aq-strata-run__pp aq-strata-run__pp--ov"></span>':'');
  var ly=((cl[1]-mb.y)/mb.h).toFixed(3),ry=((cr[1]-mb.y)/mb.h).toFixed(3);
  var t='<h3 class="aq-strata-run__t">'+(s.link&&wp(s.link)?'<a href="#'+e(s.link)+'" data-wp="'+e(s.link)+'">'+tx(s.t)+'</a>':tx(s.t))+'</h3>';
  return '<li class="aq-strata-run__stage" data-stage="s'+i+'" data-art="'+k+'" style="--ly:'+ly+';--ry:'+ry+'">'+idx(i)+t+(s.d?'<p class="aq-strata-run__d">'+tx(s.d)+'</p>':'')
   +'<span class="aq-strata-run__thumb" aria-hidden="true">'+mini+pipe+'</span></li>'}).join('');
 var base=b.base?'<p class="aq-strata-run__base" data-stage="mon"><span class="aq-strata-run__bus-key" aria-hidden="true"></span>'
  +(b.base_link&&wp(b.base_link)?'<a href="#'+e(b.base_link)+'" data-wp="'+e(b.base_link)+'">'+tx(b.base)+'</a>':'<span>'+tx(b.base)+'</span>')+'</p>':'';
 return sec(H+'<div class="aq-strata-run"><ol class="aq-strata-run__stages" role="list">'+items+'</ol>'
  +'<div class="aq-strata-run__fig">'+svg+'</div>'+base+'</div>'+(b.caption?'<p class="aq-small aq-prose">'+tx(b.caption)+'</p>':''),'aq-strata-run-sec')};
/* Hover or focus on a stage label lights its slab's equipment and leader (the base line lights the bus) */
(function(){
 function set(root,id){var svg=root.querySelector('.aq-strata-run__svg');if(!svg)return;root.classList.toggle('has-hot',!!id);
  [].forEach.call(svg.querySelectorAll('.is-hot'),function(el){el.classList.remove('is-hot')});
  if(id)[].forEach.call(svg.querySelectorAll('[data-iso-id="'+id+'"],[data-stage="'+id+'"]'),function(el){el.classList.add('is-hot')})}
 function over(ev){var t=ev.target.closest&&ev.target.closest('.aq-strata-run [data-stage]');var root=ev.target.closest&&ev.target.closest('.aq-strata-run');
  if(root&&(!t||!t.closest('svg')))set(root,t?t.getAttribute('data-stage'):null)}
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);
 ['mouseout','focusout'].forEach(function(k){document.addEventListener(k,function(ev){var root=ev.target.closest&&ev.target.closest('.aq-strata-run');if(root&&!root.contains(ev.relatedTarget))set(root,null)})});
})();
