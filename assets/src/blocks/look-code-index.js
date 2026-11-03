/* Look "code-index" -> CodeIndex (design-system/components/CodeIndex): a short set of documents as an index set in
   huge type. Each document's filing code (JNT, MAT …) runs as oversized outline mono across its row, cropped by the
   page edge and alternating sides, with the document's number, name and what it holds set beside it; the deciding
   documents' codes are drawn in flow.
   Pass 12 (round C, audit-c group-7 buying.5): compact by default at every width. The code is a 48 px outline tab
   chip at the left of the title; wide: two columns filled down (4 + 3 for seven), phones: one row each (chip, title,
   status). The old huge-type poster stays behind the look-only field "poster": true (.aq-code-index--poster).
   Fields (a docs block): h, intro, items [{t, d, code, key, link, intent}], link, link_label, intent, fold, fold_noun,
   poster (look-only). Codes come from the DocList lookup (docCode) unless the item names its own. */
LOOKS['code-index']=function(b,H){
 var items=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=items.length;
 /* wide columns fill down: rows per column for all items, and for the folded view (fold); the row that ends column 1
    (and, folded, the last shown row) carries the column-end rule */
 var nf=b.fold>0&&n>b.fold?b.fold:n,rows=Math.ceil(n/2),rf=Math.ceil(nf/2);
 var li=items.map(function(x,i){var t=String(x.t||''),c=x.code||docCode(t)[0],num=(i<9?'0':'')+(i+1);
  var name=x.link&&wp(x.link)?wlink(x.link,t,x.intent):tx(t);
  return fli('<li class="aq-code-index__row'+(x.key?' is-key':'')+(i%2?' is-r':'')+(i===rows-1?' is-colend':'')+(nf<n&&i===rf-1?' is-colend-f':'')+(nf<n&&i===nf-1?' is-end-f':'')+'" style="--i:'+i+'">',b,i)
   +'<span class="aq-code-index__code" aria-hidden="true">'+e(c)+'</span>'
   +'<div class="aq-code-index__text"><span class="aq-code-index__n" aria-hidden="true">'+num+'<span class="aq-code-index__nc"> / '+e(c)+'</span></span><h3 class="aq-code-index__t">'+name+'</h3>'+(x.d?'<p class="aq-code-index__d">'+tx(x.d)+'</p>':'')+'</div>'
   +'</li>'}).join('');
 var more=b.link&&wp(b.link)?'<p class="aq-code-index__more">'+wBtn(b.link_label||wlabel(b.link),b.link,'link',b.intent)+'</p>':'';
 return sec(H+'<div class="aq-code-index'+(b.poster?' aq-code-index--poster':'')+'" style="--rows:'+rows+(nf<n?';--rows-f:'+rf:'')+'">'+wFold(b,n,'<ol class="aq-code-index__list" role="list">'+li+'</ol>',b.fold_noun||'documents')+more+'</div>','aq-code-index-sec')};
