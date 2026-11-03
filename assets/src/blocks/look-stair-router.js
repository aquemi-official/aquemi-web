/* Look "stair-router" -> StairRouter (pass 9): a router table (as: "router") drawn as a rising staircase of situation
   cards over huge cropped outline type. Every situation is a card on its own tread, the first lowest, the last highest;
   the stair line (treads and risers) joins them, a limestone wedge cuts the navy ground bottom right and the end word
   sits on it. All routes are open: each card shows every column as a term and value.
   Fields, as the router: cols (first is the situation column), rows (first cell the situation, each other cell a string
   or {t, link, intent}). Optional: labels (one short step title per row, "New system"; the situation sentence then
   shows under it as the card's subtitle, its term kept for screen readers; a label equal to the situation drops it), kinetic (["Start", "Go"]: the first word runs as outline type behind the stair,
   the last sits large on the wedge; decorative, aria-hidden). A card whose cells link somewhere (the last link wins)
   is clickable as a whole through a pointer-only overlay; the real link stays the keyboard target and its intent rides
   on both. A value that opens with a [placeholder] is a pending value: dashed rule and "To confirm".
   Best for 3 to 7 rows. Design system: components/StairRouter.
   Phones (pass 12, PhoneKit): a situation picker. With labels, the labels are chips in two columns (01 open first) and
   the one card shows under them; without labels, the situations are accordion heads with the card under its head. The
   stair stays as a thin rising rail at the top of the card (this step lit); no indents. */
LOOKS['stair-router']=function(b,H){var C=b.cols||[],R=b.rows||[],n=R.length,L=b.labels||[],K=b.kinetic||[],w0=K[0]||'',w1=K.length>1?K[K.length-1]:'',acc=!L.length;
 function lnk(c){return c&&typeof c==='object'&&c.link&&wp(c.link)?c.link:''}
 function val(c){return c&&typeof c==='object'?c.t:c}
 function words(side){return '<div class="aq-stair-router__words aq-stair-router__words--'+side+'">'
  +'<span class="aq-stair-router__w aq-stair-router__w--a">'+e(w0)+'</span><span class="aq-stair-router__w aq-stair-router__w--b">'+e(w0)+'</span>'
  +'<span class="aq-stair-router__w aq-stair-router__w--c">'+e(w0)+'</span></div>'}
 var type=w0?'<div class="aq-stair-router__type" aria-hidden="true">'+words('navy')+words('lime')+'</div>':'';
 var steps=R.map(function(r,i){var s=val(r[0]),st=r.slice(1),go=-1,lab=L[i];
  st.forEach(function(c,j){if(lnk(c))go=j});var to=go>=0?lnk(st[go]):'',ti=to&&st[go].intent;
  var same=lab&&String(lab).toLowerCase()===String(s).toLowerCase();if(same)lab='';
  var dl=(lab?'<div class="aq-stair-router__f is-sit"><dt>'+tx(C[0]||'')+'</dt><dd>'+tx(s)+'</dd></div>':'')
   +st.map(function(c,j){var pend=j!==go&&/^\s*\[/.test(val(c)),cl=['aq-stair-router__f'];if(j===go)cl.push('is-go');if(pend)cl.push('is-pending');
    return '<div class="'+cl.join(' ')+'"><dt>'+tx(C[j+1]||'')+'</dt><dd>'+tcell(c)+(pend?' <span class="aq-stair-router__tbc">To confirm</span>':'')+'</dd></div>'}).join('');
  var chip='<button type="button" class="aq-stair-router__chip" data-pk-head><span class="aq-stair-router__cn" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><span class="aq-stair-router__cl">'+tx(lab||s)+'</span>'+(acc?'<span class="aq-phone-kit__chev" aria-hidden="true"></span>':'')+'</button>';
  var rail='<span class="aq-stair-router__rail" aria-hidden="true"><b>'+(i<9?'0':'')+(i+1)+' / '+(n<10?'0':'')+n+'</b><span>'+R.map(function(_,k){return '<i class="'+(k<i?'is-past':k===i?'is-here':'')+'" style="--k:'+k+'"></i>'}).join('')+'</span></span>';
  return '<li class="aq-stair-router__step'+(to?' is-link':'')+'" style="--i:'+i+'" data-pk-item="'+i+'">'
   +'<span class="aq-stair-router__n" aria-hidden="true"><span class="aq-stair-router__num">'+(i<9?'0':'')+(i+1)+'</span><span class="aq-stair-router__arrow"></span></span>'
   +'<span class="aq-stair-router__tread" aria-hidden="true"></span>'+(i?'<span class="aq-stair-router__riser" aria-hidden="true"></span>':'')
   +chip+'<div class="aq-stair-router__card" data-pk-body>'+rail
   +(to?'<a class="aq-stair-router__hit" href="#'+e(to)+'" data-wp="'+e(to)+'"'+(ti?' data-intent="'+e(ti)+'"':'')+' tabindex="-1" aria-hidden="true"></a>':'')
   +'<h3 class="aq-stair-router__t">'+tx(lab||s)+'</h3><dl class="aq-stair-router__dl">'+dl+'</dl></div></li>'}).join('');
 return '<section class="aq-section aq-stair-router-sec">'+type+'<div class="aq-stair-router__wedge" aria-hidden="true"></div>'
  +(w1?'<p class="aq-stair-router__go" aria-hidden="true">'+e(w1)+'</p>':'')
  +'<div class="aq-in"><div class="aq-stair-router" style="--n:'+n+'">'+H
  +'<ol class="aq-stair-router__flight" data-pk-picker="'+(acc?'accordion':'chips')+'" data-pk-open="0">'+steps+'</ol><span class="aq-stair-router__drop" aria-hidden="true"></span></div></div></section>'};
