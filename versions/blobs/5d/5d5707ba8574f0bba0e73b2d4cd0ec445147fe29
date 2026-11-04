/* Look "receiving-bench" -> ReceivingBench (design-system/components/ReceivingBench): supplier control as a receiving
   bench (pass 12 concept 242, take 2). An isometric line drawing (IsoKit) of a bench with the five supplies the block
   lists, each wearing a numbered tag that matches its row: a length of PP pipe, gaskets, a PVC pipe length, a membrane
   element and a small FRP pressure vessel on its skirt. Above the bench a magnifier circle sits on the pipe's printed
   lot marking, joined by one leader to a second circle on the certificate's lot line: the check the first row names
   (marking against certificate). The rows sit beside the bench: tag, supply, what we require, how we verify it (a
   flow tick); pointing at a row lights its supply on the bench and its tag, and the reverse.
   Fields, as a table: facts [{k, v}] (the standing rule, shown as one line over the rows), cols [supply, what we
   require, how we verify it], rows (cells strings or {t, link}; up to five drawn supplies, in this order), fold,
   fold_noun (phones only). The circle labels come from the page's own words: "Lot marking" and "Certificate".
   Phones: no bench; the two circles side by side with their join, then the rows with their tags (fold kept).
   Replaces MarkingMatch on cmp-quality (that look stays in the library). */
