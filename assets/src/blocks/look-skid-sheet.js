/* Look "skid-sheet" -> SkidSheet (design-system/components/SkidSheet): a skid's design parameters read off the skid as a
   general-arrangement (GA) sheet. Pass 12 concept 224 (design-system/inspiration/gemini/224-p12-sys-pw-design.png): one
   Purified Water generation skid in IsoKit line art on a framed drawing sheet with a title block; from each part a
   numbered leader runs out to a tag, and the parameter rows beside the sheet carry the same numbers, so every value
   sits on the part it governs (membranes: capacity; feed heat exchanger: membrane design temperature; EDI stack:
   sanitization; product piping: materials and dead legs; a pipe joint: joints; the frame: budget; the high-pressure
   pump: the HP section; the reject line: recovery; the panel: instruments; the feed and outlet stubs: battery limits).
   The sheet holds still beside the rows (sticky) while they are read; pointing at or focusing a row (or its tag) brings
   a ring to that tag on the drawing and lights the part and its leader.
   Fields (a spec block): h, caption (eyebrow), intro, rows [{p, v, m, link, link_label, part}], note.
   part (look-only): the drawn part the row governs, one of membranes, utilities, exchanger, edi, piping, joints, frame,
   pump, drain, panel. A row without a part has no tag (it still lists). Every row shows on every width (S7).
   Tablets (601-860 px): the full sheet with its tags stacked above the rows.
   Phones (<= 600 px, PhoneKit sticky figure): the drawing without its sheet frame holds in a 200 px strip under the
   header with a numbered dot on each part (no leaders); the rows run as a two-column key and value list (number and
   parameter, then the value), the basis behind a 44 px "Basis" button; the row on the reading line lights its dot. */
