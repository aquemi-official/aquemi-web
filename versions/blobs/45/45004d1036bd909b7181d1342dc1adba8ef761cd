/* Look "cut-band" -> CutBand (design-system/components/CutBand): a short table of levels laid across the plant like a
   cutting plane. On a light ground the heading sits top left and a hairline elevation of the package stands at the
   right (control panel, RO rack with its housings and pump, the storage tank, the header between them, the loop
   below the skid with its points of use and their sample valves, where the data come from). A navy band runs the
   full width of the page through the middle of the drawing and carries the table: column names in mono, then each
   level numbered, its name in light display type, what it is set at (a figure in mono display), its basis as mono
   lines (split at ";") and the row's link.
   Fields, as a spec block: h, intro, cols [level, set at, basis], rows [{p, v, m, level, hl, link, link_label}], note.
   Phones: the drawing stands under the heading and the band rises over its foot; rows stack inside the band. */
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
LOOKS['cut-band']=function(b,H){var C=b.cols||[],R=b.rows||[];
 var head='<div class="aq-cut-band__cols" aria-hidden="true"><span></span>'+C.slice(0,3).map(function(c){return '<span>'+tx(c)+'</span>'}).join('')+'</div>';
 var rows=R.map(function(r,i){var fig=/\d/.test(String(r.v||''))&&String(r.v).length<24,basis=String(r.m||'').split(/;\s*/).filter(Boolean);
  var go=r.link&&wp(r.link)?'<p class="aq-cut-band__go">'+wBtn(r.link_label||wlabel(r.link),r.link,'link',r.intent)+'</p>':'';
  return '<li class="aq-cut-band__row'+(r.level?' is-'+e(r.level):'')+'">'
   +'<span class="aq-cut-band__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<h3 class="aq-cut-band__p">'+tx(r.p)+'</h3>'
   +'<p class="aq-cut-band__v'+(fig?' is-fig':'')+'">'+(C[1]?'<span class="aq-cut-band__k">'+tx(C[1])+'</span>':'')+'<span class="aq-cut-band__val">'+tx(r.v)+'</span></p>'
   +'<div class="aq-cut-band__m">'+(C[2]?'<span class="aq-cut-band__k">'+tx(C[2])+'</span>':'')+basis.map(function(x){return '<span class="aq-cut-band__ref">'+tx(x)+'</span>'}).join('')+go+'</div></li>'}).join('');
 return sec('<div class="aq-cut-band"><div class="aq-cut-band__head">'+H+'</div><div class="aq-cut-band__fig">'+cbPlant()+'</div>'
  +'<div class="aq-cut-band__band"><span class="aq-cut-band__occ" aria-hidden="true"><i></i><i></i></span>'+head+'<ol class="aq-cut-band__rows">'+rows+'</ol></div>'
  +(b.note?'<p class="aq-cut-band__note">'+tx(b.note)+'</p>':'')+'</div>','aq-cut-band-sec')};
