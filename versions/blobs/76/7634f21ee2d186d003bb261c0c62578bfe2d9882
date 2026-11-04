/* Look "budget-bento" -> BudgetBento (design-system/components/BudgetBento): a spec block of budget ranges as a Swiss
   bento of numbered tiles, set like a price sheet rather than a table. The first highlighted row (the whole package) is
   the tall navy lead tile: a huge cropped numeral, the scope, the range set large in mono over a range bracket (a
   ruler with the band marked, no numbers: the range itself is the value), and its basis split into a ticked list of
   what the band includes. The module rows are tiles beside it, each with its equipment line icon, numeral, scope,
   range on its own bracket and basis. The note becomes two chip rows when it is written as "Label: a, b and c."
   sentences (a sentence whose label starts "Not" reads as exclusions, the chips struck through), with its link after.
   Fields: h, caption (eyebrow), intro, cols ([scope, range, basis] labels for the tile keys), rows [{p, v, m, hl, spot,
   link, link_label}], note, note_link, note_link_label. spot: a Spot or Icon name for a module tile.
   Phones (pass 12): the grid is a PhoneKit accordion; every tile with a basis gets a phone-only "Basis +" head (the
   basis column label) and the basis becomes its body, closed at first. */
function bbNote(b){var n=String(b.note||''),S=n.split(/\.\s+(?=[A-Z])/).map(function(x){return x.replace(/\.\s*$/,'')}).filter(Boolean);
 var ok=S.length&&S.every(function(x){return /^[^:]{2,32}:\s+\S/.test(x)});
 var lk=b.note_link&&wp(b.note_link)?'<a class="aq-budget-bento__go" href="#'+e(b.note_link)+'" data-wp="'+e(b.note_link)+'">'+tx(b.note_link_label||wlabel(b.note_link))+'</a>':'';
 if(!ok)return wSpecNote(b);
 return '<div class="aq-budget-bento__notes">'+S.map(function(x){var k=x.indexOf(':'),lab=x.slice(0,k),it=x.slice(k+1).trim().split(/,\s+/),last=it.pop().split(/\s+and\s+/);it=it.concat(last);
  var out=/^not\b/i.test(lab);
  return '<div class="aq-budget-bento__note'+(out?' is-out':'')+'"><p class="aq-budget-bento__nk">'+tx(lab)+'</p><ul class="aq-budget-bento__chips" role="list">'
   +it.map(function(c){return '<li class="aq-budget-bento__chip"><span class="aq-budget-bento__cg" aria-hidden="true"></span>'+tx(c.charAt(0).toUpperCase()+c.slice(1))+'</li>'}).join('')+'</ul></div>'}).join('')+(lk?'<p class="aq-budget-bento__more">'+lk+'</p>':'')+'</div>'}
/* the range bracket: a ruler with the band marked between two brackets (decoration; the value is the text above it) */
function bbRange(lead){var t='',i,N=lead?40:24;for(i=0;i<=N;i++)t+='<line x1="'+(i*100/N).toFixed(2)+'%" y1="'+(i%5?14:10)+'" x2="'+(i*100/N).toFixed(2)+'%" y2="18"/>';
 return '<span class="aq-budget-bento__range" aria-hidden="true"><svg class="aq-budget-bento__ruler" focusable="false">'+t+'<line class="aq-budget-bento__base" x1="0" y1="18" x2="100%" y2="18"/></svg>'
  +'<span class="aq-budget-bento__band"><span class="aq-budget-bento__bk"></span><span class="aq-budget-bento__bk is-r"></span></span></span>'}
LOOKS['budget-bento']=function(b,H){
 var rows=b.rows||[],C=b.cols||['Scope','Budget range','Basis'],lead=-1;rows.some(function(r,i){if(r.hl){lead=i;return true}});
 function link(r){return r.link&&wp(r.link)?'<a class="aq-budget-bento__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':''}
 var tiles=rows.map(function(r,i){var L=i===lead,n=(i<9?'0':'')+(i+1);
  var basis=L&&r.m?'<ul class="aq-budget-bento__incl" role="list">'+String(r.m).split(/,\s+/).map(function(x){return '<li>'+tx(x.charAt(0).toUpperCase()+x.slice(1))+'</li>'}).join('')+'</ul>':r.m?'<p class="aq-budget-bento__m">'+tx(r.m)+'</p>':'';
  return '<li class="aq-budget-bento__tile'+(L?' is-lead':'')+'" data-pk-item="'+n+'">'
   +'<span class="aq-budget-bento__n" aria-hidden="true">'+n+'</span>'
   +(!L&&r.spot?wSpot(r.spot,0,'aq-budget-bento__spot'):'')
   +'<div class="aq-budget-bento__body"><h3 class="aq-budget-bento__p">'+tx(r.p)+'</h3>'
   +'<div class="aq-budget-bento__val"><p class="aq-budget-bento__k">'+tx(C[1]||'')+'</p><p class="aq-budget-bento__v">'+tx(r.v)+'</p>'+bbRange(L)+'</div>'
   +(r.m?'<button type="button" class="aq-budget-bento__bh" data-pk-head aria-label="'+e(C[2]||'Basis')+': '+e(String(r.p||'').replace(/\[[^\]]*\]/g,'').replace(/,\s*$/,'').trim())+'">'+tx(C[2]||'Basis')+'<span class="aq-phone-kit__chev aq-phone-kit__chev--plus" aria-hidden="true"></span></button>'
     +'<div class="aq-budget-bento__basis" data-pk-body><p class="aq-budget-bento__k">'+tx(C[2]||'')+'</p>'+basis+'</div>':'')+link(r)+'</div></li>'}).join('');
 /* phones (PhoneKit accordion, all closed at first): each tile's basis sits behind its own "Basis +" head */
 return sec(wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro})+'<div class="aq-budget-bento"><ol class="aq-budget-bento__grid" role="list" data-pk-picker="accordion" data-pk-open="-1">'+tiles+'</ol>'+bbNote(b)+'</div>','aq-budget-bento-sec')};
