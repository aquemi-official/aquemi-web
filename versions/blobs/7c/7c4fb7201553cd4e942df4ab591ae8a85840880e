/* Look "plan-checker" -> PlanChecker (design-system/components/PlanChecker): service plans as a checker of square-cornered
   tiles on limestone, no table rules. One column per plan, alternating navy and limestone; each column is two tiles:
   the head (a huge light slash numeral "01/", the plan name, who it suits) and the terms (each value set first, its
   label in mono under it, the price largest), then the plan's own button. The "No plan" column is the baseline tile.
   Terms line up across the columns (CSS subgrid); pointing at a term lights the same term in every column.
   Concept: research/pass9b/concepts/svc-service.0.png (four plan columns as alternating navy/limestone tiles, huge slash
   numerals, price and response tiles below).
   Fields as a table block (as: "plans"): cols [label, plan…] (a head may be {t, intent}), rows; the row whose label
   starts "Suits" goes in the head tile; fold (terms shown first), fold_noun; recommend (only when the page says so).
   Button: the page's primary CTA (label, link, intent), one per plan, none on "No plan".
   Phones: the numerals become a row of tabs (still a checker); the picked plan's two tiles run full width. */
LOOKS['plan-checker']=function(b,H){var C=b.cols||[],R=b.rows||[],lab=function(r){return String(r[0]&&r[0].t||r[0]||'')};
 var suits=R.filter(function(r){return /^suits/i.test(lab(r))})[0],rows=R.filter(function(r){return r!==suits});
 var p=W().filter(function(q){return (q.blocks||[]).indexOf(b)>=0})[0]||wp(WP)||{},c=p.cta||{};
 var label=p.primary_cta||c.button||'Request a proposal',link=p.primary_cta?ctaLink(p):(c.link||'contact-proposal'),intent=p.primary_cta?p.primary_cta_intent:c.intent;
 var names=C.map(function(x){return String(x&&x.t||x||'')});
 var rec=typeof b.recommend==='number'?b.recommend:b.recommend?names.indexOf(String(b.recommend)):-1;
 var K='aq-plan-checker',T=C.slice(1).map(function(x,k){var j=k+1;return {j:j,n:names[j],base:/^no\b/i.test(names[j]),rec:j===rec,it:x&&typeof x==='object'&&x.intent||'',no:(j<10?'0':'')+j,navy:k%2===0}});
 var show=rec>0?rec:1,nr=rows.length;
 var plans=T.map(function(t){var tone=t.navy?' is-navy':' is-lime';
  var head='<div class="'+K+'__head'+tone+'"><p class="'+K+'__no" aria-hidden="true"><span class="'+K+'__num">'+t.no+'</span><span class="'+K+'__sl">/</span></p>'
   +(t.rec?'<p class="'+K+'__mark">Recommended</p>':'')+'<h3 class="'+K+'__name">'+tx(t.n)+'</h3>'
   +(suits&&suits[t.j]?'<p class="'+K+'__suits"><span class="'+K+'__sk">'+tcell(suits[0])+'</span> '+tcell(suits[t.j])+'</p>':'')+'</div>';
  var terms=rows.map(function(r,i){return fli('<div class="'+K+'__term'+tone+(i?'':' is-first')+'" data-r="'+i+'">',b,i)
   +'<p class="'+K+'__v">'+tcell(r[t.j])+'</p><p class="'+K+'__k">'+tcell(r[0])+'</p></div>'}).join('');
  var act='<div class="'+K+'__act'+tone+'">'+(t.base?'':wBtn(label,link,t.rec?null:'secondary',t.it||intent).replace('<a ','<a aria-label="'+e(label+': '+t.n)+'" '))+'</div>';
  return '<li class="'+K+'__plan t'+t.j+(t.base?' is-base':'')+(t.rec?' is-rec':'')+'">'+head+terms+act+'</li>'}).join('');
 var tabs='<div class="'+K+'__tabs" role="group" aria-label="Show one plan">'+T.map(function(t){return '<button type="button" class="'+K+'__tab'+(t.navy?' is-navy':' is-lime')+'" data-tier="'+t.j+'" aria-pressed="'+(t.j===show?'true':'false')+'">'
  +'<span class="'+K+'__tabno" aria-hidden="true">'+t.no+'/</span><span class="'+K+'__tabn">'+tx(t.n)+'</span></button>'}).join('')+'</div>';
 var grid='<div class="'+K+'" data-show="'+show+'" style="--n:'+T.length+';--rows:'+nr+'">'+tabs+'<ol class="'+K+'__plans" role="list">'+plans+'</ol></div>';
 return sec(H+wFold(b,nr,grid,b.fold_noun||'terms'),'aq-band--limestone '+K+'-sec" data-theme="light')};
/* Tabs (phones) show one plan; arrow keys move between tabs. Pointing at a term lights it in every plan. */
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-plan-checker__tab');if(!t)return;var w=t.closest('.aq-plan-checker');
 w.setAttribute('data-show',t.getAttribute('data-tier'));w.querySelectorAll('.aq-plan-checker__tab').forEach(function(x){x.setAttribute('aria-pressed',x===t?'true':'false')})});
document.addEventListener('keydown',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-plan-checker__tab');if(!t||(ev.key!=='ArrowRight'&&ev.key!=='ArrowLeft'))return;
 var a=[].slice.call(t.parentNode.querySelectorAll('.aq-plan-checker__tab')),n=a[(a.indexOf(t)+(ev.key==='ArrowRight'?1:a.length-1))%a.length];ev.preventDefault();n.focus();n.click()});
(function(){function hl(ev,on){var s=ev.target.closest&&ev.target.closest('.aq-plan-checker__term');if(!s||s.contains(ev.relatedTarget))return;
 [].forEach.call(s.closest('.aq-plan-checker').querySelectorAll('.aq-plan-checker__term[data-r="'+s.getAttribute('data-r')+'"]'),function(x){x.classList.toggle('is-lit',on)})}
 document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)})})();
