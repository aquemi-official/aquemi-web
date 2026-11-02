/* Look "walkdown-pins" -> WalkdownPins (design-system/components/WalkdownPins): IQ and OQ checks read as a table
   beside the installed system they inspect (pass 9b concept svc-cq.2: table left, isometric skid right, labelled at
   the spots the checks look at). The checks run as a hairline table (number, check with its IQ or OQ tag, what we
   verify, basis or record in mono); a light drawing sheet (IsoKit) shows the package as it stands on site: the skid
   with its RO rack in front of the clean-room wall, the storage tank and loop pump, the loop out to two points of use
   and back past the analyser, a gauge on the supply, the control panel. Each check's number marks its part; a few
   parts carry a leader callout with their name. Pointing at or focusing a row lights its part, marker and callout.
   Fields, as a spec block: h, cols, rows [{p, v, m, part}], labels {part: name} (the leader callouts, short drawing
   names, aria-hidden), fold, fold_noun (phones only). part: the drawing anchor, one of "branch" (a point-of-use
   branch), "joint" (a loop joint), "analyzer", "coldest" (the far point of use), "outlets" (both points of use),
   "panel", "skid", "gauge"; a row without one marks the skid.
   Phones: the sheet over the list; rows stack; the list folds. */
var WDP_PART={branch:'pou-a',joint:'loop',analyzer:'an',coldest:'pou-b',outlets:'pou-a pou-b',panel:'pn',skid:'ro',gauge:'gauge'};
function wdpScene(){
 var wl=isoPart('wall',-40,-46,0,1,{w:340,h:74}),pn=isoPart('panel',-30,34,0,1,{id:'pn'}),sk=isoPart('skid',0,0,0,1,{w:150,d:62,id:'ro'}),ro=isoPart('ro',8,8,9,1,{id:'ro'}),
  tk=isoPart('tank',212,4,0,1,{id:'tank'}),pu=isoPart('pump',262,58,0,0.9,{id:'pump',rot:1}),
  oa=isoPart('outlet',200,206,0,0.9,{id:'pou-a'}),ob=isoPart('outlet',96,206,0,0.9,{id:'pou-b'}),an=isoPart('analyzer',150,136,0,0.9,{id:'an'});
 var Z=44,Y=178,YR=124;
 var feed=isoPipe(isoRoute(ro.ports.out,tk.ports.in,'xzy'),{r:1.8,to:'tank',caps:false});
 var suck=isoPipe(isoRoute(tk.ports.out,pu.ports.in,'xyz'),{r:1.9,to:'pump',caps:false});
 var loopPts=isoRoute(pu.ports.out,[pu.ports.out[0],pu.ports.out[1],Z],'z').concat([[pu.ports.out[0],Y,Z],[48,Y,Z],[48,YR,Z],[tk.ports.ret[0]-24,YR,Z],[tk.ports.ret[0]-24,tk.ports.ret[1],Z],[tk.ports.ret[0],tk.ports.ret[1],tk.ports.ret[2]]]);
 var loop=isoPipe(loopPts,{r:1.9,id:'loop',to:'tank',flanges:'all',caps:false});
 var dropA=isoPipe(isoRoute([oa.ports.in[0],Y,Z],oa.ports.in,'zyx'),{r:1.4,to:'pou-a',caps:false}),dropB=isoPipe(isoRoute([ob.ports.in[0],Y,Z],ob.ports.in,'zyx'),{r:1.4,to:'pou-b',caps:false});
 var smp=isoPipe(isoRoute([an.ports.sample[0],YR,Z],an.ports.sample,'zyx'),{r:0.9,wall:false,flow:false,caps:false});
 var ga=isoPart('gauge',pu.ports.out[0],120,Z+4,1.1,{id:'gauge',value:0.6,face:'x'});
 var inner=[wl,pn,sk,ro,feed,tk,suck,pu,loop,smp,an,ga,dropA,oa,dropB,ob].join('');
 var bx=isoBounds([[-40,-46,0],[300,-46,0],[-40,-46,80],[300,-46,80],[-50,60,0],[-50,60,60],[110,230,0],[220,230,0],[300,200,0],[300,60,90]],22);
 var A={branch:[oa.ports.in[0],Y,Z+3],joint:[pu.ports.out[0],150,Z+2],analyzer:an.ports.top,coldest:ob.ports.top,outlets:[148,Y,Z+3],panel:pn.ports.top,skid:ro.ports.top,gauge:[pu.ports.out[0],120,Z+12]};
 return {inner:inner,bx:bx,A:A}}
