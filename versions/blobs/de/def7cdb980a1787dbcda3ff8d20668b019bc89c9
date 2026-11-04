/* Look "room-limit" -> RoomLimit (design-system/components/RoomLimit): what a site provides for a Purified Water package,
   drawn as the room it goes in. An IsoKit cutaway of a production room (two walls, floor slab, door) with the package
   on its base frame and a dash-and-dot battery-limit line on the floor round it; every connection the site provides
   (water stub, floor drain, power isolator, door, floor, the point of use) is a tie-in where its run crosses the line,
   marked by a node and a numbered square keyed to the rows. Inside the line the package's side, outside the site's.
   Desktop: title over the drawing (left) and the keyed rows (right) in three groups: the limit row, what the package
   brings, what the site provides. Pointing at or focusing a row glides a ring to its point on the drawing.
   Phones: the drawing cropped to the line and its tie-ins (the walls' empty tops cut away), the limit row, then the
   two sides as a two-column checklist of squares keyed to the drawing. With script (pass 12 round C) the crop is a
   PhoneKit sticky compact figure: held under the header while the rows pass, it zooms to the pin of the row on the
   reading line (lit as on desktop) and shows today's whole crop while the heading is read; the sides run one column
   so every row reaches the reading line on its own.
   Concept: pass 12 image 228, design-system/inspiration/gemini/228-p12-first-system-site.png (its invented row words,
   mono [placeholder] rows and title block are not used: the rows are the block's own).
   Motion idea ported from Subframe Motion "Inside the image" (atlas-hotspots), MIT, (c) 2026 Subframe: one selection
   shared by the index and the drawing; a fixed-size ring rides a full-size positioning layer to the chosen point in
   250 ms ease-out, the chosen number scales to 112 % in 180 ms; with reduced motion the ring moves at once.
   Fields: h, intro, cols ([item, what it takes, note]: read by screen readers), rows [{p, v, m, side, link, link_label,
   part}] (side "limit" | "package" | "site", default site), sides [package label, site label] (named on the floor
   inside and outside the line, desktop). seam and fold are not read. part (look-only): where the row sits on the drawing, one of line, package, panel, water,
   drain, power, door, floor, use; without one the row's words choose ("drain", "power", "door"/"way in", "water",
   "floor"/"landlord", "washer"/"bench"/"lab", "training"/"operator" -> panel), else no point. */
var RL_AT={
 /* anchor (3D, world units) and leader offset (2D) of each tie-in; the node is where its run crosses the line. The
    numbers stay within the line's width on screen, so the phone's crop to the line keeps every one of them. */
 line:{p:[60,156,0.5],d:[-22,18]},package:{p:[228,89,75],d:[-10,-58]},panel:{p:[306,74,64],d:[-20,-56]},
 water:{p:[60,120,8],d:[-10,-44]},drain:{p:[276,200,0.5],d:[-30,32]},power:{p:[277,2,50],d:[-12,-48]},
 door:{p:[342,0,86],d:[-16,-40]},floor:{p:[56,230,-3],d:[-12,22]},use:{p:[394,132,64],d:[30,-4]}};
function rlPart(r){var k=String(r&&r.part||'');if(RL_AT[k])return k;if(r&&r.side==='limit')return 'line';
 var w=String((r&&r.p||'')+' '+(r&&r.v||'')).toLowerCase();
 if(r&&r.side==='package')return /train|operator/.test(w)?'panel':'package';
 if(/drain/.test(w)&&!/landlord/.test(w))return 'drain';if(/power|voltage/.test(w))return 'power';if(/door|way in/.test(w))return 'door';
 if(/landlord|floor|lease/.test(w))return 'floor';if(/washer|bench|lab|point of use/.test(w))return 'use';if(/water|supply/.test(w))return 'water';return ''}
