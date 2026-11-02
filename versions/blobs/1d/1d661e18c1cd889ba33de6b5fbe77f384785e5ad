/* Look "review-reticles" -> ReviewReticles (design-system/components/ReviewReticles): what an assessment reviews, set
   as a drawing register on a limestone sheet (pass 9b concept svc-upgrades.3: numbered rows with mono area codes,
   large light row labels, a zone border and a title block). The sheet carries zone marks on its edges. Left: the
   register, one row per area (number, a short mono area code, the name set large, the one line of what is checked).
   Right: one inspection viewfinder (corner brackets, crosshair, "01 / 06") framing the pointed area's thing drawn in
   IsoKit line art, over a title block naming the sheet and the area. Pointing at a row (mouse), focusing it or
   clicking it slides the viewfinder's reel to that area's drawing (project-index); the first area is shown as
   rendered. Every row's text is always in the register; the viewfinder is a drawing (aria-hidden).
   Fields (a grid block, as: "route"): h, nav, items [{t, d, spot, part, code, link}]. part: an IsoKit part kind to
   draw; without it the spot picks one (binder, toc -> analyzer, ro-skid -> ro, storage-tank -> tank,
   heat-exchanger -> hx, cpu -> panel, pump, uv), else the spot's line icon. code (optional): a short mono area code,
   a drawing label (aria-hidden). A link makes the row's name a link (it still selects on focus).
   Phones: the register alone, each row with its own small square viewfinder beside the name and line. */
var RR_KIND={binder:'binder',toc:'analyzer','ro-skid':'ro','storage-tank':'tank','heat-exchanger':'hx',cpu:'panel',pump:'pump',uv:'uv',pretreatment:'softener','edi-stack':'edi'};
/* the solid each part occupies (its ports alone undersize some parts) */
var RR_BOX={binder:[[-32,-16,0],[24,26,36]],analyzer:[[-9,-6,0],[24,6,46]],ro:[[-4,-2,0],[116,30,68]],tank:[[-22,-22,0],[22,22,96]],hx:[[-6,-2,0],[56,26,50]],panel:[[-17,-8,0],[17,8,60]],pump:[[-18,-10,0],[40,10,36]],uv:[[0,-8,0],[60,8,36]],softener:[[-24,-14,0],[24,24,62]],edi:[[-6,-2,0],[46,24,44]]};
function rrDraw(it){var k=it.part||RR_KIND[it.spot];if(k&&ISO_PARTS[k]){var p=isoPart(k,0,0,0,1,{}),P=[];for(var q in p.ports)P.push(p.ports[q]);
  var B=RR_BOX[k];if(B){for(var a=0;a<8;a++)P.push([B[a&1][0],B[(a>>1)&1][1],B[(a>>2)&1][2]])}
  var bx=isoBounds(P,10),s=Math.max(bx.w,bx.h);return isoSvg(s,s,String(p),'aq-iso--limestone aq-review-reticles__iso',{origin:[-bx.x+(s-bx.w)/2,-bx.y+(s-bx.h)/2]})}
 var n=isSpot(it.spot)?SPOT_ICON[it.spot]:it.spot;return isIcon(n)?wIcon(n,'aq-review-reticles__ic'):''}
function rrNo(i){return (i<9?'0':'')+(i+1)}
/* a viewfinder: brackets, crosshair, index, and its content */
function rrVf(inner,no,cls){var K='aq-review-reticles';return '<span class="'+K+'__vf'+(cls?' '+cls:'')+'" aria-hidden="true"><span class="'+K+'__br '+K+'__br--tl"></span><span class="'+K+'__br '+K+'__br--tr"></span><span class="'+K+'__br '+K+'__br--bl"></span><span class="'+K+'__br '+K+'__br--br"></span>'
 +'<span class="'+K+'__cross"></span>'+(no?'<span class="'+K+'__no">'+no+'</span>':'')+inner+'<span class="'+K+'__scan"></span></span>'}
