/* Look "skid-tags" -> SkidTags (design-system/components/SkidTags): an evidence table keyed to an elevation drawing of a
   Purified Water skid (polypropylene pipework on a base frame: a pressure vessel, a pump, two pressure housings, the
   product line out, a control panel). Numbered square tags stand round the drawing, a leader from each to the part its
   standard governs; the table below carries the same numbers, so each row points at its part. Pointing at or focusing
   a row, or choosing a tag, selects that standard: its tag and row light, its part turns flow and a crosshair ring
   glides to it (atlas-hotspots, below). Pass 9b concept research/pass9b/concepts/compliance.4.png.
   Fields, as a table: cols [standard, what we design to, proof, where we show it], rows (cells strings or {t, link}),
   fold, fold_noun. New optional fields: parts, one per row: the drawn part its standard governs (vessel, panel, deadleg,
   wall, joint; a row without one gets no tag); tag, the name of the number column and of the drawing's tag group.
   The drawing is fixed (it names no standard); which row points at which part is data. Desktop shows every row; the
   fold applies on phones, where a readout under the drawing shows the chosen row. */
var ST_W=840,ST_H=420;
/* each part: its anchor on the drawing (leader start, ring) and its tag (leader end) in viewBox units */
var ST_PART={vessel:{a:[156,181],t:[24,181]},panel:{a:[688,152],t:[816,152]},deadleg:{a:[610,46],t:[610,14]},wall:{a:[720,100],t:[720,14]},joint:{a:[510,304],t:[510,406]}};
var ST_CL={eq:'aq-skid-tags__eq',fn:'aq-skid-tags__fn',fl:'aq-skid-tags__fl',gr:'aq-skid-tags__gr',dim:'aq-skid-tags__dim',cut:'aq-skid-tags__cut',sec:'aq-skid-tags__sec',ld:'aq-skid-tags__ld',dot:'aq-skid-tags__dot'};
function stR(x,y,w,h,c){return '<rect class="'+ST_CL[c||'eq']+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'"/>'}
function stP(d,c){return '<path class="'+ST_CL[c||'eq']+'" d="'+d+'"/>'}
function stC(x,y,r,c){return '<circle class="'+ST_CL[c||'eq']+'" cx="'+x+'" cy="'+y+'" r="'+r+'"/>'}
/* An orthogonal pipe run drawn as fitted pieces: straight lengths and elbow fittings (bend radius 2r), their joints
   showing as lines across the pipe; the water as one flow centre line with the same bends. */
function stPipe(pts,r){var R=2*r,body='',fl='M'+pts[0][0]+' '+pts[0][1],st=pts[0],n=pts.length,
  seg=function(p,q){var x=Math.min(p[0],q[0]),y=Math.min(p[1],q[1]);if(p[1]===q[1])return stR(x,p[1]-r,Math.abs(q[0]-p[0]),2*r);return stR(p[0]-r,y,2*r,Math.abs(q[1]-p[1]))},
  dir=function(p,q){return [Math.sign(q[0]-p[0]),Math.sign(q[1]-p[1])]},pt=function(p){return p[0]+' '+p[1]};
 for(var i=1;i<n;i++){var P=pts[i];if(i<n-1){var a=dir(pts[i-1],P),b=dir(P,pts[i+1]),A=[P[0]-a[0]*R,P[1]-a[1]*R],B=[P[0]+b[0]*R,P[1]+b[1]*R],s=a[0]*b[1]-a[1]*b[0]>0?1:0;
   body+=seg(st,A)+stP('M'+pt([A[0]-b[0]*r,A[1]-b[1]*r])+' A'+(R+r)+' '+(R+r)+' 0 0 '+s+' '+pt([B[0]+a[0]*r,B[1]+a[1]*r])+' L'+pt([B[0]-a[0]*r,B[1]-a[1]*r])+' A'+(R-r)+' '+(R-r)+' 0 0 '+(1-s)+' '+pt([A[0]+b[0]*r,A[1]+b[1]*r])+' Z');
   fl+=' L'+pt(A)+' A'+R+' '+R+' 0 0 '+s+' '+pt(B);st=B}else{body+=seg(st,P);fl+=' L'+pt(P)}}
 return {body:body,flow:stP(fl,'fl')}}
