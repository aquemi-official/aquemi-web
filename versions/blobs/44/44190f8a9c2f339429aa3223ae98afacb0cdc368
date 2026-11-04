/* Look "limit-plan" -> LimitPlan (design-system/components/LimitPlan): what a site provides before the package arrives,
   as a battery-limits plan. An IsoKit drawing of the package's footprint (base frame, reverse osmosis rack with its
   local panel) inside a dashed battery-limit line drawn on the floor, with the site's side outside it: the feed and the
   drain crossing the line, the product line leaving through a field joint to a tie-in valve on the plant's header, the
   power feed through an isolator, the tag plate on the rack's panel, the footprint dimension. A numbered square node sits on
   each connection (on the line wherever the connection crosses it), and each node is keyed to the row of the same
   number beside the drawing. Pointing at a row or a node lights both, the drawing's matching parts turn flow and a ring
   glides to the node (ported from Subframe Motion "Inside the image", atlas-hotspots, MIT, (c) 2026 Subframe).
   Concept: pass 12 image 220 (its nodes repeat and its plan is a generic box skid; here one node per row).
   Fields (a spec block): h, intro, cols [item, typical, note], rows [{p, v, m, link, link_label, at}]. Look-only:
   rows[].at names the connection a row is keyed to: limit | footprint | utilities | joint | tag | tiein | isolation
   (default: that order, row by row); a row whose at is unknown or "none" gets no node. Values written "a · b" break
   into lines. fold and fold_noun are not read: every row shows (S7, the drawing points at every row).
   Phones (<= 860 px): a PhoneKit sticky compact figure (S8): the plan is a 200 px strip held under the section bar,
   panned and zoomed (1.6) to the node of the row being read, and every row stays open under it (number and item, the
   typical value, the note, the link at 44 px); the row on the reading line lights its node and its parts. */
