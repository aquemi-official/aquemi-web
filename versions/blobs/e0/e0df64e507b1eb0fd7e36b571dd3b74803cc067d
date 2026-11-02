/* Look "time-card" -> TimeCard (design-system/components/TimeCard): a spec block of working terms set as the shop's
   time card, the one paper everyone on the floor handles each week. A limestone card stands on the ground with its
   punched hang hole, a header strip naming the columns, and one ruled line per term: the line number in a punch
   column down the left edge (a dashed slot), the item as the line's name with the term under it as a mono detail line
   (pass 9b: the term-name / mono-detail pairing of concept careers.1), and the note in the margin. The block's
   note is stamped across the foot of the card. Fields: h, caption, intro, cols [item, term, note], rows [{p, v, m}],
   note, fold, fold_noun. Phones: the card fills the width, each line stacks item, term, note. */
LOOKS['time-card']=function(b,H){var R=b.rows||[],C=b.cols||[],num=function(i){return (i<9?'0':'')+(i+1)};
 var head='<div class="aq-time-card__head" aria-hidden="true"><span>No.</span><span>'+tx(C[0]||'')+(C[1]?' / '+tx(C[1]):'')+'</span><span>'+tx(C[2]||'')+'</span></div>';
 var rows=R.map(function(r,i){return fli('<li class="aq-time-card__row" style="--i:'+i+'">',b,i)
  +'<span class="aq-time-card__n" aria-hidden="true"><i></i>'+num(i)+'</span><div class="aq-time-card__pv"><h3 class="aq-time-card__p">'+tx(r.p)+'</h3>'
  +'<p class="aq-time-card__v">'+tx(r.v)+'</p></div><p class="aq-time-card__m">'+(r.m?tx(r.m):'')+'</p></li>'}).join('');
 var card='<div class="aq-time-card__stack"><span class="aq-time-card__under" aria-hidden="true"></span><div class="aq-time-card" data-theme="light"><span class="aq-time-card__hole" aria-hidden="true"></span>'+head
  +wFold(b,R.length,'<ol class="aq-time-card__rows" role="list">'+rows+'</ol>',b.fold_noun||'terms')
  +(b.note?'<p class="aq-time-card__note"><span class="aq-time-card__stamp">'+tx(b.note)+'</span></p>':'')+'</div></div>';
 return sec(wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro})+card,'aq-time-card-sec')};