function rlScene(){var o=[],K='aq-room-limit',EQ='aq-iso__eq',TH='aq-iso__thin';
 function P(d,c){o.push(isoPath(d,c||EQ))}
 function dd(p){var q=[];p.forEach(function(a){var l=q[q.length-1];if(!l||Math.abs(l[0]-a[0])+Math.abs(l[1]-a[1])+Math.abs(l[2]-a[2])>1e-6)q.push(a)});return q}
 var RW=420,RD=230,WH=92,T=6,L=[60,40,340,176];
 /* floor slab, then the two back walls (cut, so their tops show the wall's thickness) */
 P(isoBoxD([0,0,-T],RW,RD,T),EQ+' '+K+'__slab');
 P(isoBoxD([-T,-T,0],T,RD+T,WH),EQ+' aq-iso__eq--alt '+K+'__wall');P(isoBoxD([0,-T,0],RW,T,WH),EQ+' aq-iso__eq--alt '+K+'__wall');
 /* coved floor line along both walls */
 P(isoPoly([[0,RD,3],[0,0,3],[RW,0,3]]),TH);
 /* door in the right-hand wall: frame, leaf, handle, and its width dimensioned on the floor (no figure) */
 var dx0=322,dx1=362,dh=86;P(isoPoly([[dx0,0,0],[dx1,0,0],[dx1,0,dh],[dx0,0,dh]],1),EQ+' '+K+'__door');
 P(isoPoly([[dx0+3,0,0],[dx0+3,0,dh-3],[dx1-3,0,dh-3],[dx1-3,0,0]]),TH);P(isoPoly([[dx1-9,0,40],[dx1-9,0,46]]),'aq-iso__ln');
 o.push(String(isoDim([dx0,0,0],[dx1,0,0],{off:[0,16,0]})).replace('class="aq-iso__dim','data-rl="door" class="aq-iso__dim'));
 /* power isolator on the wall */
 P(isoBoxD([270,0,40],14,5,18),EQ+' '+K+'__iso');P(isoPoly([[277,5,45],[277,5,53]]),'aq-iso__ln');
 /* the battery-limit line on the floor */
 o.push('<path class="'+K+'__bl" d="'+isoPoly([[L[0],L[1],0.5],[L[2],L[1],0.5],[L[2],L[3],0.5],[L[0],L[3],0.5]],1)+'"/>');
 /* floor drain outside the line */
 P(isoBoxD([266,190,0],20,20,0.8),EQ+' '+K+'__grate');P([270,274,278,282].map(function(x){return isoPoly([[x,194,0.9],[x,206,0.9]])}).join(''),TH);
 /* power: conduit down the wall and along the floor to the panel */
 o.push(isoPipe(dd([[277,3,40],[277,3,1.5],[277,56,1.5],[296,56,1.5],[296,66,1.5],[296,66,12]]),{r:1.1,wall:false,flow:false,flanges:false,caps:false,cls:K+'__cable'}));
 /* the package on its base frame: softener, carbon vessel, reverse osmosis rack, control panel */
 var z=9,sk=isoPart('skid',96,64,0,1,{w:230,d:62,id:'pkg'}),so=isoPart('softener',120,94,z,1,{id:'pkg'}),ca=isoPart('carbon',150,98,z,1,{id:'pkg'}),
  ro=isoPart('ro',172,76,z,1,{id:'pkg'}),pa=isoPart('panel',306,74,z,1,{id:'panel'});
 /* city water: stub through the left wall with its isolating valve, low over the floor, up into the softener */
 var wi=so.ports.in,w=dd([[0,120,8],[86,120,8],[86,wi[1],8],[86,wi[1],wi[2]],wi]);
 o.push(sk,pa);
 o.push(isoPipe(w,{to:'pkg',r:2,flanges:false,caps:'start'}),isoPart('valve',22,120,8,1,{r:2}));
 o.push(so,isoPipe(dd([so.ports.out,[so.ports.out[0]+4,so.ports.out[1],so.ports.out[2]],[so.ports.out[0]+4,ca.ports.in[1],so.ports.out[2]],ca.ports.in]),{to:'pkg',r:1.6,flanges:false,caps:false}),ca);
 o.push(isoPipe(dd([ca.ports.out,[ro.ports.in[0],ca.ports.out[1],ca.ports.out[2]],ro.ports.in]),{to:'pkg',r:1.6,flanges:false,caps:false}),ro);
 /* reject to the floor drain, across the line */
 var r0=[276,104,14];o.push(isoPipe(dd([r0,[276,200,14],[276,200,3]]),{to:'drain',r:1.6,flanges:false,caps:'end'}),isoArrow([276,200,8],[0,0,-1],{size:4}));
 /* product water out across the line to the point of use */
 var ou=isoPart('outlet',392,140,0,1,{id:'use',to:'use'}),u0=ro.ports.out;
 o.push(isoPipe(dd([u0,[ou.ports.in[0],u0[1],u0[2]],[ou.ports.in[0],u0[1],ou.ports.in[2]],ou.ports.in]),{to:'use',r:2,flanges:false,caps:false}),ou);
 /* tie-in nodes where the runs cross the line */
 var nodes={water:[L[0],120,8],drain:[276,L[3],14],power:[277,L[1],1.5],use:[L[2],u0[1],u0[2]]};
 return {svg:o.join(''),nodes:nodes,line:L,pts:[[-T,-T,WH],[RW,-T,WH],[RW,-T,0],[-T,RD,0],[RW,RD,-T],[-T,RD,-T],[-T,-T,0]]}}
