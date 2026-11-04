/* Look "hmi-trend" -> HmiTrend (design-system/components/HmiTrend): a table of alarm lines (line, how it is set, what
   the system does) as the operator panel's own screen: a dark instrument panel (data-theme dark in both page themes)
   with a tab bar and an alarm banner, a trend plot where one reading runs under the limit lines and drifts up near the
   end, flagged by the trend rule before it reaches any line, and the alarm summary under it as the real table. Each
   line keeps one status colour, one shape and its name everywhere (plot label, banner, table).
   Fields: h, intro, cols (three labels), rows [[line, how, what]] (a cell may be {t, link}), lines (the role of each
   row in order: limit | action | alert | trend; default that order), tabs (screen tab names, the first one shown;
   decoration, aria-hidden), plot (optional: the roles drawn on the trend plot, e.g. ["limit","trend"] when the action
   and alert levels are laboratory results, not online readings; default every role; the table keeps every row). Under the reading a phosphor glow (FxPhosphor, ambient WebGL) follows the same trace.
   Phones: every tab stays, as one 44 px segmented strip (pass 12; the tabs are the screen's chrome, not panels), the
   newest alarm wraps under it with the lamp cluster, the plot shortens, the table rows stack. */
var HMI_Y={limit:52,action:112,alert:172};
function hmiTrace(){var d='',x,y,pts=[];
 for(x=0;x<=930;x+=10){var n=Math.sin(x*0.071)*7+Math.sin(x*0.23+1.3)*4+Math.sin(x*0.013+0.4)*5,dr=x>600?Math.pow((x-600)/330,1.6)*58:0;y=262+n-dr;pts.push([x,y])}
 pts.forEach(function(p,i){d+=(i?'L':'M')+p[0]+' '+p[1].toFixed(1)});return {d:d,end:pts[pts.length-1]}}
