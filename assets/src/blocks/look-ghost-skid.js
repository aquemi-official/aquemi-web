/* Look "ghost-skid" -> GhostSkid (design-system/components/GhostSkid): a system's configuration options drawn where they
   would go on the base skid. Pass 12 concept 223 (design-system/inspiration/gemini/223-p12-sys-pw-options.png): the
   base Purified Water skid (RO rack, EDI stack, panel, product and reject lines on one frame) drawn solid in IsoKit line
   art on the limestone band, and every option a dashed "ghost" (the drawing convention for optional) clipped on at its
   place, numbered to a ruled list of the options beside it. Pointing at or focusing an option fills its ghost with
   flow and sets its dashes running; the tag on the drawing lights with it.
   Fields (an options block): h, intro, items [{t, d, part, link, link_label}], fold, fold_noun (not read: every option
   shows, the tags on the drawing point at them).
   part (look-only): the ghost an option draws: degasser (membrane contactors on the RO to EDI line), duplex (a second
   train on its own frame beside the base), recirc (a return line from the outlet back to the RO feed), polish (a UV or
   UF unit on the product line after EDI), recovery (a concentrate RO housing on the reject line). Default by position
   in that order. An unknown part draws no ghost (the option still lists).
   Phones (<= 860 px): the drawing at full width with its tags, then the options as a swipe row of tag cards
   (scroll-snap, the next card peeking); the card in view lights its ghost. */
