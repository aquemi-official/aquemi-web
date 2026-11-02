/* Look "code-index" -> CodeIndex (design-system/components/CodeIndex): a short set of documents as an index set in
   huge type. Each document's filing code (JNT, MAT …) runs as oversized outline mono across its row, cropped by the
   page edge and alternating sides, with the document's number, name and what it holds set beside it; the deciding
   documents' codes are drawn in flow.
   Fields (a docs block): h, intro, items [{t, d, code, key, link, intent}], link, link_label, intent, fold, fold_noun.
   Codes come from the DocList lookup (docCode) unless the item names its own. Phones: code over text, one column. */
LOOKS['code-index']=function(b,H){
 var items=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=items.length;
 var li=items.map(function(x,i){var t=String(x.t||''),c=x.code||docCode(t)[0],num=(i<9?'0':'')+(i+1);
  var name=x.link&&wp(x.link)?wlink(x.link,t,x.intent):tx(t);
  return fli('<li class="aq-code-index__row'+(x.key?' is-key':'')+(i%2?' is-r':'')+'" style="--i:'+i+'">',b,i)
   +'<span class="aq-code-index__code" aria-hidden="true">'+e(c)+'</span>'
   +'<div class="aq-code-index__text"><span class="aq-code-index__n" aria-hidden="true">'+num+' / '+e(c)+'</span><h3 class="aq-code-index__t">'+name+'</h3>'+(x.d?'<p class="aq-code-index__d">'+tx(x.d)+'</p>':'')+'</div>'
   +'</li>'}).join('');
 var more=b.link&&wp(b.link)?'<p class="aq-code-index__more">'+wBtn(b.link_label||wlabel(b.link),b.link,'link',b.intent)+'</p>':'';
 return sec(H+'<div class="aq-code-index">'+wFold(b,n,'<ol class="aq-code-index__list" role="list">'+li+'</ol>',b.fold_noun||'documents')+more+'</div>','aq-code-index-sec')};
