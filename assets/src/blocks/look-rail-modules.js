/* Look "rail-modules" -> RailModules (design-system/components/RailModules): an options block (as modules) seen as a
   macro close-up of the control panel's backplate: one DIN rail runs across the plate and off both edges, and every
   option is a module clipped onto it, drawn front-on and large: terminal rows with screws top and bottom, a status
   lamp, a mono number, the option engraved as a line icon and its name on the front label. Each module's line drops
   on a leader to a callout under the plate. The block's base names the plate (a nameplate at the rail's end). A
   module with a link is the link (its name ends in an arrow). Phones: the rail stands vertical at the left and the
   modules stack along it as wide cards, the callout inside each.
   Fields: items [{t, d, spot|icon, link}], base, fold (phones only), fold_noun. */
LOOKS['rail-modules']=function(b,H){
 var I=b.items||[],n=I.length;if(!n)return BLOCKS.options(b,H);
 var screws=function(k){var s='';for(var j=0;j<k;j++)s+='<i></i>';return '<span class="aq-rail-modules__term" aria-hidden="true">'+s+'</span>'};
 var mods=I.map(function(it,i){var lk=it.link&&wp(it.link),num=(i<9?'0':'')+(i+1),v=wSpot(it.spot||it.icon,'l','aq-rail-modules__ic');
  var face=screws(4)+'<span class="aq-rail-modules__face"><span class="aq-rail-modules__top" aria-hidden="true"><span class="aq-rail-modules__led"></span><span class="aq-rail-modules__n">'+num+'</span></span>'
   +v+'<h3 class="aq-rail-modules__t">'+tx(it.t)+(lk?'<span class="aq-rail-modules__go" aria-hidden="true">→</span>':'')+'</h3></span>'+screws(4);
  var body=lk?'<a class="aq-rail-modules__body" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+face+'</a>':'<div class="aq-rail-modules__body">'+face+'</div>';
  return fli('<li class="aq-rail-modules__m" data-rm="'+i+'">'+body+(it.d?'<p class="aq-rail-modules__d">'+tx(it.d)+'</p>':'')+'</li>',b,i)}).join('');
 var plate='<div class="aq-rail-modules__plate"><span class="aq-rail-modules__rail" aria-hidden="true"></span>'
  +(b.base?'<p class="aq-rail-modules__base"><span>'+tx(b.base)+'</span></p>':'')
  +'<ol class="aq-rail-modules__list" role="list" style="--rm-n:'+n+'">'+mods+'</ol></div>';
 return sec(H+wFold(b,n,'<div class="aq-rail-modules">'+plate+'</div>',b.fold_noun||'options'),'aq-rail-modules-sec')};
