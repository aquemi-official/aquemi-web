/* Look "grade-crosswalk" -> GradeCrosswalk (design-system/components/GradeCrosswalk): a grades table that sets water
   types against two families of standards (water, how it differs, standard column A, standard column B), drawn as a
   crosswalk (pass 12 concept 208). The water types run down the middle as navy blocks (index, name, how it differs);
   column A's standards stand as chips on the left, column B's on the right, one chip per standard however many rows
   cite it, each placed level with the rows it serves; hairline wires run from every chip to every block that cites it,
   so a standard serving two waters branches to both and a water no standard on that side names has no wire there.
   Each chip splits the standard's name (sans) from its edition (mono): "ANSI/AAMI ST108" | ":2023". A segment after
   ";" that starts in lower case ("values from D1193-06") is a note on the citation before it: it rides in the block in
   mono, never as a chip. Pointing at a block lights its wires and chips; pointing at a chip lights every block it
   serves. Every block also carries its citations as text (visually hidden on desktop), so nothing depends on wires.
   Fields (a table block): h, intro, cols [water, how, standards A, standards B], rows [[water, how, citesA, citesB]]
   (cites split on ";"; an empty cell means none on that side).
   Desktop (round C): rows take their own heights; the chips and wires are laid from the measured row centres (on
   render and on every resize), so a short water no longer carries the tallest row's empty navy.
   Phones (round C): the crosswalk becomes a filter. A strip of the standards' chips (the code of each: Z314, ST108,
   D1193, GP40) is a PhoneKit chips picker; its card names the side and the full citation, and the open chip lights the
   waters it asks for (navy) while the rest step back to paper (ink, still AA). Each water's citations fold into one
   chip line in its block (standard and edition, "also 02 · 06", the note); no wires. */
function gcSeg(c){var out=[];String(c&&typeof c==='object'?c.t:c||'').split(/\s*;\s*/).forEach(function(s){s=s.trim();if(!s)return;
  if(/^[a-z]/.test(s)&&out.length){out[out.length-1].note=s;return}
  var m=s.match(/^(.*?)((?::\d{2,4})|(?:-\d{2})|(?:\s+\d+(?:st|nd|rd|th)\s+ed\.?))$/);
  out.push({k:s,n:m?m[1]:s,ed:m?m[2]:''})});return out}
function gcChip(c,K){var m=c.ed.match(/^([:\-]|\s+)(.*)$/),sep=m?m[1]:'',ed=m?m[2]:c.ed;
 return '<span class="'+K+'__std">'+tx(c.n)+'</span>'+(c.ed?'<span class="'+K+'__ed">'+(sep.trim()?'<span class="'+K+'__sep">'+e(sep)+'</span>':' ')+tx(ed)+'</span>':'')}
