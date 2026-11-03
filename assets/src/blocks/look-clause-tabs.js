/* Look "clause-tabs" -> ClauseTabs (design-system/components/ClauseTabs): the terms as page one of a proposal held on a
   clipboard, each clause with a numbered tab on the page's edge, and a leader from every tab to what that clause
   governs on a small isometric PP package (pass 12 build D, concept 249 take 2, audit row 33): the page says how you
   buy it, the package is what you buy. The package (IsoKit): the control panel, the RO rack on a closed PP skid base
   with fork pockets, the product line ending in a sample valve, a dashed option module (a change after order) and a
   dashed scope line on the floor round the whole package (the scope the proposal prices).
   Fields (a spec block, as terms-sheet): h, intro, cols [term, ours, note], rows [{p, v, m, link, link_label, part}].
   part (look-only): what the clause governs on the drawing: "scope" (default), "base", "ro", "panel", "valve" or
   "option". A tag sits beside a small part (the valve), never on it, so the lit part stays in view; no leader runs
   through the rack, its pump or the panel on its way to another part's tag. A value written "a · b" breaks into lines. Each row: the term with its note under it, our side of it (the
   values) beside them, the link under the values.
   Leaders are laid from the rendered tabs to the numbered tags on the drawing (ResizeObserver), so they follow
   wrapping; pointing at or focusing a clause lights its tab, leader, tag and part. Container 1080 px and under: the
   drawing above the page, no leaders (the numbers pair tabs and tags).
   Phones (860 and under): the drawing is a PhoneKit sticky strip (180 px, zoom 1.6) held under the header while the
   clauses scroll: the clause on the reading line lights its tag and part and the strip pans to that tag; a clause
   opened by tap wins while it stays in view. The clauses are a PhoneKit accordion: the head is the tab number and term
   (48 px, chevron), the value stays in view under it, the note and the link (44 px) open on tap. A clause with neither
   note nor link is a plain row. Without script every clause shows open. */
var CT_PARTS=['scope','base','ro','panel','valve','option'];
function ctScene(){var P='aq-clause-tabs'+'__';
 var S=[-62,-24],E=[238,76],F=function(a,b){return 'M'+isoT(isoP(a))+'L'+isoT(isoP(b))};
 /* the scope line on the floor: a dashed rectangle with solid corner ticks */
 var c=[[S[0],S[1],0],[E[0],S[1],0],[E[0],E[1],0],[S[0],E[1],0]],scope='<g class="aq-iso__part '+P+'scope" data-iso="scope" data-iso-id="scope"><path class="aq-iso__ln '+P+'dash" d="'+isoPoly(c,1)+'"/>'
  +'<path class="aq-iso__ln" d="'+c.map(function(p,i){var a=c[(i+3)%4],b=c[(i+1)%4],u=function(q){var d=isoV.nrm(isoV.sub(q,p));return isoV.add(p,isoV.mul(d,9))};return F(u(a),p)+F(p,u(b))}).join('')+'"/></g>';
 /* the package: closed PP skid base, RO rack, the product line out of the rack's end, down, forward and back along the
    open deck to a sample valve low in front of the rack (where a leader from the left reaches it across open deck), the
    control panel standing on the deck at the back right; the option module (dashed) on the floor beyond the skid's end */
 var sk=isoPart('skid',0,0,0,1,{w:192,d:62,id:'base'}),ro=isoPart('ro',8,8,9,1,{id:'ro'});
 var o=ro.ports.out,VA=[86,60,20],line=isoPipe([o,[o[0]+6,o[1],o[2]],[o[0]+6,o[1],VA[2]],[o[0]+6,VA[1],VA[2]],[VA[0]-6,VA[1],VA[2]]],{r:1.8,caps:'end',flanges:'all',to:'valve'}),
  va=isoPart('valve',VA[0],VA[1],VA[2],0.9,{id:'valve'}),pn=isoPart('panel',172,14,9,1,{id:'panel'}),
  op=isoPart('module',216,34,0,0.62,{id:'option',cls:P+'ghost'});
 var inner=scope+[sk,ro,line,va,pn,op].join('');
 /* anchors (where a clause's tag sits), found by a search over each part's faces at 1280 and checked at 1100 to 1440:
    the tags fall down the drawing in clause order (01 at the top, 10 at the foot), no two leaders cross, no leader runs
    through the rack, its pump, the panel, the valve or a tag, and no tag covers a part it does not name. The valve's tag
    sits beside the valve (down and to the left), so the lit valve stays in view. Scope takes its anchors in turn along
    the left and front of its line */
 var A={scope:[[-62,-18,0],[-62,12,0],[-40,76,0],[170,76,0],[220,76,0],[90,76,0]],base:[[0,58,9]],ro:[[108,34,12]],panel:[[158,21,14]],
  valve:[[VA[0]-20,VA[1]+5,VA[2]-8]],option:[[206,46,4]]};
 var bx=isoBounds([c[0],c[1],c[2],c[3],[8,8,76],[155,6,66],[189,22,66]],20);
 return {inner:inner,bx:bx,A:A}}
