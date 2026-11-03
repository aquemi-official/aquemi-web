/* Look "redline-sheet" -> RedlineSheet (design-system/components/RedlineSheet): qualification failures caught on paper.
   One limestone drawing sheet (border, zone numbers, title block) carries a column per failure, each a design-review
   markup: a revision triangle and what fails at qualification on top, a small drawing of the design with the mistake
   ringed by a revision cloud (fail ink, with the design mistake struck through under it), and the correction drawn into
   the same figure in flow with what we design in as the markup note.
   Fields, as a table: cols [fails at qualification, design mistake, what we design in], rows (cells strings or {t, link}).
   Optional: figs (one per row: "peak", "deadleg", "setpoint" or "sheet"; default from the row's words), block (title
   block cells; default ["Aquemi", nav]). Phones: the sheet holds the markups one under the other; the P&ID band is a
   PhoneKit sticky strip (150 px, the plan at full height, about 820 px wide) that pans to the pin of the markup being
   read and lights it; no zone ruler. */
LOOKS['redline-sheet']=(function(){
 function cloud(cx,cy,rx,ry,n){var d='',p=[];for(var i=0;i<=n;i++){var t=-Math.PI/2+i*2*Math.PI/n;p.push([cx+rx*Math.cos(t),cy+ry*Math.sin(t)])}
  d='M'+p[0][0].toFixed(1)+' '+p[0][1].toFixed(1);for(var j=1;j<p.length;j++){var a=p[j-1],c=p[j],ch=Math.hypot(c[0]-a[0],c[1]-a[1]);d+='A'+(ch*0.62).toFixed(1)+' '+(ch*0.62).toFixed(1)+' 0 0 1 '+c[0].toFixed(1)+' '+c[1].toFixed(1)}return d}
 function P(d,c){return '<path class="aq-redline-sheet'+'__'+c+'" d="'+d+'"/>'}
 function T(x,y,s,c,a){return '<text class="aq-redline-sheet__lbl'+(c?' aq-redline-sheet'+'__lbl--'+c:'')+'" x="'+x+'" y="'+y+'"'+(a?' text-anchor="'+a+'"':'')+'>'+e(s)+'</text>'}
 function rev(x,y,n){return '<g class="aq-redline-sheet__tri">'+P('M'+x+' '+(y-11)+'L'+(x+11)+' '+(y+8)+'L'+(x-11)+' '+(y+8)+'Z','cl')+T(x,y+5,n,'fail','middle')+'</g>'}
 var FIG={
  /* demand over a day: the average line the loop was sized on, the peaks clouded, the peak line drawn in */
  peak:function(n){var v=[2,2,2,2,3,6,9,7,5,4,4,5,6,5,4,4,5,7,9,10,6,4,3,2],o='';
   v.forEach(function(h,i){o+='<rect class="aq-redline-sheet__bar" x="'+(28+i*11)+'" y="'+(160-h*12)+'" width="7" height="'+(h*12)+'"/>'});
   return P('M20 160H306M20 22V160','ln')+o+P('M20 104H306','avg')+T(306,98,'avg','','end')
    +'<g class="aq-redline-sheet__mark">'+P(cloud(238,66,40,38,11),'cl')+rev(286,26,n)+'</g>'
    +'<g class="aq-redline-sheet__fixg">'+P('M20 40H306','fixln')+T(24,34,'peak','flow')+'</g>'},
  /* a branch off the loop, drawn without its length: the length clouded, then dimensioned */
  deadleg:function(n){
   return P('M10 58H310M10 74H142M158 74H310','ln')+P('M142 74V130M158 74V130','ln')
    +P('M140 130H160L150 142ZM140 154H160L150 142Z','ln')+P('M150 142H174M174 134V150','thin')+P('M44 66H74M68 61L74 66L68 71','flw')
    +'<g class="aq-redline-sheet__mark">'+P(cloud(150,104,42,40,11),'cl')+T(70,118,'L = ?','fail','middle')+rev(206,62,n)+'</g>'
    +'<g class="aq-redline-sheet__fixg">'+P('M226 74V142M220 74H232M220 142H232','fixln')+T(234,112,'L','flow')+P('M142 172H158M142 166V178M158 166V178','fixln')+T(166,176,'D','flow')+'</g>'},
  /* the specification: a sentence with no setpoint, clouded, then the setpoint and the divert valve written in */
  setpoint:function(n){var o='',L=[[34,120],[50,138],[66,96],[98,132],[114,110],[130,140],[146,84]];
   L.forEach(function(l){o+=P('M32 '+l[0]+'H'+(32+l[1]),'txt')});
   return '<rect class="aq-redline-sheet__paper" x="20" y="16" width="176" height="152"/>'+o+P('M32 82H88','txt')+P('M94 82H170','gap')
    +P('M206 92H240M262 92H300M251 70V40M251 114V146','ln')+P('M240 82L262 102V82L240 102Z','ln')+P('M251 92V70','thin')+P('M241 70H261','thin')+P('M240 146H262L251 158Z','thin')+T(251,176,'drain','','middle')
    +'<g class="aq-redline-sheet__mark">'+P(cloud(132,82,52,20,10),'cl')+T(70,74,'?','fail','middle')+rev(186,42,n)+'</g>'
    +'<g class="aq-redline-sheet__fixg">'+P('M94 82H170','fixln')+T(132,100,'SP','flow','middle')+P('M251 114V146','fixln')+'</g>'},
  sheet:function(n){var o='';for(var i=0;i<7;i++)o+=P('M40 '+(34+i*18)+'H'+(240-(i*23)%90),'txt');
   return '<rect class="aq-redline-sheet__paper" x="24" y="16" width="272" height="152"/>'+o+'<g class="aq-redline-sheet__mark">'+P(cloud(160,88,64,24,12),'cl')+rev(240,50,n)+'</g>'}
 };
 /* pass 9b (concept svc-design.0): the plant's P&ID as a navy band across the head of the sheet, each failure pinned
    where it happens (the loop sized at the pump, the branch without its length, the divert after the conductivity
    instrument). Drawn inline (flat ISA-style symbols, not IsoKit), aria-hidden: the columns carry the words. */
 var PIN={peak:[690,160],deadleg:[880,132],setpoint:[400,120],sheet:[600,110]};
 function band(kinds){var L=function(d,c){return '<path class="aq-redline-sheet__p'+(c?' aq-redline-sheet__p--'+c:'')+'" d="'+d+'"/>'},
   W=function(x,y,s){return '<text class="aq-redline-sheet__pl" x="'+x+'" y="'+y+'" text-anchor="middle">'+s+'</text>'},
   chev=function(x,y,d){return L(d==='d'?'M'+(x-5)+' '+(y-4)+'L'+x+' '+(y+2)+'L'+(x+5)+' '+(y-4):d==='l'?'M'+(x+4)+' '+(y-5)+'L'+(x-2)+' '+y+'L'+(x+4)+' '+(y+5):d==='u'?'M'+(x-5)+' '+(y+4)+'L'+x+' '+(y-2)+'L'+(x+5)+' '+(y+4):'M'+(x-4)+' '+(y-5)+'L'+(x+2)+' '+y+'L'+(x-4)+' '+(y+5),'chev')};
  var g='<path class="aq-redline-sheet__grid" d="'+[1,2,3,4,5,6,7,8,9,10,11].map(function(i){return 'M'+i*100+' 0V220'}).join('')+'M0 55H1200M0 110H1200M0 165H1200"/>';
  g+=L('M20 120H70M110 120H150M230 120H260M320 120H390M410 120H470','w')+chev(40,120)+chev(135,120)+chev(245,120)+chev(450,120);
  g+=L('M70 96H110V144H70ZM76 102V138M104 102V138')+W(90,166,'PRE');
  g+=L('M150 98H230V142H150ZM150 142L230 98')+W(190,166,'RO');
  g+=L('M260 98H320V142H260ZM270 98V142M280 98V142M290 98V142M300 98V142M310 98V142')+W(290,166,'EDI');
  g+=L('M352 120V100')+'<circle class="aq-redline-sheet__p aq-redline-sheet__cit" cx="352" cy="88" r="12"/>'+W(352,92,'CIT');
  g+=L('M390 112L410 128V112L390 128Z')+L('M400 128V188','w')+chev(400,170,'d')+L('M390 188H410L400 200Z')+W(400,214,'drain');
  g+=L('M470 70Q470 44 500 44Q530 44 530 70V170H470Z')+W(500,192,'TANK');
  g+=L('M530 160H576','w')+'<circle class="aq-redline-sheet__p" cx="590" cy="160" r="14"/>'+L('M583 151L600 160L583 169Z');
  g+=L('M604 160H1150V60H560Q530 60 530 70','w')+chev(800,160)+chev(1150,110,'u')+chev(1000,60,'l');
  [760,880,1000].forEach(function(x,i){var y2=i===1?132:96;g+=L('M'+x+' 60V'+(y2-10),'w')+L('M'+(x-8)+' '+(y2-10)+'L'+(x+8)+' '+(y2+6)+'H'+(x-8)+'L'+(x+8)+' '+(y2-10)+'Z')+W(x,y2+24,'POU')});
  var pins='',spots=[];kinds.forEach(function(k,i){var p=PIN[k]||PIN.sheet;spots.push(p);
   pins+='<g class="aq-redline-sheet__pin" data-i="'+i+'" transform="translate('+p[0]+' '+p[1]+')"><circle class="aq-redline-sheet__ring" r="26"/><path class="aq-redline-sheet__ptri" d="M14 -46L28 -22H0Z"/><text class="aq-redline-sheet__pn" x="14" y="-26" text-anchor="middle">'+(i+1)+'</text></g>'
    /* pass 12 phone twin: a bigger pin for the sticky strip (shown only on phones; PhoneKit lights it with its markup) */
    +'<g class="aq-redline-sheet__ppin" data-pk-key="'+i+'" transform="translate('+p[0]+' '+p[1]+')"><circle class="aq-redline-sheet__ring" r="34"/><path class="aq-redline-sheet__ptri" d="M22 -72L44 -34H0Z"/><text class="aq-redline-sheet__pn" x="22" y="-41" text-anchor="middle">'+(i+1)+'</text></g>'});
  return '<div class="aq-redline-sheet__band" data-theme="dark" aria-hidden="true" data-pk-fig data-spots="'+spots.map(function(p){return p.join(',')}).join(' ')+'"><svg viewBox="0 0 1200 220" focusable="false" preserveAspectRatio="xMidYMid meet"><g class="aq-redline-sheet__cam">'+g+pins+'<path class="aq-redline-sheet__dim" d=""/></g></svg></div>'}
 function pick(r){var s=r.map(function(c){return String(c&&typeof c==='object'?c.t:c||'')}).join(' ');
  return /peak|average|turbulent|demand/i.test(s)?'peak':/dead leg|branch/i.test(s)?'deadleg':/setpoint|divert|drain|interlock/i.test(s)?'setpoint':'sheet'}
 return function(b,H){var C=b.cols||[],R=b.rows||[],F=b.figs||[],blk=(b.block||['Aquemi',b.nav||'']).filter(Boolean);
  var k=function(i,c){return '<p class="aq-redline-sheet__k'+(c?' aq-redline-sheet__k--'+c:'')+'">'+tx(C[i]||'')+'</p>'};
  var zones='<div class="aq-redline-sheet__zones" aria-hidden="true">'+[1,2,3,4,5,6].map(function(z){return '<span>'+z+'</span>'}).join('')+'</div>';
  var list='<ol class="aq-redline-sheet__list" role="list">'+R.map(function(r,i){var f=FIG[F[i]]?F[i]:pick(r),n=String(i+1);
   return '<li class="aq-redline-sheet__item" style="--i:'+i+'" data-pk-row="'+i+'">'
    +'<div class="aq-redline-sheet__head"><span class="aq-redline-sheet__rev" aria-hidden="true">'+n+'</span>'+k(0,'fail')+'<h3 class="aq-redline-sheet__fail">'+tcell(r[0])+'</h3></div>'
    +'<figure class="aq-redline-sheet__fig" aria-hidden="true"><svg viewBox="0 0 320 190" focusable="false">'+FIG[f](n)+'</svg></figure>'
    +(r[1]!=null?'<div class="aq-redline-sheet__err">'+k(1)+'<p class="aq-redline-sheet__mistake">'+tcell(r[1])+'</p></div>':'')
    +(r[2]!=null?'<div class="aq-redline-sheet__fix">'+k(2,'flow')+'<p class="aq-redline-sheet__note">'+tcell(r[2])+'</p></div>':'')
    +'</li>'}).join('')+'</ol>';
  var tb=blk.length?'<div class="aq-redline-sheet__block" aria-hidden="true">'+blk.map(function(c){return '<span>'+e(c)+'</span>'}).join('')+'<span>'+R.length+' markups</span></div>':'';
  var kinds=R.map(function(r,i){return FIG[F[i]]?F[i]:pick(r)});
  return sec(H+'<div class="aq-redline-sheet" data-theme="light" data-paper data-pk-sticky data-pk-h="150" data-pk-zoom="1">'+zones+band(kinds)+list+tb+'</div>','aq-redline-sheet-sec')}
})();
/* Pointing at a markup column turns the band's camera onto its pin: ported from Subframe Motion "Product tour
   spotlight" (guided-inspection), MIT, (c) 2026 Subframe: the plan scales about the stop (x1.7) and recentres in
   0.55 s on cubic-bezier(0.22, 0.75, 0.22, 1) while the rest dims behind a spotlight; leaving returns the whole plan.
   CSS transitions, so it stands still under reduced motion. The entrance tour (motion.js) uses the same camera. */
