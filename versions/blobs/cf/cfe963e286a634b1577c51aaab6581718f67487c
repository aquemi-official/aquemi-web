/* Look "grade-ladder" -> GradeLadder (design-system/components/GradeLadder): a grade table (as: "grades") read beside
   one instrument. At the left, sticky while the rows pass: the row's number set huge and light, and a fader whose scale
   runs up the water grades (lanes, bottom to top: potable, PW, WFI); a grade we do not supply is drawn as an open,
   dashed zone with its note. A minimum line crosses the whole instrument at the row's minimum grade, tagged with the
   grade as written; grades the note allows or asks for show as open marks on the scale. At the right, the rows.
   The row in hand (pointer, focus, click; while scrolling, the row at the reading line) drives the instrument. The
   instrument is a picture of the row (aria-hidden); the row's words carry it.
   Fields, as the grades table: cols, rows [step, grade, note], intro, fold, fold_noun (phones only).
   Added (shared with the earlier grade-mains look): lanes [{id, t, short, note, off}] (bottom to top; off: not
   supplied, drawn open), taps [["pw", "wfi?"], …] (per row, lane ids; "?" = an alternative the note names).
   Concept: pass 9b ind-pharma.1 (vertical grade scale with a minimum limit line and a big numeral beside the table). */
(function(){
var K='aq-grade-ladder';
function lv(k,n){return ((2*k+1)/(2*n)).toFixed(4)}
function state(T,L){var li={};L.forEach(function(l,k){li[l.id]=k});
 var on=[],alt=[];(T||[]).forEach(function(t){var a=/\?$/.test(t),k=li[t.replace(/\?$/,'')];if(k==null)return;(a?alt:on).push(k)});
 var open=!on.length,k=open?(alt.length?Math.min.apply(null,alt):0):Math.min.apply(null,on);
 return {k:k,open:open,alt:alt.filter(function(a){return a!==k})}}
LOOKS['grade-ladder']=function(b,H){var C=b.cols||[],R=b.rows||[],L=b.lanes||[],T=b.taps||[],n=R.length,nl=L.length||1;
 var S=R.map(function(r,i){return state(T[i],L)}),s0=S[0]||{k:0,open:false,alt:[]};
 var rows=R.map(function(r,i){var s=S[i];
  return fli('<li class="'+K+'__row'+(i?'':' is-on')+'" tabindex="0" data-i="'+i+'" data-f="'+lv(s.k,nl)+'" data-k="'+s.k+'" data-alt="'+s.alt.join(' ')+'" data-g="'+e(r[1])+'"'+(s.open?' data-open=""':'')+'>'
   +idx(i)+'<h3 class="'+K+'__t">'+tx(r[0])+'</h3>'
   +'<p class="'+K+'__g"><span class="'+K+'__k">'+tx(C[1]||'')+'</span>'+tx(r[1])+'</p>'
   +(r[2]?'<p class="'+K+'__note">'+tx(r[2])+'</p>':'<p class="'+K+'__note"></p>')+'</li>',b,i)}).join('');
 var marks=L.map(function(l,k){return '<span class="'+K+'__mark'+(l.off?' is-off':'')+(s0.alt.indexOf(k)>-1?' is-alt':'')+(k===s0.k?' is-min':'')+'" data-k="'+k+'" style="--m:'+lv(k,nl)+'">'
   +'<span class="'+K+'__lt">'+e(l.short||l.t)+'</span>'+(l.note?'<span class="'+K+'__ln">'+e(l.note)+'</span>':'')+'</span>'}).join('');
 var zones=L.map(function(l,k){return l.off?'<span class="'+K+'__zone" style="--z0:'+(k/nl).toFixed(4)+';--z1:'+((k+1)/nl).toFixed(4)+'"></span>':''}).join('');
 var ticks='';for(var t=0;t<=nl*6;t++)ticks+='<i'+(t%6===3?' class="is-major"':'')+' style="--t:'+(t/(nl*6)).toFixed(4)+'"></i>';
 var inst='<div class="'+K+'__inst" aria-hidden="true" style="--f:'+lv(s0.k,nl)+'">'
  +'<div class="'+K+'__read"><span class="'+K+'__k">'+e(C[0]||'')+'</span><span class="'+K+'__num">01</span><span class="'+K+'__step">'+e(R[0]?R[0][0]:'')+'</span>'
  +'<span class="'+K+'__tag"><span class="'+K+'__k">'+e(C[1]||'')+'</span><span class="'+K+'__val">'+e(R[0]?R[0][1]:'')+'</span></span></div>'
  +'<div class="'+K+'__fader"><span class="'+K+'__labels">'+marks+'</span><span class="'+K+'__ruler">'+ticks+'</span>'
  +'<span class="'+K+'__track">'+zones+'<span class="'+K+'__fill"></span></span>'
  +'<span class="'+K+'__limit'+(s0.open?' is-open':'')+'"></span></div></div>';
 var list='<div class="'+K+'__list"><p class="'+K+'__colh"><span></span><span>'+tx(C[0]||'')+'</span><span>'+tx(C[1]||'')+'</span><span>'+tx(C[2]||'')+'</span></p>'
  +'<ol class="'+K+'__rows" role="list">'+rows+'</ol></div>';
 return sec(H+'<div class="'+K+'" style="--nl:'+nl+'">'+inst+wFold(b,n,list,b.fold_noun)+'</div>',K+'-sec')};
/* show one row on the instrument (instant under reduced motion: the transitions are CSS) */
function show(w,row,how){if(!w||!row)return;var ins=w.querySelector('.'+K+'__inst');if(!ins)return;
 [].forEach.call(w.querySelectorAll('.'+K+'__row.is-on'),function(x){if(x!==row)x.classList.remove('is-on')});row.classList.add('is-on');
 ins.style.setProperty('--f',row.getAttribute('data-f'));
 var lim=ins.querySelector('.'+K+'__limit');lim.classList.toggle('is-open',row.hasAttribute('data-open'));
 var alt=(row.getAttribute('data-alt')||'').split(' ');
 [].forEach.call(ins.querySelectorAll('.'+K+'__mark'),function(m){m.classList.toggle('is-alt',alt.indexOf(m.getAttribute('data-k'))>-1);m.classList.toggle('is-min',m.getAttribute('data-k')===row.getAttribute('data-k'))});
 var i=+row.getAttribute('data-i'),num=ins.querySelector('.'+K+'__num'),nv=(i<9?'0':'')+(i+1);
 if(num.textContent!==nv){num.textContent=nv;[num,ins.querySelector('.'+K+'__val')].forEach(function(x){x.classList.remove('is-tick');void x.offsetWidth;x.classList.add('is-tick')})}
 ins.querySelector('.'+K+'__step').textContent=row.querySelector('.'+K+'__t').textContent;
 ins.querySelector('.'+K+'__val').textContent=row.getAttribute('data-g');
 w.setAttribute('data-by',how||'')}
window.AQladder={show:show};
function pick(ev,how){var r=ev.target.closest&&ev.target.closest('.'+K+'__row');if(r)show(r.closest('.'+K),r,how)}
document.addEventListener('pointerover',function(ev){if(ev.pointerType!=='touch')pick(ev,'hand')});
document.addEventListener('focusin',function(ev){pick(ev,'hand')});
document.addEventListener('click',function(ev){pick(ev,'hand')});
document.addEventListener('pointerout',function(ev){var l=ev.target.closest&&ev.target.closest('.'+K+'__rows');if(l&&!(ev.relatedTarget&&l.contains(ev.relatedTarget))){var w=l.closest('.'+K);if(w.getAttribute('data-by')==='hand'&&!l.contains(document.activeElement))w.setAttribute('data-by','')}});
/* arrow keys, Home and End step through the rows */
document.addEventListener('keydown',function(ev){var r=ev.target.closest&&ev.target.closest('.'+K+'__row');if(!r)return;
 var o=[].filter.call(r.parentNode.children,function(x){return x.offsetParent!==null}),i=o.indexOf(r),k=ev.key,j=-1;
 if(k==='ArrowDown')j=Math.min(o.length-1,i+1);else if(k==='ArrowUp')j=Math.max(0,i-1);else if(k==='Home')j=0;else if(k==='End')j=o.length-1;
 if(j>-1){ev.preventDefault();o[j].focus()}});
})();