LOOKS['room-limit']=function(b,H){var R=b.rows||[],C=b.cols||['Item','What it takes','Note'],SD=b.sides||['',''],K='aq-room-limit',sc=rlScene();
 var used={},pins=[];R.forEach(function(r,i){var k=rlPart(r);if(k&&!used[k]){used[k]=1;pins.push({i:i,k:k})}});
 function no(i){return (i<9?'0':'')+(i+1)}
 /* leaders, pin squares and the figure's bounds */
 var ends=[],lead=pins.map(function(q){var a=RL_AT[q.k],ld=isoLeader(a.p,{dx:a.d[0],dy:a.d[1]},{shelf:6});q.s=isoP(a.p);q.e=ld.end;q.left=ld.side==='left';ends.push(ld.end);
  return String(ld).replace('<g class="aq-iso__leader','<g data-r="'+q.i+'" class="aq-iso__leader')}).join('');
 var nd='';Object.keys(sc.nodes).forEach(function(k){if(!used[k])return;var p=isoP(sc.nodes[k]),r=pins.filter(function(q){return q.k===k})[0];
  nd+='<path class="'+K+'__node" data-r="'+r.i+'" d="M'+isoF(p[0])+' '+isoF(p[1]-5.5)+'L'+isoF(p[0]+5.5)+' '+isoF(p[1])+'L'+isoF(p[0])+' '+isoF(p[1]+5.5)+'L'+isoF(p[0]-5.5)+' '+isoF(p[1])+'Z"/>'});
 function grow(bx,p,mx,my){var x0=Math.min(bx.x,p[0]-mx),y0=Math.min(bx.y,p[1]-my),x1=Math.max(bx.x+bx.w,p[0]+mx),y1=Math.max(bx.y+bx.h,p[1]+my);return {x:x0,y:y0,w:x1-x0,h:y1-y0}}
 var bx=isoBounds(sc.pts,8);pins.forEach(function(q){bx=grow(bx,q.e,q.left?44:44,18)});
 var W=Math.round(bx.w),Hh=Math.round(bx.h),org=[-bx.x,-bx.y];
 /* phone crop: the line, every tie-in and its number */
 var L=sc.line,cr=isoBounds([[L[0],L[1],0],[L[2],L[1],0],[L[2],L[3],0],[L[0],L[3],0]],10);
 pins.forEach(function(q){cr=grow(cr,q.s,6,6);cr=grow(cr,[q.e[0]+(q.left?-24:24),q.e[1]],22,18)});
 /* keep the door's far jamb (the way-in tie-in) inside the crop */
 cr=grow(cr,isoP([362,0,0]),4,4);cr=grow(cr,isoP([362,0,86]),4,4);
  var pct=function(n,d){return (100*n/d).toFixed(2)+'%'};
 var crop='--rl-ar:'+(cr.w/cr.h).toFixed(4)+';--rl-w:'+pct(W,cr.w)+';--rl-x:'+pct(bx.x-cr.x,cr.w)+';--rl-y:'+pct(bx.y-cr.y,cr.h);
 var svg=isoSvg(W,Hh,sc.svg+nd+lead,K+'__svg',{origin:org});
 var sq=pins.map(function(q){var at=isoPct(q.e,W,Hh,org),pt=isoPct(q.s,W,Hh,org);
  return '<span class="aq-iso-figure__label '+(q.left?'aq-iso-figure__label--left ':'')+K+'__pin" data-r="'+q.i+'" data-k="'+q.k+'" data-x="'+pt.left+'" data-y="'+pt.top+'" style="left:'+at.left+';top:'+at.top+'" aria-hidden="true">'+no(q.i)+'</span>'}).join('');
 var lab=function(cls,p,t){var at=isoPct(isoP(p),W,Hh,org);return t?'<span class="'+K+'__lab '+cls+'" style="left:'+at.left+';top:'+at.top+'" aria-hidden="true">'+tx(t)+'</span>':''};
 var labs=lab('is-pkg',[L[0]+38,L[3]-20,0],SD[0])+lab('is-site',[L[0]+14,L[3]+30,0],SD[1]);
 var fig='<figure class="aq-iso-figure '+K+'__fig" data-pk-fig style="'+crop+'"><div class="'+K+'__pan">'+svg+sq+labs+'<span class="'+K+'__ringl" aria-hidden="true"><span class="'+K+'__ring"></span></span></div></figure>';
 var pinOf={};pins.forEach(function(q){pinOf[q.i]=1});
 function item(r,i,tag){var lk=r.link&&wp(r.link)?'<a class="'+K+'__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':'';
  return '<'+tag+' class="'+K+'__item'+(r.side==='limit'?' is-limit':'')+'" data-r="'+i+'" data-pk-row="'+i+'"'+(pinOf[i]?' tabindex="0"':'')+'>'
   +'<span class="'+K+'__no'+(pinOf[i]?'':' is-free')+'" aria-hidden="true">'+no(i)+'</span>'
   +'<h3 class="'+K+'__p">'+tx(r.p)+'</h3>'
   +'<p class="'+K+'__v"><span class="'+K+'__sr">'+tx(C[1]||'')+': </span>'+tx(r.v)+'</p>'
   +(r.m?'<p class="'+K+'__m"><span class="'+K+'__sr">'+tx(C[2]||'')+': </span>'+tx(r.m)+'</p>':'')
   +(lk?'<p class="'+K+'__go">'+lk+'</p>':'')+'</'+tag+'>'}
 var lim='',pk='',st='';R.forEach(function(r,i){if(r.side==='limit'&&!lim)lim=item(r,i,'div');else if(r.side==='package')pk+=item(r,i,'li');else st+=item(r,i,'li')});
 var list='<div class="'+K+'__rows">'+lim
  +(pk?(SD[0]?'<p class="'+K+'__side is-pkg">'+tx(SD[0])+'</p>':'')+'<ol class="'+K+'__list is-pkg" role="list">'+pk+'</ol>':'')
  +(st?(SD[1]?'<p class="'+K+'__side is-site">'+tx(SD[1])+'</p>':'')+'<ol class="'+K+'__list is-site" role="list">'+st+'</ol>':'')+'</div>';
 return sec('<div class="'+K+'" data-pk-sticky data-pk-h="180"><div class="'+K+'__head" data-pk-row="h">'+H+'</div>'+fig+list+'</div>',K+'-sec')};
