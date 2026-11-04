/* NavBar: the logo, the six sections, the "Service request" utility link and the proposal button; on narrow screens a
   menu. All of it comes from NAVMENU and NAVTASKS in core.js (design-system/components/NavBar/README.md).
   Wide bar (mega menu): each section is a disclosure button (aria-expanded, aria-controls) that opens its panel, rendered
   closed (hidden) inside the button's <li>, so Tab runs button -> panel links -> next button. A panel holds a head (the
   section's name, one lead line and the overview link: the section's hub, the panel's first link), its groups of links
   with one-line descriptions, a featured card, an optional foot line and the shared "I need to" row. Group labels are
   text, not headings, so the page outline never changes. The current section's button carries aria-current="true",
   the current page's link aria-current="page". A section with panel:null stays a plain link.
   Panel state is local to the DOM (hidden + aria-expanded), never a re-render: opening one closes any other; a route
   change re-renders the page, which closes everything by construction. Behaviour (below): click, Enter or Space toggle;
   a mouse resting 120 ms on a button opens it, and with a panel open another button switches at once; a click on a
   hover-opened button keeps it open; leaving button and panel closes after 300 ms unless it was clicked open; Escape
   closes and returns focus to the button when focus was in the panel (a hover-opened panel leaves focus where it was); focus leaving the item, a press outside the bar, the bar scrolling out of
   view and the bar turning compact close it. Arrow keys: Left/Right/Home/End move between the sections, Down opens a
   panel at its overview link. Each change is announced to NavBar/motion.js as a cancelable aq:navpanel event on the
   bar; motion that takes over calls detail.done() when its exit ends (and done runs anyway 400 ms later, so an
   interrupted exit never leaves a panel showing), so without motion (or GSAP) panels show and hide at once.
   Phone menu (the toggle, WMENU re-render): the urgent block (production stopped: the service number and its hours,
   then the service request row), the sections as an accordion (one group open at a time, the current section's open
   when the menu opens; overview link, featured row, then each group's label and links), the "I need to" group, the
   page's section jump (navJumps in SectionNav.js) and the proposal button. The accordion is DOM-local too
   (aq:navgroup for motion). The service number and hours come from CONTACT (core.js): a tel: link once confirmed, the
   placeholder until then, and the hours always travel with the number, so the block never implies round-the-clock help.
   Launch rule (design-system/website.md, Navigation): while the number is unconfirmed the urgent block goes, the
   "Service request" row stays.
   The toggle carries a two-bar mark (aq-nav__burger, aria-hidden) that turns into a cross while the menu is open; its
   label stays the words "Menu" / "Close" (aq-nav__toggle-t). */
/* The section a page belongs to (its "section" string), the entries of a group that exist, and the gate for a link
   whose block is still all placeholders (certification status) */
function navOf(section){return NAVMENU.filter(function(s){return (s.sections||[s.label]).indexOf(section)>-1})[0]}
function wfilled(id){var s=wsplit(id),p=wp(s[0]),B=(p&&p.blocks)||[],b=null;for(var i=0;i<B.length;i++)if((B[i].nav||B[i].anchor)&&jid(B[i],i)===s[1])b=B[i];if(!b)return false;
 var R=(b.items||b.rows||[]).map(function(r){return JSON.stringify(r)}),iso=R.filter(function(r){return /ISO 9001/.test(r)})[0];
 return iso!=null?iso.indexOf('[')<0:R.some(function(r){return r.indexOf('[')<0})}
