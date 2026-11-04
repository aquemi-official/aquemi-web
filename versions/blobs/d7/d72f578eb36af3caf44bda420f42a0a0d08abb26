/* Look "limit-drawer" -> LimitDrawer (design-system/components/LimitDrawer): who writes your limit, and what to send,
   as a file drawer. One manila folder per limit-writer stands in the drawer, three to a row; each folder's tab sits
   at its own cut position (left, middle, right along the row), so no tab hides another. On the folder: the writer, what
   the limit sets, then a white slip clipped to it with what to send (one line per ";" item), and the navy index label
   at its foot naming where it applies (the row's link). The drawer's front rail and pull close the set.
   Concept: design-system/inspiration/gemini/216-p12-ind-process-limits.png (weak; idea only: never its codes, slogans
   or contact line).
   Fields (a table block): cols [who writes the limit, what it sets, what to send, where it applies], rows (cells
   strings or {t, link}). The tab is the writer up to its first number (ASTM D1193-24), else its first word.
   Phones and tablets (PhoneKit accordion, S11): one folder per row, the tabs still at their stepped cuts; each folder
   closes to a 48 px head (the writer, a chevron) and one is open at a time with what it sets, the slip and the label
   as a 48 px row link. Without script every folder stays open. */
function ldCode(s){s=String(s||'');var m=s.match(/^(.*?\b\d[\d.-]*)/);return m&&m[1].length<=18?m[1]:s.split(/\s+/)[0]}
LOOKS['limit-drawer']=function(b,H){var C=b.cols||[],R=(b.rows||[]).filter(function(r){return r&&r.length}),K='aq-limit-drawer';
 var cell=function(c){return c&&typeof c==='object'?c.t:c==null?'':String(c)};
 var folders=R.map(function(r,i){var who=cell(r[0]),send=cell(r[2]).split(/\s*;\s*/).filter(Boolean),go=r[3]!=null?r[3]:null,num=(i<9?'0':'')+(i+1);
  var label=go&&typeof go==='object'&&go.link&&wp(go.link)?'<a class="'+K+'__label" href="#'+e(go.link)+'" data-wp="'+e(go.link)+'"><span class="'+K+'__lk">'+tx(C[3]||'')+'</span>'+tx(go.t)+'</a>'
   :(go?'<p class="'+K+'__label"><span class="'+K+'__lk">'+tx(C[3]||'')+'</span>'+tx(cell(go))+'</p>':'');
  return '<li class="'+K+'__f" data-pk-item="'+i+'" style="--i:'+i+';--cut:'+(i%3)+'">'
   +'<span class="'+K+'__tab" aria-hidden="true"><span>'+num+'</span>'+tx(ldCode(who))+'</span>'
   +'<div class="'+K+'__body" data-theme="light">'
    +'<button type="button" class="'+K+'__head" data-pk-head><span class="'+K+'__ht">'+tx(who)+'</span><span class="aq-phone-kit__chev" aria-hidden="true"></span></button>'
    +'<h3 class="'+K+'__who" data-pk-desk>'+tx(who)+'</h3>'
    +'<div class="'+K+'__more" data-pk-body>'
    +(r[1]!=null?'<p class="'+K+'__k">'+tx(C[1]||'')+'</p><p class="'+K+'__sets">'+tcell(r[1])+'</p>':'')
    +(send.length?'<div class="'+K+'__slip"><span class="'+K+'__clip" aria-hidden="true"></span><p class="'+K+'__sk">'+tx(C[2]||'')+'</p><ul class="'+K+'__send">'
     +send.map(function(x){return '<li>'+tx(x.charAt(0).toUpperCase()+x.slice(1))+'</li>'}).join('')+'</ul></div>':'')
    +label+'</div></div></li>'}).join('');
 return sec(H+'<div class="'+K+'"><ol class="'+K+'__list" role="list" data-pk-picker="accordion" data-pk-open="0">'+folders+'</ol><div class="'+K+'__front" aria-hidden="true"><span class="'+K+'__pull"></span></div></div>',K+'-sec')};
