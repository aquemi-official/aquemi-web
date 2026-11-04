/* Look "standard-wires" -> StandardWires (design-system/components/StandardWires): a table of standards (as: "evidence"
   shape: standard, what it asks, where we answer it) on a navy blueprint ground, each answer wired to the equipment
   that answers it. Left, the rows: a mono index, the standard set large in mono, what it asks, and the answer as a
   chip (the row's page link). Right, one drawing plate cut into a cell per row, each with that answer's equipment in
   IsoKit line art; a leader runs from the chip across to the cell and on to the part. Two rows that link the same page
   show the part of it that answers each (the analyser for limits, the panel for records).
   Fields: h, intro, cols (three labels), rows [[standard, asks, {t, link, art}]], fold, fold_noun, nav (plate title).
   art: analyzer | storage | panel | pretreatment | generation | outlet (what the cell draws; default by the link's
   page; outlet is a lab point of use on its drop from the loop). Phones: rows
   stack, the drawing beside the answer, the leader dropped. */
var SW_ART={'sys-monitoring':'analyzer','sys-storage':'storage','sys-pretreatment':'pretreatment','sys-pw':'generation'};
function swArt(k,id){var P=function(kind,x,y,s,o){o=o||{};o.id=id;return isoPart(kind,x,y,0,s,o)},parts=[],tgt;
 if(k==='storage'){var t=P('tank',0,0,1),pu=P('pump',58,12,0.9);
  parts=[t,isoPipe(isoRoute(t.ports.out,pu.ports.in,'xyz'),{r:2,id:id,caps:false}),pu,isoPipe([pu.ports.out,[pu.ports.out[0],pu.ports.out[1],96],[t.ports.ret[0],pu.ports.out[1],96],[t.ports.ret[0],t.ports.ret[1],96],t.ports.ret],{r:2,id:id,caps:false})];tgt=t.ports.top}
 else if(k==='panel'){var pn=P('panel',0,0,1.15),an=P('analyzer',44,10,0.9);parts=[pn,an];tgt=[pn.ports.top[0]-10,pn.ports.top[1]+8,pn.ports.top[2]-26]}
 else if(k==='pretreatment'){var f=P('filter',-18,0,1),c=P('carbon',22,4,1);parts=[f,isoPipe(isoRoute(f.ports.out,c.ports.in,'xyz',{via:[[f.ports.out[0]+6,f.ports.out[1],f.ports.out[2]]]}),{r:1.8,id:id,caps:false}),c];tgt=f.ports.top}
 else if(k==='outlet'){/* a lab point of use: the PP outlet on a short drop from the loop main above it */
  var o=P('outlet',0,0,1.2),ip=o.ports.in,zm=ip[2]+14;
  parts=[isoPipe([[ip[0]-46,ip[1],zm],[ip[0]+46,ip[1],zm]],{r:2.2,id:id,caps:true}),isoPipe([[ip[0],ip[1],zm],ip],{r:1.4,id:id,caps:false}),o];tgt=o.ports.top}
 else if(k==='generation'){var ro=P('ro',-56,-13,0.9);parts=[ro];tgt=ro.ports.top}
 else {var a=P('analyzer',0,0,1.25),pi=isoPipe([[-48,26,10],[60,26,10]],{r:2.4,id:id,caps:true});parts=[pi,a,isoPipe([a.ports.sample,[a.ports.sample[0],26,a.ports.sample[2]],[a.ports.sample[0],26,12.4]],{r:1,id:id,caps:false,wall:false})];tgt=[0,0,40]}
 var str=parts.join(''),pts=[],re=/[ML]\s*(-?[\d.]+)[ ,](-?[\d.]+)/g,m;while((m=re.exec(str)))pts.push([+m[1],+m[2]]);
 var x0=Math.min.apply(0,pts.map(function(p){return p[0]})),x1=Math.max.apply(0,pts.map(function(p){return p[0]})),y0=Math.min.apply(0,pts.map(function(p){return p[1]})),y1=Math.max.apply(0,pts.map(function(p){return p[1]}));
 return {svg:str,box:[x0,y0,x1,y1],tgt:isoP(tgt)}}