LOOKS['grade-crosswalk']=function(b,H){var K='aq-grade-crosswalk',C=b.cols||[],R=b.rows||[],N=R.length;if(N<1||C.length<4)return BLOCKS.table(b,H);
 var cites=R.map(function(r){return [gcSeg(r[2]),gcSeg(r[3])]});
 /* one node per standard per side, placed at the mean of its rows' centres, then pushed apart (min gap 0.55 row) */
 var sides=[0,1].map(function(s){var all={},order=[];cites.forEach(function(c,i){c[s].forEach(function(x){if(!all[x.k]){all[x.k]={c:x,rows:[]};order.push(x.k)}all[x.k].rows.push(i)})});
  var nodes=order.map(function(k){var o=all[k],m=0;o.rows.forEach(function(i){m+=(i+0.5)/N});o.p=m/o.rows.length;return o});
  nodes.sort(function(a,c){return a.p-c.p});var g=0.55/N;
  for(var i=1;i<nodes.length;i++)if(nodes[i].p-nodes[i-1].p<g)nodes[i].p=nodes[i-1].p+g;
  var over=nodes.length?nodes[nodes.length-1].p-(1-g/2):0;if(over>0)nodes.forEach(function(o){o.p=Math.max(g/2,o.p-over)});
  return nodes});
 var Y=1000;
 function wires(s){var d='';sides[s].forEach(function(o,j){var ny=(o.p*Y).toFixed(1);o.rows.forEach(function(i){var ry=((i+0.5)/N*Y).toFixed(1);
   var p=s===0?'M0 '+ny+'C55 '+ny+' 45 '+ry+' 100 '+ry:'M0 '+ry+'C55 '+ry+' 45 '+ny+' 100 '+ny;
   d+='<path class="'+K+'__wire" data-gc="'+i+'" data-gcn="'+s+j+'" d="'+p+'"/>'})});
  return '<svg class="'+K+'__wires '+K+'__wires--'+(s?'b':'a')+'" viewBox="0 0 100 '+Y+'" preserveAspectRatio="none" aria-hidden="true" focusable="false">'+d+'</svg>'}
 function rail(s){var chips=sides[s].map(function(o,j){return '<li class="'+K+'__node" data-gcn="'+s+j+'" data-rows="'+o.rows.join(' ')+'" style="--p:'+o.p.toFixed(4)+'">'+gcChip(o.c,K)+'</li>'}).join('');
  return '<div class="'+K+'__rail '+K+'__rail--'+(s?'b':'a')+'" aria-hidden="true"><ol class="'+K+'__nodes">'+chips+'</ol></div>'}
 /* phones: each citation row names the other blocks that cite the same standard ("also 02 · 06"), so the crosswalk
    idea survives without wires */
 function also(s,k,i){var o=null;sides[s].forEach(function(n){if(n.c.k===k)o=n});var r=o?o.rows.filter(function(j){return j!==i}):[];
  return r.length?'<span class="'+K+'__also" aria-hidden="true">also '+r.map(function(j){return (j<9?'0':'')+(j+1)}).join(' · ')+'</span>':''}
 var rows=R.map(function(r,i){var notes=[],refs=[0,1].map(function(s){var L=cites[i][s];if(!L.length)return '';
   L.forEach(function(x){if(x.note)notes.push(x.note)});
   return L.map(function(x,j){return '<li class="'+K+'__ref'+(j?'':' is-first')+'">'+(j?'':'<span class="'+K+'__side">'+tx(C[2+s])+'</span>')+'<span class="'+K+'__cite">'+gcChip(x,K)+'</span>'+(x.note?'<span class="'+K+'__rnote">'+tx(x.note)+'</span>':'')+also(s,x.k,i)+'</li>'}).join('')}).join('');
  return '<li class="'+K+'__row" data-gc="'+i+'"><div class="'+K+'__block">'+idx(i)+'<h3 class="'+K+'__t">'+tcell(r[0])+'</h3><p class="'+K+'__how">'+tcell(r[1])+'</p>'
   +(notes.length?'<p class="'+K+'__note" aria-hidden="true">'+notes.map(tx).join(' · ')+'</p>':'')+'</div>'
   +(refs?'<ul class="'+K+'__refs" role="list">'+refs+'</ul>':'')+'</li>'}).join('');
 var heads='<div class="'+K+'__head '+K+'__head--a" aria-hidden="true">'+tx(C[2])+'</div><div class="'+K+'__head '+K+'__head--m" aria-hidden="true"><span>'+tx(C[0])+'</span><span>'+tx(C[1])+'</span></div><div class="'+K+'__head '+K+'__head--b" aria-hidden="true">'+tx(C[3])+'</div>';
 /* phones: the standards as a chips picker (rail order: side A then side B); the open chip lights its waters */
 var pick=[0,1].map(function(s){return sides[s].map(function(o){var code=String(o.c.n).split(/[\s\/]+/).pop(),ws=o.rows.map(function(i){return (i<9?'0':'')+(i+1)+' '+String(R[i][0]&&R[i][0].t||R[i][0]||'')}).join(' · ');
  return '<li class="'+K+'__pi" data-pk-item="'+e(code.toLowerCase())+'" data-rows="'+o.rows.join(' ')+'"><button type="button" class="'+K+'__chip" data-pk-head>'+tx(code)+'</button>'
   +'<div class="'+K+'__card" data-pk-body><span class="'+K+'__cside">'+tx(C[2+s])+'</span><span class="'+K+'__cstd">'+gcChip(o.c,K)+'</span><span class="'+K+'__cw">'+e(ws)+'</span></div></li>'}).join('')}).join('');
 var picker='<ol class="'+K+'__pick" data-pk-picker="chips" data-pk-open="0" data-pk-bp="860" role="list">'+pick+'</ol>';
 var inner='<div class="'+K+'" style="--n:'+N+'">'+heads+picker+rail(0)+wires(0)+'<ol class="'+K+'__rows" role="list">'+rows+'</ol>'+wires(1)+rail(1)+'</div>';
 return sec(H+inner,K+'-sec')};
