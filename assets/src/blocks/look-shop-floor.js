/* Look "shop-floor" -> ShopFloor (design-system/components/ShopFloor): the people or roles of the company placed where
   their work happens, on one isometric plan of the shop (IsoKit on a navy blueprint: drawing office, document and
   quality room, fabrication bay, test bay with its control panel, dispatch dock). Each person or role is a station
   on the floor with a numbered pin; a dashed walking route enters at the shop door and visits the stations in the
   order of the cards, the way a visitor would be shown round. Stations no card uses stay drawn, quieter, so the shop
   reads whole. Beside the plan, one card per item; hovering or focusing a card (or, on wide screens, scrolling it
   past the middle of the view) lights its station in flow.
   Fields: a grid block (h, intro, items [{t, d, link, station}]) or a table block (h, intro, cols, rows: the first
   cell is the card title, the others are labelled with their column name). New optional field: station per item
   (grid) or stations [..] one per row (table): design, front, qa, fab, test, ctl, dock. A grid item's d that opens
   with a bracketed name line ("[Full name] · [licence]. Ask about …") shows that line as the card's nameplate.
   Phones: the plan is a band above the cards; the pins keep their numbers. */
(function(){
var SF_ROOMS=[[0,0,220,170],[0,190,220,340],[240,0,480,170],[240,190,480,340],[500,0,640,340]];
/* station: part builder, where the walker stands (floor point), where the pin sits (3D) */
var SF_ST={
 design:{p:function(){return isoPart('desk',80,70,0,1.8)},at:[90,140],pin:[80,70,96]},
 front:{p:function(){return isoPart('binder',170,112,0,1.6)},at:[138,150],pin:[168,112,64]},
 qa:{p:function(){return isoPart('binder',70,262,0,1.5)+isoPart('stamp',160,282,0,2)},at:[110,212],pin:[70,262,60]},
 fab:{p:function(){var sk=isoPart('skid',262,40,0,1,{w:180,d:84});
   var run=isoPipe([[276,82,14],[352,82,14],[352,82,46],[428,82,46]],{r:4,caps:true,flanges:'ends',flow:false});
   return sk+run+isoPart('valve',310,82,14,1.6)},at:[350,150],pin:[352,82,70]},
 test:{p:function(){return isoPart('ro',262,214,0,1.35)},at:[330,204],pin:[330,232,100]},
 ctl:{p:function(){return isoPart('panel',440,296,0,1.5)},at:[440,212],pin:[440,296,90]},
 dock:{p:function(){return isoPart('truck',515,140,0,1.2,{load:true})},at:[570,204],pin:[572,155,60]}
};
var SF_ORDER=['design','front','qa','fab','test','ctl','dock'];
function sfScene(used){
 var o=[],box=function(x,y,z,w,d,h,c){return isoPath(isoBoxD([x,y,z],w,d,h),c||'aq-iso__eq')};
 /* floor slab and room outlines */
 o.push(box(-14,-14,-8,668,368,8,'aq-iso__eq aq-iso__eq--alt'));
 SF_ROOMS.forEach(function(r){o.push(isoPath(isoPoly([[r[0],r[1],0],[r[2],r[1],0],[r[2],r[3],0],[r[0],r[3],0]],1),'aq-iso__thin'))});
 /* back walls (perimeter), partitions with the aisle left open, the shop door on the front edge */
 o.push(box(-14,-14,0,668,4,30),box(-14,-10,0,4,364,30));
 o.push(box(228,-10,0,4,180,22),box(228,190,0,4,150,22),box(488,-10,0,4,180,22),box(488,190,0,4,150,22));
 o.push(box(-10,178,0,96,4,14),box(146,178,0,82,4,14));
 /* stations, back to front */
 var ids=SF_ORDER.slice().sort(function(a,b){var A=SF_ST[a].pin,B=SF_ST[b].pin;return (A[0]+A[1])-(B[0]+B[1])});
 ids.forEach(function(id){o.push('<g class="aq-shop-floor__st'+(used.indexOf(id)<0?' is-idle':'')+'" data-iso-id="'+id+'">'+SF_ST[id].p()+'</g>')});
 /* walking route: in at the door, aisle to aisle, one leg per station in card order */
 var door=[240,356,0],cur=door,legs='';
 used.forEach(function(id,i){if(i&&id===used[i-1])return;var a=SF_ST[id].at,q=[a[0],a[1],1],pts=[cur];
  {pts.push([cur[0],185,1]);pts.push([q[0],185,1])}pts.push(q);
  var P=[];pts.forEach(function(p){var l=P[P.length-1];if(!l||Math.abs(l[0]-p[0])+Math.abs(l[1]-p[1])>0.5)P.push(p)});
  if(P.length>1)legs+=isoPipe(P,{wall:false,r:1,bend:8,caps:false,to:id,cls:'aq-shop-floor__walk'});cur=q});
 o.push(legs);
 o.push(isoPath(isoPoly([[222,354,0],[258,354,0]]),'aq-iso__ln aq-shop-floor__door'));
 var bx=isoBounds([[-14,-14,-8],[654,-14,-8],[-14,354,-8],[654,354,-8],[-14,-14,40],[654,-14,40],[234,360,0]],14),W=Math.round(bx.w),H=Math.round(bx.h),org=[-bx.x,-bx.y];
 var pins={};SF_ORDER.forEach(function(id){pins[id]=isoPct(isoP(SF_ST[id].pin),W,H,org)});
 return {svg:isoSvg(W,H,o.join(''),'aq-iso--navy aq-shop-floor__svg',{origin:org}),pins:pins}}
function sfName(d){d=String(d||'');var m=d.match(/^(\[[^\]]*\](?:\s*·\s*\[[^\]]*\])*)\.\s+(.*)$/);return m?[m[1],m[2]]:['',d]}
LOOKS['shop-floor']=function(b,H){
 var tab=b.type==='table',C=b.cols||[],I=tab?(b.rows||[]):(b.items||[]),S=b.stations||[];
 var st=I.map(function(it,i){var s=tab?S[i]:(it.station||S[i]);return SF_ST[s]?s:''});
 var used=st.filter(Boolean),sc=sfScene(used),num=function(i){return (i<9?'0':'')+(i+1)};
 var first={};st.forEach(function(s,i){if(s&&!(s in first))first[s]=i});
 var pins=Object.keys(first).map(function(s){var p=sc.pins[s];return '<span class="aq-shop-floor__pin" data-st="'+s+'" style="left:'+p.left+';top:'+p.top+'">'+num(first[s])+'</span>'}).join('');
 var cards=I.map(function(it,i){var body;
  if(tab){var r=it;body='<h3 class="aq-shop-floor__t">'+tcell(r[0])+'</h3><dl class="aq-shop-floor__dl">'+r.slice(1).map(function(c,j){return c==null||c===''?'':'<div class="aq-shop-floor__f"><dt>'+tx(C[j+1]||'')+'</dt><dd>'+tcell(c)+'</dd></div>'}).join('')+'</dl>'}
  else{var n=sfName(it.d),go=it.link&&wp(it.link);
   body='<h3 class="aq-shop-floor__t">'+tx(it.t)+'</h3>'+(n[0]?'<p class="aq-shop-floor__name">'+tx(n[0])+'</p>':'')+(n[1]?'<p class="aq-shop-floor__d">'+tx(n[1])+'</p>':'')
    +(go?'<p class="aq-shop-floor__go">'+wlink(it.link)+'</p>':'')}
  return '<li class="aq-shop-floor__card" data-st="'+(st[i]||'')+'" style="--i:'+i+'"><span class="aq-shop-floor__n" aria-hidden="true">'+num(i)+'</span><div class="aq-shop-floor__body">'+body+'</div></li>'}).join('');
 var fig='<figure class="aq-shop-floor__fig" aria-hidden="true"><div class="aq-shop-floor__plan">'+sc.svg+pins+'</div></figure>';
 return sec(H+'<div class="aq-shop-floor'+(I.length>3?' is-long':'')+'">'+fig+'<ol class="aq-shop-floor__cards" role="list">'+cards+'</ol></div>','aq-band--navy aq-shop-floor-sec')};
