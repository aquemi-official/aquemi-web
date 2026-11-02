/* Look "site-tiles" -> SiteTiles (design-system/components/SiteTiles): a short grid of what changes for a site, set as
   one navy drawing sheet (pass 9b, concept about.2): a framed sheet with its zone band (numbers across, letters down),
   the section title large in the top left, and one column per item under a ruled line, each with its number, title,
   one isometric part drawn in IsoKit on the navy (the change made visible), the line and the link. The zone numbers
   over the columns are the columns' numbers, so pointing at a column lights its part and its zone, as on a drawing.
   Fields (a grid block): h, intro, items [{t, d, link, link_label, icon, fig}]. fig (optional): spool, stamp,
   softener, truck; default from icon (gauge -> spool: a PP spool with a valve and a pressure gauge for the test;
   stamp -> stamp: a registration stamp and its imprint; softener -> softener; wrench -> truck: a truck with a crated
   load, for service and spares), else the item's line icon as a Spot. Phones: the sheet keeps its frame; columns
   stack, each with its drawing beside the number and title. */
(function(){
var ST_FIG={
 spool:function(){return {inner:isoPipe([[0,0,0],[96,0,0]],{r:5,flanges:'ends',caps:true,flow:false})+isoPart('valve',30,0,0,2.4,{id:'fig'})+isoPart('gauge',68,0,5,2.2,{id:'fig'}),
  pts:[[-6,-10,-10],[102,10,-10],[66,0,42],[0,0,12],[96,0,12]]}},
 stamp:function(){return {inner:isoPart('stamp',0,0,0,3.4,{id:'fig'}),pts:[[-82,0,0],[30,40,0],[0,-20,0],[0,0,72],[-40,30,0]]}},
 softener:function(){return {inner:isoPart('softener',0,0,0,1.5,{id:'fig'}),pts:[[-34,-40,0],[74,-40,0],[-34,16,0],[0,0,96],[60,-30,70]]}},
 truck:function(){return {inner:isoPart('truck',0,0,0,1.05,{id:'fig',load:true}),pts:[[-4,-6,0],[118,-6,0],[-4,36,0],[118,36,0],[60,15,52]]}}
};
var ST_AUTO={gauge:'spool',stamp:'stamp',softener:'softener',wrench:'truck'};
function stFig(f){var d=ST_FIG[f](),B=isoBounds(d.pts,12),W=Math.round(B.w),H=Math.round(B.h);
 return isoSvg(W,H,d.inner,'aq-iso--navy aq-site-tiles__svg',{origin:[-B.x,-B.y]})}
LOOKS['site-tiles']=function(b,H){var I=b.items||[],n=I.length,num=function(i){return (i<9?'0':'')+(i+1)};
 var li=I.map(function(it,i){var f=ST_FIG[it.fig]?it.fig:ST_AUTO[it.icon],go=it.link&&wp(it.link);
  var fig=f?stFig(f):(isIcon(it.icon)?wSpot(it.icon,'m','aq-site-tiles__spot'):'');
  return '<li class="aq-site-tiles__col'+(f?' is-'+f:'')+'" style="--i:'+i+'">'
   +'<span class="aq-site-tiles__n" aria-hidden="true">'+num(i)+'</span><h3 class="aq-site-tiles__t">'+tx(it.t)+'</h3>'
   +'<div class="aq-site-tiles__plate" aria-hidden="true">'+fig+'</div>'
   +(it.d?'<p class="aq-site-tiles__d">'+tx(it.d)+'</p>':'')
   +(go?'<p class="aq-site-tiles__go"><a href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.link_label||wlabel(it.link))+'</a></p>':'')+'</li>'}).join('');
 var band=function(c,k,f){var o='';for(var i=0;i<k;i++)o+='<span>'+f(i)+'</span>';return '<div class="aq-site-tiles__band aq-site-tiles__band--'+c+'" aria-hidden="true">'+o+'</div>'};
 var nb=function(i){return i+1},lb=function(i){return 'ABC'[i]};
 return sec('<div class="aq-site-tiles" style="--n:'+n+'">'+band('t',n,nb)+band('b',n,nb)+band('l',3,lb)+band('r',3,lb)
  +'<div class="aq-site-tiles__head">'+H+'</div><ol class="aq-site-tiles__cols" role="list">'+li+'</ol></div>','aq-band--navy aq-site-tiles-sec')};
})();
