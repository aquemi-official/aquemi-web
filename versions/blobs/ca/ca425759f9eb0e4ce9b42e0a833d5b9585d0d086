/* Look "role-loop" -> RoleLoop (design-system/components/RoleLoop): the roles as bays of one pipe loop on the navy
   band (pass 9b concept careers.0). The loop is one twin-wall pipe with water in it; it meanders through the grid of
   role cards, over one card and under the next, so each role sits in a bay of its own, and on the second row it runs
   back to where it began. Each role's bay has a short branch off the loop into the card with a valve on it. The valve
   reads open or closed only when the role's own copy says so (the last " · " part of the pay column is "Open..." or
   "Closed..."); while that part is a [placeholder] or missing the valve is drawn dashed and no water enters the branch.
   Each card: "01 / 06", the role as a title, the status line (a small valve and the status text), then the columns
   as labelled fields (labels from cols; the pay column without its status part).
   Fields (a table block): h, intro, cols [role, what you do, must have, base and travel, pay and opening], rows
   (strings; the last cell "pay · status"). Best for 1 to 6 roles (one or two rows of three); more roles still draw.
   The pipe is laid out from the rendered cards (ResizeObserver), so it follows wrapping; without it the cards stand
   alone. Container under 860 px: the cards stack and the loop runs down their left and back up their right. */