LOOKS['limit-plan']=(function(){
 var KEYS=['limit','footprint','utilities','joint','tag','tiein','isolation'];
 var X0=-40,X1=180,Y0=-24,Y1=96;
 function g(k,inner,cls){return '<g class="aq-limit-plan__g'+(cls?' '+cls:'')+'" data-lp="'+k+'">'+inner+'</g>'}
 function poly(pts,cls,close){return '<path class="'+cls+'" d="'+isoPoly(pts,close)+'"/>'}
 function cyl(c,ax,L,r){var d=isoCylD(c,ax,L,r);return '<path class="aq-iso__eq" d="'+d[0]+d[1]+'"/>'}
 function box(o,w,d,h){return '<path class="aq-iso__eq" d="'+isoBoxD(o,w,d,h)+'"/>'}
 /* the scene, back to front; returns the svg and each node's place (2D, in viewBox units) */
 function scene(){
  var P={},inner=[],rect=[[X0,Y0,0],[X1,Y0,0],[X1,Y1,0],[X0,Y1,0]];
  /* the battery limit on the floor, the package's floor tinted inside it */
  inner.push(g('limit',poly(rect,'aq-limit-plan__floor',1)+poly(rect,'aq-limit-plan__line',1)));
  P.limit={p:isoP(X0,Y1,0)};
  /* power: from the site, through the isolator standing on the line, to the rack. The cable is a utility (row 03);
     the isolator on the line is the isolation point (row 07) */
  var yi=22;
  inner.push(g('utilities',poly([[X0-34,yi,30],[X0-4,yi,30]],'aq-limit-plan__cable')+poly([[X0+4,yi,30],[8,yi,30]],'aq-limit-plan__cable')));
  inner.push(g('isolation',box([X0-1.4,yi-1.4,0],2.8,2.8,22)+box([X0-4,yi-6,22],8,12,15)
   +'<path class="aq-iso__acc" d="'+isoPoly([[X0+4,yi+2,33],[X0+4,yi+2,26]])+'"/>'));
  P.isolation={p:isoP(X0,yi,30)};
  /* base frame and reverse osmosis rack */
  inner.push(g('footprint',isoPart('skid',0,0,0,1,{w:150,d:62})));
  var ro=isoPart('ro',8,8,9,1,{});inner.push(ro);
  /* the tag plate, on the rack's local panel under its screen */
  inner.push(g('tag',poly([[80,38,35],[94,38,35],[94,38,43],[80,38,43]],'aq-limit-plan__plate',1)+poly([[82,38,39],[92,38,39]],'aq-limit-plan__cable')));
  P.tag={p:isoP(87,38,39)};
  /* the footprint dimension along the frame's front */
  var dim=isoDim([0,62,0],[150,62,0],{off:[0,18,0]});inner.push(g('footprint',dim));
  P.footprint={p:dim.mid};
  /* feed water in across the line; drain out across it to a floor gully */
  var inn=ro.ports.in,fx=inn[0]-12,feed=isoPipe([[fx,Y1+28,inn[2]],[fx,inn[1],inn[2]],inn],{caps:'start'});
  var drn=isoPipe([[136,56,5],[136,Y1+22,5]],{r:1.8,caps:'end'});
  inner.push(g('utilities',feed+drn+isoArrow([fx,Y1+14,inn[2]],'-y')+isoArrow([136,Y1+10,5],'y')
   +'<path class="aq-iso__eq" d="'+isoRingD([136,Y1+26,0],'z',5)+'"/>'
   +'<path class="aq-iso__hid" d="'+isoPoly([[fx,Y1,0],[fx,Y1,inn[2]-2.4]])+'"/>'));
  P.utilities={p:isoP(fx,Y1,0)};
  /* product out: through the field joint on the line, the tie-in valve, into the plant's header */
  var out=ro.ports.out,z=out[2],y=out[1],hx=X1+46,vx=X1+26;
  inner.push(isoPipe([out,[vx-7,y,z]],{}));
  inner.push(g('joint','<path class="aq-iso__hid" d="'+isoPoly([[X1,y,0],[X1,y,z-4]])+'"/>'+cyl([X1-2.2,y,z],'x',1.4,4)+cyl([X1+0.8,y,z],'x',1.4,4)));
  P.joint={p:isoP(X1,y,z)};
  inner.push(g('tiein',isoPart('valve',vx,y,z,1,{})+isoPipe([[vx+7.5,y,z],[hx,y,z]],{caps:false})
   +isoPipe([[hx,Y0-20,z],[hx,Y1+6,z]],{r:3.4,flow:false,caps:true,cls:'aq-limit-plan__header'})));
  P.tiein={p:isoP(vx,y,z+15)};
  var bx=isoBounds([[X0-36,yi,34],[X0,Y1,0],[X1,Y0,0],[hx+4,Y0-20,z+4],[hx,Y1+8,z-4],[136,Y1+32,0],[8,8,75],[120,8,75],[X1,Y1,0]],16);
  var W=Math.round(bx.w),H=Math.round(bx.h),org=[-bx.x,-bx.y];
  return {svg:isoSvg(W,H,inner.join(''),'aq-limit-plan__svg',{origin:org}),W:W,H:H,org:org,P:P}}
 /* nodes sit on their connection; where two would crowd, a short leader takes the square off the drawing */
 var OFF={limit:[0,0],footprint:[0,0],utilities:[0,0],joint:[-6,24],tag:[-30,-8],tiein:[4,-22],isolation:[0,-26]};
 return function(b,H){var C=b.cols||[],R=(b.rows||[]).map(function(r){return Array.isArray(r)?{p:r[0],v:r[1],m:r[2]}:r}),n=R.length;
  var S=scene(),nn=function(i){return (i<9?'0':'')+(i+1)},used={};
  var at=R.map(function(r,i){var k=r.at||KEYS[i];return KEYS.indexOf(k)>=0&&!used[k]?(used[k]=1,k):''});
  var ix={};at.forEach(function(k,i){if(k)ix[k]=i});
  var pk=function(k){return ix[k]!=null?' data-pk-key="'+ix[k]+'"':''};
  var leads='',nodes='';
  at.forEach(function(k,i){if(!k)return;var p=S.P[k].p,o=OFF[k]||[0,0],q=[p[0]+o[0],p[1]+o[1]];
   if(o[0]||o[1])leads+='<path class="aq-limit-plan__lead" data-lp="'+k+'"'+pk(k)+' d="M'+isoT(p)+'L'+isoT(q)+'"/><circle class="aq-limit-plan__dot" data-lp="'+k+'"'+pk(k)+' cx="'+isoF(p[0])+'" cy="'+isoF(p[1])+'" r="1.8"/>';
   var c=isoPct(q,S.W,S.H,S.org);
   nodes+='<span class="aq-limit-plan__node" data-at="'+k+'"'+pk(k)+' style="left:'+c.left+';top:'+c.top+'">'+nn(i)+'</span>'});
  var svg=S.svg.replace(/ data-lp="(\w+)">/g,function(x,k){return ' data-lp="'+k+'"'+pk(k)+'>'}).replace(/<\/g><\/svg>$/,leads+'</g></svg>');
  var rows=R.map(function(r,i){var V=String(r.v||'').split(/\s+·\s+/).filter(Boolean),go=r.link&&wp(r.link),k=at[i];
   return '<li class="aq-limit-plan__row"'+(k?' data-at="'+k+'"':'')+' data-pk-row="'+i+'" style="--i:'+i+'">'
    +'<span class="aq-limit-plan__no'+(k?'':' is-plain')+'" aria-hidden="true">'+nn(i)+'</span>'
    +'<div class="aq-limit-plan__t"><h3 class="aq-limit-plan__p">'+tx(r.p)+'</h3></div>'
    +'<div class="aq-limit-plan__c"><p class="aq-limit-plan__k">'+tx(C[1]||'')+'</p><ul class="aq-limit-plan__v" role="list">'+V.map(function(x){return '<li>'+tx(x)+'</li>'}).join('')+'</ul>'
    +(r.m?'<p class="aq-limit-plan__m"><span class="aq-limit-plan__k">'+tx(C[2]||'')+': </span>'+tcell(r.m)+'</p>':'')
    +(go?'<p class="aq-limit-plan__go">'+wlink(r.link,r.link_label)+'</p>':'')+'</div>'
    +'</li>'}).join('');
  var head='<div class="aq-limit-plan__head" aria-hidden="true"><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span></div>';
  return sec(H+'<div class="aq-limit-plan" data-pk-sticky data-pk-h="200" data-pk-zoom="1.6"><figure class="aq-limit-plan__fig" aria-hidden="true" data-pk-fig><div class="aq-limit-plan__plan" data-pk-pan style="--lp-ar:'+S.W+' / '+S.H+';--lp-r:'+(S.W/S.H).toFixed(3)+'">'+nodes+svg
   +'<span class="aq-limit-plan__ring"></span></div></figure>'
   +'<div class="aq-limit-plan__table">'+head+'<ol class="aq-limit-plan__list" role="list">'+rows+'</ol></div></div>','aq-limit-plan-sec')}})();