var RS_CAM={W:1200,H:220,S:1.7};
function rsCam(band,i){var cam=band&&band.querySelector('.aq-redline-sheet__cam');if(!cam)return;
 var sp=(band.getAttribute('data-spots')||'').split(' ').map(function(p){return p.split(',').map(Number)}),p=i==null?null:sp[i],dim=band.querySelector('.aq-redline-sheet__dim');
 [].forEach.call(band.querySelectorAll('.aq-redline-sheet__pin'),function(g){g.classList.toggle('is-on',p!=null&&+g.getAttribute('data-i')===+i)});
 if(!p){cam.style.transform='';band.classList.remove('is-zoom');clearTimeout(band._rsT);band._rsT=setTimeout(function(){if(!band.classList.contains('is-zoom'))dim.setAttribute('d','')},600);return}
 var s=RS_CAM.S,tx=Math.min(0,Math.max(RS_CAM.W-RS_CAM.W*s,RS_CAM.W/2-p[0]*s)),ty=Math.min(0,Math.max(RS_CAM.H-RS_CAM.H*s,RS_CAM.H/2-p[1]*s));
 dim.setAttribute('d','M-200 -200H1400V420H-200ZM'+(p[0]-70)+' '+p[1]+'a70 70 0 1 0 140 0a70 70 0 1 0 -140 0Z');
 cam.style.transform='translate('+tx.toFixed(1)+'px,'+ty.toFixed(1)+'px) scale('+s+')';band.classList.add('is-zoom')}
if(typeof window!=='undefined')window.AQrsCam=rsCam;
(function(){
 if(typeof document==='undefined')return;
 document.addEventListener('mouseover',function(ev){var it=ev.target.closest&&ev.target.closest('.aq-redline-sheet__item'),sh=ev.target.closest&&ev.target.closest('.aq-redline-sheet');if(!sh||sh.hasAttribute('data-tour')||sh.hasAttribute('data-pk-on'))return;
  var list=[].slice.call(sh.querySelectorAll('.aq-redline-sheet__item'));rsCam(sh.querySelector('.aq-redline-sheet__band'),it?list.indexOf(it):null)});
 document.addEventListener('mouseout',function(ev){var sh=ev.target.closest&&ev.target.closest('.aq-redline-sheet');if(sh&&!sh.contains(ev.relatedTarget)&&!sh.hasAttribute('data-tour')&&!sh.hasAttribute('data-pk-on'))rsCam(sh.querySelector('.aq-redline-sheet__band'),null)});
})();
