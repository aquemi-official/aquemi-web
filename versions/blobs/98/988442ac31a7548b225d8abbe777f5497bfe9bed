/* Look "scene-plates" -> ScenePlates (design-system/components/ScenePlates): a table of plants (or any uses) set as a
   ruled ledger beside one navy plate that draws where the water goes in the plant in hand (pass 12 build B, concept
   design-system/inspiration/gemini/218-p12-ind-process-food.png: a ledger beside a navy plate with a proofing tank fed
   by a drop, numbered callouts; its two generic skid thumbnails and mono ledger are not copied). A sibling of
   site-plates (sites, contact-locations), which stays as it is.
   Left: the ledger, a real table: the plant (its index is a button that puts the plant on the plate), where the water
   goes as a numbered list (the numbers are the plate's pins), the legal floor and limit (a cell's " · " parts each on
   its own line: the floor, then who sets the rest) and the fit (a {t, link} cell links). Right: the plate, a window
   over a reel of one scene per plant: one water header with a drop to each point of use, drawn from IsoKit (proofing
   tank, mixing kettle with agitator, laboratory sink, boiler, filling line), each numbered as its item in the ledger.
   Pointing at a row, focusing into it or pressing its index slides the reel to that plant; the choice persists.
   Fields, as a table: cols, rows (cells strings or {t, link}), fold, fold_noun (nav is the page-nav label, not printed),
   and optional art (look-only): per row, one station key per "where the water goes" item ("proof", "batch", "lab",
   "boiler", "line"). Without art each item picks its station from its words (proofing, laboratory or lab, boiler,
   product lines or touches the product, else a batch kettle).
   The plate is aria-hidden: the ledger carries every fact, so screen readers never hear the plant twice.
   Phones (<= 860 px): title, then the plate as a 220 px strip held under the header (PhoneKit sticky figure) that
   swaps to the plant whose row is on the reading line, then the rows as compact cards, the numbered items keyed to
   the strip's pins. */
