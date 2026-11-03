/* Look "index-sheet" -> IndexSheet (design-system/components/IndexSheet): the package's index as one printed sheet.
   A limestone sheet lies on the navy ground: the section title set very large across its head, the intro under it,
   then the package's sections in a ruled, numbered index grid (two columns, every section with all its documents in
   view), and at the right a folded leaf of the sheet carrying one isometric line drawing: a PP box-section frame on a
   base frame with a spool run through it and a PP membrane housing on its back rail, the system the documents are handed
   over with. The leaf is a real
   panel; motion unfolds it (paper-fold), then the frame draws and the water runs the spool once.
   Concept: research/pass9b/concepts/cmp-documentation.0.png (limestone sheet on navy, huge headline, numbered
   sections in a ruled grid, isometric pipe-frame drawing).
   Fields (a docs block): h, intro, nav (the strip over the sheet), items [{t, d, key, link}], fold, fold_noun.
   key: the section's number and rule in flow. The fold applies on phones only (desktop shows the whole index).
   Phones: the sheet runs edge to edge inside the navy margin, the drawing sits under the intro, the grid is one column. */
function isFrame(){var W=112,D=72,z=9,T=150,o=[];
 var sk=isoPart('skid',0,0,0,1,{w:W,d:D,id:'frame'});o.push(sk);var c=4,zt=z+6,X=W-c,Y=D-c,m=2;
 /* round C verify F5: the frame is PP box section (4 x 4 units, square corners, rails butted between the posts), not
    bent round tube, so it reads as a fabricated PP stand, not a steel tube rack. Posts and rails draw back to front:
    post(b, x, y), xRail(b, y, z) along x between the posts, yRail(b, x, z) along y */
 var post=function(b,x,y){b.box(x-m,y-m,zt,2*m,2*m,T-zt)},xRail=function(b,y,zz){b.box(c+m,y-m,zz-m,X-c-2*m,2*m,2*m)},yRail=function(b,x,zz){b.box(x-m,c+m,zz-m,2*m,Y-c-2*m,2*m)};
 /* back of the frame first: the back post, the back rails at the top and at mid height, the side posts */
 var fb=isoB(0,0,0,1);post(fb,c,c);xRail(fb,c,T-m);yRail(fb,c,T-m);xRail(fb,c,72);yRail(fb,c,72);post(fb,X,c);post(fb,c,Y);
 o.push(fb.done('frame',{}));
 /* round C: one PP membrane housing low at the back on two saddles off the base (end caps with weld bands, a permeate
    stub), so the frame reads as a PP skid, not an empty steel stand; verify F5: the near end is a short closed cap with
    a centre port stub, not a long cap whose two rims read as an open bore */
 var hb=isoB(0,0,0,1),hy=c+9,hz=zt+14;
 hb.box(28,hy-4,zt-6,5,8,13).box(80,hy-4,zt-6,5,8,13);
 hb.cyl(14,hy,hz,'x',5,7.8).cyl(18,hy,hz,'x',76,7).band(24,hy,hz,'x',7).band(88,hy,hz,'x',7).cyl(94,hy,hz,'x',2,7.8).stub(96,hy,hz,'x',4,1.8);
 hb.cyl(86,hy,hz+6,'z',6,1.8);
 o.push(hb.done('housing',{}));
 /* the spool: in at the left flange, up, across with a valve and a gauge, down and out at the right flange */
 var y0=D*0.55,a=[22,Y-2,40],b=[W-22,Y-2,40];
 var sp=isoPipe([a,[22,y0,40],[22,y0,118],[W-22,y0,118],[W-22,y0,40],b],{r:2.6,to:'spool',flanges:'ends',bend:8});o.push(sp);
 o.push(isoPart('valve',W*0.42,y0,118,1,{id:'spool',r:2.6}));o.push(isoPart('gauge',W*0.64,y0,121,0.9,{id:'spool',value:0.55}));
 o.push(isoArrow([22,y0,80],'z',{size:5}),isoArrow([W-22,y0,80],[0,0,-1],{size:5}));
 /* front of the frame: the front rails and the front post */
 var ff=isoB(0,0,0,1);yRail(ff,X,T-m);xRail(ff,Y,T-m);yRail(ff,X,72);xRail(ff,Y,72);post(ff,X,Y);
 o.push(ff.done('frame',{}));
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
