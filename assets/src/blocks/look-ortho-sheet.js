/* Look "ortho-sheet" -> OrthoSheet (design-system/components/OrthoSheet): a skid's design parameters read off an
   orthographic general-arrangement (GA) sheet. Pass 12 build round E from concept 260
   (design-system/inspiration/gemini/260-p12-sys-pw-design-take2.png): one Purified Water generation skid drawn in two
   views on one sheet, the front elevation over the plan, the plan projected straight down from the elevation (shared
   x, dash-dot centre lines through the pump, the RO housings and the EDI stack). Each parameter row carries one square
   tag on a leader from the part it governs, in the view that shows that part best (seven in the elevation, three in
   the plan); the rows beside the sheet carry the same numbers. It replaces the isometric SkidSheet on sys-pw, which drew
   the same skid as the hero, the documents and the options sections (pass 12 C, G-C5): the page now has one flat,
   engineering view between three isometric ones.
   Fields (a spec block, as skid-sheet): h, caption (eyebrow and a title block cell), intro, rows [{p, v, m, link,
   link_label, part}], note, cols[2] (the basis button's word). part (look-only): membranes, utilities, exchanger, edi,
   piping, joints, frame, pump, drain, panel. A row without a part lists with no tag. Every row shows on every width.
   Not taken from the concept: its tag numbers (they repeat: 08 three times, 07 twice), its part-name rows (the rows are
   the page's parameters), the goalpost frame over the elevation (a closed PP base and PP stands only), metal pump
   flanges, the wordmark.
   Desktop: the sheet (elevation over plan, title block) holds sticky beside the rows; pointing at or focusing a row (or
   its tag) lights the row, its tag, leader and part in both views, and a ring settles on the tag.
   Tablets (601-860 px): the full sheet above the rows. Phones (<= 600 px, PhoneKit sticky figure): the front
   elevation alone, cropped to the skid, with a numbered dot on each part (the plan's three parts are dotted where the
   elevation shows them); the strip pans to the dot of the row on the reading line; rows as on skid-sheet. */
