/* Look "tank-ga" -> TankGa (design-system/components/TankGa): the tank and pipework parameters read off one general
   arrangement (GA) sheet (pass 12 concept 230, sys-storage.3). A paper sheet holds the section head at its top left, an
   IsoKit line drawing of the storage set under it (the PP tank on legs with its vent filter, the spray ball and the
   water line drawn hidden inside, the outlet to the loop pump with a drain valve on the suction, the pump discharge
   rising through a double tube sheet exchanger spool and out to the loop, the return falling back to the spray ball;
   every run plain PP pipe with socket-fused couplings, no flanges), numbered tags on leaders, one per parameter, and
   the parameters as a ruled key down the right, one row per tag. The budget row sits in the title block across the foot
   of the sheet, with the brand and the caption, as the concept asks (it names no part).
   Pointing at, focusing or clicking a row selects it: its tag fills, its leader and part turn flow (selection persists).
   Phones: the drawing is a 220 px strip held under the header (PhoneKit sticky figure, zoom 1): the whole set fitted,
   the tag and part of the row on the reading line lit, that row selected as on desktop; every row shows (S7: never fold a tagged row), as a
   compact key (tag, parameter, value, basis at 14 px); the title block closes the sheet as a full-width card.
   Fields (a spec block): h, caption (eyebrow and title block), rows [{p, v, m, link, link_label}], anchor, nav.
   Added: rows[].part, the part a row is tagged to: "volume" (dimension), "contact" (shell), "surface" (inside wall at the
   water line), "joint" (a fused coupling), "design" (the head), "flush" (drain valve), "hx" (exchanger), "pump", "spray",
   or "budget" (the title block). A row without a known part is tagged to the shell. fold is ignored (S7). */
