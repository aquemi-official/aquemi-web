/* Look "joint-spine" -> JointSpine (design-system/components/JointSpine): a log whose rows hang off a pipe. A twin-wall
   pipe drops in from the top of the section beside the title, bends and runs down the left of the log as its spine;
   each row of the log sits level with a joint on the spine (the piping-isometric joint mark: a tick across the pipe
   and a dot), and the row's number is written at the joint, alternating sides, as joint numbers are on a drawing.
   The pipe runs on past the last row and out of the section. Pointing at a row lights its joint.
   Fields, as a table: h, cols [field, what it proves, record], rows, fold, fold_noun. The column names show once as
   the log's legend (in each row for screen readers; shown per row on phones). The fold applies on phones only.
   Phones: no drop or bend; the spine runs down a narrow rail at the left, numbers beside it. The legend shows once
   above the log as a key and the per-row labels stay for screen readers only (pass 12, S12). When every second-column
   value is short (50 characters or fewer: a status such as "Included" or a placeholder) the block gets .is-chips and
   on phones that value is a chip beside the field name (both wrapped in div.__fh, display: contents on desktop). */
LOOKS['joint-spine']=function(b,H){var C=b.cols||[],R=b.rows||[],chips=R.length&&R.every(function(r){return String(r[1]&&r[1].t||r[1]||'').length<=50});
 var k=function(i){return C[i]?'<span class="aq-joint-spine__k">'+tx(C[i])+'</span>':''};
 /* the bend from the drop into the spine: a 13-wide wall stroke with a 10-wide ground stroke over it leaves two 1.5
    px walls; the water is the centre line. Impression (faint) under, ink over. */
 var d='M14 0V14Q14 34 34 34H140Q160 34 160 54V72';
 var bend='<svg class="aq-joint-spine__bend" viewBox="0 0 240 72" aria-hidden="true" focusable="false">'
  +'<path class="aq-joint-spine__w aq-joint-spine__w--imp" d="'+d+'"/><path class="aq-joint-spine__g" d="'+d+'"/>'
  +'<g class="aq-joint-spine__bink"><path class="aq-joint-spine__w" d="'+d+'"/><path class="aq-joint-spine__g" d="'+d+'"/><path class="aq-joint-spine__h2o" d="'+d+'"/></g></svg>';
 var legend='<p class="aq-joint-spine__legend" aria-hidden="true">'+[0,1,2].map(function(i){return '<span>'+tx(C[i]||'')+'</span>'}).join('')+'</p>';
 var pipe=function(cls,inner){return '<span class="aq-joint-spine__pipe'+(cls?' '+cls:'')+'" aria-hidden="true"><i class="aq-joint-spine__ink"></i>'+(inner||'')+'</span>'};
 var rows=R.map(function(r,i){var n=(i<9?'0':'')+(i+1);
  return fli('<li class="aq-joint-spine__row'+(i%2?' is-r':'')+'" data-k="'+i+'">',b,i)
   +pipe('',('<span class="aq-joint-spine__joint"></span><span class="aq-joint-spine__no">'+n+'</span>'))
   +'<div class="aq-joint-spine__fh"><h3 class="aq-joint-spine__f">'+tcell(r[0])+'</h3>'
   +(r[1]!=null?'<p class="aq-joint-spine__p">'+k(1)+tcell(r[1])+'</p>':'')+'</div>'
   +(r[2]!=null?'<p class="aq-joint-spine__r">'+k(2)+tcell(r[2])+'</p>':'')+'</li>'}).join('');
 var log='<ol class="aq-joint-spine__log" role="list">'+rows+'</ol>';
 return sec('<div class="aq-joint-spine'+(chips?' is-chips':'')+'">'
  +'<div class="aq-joint-spine__lead">'+pipe('aq-joint-spine__drop')+H+bend+legend+'</div>'
  +wFold(b,R.length,log,b.fold_noun||'fields')+pipe('aq-joint-spine__tail')
  +'</div>','aq-joint-spine-sec')};