LOOKS['hmi-trend']=function(b,H){
 var C=b.cols||[],R=b.rows||[],L=b.lines||['limit','action','alert','trend'],T=b.tabs||[];
 var name=function(r){var c=r&&r[0];return c&&typeof c==='object'?c.t:c};
 var kind=function(i){return L[i]||'alert'},trendI=L.indexOf('trend');
 /* the plot: grid, limit lines, the reading, the trend rule's fit line and flag */
 var W=1000,Hh=320,grid='';for(var gx=50;gx<W;gx+=50)grid+='M'+gx+' 0V'+Hh;for(var gy=40;gy<Hh;gy+=40)grid+='M0 '+gy+'H'+W;
 var tr=hmiTrace(),lines='',labels='';
 var P=b.plot||null;
 R.forEach(function(r,i){var k=kind(i);if(!HMI_Y[k]||(P&&P.indexOf(k)<0))return;var y=HMI_Y[k];
  lines+='<path class="aq-hmi-trend__lim aq-hmi-trend__lim--'+k+'" data-hmi="'+i+'" d="M0 '+y+'H'+W+'"/>';
  labels+='<span class="aq-hmi-trend__ll aq-hmi-trend__ll--'+k+'" data-hmi="'+i+'" style="top:'+(100*y/Hh).toFixed(2)+'%"><i class="aq-hmi-trend__pri aq-hmi-trend__pri--'+k+'"></i>'+tx(name(r))+'</span>'});
 var flagX=780,fit='M640 '+(262).toFixed(0)+'L930 '+(tr.end[1]-4).toFixed(1);
 var plot='<svg class="aq-hmi-trend__svg" viewBox="0 0 '+W+' '+Hh+'" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
  +'<path class="aq-hmi-trend__grid" d="'+grid+'"/><rect class="aq-hmi-trend__zone" x="0" y="0" width="'+W+'" height="'+HMI_Y.limit+'"/>'+lines
  +(trendI>=0?'<g class="aq-hmi-trend__rule" data-hmi="'+trendI+'"><rect class="aq-hmi-trend__win" x="640" y="0" width="290" height="'+Hh+'"/><path class="aq-hmi-trend__fit" d="'+fit+'"/><path class="aq-hmi-trend__mark" d="M'+flagX+' 0V'+Hh+'"/></g>':'')
  +'</svg><svg class="aq-hmi-trend__svg aq-hmi-trend__run" viewBox="0 0 '+W+' '+Hh+'" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
  +'<path class="aq-hmi-trend__trace" d="'+tr.d+'"/><path class="aq-hmi-trend__now" d="M'+tr.end[0]+' 0V'+Hh+'"/></svg>';
 var pct=function(x,y){return 'left:'+(100*x/W).toFixed(2)+'%;top:'+(100*y/Hh).toFixed(2)+'%'};
 var flag=trendI>=0?'<span class="aq-hmi-trend__flag" data-hmi="'+trendI+'" style="left:'+(100*flagX/W).toFixed(2)+'%"><i class="aq-hmi-trend__pri aq-hmi-trend__pri--trend"></i>'+tx(name(R[trendI]))+'</span>':'';
 var fig='<div class="aq-hmi-trend__plot" aria-hidden="true"><canvas class="aq-fx-shader" data-gl="phosphor" aria-hidden="true"></canvas>'+plot+labels+flag+'<span class="aq-hmi-trend__dot" style="'+pct(tr.end[0],tr.end[1])+'"></span>'
  +'<span class="aq-hmi-trend__ax"><span></span><span></span><span></span><span></span><span></span></span></div>';
 /* the screen's chrome: tabs and the alarm banner (the trend rule's line, as a panel shows its newest alarm) */
 var tabs=T.length?'<span class="aq-hmi-trend__tabs">'+T.map(function(t,i){return '<span class="aq-hmi-trend__tab'+(i?'':' is-on')+'">'+tx(t)+'</span>'}).join('')+'</span>':'';
 var bn=trendI>=0?'<span class="aq-hmi-trend__banner" data-hmi="'+trendI+'"><i class="aq-hmi-trend__pri aq-hmi-trend__pri--trend"></i><span>'+tx(name(R[trendI]))+'</span><span class="aq-hmi-trend__bt">'+tcell(R[trendI][2])+'</span></span>':'';
 var bar='<div class="aq-hmi-trend__bar" aria-hidden="true">'+tabs+bn+'<span class="aq-hmi-trend__lamps">'+R.map(function(r,i){return '<i class="aq-hmi-trend__pri aq-hmi-trend__pri--'+kind(i)+'"></i>'}).join('')+'</span></div>';
 var table='<table class="aq-hmi-trend__table"><thead><tr>'+C.map(function(c){return '<th scope="col">'+tx(c)+'</th>'}).join('')+'</tr></thead><tbody>'
  +R.map(function(r,i){var k=kind(i);return '<tr class="aq-hmi-trend__row aq-hmi-trend__row--'+k+'" data-hmi="'+i+'"><th scope="row"><i class="aq-hmi-trend__pri aq-hmi-trend__pri--'+k+'" aria-hidden="true"></i><span>'+tcell(r[0])+'</span></th>'
   +r.slice(1).map(function(c,j){return '<td><span class="aq-hmi-trend__k" aria-hidden="true">'+tx(C[j+1]||'')+'</span>'+tcell(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table>';
 return sec(H+'<div class="aq-hmi-trend" data-theme="dark" data-flag="'+(flagX/930).toFixed(3)+'"><div class="aq-hmi-trend__screen">'+bar+fig+table+'</div></div>','aq-hmi-trend-sec')};
/* Hover or focus on an alarm row lights its line on the plot */
(function(){
 function set(root,i){[].forEach.call(root.querySelectorAll('[data-hmi]'),function(el){el.classList.toggle('is-hot',i!=null&&el.getAttribute('data-hmi')===i)});root.classList.toggle('has-hot',i!=null)}
 function over(ev){var t=ev.target.closest&&ev.target.closest('.aq-hmi-trend__row'),root=ev.target.closest&&ev.target.closest('.aq-hmi-trend');if(root)set(root,t?t.getAttribute('data-hmi'):null)}
 document.addEventListener('mouseover',over);document.addEventListener('focusin',over);
 ['mouseout','focusout'].forEach(function(k){document.addEventListener(k,function(ev){var root=ev.target.closest&&ev.target.closest('.aq-hmi-trend');if(root&&!root.contains(ev.relatedTarget))set(root,null)})});
})();
