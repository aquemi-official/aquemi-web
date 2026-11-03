/* Look "option-tags" -> OptionTags (design-system/components/OptionTags): configuration options as physical tags laid
   out on a limestone table, the section heading on a paper label card. Each option is a shipping tag on a string
   (eyelet, string, the option's line glyph as a round stamp, its number in mono), a round tag, or a manila folder lying
   on the navy strip at the right. Hovering a tag picks it up (it straightens and lifts). Two sample vials lie between
   them (decoration). The fold (fold, fold_noun) applies on phones only, where the tags stack in one column, and only
   to more than five options.
   Fields (an options block): h, intro, items [{t, d, spot | icon, shape}], spot (base glyph), base, fold, fold_noun.
   shape: "tag" (default), "round" or "folder"; folders sit on the navy strip (desktop). With no folder the strip is
   left out (.is-flat) and the tags fill three columns. */
var OT_TILT=[-3.5,2.5,-1.5,2,-2.5,1.5];
function otVial(cls){return '<svg class="aq-option-tags__vial '+cls+'" viewBox="0 0 40 120" aria-hidden="true" focusable="false">'
 +'<rect class="aq-option-tags__cap" x="11" y="2" width="18" height="14"/><path d="M13 16v8h14v-8"/><path d="M8 28q0-4 4-4h16q4 0 4 4v80q0 10-12 10t-12-10z"/>'
 +'<path class="aq-option-tags__liquid" d="M8 70h24"/><rect class="aq-option-tags__lab" x="10" y="38" width="20" height="22"/><path class="aq-option-tags__hair" d="M13 45h14M13 50h10"/></svg>'}
LOOKS['option-tags']=function(b,H){
 /* pass 12 (F7): five options or fewer are not folded on phones (hiding one or two behind a button costs more than it
    saves); the fold stays for longer lists */
 if((b.items||[]).length<=5&&b.fold)b=Object.assign({},b,{fold:0});
 var I=b.items||[],pg=wp(WP),base=isVig(b.spot)?wSpot(b.spot,'','aq-spot--muted aq-option-tags__base-ic'):'';
 var label='<div class="aq-option-tags__label">'+H+'<p class="aq-option-tags__base">'+base+'<span>'+tx(b.base||'Base skid')+(pg&&pg.nav_label?' · '+tx(pg.nav_label):'')+'</span></p></div>';
 var L=1,R=0;/* desktop cells: the label holds column 1 row 1; tags fill columns 1-2 in reading order, folders column 3 */
 /* pass 12: with no folder the navy strip would stand empty, so it is not drawn (.is-flat) and the tags use all three
    columns */
 var flat=!I.some(function(it){return it.shape==='folder'}),K=flat?3:2;
 var tags=I.map(function(it,i){var sh=it.shape==='round'||it.shape==='folder'?it.shape:'tag',g=wSpot(it.spot||it.icon,'','aq-option-tags__glyph'),lk=it.link&&wp(it.link),cell;
  if(sh==='folder'){R++;cell=[3,R]}else{cell=[L%K+1,Math.floor(L/K)+1];L++}
  var str=sh==='folder'?'':'<svg class="aq-option-tags__string" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="'+(sh==='round'?'M50 60C46 40 58 22 50 0':'M100 30C70 34 60 8 30 18S8 50 0 44')+'"/></svg>';
  return fli('<li class="aq-option-tags__item aq-option-tags__item--'+sh+'" style="--r:'+(sh==='round'?0:OT_TILT[i%OT_TILT.length])+'deg;--c:'+cell[0]+';--rw:'+cell[1]+'">'+str
   +'<div class="aq-option-tags__tag">'+(sh==='folder'?'':'<span class="aq-option-tags__eyelet" aria-hidden="true"></span>')
   +(lk?'<a class="aq-option-tags__body" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">':'<div class="aq-option-tags__body">')
   +'<h3 class="aq-option-tags__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="aq-option-tags__d">'+tx(it.d)+'</p>':'')
   +'<span class="aq-option-tags__foot" aria-hidden="true">'+(g?'<span class="aq-option-tags__stamp">'+g+'</span>':'')+'<span class="aq-option-tags__no">'+(i<9?'0':'')+(i+1)+'</span></span>'
   +(lk?'</a>':'</div>')+'</div></li>',b,i)}).join('');
 var inner='<div class="aq-option-tags'+(flat?' is-flat':'')+'">'+label+'<ol class="aq-option-tags__list">'+tags+'</ol>'+otVial('aq-option-tags__vial--a')+otVial('aq-option-tags__vial--b')+'</div>';
 return sec(wFold(b,I.length,inner,b.fold_noun||'options'),'aq-band--limestone aq-option-tags-sec')};
