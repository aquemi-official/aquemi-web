/* Look "title-block" -> TitleBlock (design-system/components/TitleBlock): delivery terms as the title block of a drawing
   sheet. Each row is one ruled zone of the block: a numbered tag and the row's name in the zone's corner, a small
   IsoKit drawing of what the row delivers, the value (choices written "a; b; or c" as signature lines, a value with
   commas on the drawn row as its parts), and the note under the table's note column name. Desktop: the zones form a
   2x2 (an odd last zone spans the row), the sheet closes on a strip repeating the section title over blank number and
   revision fields. Phones: the zones stack inside the column with no frame gutter or zone band, each with its drawing
   beside its name; the strip is dropped.
   Pass 12 round E (audit row 22, concept 256 `256-p12-cmp-documentation-delivery.png`): replaces pdf-anatomy on
   cmp-documentation (pdf-anatomy stays in the library). Taken from the concept: the bookmarked page with its footer
   number boxes, the kickoff-to-ship strip with the document stack before the skid, the archive box with a page inside,
   numbered square tags keyed to the rows. Not copied: its invented values ('[PDF, digital & physical]', '[3 required]',
   'AQ-2026-001'), the ship pictogram, the wordmark and the headline's full stop.
   Fields (a spec block): h, intro, cols [item, how we deliver it, note], rows [{p, v, m, hl, link, link_label}];
   rows[].draw (look-only, optional): "page", "sign", "time" or "box" picks the zone's drawing; otherwise it is guessed
   from the row's name and value (sign for choices, then documents/format, timing/kickoff, retention/archive). */
