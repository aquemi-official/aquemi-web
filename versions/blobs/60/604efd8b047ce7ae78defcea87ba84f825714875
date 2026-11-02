/* Look "revision-sheet" -> RevisionSheet (design-system/components/RevisionSheet): how a document reaches your file, told
   on one document. A single paper sheet stays pinned beside the steps while they scroll; as each step reaches the middle
   of the screen the sheet takes that step's marks, cumulatively: numbered review comments in the margin and a draft tag (draft and
   review), the comments answered, the draft tag struck and the revision triangle raised (revision), a signature in the first box (a hold
   step's signer), recorded data and a second signature (the next hold step), the register tick and current-revision
   line (turnover). Its revision block fills one row per step. Pointing at a step shows the sheet at that step.
   Without script, and at the end, the sheet shows every mark.
   Fields (a steps block): h, intro, items [{t, d, hold}]. A step's marks follow its place in the order; hold names who
   signs and labels the sheet's signature boxes (first hold: the left box, second: the right).
   Pass 9b (concept research/pass9b/concepts/cmp-documentation.2.png, its numbered rhythm): steps lead at the left, the
   sheet stands at the right (style.css).
   Phones: the sheet sits over the steps and plays its marks through once. */
LOOKS['revision-sheet']=(function(){
 function P(d,c){return '<path class="aq-revision-sheet'+'__'+(c||'ln')+'" d="'+d+'"/>'}
 function T(x,y,s,c,a){return '<text class="aq-revision-sheet__lbl'+(c?' aq-revision-sheet__lbl--'+c:'')+'" x="'+x+'" y="'+y+'"'+(a?' text-anchor="'+a+'"':'')+'>'+e(s)+'</text>'}
 var SIG=['M8 22C16 6 22 4 20 16S28 26 36 12 46 4 48 16 58 24 66 10 76 8 82 18','M6 20C12 8 18 6 18 16S24 24 32 12 40 6 42 16 52 22 60 12'];
 function sheet(I){var holds=I.map(function(x,i){return x.hold?i:-1}).filter(function(i){return i>=0}),o='',y,i,n=I.length;
  var who=function(k){var it=I[holds[k]];return it?String(it.hold):''};
  o+='<rect class="aq-revision-sheet__paper" x="1" y="1" width="398" height="518"/>';
  /* header: title block */
  o+='<rect class="aq-revision-sheet__frame" x="20" y="20" width="360" height="44"/>'+P('M108 20V64M300 20V64','frame')
   +'<rect class="aq-revision-sheet__bar" x="32" y="34" width="62" height="16"/>'+P('M120 36H250M120 48H210','txt')+P('M312 36H368','txt');
  /* body text */
  var W=[300,328,262,316,290,336,248,310,284,322,200];
  for(i=0;i<W.length;i++){y=92+i*15;o+=P('M32 '+y+'H'+(32+W[i]),'txt')}
  /* data grid */
  o+='<g class="aq-revision-sheet__grid">';for(i=0;i<5;i++)o+=P('M32 '+(268+i*18)+'H368','frame');for(i=0;i<5;i++)o+=P('M'+(32+i*84)+' 268V340','frame');o+='</g>';
  /* signature boxes */
  o+='<rect class="aq-revision-sheet__frame" x="32" y="362" width="164" height="54"/><rect class="aq-revision-sheet__frame" x="204" y="362" width="164" height="54"/>'
   +T(40,376,who(0)||'')+T(212,376,who(1)||'');
  /* revision block */
  o+='<rect class="aq-revision-sheet__frame" x="204" y="432" width="176" height="'+(n*13+8)+'"/>';
  /* step layers */
  var L=function(k,inner){return '<g class="aq-revision-sheet__ly aq-revision-sheet__ly'+k+'">'+inner+'</g>'};
  var rev=function(k){var yy=444+k*13;return P('M212 '+(yy-3)+'H222','txt')+P('M232 '+(yy-3)+'H'+(300+(k*23)%50),'txt')+P('M356 '+(yy-6)+'l3 4l7 -8','tick')};
  var marks=[
   /* draft and review: highlighted passages, numbered comments in the margin, a draft tag */
   function(){var s='';[[107,120,180],[167,60,210],[227,140,150]].forEach(function(c,j){s+='<rect class="aq-revision-sheet__hl" x="'+c[1]+'" y="'+(c[0]-6)+'" width="'+c[2]+'" height="10"/>'
     +P('M'+(c[1]+c[2])+' '+(c[0]-1)+'H364','lead')+'<circle class="aq-revision-sheet__cm" cx="374" cy="'+(c[0]-1)+'" r="8"/>'+T(374,c[0]+3,String(j+1),'cm','middle')});
    return s+'<g class="aq-revision-sheet__dtag"><rect x="282" y="74" width="86" height="22" transform="rotate(-6 325 85)"/>'+T(325,90,I[0]?String(I[0].t).split(/\s+/)[0]:'','tag','middle')+'</g>'},
   /* revision: comments answered, revision triangle raised */
   function(){var s='';[106,166,226].forEach(function(cy){s+='<circle class="aq-revision-sheet__cma" cx="374" cy="'+cy+'" r="8.75"/>'+P('M370 '+cy+'l3 3l6 -7','ticka')});return s+P('M278 92L372 78','strike')+'<path class="aq-revision-sheet__tri" d="M340 30l10 18h-20z"/>'},
   /* first hold: signature */
   function(){return P(SIG[0],'sig" transform="translate(52 384)')},
   /* second hold: data recorded and a second signature */
   function(){var s='';for(var r=0;r<4;r++)for(var c=0;c<4;c++)s+=P('M'+(40+c*84)+' '+(281+r*18)+'H'+(68+c*84+((r*31+c*17)%36)),'data');return s+P(SIG[1],'sig" transform="translate(228 386)')+P(SIG[0],'sig" transform="translate(288 388) scale(.7)')},
   /* turnover: current revision, register tick */
   function(){return '<rect class="aq-revision-sheet__cur" x="206" y="'+(434+(n-1)*13)+'" width="172" height="13"/><g class="aq-revision-sheet__done"><circle cx="76" cy="470" r="30"/>'+P('M62 470l10 10l20 -22','tickw')+'</g>'}];
  for(i=0;i<n;i++)o+=L(i+1,(marks[i]?marks[i]():'')+rev(i));
  return '<svg class="aq-revision-sheet__svg" viewBox="0 0 400 520" aria-hidden="true" focusable="false">'+o+'</svg>'}
 return function(b,H){var I=b.items||[],n=I.length,all='';for(var k=1;k<=n;k++)all+=' is-s'+k;
  var steps=I.map(function(it,i){var who=it.hold?String(it.hold):'';
   return '<li class="aq-revision-sheet__step" data-s="'+(i+1)+'"><span class="aq-revision-sheet__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
    +'<div class="aq-revision-sheet__body"><h3 class="aq-revision-sheet__t">'+(it.link&&wp(it.link)?wlink(it.link,it.t):tx(it.t))+'</h3>'+(it.d?'<p class="aq-revision-sheet__d">'+tx(it.d)+'</p>':'')
    +(who?'<p class="aq-revision-sheet__hold"><span class="aq-revision-sheet__hk">Hold</span> <span>Signed by '+tx(/^[A-Z][a-z]/.test(who)?who.charAt(0).toLowerCase()+who.slice(1):who)+'</span></p>':'')+'</div></li>'}).join('');
  return sec(H+'<div class="aq-revision-sheet" data-n="'+n+'"><div class="aq-revision-sheet__fig"><div class="aq-revision-sheet__paperwrap'+all+'" data-theme="light">'+sheet(I)+'</div></div>'
   +'<ol class="aq-revision-sheet__steps" role="list">'+steps+'</ol></div>','aq-revision-sheet-sec')}})();
