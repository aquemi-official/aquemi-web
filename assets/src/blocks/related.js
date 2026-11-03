/* Block "related" -> RelatedLinks: the pages to read next. items: page ids. Pass 9: one pipe runs along the top of the
   row and every page hangs off it by a drop and a node, as a tile: the index and section label, the target page's
   picture and the page's title with an arrow. The whole tile is the link. Desktop: one row of up to five (six as two
   rows of three); phones: one column of rows off a rail down the left.
   Pass 12 (S2): every destination has a drawing in one isometric hand. A page with an equipment drawing (ART, Hero.js)
   shows that drawing; every other page shows its own small IsoKit scene (REL_ISO below: a clipboard of ticked clauses
   for the URS guide, a ruled schedule for how a project runs, binders for the documentation package, and so on), in
   the same ink-muted line as the drawings. A page with neither keeps its title at the bottom of the tile (no empty top).
   Two links to the same page (page#anchor) are told apart by the linked block's heading (wlabel). */
/* REL_ISO: page id -> [world-space scene, its bounds [x, y, w, h]] for pages without an equipment drawing. Scenes are
   composed from IsoKit parts only (drawn back to front); the bounds were measured once from the drawn scene, so the
   viewBox fits it. Nothing here is a fact: no labels, no figures. */
function relSheet(x,y,w,d){return '<path class="aq-iso__eq aq-iso__eq--sheet" d="'+isoBoxD([x,y,0],w,d,0.8)+'"/>'}
function relRule(x,y,w,d,n){var s='';for(var i=0;i<n;i++){var yy=y+d*(i+1)/(n+1);s+='M'+isoT(isoP(x+w*0.12,yy,0.8))+'L'+isoT(isoP(x+w*(i%2?0.7:0.88),yy,0.8))}return '<path class="aq-iso__thin" d="'+s+'"/>'}
function relGrid(x,y,w,d,c,r){var s='',i;for(i=1;i<c;i++){var xx=x+w*i/c;s+='M'+isoT(isoP(xx,y,0.8))+'L'+isoT(isoP(xx,y+d,0.8))}
 for(i=1;i<r;i++){var yy=y+d*i/r;s+='M'+isoT(isoP(x,yy,0.8))+'L'+isoT(isoP(x+w,yy,0.8))}return '<path class="aq-iso__thin" d="'+s+'"/>'}
