/* Look "tie-in-run" -> TieInRun (design-system/components/TieInRun): ordered steps (steps block) told on one drawing
   of a qualified loop that gains a new outlet. Left, the steps as a numbered list under the heading; right, a sticky
   IsoKit drawing: the loop header with two existing points of use, and the new branch off a tee (isolation valve,
   drop, sample point, the new point of use). As the reader scrolls through the steps the drawing follows them: the
   new outlet appears as a dashed planned outline (scope review), a dashed change boundary is ruled round it on the
   floor (change control), the branch is built solid and tied in (build and tie in), the water runs into it (release).
   Each step has a numbered marker on the drawing at the part it changes. Without script or under reduced motion the
   drawing shows the finished, released state. Placeholders in the words stay placeholders.
   Fields, as steps: h, intro, items [{t, d, link}] (the first four drive the drawing's stages).
   Concept: pass 9b ind-cdmo.3 (four numbered steps with placeholder figures in the accent beside a ring of
   line-drawn modules), with the log's note: show the new outlet being tied in instead of a generic module ring. */
(function(){
var K='aq-tie-in-run';
function scene(){var zH=92,xt=200,yb=48,xo=234,x1=330;
 var o1=isoPart('outlet',20,8,0,1,{id:'old'}),o2=isoPart('outlet',110,8,0,1,{id:'old'});
 var hd=isoPipe([[-70,0,zH],[x1,0,zH],[x1,0,36]],{r:2.6,id:'loop',to:'loop',caps:'end',flanges:'ends'});
 var d1=isoPipe([[o1.ports.in[0],0,zH],o1.ports.in],{r:1.8,id:'old',to:'old',caps:false}),d2=isoPipe([[o2.ports.in[0],0,zH],o2.ports.in],{r:1.8,id:'old',to:'old',caps:false});
 var no=isoPart('outlet',xo-2,yb+8,0,1,{id:'new'}),ni=no.ports.in;
 var br=isoPipe([[xt,0,zH],[xt,yb,zH],[ni[0],yb,zH],ni],{r:1.8,id:'new',to:'new',caps:false,flanges:'all'});
 var vl=isoPart('valve',xt,18,zH,1,{id:'new',rot:1});
 var sp=isoPipe([[ni[0],yb,76],[ni[0]+18,yb,76]],{r:1.2,id:'new',flow:false,caps:'end'}),sv=isoPart('valve',ni[0]+11,yb,76,0.8,{id:'new',type:'ball'});
 var bd=isoPoly([[178,-18,0],[272,-18,0],[272,84,0],[178,84,0]],1);
 var inner=[o1,o2,d1,d2,hd,isoArrow([-30,0,zH],'x'),isoArrow([x1,0,60],'-z'),
  '<path class="'+K+'__cc" d="'+bd+'"/>',
  '<g class="'+K+'__new">'+br+vl+sp+sv+no+'</g>'].join('');
 var mk=[[xo+18,yb+8,30],[178,84,0],[xt,18,zH+10],[ni[0]+18,yb,76]];
 var bx=isoBounds([[-70,0,zH+4],[x1,0,zH+4],[x1,0,0],[20,18,0],[178,84,0],[272,84,0],[-70,0,40]],18);
 return {inner:inner,mk:mk,w:Math.round(bx.w),h:Math.round(bx.h),org:[-bx.x,-bx.y]}}
LOOKS['tie-in-run']=function(b,H){var I=b.items||[],n=I.length,S=scene(),m=Math.min(4,n);
 var mks='';for(var i=0;i<m;i++){var a=isoPct(isoP(S.mk[i]),S.w,S.h,S.org);mks+='<span class="'+K+'__mk" data-i="'+i+'" style="left:'+a.left+';top:'+a.top+'">'+(i<9?'0':'')+(i+1)+'</span>'}
 var fig='<div class="'+K+'__fig"><div class="'+K+'__plate" aria-hidden="true">'+isoSvg(S.w,S.h,S.inner,K+'__svg',{origin:S.org})+mks+'</div></div>';
 var steps=I.map(function(it,i){var lk=it.link&&wp(it.link);
  return '<li class="'+K+'__step" data-i="'+i+'"><span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><h3 class="'+K+'__t">'+(lk?wlink(it.link,it.t):tx(it.t))+'</h3>'
   +(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 return sec(H+'<div class="'+K+'" data-stage="'+m+'" style="--n:'+n+'"><ol class="'+K+'__steps">'+steps+'</ol>'+fig+'</div>',K+'-sec')};
})();
