/* Block "contact-routes" -> ContactRoutes (pass 9): the ways into Aquemi as route sheets dealt onto a navy band, after
   inspiration/gemini/62-concept-contact-routes.png. One route line runs under the heading and drops into each sheet's
   folder tab ("Route N", plus "Urgent" / "This page"); every sheet shows what happens after you act as a visible
   sequence: its steps on a water rail, numbered, the rail running on down to the response clock (the terminus), then
   the action.
   Ordinary routes are limestone sheets; the urgent route is the dark sheet with the call bar (the number large in mono,
   a tel: link once it is real). Sheets share one subgrid (tab, head, call, steps, clock, action), so rails, clocks and actions line up.
   Fields: routes [{t, d, steps: [3 strings], clock, link: "<page id>", phone?, urgent?, current?, action?, intent?}].
   The route for the page being read (current: true, or link = this page) is marked "This page" and its action scrolls
   to this page's form; the others link to their pages (action label defaults to that page's nav label; intent ticks
   options on its form). The urgent route comes first in the markup, so phones show it first; desktop keeps the data
   order (--o). Every clock stays the page's own placeholder until confirmed.
   Phones (pass 12, visual audit S11): the urgent route stays first and whole, its number a full-width call button; the
   other routes are compact (title, response line, action) with their steps behind a "How it works" toggle
   (button.__how, aria-expanded, works with motion off; desktop never shows the toggle and always shows the steps); the
   route for this page is one line, its title as an anchor to this page's form (a.__jump, phone only). The tab's number
   is the data order on desktop (__rn-d) and the phone's own order on phones (__rn-p: urgent first), so phones read
   Route 1, 2, 3 down the stack; CSS shows one of the two. */
var CR_CLOCK=wIcon('clock','aq-contact-routes__icon');
var CR_PHONE=wIcon('phone','aq-contact-routes__icon');
/* The call line's number: wtel in core.js, the one phone rule (a tel: link once confirmed, the placeholder until then) */
function crPhone(s){return wtel(s,'aq-contact-routes__num')}
BLOCKS['contact-routes']=function(b,H){var R=b.routes||[];
 var p=W().filter(function(q){return (q.blocks||[]).indexOf(b)>=0})[0]||wp(WP)||{},PB=p.blocks||[],fi=-1;
 PB.forEach(function(x,i){if(fi<0&&x.type==='form')fi=i});
 var fid=fi>=0&&PB[fi].nav?jid(PB[fi],fi):'';
 var order=R.map(function(r,i){return i}).sort(function(a,c){return (R[c].urgent?1:0)-(R[a].urgent?1:0)||a-c});
 var cards=order.map(function(i,k){var r=R[i],cur=!!(r.current||(r.link&&r.link===p.id)),urg=!!r.urgent,S=r.steps||[];
  var to='href="#'+e(p.id||WP)+'" '+(fid?'data-jump="'+e(fid)+'"':'data-routes-form=""'),sid='crs-'+e(p.id||WP)+'-'+i;
  var go=cur?'<a class="aq-btn aq-btn--primary" '+to+'>'+tx(r.action||'Use the form below')+' <span class="aq-btn__arrow" aria-hidden="true">↓</span></a>'
   :r.link&&wp(r.link)?wBtn(r.action||wp(r.link).nav_label||r.link,r.link,'secondary',r.intent):'';
  return '<li class="aq-contact-routes__route'+(urg?' is-urgent':'')+(cur?' is-current':'')+'" style="--o:'+i+'" data-theme="'+(urg?'dark':'light')+'"'+(cur?' aria-current="page"':'')+'>'
   +'<p class="aq-contact-routes__tab"><span class="aq-contact-routes__rn">Route <span class="aq-contact-routes__rn-d">'+(i+1)+'</span><span class="aq-contact-routes__rn-p">'+(k+1)+'</span></span>'
    +(urg?'<span class="aq-contact-routes__mark">Urgent</span>':'')
    +(cur?'<span class="aq-contact-routes__mark">This page</span>':'')+'</p>'
   +'<div class="aq-contact-routes__body"><div class="aq-contact-routes__main"><h3 class="aq-contact-routes__t">'+tx(r.t)+'</h3>'
    +(r.d?'<p class="aq-contact-routes__d">'+tx(r.d)+'</p>':'')+'</div>'
   +(r.phone?'<p class="aq-contact-routes__call">'+CR_PHONE+'<span class="aq-contact-routes__k">Call</span>'+crPhone(r.phone)+'</p>':'')
   +(S.length?'<button type="button" class="aq-contact-routes__how" aria-expanded="false" aria-controls="'+sid+'">How it works<span class="aq-contact-routes__chev" aria-hidden="true"></span></button>':'')
   +(S.length?'<ol class="aq-contact-routes__steps" id="'+sid+'">'+S.map(function(s,k){return '<li><span class="aq-contact-routes__node" aria-hidden="true"></span><span class="aq-contact-routes__n" aria-hidden="true">'+(k<9?'0':'')+(k+1)+'</span><span class="aq-contact-routes__s">'+tx(s)+'</span></li>'}).join('')+'</ol>':'')+'</div>'
   +(r.clock?'<p class="aq-contact-routes__clock"><span class="aq-contact-routes__end" aria-hidden="true">'+CR_CLOCK+'</span><span class="aq-contact-routes__k">Response</span><span class="aq-contact-routes__v">'+tx(r.clock)+'</span></p>':'<span class="aq-contact-routes__clock is-empty" aria-hidden="true"></span>')
   +'<div class="aq-contact-routes__action">'+go+'</div>'
   +(cur&&!urg?'<a class="aq-contact-routes__jump" '+to+'><span>'+tx(r.t)+'</span><span class="aq-contact-routes__jump-arrow" aria-hidden="true">↓</span></a>':'')
   +'</li>'}).join('');
 return sec(H+'<ul class="aq-contact-routes" style="--routes:'+R.length+'">'+cards+'</ul>','aq-band--navy aq-contact-routes-sec');};
/* Fallback for a page whose form has no nav id: scroll to the first form after the routes */
document.addEventListener('click',function(ev){var a=ev.target.closest&&ev.target.closest('[data-routes-form]');if(!a)return;var f=document.querySelector('.wform');if(!f)return;ev.preventDefault();
 (f.closest('section')||f).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})});
/* Phone "How it works" toggle: opens or closes that route's steps (aria-expanded on the button; the CSS shows the steps
   only while it reads true, below 860 px). With motion on, the beam then runs the opened rail once. */
document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('.aq-contact-routes__how');if(!b)return;
 var open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',open?'true':'false');
 var li=b.closest('.aq-contact-routes__route');if(open&&li&&window.AQrouteBeam)setTimeout(function(){AQrouteBeam(li)},30)});
