/* Look "request-menu" -> RequestMenu (design-system/components/RequestMenu): a table of what each request returns, set
   as a short menu on a limestone sheet (pass 9b concept contact-proposal.2). The section title runs oversized across the
   top right; an isometric line drawing of a packaged skid stands at the left (sticky on desktop) and the menu sits beside
   it as a real table: a numbered situation heads each group (th scope=rowgroup), and what comes back is set one returned
   item per line, each with its own "When" (Geist Mono) and "Cost" (flow). A "What comes back" cell holding several items
   joined by " · " gives one line per item; the "When" and "Cost" cells are split the same way when they hold the same
   number of parts, otherwise the whole cell spans the group's lines. A {t, link, intent} cell keeps its link.
   Fields, as a table: cols [situation, what comes back, when, cost] (the column heads, and the phone's field keys), rows,
   fold, fold_noun. Design system: components/RequestMenu. */
(function(){
function parts(c){return c&&typeof c==='object'?[c]:String(c==null?'':c).split(/\s+·\s+/)}
function cap(s){return typeof s==='string'?s.charAt(0).toUpperCase()+s.slice(1):s}
/* the drawing: a packaged skid in an open frame (base frame, posts and top rails), a closed module, a tank and two
   cartridge housings piped in series; drawn with IsoKit, the frame posts as single centre lines */
function figure(){var z=15,W=124,D=60,T=104,K={wall:false,flow:false,flanges:false,caps:false,r:1};
 function post(x,y){return isoPipe([[x,y,9],[x,y,T]],K)}
 var sk=isoPart('skid',0,0,0,1,{w:W,d:D,id:'frame'});
 var tk=isoPart('tank',26,20,z,1,{id:'tank'});
 var f1=isoPart('filter',70,20,z,1,{id:'f1'}),f2=isoPart('filter',96,20,z,1,{id:'f2'});
 var md=isoPart('module',100,46,z,1,{w:30,d:18,h:28,id:'module'});
 var a=tk.ports.out,i1=f1.ports.in,x1=i1[0]-5;
 var p1=isoPipe([a,[x1,a[1],a[2]],[x1,i1[1],i1[2]],i1],{to:'f1',r:1.8,flanges:false,caps:false});
 var p2=isoPipe([f1.ports.out,f2.ports.in],{to:'f2',r:1.8,flanges:false,caps:false});
 var o=f2.ports.out,p3=isoPipe([o,[W+12,o[1],o[2]]],{r:1.8,flanges:'ends',caps:'end'});
 var rails=isoPipe([[2,D-2,T],[2,2,T],[W-2,2,T]],K),front=isoPipe([[2,D-2,T],[W-2,D-2,T],[W-2,2,T]],K);
 var inner=[sk,post(2,2),post(W-2,2),rails,tk,p1,f1,p2,f2,p3,md,post(2,D-2),post(W-2,D-2),front].join('');
 var bx=isoBounds([[0,0,0],[W+14,0,0],[0,D,0],[W,D,0],[0,0,T],[W,D,T],[W+14,0,T]],8);
 return isoSvg(bx.w,bx.h,inner,'aq-iso--limestone aq-request-menu__svg',{origin:[-bx.x,-bx.y]})}
LOOKS['request-menu']=function(b,H){var C=b.cols||[],R=b.rows||[],F=b.fold>0&&R.length>b.fold?b.fold:0;
 function k(j,d){return '<span class="aq-request-menu__k" aria-hidden="true">'+tx(C[j]||d)+'</span>'}
 var groups=R.map(function(r,i){var got=parts(r[1]),when=parts(r[2]),cost=parts(r[3]),n=got.length,wS=when.length===n,cS=cost.length===n;
  var lines=got.map(function(g,j){var w=wS?when[j]:(j?null:r[2]),c=cS?cost[j]:(j?null:r[3]),span=' rowspan="'+n+'"';
   return '<tr class="aq-request-menu__line">'
    +(j?'':'<th scope="rowgroup" rowspan="'+n+'" class="aq-request-menu__s"><span class="aq-request-menu__no" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><span class="aq-request-menu__st">'+tcell(r[0])+'</span></th>')
    +'<td class="aq-request-menu__got" data-col="1">'+tcell(cap(g))+'</td>'
    +(w==null?'':'<td class="aq-request-menu__when" data-col="2"'+(wS||n<2?'':span)+'>'+k(2,'When')+'<span class="aq-request-menu__v">'+tcell(w)+'</span></td>')
    +(c==null?'':'<td class="aq-request-menu__cost" data-col="3"'+(cS||n<2?'':span)+'>'+k(3,'Cost')+'<span class="aq-request-menu__v">'+tcell(c)+'</span></td>')
    +'</tr>'}).join('');
  return '<tbody class="aq-request-menu__set'+(F&&i>=F?' aq-fold-x':'')+'" style="--n:'+n+'">'+lines+'</tbody>'}).join('');
 var head='<thead><tr>'+[0,1,2,3].map(function(j){return '<th scope="col" class="aq-request-menu__h" data-col="'+j+'">'+(j===2?wIcon('clock','aq-request-menu__ic'):'')+tx(C[j]||'')+'</th>'}).join('')+'</tr></thead>';
 var table='<table class="aq-request-menu__table">'+head+groups+'</table>';
 return sec('<div class="aq-request-menu-wrap" data-theme="light"><div class="aq-request-menu__mast">'+H+'</div>'
  +'<div class="aq-request-menu"><figure class="aq-request-menu__fig" aria-hidden="true">'+figure()+'</figure>'
  +'<div class="aq-request-menu__body">'+wFold(b,R.length,table,b.fold_noun||'rows')+'</div></div></div>','aq-band--limestone aq-request-menu-sec')};
})();
