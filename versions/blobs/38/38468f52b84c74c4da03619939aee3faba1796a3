/* Look "option-taps" -> OptionTaps (design-system/components/OptionTaps): options drawn where they would join the
   train, as one limestone drawing sheet (pass 9b concept sys-pretreatment.5: sheet border and title block, a huge
   light title, the options as drawing notes in a narrow column, note numbers pinned on the schematic). The standard
   train runs left to right in solid isometric line (IsoKit, limestone hand) and each option is a dashed part (the
   drawing convention for "optional") on its own dashed tee off the main line, at the stage it serves, in a row behind
   or in front of the train. A numbered pin sits on each dashed part; the notes carry the same numbers. A note's number
   is a button: pressing it brings that part into focus on the drawing (motion.js); Escape or pressing it again lets
   go, the arrow keys step through the notes.
   Fields (an options block): h, intro, items [{t, d, spot, at, part, row}], train [{part, label}], fold, fold_noun.
   intro prints under the title through wSecHead.
   New optional fields: train: the standard train left to right (part: an IsoKit kind, label: a short drawing label);
   per item: at (position along the train, 0 = first part, fractions between), part (the IsoKit kind drawn dashed;
   default filter), row ("back" or "front", default alternating).
   Phones (pass 12, S9): the sheet keeps its border and title block; the whole-train overview (too small to read at
   phone width) gives way to a crop of the train at each option's tap point, set over its note: the trunk, the
   standard parts in a column-wide window (the nearest with its drawing label), the dashed tee and part; the number
   tag sits beside the note title. Tablets (600-860 px): the notes two a row. */
