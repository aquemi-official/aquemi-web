/* Look "note-sheet" -> NoteSheet (design-system/components/NoteSheet): the notes register with its featured note
   previewed as a tall drawing sheet (pass 12 E, concept 254). On the limestone band: the section title and intro across
   the top; at the left a tall folded-corner sheet of paper, the featured note's own drawing at its head (a flat-bottom
   PP storage tank on its plinth with its loop: outlet, PP diaphragm valve, riser and return, IsoKit), then the reader's
   question, the note's title (the sheet's link) and its standard in mono as the sheet's foot; at the right the topic
   line over a strong rule and the numbered rows (number, title, topic and standard at the right, the date where one is
   given). The featured row sits between two flow rules and one flow leader runs from it across the gutter into the
   sheet, so the preview and its row read as one note.
   Counts count what exists (DR-018 rule 6): a note with a date counts as a note; one without, or one whose date is
   still a placeholder (opens with "["), counts as a topic. The sheet's link reads "Read the note" when the note is on
   the page the register is on, else "Applied on <page>".
   Fields (a register block): h, intro, topics, items [{t, topic, std, date, link, featured, spot, d}], fold,
   fold_noun. The featured item is the one with featured: true, else the first of the first topic. Its drawing: the
   storage-tank loop when its spot (or its linked page) is the storage tank, else its Spot vignette. Never a date that
   is not given. Filtering shows every matching row, folded or not.
   Phones (page container <= 600 px): the sheet becomes a compact card above the list (drawing strip, number, title,
   standard), the topic line one sideways-scrolling row of 44 px chips, rows 01-03 under "All" (Show all opens the
   rest), each whole row one link; the leader turns down the left edge from the card to row 01's flow rule. */