/* Pointing at (or focusing) a row or a node, or the row on the reading line on a phone (PhoneKit sticky figure), lights that connection: its node, its row,
   the drawing's parts for it, and the ring glides to the node (CSS transition; none under reduced motion). */
(function(){
 function set(root,k){if(!root)return;if(root.getAttribute('data-lp-on')===(k||''))return;
  if(k)root.setAttribute('data-lp-on',k);else root.removeAttribute('data-lp-on');
  [].forEach.call(root.querySelectorAll('[data-at],[data-lp]'),function(el){var a=el.getAttribute('data-at')||el.getAttribute('data-lp');el.classList.toggle('is-on',!!k&&a===k)});
  var ring=root.querySelector('.aq-limit-plan__ring'),node=k&&root.querySelector('.aq-limit-plan__node[data-at="'+k+'"]');
  if(ring){if(node){ring.style.left=node.style.left;ring.style.top=node.style.top;ring.classList.add('is-on')}else ring.classList.remove('is-on')}}
 function key(t){var el=t&&t.closest&&t.closest('.aq-limit-plan__row[data-at],.aq-limit-plan__node[data-at]');return el?el.getAttribute('data-at'):''}
 function phone(root){return root.hasAttribute('data-pk-on')}
 function over(ev){var root=ev.target.closest&&ev.target.closest('.aq-limit-plan');if(!root||phone(root))return;set(root,key(ev.target))}
 function out(ev){var root=ev.target.closest&&ev.target.closest('.aq-limit-plan');if(!root||phone(root))return;if(!root.contains(ev.relatedTarget))set(root,'')}
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);document.addEventListener('mouseout',out);document.addEventListener('focusout',out);
 document.addEventListener('pk:change',function(ev){var root=ev.target.closest&&ev.target.closest('.aq-limit-plan');if(!root)return;var d=ev.detail||{};
  if(!d.on||d.index<0){set(root,'');return}
  var li=root.querySelectorAll('.aq-limit-plan__row')[+d.key];set(root,li?li.getAttribute('data-at')||'':'')});
})();
