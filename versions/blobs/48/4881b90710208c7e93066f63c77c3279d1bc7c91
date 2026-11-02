/* Look "hire-path" -> HirePath (design-system/components/HirePath): how we hire as one drawing sheet (pass 9b concept
   careers.2). A hairline frame holds, on the left, the section title and the test joint of the practical interview
   drawn large as a duotone plate: two PP pipe legs meeting at a joint zone (two dashed bounds, no bead profile, so
   it asserts no joining method), with dimension hairlines for the outside diameter and the joint zone. On the right
   the steps run down a slim vertical rail: each step a gate tick on the rail, its number ("01 /") in mono, its name
   and line; where a step names the work it tests, its exercises follow as small line icons.
   Fields (a steps block): h, intro, items [{t, d, icons}], fig (optional): the plate's caption, e.g. "Test joint by
   [PP joining method]" (through tx, so a placeholder stays one). icons: Icon names in the order the step's text
   names them. Phones: the plate full width under the title, the rail below it. */
LOOKS['hire-path']=function(b,H){var I=b.items||[],P='aq-hire-path'+'__',num=function(i){return (i<9?'0':'')+(i+1)};
 var li=I.map(function(it,i){var ic=(it.icons||[]).filter(isIcon);
  return '<li class="'+P+'step" style="--i:'+i+'"><span class="'+P+'gate" aria-hidden="true"></span>'
   +'<p class="'+P+'n" aria-hidden="true">'+num(i)+' /</p><h3 class="'+P+'t">'+tx(it.t)+'</h3>'+(it.d?'<p class="'+P+'d">'+tx(it.d)+'</p>':'')
   +(ic.length?'<p class="'+P+'icons" aria-hidden="true">'+ic.map(function(n){return '<span class="'+P+'ic">'+wIcon(n)+'</span>'}).join('')+'</p>':'')+'</li>'}).join('');
 /* the plate: a 640 x 400 sheet; the pipe runs at -12 degrees through the joint at (320, 205) */
 var leg=function(x0,x1){return '<rect class="'+P+'pb" x="'+x0+'" y="-46" width="'+(x1-x0)+'" height="92"/><rect class="'+P+'ph" x="'+x0+'" y="-34" width="'+(x1-x0)+'" height="18"/>'
   +'<rect class="'+P+'ps" x="'+x0+'" y="20" width="'+(x1-x0)+'" height="26"/><path class="'+P+'po" d="M'+x0+' -46H'+x1+'M'+x0+' 46H'+x1+'"/>'};
 var dim='<g class="'+P+'dims">'
   /* outside diameter: extension lines off the left leg, the dimension line across, ticks */
   +'<path class="'+P+'dl" d="M-150 -46H-232M-150 46H-232M-222 -46V46M-227 -41L-217 -51M-227 51L-217 41"/>'
   /* joint zone: extension lines up from the bounds, the dimension line above the pipe */
   +'<path class="'+P+'dl" d="M-22 -50V-104M22 -50V-104M-22 -94H22M-27 -89L-17 -99M17 -89L27 -99"/>'
   /* a leader from the joint to the tag */
   +'<path class="'+P+'dl" d="M14 52L64 122H128"/></g>'
   +'<g class="'+P+'lbl" aria-hidden="true"><text x="-246" y="4" text-anchor="end">OD</text><text x="0" y="-112" text-anchor="middle">joint zone</text><text x="72" y="114">test joint</text></g>';
 var svg='<svg class="'+P+'svg" viewBox="0 0 640 400" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice"><rect class="'+P+'ground" width="640" height="400"/>'
  +'<g transform="translate(320 205) rotate(-12)">'+leg(-460,-2)+leg(2,460)
  +'<path class="'+P+'jz" d="M-22 -46V46M22 -46V46"/><path class="'+P+'jl" d="M0 -46V46"/>'+dim+'</g></svg>';
 var fig='<figure class="'+P+'fig"><div class="'+P+'plate">'+svg+'</div>'+(b.fig?'<figcaption class="'+P+'cap">'+tx(b.fig)+'</figcaption>':'')+'</figure>';
 return sec('<div class="aq-hire-path" style="--n:'+I.length+'"><div class="'+P+'main">'+H+fig+'</div>'
  +'<div class="'+P+'side"><span class="'+P+'head" aria-hidden="true"></span><ol class="'+P+'steps" role="list">'+li+'</ol></div></div>','aq-hire-path-sec')};