function stDrawing(){var g=function(k,s){return '<g class="aq-skid-tags__part" data-part="'+k+'">'+s+'</g>'};
 var A=stPipe([[212,258],[236,258],[236,300],[260,300]],6),B=stPipe([[280,280],[280,96],[480,96],[480,112]],6),C=stPipe([[430,288],[430,304],[540,304],[540,100],[800,100]],6);
 var floor=stP('M30 362 H810','gr');
 var frame=stR(72,32,696,8)+stR(72,40,8,290)+stR(760,40,8,290)+stR(72,330,696,14)+stP('M72 335 H768','fn')
  +[84,412,748].map(function(x){return stR(x-5,344,10,12)+stR(x-10,356,20,6)}).join('');
 var vessel=stR(134,282,6,48)+stR(200,282,6,48)+stR(167,104,6,16)+stC(170,96,9)+stP('M170 96 L175 91','fn')
  +stP('M128 140 A42 20 0 0 1 212 140 V270 A42 20 0 0 1 128 270 Z')+stP('M128 140 H212 M128 270 H212','fn')
  +stR(150,168,40,26,'fn')+stP('M156 177 H184 M156 185 H176','fn');
 var pump=stR(256,320,120,10)+stR(300,288,6,24)+stR(306,282,60,36)+stP('M318 282 V318 M330 282 V318 M342 282 V318 M354 282 V318','fn')+stR(366,288,8,24)
  +stC(280,300,20)+stC(280,300,7,'fn')+stR(272,276,16,4);
 var house=[430,480].map(function(x){return stR(x-15,120,30,160)+stR(x-19,112,38,8)+stR(x-19,280,38,8)+stP('M'+(x-9)+' 124 V276','fn')}).join('')
  +stR(424,102,12,10)+stR(474,288,12,10);
 var deadleg=stR(604,74,12,20)+stR(598,60,24,16)+stR(603,50,14,10)+stR(594,44,32,6)+stR(622,63,22,10)+stP('M644 63 V73','fn')+stP('M622 68 H644','fl')
  +stP('M610 94 V76','fl')+stP('M598 94 H580 M598 76 H580 M586 94 V76 M583 91 L589 97 M583 73 L589 79','dim')+'<text class="aq-skid-tags__lab" x="576" y="89" text-anchor="end">L</text>';
 var wall=stR(690,92,60,16,'cut')+stR(690,94,60,2.5,'sec')+stR(690,103.5,60,2.5,'sec')+stP('M690 100 H750','fl')+stP('M690 90 L686 96 L694 104 L690 110 M750 90 L746 96 L754 104 L750 110','fn');
 var joint=stP('M506 298 A4 4 0 0 1 514 298 Z M506 310 A4 4 0 0 0 514 310 Z')+stP('M510 298 V310','fn');
 var panel=stR(588,322,134,8)+stR(590,130,130,192)+stP('M655 130 V322','fn')+stR(602,150,42,30,'fn')+stP('M606 172 L614 166 L620 169 L628 158 L634 162 L640 156','fl')
  +stC(610,198,3.5,'fn')+stC(622,198,3.5,'fn')+stC(634,198,3.5,'fn')+stC(623,220,5,'fn')+stP('M623 220 L626 216','fn')+stR(659,220,4,20,'fn')
  +stR(668,146,40,12,'fn')+stP('M668 290 H708 M668 296 H708 M668 302 H708','fn');
 var out=stR(798,90,6,20)+stP('M772 96 L778 100 L772 104','fl');
 var leads='';Object.keys(ST_PART).forEach(function(k){var p=ST_PART[k],a=p.a,t=p.t,h=a[1]===t[1],e2=h?[t[0]+(t[0]<a[0]?14:-14),t[1]]:[t[0],t[1]+(t[1]<a[1]?14:-14)];
  leads+='<g class="aq-skid-tags__lead" data-part="'+k+'">'+stP('M'+a[0]+' '+a[1]+' L'+e2[0]+' '+e2[1],'ld')+stC(a[0],a[1],2.5,'dot')+'</g>'});
 return {floor:floor+frame,eq:g('vessel',vessel)+pump+house+A.body+B.body+C.body+g('joint',joint)+g('deadleg',deadleg)+g('wall',wall)+g('panel',panel)+out,
  flow:A.flow+B.flow+C.flow,leads:leads}}