function navItems(items,drop){return (items||[]).filter(function(x){return whas(x[0])&&(!drop||drop.indexOf(x[0])<0)&&(x[3]!=='filled'||wfilled(x[0]))})}
function navGroups(s,drop){return (s.groups||[]).map(function(g){return {h:g.h,items:navItems(g.items,drop)}}).filter(function(g){return g.items.length})}
function navFoot(s){var f=s.foot;if(!f)return null;var to=f.to&&whas(f.to)?f.to:f.fallback&&whas(f.fallback)?f.fallback:'';return {t:f.t,to:to,link:f.link}}
function navA(to,cls,inner){return '<a class="'+cls+'" href="#'+e(to)+'" data-wp="'+e(to)+'"'+(to===WP?' aria-current="page"':'')+'>'+inner+'</a>'}
function navTasks(){return NAVTASKS.filter(function(k){return whas(k[0])})}
function navCap(s){s=String(s);return s.charAt(0).toUpperCase()+s.slice(1)}
/* A featured title whose last word travels with its arrow (aq-mega__tail, nowrap), so the arrow never wraps alone */
function navTail(t){t=String(t);var i=t.lastIndexOf(' ');return i<0?'<span class="aq-mega__tail">'+tx(t)+'</span>':tx(t.slice(0,i+1))+'<span class="aq-mega__tail">'+tx(t.slice(i+1))+'</span>'}
/* Wide bar: one panel */
function megaPanel(s){var id=s.id,G=navGroups(s),f=s.feat&&whas(s.feat.to)?s.feat:null,ft=navFoot(s),T=navTasks();
 return '<div class="aq-mega" id="nav-p-'+id+'" hidden><div class="aq-mega__in'+(f?'':' aq-mega__in--nofeat')+'">'
  +'<div class="aq-mega__head"><p class="aq-mega__name">'+e(s.label)+'</p><p class="aq-mega__lead">'+tx(s.lead)+'</p>'+navA(s.hub,'aq-mega__all',e(s.label)+' overview')+'</div>'
  +'<div class="aq-mega__groups'+(G.length===1?' aq-mega__groups--n1':G.length===3?' aq-mega__groups--n3':'')+'">'+G.map(function(g,k){var gid='nav-g-'+id+'-'+(k+1);
    return '<div class="aq-mega__group"><p class="aq-mega__label" id="'+gid+'">'+e(g.h)+'</p><ul aria-labelledby="'+gid+'">'+g.items.map(function(x){
     return '<li>'+navA(x[0],'aq-mega__link','<span class="aq-mega__t">'+tx(x[1]||wlabel(x[0]))+'</span><span class="aq-mega__d">'+tx(x[2])+'</span>')+'</li>'}).join('')+'</ul></div>'}).join('')+'</div>'
  +(f?navA(f.to,'aq-mega__feat',wSpot(f.icon,0,'aq-mega__icon')+'<span class="aq-mega__eyebrow">'+tx(f.eyebrow)+'</span><span class="aq-mega__t">'+navTail(f.t)+'</span><span class="aq-mega__d">'+tx(f.d)+'</span>'):'')
  +(ft?'<p class="aq-mega__foot">'+tx(ft.t)+(ft.to?' '+navA(ft.to,'aq-mega__more',tx(ft.link)):'')+'</p>':'')
  +'</div>'+(T.length?'<div class="aq-mega__tasks"><div class="aq-mega__tasks-in"><p class="aq-mega__label" id="nav-k-'+id+'">I need to</p><ul aria-labelledby="nav-k-'+id+'">'
  +T.map(function(k){return '<li>'+navA(k[0],'aq-mega__task',tx(k[1]))+'</li>'}).join('')+'</ul></div></div>':'')+'</div>'}
/* Phone menu: one section's group (overview link, featured row, the groups, the foot line) */
function menuGroup(s,open){var id=s.id,G=navGroups(s,s.phoneDrop),f=s.feat&&whas(s.feat.to)?s.feat:null,ft=navFoot(s);
 return '<li><button type="button" class="aq-menu__sect" id="wm-b-'+id+'" aria-expanded="'+open+'" aria-controls="wm-g-'+id+'">'+e(s.label)+'<span class="aq-menu__plus" aria-hidden="true"></span></button>'
  +'<div class="aq-menu__group" id="wm-g-'+id+'"'+(open?'':' hidden')+'><div class="aq-menu__group-in">'+navA(s.hub,'aq-menu__all',e(s.label)+' overview')
  +(f?navA(f.to,'aq-menu__feat','<span class="aq-menu__eyebrow">'+tx(f.eyebrow)+'</span><span class="aq-menu__t">'+tx(f.t)+'</span><span class="aq-menu__d">'+tx(f.d)+'</span>'):'')
  +'<div class="aq-menu__ggrid">'+G.map(function(g,k){var gid='wm-l-'+id+'-'+(k+1);return '<div class="aq-menu__gg"><p class="aq-menu__glabel" id="'+gid+'">'+e(g.h)+'</p><ul aria-labelledby="'+gid+'">'
   +g.items.map(function(x){return '<li>'+navA(x[0],'aq-menu__link','<span class="aq-menu__t">'+tx(x[1]||wlabel(x[0]))+'</span><span class="aq-menu__d">'+tx(x[2])+'</span>')+'</li>'}).join('')+'</ul></div>'}).join('')+'</div>'
  +(ft?'<p class="aq-menu__foot">'+tx(ft.t)+(ft.to?' '+navA(ft.to,'aq-menu__more',tx(ft.link)):'')+'</p>':'')+'</div></div></li>'}
