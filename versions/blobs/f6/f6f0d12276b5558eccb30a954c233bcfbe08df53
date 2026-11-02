/* Look "cutaway-rail" -> CutawayRail (design-system/components/CutawayRail): an evidence table read beside one sticky
   drawing. Left, a close cutaway of the plant (IsoKit on navy: a section of product-contact pipe cut open, the loop with
   a point-of-use branch and its valve, an analyser on the line, the control panel, the qualification binders) stays in
   view; right, one card per standard runs down a rail. The card being read (the one crossing the middle of the
   viewport, or the one under the pointer or focus) is the active one: its rail node fills, the "active" tag over the
   drawing names it, and the parts it governs light in flow with a callout at the first of them.
   Fields, as a table: cols [standard, what we design to, proof, where we show it], rows (cells strings or {t, link}),
   fold, fold_noun. New optional fields: tag (the word before the active standard's code on the drawing's tag, e.g.
   "Active"); parts, one entry per row, the drawn parts the row governs, space-separated:
   mat (product-contact pipe, drawn plain: no joint profile), loop (tank and loop), pov (point-of-use branch, its valve and dead leg), ana (analyser),
   ctl (control panel), docs (binders and clipboard). A row without parts lights nothing.
   Desktop shows every card (the rail is the reading); the fold applies on phones, where the drawing is a band above
   the cards and each card lights its parts as it passes. */
function crScene(){
 var tk=isoPart('tank',0,0,0,1.2,{id:'loop'}),pn=isoPart('panel',150,-30,0,1.15,{id:'ctl'});
 var o=tk.ports.out,y1=96,x2=230,z=o[2];
 var sup=isoPipe([o,[o[0]+18,o[1],z],[o[0]+18,y1,z],[x2,y1,z]],{r:3.2,bend:9,id:'loop',to:'loop',caps:false,flanges:'all'});
 /* point-of-use branch off the loop up and over to the outlet (its length is the dead leg), a diaphragm valve on the loop */
 var bx=150,ou=isoPart('outlet',bx+10,y1+46,0,1.1,{id:'pov'});
 var br=isoPipe(isoRoute([bx,y1,z],ou.ports.in,'zyx'),{r:2,id:'pov',caps:false,flow:false});
 var vl=isoPart('valve',bx+44,y1,z,1.4,{id:'pov'});
 var an=isoPart('analyzer',96,y1+34,0,1.2,{id:'ana'});
 var smp=isoPipe(isoRoute([96,y1,z],an.ports.sample||[96,y1+28,z+10],'yzx'),{r:1.2,wall:false,id:'ana',caps:false,flow:false});
 var bd=isoPart('binder',-20,150,0,1.25,{id:'docs'}),cb=isoPart('clipboard',30,176,0,1.2,{id:'docs'});
 /* product-contact pipe cut open in the foreground: thick wall shown at the cut; no joint, bead or band is drawn on it
    while the joining method is open (DR-018, FD-18; as JointMacro) */
 var cy=y1+110,cz=26,L=150,x0=60;
 var body=isoCylD([x0,cy,cz],'x',L,13),inn=isoRingD([x0+L,cy,cz],'x',9.5),out=isoRingD([x0+L,cy,cz],'x',13);
 var mat='<g class="aq-iso__part" data-iso-id="mat">'+isoPath(body[0]+body[1],'aq-iso__eq')
  +isoPath(out,'aq-iso__eq aq-iso__eq--alt')+isoPath(inn,'aq-iso__eq')+isoPath(isoRingD([x0+L,cy,cz],'x',11.2),'aq-iso__hid')+'</g>';
 var water='<path class="aq-iso__flow" d="M'+isoT(isoP([x0+6,cy,cz]))+' L'+isoT(isoP([x0+L-2,cy,cz]))+'" data-iso-to="mat"/>';
 var inner=[tk,pn,sup,vl,smp,an,br,bd,cb,ou,mat,water].join('');
 var pts=[[-40,-30,0],[0,0,110],[170,-50,70],[x2+10,y1,z],[bx+20,y1+60,0],[-50,170,0],[60,200,0],[x0,cy+16,cz],[x0+L+4,cy,cz],[x0+L,cy+14,cz-14],[x0,cy-14,cz+14]],bxx=isoBounds(pts,18),W=Math.round(bxx.w),H=Math.round(bxx.h),org=[-bxx.x,-bxx.y];
 function at(p){return isoPct(isoP(p),W,H,org)}
 var A={mat:at([x0+L*0.45,cy,cz+14]),loop:at([0,0,96]),pov:at([bx,y1,z+38]),ana:at([96,y1+34,52]),ctl:at([150,-30,64]),docs:at([-14,150,40])};
 return {svg:isoSvg(W,H,inner,'aq-iso--navy aq-cutaway-rail__svg',{origin:org,under:isoSheet(W,H,{grid:'iso',m:6,band:0,gridStep:22})}),A:A}}
