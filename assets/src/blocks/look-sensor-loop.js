/* Look "sensor-loop" -> SensorLoop (design-system/components/SensorLoop): a spec block of signals (signal, design
   value, basis) drawn where each one is measured: one storage and distribution loop in IsoKit line art (tank, pump,
   UV unit, TOC and conductivity analysers on the supply, divert valve with its drain, two points of use, the return
   overhead to the tank) with an instrument balloon (ISA style, the row's number) on every measuring point, and a
   dashed signal bus along the foot that every instrument drops into (data recording). The rows are instrument
   schedule cards in a row above and a row below the drawing, each on a leader to its balloon; a signal measured at
   several points (temperature) shows its number on each. The caption is the section's eyebrow, as on a plain spec.
   Fields: h, caption, cols, rows [{p, v, m, site}], note, fold, fold_noun. site: toc | cond | temp | divert | flow |
   uv | data (where the balloon sits; a row without one is a card only). Desktop shows every row; the fold applies on
   phones, where the cards stack under the drawing beside a vertical signal rail. */
function slScene(){var A=58,B=58,st=function(i,dz){return [A*i,-B*i,dz||0]},o={},p=[],b='',bus=[],B0=[];
 var tk=isoPart('tank',0,0,0,1.05,{id:'tank'}),pu=isoPart('pump',st(1)[0]+6,st(1)[1]+18,0,0.85,{id:'pump'}),uv=isoPart('uv',st(2)[0]-10,st(2)[1]+6,0,0.8,{id:'uv'});
 var zs=44,zh=112,an1=isoPart('analyzer',st(3)[0]+6,st(3)[1]-16,0,0.9,{id:'toc'}),an2=isoPart('analyzer',st(3)[0]+40,st(3)[1]-16,0,0.9,{id:'cond'});
 var dv=[st(4)[0]+20,st(4)[1]+8,zs],o1=isoPart('outlet',st(5)[0]+14,st(5)[1]+14,0,0.85,{id:'pou'}),o2=isoPart('outlet',st(6)[0]+14,st(6)[1]+14,0,0.85,{id:'pou'});
 /* supply: tank -> pump -> UV -> analyser tee -> divert -> header over the outlets */
 var s1=isoPipe(isoRoute(tk.ports.out,pu.ports.in,'xyz',{via:[[tk.ports.out[0]+10,tk.ports.out[1],tk.ports.out[2]]]}),{r:2.2,to:'pump',caps:false});
 var s2=isoPipe(isoRoute(pu.ports.out,uv.ports.in,'zxy',{via:[[pu.ports.out[0],pu.ports.out[1],zs]]}).concat([]),{r:2.2,to:'uv',caps:false});
 var uo=uv.ports.out,sA=[uo[0],uo[1],zs],sB=[dv[0]-9,dv[1],zs];
 var s3=isoPipe([uo,sA,[sA[0]+14,sA[1],zs],[sA[0]+14,sB[1],zs],sB],{r:2.2,to:'toc',caps:false});
 var va=isoPart('valve',dv[0],dv[1],dv[2],1.2,{id:'divert'});
 var hd1=[dv[0]+9,dv[1],zs],hx=o2.ports.in[0]+30;
 var s4=isoPipe([hd1,[hd1[0]+10,hd1[1],zs],[hd1[0]+10,hd1[1],zh-30],[hd1[0]+10,o1.ports.in[1],zh-30],[o1.ports.in[0]-30,o1.ports.in[1],zh-30]].concat([]),{r:2.2,to:'pou',caps:false});
 var hy=o1.ports.in[1],hz=zh-30;
 var hdr=isoPipe([[o1.ports.in[0]-30,hy,hz],[hx,hy,hz]],{r:2.2,to:'pou',caps:false});
 var drops=[o1,o2].map(function(oo){var q=oo.ports.in;return isoPipe([[q[0],hy,hz],[q[0],q[1],hz],q],{r:1.6,to:'pou',caps:false})}).join('');
 /* return: from the header end up, then one straight overhead run back along the line of the plant (level on the
    drawing, as a pipe rack reads, set back behind the equipment) and a short leg into the tank's return nozzle */
 var tr=tk.ports.ret,RB=90,p0=[hx,hy,zh],p1=[hx,hy-RB,zh],p2=[tr[0],hx+hy-RB-tr[0],zh],rp=[[hx,hy,hz],p0,p1,p2];
 if(Math.abs(p2[1]-tr[1])>1)rp.push([tr[0],tr[1],zh]);rp.push(tr);
 var ret=isoPipe(rp,{r:2.2,to:'tank',caps:false,cls:'aq-sensor-loop__ret'});
 /* drain off the divert: a drop to the floor with an arrow */
 var dr=isoPipe([[dv[0]+5,dv[1],zs],[dv[0]+5,dv[1]+18,zs],[dv[0]+5,dv[1]+18,6]],{r:1.6,caps:'end',cls:'aq-sensor-loop__drain'});
 /* return instruments on the overhead run, in water order: flow meter, pressure gauge, temperature well */
 var mid=function(a,c,f){return [a[0]+(c[0]-a[0])*f,a[1]+(c[1]-a[1])*f,a[2]+(c[2]-a[2])*f]},rl=Math.hypot(p2[0]-p1[0],p2[1]-p1[1])||1,rd=[(p2[0]-p1[0])/rl,(p2[1]-p1[1])/rl,0];
 var fm=mid(p1,p2,0.2),gp=mid(p1,p2,0.45),t3=mid(p1,p2,0.72);t3=[t3[0],t3[1],zh+2.2];
 var ga=isoPart('gauge',gp[0],gp[1],zh+2.4,1,{id:'flow',value:0.5});
 var fmD=isoCylD([fm[0]-7*rd[0],fm[1]-7*rd[1],fm[2]],rd,14,4.4);
 /* order: back to front and in water order */
 b+=tk+s1+pu+s2+uv+an1+an2;
 b+=s3+dr+va+s4+hdr+o1+o2+drops+ret+ga+'<path class="aq-iso__eq" d="'+fmD[0]+fmD[1]+'"/>';
 /* temperature wells: small stems on the supply after the pump, on the tank and on the return */
 var tw=function(q){return '<path class="aq-iso__ln" d="'+isoPoly([q,[q[0],q[1],q[2]+7]])+'"/><path class="aq-iso__eq" d="'+isoRingD([q[0],q[1],q[2]+7],'z',1.6)+'"/>'};
 var t1=[pu.ports.out[0],pu.ports.out[1],zs+2.2],t2=[tk.ports.top[0]+10,tk.ports.top[1]+10,tk.ports.top[2]-14];
 b+=tw(t1)+tw(t3);
 /* measuring points (balloon anchors, 3D) */
 o.toc=[an1.ports.top];o.cond=[an2.ports.top];o.uv=[uv.ports.top];o.divert=[va.ports.top];
 o.flow=[[fm[0],fm[1],fm[2]+6],ga.ports.top];o.temp=[[t3[0],t3[1],t3[2]+9],[t1[0],t1[1],t1[2]+9],t2];
 /* the bus: under the floor line, a dashed riser from every instrument */
 var fl=function(q){return [q[0],q[1],0]};
 return {svg:b,pts:o,parts:[tk,pu,uv,an1,an2,o1,o2],ext:[[hx+30,hy,0],[hx,hy,zh+20],[-30,30,0],[tr[0],tr[1],zh+20]]}}
