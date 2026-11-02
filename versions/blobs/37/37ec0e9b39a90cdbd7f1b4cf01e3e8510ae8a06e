/* Look "site-plates" -> SitePlates (design-system/components/SitePlates): a table of sites (site, what happens here,
   address, contact and hours) set as a ledger beside one navy drawing plate (pass 9b, concept contact-locations.1: a
   limestone sites ledger beside a duotone plate; the plate draws the site you point at instead of the concept's weld).
   Left: the section title set large, then the ledger, a real table: the site (its index is a button that puts the site
   on the plate, the kind of site, the place under it), what happens here, the address and the contact lines in mono (a
   cell's " · " parts each on its own line). Right: the plate, a window over a reel of one figure per site: index and
   kind, an isometric drawing of what stands there (IsoKit, aq-iso--navy), numbered pins on the parts that do the work
   and, under it, what happens here as a numbered callout list (the cell split at ", " outside [placeholders]).
   Pointing at a row, focusing into it or pressing its index slides the reel to that site (project-index); the
   selection persists. The first cell is split at its first ", " into the kind and the place; a {t, link} first cell
   links the kind. Fields, as a table: cols, rows, fold, fold_noun, nav (the small line under the title), and optional
   art: one drawing key per row ("office", "shop", "service", "parts"; any other key or none draws an empty sheet).
   Drawings are drawn here from IsoKit parts (building; skid, RO rack and panel; truck; crates are boxes drawn with the
   kit's box primitive next to a pump and valve). Design system: components/SitePlates. */