LOOKS['cutaway-rail']=function(b,H){var C=b.cols||[],R=b.rows||[],P=b.parts||[],S=crScene();
 var cards='<ol class="aq-cutaway-rail__cards" role="list">'+R.map(function(r,i){
  var parts=String(P[i]||'').trim(),name=String(r[0]&&typeof r[0]==='object'?r[0].t:r[0]||''),code=name.split(/;|\s\(|,\s/)[0];
  var cell=function(j,cls){var c=r[j];if(c==null||c==='')return '';return '<div class="aq-cutaway-rail__f aq-cutaway-rail__f--'+cls+'"><p class="aq-cutaway-rail__k">'+tx(C[j]||'')+'</p><p class="aq-cutaway-rail__v">'+(cls==='go'?tcell(c):tcell(c))+'</p></div>'};
  return fli('<li class="aq-cutaway-rail__card" data-parts="'+e(parts)+'" data-code="'+e(code)+'" data-theme="light">',b,i)
   +'<span class="aq-cutaway-rail__node" aria-hidden="true"></span>'
   +idx(i)+'<div class="aq-cutaway-rail__std"><h3 class="aq-cutaway-rail__name">'+tcell(r[0])+'</h3></div>'
   +cell(1,'how')+cell(2,'proof')+cell(3,'go')+'</li>'}).join('')+'</ol>';
 var pins=Object.keys(S.A).map(function(k){return '<span class="aq-cutaway-rail__pin" data-part="'+k+'" style="left:'+S.A[k].left+';top:'+S.A[k].top+'"></span>'}).join('');
 var fig='<figure class="aq-cutaway-rail__fig" aria-hidden="true"><div class="aq-cutaway-rail__draw">'+S.svg+pins+'<span class="aq-cutaway-rail__call"></span></div>'
  +'<p class="aq-cutaway-rail__tag">'+(b.tag?'<span class="aq-cutaway-rail__tag-k">'+tx(b.tag)+'</span> ':'')+'<span class="aq-cutaway-rail__tag-v"></span></p></figure>';
 return sec(H+'<div class="aq-cutaway-rail">'+fig+'<div class="aq-cutaway-rail__rail">'+wFold(b,R.length,cards,b.fold_noun||'standards')+'</div></div>','aq-band--navy aq-cutaway-rail-sec')};
/* Active card: the one crossing 45 % of the viewport height (or under the pointer or focus) lights its parts */
function crSet(w,card){if(!w||!card||w._crOn===card)return;w._crOn=card;
 [].forEach.call(w.querySelectorAll('.aq-cutaway-rail__card.is-on'),function(c){c.classList.remove('is-on')});card.classList.add('is-on');
 var P=String(card.getAttribute('data-parts')||'').split(/\s+/).filter(Boolean),svg=w.querySelector('svg.aq-iso');
 if(svg)[].forEach.call(svg.querySelectorAll('[data-iso-id]'),function(el){el.classList.toggle('is-lit',P.indexOf(el.getAttribute('data-iso-id'))>=0)});
 var v=w.querySelector('.aq-cutaway-rail__tag-v');if(v)v.textContent=card.getAttribute('data-code')||'';
 var pin=P.length&&w.querySelector('.aq-cutaway-rail__pin[data-part="'+P[0]+'"]'),call=w.querySelector('.aq-cutaway-rail__call');
 if(call){call.classList.toggle('is-on',!!pin);if(pin){call.style.left=pin.style.left;call.style.top=pin.style.top;call.classList.toggle('is-left',parseFloat(pin.style.left)>60);call.textContent=card.getAttribute('data-code')||''}}
 [].forEach.call(w.querySelectorAll('.aq-cutaway-rail__pin'),function(p){p.classList.toggle('is-on',P.indexOf(p.getAttribute('data-part'))>=0)})}
function crScan(){var mid=innerHeight*0.45;[].forEach.call(document.querySelectorAll('.aq-cutaway-rail'),function(w){
  if(w._crHover)return;var best=null,bd=1e9;[].forEach.call(w.querySelectorAll('.aq-cutaway-rail__card'),function(c){var r=c.getBoundingClientRect();if(!r.height)return;
   var d=r.top<=mid&&r.bottom>=mid?0:Math.min(Math.abs(r.top-mid),Math.abs(r.bottom-mid));if(d<bd){bd=d;best=c}});
  if(best)crSet(w,best)})}
if(typeof document!=='undefined'&&document.addEventListener){var crQ=0;
 var crTick=function(){if(crQ)return;crQ=1;requestAnimationFrame(function(){crQ=0;crScan()})};
 addEventListener('scroll',crTick,{passive:true});addEventListener('resize',crTick);document.addEventListener('click',function(ev){if(ev.target.closest&&ev.target.closest('.aq-cutaway-rail .aq-fold__btn'))setTimeout(crScan,0)});
 ['mouseover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var c=ev.target.closest&&ev.target.closest('.aq-cutaway-rail__card');if(!c)return;var w=c.closest('.aq-cutaway-rail');w._crHover=1;crSet(w,c)})});
 ['mouseout','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var c=ev.target.closest&&ev.target.closest('.aq-cutaway-rail__card');if(!c||(ev.relatedTarget&&c.contains(ev.relatedTarget)))return;var w=c.closest('.aq-cutaway-rail');w._crHover=0;crTick()})});
 if(typeof MutationObserver!=='undefined')new MutationObserver(crTick).observe(document.documentElement,{childList:true,subtree:true});
 window.AQcutaway={scan:function(){[].forEach.call(document.querySelectorAll('.aq-cutaway-rail'),function(w){w._crOn=null});crScan()}};
 if(document.readyState!=='loading')setTimeout(crScan,0);else document.addEventListener('DOMContentLoaded',crScan)}
