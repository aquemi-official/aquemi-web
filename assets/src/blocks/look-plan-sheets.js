/* Look "plan-sheets" -> PlanSheets (design-system/components/PlanSheets): service plans compared like calibration
   sheets laid side by side on a navy band. Each plan is a limestone sheet (a real table column): a ruled scale strip
   along its top edge, its sheet number set huge and light, the plan name, then the row that says who it suits set large
   as the sheet's headline, then the terms as ruled fields, and the plan's own button at its foot. The row labels run
   down the navy on the left, numbered, so every term reads straight across all sheets (hover a row and it lights
   across them). A "No plan…" column is the baseline: a blank dashed sheet, no button.
   Fields as a table block (as: "plans"): cols [label, plan…], rows; the row whose label starts "Suits" is the headline
   row; fold (feature rows shown first), fold_noun; b.recommend as PlanTiers (only when the page says so). Per-plan
   intent: a column head may be {t, intent}. Button: the page's primary CTA (label, link, intent), as PlanTiers.
   Phones: a row of sheet tabs picks one plan; the picked sheet runs full width with each field's label above its value. */
LOOKS['plan-sheets']=function(b,H){var C=b.cols||[],R=b.rows||[],lab=function(r){return String(r[0]&&r[0].t||r[0]||'')};
 var suits=R.filter(function(r){return /^suits/i.test(lab(r))})[0],rows=R.filter(function(r){return r!==suits});
 var p=W().filter(function(q){return (q.blocks||[]).indexOf(b)>=0})[0]||wp(WP)||{},c=p.cta||{};
 var label=p.primary_cta||c.button||'Request a proposal',link=p.primary_cta?ctaLink(p):(c.link||'contact-proposal'),intent=p.primary_cta?p.primary_cta_intent:c.intent;
 var names=C.map(function(x){return String(x&&x.t||x||'')});
 var rec=typeof b.recommend==='number'?b.recommend:b.recommend?names.indexOf(String(b.recommend)):-1;
 var T=C.slice(1).map(function(x,k){var j=k+1;return {j:j,n:names[j],base:/^no\b/i.test(names[j]),rec:j===rec,it:x&&typeof x==='object'&&x.intent||''}});
 var real=T.filter(function(t){return !t.base}),show=rec>0?rec:(real[0]||T[0]||{j:1}).j;
 real.forEach(function(t,k){t.no=(k<9?'0':'')+(k+1)});var tot=(real.length<10?'0':'')+real.length;
 var K='aq-plan-sheets',cls=function(t,x){return ' class="'+K+'__c t'+t.j+(t.rec?' is-rec':'')+(t.base?' is-base':'')+(x?' '+x:'')+'"'+(t.base?'':' data-theme="light"')};
 var ticks='<svg class="'+K+'__scale" aria-hidden="true" focusable="false"><defs><pattern id="aqps-t" width="8" height="12" patternUnits="userSpaceOnUse"><path d="M0.5 0V4"/></pattern>'
  +'<pattern id="aqps-T" width="40" height="12" patternUnits="userSpaceOnUse"><path d="M0.5 0V8"/></pattern></defs><rect width="100%" height="12" fill="url(#aqps-t)"/><rect width="100%" height="12" fill="url(#aqps-T)"/></svg>';
 var head='<thead><tr class="'+K+'__heads"><td class="'+K+'__corner"></td>'+T.map(function(t){return '<th scope="col"'+cls(t,K+'__head')+'>'
  +(t.base?'':ticks+'<span class="'+K+'__no" aria-hidden="true">'+t.no+'</span><span class="'+K+'__of" aria-hidden="true">Sheet '+t.no+' / '+tot+'</span>')
  +(t.rec?'<span class="'+K+'__mark">Recommended</span>':'')+'<span class="'+K+'__name">'+tx(t.n)+'</span></th>'}).join('')+'</tr></thead>';
 var top=suits?'<tr class="'+K+'__suits"><th scope="row" class="'+K+'__label"><span class="'+K+'__lt">'+tcell(suits[0])+'</span></th>'
  +T.map(function(t){return '<td'+cls(t)+'><span class="'+K+'__k" aria-hidden="true">'+tcell(suits[0])+'</span><span class="'+K+'__fit">'+(suits[t.j]?tcell(suits[t.j]):'')+'</span></td>'}).join('')+'</tr>':'';
 var body=rows.map(function(r,i){return fli('<tr class="'+K+'__row">',b,i)
  +'<th scope="row" class="'+K+'__label"><span class="aq-index" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><span class="'+K+'__lt">'+tcell(r[0])+'</span></th>'
  +T.map(function(t){return '<td'+cls(t)+'><span class="'+K+'__k" aria-hidden="true">'+tcell(r[0])+'</span><span class="'+K+'__v">'+tcell(r[t.j])+'</span></td>'}).join('')+'</tr>'}).join('');
 var act='<tr class="'+K+'__acts"><td class="'+K+'__corner"></td>'+T.map(function(t){return '<td'+cls(t)+'>'
  +(t.base?'':wBtn(label,link,t.rec?null:'secondary',t.it||intent).replace('<a ','<a aria-label="'+e(label+': '+t.n)+'" '))+'</td>'}).join('')+'</tr>';
 var sw='<div class="'+K+'__switch" role="group" aria-label="Show one plan">'+T.map(function(t){return '<button type="button" class="'+K+'__tab" data-theme="light" data-tier="'+t.j+'" aria-pressed="'+(t.j===show?'true':'false')+'">'
  +'<span class="'+K+'__tabno" aria-hidden="true">'+(t.base?'—':t.no)+'</span><span>'+tx(t.n)+'</span></button>'}).join('')+'</div>';
 var table='<div class="'+K+'" data-show="'+show+'" style="--n:'+T.length+'">'+sw+'<table class="'+K+'__table">'+head+'<tbody>'+top+body+'</tbody><tbody class="'+K+'__foot">'+act+'</tbody></table></div>';
 return sec(H+wFold(b,rows.length,table,b.fold_noun||'terms'),'aq-band--navy '+K+'-sec')};
/* Sheet tabs (phones): show the pressed plan's sheet; arrow keys move between tabs */
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-plan-sheets__tab');if(!t)return;var w=t.closest('.aq-plan-sheets');
 w.setAttribute('data-show',t.getAttribute('data-tier'));w.querySelectorAll('.aq-plan-sheets__tab').forEach(function(x){x.setAttribute('aria-pressed',x===t?'true':'false')})});
document.addEventListener('keydown',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-plan-sheets__tab');if(!t||(ev.key!=='ArrowRight'&&ev.key!=='ArrowLeft'))return;
 var a=[].slice.call(t.parentNode.querySelectorAll('.aq-plan-sheets__tab')),n=a[(a.indexOf(t)+(ev.key==='ArrowRight'?1:a.length-1))%a.length];ev.preventDefault();n.focus();n.click()});
