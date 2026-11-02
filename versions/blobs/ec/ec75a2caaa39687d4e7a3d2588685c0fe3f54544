/* Look "spare-sheet" -> SpareSheet (design-system/components/SpareSheet): like for like, or a change, read off a
   limestone drawing sheet. The sheet has a double border and a title block; the title and intro sit top left, and top
   right one spare is drawn large as a dimensioned part drawing (centre line, overall dimensions A and B with extension
   lines and oblique ticks, a balloon with its row number). Under them the real table keeps its four columns, headed
   1 to 4 as drawing notes: part, like for like when, a change when, what follows a change. Choosing a row (pointing,
   focus, or its part button) draws that part on the sheet. Drawings, flat line art: an RO membrane element, a probe
   with its transmitter, a program memory card, a gasket and a diaphragm, an EDI module, a UV lamp, a vent filter
   cartridge (matched from the part's name, or b.kit[i]); a part with no drawing gets a plain outline.
   Concept: research/pass9b/concepts/svc-service.4.png (dimensioned part drawing on a limestone sheet, part list boxed,
   title block), with the live table's four-column like-for-like logic restored.
   Fields as a table block: h, intro, cols [part, like-for-like, change, what follows], rows, fold, fold_noun, kit.
   Desktop shows every row; the fold applies on phones, where each row stacks with its column names. */
var SS_ART={
 membrane:{b:[22,36,218,64],a:'<rect x="22" y="36" width="196" height="28"/><path d="M34 36v28M206 36v28M70 36v28M118 36v28M166 36v28"/><path class="k-t" d="M22 50h-10M218 50h10"/><circle class="k-t" cx="28" cy="50" r="3"/>'},
 probe:{b:[14,40,180,92],a:'<rect x="30" y="40" width="58" height="20"/><path d="M88 46h70v8H88"/><path class="k-t" d="M158 48h22M158 52h22"/><path d="M30 50C14 50 14 78 40 78h38"/><rect x="78" y="70" width="40" height="22"/><path class="k-t" d="M84 76h28M84 81h20"/><circle class="k-a" cx="112" cy="86" r="2"/>'},
 card:{b:[70,26,170,86],a:'<path d="M70 26h84l16 16v44H70Z"/><path class="k-t" d="M154 26v16h16"/><path d="M82 86V70M92 86V70M102 86V70M112 86V70M122 86V70M132 86V70"/><rect class="k-a" x="86" y="38" width="44" height="18"/>'},
 seal:{b:[44,22,198,82],a:'<circle cx="74" cy="52" r="30"/><circle cx="74" cy="52" r="20"/><circle cx="168" cy="52" r="30"/><circle class="k-t" cx="168" cy="52" r="7"/><path class="k-t" d="M168 22v-6M168 82v6M138 52h-6M198 52h6"/><circle class="k-t" cx="150" cy="31" r="2"/><circle class="k-t" cx="186" cy="31" r="2"/><circle class="k-t" cx="150" cy="73" r="2"/><circle class="k-t" cx="186" cy="73" r="2"/>'},
 edi:{b:[36,14,204,78],a:'<rect x="40" y="26" width="16" height="52"/><rect x="184" y="26" width="16" height="52"/><rect x="56" y="32" width="128" height="40"/><path class="k-t" d="M64 32v40M72 32v40M80 32v40M88 32v40M96 32v40M104 32v40M112 32v40M120 32v40M128 32v40M136 32v40M144 32v40M152 32v40M160 32v40M168 32v40M176 32v40"/><path d="M36 30h168M36 74h168"/><rect class="k-a" x="104" y="14" width="32" height="12"/>'},
 lamp:{b:[18,42,222,58],a:'<rect x="30" y="42" width="180" height="16" rx="8"/><path class="k-t" d="M44 50h152"/><path d="M210 46h12M210 54h12M30 46h-12M30 54h-12"/><path class="k-a" d="M60 50h120"/>'},
 cartridge:{b:[74,20,166,94],a:'<rect x="74" y="20" width="92" height="12"/><rect x="80" y="32" width="80" height="48"/><path class="k-t" d="M88 32v48M96 32v48M104 32v48M112 32v48M120 32v48M128 32v48M136 32v48M144 32v48M152 32v48"/><rect x="74" y="80" width="92" height="8"/><path d="M112 88v6h16v-6"/>'}};
