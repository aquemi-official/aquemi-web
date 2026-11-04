/* Look "limit-stack" -> LimitStack (design-system/components/LimitStack): a spec block's limits as an editorial type
   stack. The heading set at display scale with the caption beside it, the rows stepping down and in like set type
   (index, mono label, the limit large in Geist Mono, its reference on a hairline that runs to the drawing), and a
   sculpted outlet pipe (IsoKit) coiling once before the skid outlet run, round which a navy collar sits.
   The row named "guaranteed" (or "outlet") is the stack's last, boxed step and the one the collar points to. The
   collar's word comes from that row's own label (its last comma part, "Skid outlet, guaranteed" -> "Guaranteed") and
   is left blank while the row's value is a [placeholder] or no row is named so (DR-018: the drawing never states a
   guarantee the copy keeps open); the collar band itself is always drawn.
   Fields: h, caption (shown beside the heading), intro (an annotation on the pipe), rows [{p, v, m, level}], note.
   Uses gaugeParse / gaugeLevel (blocks/spec.js) to split "≤ 1.3 µS/cm @ 25 °C" into limit, unit and qualifier. */
function lsPipe(){
 var R=58,cy=-60,cz=100,turn=540,pts=[[0,-320,cz+R],[0,-150,cz+R]],i,n=40,X=380;
 for(i=0;i<=n;i++){var t=turn*i/n*Math.PI/180;pts.push([40*i/n,cy+R*Math.sin(t),cz+R*Math.cos(t)])}
 var bot=pts[pts.length-1],y=bot[1]-20,z=bot[2];pts.push([bot[0]+6,y,z]);pts.push([X,y,z]);
 var pipe=isoPipe(pts,{r:15,bend:24,caps:'start',flanges:false,to:'out'});
 var band=isoCylD([250,y,z],'x',46,18);
 var collar='<g class="aq-iso__part aq-limit-stack__collar" data-iso-id="out">'+isoPath(band[0],'aq-iso__eq aq-limit-stack__band')+isoPath(band[1],'aq-iso__eq aq-limit-stack__band')+'</g>';
 var end=isoCylD([X,y,z],'x',5,20);
 var flange='<g class="aq-iso__part">'+isoPath(end[0]+end[1],'aq-iso__eq')+isoPath(isoRingD([X+5,y,z],'x',8),'aq-iso__thin')+'</g>';
 var lead=isoLeader([330,y,z-15],{dx:-40,dy:90},{shelf:20});
 var arr=isoArrow([0,-270,cz+R+24],'y',{size:8})+isoArrow([200,y,z+26],'x',{size:8});
 var inner=pipe+collar+flange+lead+arr;
 var all=pts.concat([[X+6,y,z-24],[X+6,y,z+24],[0,-320,cz+R+30]]),bx=isoBounds(all,20),W=Math.round(bx.w),Hh=Math.round(bx.h+150),org=[-bx.x,-bx.y];
 var c=isoP([273,y+9,z+9]),o=isoP([140,y,z-30]);
 return {svg:isoSvg(W,Hh,inner,'aq-iso--limestone aq-limit-stack__svg',{origin:org}),
  seal:isoPct(c,W,Hh,org),out:isoPct(o,W,Hh,org),note:isoPct(lead.end,W,Hh,org),side:lead.side,
  /* the band under the pipe that only the note's leader uses, as % of the width (phones drop the leader, pass 12) */
  cut:(140/W*100).toFixed(2)+'%'}}
LOOKS['limit-stack']=function(b,H){
 var rows=b.rows||[],head=wSecHead({eyebrow:b.caption,h:b.h}),hr=rows.filter(function(r){return /guarant|outlet/i.test(String(r.p||''))}).pop();
 var cw=hr&&String(hr.v||'').indexOf('[')<0?String(hr.p||'').split(',').pop().trim():'';cw=cw&&cw.charAt(0).toUpperCase()+cw.slice(1);
 var list='<ol class="aq-limit-stack__list">'+rows.map(function(r,i){
  var hero=/guarant|outlet/i.test(String(r.p||'')),g=gaugeParse(r.v),lvl=gaugeLevel(r);
  var val=g?'<span class="aq-limit-stack__n">'+e((g.c?g.c+' ':'')+g.t)+'</span>'+(g.u?' <span class="aq-limit-stack__u">'+tx(g.u)+'</span>':'')+(g.q?' <span class="aq-limit-stack__q">'+tx(g.q)+'</span>':''):'<span class="aq-limit-stack__n aq-limit-stack__n--open">'+tx(r.v)+'</span>';
  return '<li class="aq-limit-stack__row'+(hero?' is-hero':'')+(r.hl?' is-hl':'')+'" style="--i:'+(hero?Math.max(0,i-1):i)+'">'
   +'<p class="aq-limit-stack__p">'+idx(i)+'<span class="aq-limit-stack__pt">'+tx(r.p)+'</span>'+(lvl?'<span class="aq-limit-stack__lvl">'+e(lvl)+'</span>':'')+'</p>'
   +'<p class="aq-limit-stack__v">'+val+'</p>'
   +'<p class="aq-limit-stack__m"><span class="aq-limit-stack__rule" aria-hidden="true"></span><span class="aq-limit-stack__mt">'+tx(r.m||'')+'</span></p></li>'}).join('')+'</ol>';
 var P=lsPipe(),pos=function(p){return 'left:'+p.left+';top:'+p.top};
 /* The drawing and its lettering share one box (__draw), so the lettering stays on the pipe at any drawing width; the
    note is placed against the figure, which is the same box while the note is on the drawing (on phones it drops out
    of the drawing and sits under it, pass 12) */
 var fig='<figure class="aq-limit-stack__fig" style="--ls-cut:'+P.cut+'"><div class="aq-limit-stack__draw">'+P.svg
  +(cw?'<span class="aq-limit-stack__seal" aria-hidden="true" style="'+pos(P.seal)+'">'+tx(cw)+'</span>':'')
  +'<span class="aq-limit-stack__outlet" aria-hidden="true" style="'+pos(P.out)+'">Skid outlet</span></div>'
  +(b.intro?'<figcaption class="aq-limit-stack__note aq-limit-stack__note--'+P.side+'" style="'+pos(P.note)+'">'+tx(b.intro)+'</figcaption>':'')+'</figure>';
 /* The limestone sheet keeps its light tokens in the dark theme too (pipe body, flow line, the boxed outlet row) */
 return sec('<div class="aq-limit-stack">'+'<div class="aq-limit-stack__text">'+head+list+wSpecNote(b)+'</div>'+fig+'</div>','aq-band--limestone aq-limit-stack-sec').replace(/^<section class="([^"]*)"/,'<section class="$1" data-theme="light"')};
