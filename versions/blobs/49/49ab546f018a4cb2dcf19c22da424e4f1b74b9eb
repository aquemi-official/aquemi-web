/* Look "cut-band" -> CutBand (design-system/components/CutBand): a short table of levels laid across the plant like a
   cutting plane. On a light ground the heading sits top left and a hairline elevation of the package stands at the
   right (control panel, RO rack with its housings and pump, the storage tank, the header between them, the loop
   below the skid with its points of use and their sample valves, where the data come from). A navy band runs the
   full width of the page through the middle of the drawing and carries the table: column names in mono, then each
   level numbered, its name in light display type, what it is set at (a figure in mono display), its basis as mono
   lines (split at ";") and the row's link.
   Fields, as a spec block: h, intro, cols [level, set at, basis], rows [{p, v, m, level, hl, link, link_label}], note.
   Phones (pass 12): the plant drawing gives way to a 12-month trend strip on chart paper (cbTrend: the action level
   as a navy rule labelled with the action row's "set at", the alert level as a dashed rule named by the other row,
   set from a shaded first stretch), then the navy band with the rows stacked. Desktop unchanged. */
function cbPlant(){var P='aq-cut-band'+'__',L=function(c,d){return '<path class="'+P+c+'" d="'+d+'"/>'};
 var s=L('frame','M8 8H472V592H8Z');
 /* skid base and feet */
 s+=L('eq','M40 470H440V486H40Z')+L('ln','M56 486V496M424 486V496M240 486V496');
 /* control panel: cabinet, door split, HMI, pilot lights */
 s+=L('eq','M50 150H122V470H50Z')+L('ln','M86 150V470M60 168H112V198H60ZM64 220H70M76 220H82M64 232H70')+L('trace','M64 190L74 180L84 186L94 174L106 180');
 /* RO rack: frame, four housings, pump */
 s+=L('eq','M140 196H292V470H140Z')+L('ln','M140 214H292M140 452H292');
 [228,256,284,312].forEach(function(y){s+=L('eq','M150 '+y+'H282V'+(y+18)+'H150Z')+L('ln','M162 '+y+'V'+(y+18)+'M270 '+y+'V'+(y+18))});
 s+=L('eq','M196 408H236V452H196Z')+L('ln','M204 396H228V408H204Z');
 /* storage tank: domed shell, legs, manway */
 s+=L('eq','M322 470V160Q322 116 366 116Q410 116 410 160V448H322')+L('ln','M322 448H410M330 448V470M402 448V470M352 300H380V328H352Z');
 /* header from the rack to the tank, signal line from the panel */
 s+=L('pipe','M282 237H306V92H366V116')+L('hid','M122 172H140');
 /* the loop: out of the tank, under the skid, two points of use, back */
 s+=L('pipe','M404 448V430H428V528H72V500')+L('pipe','M156 528V552M264 528V552');
 s+=L('eq','M146 552H166V572H146ZM254 552H274V572H254Z');
 /* sample valves at the points of use: where the data come from */
 s+=L('smp','M166 562H178M274 562H286')+'<circle class="'+P+'pt" cx="182" cy="562" r="4"/><circle class="'+P+'pt" cx="290" cy="562" r="4"/>';
 /* the water in the header and loop */
 s+=L('water','M282 237H306V92H366V116')+L('water','M404 448V430H428V528H72V500');
 return '<svg class="'+P+'svg" viewBox="0 0 480 600" preserveAspectRatio="xMidYMin meet" aria-hidden="true" focusable="false">'+s+'</svg>'}
/* The phone's trend strip (pass 12, audit svc-cq.4): twelve months of monitoring on chart paper, the levels as ruled
   lines named from the block's own rows (the action row's "set at", the other row's name). The dots are a drawn
   pattern, not data: no axis values, no counts. Phases 1 and 2 (a dense first stretch, shaded) set the alert line,
   which then carries on through the year; one reading rises over it, never to the action line. */
