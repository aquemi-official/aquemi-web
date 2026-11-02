/* Look "spine-shelf" -> SpineShelf (design-system/components/SpineShelf): the turnover package as the object on the
   shelf and its index that opens. Left, the package stands as a row of binder spines on one shelf, one spine per
   section, numbered, the section's name on its label holder, each spine as thick as the section holds documents; the
   key section is the navy spine. Right, the package index: each section is a disclosure (number, name, dotted leader)
   that opens to the documents it holds, one entry per document. Opening a section pulls its spine off the shelf;
   pointing at a spine or a row lifts the other. The key section opens first.
   Fields (a docs block): h, intro, items [{t, d, key, docs}], fold, fold_noun. docs (optional): the section's entries
   as a list; without it they are read from d, split at ";" or ". ", else at commas outside brackets.
   The fold applies on phones only (desktop shows the whole index; closed rows are one line each).
   Phones: the shelf is a short band of numbered spines over the index. */
function ssComma(s){var o=[],d=0,cur='';for(var i=0;i<s.length;i++){var c=s.charAt(i);if(c==='('||c==='[')d++;else if((c===')'||c===']')&&d)d--;
  if(c===','&&!d){o.push(cur);cur='';continue}cur+=c}o.push(cur);return o}
function ssDocs(it){var L=it.docs;if(!L){var s=String(it.d||'').trim();L=s.split(/;\s+|\.\s+(?=[A-Z\[])/);if(L.length<2)L=ssComma(s)}
 return L.map(function(x){x=String(x).trim().replace(/\.$/,'');return x.charAt(0).toUpperCase()+x.slice(1)}).filter(Boolean)}
LOOKS['spine-shelf']=function(b,H){var I=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=I.length;
 var keyAt=-1;I.forEach(function(x,i){if(x.key&&keyAt<0)keyAt=i});if(keyAt<0)keyAt=0;
 var D=I.map(ssDocs);
 var spines=I.map(function(x,i){var num=(i<9?'0':'')+(i+1);
  return '<span class="aq-spine-shelf__spine'+(x.key?' is-key':'')+(i===keyAt?' is-open':'')+'" data-i="'+i+'" style="--w:'+(4+D[i].length)+'">'
   +'<span class="aq-spine-shelf__body"><span class="aq-spine-shelf__no">'+num+'</span>'
   +'<span class="aq-spine-shelf__holder"><span class="aq-spine-shelf__name">'+tx(x.t)+'</span></span>'
   +'<span class="aq-spine-shelf__ring"></span></span></span>'}).join('');
 var shelf='<div class="aq-spine-shelf__shelf" aria-hidden="true"><div class="aq-spine-shelf__row">'+spines+'</div>'
  +'<span class="aq-spine-shelf__board"></span><p class="aq-spine-shelf__cap">'+n+' '+e(b.fold_noun||'sections')+'</p></div>';
 var rows=I.map(function(x,i){var num=(i<9?'0':'')+(i+1);
  return fli('<li class="aq-spine-shelf__item'+(x.key?' is-key':'')+'" data-i="'+i+'">',b,i)
   +'<details'+(i===keyAt?' open':'')+'><summary class="aq-spine-shelf__sum"><span class="aq-spine-shelf__n" aria-hidden="true">'+num+'</span>'
   +'<h3 class="aq-spine-shelf__t">'+tx(x.t)+'</h3><span class="aq-spine-shelf__lead" aria-hidden="true"></span><span class="aq-spine-shelf__mark" aria-hidden="true"></span></summary>'
   +'<ul class="aq-spine-shelf__docs">'+D[i].map(function(d,j){return '<li style="--j:'+j+'">'+tx(d)+'</li>'}).join('')+'</ul></details></li>'}).join('');
 return sec(H+'<div class="aq-spine-shelf">'+shelf+'<div class="aq-spine-shelf__index">'+wFold(b,n,'<ol class="aq-spine-shelf__list" role="list">'+rows+'</ol>',b.fold_noun||'sections')+'</div></div>','aq-spine-shelf-sec')};
/* Index and shelf move together: a section opened or closed pulls or returns its spine; pointing at a row or a spine
   lifts its pair; a click on a spine opens its section (the summary stays the keyboard control). */
if(typeof document!=='undefined'&&document.addEventListener){
 var ssPair=function(el){var w=el.closest('.aq-spine-shelf'),i=el.getAttribute('data-i');return w?[w.querySelector('.aq-spine-shelf__spine[data-i="'+i+'"]'),w.querySelector('.aq-spine-shelf__item[data-i="'+i+'"]')]:[]};
 document.addEventListener('toggle',function(ev){var d=ev.target;if(!d||!d.closest||!d.closest('.aq-spine-shelf__item'))return;var p=ssPair(d.closest('.aq-spine-shelf__item'));
  if(p[0])p[0].classList.toggle('is-open',d.open)},true);
 ['mouseover','focusin','mouseout','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var el=ev.target.closest&&ev.target.closest('.aq-spine-shelf__spine,.aq-spine-shelf__item');if(!el)return;
  if(/out$/.test(t)&&ev.relatedTarget&&el.contains(ev.relatedTarget))return;var on=/over|in$/.test(t);ssPair(el).forEach(function(x){if(x)x.classList.toggle('is-hover',on)})})});
 document.addEventListener('click',function(ev){var s=ev.target.closest&&ev.target.closest('.aq-spine-shelf__spine');if(!s)return;var it=ssPair(s)[1];if(!it)return;
  var f=it.closest('.aq-fold');if(it.classList.contains('aq-fold-x')&&f&&!f.classList.contains('is-open')&&getComputedStyle(it).display==='none'){var bt=f.querySelector('.aq-fold__btn');if(bt)bt.click()}
  var d=it.querySelector('details');if(d){d.open=!d.open;if(d.open&&it.getBoundingClientRect().top>innerHeight*0.8)it.scrollIntoView({block:'center',behavior:'smooth'})}})}