function stTxt(c){return String(c&&typeof c==='object'?c.t||'':c==null?'':c)}
LOOKS['skid-tags']=function(b,H){var C=b.cols||[],R=b.rows||[],P=b.parts||[],K='aq-skid-tags',used={},tags='',D=stDrawing();
 var num=function(i){return (i<9?'0':'')+(i+1)};
 R.forEach(function(r,i){var k=P[i],p=ST_PART[k];if(!p||used[k])return;used[k]=1;
  tags+='<button type="button" class="'+K+'__tag" data-k="'+i+'" data-part="'+k+'" aria-pressed="false" aria-label="'+num(i)+' '+e(stTxt(r[0]))+'" style="left:'+(p.t[0]/ST_W*100).toFixed(3)+'%;top:'+(p.t[1]/ST_H*100).toFixed(3)+'%"><span>'+num(i)+'</span></button>'});
 /* only the parts some row points at keep their leader */
 var leads=D.leads.replace(/<g class="aq-skid-tags__lead" data-part="([a-z]+)">.*?<\/g>/g,function(m,k){return used[k]?m:''});
 var svg='<svg class="'+K+'__svg" viewBox="0 0 '+ST_W+' '+ST_H+'" aria-hidden="true" focusable="false"><g class="'+K+'__ground">'+D.floor+'</g><g class="'+K+'__plant">'+D.eq+'</g><g class="'+K+'__water">'+D.flow+'</g>'+leads+'</svg>';
 var first=-1;R.forEach(function(r,i){if(first<0&&ST_PART[P[i]])first=i});
 var fig='<div class="'+K+'__fig" role="group" aria-label="'+e(b.tag||C[0]||'')+'">'+svg+'<span class="'+K+'__crossbox" aria-hidden="true"><span class="'+K+'__cross"></span></span>'+tags+'</div>'
  +'<p class="'+K+'__detail" aria-live="polite"></p>';
 var head='<thead><tr><th scope="col" class="'+K+'__nh"><span class="'+K+'__vh">'+tx(b.tag||'')+'</span></th>'+C.slice(0,4).map(function(c){return '<th scope="col">'+tx(c)+'</th>'}).join('')+'</tr></thead>';
 var body='<tbody>'+R.map(function(r,i){var k=P[i],has=!!(ST_PART[k]&&used[k]);
  var cell=function(j,cls){var c=r[j];return '<td class="'+K+'__'+cls+'"><span class="'+K+'__k" aria-hidden="true">'+tx(C[j]||'')+'</span>'+(c==null?'':tcell(c))+'</td>'};
  return fli('<tr class="'+K+'__row" data-k="'+i+'"'+(has?' data-part="'+k+'"':'')+'>',b,i)
   +'<td class="'+K+'__n">'+(has?'<button type="button" class="'+K+'__num" data-k="'+i+'" aria-pressed="false" aria-label="'+num(i)+' '+e(stTxt(r[0]))+'"><span>'+num(i)+'</span></button>':'<span class="'+K+'__num-x" aria-hidden="true">'+num(i)+'</span>')+'</td>'
   +'<th scope="row" class="'+K+'__std">'+tcell(r[0])+'</th>'+cell(1,'how')+cell(2,'proof')+cell(3,'go')+'</tr>'}).join('')+'</tbody>';
 var table='<table class="'+K+'__table">'+head+body+'</table>';
 return sec('<div class="'+K+'" data-first="'+first+'"><div class="'+K+'__top">'+H+'<div class="'+K+'__stage">'+fig+'</div></div>'
  +wFold(b,R.length,table,b.fold_noun||'standards')+'</div>','aq-band--limestone '+K+'-sec" data-theme="light')};

