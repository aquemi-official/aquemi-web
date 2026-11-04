/* Look "retrofit-plant" -> RetrofitPlant (design-system/components/RetrofitPlant): common upgrades shown on the running
   plant, drawn the way a retrofit drawing is: existing equipment faint, the new work bold. A navy blueprint sheet
   carries the whole PW plant (IsoKit, the scene shared with look "visit-plan"); under it the upgrades are a tab list
   set large on the left and the picked upgrade's terms on the right (what changes, requalification, site downtime,
   where to start). Picking an upgrade turns the sheet to that retrofit: everything else drops to "existing", the
   stages the upgrade changes light up in flow. The first upgrade is shown (and lit) as rendered.
   Fields as a router table: h, intro, cols [upgrade, what changes, requalification, downtime, start with], rows (the
   last cell {t, link}). parts (optional): one entry per row naming the stage(s) it changes, space-separated (pre,
   gen, tank, loop, uv, toc, panel); a row without parts leaves the whole plant as existing.
   Phones (pass 12, audit svc-upgrades.1): the blueprint stays, rendered 552 px wide and cropped to the column round
   the camera's centre (where the picked upgrade sits), the key plan moved into the crop (CSS, --ky); the tabs become a
   row of numbered 44 px chips (names kept for screen readers; the panel title names the upgrade); one panel, the
   picked one. The small per-card stage drawings (vpMini) are no longer shown. */
var rpN=0;
/* the camera: a rectangle in sheet units framing the picked upgrade's stages (tx, ty, z) and the key-plan window */
function rpCam(r,VW,VH,PW,PH){if(!r)return {tx:0,ty:Math.round((VH-PH)/2),z:1};
 var IW=VW-40,IH=VH-40,z=Math.max(1,Math.min(2.3,IW*0.6/r.w,IH*0.72/r.h)),cx=r.x+r.w/2,cy=r.y+r.h/2,tx=VW/2-z*cx,ty=VH/2-z*cy;
 tx=Math.min(0,Math.max(VW-z*PW,tx));if(z*PH>VH)ty=Math.min(0,Math.max(VH-z*PH,ty));
 return {tx:Math.round(tx),ty:Math.round(ty),z:+z.toFixed(3)}}
LOOKS['retrofit-plant']=function(b,H){var C=b.cols||[],R=b.rows||[],P=b.parts||[],K='aq-retrofit-plant',pl=vpPlant(),S=pl.S,id='rp'+(++rpN);
 var order=pl.order.filter(function(x){var s=String(x);return s.indexOf('data-iso-id="report"')<0});
 var allP=[];Object.keys(S).forEach(function(k){if(k!=='report')allP=allP.concat(S[k].pts)});
 var bx=isoBounds(allP,26),PW=1080,sc=PW/bx.w,PH=Math.round(bx.h*sc+16),org=[-bx.x,-bx.y+8/sc],VW=1080,VH=430;
 var stg=function(i){return String(P[i]||'').split(/\s+/).filter(function(k){return S[k]})};
 /* each row's camera: the bounds of its stages (part ports, padded), in sheet units */
 var cams=R.map(function(r,i){var ks=stg(i),pts=[];ks.forEach(function(k){pts=pts.concat(S[k].pts)});if(!pts.length)return rpCam(null,VW,VH,PW,PH);
  var q=isoBounds(pts,34);return rpCam({x:sc*(q.x+org[0]),y:sc*(q.y+org[1])-10,w:sc*q.w,h:sc*q.h+10},VW,VH,PW,PH)});
 var cam0=rpCam(null,VW,VH,PW,PH),camS=function(c){return 'transform:translate('+c.tx+'px,'+c.ty+'px) scale('+c.z+')'};
 /* key plan: the whole plant small in the corner, the camera's window on it */
 var KW=200,ks=KW/PW,KH=Math.round(PH*ks),kx=26,ky=VH-26-KH-14;
 var win=function(c){var x0=Math.max(0,-c.tx/c.z),x1=Math.min(PW,(VW-c.tx)/c.z),y0=Math.max(0,-c.ty/c.z),y1=Math.min(PH,(VH-c.ty)/c.z);return 'transform:translate('+(x0*ks).toFixed(1)+'px,'+(y0*ks).toFixed(1)+'px) scale('+((x1-x0)*ks).toFixed(1)+','+((y1-y0)*ks).toFixed(1)+')'};
 var on0=String(P[0]||'').split(/\s+/);
 var drawing='<g id="'+id+'-plant" transform="scale('+sc.toFixed(4)+') translate('+org[0].toFixed(1)+' '+org[1].toFixed(1)+')">'+order.join('').replace(/<g class="(aq\-iso__(?:part|pipe)[^"]*)"([^>]*?data-iso-(?:id|to)="([^"]+)")/g,function(m,c,rest,k){return on0.indexOf(k)>=0?'<g class="'+c+' is-lit"'+rest:m})+'</g>';
 var sheet=isoSheet(VW,VH,{grid:'iso',gridStep:22,title:false,m:0,band:8,cols:9,rows:3});
 var clip='<defs><clipPath id="'+id+'-clip"><rect x="8" y="8" width="'+(VW-16)+'" height="'+(VH-16)+'"/></clipPath></defs>';
 var key='<g class="'+K+'__key" transform="translate('+kx+' '+ky+')" style="--ky:'+ky+'px"><rect class="'+K+'__kbox" x="-10" y="-10" width="'+(KW+20)+'" height="'+(KH+34)+'"/>'
  +'<g class="'+K+'__kplant" transform="scale('+ks.toFixed(4)+')"><use href="#'+id+'-plant"/></g>'
  +'<rect class="'+K+'__kwin" x="0" y="0" width="1" height="1" vector-effect="non-scaling-stroke" style="'+win(cams[0])+'"/>'
  +'<text class="aq-iso__sheet-t" x="0" y="'+(KH+14)+'" dominant-baseline="central">KEY PLAN</text></g>';
 var svg='<svg class="aq-iso aq-iso--navy '+K+'__svg is-retro" viewBox="0 0 '+VW+' '+VH+'" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" data-on="'+stg(0).join(' ')+'" data-cam="'+camS(cams[0])+'" data-win="'+win(cams[0])+'" data-cam0="'+camS(cam0)+'" data-win0="'+win(cam0)+'">'+clip+sheet
  +'<g clip-path="url(#'+id+'-clip)"><g class="'+K+'__cam" style="'+camS(cams[0])+'">'+drawing+'</g></g>'+key+'</svg>';
 var legend='<p class="'+K+'__legend" aria-hidden="true"><span class="'+K+'__sw '+K+'__sw--old"></span>Existing<span class="'+K+'__sw '+K+'__sw--new"></span>This upgrade</p>';
 var tabs='<div class="'+K+'__tabs" role="tablist" aria-label="'+e(C[0]||'Upgrade')+'">'+R.map(function(r,i){return '<button type="button" role="tab" class="'+K+'__tab" id="'+id+'-t'+i+'" aria-controls="'+id+'-p'+i+'" aria-selected="'+(i?'false':'true')+'" tabindex="'+(i?'-1':'0')+'" data-on="'+stg(i).join(' ')+'" data-cam="'+camS(cams[i])+'" data-win="'+win(cams[i])+'">'
  +'<span class="'+K+'__tn" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span><span class="'+K+'__tt">'+tcell(r[0])+'</span></button>'}).join('')+'</div>';
 var panels=R.map(function(r,i){var ps=stg(i),mini=ps.length&&S[ps[0]].mini.length?vpMini(S[ps[0]],'aq-iso--navy '+K+'__mini'):'';
  var terms=[1,2,3].filter(function(j){return r[j]!=null&&r[j]!==''}).map(function(j){return '<div class="'+K+'__term '+K+'__term--'+j+'"><dt>'+tx(C[j]||'')+'</dt><dd>'+tcell(r[j])+'</dd></div>'}).join('');
  var go=r[4]?'<p class="'+K+'__go"><span class="'+K+'__gk">'+tx(C[4]||'')+'</span>'+tcell(r[4])+'</p>':'';
  return '<div class="'+K+'__panel'+(i?' is-off':'')+'" role="tabpanel" id="'+id+'-p'+i+'" aria-labelledby="'+id+'-t'+i+'">'+(mini?'<span class="'+K+'__mfig" aria-hidden="true">'+mini+'</span>':'')
   +'<h3 class="'+K+'__pt"><span class="'+K+'__tn" aria-hidden="true">'+(i<9?'0':'')+(i+1)+'</span>'+tcell(r[0])+'</h3><dl class="'+K+'__terms">'+terms+'</dl>'+go+'</div>'}).join('');
 return sec(H+'<div class="'+K+'"><div class="'+K+'__sheet">'+svg+legend+'</div><div class="'+K+'__pick">'+tabs+'<div class="'+K+'__panels">'+panels+'</div></div></div>','aq-band--navy '+K+'-sec')};