(function(){
var P='aq-note-sheet'+'__';
/* nsStd: a standard line as unbroken segments split on '; ' (markup only), so no code breaks inside itself */
function nsStd(v){return String(v).split('; ').map(function(x){return '<span class="'+P+'seg">'+tx(x)+'</span>'}).join('; ')}
function nsCount(d,p,t){var a=d?d+(d===1?' note':' notes'):'',z=p?p+(p===1?' topic':' topics'):'';return (a&&z?a+' · '+z:(a||z||'0 notes'))+(t?' in '+t:'')}
/* nsTank: the featured note's drawing, a PP storage tank on its plinth with its loop (IsoKit; PP rules: flat bottom on
   a plinth, low-cone roof, socket-fusion collars, a diaphragm valve on the outlet) */
function nsTank(){if(typeof isoPart!=='function')return '';
 var tk=isoPart('tank',0,0,0,1,{id:'tank'}),o=tk.ports.out,rt=tk.ports.ret,xr=54,zt=100;
 var lp=isoPipe([o,[xr,0,o[2]],[xr,0,zt],[rt[0],0,zt],[rt[0],rt[1],zt],rt],{r:2.2,id:'tank',to:'loop',flanges:'ends',caps:false});
 var vl=isoPart('valve',39,0,o[2],1,{id:'loop'});
 var inner=[tk,lp,vl,isoArrow([xr,0,62],'z'),isoArrow([26,0,zt],'-x')].join('');
 var bb=isoBounds([[-22,0,0],[0,-22,0],[22,0,0],[0,22,0],[0,0,zt],[xr,0,zt],[xr+3,0,o[2]-3],[rt[0],rt[1],zt],[0,0,-2]],10);
 var gy=isoP(15.2,15.2,0)[1]-bb.y,floor='<path class="aq-iso__thin" d="M8 '+(gy+1).toFixed(1)+'H'+(bb.w-8).toFixed(1)+'"/>';
 return isoSvg(bb.w,bb.h,inner,'aq-iso--ink '+P+'dw',{origin:[-bb.x,-bb.y],under:floor})}
LOOKS['note-sheet']=function(b,H){var I=b.items||[],T=b.topics||[];if(!I.length)return sec(H);
 var dated=function(it){return !!it.date&&!/^\s*\[/.test(String(it.date))},no=function(i){return (i<9?'0':'')+(i+1)};
 var nd=I.filter(dated).length,fi=-1;I.forEach(function(it,i){if(fi<0&&it.featured)fi=i});if(fi<0)I.forEach(function(it,i){if(fi<0&&it.topic===T[0])fi=i});if(fi<0)fi=0;
 var f=I[fi],fl=f.link&&wp(f.link),pg=W().filter(function(q){return (q.blocks||[]).indexOf(b)>=0})[0],self=fl&&pg&&wsplit(f.link)[0]===pg.id;
 var fpg=wsplit(f.link||'')[0],tank=f.spot==='storage-tank'||(!f.spot&&fpg==='sys-storage'),dw=tank?nsTank():'';
 if(!dw&&f.spot&&isVig(f.spot))dw=wSpot(f.spot,'l',P+'spot');
 var go=fl?(self?'Read the note':'Applied on '+e(fl.nav_label||'')):'';
 var sheet='<aside class="'+P+'sheet" aria-label="Featured note"><div class="'+P+'paper">'
  +(dw?'<div class="'+P+'fig" aria-hidden="true">'+dw+'</div>':'')
  +'<p class="'+P+'sk"><span>Featured</span><span class="'+P+'sn">'+no(fi)+'</span></p>'
  +(f.d?'<p class="'+P+'q">'+tx(f.d)+'</p>':'')
  +'<h3 class="'+P+'st">'+(fl?'<a href="#'+e(f.link)+'" data-wp="'+e(f.link)+'">'+tx(f.t)+'</a>':tx(f.t))+'</h3>'
  +(go?'<p class="'+P+'go" aria-hidden="true">'+go+'</p>':'')
  +(f.std?'<p class="'+P+'std">'+nsStd(f.std)+'</p>':'')+'</div></aside>';
 var tabs='<div class="'+P+'topics" role="group" aria-label="Filter notes by topic"><button type="button" class="'+P+'tab" aria-pressed="true" data-topic="">All <span aria-hidden="true">'+I.length+'</span></button>'
  +T.map(function(t){var n=I.filter(function(it){return it.topic===t}).length;return '<button type="button" class="'+P+'tab" aria-pressed="false" data-topic="'+e(t)+'">'+tx(t)+' <span aria-hidden="true">'+n+'</span></button>'}).join('')+'</div>';
 var rows=I.map(function(it,i){var tt=it.link&&wp(it.link)?wlink(it.link,it.t):tx(it.t),lead=i===fi;
  return fli('<li class="'+P+'row'+(lead?' is-lead':'')+'" data-topic="'+e(it.topic||'')+'" data-i="'+i+'"'+(dated(it)?' data-dated=""':'')+'>',b,i)
   +(lead?'<span class="'+P+'ld" aria-hidden="true"><i></i></span>':'')
   +'<span class="'+P+'no">'+no(i)+'</span><h3 class="'+P+'t">'+tt+'</h3>'
   +'<p class="'+P+'meta">'+(it.topic?'<span class="'+P+'tp">'+tx(it.topic)+'</span>':'')+(it.std?'<span class="'+P+'code">'+nsStd(it.std)+'</span>':'')+(it.date?'<span class="'+P+'date">'+tx(it.date)+'</span>':'')+'</p></li>'}).join('');
 var list='<div class="'+P+'list">'+tabs+'<p class="'+P+'count" aria-live="polite">'+nsCount(nd,I.length-nd)+'</p>'
  +wFold(b,I.length,'<ol class="'+P+'rows" role="list">'+rows+'</ol>',b.fold_noun||'notes')+'</div>';
 return sec(H+'<div class="aq-note-sheet">'+sheet+list+'</div>','aq-band--limestone aq-note-sheet-sec')};
/* filter: Ported from Subframe Motion "Filter mosaic" (filter-mosaic), MIT, (c) 2026 Subframe: each row that stays is
   measured before the filter and inverted after it, gliding over 280 ms cubic-bezier(.22,1,.36,1); rows newly shown
   fade in over 180 ms. Instant under reduced motion. */
document.addEventListener('click',function(ev){var c=ev.target.closest&&ev.target.closest('.'+P+'tab');if(!c)return;
 var r=c.closest('.aq-note-sheet'),t=c.getAttribute('data-topic'),n=0,d=0,fd=r.querySelector('.aq-fold'),R=[].slice.call(r.querySelectorAll('.'+P+'row'));
 var mo=!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)&&R[0]&&R[0].animate,was=R.map(function(x){return x.offsetParent?x.getBoundingClientRect():null});
 r.querySelectorAll('.'+P+'tab').forEach(function(x){x.setAttribute('aria-pressed',x===c?'true':'false')});
 R.forEach(function(x){var on=!t||x.getAttribute('data-topic')===t;x.hidden=!on;if(on){n++;if(x.hasAttribute('data-dated'))d++}});
 if(fd)fd.classList.toggle('is-filtered',!!t);r.classList.toggle('is-filtered',!!t);
 r.querySelector('.'+P+'count').textContent=nsCount(d,n-d,t);
 if(mo)R.forEach(function(x,i){if(!x.offsetParent)return;var a=was[i],z=x.getBoundingClientRect();
  if(a){var dx=a.left-z.left,dy=a.top-z.top;if(dx||dy)x.animate([{transform:'translate('+dx+'px,'+dy+'px)'},{transform:'none'}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'})}
  else x.animate([{opacity:0},{opacity:1}],{duration:180,easing:'ease-out'})})});
})();
