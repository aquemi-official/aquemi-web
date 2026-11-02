/* Look "source-skid" -> SourceSkid (design-system/components/SourceSkid): the people you would work with beside the
   package they deliver, with the drawing answering "what do you make and what do you buy" (pass 9b, concept about.1).
   Left: the title and one quiet ruled card per person (number and role, the name line as a nameplate, what to ask
   them, the link). Right: the block's intro (the make-or-buy sentence), then one isometric skid (IsoKit) whose
   numbered callouts split the package the company designs and fabricates (base frame, open frame, PP pipework) from
   the parts that come from their makers (membranes, EDI modules, instruments), in the words of the intro. Pointing
   at, focusing or pressing a callout lights its parts; a maker's part lifts out of the frame; the rest quietens.
   Fields (a grid block): h, intro, items [{t, d, link}], parts [{t, by, part}]. New optional field: parts, the
   callouts; part is one of package, modules, instruments (the drawing's groups); by is the line under the callout's
   name (who makes it, from the intro's words). A grid item's d that opens with a bracketed name line ("[Full name] ·
   [licence]. Ask about ...") shows that line as the card's nameplate. Phones: cards first, then the drawing with its
   numbered pins and the callouts listed under it. */
(function(){
var SS_ANCHOR={package:[236,0,112],modules:[150,66,30],instruments:[214,86,58]};
function ssScene(){
 var o=[],bx=function(x,y,z,w,d,h){return isoPath(isoBoxD([x,y,z],w,d,h),'aq-iso__eq')},post=function(x,y){return bx(x,y,6,5,5,106)};
 var G=function(id){return {id:id,cls:'aq-source-skid__grp'}},frame=function(inner){return '<g class="aq-iso__part aq-source-skid__grp" data-iso-id="package">'+inner+'</g>'};
 /* the package (ours), back half: base frame, back posts and rails */
 o.push(isoPart('skid',0,0,0,1,{w:236,d:96,id:'package',cls:'aq-source-skid__grp'}),frame(post(0,0)+post(231,0)+post(0,91)+bx(0,0,108,236,5,5)+bx(0,0,108,5,96,5)));
 /* membranes in their housings and the EDI modules (makers'), inside the frame */
 var hs=[[22,24,44],[22,24,76]].map(function(p){return isoPipe([p,[p[0]+150,p[1],p[2]]],{r:9,flanges:'ends',caps:true,flow:false,id:'modules',cls:'aq-source-skid__grp'})}).join('');
 o.push('<g class="aq-source-skid__lift" data-grp="modules">'+hs+isoPart('edi',118,66,6,1.15,G('modules'))+'</g>');
 /* instruments (makers'): a transmitter on its post and a pressure gauge on the product line */
 o.push('<g class="aq-source-skid__lift" data-grp="instruments">'+isoPart('analyzer',214,74,6,1.1,G('instruments'))+isoPart('gauge',232,0,99,1.4,G('instruments'))+'</g>');
 /* PP pipework (ours): feed into the first housing, across to the second, down to the EDI, out to the right */
 var P=function(pts,x){x=x||{};x.r=2.6;x.id='package';x.cls='aq-source-skid__grp';return isoPipe(pts,x)};
 o.push(P([[-30,24,44],[22,24,44]],{flanges:'ends'}),P([[172,24,44],[186,24,44],[186,24,76],[172,24,76]]),
  P([[22,24,76],[10,24,76],[10,66,76],[10,66,24],[100,66,24]]),P([[140,66,24],[186,66,24],[186,40,24],[186,40,96],[186,0,96],[270,0,96]],{flanges:'ends'}));
 o.push(frame(post(231,91)+bx(0,91,108,236,5,5)+bx(231,0,108,5,96,5)));
 return o.join('')}
function ssName(d){d=String(d||'');var m=d.match(/^(\[[^\]]*\](?:\s*·\s*\[[^\]]*\])*)\.\s+(.*)$/);return m?[m[1],m[2]]:['',d]}
LOOKS['source-skid']=function(b){var I=b.items||[],Pa=(b.parts||[]).filter(function(p){return SS_ANCHOR[p.part]}),num=function(i){return (i<9?'0':'')+(i+1)};
 var cards=I.map(function(it,i){var n=ssName(it.d),go=it.link&&wp(it.link);
  return '<li class="aq-source-skid__card" style="--i:'+i+'"><p class="aq-source-skid__role"><span class="aq-source-skid__n" aria-hidden="true">'+num(i)+'</span><span>'+tx(it.t)+'</span></p>'
   +(n[0]?'<p class="aq-source-skid__name">'+tx(n[0])+'</p>':'')+(n[1]?'<p class="aq-source-skid__d">'+tx(n[1])+'</p>':'')
   +(go?'<p class="aq-source-skid__go">'+wlink(it.link)+'</p>':'')+'</li>'}).join('');
 var inner=ssScene(),pts=[[-34,-4,-4],[276,100,-4],[-34,-4,118],[276,100,118],[276,0,118],[-34,100,-4]],B=isoBounds(pts,12);
 var W=Math.round(B.w)+150,H=Math.round(B.h),org=[-B.x,-B.y],xr=Math.round(B.w)+16,callX=xr-org[0];
 var leads='',pins='',calls='';
 Pa.forEach(function(p,i){var a=SS_ANCHOR[p.part],s=isoP(a),ty=-org[1]+H*(0.16+0.3*i);
  var en=[callX,ty];leads+='<g class="aq-source-skid__lead" data-grp="'+p.part+'"><path class="aq-source-skid__ll" d="M'+s[0].toFixed(1)+' '+s[1].toFixed(1)+'L'+en[0].toFixed(1)+' '+en[1].toFixed(1)+'"/><circle class="aq-source-skid__ld" cx="'+s[0].toFixed(1)+'" cy="'+s[1].toFixed(1)+'" r="2"/></g>';
  var at=isoPct(en,W,H,org),ps=isoPct(s,W,H,org);
  pins+='<span class="aq-source-skid__pin" data-grp="'+p.part+'" style="left:'+ps.left+';top:'+ps.top+'" aria-hidden="true">'+num(i)+'</span>';
  calls+='<li class="aq-source-skid__call" style="--top:'+at.top+'"><button type="button" class="aq-source-skid__btn" data-grp="'+p.part+'" aria-pressed="false">'
   +'<span class="aq-source-skid__cn" aria-hidden="true">'+num(i)+'</span><span class="aq-source-skid__ct">'+tx(p.t)+'</span>'+(p.by?'<span class="aq-source-skid__by">'+tx(p.by)+'</span>':'')+'</button></li>'});
 var fig='<div class="aq-source-skid__fig"><div class="aq-source-skid__view"><div class="aq-source-skid__plan" style="--pw:'+(W/xr*100).toFixed(1)+'%">'+isoSvg(W,H,inner+leads,'aq-source-skid__svg',{origin:org})+pins+'</div></div>'
  +(calls?'<ol class="aq-source-skid__calls" role="list" style="--x:'+((xr+8)/W*100).toFixed(2)+'%">'+calls+'</ol>':'')+'</div>';
 var head=wSecHead({h:b.h,eyebrow:b.eyebrow});
 return sec('<div class="aq-source-skid"><div class="aq-source-skid__l">'+head+'<ol class="aq-source-skid__cards" role="list">'+cards+'</ol></div>'
  +'<div class="aq-source-skid__r">'+(b.intro?'<p class="aq-lead aq-source-skid__intro">'+tx(b.intro)+'</p>':'')+fig+'</div></div>','aq-source-skid-sec')};
