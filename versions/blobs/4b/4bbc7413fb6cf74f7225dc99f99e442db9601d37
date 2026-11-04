/* Look "loop-dock" -> LoopDock (design-system/components/LoopDock): a loop's options shown where they fit on the loop
   (pass 9b concept sys-storage.5: one navy schematic band of the loop, leader lines out to the option captions on
   limestone below). One isometric loop runs across a full-width navy band (IsoKit, navy hand): the storage tank (the
   base), a module skid with the loop pump, heat exchanger and analyser, UV on the supply after it, the loop main out to
   two points of use, one with its own cooler, and the return overhead back to the tank. Each option has a numbered
   marker on the part it adds and a leader from that part down to its caption in the row under the band; pointing at a
   caption lights its part and leader. The base is named beside the tank.
   Phones: the same band, full bleed, cropped to the drawing (the loop, its skid and every option's marker; CROP, measured
   once from the fixed scene) so it runs about twice the size of the whole band scaled down; markers 14 px, no leaders;
   the base's name under the plate; the captions stacked (pass 12, S9).
   Fields (an options block): h, intro, items [{t, d, spot | icon, part, link}], spot (base glyph), base (default
   "Base skid"), fold, fold_noun. part: the drawing ids the option adds, an array of "uv", "cool", "mod" (default by
   position: uv, mod, cool; order the items left to right along the loop so the leaders never cross). The fold applies on phones only. */
