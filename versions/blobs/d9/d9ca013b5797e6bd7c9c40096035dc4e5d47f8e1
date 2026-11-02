/* Look "index-sheet" -> IndexSheet (design-system/components/IndexSheet): the package's index as one printed sheet.
   A limestone sheet lies on the navy ground: the section title set very large across its head, the intro under it,
   then the package's sections in a ruled, numbered index grid (two columns, every section with all its documents in
   view), and at the right a folded leaf of the sheet carrying one isometric line drawing: a pipe frame on a base
   frame with a flanged spool run through it, the system the documents are handed over with. The leaf is a real
   panel; motion unfolds it (paper-fold), then the frame draws and the water runs the spool once.
   Concept: research/pass9b/concepts/cmp-documentation.0.png (limestone sheet on navy, huge headline, numbered
   sections in a ruled grid, isometric pipe-frame drawing).
   Fields (a docs block): h, intro, nav (the strip over the sheet), items [{t, d, key, link}], fold, fold_noun.
   key: the section's number and rule in flow. The fold applies on phones only (desktop shows the whole index).
   Phones: the sheet runs edge to edge inside the navy margin, the drawing sits under the intro, the grid is one column. */
function isFrame(){var W=112,D=72,z=9,T=150,r=2,o=[],P=function(pts,x){return isoPipe(pts,Object.assign({r:r,flow:false,caps:false,flanges:false},x||{}))};
 var sk=isoPart('skid',0,0,0,1,{w:W,d:D,id:'frame'});o.push(sk);var c=4,zt=z+6,X=W-c,Y=D-c;
 /* back of the frame first: the back post, the two back rails, the side posts */
 o.push(P([[c,c,zt],[c,c,T]]));
 o.push(P([[c,Y,T],[c,c,T],[X,c,T]],{bend:6}));
 o.push(P([[c,c,72],[X,c,72]]),P([[c,c,72],[c,Y,72]]));
 o.push(P([[X,c,zt],[X,c,T]]),P([[c,Y,zt],[c,Y,T]]));
 /* the spool: in at the left flange, up, across with a valve and a gauge, down and out at the right flange */
 var y0=D*0.55,a=[22,Y-2,40],b=[W-22,Y-2,40];
 var sp=isoPipe([a,[22,y0,40],[22,y0,118],[W-22,y0,118],[W-22,y0,40],b],{r:2.6,to:'spool',flanges:'ends',bend:8});o.push(sp);
 o.push(isoPart('valve',W*0.42,y0,118,1,{id:'spool',r:2.6}));o.push(isoPart('gauge',W*0.64,y0,121,0.9,{id:'spool',value:0.55}));
 o.push(isoArrow([22,y0,80],'z',{size:5}),isoArrow([W-22,y0,80],[0,0,-1],{size:5}));
 /* front of the frame: the front rails and the front post */
 o.push(P([[X,c,T],[X,Y,T],[c,Y,T]],{bend:6}));
 o.push(P([[X,c,72],[X,Y,72]]),P([[c,Y,72],[X,Y,72]]));
 o.push(P([[X,Y,zt],[X,Y,T]]));
 var bx=isoBounds([[0,0,0],[W,0,0],[0,D,0],[W,D,0],[0,0,T+4],[W,D,T+4],[W,0,T+4],[0,D,T+4]],10);
 return isoSvg(bx.w,bx.h,o.join(''),'aq-iso--limestone aq-index-sheet__svg',{origin:[-bx.x,-bx.y]})}
LOOKS['index-sheet']=function(b,H){var I=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=I.length,K='aq-index-sheet',noun=b.fold_noun||'sections';
 var cells=I.map(function(x,i){var num=(i<9?'0':'')+(i+1);
  return fli('<li class="'+K+'__cell'+(x.key?' is-key':'')+'" style="--i:'+i+'">',b,i)+'<span class="'+K+'__rule" aria-hidden="true"></span>'
   +'<span class="'+K+'__n" aria-hidden="true">'+num+'</span><div class="'+K+'__body"><h3 class="'+K+'__t">'+(x.link&&wp(x.link)?wlink(x.link,x.t):tx(x.t))+'</h3>'
   +(x.d?'<p class="'+K+'__d">'+tx(x.d)+'</p>':'')+'</div></li>'}).join('');
 var strip='<p class="'+K+'__strip" aria-hidden="true"><span>'+tx(b.nav||'')+'</span><span>'+n+' '+e(noun)+'</span></p>';
 var wing='<div class="'+K+'__wing"><div class="'+K+'__face"><div class="aq-iso-figure '+K+'__fig">'+isFrame()+'</div></div><span class="'+K+'__back" aria-hidden="true"></span></div>';
 var sheet='<div class="'+K+'__sheet" data-theme="light">'+H+'<div class="'+K+'__main"><div class="'+K+'__index">'
  +wFold(b,n,'<ol class="'+K+'__grid" role="list">'+cells+'</ol>',noun)+'</div>'+wing+'</div></div>';
 return sec('<div class="'+K+'">'+strip+sheet+'</div>','aq-band--navy '+K+'-sec')};
