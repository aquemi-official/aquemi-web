/* Look "ncr-tiles" -> NcrTiles (design-system/components/NcrTiles): how a defect is held and closed, as a bento of
   navy and limestone tiles, each led by a huge light slash numeral ("01/"). The first step (the hold) takes the
   oversized tile; a step with `hold` carries a closed-valve tag naming who signs. One tile is a line drawing of the
   repair step: a PP pipe run in isometric whose rejected joint has been cut out and lifted clear (an exploded view,
   dashed), with the remade length fused in its place, its two new joints in flow and short labels.
   Fields (a steps block): h, intro, items [{t, d, hold, link}], drawing (optional): {step (1-based index of the step
   the drawing shows, e.g. the repair), reject, cut, remade, number (short drawing labels, aria-hidden duplicates of
   that step's text; [placeholders] allowed)}. Six steps fit best: 01 + 02 + drawing over a row of four.
   Phones: one column; the drawing follows the step it shows. */
LOOKS['ncr-tiles']=(function(){
 var nn=function(i){return (i<9?'0':'')+(i+1)};
 function drawing(dr,stepTitle,stepNo){
  var r=10,lift=60,P=function(x,z){return [x,0,z||0]};
  var bead=function(x,z,cls){var c=isoCylD([x-0.8,0,z||0],[1,0,0],1.6,r*1.28);return '<path class="aq-iso__eq '+(cls||'')+'" d="'+c[0]+c[1]+'"/>'};
  var A=isoPipe([P(0),P(70)],{r:r,caps:true,flow:false}),
   B=isoPipe([P(120),P(176),P(176,64)],{r:r,caps:true,flow:false,bend:22}),
   N=isoPipe([P(70),P(120)],{r:r,caps:false,flow:false,cls:'aq-ncr-tiles__new-pipe'}),
   O=isoPipe([P(70,lift),P(120,lift)],{r:r,caps:true,flow:false,cls:'aq-ncr-tiles__old-pipe'});
  var x0=isoP(P(95,lift+r*1.3)),cross='<path class="aq-ncr-tiles__x" d="M'+(x0[0]-5).toFixed(1)+' '+(x0[1]-5).toFixed(1)+'l10 10m0 -10l-10 10"/>';
  var dim=isoDim(P(70,-r),P(120,-r),{off:[0,0,-16],cls:'aq-ncr-tiles__dim'});
  var lN=isoLeader(P(70,-r*1.28),[14,116],{cls:'aq-ncr-tiles__ld',shelf:0}),lR=isoLeader(P(120,-r*1.28),[118,124],{cls:'aq-ncr-tiles__ld'}),lO=isoLeader(P(95,lift+r*1.28),[128,-42],{cls:'aq-ncr-tiles__ld'});
  var W=264,H=214,org=[24,70];
  var inner='<g class="aq-ncr-tiles__base">'+A+bead(35)+'</g>'
   +'<g class="aq-ncr-tiles__new">'+N+bead(70,0,'aq-ncr-tiles__nb')+bead(120,0,'aq-ncr-tiles__nb')+lN+lR+'</g>'
   +'<g class="aq-ncr-tiles__base2">'+B+bead(150)+'</g>'+dim
   +'<g class="aq-ncr-tiles__old">'+O+bead(95,lift,'aq-ncr-tiles__bad')+cross+lO+'</g>';
  var at=function(p){var q=isoPct(p,W,H,org);return 'left:'+q.left+';top:'+q.top};
  var lab=function(p,t,cls){return t?'<span class="aq-ncr-tiles__lab '+cls+'" style="'+at(p)+'">'+tx(t)+'</span>':''};
  var dm=dim.mid;
  return '<div class="aq-ncr-tiles__fig" aria-hidden="true">'+isoSvg(W,H,inner,'aq-ncr-tiles__svg',{origin:org})
   +lab(lO.end,dr.reject,'is-reject is-r')+lab([dm[0],dm[1]+6],dr.cut,'is-cut')+lab([lN.end[0]-4,lN.end[1]+10],dr.number,'is-number')+lab(lR.end,dr.remade,'is-remade is-r')
   +'<span class="aq-ncr-tiles__figtag">'+e(stepNo)+' / '+tx(stepTitle)+'</span></div>'}
 return function(b,H){var I=b.items||[],dr=b.drawing&&b.drawing.step&&I[b.drawing.step-1]?b.drawing:null,ds=dr?dr.step-1:-1;
  var tiles=I.map(function(it,i){var tone=i===0||(i>1&&i%2===0)?'navy':'stone',who=it.hold?String(it.hold):'';
   return '<li class="aq-ncr-tiles__tile is-'+tone+(i===0?' is-lead':'')+(i===1&&!dr?' is-wide':'')+(it.hold?' is-hold':'')+(i===ds?' is-drawn':'')+'" style="--o:'+(i*2)+'"'+(tone==='stone'?' data-theme="light"':'')+'>'
    +'<span class="aq-ncr-tiles__n" aria-hidden="true">'+nn(i)+'/</span>'
    +'<h3 class="aq-ncr-tiles__t">'+(it.link&&wp(it.link)?wlink(it.link,it.t):tx(it.t))+'</h3>'+(it.d?'<p class="aq-ncr-tiles__d">'+tx(it.d)+'</p>':'')
    +(who?'<p class="aq-ncr-tiles__hold"><svg class="aq-ncr-tiles__valve" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="1" y="1" width="22" height="22"/><path d="M5 7L19 17V7L5 17Z"/></svg>'
     +'<span><span class="aq-ncr-tiles__hk">Hold</span> · Signed by '+tx(/^[A-Z][a-z]/.test(who)?who.charAt(0).toLowerCase()+who.slice(1):who)+'</span></p>':'')+'</li>'});
  if(dr)tiles.splice(2,0,'<li class="aq-ncr-tiles__tile is-figure" style="--o:'+(ds*2+1)+'" aria-hidden="true">'+drawing(dr,I[ds].t,nn(ds))+'</li>');
  return sec(H+'<ol class="aq-ncr-tiles" role="list">'+tiles.join('')+'</ol>','aq-ncr-tiles-sec')}})();