/* Tabs: pick an upgrade, light its stages; arrow keys move between tabs */
/* aim the camera and the key-plan window at what the svg's data-cam / data-win say */
function rpAim(s){var c=s.querySelector('.aq-retrofit-plant__cam'),w=s.querySelector('.aq-retrofit-plant__kwin');if(c)c.setAttribute('style',s.getAttribute('data-cam')||'');if(w)w.setAttribute('style',s.getAttribute('data-win')||'')}
(function(){function lit(r,on){var svg=r.querySelector('.aq-retrofit-plant__svg');if(!svg)return;[].forEach.call(svg.querySelectorAll('.is-lit'),function(el){el.classList.remove('is-lit')});
  String(on||'').split(' ').forEach(function(k){if(k)[].forEach.call(svg.querySelectorAll('[data-iso-id="'+k+'"],[data-iso-to="'+k+'"]'),function(el){el.classList.add('is-lit')})})}
 function pick(t){var r=t.closest('.aq-retrofit-plant');[].forEach.call(r.querySelectorAll('.aq-retrofit-plant__tab'),function(x){var on=x===t;x.setAttribute('aria-selected',on?'true':'false');x.tabIndex=on?0:-1;
  var p=document.getElementById(x.getAttribute('aria-controls'));if(p)p.classList.toggle('is-off',!on)});lit(r,t.getAttribute('data-on'));var s=r.querySelector('.aq-retrofit-plant__svg');if(s){s.setAttribute('data-on',t.getAttribute('data-on')||'');s.setAttribute('data-cam',t.getAttribute('data-cam')||'');s.setAttribute('data-win',t.getAttribute('data-win')||'');rpAim(s)}}
 document.addEventListener('click',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-retrofit-plant__tab');if(t)pick(t)});
 document.addEventListener('keydown',function(ev){var t=ev.target.closest&&ev.target.closest('.aq-retrofit-plant__tab');if(!t||['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].indexOf(ev.key)<0)return;
  var a=[].slice.call(t.parentNode.querySelectorAll('.aq-retrofit-plant__tab')),i=a.indexOf(t),n=ev.key==='Home'?0:ev.key==='End'?a.length-1:(i+(/Down|Right/.test(ev.key)?1:a.length-1))%a.length;ev.preventDefault();a[n].focus();pick(a[n])});
})();