(function(){
var spN=0;
function eq(d){return '<path class="aq-iso__eq" d="'+d+'"/>'}
/* each scene: its parts, its 3D bounds, and pins: the 3D points the "what happens here" items point at, in order */
var SCENES={
 office:function(){return {inner:isoPart('building',0,0,0,1,{w:84,d:56,h:52}),box:[[0,0,0],[84,0,0],[0,56,0],[84,56,0],[0,0,68],[84,0,68],[0,56,68]],pins:[[42,28,54]]}},
 shop:function(){var sk=isoPart('skid',0,0,0,1,{w:150,d:70}),ro=isoPart('ro',8,6,9,1,{id:'ro'}),pn=isoPart('panel',124,48,9,0.9,{id:'pn'});
  return {inner:[sk,ro,pn].join(''),box:[[0,0,0],[150,0,0],[0,70,0],[150,70,0],[0,0,70],[150,0,70],[0,70,70]],pins:[ro.ports.top,pn.ports.top]}},
 service:function(){return {inner:isoPart('truck',0,0,0,1,{load:false}),box:[[0,0,0],[96,0,0],[0,30,0],[96,30,0],[0,0,40],[96,0,40],[0,30,40]],pins:[[79,13,36],[32,13,13]]}},
 parts:function(){var o=[];[[0,0,0,30,26,22],[34,0,0,30,26,22],[0,0,22,30,26,22],[34,0,22,30,26,18],[68,0,0,24,26,16]].forEach(function(c){o.push(eq(isoBoxD([c[0],c[1],c[2]],c[3],c[4],c[5])))});
  o.push(isoPart('pump',30,52,0,0.9,{id:'pump'}));o.push(isoPart('valve',86,46,6,1.1,{id:'valve'}));
  return {inner:o.join(''),box:[[0,0,0],[96,0,0],[0,70,0],[96,70,0],[0,0,48],[96,0,48],[0,70,48]],pins:[[32,13,44]]}}
};
/* split a cell at ", " but never inside a [placeholder] */
function parts(s){var o=[],d=0,st=0;s=String(s||'');for(var i=0;i<s.length;i++){var c=s[i];if(c==='[')d++;else if(c===']'&&d)d--;else if(!d&&c===','&&s[i+1]===' '){o.push(s.slice(st,i));st=i+2}}o.push(s.slice(st));return o.map(function(x){return x.trim()}).filter(Boolean)}
function pad(i){return (i<9?'0':'')+(i+1)}
function figure(k,n){var f=SCENES[k];if(!f)return '<div class="aq-site-plates__area" aria-hidden="true"></div>';var s=f(),bx=isoBounds(s.box,18),W=Math.round(bx.w),Hh=Math.round(bx.h),org=[-bx.x,-bx.y];
 var pins=(s.pins||[]).slice(0,n).map(function(p,j){var at=isoPct(isoP(p),W,Hh,org);return '<span class="aq-site-plates__pin" style="left:'+at.left+';top:'+at.top+'">'+(j+1)+'</span>'}).join('');
 return '<div class="aq-site-plates__area" aria-hidden="true"><div class="aq-site-plates__fig aq-iso-figure" style="--ar:'+(W/Hh).toFixed(3)+'">'+isoSvg(W,Hh,s.inner,'aq-iso--navy aq-site-plates__svg',{origin:org})+pins+'</div></div>'}
function lines(c){if(c&&typeof c==='object')return tcell(c);return String(c==null?'':c).split(/\s+·\s+/).map(function(x){return '<span>'+tx(x)+'</span>'}).join('')}
LOOKS['site-plates']=function(b,H){var C=b.cols||[],R=b.rows||[],A=b.art||[],k=++spN,pid='sp-'+k;
 var sites=R.map(function(r){var c0=r[0],t=c0&&typeof c0==='object'?c0.t:String(c0||''),i=t.indexOf(', ');
  return {kind:i>0?t.slice(0,i):t,place:i>0?t.slice(i+2):'',link:c0&&typeof c0==='object'&&c0.link&&wp(c0.link)?c0:null}});
 var head='<thead><tr>'+C.map(function(c){return '<th scope="col">'+tx(c)+'</th>'}).join('')+'</tr></thead>';
 var body=R.map(function(r,i){var s=sites[i],kh=s.link?wlink(s.link.link,s.kind,s.link.intent):tx(s.kind);
  var cells=[1,2,3].map(function(j){var v=r[j];return '<td class="'+['aq-site-plates__what','aq-site-plates__addr','aq-site-plates__contact'][j-1]+'" data-l="'+e(C[j]||'')+'">'+(v==null||v===''?'':lines(v))+'</td>'}).join('');
  return fli('<tr class="aq-site-plates__row'+(i?'':' is-on')+'" data-i="'+i+'">',b,i)
   +'<th scope="row"><div class="aq-site-plates__site"><button type="button" class="aq-site-plates__pick" aria-pressed="'+(i?'false':'true')+'" aria-controls="'+pid+'" aria-label="'+e(s.kind)+'">'+pad(i)+'</button>'
   +'<span class="aq-site-plates__kind">'+kh+'</span>'+(s.place?'<span class="aq-site-plates__place">'+tx(s.place)+'</span>':'')+'</div></th>'+cells+'</tr>'}).join('');
 var table='<table class="aq-site-plates__table">'+head+'<tbody>'+body+'</tbody></table>';
 var stills=R.map(function(r,i){var s=sites[i],w=r[1]&&typeof r[1]!=='object'?parts(r[1]):[];
  return '<figure class="aq-site-plates__still'+(i?'':' is-on')+'" data-i="'+i+'" style="--d:'+i+'"'+(i?' aria-hidden="true"':'')+'>'
   +'<figcaption class="aq-site-plates__cap"><span class="aq-site-plates__ci">'+pad(i)+' / '+pad(R.length-1)+'</span><span class="aq-site-plates__ck">'+tx(s.kind)+'</span>'+(s.place?'<span class="aq-site-plates__cp">'+tx(s.place)+'</span>':'')+'</figcaption>'
   +figure(A[i],w.length)
   +(w.length?'<ol class="aq-site-plates__calls">'+w.map(function(x,j){return '<li><span class="aq-site-plates__pn" aria-hidden="true">'+(j+1)+'</span><span>'+tx(x)+'</span></li>'}).join('')+'</ol>':'')
   +'</figure>'}).join('');
 var plate='<div class="aq-site-plates__plate" id="'+pid+'" data-theme="dark"><div class="aq-site-plates__reel">'+stills+'</div></div>';
 var sub=b.nav?'<p class="aq-site-plates__sub" aria-hidden="true">'+tx(b.nav)+' · '+pad(R.length-1)+'</p>':'';
 return sec('<div class="aq-site-plates"><div class="aq-site-plates__main">'+H+sub+wFold(b,R.length,table,b.fold_noun||'rows')+'</div>'+plate+'</div>','aq-site-plates-sec')};
/* Selection (ported from Subframe Motion "Hover image preview list" (project-index), MIT, (c) 2026 Subframe): pointing
   at a row, focusing into it or pressing its index puts its site on the plate; the reel slides (CSS, 240 ms
   cubic-bezier(.2,.85,.25,1)), instantly for keyboard and under reduced motion. The choice persists. */
function pick(w,i,instant){var cur=w.querySelector('.aq-site-plates__row.is-on');if(cur&&cur.getAttribute('data-i')===String(i))return;
 var plate=w.querySelector('.aq-site-plates__plate');if(plate)plate.classList.toggle('is-instant',!!instant);
 [].forEach.call(w.querySelectorAll('.aq-site-plates__row'),function(r){var on=r.getAttribute('data-i')===String(i);r.classList.toggle('is-on',on);var bt=r.querySelector('.aq-site-plates__pick');if(bt)bt.setAttribute('aria-pressed',on?'true':'false')});
 [].forEach.call(w.querySelectorAll('.aq-site-plates__still'),function(s){var d=+s.getAttribute('data-i')-i;s.style.setProperty('--d',d);s.classList.toggle('is-on',!d);if(d)s.setAttribute('aria-hidden','true');else s.removeAttribute('aria-hidden')});
 w.dispatchEvent(new CustomEvent('aqsitepick',{detail:{i:+i,instant:!!instant}}))}
window.AQsitePick=pick;
function row(ev){var r=ev.target.closest&&ev.target.closest('.aq-site-plates__row');return r&&r.closest('.aq-site-plates')?r:null}
document.addEventListener('mouseover',function(ev){var r=row(ev);if(r)pick(r.closest('.aq-site-plates'),r.getAttribute('data-i'),false)});
document.addEventListener('focusin',function(ev){var r=row(ev);if(r)pick(r.closest('.aq-site-plates'),r.getAttribute('data-i'),true)});
document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-site-plates__pick');if(!t)return;var r=t.closest('.aq-site-plates__row');pick(r.closest('.aq-site-plates'),r.getAttribute('data-i'),ev.detail===0)});
})();
