/* Look "tank-section" -> TankSection (design-system/components/TankSection): fabrication parameters read off a
   blueprint of the storage tank cut in half, on a navy band. The section shows the PP wall hatched as cut, the water
   level, the spray ball wetting the head space, the vent filter and inlet on the head, legs and the outlet pipe with a
   butt-fusion joint, the tank's height and inside diameter as dimensions, and two detail circles: A, the internal
   surface (the wall cut, its roughness profile against the water) and B, the joint (two pipe walls fused, the double
   bead). Rows with a part become callouts: a numbered balloon on the drawing, a leader to the side, the label on a
   hairline (left: spray, design, volume, contact; right: surface, joint). Every other row is listed in a parts
   schedule under the drawing (a real table with the block's column names).
   Phones: drawing full width with its balloons, the callouts as a numbered list under it, then the schedule; the
   fold applies on phones only.
   Fields (a spec block): h, caption, cols, rows [{p, v, m, part, link, link_label}], fold, fold_noun.
   part: "spray", "design", "volume", "contact", "surface" or "joint". */
(function(){
/* leader points (anchor first, label end last) and balloon point per part, in the 760 x 760 drawing */
var PART={spray:{s:'l',pts:[[321,212],[150,30],[0,30]],b:[150,30]},design:{s:'l',pts:[[262,160],[190,230],[0,230]],b:[190,230]},
 volume:{s:'l',pts:[[175,420],[0,420]],b:[100,420]},contact:{s:'l',pts:[[205,540],[130,610],[0,610]],b:[130,610]},
 surface:{s:'r',pts:[[730,290],[760,290]],b:[730,290]},joint:{s:'r',pts:[[730,530],[760,530]],b:[730,530]}};
var ORDER=['spray','design','volume','contact','surface','joint'];
var K='aq-tank-section';function P(d,c,x){return '<path class="'+K+'__'+c+'"'+(x||'')+' d="'+d+'"/>'}
var OUT='M200 230C200 170 260 150 330 150C400 150 460 170 460 230V560C460 600 400 620 330 620C260 620 200 600 200 560Z',
 IN='M210 230C210 178 265 160 330 160C395 160 450 178 450 230V560C450 592 395 610 330 610C265 610 210 592 210 560Z';
function drawing(balloons){
 var defs='<defs><pattern id="tsHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path class="aq-tank-section__hl" d="M0 0V8"/></pattern>'
  +'<clipPath id="tsIn"><path d="'+IN+'"/></clipPath><clipPath id="tsA"><circle cx="650" cy="290" r="80"/></clipPath><clipPath id="tsB"><circle cx="650" cy="530" r="80"/></clipPath></defs>';
 var g=defs+P('M80 700H680','floor')+P('M90 700l-12 12M130 700l-12 12M170 700l-12 12M210 700l-12 12M250 700l-12 12M290 700l-12 12M330 700l-12 12M370 700l-12 12M410 700l-12 12M450 700l-12 12M490 700l-12 12M530 700l-12 12M570 700l-12 12M610 700l-12 12M650 700l-12 12','thin');
 /* legs, then the shell cut (hatched wall), water, spray */
 g+='<g class="aq-tank-section__part">'+P('M226 598V700M238 604V700M216 700H248M422 604V700M434 598V700M412 700H444','ln')+'</g>';
 g+='<g class="aq-tank-section__part">'+P(OUT+IN,'wall',' fill-rule="evenodd"')+P(OUT,'ln')+P(IN,'ln')+'</g>';
 var w='';for(var y=348;y<=604;y+=18)w+=P('M210 '+y+'H450','water');
 g+='<g class="aq-tank-section__water" clip-path="url(#tsIn)">'+P('M210 330H450','level')+w+'</g>';
 g+='<g class="aq-tank-section__part">'+P('M324 100V203M336 100V203M316 100H344','ln')+'<circle class="aq-tank-section__eq" cx="330" cy="212" r="9"/>'
  +'<g class="aq-tank-section__jets">'+[[216,250],[224,300],[268,318],[330,322],[392,318],[436,300],[444,250],[246,196],[414,196]].map(function(q){return P('M330 212L'+q[0]+' '+q[1],'jet')}).join('')+'</g></g>';
 g+='<g class="aq-tank-section__part">'+P('M394 158V100M406 158V100','ln')+P('M384 56H416V100H384Z','eq')+P('M390 62V94M396 62V94M402 62V94M408 62V94','thin')+P('M400 52V36M395 41L400 36L405 41','thin')
  +P('M254 160V110M266 160V110M246 110H274M246 104H274','ln')+'</g>';
 /* outlet pipe with its butt-fusion joint */
 g+='<g class="aq-tank-section__part">'+P('M322 612V666H600V650H338V612Z','eq')+P('M600 642V674M606 642V674','ln')+P('M330 612V658H600','flow')
  +P('M512 650q4 -5 8 0q4 -5 8 0M512 666q4 5 8 0q4 5 8 0','bead')+'</g>';
 /* dimensions: height beside the shell, inside diameter across the water */
 g+='<g class="aq-tank-section__dims">'+P('M320 150H165M320 620H165M175 150V620M168 157L182 143M168 627L182 613','dim')
  +P('M210 470H450M203 477L217 463M443 477L457 463','dim')+'<text class="aq-tank-section__tx" x="330" y="462">ID</text>'
  +'<text class="aq-tank-section__tx" x="160" y="300" transform="rotate(-90 160 300)">H</text></g>';
 /* detail marks and circles */
 g+='<circle class="aq-tank-section__mark" cx="455" cy="380" r="16"/>'+P('M470 372L578 318','lead')+'<circle class="aq-tank-section__mark" cx="520" cy="658" r="16"/>'+P('M532 648L590 592','lead');
 var A='<g clip-path="url(#tsA)">'+P('M560 200H636V380H560Z','wall')+P('M636 200l3 6l-4 6l5 6l-4 6l3 6l-5 6l4 6l-3 6l5 6l-4 6l3 6l-5 6l4 6l-3 6l5 6l-4 6l3 6l-5 6l4 6l-3 6l5 6l-4 6l3 6l-5 6l4 6l-3 6l5 6l-4 6l3 6','prof')
  +P('M656 250H740M656 280H740M656 310H740M656 340H740','water')+'</g><circle class="aq-tank-section__det" cx="650" cy="290" r="80"/><text class="aq-tank-section__tx is-big" x="586" y="196">A</text>';
 var B='<g clip-path="url(#tsB)">'+P('M560 486H740V508H560Z','wall')+P('M650 486V508','cut')+P('M636 508q7 10 14 0q7 10 14 0M636 486q7 -10 14 0q7 -10 14 0','bead')
  +P('M560 528H740','water')+P('M560 548H740','water')+P('M560 568H740','water')+'</g><circle class="aq-tank-section__det" cx="650" cy="530" r="80"/><text class="aq-tank-section__tx is-big" x="586" y="618">B</text>';
 g+='<g class="aq-tank-section__detail">'+A+'</g><g class="aq-tank-section__detail">'+B+'</g>';
 g+=balloons;
 return '<svg class="aq-tank-section__svg" viewBox="0 0 760 760" aria-hidden="true" focusable="false">'+g+'</svg>'}
LOOKS['tank-section']=function(b,H){
 H=wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro});
 var R=b.rows||[],C=b.cols||['Parameter','Design value','Basis'],calls=[],rest=[];
 R.forEach(function(r,i){if(r.part&&PART[r.part])calls.push({r:r,i:i});else rest.push({r:r,i:i})});
 calls.sort(function(a,c){var A=PART[a.r.part],B=PART[c.r.part];return (A.s===B.s?A.pts[A.pts.length-1][1]-B.pts[B.pts.length-1][1]:A.s==='l'?-1:1)});
 var leaders='',balloons='';
 var items=calls.map(function(c,j){var q=PART[c.r.part],n=(j<9?'0':'')+(j+1),end=q.pts[q.pts.length-1];
  leaders+=P('M'+q.pts.map(function(p){return p.join(' ')}).join('L'),'leader');
  balloons+='<g class="aq-tank-section__balloon"><circle cx="'+q.b[0]+'" cy="'+q.b[1]+'" r="13"/><text x="'+q.b[0]+'" y="'+(q.b[1]+4)+'">'+n+'</text></g>';
  var lk=c.r.link&&wp(c.r.link)?' <a href="#'+e(c.r.link)+'" data-wp="'+e(c.r.link)+'">'+tx(c.r.link_label||wlabel(c.r.link))+'</a>':'';
  return '<li class="aq-tank-section__call is-'+q.s+'" style="--y:'+(end[1]/7.6).toFixed(2)+'%">'+'<span class="aq-tank-section__n" aria-hidden="true">'+n+'</span>'
   +'<h3 class="aq-tank-section__p">'+tx(c.r.p)+'</h3><p class="aq-tank-section__v">'+tx(c.r.v)+'</p>'+(c.r.m||lk?'<p class="aq-tank-section__m">'+tx(c.r.m||'')+lk+'</p>':'')+'</li>'}).join('');
 var svg=drawing(leaders+balloons);
 var sched=rest.length?'<table class="aq-tank-section__sched" role="table"><caption>'+tx(b.caption||b.h||'')+'</caption><thead role="rowgroup"><tr role="row">'
  +C.map(function(c){return '<th scope="col" role="columnheader">'+e(c)+'</th>'}).join('')+'</tr></thead><tbody role="rowgroup">'
  +rest.map(function(x){var r=x.r,lk=r.link&&wp(r.link)?' <a class="aq-tank-section__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':'';
   return fli('<tr role="row">',b,x.i)+'<th scope="row" role="rowheader">'+tx(r.p)+'</th><td role="cell" class="aq-tank-section__sv">'+tx(r.v)+'</td><td role="cell" class="aq-tank-section__sm">'+tx(r.m||'')+lk+'</td></tr>'}).join('')
  +'</tbody></table>':'';
 var block='<div class="aq-tank-section__block" aria-hidden="true"><span>Aquemi</span><span>'+tx(b.caption||'')+'</span><span>Section A–A</span></div>';
 var inner='<div class="aq-tank-section"><div class="aq-tank-section__fig"><div class="aq-tank-section__draw">'+svg+'</div>'
  +'<ol class="aq-tank-section__calls" role="list">'+items+'</ol></div>'+sched+block+'</div>';
 return sec(H+wFold(b,R.length,inner,b.fold_noun||'parameters'),'aq-band--navy aq-tank-section-sec')};
})();
