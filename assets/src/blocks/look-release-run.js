/* Look "release-run" -> ReleaseRun (design-system/components/ReleaseRun): ordered steps (steps block) set as Swiss
   columns under one water line. A twin-wall line runs across the top of the columns, a node where each step starts;
   each column carries its step number as a huge light numeral, the title and the step's words; the last step is the
   navy column, where the line ends (the water is released there). Placeholders in the words stay placeholders.
   Fields, as steps: h, intro, items [{t, d, link}]. Concept: services.1 (nodes on one rising line to a boxed result)
   and sys-pw.2 (Swiss tiles, huge numerals) in the measured editorial spine. */
(function(){
LOOKS['release-run']=function(b,H){var I=b.items||[],n=I.length;
 var cols=I.map(function(it,i){var lk=it.link&&wp(it.link);
  return '<li class="aq-release-run__col'+(i===n-1?' is-end':'')+'"><span class="aq-release-run__node" aria-hidden="true"></span>'
   +'<span class="aq-release-run__n" aria-hidden="true">'+(i+1)+'</span><h3 class="aq-release-run__t">'+(lk?wlink(it.link,it.t):tx(it.t))+'</h3>'
   +(it.d?'<p class="aq-release-run__d">'+tx(it.d)+'</p>':'')+'</li>'}).join('');
 return sec(H+'<div class="aq-release-run" style="--n:'+n+'"><span class="aq-release-run__line" aria-hidden="true"><span class="aq-release-run__water"></span></span><ol class="aq-release-run__cols">'+cols+'</ol></div>','aq-release-run-sec')};
})();
