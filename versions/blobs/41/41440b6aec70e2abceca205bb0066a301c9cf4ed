/* Look "manifold-router" -> ManifoldRouter (design-system/components/ManifoldRouter): a router table (as: "router")
   set as large type on a limestone sheet, every situation a branch off one manifold. The manifold is a twin-wall pipe
   down the left; each situation tees off it as a branch, its words set large. The reader picks a situation: the water
   runs down the manifold to that branch, the branch lights and its route opens on a sheet to the right (Send us, What
   comes back, then the link that starts it, set largest). One situation is open at a time, the first by default.
   Phones: the route opens under its situation, on the same manifold; each row ends in a 44 px chevron cue (PhoneKit's
   .aq-phone-kit__chev, turned up on the open row), hidden on wider screens.
   Fields, as the router: cols (first is the situation column, the rest name the route's steps), rows (first cell the
   situation, each other cell a string or {t, link, intent}). A route whose cells link somewhere (the last link wins) is
   clickable as a whole through a pointer-only overlay; the real link stays the keyboard target, its intent rides on
   both. A value that opens with a [placeholder] is pending: dashed rule and "To confirm" (as Router). Best for 3 to 8 rows.
   Look-only field panel: "compact" (pass 12 C, ind-process) sizes the route sheet to its content and caps the water
   line between its steps at 96 px, so a long list of situations leaves no tall empty line in the sheet.
   Ground: faint pipe tiles (FxTruchet, ambient WebGL, aria-hidden) drift behind the sheet, masked off the manifold. */
var mfN=0;
LOOKS['manifold-router']=function(b,H){var C=b.cols||[],R=b.rows||[],n=R.length,k=++mfN;
 function lnk(c){return c&&typeof c==='object'&&c.link&&wp(c.link)?c.link:''}
 function val(c){return c&&typeof c==='object'?c.t:c}
 var inner=R.map(function(r,i){var id='mf-'+k+'-'+i,s=val(r[0]),st=r.slice(1),go=-1;
  st.forEach(function(c,j){if(lnk(c))go=j});var to=go>=0?lnk(st[go]):'',ti=to&&st[go].intent;
  var open=i===0;
  return '<button type="button" class="aq-manifold-router__opt'+(open?' is-wet':'')+(i===0?' is-first':'')+(i===n-1?' is-last':'')+'" aria-expanded="'+(open?'true':'false')+'" aria-controls="'+id+'" style="--i:'+i+'">'
   +'<span class="aq-manifold-router__seg" aria-hidden="true"><span class="aq-manifold-router__water"></span></span>'
   +'<span class="aq-manifold-router__branch" aria-hidden="true"><span class="aq-manifold-router__water"></span></span>'
   +'<span class="aq-manifold-router__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><span class="aq-manifold-router__t">'+tx(s)+'</span><span class="aq-phone-kit__chev aq-manifold-router__chev" aria-hidden="true"></span></button>'
   +'<div class="aq-manifold-router__route'+(to?' is-link':'')+'" id="'+id+'" style="grid-row:1 / span '+n+'"'+(open?'':' hidden')+'>'
   +(to?'<a class="aq-manifold-router__hit" href="#'+e(to)+'" data-wp="'+e(to)+'"'+(ti?' data-intent="'+e(ti)+'"':'')+' tabindex="-1" aria-hidden="true"></a>':'')
   +'<p class="aq-manifold-router__sit" aria-hidden="true">'+tx(s)+'</p>'
   +'<ol class="aq-manifold-router__stations">'+st.map(function(c,j){var pend=j!==go&&/^\s*\[/.test(val(c)),cl=['aq-manifold-router__st'];if(j===go)cl.push('is-go');if(pend)cl.push('is-pending');
    return '<li class="'+cl.join(' ')+'"><p class="aq-manifold-router__k">'+tx(C[j+1]||'')+'</p><p class="aq-manifold-router__v">'+tcell(c)+(pend?' <span class="aq-manifold-router__tbc">To confirm</span>':'')+'</p></li>'}).join('')
   +'</ol></div>'}).join('');
 return '<section class="aq-section aq-band--limestone aq-manifold-router-sec aq-fx-host"><canvas class="aq-fx-shader" data-gl="truchet" aria-hidden="true"></canvas><div class="aq-in aq-stack-l">'+H+'<div class="aq-manifold-router'+(b.panel==='compact'?' aq-manifold-router--compact':'')+'" style="--n:'+n+'">'+inner+'</div></div></section>'};
/* One open at a time: the picked branch opens its route; the water fills the manifold down to it */
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-manifold-router__opt');if(!t)return;var w=t.closest('.aq-manifold-router'),O=[].slice.call(w.querySelectorAll('.aq-manifold-router__opt')),k=O.indexOf(t);
 O.forEach(function(o,i){var on=o===t;o.setAttribute('aria-expanded',on?'true':'false');o.classList.toggle('is-wet',i<=k);document.getElementById(o.getAttribute('aria-controls')).hidden=!on});
 /* compact (pass 12 C verify F4): the short route sheet moves beside the open third, so the open row's flow rule meets it */
 if(w.classList.contains('aq-manifold-router--compact')){w.classList.toggle('is-mid',k>=O.length/3&&k<2*O.length/3);w.classList.toggle('is-low',k>=2*O.length/3)}});
