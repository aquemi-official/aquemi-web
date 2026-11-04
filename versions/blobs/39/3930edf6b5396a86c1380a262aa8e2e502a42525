/* Look "bid-route" -> BidRoute (design-system/components/BidRoute): how a bid travels through the URS, drawn as one route
   (a twin-wall pipe, the water its centre line) through numbered stations, one per row of the table, each station a
   line pictogram of what that practice does to the bids: a barrier gate (a must-have: one shortfall ends a bid), a
   balance beam (a preference: weighed against the other bids), a pinch where the route narrows (too many must-haves:
   fewer suppliers can bid), an answer sheet (one answer format), a deviation slip keyed to the rows (one deviation
   list) and fanned price strips (separate price lines). Under the route, one card per row in the same column as its
   station; a drop line ties the station to its card. Pointing at a card lights its station and the reverse.
   Pass 12 (concept 245, urs-guide.priority, take 2): one path joins the pictograms; the concept's lorem rows are the
   page's own six rows; the route is the house twin-wall pipe, not the concept's heavy band.
   Fields, as a table: h, intro, cols [practice, what it does to the bids, use it for], rows [[practice, effect, use]],
   icons (look-only, one per row, in row order): gate | beam | pinch | sheet | slip | strips (default: that order).
   A row without a known icon gets a plain station (a ring on the route).
   Up to 1100 px and phones: a riser down the left; each row's pictogram beside its title (561-1100 px: in a column at
   the left of the text; phones: at the right of the title). No fold, every row open. */