(function(){
var K='aq-option-taps',S=230;
function pos(j,dy){return [j*S/2,-j*S/2+(dy||0),0]}
LOOKS['option-taps']=function(b,H){
 var T=b.train||[],I=b.items||[],sc=1.7,back='',main='',front='',labels=[],marks=[],tp=[],crops=[];
 var line=function(j){var p=pos(j,46);return [p[0],p[1],14]};
 var j0=-0.55,j1=Math.max(T.length-1,0)+0.5;
 /* the standard train */
 T.forEach(function(t,j){var p=pos(j),pt=isoPart(t.part||'filter',p[0]+(t.part==='ro'?-50:0),p[1]+(t.part==='ro'?-6:0),0,t.part==='ro'?1.2:sc,{id:'t'+j,r:t.r,h:t.h});
  main+=pt;tp.push(pt);labels.push({at:pt.at,t:t.label,dy:t.ly})});
 var trunk=isoPipe([line(j0),line(j1)],{r:4,caps:true,flanges:'ends',to:'t0'});
 /* the options: dashed parts on dashed tees */
 I.forEach(function(it,i){var row=it.row||(i%2?'front':'back'),j=it.at!=null?+it.at:i,d=row==='back'?-95:95,p=pos(j);p=[p[0]+d,p[1]+d,0];
  var pt=isoPart(it.part||'filter',p[0],p[1],0,sc*0.9,{id:'o'+i,cls:K+'__ghost',r:it.r,h:it.h});
  var a=line(j),q=[p[0],p[1]+(row==='back'?20:-20),14];
  var tee=isoPipe([a,[q[0],a[1],14],q],{r:3,flow:false,caps:'end',cls:K+'__tee',id:'tee'+i});
  if(row==='back')back+=tee+pt;else front+=tee+pt;
  marks.push({at:pt.at,i:i});
  /* phone crop (pass 12, S9): a strip of the train as wide as the column, at the option's tap point: the trunk edge to
     edge, the standard parts inside the window, the dashed tee and part. The nearest standard part carries its drawing
     label, under it when the option stands behind the train (the option takes the space above), over it when in front.
     A part on legs (the tank): the tee rises into its foot, so it never ends in the open between the legs. */
  var lo=Math.max(0,Math.floor(j)),hi=Math.min(T.length-1,Math.ceil(j)),ks=[];for(var k=lo;k<=hi;k++)if(tp[k])ks.push(k);if(!ks.length&&tp.length)ks=[Math.min(tp.length-1,Math.max(0,Math.round(j)))];
  var teeC=(it.part==='tank')?isoPipe([a,[q[0],a[1],14],q,[q[0],q[1],32]],{r:3,flow:false,caps:'end',cls:K+'__tee',id:'tee'+i}):tee;
  var box=function(k){var c=pos(k);return [[c[0]-44,c[1]-44,0],[c[0]+44,c[1]+44,0],[c[0]-44,c[1]+44,170],[c[0]+44,c[1]-44,170]]};
  var pts=[line(j-0.75),line(j+0.75),[p[0]-34,p[1]-34,0],[p[0]+34,p[1]+34,0],[p[0]-34,p[1]+34,150],[p[0]+34,p[1]-34,150]];
  ks.forEach(function(k){pts=pts.concat(box(k))});
  /* pass 12 C: the caption is the option's own title (it was the nearest standard part's label, which read as the
     option's name), beside its dashed part at mid height, so it adds no height to the crop */
  var pz=row==='front'?14:it.part==='tank'?95:60,pm=isoP([p[0],p[1],pz]),pr=isoP([p[0]+34,p[1]-34,pz]),pl=isoP([p[0]-34,p[1]+34,pz]);
  var la=[{t:it.t,q:[pr[0]+6,pm[1]],l:[pl[0]-6,pm[1]]}];
  var bx=isoBounds(pts,10),foot=function(b){return b.y+b.h};
  /* the window: 2.55 times as wide as it is tall (a phone column at about 112 px, pass 12 C), slid along the train so
     it never shows paper past the train's ends; the neighbouring parts it takes in are cut by its edge, like a camera
     crop */
  var Wt=Math.max(bx.w,(foot(bx)-bx.y)*2.55),cx=bx.x+bx.w/2,xL=cx-Wt/2,xR=cx+Wt/2,HX=82,nb=[];
  var eL=Math.min(isoP(line(j0))[0]-10,-HX-10,bx.x),eR=Math.max(isoP(line(j1))[0]+10,isoP(pos(T.length-1))[0]+HX+10,bx.x+bx.w);
  if(eR-eL<=Wt){xL=(eL+eR-Wt)/2;xR=xL+Wt}else if(xL<eL){xR+=eL-xL;xL=eL}else if(xR>eR){xL-=xR-eR;xR=eR}
  T.forEach(function(t,k){if(ks.indexOf(k)>=0||!tp[k])return;var sx=isoP(pos(k))[0];if(sx+HX>xL&&sx-HX<xR){nb.push(k);pts=pts.concat(box(k))}});
  var vb=isoBounds(pts,10),yT=vb.y,yB=foot(vb),cw=Math.round(xR-xL),ch=Math.round(yB-yT),corg=[-xL,-yT];
  var tAt=function(x){return (x/ISO_C+46)/230},tA=Math.max(j0,tAt(xL)-0.02),tB=Math.min(j1,tAt(xR)+0.02);
  var segC=isoPipe([line(tA),line(tB)],{r:4,caps:tA===j0&&tB===j1?true:tA===j0?'start':tB===j1?'end':false,flanges:false});
  var std=ks.concat(nb).sort(function(x,y){return x-y}).map(function(k){return tp[k]}).join('');
  var csvg=isoSvg(cw,ch,row==='back'?teeC+pt+segC+std:segC+std+teeC+pt,'aq-iso--limestone '+K+'__crop-svg',{origin:corg});
  /* the caption is 12 px mono (about 7.9 px a character): it starts just right of the part, clamped so it never runs
     past the crop's right edge (it then lies over the trunk on its paper ground) */
  /* when it would not fit right of the part (the crop renders about 311 px wide on a phone), it ends left of it */
  /* pass 12 C verify F2: placed only where it fits unclamped (a clamped caption slid over the dashed part it names);
     otherwise dropped, since the h3 directly under the crop names the option */
  var clab=la.map(function(l){var fw=Math.ceil(String(l.t||'').length*7.92)+12,fu=fw*cw/311,
    fitR=l.q[0]+fu<=xR,fitL=l.l[0]-fu>=xL;if(!fitR&&!fitL)return '';
    var left=!fitR,q=isoPct(left?l.l:l.q,cw,ch,corg);
    return '<span class="'+K+'__clab '+K+'__clab--'+(left?'left':'side')+'" style="left:'+q.left+';top:'+q.top+'">'+tx(l.t||'')+'</span>'}).join('');
  crops[i]='<span class="'+K+'__crop" aria-hidden="true" style="aspect-ratio:'+cw+' / '+ch+'">'+csvg+clab+'</span>'});
 var inner=back+trunk+main+isoArrow(line(j0+0.25),[1,-1,0],{size:8})+isoArrow(line(j1-0.1),[1,-1,0],{size:8})+front;
 /* pass 12 C: the viewBox is the drawing's own bounds (it was a fixed 1180 x 500 sheet with paper round the train),
    so at width 100% the train fills the column. Parts are boxed generously (the RO rack is wide and offset); the pins
    (32 px tags over their part) and the labels (12 px mono over theirs) are in the bounds too. */
 var bp=[line(j0),line(j1)];
 T.forEach(function(t,k){var c=pos(k),ro=t.part==='ro',a=ro?70:44,ox=ro?-50:0;bp.push([c[0]+ox-a,c[1]-a,0],[c[0]+ox+a,c[1]+a,0],[c[0]+ox-a,c[1]+a,ro?120:170],[c[0]+ox+a,c[1]-a,ro?120:170])});
 I.forEach(function(it,i){var row=it.row||(i%2?'front':'back'),j=it.at!=null?+it.at:i,d=row==='back'?-95:95,c=pos(j);c=[c[0]+d,c[1]+d,0];var z=it.part==='tank'?190:150;
  bp.push([c[0]-34,c[1]-34,0],[c[0]+34,c[1]+34,0],[c[0]-34,c[1]+34,z],[c[0]+34,c[1]-34,z])});
 var bb=isoBounds(bp,12),x0=bb.x,y0=bb.y,x1=bb.x+bb.w,y1=bb.y+bb.h;
 /* pass 12 C verify F3: a 32 px tag needs 56 units of head room down to 0.6 scale (36 clipped tag 02 at 0.79) */
 marks.forEach(function(m){x0=Math.min(x0,m.at[0]-20);x1=Math.max(x1,m.at[0]+20);y0=Math.min(y0,m.at[1]-22-56)});
 labels.forEach(function(l){var w=String(l.t||'').length*3.96+4,y=l.at[1]+(l.dy!=null?+l.dy:-14);x0=Math.min(x0,l.at[0]-w);x1=Math.max(x1,l.at[0]+w);y0=Math.min(y0,y-20)});
 y1+=8;var Wd=Math.round(x1-x0),Hd=Math.round(y1-y0),org=[-x0,-y0];
 var svg=isoSvg(Wd,Hd,inner,'aq-iso--limestone '+K+'__svg',{origin:org});
 var pc=function(p,dy){var q=isoPct([p[0],p[1]+(dy||0)],Wd,Hd,org);return 'left:'+q.left+';top:'+q.top};
 /* a label that would run under a pin (pass 12 C: "Duplex softener" under tag 03) ends 8 units left of that pin instead */
 var lab=labels.map(function(l){var dy=l.dy!=null?+l.dy:-14,y=l.at[1]+dy,w=String(l.t||'').length*7.92,x=l.at[0],hit=null;
  /* the drawing renders at about 0.8 of its units on a 1280 screen: the label's span in units is its px width / 0.8;
     a tag "hits" a label when the label runs under the tag's column, within the part the tag pins (90 units down) */
  w/=0.8;marks.forEach(function(m){var mx=m.at[0],my=m.at[1]-22;if(x+w/2>mx-20&&x-w/2<mx+20&&y>my-40&&y-20<my+90)hit=hit&&hit.at[0]<mx?hit:m});
  if(hit)return '<span class="'+K+'__label '+K+'__label--end" aria-hidden="true" style="'+pc([hit.at[0]-26,l.at[1]],dy)+'">'+tx(l.t||'')+'</span>';
  return '<span class="'+K+'__label" aria-hidden="true" style="'+pc(l.at,dy)+'">'+tx(l.t||'')+'</span>'}).join('');
 var mk=marks.map(function(m){return '<span class="'+K+'__mark" data-i="'+m.i+'" aria-hidden="true" style="'+pc(m.at,-22)+'">'+(m.i<9?'0':'')+(m.i+1)+'</span>'}).join('');
 var pg=wp(WP),head=wSecHead({eyebrow:pg&&pg.nav_label,h:b.h,intro:b.intro});
 var notes=I.map(function(it,i){var no=(i<9?'0':'')+(i+1);return fli('<li class="'+K+'__card" data-i="'+i+'">',b,i)
  +'<p class="'+K+'__no"><button type="button" class="'+K+'__pin" data-i="'+i+'" aria-pressed="false" aria-label="'+no+': show on the drawing">'+no+'</button><span class="'+K+'__nop">'+no+'</span></p>'
  +(crops[i]||'')+'<h3 class="'+K+'__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 /* the drawing fills the column but never past 1:1 (its labels and tags are set in px; a short train stays at its
    drawn scale instead of swelling the sheet) */
 var fig='<div class="'+K+'__fig"><div class="'+K+'__cam" style="max-width:'+Wd+'px">'+svg+lab+mk+'</div></div>';
 var block='<div class="'+K+'__block" aria-hidden="true"><span>Aquemi</span><span>'+tx((pg&&pg.nav_label)||'')+'</span><span>'+tx(b.h||'')+'</span></div>';
 var inner='<div class="'+K+'" style="--n:'+I.length+'"><div class="'+K+'__main">'+head+fig+'</div>'
  +'<div class="'+K+'__side">'+wFold(b,I.length,'<ol class="'+K+'__cards" role="list">'+notes+'</ol>',b.fold_noun)+block+'</div></div>';
 return sec(inner,'aq-band--limestone '+K+'-sec')};
/* Pointing at a note lights its part (colour only) */
function lite(w,i,on){if(!w)return;var part=w.querySelector('[data-iso-id="o'+i+'"]'),tee=w.querySelector('[data-iso-id="tee'+i+'"]'),mk=w.querySelector('.'+K+'__mark[data-i="'+i+'"]'),c=w.querySelector('.'+K+'__card[data-i="'+i+'"]');
 [part,tee].forEach(function(p){if(p)p.classList.toggle('is-lit',on)});if(mk)mk.classList.toggle('is-on',on);if(c)c.classList.toggle('is-on',on)}
/* Ported from Subframe Motion "Product tour spotlight" (guided-inspection), MIT, (c) 2026 Subframe.
   Kept: the camera that translates and scales the plan to frame the chosen stop (scale about 1.6, centred, clamped to
   the plate), the rest dimmed, Escape to let go, the arrow keys to step through the stops; the transform eases in CSS
   (no transition under reduced motion). Replaced: the start/next buttons with the note numbers, the floor plan with
   our train. */
function frame(w,i){if(!w)return;var cam=w.querySelector('.'+K+'__cam'),fig=w.querySelector('.'+K+'__fig'),cur=w.getAttribute('data-focus');
 [].forEach.call(w.querySelectorAll('.'+K+'__pin'),function(b){b.setAttribute('aria-pressed','false')});
 if(cur!=null)lite(w,cur,false);
 if(i==null||String(i)===cur){w.removeAttribute('data-focus');w.classList.remove('is-focus');if(cam)cam.style.transform='';return}
 var mk=w.querySelector('.'+K+'__mark[data-i="'+i+'"]'),W=fig.clientWidth,Hh=fig.clientHeight,s=1.6;
 var px=parseFloat(mk.style.left)/100*W,py=parseFloat(mk.style.top)/100*Hh+18;
 var tx=Math.max(W-W*s,Math.min(0,W/2-px*s)),ty=Math.max(Hh-Hh*s,Math.min(0,Hh/2-py*s));
 cam.style.transform='translate('+tx.toFixed(1)+'px,'+ty.toFixed(1)+'px) scale('+s+')';
 w.setAttribute('data-focus',i);w.classList.add('is-focus');lite(w,i,true);
 var b=w.querySelector('.'+K+'__pin[data-i="'+i+'"]');if(b)b.setAttribute('aria-pressed','true')}
if(typeof document!=='undefined'){
 ['mouseover','mouseout'].forEach(function(ev){document.addEventListener(ev,function(x){
  var c=x.target.closest&&x.target.closest('.'+K+'__card');if(!c||c.contains(x.relatedTarget))return;var w=c.closest('.'+K),i=c.getAttribute('data-i');
  if(w&&w.getAttribute('data-focus')===i)return;lite(w,i,ev==='mouseover')})});
 document.addEventListener('click',function(x){var b=x.target.closest&&x.target.closest('.'+K+'__pin');if(b)frame(b.closest('.'+K),b.getAttribute('data-i'))});
 document.addEventListener('keydown',function(x){var b=x.target.closest&&x.target.closest('.'+K+'__pin');if(!b)return;var w=b.closest('.'+K);
  if(x.key==='Escape'){if(w.getAttribute('data-focus')!=null){x.preventDefault();frame(w,null)}return}
  var d={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[x.key];if(!d)return;x.preventDefault();
  var all=[].filter.call(w.querySelectorAll('.'+K+'__pin'),function(p){return p.offsetParent!==null}),k=all.indexOf(b),nx=all[(k+d+all.length)%all.length];
  if(nx){nx.focus();frame(w,nx.getAttribute('data-i'))}});
}
})();
