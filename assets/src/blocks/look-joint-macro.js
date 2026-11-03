/* Look "joint-macro" -> JointMacro (design-system/components/JointMacro): a standard as a macro close-up of the thing it
   governs, its contours traced and numbered, with the standard's rows beside it. On the navy band, the end of a
   polypropylene pipe fills the left of the section in flat duotone planes, cropped by the section edge: the body
   running away up to the right with its printed lot marking, the end face (the surface every joint is made on) as a
   ring, the bore with its inner wall. The face's contour is traced in a hairline; a dimension marks the wall. Each row
   that is about a part of the pipe carries its number on a leader to that part. Pointing at (or focusing) a row moves
   a crop frame onto its part and fades the rest of the macro.
   The drawing shows a prepared pipe end only, no joint profile: the joining method is an open fact ([PP joining
   method]) and the drawing must not assert one.
   Fields, as a spec block: h, caption, cols [item, what we do, standard and record], rows [{p, v, m, part}], fold,
   fold_noun. part (optional): wall, face, exam, bore, mark, or "none" (default from the item's words). The fold applies
   on phones only, and not on this look (pass 12, S7: the callouts point at rows 07-10). Phones: the macro is a PhoneKit
   sticky strip (220 px, the whole drawing so every callout stays inside) over all the rows as compact rows; the row on
   the reading line lights its callout (no crop frame at this size) and is named beside the macro. Without
   script, the macro sits on top and the rows run under it. */
