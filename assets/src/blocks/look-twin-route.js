/* Look "twin-route" -> TwinRoute (design-system/components/TwinRoute): a FAT versus SAT table (table, as "versus")
   drawn as two routes the same skid takes. At the top, two IsoKit scenes: our test bay (the skid on the bay's feed
   water, its outlet read by an analyser) and your site (the installed skid, storage tank and loop to a point of use
   behind the clean-room wall), with the truck between them on the centre column. Under each scene its route runs
   down the page as a twin-wall pipe; every test is a station on both routes: the FAT result to the left of the FAT
   pipe, the test named large between the pipes, the SAT result to the right. A cell that starts "Not possible" breaks
   its pipe (a capped gap and an open node). The conclusion closes the routes: the FAT pipe turns in towards the centre
   ("Reuse in IQ/OQ"), and the SAT pipe ends at "proven on site only".
   Fields, as a versus table: cols [test, FAT label, SAT label], rows [[test, FAT cell, SAT cell]] (strings or
   {t, link}), conclusion [label, FAT side, SAT side], fold, fold_noun (the fold applies on phones only),
   route_labels (optional small eyebrows over the two route labels, e.g. ["Route 1", "Route 2"]).
   Phones: the scenes sit side by side over the rows; each row stacks the test, then its FAT and SAT results on two
   thin rails down the left. */
function trScenes(){
 /* our test bay: the bay's own feed tank, the skid (RO rack and panel), outlet analyser, the drain */
 var sk=isoPart('skid',0,0,0,1,{w:150,d:62}),ro=isoPart('ro',8,8,9,1,{id:'fat-ro'}),pn=isoPart('panel',134,40,9,0.9,{id:'fat-pn'}),
  tk=isoPart('tank',-46,-6,0,0.82,{id:'fat-feed'}),an=isoPart('analyzer',178,4,0,0.9,{id:'fat-an'});
 var feed=isoPipe(isoRoute(tk.ports.out,ro.ports.in,'xyz'),{r:1.9,to:'fat-ro',caps:false});
 var out=isoPipe(isoRoute(ro.ports.out,[an.ports.sample[0],ro.ports.out[1],ro.ports.out[2]],'xyz').concat([[an.ports.sample[0]+14,ro.ports.out[1],ro.ports.out[2]],[an.ports.sample[0]+14,ro.ports.out[1],0]]),{r:1.9,to:'fat-an',caps:'end'});
 var A=[tk,feed,sk,ro,pn,out,an].join(''),bA=isoBounds([[-70,-30,0],[200,0,0],[0,70,0],[150,70,0],[-70,-30,72],[200,0,60],[0,70,70]],18);
 /* your site: clean-room wall behind, storage tank, the skid, loop out through the wall to a point of use */
 var wl=isoPart('wall',-30,-34,0,1,{w:220,h:64}),sk2=isoPart('skid',0,0,0,1,{w:150,d:62}),ro2=isoPart('ro',8,8,9,1,{id:'sat-ro'}),
  tk2=isoPart('tank',178,26,0,0.9,{id:'sat-tank'}),ou=isoPart('outlet',236,70,0,0.9,{id:'sat-pou'});
 var p1=isoPipe(isoRoute(ro2.ports.out,tk2.ports.in,'xyz'),{r:1.9,to:'sat-tank',caps:false});
 var loop=isoPipe(isoRoute(tk2.ports.out,[ou.ports.in[0],ou.ports.in[1],ou.ports.in[2]],'xyz'),{r:1.9,to:'sat-pou',caps:false});
 var B=[wl,sk2,ro2,p1,tk2,loop,ou].join(''),bB=isoBounds([[-30,-34,0],[190,-34,0],[-30,-34,70],[0,70,0],[210,50,0],[190,-34,70],[260,90,0],[250,80,40]],18);
 /* the truck, its load crated */
 var tr=isoPart('truck',0,0,0,1,{id:'truck'}),bT=isoBounds([[0,0,0],[96,0,0],[0,26,0],[96,26,0],[0,0,40],[96,26,30]],8);
 function svg(inner,bx,cls){var W=Math.round(bx.w),H=Math.round(bx.h);return isoSvg(W,H,inner,cls,{origin:[-bx.x,-bx.y]})}
 return {fat:svg(A,bA,'aq-twin-route__svg'),sat:svg(B,bB,'aq-twin-route__svg'),truck:svg(tr,bT,'aq-twin-route__svg aq-twin-route__truck-svg')}}