(function(){var K='aq-grade-crosswalk',Y=1000;
 /* desktop: chips and wires from the measured row centres (rows take their own heights) */
 function lay(root){var rows=root.querySelector('.'+K+'__rows'),rail=root.querySelector('.'+K+'__rail');if(!rows||!rail||getComputedStyle(rail).display==='none')return;
  var rb=rows.getBoundingClientRect(),H=rb.height;if(!(H>0))return;
  var c=[].map.call(root.querySelectorAll('.'+K+'__row'),function(r){var b=r.getBoundingClientRect();return (b.top+b.height/2-rb.top)/H});
  ['a','b'].forEach(function(sd){var L=[].map.call(root.querySelectorAll('.'+K+'__rail--'+sd+' .'+K+'__node'),function(n){var rs=n.getAttribute('data-rows').split(' ').map(Number),m=0;
    rs.forEach(function(i){m+=c[i]||0});return {n:n,p:m/rs.length,h:n.offsetHeight/H}});
   L.sort(function(a,b){return a.p-b.p});
   for(var i=1;i<L.length;i++){var g=(L[i-1].h+L[i].h)/2+12/H;if(L[i].p-L[i-1].p<g)L[i].p=L[i-1].p+g}
   var last=L[L.length-1],over=last?last.p+last.h/2-1:0;if(over>0)L.forEach(function(o){o.p=Math.max(o.h/2,o.p-over)});
   L.forEach(function(o){o.n.style.setProperty('--p',o.p.toFixed(4));o.n._gp=o.p});
   [].forEach.call(root.querySelectorAll('.'+K+'__wires--'+sd+' .'+K+'__wire'),function(w){var n=root.querySelector('.'+K+'__node[data-gcn="'+w.getAttribute('data-gcn')+'"]'),i=+w.getAttribute('data-gc');
    if(!n||n._gp==null||c[i]==null)return;var ny=(n._gp*Y).toFixed(1),ry=(c[i]*Y).toFixed(1);
    w.setAttribute('d',sd==='a'?'M0 '+ny+'C55 '+ny+' 45 '+ry+' 100 '+ry:'M0 '+ry+'C55 '+ry+' 45 '+ny+' 100 '+ny)})})}
 if(window.ResizeObserver&&window.MutationObserver){var ro=new ResizeObserver(function(es){es.forEach(function(en){var r=en.target.closest('.'+K);if(r)lay(r)})});
  var scan=function(n){if(n.nodeType!==1)return;(n.matches('.'+K)?[n]:[].slice.call(n.querySelectorAll('.'+K))).forEach(function(r){if(r.__gcl)return;r.__gcl=1;ro.observe(r);var rw=r.querySelector('.'+K+'__rows');if(rw)ro.observe(rw)})};
  new MutationObserver(function(ms){ms.forEach(function(m){[].forEach.call(m.addedNodes,scan)})}).observe(document.documentElement,{childList:true,subtree:true});
  if(document.body)scan(document.body)}
 /* phones: the open standard chip lights the waters it asks for; switching off clears the filter */
 document.addEventListener('pk:change',function(ev){var pk=ev.target;if(!pk.classList||!pk.classList.contains(K+'__pick'))return;var root=pk.closest('.'+K);if(!root)return;
  var it=ev.detail&&ev.detail.on&&ev.detail.index>=0?pk.querySelectorAll('[data-pk-item]')[ev.detail.index]:null,lit=it?it.getAttribute('data-rows').split(' '):null;
  root.classList.toggle('is-filtered',!!lit);
  [].forEach.call(root.querySelectorAll('.'+K+'__row'),function(r){r.classList.toggle('is-lit',!!lit&&lit.indexOf(r.getAttribute('data-gc'))>=0)})});
 function set(root,rows,nodes){var on=rows||nodes;root.classList.toggle('has-hot',!!on);
  [].forEach.call(root.querySelectorAll('[data-gc],[data-gcn]'),function(el){var r=el.getAttribute('data-gc'),n=el.getAttribute('data-gcn'),rs=el.getAttribute('data-rows');
   var hot=!!on&&((rows&&r!=null&&rows.indexOf(r)>=0)||(nodes&&n!=null&&nodes.indexOf(n)>=0)||(rows&&rs&&rs.split(' ').some(function(x){return rows.indexOf(x)>=0})));el.classList.toggle('is-hot',hot)})}
 document.addEventListener('mouseover',function(ev){var root=ev.target.closest&&ev.target.closest('.'+K);if(!root)return;
  var row=ev.target.closest('.'+K+'__row'),node=ev.target.closest('.'+K+'__node');
  if(row)set(root,[row.getAttribute('data-gc')],null);else if(node)set(root,node.getAttribute('data-rows').split(' '),[node.getAttribute('data-gcn')]);else set(root,null,null)});
 document.addEventListener('mouseout',function(ev){var root=ev.target.closest&&ev.target.closest('.'+K);if(root&&!root.contains(ev.relatedTarget))set(root,null,null)});
})();