/* Lighting: the card under the pointer or focus, else (wide screens) the one crossing 45 % of the view */
function sfSet(w,card){if(w._sfOn===card)return;w._sfOn=card;var id=card?card.getAttribute('data-st'):'';
 [].forEach.call(w.querySelectorAll('.aq-shop-floor__card'),function(c){c.classList.toggle('is-on',c===card)});
 [].forEach.call(w.querySelectorAll('.aq-shop-floor__st'),function(g){g.classList.toggle('is-lit',!!id&&g.getAttribute('data-iso-id')===id)});
 [].forEach.call(w.querySelectorAll('.aq-shop-floor__walk'),function(g){g.classList.toggle('is-lit',!!id&&g.getAttribute('data-iso-to')===id)});
 [].forEach.call(w.querySelectorAll('.aq-shop-floor__pin'),function(p){p.classList.toggle('is-on',!!id&&p.getAttribute('data-st')===id)})}
function sfScan(){if(innerWidth<860)return;var mid=innerHeight*0.45;[].forEach.call(document.querySelectorAll('.aq-shop-floor.is-long'),function(w){if(w._sfHover||!w.classList.contains('is-ready'))return;
 var best=null,bd=1e9,r0=w.getBoundingClientRect();if(r0.bottom<0||r0.top>innerHeight)return;
 [].forEach.call(w.querySelectorAll('.aq-shop-floor__card'),function(c){var r=c.getBoundingClientRect();var d=r.top<=mid&&r.bottom>=mid?0:Math.min(Math.abs(r.top-mid),Math.abs(r.bottom-mid));if(d<bd){bd=d;best=c}});
 sfSet(w,best)})}
if(typeof document!=='undefined'&&document.addEventListener){var sfQ=0,sfTick=function(){if(sfQ)return;sfQ=1;requestAnimationFrame(function(){sfQ=0;sfScan()})};
 addEventListener('scroll',sfTick,{passive:true});
 ['mouseover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var c=ev.target.closest&&ev.target.closest('.aq-shop-floor__card');if(!c)return;var w=c.closest('.aq-shop-floor');w._sfHover=1;sfSet(w,c)})});
 ['mouseout','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var c=ev.target.closest&&ev.target.closest('.aq-shop-floor__card');if(!c||(ev.relatedTarget&&c.contains(ev.relatedTarget)))return;var w=c.closest('.aq-shop-floor');w._sfHover=0;sfSet(w,null);sfTick()})});
 window.AQshopFloor={ready:function(w){w.classList.add('is-ready');sfTick()}}}
})();
