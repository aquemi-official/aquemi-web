/* Look "rule-figures" -> RuleFigures (design-system/components/RuleFigures): a spec block of design rules set as a
   Swiss rule sheet where each rule is explained by a small engineering figure rather than a table cell. The lead rule
   (the first hl row) is a full-width band: its words set large beside a long pipe cut open lengthways, the water in it
   drawn as turbulent streaks and eddies with the flat (1/7 power) velocity profile of turbulent flow at the outlet end.
   The other rules sit in a three-column grid of figure cards: figure, number, rule name, the rule figure in mono,
   the design value and basis under the column names. Figures are line art drawn here (fig field):
   "turbulent" (lead), "slope" (a falling run to a low-point drain, slope triangle), "deadleg" (a branch off the main
   with its L and D dimensions), "sanitize" (the loop with a thermometer at its coldest point), "valve" (a zero-static
   point-of-use valve on the main), "vent" (tank head with its vent filter), "monitor" (instrument bubbles on the
   return: CE, TE, FE and a dashed AE for TOC). A row without fig gets the figure its name asks for
   (pass 12: "sanitiz" -> "sanitemp", the sanitization level along the run checked at the coldest point; "point of use"
   -> "valve", or "pou" (an open, dashed seat) while the row's value is still a placeholder; "sample" -> "sample", a
   sample point on the main, its valve drawn open until its design is chosen), else no figure box at all.
   Phones (pass 12): each card a row, its figure cropped square at 96 px on the left, the basis behind a "Basis +"
   head (PhoneKit accordion); the lead pipe stays inside the gutter.
   Fields (a spec block): h, caption, cols, rows [{p, v, m, rule, hl, fig, link, link_label}], fold, fold_noun.
   The fold applies on phones only (desktop shows every rule). */
