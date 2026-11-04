/* Look "capital-request" -> CapitalRequest (design-system/components/CapitalRequest): the reasons as a capital request
   form already filled in (pass 12 D, concept 247). One flat paper sheet with a folded corner on the section's ground,
   a sheet title, then one numbered field per reason: a boxed number, the reason as the field label, its text typed in
   on the field line, and an "Attach" link with a paperclip to the page behind that reason. The references a field
   rests on stand as mono boxes in the margin beside that field (on phones: inline under its label).
   Desktop: the first fields run the full width, the last two share a row (4 items: 01, 02 full, 03 and 04 side by
   side). Phones: the same form at full width, fields stacked, every field open (no PhoneKit: there is nothing to pick
   and no drawing to follow, so the phone is the desktop's form one column wide).
   Fields (a grid block): h, intro (section head), sheet (look-only: the form's title, default "Capital request"; on phones it breaks after its colon),
   items [{t, d, link, tag, codes}]. codes: the references to set in the margin (each must appear in that item's d);
   without codes, an item's tag stands there alone. */
LOOKS['capital-request']=function(b,H){var I=b.items||[],n=I.length,half=n>=3?2:0,st=String(b.sheet||'Capital request'),cut=st.indexOf(': '),
  ttl=cut>0?'<span class="aq-capital-request__kind">'+tx(st.slice(0,cut+1))+'</span> <span>'+tx(st.slice(cut+2))+'</span>':tx(st);
 var clip='<svg class="aq-capital-request__clip" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M10.5 5.5 6 10a1.4 1.4 0 0 0 2 2l5-5a2.8 2.8 0 0 0-4-4L3.8 8.2a4.2 4.2 0 0 0 6 6L14 10"/></svg>';
 var li=I.map(function(it,i){var num=(i<9?'0':'')+(i+1),go=it.link&&wp(it.link),
   codes=(it.codes&&it.codes.length?it.codes:(it.tag?[it.tag]:[])),
   cs=codes.length?'<ul class="aq-capital-request__codes" aria-hidden="true">'+codes.map(function(c){return '<li class="aq-capital-request__code">'+tx(c)+'</li>'}).join('')+'</ul>':'';
  return '<li class="aq-capital-request__field'+(i>=n-half?' is-half':'')+(codes.length?' has-codes':'')+'" style="--i:'+i+'">'
   +'<span class="aq-capital-request__n" aria-hidden="true">'+num+'</span>'
   +'<h3 class="aq-capital-request__t"><span class="aq-capital-request__type">'+tx(it.t)+'</span><span class="aq-capital-request__caret" aria-hidden="true"></span></h3>'
   +cs+(it.d?'<p class="aq-capital-request__d">'+tx(it.d)+'</p>':'')
   +(go?'<a class="aq-capital-request__attach" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">Attach'+clip+'<span class="aq-capital-request__sr">: the page behind '+tx(it.t)+'</span></a>':'')
   +'<span class="aq-capital-request__rule" aria-hidden="true"></span></li>'}).join('');
 return sec(H+'<div class="aq-capital-request" data-n="'+n+'"><div class="aq-capital-request__sheet" data-theme="light">'
  +'<svg class="aq-capital-request__fold" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><path class="aq-capital-request__flap" d="M0 0V40H40Z"/><path class="aq-capital-request__crease" d="M0 0 40 40"/></svg>'
  +'<p class="aq-capital-request__title">'+ttl+'</p>'
  +'<ol class="aq-capital-request__fields" role="list">'+li+'</ol></div></div>','aq-capital-request-sec')};