LOOKS['title-block']=(function(){
 var K=ISO_K,SH=K.eq+' aq-iso__eq--sheet',INK='aq-iso__eq aq-title-block__ink',MK='aq-iso__eq aq-title-block__mark',ACC=K.acc,TH=K.th;
 function svg(b,pts,cls,pad){var bb=isoBounds(pts,pad==null?4:pad);return isoSvg(bb.w,bb.h,b.done('tb',{}),'aq-iso--raised aq-title-block__svg'+(cls?' '+cls:''),{origin:[-bb.x,-bb.y]})}
 /* a page standing in the plane y = v (its face to the viewer), corner folded at the top right */
 function leaf(b,u,v,w,W,H,c,cls){b.poly([[u,v,w],[u+W,v,w],[u+W,v,w+H-c],[u+W-c,v,w+H],[u,v,w+H]],cls||SH);
  return b.poly([[u+W-c,v,w+H],[u+W-c,v,w+H-c],[u+W,v,w+H-c]],TH)}
 var D={
  /* the delivered document: two pages behind, the front page with a header, text lines, a search hit, a ribbon
     bookmark over its top edge and the number and revision boxes in its footer (the same on every page) */
  page:function(){var b=isoB(0,0,0,1),W=36,H=48,c=7,i;
   leaf(b,8,-8,6,W,H,c);leaf(b,4,-4,3,W,H,c);leaf(b,0,0,0,W,H,c);
   b.poly([[4,0,H-9],[11,0,H-9],[11,0,H-5],[4,0,H-5]],INK);b.line([14,0,H-6],[21,0,H-6],TH);b.line([4,0,H-12],[W-4,0,H-12],TH);
   var Lw=[26,28,22,27,18,25];for(i=0;i<Lw.length;i++)b.line([4,0,H-17-i*4],[4+Lw[i],0,H-17-i*4],TH);
   b.poly([[13,0,H-26.6],[24,0,H-26.6],[24,0,H-23.4],[13,0,H-23.4]],ACC+' aq-title-block__hit');
   b.line([4,0,8],[W-4,0,8],TH);b.poly([[4,0,2.5],[13,0,2.5],[13,0,5.5],[4,0,5.5]],ACC);b.poly([[24,0,2.5],[32,0,2.5],[32,0,5.5],[24,0,5.5]],ACC);
   b.poly([[23,0,H+3],[27,0,H+3],[27,0,H-13],[25,0,H-10.5],[23,0,H-13]],MK);
   return svg(b,[[0,0,0],[W,0,0],[0,0,H+3],[W+8,-8,6],[W+8,-8,H+6],[8,-8,H+6]],'is-page')},
  /* signatures: a sheet lying flat with one ruled signature line per choice (each marked x along the plan axes, so it
     reads as an x on screen; none signed) and a seal
     stamp beside it whose imprint lands at the end of the first line */
  sign:function(n){var b=isoB(0,0,0,1),W=60,Dp=42,i,m=Math.max(1,Math.min(4,n||3)),g=(Dp-16)/m;
   b.poly([[0,0,0],[W,0,0],[W,Dp,0],[0,Dp,0]],SH);b.line([6,5,0],[30,5,0],TH);b.line([6,8.5,0],[22,8.5,0],TH);
   for(i=0;i<m;i++){var v=14+g*(i+0.7);b.line([10,v,0],[44,v,0],K.ln+' aq-title-block__sl');b.line([4.8,v-1.9,0],[8,v-1.9,0],TH);b.line([6.4,v-3.5,0],[6.4,v-0.3,0],TH)}
   var st=isoPart('stamp',56,4,0,1,{});b.add(String(st));
   return svg(b,[[0,0,0],[W,0,0],[W,Dp,0],[0,Dp,0],[62,4,22],[48,0,22],[64,10,0]],'is-sign')},
  /* timing: a ruled strip from kickoff (the marker) through the document stack to the skid (PP base, back panel, two
     membrane vessels); the strip is flow up to the documents, plain on to the skid: the papers arrive first */
  time:function(){var b=isoB(0,0,0,1),i,L=130;
   b.poly([[0,0,0],[L,0,0],[L,10,0],[0,10,0]],K.eq+' aq-iso__eq--alt');
   var t='';for(i=10;i<L;i+=10)t+=isoPoly([b.p(i,0,0),b.p(i,3,0)]);b.add(isoPath(t,TH));
   b.line([8,5,0],[44,5,0],'aq-iso__flow aq-iso__flow--line aq-title-block__run');b.line([70,5,0],[80,5,0],K.hid);
   b.box(4.6,4,0,1.6,1.6,22);b.poly([[6.2,4.8,22],[20,4.8,19],[6.2,4.8,15]],MK);
   for(i=0;i<5;i++)b.box(44+i*0.4,-4-i*0.5,i*1.8,26,20,1.8,i===4?SH:K.eq);
   var z=9;for(i=0;i<4;i++)b.line([48,-2+i*4,z],[(i%2?60:66),-2+i*4,z],TH);
   b.add(String(isoPart('ro',82,-6,0,0.42,{})));
   return svg(b,[[0,0,0],[L,0,0],[L,10,0],[0,10,0],[4,4,22],[20,4,22],[82,-6,28],[130,-6,28],[82,12,0],[130,10,0]],'is-time')},
  /* retention: an open archive box, the kept copy standing in it, a label slot on its front */
  box:function(){var b=isoB(0,0,0,1),W=40,Dp=28,H=24;
   b.poly([[0,0,0],[W,0,0],[W,0,H],[0,0,H]],K.eq+' aq-iso__eq--alt');b.poly([[0,0,0],[0,Dp,0],[0,Dp,H],[0,0,H]],K.eq+' aq-iso__eq--alt');
   leaf(b,9,9,4,24,H+8,5);leaf(b,5,14,4,26,H+14,6);
   b.line([9,14,H+12],[22,14,H+12],TH);b.line([9,14,H+8],[26,14,H+8],TH);b.line([9,14,H+4],[19,14,H+4],TH);
   b.poly([[W,0,0],[W,Dp,0],[W,Dp,H],[W,0,H]]);b.poly([[0,Dp,0],[W,Dp,0],[W,Dp,H],[0,Dp,H]]);
   b.poly([[0,0,H],[W,0,H],[W,Dp,H],[0,Dp,H]],K.ln,true);
   b.poly([[12,Dp,H-11],[28,Dp,H-11],[28,Dp,H-5],[12,Dp,H-5]],ACC);b.line([16,Dp,H-8],[24,Dp,H-8],TH);
   return svg(b,[[0,0,0],[W,0,0],[W,Dp,0],[0,Dp,0],[0,0,H],[W,0,H],[5,14,H+20],[31,14,H+20]],'is-box')}};
 function kind(r,many){if(r.draw&&D[r.draw])return r.draw;if(many)return 'sign';var n=(String(r.p||'')+' '+String(r.v||'')).toLowerCase();
  return /retain|retention|archiv|keeps a copy/.test(n)?'box':/timing|kickoff|schedul|before the skid/.test(n)?'time':/sign/.test(n)?'sign':'page'}
 var nn=function(i){return (i<9?'0':'')+(i+1)};
 return function(b,H){var C=b.cols||[],rows=(b.rows||[]).map(function(r){return Array.isArray(r)?{p:r[0],v:r[1],m:r[2]}:r});if(!rows.length)return sec(H);
  var zones=rows.map(function(r,i){var v=String(r.v||''),ch=v.split(/\s*;\s*/),many=ch.length>1,kd=kind(r,many),body;
   if(many)body='<ul class="aq-title-block__sigs" role="list">'+ch.map(function(c,j){c=c.replace(/^or\s+/i,'');return '<li><span class="aq-title-block__sx" aria-hidden="true">×</span><span class="aq-title-block__sv">'+(j===ch.length-1&&j?'<span class="aq-title-block__or">or </span>'+tx(c):tx(c.charAt(0).toUpperCase()+c.slice(1)))+'</span></li>'}).join('')+'</ul>';
   else if(kd==='page'&&/,\s/.test(v)&&v.indexOf('[')<0)body='<ul class="aq-title-block__parts" role="list">'+v.split(/,\s+/).map(function(s){s=s.trim();return '<li>'+tx(s.charAt(0).toUpperCase()+s.slice(1))+'</li>'}).join('')+'</ul>';
   else body='<p class="aq-title-block__v">'+tx(v)+'</p>';
   return '<li class="aq-title-block__zone is-'+kd+(r.hl?' is-hl':'')+'" style="--i:'+i+'">'
    +'<div class="aq-title-block__hd"><span class="aq-title-block__tag" aria-hidden="true">'+nn(i)+'</span><h3 class="aq-title-block__h">'+tx(r.p)+'</h3></div>'
    +'<div class="aq-title-block__fig" aria-hidden="true">'+D[kd](ch.length)+'</div>'
    +'<div class="aq-title-block__bd">'+(C[1]?'<p class="aq-title-block__k">'+tx(C[1])+'</p>':'')+body
    +(r.m?'<div class="aq-title-block__m">'+(C[2]?'<p class="aq-title-block__k">'+tx(C[2])+'</p>':'')+'<p class="aq-title-block__mt">'+tcell(r.m)+'</p></div>':'')
    +(r.link&&wp(r.link)?'<p class="aq-title-block__go">'+wlink(r.link,r.link_label)+'</p>':'')+'</div></li>'}).join('');
  var strip='<div class="aq-title-block__tb" aria-hidden="true"><span class="aq-title-block__tbh">'+tx(b.h||'')+'</span><span>No.</span><span>Rev.</span></div>';
  return sec(H+'<div class="aq-title-block"><div class="aq-title-block__sheet"><ol class="aq-title-block__zones'+(rows.length%2?' is-odd':'')+'" role="list">'+zones+'</ol>'+strip+'</div></div>','aq-title-block-sec')}})();