/* a code token with a hyphen (D1193-24) never breaks at the hyphen; text with a placeholder is set as is */
function swNb(x){return /[\[\]]/.test(x)?tx(x):x.split(/(\s+)/).map(function(t){return /\S-\S/.test(t)?'<span class="aq-standard-wires__nb">'+tx(t)+'</span>':tx(t)}).join('')}
LOOKS['standard-wires']=function(b,H){var C=b.cols||[],R=b.rows||[];
 var rows=R.map(function(r,i){var go=r[2]&&typeof r[2]==='object'?r[2]:{t:r[2]},k=go.art||SW_ART[wsplit(go.link||'')[0]]||'analyzer',id='sw'+i;
  var A=swArt(k,id),pad=10,W=300,Hh=170,bw=A.box[2]-A.box[0],bh=A.box[3]-A.box[1],sc=Math.min((W*0.7)/bw,(Hh-2*pad)/bh,2);
  /* the part sits right of centre; the wire enters at the left edge, mid height, and steps to the target */
  var ox=W*0.6-sc*(A.box[0]+A.box[2])/2,oy=Hh/2-sc*(A.box[1]+A.box[3])/2+2,tx2=ox+sc*A.tgt[0],ty2=oy+sc*A.tgt[1],kx=Math.max(24,tx2-46);
  var wire='<path class="aq-standard-wires__wire" d="M0 '+Hh/2+'H'+kx.toFixed(1)+'L'+(kx+Math.min(26,Math.abs(ty2-Hh/2))).toFixed(1)+' '+(Hh/2+Math.sign(ty2-Hh/2)*Math.min(26,Math.abs(ty2-Hh/2))).toFixed(1)+'V'+ty2.toFixed(1)+'H'+(tx2-4).toFixed(1)+'"/><circle class="aq-standard-wires__end" cx="'+(tx2-2).toFixed(1)+'" cy="'+ty2.toFixed(1)+'" r="2.6"/>';
  var svg='<svg class="aq-iso aq-iso--navy aq-standard-wires__svg" viewBox="0 0 '+W+' '+Hh+'" preserveAspectRatio="xMinYMid meet" aria-hidden="true" focusable="false" data-iso-motion="off">'
   +'<g transform="translate('+ox.toFixed(1)+' '+oy.toFixed(1)+') scale('+sc.toFixed(3)+')">'+A.svg+'</g>'+wire+'</svg>';
  var std=String(r[0]&&typeof r[0]==='object'?r[0].t:r[0]||'');
  return fli('<li class="aq-standard-wires__row" data-sw="'+id+'">',b,i)
   +'<div class="aq-standard-wires__std"><span class="aq-standard-wires__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<p class="aq-standard-wires__k">'+tx(C[0]||'')+'</p><h3 class="aq-standard-wires__s">'+std.split(/;\s*/).map(function(x){return '<span>'+swNb(x)+'</span>'}).join('<span class="aq-standard-wires__semi">; </span>')+'</h3></div>'
   +'<div class="aq-standard-wires__ask"><p class="aq-standard-wires__k">'+tx(C[1]||'')+'</p><p class="aq-standard-wires__a">'+tcell(r[1])+'</p></div>'
   +'<div class="aq-standard-wires__ans"><p class="aq-standard-wires__k">'+tx(C[2]||'')+'</p><p class="aq-standard-wires__chip">'+tcell(go)+'</p></div>'
   +'<span class="aq-standard-wires__run" aria-hidden="true"></span>'
   +'<div class="aq-standard-wires__cell" aria-hidden="true">'+svg+'</div></li>'}).join('');
 var head='<div class="aq-standard-wires__heads" aria-hidden="true">'+[0,1,2].map(function(j){return '<p><span>0'+(j+1)+' /</span> '+tx(C[j]||'')+'</p>'}).join('')+'<p></p><p>'+tx(b.nav||'')+'</p></div>';
 var plate='<div class="aq-standard-wires__foot" aria-hidden="true"><p class="aq-standard-wires__title"><span>Aquemi</span><span>'+tx(b.nav||'')+'</span><span>PW</span></p></div>';
 return sec(H+'<div class="aq-standard-wires">'+head+wFold(b,R.length,'<ol class="aq-standard-wires__list" role="list">'+rows+'</ol>',b.fold_noun||'standards')+plate+'</div>','aq-band--navy aq-standard-wires-sec')};
/* Hover or focus on a row lights its wire, its chip and the equipment that answers it */
(function(){
 function set(root,row){[].forEach.call(root.querySelectorAll('.aq-standard-wires__row.is-hot'),function(el){if(el!==row){el.classList.remove('is-hot');[].forEach.call(el.querySelectorAll('.aq-iso__part,.aq-iso__pipe'),function(p){p.classList.remove('is-lit')})}});
  if(row){row.classList.add('is-hot');[].forEach.call(row.querySelectorAll('.aq-iso__part,.aq-iso__pipe'),function(p){p.classList.add('is-lit')})}}
 function over(ev){var root=ev.target.closest&&ev.target.closest('.aq-standard-wires');if(root)set(root,ev.target.closest('.aq-standard-wires__row'))}
 function out(ev){var root=ev.target.closest&&ev.target.closest('.aq-standard-wires');if(root&&!root.contains(ev.relatedTarget))set(root,null)}
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);document.addEventListener('mouseout',out);document.addEventListener('focusout',out);
})();
