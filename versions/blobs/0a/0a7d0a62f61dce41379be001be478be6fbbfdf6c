/* Look "terms-sheet" -> TermsSheet (design-system/components/TermsSheet): how buying works, as a clean numbered terms
   table beside an isometric line drawing of a purified water skid (IsoKit: base frame, reverse osmosis rack, control
   panel, storage tank) that bleeds off the right edge of the page: the table says how you buy it, the drawing is what
   you buy. Each row: number (mono), the term, our side of it (a value written "a · b" breaks into lines), and its
   note. The note gets its own column only when at least half the rows have one; otherwise it sits under the values,
   introduced by the third column's name.
   Fields (a spec block): h, intro, cols [term, ours, note], rows [{p, v, m, link, link_label}], fold, fold_noun
   (phones only: desktop shows every term). Phones: the drawing is a strip above the table (cropped, not bleeding);
   rows stack number, term and values. */
LOOKS['terms-sheet']=(function(){
 function skid(){
  var sk=isoPart('skid',0,0,0,1,{w:150,d:62,id:'ro'}),ro=isoPart('ro',8,8,9,1,{id:'ro'}),pn=isoPart('panel',-40,-6,0,1,{id:'panel'}),
   tk=isoPart('tank',204,10,0,1.15,{id:'tank'});
  var feed=isoPipe(isoRoute(ro.ports.out,tk.ports.in,'xzy'),{r:1.8,to:'tank',caps:false});
  var inner=[pn,sk,ro,feed,tk].join('');
  var bx=isoBounds([[-60,-40,0],[250,-30,0],[250,60,0],[0,70,0],[-60,-40,110],[210,10,130]],8);
  return isoSvg(Math.round(bx.w),Math.round(bx.h),inner,'aq-terms-sheet__svg',{origin:[-bx.x,-bx.y]})}
 return function(b,H){var C=b.cols||[],R=(b.rows||[]).map(function(r){return Array.isArray(r)?{p:r[0],v:r[1],m:r[2]}:r}),n=R.length;
  var notes=R.filter(function(r){return r.m}).length,noteCol=notes*2>=n;
  var nn=function(i){return (i<9?'0':'')+(i+1)};
  var rows=R.map(function(r,i){var V=String(r.v||'').split(/\s+·\s+/).filter(Boolean);
   var note=r.m?(noteCol?'<div class="aq-terms-sheet__c aq-terms-sheet__note"><p class="aq-terms-sheet__k">'+tx(C[2]||'')+'</p><p>'+tcell(r.m)+'</p></div>'
    :'<p class="aq-terms-sheet__m"><span class="aq-terms-sheet__mk">'+tx(C[2]||'')+'</span> '+tcell(r.m)+'</p>'):(noteCol?'<div class="aq-terms-sheet__c aq-terms-sheet__note"></div>':'');
   return fli('<li class="aq-terms-sheet__row" style="--i:'+i+'">',b,i)
    +'<span class="aq-terms-sheet__n" aria-hidden="true">'+nn(i)+'</span>'
    +'<div class="aq-terms-sheet__c"><h3 class="aq-terms-sheet__t">'+tx(r.p)+'</h3></div>'
    +'<div class="aq-terms-sheet__c"><p class="aq-terms-sheet__k">'+tx(C[1]||'')+'</p><ul class="aq-terms-sheet__v" role="list">'+V.map(function(x){return '<li>'+tx(x)+'</li>'}).join('')+'</ul>'
    +(noteCol?'':note)+(r.link&&wp(r.link)?'<p class="aq-terms-sheet__go">'+wlink(r.link,r.link_label)+'</p>':'')+'</div>'+(noteCol?note:'')+'</li>'}).join('');
  var head='<div class="aq-terms-sheet__head" aria-hidden="true"><span></span><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span>'+(noteCol?'<span>'+tx(C[2]||'')+'</span>':'')+'</div>';
  return sec(H+'<div class="aq-terms-sheet'+(noteCol?' has-notes':'')+'"><div class="aq-terms-sheet__table">'+head
   +wFold(b,n,'<ol class="aq-terms-sheet__list" role="list">'+rows+'</ol>',b.fold_noun||'terms')+'</div>'
   +'<div class="aq-terms-sheet__fig" aria-hidden="true">'+skid()+'</div></div>','aq-terms-sheet-sec')}})();
