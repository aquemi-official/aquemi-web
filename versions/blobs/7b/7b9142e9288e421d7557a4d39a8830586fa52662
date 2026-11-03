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
   Phones: the sheet keeps its border; the drawing (pins keep the pairing), then the notes, each with its own small
   dashed part. */
(function(){
var K='aq-option-taps',S=230;
/* the card's own drawing of its dashed part (phones, where the sheet is small) */
function mini(it){var pt=isoPart(it.part||'filter',0,0,0,1,{cls:K+'__ghost',r:it.r,h:it.h}),bx=isoBounds([[-40,-40,0],[40,40,0],[-40,40,90],[40,-40,90]],4);
 return isoSvg(Math.round(bx.w),Math.round(bx.h),pt,'aq-iso--limestone '+K+'__mini',{origin:[-bx.x,-bx.y]})}
function pos(j,dy){return [j*S/2,-j*S/2+(dy||0),0]}
LOOKS['option-taps']=function(b,H){
 var T=b.train||[],I=b.items||[],sc=1.7,back='',main='',front='',labels=[],marks=[];
 var line=function(j){var p=pos(j,46);return [p[0],p[1],14]};
 var j0=-0.55,j1=Math.max(T.length-1,0)+0.5;
 /* the standard train */
 T.forEach(function(t,j){var p=pos(j),pt=isoPart(t.part||'filter',p[0]+(t.part==='ro'?-50:0),p[1]+(t.part==='ro'?-6:0),0,t.part==='ro'?1.2:sc,{id:'t'+j,r:t.r,h:t.h});
  main+=pt;labels.push({at:pt.at,t:t.label,dy:t.ly})});
 var trunk=isoPipe([line(j0),line(j1)],{r:4,caps:true,flanges:'ends',to:'t0'});
 /* the options: dashed parts on dashed tees */
 I.forEach(function(it,i){var row=it.row||(i%2?'front':'back'),j=it.at!=null?+it.at:i,d=row==='back'?-95:95,p=pos(j);p=[p[0]+d,p[1]+d,0];
  var pt=isoPart(it.part||'filter',p[0],p[1],0,sc*0.9,{id:'o'+i,cls:K+'__ghost',r:it.r,h:it.h});
  var a=line(j),q=[p[0],p[1]+(row==='back'?20:-20),14];
  var tee=isoPipe([a,[q[0],a[1],14],q],{r:3,flow:false,caps:'end',cls:K+'__tee',id:'tee'+i});
  if(row==='back')back+=tee+pt;else front+=tee+pt;
  marks.push({at:pt.at,i:i})});
 var inner=back+trunk+main+isoArrow(line(j0+0.25),[1,-1,0],{size:8})+isoArrow(line(j1-0.1),[1,-1,0],{size:8})+front;
 var Wd=1180,Hd=500,org=[150,310];
 var svg=isoSvg(Wd,Hd,inner,'aq-iso--limestone '+K+'__svg',{origin:org});
 var pc=function(p,dy){var q=isoPct([p[0],p[1]+(dy||0)],Wd,Hd,org);return 'left:'+q.left+';top:'+q.top};
 var lab=labels.map(function(l){return '<span class="'+K+'__label" aria-hidden="true" style="'+pc(l.at,l.dy!=null?+l.dy:-14)+'">'+tx(l.t||'')+'</span>'}).join('');
 var mk=marks.map(function(m){return '<span class="'+K+'__mark" data-i="'+m.i+'" aria-hidden="true" style="'+pc(m.at,-22)+'">'+(m.i<9?'0':'')+(m.i+1)+'</span>'}).join('');
 var pg=wp(WP),head=wSecHead({eyebrow:pg&&pg.nav_label,h:b.h,intro:b.intro});
 var notes=I.map(function(it,i){var no=(i<9?'0':'')+(i+1);return fli('<li class="'+K+'__card" data-i="'+i+'">',b,i)
  +'<p class="'+K+'__no"><button type="button" class="'+K+'__pin" data-i="'+i+'" aria-pressed="false" aria-label="'+no+': show on the drawing">'+no+'</button></p>'
  +mini(it)+'<h3 class="'+K+'__t">'+tx(it.t)+'</h3>'+(it.d?'<p class="'+K+'__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 var fig='<div class="'+K+'__fig"><div class="'+K+'__cam">'+svg+lab+mk+'</div></div>';
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
