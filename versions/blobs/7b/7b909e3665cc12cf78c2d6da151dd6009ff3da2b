/* Look "revision-register" -> RevisionRegister (design-system/components/RevisionRegister): technical notes kept as
   the notes column of one drawing sheet (pass 9b concept news.0). A limestone sheet in a navy hairline frame: on the
   left the section title set large and light, the intro, and the lead note (the reader's question it answers as a
   quotation, its title, standard and the page that applies it); in the middle, faint, the line drawing of the page
   a note is applied on (the lead note's, or the one pointed at or focused: the drawing follows the reader down the
   column); on the right, behind a hairline rule, the register as the sheet's numbered notes column in mono (number,
   title as the link, status, topic and standard), with the topic filter above it; a title block closes the sheet at
   the bottom right and carries the live count.
   Counts count what exists (DR-018 rule 6): a note with a date counts as a note; one without, or one whose date is
   still a placeholder (opens with "["), counts as a topic. A topic's status is its placeholder date, or else the page
   that answers it (a dashed mono status); as the lead it reads "Featured", never "Latest" (DR-028: no "planned" or
   "next" wording about our own record). The lead note's link reads "Applied on <page>", or "Read the note" when
   it points at the page the register is on (a note published on news itself). The title
   block reads "N notes", "N topics" when no note has a date, or "N notes · M topics"; so does the live count after
   filtering; the "All" filter reads "All N topics" when no note has a date.
   Fields (a register block): h, intro, topics, items [{t, topic, std, date, link, featured, spot, d}], fold,
   fold_noun. Never a date that is not given (the dashed page status instead); the lead note is the featured
   one, else the first of the first topic. Filtering shows every matching note, folded or not; notes that stay glide
   to their new places and new ones fade in. Phones: title, lead note, filter, notes; no drawing.
   Pass 12 round C: an item may name the part its note is about (look-only "part": "pipe"); the featured row then carries
   data-part and the plate draws that part (IsoKit, a PP pipe cut section in a socket at 3x the kit's pipe radius)
   in place of the page vignette, so the preview opens on the note's own subject. */