LOOKS['joint-macro']=(function(){
 var W=720,Hh=640;
 /* anchors on the part and where the number sits (viewBox units); a second row on the same part uses the second pair */
 var A={wall:[[112,216,170,100],[98,244,56,384]],face:[[263,534,150,604]],exam:[[265,278,372,112]],bore:[[290,372,452,430],[262,412,452,504]],mark:[[566,288,652,392]]};
 /* the crop frame for each part: x, y, w, h */
 var CROP={wall:[8,80,250,280],face:[120,420,280,214],exam:[170,70,260,250],bore:[176,270,250,260],mark:[430,170,286,260]};
 function pick(s){s=String(s||'');return /certificate/i.test(s)?'mark':/^material/i.test(s)?'wall':/examin|visual/i.test(s)?'exam':/^joining/i.test(s)?'face':/surface|clean|rinse|flush/i.test(s)?'bore':/pressure/i.test(s)?'wall':'none'}
 function drawing(k,leads){
  var rot=' transform="rotate(-36.87 250 400)"',ell=function(c,rx,ry,x,y,ex){return '<ellipse class="'+c+'" cx="'+(x||250)+'" cy="'+(y||400)+'" rx="'+rx+'" ry="'+ry+'" transform="rotate(-36.87 '+(x||250)+' '+(y||400)+')"'+(ex||'')+'/>'};
  return '<svg viewBox="0 0 '+W+' '+Hh+'" preserveAspectRatio="xMidYMid slice" focusable="false">'
   +'<defs><clipPath id="aqjm-bore'+k+'"><ellipse cx="250" cy="400" rx="70" ry="200"'+rot+'/></clipPath></defs>'
   /* body: side, shaded underside, highlight, edges, the printed lot marking */
   +'<path class="aq-joint-macro__side" d="M94 192L894 -408L1206 8L406 608Z"/>'
   +'<path class="aq-joint-macro__shade" d="M370 560L1170 -40L1206 8L406 608Z"/>'
   +'<path class="aq-joint-macro__hi" d="M196 228L996 -372"/>'
   +'<path class="aq-joint-macro__edge" d="M94 192L894 -408M406 608L1206 8"/>'
   +'<path class="aq-joint-macro__print" d="M470 360L760 142"/><path class="aq-joint-macro__print aq-joint-macro__print--b" d="M482 378L700 214"/>'
   /* the end face: ring, bore with its inner wall, the far end seen through it */
   +ell('aq-joint-macro__face',91,260)+ell('aq-joint-macro__wallin',70,200)
   +'<g clip-path="url(#aqjm-bore'+k+')">'+ell('aq-joint-macro__deep',70,200,298,364)+'</g>'
   +ell('aq-joint-macro__ln',91,260)+ell('aq-joint-macro__ln',70,200)+ell('aq-joint-macro__far',70,200,298,364,' clip-path="url(#aqjm-bore'+k+')"')
   /* the traced contour of the face, and the wall dimension */
   +ell('aq-joint-macro__trace',99,272)
   +'<path class="aq-joint-macro__dim" d="M130 240L94 192M126 246L146 231M90 198L110 183"/>'
   +leads+'</svg>'}
 return function(b,H){var C=b.cols||[],R=b.rows||[],used={},leads='',nums='';
  var parts=R.map(function(r){var p=r.part||pick(r.p);return A[p]?p:'none'});
  parts.forEach(function(p,i){if(p==='none')return;var u=used[p]=(used[p]||0),q=A[p][Math.min(u,A[p].length-1)];used[p]++;var n=(i<9?'0':'')+(i+1);
   leads+='<g class="aq-joint-macro__lead" data-k="'+i+'"><path d="M'+q[0]+' '+q[1]+'L'+q[2]+' '+q[3]+'"/><circle cx="'+q[0]+'" cy="'+q[1]+'" r="3.5"/></g>';
   nums+='<span class="aq-joint-macro__no" data-k="'+i+'" style="left:'+(q[2]/W*100).toFixed(2)+'%;top:'+(q[3]/Hh*100).toFixed(2)+'%">'+n+'</span>'});
  var corners='<span class="aq-joint-macro__crop"><i></i><i></i><i></i><i></i></span>';
  var fig='<div class="aq-joint-macro__fig" aria-hidden="true"><div class="aq-joint-macro__ctx">'+drawing('a','')+'</div><div class="aq-joint-macro__ap">'+drawing('b',leads)+nums+'</div>'+corners+'</div>';
  var k=function(i){return C[i]?'<span class="aq-joint-macro__k">'+tx(C[i])+'</span>':''};
  var legend='<p class="aq-joint-macro__legend" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+(C[2]?' · '+tx(C[2]):'')+'</span></p>';
  var list='<ol class="aq-joint-macro__rows" role="list">'+R.map(function(r,i){var p=parts[i],cr=CROP[p];
   var at=cr?' data-crop="'+[cr[1]/Hh,1-(cr[0]+cr[2])/W,1-(cr[1]+cr[3])/Hh,cr[0]/W].map(function(v){return (Math.max(0,v)*100).toFixed(2)+'%'}).join(' ')+'" tabindex="0"':'';
   return fli('<li class="aq-joint-macro__row'+(cr?' is-pinned':'')+'" data-k="'+i+'" data-pk-row="'+i+'"'+at+'>',b,i)
    +'<span class="aq-joint-macro__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
    +'<h3 class="aq-joint-macro__p">'+tx(r.p)+'</h3>'
    +'<div class="aq-joint-macro__vm"><p class="aq-joint-macro__v">'+k(1)+tx(r.v)+'</p><p class="aq-joint-macro__m">'+k(2)+tx(r.m)+'</p></div></li>'}).join('')+'</ol>';
  var cap=b.caption?'<p class="aq-eyebrow aq-joint-macro__cap">'+tx(b.caption)+'</p>':'';
  /* pass 12 phone: the stage is a PhoneKit sticky strip; beside the macro it names the row being read (filled from the
     row's own number and title by the script below; aria-hidden, the row carries the words) */
  var now='<p class="aq-joint-macro__now" aria-hidden="true"><span class="aq-joint-macro__now-n"></span><span class="aq-joint-macro__now-t"></span></p>';
  return sec('<div class="aq-joint-macro" data-pk-sticky data-pk-h="220"><div class="aq-joint-macro__head">'+cap+H+'</div>'
   +'<div class="aq-joint-macro__stage" data-pk-fig>'+fig+now+'</div>'
   +'<div class="aq-joint-macro__body">'+legend+wFold(b,R.length,list,b.fold_noun||'rows')+'</div></div>','aq-band--navy aq-joint-macro-sec')}
})();
/* JointMacro: pointing at (or focusing) a pinned row moves the crop frame onto its part; leaving resets it */
(function(){function set(row,on){var r=row.closest('.aq-joint-macro'),f=r&&r.querySelector('.aq-joint-macro__fig');if(!f)return;var k=row.getAttribute('data-k'),c=on&&row.getAttribute('data-crop');
 [].forEach.call(r.querySelectorAll('.is-on'),function(x){x.classList.remove('is-on')});
 if(c){var v=c.split(' ');['--t','--r','--b','--l'].forEach(function(n,i){f.style.setProperty(n,v[i])});f.classList.add('is-crop');
  [].forEach.call(r.querySelectorAll('[data-k="'+k+'"]'),function(x){x.classList.add('is-on')})}
 else{['--t','--r','--b','--l'].forEach(function(n){f.style.removeProperty(n)});f.classList.remove('is-crop')}}
 function h(on){return function(ev){var row=ev.target.closest&&ev.target.closest('.aq-joint-macro__row');if(!row)return;
  if(!on&&ev.relatedTarget&&row.contains(ev.relatedTarget))return;set(row,on&&row.hasAttribute('data-crop'))}}
 document.addEventListener('mouseover',h(true));document.addEventListener('mouseout',h(false));
 document.addEventListener('focusin',h(true));document.addEventListener('focusout',h(false));
 /* phones (PhoneKit sticky): the row on the reading line lights its callout and fills the strip's "now" label */
 document.addEventListener('pk:change',function(ev){var r=ev.target;if(!r.classList||!r.classList.contains('aq-joint-macro'))return;
  var rows=[].slice.call(r.querySelectorAll('.aq-joint-macro__row')),row=rows[ev.detail.index],n=r.querySelector('.aq-joint-macro__now-n'),t=r.querySelector('.aq-joint-macro__now-t');
  [].forEach.call(r.querySelectorAll('.is-on'),function(x){x.classList.remove('is-on')});
  r.classList.remove('is-pk-none');
  if(!ev.detail.on||!row){if(rows[0])set(rows[0],false);if(n)n.textContent='';if(t)t.textContent='';return}
  /* a row with no part on the drawing: every callout steps back, so the strip does not look as if it lost the row */
  if(!r.querySelector('.aq-joint-macro__lead[data-k="'+row.getAttribute('data-k')+'"]'))r.classList.add('is-pk-none');
  /* the strip is small: no crop, every callout stays drawn and the row's own callout lights */
  [].forEach.call(r.querySelectorAll('[data-k="'+row.getAttribute('data-k')+'"]'),function(x){x.classList.add('is-on')});var a=row.querySelector('.aq-joint-macro__n'),b=row.querySelector('.aq-joint-macro__p');
  if(n)n.textContent=a?a.textContent:'';if(t)t.textContent=b?b.textContent:''})})();