(function(){
var VB='0 0 240 120';
var K='aq-rule-figures';function p(d,c){return '<path class="'+K+'__'+(c||'ln')+'" d="'+d+'"/>'}
function t(x,y,s,c){return '<text class="aq-rule-figures__tx'+(c?' '+c:'')+'" x="'+x+'" y="'+y+'">'+e(s)+'</text>'}
var FIG={
 slope:function(){return p('M16 27L196 57M16 41L184 69M196 57V92M184 69V88','ln')
  +p('M180 88H200V108H180Z','fill')+p('M180 88L200 108M200 88L180 108','th')+p('M60 92H150V107M60 92L150 107','dim')
  +p('M16 34L190 63V84','fl')+p('M190 112q-3 4 0 6q3-2 0-6','fl')},
 deadleg:function(){return p('M10 80H110M126 80H230M10 96H230','ln')+p('M110 80V46M126 80V46','ln')+p('M100 30H136V46H100Z','fill')
  +p('M118 30V14M106 14H130','ln')+p('M104 42Q118 34 132 42','th')
  +p('M10 88H230','fl')+p('M118 86V50','fl fl-hid')
  +p('M128 80H156M128 46H156M150 80V46M145 80H155M145 46H155','dim')+t(160,67,'L')
  +p('M110 64H126M110 59V69M126 59V69','dim')+t(92,68,'D')},
 sanitize:function(){return p('M54 24H186A30 30 0 0 1 186 96H54A30 30 0 0 1 54 24ZM58 34H182A20 20 0 0 1 182 86H58A20 20 0 0 1 58 34Z','ln')
  +p('M56 29H184A25 25 0 0 1 184 91H56A25 25 0 0 1 56 29Z','fl')
  +'<circle class="aq-rule-figures__ring" cx="198" cy="88" r="8"/>'+p('M206 88H218','dim')
  +p('M222 34V96M232 34V96M222 34A5 5 0 0 1 232 34','ln')+'<circle class="aq-rule-figures__fill" cx="227" cy="104" r="9"/>'+p('M227 98V56','fl')},
 valve:function(){return p('M10 30H230M10 46H104M136 46H230','ln')+p('M104 46H136V70H104Z','fill')+p('M108 60Q120 50 132 60','th')
  +p('M136 58H160M160 46V70','ln')+p('M114 70V94M126 70V94M110 94H130','ln')+p('M10 38H230','fl')+p('M120 50V92','fl fl-hid')+p('M120 102q-3 4 0 6q3-2 0-6','fl')},
 vent:function(){return p('M24 120V94C24 68 70 54 120 54C170 54 216 68 216 94V120','ln')+p('M112 54V40M128 54V40M104 40H136','ln')
  +p('M106 10H134V40H106Z','fill')+p('M112 14V36M116 14V36M120 14V36M124 14V36M128 14V36','th')+p('M150 30V8M145 13L150 8L155 13','dim')
  +p('M30 104H210','fl fl-hid')},
 /* pass 12: the sanitization level along the run (temperature or dose): high where it enters, lowest at the far
    end, held under the dashed maximum, checked by the TE at the coldest point */
 sanitemp:function(){return p('M10 22H230M10 38H230','ln')+p('M10 30H230','fl')
  +p('M10 108H230','dim')+p('M14 62C70 64 130 72 196 82L230 86V108H14Z','band')+p('M14 62C70 64 130 72 196 82L230 86','fl')
  +p('M10 56H230','lim')+p('M196 82V38','dim')+'<circle class="aq-rule-figures__ring" cx="196" cy="82" r="4"/>'
  +'<circle class="'+K+'__bub" cx="214" cy="60" r="15"/>'+t(214,64,'TE','is-mid')+p('M199 60H196','ln')+p('M60 30m-5 -4l6 4l-6 4M140 30m-5 -4l6 4l-6 4','fl')},
 /* pass 12: a sample point on the main; the valve is drawn open (a dashed seat) until its design is chosen in the copy */
 sample:function(){return p('M10 30H230M10 46H230','ln')+p('M10 38H230','fl')
  +p('M104 46H136V68H104Z','open')+p('M120 76q-3 4 0 6q3-2 0-6','fl')},
 /* pass 12: a point-of-use valve whose type the copy still leaves open: an open, dashed seat on the main, its outlet down */
 pou:function(){return p('M10 30H230M10 46H230','ln')+p('M10 38H230','fl')+p('M104 46H136V68H104Z','open')+p('M120 68V84','ln')},
 monitor:function(){var o=p('M10 70H230M10 86H230','ln')+p('M10 78H230','fl');
  [['CE',44],['TE',96],['FE',148],['AE',200]].forEach(function(q,i){o+=p('M'+q[1]+' 50V70','ln')+'<circle class="'+K+'__'+(i===3?'bub is-opt':'bub')+'" cx="'+q[1]+'" cy="34" r="16"/>'+t(q[1],38,q[0],'is-mid')});return o}
};
/* Lead figure: a pipe cut lengthways, turbulent streaks (seeded, so every render matches), eddies, velocity profile */
function lead(){var W=1200,o='',s=7;function r(){s=(s*9301+49297)%233280;return s/233280}
 var walls=p('M0 28H1200M0 172H1200','wall')+p('M0 20H1200M0 180H1200','ln');
 for(var k=0;k<9;k++){var y0=46+k*13.5,d='M0 '+y0.toFixed(1),py=y0;for(var x=40;x<=440;x+=40){var amp=6+12*Math.sin(Math.PI*(k+1)/10),ny=y0+(r()-0.5)*amp*2;
   d+='S'+(x-14)+' '+ny.toFixed(1)+' '+x+' '+ny.toFixed(1);py=ny}o+='<path class="aq-rule-figures__streak" style="--k:'+k+'" d="'+d+'"/>'}
 var ed='';for(var j=0;j<5;j++){var cx=50+j*80+r()*30,cy=60+r()*80,rr=6+r()*8,sw=j%2?1:0;
  ed+='<path class="aq-rule-figures__eddy" d="M'+(cx-rr).toFixed(1)+' '+cy.toFixed(1)+'a'+rr.toFixed(1)+' '+rr.toFixed(1)+' 0 1 '+sw+' '+(rr*1.6).toFixed(1)+' '+(rr*0.4).toFixed(1)+'a'+(rr*0.6).toFixed(1)+' '+(rr*0.6).toFixed(1)+' 0 1 '+sw+' '+(-rr*0.9).toFixed(1)+' '+(-rr*0.5).toFixed(1)+'"/>'}
 var X=480,prof='',env='M'+X+' 28';for(var i=0;i<=10;i++){var y=34+i*13.2,eta=Math.abs((y-100)/72),L=110*Math.pow(Math.max(1-eta,0),1/7);
  prof+='<path class="aq-rule-figures__arrow" d="M'+X+' '+y.toFixed(1)+'H'+(X+L).toFixed(1)+'m-6 -4l6 4l-6 4"/>';env+='L'+(X+L).toFixed(1)+' '+y.toFixed(1)}
 env+='L'+X+' 172';
 return '<svg class="aq-rule-figures__pipe" viewBox="0 0 '+W+' 200" preserveAspectRatio="xMinYMid slice" aria-hidden="true" focusable="false">'
  +walls+'<g class="aq-rule-figures__streaks">'+o+'</g><g class="aq-rule-figures__eddies">'+ed+'</g>'
  +p('M'+X+' 28V172','dim')+'<g class="aq-rule-figures__prof">'+prof+'</g>'+p(env,'env')+'</svg>'}
/* phones: each figure cropped square on its subject, so its letters render at 12 px or more in a 96 px box */
var PV={slope:'76 0 130 130',deadleg:'58 -2 130 130',sanitize:'110 -5 130 130',sanitemp:'100 0 130 130',valve:'55 -2 130 130',sample:'55 -2 130 130',pou:'55 -2 130 130',vent:'55 -5 130 130',monitor:'28 -5 140 140'};
function fig(n){return FIG[n]?'<svg class="aq-rule-figures__fig" viewBox="'+VB+'" aria-hidden="true" focusable="false">'+FIG[n]()+'</svg>'
  +'<svg class="aq-rule-figures__fig aq-rule-figures__fig--ph" viewBox="'+(PV[n]||VB)+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">'+FIG[n]()+'</svg>':''}
/* a rule without a fig field gets the figure its name asks for (pass 12), each at most once per block */
function figFor(r,used){if(r.fig)return r.fig;var n=String(r.p||''),k=/sanitiz/i.test(n)?'sanitemp':/point.of.use/i.test(n)?(/^\s*\[/.test(r.v)?'pou':'valve'):/sample/i.test(n)?'sample':'';return k&&!used[k]?k:''}
function golink(r){return r.link&&wp(r.link)?' <a class="aq-rule-figures__link" href="#'+e(r.link)+'" data-wp="'+e(r.link)+'">'+tx(r.link_label||wlabel(r.link))+'</a>':''}
LOOKS['rule-figures']=function(b,H){
 var R=b.rows||[],C=b.cols||['Rule','Design value','Basis'],li=-1;R.forEach(function(r,i){if(li<0&&r.hl)li=i});if(li<0)li=0;
 var L=R[li],num=function(i){return (i<9?'0':'')+(i+1)};
 var dl=function(r){return '<dl class="aq-rule-figures__dl"><div><dt>'+e(C[1]||'Design value')+'</dt><dd class="aq-rule-figures__v">'+tx(r.v)+'</dd></div>'
  +(r.m||r.link?'<div><dt>'+e(C[2]||'Basis')+'</dt><dd class="aq-rule-figures__m">'+tx(r.m||'')+golink(r)+'</dd></div>':'')+'</dl>'};
 var band='<div class="aq-rule-figures__lead"><div class="aq-rule-figures__lead-text"><p class="aq-rule-figures__no" aria-hidden="true">'+num(li)+'</p>'
  +'<h3 class="aq-rule-figures__lead-p">'+tx(L.p)+'</h3>'+(L.rule?'<p class="aq-rule-figures__rule aq-rule-figures__rule--lead">'+tx(L.rule)+'</p>':'')+dl(L)+'</div>'
  +'<div class="aq-rule-figures__lead-art">'+lead()+'</div></div>';
 var used={};R.forEach(function(r){if(r.fig)used[r.fig]=1});
 /* phones (PhoneKit accordion, all closed): each card's basis sits behind a "Basis +" head (the basis column label) */
 var pdl=function(r){var bs=r.m||r.link;return '<dl class="aq-rule-figures__dl"><div><dt>'+e(C[1]||'Design value')+'</dt><dd class="aq-rule-figures__v">'+tx(r.v)+'</dd></div>'
  +'</dl>'+(bs?'<button type="button" class="aq-rule-figures__bh" data-pk-head aria-label="'+e(C[2]||'Basis')+': '+e(String(r.p||'').replace(/\[[^\]]*\]/g,'').replace(/,\s*$/,'').trim())+'">'+e(C[2]||'Basis')+'<span class="aq-phone-kit__chev aq-phone-kit__chev--plus" aria-hidden="true"></span></button>'
   +'<dl class="aq-rule-figures__dl" data-pk-body><dt>'+e(C[2]||'Basis')+'</dt><dd class="aq-rule-figures__m">'+tx(r.m||'')+golink(r)+'</dd></dl>':'')};
 var cards=R.map(function(r,i){if(i===li)return '';var f=figFor(r,used);if(f)used[f]=1;
  return fli('<li class="aq-rule-figures__card'+(f&&FIG[f]?'':' is-nofig')+'" data-pk-item="'+i+'">',b,i)
  +(f&&FIG[f]?'<div class="aq-rule-figures__figbox">'+fig(f)+'</div>':'')
  +'<p class="aq-rule-figures__head"><span class="aq-rule-figures__n" aria-hidden="true">'+num(i)+'</span><span class="aq-rule-figures__p">'+tx(r.p)+'</span></p>'
  +(r.rule?'<p class="aq-rule-figures__rule">'+tx(r.rule)+'</p>':'')+pdl(r)+'</li>'}).join('');
 var list='<ol class="aq-rule-figures__grid" role="list" data-pk-picker="accordion" data-pk-open="-1">'+cards+'</ol>';
 var cap=b.caption?'<p class="aq-rule-figures__cap" aria-hidden="true">'+tx(b.caption)+' · '+R.length+' '+e(b.fold_noun||'rules')+'</p>':'';
 return sec(H+'<div class="aq-rule-figures">'+cap+band+wFold(b,R.length,list,b.fold_noun||'rules')+'</div>','aq-rule-figures-sec')};
})();
