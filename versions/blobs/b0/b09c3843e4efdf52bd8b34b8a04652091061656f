/* Look "pdf-anatomy" -> PdfAnatomy (design-system/components/PdfAnatomy): how documents are delivered, as a figure plate
   of the document itself. The highlighted row (else the first) is drawn: a PDF open in a viewer, its bookmark pane, a
   search hit on the page, the number and revision box in the footer of every page of the stack; each part of the row's
   value (split at commas) is a callout on a leader to the part that shows it. The other rows sit beside the plate: a
   value written as choices ("a; b; or c") becomes a set of signature lines, one per choice; any other value is set
   large; the note follows under the table's note column name.
   Fields (a spec block): h, intro, cols [item, how we deliver it, note], rows [{p, v, m, hl, part}]. Callouts find
   their part by their words (search, bookmark, else number/revision/page: the footer); rows[].parts (optional) names
   them in order ("search", "mark", "foot"). Phones: the plate, its callouts as a numbered list under it, then the
   other rows. Pass 9b (concept research/pass9b/concepts/cmp-documentation.3.png): the section sits on a drawing sheet
   (zone band, title block with the section title over blank number and revision fields), and a page turner under the
   plate turns the drawn document's 12 pages (one per bookmark) while the footer boxes stay: the same on every page.
   Pass 12 round C: desktop is a 2x2: the plate (with its pager) top left, the choice rows (signatures, three lines
   across) under it, the other rows in the right column; values at 20/28 with placeholders at body size. Phones: the
   column name printed once (on the plate), signature rows with the method on the line, a 64 px line glyph per zone. */
