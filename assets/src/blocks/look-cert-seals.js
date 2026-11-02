/* Look "cert-seals" -> CertSeals (design-system/components/CertSeals): certification status as a row of certificate
   tiles, Swiss in build. Each tile carries a seal (a ring of ticks round the item's line icon), the standard or mark
   it is held to (the item's tag) set large and light, what it covers, and its status. The first tile is navy, the
   rest limestone in two shades (paper: data-theme="light", so placeholders keep their light chip in the dark theme). A tile with a link is the link (an arrow at its foot). Long tags (placeholders) set
   smaller so the tile keeps its shape.
   The navy tile carries a certificate's engraved rosette, drawn by FxGuilloche (ambient WebGL, aria-hidden, faint).
   Fields (a grid block): h, intro, items [{t, d, tag, icon, link}]. Phones: tiles two a row, then one. */
LOOKS['cert-seals']=function(b,H){var I=b.items||[];
 var ticks='';for(var k=0;k<36;k++){var a=k*10*Math.PI/180,r1=k%3?27:25,r2=30;ticks+='M'+(32+r1*Math.cos(a)).toFixed(1)+' '+(32+r1*Math.sin(a)).toFixed(1)+'L'+(32+r2*Math.cos(a)).toFixed(1)+' '+(32+r2*Math.sin(a)).toFixed(1)}
 var seal=function(ic){return '<span class="aq-cert-seals__seal" aria-hidden="true"><svg viewBox="0 0 64 64" focusable="false"><path class="aq-cert-seals__ticks" d="'+ticks+'"/>'
  +'<circle class="aq-cert-seals__ring" cx="32" cy="32" r="22"/></svg>'+(ic&&isIcon(ic)?wIcon(ic,'aq-cert-seals__icon'):'')+'</span>'};
 var tiles=I.map(function(it,i){var tag=String(it.tag||''),long=tag.length>14,lk=it.link&&wp(it.link),fx=i?'':' aq-fx-host';
  var inner=(i?'':'<canvas class="aq-fx-shader" data-gl="guilloche" aria-hidden="true"></canvas>')+seal(it.icon)+(tag?'<p class="aq-cert-seals__tag'+(long?' is-long':'')+'">'+tx(tag)+'</p>':'')
   +'<h3 class="aq-cert-seals__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="aq-cert-seals__d">'+tx(it.d)+'</p>':'')+(lk?'<span class="aq-cert-seals__go" aria-hidden="true"></span>':'');
  return '<li class="aq-cert-seals__item" style="--i:'+i+'"'+(i?' data-theme="light"':'')+'>'+(lk?'<a class="aq-cert-seals__tile'+fx+'" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+inner+'</a>':'<div class="aq-cert-seals__tile'+fx+'">'+inner+'</div>')+'</li>'}).join('');
 return sec(H+'<div class="aq-cert-seals"><ol class="aq-cert-seals__list" role="list" style="--n:'+I.length+'">'+tiles+'</ol></div>','aq-cert-seals-sec')};