LOOKS['walkdown-pins']=function(b,H){var R=b.rows||[],C=b.cols||[],LB=b.labels||{},S=wdpScene(),bx={x:S.bx.x-60,y:S.bx.y-14,w:S.bx.w+120,h:S.bx.h+20},W=Math.round(bx.w),Hh=Math.round(bx.h),org=[-bx.x,-bx.y],seen={};
 function key(r){return WDP_PART[r.part]?r.part:'skid'}
 /* leader callouts: one per labelled part, out to the nearer side of the sheet, the name over the shelf */
 var cx=bx.x+bx.w/2,leads=[],labs=[],side={l:[],r:[]};Object.keys(LB).forEach(function(k){if(!S.A[k]||!LB[k])return;var s=isoP(S.A[k]);side[s[0]<cx?'l':'r'].push({k:k,s:s})});
 ['l','r'].forEach(function(sd){var prev=-1e9;side[sd].sort(function(a,c){return a.s[1]-c.s[1]}).forEach(function(o){var left=sd==='l',x=left?bx.x+12:bx.x+bx.w-12,y=Math.max(o.s[1]-16,prev+30);prev=y;
  var ld=isoLeader(S.A[o.k],[left?x+92:x-92,y],{shelf:92,cls:'aq-walkdown-pins__lead'});leads.push(String(ld));
  var at=isoPct([x,y],W,Hh,org);labs.push('<span class="aq-walkdown-pins__lab aq-walkdown-pins__lab--'+sd+'" data-part="'+e(o.k)+'" style="left:'+at.left+';top:'+at.top+'" aria-hidden="true">'+tx(LB[o.k])+'</span>')})});
 var svg=isoSvg(W,Hh,S.inner+leads.join(''),'aq-walkdown-pins__svg',{origin:org,under:isoSheet(W,Hh,{grid:'iso',m:8,band:0,gridStep:22})});
 var pins=R.map(function(r,i){var k=key(r),n=seen[k]=(seen[k]||0)+1,p=isoP(S.A[k]),at=isoPct(p,W,Hh,org);
  return '<span class="aq-walkdown-pins__pin" data-row="'+i+'" style="left:'+at.left+';top:'+at.top+';--k:'+(n-1)+'" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'}).join('');
 var thead=C.length?'<div class="aq-walkdown-pins__cols" aria-hidden="true"><span></span>'+C.slice(0,3).map(function(c){return '<span>'+tx(c)+'</span>'}).join('')+'</div>':'';
 var rows=R.map(function(r,i){var m=String(r.p||'').match(/^(IQ|OQ|PQ)\s*·\s*(.*)$/),tag=m?m[1]:'',name=m?m[2]:r.p;
  return fli('<li class="aq-walkdown-pins__row" data-row="'+i+'" data-lit="'+e(WDP_PART[key(r)])+'" data-part="'+e(key(r))+'" tabindex="0">'
   +'<span class="aq-walkdown-pins__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<h3 class="aq-walkdown-pins__t">'+(tag?'<span class="aq-walkdown-pins__tag aq-walkdown-pins__tag--'+tag.toLowerCase()+'">'+tag+'</span>':'')+'<span>'+tx(name)+'</span></h3>'
   +(r.v?'<p class="aq-walkdown-pins__v">'+tx(r.v)+'</p>':'')+(r.m?'<p class="aq-walkdown-pins__m">'+tx(r.m)+'</p>':'')+'</li>',b,i)}).join('');
 return sec(H+'<div class="aq-walkdown-pins"><div class="aq-walkdown-pins__tab">'+thead+wFold(b,R.length,'<ol class="aq-walkdown-pins__list">'+rows+'</ol>',b.fold_noun||'checks')+'</div>'
  +'<div class="aq-walkdown-pins__fig"><div class="aq-walkdown-pins__sheet">'+svg+labs.join('')+pins+'</div></div></div>','aq-walkdown-pins-sec')};
/* pointing at a check lights its part on the sheet and its pin */
(function(){function lit(row,on){var w=row.closest('.aq-walkdown-pins');if(!w)return;var ids=(row.getAttribute('data-lit')||'').split(' ');
  ids.forEach(function(id){if(id)[].forEach.call(w.querySelectorAll('[data-iso-id="'+id+'"]'),function(el){el.classList.toggle('is-lit',on)})});
  [].forEach.call(w.querySelectorAll('.aq-walkdown-pins__lab[data-part="'+row.getAttribute('data-part')+'"]'),function(l){l.classList.toggle('is-on',on)});
  var p=w.querySelector('.aq-walkdown-pins__pin[data-row="'+row.getAttribute('data-row')+'"]');if(p)p.classList.toggle('is-on',on)}
 ['pointerover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var r=ev.target.closest&&ev.target.closest('.aq-walkdown-pins__row');if(r)lit(r,true)})});
 ['pointerout','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var r=ev.target.closest&&ev.target.closest('.aq-walkdown-pins__row');if(r&&!(ev.relatedTarget&&r.contains(ev.relatedTarget)))lit(r,false)})})})();
