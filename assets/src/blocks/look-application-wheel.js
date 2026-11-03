/* Look "application-wheel" -> ApplicationWheel (design-system/components/ApplicationWheel): where one water goes, as
   an application wheel. One Purified Water package (IsoKit line art) sits in the hub inside its loop ring; round it
   the wheel splits into one numbered segment per group. Each group's block stands beside its segment (three right,
   three left, clockwise from the top right): number, name (the link to its page), its limit tag, and its plant words
   (the uses) as a numbered list. A hairline leader runs from each block into its segment. Pointing at a block (or
   its segment) lights both.
   Concept: design-system/inspiration/gemini/191-p12-industries-map.png (idea only: no copy, numbers or labels).
   Fields (a grid block): h, intro, items [{t, tag, link, d}]. d is the list of uses, split into plant words at
   commas and semicolons (a final period dropped). Best for six groups (four to eight draw; the side columns take
   half each).
   Phones: the wheel (package in its ring, segment numbers) on top, a riser down the middle from it, and the groups
   as a two-column grid branching off the riser; names are 44 px links. At 600 px and under (pass 12 round C) the wheel
   is a PhoneKit sticky compact figure instead: a 140 px strip (the wheel and the name of the group in view) held under
   the header, lighting the segment whose list is on the reading line, over the groups in one column; tapping the
   wheel scrolls to the group of the segment tapped. */
function awUses(d){var s=String(d||'').replace(/\.\s*$/,''),P=s.split(/\s*[,;]\s*/).filter(Boolean);
 /* a sentence with a comma is not a list: split only when every piece reads as a use (six words or fewer) */
 if(P.some(function(x){return x.split(/\s+/).length>6}))P=s?[s]:[];
 return P.map(function(x){return x.charAt(0).toUpperCase()+x.slice(1)})}
function awArc(cx,cy,r0,r1,a0,a1){var R=Math.PI/180,p=function(r,a){return (cx+r*Math.cos(a*R)).toFixed(1)+' '+(cy+r*Math.sin(a*R)).toFixed(1)},lg=a1-a0>180?1:0;
 return 'M'+p(r1,a0)+'A'+r1+' '+r1+' 0 '+lg+' 1 '+p(r1,a1)+'L'+p(r0,a1)+'A'+r0+' '+r0+' 0 '+lg+' 0 '+p(r0,a0)+'Z'}
/* the package in the hub: a base frame with a media filter, the RO rack's pump side and the storage tank, piped */
function awPackage(){var sk=isoPart('skid',0,0,0,1,{w:118,d:56}),z=9;
 var fi=isoPart('filter',20,22,z,1,{r:10,h:50}),ta=isoPart('tank',84,28,z,1,{}),pu=isoPart('pump',50,40,z,0.9,{});
 var p1=isoPipe([fi.ports.out,[fi.ports.out[0]+10,fi.ports.out[1],fi.ports.out[2]],[pu.ports.in[0],fi.ports.out[1],pu.ports.in[2]],pu.ports.in].filter(function(p,i,a){return !i||String(p)!==String(a[i-1])}),{r:1.8,flanges:false,caps:false});
 var p2=isoPipe([pu.ports.out,[pu.ports.out[0],pu.ports.out[1],ta.ports.in[2]+8],[ta.ports.in[0],pu.ports.out[1],ta.ports.in[2]+8],[ta.ports.in[0],ta.ports.in[1],ta.ports.in[2]+8],ta.ports.in],{r:1.8,flanges:false,caps:false});
 var inner=[sk,fi,p1,pu,p2,ta].join(''),bx=isoBounds([[0,0,0],[118,0,0],[0,56,0],[118,56,0],[20,22,z+70],[84,28,z+82],[118,0,z+40]],6);
 return isoSvg(bx.w,bx.h,inner,'aq-application-wheel__pkg',{origin:[-bx.x,-bx.y]})}
