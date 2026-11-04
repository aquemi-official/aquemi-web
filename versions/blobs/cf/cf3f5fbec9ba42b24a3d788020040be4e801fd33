/* Look "limit-folders" -> LimitFolders (design-system/components/LimitFolders): who writes your limit, and what to send,
   as one open file drawer with every limit-writer's folder standing in it side by side (pass 12 build B, concept
   design-system/inspiration/gemini/217-p12-ind-process-limits-take2.png: upright folders, tabs at their own cuts, a
   clipped what-to-send slip and a navy where-it-applies label on each; its AQ codes, 'Specification [v1.2]' slips
   and filler lines are never copied). The retake of limit-drawer (216), which stays in the library.
   Each folder is a back leaf with its tab (number and the writer's short name, the tab stepping left, middle, right
   along the drawer) and a front leaf a little lower: the writer, what the limit sets, the white slip clipped to it
   with what to send (one line per ";" item), and the navy index label at its foot naming where it applies (the row's
   link). The drawer's side walls and front rail with its pull hold the set.
   Fields (a table block): cols [who writes the limit, what it sets, what to send, where it applies], rows (cells
   strings or {t, link}). The tab's short name is the writer up to its first number (ASTM D1193-24), else its first word.
   Phones and tablets (<= 860 px, PhoneKit accordion, none open at first): one folder per row, every slip on show (the
   answer is what to send), the tab naming where it applies; the writer is a 48 px head that opens what the limit sets
   and the navy label link. Without script every folder stays open.
   The tab cut is keyed on data-cut (GSAP rewrites the inline style, so CSS never matches on it). The whole drawer is
   light paper in either theme (data-theme="light" on the root). */
/* a code with a hyphen (ASTM D1193-24) never breaks at its hyphen */
function lfNb(h){return h.replace(/(\S*\d-\d\S*)/g,'<span class="aq-limit-folders__nb">$1</span>')}
function lfCode(s){s=String(s||'');var m=s.match(/^(.*?\b\d[\d.-]*)/);return m&&m[1].length<=18?m[1]:s.split(/\s+/)[0]}
LOOKS['limit-folders']=function(b,H){var C=b.cols||[],R=(b.rows||[]).filter(function(r){return r&&r.length}),K='aq-limit-folders';
 var cell=function(c){return c&&typeof c==='object'?c.t:c==null?'':String(c)};
 var folders=R.map(function(r,i){var who=cell(r[0]),send=cell(r[2]).split(/\s*;\s*/).filter(Boolean),go=r[3]!=null?r[3]:null,num=(i<9?'0':'')+(i+1),where=go!=null?cell(go):'';
  var label=go&&typeof go==='object'&&go.link&&wp(go.link)?'<a class="'+K+'__label" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"><span class="'+K+'__lk">'+tx(C[3]||'')+'</span><span class="'+K+'__lt">'+tx(go.t)+'</span></a>'
   :(go?'<p class="'+K+'__label"><span class="'+K+'__lk">'+tx(C[3]||'')+'</span><span class="'+K+'__lt">'+tx(where)+'</span></p>':'');
  return '<li class="'+K+'__f" data-pk-item="'+i+'" data-cut="'+(i%3)+'" style="--i:'+i+';--cut:'+(i%3)+'">'
   +'<span class="'+K+'__tab" aria-hidden="true"><span class="'+K+'__tn">'+num+'</span><span class="'+K+'__tc">'+tx(lfCode(who))+'</span>'+(where?'<span class="'+K+'__tw">'+tx(where)+'</span>':'')+'</span>'
   +'<div class="'+K+'__front" data-theme="light">'
    +'<button type="button" class="'+K+'__head" data-pk-head><span class="'+K+'__ht">'+tx(who)+'</span><span class="aq-phone-kit__chev" aria-hidden="true"></span></button>'
    +'<h3 class="'+K+'__who" data-pk-desk>'+lfNb(tx(who))+'</h3>'
    +'<div class="'+K+'__more" data-pk-body>'
     +(r[1]!=null?'<p class="'+K+'__k">'+tx(C[1]||'')+'</p><p class="'+K+'__sets">'+tcell(r[1])+'</p>':'')
     +label+'</div>'
    +(send.length?'<div class="'+K+'__slip"><span class="'+K+'__clip" aria-hidden="true"></span><p class="'+K+'__sk">'+tx(C[2]||'')+'</p><ul class="'+K+'__send">'
     +send.map(function(x){return '<li>'+tx(x.charAt(0).toUpperCase()+x.slice(1))+'</li>'}).join('')+'</ul></div>':'')
   +'</div></li>'}).join('');
 return sec(H+'<div class="'+K+'" data-theme="light" style="--n:'+R.length+'"><div class="'+K+'__drawer"><ol class="'+K+'__list" role="list" data-pk-picker="accordion" data-pk-open="-1">'+folders+'</ol></div>'
  +'<div class="'+K+'__rail" aria-hidden="true"><span class="'+K+'__pull"></span></div></div>',K+'-sec')};
