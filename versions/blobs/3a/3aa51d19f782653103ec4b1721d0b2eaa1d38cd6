/* Look "cost-skid" -> CostSkid (design-system/components/CostSkid): what it costs to run, read off the system itself.
   The title top left; top right one Purified Water skid drawn in IsoKit line art (softener with its brine tank, carbon
   vessel, RO rack, EDI stack, loop pump, UV unit and control panel on a base frame, the reject line to drain off the
   frame edge). From each part that a cost row belongs to, a numbered leader runs out to the right; under the drawing
   the running-cost table keeps its three columns, each row led by the same number. Pointing at or focusing a row (or
   its number on the drawing) lights its parts, its leader and the row.
   Concept: research/pass9b/concepts/svc-service.1.png (a skid with numbered leaders over the running-cost table).
   Fields (a spec block): h, intro, cols [item, interval or amount, set by], rows [{p, v, m, link, part}], fold, fold_noun.
   part: the skid stage(s) the row belongs to, space-separated: panel, gen (RO and EDI), pre (carbon and softener),
   soft (softener and brine tank), uv, pump, drain. A row without a part has no leader. Desktop shows every row; the
   fold applies on phones, where the drawing runs full width with its numbers and the rows stack under it. */
function csScene(){var S={},order=[];
 function add(id,el){order.push(el);if(!S[id])S[id]={pts:[]};if(el.ports){for(var k in el.ports)S[id].pts.push(el.ports[k]);if(el.ports.top&&!S[id].top)S[id].top=el.ports.top}}
 function link(a,b,to,z){var g=4,pp=vpDedupe([a,[a[0]+g,a[1],a[2]],[a[0]+g,a[1],z],[a[0]+g,b[1],z],[b[0]-g,b[1],z],[b[0]-g,b[1],b[2]],b]);return isoPipe(pp,{to:to,r:1.8,flanges:false,caps:false})}
 var sk=isoPart('skid',0,0,0,1,{w:330,d:62,id:'frame'}),z=9;
 var so=isoPart('softener',22,24,z,1,{id:'soft'}),ca=isoPart('carbon',52,32,z,1,{id:'pre'}),ro=isoPart('ro',72,18,z,1,{id:'gen'});
 var ed=isoPart('edi',212,32,z,1,{id:'gen'}),pu=isoPart('pump',176,52,z,1,{id:'pump'}),uv=isoPart('uv',268,34,z,1,{id:'uv'}),pa=isoPart('panel',312,20,z,1,{id:'panel'});
 add('frame',sk);add('soft',so);add('pre',link(so.ports.out,ca.ports.in,'pre',so.ports.out[2]+4));add('pre',ca);
 add('gen',link(ca.ports.out,ro.ports.in,'gen',ca.ports.out[2]+6));add('gen',ro);add('gen',link(ro.ports.out,ed.ports.in,'gen',ro.ports.out[2]+4));add('gen',ed);
 add('pump',link(ed.ports.out,pu.ports.in,'pump',pu.ports.in[2]));add('pump',pu);add('uv',link(pu.ports.out,uv.ports.in,'uv',uv.ports.in[2]+6));add('uv',uv);add('panel',pa);
 /* reject to drain: down from the rack's foot to the frame's front edge, over it and down to the floor */
 var r0=[ro.ports.base[0]+36,ro.ports.base[1]+10,z+6],dr=isoPipe(vpDedupe([r0,[r0[0],70,z+6],[r0[0],70,-14]]),{to:'drain',r:1.6,flanges:false,caps:'end'});
 add('drain',dr);order.push(isoArrow([r0[0],70,-6],[0,0,-1],{size:4}));S.drain.pts.push([r0[0],70,-20]);
 return {S:S,order:order}}