(function(){
var VW=1200,VH=560,DEF=[['uv'],['mod','uv'],['cool']],CROP=[380,14,630,510];
function scene(){
 var ta=isoPart('tank',0,0,0,1,{id:'base'}),sk=isoPart('skid',44,-26,0,1,{w:200,d:52,id:'mod'}),dz=9,
  pu=isoPart('pump',66,0,dz,1,{id:'mod'}),hx=isoPart('hx',104,-24,dz,1,{id:'mod'}),uv=isoPart('uv',168,0,dz,1,{id:'uv'}),
  an=isoPart('analyzer',232,16,dz,1,{id:'mod'});
 var o1=isoPart('outlet',300,10,0,1,{id:'pou'}),o2=isoPart('outlet',372,10,0,1,{id:'pou'}),co=isoPart('hx',336,-34,0,0.6,{id:'cool'});
 var ZM=74,ZR=118,p=[];
 p.push(isoPipe(isoRoute(ta.ports.out,pu.ports.in,'xyz'),{to:'mod',flanges:false}));
 p.push(isoPipe(isoRoute(pu.ports.out,hx.ports.in,'zxy',{via:[[pu.ports.out[0],pu.ports.out[1],60]]}),{to:'mod',flanges:false}));
 var h=hx.ports.out,u=uv.ports.in;
 p.push(isoPipe([h,[h[0]+6,h[1],h[2]],[h[0]+6,h[1],u[2]+8],[u[0],h[1],u[2]+8],[u[0],u[1],u[2]+8],u],{to:'uv',flanges:false}));
 var uo=uv.ports.out,i1=o1.ports.in,i2=o2.ports.in,c1=co.ports.in,c2=co.ports.out;
 var main=[uo,[uo[0],uo[1],ZM],[i1[0],uo[1],ZM],[i2[0]+30,uo[1],ZM]];
 p.push(isoPipe(main,{to:'pou',flanges:false}));
 p.push(isoPipe([[i1[0],uo[1],ZM],[i1[0],i1[1],ZM],i1],{to:'pou',flanges:false,r:1.6}));
 p.push(isoPipe([[c1[0],uo[1],ZM],[c1[0],c1[1],ZM],c1],{to:'cool',flanges:false,r:1.6}));
 p.push(isoPipe([c2,[c2[0]+8,c2[1],c2[2]],[c2[0]+8,c2[1],i2[2]+6],[i2[0],c2[1],i2[2]+6],[i2[0],i2[1],i2[2]+6],i2],{to:'cool',flanges:false,r:1.6}));
 var e0=[i2[0]+30,uo[1],ZM],rt=ta.ports.ret;
 var ret=isoPipe([e0,[e0[0],-70,ZM],[e0[0],-70,ZR],[rt[0],-70,ZR],[rt[0],rt[1],ZR],rt],{to:'base',flanges:false,caps:false});
 var inner=[ret,ta,sk,pu,hx,an,p[0],p[1],uv,p[2],co,p[3],p[4],p[5],o1,o2,p[6],
  isoArrow([i1[0]-20,uo[1],ZM],'x',{size:5}),isoArrow([200,-70,ZR],'-x',{size:5})].join('');
 var A={uv:uv.ports.top,cool:co.ports.top,mod:[238,26,dz],base:[-22,0,30],pou:o1.ports.top};
 var bx=isoBounds([[0,0,ZR+20],[-20,20,0],[20,-20,0],[44,26,0],[400,40,0],[400,-80,ZR],[0,-80,ZR]],10),S=Math.min(VW/bx.w,VH/bx.h)*0.94,
  ox=-bx.x*S+(VW-bx.w*S)/2+90,oy=-bx.y*S+(VH-bx.h*S)/2;
 function at(k){var q=isoP(A[k]);return [ox+q[0]*S,oy+q[1]*S]}
 return {g:'<g transform="translate('+ox.toFixed(1)+' '+oy.toFixed(1)+') scale('+S.toFixed(3)+')">'+inner+'</g>',at:at}}
LOOKS['loop-dock']=function(b,H){
 var I=b.items||[],n=I.length||1,sc=scene(),pg=wp(WP),marks='',leads='';
 var cards=I.map(function(it,i){var parts=it.part?[].concat(it.part):DEF[i%DEF.length],no=(i<9?'0':'')+(i+1),q=sc.at(parts[0]),g=wSpot(it.spot||it.icon,'','aq-loop-dock__glyph'),lk=it.link&&wp(it.link);
  marks+='<span class="aq-loop-dock__mk" data-c="'+i+'" style="left:'+(100*q[0]/VW).toFixed(2)+'%;top:'+(100*q[1]/VH).toFixed(2)+'%">'+no+'</span>';
  /* leader: from the part, down at a slant to the top of its caption column */
  var x1=VW*i/n+2,y1=VH;
  leads+='<path class="aq-loop-dock__lead" data-c="'+i+'" d="M'+q[0].toFixed(1)+' '+q[1].toFixed(1)+'V'+(VH-64)+'L'+x1.toFixed(1)+' '+(VH-8)+'V'+y1+'"/><circle class="aq-loop-dock__dot" data-c="'+i+'" cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="3.5"/>';
  var body='<p class="aq-loop-dock__no" aria-hidden="true"><span>'+no+'.</span>'+g+'</p><h3 class="aq-loop-dock__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="aq-loop-dock__d">'+tx(it.d)+'</p>':'');
  return fli('<li class="aq-loop-dock__card" data-c="'+i+'" data-parts="'+e(parts.join(' '))+'">',b,i)+(lk?'<a class="aq-loop-dock__body" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+body+'</a>':'<div class="aq-loop-dock__body">'+body+'</div>')+'</li>'}).join('');
 var bq=sc.at('base'),base=isVig(b.spot)?wSpot(b.spot,'','aq-spot--on-navy aq-loop-dock__bic'):'';
 var baseLab='<span class="aq-loop-dock__base" style="left:'+(100*bq[0]/VW).toFixed(2)+'%;top:'+(100*bq[1]/VH).toFixed(2)+'%">'+base+'<span>'+tx(b.base||'Base skid')+(pg&&pg.nav_label?' · '+tx(pg.nav_label):'')+'</span></span>';
 var svg=isoSvg(VW,VH,sc.g,'aq-iso--navy aq-loop-dock__svg',{});
 var lsvg='<svg class="aq-loop-dock__leads" viewBox="0 0 '+VW+' '+VH+'" preserveAspectRatio="none" aria-hidden="true" focusable="false">'+leads+'</svg>';
 var inner='<div class="aq-loop-dock" style="--n:'+n+'"><div class="aq-loop-dock__band"><div class="aq-loop-dock__plane" aria-hidden="true" style="--ca:'+CROP[2]+' / '+CROP[3]+';--cl:'+(100*CROP[0]/CROP[2]).toFixed(2)+'%;--ct:'+(100*CROP[1]/CROP[3]).toFixed(2)+'%;--cw:'+(100*VW/CROP[2]).toFixed(2)+'%;--ch:'+(100*VH/CROP[3]).toFixed(2)+'%"><div class="aq-loop-dock__zoom">'+svg+lsvg+marks+'</div></div>'+baseLab+'</div>'
  +'<ol class="aq-loop-dock__cards" role="list">'+cards+'</ol></div>';
 return sec(H+wFold(b,I.length,inner,b.fold_noun||'options'),'aq-band--limestone aq-loop-dock-sec')};
/* Pointing at an option lights the parts it adds (colour only) */
function hl(ev,on){var c=ev.target.closest&&ev.target.closest('.aq-loop-dock__card');if(!c||c.contains(ev.relatedTarget))return;var r=c.closest('.aq-loop-dock'),svg=r.querySelector('svg.aq-iso');
 (c.getAttribute('data-parts')||'').split(' ').forEach(function(id){[].forEach.call(svg.querySelectorAll('[data-iso-id="'+id+'"], [data-iso-to="'+id+'"]'),function(el){el.classList.toggle('is-lit',on)})});
 [].forEach.call(r.querySelectorAll('.aq-loop-dock__mk[data-c="'+c.getAttribute('data-c')+'"], .aq-loop-dock__leads [data-c="'+c.getAttribute('data-c')+'"]'),function(m){m.classList.toggle('is-on',on)});c.classList.toggle('is-on',on)}
document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)});
document.addEventListener('focusin',function(ev){hl(ev,true)});document.addEventListener('focusout',function(ev){hl(ev,false)});
})();
