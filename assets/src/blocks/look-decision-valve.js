/* Look "decision-valve" -> DecisionValve (design-system/components/DecisionValve): a router table drawn as a multiport
   valve, a navy object on the paper (pass 9b concept sys-pretreatment.3 is a light sheet). Each situation is a supply line on the left; the valve sits in the middle with one numbered
   position per route on its plate; each route leaves the valve on its own line to a card on the right (the step, then
   the other columns under their own labels). Choosing a supply turns the valve's lever to that position and lights the
   line in and the line out; every card stays readable. Default: the first route. Phones (pass 12, PhoneKit sticky
   figure): the valve rides as a 120 px strip under the header (the dial with its lever and the position in words) and
   each supply sits directly over its card on a short pipe; the pair on the reading line turns the lever to its
   position and lights its card (state, so it holds with reduced motion; a tap on a supply still chooses it).
   Fields (a table block, as: "router"): h, cols [situation, step, ...the rest], rows [[situation, step, ...]]; cells
   may be {t, link, intent} as in every table. No new fields. */
(function(){
var K='aq-decision-valve',N=0;
function f1(n){return Math.round(n*10)/10}
function ang(i,n){return n>1?-60+120*i/(n-1):0}
function dial(n){var o='<circle class="'+K+'__body" cx="0" cy="0" r="118"/><circle class="'+K+'__plate" cx="0" cy="0" r="96"/>',i;
 /* inlet and outlet bosses on the body */
 o+='<path class="'+K+'__boss" d="M-130 -16H-112V16H-130Z"/>';
 for(i=0;i<n;i++){var a=ang(i,n)*Math.PI/180,c=Math.cos(a),s=Math.sin(a),p=function(r,t){return f1(r*c-t*s)+' '+f1(r*s+t*c)};
  o+='<path class="'+K+'__boss" d="M'+p(112,-11)+'L'+p(130,-11)+'L'+p(130,11)+'L'+p(112,11)+'Z"/>'
   +'<path class="'+K+'__pos'+(i?'':' is-on')+'" data-i="'+i+'" d="M'+p(74,0)+'L'+p(92,0)+'"/>'
   +'<text class="'+K+'__posn'+(i?'':' is-on')+'" data-i="'+i+'" x="'+f1(60*c)+'" y="'+f1(60*s+4)+'">'+(i<9?'0':'')+(i+1)+'</text>'}
 for(i=0;i<36;i++){var b=i*10*Math.PI/180;o+='<path class="'+K+'__tick" d="M'+f1(96*Math.cos(b))+' '+f1(96*Math.sin(b))+'L'+f1(102*Math.cos(b))+' '+f1(102*Math.sin(b))+'"/>'}
 /* the lever: hub, arm and grip, turned to the chosen position */
 o+='<g class="'+K+'__lever" style="--a:'+ang(0,n)+'deg"><path class="'+K+'__arm" d="M-14 -9H150Q160 -9 160 0Q160 9 150 9H-14Q-24 9 -24 0Q-24 -9 -14 -9Z"/>'
  +'<circle class="'+K+'__hub" cx="0" cy="0" r="22"/><circle class="'+K+'__nut" cx="0" cy="0" r="7"/><path class="'+K+'__grip" d="M120 -9V9M130 -9V9M140 -9V9"/></g>';
 return '<svg class="'+K+'__dial" viewBox="-170 -170 340 340" aria-hidden="true" focusable="false">'+o+'</svg>'}
function lines(n){var i,o='',y=function(i){return f1(400*(i+0.5)/n)},on=function(i){return i?'':' is-on'};
 for(i=0;i<n;i++)o+='<path class="'+K+'__in'+on(i)+'" data-i="'+i+'" d="M0 '+y(i)+'C50 '+y(i)+' 40 200 100 200"/>';
 for(i=0;i<n;i++)o+='<path class="'+K+'__out'+on(i)+'" data-i="'+i+'" d="M100 200C160 200 150 '+y(i)+' 200 '+y(i)+'"/>';
 return '<svg class="'+K+'__lines" viewBox="0 0 200 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">'+o+'</svg>'}
LOOKS['decision-valve']=function(b,H){
 var C=b.cols||[],R=b.rows||[],n=R.length,k=++N;
 var rows=R.map(function(r,i){var id=K+'-'+k+'-'+i,on=i===0;
  var rest=r.slice(2).map(function(c,j){return '<div class="'+K+'__kv"><dt>'+tx(C[j+2]||'')+'</dt><dd>'+tcell(c)+'</dd></div>'}).join('');
  return '<button type="button" class="'+K+'__src'+(on?' is-on':'')+'" data-i="'+i+'" data-pk-row="'+i+'" aria-pressed="'+(on?'true':'false')+'" aria-controls="'+id+'" style="--r:'+(i+2)+'">'
    +'<span class="'+K+'__no" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><span class="'+K+'__srct">'+tcell(r[0])+'</span></button>'
   +'<article class="'+K+'__card'+(on?' is-on':'')+'" id="'+id+'" data-i="'+i+'" data-pk-row="'+i+'" style="--r:'+(i+2)+'">'
    +'<p class="'+K+'__cardno" aria-hidden="true">Position '+(i<9?'0':'')+(i+1)+'</p><h3 class="'+K+'__step">'+tcell(r[1])+'</h3>'
    +(rest?'<dl class="'+K+'__dl">'+rest+'</dl>':'')+'</article>'}).join('');
 var heads='<p class="'+K+'__colh '+K+'__colh--src">'+tx(C[0]||'')+'</p><p class="'+K+'__colh '+K+'__colh--card">'+tx(C[1]||'')+'</p>';
 var mid='<div class="'+K+'__valve" data-pk-fig>'+lines(n)+dial(n)+'<p class="'+K+'__now" aria-hidden="true"><span class="'+K+'__nowk">Position</span> <span class="'+K+'__nown">01</span><span class="'+K+'__nowof"> / '+(n<10?'0':'')+n+'</span></p></div>';
 return sec(H+'<div class="'+K+'" data-pk-sticky data-pk-h="120" style="--n:'+n+'">'+heads+mid+rows+'</div>',K+'-sec')};
/* choose a route: the lever turns, the line in and the line out light, the card lights; all cards stay visible */
function pick(w,i){if(!w)return;var n=+getComputedStyle(w).getPropertyValue('--n')||w.querySelectorAll('.'+K+'__src').length;
 [].forEach.call(w.querySelectorAll('[data-i]'),function(x){var on=+x.getAttribute('data-i')===i;x.classList.toggle('is-on',on);if(x.tagName==='BUTTON')x.setAttribute('aria-pressed',on?'true':'false')});
 var lv=w.querySelector('.'+K+'__lever');if(lv)lv.style.setProperty('--a',ang(i,n)+'deg')}
/* phone: the pair on the reading line (PhoneKit) turns the valve to its position; switching off restores the first */
function now(w,i){var x=w.querySelector('.'+K+'__nown');if(x)x.textContent=(i<9?'0':'')+(i+1)}
if(typeof document!=='undefined')document.addEventListener('pk:change',function(ev){var w=ev.target;if(!w.classList||!w.classList.contains(K))return;
 var i=ev.detail&&ev.detail.on&&ev.detail.index>=0?+ev.detail.key:0;if(isNaN(i))i=0;pick(w,i);now(w,i)});
/* fit the lines to the drawn valve: each supply line runs from its button's centre into the inlet boss, each route
   line leaves its own outlet boss (radially, at that position's angle) and lands on its card's centre. The static
   paths above (a 200 x 400 box) are the no-JS fallback; this redraws them in the valve column's real pixels. */
function layout(w){var v=w.querySelector('.'+K+'__valve'),sv=v&&v.querySelector('.'+K+'__lines'),dl=v&&v.querySelector('.'+K+'__dial');
 if(!sv||!dl||!sv.getClientRects().length)return;var vb=v.getBoundingClientRect(),dr=dl.getBoundingClientRect(),W=vb.width,Ht=vb.height;if(!W||!Ht||!dr.width)return;
 var s=dr.width/340,cx=dr.left-vb.left+dr.width/2,cy=dr.top-vb.top+dr.height/2,n=w.querySelectorAll('.'+K+'__src').length,R=128*s;
 var mid=function(el){var r=el.getBoundingClientRect();return r.top-vb.top+r.height/2};
 var ix=cx-128*s,i;
 for(i=0;i<n;i++){var src=w.querySelector('.'+K+'__src[data-i="'+i+'"]'),card=w.querySelector('.'+K+'__card[data-i="'+i+'"]'),pi=sv.querySelector('.'+K+'__in[data-i="'+i+'"]'),po=sv.querySelector('.'+K+'__out[data-i="'+i+'"]');
  if(src&&pi){var ys=mid(src),k=Math.max(ix*0.55,8);pi.setAttribute('d','M0 '+f1(ys)+'C'+f1(k)+' '+f1(ys)+' '+f1(ix-k)+' '+f1(cy)+' '+f1(ix)+' '+f1(cy))}
  if(card&&po){var a=ang(i,n)*Math.PI/180,ox=cx+R*Math.cos(a),oy=cy+R*Math.sin(a),yc=mid(card),L=Math.max((W-ox)*0.5,8);
   po.setAttribute('d','M'+f1(ox)+' '+f1(oy)+'C'+f1(ox+L*Math.cos(a))+' '+f1(oy+L*Math.sin(a))+' '+f1(W-L*0.6)+' '+f1(yc)+' '+f1(W)+' '+f1(yc))}}
 sv.setAttribute('viewBox','0 0 '+f1(W)+' '+f1(Ht))}
function scan(){[].forEach.call(document.querySelectorAll('.'+K),function(w){if(!w._dvRO&&typeof ResizeObserver!=='undefined'){w._dvRO=new ResizeObserver(function(){layout(w)});w._dvRO.observe(w)}layout(w)})}
var queued=0;function soon(){if(queued)return;queued=1;requestAnimationFrame(function(){queued=0;scan()})}
if(typeof window!=='undefined')window.AQdecisionValve={layout:layout,scan:scan};
if(typeof document!=='undefined'){
 if(typeof MutationObserver!=='undefined')new MutationObserver(function(){if(document.querySelector('.'+K+':not([data-dv])')){[].forEach.call(document.querySelectorAll('.'+K+':not([data-dv])'),function(w){w.setAttribute('data-dv','')});soon()}}).observe(document.documentElement,{childList:true,subtree:true});
 if(document.readyState!=='loading')soon();else document.addEventListener('DOMContentLoaded',soon);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon);
 document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.'+K+'__src, .'+K+'__card');if(!t||(ev.target.closest('a')))return;var w=t.closest('.'+K);pick(w,+t.getAttribute('data-i'));now(w,+t.getAttribute('data-i'))});
 document.addEventListener('mouseover',function(ev){var t=ev.target.closest&&ev.target.closest('.'+K+'__src');if(!t)return;var w=t.closest('.'+K);[].forEach.call(w.querySelectorAll('.'+K+'__in, .'+K+'__out'),function(p){p.classList.toggle('is-hint',p.getAttribute('data-i')===t.getAttribute('data-i'))})});
 document.addEventListener('mouseout',function(ev){var t=ev.target.closest&&ev.target.closest('.'+K+'__src');if(!t)return;[].forEach.call(t.closest('.'+K).querySelectorAll('.is-hint'),function(p){p.classList.remove('is-hint')})})}
})();
