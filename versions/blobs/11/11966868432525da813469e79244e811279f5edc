/* Look "fit-envelope" -> FitEnvelope (design-system/components/FitEnvelope): where the package fits and what it does
   not take, drawn as a boundary. Our polypropylene package (IsoKit: an RO rack and a flat-bottom PP tank on a closed
   PP skid, a sanitant drum beside it) stands inside a dashed envelope; a steel-blue temperature band at the envelope's
   foot gives the rated range (b.scale). Every exclusion row hangs outside the envelope as a numbered lockout tag, tied
   to the envelope's edge by its cord: the tag carries the need, why it does not fit, and what to look for instead.
   Pass 12 (concept 237, urs-guide.pp-rows; the same envelope idea as 238, ind-process.fit). Draw only what the block
   lists: one tag per row, no invented labels; the band shows the scale's two ends only.
   Fields:
   - a table (urs-guide): h, intro, cols [need, why, instead], rows [[need, why, instead | {t, link, intent}]];
   - or a spec (as: callouts, ind-process): rows [{p, v, m, link, link_label, in}] read as need = p, why = v,
     instead = m; a row with "in": true is not a tag: it is listed inside the envelope, under the band, as what fits
     (need bold, then why and instead each on its own line, then the link on its own line);
   - scale (look-only, DR-018): {from, to, unit, label}: the band's ends (from-to unit) and the envelope's label
     ("Fits"). Its figures must be stated by a reading field of the same block. No scale: no band, no label;
   - fold, fold_noun: phones only (tags past the fold behind "Show all").
   Phones (PhoneKit accordion, under 860 px): the envelope first (drawing and band), then the tags as one chain of
   52 px minimum heads (stub with eyelet and number, the need, chevron) hung on one cord from the envelope's foot; why and
   instead open under the tapped tag, one at a time (none open at first). Without script every tag shows open. */