LOOKS['review-reticles']=function(b,H){var I=b.items||[],K='aq-review-reticles',N=rrNo(I.length-1),n=I.length||1;
 var pics=I.map(rrDraw);
 var rows=I.map(function(it,i){var name=it.link&&wp(it.link)?'<a class="'+K+'__pick" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>'
   :'<button type="button" class="'+K+'__pick" aria-pressed="'+(i?'false':'true')+'">'+tx(it.t)+'</button>';
  return '<li class="'+K+'__item'+(i?'':' is-on')+'" data-i="'+i+'">'+rrVf('<span class="'+K+'__pic">'+pics[i]+'</span>','',K+'__mini')
   +'<span class="'+K+'__no2" aria-hidden="true">'+rrNo(i)+'</span>'+(it.code?'<span class="'+K+'__code" aria-hidden="true">'+e(it.code)+'</span>':'')
   +'<h3 class="'+K+'__t">'+name+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 var reel='<span class="'+K+'__win"><span class="'+K+'__reel" style="--n:'+n+';--sel:0">'+pics.map(function(p){return '<span class="'+K+'__still"><span class="'+K+'__pic">'+p+'</span></span>'}).join('')+'</span></span>';
 var tb='<span class="'+K+'__tb" aria-hidden="true"><span>Aquemi</span><span>'+tx(b.nav||'')+'</span><span class="'+K+'__tbt">'+tx(I[0]?I[0].t:'')+'</span><span class="'+K+'__tbn">'+rrNo(0)+' / '+N+'</span></span>';
 var view='<div class="'+K+'__view" aria-hidden="true">'+rrVf(reel,'<span class="'+K+'__sel">'+rrNo(0)+'</span> / '+N,K+'__big')+tb+'</div>';
 var zone=function(c,k){var s='';for(var j=1;j<=c;j++)s+='<span>'+(k?String.fromCharCode(64+j):j)+'</span>';return s};
 var zones='<span class="'+K+'__z '+K+'__z--t" aria-hidden="true">'+zone(6)+'</span><span class="'+K+'__z '+K+'__z--b" aria-hidden="true">'+zone(6)+'</span><span class="'+K+'__z '+K+'__z--l" aria-hidden="true">'+zone(3,1)+'</span><span class="'+K+'__z '+K+'__z--r" aria-hidden="true">'+zone(3,1)+'</span>';
 var names=I.map(function(it){return String(it.t||'')});
 return sec(H+'<div class="'+K+'" data-names="'+e(JSON.stringify(names))+'">'+zones+'<div class="'+K+'__sheet"><ol class="'+K+'__reg" role="list">'+rows+'</ol>'+view+'</div></div>','aq-band--limestone '+K+'-sec" data-theme="light')};
/* selection (works without the motion layer and under reduced motion; keyboard moves are instant, as project-index) */
(function(){var K='aq-review-reticles',kb=false;
 document.addEventListener('keydown',function(){kb=true},true);document.addEventListener('pointerdown',function(){kb=false},true);
 function sel(it,still){var r=it.closest('.'+K);if(!r)return;var i=+it.getAttribute('data-i'),reel=r.querySelector('.'+K+'__reel');
  r.toggleAttribute('data-still',!!still);
  [].forEach.call(r.querySelectorAll('.'+K+'__item'),function(x){var on=x===it;x.classList.toggle('is-on',on);var bt=x.querySelector('button.'+K+'__pick');if(bt)bt.setAttribute('aria-pressed',on?'true':'false')});
  if(reel)reel.style.setProperty('--sel',i);
  var nm=[];try{nm=JSON.parse(r.getAttribute('data-names')||'[]')}catch(x){}
  var no=(i<9?'0':'')+(i+1),s=r.querySelector('.'+K+'__sel'),tn=r.querySelector('.'+K+'__tbn'),tt=r.querySelector('.'+K+'__tbt');
  if(s)s.textContent=no;if(tn)tn.textContent=no+tn.textContent.slice(tn.textContent.indexOf(' /'));if(tt&&nm[i]!=null)tt.textContent=nm[i]}
 function item(ev){return ev.target.closest&&ev.target.closest('.'+K+'__item')}
 document.addEventListener('pointerover',function(ev){if(ev.pointerType!=='mouse')return;var it=item(ev);if(it&&!it.classList.contains('is-on'))sel(it)});
 document.addEventListener('focusin',function(ev){var it=item(ev);if(it)sel(it,kb)});
 document.addEventListener('click',function(ev){var it=item(ev);if(it)sel(it)})})();