(function(){
var scN=0;
function pad(i){return (i<9?'0':'')+(i+1)}
function cap1(s){s=String(s||'').trim();return s.charAt(0).toUpperCase()+s.slice(1)}
/* split at ", " but never inside a [placeholder] or (brackets) */
function items(s){var o=[],d=0,st=0;s=String(s||'');for(var i=0;i<s.length;i++){var c=s[i];if(c==='['||c==='(')d++;else if((c===']'||c===')')&&d)d--;else if(!d&&c===','&&s[i+1]===' '){o.push(s.slice(st,i));st=i+2}}o.push(s.slice(st));return o.map(function(x){return x.trim()}).filter(Boolean)}
function guess(t){t=String(t||'').toLowerCase();return /proof/.test(t)?'proof':/boiler/.test(t)?'boiler':/\blab/.test(t)?'lab':/product line|touches|filling|bottl/.test(t)?'line':'batch'}
/* stations: a point of use drawn from IsoKit, standing at x on the floor; returns {svg, inlet (3D), pin (3D), box (3D pts)} */
var ST={
 proof:function(x,y){var p=isoPart('tank',x,y,0,0.9,{id:'proof'});return {svg:p,inlet:p.ports['in'],pin:[x,y,66],w:22}},
 batch:function(x,y){var b=isoB(x,y,0,1),r=15,h=26,z0=16,kt=7,top=z0+h;
  b.leg(-10,-10,0,z0+4);b.leg(10,-10,0,z0+4);b.leg(-10,10,0,z0+4);
  b.vessel(0,0,z0,r,h,kt,7);b.band(0,0,z0+h*0.55,'z',r);b.band(0,0,z0+h*0.2,'z',r);
  b.noz(0,0,top+kt-1.5,'z',3,3.4);b.bx(0,0,top+kt+1.5,7,7,6);b.cyl(0,0,top+kt+7.5,'z',8,2.6);b.ring(0,0,top+kt+15.5,'z',2.6);
  b.noz(9,-5,top+b.dome(r,kt,10.3)-1,'z',5,2);b.port['in']=[9,-5,top+b.dome(r,kt,10.3)+4];
  b.noz(0,r-1,z0+3,'y',6,2);b.leg(10,10,0,z0+4);
  var s=b.done('batch',{id:'batch'});return {svg:s,inlet:s.ports['in'],pin:[x,y,top+kt+20],w:18}},
 lab:function(x,y){var p=isoPart('outlet',x,y,0,1.1,{id:'lab'});return {svg:p,inlet:p.ports['in'],pin:[x,y+4,54],w:18}},
 boiler:function(x,y){var b=isoB(x,y,0,1),L=40,r=11,z=18;
  b.box(-L/2+4,-8,0,5,16,z-6);b.box(L/2-9,-8,0,5,16,z-6);
  b.cyl(-L/2,0,z,'x',L,r);b.band(-L/2+8,0,z,'x',r);b.band(L/2-8,0,z,'x',r);
  b.noz(L/2-7,0,z+r-1,'z',14,2.6);b.cyl(L/2-7,0,z+r+13,'z',2,3.4);
  b.noz(-L/2+10,-2,z+r-1.5,'z',6,1.8);b.port['in']=[-L/2+10,-2,z+r+4.5];
  b.cyl(-L/2-2,0,z,'-x',2,6);b.ring(-L/2-4,0,z,'x',4);
  var s=b.done('boiler',{id:'boiler'});return {svg:s,inlet:s.ports['in'],pin:[x+4,y,z+r+20],w:24}},
 line:function(x,y){var b=isoB(x,y,0,1),W=44,z=20;
  b.leg(-W/2+3,-4,0,z,1.6);b.leg(W/2-3,-4,0,z,1.6);
  b.box(-W/2,-5,z,W,10,3);b.line([-W/2,5,z+1.5],[W/2,5,z+1.5]);
  b.leg(-W/2+3,4,0,z,1.6);b.leg(W/2-3,4,0,z,1.6);
  [-15,-7,1,9,17].forEach(function(u){b.cyl(u,0,z+3,'z',8,2.4);b.cyl(u,0,z+11,'z',2.4,1.1)});
  b.bx(1,0,z+22,12,12,8);b.cyl(1,0,z+18,'z',4,1.2);b.box(-5,-6,z+30,12,12,1.2);
  b.port['in']=[1,0,z+31.2];
  var s=b.done('line',{id:'line'});return {svg:s,inlet:s.ports['in'],pin:[x+20,y,z+30],w:24}}
};
/* the stations stand in a staggered row (each one a gap along x and back along y), so the row reads level across the
   plate and a phone strip draws it wide; the header steps back with them, one short drop behind each station */
function scene(keys){var n=keys.length,gap=80,Zh=80,back=26,o=[],pins=[],pts=[],drops=[];
 var xs=keys.map(function(k,i){return i*gap}),ys=keys.map(function(k,i){return -i*gap});
 var st=keys.map(function(k,i){return (ST[k]||ST.batch)(xs[i],ys[i])});
 var x0=-26,x1=xs[n-1]+26,yb=function(i){return ys[i]-back};
 /* the header: one water main behind the stations, stepping back between them, an arrow where it comes in */
 var path=[[x0,yb(0),Zh]];for(var i=0;i<n-1;i++){var xm=xs[i]+gap/2;path.push([xm,yb(i),Zh],[xm,yb(i+1),Zh])}path.push([x1,yb(n-1),Zh]);
 var head=isoPipe(path,{r:2.2,bend:4,caps:'end',flanges:false,id:'main'});
 st.forEach(function(s,i){var a=s.inlet;drops.push(isoPipe(isoRoute([a[0],yb(i),Zh],a,'yz'),{r:1.7,bend:5,caps:'end',to:'u'+i}))});
 o.push(head);o.push(isoArrow([x0+9,yb(0),Zh],'x',{size:6}));
 /* draw back to front: the drops sit behind their stations */
 st.forEach(function(s,i){o.push(drops[i]);o.push(s.svg)});
 st.forEach(function(s,i){pins.push(s.pin);pts.push(s.pin);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(c){pts.push([xs[i]+c[0]*s.w,ys[i]+c[1]*s.w,0],[xs[i]+c[0]*s.w,ys[i]+c[1]*s.w,s.pin[2]+6])})});
 path.forEach(function(p){pts.push([p[0],p[1],Zh+4])});
 return {inner:o.join(''),pts:pts,pins:pins}}
function figure(keys,K){if(!keys.length)return '<div class="'+K+'__area" aria-hidden="true"></div>';var s=scene(keys),bx=isoBounds(s.pts,14),W=Math.round(bx.w),Hh=Math.round(bx.h),org=[-bx.x,-bx.y];
 var pins=s.pins.map(function(p,j){var at=isoPct(isoP(p),W,Hh,org);return '<span class="'+K+'__pin" style="left:'+at.left+';top:'+at.top+'">'+(j+1)+'</span>'}).join('');
 return '<div class="'+K+'__area" aria-hidden="true"><div class="'+K+'__fig aq-iso-figure" style="--ar:'+(W/Hh).toFixed(3)+'">'+isoSvg(W,Hh,s.inner,'aq-iso--navy '+K+'__svg',{origin:org})+pins+'</div></div>'}
function lines(c,K){if(c&&typeof c==='object')return tcell(c);return String(c==null?'':c).split(/\s+·\s+/).map(function(x,j){return '<span class="'+K+'__ln'+(j?' '+K+'__ln--then':'')+'">'+tx(j?cap1(x):x)+'</span>'}).join('')}
LOOKS['scene-plates']=function(b,H){var C=b.cols||[],R=b.rows||[],A=b.art||[],k=++scN,pid='scp-'+k,K='aq-scene-plates';
 var names=R.map(function(r){var c=r[0];return c&&typeof c==='object'?c.t:String(c||'')});
 var where=R.map(function(r){var c=r[1];return c&&typeof c==='object'?[c.t]:items(c)});
 var keys=R.map(function(r,i){var a=A[i];return where[i].map(function(t,j){return (a&&a[j])||guess(t)})});
 var head='<thead><tr>'+C.map(function(c){return '<th scope="col">'+tx(c)+'</th>'}).join('')+'</tr></thead>';
 var body=R.map(function(r,i){var c0=r[0],nm=c0&&typeof c0==='object'&&c0.link&&wp(c0.link)?wlink(c0.link,c0.t,c0.intent):tx(names[i]);
  var wl=where[i].length?'<ol class="'+K+'__uses">'+where[i].map(function(x,j){return '<li><span class="'+K+'__un" aria-hidden="true">'+(j+1)+'</span><span>'+tx(cap1(x))+'</span></li>'}).join('')+'</ol>':'';
  return fli('<tr class="'+K+'__row'+(i?'':' is-on')+'" data-i="'+i+'" data-pk-row="'+i+'">',b,i)
   +'<th scope="row"><div class="'+K+'__plant"><button type="button" class="'+K+'__pick" aria-pressed="'+(i?'false':'true')+'" aria-label="'+e(names[i])+'">'+pad(i)+'</button><span class="'+K+'__name">'+nm+'</span></div></th>'
   +'<td class="'+K+'__where" data-l="'+e(C[1]||'')+'">'+wl+'</td>'
   +'<td class="'+K+'__limit" data-l="'+e(C[2]||'')+'">'+(r[2]==null?'':lines(r[2],K))+'</td>'
   +'<td class="'+K+'__fit" data-l="'+e(C[3]||'')+'">'+(r[3]==null?'':tcell(r[3]))+'</td></tr>'}).join('');
 var table='<table class="'+K+'__table">'+head+'<tbody>'+body+'</tbody></table>';
 var stills=R.map(function(r,i){var w=where[i];
  return '<figure class="'+K+'__still'+(i?'':' is-on')+'" data-i="'+i+'" style="--d:'+i+'"'+(i?' aria-hidden="true"':'')+'>'
   +'<figcaption class="'+K+'__cap"><span class="'+K+'__ci">'+pad(i)+' / '+pad(R.length-1)+'</span><span class="'+K+'__ck">'+tx(names[i])+'</span></figcaption>'
   +figure(keys[i],K)
   +(w.length?'<ol class="'+K+'__calls">'+w.map(function(x,j){return '<li><span class="'+K+'__pn" aria-hidden="true">'+(j+1)+'</span><span>'+tx(cap1(x))+'</span></li>'}).join('')+'</ol>':'')
   +'</figure>'}).join('');
 var plate='<div class="'+K+'__plate" id="'+pid+'" data-theme="dark" aria-hidden="true" data-pk-fig><div class="'+K+'__reel">'+stills+'</div></div>';
 return sec('<div class="'+K+'" data-pk-sticky data-pk-h="220"><div class="'+K+'__main">'+H+wFold(b,R.length,table,b.fold_noun||'rows')+'</div><div class="'+K+'__side">'+plate+'</div></div>',K+'-sec')};
/* Selection (ported from Subframe Motion "Hover image preview list" (project-index), MIT, (c) 2026 Subframe): pointing
   at a row, focusing into it or pressing its index puts its plant on the plate; the reel slides (CSS, 240 ms
   cubic-bezier(.2,.85,.25,1)), instantly for keyboard and under reduced motion. The choice persists. */
function pick(w,i,instant){var cur=w.querySelector('.aq-scene-plates__row.is-on');if(cur&&cur.getAttribute('data-i')===String(i))return;
 var plate=w.querySelector('.aq-scene-plates__plate');if(plate)plate.classList.toggle('is-instant',!!instant);
 [].forEach.call(w.querySelectorAll('.aq-scene-plates__row'),function(r){var on=r.getAttribute('data-i')===String(i);r.classList.toggle('is-on',on);var bt=r.querySelector('.aq-scene-plates__pick');if(bt)bt.setAttribute('aria-pressed',on?'true':'false')});
 [].forEach.call(w.querySelectorAll('.aq-scene-plates__still'),function(s){var d=+s.getAttribute('data-i')-i;s.style.setProperty('--d',d);s.classList.toggle('is-on',!d);if(d)s.setAttribute('aria-hidden','true');else s.removeAttribute('aria-hidden')});
 w.dispatchEvent(new CustomEvent('aqscenepick',{detail:{i:+i,instant:!!instant}}))}
function row(ev){var r=ev.target.closest&&ev.target.closest('.aq-scene-plates__row');return r&&r.closest('.aq-scene-plates')?r:null}
document.addEventListener('mouseover',function(ev){var r=row(ev);if(r&&!(window.AQpk&&AQpk.on(r.closest('.aq-scene-plates'))))pick(r.closest('.aq-scene-plates'),r.getAttribute('data-i'),false)});
document.addEventListener('focusin',function(ev){var r=row(ev);if(r)pick(r.closest('.aq-scene-plates'),r.getAttribute('data-i'),true)});
document.addEventListener('pk:change',function(ev){var w=ev.target;if(!w.classList||!w.classList.contains('aq-scene-plates')||!(ev.detail&&ev.detail.on))return;
 pick(w,ev.detail.key,!!(window.AQpk&&AQpk.reduced&&AQpk.reduced()))});
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-scene-plates__pick');if(!t)return;var r=t.closest('.aq-scene-plates__row');pick(r.closest('.aq-scene-plates'),r.getAttribute('data-i'),ev.detail===0)});
})();