/* Selection: the callout under the pointer or focus, else the pressed one; one group lit, maker parts lift */
function ssSet(w,grp){var f=w.querySelector('.aq-source-skid__fig');if(!f)return;if(grp)f.setAttribute('data-sel',grp);else f.removeAttribute('data-sel');
 [].forEach.call(f.querySelectorAll('.aq-source-skid__grp'),function(g){g.classList.toggle('is-lit',!!grp&&g.getAttribute('data-iso-id')===grp)});
 [].forEach.call(f.querySelectorAll('[data-grp]'),function(g){g.classList.toggle('is-on',!!grp&&g.getAttribute('data-grp')===grp)})}
function ssRest(w){var p=w.querySelector('.aq-source-skid__btn[aria-pressed="true"]');ssSet(w,p?p.getAttribute('data-grp'):null)}
if(typeof document!=='undefined'&&document.addEventListener){
 ['mouseover','focusin'].forEach(function(t){document.addEventListener(t,function(ev){var c=ev.target.closest&&ev.target.closest('.aq-source-skid__btn');if(!c)return;ssSet(c.closest('.aq-source-skid'),c.getAttribute('data-grp'))})});
 ['mouseout','focusout'].forEach(function(t){document.addEventListener(t,function(ev){var c=ev.target.closest&&ev.target.closest('.aq-source-skid__btn');if(!c||(ev.relatedTarget&&c.contains(ev.relatedTarget)))return;ssRest(c.closest('.aq-source-skid'))})});
 document.addEventListener('click',function(ev){var c=ev.target.closest&&ev.target.closest('.aq-source-skid__btn');if(!c)return;var w=c.closest('.aq-source-skid'),on=c.getAttribute('aria-pressed')!=='true';
  [].forEach.call(w.querySelectorAll('.aq-source-skid__btn'),function(x){x.setAttribute('aria-pressed',String(x===c&&on))});ssSet(w,on?c.getAttribute('data-grp'):null)})}
})();
