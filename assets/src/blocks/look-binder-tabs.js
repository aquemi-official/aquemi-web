/* Look "binder-tabs" -> BinderTabs (design-system/components/BinderTabs): ordered stages filed as the qualification
   binder. The binder lies open: its navy cover on the left carries the section heading in a label holder; on the
   right, one tab divider per stage is filed on the rings, each with its tab standing proud of the stack (the stage's
   short label, stepping down the edge like real index tabs), the stage name and what it proves, and a sign-off line
   at its foot. The stages read as a sequence of signatures: each divider is signed before the next is opened.
   Fields (a steps block): h, intro, items [{t, d, link, label}]. label: the tab's short text ("IQ", "FAT · SAT");
   without one the tab shows the stage number.
   Phones: the cover becomes a band over the stack; the tab sits over each divider's name; the binder is signed once,
   on its last divider (the other sign-off lines drop), and a linked divider is a link from edge to edge.
   Long binders (8 dividers or more) on phones (pass 12, S11, PhoneKit): a strip of the tab labels sticks under the
   header over the stack (44 px tabs, a scrolling row that follows the divider being read, a tap jumps to it), and each
   divider closes to its number, name and one line of what it settles, a tap opening the whole of it. The head button sits
   in an h3 (the desktop h3 is hidden there), and the last divider keeps its sign-off under it. */
var BT_SIG=['M2 14C8 4 12 4 11 11S16 18 21 9 28 3 31 11 36 16 42 8 48 6 54 12',
 'M2 12C6 5 11 3 12 10S18 17 24 8 31 4 35 12 42 15 50 7',
 'M2 13C9 3 14 6 13 12S20 16 26 9 30 5 36 11 44 14 52 9'];
LOOKS['binder-tabs']=function(b,H){var I=b.items||[],n=I.length;
 var long=n>=8,lab=function(it,i){return it.label?tx(it.label):(i<9?'0':'')+(i+1)};
 var tabs=I.map(function(it,i){var lk=it.link&&wp(it.link),nm=lk?'<a href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':tx(it.t),no=(i<9?'0':'')+(i+1);
  var head=long?'<h3 class="aq-binder-tabs__ph"><button type="button" class="aq-binder-tabs__hd" data-pk-head><span class="aq-binder-tabs__hn" aria-hidden="true">'+no+'</span><span class="aq-binder-tabs__ht">'+tx(it.t)+'</span>'
   +'<span class="aq-phone-kit__chev" aria-hidden="true"></span>'+(it.d?'<span class="aq-binder-tabs__h1" aria-hidden="true">'+tx(it.d)+'</span>':'')+'</button></h3>':'';
  return '<li class="aq-binder-tabs__div'+(lk?' has-link':'')+'" style="--i:'+i+'"'+(long?' data-pk-item="'+i+'" data-pk-row="'+i+'"':'')+'>'
   +'<span class="aq-binder-tabs__holes" aria-hidden="true"></span>'
   +'<span class="aq-binder-tabs__n" aria-hidden="true"'+(long?' data-pk-desk':'')+'>'+no+'</span>'+head
   +'<div class="aq-binder-tabs__body"'+(long?' data-pk-body':'')+'><h3 class="aq-binder-tabs__t"'+(long?' data-pk-desk':'')+'>'+nm+'</h3>'+(it.d?'<p class="aq-binder-tabs__d">'+tx(it.d)+'</p>':'')
   +(long&&lk?'<a class="aq-phone-kit__go aq-binder-tabs__go" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':'')+'</div>'
   +'<span class="aq-binder-tabs__sign" aria-hidden="true"><svg viewBox="0 0 56 20" focusable="false"><path d="'+BT_SIG[i%BT_SIG.length]+'"/></svg></span>'
   +'<span class="aq-binder-tabs__tab" aria-hidden="true"'+(long?' data-pk-desk':'')+'><span>'+lab(it,i)+'</span></span></li>'}).join('');
 var strip=long?'<div class="aq-binder-tabs__strip" data-pk-fig><div class="aq-binder-tabs__strip-in" role="group" aria-label="'+e(String(b.h||'Sections'))+'">'
  +I.map(function(it,i){return '<button type="button" class="aq-binder-tabs__sb" data-pk-key="'+i+'" data-bt-to="'+i+'">'+lab(it,i)+'</button>'}).join('')+'</div></div>':'';
 return sec('<div class="aq-binder-tabs'+(long?' is-long':'')+'" style="--n:'+n+'">'
  +'<div class="aq-binder-tabs__cover"><div class="aq-binder-tabs__holder">'+H+'</div><span class="aq-binder-tabs__spine" aria-hidden="true"></span></div>'
  +'<div class="aq-binder-tabs__stack"'+(long?' data-pk-sticky data-pk-h="96"':'')+'><span class="aq-binder-tabs__rings" aria-hidden="true"><i></i><i></i><i></i></span>'+strip
  +'<ol class="aq-binder-tabs__list"'+(long?' data-pk-picker="accordion" data-pk-open="-1"':'')+'>'+tabs+'</ol></div></div>','aq-binder-tabs-sec')};
/* Long binders on phones: a tab in the strip opens its divider and brings it under the strip; the strip keeps the
   divider being read in view (PhoneKit's pk:change from the stack). State, not motion: works with reduced motion. */
(function(){
 function keep(strip,t){var s=strip.querySelector('.aq-binder-tabs__strip-in');if(!s||!t)return;var a=t.getBoundingClientRect().left-s.getBoundingClientRect().left+s.scrollLeft,z=a+t.offsetWidth;
  if(a<s.scrollLeft+8)s.scrollLeft=a-8;else if(z>s.scrollLeft+s.clientWidth-8)s.scrollLeft=z-s.clientWidth+8}
 document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('[data-bt-to]');if(!t)return;var st=t.closest('.aq-binder-tabs__stack'),ol=st&&st.querySelector('.aq-binder-tabs__list'),i=+t.getAttribute('data-bt-to');
  if(!ol)return;var li=ol.children[i],bh=matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';if(!li)return;
  /* land the divider just over PhoneKit's reading line, so the strip lights the tab that was tapped */
  if(window.AQpk&&AQpk.on(ol)){AQpk.open(ol,i);scrollTo({top:scrollY+li.getBoundingClientRect().top-AQpk.line(st)+32,behavior:bh})}else li.scrollIntoView({block:'start',behavior:bh})});
 document.addEventListener('pk:change',function(ev){var st=ev.target;if(!st||!st.classList||!st.classList.contains('aq-binder-tabs__stack')||!ev.detail||!ev.detail.on)return;
  var strip=st.querySelector('.aq-binder-tabs__strip');keep(strip,strip&&strip.querySelector('[data-pk-key="'+ev.detail.key+'"]'))});
})();