window.csLight=csLight;
LOOKS['cost-skid']=function(b,H){var R=b.rows||[],C=b.cols||[],K='aq-cost-skid',sc=csScene(),S=sc.S;
 var parts=function(r){return String(r&&r.part||'').split(/\s+/).filter(function(k){return S[k]})};
 var all=[];Object.keys(S).forEach(function(k){all=all.concat(S[k].pts)});
 var bx=isoBounds(all,10),W,org;
 /* each row's part: the highest point of its first stage (the drain: the end of the reject line) */
 var L=[];R.forEach(function(r,i){var ps=parts(r);if(!ps.length)return;var st=S[ps[0]],top=st.top||st.pts.reduce(function(a,p){return isoP(p)[1]<isoP(a)[1]?p:a});
  if(ps[0]==='drain')top=st.pts[st.pts.length-1];L.push({i:i,p:top,y:isoP(top)[1]})});
 /* short leaders up from each part to its number; numbers that would meet are moved apart */
 var ends=[];var leads=L.map(function(l){var dn=l.p===S.drain.pts[S.drain.pts.length-1],s0=isoP(l.p),tries=dn?[[20,10]]:[[16,-26],[-16,-26],[16,-46],[-16,-46],[30,-62]],pick=tries[0];
  tries.some(function(t){var e2=[s0[0]+t[0],s0[1]+t[1]];if(ends.every(function(q){return Math.hypot(q[0]-e2[0],q[1]-e2[1])>26})){pick=t;return true}});
  var ld=isoLeader(l.p,{dx:pick[0],dy:pick[1]},{shelf:6,cls:K+'__ld'});l.end=ld.end;l.left=ld.side==='left';ends.push([s0[0]+pick[0],s0[1]+pick[1]]);
  return String(ld).replace('<g class="aq-iso__leader','<g data-r="'+l.i+'" class="aq-iso__leader')}).join('');
 var ex=L.map(function(l){return l.end});bx=isoBounds(all,10);ex.forEach(function(q){var x0=Math.min(bx.x,q[0]-36),y0=Math.min(bx.y,q[1]-16),x1=Math.max(bx.x+bx.w,q[0]+36),y1=Math.max(bx.y+bx.h,q[1]+16);bx={x:x0,y:y0,w:x1-x0,h:y1-y0}});
 W=bx.w;org=[-bx.x,-bx.y];var Hh=bx.h,svg=isoSvg(W,Hh,sc.order.join('')+leads,K+'__svg',{origin:org});
 var pins=L.map(function(l){var at=isoPct(l.end,W,Hh,org);return '<span class="aq-iso-figure__label '+(l.left?'aq-iso-figure__label--left ':'')+K+'__pin" data-r="'+l.i+'" style="left:'+at.left+';top:'+at.top+'" aria-hidden="true">'+(l.i<9?'0':'')+(l.i+1)+'</span>'}).join('');
 var head='<thead><tr><th scope="col"><span class="aq-cost-skid__sr">No.</span></th>'+[0,1,2].map(function(j){return '<th scope="col">'+tx(C[j]||'')+'</th>'}).join('')+'</tr></thead>';
 var body=R.map(function(r,i){var nm=r.link&&wp(r.link)?wlink(r.link,r.p):tx(r.p),ps=parts(r);
  return fli('<tr class="'+K+'__row" data-r="'+i+'" data-parts="'+ps.join(' ')+'" tabindex="0">',b,i)
   +'<td class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</td><th scope="row" class="'+K+'__p">'+nm+'</th>'
   +'<td class="'+K+'__v"><span class="'+K+'__k" aria-hidden="true">'+tx(C[1]||'')+'</span>'+tx(r.v)+'</td><td class="'+K+'__m"><span class="'+K+'__k" aria-hidden="true">'+tx(C[2]||'')+'</span>'+tx(r.m)+'</td></tr>'}).join('');
 var inner='<div class="'+K+'"><div class="'+K+'__top">'+H+'<div class="aq-iso-figure '+K+'__fig">'+svg+pins+'</div></div>'
  +wFold(b,R.length,'<table class="'+K+'__table">'+head+'<tbody>'+body+'</tbody></table>',b.fold_noun||'items')+'</div>';
 return sec(inner,K+'-sec')};
/* Pointing at (or focusing) a row lights its parts, its leader and number */
function csLight(r,i,on){if(!r)return;var row=r.querySelector('.aq-cost-skid__row[data-r="'+i+'"]'),svg=r.querySelector('.aq-cost-skid__svg');if(!row)return;
 String(row.getAttribute('data-parts')||'').split(' ').forEach(function(id){if(id&&svg)[].forEach.call(svg.querySelectorAll('[data-iso-id="'+id+'"],[data-iso-to="'+id+'"]'),function(el){el.classList.toggle('is-lit',on)})});
 [].forEach.call(r.querySelectorAll('[data-r="'+i+'"]'),function(el){el.classList.toggle('is-on',on)})}
(function(){function hl(ev,on){var s=ev.target.closest&&ev.target.closest('.aq-cost-skid__row');if(!s||s.contains(ev.relatedTarget))return;csLight(s.closest('.aq-cost-skid'),s.getAttribute('data-r'),on)}
 document.addEventListener('mouseover',function(ev){hl(ev,true)});document.addEventListener('mouseout',function(ev){hl(ev,false)});
 document.addEventListener('focusin',function(ev){hl(ev,true)});document.addEventListener('focusout',function(ev){hl(ev,false)})})();