var SS_MATCH=[[/membrane/i,'membrane'],[/instrument|probe|sensor/i,'probe'],[/software|program/i,'card'],[/gasket|diaphragm|seal/i,'seal'],[/\bEDI\b|electrodeioni/i,'edi'],[/lamp/i,'lamp'],[/vent|cartridge/i,'cartridge']];
function ssKind(name,kind){if(kind&&SS_ART[kind])return kind;var s=String(name&&name.t||name||'');kind='';SS_MATCH.some(function(m){if(m[0].test(s)){kind=m[1];return true}});return kind}
/* one part, drawn large and dimensioned, in the 480 x 260 drawing field */
function ssPart(kind,i,on){var K='aq-spare-sheet',P=SS_ART[kind]||{b:[40,24,200,80],a:'<rect x="40" y="24" width="160" height="56"/>'},b=P.b,f=function(v){return v.toFixed(1)};
 var w=b[2]-b[0],h=b[3]-b[1],s=Math.min(350/w,160/h,2.6),ox=214-(b[0]+w/2)*s,oy=124-(b[1]+h/2)*s;
 var X=function(x){return ox+x*s},Y=function(y){return oy+y*s},x0=X(b[0]),x1=X(b[2]),y0=Y(b[1]),y1=Y(b[3]),cy=(y0+y1)/2,dy=y1+28,dx=x1+30;
 var tk=function(x,y){return 'M'+f(x-4)+' '+f(y+4)+'L'+f(x+4)+' '+f(y-4)};
 var dims='<path class="'+K+'__cl" d="M'+f(x0-18)+' '+f(cy)+'H'+f(x1+18)+'"/>'
  +'<path class="'+K+'__dim" d="M'+f(x0)+' '+f(y1+6)+'V'+f(dy+6)+'M'+f(x1)+' '+f(y1+6)+'V'+f(dy+6)+'M'+f(x0)+' '+f(dy)+'H'+f(x1)+tk(x0,dy)+tk(x1,dy)
  +'M'+f(x1+6)+' '+f(y0)+'H'+f(dx+6)+'M'+f(x1+6)+' '+f(y1)+'H'+f(dx+6)+'M'+f(dx)+' '+f(y0)+'V'+f(y1)+tk(dx,y0)+tk(dx,y1)+'"/>'
  +'<text class="'+K+'__dt" x="'+f((x0+x1)/2)+'" y="'+f(dy-5)+'">A</text><text class="'+K+'__dt" x="'+f(dx+9)+'" y="'+f(cy+4)+'" text-anchor="start">B</text>';
 var bx=x1-12,by=y0,bl='<path class="'+K+'__dim" d="M'+f(bx)+' '+f(by)+'L'+f(bx+26)+' '+f(by-30)+'H'+f(bx+40)+'"/><circle class="'+K+'__dot" cx="'+f(bx)+'" cy="'+f(by)+'" r="2.5"/>'
  +'<circle class="'+K+'__ball" cx="'+f(bx+54)+'" cy="'+f(by-30)+'" r="14"/><text class="'+K+'__bt" x="'+f(bx+54)+'" y="'+f(by-26)+'">'+(i<9?'0':'')+(i+1)+'</text>';
 return '<g class="'+K+'__part'+(on?' is-on':'')+'" data-i="'+i+'"><g class="'+K+'__art" transform="translate('+f(ox)+' '+f(oy)+') scale('+s.toFixed(3)+')">'+P.a+'</g>'+dims+bl+'</g>'}
LOOKS['spare-sheet']=function(b,H){var C=b.cols||[],R=b.rows||[],K='aq-spare-sheet',kit=b.kit||[],n=R.length,tot=(n<10?'0':'')+n;
 var parts=R.map(function(r,i){return ssPart(ssKind(r[0],kit[i]),i,!i)}).join('');
 var svg='<svg class="'+K+'__svg" viewBox="0 0 480 260" aria-hidden="true" focusable="false"><path class="'+K+'__cross" d="M8 130h10M462 130h10M240 6v10M240 244v10"/>'+parts+'</svg>';
 var nos=['1','2','3','4'];
 var head='<thead><tr>'+C.slice(0,4).map(function(c,j){return '<th scope="col"><span class="'+K+'__hn" aria-hidden="true">'+nos[j]+'</span>'+tx(c)+'</th>'}).join('')+'</tr></thead>';
 var body=R.map(function(r,i){var no=(i<9?'0':'')+(i+1);
  return fli('<tr class="'+K+'__row'+(i?'':' is-on')+'" data-i="'+i+'">',b,i)
   +'<th scope="row"><button type="button" class="'+K+'__pick" data-i="'+i+'" aria-pressed="'+(i?'false':'true')+'"><span class="'+K+'__n" aria-hidden="true">'+no+'</span><span class="'+K+'__p">'+tcell(r[0])+'</span></button></th>'
   +[1,2,3].map(function(j){return '<td><span class="'+K+'__k" aria-hidden="true">'+tx(C[j]||'')+'</span>'+tcell(r[j])+'</td>'}).join('')+'</tr>'}).join('');
 var tb='<div class="'+K+'__tb" aria-hidden="true"><span class="'+K+'__tbn">'+R.map(function(r,i){return '<span class="'+K+'__tbp'+(i?'':' is-on')+'" data-i="'+i+'">'+tcell(r[0])+'</span>'}).join('')+'</span><span class="'+K+'__tbs">Part <span class="'+K+'__tbi">01</span> / '+tot+'</span></div>';
 var sheet='<div class="'+K+'" data-theme="light"><div class="'+K+'__top">'+H+'<figure class="'+K+'__fig">'+svg+'</figure></div>'
  +wFold(b,n,'<table class="'+K+'__table">'+head+'<tbody>'+body+'</tbody></table>',b.fold_noun||'parts')+tb+'</div>';
 return sec(sheet,K+'-sec')};
/* Choosing a row (pointer, focus, or its button) draws that part on the sheet */
function ssPick(r,i){if(!r)return;var cur=r.getAttribute('data-on')||'0';if(String(i)===cur)return;r.setAttribute('data-on',i);
 [].forEach.call(r.querySelectorAll('[data-i]'),function(el){var on=el.getAttribute('data-i')===String(i);el.classList.toggle('is-on',on);if(el.classList.contains('aq-spare-sheet__pick'))el.setAttribute('aria-pressed',on?'true':'false')});
 var t=r.querySelector('.aq-spare-sheet__tbi');if(t)t.textContent=(i<9?'0':'')+(+i+1);
 if(window.AQspareDraw)AQspareDraw(r,i)}
window.ssPick=ssPick;
(function(){function go(ev){var s=ev.target.closest&&ev.target.closest('.aq-spare-sheet__row');if(!s)return;ssPick(s.closest('.aq-spare-sheet'),+s.getAttribute('data-i'))}
 document.addEventListener('mouseover',go);document.addEventListener('focusin',go);document.addEventListener('click',go)})();