LOOKS['pdf-anatomy']=(function(){
 function P(d,c){return '<path class="aq-pdf-anatomy'+'__'+(c||'ln')+'" d="'+d+'"/>'}
 function R(x,y,w,h,c){return '<rect class="aq-pdf-anatomy'+'__'+c+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'"/>'}
 var AT={search:[540,58],mark:[190,142],foot:[362,432]},PGN=12,PG0=3,VY=30,VH=440;
 /* round C: the viewBox is cropped to the plate (y 30-470; the band under it was empty), so callouts and pins place
    against that window */
 function vy(y){return ((y-VY)/VH*100).toFixed(2)+'%'}
 function page(x,y,front){var o=R(x,y,300,340,'page');if(!front)return o+R(x+16,y+316,84,16,'box')+R(x+230,y+316,54,16,'box');
  o+=R(x+16,y+18,46,14,'logo')+P('M'+(x+76)+' '+(y+22)+'H'+(x+200)+'M'+(x+76)+' '+(y+30)+'H'+(x+160),'txt')+P('M'+(x+16)+' '+(y+44)+'H'+(x+284),'rule');
  var W=[250,268,214,256,240,262,188,250,230,266,206,244,170];
  for(var i=0;i<W.length;i++)o+=P('M'+(x+16)+' '+(y+66+i*18)+'H'+(x+16+W[i]),'txt');
  o+='<rect class="aq-pdf-anatomy__hit" x="'+(x+112)+'" y="'+(y+66+5*18-8)+'" width="74" height="16"/>';
  o+=P('M'+(x+16)+' '+(y+306)+'H'+(x+284),'rule')+R(x+16,y+316,84,16,'box is-on')+R(x+230,y+316,54,16,'box is-on');
  return o}
 function plate(calls){var o='';
  o+=R(180,40,560,420,'win')+P('M180 76H740M320 76V460','rule');
  o+='<g class="aq-pdf-anatomy__search">'+R(540,49,180,18,'field')+'<circle class="aq-pdf-anatomy__ln" cx="553" cy="58" r="5"/>'+P('M557 62l5 5','ln')+P('M570 58H640','txt')+'</g>';
  /* bookmark pane */
  o+='<rect class="aq-pdf-anatomy__cur" x="184" y="88" width="132" height="20" style="transform:translateY('+((PG0-1)*22)+'px)"/>'+'<text class="aq-pdf-anatomy__pgno" x="196" y="446">'+PG0+' / '+PGN+'</text>';
  for(var i=0;i<PGN;i++){var y=98+i*22,ind=[0,1,1,0,1,1,1,0,1,0,1,1][i]*14;o+=P('M'+(194+ind)+' '+(y-3)+'l4 3l-4 3','tri')+P('M'+(206+ind)+' '+y+'H'+(268+ind+(i*13)%30),'txt')}
  /* pages: two behind, one in front */
  o+='<g class="aq-pdf-anatomy__stack">'+page(372,92,0)+page(358,100,0)+'</g><g class="aq-pdf-anatomy__front">'+page(344,108,1)+'</g>';
  /* leaders to the callouts in the left column */
  calls.forEach(function(c,j){var a=AT[c.part],y=a[1];o+='<g class="aq-pdf-anatomy__lead" data-c="'+j+'">'+P('M'+a[0]+' '+y+'H168','leader')+'<circle class="aq-pdf-anatomy__dot" cx="'+a[0]+'" cy="'+y+'" r="3.5"/>'
   +'</g>'});
  return '<svg class="aq-pdf-anatomy__svg" viewBox="0 '+VY+' 760 '+VH+'" aria-hidden="true" focusable="false">'+o+'</svg>'}
 function part(s,i,used){s=s.toLowerCase();var p=/search/.test(s)?'search':/bookmark/.test(s)?'mark':/number|revision|page/.test(s)?'foot':'';
  if(!p||used[p])p=['search','mark','foot'].filter(function(x){return !used[x]})[0];used[p]=1;return p}
 return function(b,H){var C=b.cols||[],rows=(b.rows||[]).map(function(r){return Array.isArray(r)?{p:r[0],v:r[1],m:r[2]}:r}),hi=0;
  rows.forEach(function(r,i){if(r.hl&&!hi)hi=i});if(!rows.length)return sec(H);var F=rows[hi],used={};
  var k=function(i){return C[i]?'<p class="aq-pdf-anatomy__k">'+tx(C[i])+'</p>':''};
  var calls=String(F.v||'').split(/,\s+/).map(function(s,i){s=s.trim();return {t:s.charAt(0).toUpperCase()+s.slice(1),part:(F.parts&&F.parts[i])||part(s,i,used)}});
  var tops={search:58,mark:142,foot:432};
  var callHtml='<ol class="aq-pdf-anatomy__calls" role="list">'+calls.map(function(c,j){return '<li class="aq-pdf-anatomy__call" data-c="'+j+'" style="top:'+vy(tops[c.part])+'"><span class="aq-pdf-anatomy__cn" aria-hidden="true">'+(j+1)+'</span><span>'+tx(c.t)+'</span></li>'}).join('')+'</ol>';
  var pins=calls.map(function(c,j){var a=AT[c.part];return '<span class="aq-pdf-anatomy__pin" aria-hidden="true" style="left:'+(a[0]/760*100).toFixed(2)+'%;top:'+vy(a[1])+'">'+(j+1)+'</span>'}).join('');
  var nums='';for(var g=1;g<=PGN;g++)nums+='<button type="button" class="aq-pdf-anatomy__pgn" data-p="'+g+'"'+(g===PG0?' aria-current="page"':'')+(g>5?' tabindex="-1"':'')+' aria-label="Page '+g+'">'+g+'</button>';
  var pager='<nav class="aq-pdf-anatomy__pager" aria-label="Turn the pages of the drawn document" data-p="'+PG0+'" data-n="'+PGN+'"><button type="button" class="aq-pdf-anatomy__pgs" data-d="-1" aria-label="Previous page"><span aria-hidden="true">&lsaquo;</span></button>'
   +'<div class="aq-pdf-anatomy__pgw"><div class="aq-pdf-anatomy__pgr" style="--pg-start:0">'+nums+'</div></div><button type="button" class="aq-pdf-anatomy__pgs" data-d="1" aria-label="Next page"><span aria-hidden="true">&rsaquo;</span></button></nav>';
  var fig='<figure class="aq-pdf-anatomy__plate"><figcaption class="aq-pdf-anatomy__cap">'+k(1)+'<h3 class="aq-pdf-anatomy__h">'+tx(F.p)+'</h3>'+(F.m?'<p class="aq-pdf-anatomy__note">'+tx(F.m)+'</p>':'')+'</figcaption>'
   +'<div class="aq-pdf-anatomy__draw"><div class="aq-pdf-anatomy__crop"><div class="aq-pdf-anatomy__art">'+plate(calls)+pins+'</div></div>'+callHtml+'</div>'+pager+'</figure>';
  /* round C: one small line glyph per zone (phones): an e-signature seal for choices, a kickoff calendar strip for
     timing, an archive box for retention; r.glyph ("seal", "cal", "box") overrides the guess from the row's name */
  var GL={seal:P('M32 8a20 20 0 1 1 0 40a20 20 0 1 1 0 -40Z')+P('M32 13a15 15 0 1 1 0 30a15 15 0 1 1 0 -30Z','rule')+P('M24 28l6 6l11 -12','gl')+P('M23 45L19 60L25 56L29 61L31 48M41 45L45 60L39 56L35 61L33 48'),
   cal:P('M4 14H60V46H4ZM4 22H60M15.2 22V46M26.4 22V46M37.6 22V46M48.8 22V46M16 9V17M48 9V17')+R(6,24,7.2,20,'cur')+P('M9 54H55M51 50.5L55 54L51 57.5','gl'),
   box:P('M20 13V5H33L37 9V13','gl')+P('M6 13H58V23H6ZM10 23H54V58H10ZM24 31H40V39H24ZM28 47H36')};
  var gk=function(r,ch){if(r.glyph&&GL[r.glyph])return r.glyph;if(ch)return 'seal';var n=String(r.p||'').toLowerCase();return /retain|retention|keep|archiv|stor/.test(n)?'box':/tim|kickoff|schedul|when|day/.test(n)?'cal':''};
  var vi=0,under='',side=rows.filter(function(r,i){return i!==hi}).map(function(r){var v=String(r.v||''),ch=v.split(/\s*;\s*/),body;
   if(ch.length>1)body='<ul class="aq-pdf-anatomy__sigs" role="list">'+ch.map(function(c,j){c=c.replace(/^or\s+/i,'');return '<li><span class="aq-pdf-anatomy__sl" aria-hidden="true"></span><span class="aq-pdf-anatomy__sv">'+(j===ch.length-1&&j?'<span class="aq-pdf-anatomy__or">or </span>'+tx(c):tx(c.charAt(0).toUpperCase()+c.slice(1)))+'</span></li>'}).join('')+'</ul>';
   else body='<p class="aq-pdf-anatomy__big">'+tx(v)+'</p>';
   var many=ch.length>1,g=gk(r,many)||(['cal','box'][vi]||'');if(!many)vi++;
   var h='<div class="aq-pdf-anatomy__row'+(many?' is-sigs':'')+'">'+(g?'<svg class="aq-pdf-anatomy__gl" viewBox="0 0 64 64" aria-hidden="true" focusable="false">'+GL[g]+'</svg>':'')
    +'<h3 class="aq-pdf-anatomy__h">'+tx(r.p)+'</h3>'+k(1)+body+(r.m?'<div class="aq-pdf-anatomy__m">'+k(2)+'<p>'+tcell(r.m)+'</p></div>':'')
    +(r.link&&wp(r.link)?'<p class="aq-pdf-anatomy__go">'+wlink(r.link,r.link_label)+'</p>':'')+'</div>';
   /* round C: rows written as choices (signatures) sit under the plate; the rest stand in the right column */
   if(many){under+=h;return ''}return h}).join('');
  /* drawing-sheet furniture (concept cmp-documentation.3): zone band, numbers across, letters down, a title block
     repeating the section title over blank number and revision fields. Decoration only. */
  var zn=function(t,cls){var o='';for(var z=0;z<4;z++)o+='<span>'+(t==='n'?z+1:'DCBA'.charAt(z))+'</span>';return '<span class="aq-pdf-anatomy__zb aq-pdf-anatomy__zb--'+cls+'">'+o+'</span>'};
  var frame='<div class="aq-pdf-anatomy__frame" aria-hidden="true">'+zn('n','t')+zn('n','b')+zn('l','l')+zn('l','r')
   +'<span class="aq-pdf-anatomy__tb"><span class="aq-pdf-anatomy__tbh">'+tx(b.h||'')+'</span><span>No.</span><span>Rev.</span></span></div>';
  return sec('<div class="aq-pdf-anatomy__sheet">'+frame+H+'<div class="aq-pdf-anatomy">'+fig+(under?'<div class="aq-pdf-anatomy__under">'+under+'</div>':'')+'<div class="aq-pdf-anatomy__side">'+side+'</div></div></div>','aq-pdf-anatomy-sec')}})();