(function(){
var K='aq-tank-ga';
/* the scene, in IsoKit world units; tags[part] = {a: 3D anchor, t: 2D tag point (screen, isoP space)} */
function scene(){var o=[],S=1.5;
 var tk=isoPart('tank',0,0,0,S,{id:'tank'});
 var pu=isoPart('pump',90,0,0,1,{id:'pump'});
 /* suction: tank outlet down and across to the pump, a drain valve on a short branch */
 var to=tk.ports.out,pi=pu.ports.in,xs=56,xd=66;
 var suc=isoPipe([to,[xs,0,to[2]],[xs,0,pi[2]],pi],{r:2.4,id:'tank',to:'pump',caps:false});
 var dr=isoPipe([[xd,0,pi[2]],[xd,20,pi[2]]],{r:1.8,id:'flush',flow:false,caps:'end'}),dv=isoPart('valve',xd,13,pi[2],0.9,{id:'flush',rot:1});
 /* discharge: up, across through the exchanger spool, out to the loop */
 var po=pu.ports.out,zS=66,yS=po[1],hx0=146,hx1=204,xe=240;
 var sup=isoPipe([po,[po[0],yS,zS],[hx0,yS,zS]],{r:2.4,id:'pump',to:'hx',caps:false});
 var out=isoPipe([[hx1,yS,zS],[xe,yS,zS]],{r:2.4,id:'hx',to:'loop',caps:'end'});
 /* return: from the loop, back over the set and down into the spray ball nozzle */
 var ti=tk.ports.in,zR=150,ret=isoPipe([[xe,ti[1],zR],[ti[0],ti[1],zR],ti],{r:2.4,id:'spray',to:'tank',caps:'start'});
 /* the exchanger spool: shell, double tube sheet at each end (two rings), plain tube ends, two service stubs */
 var hb=isoB(0,0,0,1),hr=8.5,L=hx1-hx0;
 hb.cyl(hx0+3,yS,zS,'x',L-6,hr);hb.band(hx0+3,yS,zS,'x',hr+1.4);hb.band(hx0+6,yS,zS,'x',hr+1.4);hb.band(hx1-6,yS,zS,'x',hr+1.4);hb.band(hx1-3,yS,zS,'x',hr+1.4);
 hb.cyl(hx0,yS,zS,'x',3,3.6);hb.cyl(hx1-3,yS,zS,'x',3,3.6);
 hb.cyl(hx0+14,yS,zS+hr-1,'z',7,2);hb.cyl(hx1-14,yS,zS+hr-1,'z',7,2);
 hb.cyl(hx0+14,yS,zS+hr+5,'z',2.2,2.8);hb.cyl(hx1-14,yS,zS+hr+5,'z',2.2,2.8);
 var hx=hb.done('hx',{id:'hx'});
 /* socket-fused couplings: short sleeves a little proud of the pipe */
 function cpl(p,ax,id){var c=isoCylD(isoV.sub(p,isoV.mul(isoAx(ax),1.6)),ax,3.2,3.4);return '<g class="aq-iso__part" data-iso="coupling" data-iso-id="'+id+'">'+isoPath(c[0]+c[1],'aq-iso__eq')+'</g>'}
 var cps=cpl([118,yS,zS],'x','joint')+cpl([222,yS,zS],'x','hx')+cpl([96,ti[1],zR],'x','spray')+cpl([200,ti[1],zR],'x','spray')+cpl([po[0],yS,46],'z','pump')+cpl([xs,0,24],'z','tank');
 /* vent filter on the head: a cartridge housing on the small top nozzle */
 var vz=127,vf=isoB(0,0,0,1);vf.cyl(-10.5,-6,vz-3,'z',3,2.4);vf.cyl(-10.5,-6,vz,'z',13,4.6);vf.band(-10.5,-6,vz+3,'z',4.6);vf.cyl(-10.5,-6,vz+13,'z',2,3);
 var vent=vf.done('vent',{id:'vent'});
 /* inside the tank, hidden: the water line, the dip pipe and the spray ball with its jets */
 var bc=[ti[0],ti[1],108],bp=isoP(bc),hid=isoPath(isoBandD([0,0,72],'z',29),'aq-iso__hid')+isoPath(isoPoly([[ti[0],ti[1],ti[2]-6],[bc[0],bc[1],bc[2]+3.5]]),'aq-iso__hid');
 var jets='';[[-26,10,88],[-12,24,80],[6,28,78],[24,18,82],[28,-6,94],[-22,-16,96]].forEach(function(q){var a=isoP(q),dx=a[0]-bp[0],dy=a[1]-bp[1],l=Math.sqrt(dx*dx+dy*dy)||1;
  jets+='M'+isoT([bp[0]+dx/l*5,bp[1]+dy/l*5])+'L'+isoT(a)});
 var ball='<g class="'+K+'__inside" data-iso-id="spray">'+hid+'<circle class="aq-iso__eq" cx="'+isoF(bp[0])+'" cy="'+isoF(bp[1])+'" r="3.6"/><path class="aq-iso__hid '+K+'__jet" d="'+jets+'"/></g>';
 /* the volume: a dimension on the shell's straight side */
 var dim=isoDim([24,-24,24],[24,-24,108],{off:[16,-16,0]});
 o.push(tk,dr,dv,suc,pu,sup,hx,out,ret,cps,vent,ball,dim,isoArrow([230,yS,zS],'x'),isoArrow([228,ti[1],zR],'-x'),isoArrow([ti[0],ti[1],138],'-z'));
 var dm=dim.mid,T={
  spray:{a:bc,t:[-60,-171]},design:{a:[-26,0,118],t:[-92,-140]},contact:{a:[-4,30,40],t:[-92,-84]},surface:{a:[18,26,72],t:[-92,-40]},
  volume:{p:dm,t:[dm[0]+14,dm[1]-18]},flush:{a:[xd,20,pi[2]],t:[30,56]},pump:{a:[118,0,26],t:[130,64]},
  joint:{a:[118,yS,zS+3.4],t:[96,-58]},hx:{a:[176,yS,zS+hr],t:[196,-62]}};
 for(var k in T){var q=T[k];q.s=q.p||isoP(q.a)}
 var lead='';for(k in T){var q2=T[k];lead+='<g class="'+K+'__lead" data-part="'+k+'"><path vector-effect="non-scaling-stroke" d="M'+isoT(q2.s)+'L'+isoT(q2.t)+'"/><circle cx="'+isoF(q2.s[0])+'" cy="'+isoF(q2.s[1])+'" r="1.6"/></g>'}
 var x0=-100,y0=-186,w=322,h=267;
 return {inner:o.join('')+lead,tags:T,w:w,h:h,org:[-x0,-y0]}}
LOOKS['tank-ga']=function(b,H){var R=b.rows||[],S=scene(),drawn=[],bud=null;
 R.forEach(function(r,i){if(r.part==='budget'){if(!bud)bud={r:r,i:i};return}drawn.push({r:r,i:i,part:S.tags[r.part]?r.part:'contact'})});
 var head=wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro});
 function num(j){return (j<9?'0':'')+(j+1)}
 var used={},tags=drawn.map(function(d,j){var q=S.tags[d.part],a=isoPct(q.t,S.w,S.h,S.org);used[d.part]=1;
  return '<span class="'+K+'__tag" data-i="'+j+'" data-pk-key="'+j+'" style="left:'+a.left+';top:'+a.top+'">'+num(j)+'</span>'}).join('');
 /* leaders for parts no row names stay out of the drawing */
 var inner=S.inner.replace(/<g class="aq-tank-ga__lead" data-part="([a-z]+)">.*?<\/g>/g,function(m,p){return used[p]?m:''});
 var fig='<div class="'+K+'__fig" aria-hidden="true" data-pk-fig><div class="'+K+'__pan" data-pk-pan>'+isoSvg(S.w,S.h,inner,K+'__svg aq-iso--raised',{origin:S.org})+tags+'</div></div>';
 var rows=drawn.map(function(d,j){var r=d.r,lk=r.link&&wp(r.link)?' <a class="'+K+'__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':'';
  return '<li class="'+K+'__row" tabindex="0" data-i="'+j+'" data-pk-row="'+j+'" data-part="'+d.part+'"><span class="'+K+'__n" aria-hidden="true">'+num(j)+'</span>'
   +'<h3 class="'+K+'__p">'+tx(r.p)+'</h3><p class="'+K+'__v">'+tx(r.v)+'</p>'+(r.m||lk?'<p class="'+K+'__m">'+tx(r.m||'')+lk+'</p>':'')+'</li>'}).join('');
 var blk='<div class="'+K+'__block"><span class="'+K+'__brand" aria-hidden="true">Aquemi</span><span class="'+K+'__cap" aria-hidden="true">'+tx(b.caption||'')+'</span>';
 if(bud){var r=bud.r,lk=r.link&&wp(r.link)?'<a class="'+K+'__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':'';
  blk+='<div class="'+K+'__budget"><h3 class="'+K+'__bl">'+tx(r.p)+'</h3><p class="'+K+'__bv">'+tx(r.v)+'</p>'+(r.m||lk?'<p class="'+K+'__bm">'+(r.m?'<span>'+tx(r.m)+'</span>':'')+lk+'</p>':'')+'</div>'}
 blk+='</div>';
 var body='<div class="'+K+'" data-pk-sticky data-pk-h="220" data-pk-zoom="1"><div class="'+K+'__head">'+head+'</div>'+fig
  +'<ol class="'+K+'__rows" role="list">'+rows+'</ol>'+blk+'</div>';
 return sec(body,K+'-sec')};
