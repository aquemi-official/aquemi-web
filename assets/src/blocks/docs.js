/* Block "docs" -> DocList: the documents delivered with a system as a hairline list. Each row: the index, the short
   document code a validation team files it under (mono, derived from its name), the name, its detail and an optional line
   icon. The deciding documents lead, their code in flow. Phones: index and code over the name, detail under it.
   Block link (optional): link (a page id or page#anchor), link_label (its words; default the linked block's heading,
   else the page's name, wlabel) and intent (options the linked form ticks on arrival) print one Button link under the
   list ("Full index →"), so a module page keeps its deciding documents and points to the full package without another
   row. A link to a missing page prints nothing. Item link (optional): an item's link (a page id or page#anchor) makes
   its name a link, and its intent ticks those options on the linked page's form, as a block link's does
   (svc-fabrication's "Joint records" to cmp-documentation#samples). Item file (optional): a path under assets/docs/ (a
   released PDF); the name opens it in a new tab. Use it only for a file that exists in the repository (DR-006 rule 6). */
/* First match wins, so specific names come before general ones (WPS before weld log, O&M before media, EN 285 before FAT,
   a URS compliance matrix before the URS itself). */
var DOC_CODES=[
  [/^urs\b.*traceability/i,'URS & TM'],[/traceability matrix/i,'TM'],[/compliance matrix/i,'CM'],[/user requirement|\burs\b/i,'URS'],
  [/functional and design spec/i,'FDS'],[/functional (design )?spec/i,'FS'],[/hardware and software design/i,'HDS & SDS'],[/basis of design/i,'BOD'],[/mass balance/i,'HMB'],[/steam balance/i,'SB'],[/membrane projection/i,'PRJ'],
  [/design review|\bdq\b/i,'DQ'],[/risk assessment/i,'RA'],[/contamination control/i,'CCS'],
  [/feed ?water (analysis|review)/i,'FWA'],[/demand profile|sizing calc/i,'SIZ'],[/heat balance/i,'HB'],[/hydraulic calc/i,'HYD'],
  [/p&id|instrumentation diagram/i,'P&ID'],[/general arrangement/i,'GA'],[/isometric/i,'ISO'],
  [/instrument and valve list/i,'I&V'],[/alarm and interlock/i,'ALM'],[/electrical drawing/i,'ELE'],
  [/part 11/i,'Part 11'],[/source code/i,'SRC'],[/pressure vessel|\bcrn\b/i,'CRN'],
  [/operation and maintenance/i,'O&M'],[/standard operating procedure|\bsops?\b/i,'SOP'],
  [/fabrication and inspection plan/i,'FIP'],[/fabrication record/i,'FAB'],[/material (cert|log)/i,'MAT'],[/media and resin/i,'MED'],
  [/welding procedure|\bwps\b/i,'WPS & PQR'],[/welder and procedure/i,'WQR & PQR'],[/welder qualif/i,'WQR'],
  [/weld (log|map)/i,'WLD'],[/joint (map|log|records)|joining log/i,'JNT'],[/borescope/i,'BOR'],[/pressure test/i,'PT'],
  [/slope (verif|survey).*dead leg/i,'SLP & DLR'],[/dead leg/i,'DLR'],[/surface finish/i,'SRF'],[/passivation/i,'PAS'],[/slope (verif|survey|check)/i,'SLP'],[/riboflavin|spray ball/i,'RIB'],
  [/integrity test/i,'INT'],[/calibration/i,'CAL'],[/en 285/i,'EN 285'],
  [/executed fat/i,'FAT RPT'],[/\bfat\b.*\bsat\b/i,'FAT & SAT'],[/\bfat\b/i,'FAT'],[/\bsat\b/i,'SAT'],
  [/\biq\b.*\boq\b/i,'IQ & OQ'],[/\biq\b/i,'IQ'],[/\boq\b/i,'OQ'],[/\bpq\b/i,'PQ'],
  [/commissioning/i,'CX'],[/sampling plan/i,'SMP'],[/software version/i,'SVR'],[/computeri[sz]ed system validation/i,'CSV'],[/data integrity/i,'DI'],[/qualification summary/i,'QSR'],[/training/i,'TRN'],
  [/nonconformance/i,'DEV & NCR'],[/deviation/i,'DEV'],[/change control/i,'CC'],[/change impact/i,'CIA'],[/change log/i,'CL'],[/as-built/i,'ASB'],[/like-for-like|like for like/i,'LFL'],[/observation/i,'OBS'],[/annual system review/i,'ASR'],[/trend report/i,'TRD'],[/excursion/i,'EXC'],[/system description/i,'SD'],[/punch list/i,'PL'],
  [/spare/i,'SPR'],[/parts (replaced|record)/i,'PRT'],[/service report/i,'SVC'],[/health report/i,'AHR'],[/turnover package/i,'TOP']
];
var DOC_STOP=/^(and|or|of|the|for|with|to|in|on|a|an|your|by|from)$/i;
/* Codes: an item's explicit code wins (items [{t, code}]); then this lookup, else an acronym the name already gives in brackets, else initials of its first three words. Second value: matched the lookup. */
function docCode(name){
  for(var i=0;i<DOC_CODES.length;i++)if(DOC_CODES[i][0].test(name))return [DOC_CODES[i][1],true];
  var m=name.match(/\(([A-Z][A-Z&]{1,5})s?\)/);if(m)return [m[1],false];
  return [name.replace(/\(.*?\)/g,'').split(/[\s,\/-]+/).filter(function(w){return w&&!DOC_STOP.test(w)}).slice(0,3).map(function(w){return w.charAt(0).toUpperCase()}).join(''),false];
}
/* Row icons (assets/icons masks), from the document name; first match wins. Only where the drawing says what the
   document is; anything else gets no icon. An item's icon field wins ("icon": "none" for none). */