(function(){
var BR_ORDER=['gate','beam','pinch','sheet','slip','strips'];
function f(n){return Math.round(n*10)/10}
var BR_K={w:'aq-bid-route__w',g:'aq-bid-route__g',h2o:'aq-bid-route__h2o',eq:'aq-bid-route__eq',pa:'aq-bid-route__pa',nv:'aq-bid-route__nv',ln:'aq-bid-route__ln',
 wl:'aq-bid-route__wl',th:'aq-bid-route__th',mk:'aq-bid-route__mk',gr:'aq-bid-route__gr',drop:'aq-bid-route__drop'};
function P(d,c,a){return '<path class="'+BR_K[c]+'" d="'+d+'"'+(a||'')+'/>'}
function R(x,y,w,h,c){return '<rect class="'+BR_K[c]+'" x="'+f(x)+'" y="'+f(y)+'" width="'+f(w)+'" height="'+f(h)+'"/>'}
function C(x,y,r,c){return '<circle class="'+BR_K[c]+'" cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(r)+'"/>'}
/* a short tie from the route up to a floating paper, so every station stands on the route */
function tie(x,y0,y1){return P('M'+f(x)+' '+f(y0)+'V'+f(y1),'th')}
/* pictograms, drawn round (x, y): y is the route's centre line; they stand on its top wall (y - 6.5) */
var BR_GLYPH={
 gate:function(x,y){var t=y-6.5,o='';
  o+=R(x-58,t-64,12,64,'nv')+R(x-64,t-3,24,3,'nv');
  var bx=x-50,bw=106,by=t-56,s='';o+=R(bx,by,bw,8,'eq');
  for(var u=bx+12;u<bx+bw;u+=24)s+=R(u,by,12,8,'nv');o+=s;
  o+=C(x-52,by+4,4.5,'eq')+R(x+50,by+8,3,t-by-8,'eq');
  return o},
 beam:function(x,y){var t=y-6.5,o='';
  o+=P('M'+f(x-16)+' '+f(t)+'L'+f(x)+' '+f(t-30)+'L'+f(x+16)+' '+f(t)+'Z','eq');
  var g='<g transform="rotate(-8 '+f(x)+' '+f(t-30)+')">'+R(x-56,t-34,112,5,'eq');
  g+=P('M'+f(x-50)+' '+f(t-50)+'a6 6 0 0 1 12 0','ln')+C(x-44,t-46,12,'nv');
  g+=P('M'+f(x+38)+' '+f(t-46)+'a4 4 0 0 1 8 0','ln')+C(x+42,t-42,8,'nv')+'</g>';
  return o+g+C(x,t-30,2.5,'eq')},
 pinch:function(x,y,j){var o='';j=j||48;/* j: the jaws' reach from the centre line (shorter on the wide route, clear of the drop) */
  o+=P('M'+f(x-44)+' '+f(y-j)+'C'+f(x-12)+' '+f(y-j)+' '+f(x-16)+' '+f(y-9)+' '+f(x)+' '+f(y-9)+'C'+f(x+16)+' '+f(y-9)+' '+f(x+12)+' '+f(y-j)+' '+f(x+44)+' '+f(y-j),'ln');
  o+=P('M'+f(x-44)+' '+f(y+j)+'C'+f(x-12)+' '+f(y+j)+' '+f(x-16)+' '+f(y+9)+' '+f(x)+' '+f(y+9)+'C'+f(x+16)+' '+f(y+9)+' '+f(x+12)+' '+f(y+j)+' '+f(x+44)+' '+f(y+j),'ln');
  /* the route narrows in the throat: ground over the walls, then a slimmer pipe */
  o+=R(x-18,y-7.5,36,15,'gr')+P('M'+f(x-18)+' '+f(y-6.5)+'C'+f(x-8)+' '+f(y-6.5)+' '+f(x-6)+' '+f(y-3)+' '+f(x)+' '+f(y-3)+'C'+f(x+6)+' '+f(y-3)+' '+f(x+8)+' '+f(y-6.5)+' '+f(x+18)+' '+f(y-6.5),'wl')
   +P('M'+f(x-18)+' '+f(y+6.5)+'C'+f(x-8)+' '+f(y+6.5)+' '+f(x-6)+' '+f(y+3)+' '+f(x)+' '+f(y+3)+'C'+f(x+6)+' '+f(y+3)+' '+f(x+8)+' '+f(y+6.5)+' '+f(x+18)+' '+f(y+6.5),'wl');
  /* the water carries on through the throat: fewer suppliers can bid, the route is not closed */
  o+=P('M'+f(x-18)+' '+f(y)+'H'+f(x+18),'h2o');
  return o},
 sheet:function(x,y){var t=y-6.5,o=tie(x,t,t-14),x0=x-28,y0=t-92,i,yy;
  o+=R(x0,y0,56,78,'pa');
  for(i=0;i<4;i++){yy=y0+14+i*16;o+=R(x0+8,yy-5,9,9,'eq')+P('M'+f(x0+23)+' '+f(yy)+'H'+f(x0+(i===1?38:48)),'th')}
  yy=y0+14;o+=P('M'+f(x0+9.5)+' '+f(yy)+'l2.5 2.5l4.5 -5','mk');
  yy=y0+30;o+=P('M'+f(x0+9.5)+' '+f(yy)+'l2.5 2.5l4.5 -5','mk')+P('M'+f(x0+42)+' '+f(yy-2.5)+'h5M'+f(x0+42)+' '+f(yy+0.5)+'h5','th');
  yy=y0+46;o+=P('M'+f(x0+10)+' '+f(yy-1.8)+'h7M'+f(x0+10)+' '+f(yy+1.8)+'h7M'+f(x0+15.5)+' '+f(yy-4)+'l-4 8','mk');
  yy=y0+62;o+=P('M'+f(x0+9.5)+' '+f(yy)+'l2.5 2.5l4.5 -5','mk');
  return o},
 slip:function(x,y){var t=y-6.5,o=tie(x,t,t-14),x0=x-24,y0=t-88,w=48,h=74,i,yy;
  o+=P('M'+f(x0)+' '+f(y0)+'H'+f(x0+w-12)+'L'+f(x0+w)+' '+f(y0+12)+'V'+f(y0+h)+'H'+f(x0)+'Z','pa')+P('M'+f(x0+w-12)+' '+f(y0)+'V'+f(y0+12)+'H'+f(x0+w),'th');
  for(i=0;i<4;i++){yy=y0+22+i*13;o+=R(x0+6,yy-4,10,8,'eq')+P('M'+f(x0+20)+' '+f(yy)+'H'+f(x0+w-(i%2?14:7)),'th')}
  return o},
 strips:function(x,y){var t=y-6.5,o=tie(x,t,t-14),k;
  [-13,0,13].forEach(function(a,j){var x0=x-11,y0=t-86,w=22,h=70,z='',n;
   for(n=0;n<=4;n++)z+='L'+f(x0+w-n*w/4)+' '+f(y0+h+(n%2?4:0));
   var s=P('M'+f(x0)+' '+f(y0)+'H'+f(x0+w)+'V'+f(y0+h)+z.slice(0)+'Z','pa');
   for(k=0;k<4;k++)s+=P('M'+f(x0+4)+' '+f(y0+10+k*12)+'H'+f(x0+12)+'M'+f(x0+15)+' '+f(y0+10+k*12)+'H'+f(x0+18),'th');
   o+='<g transform="rotate('+a+' '+f(x)+' '+f(t-16)+')">'+s+'</g>'});
  return o}
};
function glyph(k,x,y,j){var g=BR_GLYPH[k];return g?g(x,y,j):C(x,y-20,9,'eq')}
/* the twin-wall run: a wide wall stroke, a narrower ground stroke over it (two 1.5 px walls), the water its centre line */
function run(d,cls){return '<g class="aq-bid-route__run'+(cls?' '+cls:'')+'">'+P(d,'w')+P(d,'g')+P(d,'h2o')+'</g>'}
var W=1200,Y=150,H=214,PAD=26,TOP=24,GS=1.22;/* GS: the pictograms' scale on the wide route */
LOOKS['bid-route']=function(b,HD){var C0=b.cols||[],RW=b.rows||[],n=RW.length,ic=b.icons||BR_ORDER;
 var sx=function(i){return W*(i+0.5)/n};
 var d='M0 '+Y+'H'+W,drops='',st='',nums='';
 RW.forEach(function(r,i){var x=sx(i),k=ic[i];
  var xl=W*i/n+PAD,y0=k==='pinch'?Y+9:Y+6.5;/* the pinch's drop leaves the lower jaw's apex */
  drops+=P('M'+f(x)+' '+y0+'V'+(H-34)+'Q'+f(x)+' '+(H-24)+' '+f(x-10)+' '+(H-24)+'H'+f(xl+10)+'Q'+f(xl)+' '+(H-24)+' '+f(xl)+' '+(H-14)+'V'+H,'drop',' data-k="'+i+'"');
  var sc=k==='pinch'?1:GS,tt=Y-6.5;st+='<g class="aq-bid-route__st is-'+(k||'plain')+'" data-k="'+i+'"><g transform="translate('+f(x)+' '+tt+') scale('+sc+') translate('+f(-x)+' '+(-tt)+')">'+glyph(k,x,Y,30)+'</g></g>';
  });
 var fig='<div class="aq-bid-route__fig" aria-hidden="true"><svg class="aq-bid-route__svg" viewBox="0 '+TOP+' '+W+' '+(H-TOP)+'" preserveAspectRatio="xMidYMid meet" focusable="false">'
  +drops+run(d)+st+'</svg></div>';
 var k=function(j,cls){return C0[j]?'<span class="aq-bid-route__k'+(cls?' '+cls:'')+'">'+tx(C0[j])+'</span>':''};
 var cards=RW.map(function(r,i){var x=sx(i),kk=ic[i],no=(i<9?'0':'')+(i+1);
  var mini='<span class="aq-bid-route__mini" aria-hidden="true"><svg viewBox="'+f(x-66)+' '+(kk==='pinch'?(Y-50)+' 132 100':(Y-100)+' 132 110')+'" focusable="false">'+run('M'+f(x-66)+' '+Y+'H'+f(x+66))+glyph(kk,x,Y)+'</svg></span>';
  return '<li class="aq-bid-route__card" data-k="'+i+'"><span class="aq-bid-route__no" aria-hidden="true">'+no+'</span>'+mini+'<h3 class="aq-bid-route__t">'+k(0,'aq-bid-route__sr')+tcell(r[0])+'</h3>'
   +(r[1]!=null?'<p class="aq-bid-route__e">'+k(1,'aq-bid-route__sr')+tcell(r[1])+'</p>':'')
   +(r[2]!=null?'<p class="aq-bid-route__u">'+k(2)+tcell(r[2])+'</p>':'')+'</li>'}).join('');
 return sec(HD+'<div class="aq-bid-route" style="--n:'+n+'">'+fig+'<ol class="aq-bid-route__cards" role="list">'+cards+'</ol></div>','aq-bid-route-sec')};
/* pointing at or focusing a card lights its station, its number and its drop; pointing at a station lights its card */
function hot(w,k){[].forEach.call(w.querySelectorAll('[data-k]'),function(x){x.classList.toggle('is-hot',k!=null&&x.getAttribute('data-k')===k)})}
if(typeof document!=='undefined'){
 var over=function(ev){var t=ev.target.closest&&ev.target.closest('.aq-bid-route [data-k]');if(!t)return;hot(t.closest('.aq-bid-route'),t.getAttribute('data-k'))};
 var out=function(ev){var w=ev.target.closest&&ev.target.closest('.aq-bid-route');if(w&&!w.contains(ev.relatedTarget))hot(w,null)};
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);document.addEventListener('mouseout',out);document.addEventListener('focusout',out)}
})();
