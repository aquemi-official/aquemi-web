/* Look "cost-balance" -> CostBalance (design-system/components/CostBalance): what it costs to run, drawn as a balance
   around the system, the way a process engineer draws a mass balance. A dashed system boundary stands in the middle
   with the treatment train inside it as a row of flat line glyphs on one water line; every running cost is a stream
   crossing the boundary: the items that go in (plan, membranes, media, energy, chemicals) arrive from the left on
   ruled wires with an arrowhead at the boundary, the item that leaves (water to drain) runs out to the right as water.
   Each stream carries the item, its interval or amount in mono, and what sets it.
   Fields as a spec block: h, cols, rows [{p, v, m, link, side}], fold, fold_noun, note. side: "out" puts a row on the
   leaving side (default: in). glyphs (optional): icon names for the train inside the boundary (default softener,
   carbon-filter, ro-membrane, edi, uv, tank). A row's link makes its name the link. Desktop shows every stream; the
   fold applies on phones, where the balance runs top to bottom: streams in, the boundary, streams out. 
   Phones (pass 12): with one glyph per incoming stream (buying) each stream carries its glyph at the left on one
   water pipe that runs down into the leaving row ("pipe"); otherwise (first-system) the boundary becomes a 56 px
   sticky mini-skid (PhoneKit sticky figure) that lights the glyphs the stream in view names (a stream naming the
   package lights them all, any other lights the boundary; the leaving stream lights the water out) and shows its
   number ("strip"). A note that opens with a short label and a colon ("First year, all in: ...") becomes a navy total
   card on phones. Rows with a link are one 44 px target on phones. */

(function(){var K='aq-cost-balance';
/* which glyphs a stream lights in the phone strip: the parts its name or basis names (a look rule, no copy) */
var GW={'softener':/\b(salt|resin|soften)/i,'carbon-filter':/\b(filter|carbon)/i,'ro-membrane':/\b(membrane|RO)\b|membranes/i,'edi':/\b(resin|EDI)\b/i,'uv':/\bUV\b|\blamp/i,'tank':/\b(tank|storage)\b/i};
function lit(r,G){var t=(r.p||'')+' '+(r.m||'');if(/\bpackage\b/i.test(r.p||''))return G.slice();return G.filter(function(g){return GW[g]&&GW[g].test(t)})}
LOOKS['cost-balance']=function(b,H){var R=b.rows||[],C=b.cols||[];
 var G=(b.glyphs||['softener','carbon-filter','ro-membrane','edi','uv','tank']).filter(isIcon);
 var nIn=R.filter(function(r){return !(r&&r.side==='out')}).length,pipe=G.length>0&&nIn===G.length,gi=0;
 var setBy=C[2]||'',item=function(r,i,side){var nm=r.link&&wp(r.link)?wlink(r.link,r.p):tx(r.p),key=String(i+1);
  var rg=pipe&&side==='in'&&G[gi]?'<span class="'+K+'__rg" aria-hidden="true">'+wIcon(G[gi++],K+'__ic')+'</span>':'';
  return fli('<li class="'+K+'__s '+K+'__s--'+side+(r.link&&wp(r.link)?' is-link':'')+'" data-pk-row="'+key+'">'+rg+'<span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'
   +'<div class="'+K+'__txt"><h3 class="'+K+'__p">'+nm+'</h3><p class="'+K+'__v">'+tx(r.v)+'</p>'
   +(r.m?'<p class="'+K+'__m">'+(setBy?'<span class="'+K+'__mk">'+tx(setBy)+'</span> ':'')+tx(r.m)+'</p>':'')+'</div>'
   +'<span class="'+K+'__wire" aria-hidden="true"><span class="'+K+'__line"></span><span class="'+K+'__head"></span></span></li>',b,i)};
 var ins='',outs='',keys={},inK=[],outK=[];
 R.forEach(function(r,i){if(!r)return;var k=String(i+1);if(r.side==='out'){outs+=item(r,i,'out');outK.push(k)}else{ins+=item(r,i,'in');inK.push(k);
  lit(r,G).forEach(function(g){(keys[g]=keys[g]||[]).push(k)});if(!lit(r,G).length)(keys._edge=keys._edge||[]).push(k)}});
 var pk=function(a){return a&&a.length?' data-pk-key="'+a.join(' ')+'"':''};
 var train='<div class="'+K+'__sys" aria-hidden="true"'+(pipe?'':' data-pk-fig')+'><span class="'+K+'__arr is-in"'+pk(inK)+'></span><span class="'+K+'__edge"'+pk(keys._edge)+'></span><div class="'+K+'__train"><span class="'+K+'__water"'+pk(outK)+'></span>'
  +G.map(function(g){return '<span class="'+K+'__g"'+pk(keys[g])+'>'+wIcon(g,K+'__ic')+'</span>'}).join('')+'</div><span class="'+K+'__arr is-out"'+pk(outK)+'></span>'
  +'<span class="'+K+'__now"><span class="'+K+'__nowk">'+e(C[0]||'Line')+'</span> <b class="'+K+'__nown">01</b><span class="'+K+'__nowt"> / '+(R.length<10?'0':'')+R.length+'</span></span></div>';
 var inner='<div class="'+K+(pipe?' is-pipe':' is-strip')+'"'+(pipe?'':' data-pk-sticky data-pk-h="96"')+'><ol class="'+K+'__in" role="list">'+ins+'</ol>'+train+'<ol class="'+K+'__out" role="list">'+outs+'</ol></div>';
 /* "Label: rest" with a short label: the label is the total card's head on phones (same words on desktop) */
 var nm=b.note&&/^([^:.;]{3,40}):\s/.exec(b.note),note=!b.note?'':nm&&nm[1].split(/\s+/).length<=6
  ?'<p class="'+K+'__note is-total"><span class="'+K+'__tl">'+tx(nm[1])+'<span class="'+K+'__colon">:</span></span> <span class="'+K+'__tr">'+tx(b.note.slice(nm[0].length))+'</span></p>'
  :'<p class="'+K+'__note">'+tx(b.note)+'</p>';
 return sec(H+wFold(b,R.length,inner,b.fold_noun||'items')+note,K+'-sec')};
/* the strip's number follows the stream in view (state, not motion: works with motion off) */
document.addEventListener('pk:change',function(ev){var w=ev.target;if(!w.classList||!w.classList.contains(K))return;var n=w.querySelector('.'+K+'__nown');
 if(n&&ev.detail&&ev.detail.key){var k=+ev.detail.key;n.textContent=(k<10?'0':'')+k}});
})();
