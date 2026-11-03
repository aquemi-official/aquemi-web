/* Look "sheet-previews" -> SheetPreviews (design-system/components/SheetPreviews): a short document list set as a Swiss
   row of sheets. Each document gets a column: a limestone sheet carrying its light index numeral (/01) and a thumbnail
   of the kind of document it is, then its code (only a real one: an explicit code or tag, or one the document lookup
   knows; never initials), name and line. Pass 12 (concept 205, ind-personal-care.records): the numeral moved onto the
   sheet, four new thumbnails for record kinds (trend, log, binder, signoff), no filler tile; phones list the sheets one
   per row, the sheet beside its text. The number lives on the sheet only; the eyebrow shows only for a real code, and
   (pass 12 C) only where the sheet's own stamp is hidden (phones); elsewhere it stays for screen readers only, so the
   code is not printed twice.
   Deciding documents (key) keep DocList's rule: their code turns flow.
   The block link ("Full index") sits at the end of the heading row.
   Fields (a docs block): h, items [{t, d, code, key, link, intent, tag, sheet}], key, fold, fold_noun, link, link_label,
   intent. New optional per item: sheet: "trend" (a reading under its dashed limit lines) | "log" (a ruled log with
   ticks) | "binder" (a ring binder by its protocol sheets) | "signoff" (an acceptance sheet with its signed box) |
   "basis" | "curves" | "logic" | "certificate" (anything else: ruled text). */
