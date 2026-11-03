/* Look "module-plinth" -> ModulePlinth (design-system/components/ModulePlinth): an options block (as: "modules") with a
   base, drawn as the options standing on that base. On a navy band one plinth (IsoKit) carries one module per option,
   level, left to right; one header pipe runs along the plinth's front and a riser leaves it for every module. Each
   module is drawn by its spot (storage-tank: two exchange vessels; ro-skid: an RO rack with its tank; loop: a tank,
   its pump and a point of use on a loop; anything else: a plain equipment module). A numbered tag stands over each
   module and the numbered caption cards sit under the drawing, one column per module. The base (b.base) is the
   caption under the header. Pointing at or focusing a card lights its module and riser and lifts the module.
   Pass 12 (concept 204, ind-personal-care.from-di): one plinth, real equipment, no blueprint sheet, no filler tile.
   Phones: the header becomes a vertical line down the left; each option branches off it with its own small drawing
   over its card; the fold applies on phones only, past b.fold.
   Fields, as options (modules): h, base, items [{t, d, spot, link}], fold, fold_noun (phones only). */
(function(){
var PH=10,HZ=5;
function mod(spot,cx,cy,z){var k=1.6,X=function(d){return cx+d*k},Y=function(d){return cy+d*k},o='';
 if(spot==='storage-tank')o=isoPart('filter',X(-14),Y(0),z,0.85*k,{bed:[]})+isoPart('filter',X(14),Y(4),z,0.85*k,{bed:[]});
 else if(spot==='ro-skid')o=isoPart('ro',X(-34),Y(-8),z,0.44*k)+isoPart('tank',X(28),Y(2),z,0.6*k);
 else if(spot==='loop'){var t=isoPart('tank',X(-22),Y(-2),z,0.58*k),p=isoPart('pump',X(6),Y(12),z,0.55*k),u=isoPart('outlet',X(34),Y(6),z,0.62*k);
  o=t+p+isoPipe([[X(-10),Y(10),z+8*k],[X(0),Y(10),z+8*k]],{r:1.3*k,caps:false,flow:false})+isoPipe([[X(14),Y(12),z+14*k],[X(26),Y(12),z+14*k],[X(26),Y(6),z+22*k]],{r:1.3*k,caps:false,flow:false})+u}
 else o='<path class="aq-iso__eq" d="'+isoBoxD([X(-20),Y(-20),z],40*k,40*k,46*k)+'"/><path class="aq-iso__thin" d="'+isoPoly([[X(-14),Y(20),z+8*k],[X(14),Y(20),z+8*k],[X(14),Y(20),z+38*k],[X(-14),Y(20),z+38*k]],1)+'"/>';
 return o}
function top(spot){return 1.6*(spot==='storage-tank'?66:spot==='ro-skid'?50:spot==='loop'?50:56)}
/* The plinth runs along the screen: u steps along world (1,-1) (level on the drawing), v along (1,1) (toward the
   viewer, straight down on the drawing), so one slab carries the modules side by side and the header runs level in
   front of it; the modules themselves stay isometric. F(u, v, z) -> world point. */
function F(u,v,z){return [u+v,-u+v,z]}
function slab(u0,u1,V){return '<g class="aq-iso__part" data-iso="plinth"><path class="aq-iso__eq" d="'+isoPoly([F(u0,-V,PH),F(u1,-V,PH),F(u1,V,PH),F(u0,V,PH)],1)+isoPoly([F(u0,V,0),F(u1,V,0),F(u1,V,PH),F(u0,V,PH)],1)+'"/>'
 +'<path class="aq-iso__thin" d="'+isoPoly([F(u0,V,PH-4),F(u1,V,PH-4)])+'"/></g>'}
var STEP=132,VV=44,HV=VV+12;
/* the whole set on one plinth (desktop) */
function scene(I){var n=I.length,u0=-STEP*0.62,u1=(n-1)*STEP+STEP*0.62,o='',marks=[];
 o+=slab(u0,u1,VV);
 o+=isoPipe([F(u0-30,HV,HZ),F(u1+30,HV,HZ)],{r:2.6,flanges:'ends',caps:true});
 I.forEach(function(it,i){var u=i*STEP,c=F(u,0,0),id='m'+i;
  o+=isoPipe([F(u,HV,HZ),F(u,HV,PH+12),F(u,24,PH+12)],{r:1.8,to:id,caps:false,id:id});
  o+='<g class="aq-module-plinth__blk" data-k="'+i+'">'+mod(it.spot||it.icon,c[0],c[1],PH).replace(/class="aq-iso__part"/g,'class="aq-iso__part" data-iso-id="'+id+'"')+'</g>';
  marks.push({k:i,p:isoP(F(u,0,PH+top(it.spot||it.icon)+10))})});
 o+=isoArrow(F(u1+16,HV,HZ),[1,-1,0]);
 var bx=isoBounds([F(u0-36,HV,0),F(u1+36,HV,0),F(u0,0,128),F(u1,0,128),F(u0,HV+4,-6)],12),w=Math.round(bx.w),h=Math.round(bx.h),org=[-bx.x,-bx.y];
 var tags=marks.map(function(mk){var a=isoPct(mk.p,w,h,org);return '<span class="aq-module-plinth__mk" data-k="'+mk.k+'" style="left:'+a.left+';top:'+a.top+'">'+(mk.k<9?'0':'')+(mk.k+1)+'</span>'}).join('');
 return '<div class="aq-iso-figure aq-module-plinth__fig" aria-hidden="true">'+isoSvg(w,h,o,'aq-iso--navy aq-module-plinth__svg',{origin:org})+tags+'</div>'}
/* one option alone on its piece of the plinth, with its riser (phones): the plinth cropped to the module plus a short
   margin each side, and shallower than the desktop slab, so the module fills the drawing instead of an empty slab */
var MU=56,MV=34,MH=MV+12;
function mini(it,i){var c=F(0,0,0),o=slab(-MU,MU,MV)+isoPipe([F(-MU-8,MH,HZ),F(MU+8,MH,HZ)],{r:2.2,caps:false,flow:false})+isoPipe([F(0,MH,HZ),F(0,MH,PH+12),F(0,24,PH+12)],{r:1.8,caps:false,flow:false})+mod(it.spot||it.icon,c[0],c[1],PH);
 var zt=PH+top(it.spot||it.icon)+10,bx=isoBounds([F(-MU-10,MH,0),F(MU+10,MH,0),F(-MU,-MV,zt),F(MU,-MV,zt),F(0,MH+4,-6)],6);
 var hy=isoP(F(0,MH,HZ))[1]-bx.y;
 return '<span class="aq-module-plinth__mini" style="--hy:'+(100*hy/bx.h).toFixed(1)+'%" aria-hidden="true">'+isoSvg(Math.round(bx.w),Math.round(bx.h),o,'aq-iso--navy',{origin:[-bx.x,-bx.y]})+'</span>'}
LOOKS['module-plinth']=function(b,H){var I=b.items||[],n=I.length;
 var cards=I.map(function(it,i){var lk=it.link&&wp(it.link);
  return fli('<li class="aq-module-plinth__card" data-k="'+i+'">'+mini(it,i)+'<span class="aq-module-plinth__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<h3 class="aq-module-plinth__t">'+(lk?'<a href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':tx(it.t))+'</h3>'+(it.d?'<p class="aq-module-plinth__d">'+tx(it.d)+'</p>':'')+'</li>',b,i)}).join('');
 var base=b.base?'<p class="aq-module-plinth__base">'+tx(b.base)+'</p>':'';
 return sec(H+'<div class="aq-module-plinth" style="--n:'+(n>4?3:n)+'">'+scene(I)+base+'<div class="aq-module-plinth__list">'+wFold(b,n,'<ol class="aq-module-plinth__cards">'+cards+'</ol>',b.fold_noun)+'</div></div>','aq-band--navy aq-module-plinth-sec')};
/* pointing at or focusing a card lights its module and riser */
function hot(w,k){[].forEach.call(w.querySelectorAll('[data-k]'),function(x){x.classList.toggle('is-hot',x.getAttribute('data-k')===k)});
 [].forEach.call(w.querySelectorAll('.aq-module-plinth__fig [data-iso-id]'),function(p){p.classList.toggle('is-lit',k!=null&&p.getAttribute('data-iso-id')==='m'+k)})}
if(typeof document!=='undefined'){
 var over=function(ev){var t=ev.target.closest&&ev.target.closest('.aq-module-plinth__card');if(!t)return;hot(t.closest('.aq-module-plinth'),t.getAttribute('data-k'))};
 var out=function(ev){var w=ev.target.closest&&ev.target.closest('.aq-module-plinth');if(w&&!w.contains(ev.relatedTarget))hot(w,null)};
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);document.addEventListener('mouseout',out);document.addEventListener('focusout',out)}
})();
