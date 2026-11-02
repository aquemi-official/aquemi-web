/* Look "tolerance-scales" -> ToleranceScales (design-system/components/ToleranceScales): instrument calibration read
   as acceptance bands. Each instrument is a row: its name and basis on the left; on the right, one readout per check
   the row names (a row's value split at ";"): the check's name in mono, its acceptance set large and light (± 2 %,
   85 % to 115 %), and a ruler under it with the nominal line and the acceptance band between its limits. A check with
   no figure ("Across the working range", "Against a reference sensor…") draws the band across the whole ruler, or a
   reference line beside the instrument's. The highlighted row (hl) leads on a raised panel. The note closes the
   section as the certificate's foot.
   Fields as a spec block: h, cols, rows [{p, v, m, hl}], fold, fold_noun, note. Figures are read from the value text
   ("± n unit" or "a % to b %"); nothing is added. Phones: the name over its readouts, each ruler full width. */
function tsCheck(s){s=String(s||'').trim();var m=s.match(/±\s?[\d.,]+\s?[^\s;,]+(?:\/[^\s;,]+)?/),r=s.match(/([\d.,]+)\s?%\s?to\s?([\d.,]+)\s?%/);
 if(r){return {k:s.slice(0,r.index).replace(/[:\s]+$/,''),f:r[0],a:+r[1].replace(',','.'),b:+r[2].replace(',','.'),kind:'range'}}
 if(m){return {k:s.slice(0,m.index).replace(/[:\s]+$/,''),f:m[0],kind:'pm'}}
 return {k:'',f:'',t:s,kind:/refer|maker/i.test(s)?'ref':'span'}}
function tsRuler(c){var W=320,y=22,t='',i,band='',lim='';
 for(i=0;i<=32;i++){var x=i*10,h=i%8===0?12:i%4===0?8:4;t+='M'+x+' '+y+'v-'+h}
 if(c.kind==='pm'){band='<rect class="aq-tolerance-scales__band" x="104" y="8" width="112" height="14"/>';lim='M104 4V'+y+'M216 4V'+y}
 else if(c.kind==='range'){var lo=c.a-(c.b-c.a)*0.5,hi=c.b+(c.b-c.a)*0.5,X=function(v){return (v-lo)/(hi-lo)*W},x0=X(c.a),x1=X(c.b);
  band='<rect class="aq-tolerance-scales__band" x="'+x0.toFixed(1)+'" y="8" width="'+(x1-x0).toFixed(1)+'" height="14"/>';lim='M'+x0.toFixed(1)+' 4V'+y+'M'+x1.toFixed(1)+' 4V'+y}
 else if(c.kind==='span'){band='<rect class="aq-tolerance-scales__band" x="0" y="8" width="'+W+'" height="14"/>';lim='M0.75 4V'+y+'M'+(W-0.75)+' 4V'+y}
 else {lim='M150 4V'+y+'M170 4V'+y;band='<path class="aq-tolerance-scales__ref" d="M160 2V'+(y+6)+'"/>'}
 return '<svg class="aq-tolerance-scales__ruler" viewBox="0 0 '+W+' 30" preserveAspectRatio="none" aria-hidden="true" focusable="false">'+band
  +'<path class="aq-tolerance-scales__ticks" d="M0 '+y+'H'+W+t+'"/>'+(c.kind!=='ref'?'<path class="aq-tolerance-scales__nom" d="M160 0V30"/>':'')+'<path class="aq-tolerance-scales__lim" d="'+lim+'"/></svg>'}
LOOKS['tolerance-scales']=function(b,H){var R=b.rows||[],C=b.cols||[],K='aq-tolerance-scales';
 var rows=R.map(function(r,i){var cs=String(r.v||'').split(/;\s*/).map(tsCheck);
  var reads=cs.map(function(c){return '<div class="'+K+'__read '+K+'__read--'+c.kind+'">'+(c.k?'<p class="'+K+'__k">'+tx(c.k)+'</p>':'')
   +(c.f?'<p class="'+K+'__f">'+tx(c.f)+'</p>':'<p class="'+K+'__t">'+tx(c.t)+'</p>')+tsRuler(c)+'</div>'}).join('');
  return fli('<li class="'+K+'__row'+(r.hl?' is-hl':'')+(cs.length>2?' is-many':'')+'" style="--checks:'+cs.length+'">'
   +'<div class="'+K+'__id"><span class="'+K+'__n" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><h3 class="'+K+'__p">'+tx(r.p)+'</h3>'
   +(r.m?'<p class="'+K+'__m"><span class="'+K+'__mk">'+tx(C[2]||'Basis')+'</span>'+tx(r.m)+'</p>':'')+'</div>'
   +'<div class="'+K+'__reads"><p class="'+K+'__v">'+(C[1]?tx(C[1])+': ':'')+tx(r.v)+'</p><div class="'+K+'__grid" aria-hidden="true">'+reads+'</div></div></li>',b,i)}).join('');
 var note=b.note?'<p class="'+K+'__note"><span class="'+K+'__seal" aria-hidden="true"></span><span>'+tx(b.note)+'</span></p>':'';
 return sec(H+wFold(b,R.length,'<ol class="'+K+'" role="list">'+rows+'</ol>',b.fold_noun||'instruments')+note,K+'-sec')};