LOOKS['application-wheel']=function(b,H){var I=(b.items||[]).slice(0,8),n=I.length,K='aq-application-wheel',half=Math.ceil(n/2);
 if(!n)return sec(H,K+'-sec');
 /* segment i is centred at -90 + (i + 0.5) * 360/n degrees: clockwise from the top; the right column takes the first
    half top to bottom, the left column the rest bottom to top */
 var step=360/n,C=200,R1=190,R0=118,gap=1.4,segs='',nums='';
 I.forEach(function(it,i){var a0=-90+i*step+gap,a1=-90+(i+1)*step-gap,am=(a0+a1)/2*Math.PI/180,rm=(R0+R1)/2;
  var go=it.link&&wp(it.link)?' data-wp="'+e(it.link)+'"':'';
  segs+='<g class="'+K+'__seg" data-i="'+i+'" data-pk-key="'+i+'"'+go+'><path d="'+awArc(C,C,R0,R1,a0,a1)+'"/></g>';
  nums+='<text class="'+K+'__num" x="'+(C+rm*Math.cos(am)).toFixed(1)+'" y="'+(C+rm*Math.sin(am)).toFixed(1)+'" data-i="'+i+'" data-pk-key="'+i+'">'+(i<9?'0':'')+(i+1)+'</text>'});
 var pkg=awPackage().replace('<svg ','<svg x="'+(C-90)+'" y="'+(C-78)+'" width="180" height="156" ');
 /* the phone strip's readout: the name of the group in view beside the wheel (PhoneKit lights one; hidden elsewhere) */
 var now='<ol class="'+K+'__now">'+I.map(function(it,i){return '<li data-pk-key="'+i+'"><span class="'+K+'__now-n">'+(i<9?'0':'')+(i+1)+'</span>'+tx(it.t)+'</li>'}).join('')+'</ol>';
 var wheel='<div class="'+K+'__wheel" aria-hidden="true" data-pk-fig><svg class="'+K+'__svg" viewBox="0 0 400 400" focusable="false">'
  +'<circle class="'+K+'__disc" cx="'+C+'" cy="'+C+'" r="'+R1+'"/>'+segs+nums
  +'<circle class="'+K+'__hub" cx="'+C+'" cy="'+C+'" r="'+(R0-8)+'"/><circle class="'+K+'__loop" cx="'+C+'" cy="'+C+'" r="'+(R0-16)+'"/>'
  +pkg+'</svg>'+now+'</div>';
 var groups=I.map(function(it,i){var right=i<half,row=right?i+1:n-i,uses=awUses(it.d),num=(i<9?'0':'')+(i+1);
  var name=it.link&&wp(it.link)?'<a class="'+K+'__link" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.t)+'</a>':tx(it.t);
  return '<li class="'+K+'__grp '+K+'__grp--'+(right?'r':'l')+'" data-i="'+i+'" data-pk-row="'+i+'" style="--row:'+row+'">'
   +'<p class="'+K+'__n" aria-hidden="true">'+num+'</p><h3 class="'+K+'__t">'+name+'</h3>'
   +(it.tag?'<p class="'+K+'__tag">'+tx(it.tag)+'</p>':'')
   +(uses.length?'<ul class="'+K+'__uses">'+uses.map(function(u,j){return '<li><span class="'+K+'__ui" aria-hidden="true">'+num+'.'+(j+1)+'</span>'+tx(u)+'</li>'}).join('')+'</ul>':'')
   +'</li>'}).join('');
 return sec(H+'<div class="'+K+'" style="--n:'+n+';--rows:'+half+'" data-pk-sticky data-pk-h="140" data-pk-bp="600" data-aw-r0="'+R0+'" data-aw-r1="'+R1+'"><svg class="'+K+'__leads" aria-hidden="true" focusable="false"></svg>'+wheel+'<ol class="'+K+'__list" role="list">'+groups+'</ol></div>',K+'-sec')};
/* Pointing at a segment lights its group, and the other way round (the CSS :has rules light the segment from a block) */
(function(){function hot(ev,on){var s=ev.target.closest&&ev.target.closest('.aq-application-wheel__seg,.aq-application-wheel__grp');if(!s)return;
  var r=s.closest('.aq-application-wheel'),i=s.getAttribute('data-i');if(!r)return;
  [].forEach.call(r.querySelectorAll('[data-i="'+i+'"]'),function(el){el.classList.toggle('is-hot',on)})}
 document.addEventListener('mouseover',function(ev){hot(ev,true)});document.addEventListener('mouseout',function(ev){hot(ev,false)});
 document.addEventListener('focusin',function(ev){hot(ev,true)});document.addEventListener('focusout',function(ev){hot(ev,false)})})();
/* Phone strip (PhoneKit on): tapping the wheel scrolls to the group of the segment under the finger, measured by angle
   from the wheel's centre so every sector, hub included, is a large target; on a phone a segment's own data-wp page
   jump stands down (the group's name is the link to its page). */
(function(){window.addEventListener('click',function(ev){var sv=ev.target.closest&&ev.target.closest('.aq-application-wheel__svg');if(!sv)return;
  var r=sv.closest('.aq-application-wheel');if(!r||!r.hasAttribute('data-pk-on'))return;
  var G=r.querySelectorAll('.aq-application-wheel__grp'),n=G.length,b=sv.getBoundingClientRect();if(!n||!b.width)return;
  ev.preventDefault();ev.stopPropagation();
  var a=Math.atan2(ev.clientY-(b.top+b.height/2),ev.clientX-(b.left+b.width/2))*180/Math.PI,i=Math.floor((((a+90)%360+360)%360)/(360/n))%n;
  /* an explicit offset: the strip's height, plus the section bar's when the jump goes up (the bar comes back on an
     upward scroll and pushes the strip down), so the group's title lands clear of both */
  var g=G[i],gt=g.getBoundingClientRect().top,bar=document.querySelector('.aq-section-nav'),fig=r.querySelector('[data-pk-fig]');
  var off=(fig?fig.offsetHeight:0)+(gt<0&&bar?bar.getBoundingClientRect().height:0)+16;
  window.scrollTo({top:gt+window.scrollY-off,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})},true)})();