LOOKS['receiving-bench']=(function(){
 var uid=0;
 /* the bench and the five supplies, back to front; returns {inner, pts: {mark, tag1..5}} in iso world units */
 function bench(){
  var out=[],pts={},W=220,D=80,TZ=44,T=5,top=TZ+T;
  var bb=isoB(0,0,0,1);
  [[7,7],[W-7,7],[7,D-7],[W-7,D-7]].forEach(function(q){bb.leg(q[0],q[1],0,TZ,2.4)});
  bb.box(5,5,TZ-9,W-10,D-10,9,'aq-iso__eq aq-iso__eq--alt');
  bb.box(0,0,TZ,W,D,T);
  out.push(bb.done('bench',{cls:'aq-receiving-bench__bench'}));
  /* 03 PVC pipe length (back left), a solvent-weld socket at its far end */
  var c=isoB(0,0,0,1);c.cyl(12,22,top+5,'x',80,5);c.cyl(92,22,top+5,'x',10,6.4);c.ring(102,22,top+5,'x',5,'aq-iso__thin');
  out.push(c.done('pvc',{id:'3'}));pts.t3=[40,22,top+10];
  /* 04 membrane element (back right): wrapped shell, seal bands, end cap with spokes on the visible end */
  var mb=isoB(0,0,0,1),mr=10,mz=top+mr,m0=128,mL=80,my0=24;mb.cyl(m0,my0,mz,'x',mL,mr);
  mb.band(m0+7,my0,mz,'x',mr,'aq-iso__thin');mb.band(m0+mL-7,my0,mz,'x',mr,'aq-iso__thin');
  mb.ring(m0+mL,my0,mz,'x',mr*0.62,'aq-iso__thin');mb.ring(m0+mL,my0,mz,'x',mr*0.22,'aq-iso__thin');
  for(var s=0;s<3;s++){var a=s*Math.PI/3+Math.PI/6,ca=Math.cos(a),sa=Math.sin(a);
   mb.line([m0+mL,my0+ca*mr*0.22,mz+sa*mr*0.22],[m0+mL,my0+ca*mr*0.62,mz+sa*mr*0.62],'aq-iso__thin');
   mb.line([m0+mL,my0-ca*mr*0.22,mz-sa*mr*0.22],[m0+mL,my0-ca*mr*0.62,mz-sa*mr*0.62],'aq-iso__thin')}
  out.push(mb.done('element',{id:'4'}));pts.t4=[m0+20,my0,mz+mr];
  /* 01 PP pipe length (front left) with its printed marking; the lot group is the part the magnifier reads */
  var p=isoB(0,0,0,1),pr=8,pz=top+pr,p0=10,pL=112,py=58;p.cyl(p0,py,pz,'x',pL,pr);p.ring(p0+pL,py,pz,'x',pr*0.72,'aq-iso__thin');
  var my=py+pr*0.62,mzz=pz+pr*0.78;
  for(var k=0;k<8;k++){var x0=p0+8+k*12;if(k===4)continue;p.line([x0,my,mzz],[x0+7,my,mzz],'aq-iso__thin aq-receiving-bench__print')}
  p.line([p0+52,my,mzz],[p0+64,my,mzz],'aq-iso__acc aq-receiving-bench__lot');
  out.push(p.done('pp',{id:'1'}));pts.mark=[p0+58,my,mzz];pts.t1=[p0+18,py,pz+pr];
  /* 02 gaskets: three flat rings stacked (front middle) */
  var g=isoB(0,0,0,1),gx=146,gy=60;[0,2.6].forEach(function(z,i){g.cyl(gx+i*2,gy-i*2,top+z,'z',2.6,12);g.cyl(gx+i*2,gy-i*2,top+z+2.6,'z',0.01,7.2,'aq-iso__eq aq-iso__eq--alt')});
  out.push(g.done('gaskets',{id:'2'}));pts.t2=[gx+2,gy+8,top+5.2];
  /* 05 pressure vessel: a plain domed FRP vessel on its skirt, one port on the top head and one at the foot (no bed
     lines, no multiport head or gauge, so it does not read as a media filter; IsoKit has no plain vessel part yet) */
  var vb=isoB(192,58,top,0.62),vr=11,vz=10,vh=58,vk=7;
  vb.cyl(0,0,0,'z',vz-2,vr*0.78);vb.band(0,0,1.6,'z',vr*0.78);
  vb.vessel(0,0,vz,vr,vh,vk,5);
  vb.stub(0,0,vz+vh+vk-0.6,'z',5,2.4);vb.ring(0,0,vz+vh+vk+4.4,'z',2.4,'aq-iso__thin');
  vb.stub(vr-1,0,vz+3,'x',5,1.8);
  out.push(vb.done('vessel',{id:'5'}));pts.t5=[192,58,top+28];
  return {inner:out.join(''),pts:pts}}
 /* the magnifier pair in its own 2D space: circle A on the pipe marking, circle B on the certificate's lot line */
 function pair(ax,ay,bx,by,r,labA,labB,id,up){
  var cA='rbclip-a'+id,cB='rbclip-b'+id,o='';
  o+='<defs><clipPath id="'+cA+'"><circle cx="'+ax+'" cy="'+ay+'" r="'+(r-1)+'"/></clipPath><clipPath id="'+cB+'"><circle cx="'+bx+'" cy="'+by+'" r="'+(r-1)+'"/></clipPath></defs>';
  /* A: the pipe wall, big, with its printed marking; the lot group boxed */
  var pw=r*0.62,y0=ay-pw/2,dash='';
  for(var i=0;i<7;i++){var x=ax-r+8+i*r*0.32,w=r*0.2;if(i===3)continue;dash+='M'+x.toFixed(1)+' '+(ay+2)+'H'+(x+w).toFixed(1)}
  o+='<g class="aq-receiving-bench__lens" data-rb="a"><circle class="aq-receiving-bench__glass" cx="'+ax+'" cy="'+ay+'" r="'+r+'"/>'
   +'<g clip-path="url(#'+cA+')"><rect class="aq-receiving-bench__pipe" x="'+(ax-r-2)+'" y="'+y0+'" width="'+(2*r+4)+'" height="'+pw+'"/>'
   +'<path class="aq-receiving-bench__hl" d="M'+(ax-r)+' '+(y0+pw*0.2)+'H'+(ax+r)+'"/><path class="aq-receiving-bench__chars" d="'+dash+'"/></g>'
   +'<rect class="aq-receiving-bench__box" x="'+(ax-r*0.1).toFixed(1)+'" y="'+(ay-6)+'" width="'+(r*0.42).toFixed(1)+'" height="12" rx="2"/>'
   +'<path class="aq-receiving-bench__chars aq-receiving-bench__chars--lot" d="M'+(ax-r*0.04).toFixed(1)+' '+(ay+2)+'H'+(ax+r*0.26).toFixed(1)+'"/>'
   +'<circle class="aq-receiving-bench__rim" cx="'+ax+'" cy="'+ay+'" r="'+r+'"/></g>';
  /* B: the certificate sheet, its lot line boxed, a seal */
  var sw=r*1.05,sh=r*1.35,sx=bx-sw/2,sy=by-sh/2,ln='';
  [0.2,0.3,0.4,0.62,0.72].forEach(function(f,i){ln+='M'+(sx+sw*0.14).toFixed(1)+' '+(sy+sh*f).toFixed(1)+'H'+(sx+sw*(i===1?0.6:0.86)).toFixed(1)});
  var ly=(sy+sh*0.51).toFixed(1);
  o+='<g class="aq-receiving-bench__lens" data-rb="b"><circle class="aq-receiving-bench__glass" cx="'+bx+'" cy="'+by+'" r="'+r+'"/>'
   +'<g clip-path="url(#'+cB+')"><path class="aq-receiving-bench__cert" d="M'+sx+' '+sy+'H'+(sx+sw-9)+'L'+(sx+sw)+' '+(sy+9)+'V'+(sy+sh)+'H'+sx+'Z"/>'
   +'<path class="aq-receiving-bench__lines" d="'+ln+'"/>'
   +'<circle class="aq-receiving-bench__seal" cx="'+(sx+sw*0.74).toFixed(1)+'" cy="'+(sy+sh*0.86).toFixed(1)+'" r="'+(r*0.1).toFixed(1)+'"/></g>'
   +'<rect class="aq-receiving-bench__box" x="'+(sx+sw*0.1).toFixed(1)+'" y="'+(+ly-6)+'" width="'+(sw*0.5).toFixed(1)+'" height="12" rx="2"/>'
   +'<path class="aq-receiving-bench__chars aq-receiving-bench__chars--lot" d="M'+(sx+sw*0.16).toFixed(1)+' '+ly+'H'+(sx+sw*0.54).toFixed(1)+'"/>'
   +'<circle class="aq-receiving-bench__rim" cx="'+bx+'" cy="'+by+'" r="'+r+'"/></g>';
  /* the join: lot box to lot box, with the match tick on it */
  var jx0=ax+r,jx1=bx-r,jy=(ay+by)/2,mx=(jx0+jx1)/2;
  o+='<g class="aq-receiving-bench__join"><path class="aq-receiving-bench__jl" d="M'+jx0+' '+ay+'C'+(jx0+18)+' '+ay+' '+(jx1-18)+' '+by+' '+jx1+' '+by+'"/>'
   +'<circle class="aq-receiving-bench__tk" cx="'+mx+'" cy="'+jy+'" r="9"/><path class="aq-receiving-bench__tick" d="M'+(mx-4)+' '+jy+'L'+(mx-1)+' '+(jy+3)+'L'+(mx+4.5)+' '+(jy-3.5)+'"/></g>';
  o+='<text class="aq-receiving-bench__lab" x="'+ax+'" y="'+(ay+(up?-r-12:r+22))+'" text-anchor="middle">'+e(labA)+'</text>'
   +'<text class="aq-receiving-bench__lab" x="'+bx+'" y="'+(by+(up?-r-12:r+22))+'" text-anchor="middle">'+e(labB)+'</text>';
  return o}
 function tag(x,y,n,key,at){x=+x;y=+y;return '<g class="aq-receiving-bench__tag" data-rb-key="'+key+'" data-sx="'+at[0].toFixed(1)+'" data-sy="'+at[1].toFixed(1)+'"><rect x="'+(x-15)+'" y="'+(y-11)+'" width="30" height="22" rx="2"/><text x="'+x+'" y="'+(y+0.5)+'" text-anchor="middle" dominant-baseline="central">'+n+'</text></g>'}
 var nn=function(i){return (i<9?'0':'')+(i+1)};
 return function(b,H){var C=b.cols||[],R=b.rows||[],F=b.facts||[],id=++uid;
  var labA='Lot marking',labB='Certificate';
  /* desktop figure: bench in iso (scaled 1.45), the pair above it, tags on leaders */
  var B=bench(),k=2,W=640,Hh=500,org=[158,196],P=function(q){var s=isoP(q);return [org[0]+s[0]*k,org[1]+s[1]*k]};
  var tags='',leads='';
  [['t1',[-30,-30]],['t2',[-10,46]],['t3',[-34,-34]],['t4',[34,-34]],['t5',[-36,50]]].forEach(function(t,i){if(i>=R.length)return;var s=P(B.pts[t[0]]),e2=[s[0]+t[1][0],s[1]+t[1][1]];
   leads+='<path class="aq-receiving-bench__tl" data-rb-key="'+(i+1)+'" d="M'+s[0].toFixed(1)+' '+s[1].toFixed(1)+'L'+e2[0].toFixed(1)+' '+(e2[1]+11).toFixed(1)+'"/><circle class="aq-receiving-bench__td" cx="'+s[0].toFixed(1)+'" cy="'+s[1].toFixed(1)+'" r="2"/>';
   tags+=tag(e2[0].toFixed(1),e2[1].toFixed(1),nn(i),i+1,s)});
  var mk=P(B.pts.mark),r=60,ax=330,ay=104,bx=532,by=104;
  var lead='<path class="aq-receiving-bench__ml" d="M'+mk[0].toFixed(1)+' '+mk[1].toFixed(1)+'L'+(ax-r*0.6).toFixed(1)+' '+(ay+r*0.8).toFixed(1)+'"/><circle class="aq-receiving-bench__md" cx="'+mk[0].toFixed(1)+'" cy="'+mk[1].toFixed(1)+'" r="3"/>';
  var fig='<svg class="aq-iso aq-receiving-bench__svg" viewBox="0 0 '+W+' '+Hh+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">'
   +'<g class="aq-receiving-bench__world" transform="translate('+org[0]+' '+org[1]+') scale('+k+')">'+B.inner+'</g>'
   +'<circle class="aq-receiving-bench__spot" cx="0" cy="0" r="30"/><g class="aq-receiving-bench__tags">'+leads+tags+'</g><g class="aq-receiving-bench__mag" data-rb-key="1">'+lead+pair(ax,ay,bx,by,r,labA,labB,id+'d',true)+'</g></svg>';
  var phone='<svg class="aq-receiving-bench__pair" viewBox="0 0 340 176" aria-hidden="true" focusable="false"><g class="aq-receiving-bench__mag">'+pair(80,74,260,74,62,labA,labB,id+'p')+'</g></svg>';
  var tick='<svg class="aq-receiving-bench__ok" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8.5L6.5 12L13 4.5"/></svg>';
  var k2=function(i){return C[i]?'<p class="aq-receiving-bench__k">'+tx(C[i])+'</p>':''};
  var facts=F.length?'<div class="aq-receiving-bench__facts">'+F.map(function(f){return '<p class="aq-receiving-bench__fact"><span class="aq-receiving-bench__fk">'+tx(f.k||'')+'</span><span class="aq-receiving-bench__fv">'+tx(f.v||'')+'</span></p>'}).join('')+'</div>':'';
  var head='<div class="aq-receiving-bench__head" aria-hidden="true"><span>'+tx(C[1]||'')+'</span><span>'+tx(C[2]||'')+'</span></div>';
  var rows=R.map(function(r,i){
   return fli('<li class="aq-receiving-bench__row" data-rb-key="'+(i+1)+'" style="--i:'+i+'">',b,i)
    +'<h3 class="aq-receiving-bench__name"><span class="aq-receiving-bench__n" aria-hidden="true">'+nn(i)+'</span><span>'+tcell(r[0])+'</span></h3>'
    +'<div class="aq-receiving-bench__c">'+k2(1)+'<p>'+tcell(r[1])+'</p></div>'
    +'<div class="aq-receiving-bench__c">'+k2(2)+'<p class="aq-receiving-bench__how">'+tick+'<span>'+tcell(r[2])+'</span></p></div></li>'}).join('');
  return sec(H+'<div class="aq-receiving-bench"><div class="aq-receiving-bench__fig">'+fig+phone+'</div>'
   +'<div class="aq-receiving-bench__sched">'+facts+head+wFold(b,R.length,'<ol class="aq-receiving-bench__list" role="list">'+rows+'</ol>',b.fold_noun||'supplies')+'</div></div>','aq-receiving-bench-sec')}})();