var DOC_ICONS=[[/borescope/i,'borescope'],[/\bweld|\bwps\b|welder/i,'weld'],[/p&id|instrumentation diagram|drawing|isometric|general arrangement/i,'pid'],
  [/calibration|pressure (test|vessel|equipment)/i,'gauge'],[/\btoc\b/i,'toc'],[/conductivity/i,'conductivity'],
  [/maintenance|spare|\bparts\b/i,'wrench'],[/annual|plan\b|schedule/i,'calendar'],
  [/certificate|compliance matrix|statement|signed/i,'stamp'],[/risk assessment|inspection|review|observation|audit|survey/i,'magnifier'],
  [/index|register|summary|manual|\blog\b|dossier|description/i,'binder']];
function docIcon(x){if(x.icon==='none')return '';if(isIcon(x.icon))return x.icon;var t=String(x.t||'');
  for(var i=0;i<DOC_ICONS.length;i++)if(DOC_ICONS[i][0].test(t))return DOC_ICONS[i][1];return ''}
BLOCKS['docs']=function(b,H){
  var items=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:{t:x.t||'',d:x.d,code:x.code,key:x.key,link:x.link,file:x.file,intent:x.intent,icon:x.icon,tag:x.tag}});
  var n=items.length,codes=items.map(function(x){return x.code?[x.code,true]:docCode(x.t)});
  /* Codes only when most items are documents the lookup knows; a checklist of other things keeps just its numbers. */
  var coded=codes.filter(function(c){return c[1]}).length*2>=n;
  /* Key (deciding) documents: items marked key: true; else the first b.key (default 2 in a coded list of five or more; key: 0 for none). */
  var marked=items.some(function(x){return x.key}),nk=b.key!=null?+b.key:(coded&&n>=5?2:0);
  var key=items.map(function(x,i){return marked?!!x.key:i<nk});
  /* fold applies on phones only (DocList style.css): desktop shows every row */
  var noun=b.fold_noun||'documents';
  var ol='<ol class="aq-docs'+(coded?'':' aq-docs--plain')+'">'+items.map(function(x,i){
    /* Item link: the name links its page or page#anchor; intent (options that page's form ticks on arrival) rides on it, as a table cell's */
    var name=x.file?'<a href="'+e(x.file)+'" target="_blank" rel="noopener">'+tx(x.t)+'</a>':x.link&&wp(x.link)?wlink(x.link,x.t,x.intent):tx(x.t);
    /* A tag with no letter or digit ("+") would read as a missing label: leave the code cell empty */
    var tag=x.tag||(coded?codes[i][0]:''),ic=docIcon(x);if(tag&&!/[A-Za-z0-9]/.test(tag))tag='';
    return fli('<li'+(key[i]?' class="is-key"':'')+'>',b,i)+idx(i)
      +(coded||x.tag?'<span class="aq-docs__code" aria-hidden="true">'+e(tag)+'</span>':'')
      +'<span class="aq-docs__name">'+name+'</span>'
      +(x.d?'<span class="aq-docs__d">'+tx(x.d)+'</span>':'')
      +(ic?wIcon(ic,'aq-docs__icon'):'')+'</li>';
  }).join('')+'</ol>';
  var more=b.link&&wp(b.link)?'<p class="aq-docs__more">'+wBtn(b.link_label||wlabel(b.link),b.link,'link',b.intent)+'</p>':'';
  return sec(H+(more?'<div class="aq-stack">'+wFold(b,n,ol,noun)+more+'</div>':wFold(b,n,ol,noun)));
};
