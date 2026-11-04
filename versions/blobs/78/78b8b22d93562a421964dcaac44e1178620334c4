/* Look "limit-bento" -> LimitBento (design-system/components/LimitBento): a spec block's limits as a bento of tiles, one
   limit per tile with the value set as an oversized Geist Mono numeral, and one tall navy tile in the middle: a water
   column drawn to the scale of the highlighted limit, filled to that limit (the value we design to) with the other
   pharmacopoeia's looser value as a dashed mark high above it, so "the stricter value" reads as distance.
   Grid (desktop): heading top left, the first row's tile under it, the water column through the middle, the other rows
   stacked on the right; further rows run on underneath. Phones: heading, the water column as a short wide band, then
   the tiles one by one.
   Fields: h, caption (eyebrow; also the chip under the intro), intro, rows [{p, v, m, hl, level, icon, alt}], note.
   New optional row fields: icon (an Icon name drawn in the tile's corner); alt {v, m} on the row the column draws
   (the first row that has one): the other pharmacopoeia's value for the same parameter ("≤ 5.1 µS/cm at 25 °C",
   "Ph. Eur."). Without any alt the bento has no column and the tiles take three across.
   The basis (m) prints as one tag per ";" part; a level chip prints only when the parameter name does not already say it.
   Phones (pass 12): the tile of the row the column draws folds into the column (no repeat of the same value).
   Uses gaugeParse / gaugeLevel / gaugeScale / gaugeNum / wGaugeGo (blocks/spec.js). */
function lbVal(g,v){return g?'<span class="aq-limit-bento__c">'+e(g.c)+'</span><span class="aq-limit-bento__n aq-num">'+e(g.t)+'</span>'+(g.u?' <span class="aq-limit-bento__u">'+tx(g.u)+'</span>':''):'<span class="aq-limit-bento__n">'+tx(v)+'</span>'}
function lbColumn(r){var g=gaugeParse(r.v),a=gaugeParse(r.alt&&r.alt.v);if(!g||!a)return '';
 var S=gaugeScale(Math.max(g.n,a.n),false),max=S[0],div=S[1]*2,f=function(n){return Math.min(n/max,1)},ticks='',i;
 for(i=0;i<=div;i++){var y=(100-100*i/div).toFixed(2);ticks+='<li style="top:'+y+'%"'+(i%2?' class="is-minor"':'')+'>'+(i%2?'':'<span>'+gaugeNum(max*i/div)+'</span>')+'</li>'}
 /* the water: a flow-blue body with a wave on top, the wave midline at the limit */
 var wave='<svg class="aq-limit-bento__wave" viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true"><path class="aq-limit-bento__wbody" d="M0 12 C 50 2, 100 2, 150 12 S 250 22, 300 12 S 380 4, 400 10 L400 24 L0 24Z"/><path class="aq-limit-bento__wline" d="M0 12 C 50 2, 100 2, 150 12 S 250 22, 300 12 S 380 4, 400 10"/></svg>';
 return '<figure class="aq-limit-bento__col" style="--lim:'+f(g.n).toFixed(4)+';--alt:'+f(a.n).toFixed(4)+'">'
  +'<figcaption class="aq-limit-bento__cap"><span class="aq-limit-bento__cap-p">'+tx(r.p)+'</span>'+(g.q?'<span class="aq-limit-bento__cap-q">'+tx(g.q)+'</span>':'')+'</figcaption>'
  +'<div class="aq-limit-bento__tank">'
  +'<ol class="aq-limit-bento__scale" aria-hidden="true">'+ticks+'</ol>'
  +'<div class="aq-limit-bento__mark aq-limit-bento__mark--alt"><p class="aq-limit-bento__mv"><span>'+e((a.c?a.c+' ':'')+a.t)+'</span> '+tx(a.u)+'</p><p class="aq-limit-bento__mm">'+tx(r.alt.m||'')+'</p></div>'
  +'<span class="aq-limit-bento__gap" aria-hidden="true"></span><div class="aq-limit-bento__water" aria-hidden="true">'+wave+'</div>'
  +'<div class="aq-limit-bento__mark aq-limit-bento__mark--lim"><p class="aq-limit-bento__mv"><span>'+e((g.c?g.c+' ':'')+g.t)+'</span> '+tx(g.u)+'</p><p class="aq-limit-bento__mm">'+tx(String(r.m||'').split(/\s*;\s*/)[0])+'</p></div>'
  +'</div></figure>'}
LOOKS['limit-bento']=function(b,H){
 var rows=b.rows||[],ci=-1;rows.some(function(r,i){if(r.alt&&r.alt.v){ci=i;return true}});
 var col=ci>=0?lbColumn(rows[ci]):'';
 var head='<div class="aq-limit-bento__head">'+wSecHead({h:b.h,intro:b.intro})+(b.caption?'<p class="aq-limit-bento__chip">'+tx(b.caption)+'</p>':'')+'</div>';
 var tiles=rows.map(function(r,i){var g=gaugeParse(r.v),lvl=gaugeLevel(r),q=g&&g.q?g.q:'';
  /* phones (pass 12): the column already says this row whole (value, condition, its one basis), so its tile folds into
     the column's caption there; a row with more than one basis or a link keeps its tile */
  var folds=i===ci&&!!col&&String(r.m||'').split(/\s*;\s*/).filter(Boolean).length<=1&&!wGaugeGo(r);
  return '<li class="aq-limit-bento__tile'+(r.hl?' is-hl':'')+(folds?' is-col':'')+'"'+(i%2?' data-theme="light"':'')+'>'
   +'<div class="aq-limit-bento__top">'+idx(i)+'<h3 class="aq-limit-bento__p">'+tx(r.p)+'</h3>'+(isIcon(r.icon)?wIcon(r.icon,'aq-limit-bento__ic'):'')+'</div>'
   +(lvl&&String(r.p||'').toLowerCase().indexOf(lvl.toLowerCase())<0?'<p class="aq-limit-bento__lvl">'+e(lvl)+'</p>':'')
   +'<p class="aq-limit-bento__v">'+lbVal(g,r.v)+'</p>'
   +(q?'<p class="aq-limit-bento__q">'+tx(q)+'</p>':'')
   +(r.m?'<p class="aq-limit-bento__m">'+String(r.m).split(/\s*;\s*/).filter(Boolean).map(function(x){return '<span class="aq-tag">'+tx(x)+'</span>'}).join(' ')+'</p>':'')+wGaugeGo(r)+'</li>'}).join('');
 return sec('<div class="aq-limit-bento'+(col?'':' is-plain')+'">'+head+col+'<ol class="aq-limit-bento__tiles" role="list">'+tiles+'</ol></div>'+wSpecNote(b),'aq-limit-bento-sec')};