LOOKS['clause-tabs']=function(b,H){var C=b.cols||[],R=(b.rows||[]).map(function(r){return Array.isArray(r)?{p:r[0],v:r[1],m:r[2]}:r}),n=R.length,
  S=ctScene(),W=Math.round(S.bx.w),Hh=Math.round(S.bx.h),org=[-S.bx.x,-S.bx.y],used={};
 var nn=function(i){return (i<9?'0':'')+(i+1)};
 var part=function(r){return CT_PARTS.indexOf(r.part)>-1?r.part:'scope'};
 var tags=R.map(function(r,i){var k=part(r),j=used[k]=(used[k]||0)+1,L=S.A[k],p=L[(j-1)%L.length];if(j>L.length)p=[p[0],p[1],p[2]+12*Math.floor((j-1)/L.length)];
  var at=isoPct(isoP(p),W,Hh,org);return '<span class="aq-clause-tabs__tag" data-i="'+i+'" data-pk-key="'+i+'" style="left:'+at.left+';top:'+at.top+'" aria-hidden="true">'+nn(i)+'</span>'}).join('');
 var svg=isoSvg(W,Hh,S.inner,'aq-clause-tabs__svg',{origin:org});
 var rows=R.map(function(r,i){var V=String(r.v||'').split(/\s+·\s+/).filter(Boolean),go=r.link&&wp(r.link),tap=!!(r.m||go);
  var note=(r.m?'<p class="aq-clause-tabs__m"><span class="aq-clause-tabs__k">'+tx(C[2]||'')+' </span>'+tcell(r.m)+'</p>':'')+(go?'<p class="aq-clause-tabs__go">'+wlink(r.link,r.link_label)+'</p>':'');
  return '<li class="aq-clause-tabs__row" data-i="'+i+'" data-pk-row="'+i+'" data-part="'+part(r)+'"'+(tap?' data-pk-item="'+i+'"':'')+'>'
   +'<span class="aq-clause-tabs__tab" aria-hidden="true">'+nn(i)+'</span>'
   +'<h3 class="aq-clause-tabs__t"'+(tap?' data-pk-desk':'')+'><span class="aq-clause-tabs__n" aria-hidden="true">'+nn(i)+'</span>'+tx(r.p)+'</h3>'
   +(tap?'<h3 class="aq-clause-tabs__ph"><button type="button" class="aq-clause-tabs__hb" data-pk-head><span class="aq-clause-tabs__hn" aria-hidden="true">'+nn(i)+'</span><span class="aq-clause-tabs__ht">'+tx(r.p)+'</span><span class="aq-phone-kit__chev" aria-hidden="true"></span></button></h3>':'')
   +'<div class="aq-clause-tabs__ours"><p class="aq-clause-tabs__k">'+tx(C[1]||'')+'</p><ul class="aq-clause-tabs__v" role="list">'+V.map(function(x){return '<li>'+tx(x)+'</li>'}).join('')+'</ul></div>'
   +(tap?'<div class="aq-clause-tabs__body" data-pk-body>'+note+'</div>':'')+'</li>'}).join('');
 var head='<p class="aq-clause-tabs__head" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span></p>';
 return sec(H+'<div class="aq-clause-tabs" data-pk-sticky data-pk-bp="860" data-pk-h="180" data-pk-zoom="1.6">'
  +'<div class="aq-clause-tabs__board"><span class="aq-clause-tabs__clip" aria-hidden="true"></span><div class="aq-clause-tabs__page">'+head
  +'<ol class="aq-clause-tabs__list" role="list" data-pk-picker="accordion" data-pk-open="-1">'+rows+'</ol></div></div>'
  +'<div class="aq-clause-tabs__fig" aria-hidden="true" data-pk-fig><div class="aq-clause-tabs__sheet" style="--ct-ar:'+W+' / '+Hh+'">'+svg+tags+'</div></div>'
  +'<svg class="aq-clause-tabs__leads" aria-hidden="true" focusable="false"></svg></div>','aq-clause-tabs-sec')};