/* Phone strip: the readout beside the wheel names the group in view only once that group's title has gone under the
   strip; while the title still shows below it, the readout steps back (data-aw-fresh), so a name never prints twice
   on one screen (round C verify N7). */
(function(){var q=0;function run(){q=0;[].forEach.call(document.querySelectorAll('.aq-application-wheel[data-pk-on]'),function(r){
   var f=r.querySelector('[data-pk-fig]'),a=r.getAttribute('data-pk-active'),g=a!=null&&r.querySelector('.aq-application-wheel__grp[data-i="'+a+'"] .aq-application-wheel__t');
   if(!f||!g){r.removeAttribute('data-aw-fresh');return}
   var fresh=g.getBoundingClientRect().top>=f.getBoundingClientRect().bottom-4;if(fresh!==r.hasAttribute('data-aw-fresh'))r.toggleAttribute('data-aw-fresh',fresh)})}
 function ask(){if(!q)q=requestAnimationFrame(run)}
 window.addEventListener('scroll',ask,{passive:true});window.addEventListener('resize',ask);document.addEventListener('pk:change',ask)})();
/* Leaders: one path per group, from the middle of the block's inner edge, level towards the wheel, then angled into the
   rim of its segment (at the segment's middle). Measured, so any block height works; redrawn on resize. Desktop only
   (the phone CSS hides the layer). */
(function(){var RO=window.ResizeObserver?new ResizeObserver(function(E){E.forEach(function(x){awLead(x.target)})}):null;
 function awLead(r){var sv=r.querySelector('.aq-application-wheel__leads'),wh=r.querySelector('.aq-application-wheel__svg');if(!sv||!wh)return;
  var rb=r.getBoundingClientRect(),wb=wh.getBoundingClientRect();if(!rb.width||getComputedStyle(sv).display==='none'){sv.innerHTML='';return}
  var k=wb.width/400,cx=wb.left-rb.left+200*k,cy=wb.top-rb.top+200*k,R=(+r.getAttribute('data-aw-r1')||190)*k,G=[].slice.call(r.querySelectorAll('.aq-application-wheel__grp')),n=G.length,out='';
  sv.setAttribute('viewBox','0 0 '+rb.width.toFixed(1)+' '+rb.height.toFixed(1));sv.setAttribute('width',rb.width.toFixed(1));sv.setAttribute('height',rb.height.toFixed(1));
  G.forEach(function(g,i){var b=g.getBoundingClientRect(),right=g.classList.contains('aq-application-wheel__grp--r'),dir=right?1:-1;
   var sx=(right?b.left:b.right)-rb.left,sy=b.top-rb.top+b.height/2,a=(-90+(i+0.5)*360/n)*Math.PI/180,px=cx+R*Math.cos(a),py=cy+R*Math.sin(a);
   var run=Math.abs(sy-py)*0.58,ex=px+dir*Math.min(run,Math.abs(sx-px));if(dir*(sx-ex)<0)ex=sx;
   out+='<g class="aq-application-wheel__lead" data-i="'+i+'"><path d="M'+sx.toFixed(1)+' '+sy.toFixed(1)+'H'+ex.toFixed(1)+'L'+px.toFixed(1)+' '+py.toFixed(1)+'"/>'
    +'<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="3"/></g>'});
  sv.innerHTML=out;if(g0(r))[].forEach.call(sv.querySelectorAll('.aq-application-wheel__lead[data-i="'+g0(r)+'"]'),function(el){el.classList.add('is-hot')})}
 function g0(r){var h=r.querySelector('.aq-application-wheel__grp.is-hot');return h?h.getAttribute('data-i'):null}
 function scan(){[].forEach.call(document.querySelectorAll('.aq-application-wheel'),function(r){if(!r._aw){r._aw=1;if(RO)RO.observe(r)}awLead(r)})}
 window.awLead=awLead;
 if(window.MutationObserver)new MutationObserver(function(M){for(var i=0;i<M.length;i++)for(var j=0;j<M[i].addedNodes.length;j++){var a=M[i].addedNodes[j];
  if(a.nodeType===1&&(a.classList.contains('aq-application-wheel')||a.querySelector('.aq-application-wheel'))){requestAnimationFrame(scan);return}}}).observe(document.documentElement,{childList:true,subtree:true});
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(scan);
 if(document.readyState!=='loading')scan();else document.addEventListener('DOMContentLoaded',scan);
})();