// Ported from Subframe Motion "Inside the image" (atlas-hotspots), MIT, (c) 2026 Subframe
/* One selection shared by the drawing's tags and the table's rows (the library's pins and index): choosing a tag or a
   row number, pointing at a row or focusing into it selects that standard; its tag and number turn pressed (112 %,
   180 ms), its part and leader turn flow, and the crosshair ring glides to the part (a full-size layer translated to
   the anchor's percentages, 250 ms cubic-bezier(.2,.8,.2,1), CSS, so it is instant under reduced motion). Arrow keys,
   Home and End step through the tags (or the row numbers) and select as they go. The selection stays until another is
   made; the first tagged row starts selected. The readout (aria-live) names the chosen row. */
function stPick(w,k){if(!w)return;var s=String(k);if(w.getAttribute('data-k')===s)return;
 var row=w.querySelector('.aq-skid-tags__row[data-k="'+s+'"]'),part=row&&row.getAttribute('data-part'),p=part&&ST_PART[part];if(!p)return;
 w.setAttribute('data-k',s);
 [].forEach.call(w.querySelectorAll('[data-k]'),function(x){if(x===w)return;var on=x.getAttribute('data-k')===s;x.classList.toggle('is-on',on);if(x.hasAttribute('aria-pressed'))x.setAttribute('aria-pressed',on?'true':'false')});
 [].forEach.call(w.querySelectorAll('.aq-skid-tags__part, .aq-skid-tags__lead'),function(x){x.classList.toggle('is-on',x.getAttribute('data-part')===part)});
 var cr=w.querySelector('.aq-skid-tags__cross');if(cr){cr.style.setProperty('--cx',(p.a[0]/ST_W*100).toFixed(3)+'%');cr.style.setProperty('--cy',(p.a[1]/ST_H*100).toFixed(3)+'%');cr.classList.add('is-on')}
 var d=w.querySelector('.aq-skid-tags__detail'),c=row.children;
 if(d&&c[2]){var how=c[2].cloneNode(true),kk=how.querySelector('.aq-skid-tags__k');if(kk)kk.remove();
  d.innerHTML='<span class="aq-skid-tags__dn" aria-hidden="true">'+e(c[0].textContent)+'</span><span class="aq-skid-tags__ds">'+c[1].innerHTML+'</span><span class="aq-skid-tags__dh">'+how.innerHTML+'</span>'}}
function stInit(root){[].forEach.call((root||document).querySelectorAll('.aq-skid-tags:not([data-k])'),function(w){var f=+w.getAttribute('data-first');if(f>=0)stPick(w,f)})}
if(typeof document!=='undefined'&&document.addEventListener){
 var stObs=typeof MutationObserver!=='undefined'&&new MutationObserver(function(){if(document.querySelector('.aq-skid-tags:not([data-k])'))stInit()});
 if(stObs)stObs.observe(document.documentElement,{childList:true,subtree:true});
 document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-skid-tags__tag, .aq-skid-tags__num');if(t)stPick(t.closest('.aq-skid-tags'),t.getAttribute('data-k'))});
 ['pointerover','focusin'].forEach(function(n){document.addEventListener(n,function(ev){if(n==='pointerover'&&ev.pointerType&&ev.pointerType!=='mouse')return;
  var r=ev.target.closest&&ev.target.closest('.aq-skid-tags__row[data-part]');if(r)stPick(r.closest('.aq-skid-tags'),r.getAttribute('data-k'))})});
 document.addEventListener('keydown',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-skid-tags__tag, .aq-skid-tags__num');if(!t||['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].indexOf(ev.key)<0)return;
  var w=t.closest('.aq-skid-tags'),L=[].filter.call(w.querySelectorAll(t.classList.contains('aq-skid-tags__tag')?'.aq-skid-tags__tag':'.aq-skid-tags__num'),function(x){return x.offsetParent}),i=L.indexOf(t),n=L.length;if(!n)return;
  ev.preventDefault();var j=ev.key==='Home'?0:ev.key==='End'?n-1:(i+(ev.key==='ArrowDown'||ev.key==='ArrowRight'?1:n-1))%n;stPick(w,L[j].getAttribute('data-k'));L[j].focus()});
}