(function(){var NS='http://www.w3.org/2000/svg';
 /* lay the leaders from the rendered tabs: out of the tab, along its row line, then down or up into the tag */
 function lay(w){var svg=w.querySelector('.aq-clause-tabs__leads');if(!svg)return;
  var wr=w.getBoundingClientRect();svg.setAttribute('viewBox','0 0 '+Math.round(wr.width)+' '+Math.round(wr.height));
  while(svg.firstChild)svg.removeChild(svg.firstChild);if(getComputedStyle(svg).display==='none')return;
  var T=[].slice.call(w.querySelectorAll('.aq-clause-tabs__tab'));
  T.forEach(function(t){var i=t.parentNode.getAttribute('data-i'),k=w.querySelector('.aq-clause-tabs__tag[data-i="'+i+'"]');if(!k)return;
   var r=t.getBoundingClientRect(),m=k.getBoundingClientRect(),x0=r.right-wr.left,y=r.top+r.height/2-wr.top,tx=m.left-wr.left,ty=m.top+m.height/2-wr.top;
   /* out of the tab level with its clause, then one straight run into the tag */
   var kx=Math.min(x0+16,tx-8);
   var d='M'+x0.toFixed(1)+' '+y.toFixed(1)+'H'+kx.toFixed(1)+'L'+(tx-6).toFixed(1)+' '+ty.toFixed(1)+'H'+tx.toFixed(1),p=document.createElementNS(NS,'path');
   p.setAttribute('d',d);p.setAttribute('class','aq-clause-tabs__lead'+(w.getAttribute('data-on')===i?' is-on':''));p.setAttribute('data-i',i);svg.appendChild(p)})}
 /* one clause lit at a time: its row, tab, leader, tag and part */
 function show(w,i){if(i==null)i='';if(w.getAttribute('data-on')===String(i))return;
  if(i==='')w.removeAttribute('data-on');else w.setAttribute('data-on',i);
  var row=i===''?null:w.querySelector('.aq-clause-tabs__row[data-i="'+i+'"]'),pt=row?row.getAttribute('data-part'):'';
  [].forEach.call(w.querySelectorAll('.aq-clause-tabs__row, .aq-clause-tabs__tag, .aq-clause-tabs__lead'),function(x){x.classList.toggle('is-on',x.getAttribute('data-i')===String(i))});
  [].forEach.call(w.querySelectorAll('.aq-clause-tabs__svg [data-iso-id]'),function(x){x.classList.toggle('is-hot',x.getAttribute('data-iso-id')===pt)})}
 window.AQclauseTabs={lay:lay,show:show};
 if(window.ResizeObserver&&window.MutationObserver){var ro=new ResizeObserver(function(es){es.forEach(function(en){lay(en.target)})});
  var scan=function(n){if(n.nodeType!==1)return;var L=n.matches('.aq-clause-tabs')?[n]:[].slice.call(n.querySelectorAll('.aq-clause-tabs'));
   L.forEach(function(w){if(w.__ctl)return;w.__ctl=1;ro.observe(w);lay(w)})};
  new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,scan)})}).observe(document.documentElement,{childList:true,subtree:true});
  if(document.body)scan(document.body)}
 var rowOf=function(t){return t&&t.closest&&t.closest('.aq-clause-tabs__row')};
 document.addEventListener('pointerover',function(ev){var r=rowOf(ev.target);if(!r||ev.pointerType==='touch')return;var w=r.closest('.aq-clause-tabs');if(w.querySelector('.aq-clause-tabs__list[data-pk-on]'))return;show(w,r.getAttribute('data-i'))});
 document.addEventListener('pointerout',function(ev){var l=ev.target.closest&&ev.target.closest('.aq-clause-tabs__list');if(!l||(ev.relatedTarget&&l.contains(ev.relatedTarget)))return;
  var w=l.closest('.aq-clause-tabs');if(w.querySelector('.aq-clause-tabs__list[data-pk-on]'))return;var f=document.activeElement&&rowOf(document.activeElement);show(w,f&&w.contains(f)?f.getAttribute('data-i'):'')});
 document.addEventListener('focusin',function(ev){var r=rowOf(ev.target);if(!r)return;var w=r.closest('.aq-clause-tabs');if(!w.querySelector('.aq-clause-tabs__list[data-pk-on]'))show(w,r.getAttribute('data-i'))});
 /* phones: the strip pans to a clause's tag (PhoneKit's own zoom maths, for a clause opened by tap; the reading line's
    clause is panned to by PhoneKit itself) */
 function pan(w,i){var s=+w.getAttribute('data-pk-zoom'),fig=w.querySelector('.aq-clause-tabs__fig'),p=fig&&fig.firstElementChild,t=w.querySelector('.aq-clause-tabs__tag[data-i="'+i+'"]');
  if(!s||!p||!t||!w.hasAttribute('data-pk-on'))return;
  var M=getComputedStyle(p).transform,v=M&&M!=='none'?M.match(/-?[\d.e]+/g):null,cur=v?+v[0]||1:1,e=v?+v[4]:0,g=v?+v[5]:0;
  var P=p.getBoundingClientRect(),F=fig.getBoundingClientRect(),T=t.getBoundingClientRect(),W=P.width/cur,H=P.height/cur,bx=P.left-F.left-e,by=P.top-F.top-g,
   cx=(T.left-P.left+T.width/2)/cur,cy=(T.top-P.top+T.height/2)/cur;
  var x=s*W<=F.width?(F.width-s*W)/2-bx:Math.min(-bx,Math.max(F.width-bx-s*W,F.width/2-bx-s*cx)),y=s*H<=F.height?(F.height-s*H)/2-by:Math.min(-by,Math.max(F.height-by-s*H,F.height/2-by-s*cy));
  w.style.setProperty('--pk-s',String(s));w.style.setProperty('--pk-x',Math.round(x)+'px');w.style.setProperty('--pk-y',Math.round(y)+'px')}
 /* a clause opened by tap keeps the light while its row is still in view below the strip */
 function held(w){var i=w._ctTap;if(i==null)return false;var r=w.querySelector('.aq-clause-tabs__row[data-i="'+i+'"]'),f=w.querySelector('.aq-clause-tabs__fig');if(!r||!f)return false;
  var b=r.getBoundingClientRect();return b.bottom>f.getBoundingClientRect().bottom+24&&b.top<window.innerHeight}
 /* phones: the reading line's clause lights its tag and part (PhoneKit sticky strip on the root); a clause opened by tap
    (PhoneKit accordion on the list) wins while it stays in view */
 document.addEventListener('pk:change',function(ev){var t=ev.target,d=ev.detail||{};if(!t.classList)return;
  if(t.classList.contains('aq-clause-tabs__list')){var w=t.closest('.aq-clause-tabs');if(!w)return;
   if(d.on&&d.index>-1){w._ctTap=String(d.key);show(w,w._ctTap);pan(w,w._ctTap);return}
   w._ctTap=null;var a=d.on&&w.hasAttribute('data-pk-on')?w.getAttribute('data-pk-active'):null;show(w,a||'');if(a)pan(w,a);return}
  if(t.classList.contains('aq-clause-tabs')){if(!d.on){t._ctTap=null;show(t,'');return}
   if(held(t)){show(t,t._ctTap);pan(t,t._ctTap);return}t._ctTap=null;show(t,String(d.key))}});
})();
