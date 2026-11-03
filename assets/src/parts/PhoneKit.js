/* PhoneKit (pass 12): the shared phone behaviour for looks, opted into with data attributes only (no load-order
   coupling; markup contract in design-system/components/PhoneKit/README.md). Two behaviours, each active only while
   the root's page container (.aq-page, the box the looks' @container rules measure) is at most the root's breakpoint
   (data-pk-bp, default 860 px); above it nothing changes, and growing past it restores the desktop state.
   It is site script, not motion: it runs the same with reduced motion (no transitions then).
   - Picker / accordion (S11): [data-pk-picker="accordion|chips"] > [data-pk-item] with a [data-pk-head] (a button) and
     a [data-pk-body]; one open at a time (data-pk-open, default 0). aria-expanded and aria-controls on the heads;
     Enter and Space open a head, arrow keys move between chips.
   - Sticky compact figure (S8): [data-pk-sticky] with a [data-pk-fig] strip (data-pk-h, 96-220 px, default 160) held
     under the header while [data-pk-row="<key>"] rows scroll; the row on the reading line (30 % of the view below the
     strip) gets .is-pk-active, as do the figure's [data-pk-key="<key>"] targets, and the root data-pk-active="<key>".
     Optional data-pk-zoom="<scale>" pans and zooms the figure's [data-pk-pan] layer to the active target.
   Both dispatch pk:change on the root (detail: key, index, on); switching off sends index -1, on false.
   window.AQpk: scan(), on(root), line(root), open(root, index). */
