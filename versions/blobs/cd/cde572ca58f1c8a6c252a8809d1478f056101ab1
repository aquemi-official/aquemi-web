/* Look "binder-spines" -> BinderSpines (design-system/components/BinderSpines): an evidence table (as: "evidence":
   who, what they read, where we answer it) as the QA shelf, one ring binder per inspector standing on it, beside the
   plant they inspect: a large IsoKit drawing of a polypropylene PW package that stands on the shelf's floor line and
   bleeds off the right edge of the page (its scale against the binders is the point). Each spine carries the
   inspector on its paper label, the clause they cite set large in Geist Mono, what they read under it, the finger
   hole, and at the foot the page where we answer it. Binders alternate navy and limestone.
   Fields, as the evidence table: cols, rows [who, read, {t, link, intent}], fold, fold_noun (phones only).
   Added: spines [{code, read}] (one per row, optional): the clause shown large, and the reading without it; a row
   without one shows its whole reading. plant (optional, default true): false drops the drawing.
   Concepts: 51-concept-turnover-binder and compliance.2.v2 (tactile records); pass 9b ind-pharma.2 (the plant drawing
   bleeding off the right edge). */
(function(){
/* the plant, back to front and in water order: RO rack on its skid, the tank, the loop pump, UV, two points of use,
   the return; a panel at the back. Drawn here from IsoKit parts. */
function plant(){
 var sk=isoPart('skid',0,0,0,1,{w:150,d:62,id:'ro'}),ro=isoPart('ro',8,8,9,1,{id:'ro'}),pn=isoPart('panel',-40,-6,0,1,{id:'panel'}),
  tk=isoPart('tank',204,10,0,1.15,{id:'tank'}),pu=isoPart('pump',236,92,0,0.9,{id:'pump'}),uv=isoPart('uv',300,70,0,1,{id:'uv'}),
  o1=isoPart('outlet',420,60,0,1,{id:'pou'}),o2=isoPart('outlet',420,-40,0,1,{id:'pou'}),an=isoPart('analyzer',380,128,0,0.9,{id:'analyzer'});
 var feed=isoPipe(isoRoute(ro.ports.out,tk.ports.in,'xzy'),{r:1.8,to:'tank',caps:false});
 var p1=isoPipe(isoRoute(tk.ports.out,pu.ports.in,'yx'),{r:1.8,to:'pump',caps:false});
 var p2=isoPipe(isoRoute(pu.ports.out,uv.ports.in,'zx'),{r:1.8,to:'uv',caps:false});
 var hz=86,a=uv.ports.out,b1=o1.ports.in||o1.ports.top,b2=o2.ports.in||o2.ports.top;
 var head=isoPipe([a,[a[0],a[1],hz],[b1[0],a[1],hz],[b1[0],b1[1],hz],[b1[0],b1[1],b1[2]]],{r:1.8,to:'pou',caps:false});
 var run=isoPipe([[b1[0],b1[1],hz],[b2[0],b1[1],hz],[b2[0],b2[1],hz],[b2[0],b2[1],b2[2]]],{r:1.8,to:'pou',caps:false});
 var ret=isoPipe([[b2[0],b2[1],hz],[b2[0],b2[1]-24,hz],[tk.ports.ret[0],b2[1]-24,hz],[tk.ports.ret[0],tk.ports.ret[1],hz],tk.ports.ret],{r:1.8,to:'tank',caps:false});
 var inner=[pn,sk,ro,feed,ret,tk,p1,pu,p2,uv,o2,head,run,o1,an].join('');
 var bx=isoBounds([[-60,-40,0],[450,-80,0],[450,150,0],[0,70,0],[-60,-40,120],[210,10,130]],10);
 return isoSvg(Math.round(bx.w),Math.round(bx.h),inner,'aq-binder-spines__svg',{origin:[-bx.x,-bx.y]}).toString().replace('xMidYMid meet','xMinYMax meet').replace('<svg ','<svg style="aspect-ratio:'+Math.round(bx.w)+' / '+Math.round(bx.h)+';--drop:'+((isoP(204,36,0)[1]-bx.y)/bx.h).toFixed(3)+'" ')}
LOOKS['binder-spines']=function(b,H){var C=b.cols||[],R=b.rows||[],S=b.spines||[],n=R.length;
 var books=R.map(function(r,i){var s=S[i]||{},go=r[2],lk=go&&typeof go==='object'&&go.link&&wp(go.link);
  var foot=lk?'<a class="aq-binder-spines__go" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"'+(go.intent?' data-intent="'+e(go.intent)+'"':'')+'><span class="aq-binder-spines__k">'+tx(C[2]||'')+'</span><span class="aq-binder-spines__to">'+tx(go.t)+'</span></a>'
   :'<p class="aq-binder-spines__go"><span class="aq-binder-spines__k">'+tx(C[2]||'')+'</span><span class="aq-binder-spines__to">'+tcell(go)+'</span></p>';
  return fli('<li class="aq-binder-spines__book'+(i%2?' is-lime':'')+'" style="--h:'+[100,93,98,90,96,94][i%6]+'%">'
   +'<span class="aq-binder-spines__cap" aria-hidden="true"></span>'
   +'<div class="aq-binder-spines__label"><span class="aq-binder-spines__k">'+tx(C[0]||'')+'</span><h3 class="aq-binder-spines__who">'+tx(r[0])+'</h3></div>'
   +'<div class="aq-binder-spines__read">'+(s.code?'<p class="aq-binder-spines__code">'+tx(s.code)+'</p>':'')+'<p class="aq-binder-spines__d">'+tx(s.read||r[1])+'</p></div>'
   +'<span class="aq-binder-spines__hole" aria-hidden="true"></span>'+foot+'<span class="aq-binder-spines__cap" aria-hidden="true"></span></li>',b,i)}).join('');
 var fig=b.plant===false?'':'<div class="aq-binder-spines__fig">'+plant()+'</div>';
 var shelf='<div class="aq-binder-spines'+(fig?' has-plant':'')+'">'+fig+'<ol class="aq-binder-spines__row" style="--n:'+n+'">'+books+'</ol><span class="aq-binder-spines__shelf" aria-hidden="true"></span></div>';
 return sec(H+wFold(b,n,shelf,b.fold_noun),'aq-binder-spines-sec')};
})();
