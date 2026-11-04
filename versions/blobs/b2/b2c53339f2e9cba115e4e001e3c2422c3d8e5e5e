/* Look "param-tiles" -> ParamTiles (design-system/components/ParamTiles): a spec block's design parameters as a Swiss
   grid of numbered tiles, the number set huge with a slash and the parameter name beside it, the design value in mono,
   the basis under a hairline (and the row's link, as a spec row's). The first highlighted row is the wide navy lead
   tile; one cell of the grid is a blueprint of the skid itself (IsoKit on navy). The fold (fold, fold_noun) applies on
   phones only: desktop shows every tile, so the grid stays whole.
   Fields: h, caption (eyebrow), intro, rows [{p, v, m, hl, link, link_label}], fold, fold_noun. */
function ptSkid(){
 var sk=isoPart('skid',0,0,0,1,{w:176,d:84}),ro=isoPart('ro',10,8,9,1,{id:'ro'}),ed=isoPart('edi',140,12,9,1,{id:'edi'}),pn=isoPart('panel',150,62,9,0.9,{id:'pn'});
 var run=isoPipe(isoRoute(ro.ports.out,ed.ports.in,'xzy'),{r:1.8,to:'edi',caps:false});
 var inner=[sk,ro,run,ed,pn].join(''),bx=isoBounds([[0,0,0],[176,0,0],[0,84,0],[176,84,0],[0,0,70],[176,0,70],[0,84,70]],26),W=Math.round(bx.w),Hh=Math.round(bx.h),org=[-bx.x,-bx.y];
 return isoSvg(W,Hh,inner,'aq-iso--navy aq-param-tiles__svg',{origin:org,under:isoSheet(W,Hh,{grid:'iso',m:6,band:0,gridStep:20})})}
LOOKS['param-tiles']=function(b,H){
 var rows=b.rows||[],lead=-1;rows.some(function(r,i){if(r.hl){lead=i;return true}});
 /* pass 12 C: the cells the grid fills (lead 2, blueprint 4, the rest 1 each); one left over in the last row (four
    columns, and three under 1100 px) would leave an empty navy cell beside it, so the last tile runs the full row */
 /* the limestone tiles are fixed paper: data-theme="light" keeps flow (links) and placeholders at their light values
    in dark mode (flow turned pale blue on the paper) */
 var cells=rows.length+(lead>=0?1:0)+4,wide=rows.length>1&&lead!==rows.length-1&&cells%4===1;
 var tiles=rows.map(function(r,i){
  var lk=r.link&&wp(r.link)?'<a class="aq-param-tiles__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':'';
  return fli('<li class="aq-param-tiles__tile'+(i===lead?' is-lead':'')+(wide&&i===rows.length-1?' is-row':'')+'"'+(i===lead?'':' data-theme="light"')+'>'
   +'<div class="aq-param-tiles__head"><span class="aq-param-tiles__n" aria-hidden="true"><span>'+(i<9?'0':'')+(i+1)+'</span></span><span class="aq-param-tiles__slash" aria-hidden="true"></span>'
   +'<h3 class="aq-param-tiles__p">'+tx(r.p)+'</h3></div>'
   +'<p class="aq-param-tiles__v">'+tx(r.v)+'</p>'
   +(r.m||lk?'<p class="aq-param-tiles__m">'+(r.m?'<span>'+tx(r.m)+'</span>':'')+lk+'</p>':'')+'</li>',b,i)}).join('');
 var grid='<div class="aq-param-tiles">'+'<div class="aq-param-tiles__fig" aria-hidden="true">'+ptSkid()+'</div>'
  +'<ol class="aq-param-tiles__list">'+tiles+'</ol></div>';
 return sec(wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro})+wFold(b,rows.length,grid,b.fold_noun||'parameters')+wSpecNote(b))};