var AQpk=(function(){
 if(typeof document==='undefined'||!document.addEventListener)return null;
 var R=[],uid=0,q=0,rm=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):null,RO=window.ResizeObserver?new ResizeObserver(sched):null,seen=[];
 function A(sel,root){return [].slice.call(root.querySelectorAll(sel))}
 /* the root's own parts (a nested PhoneKit root keeps its own) */
 function own(root,sel){var t=root.hasAttribute('data-pk-picker')?'[data-pk-picker]':'[data-pk-sticky]';return A(sel,root).filter(function(x){return x.closest(t)===root})}
 function page(root){return root.closest('.aq-page')||document.documentElement}
 function fits(root){var bp=+root.getAttribute('data-pk-bp')||860;return page(root).clientWidth<=bp}
 function emit(root,key,i,on){var ev;try{ev=new CustomEvent('pk:change',{bubbles:true,detail:{key:key,index:i,on:on}})}catch(_){ev=document.createEvent('CustomEvent');ev.initCustomEvent('pk:change',true,false,{key:key,index:i,on:on})}root.dispatchEvent(ev)}

 /* ---- picker / accordion ---- */
 function parts(root){return own(root,'[data-pk-item]').map(function(it){return {it:it,h:it.querySelector('[data-pk-head]'),b:it.querySelector('[data-pk-body]')}})}
 function show(root,k,keep){var P=parts(root),chips=root.getAttribute('data-pk-picker')==='chips',y=keep&&keep.getBoundingClientRect().top;
  if(!chips&&k===root._pkOpen)k=-1;/* an accordion head closes its own row; chips always show one card */
  if(chips&&!(k>=0))k=0;
  root._pkOpen=k;
  P.forEach(function(p,i){var on=i===k;p.it.classList.toggle('is-pk-open',on);if(p.h)p.h.setAttribute('aria-expanded',on?'true':'false');if(p.b)p.b.hidden=!on;
   /* chips: one tab stop for the group (the open chip), so Tab runs chip -> open card -> on; arrows move between chips */
   if(chips&&p.h)p.h.tabIndex=on?0:-1});
  /* the row the reader tapped stays where it was, so a long body closing above it never throws the page */
  if(keep){var d=keep.getBoundingClientRect().top-y;if(Math.abs(d)>1)window.scrollBy(0,d)}
  var it=P[k]&&P[k].it;emit(root,it?(it.getAttribute('data-pk-item')||String(k)):null,k,true)}
 function pickOn(root){var P=parts(root),k=root._pkOpen;if(k==null){k=+(root.getAttribute('data-pk-open')||0);if(!(k>=-1&&k<P.length))k=0}
  P.forEach(function(p,i){if(!p.b||!p.h)return;if(p.b._pkH==null)p.b._pkH=p.b.hidden;if(p.h._pkTi===undefined)p.h._pkTi=p.h.getAttribute('tabindex');if(!p.b.id){p.b.id='pk-'+root._pkId+'-'+i;p.b._pkOwnId=1}
   p.h.setAttribute('aria-controls',p.b.id);if(p.h.tagName!=='BUTTON'){p.h.setAttribute('role','button');if(!p.h.hasAttribute('tabindex'))p.h.tabIndex=0}});
  root._pkOpen=null;show(root,k)}
 function pickOff(root){parts(root).forEach(function(p){p.it.classList.remove('is-pk-open');if(p.h)p.h.removeAttribute('aria-expanded');if(p.h)p.h.removeAttribute('aria-controls');if(p.b&&p.b._pkH!=null)p.b.hidden=p.b._pkH;if(p.b&&p.b._pkOwnId){p.b.removeAttribute('id');p.b._pkOwnId=0}
  if(p.h&&p.h._pkTi!==undefined){if(p.h._pkTi==null)p.h.removeAttribute('tabindex');else p.h.setAttribute('tabindex',p.h._pkTi);p.h._pkTi=undefined}})}
 document.addEventListener('click',function(ev){var h=ev.target.closest&&ev.target.closest('[data-pk-head]');if(!h)return;var root=h.closest('[data-pk-picker]');if(!root||!root.hasAttribute('data-pk-on'))return;
  var P=parts(root),k=-1;P.forEach(function(p,i){if(p.h===h)k=i});if(k<0)return;ev.preventDefault();
  if(root.getAttribute('data-pk-picker')!=='chips')show(root,k,h);else if(k!==root._pkOpen)show(root,k)});
 document.addEventListener('keydown',function(ev){var h=ev.target.closest&&ev.target.closest('[data-pk-head]');if(!h)return;var root=h.closest('[data-pk-picker]');if(!root||!root.hasAttribute('data-pk-on'))return;
  if((ev.key==='Enter'||ev.key===' ')&&h.tagName!=='BUTTON'){ev.preventDefault();h.click();return}
  var d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[ev.key];if(!d||root.getAttribute('data-pk-picker')!=='chips')return;
  var H=parts(root).map(function(p){return p.h}),i=H.indexOf(h);if(i<0)return;ev.preventDefault();
  /* selection follows focus (the tabs pattern): the chip moved to opens its card and becomes the group's tab stop */
  var j=i;do{j=(j+d+H.length)%H.length}while(!H[j]&&j!==i);if(j===i)return;show(root,j);H[j].focus()});

 /* ---- sticky compact figure ---- */
 /* the header line the strip sits under: the page's section bar while it shows (it tucks away on scroll down), else 0 */
 function top(){var b=document.querySelector('.aq-section-nav');return b&&!b.classList.contains('is-tucked')&&b.getBoundingClientRect().top<=1?Math.round(b.getBoundingClientRect().height):0}
 function hOf(root){var h=+root.getAttribute('data-pk-h')||160;return Math.max(96,Math.min(220,h))}
 function line(root){var t=root._pkTop||0,h=hOf(root);return t+h+(window.innerHeight-t-h)*0.3}
 function stickOn(root){root.style.setProperty('--pk-h',hOf(root)+'px');root._pkKey=undefined;spy(root)}
 function stickOff(root){root._pkLift=0;['--pk-h','--pk-top','--pk-x','--pk-y','--pk-s','--pk-lift'].forEach(function(v){root.style.removeProperty(v)});root.removeAttribute('data-pk-active');
  own(root,'.is-pk-active').forEach(function(x){x.classList.remove('is-pk-active')});root._pkKey=undefined;root._pkTop=undefined;
  own(root,'[data-pk-pan]').forEach(function(x){if(x._pkOwn){x.removeAttribute('data-pk-pan');x._pkOwn=0}});if(root.getAttribute('style')==='')root.removeAttribute('style')}
 function zoom(root,T){var s=+root.getAttribute('data-pk-zoom'),fig=own(root,'[data-pk-fig]')[0],pan=fig&&(fig.querySelector('[data-pk-pan]')||fig.firstElementChild);if(!s||!pan)return;
  if(!pan.hasAttribute('data-pk-pan')){pan.setAttribute('data-pk-pan','');pan._pkOwn=1}
  /* measured against the layer's transform as drawn now (it may be mid-transition), so the maths never drifts */
  var M=getComputedStyle(pan).transform,v=M&&M!=='none'?M.match(/-?[\d.e]+/g):null,cur=v?+v[0]||1:1,e=v?+v[4]:0,g=v?+v[5]:0;
  var p=pan.getBoundingClientRect(),f=fig.getBoundingClientRect(),w=p.width/cur,h=p.height/cur,ox=p.left-f.left,oy=p.top-f.top;
  /* the layer's untransformed origin inside the figure: where it is drawn now, less the translation applied */
  var bx=ox-e,by=oy-g;
  var cx=w/2,cy=h/2;if(T.length){var t=T[0].getBoundingClientRect();cx=(t.left-p.left+t.width/2)/cur;cy=(t.top-p.top+t.height/2)/cur}else s=1;
  var x=f.width/2-bx-s*cx,y=f.height/2-by-s*cy;
  x=s*w<=f.width?(f.width-s*w)/2-bx:Math.min(-bx,Math.max(f.width-bx-s*w,x));
  y=s*h<=f.height?(f.height-s*h)/2-by:Math.min(-by,Math.max(f.height-by-s*h,y));
  root.style.setProperty('--pk-s',String(s));root.style.setProperty('--pk-x',Math.round(x)+'px');root.style.setProperty('--pk-y',Math.round(y)+'px')}
 /* the last row never slides under the strip: as it rises to the strip's foot the strip lifts off with it (--pk-lift,
    a translate, no transition), so the section's last step reads whole while the strip still holds */
 function lift(root){var rows=own(root,'[data-pk-row]'),fig=own(root,'[data-pk-fig]')[0];if(rows.length<2||!fig)return;
  var cur=root._pkLift||0,fb=fig.getBoundingClientRect().bottom+cur,lt=rows[rows.length-1].getBoundingClientRect().top,v=Math.max(0,Math.round(fb+16-lt));
  if(v!==cur){root._pkLift=v;if(v)root.style.setProperty('--pk-lift',v+'px');else root.style.removeProperty('--pk-lift')}}
 function spy(root){var t=top();if(t!==root._pkTop){root._pkTop=t;root.style.setProperty('--pk-top',t+'px')}
  lift(root);
  var rows=own(root,'[data-pk-row]');if(!rows.length)return;var L=line(root),a=rows[0];
  rows.forEach(function(r){if(r.getBoundingClientRect().top<=L)a=r});
  var key=a.getAttribute('data-pk-row');if(key===root._pkKey)return;root._pkKey=key;
  rows.forEach(function(r){r.classList.toggle('is-pk-active',r===a)});
  var T=own(root,'[data-pk-key]').filter(function(x){var on=(' '+x.getAttribute('data-pk-key')+' ').indexOf(' '+key+' ')>=0;x.classList.toggle('is-pk-active',on);return on});
  root.setAttribute('data-pk-active',key);zoom(root,T);emit(root,key,rows.indexOf(a),true)}

 /* ---- switching ---- */
 function set(root,on){if(on===!!root._pkOn)return;root._pkOn=on;var pick=root.hasAttribute('data-pk-picker');
  if(on){root.setAttribute('data-pk-on','');if(pick)pickOn(root);else stickOn(root)}
  else{root.removeAttribute('data-pk-on');if(pick)pickOff(root);else stickOff(root);emit(root,null,-1,false)}}
 function scan(){R=R.filter(function(r){return r.isConnected});
  A('[data-pk-picker],[data-pk-sticky]',document).forEach(function(root){if(root._pkId)return;root._pkId=++uid;R.push(root);
   var pg=page(root);if(RO&&seen.indexOf(pg)<0){seen.push(pg);RO.observe(pg)}});
  seen=seen.filter(function(p){return p.isConnected});
  R.forEach(function(root){set(root,fits(root))})}
 function sticks(f){R.forEach(function(root){if(root.isConnected&&root._pkOn&&root.hasAttribute('data-pk-sticky'))f(root)})}
 function tick(){q=0;sticks(spy)}
 function sched(){scan();if(!q)q=requestAnimationFrame(function(){requestAnimationFrame(tick)})}
 /* the lift follows the scroll in the next frame; the reading line a frame later (after the section bar has tucked) */
 window.addEventListener('scroll',function(){if(!q)q=requestAnimationFrame(function(){sticks(lift);requestAnimationFrame(tick)})},{passive:true});
 window.addEventListener('resize',sched,{passive:true});
 /* new markup (every page render) is set up before it is painted: the observer's callback runs ahead of the next frame */
 var SEL='[data-pk-picker],[data-pk-sticky]';
 function has(n){return n.nodeType===1&&(n.matches(SEL)||!!n.querySelector(SEL))}
 if(window.MutationObserver)new MutationObserver(function(M){for(var i=0;i<M.length;i++)for(var j=0;j<M[i].addedNodes.length;j++)if(has(M[i].addedNodes[j])){sched();return}}).observe(document.documentElement,{childList:true,subtree:true});
 if(document.readyState!=='loading')sched();else document.addEventListener('DOMContentLoaded',sched);
 return window.AQpk={scan:scan,on:function(root){return !!(root&&root._pkOn)},line:line,
  open:function(root,k){if(root&&root._pkOn&&root.hasAttribute('data-pk-picker'))show(root,k)},reduced:function(){return !!(rm&&rm.matches)}};
})();
