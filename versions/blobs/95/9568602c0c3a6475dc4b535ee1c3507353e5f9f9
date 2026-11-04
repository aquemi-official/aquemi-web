/* Look "terms-sheet" -> TermsSheet (design-system/components/TermsSheet): how buying works, as a clean numbered terms
   table beside an isometric line drawing of a purified water skid (IsoKit: base frame, reverse osmosis rack, control
   panel, storage tank), whole in its column and sticky beside the rows on desktop (pass 12 C): the table says how you buy it, the drawing is what
   you buy. Each row: number (mono), the term, our side of it (a value written "a · b" breaks into lines), and its
   note. The note gets its own column only when at least half the rows have one; otherwise it sits under the values,
   introduced by the third column's name.
   Fields (a spec block): h, intro, cols [term, ours, note], rows [{p, v, m, link, link_label}], fold, fold_noun
   (phones only: desktop shows every term). Phones (pass 12): no drawing (S18: the generic skid has no tie to the
   rows); rows stack number, term and values. With six terms or more the list is a PhoneKit accordion: the head is the
   number and term (48 px, chevron), the values stay in view under it, and the note and the link (44 px) open on tap
   (div.__pb, a phone-only copy of the row's note and link; the desktop cells stay as rendered). A row with neither
   note nor link is not a head. */
LOOKS['terms-sheet']=(function(){
 function skid(){
  var sk=isoPart('skid',0,0,0,1,{w:150,d:62,id:'ro'}),ro=isoPart('ro',8,8,9,1,{id:'ro'}),pn=isoPart('panel',-40,-6,0,1,{id:'panel'}),
   tk=isoPart('tank',204,10,0,1.15,{id:'tank'});
  var feed=isoPipe(isoRoute(ro.ports.out,tk.ports.in,'xzy'),{r:1.8,to:'tank',caps:false});
  var inner=[pn,sk,ro,feed,tk].join('');
  var bx=isoBounds([[-60,-40,0],[250,-30,0],[250,60,0],[0,70,0],[-60,-40,110],[210,10,130]],8);
  return isoSvg(Math.round(bx.w),Math.round(bx.h),inner,'aq-terms-sheet__svg',{origin:[-bx.x,-bx.y]})}
 return function(b,H){var C=b.cols||[],R=(b.rows||[]).map(function(r){return Array.isArray(r)?{p:r[0],v:r[1],m:r[2]}:r}),n=R.length;
  var notes=R.filter(function(r){return r.m}).length,noteCol=notes*2>=n,acc=n>=6;
  var nn=function(i){return (i<9?'0':'')+(i+1)};
  var rows=R.map(function(r,i){var V=String(r.v||'').split(/\s+·\s+/).filter(Boolean);
   var note=r.m?(noteCol?'<div class="aq-terms-sheet__c aq-terms-sheet__note"><p class="aq-terms-sheet__k">'+tx(C[2]||'')+'</p><p>'+tcell(r.m)+'</p></div>'
    :'<p class="aq-terms-sheet__m"><span class="aq-terms-sheet__mk">'+tx(C[2]||'')+'</span> '+tcell(r.m)+'</p>'):(noteCol?'<div class="aq-terms-sheet__c aq-terms-sheet__note"></div>':'');
   var go=r.link&&wp(r.link),tap=acc&&(r.m||go),dk=tap?' data-pk-desk':'';
   return fli('<li class="aq-terms-sheet__row" style="--i:'+i+'"'+(tap?' data-pk-item="'+i+'"':'')+'>',b,i)
    +'<span class="aq-terms-sheet__n" aria-hidden="true"'+dk+'>'+nn(i)+'</span>'
    +'<div class="aq-terms-sheet__c"'+dk+'><h3 class="aq-terms-sheet__t">'+tx(r.p)+'</h3></div>'
    +'<div class="aq-terms-sheet__c"><p class="aq-terms-sheet__k">'+tx(C[1]||'')+'</p><ul class="aq-terms-sheet__v" role="list">'+V.map(function(x){return '<li>'+tx(x)+'</li>'}).join('')+'</ul>'
    +(noteCol?'':note)+(go?'<p class="aq-terms-sheet__go">'+wlink(r.link,r.link_label)+'</p>':'')+'</div>'+(noteCol?note:'')
    +(tap?'<div class="aq-terms-sheet__pb" data-pk-body>'+(r.m?'<p class="aq-terms-sheet__pm">'+tcell(r.m)+'</p>':'')+(go?'<p class="aq-terms-sheet__pgo">'+wlink(r.link,r.link_label)+'</p>':'')+'</div>':'')
    /* the phone head comes last in the markup (the desktop cells keep their nth-child places); CSS orders it first */
    +(tap?'<h3 class="aq-terms-sheet__ph"><button type="button" class="aq-terms-sheet__hb" data-pk-head><span class="aq-terms-sheet__hn" aria-hidden="true">'+nn(i)+'</span><span class="aq-terms-sheet__ht">'+tx(r.p)+'</span><span class="aq-phone-kit__chev" aria-hidden="true"></span></button></h3>':'')+'</li>'}).join('');
  var head='<div class="aq-terms-sheet__head" aria-hidden="true"><span></span><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span>'+(noteCol?'<span>'+tx(C[2]||'')+'</span>':'')+'</div>';
  return sec(H+'<div class="aq-terms-sheet'+(noteCol?' has-notes':'')+'"><div class="aq-terms-sheet__table">'+head
   +wFold(b,n,'<ol class="aq-terms-sheet__list" role="list"'+(acc?' data-pk-picker="accordion" data-pk-open="-1"':'')+'>'+rows+'</ol>',b.fold_noun||'terms')+'</div>'
   +'<div class="aq-terms-sheet__fig" aria-hidden="true">'+skid()+'</div></div>','aq-terms-sheet-sec')}})();
