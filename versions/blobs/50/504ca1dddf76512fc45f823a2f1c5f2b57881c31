/* Look "multiport-router" -> MultiportRouter (design-system/components/MultiportRouter): a router table drawn as a
   multiport valve in plan, after pass 12 concept 196 (ind-personal-care.start). The valve sits in the middle with one
   numbered port per situation, ports alternating left and right; each port is piped (a twin-wall pipe) to its route
   card, so the cards stand in two columns round the valve. A card carries the number, the situation as its title, and
   the other columns under their own labels (what you need, the start-with link). Choosing a card turns the valve's
   lever to its port, fills that pipe with water and lights the card steel blue (flow); every card stays readable.
   Default: the first route. Phones (PhoneKit chips, one column): a small valve on a riser heads the block, the
   situations hang off the riser as 48 px chips, the chosen chip's card opens under them; the lever follows the chip.
   Without script every card shows, titled, under the valve.
   Fields (a table block, as: "router"): h, intro, cols [situation, need, ...the rest], rows [[situation, need, ...]];
   cells may be {t, link, intent} as in every table. No new fields. */
(function(){
var K='aq-multiport-router',N=0;
function f1(n){return Math.round(n*10)/10}
function nn(i){return (i<9?'0':'')+(i+1)}
/* port i: even on the left, odd on the right; rows spread over the body's height */
function port(i,n){var m=Math.ceil(n/2),k=Math.floor(i/2),s=i%2?1:-1,y=m>1?-46+92*k/(m-1):0;return {s:s,y:y,x:s*f1(Math.sqrt(100*100-y*y))}}
function ang(i,n){var p=port(i,n);return f1(Math.atan2(p.y,p.s*100)*180/Math.PI)}
function valve(n){var o='',i;
 /* bonnet and foot: the valve stands on its supply riser */
 o+='<path class="'+K+'__foot" d="M-26 96V134H26V96"/><path class="'+K+'__flange" d="M-40 134H40V146H-40Z"/>'
  +'<path class="'+K+'__bonnet" d="M-30 -96V-124H30V-96"/><path class="'+K+'__flange" d="M-40 -136H40V-124H-40Z"/>';
 for(i=0;i<n;i++){var p=port(i,n),x0=p.x-p.s*6,x1=p.s*150,on=i?'':' is-on';
  o+='<path class="'+K+'__boss" d="M'+x0+' '+f1(p.y-13)+'H'+x1+'V'+f1(p.y+13)+'H'+x0+'Z"/>'
   +'<path class="'+K+'__flange" d="M'+f1(x1-p.s*10)+' '+f1(p.y-19)+'H'+x1+'V'+f1(p.y+19)+'H'+f1(x1-p.s*10)+'Z"/>'
   +'<text class="'+K+'__pn'+on+'" data-i="'+i+'" x="'+f1((p.x+x1)/2-p.s*4)+'" y="'+f1(p.y<0?p.y-22:p.y+34)+'">'+nn(i)+'</text>'}
 o+='<circle class="'+K+'__body" cx="0" cy="0" r="100"/><circle class="'+K+'__ring" cx="0" cy="0" r="80"/>';
 for(i=0;i<n;i++){var a=ang(i,n)*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
  o+='<path class="'+K+'__mark'+(i?'':' is-on')+'" data-i="'+i+'" d="M'+f1(66*c)+' '+f1(66*s)+'L'+f1(80*c)+' '+f1(80*s)+'"/>'}
 o+='<circle class="'+K+'__ring '+K+'__ring--in" cx="0" cy="0" r="40"/>'
  +'<g class="'+K+'__lever" style="--a:'+ang(0,n)+'deg"><path class="'+K+'__arm" d="M-10 -8H76Q90 -8 90 0Q90 8 76 8H-10Q-22 8 -22 0Q-22 -8 -10 -8Z"/>'
  +'<path class="'+K+'__grip" d="M58 -8V8M66 -8V8M74 -8V8"/><circle class="'+K+'__hub" cx="0" cy="0" r="18"/><circle class="'+K+'__nut" cx="0" cy="0" r="6"/></g>';
 return '<svg class="'+K+'__valve" viewBox="-160 -160 320 320" aria-hidden="true" focusable="false">'+o+'</svg>'}
LOOKS['multiport-router']=function(b,H){
 var C=b.cols||[],R=b.rows||[],n=R.length,k=++N,m=Math.ceil(n/2);
 var items=R.map(function(r,i){var on=i===0,p=port(i,n);
  var rest=r.slice(1).map(function(c,j){var go=c&&typeof c==='object'&&c.link;return '<div class="'+K+'__kv'+(go?' is-go':'')+'"><dt>'+tx(C[j+1]||'')+'</dt><dd>'+tcell(c)+'</dd></div>'}).join('');
  return '<li class="'+K+'__route'+(on?' is-on':'')+'" data-pk-item="'+i+'" data-i="'+i+'" style="--c:'+(p.s<0?1:3)+';--r:'+(Math.floor(i/2)+1)+'">'
   +'<button type="button" class="'+K+'__chip" data-pk-head><span class="'+K+'__chipn" aria-hidden="true">'+nn(i)+'</span><span class="'+K+'__chipt">'+tcell(r[0])+'</span></button>'
   +'<article class="'+K+'__card'+(on?' is-on':'')+'" data-pk-body data-i="'+i+'">'
    +'<p class="'+K+'__no" aria-hidden="true">'+nn(i)+' /</p>'
    +'<h3 class="'+K+'__sit" data-pk-desk><button type="button" class="'+K+'__pick" data-i="'+i+'" aria-pressed="'+(on?'true':'false')+'">'+tcell(r[0])+'</button></h3>'
    +(rest?'<dl class="'+K+'__dl">'+rest+'</dl>':'')+'</article></li>'}).join('');
 return sec(H+'<div class="'+K+'" id="'+K+'-'+k+'" style="--n:'+n+';--m:'+m+'">'
  +'<div class="'+K+'__plant" aria-hidden="true">'+valve(n)+'</div><svg class="'+K+'__pipes" aria-hidden="true" focusable="false"></svg>'
  +'<ol class="'+K+'__routes" data-pk-picker="chips" data-pk-open="0">'+items+'</ol></div>',K+'-sec')};
/* choose a route: the lever turns to its port, its pipe fills, its card lights; every card stays readable */
function pick(w,i){if(!w)return;var n=w.querySelectorAll('.'+K+'__route').length;
 [].forEach.call(w.querySelectorAll('[data-i]'),function(x){var on=+x.getAttribute('data-i')===i;x.classList.toggle('is-on',on);if(x.tagName==='BUTTON')x.setAttribute('aria-pressed',on?'true':'false')});
 var lv=w.querySelector('.'+K+'__lever');if(lv)lv.style.setProperty('--a',ang(i,n)+'deg')}
/* the pipes: from each port's flange, out level, one rounded jog, level again into the card's inner edge at its
   title line; drawn in the block's own pixels, redrawn on resize */
function layout(w){var sv=w.querySelector('.'+K+'__pipes'),vs=w.querySelector('.'+K+'__valve');if(!sv||!vs||!sv.getClientRects().length)return;
 var wb=w.getBoundingClientRect(),vr=vs.getBoundingClientRect();if(!vr.width)return;
 var s=vr.width/320,cx=vr.left-wb.left+vr.width/2,cy=vr.top-wb.top+vr.height/2,R=w.querySelectorAll('.'+K+'__card'),n=R.length,o='',i;
 for(i=0;i<n;i++){var c=R[i],cr=c.getBoundingClientRect();if(!cr.width)continue;var p=port(i,n),ax=cx+p.s*150*s,ay=cy+p.y*s;
  var bx=p.s<0?cr.right-wb.left:cr.left-wb.left,by=cr.top-wb.top+Math.min(cr.height/2,56),mx=(ax+bx)/2,dy=by-ay,r=Math.min(14,Math.abs(dy)/2,Math.abs(bx-ax)/4),sg=dy<0?-1:1,sx=p.s<0?-1:1,d;
  if(Math.abs(dy)<1)d='M'+f1(ax)+' '+f1(ay)+'H'+f1(bx);
  else d='M'+f1(ax)+' '+f1(ay)+'H'+f1(mx-sx*r)+'Q'+f1(mx)+' '+f1(ay)+' '+f1(mx)+' '+f1(ay+sg*r)+'V'+f1(by-sg*r)+'Q'+f1(mx)+' '+f1(by)+' '+f1(mx+sx*r)+' '+f1(by)+'H'+f1(bx);
  var on=c.classList.contains('is-on')?' is-on':'';
  o+='<g class="'+K+'__pipe'+on+'" data-i="'+i+'"><path class="'+K+'__wall" d="'+d+'"/><path class="'+K+'__bore" d="'+d+'"/><path class="'+K+'__water" d="'+d+'"/></g>'}
 sv.setAttribute('viewBox','0 0 '+f1(wb.width)+' '+f1(wb.height));sv.innerHTML=o}
function scan(){[].forEach.call(document.querySelectorAll('.'+K),function(w){if(!w._mpRO&&typeof ResizeObserver!=='undefined'){w._mpRO=new ResizeObserver(function(){layout(w)});w._mpRO.observe(w)}layout(w)})}
var queued=0;function soon(){if(queued)return;queued=1;requestAnimationFrame(function(){queued=0;scan()})}
if(typeof window!=='undefined')window.AQmultiport={layout:layout,scan:scan,pick:pick};
if(typeof document!=='undefined'){
 if(typeof MutationObserver!=='undefined')new MutationObserver(function(){var x=document.querySelectorAll('.'+K+':not([data-mp])');if(x.length){[].forEach.call(x,function(w){w.setAttribute('data-mp','')});soon()}}).observe(document.documentElement,{childList:true,subtree:true});
 if(document.readyState!=='loading')soon();else document.addEventListener('DOMContentLoaded',soon);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(soon);
 /* desktop: a click anywhere on a card (not its link) chooses it */
 document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.'+K+'__card');if(!t||ev.target.closest('a'))return;var w=t.closest('.'+K);if(w.querySelector('[data-pk-on]'))return;pick(w,+t.getAttribute('data-i'))});
 /* phones: the chip PhoneKit opened is the chosen route */
 document.addEventListener('pk:change',function(ev){var r=ev.target,w=r&&r.closest&&r.closest('.'+K);if(!w)return;var d=ev.detail||{};if(d.on&&d.index>=0)pick(w,d.index)});
 document.addEventListener('mouseover',function(ev){var t=ev.target.closest&&ev.target.closest('.'+K+'__card');if(!t)return;var w=t.closest('.'+K),i=t.getAttribute('data-i');[].forEach.call(w.querySelectorAll('.'+K+'__pipe'),function(p){p.classList.toggle('is-hint',p.getAttribute('data-i')===i)})});
 document.addEventListener('mouseout',function(ev){var t=ev.target.closest&&ev.target.closest('.'+K+'__card');if(!t)return;[].forEach.call(t.closest('.'+K).querySelectorAll('.'+K+'__pipe.is-hint'),function(p){p.classList.remove('is-hint')})})}
})();
