/* Look "industry-feed" -> IndustryFeed (design-system/components/IndustryFeed): one water line feeding a few
   destinations, set as editorial type. A twin-wall pipe enters from the page edge under the heading and runs across;
   at each column it drops down a tee into that column, where the destination's evidence (its standard tag) is the
   hero type, set large in mono, with the name and one line under it. Same water, different evidence.
   Phones: the pipe runs down the left edge and branches right into each item.
   Fields (a grid block): h, items [{t, d, tag, link}]. tag is the evidence shown large (keep it short: a standard
   code); an item without one shows its number large instead (pass 12 round C: never its name, which the title
   already carries) and drops the small number line. Best for 2 to 4 items. */
LOOKS['industry-feed']=function(b,H){var I=b.items||[],n=I.length,len=Math.max.apply(null,[8].concat(I.map(function(it){return String(it.tag||'00').length})));
 var li=I.map(function(it,i){var num=(i<9?'0':'')+(i+1),go=it.link&&wp(it.link);
  var inner='<span class="aq-industry-feed__drop" aria-hidden="true"><span class="aq-industry-feed__water"></span></span><span class="aq-industry-feed__node" aria-hidden="true"></span>'
   +(it.tag?'<p class="aq-industry-feed__code" aria-hidden="true">'+num+'</p><p class="aq-industry-feed__ev">'+tx(it.tag)+'</p>'
    :'<p class="aq-industry-feed__ev is-num" aria-hidden="true">'+num+'</p>')
   +'<h3 class="aq-industry-feed__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="aq-industry-feed__d">'+tx(it.d)+'</p>':'');
  return '<li class="aq-industry-feed__item" style="--i:'+i+'">'+(go?'<a class="aq-industry-feed__card" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+inner+'</a>':'<div class="aq-industry-feed__card">'+inner+'</div>')+'</li>'}).join('');
 return sec(H+'<div class="aq-industry-feed" style="--n:'+n+';--len:'+len+'"><span class="aq-industry-feed__trunk" aria-hidden="true"><span class="aq-industry-feed__water"></span></span>'
  +'<span class="aq-industry-feed__drip" aria-hidden="true"></span><ol class="aq-industry-feed__list">'+li+'</ol></div>','aq-industry-feed-sec')};
