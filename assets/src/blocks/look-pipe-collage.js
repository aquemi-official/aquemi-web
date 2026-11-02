/* Look "pipe-collage" -> PipeCollage (design-system/components/PipeCollage): an evidence table as a Swiss poster. Left,
   a geometric collage of flat pieces (navy, limestone and sunken tiles; flow only as a line): one piece per row (a
   pressure vessel with its nameplate, a control panel with its label plate, a flanged elbow with a short branch, a
   grid of resin pellets, two pipe ends fused at a bead) set among plain filler tiles, each piece numbered as its row.
   Right, the rows as asymmetric editorial blocks hung from hairline brackets: the standard large, what we design to,
   the proof in mono, where we show it as a link. Hovering or focusing a block frames its piece in flow.
   Fields, as a table: cols [standard, what we design to, proof, where we show it], rows (cells strings or {t, link}),
   fold, fold_noun. New optional field: pieces, one per row, naming the piece drawn for it: vessel, panel, pipe,
   pellets, weld (each at most once; a row without one has no piece). The fold applies on phones only (desktop shows
   every block beside the whole collage). Phones: the board gives way to each block led by its own piece. */
var PC_SLOT={vessel:[0,0,1,2],pipe:[1,1,2,1],pellets:[0,2,1,1],panel:[2,2,1,2],weld:[0,3,2,1]};
var PC_FILL=[['arc',1,0],['quarter',2,0],['diag',1,2]];
function pcPiece(k){var r=function(x,y,w,h,c){return '<rect data-f="'+c+'" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'"/>'},
  c=function(x,y,R,cl){return '<circle data-f="'+cl+'" cx="'+x+'" cy="'+y+'" r="'+R+'"/>'},p=function(d,cl){return '<path data-f="'+cl+'" d="'+d+'"/>'};
 switch(k){
  case 'vessel':return r(0,0,100,200,'ls')+r(46,10,8,16,'nv')+p('M24 50 A26 22 0 0 1 76 50 V150 A26 22 0 0 1 24 150 Z','nv')+r(36,84,28,20,'sf')+p('M40 91 H60 M40 97 H54','ln')
   +p('M30 166 L26 190 M70 166 L74 190','lnb')+p('M50 26 V8','fl')+c(50,128,5,'ring');
  case 'pipe':return r(0,0,200,100,'sk')+p('M0 64 H112 A34 34 0 0 0 146 30 V0','pipe')+r(52,46,8,36,'nv')+r(130,10,32,8,'nv')+r(88,64,14,26,'nv')+r(84,88,22,6,'nv')+p('M0 64 H112 A34 34 0 0 0 146 30 V0','fl');
  case 'panel':return r(0,0,100,200,'nv')+r(18,26,64,148,'ls')+p('M50 26 V174','nvl')+r(24,40,20,16,'sf')+c(62,46,3.5,'nv')+c(70,46,3.5,'nv')+c(62,56,3.5,'dot')
   +p('M24 150 H44 M24 156 H44 M24 162 H44','nvl')+r(56,132,20,14,'sf')+p('M58 132 H76 V146 H58 Z','flb');
  case 'pellets':var s=r(0,0,100,100,'ls');for(var i=0;i<4;i++)for(var j=0;j<4;j++)if(i||j<3)s+=c(20+20*i,20+20*j,6.5,(i*4+j)%7===2?'nv':'ln');return s;
  case 'weld':return r(0,0,200,100,'nv')+r(14,32,78,36,'ls')+r(108,32,78,36,'ls')+p('M100 22 C93 34 93 66 100 78 C107 66 107 34 100 22 Z','bead')+p('M14 50 H186','flo')+p('M92 26 V74 M108 26 V74','nvl');
  case 'arc':return r(0,0,100,100,'sf')+p('M0 70 A30 30 0 0 1 30 100 M0 50 A50 50 0 0 1 50 100 M0 30 A70 70 0 0 1 70 100 M0 10 A90 90 0 0 1 90 100','fl');
  case 'quarter':return r(0,0,100,100,'ls')+p('M100 0 H0 A100 100 0 0 0 100 100 Z','nv')+c(78,22,8,'lsf');
  case 'diag':return r(0,0,100,100,'sk')+p('M0 100 L100 0 V100 Z','nv')+c(70,72,12,'lsf');
 }return ''}
function pcG(k,x,y,lab,i){var g=2,S=PC_SLOT[k]||[x,y,1,1],w=S[2]*100,h=S[3]*100;
 return '<g transform="translate('+(S[0]*100+g)+' '+(S[1]*100+g)+') scale('+((w-2*g)/w).toFixed(4)+' '+((h-2*g)/h).toFixed(4)+')"><g class="aq-pipe-collage__cell'+(i!=null?' is-piece':'')+'"'+(i!=null?' data-pc="'+i+'"':'')+' data-edge="'+(S[0]===0?'l':S[0]+S[2]>=3?'r':'t')+'">'
  +pcPiece(k)+(i!=null?'<rect class="aq-pipe-collage__frame" x="1" y="1" width="'+(w-2)+'" height="'+(h-2)+'"/>':'')
  +(lab?(k==='vessel'?'<text class="aq-pipe-collage__n" x="'+(w-8)+'" y="20" text-anchor="end">':'<text class="aq-pipe-collage__n" x="8" y="'+(h-10)+'">')+lab+'</text>':'')+'</g></g>'}
LOOKS['pipe-collage']=function(b,H){var C=b.cols||[],R=b.rows||[],K=b.pieces||[],used={};
 var cells=PC_FILL.map(function(f){return pcG(f[0],f[1],f[2])}).join('');
 R.forEach(function(r,i){var k=K[i];if(PC_SLOT[k]&&!used[k]){used[k]=1;cells+=pcG(k,0,0,(i<9?'0':'')+(i+1),i)}});
 Object.keys(PC_SLOT).forEach(function(k){if(!used[k])cells+=pcG(k==='weld'?'arc':k==='pellets'?'quarter':'diag',PC_SLOT[k][0],PC_SLOT[k][1])});
 var board='<div class="aq-pipe-collage__board" data-theme="light" aria-hidden="true"><svg viewBox="0 0 300 400" focusable="false">'+cells+'</svg></div>';
 var blocks='<ol class="aq-pipe-collage__blocks" role="list">'+R.map(function(r,i){var k=K[i],S=PC_SLOT[k],th=S&&used[k]?'<span class="aq-pipe-collage__thumb" data-theme="light" aria-hidden="true"><svg viewBox="0 0 '+S[2]*100+' '+S[3]*100+'" focusable="false">'+pcPiece(k)+'</svg></span>':'';
  var f=function(j,cls){var c=r[j];if(c==null||c==='')return '';return '<p class="'+cls+'"><span class="aq-pipe-collage__k">'+tx(C[j]||'')+'</span> '+tcell(c)+'</p>'};
  return fli('<li class="aq-pipe-collage__block" data-pc="'+i+'">',b,i)+th
   +idx(i)+'<div class="aq-pipe-collage__head"><h3 class="aq-pipe-collage__std">'+tcell(r[0])+'</h3></div>'
   +'<p class="aq-pipe-collage__how">'+tcell(r[1])+'</p>'+f(2,'aq-pipe-collage__proof')+f(3,'aq-pipe-collage__go')+'</li>'}).join('')+'</ol>';
 return sec(H+'<div class="aq-pipe-collage">'+board+'<div class="aq-pipe-collage__text">'+wFold(b,R.length,blocks,b.fold_noun||'standards')+'</div></div>','aq-pipe-collage-sec')};
function pcLight(bl,on){var w=bl&&bl.closest('.aq-pipe-collage');if(!w)return;var c=w.querySelector('.aq-pipe-collage__cell[data-pc="'+bl.getAttribute('data-pc')+'"]');
 if(c)c.classList.toggle('is-on',on);w.classList.toggle('is-focus',on&&!!c)}
if(typeof document!=='undefined'&&document.addEventListener){
 ['mouseover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var x=ev.target.closest&&ev.target.closest('.aq-pipe-collage__block');if(x)pcLight(x,true)})});
 ['mouseout','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var x=ev.target.closest&&ev.target.closest('.aq-pipe-collage__block');if(x&&!(ev.relatedTarget&&x.contains(ev.relatedTarget)))pcLight(x,false)})})}