(function(){
var K='aq-skid-sheet',N=0;
function dd(p){var o=[];p.forEach(function(q){var l=o[o.length-1];if(l&&Math.abs(l[0]-q[0])+Math.abs(l[1]-q[1])+Math.abs(l[2]-q[2])<1e-6)return;o.push(q)});return o}
/* the skid, back to front; returns the markup and the anchor point (3D) and leader offset (2D) of each part key */
function scene(){var z=9,A={},o=[],DW=236,DD=108;
 var sk=isoPart('skid',0,0,0,1,{w:DW,d:DD,id:'frame'});o.push(sk);
 /* back row: the RO rack (its high-pressure pump stands at its front) and the panel; front row: the feed heat
    exchanger (turned so its ports face the feed) and the EDI stack */
 var ro=isoPart('ro',10,6,z,1,{id:'membranes'}),pa=isoPart('panel',204,22,z,1,{id:'panel'});
 var hx=isoPart('hx',124,92,z,1,{id:'exchanger',rot:2}),ed=isoPart('edi',150,62,z,1,{id:'edi'});
 var pump=[10+26,6+42,z];
 /* feed stub in at the left edge, along the front to the exchanger, back to the pump suction */
 var fy=100,fz=22,fin=[-26,fy,fz],hi=hx.ports.in,ho=hx.ports.out,pi=ro.ports.in;
 var feed=isoPipe(dd([fin,[hi[0]-8,fy,fz],[hi[0]-8,hi[1],fz],[hi[0]-8,hi[1],hi[2]],hi]),{r:2,to:'exchanger',flanges:'ends',caps:'start',id:'utilities'});
 var f2=isoPipe(dd([ho,[ho[0]-14,ho[1],ho[2]],[ho[0]-14,pi[1],ho[2]],[pi[0],pi[1],ho[2]],pi]),{r:1.8,to:'pump',flanges:false,caps:false});
 /* RO permeate to EDI: a plain run with a neutral seam ring at each joint (says "a joint", not how it is made: the
    joining method is the row's open [PP joining method]); the joint tag sits on the long run */
 var a=ro.ports.out,b2=ed.ports.in,mx=a[0]+10;
 var perm=isoPipe(dd([a,[mx,a[1],a[2]],[mx,b2[1],a[2]],[mx,b2[1],b2[2]],b2]),{r:1.8,to:'edi',flanges:false,caps:false,id:'joints'});
 function collar(c,ax){var u=ax==='y'?[0,1.2,0]:[0,0,1.2];return isoBandD([c[0]-u[0],c[1]-u[1],c[2]-u[2]],ax,3)+isoBandD([c[0]+u[0],c[1]+u[1],c[2]+u[2]],ax,3)}
 var seams='<g class="'+K+'__seams" data-iso-id="joints">'+isoPath(collar([mx,a[1]+10,a[2]],'y')+collar([mx,b2[1]-14,a[2]],'y')+collar([mx,b2[1],(a[2]+b2[2])/2],'z'),'aq-iso__thin')+'</g>';
 /* EDI product out to the outlet stub at the right edge, a sample valve on a short tee */
 var out=ed.ports.out,oy=out[1],oz=out[2],pw=[DW+26,oy,oz],vx=DW-30;
 var prod=isoPipe(dd([out,pw]),{r:2,flanges:'ends',caps:'end',id:'piping'});
 var tee=isoPipe([[vx,oy,oz],[vx,oy,oz+8]],{r:1.4,flanges:false,caps:false,id:'piping'}),va=isoPart('valve',vx,oy,oz+12,1,{id:'piping',r:1.6});
 /* reject (concentrate) from the rack's right end, forward and down to drain over the front edge */
 var r0=[118,30,z+5],rej=isoPipe(dd([r0,[r0[0],DD+10,z+5],[r0[0],DD+10,-18]]),{r:1.6,to:'drain',flanges:false,caps:'end',id:'drain'});
 o.push(ro,pa,f2,perm,seams,ed,prod,tee,va,rej,hx,feed,isoArrow([r0[0],DD+10,-10],[0,0,-1],{size:4}),isoArrow([pw[0]-10,oy,oz],'x',{size:4}),isoArrow([fin[0]+12,fy,fz],'x',{size:4}));
 A.membranes={p:[10+64,6+13,z+52+5.2],d:[-26,-48]};
 A.utilities={p:[fin[0]+4,fy,fz],d:[-24,-34]};
 A.exchanger={p:[100,92,z+30],d:[-60,34]};
 A.edi={p:ed.ports.top,d:[20,-56]};
 A.piping={p:[vx,oy,oz+18],d:[-6,58]};
 A.joints={p:[mx,b2[1]-14,a[2]],d:[22,-70]};
 A.frame={p:[DW*0.6,DD,6],d:[-12,40]};
 A.pump={p:[pump[0],pump[1],z+40],d:[-44,-24]};
 A.drain={p:[r0[0],DD+10,-14],d:[-34,16]};
 A.panel={p:pa.ports.top,d:[22,-34]};
 return {inner:o.join(''),A:A,box:[[-30,0,0],[DW,0,0],[0,DD+12,0],[DW+28,DD,0],[0,0,74],[DW,0,74],[r0[0],DD+10,-20]]}}
LOOKS['skid-sheet']=function(b,H){var R=b.rows||[],sc=scene(),A=sc.A;N++;
 var used=R.map(function(r){return r.part&&A[r.part]?r.part:''});
 /* screen bounds: the drawing plus every tag at its leader's end */
 var pts=sc.box.map(function(p){return isoP(p)});used.forEach(function(k){if(!k)return;var s=isoP(A[k].p);pts.push([s[0]+A[k].d[0],s[1]+A[k].d[1]])});
 var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;pts.forEach(function(q){x0=Math.min(x0,q[0]);y0=Math.min(y0,q[1]);x1=Math.max(x1,q[0]);y1=Math.max(y1,q[1])});
 var pad=22;x0-=pad;y0-=pad;x1+=pad;y1+=pad;var W=Math.round(x1-x0),Hh=Math.round(y1-y0),org=[-x0,-y0];
 var leads='',tags='',dots='';
 R.forEach(function(r,i){var k=used[i];if(!k)return;var a=A[k],ld=isoLeader(a.p,{dx:a.d[0],dy:a.d[1]},{shelf:8});
  leads+=String(ld).replace('<g class="aq-iso__leader','<g data-r="'+i+'" class="'+K+'__ld aq-iso__leader');
  var t=isoPct(ld.end,W,Hh,org),d=isoPct(isoP(a.p),W,Hh,org),n=(i<9?'0':'')+(i+1);
  tags+='<span class="'+K+'__tag'+(ld.side==='left'?' is-left':'')+'" data-r="'+i+'" style="left:'+t.left+';top:'+t.top+'" aria-hidden="true">'+n+'</span>';
  dots+='<span class="'+K+'__dot" data-r="'+i+'" data-pk-key="'+i+'" style="left:'+d.left+';top:'+d.top+'" aria-hidden="true">'+n+'</span>'});
 var svg=isoSvg(W,Hh,sc.inner+leads,K+'__svg',{origin:org});
 var page=typeof WP!=='undefined'&&wp(WP),block=[page&&(page.nav_label||page.title),b.caption,wCount(b,R.length,'parameters')].filter(Boolean);
 var fig='<div class="'+K+'__fig" data-pk-fig><div class="'+K+'__sheet">'
  +'<div class="aq-iso-figure '+K+'__art" style="aspect-ratio:'+W+' / '+Hh+'">'+svg+'<span class="'+K+'__ring" aria-hidden="true"></span>'+tags+dots+'</div>'
  +(block.length?'<div class="'+K+'__block" aria-hidden="true">'+block.map(function(c){return '<span>'+tx(c)+'</span>'}).join('')+'</div>':'')
  +'</div></div>';
 var rows=R.map(function(r,i){var n=(i<9?'0':'')+(i+1),mid=K+'-m'+N+'-'+i;
  var lk=r.link&&wp(r.link)?'<a class="'+K+'__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':'';
  var more=r.m||lk;
  return '<li class="'+K+'__row" data-r="'+i+'" data-pk-row="'+i+'"'+(used[i]?' data-part="'+used[i]+'"':'')+' tabindex="0">'
   +'<span class="'+K+'__n" aria-hidden="true">'+n+'</span><h3 class="'+K+'__p"><span class="'+K+'__pn" aria-hidden="true">'+n+'</span>'+tx(r.p)+'</h3>'
   +'<p class="'+K+'__v">'+tx(r.v)+'</p>'
   +(more?'<button type="button" class="'+K+'__wb" aria-expanded="false" aria-controls="'+mid+'"><span>'+tx((b.cols&&b.cols[2])||'Basis')+'</span><span class="aq-phone-kit__chev aq-phone-kit__chev--plus" aria-hidden="true"></span></button>'
    +'<div class="'+K+'__m" id="'+mid+'">'+(r.m?'<p>'+tx(r.m)+'</p>':'')+lk+'</div>':'')+'</li>'}).join('');
 return sec(wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro})
  +'<div class="'+K+'" data-pk-sticky data-pk-bp="600" data-pk-h="220" data-pk-zoom="1.15">'+fig+'<ol class="'+K+'__rows" role="list">'+rows+'</ol></div>'+wSpecNote(b),K+'-sec')};