(function(){
var K='aq-sheet-previews';
function f1(n){return Math.round(n*10)/10}
function bars(y0,n,w,gap){var d='';for(var i=0;i<n;i++)d+='M24 '+(y0+i*gap)+'H'+(24+w*(i%3===2?0.6:1));return '<path class="'+K+'__txt" d="'+d+'"/>'}
var THUMB={
 trend:function(){var o='<path class="'+K+'__ln" d="M30 96V226H186"/>',d='',ys=[200,192,198,184,190,176,186,180,168,178,172,182,170,176];
  for(var i=0;i<ys.length;i++)d+=(i?'L':'M')+f1(34+i*11.4)+' '+ys[i];
  o+='<path class="'+K+'__limit" d="M30 132H186"/><path class="'+K+'__limit '+K+'__limit--b" d="M30 150H186"/><path class="'+K+'__curve" d="'+d+'"/>';
  for(var k=1;k<6;k++)o+='<path class="'+K+'__thin" d="M'+(30+k*26)+' 226v4"/>';
  return o},
 log:function(){var o='<rect class="'+K+'__box" x="24" y="96" width="162" height="138"/>',g='M24 116H186',t='',ck='',i;
  for(i=1;i<6;i++)g+='M24 '+(116+i*20)+'H186';g+='M70 96V234M130 96V234M160 96V234';o+='<path class="'+K+'__ln" d="'+g+'"/>';
  for(i=0;i<5;i++){var y=126+i*20;t+='M32 '+y+'H'+(58-(i%2)*8)+'M78 '+y+'H'+(118-(i%3)*10);ck+='M165 '+(y-1)+'l4 4l8 -8'}
  return o+'<path class="'+K+'__txt" d="'+t+'"/><path class="'+K+'__tick" d="'+ck+'"/>'},
 binder:function(){var o='<rect class="'+K+'__box" x="92" y="100" width="88" height="118"/><rect class="'+K+'__box" x="84" y="108" width="88" height="118"/>';
  o+='<path class="'+K+'__txt" d="M96 128H160M96 140H150M96 152H160M96 176H140"/>';
  o+='<rect class="'+K+'__spine" x="30" y="92" width="44" height="146"/><rect class="'+K+'__box" x="38" y="108" width="28" height="44"/>';
  o+='<circle class="'+K+'__thin" cx="52" cy="196" r="5"/><circle class="'+K+'__thin" cx="52" cy="214" r="5"/>';
  return o},
 signoff:function(){var o='<path class="'+K+'__txt" d="M24 104H186M24 116H170M24 128H186M24 140H130"/>';
  o+='<rect class="'+K+'__box" x="24" y="164" width="162" height="62"/><path class="'+K+'__thin" d="M36 210H130"/>';
  o+='<path class="'+K+'__sig" d="M44 204C52 180 58 214 66 196S80 186 84 202S100 190 108 198"/><path class="'+K+'__tick" d="M150 186l8 8l16 -16"/>';
  return o},
 basis:function(){var o='',x0=24,x1=186,y0=86,y1=226,cw=(x1-x0)/12,i;
  o+='<path class="'+K+'__hatch" d="'+[0,11].map(function(c){var d='',xa=x0+c*cw;for(var y=y0;y<y1;y+=6)d+='M'+f1(xa)+' '+(y+6)+'L'+f1(xa+cw)+' '+y;return d}).join('')+'"/>';
  var g='M'+x0+' '+y0+'H'+x1+'V'+y1+'H'+x0+'Z';for(i=1;i<12;i++)g+='M'+f1(x0+i*cw)+' '+y0+'V'+y1;for(i=1;i<7;i++)g+='M'+x0+' '+(y0+i*20)+'H'+x1;
  o+='<path class="'+K+'__ln" d="'+g+'"/>';
  'JFMAMJJASOND'.split('').forEach(function(m,j){o+='<text class="'+K+'__tiny" x="'+f1(x0+j*cw+cw/2)+'" y="'+(y0-6)+'">'+m+'</text>'});
  return o},
 curves:function(){var o='<path class="'+K+'__ln" d="M30 70V226H186"/>',d1='',d2='';
  for(var i=0;i<=20;i++){var x=30+i*7.8,t=i/20;d1+=(i?'L':'M')+f1(x)+' '+f1(210-120*Math.pow(t,0.7));d2+=(i?'L':'M')+f1(x)+' '+f1(214-80*Math.pow(t,0.8))}
  o+='<path class="'+K+'__curve" d="'+d1+'"/><path class="'+K+'__curve '+K+'__curve--b" d="'+d2+'"/>';
  for(var k=1;k<5;k++)o+='<path class="'+K+'__thin" d="M'+(30+k*31)+' 226v4M26 '+(226-k*31)+'h4"/>';
  return o},
 logic:function(){var o='',b=function(x,y,w,h,r){return '<rect class="'+K+'__box" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(r||0)+'"/>'};
  o+=b(80,72,50,18,9)+b(70,108,70,20)+'<path class="'+K+'__box" d="M105 146L135 164L105 182L75 164Z"/>'+b(24,200,64,20)+b(122,200,64,20);
  o+='<path class="'+K+'__ln" d="M105 90V108M105 128V146M75 164H56V200M135 164H154V200M56 220V236H105V250M154 220V236H105M186 210H196V118H140"/>';
  return o},
 certificate:function(){var o='<rect class="'+K+'__box" x="20" y="64" width="170" height="170"/><rect class="'+K+'__thin" x="26" y="70" width="158" height="158"/>';
  o+='<path class="'+K+'__txt" d="M50 92H160M64 104H146M40 128H170M40 140H170M40 152H130"/>';
  var s='';for(var i=0;i<16;i++){var a=i*Math.PI/8,r=i%2?17:22;s+=(i?'L':'M')+f1(150+r*Math.cos(a))+' '+f1(196+r*Math.sin(a))}
  o+='<path class="'+K+'__seal" d="'+s+'Z"/><circle class="'+K+'__thin" cx="150" cy="196" r="11"/>';
  var bc='';for(var j=0;j<26;j++)bc+='M'+(40+j*3+(j%4===0?1:0))+' 186v'+(j%5===0?24:20);
  return o+'<path class="'+K+'__bar" d="'+bc+'"/>'}};
function sheet(kind,code,num){var cw=Math.max(40,String(code||'').length*8+14),o='<rect class="'+K+'__paper" x="0" y="0" width="210" height="280"/>'
  +'<path class="'+K+'__fold" d="M180 0H210V30Z"/><path class="'+K+'__ln" d="M180 0V30H210"/>'
  +'<text class="'+K+'__nume" x="16" y="62">/'+num+'</text>'
  +(code?'<rect class="'+K+'__codebox" x="'+(170-cw)+'" y="40" width="'+cw+'" height="22"/><text class="'+K+'__code-t" x="'+f1(170-cw/2)+'" y="55">'+e(code)+'</text>':'');
 o+=THUMB[kind]?THUMB[kind]():bars(96,12,160,11);
 o+='<path class="'+K+'__thin" d="M24 252H186M120 252V268M150 252V268"/>';
 return '<svg class="'+K+'__svg" viewBox="0 0 210 280" aria-hidden="true" focusable="false">'+o+'</svg>'}
LOOKS['sheet-previews']=function(b,H){
 var items=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=items.length;
 var marked=items.some(function(x){return x.key}),nk=b.key!=null?+b.key:0;
 var li=items.map(function(x,i){var c=x.code?[x.code,true]:docCode(x.t),key=marked?!!x.key:i<nk,tag=x.tag||(c[1]?c[0]:'');if(tag&&!/[A-Za-z0-9]/.test(tag))tag='';
  var name=x.link&&wp(x.link)?wlink(x.link,x.t,x.intent):tx(x.t);
  return fli('<li class="'+K+'__item'+(key?' is-key':'')+'" style="--i:'+i+'">',b,i)
   +'<div class="'+K+'__sheet" data-theme="light">'+sheet(x.sheet,tag,(i<9?'0':'')+(i+1))+'</div>'
   +'<div class="'+K+'__body">'+(tag?'<p class="'+K+'__code is-stamped"><span>'+e(tag)+'</span></p>':'')+'<h3 class="'+K+'__t">'+name+'</h3>'+(x.d?'<p class="'+K+'__d">'+tx(x.d)+'</p>':'')+'</div></li>'}).join('');
 var more=b.link&&wp(b.link)?'<p class="'+K+'__more">'+wBtn(b.link_label||wlabel(b.link),b.link,'link',b.intent)+'</p>':'';
 return sec('<div class="'+K+'__top">'+H+more+'</div>'+wFold(b,n,'<ol class="'+K+'" role="list" style="--n:'+n+'">'+li+'</ol>',b.fold_noun||'documents'),K+'-sec')};
})();
