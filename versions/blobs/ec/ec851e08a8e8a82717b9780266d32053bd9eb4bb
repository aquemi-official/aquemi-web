/* Look "macro-leaders" -> MacroLeaders (design-system/components/MacroLeaders): a comparison table read off a macro
   drawing. A close-up of what makes the water (RO membrane leaves fanned open over a PP pipe) fills
   the left, cropped by the page edge; numbered markers stand on an arc over it and a leader runs from each marker into
   its row, so every industry is "called out" from the same piece of equipment.
   Fields as a table block: cols (first is the row name), rows (cells, strings or {t, link}). No new fields.
   Phones: the macro is a short band above the rows; the markers stand on a rail down the left of the rows.
   The pipe is drawn plain, labelled "PP pipe", with no weld bead (DR-018: the joining method is open, FD-18). */
LOOKS['macro-leaders']=(function(){
 var uid=0;
 function f(n){return Math.round(n*10)/10}
 function cub(p){return 'M'+f(p[0][0])+' '+f(p[0][1])+'C'+[1,2,3].map(function(i){return f(p[i][0])+' '+f(p[i][1])}).join(' ')}
 function rev(p){return [p[3],p[2],p[1],p[0]]}
 function off(p,dx,dy){return p.map(function(q){return [q[0]+dx,q[1]+dy]})}
 function cubL(p){return 'L'+f(p[0][0])+' '+f(p[0][1])+'C'+[1,2,3].map(function(i){return f(p[i][0])+' '+f(p[i][1])}).join(' ')}
 /* the macro: five membrane leaves (back to front) over a plain PP pipe (no joint drawn while FD-18 is open) */
 function macro(k){var s='',i,pid='mlp-'+k,mid='mlm-'+k;
  s+='<defs><pattern id="'+pid+'" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)"><path class="aq-macro-leaders__hatch" d="M0 3.5H7"/></pattern>'
   +'<pattern id="'+mid+'" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path class="aq-macro-leaders__hatch" d="M0 0L12 12M12 0L0 12"/></pattern></defs>';
  /* leaves */
  for(i=0;i<5;i++){var y=70+i*78+i*i*5,sp=[[-30,y+150],[170,y+40],[380,y+5],[575-i*14,y+62-i*4]],bk=off(sp,30,-66),th=off(sp,0,7),cls=i%2?'aq-macro-leaders__leaf aq-macro-leaders__leaf--spacer':'aq-macro-leaders__leaf';
   s+='<g class="aq-macro-leaders__layer" data-l="'+i+'">'
    +'<path class="aq-macro-leaders__edge" d="'+cub(sp)+cubL(rev(th))+'Z"/>'
    +'<path class="'+cls+'" d="'+cub(bk)+cubL(rev(sp))+'Z"/>'
    +'<path class="aq-macro-leaders__tex" fill="url(#'+(i%2?mid:pid)+')" d="'+cub(bk)+cubL(rev(sp))+'Z"/>'
    +'<path class="aq-macro-leaders__water" d="'+cub(off(sp,24,-34))+'"/></g>'}
  /* pipe: centre line from lower left up to the right, radius r */
  var a=[60,820],b=[780,600],r=74,dx=b[0]-a[0],dy=b[1]-a[1],L=Math.sqrt(dx*dx+dy*dy),u=[dx/L,dy/L],n=[-u[1],u[0]];
  function pt(t,o){return [a[0]+u[0]*L*t+n[0]*o,a[1]+u[1]*L*t+n[1]*o]}
  function band(o1,o2,cls){var p1=pt(0,o1),p2=pt(1,o1),p3=pt(1,o2),p4=pt(0,o2);return '<path class="'+cls+'" d="M'+f(p1[0])+' '+f(p1[1])+'L'+f(p2[0])+' '+f(p2[1])+'L'+f(p3[0])+' '+f(p3[1])+'L'+f(p4[0])+' '+f(p4[1])+'Z"/>'}
  s+='<g class="aq-macro-leaders__pipe">'+band(-r,r,'aq-macro-leaders__pp')+band(-r*0.62,-r*0.34,'aq-macro-leaders__hi')+band(r*0.5,r,'aq-macro-leaders__lo')
   +'<path class="aq-macro-leaders__ol" d="M'+f(pt(0,-r)[0])+' '+f(pt(0,-r)[1])+'L'+f(pt(1,-r)[0])+' '+f(pt(1,-r)[1])+'M'+f(pt(0,r)[0])+' '+f(pt(0,r)[1])+'L'+f(pt(1,r)[0])+' '+f(pt(1,r)[1])+'"/>'
   +'</g>';
  s+='<text class="aq-macro-leaders__lbl" x="300" y="44">RO membrane</text><text class="aq-macro-leaders__lbl" x="'+f(pt(0.515,-r-30)[0]-40)+'" y="'+f(pt(0.515,-r-30)[1])+'">PP pipe</text>';
  return '<svg class="aq-macro-leaders__svg" viewBox="0 0 600 760" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">'+s+'</svg>'}
 return function(b,H){var C=b.cols||[],R=b.rows||[],k=++uid,n=R.length;
  var body=R.map(function(r,i){var t=n>1?(i-(n-1)/2)/((n-1)/2):0,kk=2*(1-Math.sqrt(1-0.75*t*t));
   return '<tr role="row" data-i="'+i+'" style="--k:'+kk.toFixed(3)+'">'+r.map(function(c,j){
    if(!j)return '<th role="rowheader" scope="row" class="aq-macro-leaders__ind"><span class="aq-macro-leaders__lead" aria-hidden="true"><span class="aq-macro-leaders__mk">'+(i<9?'0':'')+(i+1)+'</span></span><span class="aq-macro-leaders__name">'+tcell(c)+'</span></th>';
    return '<td role="cell"><span class="aq-macro-leaders__k" aria-hidden="true">'+tx(C[j]||'')+'</span>'+tcell(c)+'</td>'}).join('')+'</tr>'}).join('');
  return sec(H+'<div class="aq-macro-leaders" style="--n:'+n+'"><figure class="aq-macro-leaders__fig" aria-hidden="true">'+macro(k)+'</figure>'
   +'<table class="aq-macro-leaders__table" role="table"><thead role="rowgroup"><tr role="row">'+C.map(function(c){return '<th role="columnheader" scope="col">'+tx(c)+'</th>'}).join('')+'</tr></thead>'
   +'<tbody role="rowgroup">'+body+'</tbody></table></div>','aq-macro-leaders-sec')}
})();
