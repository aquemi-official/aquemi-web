/* Look "spares-kit" -> SparesKit (design-system/components/SparesKit): like-for-like rules read off the spares kit
   itself. A tray (a shadow board seen from above) holds one pocket per part, each part drawn flat in line art in its
   cut-out: an RO membrane element, an instrument probe with its transmitter, a program memory card, a gasket and a
   diaphragm, an EDI module, a UV lamp, a vent filter cartridge. Under each pocket: the part, then the two answers
   the table gives, marked like a drawing note: "=" like for like when…, "≠" a change when…, and the arrow to what
   follows a change. The last cell of the tray is the key (the column names).
   Fields as a table block: h, intro, cols [part, like-for-like, change, what follows], rows, fold, fold_noun.
   kit (optional): one drawing name per row (membrane, probe, card, seal, edi, lamp, cartridge); without it the
   drawing is matched from the part's name, and a part with no match gets a plain pocket. Desktop shows the whole
   tray; the fold applies on phones, where the pockets stack one per row, drawing beside the answers. */
var SK_ART={
 membrane:'<rect x="22" y="36" width="196" height="28"/><path d="M34 36v28M206 36v28M70 36v28M118 36v28M166 36v28"/><path class="k-t" d="M22 50h-10M218 50h10"/><circle class="k-t" cx="28" cy="50" r="3"/>',
 probe:'<rect x="30" y="40" width="58" height="20"/><path d="M88 46h70v8H88"/><path class="k-t" d="M158 48h22M158 52h22"/><path d="M30 50C14 50 14 78 40 78h38"/><rect x="78" y="70" width="40" height="22"/><path class="k-t" d="M84 76h28M84 81h20"/><circle class="k-a" cx="112" cy="86" r="2"/>',
 card:'<path d="M70 26h84l16 16v44H70Z"/><path class="k-t" d="M154 26v16h16"/><path d="M82 86V70M92 86V70M102 86V70M112 86V70M122 86V70M132 86V70"/><rect class="k-a" x="86" y="38" width="44" height="18"/>',
 seal:'<circle cx="74" cy="52" r="30"/><circle cx="74" cy="52" r="20"/><circle cx="168" cy="52" r="30"/><circle class="k-t" cx="168" cy="52" r="7"/><path class="k-t" d="M168 22v-6M168 82v6M138 52h-6M198 52h6"/><circle class="k-t" cx="150" cy="31" r="2"/><circle class="k-t" cx="186" cy="31" r="2"/><circle class="k-t" cx="150" cy="73" r="2"/><circle class="k-t" cx="186" cy="73" r="2"/>',
 edi:'<rect x="40" y="26" width="16" height="52"/><rect x="184" y="26" width="16" height="52"/><rect x="56" y="32" width="128" height="40"/><path class="k-t" d="M64 32v40M72 32v40M80 32v40M88 32v40M96 32v40M104 32v40M112 32v40M120 32v40M128 32v40M136 32v40M144 32v40M152 32v40M160 32v40M168 32v40M176 32v40"/><path d="M36 30h168M36 74h168"/><rect class="k-a" x="104" y="14" width="32" height="12"/>',
 lamp:'<rect x="30" y="42" width="180" height="16" rx="8"/><path class="k-t" d="M44 50h152"/><path d="M210 46h12M210 54h12M30 46h-12M30 54h-12"/><path class="k-a" d="M60 50h120"/>',
 cartridge:'<rect x="74" y="20" width="92" height="12"/><rect x="80" y="32" width="80" height="48"/><path class="k-t" d="M88 32v48M96 32v48M104 32v48M112 32v48M120 32v48M128 32v48M136 32v48M144 32v48M152 32v48"/><rect x="74" y="80" width="92" height="8"/><path d="M112 88v6h16v-6"/>'};
var SK_MATCH=[[/membrane/i,'membrane'],[/instrument|probe|sensor/i,'probe'],[/software|program/i,'card'],[/gasket|diaphragm|seal/i,'seal'],[/\bEDI\b|electrodeioni/i,'edi'],[/lamp/i,'lamp'],[/vent|cartridge/i,'cartridge']];
function skArt(name,kind){if(!kind||!SK_ART[kind]){var s=String(name&&name.t||name||'');kind='';SK_MATCH.some(function(m){if(m[0].test(s)){kind=m[1];return true}})}
 var a=SK_ART[kind]||'';
 return '<svg class="aq-spares-kit__art" viewBox="0 0 240 104" aria-hidden="true" focusable="false"><g class="aq-spares-kit__pocket">'+(a?a.replace(/ class="k-[ta]"/g,''):'<rect x="40" y="24" width="160" height="56"/>')+'</g>'
  +'<g class="aq-spares-kit__part">'+(a||'')+'</g></svg>'}
LOOKS['spares-kit']=function(b,H){var C=b.cols||[],R=b.rows||[],K='aq-spares-kit',kit=b.kit||[];
 var cells=R.map(function(r,i){return fli('<li class="'+K+'__slot">'+'<div class="'+K+'__well">'+skArt(r[0],kit[i])+'<span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span></div>'
  +'<h3 class="'+K+'__t">'+tcell(r[0])+'</h3><dl class="'+K+'__rules">'
  +(r[1]!=null?'<div class="'+K+'__rule '+K+'__rule--same"><dt><span class="'+K+'__sym" aria-hidden="true">=</span>'+tx(C[1]||'')+'</dt><dd>'+tcell(r[1])+'</dd></div>':'')
  +(r[2]!=null?'<div class="'+K+'__rule '+K+'__rule--change"><dt><span class="'+K+'__sym" aria-hidden="true">≠</span>'+tx(C[2]||'')+'</dt><dd>'+tcell(r[2])+'</dd></div>':'')
  +(r[3]!=null?'<div class="'+K+'__rule '+K+'__rule--then"><dt><span class="'+K+'__sym" aria-hidden="true">→</span>'+tx(C[3]||'')+'</dt><dd>'+tcell(r[3])+'</dd></div>':'')
  +'</dl></li>',b,i)}).join('');
 var key='<li class="'+K+'__key" aria-hidden="true"><p class="'+K+'__keyh">Key</p>'+[['=',C[1]],['≠',C[2]],['→',C[3]]].filter(function(k){return k[1]}).map(function(k){return '<p class="'+K+'__keyr"><span class="'+K+'__sym">'+k[0]+'</span>'+tx(k[1])+'</p>'}).join('')+'</li>';
 return sec(H+wFold(b,R.length,'<ol class="'+K+'" role="list">'+cells+key+'</ol>',b.fold_noun||'parts'),K+'-sec')};