/* One selection shared by the rows and the drawing (atlas-hotspots): pointing at or focusing a row glides the ring to
   its point and lights its number, leader and node; leaving the section clears it. */
function rlPick(root,i){if(!root)return;var on=i!=null&&i!=='';
 [].forEach.call(root.querySelectorAll('.is-rl'),function(el){el.classList.remove('is-rl')});
 var pin=on?root.querySelector('.aq-room-limit__pin[data-r="'+i+'"]'):null,lay=root.querySelector('.aq-room-limit__ringl');
 if(!pin){root.removeAttribute('data-rl');return}
 [].forEach.call(root.querySelectorAll('[data-r="'+i+'"]'),function(el){el.classList.add('is-rl')});
 if(lay){lay.style.setProperty('--rl-rx',pin.getAttribute('data-x'));lay.style.setProperty('--rl-ry',pin.getAttribute('data-y'))}
 root.setAttribute('data-rl',pin.getAttribute('data-k'))}
window.rlPick=rlPick;
(function(){function hit(ev){return ev.target.closest&&ev.target.closest('.aq-room-limit__item[tabindex], .aq-room-limit__pin')}
 /* on phones (PhoneKit on) the strip owns the selection: a tap or focus never splits the lit row from the zoom */
 function over(ev){var t=hit(ev);if(!t)return;var root=t.closest('.aq-room-limit');if(!root||root.hasAttribute('data-pk-on'))return;rlPick(root,t.getAttribute('data-r'))}
 function out(ev){var t=hit(ev);if(!t||t.contains(ev.relatedTarget))return;var root=t.closest('.aq-room-limit');if(!root||root.hasAttribute('data-pk-on'))return;var n=ev.relatedTarget&&ev.relatedTarget.closest&&ev.relatedTarget.closest('.aq-room-limit__item[tabindex], .aq-room-limit__pin');
  if(!n||!root.contains(n))rlPick(root,null)}
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);document.addEventListener('mouseout',out);document.addEventListener('focusout',out);
})();
/* Phones (PhoneKit sticky figure on): the row on the reading line is chosen as on desktop (its pin, leader, node and
   row light, the ring rides to it) and the drawing zooms so that pin and its tie-in sit mid-strip at 1.6x, kept
   inside the drawing; while the heading is read (row "h") or PhoneKit is off, the crop is today's, unzoomed. The
   transform lives on the pan layer (--rl-zx/zy/zs), so PhoneKit's lift transform on the strip stays free. */
