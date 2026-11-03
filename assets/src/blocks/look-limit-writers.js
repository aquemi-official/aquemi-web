/* Look "limit-writers" -> LimitWriters (design-system/components/LimitWriters): the same package, a different limit-
   writer. One PP package on its base frame (IsoKit: media filter, RO rack, storage tank) sends one twin-wall pipe to a
   header that tees into a numbered sheet for each limit-writer (a pharmacopoeia, a standard, your recipe, your
   equipment maker). Under the drawing the stages split in two lists headed by the caption's two sentences: what stays
   the same (stages whose text does not start "Changes") and what changes (the stages that do, then the monitoring
   line, base, with its link).
   Concept: design-system/inspiration/gemini/195-p12-industries-same-water.png (idea only: never its [limit] tags).
   Fields (a diagram block): h, intro, writers (the limit-writers named in the intro, one per sheet; without it they
   are read from the intro after its colon), stages [{t, d, link}], base, base_link, caption ("What stays the same: … .
   What changes: … ."; with one sentence it is a note under both lists).
   Phones: the package on top at full width, its outlet dropping into a riser down the right with the sheets branching off it, then the two
   lists stacked. */
function lwWriters(b){if(b.writers&&b.writers.length)return b.writers;var s=String(b.intro||''),k=s.indexOf(':');if(k<0)return [];
 return s.slice(k+1).split('.')[0].split(/,\s*|\s+or\s+(?=your\b)/).map(function(x){x=x.replace(/^\s*(a|an)\s+/i,'').trim();return x.charAt(0).toUpperCase()+x.slice(1)}).filter(Boolean).slice(0,7)}
function lwSkid(){var z=9,sk=isoPart('skid',0,0,0,1,{w:206,d:62}),fi=isoPart('filter',18,32,z,1,{}),ro=isoPart('ro',40,14,z,1,{}),ta=isoPart('tank',178,34,z,1,{});
 var p1=isoPipe([fi.ports.out,[ro.ports.in[0],fi.ports.out[1],fi.ports.out[2]],[ro.ports.in[0],ro.ports.in[1],ro.ports.in[2]]].filter(function(p,i,a){return !i||String(p)!==String(a[i-1])}),{r:1.8,flanges:false,caps:false});
 var o=ro.ports.out,t=ta.ports.in,p2=isoPipe([o,[o[0]+8,o[1],o[2]],[o[0]+8,o[1],t[2]+10],[t[0],o[1],t[2]+10],[t[0],t[1],t[2]+10],t],{r:1.8,flanges:false,caps:false});
 var q=ta.ports.out,end=[q[0]+22,q[1],q[2]],p3=isoPipe([q,end],{r:2.4,flanges:'ends',caps:false});
 var inner=[sk,fi,p1,ro,p2,ta,p3].join(''),bx=isoBounds([[0,0,0],[206,0,0],[0,62,0],[206,62,0],[18,32,z+76],[40,14,z+70],[152,40,z+70],[178,34,z+90],end],8);
 var e2=isoP(end),W=e2[0]-bx.x+48,Hh=bx.h,org=[-bx.x,-bx.y],y=e2[1]+org[1],x=e2[0]+org[0];
 /* the outlet run: level out of the tank's outlet, up (or down) to the drawing's mid height, then level to the right
    edge, so it meets the header pipe's trunk at the figure's mid height (the drawing is centred beside the sheets) */
 var ym=Hh/2,xr=x+18,pd='M'+x.toFixed(1)+' '+y.toFixed(1)+'H'+xr.toFixed(1)+'V'+ym.toFixed(1)+'H'+W.toFixed(1);
 var stub='<g class="aq-limit-writers__stub">'+'<path class="aq-limit-writers__w1" d="'+pd+'"/><path class="aq-limit-writers__w2" d="'+pd+'"/><path class="aq-limit-writers__w3" d="'+pd+'"/>'+'</g>';
 return isoSvg(W,Hh,inner,'aq-limit-writers__iso',{origin:org}).replace(/<\/svg>$/,stub+'</svg>').replace('xMidYMid meet','xMaxYMid meet')}
LOOKS['limit-writers']=function(b,H){var K='aq-limit-writers',Wr=lwWriters(b),n=Wr.length,S=b.stages||[];
 /* the header: trunk in at mid height, a riser from the first sheet to the last, a tee into each (viewBox 100 x 100, stretched) */
 var d='M0 50H38',y0=50/n,y1=100-50/n;d+='M38 '+y0.toFixed(2)+'V'+y1.toFixed(2);for(var i=0;i<n;i++){var y=(i+0.5)*100/n;d+='M38 '+y.toFixed(2)+'H100'}
 var pipe='<svg class="'+K+'__pipe" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path class="'+K+'__w1" d="'+d+'"/><path class="'+K+'__w2" d="'+d+'"/><path class="'+K+'__w3" d="'+d+'"/></svg>';
 var sheets='<ol class="'+K+'__sheets" role="list" style="--n:'+n+'">'+Wr.map(function(w,i){return '<li class="'+K+'__sh" style="--i:'+i+'"><div class="'+K+'__sheet">'+idx(i)+'<p class="'+K+'__name">'+tx(w)+'</p></div></li>'}).join('')+'</ol>';
 var fig=n?'<div class="'+K+'__fig"><div class="'+K+'__skid" aria-hidden="true">'+lwSkid()+'</div>'+pipe+sheets+'</div>':'';
 var cap=String(b.caption||'').split(/(?<=\.)\s+/).filter(Boolean),two=cap.length===2;
 var row=function(s,i){var t=s.link&&wp(s.link)?'<a href="#'+e(s.link)+'" data-wp="'+e(s.link)+'">'+tx(s.t)+'</a>':tx(s.t);
  return '<li class="'+K+'__row">'+idx(i)+'<h3 class="'+K+'__t">'+t+'</h3>'+(s.d?'<p class="'+K+'__d">'+tx(s.d)+'</p>':'')+'</li>'};
 var same=[],chg=[];S.forEach(function(s,i){(/^changes\b/i.test(String(s.d||''))?chg:same).push(row(s,i))});
 var base=b.base?'<li class="'+K+'__row '+K+'__row--base"><span class="'+K+'__bm" aria-hidden="true"></span><p class="'+K+'__t">'
  +(b.base_link&&wp(b.base_link)?'<a href="#'+e(b.base_link)+'" data-wp="'+e(b.base_link)+'">'+tx(b.base)+'</a>':tx(b.base))+'</p></li>':'';
 var lists='<div class="'+K+'__lists"><div class="'+K+'__col">'+(two?'<p class="'+K+'__ch">'+tx(cap[0])+'</p>':'')+'<ol class="'+K+'__rows" role="list">'+same.join('')+'</ol></div>'
  +'<div class="'+K+'__col '+K+'__col--chg">'+(two?'<p class="'+K+'__ch">'+tx(cap[1])+'</p>':'')+'<ol class="'+K+'__rows" role="list">'+chg.join('')+base+'</ol></div></div>'
  +(!two&&b.caption?'<p class="'+K+'__note">'+tx(b.caption)+'</p>':'');
 return sec(H+'<div class="'+K+'">'+fig+lists+'</div>',K+'-sec')};
