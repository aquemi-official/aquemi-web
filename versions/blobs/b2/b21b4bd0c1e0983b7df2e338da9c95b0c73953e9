/* Look "issued-set" -> IssuedSet (design-system/components/IssuedSet): the documents you receive as the issued set
   itself, dealt onto a desk. Each document is a sheet of paper (light in both themes) set at a slight angle: its
   document code large in the header with its sheet number, a miniature of what the document looks like (a compliance
   matrix, a P&ID, a specification with its setpoints, a review report tracing lines to tests), its name and what it
   is, and, where the document names the qualification step that uses it, that step struck on as a round stamp.
   Fields (a docs block): h, intro, items [{t, d, code, link, intent, sheet, use}], link, link_label, intent.
   sheet (optional): matrix, pid, spec or report (default from the name). use (optional): the qualification step the
   item's own text names as using it ("IQ"), shown as the stamp. Codes come from the DocList lookup (docCode).
   Mid widths: two sheets a row. Phones (pass 12, S11): the set is a snap deck on the desk, each sheet 78 % wide with
   the next one peeking, turn and stamp kept; dots under the deck jump between sheets (AQsnap, parts/Snap.js). */
LOOKS['issued-set']=(function(){
 function P(d,c){return '<path class="aq-issued-set'+'__'+(c||'ln')+'" d="'+d+'"/>'}
 function lines(x,y,n,step,w){var o='';for(var i=0;i<n;i++)o+=P('M'+x+' '+(y+i*step)+'H'+(x+w-((i*37)%(w*0.45))),'txt');return o}
 var MINI={
  matrix:function(){var o='',r;for(r=0;r<7;r++)o+=P('M10 '+(14+r*18)+'H230','grid');o+=P('M10 14V122M92 14V122M176 14V122M230 14V122','grid');
   for(r=0;r<6;r++){o+=P('M18 '+(25+r*18)+'H'+(48+(r*13)%30),'txt')+P('M100 '+(25+r*18)+'H'+(130+(r*17)%36),'txt');
    o+=r===3?P('M184 '+(25+r*18)+'H'+(220),'flow'):P('M196 '+(24+r*18)+'L201 '+(28+r*18)+'L210 '+(19+r*18),'ln')}return o},
  pid:function(){return P('M10 60H44','flow')+'<circle class="aq-issued-set__ln" cx="56" cy="60" r="12"/>'+P('M50 50L68 60L50 70','thin')+P('M68 60H96','flow')
   +P('M96 54L108 66V54L96 66Z','ln')+P('M108 60H140','flow')+'<rect class="aq-issued-set__ln" x="140" y="30" width="34" height="74"/>'+P('M174 92H214V122H24V100','flow')
   +P('M190 86L200 98V86L190 98Z','ln')+'<circle class="aq-issued-set__ln" cx="80" cy="28" r="9"/>'+P('M80 37V60','thin')+'<circle class="aq-issued-set__ln" cx="196" cy="62" r="9"/>'+P('M196 71V86','thin')},
  spec:function(){var o='';[18,40,62,84,106].forEach(function(y,i){o+=P('M12 '+y+'H'+(118+(i*29)%60),'txt');o+='<rect class="aq-issued-set__box" x="190" y="'+(y-8)+'" width="38" height="16"/>';
   o+=i===1||i===3?P('M196 '+y+'H222','flow'):P('M196 '+y+'H214','thin')});return o},
  report:function(){var o=lines(12,18,4,12,90),L=[52,70,88,106],R=[60,78,96,114];
   L.forEach(function(y){o+=P('M12 '+y+'H58','txt')});R.forEach(function(y){o+=P('M180 '+y+'H228','txt')});
   o+=P('M62 52C120 52 120 60 176 60M62 70C120 70 120 96 176 96M62 88C120 88 120 78 176 78M62 106C120 106 120 114 176 114','flow');
   return o+P('M140 18H228M140 34H200','thin')},
  lines:function(){return lines(12,18,8,14,210)}
 };
 function pick(t){return /compliance matrix|matrix$/i.test(t)&&!/traceab/i.test(t)?'matrix':/p&id|instrumentation diagram|drawing/i.test(t)?'pid':/specification/i.test(t)?'spec':/report|traceab/i.test(t)?'report':'lines'}
 return function(b,H){var items=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=items.length;
  var li=items.map(function(x,i){var t=String(x.t||''),c=x.code||docCode(t)[0],s=MINI[x.sheet]?x.sheet:pick(t),num=(i<9?'0':'')+(i+1);
   var name=x.link&&wp(x.link)?wlink(x.link,t,x.intent):tx(t);
   return fli('<li class="aq-issued-set__sheet'+(x.key?' is-key':'')+(i?'':' is-snap')+'" data-theme="light" style="--i:'+i+'">',b,i)
    +'<div class="aq-issued-set__hd"><span class="aq-issued-set__code" aria-hidden="true">'+e(c)+'</span><span class="aq-issued-set__no" aria-hidden="true">'+num+' / '+(n<10?'0':'')+n+'</span></div>'
    +'<div class="aq-issued-set__fig"><svg class="aq-issued-set__mini" viewBox="0 0 240 136" aria-hidden="true" focusable="false">'+MINI[s]()+'</svg>'
    +(x.use?'<span class="aq-issued-set__use" aria-hidden="true"><span>'+e(x.use)+'</span></span>':'')+'</div>'
    +'<h3 class="aq-issued-set__t">'+name+'</h3>'+(x.d?'<p class="aq-issued-set__d">'+tx(x.d)+'</p>':'')
    +'<span class="aq-issued-set__tb" aria-hidden="true"><span>Aquemi</span><span>'+e(c)+'</span></span>'
    +'</li>'}).join('');
  var more=b.link&&wp(b.link)?'<p class="aq-issued-set__more">'+wBtn(b.link_label||wlabel(b.link),b.link,'link',b.intent)+'</p>':'';
  var dots=n>1?'<div class="aq-issued-set__dots" role="group" aria-label="'+e(String(b.h||'Documents'))+'">'+items.map(function(x,i){return '<button type="button" class="aq-issued-set__dot" data-snap-to="'+i+'"'+(i?'':' aria-current="true"')+' aria-label="'+e(String(x.t||''))+'"></button>'}).join('')+'</div>':'';
  return sec(H+'<div class="aq-issued-set" data-snap-box>'+wFold(b,n,'<ol class="aq-issued-set__desk" data-snap style="--n:'+Math.min(n,4)+'">'+li+'</ol>',b.fold_noun||'documents')+dots+more+'</div>','aq-issued-set-sec')}
})();