(function(){
var FE_S=1;
/* sanitant drum (PP): a closed-head drum, two rolling hoops, a bung and a vent on the head */
function feDrum(x,y,z,s){var b=isoB(x,y,z,s),r=10,H=30;
 b.cyl(0,0,0,'z',H,r);[H*0.33,H*0.66].forEach(function(h){b.band(0,0,h,'z',r)});
 b.ring(0,0,H,'z',r-1.2);b.stub(-4,3,H,'z',2.2,1.5);b.stub(4,-3,H,'z',1.4,1);
 b.port.top=[0,0,H+2];return b.done('drum',{id:'drum'})}
/* the package: a closed PP skid carrying the RO rack, the PP tank on its plinth beside it, product pipe from the rack's
   outlet up into the tank's inlet, the drum standing on the floor in front. Back to front. */
function feScene(){var o='',sk=isoPart('skid',0,0,0,1,{w:132,d:58}),z=9;
 var ro=isoPart('ro',8,6,z,0.92,{id:'ro'}),tk=isoPart('tank',160,30,0,1.02,{id:'tank'});
 o+=sk+ro;
 var a=ro.ports.out,c=tk.ports.in;
 o+=isoPipe([a,[a[0]+14,a[1],a[2]],[a[0]+14,a[1],c[2]+8],[c[0],a[1],c[2]+8],[c[0],c[1],c[2]+8],[c[0],c[1],c[2]]],{r:1.8,flanges:'ends',to:'tank',from:'ro'});
 o+=tk;
 o+=feDrum(150,92,0,1.05);
 var bx=isoBounds([[0,0,0],[132,58,0],[0,58,0],[132,0,0],[0,0,72],[132,0,72],[182,10,92],[140,50,94],[160,102,0],[140,102,0],[182,30,0],[160,52,0]],8);
 return {svg:o,w:Math.round(bx.w),h:Math.round(bx.h),org:[-bx.x,-bx.y]}}
var FE_SCENE=null;
function feFig(){if(!FE_SCENE)FE_SCENE=feScene();var S=FE_SCENE;
 return isoSvg(S.w,S.h,S.svg,'aq-fit-envelope__svg',{origin:S.org})}
/* a row as {need, why, inst, k} from a table row (array) or a spec row (object) */
function feRow(r){if(Array.isArray(r))return {need:r[0],why:r[1],inst:r[2]};
 return {need:r.p,why:r.v,inst:r.m,go:r.link&&r.link_label?{t:r.link_label,link:r.link}:null,inside:!!r['in']}}
function feNum(i){return (i<9?'0':'')+(i+1)}
LOOKS['fit-envelope']=function(b,H){var C=b.cols||[],R=(b.rows||[]).map(feRow),sc=b.scale||null;
 var tags=R.filter(function(r){return !r.inside}),ins=R.filter(function(r){return r.inside}),n=tags.length;
 var lab=function(j,cls){return C[j]?'<span class="aq-fit-envelope__lab'+(cls?' '+cls:'')+'">'+tx(C[j])+'</span>':''};
 var go=function(r){var c=r.inst,lk=c&&typeof c==='object'&&c.link&&wp(c.link);
  var out=c==null||c===''?'':'<p class="aq-fit-envelope__inst">'+lab(2,'is-shown')+'<span class="aq-fit-envelope__iv">'+(lk?wlink(c.link,c.t,c.intent):tcell(c))+'</span></p>';
  if(r.go&&wp(r.go.link))out+='<p class="aq-fit-envelope__more">'+wlink(r.go.link,r.go.t)+'</p>';return out};
 var rows=tags.map(function(r,i){var no=feNum(i),stub='<span class="aq-fit-envelope__stub" aria-hidden="true"><span class="aq-fit-envelope__eye"></span><span class="aq-fit-envelope__no">'+no+'</span></span>';
  return fli('<li class="aq-fit-envelope__tag" data-pk-item="'+i+'" data-k="'+i+'"><span class="aq-fit-envelope__cord" aria-hidden="true"></span>'
   +'<h3 class="aq-fit-envelope__ph"><button type="button" class="aq-fit-envelope__head" data-pk-head>'+stub+'<span class="aq-fit-envelope__pt">'+lab(0,'aq-fit-envelope__sr')+tx(r.need)+'</span><span class="aq-phone-kit__chev" aria-hidden="true"></span></button></h3>'
   +'<div class="aq-fit-envelope__desk" data-pk-desk>'+stub+'<h3 class="aq-fit-envelope__t">'+lab(0,'aq-fit-envelope__sr')+tx(r.need)+'</h3></div>'
   +'<div class="aq-fit-envelope__body" data-pk-body>'+(r.why?'<p class="aq-fit-envelope__why">'+lab(1,'aq-fit-envelope__sr')+tx(r.why)+'</p>':'')+go(r)+'</div></li>',b,i)}).join('');
 var band='';
 if(sc&&sc.to!=null){var u=sc.unit?' '+sc.unit:'';
  band='<div class="aq-fit-envelope__band" aria-hidden="true"><span class="aq-fit-envelope__bar"></span><span class="aq-fit-envelope__end">'+tx(String(sc.from!=null?sc.from:''))+'</span><span class="aq-fit-envelope__end is-to">'+tx(String(sc.to)+u)+'</span></div>'}
 var inl=ins.length?'<ul class="aq-fit-envelope__in">'+ins.map(function(r){return '<li><span class="aq-fit-envelope__ip">'+tx(r.need)+'</span>'
  +(r.why?'<span class="aq-fit-envelope__iw">'+tx(r.why)+'</span>':'')
  +(r.inst?'<span class="aq-fit-envelope__im">'+tcell(r.inst)+'</span>':'')
  +(r.go&&wp(r.go.link)?wlink(r.go.link,r.go.t):'')+'</li>'}).join('')+'</ul>':'';
 var env='<div class="aq-fit-envelope__env">'+(sc&&sc.label?'<p class="aq-fit-envelope__fits" aria-hidden="true">'+tx(sc.label)+'</p>':'')
  +'<div class="aq-fit-envelope__hold"><div class="aq-iso-figure aq-fit-envelope__fig" aria-hidden="true">'+feFig()+'</div>'+band+inl+'</div></div>';
 return '<section class="aq-section aq-band--sunken aq-fit-envelope-sec"><div class="aq-in aq-stack-l">'+H
  +'<div class="aq-fit-envelope" style="--n:'+n+'">'+env
  +'<div class="aq-fit-envelope__tags">'+(C.length?'<p class="aq-fit-envelope__key" aria-hidden="true">'+[0,1,2].map(function(j){return '<span>'+tx(C[j]||'')+'</span>'}).join('')+'</p>':'')+wFold(b,n,'<ol class="aq-fit-envelope__list" data-pk-picker="accordion" data-pk-open="-1">'+rows+'</ol>',b.fold_noun||'tags')+'</div>'
  +'</div></div></section>'};
/* pointing at or focusing a tag lights its cord where it meets the envelope */
function feHot(w,k){[].forEach.call(w.querySelectorAll('.aq-fit-envelope__tag'),function(t){t.classList.toggle('is-hot',t.getAttribute('data-k')===k)})}
if(typeof document!=='undefined'){
 var over=function(ev){var t=ev.target.closest&&ev.target.closest('.aq-fit-envelope__tag');if(!t)return;feHot(t.closest('.aq-fit-envelope'),t.getAttribute('data-k'))};
 var out=function(ev){var w=ev.target.closest&&ev.target.closest('.aq-fit-envelope');if(w&&!w.contains(ev.relatedTarget))feHot(w,null)};
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);document.addEventListener('mouseout',out);document.addEventListener('focusout',out)}
})();