(function(){var Z=1.6;
 function zoom(root,i){var fig=root.querySelector('.aq-room-limit__fig'),pan=fig&&fig.querySelector('.aq-room-limit__pan'),pin=i!=null&&root.querySelector('.aq-room-limit__pin[data-r="'+i+'"]');
  if(!pan||!pin){['--rl-zx','--rl-zy','--rl-zs'].forEach(function(v){root.style.removeProperty(v)});return}
  var pw=pan.offsetWidth,ph=pan.offsetHeight,ox=pan.offsetLeft,oy=pan.offsetTop,fw=fig.clientWidth,fh=fig.clientHeight;if(!pw||!fw)return;
  /* aim between the pin's square (the leader's end) and its tie-in point, so both stay in the strip */
  var lx=parseFloat(pin.style.left)/100,ly=parseFloat(pin.style.top)/100,px=parseFloat(pin.getAttribute('data-x'))/100,py=parseFloat(pin.getAttribute('data-y'))/100;
  var cx=(lx+px)/2*pw,cy=(ly+py)/2*ph,x=fw/2-ox-Z*cx,y=fh/2-oy-Z*cy;
  x=Math.min(-ox,Math.max(fw-ox-Z*pw,x));y=Math.min(-oy,Math.max(fh-oy-Z*ph,y));
  root.style.setProperty('--rl-zs',String(Z));root.style.setProperty('--rl-zx',Math.round(x)+'px');root.style.setProperty('--rl-zy',Math.round(y)+'px')}
 document.addEventListener('pk:change',function(ev){var root=ev.target;if(!root||!root.classList||!root.classList.contains('aq-room-limit'))return;
  var d=ev.detail||{},k=d.on&&d.key!=='h'?d.key:null;rlPick(root,k);zoom(root,k)});
})();