/* Theme switch (aq-nav__theme): every load follows the system setting (no data-theme on <html>, so tokens.css's
   prefers-color-scheme rules apply). Pressing it sets data-theme on <html> to the other theme for the rest of the
   visit; route changes keep it (the attribute lives on <html>, outside the re-rendered page), a reload goes back to
   the system. The icon shows the theme it switches to (a moon in light, a sun in dark), swapped by CSS like the logo;
   the label names the action and is refreshed at each render, each press and each system change. */
function navTheme(){var a=typeof document!=='undefined'&&document.documentElement.getAttribute('data-theme');
 return a||(typeof window!=='undefined'&&window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
function navThemeLabel(){return navTheme()==='dark'?'Switch to light theme':'Switch to dark theme'}
function navThemeBtn(){return '<button class="aq-nav__theme" type="button" id="wtheme" aria-label="'+navThemeLabel()+'" title="'+navThemeLabel()+'">'
 +'<svg class="aq-nav__moon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M16.5 12.2A6.75 6.75 0 0 1 7.8 3.5a6.75 6.75 0 1 0 8.7 8.7Z"/></svg>'
 +'<svg class="aq-nav__sun" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="3.5"/><path d="M10 1.75v2M10 16.25v2M1.75 10h2M16.25 10h2M4.17 4.17l1.41 1.41M14.42 14.42l1.41 1.41M4.17 15.83l1.41-1.41M14.42 5.58l1.41-1.41"/></svg></button>'}
function wHead(section){var cs=navOf(section),pg=wp(WP),jumps=navJumps(pg),T=navTasks();
 var cta=function(extra){return '<span class="aq-nav__frame'+(extra||'')+'"><a class="aq-btn aq-btn--primary" href="#contact-proposal" data-wp="contact-proposal">Request a proposal</a></span>'};
 var svc=function(cls){return '<a class="'+cls+'" href="#contact-service" data-wp="contact-service"'+(WP==='contact-service'?' aria-current="page"':'')+'>Service request</a>'};
 return '<nav class="aq-nav" aria-label="Main"><a class="aq-nav__home" href="#home" data-wp="home" aria-label="Aquemi home"><img class="aq-nav__logo aq-nav__logo--lockup aq-logo--on-light" src="brand/lockup-navy.svg" alt="aquemi"><img class="aq-nav__logo aq-nav__logo--lockup aq-logo--on-dark" src="brand/lockup-limestone.svg" alt="aquemi"></a>'+
  '<ul class="aq-nav__links">'+NAVMENU.map(function(s){var c=s===cs;
   return s.panel===null?'<li class="aq-nav__item"><a href="#'+s.hub+'" data-wp="'+s.hub+'"'+(c?' aria-current="page"':'')+'>'+e(s.label)+'</a></li>'
    :'<li class="aq-nav__item"><button type="button" class="aq-nav__trigger" id="nav-t-'+s.id+'" aria-expanded="false" aria-controls="nav-p-'+s.id+'"'+(c?' aria-current="true"':'')+'>'+e(s.label)+'<span class="aq-nav__chev" aria-hidden="true"></span></button>'+megaPanel(s)+'</li>'}).join('')+'</ul>'+
  '<div class="aq-mega__bg" aria-hidden="true" hidden></div>'+
  '<span class="aq-nav__spacer"></span>'+svc('aq-nav__service')+navThemeBtn()+cta()+
  '<button class="aq-btn aq-btn--secondary aq-nav__toggle" type="button" id="wmenu" aria-expanded="'+WMENU+'"'+(WMENU?' aria-controls="wmenu-panel"':'')+'><span class="aq-nav__burger" aria-hidden="true"><i></i><i></i></span><span class="aq-nav__toggle-t">'+(WMENU?'Close':'Menu')+'</span></button></nav>'+
 (WMENU?'<div class="aq-menu" id="wmenu-panel">'+
  '<div class="aq-menu__urgent" data-theme="light"><p class="aq-menu__ask">Production stopped?</p>'+wtel(CONTACT.service,'aq-menu__call','<span class="aq-menu__k">Call</span> ')+'<p class="aq-menu__hours">Answered '+tx(CONTACT.hours)+'</p>'+svc('aq-menu__service')+'</div>'+
  '<nav aria-label="Sections"><ul class="aq-menu__list aq-menu__list--sect">'+NAVMENU.map(function(s){var c=s===cs;
   return s.panel===null?'<li><a href="#'+s.hub+'" data-wp="'+s.hub+'"'+(c?' aria-current="page"':'')+'>'+e(s.label)+'</a></li>':menuGroup(s,c)}).join('')+
  (T.length?'<li><button type="button" class="aq-menu__sect" id="wm-b-tasks" aria-expanded="false" aria-controls="wm-g-tasks">I need to<span class="aq-menu__plus" aria-hidden="true"></span></button><div class="aq-menu__group" id="wm-g-tasks" hidden><div class="aq-menu__group-in"><ul class="aq-menu__tasks">'+
   T.map(function(k){return '<li>'+navA(k[0],'aq-menu__link','<span class="aq-menu__t">'+tx(navCap(k[1]))+'</span>')+'</li>'}).join('')+'</ul></div></div></li>':'')+
  '</ul></nav>'+
  (jumps.length?'<nav class="aq-menu__jump" aria-labelledby="wmenu-jump"><p class="aq-menu__label" id="wmenu-jump">Section jump</p><ol class="aq-menu__list aq-menu__list--jump">'+jumps.map(function(j,i){return '<li><a href="#'+e(pg.id)+'" data-jump="'+e(j.id)+'">'+e(j.label)+'</a></li>'}).join('')+'</ol></nav>':'')+
  cta(' aq-menu__cta')+'</div>':'')}
/* Menu behaviour: a section jump closes the menu before the page scrolls; Escape closes it; focus stays on the toggle after it re-renders. */
if(typeof document!=='undefined'){
 /* Theme switch: press flips the page's theme; a system change while no choice was made refreshes the label */
 var navThemeSync=function(){var b=document.getElementById('wtheme');if(b){var l=navThemeLabel();b.setAttribute('aria-label',l);b.setAttribute('title',l)}};
 document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('#wtheme');if(!b)return;
  document.documentElement.setAttribute('data-theme',navTheme()==='dark'?'light':'dark');navThemeSync()});
 if(window.matchMedia){var navMq=matchMedia('(prefers-color-scheme: dark)');if(navMq.addEventListener)navMq.addEventListener('change',navThemeSync);else if(navMq.addListener)navMq.addListener(navThemeSync)}
 /* Mega panels (wide bar). MEGA: the open item (<li>), whether it was clicked open (pinned), and the hover timers. */
 var MEGA={li:null,pin:false,hover:0,leave:0,io:null,ro:null};
 var megaFine=function(){return !window.matchMedia||matchMedia('(hover: hover) and (pointer: fine)').matches};
 var megaPanels=function(nav){return nav?[].slice.call(nav.querySelectorAll('.aq-mega')):[]};
 var megaLive=function(){if(MEGA.li&&!MEGA.li.isConnected){MEGA.li=null;MEGA.pin=false;megaObs(null)}return MEGA.li};
 function megaObs(nav,btn){if(MEGA.io){MEGA.io.disconnect();MEGA.io=null}if(MEGA.ro){MEGA.ro.disconnect();MEGA.ro=null}if(!nav)return;
  if(window.IntersectionObserver){MEGA.io=new IntersectionObserver(function(es){if(!es[es.length-1].isIntersecting)megaSet(null)});MEGA.io.observe(nav)}
  if(window.ResizeObserver){MEGA.ro=new ResizeObserver(function(){if(btn&&!btn.offsetParent)megaSet(null)});MEGA.ro.observe(nav)}}
 /* megaSet(li, pin, how): open li's panel (null closes), close any other; tell motion; how: 'key' when the keyboard asked */
 function megaSet(li,pin,how){clearTimeout(MEGA.hover);clearTimeout(MEGA.leave);var old=megaLive();if(li===old){if(li)MEGA.pin=MEGA.pin||!!pin;return}
  var nav=(li||old).closest('.aq-nav'),from=old&&old.querySelector('.aq-mega'),to=li&&li.querySelector('.aq-mega'),btn=li&&li.querySelector('.aq-nav__trigger');
  if(old)old.querySelector('.aq-nav__trigger').setAttribute('aria-expanded','false');
  MEGA.li=li;MEGA.pin=!!(li&&pin);
  if(li){btn.setAttribute('aria-expanded','true');nav.style.setProperty('--mega-top',Math.max(0,Math.round(nav.getBoundingClientRect().bottom))+'px');to.hidden=false}
  megaObs(li?nav:null,btn);
  var done=function(){megaPanels(nav).forEach(function(p){if(!MEGA.li||p!==MEGA.li.querySelector('.aq-mega'))p.hidden=true})};
  var ev=new CustomEvent('aq:navpanel',{bubbles:true,cancelable:true,detail:{open:to||null,from:from||null,trigger:btn||null,key:how==='key',done:done,
   others:function(){megaPanels(nav).forEach(function(p){if(p!==to&&p!==from)p.hidden=true})}}});
  if(nav.dispatchEvent(ev))done();else setTimeout(done,400)}
 document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('.aq-nav__trigger');if(!b)return;var li=b.closest('.aq-nav__item'),o=megaLive();
  if(o===li){if(MEGA.pin||ev.detail===0)megaSet(null);else MEGA.pin=true}else megaSet(li,true,ev.detail===0?'key':'')});
 document.addEventListener('pointerover',function(ev){if(ev.pointerType!=='mouse'||!megaFine())return;var o=megaLive(),li=ev.target.closest&&ev.target.closest('.aq-nav__item');
  if(o&&li===o){clearTimeout(MEGA.leave);return}
  var b=ev.target.closest&&ev.target.closest('.aq-nav__trigger');if(!b)return;li=b.closest('.aq-nav__item');clearTimeout(MEGA.hover);
  if(o)megaSet(li,false);else MEGA.hover=setTimeout(function(){if(li.isConnected&&b.offsetParent)megaSet(li,false)},120)});
 document.addEventListener('pointerout',function(ev){if(ev.pointerType!=='mouse')return;var b=ev.target.closest&&ev.target.closest('.aq-nav__trigger');
  if(b&&!b.contains(ev.relatedTarget))clearTimeout(MEGA.hover);
  var o=megaLive();if(!o||MEGA.pin||!o.contains(ev.target)||o.contains(ev.relatedTarget))return;
  clearTimeout(MEGA.leave);MEGA.leave=setTimeout(function(){if(MEGA.li===o&&!MEGA.pin)megaSet(null)},300)});
 document.addEventListener('focusout',function(ev){var o=megaLive();if(o&&o.contains(ev.target)&&ev.relatedTarget&&!o.contains(ev.relatedTarget))megaSet(null)});
 document.addEventListener('pointerdown',function(ev){var o=megaLive();if(o&&!(ev.target.closest&&ev.target.closest('.aq-nav')))megaSet(null)});
 document.addEventListener('keydown',function(ev){var o=megaLive();
  if(ev.key==='Escape'&&o){var b=o.querySelector('.aq-nav__trigger'),inside=o.contains(document.activeElement);megaSet(null);if(inside)b.focus();ev.preventDefault();return}
  var top=ev.target.closest&&ev.target.closest('.aq-nav__links > .aq-nav__item > .aq-nav__trigger, .aq-nav__links > .aq-nav__item > a');if(!top)return;
  var all=[].slice.call(top.closest('.aq-nav__links').querySelectorAll(':scope > .aq-nav__item > .aq-nav__trigger, :scope > .aq-nav__item > a')),i=all.indexOf(top),k=ev.key,to=-1;
  if(k==='ArrowRight')to=(i+1)%all.length;else if(k==='ArrowLeft')to=(i-1+all.length)%all.length;else if(k==='Home')to=0;else if(k==='End')to=all.length-1;
  else if(k==='ArrowDown'&&top.classList.contains('aq-nav__trigger')){ev.preventDefault();megaSet(top.closest('.aq-nav__item'),true,'key');var a=top.parentNode.querySelector('.aq-mega__all');if(a)a.focus();return}
  if(to>-1){ev.preventDefault();all[to].focus()}});

 /* Width guard: the compact switch is a container query at 1,040 px, sized for today's labels. If longer labels (a
    translation, a renamed section) no longer fit the bar, the links overflow their row; then the bar takes the compact
    form anyway (is-tight on .aq-nav, style.css). Overflow into half the bar's gap is tolerated (at 1,056 px today's labels
    run 6 px into the 16 px gap before "Service request"). Checked when a bar is rendered and on resize. */
 var NAVFIT={nav:null,raf:0};
 var navFit=function(){var n=document.querySelector('.aq-nav'),u=n&&n.querySelector('.aq-nav__links');if(!u)return;NAVFIT.nav=n;
  var was=n.classList.contains('is-tight');if(was)n.classList.remove('is-tight');var tight=!!u.offsetParent&&u.scrollWidth-u.clientWidth>(parseFloat(getComputedStyle(n).columnGap)||16)/2;
  if(tight){n.classList.add('is-tight');if(megaLive())megaSet(null)}};
 if(window.MutationObserver)new MutationObserver(function(){var n=document.querySelector('.aq-nav');if(n&&n!==NAVFIT.nav)navFit()}).observe(document.documentElement,{childList:true,subtree:true});
 window.addEventListener('resize',function(){cancelAnimationFrame(NAVFIT.raf);NAVFIT.raf=requestAnimationFrame(navFit)});
 /* Phone menu accordion: one group open at a time; the opened row scrolls into view. aq:navgroup tells motion (key: the
    keyboard opened it, so the height is not tweened, as the spring-accordion example does). */
 document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('.aq-menu__sect');if(!b)return;var list=b.closest('.aq-menu__list'),g=document.getElementById(b.getAttribute('aria-controls'));if(!g)return;
  var open=b.getAttribute('aria-expanded')!=='true',was=list.querySelector('.aq-menu__sect[aria-expanded="true"]'),from=was&&document.getElementById(was.getAttribute('aria-controls'));
  if(was)was.setAttribute('aria-expanded','false');
  if(open){b.setAttribute('aria-expanded','true');g.hidden=false}
  var to=open?g:null;if(!open)from=g;
  var done=function(){[].forEach.call(list.querySelectorAll('.aq-menu__group'),function(x){var t=document.querySelector('[aria-controls="'+x.id+'"]');x.hidden=!(t&&t.getAttribute('aria-expanded')==='true')})};
  if(b.dispatchEvent(new CustomEvent('aq:navgroup',{bubbles:true,cancelable:true,detail:{open:to,from:from&&from!==to?from:null,key:ev.detail===0,done:done}})))done();else setTimeout(done,400);
  if(open&&b.scrollIntoView)b.scrollIntoView({block:'nearest'})});
 document.addEventListener('click',function(ev){var j=ev.target.closest&&ev.target.closest('.aq-menu a[data-jump]');if(!j||!WMENU)return;
  WMENU=false;var m=document.getElementById('wmenu-panel'),t=document.getElementById('wmenu');if(m)m.remove();if(t){t.setAttribute('aria-expanded','false');t.removeAttribute('aria-controls');var tl=t.querySelector('.aq-nav__toggle-t');if(tl)tl.textContent='Menu';else t.textContent='Menu'}},true);
 document.addEventListener('click',function(ev){var b=ev.target&&ev.target.closest&&ev.target.closest('#wmenu');if(b&&!b.isConnected){var t=document.getElementById('wmenu');if(t)t.focus()}});
 document.addEventListener('keydown',function(ev){if(ev.key==='Escape'&&WMENU&&!ev.defaultPrevented){var t=document.getElementById('wmenu');if(t){t.click();t=document.getElementById('wmenu');if(t)t.focus()}}});
}