/* Pointing at a callout draws its leader in flow */
if(typeof document!=='undefined'&&document.addEventListener)['mouseover','mouseout'].forEach(function(t){document.addEventListener(t,function(ev){var c=ev.target.closest&&ev.target.closest('.aq-pdf-anatomy__call');if(!c)return;
 if(t==='mouseout'&&ev.relatedTarget&&c.contains(ev.relatedTarget))return;var l=c.closest('.aq-pdf-anatomy').querySelector('.aq-pdf-anatomy__lead[data-c="'+c.getAttribute('data-c')+'"]');if(l)l.classList.toggle('is-on',t==='mouseover')})});
/* Page turner. Ported from Subframe Motion "Sliding pagination" (compact-pagination), MIT, (c) 2026 Subframe: a five-wide
   window of page numbers slides to keep the current page in view (250 ms cubic-bezier(0.2, 0.8, 0.2, 1)), only the
   numbers in the window are in the tab order, the drawn page answers the turn (230 ms). Turning a page moves the
   current bookmark and the search hit and turns the front page, while the footer's number and revision boxes stay
   and light: the same on every page. Instant under reduced motion. */
function paTurn(nav,p){var n=+nav.getAttribute('data-n'),w=nav.closest('.aq-pdf-anatomy');p=Math.max(1,Math.min(n,p));if(!w)return;nav.setAttribute('data-p',p);
 var start=Math.max(1,Math.min(n-4,p-2)),row=nav.querySelector('.aq-pdf-anatomy__pgr');if(row)row.style.setProperty('--pg-start',start-1);
 [].forEach.call(nav.querySelectorAll('.aq-pdf-anatomy__pgn'),function(bt){var g=+bt.getAttribute('data-p');if(g===p)bt.setAttribute('aria-current','page');else bt.removeAttribute('aria-current');bt.tabIndex=g>=start&&g<start+5?0:-1});
 [].forEach.call(nav.querySelectorAll('.aq-pdf-anatomy__pgs'),function(bt){bt.disabled=(+bt.getAttribute('data-d')<0?p===1:p===n)});
 var cur=w.querySelector('.aq-pdf-anatomy__cur'),hit=w.querySelector('.aq-pdf-anatomy__front .aq-pdf-anatomy__hit'),no=w.querySelector('.aq-pdf-anatomy__pgno'),fr=w.querySelector('.aq-pdf-anatomy__front');
 if(cur)cur.style.transform='translateY('+((p-1)*22)+'px)';if(hit)hit.style.transform='translateY('+(((p*5)%11-5)*18)+'px)';if(no)no.textContent=p+' / '+n;
 var red=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(fr&&fr.animate&&!red)fr.animate([{transform:'translateX(-10px)',opacity:0.35},{transform:'none',opacity:1}],{duration:230,easing:'cubic-bezier(0.2, 0.8, 0.2, 1)'});
 [].forEach.call(w.querySelectorAll('.aq-pdf-anatomy__front .aq-pdf-anatomy__box'),function(bx){bx.classList.remove('is-ping');void bx.getBoundingClientRect();bx.classList.add('is-ping')})}
if(typeof document!=='undefined'&&document.addEventListener)document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('.aq-pdf-anatomy__pgn,.aq-pdf-anatomy__pgs');if(!b)return;var nav=b.closest('.aq-pdf-anatomy__pager');
 var p=b.hasAttribute('data-p')?+b.getAttribute('data-p'):+nav.getAttribute('data-p')+(+b.getAttribute('data-d'));paTurn(nav,p);if(b.hasAttribute('data-p'))b.focus()});
