/* Look "contract-folders" -> ContractFolders (design-system/components/ContractFolders): how buying works, as the
   folders a buyer is handed (pass 12 concept 243). Each row of the block is one folder: its subject on the folder's
   tab, a sheet inside listing what the linked page covers, and the link under the folder as a full-width row. The
   first folder is a tabbed divider set (each item an index tab numbered on the sheet's right edge: the terms of sale
   as a contract file); the second is a form sheet (each paper a ruled line with an empty mark box, the row's note
   under them, a signature line and a pen: the onboarding papers waiting to be marked). Further folders alternate.
   The folder and its sheet stay paper in dark theme (data-theme="light" on the folder, as
   capital-request and the other paper looks); the link row under it follows the page theme. Nothing is filled in: the marks and the signature stay empty (the statuses live on the linked page).
   Fields (a spec block): h, intro, cols [subject, what the page covers, note], rows [{p, v ("a · b · c"), m, link,
   link_label}]. Phones: the folders stack; each sheet's items run in two columns, the tabs shrink to inline numbers,
   the link is a 48 px row. Replaces TermsSheet on cmp-quality (that look stays in the library). */
LOOKS['contract-folders']=(function(){
 var PEN='<svg class="aq-contract-folders__pen" viewBox="0 0 120 28" aria-hidden="true" focusable="false">'
  +'<path class="aq-contract-folders__pb" d="M18 9H96Q104 9 104 14Q104 19 96 19H18Z"/><path class="aq-contract-folders__pb" d="M18 9L6 14L18 19"/>'
  +'<path class="aq-contract-folders__pd" d="M2 14H6M30 9V19M82 6H100V9M100 6V12"/></svg>';
 var nn=function(i){return (i<9?'0':'')+(i+1)};
 return function(b,H){var C=b.cols||[],R=(b.rows||[]).map(function(r){return Array.isArray(r)?{p:r[0],v:r[1],m:r[2]}:r});
  var folders=R.map(function(r,i){var V=String(r.v||'').split(/\s+·\s+/).filter(Boolean),form=i%2===1,go=r.link&&wp(r.link);
   var items=V.map(function(x,j){return '<li style="--j:'+j+'">'+(form?'':'<span class="aq-contract-folders__ix" aria-hidden="true">'+nn(j)+'</span>')
    +'<span class="aq-contract-folders__it">'+tx(x)+'</span>'+(form?'<i class="aq-contract-folders__ld" aria-hidden="true"></i><i class="aq-contract-folders__box" aria-hidden="true"></i>':'')+'</li>'}).join('');
   return '<li class="aq-contract-folders__f'+(form?' is-form':' is-tabs')+'" style="--i:'+i+'">'
    +'<div class="aq-contract-folders__folder" data-theme="light"><h3 class="aq-contract-folders__tab"><span class="aq-contract-folders__n" aria-hidden="true">'+nn(i)+'</span><span>'+tx(r.p)+'</span></h3>'
    +'<div class="aq-contract-folders__sheet">'+(C[1]?'<p class="aq-contract-folders__k">'+tx(C[1])+'</p>':'')
    +'<ul class="aq-contract-folders__items" role="list">'+items+'</ul>'
    +(r.m?'<p class="aq-contract-folders__m">'+tcell(r.m)+'</p>':'')
    +(form?'<div class="aq-contract-folders__sign" aria-hidden="true"><i class="aq-contract-folders__sl"></i>'+PEN+'</div>':'')
    +'</div></div>'
    +(go?'<p class="aq-contract-folders__go">'+wlink(r.link,r.link_label)+'</p>':'')+'</li>'}).join('');
  return sec(H+'<div class="aq-contract-folders"><ol class="aq-contract-folders__list" role="list">'+folders+'</ol></div>','aq-contract-folders-sec')}})();
