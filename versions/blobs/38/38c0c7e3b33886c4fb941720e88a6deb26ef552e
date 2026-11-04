/* Look "battery-limit" -> BatteryLimit (design-system/components/BatteryLimit): a spec block of site requirements on a
   split band, navy on the left and limestone on the right; the divide is the battery limit, drawn as a P&ID battery
   limit line (dash and dot) with its name set vertically. The row that is the battery limit itself sits on the seam,
   across both grounds. Every other row is a card on its side, the package's on the navy, the site's on the limestone,
   each tied to the seam by a leader that ends in a tie-in node, so the line reads as the list of connection points.
   Site cards hang half a step lower than the package's, so the nodes alternate down the line like a zip.
   Fields: h, intro, cols ([item, typical, note] labels; the second and third key each card's value and note), rows
   [{p, v, m, side, link, link_label}] (side: "limit" | "package" | "site"; default site), sides ([package label, site
   label]), seam (the line's name), fold, fold_noun (the fold applies on phones only; desktop shows every card). */
LOOKS['battery-limit']=function(b,H){
 var R=b.rows||[],C=b.cols||['Item','Typical','Note'],SD=b.sides||['',''],lim=-1;
 R.some(function(r,i){if(r.side==='limit'){lim=i;return true}});
 var kk={package:0,site:0},last=R.length-1;if(last===lim)last--;
 function card(r,i,side){var lk=r.link&&wp(r.link)?'<a class="aq-battery-limit__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':'';
  var who=side!=='limit'&&SD[side==='package'?0:1]?'<span class="aq-battery-limit__who">'+tx(SD[side==='package'?0:1])+'</span>':'';
  var body='<div class="aq-battery-limit__card">'+idx(i)+who+'<h3 class="aq-battery-limit__p">'+tx(r.p)+'</h3>'
   +'<dl class="aq-battery-limit__dl"><div><dt>'+tx(C[1]||'')+'</dt><dd class="aq-battery-limit__v">'+tx(r.v)+'</dd></div>'
   +(r.m||lk?'<div><dt>'+tx(C[2]||'')+'</dt><dd class="aq-battery-limit__m">'+(r.m?tx(r.m):'')+(r.m&&lk?' ':'')+lk+'</dd></div>':'')+'</dl></div>';
  if(side==='limit')return '<div class="aq-battery-limit__limit" style="order:'+(10+i)+'"'+(i===R.length-1?' data-last':'')+'>'+body+'</div>';
  return fli('<li class="aq-battery-limit__item" data-r="'+i+'" data-k="'+(kk[side]++)+'" style="order:'+(10+i)+'"'+(i===last?' data-last':'')+'>',b,i)+(side==='site'?'<span class="aq-battery-limit__tie" aria-hidden="true"><span class="aq-battery-limit__node"></span><span class="aq-battery-limit__lead"></span></span>'+body
   :body+'<span class="aq-battery-limit__tie" aria-hidden="true"><span class="aq-battery-limit__lead"></span><span class="aq-battery-limit__node"></span></span>')+'</li>'}
 var pk='',st='';R.forEach(function(r,i){if(i===lim)return;if(r.side==='package')pk+=card(r,i,'package');else st+=card(r,i,'site')});
 var seam='<span class="aq-battery-limit__navy" aria-hidden="true"></span><svg class="aq-battery-limit__line" aria-hidden="true" focusable="false"><line x1="50%" y1="0" x2="50%" y2="100%"/></svg>'
  +(b.seam?'<span class="aq-battery-limit__seam-t" aria-hidden="true">'+tx(b.seam)+'</span>':'');
 var inner='<div class="aq-battery-limit">'
  +'<div class="aq-battery-limit__head">'+H+'</div>'
  +(SD[0]?'<p class="aq-battery-limit__side is-pkg">'+tx(SD[0])+'</p>':'')
  +'<ul class="aq-battery-limit__list is-pkg" role="list">'+pk+'</ul>'
  +(lim>=0?card(R[lim],lim,'limit'):'')
  +(SD[1]?'<p class="aq-battery-limit__side is-site">'+tx(SD[1])+'</p>':'')
  +'<ul class="aq-battery-limit__list is-site" role="list">'+st+'</ul></div>';
 /* pass 12 C: fewer site cards than package cards leaves the site side empty at its foot; the seam's name moves there */
 return '<section class="aq-section aq-band--split aq-battery-limit-sec'+(b.seam&&kk.site<kk.package?' is-site-short':'')+'">'+seam+'<div class="aq-in">'+wFold(b,R.length,inner,b.fold_noun)+'</div></section>'};
/* Hover or focus on a card lights its leader and tie-in node */
(function(){
 function over(ev){var root=ev.target.closest&&ev.target.closest('.aq-battery-limit');if(!root)return;var t=ev.target.closest('.aq-battery-limit__item');
  [].forEach.call(root.querySelectorAll('.aq-battery-limit__item.is-hot'),function(el){if(el!==t)el.classList.remove('is-hot')});if(t)t.classList.add('is-hot')}
 function out(ev){var root=ev.target.closest&&ev.target.closest('.aq-battery-limit');if(root&&!root.contains(ev.relatedTarget))[].forEach.call(root.querySelectorAll('.is-hot'),function(el){el.classList.remove('is-hot')})}
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);document.addEventListener('mouseout',out);document.addEventListener('focusout',out);
})();