LOOKS['sensor-loop']=function(b,H){H=wSecHead({eyebrow:b.caption,h:b.h,intro:b.intro});
 var R=b.rows||[],sc=slScene(),W=1000;
 /* view box: the scene's bounds, padded for balloons and the bus */
 var all=[];Object.keys(sc.pts).forEach(function(k){sc.pts[k].forEach(function(q){all.push(q)})});all=all.concat(sc.ext);
 var bx=isoBounds(all,30),sx=W/bx.w,VH=Math.round(bx.h*sx+40),org=[-bx.x,-bx.y+50/sx];
 var scale=sx;
 /* balloons: rows with a site, in screen space of the scaled drawing */
 var S=function(q){var p=isoP(q);return [(p[0]+org[0])*scale,(p[1]+org[1])*scale]};
 var used=[],top=[],bot=[];
 R.forEach(function(r,i){var k=r&&r.site,ps=k==='data'?null:(k&&sc.pts[k]);
  if(k==='data'){used.push({i:i,p:[W*0.86,VH-30],more:[]});return}
  if(!ps||!ps.length)return;var a=S(ps[0]);a[1]-=26;used.push({i:i,p:a,more:ps.slice(1).map(function(q){var c=S(q);c[1]-=22;return c})})});
 /* rows of cards: the higher balloons to the top row, the lower to the bottom; each row sorted left to right */
 var srt=used.slice().sort(function(a,c){return a.p[1]-c.p[1]}),nt=Math.ceil(used.length/2);
 srt.forEach(function(u,j){(j<nt?top:bot).push(u)});
 [top,bot].forEach(function(L){L.sort(function(a,c){return a.p[0]-c.p[0]})});
 var col={};var lead='',ball='';
 [[top,'t'],[bot,'b']].forEach(function(z){var L=z[0],n=Math.max(L.length,1);L.forEach(function(u,j){var cx=W*(j+0.5)/n,p=u.p,y0=z[1]==='t'?0:VH,kn=z[1]==='t'?p[1]-30-j*6:p[1]+30+j*6;
   if(z[1]==='b')kn=Math.max(kn,p[1]+30);
   col[u.i]={row:z[1],c:j+1,n:n};
   lead+='<path class="aq-sensor-loop__lead" data-sl="'+u.i+'" d="M'+cx.toFixed(1)+' '+y0+'V'+kn.toFixed(1)+'H'+p[0].toFixed(1)+'V'+(p[1]+(z[1]==='t'?-12:12)).toFixed(1)+'"/>'})});
 used.forEach(function(u){var num=(u.i<9?'0':'')+(u.i+1);[u.p].concat(u.more).forEach(function(p,k){
  ball+='<g class="aq-sensor-loop__ball'+(k?' is-more':'')+'" data-sl="'+u.i+'"><path class="aq-sensor-loop__stem" d="M'+p[0].toFixed(1)+' '+(p[1]+12).toFixed(1)+'v'+(k?14:18)+'"/><circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="12"/><path class="aq-sensor-loop__bar" d="M'+(p[0]-12).toFixed(1)+' '+p[1].toFixed(1)+'h24"/><text x="'+p[0].toFixed(1)+'" y="'+(p[1]-2.5).toFixed(1)+'">'+num+'</text></g>'})});
 /* the bus: along the foot, a dashed drop from each balloon's measuring point */
 var by=VH-30,bus='<path class="aq-sensor-loop__bus" d="M'+(W*0.04).toFixed(1)+' '+by+'H'+(W*0.86-12).toFixed(1)+'"/>';
 used.forEach(function(u){if(R[u.i].site==='data')return;var x=u.p[0];bus+='<path class="aq-sensor-loop__tap" data-sl="'+u.i+'" d="M'+x.toFixed(1)+' '+(u.p[1]+30).toFixed(1)+'V'+by+'"/><circle class="aq-sensor-loop__node" cx="'+x.toFixed(1)+'" cy="'+by+'" r="2.5"/>'});
 var drawing='<g transform="scale('+scale.toFixed(4)+') translate('+org[0].toFixed(1)+' '+org[1].toFixed(1)+')">'+sc.svg+'</g>';
 var svg='<svg class="aq-iso aq-sensor-loop__svg" viewBox="0 0 '+W+' '+VH+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">'
  +'<g class="aq-sensor-loop__busg">'+bus+'</g>'+drawing+lead+ball+'</svg>';
 /* cards: data order in the DOM; placed in the top or bottom row column by column */
 var cards=R.map(function(r,i){var c=col[i],num=(i<9?'0':'')+(i+1),sp=c?Math.round(12/c.n):0,st=c?' style="grid-row:'+(c.row==='t'?1:3)+';grid-column:'+((c.c-1)*sp+1)+' / span '+sp+'"':'';
  return fli('<li class="aq-sensor-loop__card'+(c?' aq-sensor-loop__card--'+c.row:' aq-sensor-loop__card--free')+'" data-sl="'+i+'"'+st+'><span class="aq-sensor-loop__n" aria-hidden="true">'+num+'</span>'
   +'<h3 class="aq-sensor-loop__p">'+tx(r.p)+'</h3><p class="aq-sensor-loop__v">'+tx(r.v)+'</p>'+(r.m?'<p class="aq-sensor-loop__m">'+tx(r.m)+'</p>':'')+'</li>',b,i)}).join('');
 var nt2=top.length||1,nb=bot.length||1;
 var inner='<div class="aq-sensor-loop" style="--sl-top:'+nt2+';--sl-bot:'+nb+'"><ol class="aq-sensor-loop__cards" role="list">'+cards+'</ol>'
  +'<div class="aq-sensor-loop__fig">'+svg+'</div></div>';
 var note=b.note?'<p class="aq-sensor-loop__note">'+tx(b.note)+'</p>':'';
 return sec(H+wFold(b,R.length,inner,b.fold_noun||'signals')+note,'aq-sensor-loop-sec')};
(function(){
 function set(root,i){[].forEach.call(root.querySelectorAll('[data-sl]'),function(el){el.classList.toggle('is-hot',i!=null&&el.getAttribute('data-sl')===i)});root.classList.toggle('has-hot',i!=null)}
 document.addEventListener('mouseover',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-sensor-loop__card'),root=ev.target.closest&&ev.target.closest('.aq-sensor-loop');if(root)set(root,t?t.getAttribute('data-sl'):null)});
 document.addEventListener('mouseout',function(ev){var root=ev.target.closest&&ev.target.closest('.aq-sensor-loop');if(root&&!root.contains(ev.relatedTarget))set(root,null)});
})();