(function(){
var K='aq-ortho-sheet',N=0;
/* view boxes (user units): both views share x, so the plan sits straight under the elevation */
var X0=-110,VW=860,EY0=-44,EH=374,PY0=-12,PH=226;
function f(n){return String(Math.round(n*10)/10)}
var CL={eq:'aq-iso__eq',thin:'aq-iso__thin','pipe-body':'aq-iso__pipe-body','pipe-wall':'aq-iso__pipe-wall',collar:'aq-iso__eq aq-iso__collar'};
function cl(c){return CL[c||'eq']}
function R(x,y,w,h,c,rx){return '<rect class="'+cl(c)+'" x="'+f(x)+'" y="'+f(y)+'" width="'+f(w)+'" height="'+f(h)+'"'+(rx?' rx="'+rx+'"':'')+'/>'}
function P(d,c){return '<path class="'+cl(c)+'" d="'+d+'"/>'}
function C(x,y,r,c){return '<circle class="'+cl(c)+'" cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(r)+'"/>'}
function G(id,s){return '<g class="aq-iso__part" data-iso-id="'+id+'">'+s+'</g>'}
function pt(p){return f(p[0])+' '+f(p[1])}
/* an orthogonal PP pipe: twin walls over a ground-coloured body, bends of 3 r, the water as one centre line.
   o: id, to (the part the water reaches), r, collar ('start' | 'end' | 'both': a socket-fusion collar at that end),
   cap (close the walls at the open ends), flow (false: no water line) */
function pipe(pts,o){o=o||{};var r=o.r||3.5,n=pts.length,i,dirs=[],lens=[];
 for(i=1;i<n;i++){var dx=pts[i][0]-pts[i-1][0],dy=pts[i][1]-pts[i-1][1],l=Math.abs(dx)+Math.abs(dy);dirs.push([Math.sign(dx),Math.sign(dy)]);lens.push(l)}
 var nrm=function(d){return [-d[1],d[0]]},cor=[];
 for(i=1;i<n-1;i++){var a=dirs[i-1],b=dirs[i],Rr=Math.min(3*r,lens[i-1]/(i===1?1:2),lens[i]/(i===n-2?1:2));
  cor.push({P:pts[i],a:a,b:b,R:Rr,s:a[0]*b[1]-a[1]*b[0]>0?1:0,c:[pts[i][0]+(b[0]-a[0])*Rr,pts[i][1]+(b[1]-a[1])*Rr]})}
 function off(p,d,s){var m=nrm(d);return [p[0]+m[0]*s,p[1]+m[1]*s]}
 function wall(s){var d='M'+pt(off(pts[0],dirs[0],s));cor.forEach(function(k){var A=off([k.P[0]-k.a[0]*k.R,k.P[1]-k.a[1]*k.R],k.a,s),B=off([k.P[0]+k.b[0]*k.R,k.P[1]+k.b[1]*k.R],k.b,s),rr=Math.hypot(A[0]-k.c[0],A[1]-k.c[1]);
  d+='L'+pt(A)+'A'+f(rr)+' '+f(rr)+' 0 0 '+k.s+' '+pt(B)});return d+'L'+pt(off(pts[n-1],dirs[n-2],s))}
 function back(s){var d='L'+pt(off(pts[n-1],dirs[n-2],s));cor.slice().reverse().forEach(function(k){var A=off([k.P[0]-k.a[0]*k.R,k.P[1]-k.a[1]*k.R],k.a,s),B=off([k.P[0]+k.b[0]*k.R,k.P[1]+k.b[1]*k.R],k.b,s),rr=Math.hypot(A[0]-k.c[0],A[1]-k.c[1]);
  d+='L'+pt(B)+'A'+f(rr)+' '+f(rr)+' 0 0 '+(1-k.s)+' '+pt(A)});return d+'L'+pt(off(pts[0],dirs[0],s))+'Z'}
 var body=wall(r)+back(-r),out=P(body,'pipe-body')+P(wall(r),'pipe-wall')+P(wall(-r),'pipe-wall');
 function capAt(p,d){var u=off(p,d,r),v=off(p,d,-r);return P('M'+pt(u)+'L'+pt(v),'pipe-wall')}
 function collar(p,d,end){var L=2.6*r,w=1.35*r,a=end?[p[0]-d[0]*L,p[1]-d[1]*L]:p,b=end?p:[p[0]+d[0]*L,p[1]+d[1]*L],x=Math.min(a[0],b[0]),y=Math.min(a[1],b[1]);
  return d[0]?R(x,y-w,Math.abs(b[0]-a[0]),2*w,'collar'):R(x-w,y,2*w,Math.abs(b[1]-a[1]),'collar')}
 if(o.cap!==false){out+=capAt(pts[0],dirs[0])+capAt(pts[n-1],dirs[n-2])}
 if(o.collar==='start'||o.collar==='both')out+=collar(pts[0],dirs[0]);
 if(o.collar==='end'||o.collar==='both')out+=collar(pts[n-1],dirs[n-2],1);
 if(o.flow!==false){var fl='M'+pt(pts[0]);cor.forEach(function(k){fl+='L'+pt([k.P[0]-k.a[0]*k.R,k.P[1]-k.a[1]*k.R])+'A'+f(k.R)+' '+f(k.R)+' 0 0 '+k.s+' '+pt([k.P[0]+k.b[0]*k.R,k.P[1]+k.b[1]*k.R])});fl+='L'+pt(pts[n-1]);
  out+='<path class="aq-iso__flow" d="'+fl+'"'+(o.to?' data-iso-to="'+o.to+'"':'')+'/>'}
 return '<g class="aq-iso__pipe"'+(o.id?' data-iso-id="'+o.id+'"':'')+(o.to?' data-iso-to="'+o.to+'"':'')+'>'+out+'</g>'}
/* a flow chevron at p pointing along the unit axis d */
function arrow(p,d,s){s=s||4;var m=[-d[1],d[0]];return '<path class="aq-iso__arrow" d="M'+pt([p[0]-d[0]*s+m[0]*s,p[1]-d[1]*s+m[1]*s])+'L'+pt(p)+'L'+pt([p[0]-d[0]*s-m[0]*s,p[1]-d[1]*s-m[1]*s])+'"/>'}
/* a PP diaphragm valve seen from the front or from above: bow-tie body, domed bonnet (no handwheel), end cap left */
function valve(x,y,top){return R(x-8,y-6,16,12,'eq')+P('M'+f(x-8)+' '+f(y-6)+'L'+f(x)+' '+f(y)+'L'+f(x-8)+' '+f(y+6)+'M'+f(x+8)+' '+f(y-6)+'L'+f(x)+' '+f(y)+'L'+f(x+8)+' '+f(y+6),'thin')
 +(top?R(x-4,y-15,8,9,'eq',2):C(x,y,3.2,'thin'))+R(x-12,y-3,4,6,'eq')}
/* sheet furniture: a ground line and dash-dot centre lines (the projection between the views) */
function furn(d){return '<g class="aq-iso__sheet"><path class="aq-iso__sheet-line" d="'+d.g+'"/><path class="'+K+'__cl" d="'+d.c+'"/></g>'}

/* the front elevation: the base at y 280-298, the parts stand on it; x along the skid (shared with the plan) */
function elevation(){
 var frame=G('frame',R(0,280,640,18)+P('M0 286H640','thin')+[8,312,616].map(function(x){return R(x,298,16,6)}).join(''));
 var hx=G('exchanger',R(14,150,64,6)+R(18,156,8,124)+R(64,156,8,124)+R(26,162,38,114)+P([30,34,38,42,46,50,54,58].map(function(x){return 'M'+x+' 162V276'}).join(''),'thin'));
 var pump=G('pump',R(84,274,40,6)+R(92,196,24,78)+P('M92 209H116M92 222H116M92 235H116M92 248H116M92 261H116','thin')+R(95,182,18,14)
  +R(86,112,36,70,'eq',2)+P('M92 118V176M98 118V176M104 118V176M110 118V176M116 118V176','thin')+R(91,102,26,10,'eq',3)+R(122,130,7,16));
 var ves=[70,116,162].map(function(c){return R(158,c-18,264,36)+R(146,c-20,12,40,'eq',2)+R(422,c-20,12,40,'eq',2)+P('M192 '+(c-18)+'V'+(c+18)+'M388 '+(c-18)+'V'+(c+18),'thin')}).join('');
 var ro=G('membranes',R(186,44,12,236)+R(382,44,12,236)+ves);
 var edi=G('edi',P('M466 154H548M466 278H548','thin')+R(472,150,10,130)+R(532,150,10,130)+R(482,160,50,116)
  +P([486,489.5,493,496.5,500,503.5,507,510.5,514,517.5,521,524.5,528].map(function(x){return 'M'+x+' 160V276'}).join(''),'thin')+R(462,151,5,6)+R(547,151,5,6));
 var panel=G('panel',R(558,274,72,6)+R(560,46,68,228)+P('M594 46V274M590 150V170','thin')+R(568,64,20,16,'thin')+C(604,72,2.5,'thin')+C(612,72,2.5,'thin')+C(620,72,2.5,'thin')+P('M602 246H620M602 252H620M602 258H620','thin'));
 var feed=pipe([[-40,180],[18,180]],{id:'utilities',to:'exchanger',collar:'start'});
 var hp=pipe([[72,262],[92,262]],{to:'pump'});
 var riser=pipe([[116,214],[138,214],[138,70],[146,70]],{to:'membranes'})+pipe([[138,116],[146,116]],{r:3,flow:false})+pipe([[138,162],[146,162]],{r:3,flow:false});
 var perm=pipe([[434,116],[454,116],[454,250],[472,250]],{r:3,to:'edi'});
 var prod=pipe([[537,150],[537,26],[690,26]],{id:'piping',collar:'end'})+pipe([[537,90],[522,90]],{id:'piping',r:2.6,flow:false,cap:false});
 var va=G('piping',valve(510,90,true));
 /* the joints: a girth band (two hairlines) across the pipe at each joint (method-neutral while [PP joining method] is open) */
 var seams=G('joints',P('M529 118H545M529 122H545M610 18V34M614 18V34M650 18V34M654 18V34','thin'));
 var rej=pipe([[434,162],[442,162],[442,318]],{id:'drain',r:3});
 var arr=arrow([-24,180],[1,0])+arrow([680,26],[1,0])+arrow([442,312],[0,1]);
 return furn({g:'M-60 304.5H710',c:'M104 92V318M507 136V318'})+frame+ro+hx+pump+edi+panel+feed+hp+riser+perm+prod+va+seams+rej+arr}

/* the plan: the base from above (y 0 at the back, 160 at the front) */
function plan(){
 var frame=G('frame',R(0,0,640,160)+P('M6 6H634V154H6Z','thin'));
 var ro=G('membranes',R(186,10,12,48)+R(382,10,12,48)+R(158,16,264,36)+R(146,14,12,40,'eq',2)+R(422,14,12,40,'eq',2)+P('M192 16V52M388 16V52','thin'));
 var pump=G('pump',R(84,92,40,36)+C(104,110,18)+C(104,110,10,'thin')+R(122,103,7,14));
 var hx=G('exchanger',R(14,87,64,5)+R(18,88,8,44)+R(64,88,8,44)+R(26,92,38,36)+P([30,34,38,42,46,50,54,58].map(function(x){return 'M'+x+' 92V128'}).join(''),'thin'));
 var edi=G('edi',R(472,70,10,60)+R(532,70,10,60)+R(482,74,50,52)+P([486,489.5,493,496.5,500,503.5,507,510.5,514,517.5,521,524.5,528].map(function(x){return 'M'+x+' 74V126'}).join(''),'thin'));
 var panel=G('panel',R(560,8,68,36)+P('M564 12H624V40H564Z','thin'));
 var feed=pipe([[-40,110],[18,110]],{id:'utilities',to:'exchanger',collar:'start'});
 var hp=pipe([[72,110],[86,110]],{to:'pump'});
 var riser=pipe([[122,110],[138,110],[138,34],[146,34]],{to:'membranes'});
 var perm=pipe([[434,26],[454,26],[454,100],[472,100]],{r:3,to:'edi'});
 var prod=pipe([[537,100],[690,100]],{id:'piping',collar:'end'})+G('piping',C(537,100,5.5));
 var seams=G('joints',P('M610 92V108M614 92V108M650 92V108M654 92V108','thin'));
 var rej=pipe([[434,42],[442,42],[442,176]],{id:'drain',r:3});
 var arr=arrow([-24,110],[1,0])+arrow([680,100],[1,0])+arrow([442,170],[0,1]);
 return furn({g:'',c:'M104 -10V146M507 60V146M140 34H440'})+frame+ro+hx+pump+edi+panel+feed+hp+riser+perm+prod+seams+rej+arr}

/* each part: the view its tag sits in (e | p), the anchor on the part in that view, the leader's turn points (the tag
   centres on the last), and pe, the anchor in the elevation for the phone's dot (default: a) */
var PARTS={
 membranes:{v:'e',a:[290,70],t:[[290,-26]]},
 utilities:{v:'e',a:[-36,180],t:[[-60,150],[-84,150]],pe:[-12,180]},
 exchanger:{v:'e',a:[44,240],t:[[-56,262],[-84,262]]},
 pump:{v:'e',a:[104,140],t:[[-56,60],[-84,60]]},
 piping:{v:'e',a:[510,76],t:[[510,-26]],pe:[470,50]},
 joints:{v:'e',a:[612,26],t:[[612,-26]],pe:[612,28]},
 panel:{v:'e',a:[612,160],t:[[716,160]]},
 edi:{v:'p',a:[494,118],t:[[494,196]],pe:[507,215]},
 frame:{v:'p',a:[260,157],t:[[260,196]],pe:[260,289]},
 drain:{v:'p',a:[442,164],t:[[400,196]],pe:[442,300]}};

function pct(p,y0,h){return 'left:'+(100*(p[0]-X0)/VW).toFixed(2)+'%;top:'+(100*(p[1]-y0)/h).toFixed(2)+'%'}
LOOKS['ortho-sheet']=function(b,H){var Rw=b.rows||[];N++;
 var used=Rw.map(function(r){return r.part&&PARTS[r.part]?r.part:''}),L={e:'',p:''},T={e:'',p:''},dots='';
 Rw.forEach(function(r,i){var k=used[i];if(!k)return;var q=PARTS[k],n=(i<9?'0':'')+(i+1),y0=q.v==='e'?EY0:PY0,h=q.v==='e'?EH:PH,end=q.t[q.t.length-1];
  L[q.v]+='<g data-r="'+i+'" class="'+K+'__ld aq-iso__leader"><path class="aq-iso__leader-line" d="M'+pt(q.a)+q.t.map(function(p){return 'L'+pt(p)}).join('')+'"/><circle class="aq-iso__leader-dot" cx="'+f(q.a[0])+'" cy="'+f(q.a[1])+'" r="2"/></g>';
  T[q.v]+='<span class="'+K+'__tag" data-r="'+i+'" style="'+pct(end,y0,h)+'" aria-hidden="true">'+n+'</span>';
  dots+='<span class="'+K+'__dot" data-r="'+i+'" data-pk-key="'+i+'" style="'+pct(q.pe||(q.v==='e'?q.a:q.a),EY0,EH)+'" aria-hidden="true">'+n+'</span>'});
 function svg(inner,y0,h,cls){return '<svg class="aq-iso '+K+'__svg '+cls+'" viewBox="'+X0+' '+y0+' '+VW+' '+h+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">'+inner+'</svg>'}
 var page=typeof WP!=='undefined'&&wp(WP),block=[page&&(page.nav_label||page.title),b.caption,wCount(b,Rw.length,'parameters')].filter(Boolean);
 var fig='<div class="'+K+'__fig" data-pk-fig><div class="'+K+'__sheet">'
  +'<div class="aq-iso-figure '+K+'__art '+K+'__art--e" style="aspect-ratio:'+VW+' / '+EH+'">'+svg(elevation()+L.e,EY0,EH,K+'__svg--e')+'<span class="'+K+'__ring" aria-hidden="true"></span>'+T.e+dots+'</div>'
  +'<div class="aq-iso-figure '+K+'__art '+K+'__art--p" style="aspect-ratio:'+VW+' / '+PH+'">'+svg(plan()+L.p,PY0,PH,K+'__svg--p')+'<span class="'+K+'__ring" aria-hidden="true"></span>'+T.p+'</div>'
  +(block.length?'<div class="'+K+'__block" aria-hidden="true">'+block.map(function(c){return '<span>'+tx(c)+'</span>'}).join('')+'</div>':'')
  +'</div></div>';
 var rows=Rw.map(function(r,i){var n=(i<9?'0':'')+(i+1),mid=K+'-m'+N+'-'+i;
  var lk=r.link&&wp(r.link)?'<a class="'+K+'__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':'';
  var more=r.m||lk;
  return '<li class="'+K+'__row" data-r="'+i+'" data-pk-row="'+i+'"'+(used[i]?' data-part="'+used[i]+'"':'')+' tabindex="0">'
   +'<span class="'+K+'__n" aria-hidden="true">'+n+'</span><h3 class="'+K+'__p"><span class="'+K+'__pn" aria-hidden="true">'+n+'</span>'+tx(r.p)+'</h3>'
   +'<p class="'+K+'__v">'+tx(r.v)+'</p>'
   +(more?'<button type="button" class="'+K+'__wb" aria-expanded="false" aria-controls="'+mid+'"><span>'+tx((b.cols&&b.cols[2])||'Basis')+'</span><span class="aq-phone-kit__chev aq-phone-kit__chev--plus" aria-hidden="true"></span></button>'
    +'<div class="'+K+'__m" id="'+mid+'">'+(r.m?'<p>'+tx(r.m)+'</p>':'')+lk+'</div>':'')+'</li>'}).join('');
 return sec(wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro})
  +'<div class="'+K+'" data-pk-sticky data-pk-bp="600" data-pk-h="150">'+fig+'<ol class="'+K+'__rows" role="list">'+rows+'</ol></div>'+wSpecNote(b),K+'-sec')};
/* pointing at or focusing a row (or a tag) lights the row, its tag and leader, and its part in both views; the ring of
   the view holding the tag (on phones, the elevation's dot) glides there */
function light(root,i,on){if(!root)return;var row=root.querySelector('.'+K+'__row[data-r="'+i+'"]');if(!row)return;
 [].forEach.call(root.querySelectorAll('[data-r="'+i+'"]'),function(el){el.classList.toggle('is-on',on)});
 var k=row.getAttribute('data-part');
 if(k)[].forEach.call(root.querySelectorAll('.'+K+'__svg [data-iso-id="'+k+'"]'),function(el){el.classList.toggle('is-lit',on)});
 var pk=root.hasAttribute('data-pk-on'),t=root.querySelector((pk?'.'+K+'__dot':'.'+K+'__tag')+'[data-r="'+i+'"]');
 [].forEach.call(root.querySelectorAll('.'+K+'__ring'),function(ring){var here=t&&t.parentNode===ring.parentNode;
  if(on&&here){ring.style.left=t.style.left;ring.style.top=t.style.top;ring.classList.add('is-on')}else ring.classList.remove('is-on')})}
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
