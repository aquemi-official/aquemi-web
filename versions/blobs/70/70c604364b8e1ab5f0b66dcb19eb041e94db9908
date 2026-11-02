/* Look "revision-register" -> RevisionRegister (design-system/components/RevisionRegister): technical notes kept as
   the notes column of one drawing sheet (pass 9b concept news.0). A limestone sheet in a navy hairline frame: on the
   left the section title set large and light, the intro, and the lead note (the reader's question it answers as a
   quotation, its title, standard and the page that applies it); in the middle, faint, the line drawing of the page
   a note is applied on (the lead note's, or the one pointed at or focused: the drawing follows the reader down the
   column); on the right, behind a hairline rule, the register as the sheet's numbered notes column in mono (number,
   title as the link, status, topic and standard), with the topic filter above it; a title block closes the sheet at
   the bottom right and carries the live count.
   Fields (a register block): h, intro, topics, items [{t, topic, std, date, link, featured, spot, d}], fold,
   fold_noun. Never a date that is not given (a dashed mono "Planned" status instead); the lead note is the featured
   one, else the first of the first topic. Filtering shows every matching note, folded or not; notes that stay glide
   to their new places and new ones fade in. Phones: title, lead note, filter, notes; no drawing. */
(function(){
var RR_SPOT={'sys-monitoring':'toc','sys-pw':'ro-skid','sys-storage':'storage-tank','sys-pretreatment':'pretreatment'},P='aq-revision-register'+'__';
function rrSpot(it){var pg=wsplit(it.link||'')[0],s=it.spot||RR_SPOT[pg]||pageIcon(pg)||'';return isVig(s)?s:''}
LOOKS['revision-register']=function(b,H){var I=b.items||[],T=b.topics||[];if(!I.length)return sec(H);
 var no=function(i){return (i<9?'0':'')+(i+1)},st=function(it){return it.date?tx(it.date):'<span class="'+P+'planned">Planned</span>'};
 var fi=-1;I.forEach(function(it,i){if(fi<0&&it.featured)fi=i});if(fi<0)I.forEach(function(it,i){if(fi<0&&it.topic===T[0])fi=i});if(fi<0)fi=0;
 var f=I[fi],fl=f.link&&wp(f.link);
 var tri='<svg class="'+P+'tri" viewBox="0 0 24 22" aria-hidden="true" focusable="false"><path d="M12 2L22 20H2Z"/></svg>';
 var tabs='<div class="'+P+'tabs" role="group" aria-label="Filter notes by topic"><button type="button" class="'+P+'tab" aria-pressed="true" data-topic="">All <span aria-hidden="true">'+I.length+'</span></button>'
  +T.map(function(t){var n=I.filter(function(it){return it.topic===t}).length;return '<button type="button" class="'+P+'tab" aria-pressed="false" data-topic="'+e(t)+'">'+tx(t)+' <span aria-hidden="true">'+n+'</span></button>'}).join('')+'</div>';
 var lead='<aside class="'+P+'lead" aria-label="'+(f.date?'Latest note':'Next planned note')+'">'
  +'<p class="'+P+'lk">'+tri+'<span>'+(f.date?'Latest':'Next planned')+'</span><span>'+no(fi)+'</span>'+(f.date?'<span>'+tx(f.date)+'</span>':'')+'</p>'
  +(f.d?'<blockquote class="'+P+'q"><p>'+tx(f.d)+'</p></blockquote>':'')
  +'<h3 class="'+P+'lt">'+tx(f.t)+'</h3>'+(f.std?'<p class="'+P+'lstd">'+tx(f.std)+'</p>':'')
  +(fl?'<p class="'+P+'go">Applied on '+wlink(f.link)+'</p>':'')+'</aside>';
 /* the drawing plate: one figure per page a note is applied on, the lead's shown */
 var keys=[],fk=rrSpot(f);I.forEach(function(it){var k=rrSpot(it);if(k&&keys.indexOf(k)<0)keys.push(k)});
 var fig='<div class="'+P+'fig" aria-hidden="true"><span class="'+P+'frame"></span>'+keys.map(function(k){return '<span class="'+P+'dw'+(k===fk?' is-on':'')+'" data-k="'+e(k)+'">'+wSpot(k,'l',P+'spot')+'</span>'}).join('')
  +'<span class="'+P+'figcap">'+I.map(function(it,i){var p=it.link&&wp(it.link);return p?'<span data-i="'+i+'"'+(i===fi?' class="is-on"':'')+'>'+no(i)+' · '+e(p.nav_label||'')+'</span>':''}).join('')+'</span></div>';
 var notes=I.map(function(it,i){var tt=it.link&&wp(it.link)?wlink(it.link,it.t):tx(it.t);
  return fli('<li class="'+P+'note'+(i===fi?' is-lead':'')+'" data-topic="'+e(it.topic||'')+'" data-k="'+e(rrSpot(it))+'" data-i="'+i+'">',b,i)
   +'<span class="'+P+'no">'+no(i)+'.'+(i===fi?tri:'')+'</span><div class="'+P+'nb"><h3 class="'+P+'nt">'+tt+'</h3>'
   +'<p class="'+P+'meta">'+st(it)+(it.topic?'<span>'+tx(it.topic)+'</span>':'')+(it.std?'<span>'+tx(it.std)+'</span>':'')+'</p></div></li>'}).join('');
 var col='<div class="'+P+'col"><div class="'+P+'strip">'+tabs+'</div>'+wFold(b,I.length,'<ul class="'+P+'notes" role="list">'+notes+'</ul>',b.fold_noun||'notes')+'</div>';
 var tb='<div class="'+P+'tb"><span aria-hidden="true">Aquemi</span><span aria-hidden="true">'+tx(b.h||'')+'</span><p class="'+P+'count" aria-live="polite">'+I.length+' notes</p></div>';
 return sec('<div class="aq-revision-register" data-theme="light"><div class="'+P+'grid"><div class="'+P+'left">'+H+lead+'</div>'+fig+col+'</div>'+tb+'</div>','aq-band--limestone aq-revision-register-sec')};
/* filter: Ported from Subframe Motion "Filter mosaic" (filter-mosaic), MIT, (c) 2026 Subframe: each note that stays is
   measured before the filter and inverted after it, gliding over 280 ms cubic-bezier(.22,1,.36,1); notes newly shown
   fade in over 180 ms. Instant under reduced motion. */
document.addEventListener('click',function(ev){var c=ev.target.closest&&ev.target.closest('.'+P+'tab');if(!c)return;
 var r=c.closest('.aq-revision-register'),t=c.getAttribute('data-topic'),n=0,fd=r.querySelector('.aq-fold'),R=[].slice.call(r.querySelectorAll('.'+P+'note'));
 var mo=!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)&&R[0]&&R[0].animate,was=R.map(function(x){return x.offsetParent?x.getBoundingClientRect():null});
 r.querySelectorAll('.'+P+'tab').forEach(function(x){x.setAttribute('aria-pressed',x===c?'true':'false')});
 R.forEach(function(x){var on=!t||x.getAttribute('data-topic')===t;x.hidden=!on;if(on)n++});
 if(fd)fd.classList.toggle('is-filtered',!!t);
 r.querySelector('.'+P+'count').textContent=n+(n===1?' note':' notes')+(t?' in '+t:'');
 if(mo)R.forEach(function(x,i){if(!x.offsetParent)return;var a=was[i],z=x.getBoundingClientRect();
  if(a){var dx=a.left-z.left,dy=a.top-z.top;if(dx||dy)x.animate([{transform:'translate('+dx+'px,'+dy+'px)'},{transform:'none'}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'})}
  else x.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'})})});
/* the drawing follows the note pointed at or focused, and stays: Ported from Subframe Motion "Hover image preview
   list" (project-index), MIT, (c) 2026 Subframe (pointer-enter or focus selects, the selection persists, the panel
   crossfades in 240 ms cubic-bezier(.2,.85,.25,1); CSS) */
function pick(li){var r=li.closest('.aq-revision-register'),k=li.getAttribute('data-k'),i=li.getAttribute('data-i');if(!r)return;
 r.querySelectorAll('.'+P+'note').forEach(function(x){x.classList.toggle('is-pick',x===li)});
 if(k)r.querySelectorAll('.'+P+'dw').forEach(function(x){x.classList.toggle('is-on',x.getAttribute('data-k')===k)});
 var cap=r.querySelectorAll('.'+P+'figcap span');if(r.querySelector('.'+P+'figcap span[data-i="'+i+'"]'))cap.forEach(function(x){x.classList.toggle('is-on',x.getAttribute('data-i')===i)})}
document.addEventListener('pointerover',function(ev){var li=ev.target.closest&&ev.target.closest('.'+P+'note');if(li&&ev.pointerType!=='touch'&&!li.classList.contains('is-pick'))pick(li)});
document.addEventListener('focusin',function(ev){var li=ev.target.closest&&ev.target.closest('.'+P+'note');if(li)pick(li)});
})();
