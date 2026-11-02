/* Look "cert-readout" -> CertReadout (design-system/components/CertReadout): certification status read like an
   instrument. At the left a navy readout box framed by rulers (ticks along the top and foot, a vertical scale at the
   right edge with a marker at the selected line), the selected item's status line (its d) set as the giant reading,
   its title under it and its standard or mark (its tag) as the small line, its number at the top right; a
   certificate rosette turns faintly behind (FxGuilloche) only once every status line is confirmed (no [placeholder]).
   DR-018 / DR-004 rule 3: the reading is the status, never the standard's name, so a standard is not set large as if
   held while its status is open. At the right the items as mono readout lines, two by two: number and title, the tag, the status, and
   the page that holds the detail. Pointing at or focusing a line (its title is a button, aria-pressed) puts it on the
   readout; the readout is an aria-hidden mirror, so every word is in the lines. Long readings (placeholders) set smaller.
   Fields (a grid block): h, intro, items [{t, d, tag, icon, link}]. Phones: the readout over the lines, one a row. */
LOOKS['cert-readout']=function(b,H){var I=b.items||[],n=I.length;
 var nn=function(i){return (i<9?'0':'')+(i+1)},long=function(t){return String(t||'').length>14},
  open=!I.length||I.some(function(it){return String(it.d||'').indexOf('[')>=0||!it.d});
 var ticks=function(len,step,big,o){var d='';for(var k=0;k<=len;k+=step){var L=k%big?3:7;d+=o==='v'?'M0 '+k+'H'+L:'M'+k+' 0V'+L}return d};
 var ruler='<svg class="aq-cert-readout__rule is-top" viewBox="0 0 200 8" preserveAspectRatio="none" focusable="false"><path d="'+ticks(200,2,10)+'"/></svg>'
  +'<svg class="aq-cert-readout__rule is-foot" viewBox="0 0 200 8" preserveAspectRatio="none" focusable="false"><path d="'+ticks(200,2,10)+'"/></svg>'
  +'<svg class="aq-cert-readout__rule is-side" viewBox="0 0 8 200" preserveAspectRatio="none" focusable="false"><path d="'+ticks(200,2,10,'v')+'"/></svg>';
 var it0=I[0]||{};
 var box='<div class="aq-cert-readout__box aq-fx-host" aria-hidden="true" style="--p:0;--n:'+Math.max(1,n-1)+'">'+(open?'':'<canvas class="aq-fx-shader" data-gl="guilloche" aria-hidden="true"></canvas>')+ruler
  +'<span class="aq-cert-readout__no">'+nn(0)+'</span><span class="aq-cert-readout__mark"><span>'+nn(0)+' / '+nn(n-1)+'</span></span>'
  +'<div class="aq-cert-readout__face"><p class="aq-cert-readout__big'+(long(it0.d)?' is-long':'')+'">'+tx(it0.d||'')+'</p>'
  +'<p class="aq-cert-readout__ft">'+tx(it0.t||'')+'</p><p class="aq-cert-readout__fd">'+tx(it0.tag||'')+'</p></div></div>';
 var lines=I.map(function(it,i){var lk=it.link&&wp(it.link);
  return '<li class="aq-cert-readout__line'+(i?'':' is-on')+'" data-i="'+i+'">'
   +'<h3 class="aq-cert-readout__k"><button type="button" class="aq-cert-readout__pick" aria-pressed="'+(i?'false':'true')+'"><span class="aq-cert-readout__n">'+nn(i)+' /</span> <span class="aq-cert-readout__t">'+tx(it.t)+'</span></button></h3>'
   +(it.tag?'<p class="aq-cert-readout__tag'+(long(it.tag)?' is-long':'')+'">'+tx(it.tag)+'</p>':'')
   +(it.d?'<p class="aq-cert-readout__d">'+tx(it.d)+'</p>':'')
   +(lk?'<p class="aq-cert-readout__go">'+wlink(it.link)+'</p>':'')+'</li>'}).join('');
 return sec(H+'<div class="aq-cert-readout">'+box+'<ol class="aq-cert-readout__lines" role="list">'+lines+'</ol></div>','aq-cert-readout-sec')};
/* selection: puts a line on the readout (quote-tick: the new reading enters from the side of travel, CSS) */
window.AQcertReadout={select:function(el,i){var L=el.querySelectorAll('.aq-cert-readout__line'),li=L[i],box=el.querySelector('.aq-cert-readout__box');if(!li||!box)return;
 var was=+(box.getAttribute('data-sel')||0);if(was===i)return;box.setAttribute('data-sel',i);
 [].forEach.call(L,function(x,j){x.classList.toggle('is-on',j===i);var p=x.querySelector('.aq-cert-readout__pick');if(p)p.setAttribute('aria-pressed',j===i?'true':'false')});
 var q=function(s){return li.querySelector(s)},f=box.querySelector('.aq-cert-readout__face'),tg=q('.aq-cert-readout__tag'),dd=q('.aq-cert-readout__d'),nn=(i<9?'0':'')+(i+1);
 f.innerHTML='<p class="aq-cert-readout__big'+(dd&&dd.textContent.length>14?' is-long':'')+'">'+(dd?dd.innerHTML:'')+'</p><p class="aq-cert-readout__ft">'+q('.aq-cert-readout__t').innerHTML+'</p><p class="aq-cert-readout__fd">'+(tg?tg.innerHTML:'')+'</p>';
 box.querySelector('.aq-cert-readout__no').textContent=nn;var mk=box.querySelector('.aq-cert-readout__mark span');mk.textContent=nn+mk.textContent.slice(2);
 box.style.setProperty('--p',i);f.classList.remove('is-up','is-down');void f.offsetWidth;f.classList.add(i>was?'is-up':'is-down')}};
if(typeof document!=='undefined'&&document.addEventListener)['mouseover','focusin','click'].forEach(function(t){document.addEventListener(t,function(ev){var li=ev.target.closest&&ev.target.closest('.aq-cert-readout__line');if(!li)return;
 var el=li.closest('.aq-cert-readout');el.setAttribute('data-touched','');window.AQcertReadout.select(el,+li.getAttribute('data-i'))})});
