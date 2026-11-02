/* Look "module-plinth" -> ModulePlinth (design-system/components/ModulePlinth): an options block (as: "modules") with a
   base, drawn as a set of modules standing on that base. On a navy band an isometric plinth (the base, b.base) carries
   one block per option in a row, each fed by a riser from the loop that runs along the plinth's front (IsoKit
   primitives on an iso sheet; the kit has no plain module block, so the blocks are drawn here from isoBoxD with a
   front panel and a nameplate line). A numbered marker floats over each block; the options read as numbered cards
   beside the drawing, each with its spot. Hovering or focusing a card lights its block and riser and lifts the block.
   Fields, as options (modules): h, base, items [{t, d, spot, link}], fold, fold_noun (phones only).
   Concept: sys-pw.4 (tactile objects you pick up) and STYLE-ATLAS hybrid 1 (figure plate with numbered parts). */
(function(){
function mpScene(n,base){
 var gap=64,bw=40,bd=40,ph=12,W=n*gap+24,D=64,Hs=[50,40,58,36,46,42,54,38],py=D+10,pz=6,parts=[],marks=[];
 var plinth='<g class="aq-iso__part" data-iso="plinth"><path class="aq-iso__eq" d="'+isoBoxD([0,0,0],W,D,ph)+'"/>'
  +'<path class="aq-iso__thin" d="'+isoPoly([[0,D,ph-4],[W,D,ph-4]])+'"/></g>';
 for(var i=0;i<n;i++){var x=16+i*gap,y=10,z=ph,h=Hs[i%Hs.length],id='m'+i,fy=y+bd;
  var face=isoPoly([[x+6,fy,z+8],[x+bw-6,fy,z+8],[x+bw-6,fy,z+h-8],[x+6,fy,z+h-8]],1);
  var plate=isoPoly([[x+10,fy,z+h-14],[x+bw-10,fy,z+h-14]]);
  var top=isoPoly([[x+8,y+8,z+h],[x+bw-8,y+8,z+h],[x+bw-8,y+bd-8,z+h],[x+8,y+bd-8,z+h]],1);
  parts.push('<g class="aq-iso__part aq-module-plinth__blk" data-iso="module" data-iso-id="'+id+'" data-k="'+i+'"><path class="aq-iso__eq" d="'+isoBoxD([x,y,z],bw,bd,h)+'"/>'
   +'<path class="aq-iso__thin" d="'+face+'"/><path class="aq-iso__acc" d="'+plate+'"/><path class="aq-iso__thin" d="'+top+'"/></g>');
  var riser=isoPipe([[x+bw/2,py,pz],[x+bw/2,py,z+16],[x+bw/2,fy,z+16]],{r:1.8,to:id,caps:false});
  parts.push(riser);
  var lp=isoP([x+bw/2,y+bd/2,z+h]);marks.push({k:i,p:[lp[0],lp[1]-26],s:lp});
 }
 var loop=isoPipe([[-34,py,pz],[W+34,py,pz]],{r:2.6,flanges:'ends',caps:true});
 var bl=isoP([W*0.3,py+44,0]);
 var inner=plinth+loop+parts.join('')+isoArrow([W+20,py,pz],'x')+marks.map(function(mk){return '<path class="aq-iso__leader-line" d="M'+isoT(mk.s)+'L'+isoT(mk.p)+'"/><circle class="aq-iso__leader-dot" cx="'+isoF(mk.s[0])+'" cy="'+isoF(mk.s[1])+'" r="1.6"/>'}).join('');
 var bx=isoBounds([[-40,0,0],[W+40,0,0],[-40,py+4,0],[W+40,py+4,0],[0,0,90],[W,0,90]],22),w=Math.round(bx.w),hh=Math.round(bx.h+10),org=[-bx.x,-bx.y+10];
 var labs=marks.map(function(mk){var a=isoPct(mk.p,w,hh,org);return '<span class="aq-module-plinth__mk" data-k="'+mk.k+'" style="left:'+a.left+';top:'+a.top+'">'+(mk.k<9?'0':'')+(mk.k+1)+'</span>'}).join('');
 var bp=isoPct(bl,w,hh,org);
 return '<div class="aq-iso-figure aq-module-plinth__fig" aria-hidden="true">'+isoSvg(w,hh,inner,'aq-iso--navy aq-module-plinth__svg',{origin:org,under:isoSheet(w,hh,{grid:'iso',m:6,band:0,gridStep:22})})+labs
  +(base?'<span class="aq-module-plinth__base" style="left:'+bp.left+';top:'+bp.top+'">'+e(base)+'</span>':'')+'</div>'}
LOOKS['module-plinth']=function(b,H){var I=b.items||[],n=I.length;
 var cards=I.map(function(it,i){var lk=it.link&&wp(it.link),sp=wSpot(it.spot||it.icon,'s','aq-module-plinth__spot');
  return fli('<li class="aq-module-plinth__card" data-k="'+i+'"><span class="aq-module-plinth__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'+sp
   +'<h3 class="aq-module-plinth__t">'+(lk?'<a href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':tx(it.t))+'</h3>'+(it.d?'<p class="aq-module-plinth__d">'+tx(it.d)+'</p>':'')+'</li>',b,i)}).join('');
 return sec(H+'<div class="aq-module-plinth">'+mpScene(n,b.base)+'<div class="aq-module-plinth__list">'+wFold(b,n,'<ol class="aq-module-plinth__cards">'+cards+'</ol>',b.fold_noun)+'</div></div>','aq-band--navy aq-module-plinth-sec')};
})();
