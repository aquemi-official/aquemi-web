/* Look "binder-tabs" -> BinderTabs (design-system/components/BinderTabs): ordered stages filed as the qualification
   binder. The binder lies open: its navy cover on the left carries the section heading in a label holder; on the
   right, one tab divider per stage is filed on the rings, each with its tab standing proud of the stack (the stage's
   short label, stepping down the edge like real index tabs), the stage name and what it proves, and a sign-off line
   at its foot. The stages read as a sequence of signatures: each divider is signed before the next is opened.
   Fields (a steps block): h, intro, items [{t, d, link, label}]. label: the tab's short text ("IQ", "FAT · SAT");
   without one the tab shows the stage number.
   Phones: the cover becomes a band over the stack; tabs sit at the right end of each divider. */
var BT_SIG=['M2 14C8 4 12 4 11 11S16 18 21 9 28 3 31 11 36 16 42 8 48 6 54 12',
 'M2 12C6 5 11 3 12 10S18 17 24 8 31 4 35 12 42 15 50 7',
 'M2 13C9 3 14 6 13 12S20 16 26 9 30 5 36 11 44 14 52 9'];
LOOKS['binder-tabs']=function(b,H){var I=b.items||[],n=I.length;
 var tabs=I.map(function(it,i){var nm=it.link&&wp(it.link)?'<a href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':tx(it.t);
  return '<li class="aq-binder-tabs__div" style="--i:'+i+'">'
   +'<span class="aq-binder-tabs__holes" aria-hidden="true"></span>'
   +'<span class="aq-binder-tabs__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<div class="aq-binder-tabs__body"><h3 class="aq-binder-tabs__t">'+nm+'</h3>'+(it.d?'<p class="aq-binder-tabs__d">'+tx(it.d)+'</p>':'')+'</div>'
   +'<span class="aq-binder-tabs__sign" aria-hidden="true"><svg viewBox="0 0 56 20" focusable="false"><path d="'+BT_SIG[i%BT_SIG.length]+'"/></svg></span>'
   +'<span class="aq-binder-tabs__tab" aria-hidden="true"><span>'+(it.label?tx(it.label):(i<9?'0':'')+(i+1))+'</span></span></li>'}).join('');
 return sec('<div class="aq-binder-tabs" style="--n:'+n+'">'
  +'<div class="aq-binder-tabs__cover"><div class="aq-binder-tabs__holder">'+H+'</div><span class="aq-binder-tabs__spine" aria-hidden="true"></span></div>'
  +'<div class="aq-binder-tabs__stack"><span class="aq-binder-tabs__rings" aria-hidden="true"><i></i><i></i><i></i></span>'
  +'<ol class="aq-binder-tabs__list">'+tabs+'</ol></div></div>','aq-binder-tabs-sec')};