(function(){
var NS='http://www.w3.org/2000/svg',P='aq-role-loop'+'__';
function rlState(s){s=String(s||'').trim();return /^open\b/i.test(s)?'open':/^closed\b/i.test(s)?'closed':'unset'}
function rlValve(){return '<svg class="'+P+'vk" viewBox="0 0 20 14" aria-hidden="true" focusable="false"><path d="M4 4L16 12V4L4 12Z"/><path d="M10 8V2M7 2H13"/></svg>'}
LOOKS['role-loop']=function(b,H){var R=b.rows||[],C=b.cols||[],n=R.length;if(!n)return sec(H,'aq-band--navy');
 var num=function(i){return (i<9?'0':'')+(i+1)},last=C.length-1;
 var li=R.map(function(r,i){var cells=r||[],pay=cells[last],stx='',pt=pay;
  if(typeof pay==='string'){var k=pay.lastIndexOf(' · ');if(k>-1){pt=pay.slice(0,k);stx=pay.slice(k+3)}}
  var stt=rlState(stx);
  var dl=C.slice(1).map(function(c,j){var v=j+1===last?pt:cells[j+1];if(v==null||v==='')return '';
   return '<div class="'+P+'f"><dt>'+tx(c)+'</dt><dd>'+tcell(v)+'</dd></div>'}).join('');
  return '<li class="'+P+'bay" data-i="'+i+'" data-valve="'+stt+'" style="--i:'+i+'">'
   +'<p class="'+P+'no" aria-hidden="true"><span>'+num(i)+'</span> / '+num(n-1)+'</p>'
   +'<h3 class="'+P+'t">'+tcell(cells[0])+'</h3>'
   +(stx?'<p class="'+P+'st is-'+stt+'">'+rlValve()+'<span>'+tx(stx)+'</span></p>':'')
   +'<dl class="'+P+'dl">'+dl+'</dl></li>'}).join('');
 var svg='<svg class="'+P+'pipe" aria-hidden="true" focusable="false"><g class="'+P+'segs"></g><path class="'+P+'wall"/><path class="'+P+'bore"/><path class="'+P+'water"/><g class="'+P+'stubs"></g></svg>';
 return sec(H+'<div class="aq-role-loop">'+svg+'<ol class="'+P+'bays" role="list">'+li+'</ol></div>','aq-band--navy aq-role-loop-sec')};

/* rounded polyline: corners cut at radius r with a quadratic through the corner; closed paths start at Q[0], which
   the layout keeps on a straight run */
function rlPath(Q,r,closed){var n=Q.length,f=function(v){return v.toFixed(1)},s='M'+f(Q[0][0])+' '+f(Q[0][1]);
 var end=closed?n:n-1;for(var i=1;i<end;i++){var a=Q[i-1],c=Q[i],z=Q[(i+1)%n],d1=Math.hypot(c[0]-a[0],c[1]-a[1]),d2=Math.hypot(z[0]-c[0],z[1]-c[1]);
  if(!d1||!d2)continue;var k=Math.min(r,d1/2,d2/2);
  s+='L'+f(c[0]+(a[0]-c[0])*k/d1)+' '+f(c[1]+(a[1]-c[1])*k/d1)+'Q'+f(c[0])+' '+f(c[1])+' '+f(c[0]+(z[0]-c[0])*k/d2)+' '+f(c[1]+(z[1]-c[1])*k/d2)}
 return s+(closed?'L'+f(Q[0][0])+' '+f(Q[0][1])+'Z':'L'+f(Q[n-1][0])+' '+f(Q[n-1][1]))}
/* how far along the closed polyline a point on it lies, 0..1 */
function rlAlong(Q,p){var T=0,at=0,best=1e9,n=Q.length;
 for(var i=0;i<n;i++){var a=Q[i],z=Q[(i+1)%n],L=Math.hypot(z[0]-a[0],z[1]-a[1]);if(L){var t=Math.max(0,Math.min(1,((p[0]-a[0])*(z[0]-a[0])+(p[1]-a[1])*(z[1]-a[1]))/(L*L))),
  d=Math.hypot(a[0]+(z[0]-a[0])*t-p[0],a[1]+(z[1]-a[1])*t-p[1]);if(d<best){best=d;at=T+L*t}}T+=L}
 return T?at/T:0}
function rlEl(g,tag,cls,i){var x=g.querySelector('.'+cls.split(' ')[0]+'[data-i="'+i+'"]');if(!x){x=document.createElementNS(NS,tag);x.setAttribute('class',cls);x.setAttribute('data-i',i);g.appendChild(x)}return x}
function lay(w){var ol=w.querySelector('.'+P+'bays'),svg=w.querySelector('.'+P+'pipe');if(!ol||!svg)return;
 var wr=w.getBoundingClientRect();if(!wr.width)return;
 var cards=[].slice.call(ol.children),rc=cards.map(function(c){var r=c.getBoundingClientRect();return {l:r.left-wr.left,r:r.right-wr.left,t:r.top-wr.top,b:r.bottom-wr.top}});
 var rows=[];rc.forEach(function(r,i){var row=null;rows.forEach(function(x){if(Math.abs(x.t-r.t)<4)row=x});if(!row){row={t:r.t,b:r.b,c:[]};rows.push(row)}row.c.push(i);row.b=Math.max(row.b,r.b)});
 var C=rows[0].c.length,a=24,rr=16,Q=[],seg=[],stub=[],cs=getComputedStyle(ol),gx=parseFloat(cs.columnGap)||64,ys=function(i){return rc[i].t+8};
 svg.setAttribute('viewBox','0 0 '+wr.width.toFixed(1)+' '+wr.height.toFixed(1));
 if(C===1){/* stacked: down the cards' left, back up their right */
  var xL=rc[0].l-32,xR=rc[0].r+a-4,yT=rc[0].t-a,yB=rc[rc.length-1].b+a;
  Q=[[xL,rc[0].t],[xL,yB],[xR,yB],[xR,yT],[xL,yT]];
  rc.forEach(function(r,i){seg[i]=[[xL,r.t-8],[xL,r.b+8]];stub[i]=[xL,ys(i),r.l]});
 }else{/* lanes: verticals in the column gaps (and outside the outer columns), horizontals a quarter row gap off the cards */
  var cols=rows[0].c.map(function(i){return rc[i]}),xv=[cols[0].l-gx/2];
  for(var c=1;c<C;c++)xv.push((cols[c-1].r+cols[c].l)/2);xv.push(cols[C-1].r+gx/2);
  var yT=function(r){return rows[r].t-a},yB=function(r){return rows[r].b+a},NR=rows.length;
  var start=NR>1?[xv[0],(rows[0].b+rows[1].t)/2]:[xv[0],(rows[0].t+rows[0].b)/2+a];Q.push(start);
  rows.forEach(function(row,r){var fw=r%2===0;
   for(var k=0;k<C;k++){var c2=fw?k:C-1-k,top=(r+c2)%2===0,y=top?yT(r):yB(r);
    if(fw){Q.push([xv[c2],y]);Q.push([xv[c2+1],y])}else{Q.push([xv[c2+1],y]);Q.push([xv[c2],y])}
    var i=row.c[c2];if(i!=null){var q=rc[i];seg[i]=top?[[xv[c2],q.b],[xv[c2],y],[xv[c2+1],y],[xv[c2+1],q.b]]:[[xv[c2],q.t],[xv[c2],y],[xv[c2+1],y],[xv[c2+1],q.t]];stub[i]=[xv[c2],ys(i),q.l]}}});
  if(NR%2===1){var yR=yB(NR-1)+a*1.4,xe=Q[Q.length-1][0];Q.push([xe,yR]);Q.push([xv[0]-(NR>1?a:0),yR]);if(NR>1)Q.push([xv[0]-a,start[1]])}
 }
 var d=rlPath(Q,rr,true);['wall','bore','water'].forEach(function(k){svg.querySelector('.'+P+k).setAttribute('d',d)});
 var sg=svg.querySelector('.'+P+'segs'),st=svg.querySelector('.'+P+'stubs');
 cards.forEach(function(card,i){if(!seg[i])return;var v=card.getAttribute('data-valve')||'unset',s=stub[i],no=card.querySelector('.'+P+'no'),x0=s[0]+5,x1=s[2]+(no?parseFloat(getComputedStyle(no).paddingLeft)||0:0)-6,xm=(x0+x1)/2,y=s[1];
  rlEl(sg,'path',P+'seg',i).setAttribute('d',rlPath(seg[i],rr,false));
  var g=rlEl(st,'g',P+'stub is-'+v,i);g.setAttribute('class',P+'stub is-'+v);
  g.innerHTML='<path class="'+P+'sw" d="M'+x0+' '+y+'H'+x1+'"/><path class="'+P+'sb" d="M'+x0+' '+y+'H'+x1+'"/>'
   +'<path class="'+P+'sq" d="M'+(x0-1)+' '+y+'H'+(v==='open'?x1:xm-5)+'"/>'
   +'<path class="'+P+'vb" d="M'+(xm-6)+' '+(y-5)+'L'+(xm+6)+' '+(y+5)+'V'+(y-5)+'L'+(xm-6)+' '+(y+5)+'Z"/><path class="'+P+'vs" d="M'+xm+' '+y+'V'+(y-10)+'M'+(xm-4)+' '+(y-10)+'H'+(xm+4)+'"/>';
  card.setAttribute('data-at',rlAlong(Q,[s[0],y]).toFixed(3))});
 w.classList.add('is-laid')}
window.AQroleLoop={lay:lay};
if(window.ResizeObserver&&window.MutationObserver){var ro=new ResizeObserver(function(es){es.forEach(function(en){lay(en.target)})});
 var scan=function(x){if(x.nodeType!==1)return;var L=x.matches('.aq-role-loop')?[x]:[].slice.call(x.querySelectorAll('.aq-role-loop'));
  L.forEach(function(w){if(w.__rl)return;w.__rl=1;ro.observe(w);lay(w)})};
 new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,scan)})}).observe(document.documentElement,{childList:true,subtree:true});
 if(document.body)scan(document.body)}
/* pointing at a role lights its bay of the loop and its branch */
function lit(card,on){var w=card.closest('.aq-role-loop'),i=card.getAttribute('data-i');if(!w)return;
 [].forEach.call(w.querySelectorAll('.'+P+'seg, .'+P+'stub'),function(x){if(x.getAttribute('data-i')===i)x.classList.toggle('is-lit',on)});card.classList.toggle('is-lit',on)}
document.addEventListener('pointerover',function(ev){var c=ev.target.closest&&ev.target.closest('.'+P+'bay');if(!c||ev.pointerType==='touch'||c.classList.contains('is-lit'))return;lit(c,true)});
document.addEventListener('pointerout',function(ev){var c=ev.target.closest&&ev.target.closest('.'+P+'bay');if(!c||(ev.relatedTarget&&c.contains(ev.relatedTarget)))return;lit(c,false)});
})();