LOOKS['twin-route']=function(b,H){var RL=b.route_labels||[],C=b.cols||[],R=b.rows||[],K=b.conclusion||[],S=trScenes();
 function na(c){var t=c&&typeof c==='object'?c.t:c;return /^not possible\b/i.test(String(t||''))}
 function cell(c,side,i){var x=na(c);
  return '<div class="aq-twin-route__res aq-twin-route__res--'+side+(x?' is-na':'')+'">'
   +'<span class="aq-twin-route__k">'+tx(C[side==='fat'?1:2]||'')+'</span>'+tcell(c)+'</div>'
   +'<span class="aq-twin-route__rail aq-twin-route__rail--'+side+(x?' is-na':'')+'" aria-hidden="true">'+(x?'':'<span class="aq-twin-route__water"></span>')+'<span class="aq-twin-route__node"></span></span>'}
 var rows=R.map(function(r,i){
  return fli('<li class="aq-twin-route__row" style="--i:'+i+'">'
   +cell(r[1],'fat',i)
   +'<h3 class="aq-twin-route__test"><span class="aq-twin-route__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'+tcell(r[0])+'</h3>'
   +cell(r[2],'sat',i)+'</li>',b,i)}).join('');
 var head='<div class="aq-twin-route__head" aria-hidden="true">'
  +'<div class="aq-twin-route__scene aq-twin-route__scene--fat">'+S.fat+'<span class="aq-twin-route__cap">'+tx(C[1]||'')+'</span></div>'
  +'<div class="aq-twin-route__road">'+S.truck+'<span class="aq-twin-route__lane"></span></div>'
  +'<div class="aq-twin-route__scene aq-twin-route__scene--sat">'+S.sat+'<span class="aq-twin-route__cap">'+tx(C[2]||'')+'</span></div></div>'
  +'<div class="aq-twin-route__labels">'
  +'<p class="aq-twin-route__lab aq-twin-route__lab--fat">'+(RL[0]?'<span class="aq-eyebrow">'+tx(RL[0])+'</span>':'')+tx(C[1]||'')+'</p>'
  +'<span class="aq-twin-route__rail aq-twin-route__rail--fat is-cap" aria-hidden="true"><span class="aq-twin-route__water"></span></span>'
  +'<p class="aq-twin-route__lab aq-twin-route__lab--test aq-eyebrow">'+tx(C[0]||'')+'</p>'
  +'<span class="aq-twin-route__rail aq-twin-route__rail--sat is-cap" aria-hidden="true"><span class="aq-twin-route__water"></span></span>'
  +'<p class="aq-twin-route__lab aq-twin-route__lab--sat">'+(RL[1]?'<span class="aq-eyebrow">'+tx(RL[1])+'</span>':'')+tx(C[2]||'')+'</p></div>';
 var list=wFold(b,R.length,'<ol class="aq-twin-route__rows">'+rows+'</ol>',b.fold_noun||'tests');
 var end=K.length?'<div class="aq-twin-route__end">'
  +'<p class="aq-twin-route__res aq-twin-route__res--fat">'+tx(K[1]||'')+'</p>'
  +'<span class="aq-twin-route__turn aq-twin-route__turn--fat" aria-hidden="true"></span>'
  +'<p class="aq-twin-route__reuse">'+tx(K[0]||'')+'</p>'
  +'<span class="aq-twin-route__turn aq-twin-route__turn--sat" aria-hidden="true"></span>'
  +'<p class="aq-twin-route__res aq-twin-route__res--sat">'+tx(K[2]||'')+'</p></div>':'';
 return sec(H+'<div class="aq-twin-route">'+head+list+end+'</div>','aq-twin-route-sec')};