/* schedule bars, one per row, each starting where the last one is under way */
function relBars(x,y,w,d,r){var s='';for(var i=0;i<r;i++){var yy=y+d*(i+0.5)/r,a=x+w*(0.06+i*0.13),b=a+w*0.36;s+='M'+isoT(isoP(a,yy,0.8))+'L'+isoT(isoP(b,yy,0.8))}return '<path class="aq-iso__acc" d="'+s+'"/>'}
/* a tick at the end of each matrix row */
function relTicks(x,y,w,d,r){var s='';for(var j=0;j<r;j++){var yy=y+d*(j+0.5)/r,xx=x+w*0.88;s+='M'+isoT(isoP(xx-3,yy-1,0.8))+'L'+isoT(isoP(xx-1,yy+1.5,0.8))+'L'+isoT(isoP(xx+3,yy-2.5,0.8))}return '<path class="aq-iso__acc" d="'+s+'"/>'}
/* a dashed footprint on the floor */
function relFoot(x,y,w,d){return '<path class="aq-iso__hid" d="M'+isoT(isoP(x,y,0))+'L'+isoT(isoP(x+w,y,0))+'L'+isoT(isoP(x+w,y+d,0))+'L'+isoT(isoP(x,y+d,0))+'Z"/>'}
var REL_ISO={
 systems:[function(){return isoPart('skid',0,0,0,1,{w:110,d:56})+isoPart('ro',6,6,6,0.9)},[-48,-58,144,141]],
 services:[function(){return isoPart('desk',0,0,0,1.3)},[-40,-80,79,101]],
 'urs-guide':[function(){return isoPart('clipboard',0,0,0,1.6,{ticks:4})},[-40,-25,80,48]],
 'first-system':[function(){return isoPart('wall',-50,-40,0,1,{w:100,h:52})+relFoot(-34,-12,60,44)+isoPart('module',0,10,0,0.8)},[-57,-97,135,126]],
 'project-plan':[function(){return relSheet(-40,-28,80,56)+relGrid(-40,-28,80,56,1,5)+relBars(-40,-28,80,56,5)
  +'<path class="aq-iso__hid" d="M'+isoT(isoP(14,-28,0.8))+'L'+isoT(isoP(14,28,0.8))+'"/>'},[-59,-35,118,69]],
 'cmp-documentation':[function(){return isoPart('binder',0,0,0,1.5)},[-70,-60,116,85]],
 'cmp-quality':[function(){return relSheet(-34,-22,50,40)+relRule(-34,-22,50,40,5)+isoPart('stamp',22,8,0,1.3)},[-45,-29,78,51]],
 compliance:[function(){return relSheet(-38,-26,76,52)+relGrid(-38,-26,76,52,4,6)+relTicks(-38,-26,76,52,6)},[-55,-33,111,65]],
 projects:[function(){return isoPart('skid',0,0,0,1,{w:110,d:56})+isoPart('module',30,28,6,0.8)+isoPart('tank',80,30,6,0.6)},[-48,-33,144,116]],
 industries:[function(){return isoPart('outlet',-30,20,0,1)+isoPart('outlet',20,20,0,1)},[-67,-72,90,104]],
 about:[function(){return isoPart('building',-45,-26,0,1)},[-61,-76,123,111]],
 buying:[function(){return isoPart('truck',-40,-14,0,1)},[-45,-57,101,83]],
 'contact-locations':[function(){return isoPart('building',-60,-40,0,0.8)+isoPart('truck',0,20,0,0.7)},[-53,-82,98,129]],
 'contact-service':[function(){return isoPart('panel',0,0,0,1.4)},[-30,-93,61,111]],
 'contact-proposal':[function(){return relSheet(-30,-20,44,34)+relRule(-30,-20,44,34,4)+isoPart('clipboard',20,10,0,1)},[-38,-26,72,55]],
 'ind-hospital-lab':[function(){return isoPart('outlet',0,0,0,1.4)},[-33,-93,65,111]],
 'ind-process':[function(){return isoPart('tank',-20,0,0,0.8)+isoPart('pump',30,20,0,1)},[-40,-83,97,136]],
 'ind-personal-care':[function(){return isoPart('tank',0,0,0,1)},[-28,-91,57,107]]
};
function relIso(s){var r=REL_ISO[s];if(!r||typeof isoSvg!=='function')return '';var b=r[1],m=4;
 return isoSvg(b[2]+2*m,b[3]+2*m,r[0](),'aq-iso--raised aq-related-links__iso',{origin:[m-b[0],m-b[1]]}).replace('<svg ','<svg data-iso-motion="off" ')}
function relVis(id){var s=wsplit(id)[0],iso;
 if(ART[s])return '<span class="aq-related-links__vis is-art" aria-hidden="true"><span class="aq-illustration aq-related-links__art" style="'+artMask(s)+'"></span></span>';
 if((iso=relIso(s)))return '<span class="aq-related-links__vis is-iso" aria-hidden="true">'+iso+'</span>';
 var n=pageIcon(id);
 return n?'<span class="aq-related-links__vis" aria-hidden="true">'+wSpot(n,'l','aq-related-links__spot')+'</span>':''}
BLOCKS['related']=function(b,H){var I=(b.items||[]).filter(wp),pg={};
 I.forEach(function(id){var s=wsplit(id)[0];pg[s]=(pg[s]||0)+1});
 return sec(H+'<ol class="aq-related-links" style="--n:'+I.length+'">'+I.map(function(id,i){var p=wp(id),n=(i<9?'0':'')+(i+1),v=relVis(id),
  t=pg[wsplit(id)[0]]>1?wlabel(id):p.nav_label;
 return '<li><a class="aq-related-links__card'+(v?'':' is-bare')+'" href="#'+e(id)+'" data-wp="'+e(id)+'"><span class="aq-related-links__n" aria-hidden="true">'+n+'</span>'
  +'<span class="aq-related-links__group"><span aria-hidden="true">'+n+' / </span>'+e(p.section)+'</span>'+v
  +'<span class="aq-related-links__title">'+tx(t)+'<span class="aq-related-links__arrow" aria-hidden="true">→</span></span></a></li>'}).join('')+'</ol>');};