(function(){
var K='aq-ghost-skid',PARTS=['degasser','duplex','recirc','polish','recovery'];
function dd(p){var o=[];p.forEach(function(q){var l=o[o.length-1];if(l&&Math.abs(l[0]-q[0])+Math.abs(l[1]-q[1])+Math.abs(l[2]-q[2])<1e-6)return;o.push(q)});return o}
function cyl(c,ax,L,r){var d=isoCylD(c,ax,L,r);return isoPath(d[0]+d[1],'aq-iso__eq')}
function g(k,i,inner){return '<g class="'+K+'__ghost" data-ghost="'+k+'" data-r="'+i+'">'+inner+'</g>'}
function scene(want){var z=9,DW=236,DD=108,A={},back='',front='';
 var ro=isoPart('ro',10,6,z,1,{id:'ro'}),pa=isoPart('panel',204,22,z,1,{id:'panel'}),ed=isoPart('edi',150,62,z,1,{id:'edi'});
 var pi=ro.ports.in,a=ro.ports.out,b2=ed.ports.in,mx=a[0]+10,out=ed.ports.out,fy=100;
 /* the base: feed stub into the RO pump, permeate to EDI, product out along the front, reject to drain */
 var feed=isoPipe(dd([[-26,pi[1],pi[2]],pi]),{r:2,flanges:'ends',caps:'start'});
 var perm=isoPipe(dd([a,[mx,a[1],a[2]],[mx,b2[1],a[2]],[mx,b2[1],b2[2]],b2]),{r:1.8,to:'edi',flanges:false,caps:false});
 var prod=isoPipe(dd([out,[out[0]+8,out[1],out[2]],[out[0]+8,fy,out[2]],[DW+26,fy,out[2]]]),{r:2,flanges:'ends',caps:'end'});
 var r0=[118,30,z+5],rej=isoPipe(dd([r0,[r0[0],DD+10,z+5],[r0[0],DD+10,-18]]),{r:1.6,flanges:false,caps:'end'});
 var base=[isoPart('skid',0,0,0,1,{w:DW,d:DD,id:'frame'}),ro,pa,feed,perm,ed,prod,rej,isoArrow([r0[0],DD+10,-10],[0,0,-1],{size:4}),isoArrow([DW+14,fy,out[2]],'x',{size:4}),isoArrow([-14,pi[1],pi[2]],'x',{size:4})].join('');
 /* the ghosts (only those an option asks for) */
 var G={};
 G.duplex=function(i){var sk=isoPart('skid',0,-58,0,1,{w:132,d:46}),r2=isoPart('ro',10,-52,z,1,{});
  A.duplex={p:[66,-46,z+66],d:[-30,-40]};back+=g('duplex',i,sk+r2+isoPipe(dd([[-26,-52+42,15],[0,-10,15]]),{r:1.8,flow:false,flanges:false,caps:'start'}))};
 G.recirc=function(i){var x0=DW-6,zt=86,ret=isoPipe(dd([[x0,fy,out[2]],[x0,fy,zt],[x0,-4,zt],[-12,-4,zt],[-12,pi[1],zt],[-12,pi[1],pi[2]+4]]),{r:1.6,flow:false,flanges:false,caps:false});
  A.recirc={p:[DW-21,-4,zt],d:[30,-22]};back+=g('recirc',i,ret)};
 G.degasser=function(i){var x=92,y=56,s='';[0,10].forEach(function(dx){s+=cyl([x+dx,y,z],'z',4,7)+cyl([x+dx,y,z+4],'z',34,4.6)+isoPath(isoBandD([x+dx,y,z+12],'z',4.6)+isoBandD([x+dx,y,z+30],'z',4.6),'aq-iso__thin')});
  s+=isoPipe(dd([[x+10,y,z+40],[x+10,y,z+44],[mx,y,z+44],[mx,y,a[2]-6]]),{r:1.4,flow:false,flanges:false,caps:false});
  A.degasser={p:[x,y,z+30],d:[-90,-58]};front+=g('degasser',i,s)};
 G.polish=function(i){var u=isoPart('uv',176,fy,z+out[2]-33,1,{});A.polish={p:[206,fy,out[2]+12],d:[26,40]};front+=g('polish',i,u)};
 G.recovery=function(i){var y=DD-6,zz=26,s=cyl([46,y,z],'z',zz-z-5,1.4)+cyl([96,y,z],'z',zz-z-5,1.4)+cyl([30,y,zz],'x',72,5.2)+isoPath(isoBandD([36,y,zz],'x',5.2)+isoBandD([96,y,zz],'x',5.2),'aq-iso__thin')
   +isoPipe(dd([[102,y,zz],[r0[0],y,zz],[r0[0],y,z+5]]),{r:1.4,flow:false,flanges:false,caps:false});
  A.recovery={p:[52,y,zz+6],d:[-40,52]};front+=g('recovery',i,s)};
 want.forEach(function(k,i){if(k&&G[k])G[k](i)});
 return {inner:back+base+front,A:A,box:[[-30,0,0],[DW,0,0],[0,DD+12,0],[DW+28,DD,0],[0,0,90],[DW,-60,90],[-30,-60,0],[r0[0],DD+10,-20]]}}
LOOKS['ghost-skid']=function(b,H){var I=b.items||[];
 var want=I.map(function(it,i){var k=it.part||PARTS[i];return PARTS.indexOf(k)>=0?k:''}),sc=scene(want),A=sc.A;
 var pts=sc.box.map(function(p){return isoP(p)});want.forEach(function(k){if(!k)return;var s=isoP(A[k].p);pts.push([s[0]+A[k].d[0],s[1]+A[k].d[1]])});
 var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;pts.forEach(function(q){x0=Math.min(x0,q[0]);y0=Math.min(y0,q[1]);x1=Math.max(x1,q[0]);y1=Math.max(y1,q[1])});
 var pad=26;x0-=pad;y0-=pad;x1+=pad;y1+=pad;var W=Math.round(x1-x0),Hh=Math.round(y1-y0),org=[-x0,-y0];
 var leads='',tags='';
 want.forEach(function(k,i){if(!k)return;var ld=isoLeader(A[k].p,{dx:A[k].d[0],dy:A[k].d[1]},{shelf:8}),t=isoPct(ld.end,W,Hh,org);
  leads+=String(ld).replace('<g class="aq-iso__leader','<g data-r="'+i+'" class="'+K+'__ld aq-iso__leader');
  tags+='<span class="'+K+'__tag'+(ld.side==='left'?' is-left':'')+'" data-r="'+i+'" style="left:'+t.left+';top:'+t.top+'" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'});
 var svg=isoSvg(W,Hh,sc.inner+leads,'aq-iso--limestone '+K+'__svg',{origin:org});
 var fig='<div class="aq-iso-figure '+K+'__fig" style="aspect-ratio:'+W+' / '+Hh+'">'+svg+tags+'</div>';
 var cards=I.map(function(it,i){var lk=it.link&&wp(it.link)?'<a class="'+K+'__link" href="#'+e(it.link)+'" data-wp="'+e(it.link)+'">'+tx(it.link_label||wlabel(it.link))+'</a>':'';
  return '<li class="'+K+'__item" data-r="'+i+'" tabindex="0"><span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<h3 class="'+K+'__t">'+tx(it.t)+'</h3><p class="'+K+'__d">'+tx(it.d)+'</p>'+lk+'</li>'}).join('');
 var inner='<div class="'+K+'"><div class="'+K+'__head">'+H+'</div><div class="'+K+'__draw">'+fig
  +'<p class="'+K+'__legend" aria-hidden="true"><span class="'+K+'__sw is-solid"></span>'+tx(b.base||'Base skid')+'<span class="'+K+'__sw is-ghost"></span>Option</p></div>'
  +'<ol class="'+K+'__list" role="list">'+cards+'</ol></div>';
 return sec(inner,'aq-band--limestone '+K+'-sec')};
function light(root,i,on){if(!root)return;[].forEach.call(root.querySelectorAll('[data-r="'+i+'"]'),function(el){el.classList.toggle('is-on',on)})}
function hl(ev,on){var t=ev.target.closest&&ev.target.closest('.'+K+'__item,.'+K+'__tag');if(!t||(ev.relatedTarget&&t.contains(ev.relatedTarget)))return;var root=t.closest('.'+K);
 if(root&&!root.classList.contains('is-swipe'))light(root,t.getAttribute('data-r'),on)}
document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)});
document.addEventListener('focusin',function(ev){hl(ev,true)});document.addEventListener('focusout',function(ev){hl(ev,false)});
/* phones: the card most in view in the swipe row lights its ghost */
function swipe(){[].forEach.call(document.querySelectorAll('.'+K),function(root){var list=root.querySelector('.'+K+'__list');if(!list)return;
  var on=list.scrollWidth>list.clientWidth+4&&getComputedStyle(list).overflowX!=='visible';root.classList.toggle('is-swipe',on);
  if(!on){if(root._gsCur!=null){light(root,root._gsCur,false);root._gsCur=null}return}
  if(!list._gs){list._gs=1;list.addEventListener('scroll',function(){pick(root,list)},{passive:true})}pick(root,list)})}
function pick(root,list){var L=list.getBoundingClientRect().left,best=null,bd=1e9;[].forEach.call(list.children,function(c){var d=Math.abs(c.getBoundingClientRect().left-L);if(d<bd){bd=d;best=c}});
 var i=best&&best.getAttribute('data-r');if(i===root._gsCur)return;if(root._gsCur!=null)light(root,root._gsCur,false);root._gsCur=i;if(i!=null)light(root,i,true)}
var st=0;function later(){if(st)return;st=setTimeout(function(){st=0;swipe()},150)}
window.addEventListener('resize',later);document.addEventListener('aq:page',later);
if(typeof MutationObserver!=='undefined')new MutationObserver(function(){if(document.querySelector('.'+K))later()}).observe(document.documentElement,{childList:true,subtree:true});
})();