function cbTrend(R){var act=null,alt=null;R.forEach(function(r){if(!act&&r.level==='action')act=r;else if(!alt)alt=r});if(!act)return '';
 var P='aq-cut-band'+'__',W=360,Hh=170,x0=6,x1=354,mw=(x1-x0)/12,yA=34,yL=80,yB=158,s='',seed=7;function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
 for(var m=0;m<=12;m++)s+='<path class="'+P+'tg'+(m%3?'':' is-q')+'" d="M'+(x0+m*mw).toFixed(1)+' 8V'+yB+'"/>';
 for(var y=yB;y>8;y-=12)s+='<path class="'+P+'tg" d="M'+x0+' '+y+'H'+x1+'"/>';
 s+='<rect class="'+P+'ph" x="'+x0+'" y="8" width="'+mw.toFixed(1)+'" height="'+(yB-8)+'"/>';
 var d='';for(var i=0;i<28;i++){var x=x0+3+i*(mw-6)/27,y=112+rnd()*24;d+='<circle class="'+P+'dt is-ph" cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="1.6"/>'}
 for(var j=0;j<44;j++){var xx=x0+mw+6+j*(x1-x0-mw-10)/43,yy=j===14?68:106+rnd()*32;d+='<circle class="'+P+'dt'+(j===14?' is-x':'')+'" cx="'+xx.toFixed(1)+'" cy="'+yy.toFixed(1)+'" r="'+(j===14?2.6:1.9)+'"/>'+(j===14?'<circle class="'+P+'ring" cx="'+xx.toFixed(1)+'" cy="68" r="7"/>':'')}
 s+='<path class="'+P+'act" d="M'+x0+' '+yA+'H'+x1+'"/>'+(alt?'<path class="'+P+'alt" d="M'+(x0+mw).toFixed(1)+' '+yL+'H'+x1+'"/><path class="'+P+'alt is-set" d="M'+x0+' '+yL+'H'+(x0+mw).toFixed(1)+'"/>':'')+d;
 var lab=function(c,y,t){return '<span class="'+P+'tl '+P+'tl--'+c+'" style="top:'+(100*y/Hh).toFixed(2)+'%">'+tx(t)+'</span>'};
 return '<div class="'+P+'trend" data-theme="light" aria-hidden="true"><div class="'+P+'paper" style="aspect-ratio:'+W+' / '+Hh+'"><svg class="'+P+'tsvg" viewBox="0 0 '+W+' '+Hh+'" preserveAspectRatio="none" focusable="false">'+s+'</svg>'
  +lab('act',yA,act.v||act.p)+(alt?lab('alt',yL,alt.p):'')+'</div></div>'}
LOOKS['cut-band']=function(b,H){var C=b.cols||[],R=b.rows||[];
 var head='<div class="aq-cut-band__cols" aria-hidden="true"><span></span>'+C.slice(0,3).map(function(c){return '<span>'+tx(c)+'</span>'}).join('')+'</div>';
 var rows=R.map(function(r,i){var fig=/\d/.test(String(r.v||''))&&String(r.v).length<24,basis=String(r.m||'').split(/;\s*/).filter(Boolean);
  var go=r.link&&wp(r.link)?'<p class="aq-cut-band__go">'+wBtn(r.link_label||wlabel(r.link),r.link,'link',r.intent)+'</p>':'';
  return '<li class="aq-cut-band__row'+(r.level?' is-'+e(r.level):'')+'">'
   +'<span class="aq-cut-band__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<h3 class="aq-cut-band__p">'+tx(r.p)+'</h3>'
   +'<p class="aq-cut-band__v'+(fig?' is-fig':'')+'">'+(C[1]?'<span class="aq-cut-band__k">'+tx(C[1])+'</span>':'')+'<span class="aq-cut-band__val">'+tx(r.v)+'</span></p>'
   +'<div class="aq-cut-band__m">'+(C[2]?'<span class="aq-cut-band__k">'+tx(C[2])+'</span>':'')+basis.map(function(x){return '<span class="aq-cut-band__ref">'+tx(x)+'</span>'}).join('')+go+'</div></li>'}).join('');
 return sec('<div class="aq-cut-band"><div class="aq-cut-band__head">'+H+'</div><div class="aq-cut-band__fig">'+cbPlant()+'</div>'+cbTrend(R)
  +'<div class="aq-cut-band__band"><span class="aq-cut-band__occ" aria-hidden="true"><i></i><i></i></span>'+head+'<ol class="aq-cut-band__rows">'+rows+'</ol></div>'
  +(b.note?'<p class="aq-cut-band__note">'+tx(b.note)+'</p>':'')+'</div>','aq-cut-band-sec')};