(function(){
/* rrCount: the count words for a set of notes, dated ones as notes and undated ones as topics (DR-018 rule 6) */
function rrCount(d,p,t){var a=d?d+(d===1?' note':' notes'):'',z=p?p+(p===1?' topic':' topics'):'';return (a&&z?a+' · '+z:(a||z||'0 notes'))+(t?' in '+t:'')}
var RR_SPOT={'sys-monitoring':'toc','sys-pw':'ro-skid','sys-storage':'storage-tank','sys-pretreatment':'pretreatment'},P='aq-revision-register'+'__';
/* rrPart: the part a note is about, drawn with IsoKit (only "pipe" so far): a socket collar, the pipe leaving it towards
   the viewer, and its cut face (wall annulus over the sunken bore) */
function rrPart(k){if(k!=='pipe'||typeof isoCylD!=='function')return '';
 var r=7.2,R=r*1.32,y0=-34,yc=y0+14,y1=30,cl=isoCylD([0,y0,0],'y',14,R),pp=isoCylD([0,yc,0],'y',y1-yc,r);
 var inner='<path class="aq-iso__eq" d="'+cl[0]+cl[1]+'"/><path class="aq-iso__eq" d="'+pp[0]+pp[1]+'"/>'
  +'<path class="aq-iso__eq aq-iso__eq--alt" d="'+isoRingD([0,y1,0],'y',r*0.8)+'"/>'
  +'<path class="aq-iso__thin" d="'+isoBandD([0,yc+2.5,0],'y',r)+'"/>';
 var bb=isoBounds([[0,y0,R],[0,y0,-R],[R,y0,0],[-R,y0,0],[0,y1,r],[0,y1,-r],[r,y1,0],[-r,y1,0],[0,y0,0],[0,y1,0]],6);
 return isoSvg(bb.w,bb.h,inner,'aq-iso--limestone '+P+'part',{origin:[-bb.x,-bb.y]})}
function rrSpot(it){var pg=wsplit(it.link||'')[0],s=it.spot||RR_SPOT[pg]||pageIcon(pg)||'';return isVig(s)?s:''}
LOOKS['revision-register']=function(b,H){var I=b.items||[],T=b.topics||[];if(!I.length)return sec(H);
 var dated=function(it){return !!it.date&&!/^\s*\[/.test(String(it.date))};
 var no=function(i){return (i<9?'0':'')+(i+1)},st=function(it){var q=it.link&&wp(it.link);return dated(it)||it.date?tx(it.date):'<span class="'+P+'planned">'+e((q&&q.nav_label)||'Topic')+'</span>'};
 var nd=I.filter(dated).length,fi=-1;I.forEach(function(it,i){if(fi<0&&it.featured)fi=i});if(fi<0)I.forEach(function(it,i){if(fi<0&&it.topic===T[0])fi=i});if(fi<0)fi=0;
 var f=I[fi],fl=f.link&&wp(f.link),fd=dated(f),pg=W().filter(function(q){return (q.blocks||[]).indexOf(b)>=0})[0],self=fl&&pg&&wsplit(f.link)[0]===pg.id;
 var tri='<svg class="'+P+'tri" viewBox="0 0 24 22" aria-hidden="true" focusable="false"><path d="M12 2L22 20H2Z"/></svg>';
 var tabs='<div class="'+P+'tabs" role="group" aria-label="Filter notes by topic"><button type="button" class="'+P+'tab" aria-pressed="true" data-topic="">All <span aria-hidden="true">'+I.length+(nd?'':' topics')+'</span></button>'
  +T.map(function(t){var n=I.filter(function(it){return it.topic===t}).length;return '<button type="button" class="'+P+'tab" aria-pressed="false" data-topic="'+e(t)+'">'+tx(t)+' <span aria-hidden="true">'+n+'</span></button>'}).join('')+'</div>';
 var lead='<aside class="'+P+'lead" aria-label="'+(fd?'Latest note':'Featured note')+'">'
  +'<p class="'+P+'lk">'+tri+'<span>'+(fd?'Latest':'Featured')+'</span><span>'+no(fi)+'</span>'+(f.date?'<span>'+tx(f.date)+'</span>':'')+'</p>'
  +(f.d?'<blockquote class="'+P+'q"><p>'+tx(f.d)+'</p></blockquote>':'')
  +'<h3 class="'+P+'lt">'+tx(f.t)+'</h3>'+(f.std?'<p class="'+P+'lstd">'+tx(f.std)+'</p>':'')
  +(fl?'<p class="'+P+'go">'+(self?wlink(f.link,'Read the note'):'Applied on '+wlink(f.link))+'</p>':'')+'</aside>';
 /* the drawing plate: one figure per page a note is applied on, the lead's shown */
 var keys=[],fpart=f.part&&rrPart(f.part)?String(f.part):'',fk=fpart?'part-'+fpart:rrSpot(f);if(fpart)keys.push(fk);I.forEach(function(it){var k=rrSpot(it);if(k&&keys.indexOf(k)<0)keys.push(k)});
 var fig='<div class="'+P+'fig" aria-hidden="true"><span class="'+P+'frame"></span>'+keys.map(function(k){return '<span class="'+P+'dw'+(k===fk?' is-on':'')+'" data-k="'+e(k)+'">'+(fpart&&k===fk?rrPart(fpart):wSpot(k,'l',P+'spot'))+'</span>'}).join('')
  +'<span class="'+P+'figcap">'+I.map(function(it,i){var p=it.link&&wp(it.link);return p?'<span data-i="'+i+'"'+(i===fi?' class="is-on"':'')+'>'+no(i)+' · '+e(p.nav_label||'')+'</span>':''}).join('')+'</span></div>';
 var notes=I.map(function(it,i){var tt=it.link&&wp(it.link)?wlink(it.link,it.t):tx(it.t);
  return fli('<li class="'+P+'note'+(i===fi?' is-lead':'')+'" data-topic="'+e(it.topic||'')+'" data-k="'+e(i===fi&&fpart?fk:rrSpot(it))+'" data-i="'+i+'"'+(i===fi&&fpart?' data-part="'+e(fpart)+'"':'')+(dated(it)?' data-dated=""':'')+'>',b,i)
   +'<span class="'+P+'no">'+no(i)+'.'+(i===fi?tri:'')+'</span><div class="'+P+'nb"><h3 class="'+P+'nt">'+tt+'</h3>'
   +'<p class="'+P+'meta">'+st(it)+(it.topic?'<span>'+tx(it.topic)+'</span>':'')+(it.std?'<span>'+tx(it.std)+'</span>':'')+'</p></div></li>'}).join('');
 var col='<div class="'+P+'col"><div class="'+P+'strip">'+tabs+'</div>'+wFold(b,I.length,'<ul class="'+P+'notes" role="list">'+notes+'</ul>',b.fold_noun||'notes')+'</div>';
 var tb='<div class="'+P+'tb"><span aria-hidden="true">Aquemi</span><span aria-hidden="true">'+tx(b.h||'')+'</span><p class="'+P+'count" aria-live="polite">'+rrCount(nd,I.length-nd)+'</p></div>';
 return sec('<div class="aq-revision-register" data-theme="light"><div class="'+P+'grid"><div class="'+P+'left">'+H+lead+'</div>'+fig+col+'</div>'+tb+'</div>','aq-band--limestone aq-revision-register-sec')};
/* filter: Ported from Subframe Motion "Filter mosaic" (filter-mosaic), MIT, (c) 2026 Subframe: each note that stays is
   measured before the filter and inverted after it, gliding over 280 ms cubic-bezier(.22,1,.36,1); notes newly shown
   fade in over 180 ms. Instant under reduced motion. */
document.addEventListener('click',function(ev){var c=ev.target.closest&&ev.target.closest('.'+P+'tab');if(!c)return;
 var r=c.closest('.aq-revision-register'),t=c.getAttribute('data-topic'),n=0,d=0,fd=r.querySelector('.aq-fold'),R=[].slice.call(r.querySelectorAll('.'+P+'note'));
 var mo=!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)&&R[0]&&R[0].animate,was=R.map(function(x){return x.offsetParent?x.getBoundingClientRect():null});
 r.querySelectorAll('.'+P+'tab').forEach(function(x){x.setAttribute('aria-pressed',x===c?'true':'false')});
 R.forEach(function(x){var on=!t||x.getAttribute('data-topic')===t;x.hidden=!on;if(on){n++;if(x.hasAttribute('data-dated'))d++}});
 if(fd)fd.classList.toggle('is-filtered',!!t);
 r.querySelector('.'+P+'count').textContent=rrCount(d,n-d,t);
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
