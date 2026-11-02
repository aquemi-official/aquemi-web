/* Look "joint-tag" -> JointTag (design-system/components/JointTag): one joint, one log line, shown on the joint itself.
   A polypropylene pipe in side view runs across the section and off both edges, two lengths fused in the middle with
   the double-rolled fusion bead; each length carries its printed lot marking, the joint number is stencilled beside
   the bead, a fused test coupon lies on the bench under it and a dashed cut line marks where a rejected joint would be cut out. A
   traceability tag hangs from the joint on its wire: the log line as a printed form, one box per field (number, field,
   what it proves, the record). Each field's number is also pinned on the part of the joint it describes; pointing at a
   field lights its pin.
   Fields, as a table: cols [field, what it proves, record], rows, fold, fold_noun. Optional parts (one per row: num,
   lot, welder, bead, visual, coupon, sign, cut; default from the field's words). The fold applies on phones only. */
LOOKS['joint-tag']=(function(){
 var PIN={num:[810,76],lot:[560,118],welder:[770,262],bead:[640,36],visual:[640,262],coupon:[372,303],sign:[770,316],cut:[940,118]};
 function pick(s){s=String(s||'');return /joint number/i.test(s)?'num':/material|lot/i.test(s)?'lot':/welder/i.test(s)?'welder':/parameter|setting/i.test(s)?'bead':/visual|examin/i.test(s)?'visual':/test joint/i.test(s)?'coupon':/repair|cut/i.test(s)?'cut':'sign'}
 function str(c){return String(c&&typeof c==='object'?c.t:c==null?'':c)}
 function dots(x0,y,w){var o='';for(var x=x0;x<x0+w;x+=9)o+='<rect x="'+x+'" y="'+(y+((x/9)%3===0?3:0))+'" width="5" height="'+((x/9)%4===1?9:5)+'"/>';return '<g class="aq-joint-tag__print">'+o+'</g>'}
 function pipe(){var o='';
  /* two lengths, flat tonal fills: body, the shaded underside, a highlight; the left runs off the page edge */
  o+='<rect class="aq-joint-tag__body" x="-600" y="70" width="1288" height="160"/><rect class="aq-joint-tag__shade" x="-600" y="182" width="1288" height="48"/>'
   +'<rect class="aq-joint-tag__body" x="712" y="70" width="1288" height="160"/><rect class="aq-joint-tag__shade" x="712" y="182" width="1288" height="48"/>'
   +'<path class="aq-joint-tag__hi" d="M-600 92H684M736 92H2000"/>'
   +'<path class="aq-joint-tag__edge" d="M-600 70H688M712 70H2000M-600 230H688M712 230H2000"/>';
  /* the bead: two rolled lobes each side of the fusion line, above and below */
  o+='<rect class="aq-joint-tag__fuse" x="676" y="70" width="48" height="160"/>'
   +'<path class="aq-joint-tag__bead" d="M670 72C664 46 676 30 690 34C699 37 700 50 700 62C700 50 701 37 710 34C724 30 736 46 730 72Z"/>'
   +'<path class="aq-joint-tag__bead" d="M670 228C664 254 676 270 690 266C699 263 700 250 700 238C700 250 701 263 710 266C724 270 736 254 730 228Z"/>'
   +'<path class="aq-joint-tag__curl" d="M680 60C680 48 688 44 694 50M720 60C720 48 712 44 706 50M680 240C680 252 688 256 694 250M720 240C720 252 712 256 706 250"/>'
   +'<path class="aq-joint-tag__seam" d="M700 62V238"/>';
  /* lot markings, the stencilled joint number, the cut-out line */
  o+=dots(300,140,320)+dots(860,140,200)
   +'<g class="aq-joint-tag__sten"><rect x="772" y="104" width="76" height="30"/><text x="810" y="125" text-anchor="middle">J-01</text></g>'
   +'<path class="aq-joint-tag__cut" d="M940 52V248"/><path class="aq-joint-tag__cutm" d="M930 44L950 60M950 44L930 60M930 240L950 256M950 240L930 256"/>';
  /* the wire round the joint and down to the tag */
  o+='<path class="aq-joint-tag__wire" d="M742 70C758 70 758 230 742 230M742 230C718 236 716 252 724 262C730 270 730 284 724 300V340"/>';
  /* the test joint: a short fused coupon of the same pipe, bead in the middle, lying on the bench under the joint */
  o+='<g class="aq-joint-tag__coupon"><path class="aq-joint-tag__bench" d="M384 324H572"/>'
   +'<rect class="aq-joint-tag__cb" x="404" y="290" width="144" height="26"/><rect class="aq-joint-tag__cs" x="404" y="307" width="144" height="9"/>'
   +'<path class="aq-joint-tag__ce" d="M404 290H548V316H404Z"/>'
   +'<path class="aq-joint-tag__cbd" d="M468 291C465 282 470 278 476 280C482 278 487 282 484 291Z"/><path class="aq-joint-tag__cbd" d="M468 315C465 324 470 328 476 326C482 328 487 324 484 315Z"/>'
   +'<path class="aq-joint-tag__seam" d="M476 291V315"/></g>';
  return o}
 return function(b,H){var C=b.cols||[],R=b.rows||[],Pt=b.parts||[];
  var parts=R.map(function(r,i){return PIN[Pt[i]]?Pt[i]:pick(str(r[0]))}),pins='',used={};
  parts.forEach(function(p,i){var q=PIN[p].slice(),u=used[p]=(used[p]||0)+1;if(u>1)q=[q[0]+34*(u-1),q[1]];
   pins+='<g class="aq-joint-tag__pin" data-k="'+i+'"><circle cx="'+q[0]+'" cy="'+q[1]+'" r="15"/><text x="'+q[0]+'" y="'+q[1]+'" text-anchor="middle" dominant-baseline="central">'+(i<9?'0':'')+(i+1)+'</text></g>'});
  var svg='<div class="aq-joint-tag__pipe" aria-hidden="true"><svg viewBox="0 0 1200 340" focusable="false">'+pipe()+pins+'</svg></div>';
  var k=function(i){return C[i]?'<p class="aq-joint-tag__k">'+tx(C[i])+'</p>':''};
  var list='<ol class="aq-joint-tag__fields" role="list">'+R.map(function(r,i){
   return fli('<li class="aq-joint-tag__field" data-k="'+i+'">',b,i)+idx(i)
    +'<h3 class="aq-joint-tag__name">'+tcell(r[0])+'</h3>'
    +(r[1]!=null?'<div class="aq-joint-tag__proves">'+k(1).replace('__k"','__k aq-joint-tag__k--sr"')+'<p>'+tcell(r[1])+'</p></div>':'')
    +(r[2]!=null?'<div class="aq-joint-tag__rec">'+k(2)+'<p>'+tcell(r[2])+'</p></div>':'')+'</li>'}).join('')+'</ol>';
  var tag='<div class="aq-joint-tag__tag" data-theme="light"><span class="aq-joint-tag__eye" aria-hidden="true"></span>'
   +'<p class="aq-joint-tag__th" aria-hidden="true"><span>'+tx(C[0]||'')+'</span>'+(C[1]?'<span class="aq-joint-tag__lg">'+tx(C[1])+'</span>':'')+'<span>J-01</span></p>'+wFold(b,R.length,list,b.fold_noun||'fields')+'</div>';
  return sec(H+'<div class="aq-joint-tag">'+svg+tag+'</div>','aq-joint-tag-sec')}
})();
/* JointTag: pointing at (or focusing into) a field lights its pin on the joint */
(function(){function hl(ev,on){var f=ev.target.closest&&ev.target.closest('.aq-joint-tag__field');if(!f)return;var r=f.closest('.aq-joint-tag'),k=f.getAttribute('data-k');
 f.classList.toggle('is-on',on);[].forEach.call(r.querySelectorAll('.aq-joint-tag__pin[data-k="'+k+'"]'),function(p){p.classList.toggle('is-on',on)})}
 document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)});
 document.addEventListener('focusin',function(ev){hl(ev,true)});document.addEventListener('focusout',function(ev){hl(ev,false)})})();