/* Selection shared by the tags, the leaders, the parts and the rows (works without motion; CSS transitions only).
   Ported from Subframe Motion "Image hotspots" (atlas-hotspots), MIT, (c) 2026 Subframe (kept: one selection shared by
   the numbered markers and the list, the chosen marker filling and growing to 1.12, the list row taking the accent;
   replaced: the print with the IsoKit GA drawing, the detail card with the parameter's own row and its leader). */
(function(){
 function show(w,it){if(!w)return;var i=it?it.getAttribute('data-i'):null,pt=it?it.getAttribute('data-part'):null;w.classList.toggle('is-pointing',!!it);
  [].forEach.call(w.querySelectorAll('.'+K+'__tag, .'+K+'__row'),function(x){x.classList.toggle('is-on',x.getAttribute('data-i')===i)});
  [].forEach.call(w.querySelectorAll('.'+K+'__lead'),function(x){x.classList.toggle('is-on',x.getAttribute('data-part')===pt)});
  [].forEach.call(w.querySelectorAll('svg.aq-iso [data-iso-id]'),function(x){x.classList.toggle('is-on',!!pt&&x.getAttribute('data-iso-id')===({volume:'tank',contact:'tank',surface:'tank',design:'tank'}[pt]||pt))})}
 window.AQtankGa={show:show};
 function at(ev){return ev.target.closest&&ev.target.closest('.'+K+'__row')}
 document.addEventListener('pointerover',function(ev){var it=at(ev);if(it&&ev.pointerType!=='touch')show(it.closest('.'+K),it)});
 document.addEventListener('focusin',function(ev){var it=at(ev);if(it)show(it.closest('.'+K),it)});
 document.addEventListener('click',function(ev){var it=at(ev);if(it)show(it.closest('.'+K),it)});
 document.addEventListener('pk:change',function(ev){var w=ev.target;if(!w.classList||!w.classList.contains(K))return;
  show(w,ev.detail&&ev.detail.on?w.querySelector('.'+K+'__row[data-i="'+ev.detail.key+'"]'):null)});
})();
})();