/* pointing at or focusing a row (or a tag) lights the row, its tag and leader, and its part; the ring glides there */
function light(root,i,on){if(!root)return;var row=root.querySelector('.'+K+'__row[data-r="'+i+'"]');if(!row)return;
 [].forEach.call(root.querySelectorAll('[data-r="'+i+'"]'),function(el){el.classList.toggle('is-on',on)});
 var k=row.getAttribute('data-part'),svg=root.querySelector('.'+K+'__svg');
 if(k&&svg)[].forEach.call(svg.querySelectorAll('[data-iso-id="'+k+'"]'),function(el){el.classList.toggle('is-lit',on)});
 var ring=root.querySelector('.'+K+'__ring'),pk=root.hasAttribute('data-pk-on'),t=root.querySelector((pk?'.'+K+'__dot':'.'+K+'__tag')+'[data-r="'+i+'"]');
 if(ring){if(on&&t){ring.style.left=t.style.left;ring.style.top=t.style.top;ring.classList.toggle('is-left',t.classList.contains('is-left'));ring.classList.add('is-on')}else if(!on)ring.classList.remove('is-on')}}
function hl(ev,on){var t=ev.target.closest&&ev.target.closest('.'+K+'__row,.'+K+'__tag');if(!t||(ev.relatedTarget&&t.contains(ev.relatedTarget)))return;var root=t.closest('.'+K);if(root)light(root,t.getAttribute('data-r'),on)}
document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)});
document.addEventListener('focusin',function(ev){hl(ev,true)});document.addEventListener('focusout',function(ev){hl(ev,false)});
/* phones: the Basis button opens that row's basis and link under its value */
document.addEventListener('click',function(ev){var bt=ev.target.closest&&ev.target.closest('.'+K+'__wb');if(!bt)return;var row=bt.closest('.'+K+'__row'),o=bt.getAttribute('aria-expanded')!=='true';
 bt.setAttribute('aria-expanded',o?'true':'false');row.classList.toggle('is-open',o)});
/* phones: the row on the reading line lights its dot (PhoneKit's pk:change) */
document.addEventListener('pk:change',function(ev){var root=ev.target;if(!root.classList||!root.classList.contains(K))return;
 [].forEach.call(root.querySelectorAll('.'+K+'__row'),function(r){light(root,r.getAttribute('data-r'),false)});if(ev.detail&&ev.detail.on)light(root,ev.detail.key,true)});
})();