/* The sheet follows the step nearest the middle of the screen (desktop) or the step pointed at; without script it
   shows every step's marks. */
function rsSet(w,s){var p=w.querySelector('.aq-revision-sheet__paperwrap'),n=+w.getAttribute('data-n')||0;if(!p||w._rsOn===s)return;w._rsOn=s;
 for(var k=1;k<=n;k++)p.classList.toggle('is-s'+k,k<=s);
 [].forEach.call(w.querySelectorAll('.aq-revision-sheet__step'),function(li){var d=+li.getAttribute('data-s');li.classList.toggle('is-on',d===s);li.classList.toggle('is-past',d<s)})}
function rsScan(){var mid=innerHeight*0.5;[].forEach.call(document.querySelectorAll('.aq-revision-sheet'),function(w){
 if(w._rsHover||w._rsAuto)return;if(innerWidth<860){rsSet(w,+w.getAttribute('data-n'));return}
 var L=w.querySelectorAll('.aq-revision-sheet__step'),s=0;[].forEach.call(L,function(li){if(li.getBoundingClientRect().top<mid)s=+li.getAttribute('data-s')});
 var r=w.getBoundingClientRect();if(r.bottom<mid)s=L.length;rsSet(w,Math.max(1,s))})}
if(typeof document!=='undefined'&&document.addEventListener){var rsQ=0;
 var rsTick=function(){if(rsQ)return;rsQ=1;requestAnimationFrame(function(){rsQ=0;rsScan()})};
 addEventListener('scroll',rsTick,{passive:true});addEventListener('resize',rsTick);
 document.addEventListener('mouseover',function(ev){var li=ev.target.closest&&ev.target.closest('.aq-revision-sheet__step');if(!li)return;var w=li.closest('.aq-revision-sheet');w._rsHover=1;rsSet(w,+li.getAttribute('data-s'))});
 document.addEventListener('mouseout',function(ev){var li=ev.target.closest&&ev.target.closest('.aq-revision-sheet__step');if(!li||(ev.relatedTarget&&li.contains(ev.relatedTarget)))return;var w=li.closest('.aq-revision-sheet');w._rsHover=0;rsTick()});
 if(typeof MutationObserver!=='undefined')new MutationObserver(rsTick).observe(document.documentElement,{childList:true,subtree:true});
 window.AQrevsheet={set:rsSet,scan:rsScan}}
