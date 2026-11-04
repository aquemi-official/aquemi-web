/* Hero */
/* Pages with an equipment drawing in assets/illustrations/<page id>.png (the site loads the lossless .webp copy made by tools/images.py). Adding one is one line: 'page-id': 'what the drawing shows' (its aria-label).
   Used by the Hero figure and by WaterPath stops. */
var ART={
 'sys-pretreatment':'Pretreatment skid: multimedia filter, softener and carbon vessels with feed pump',
 'sys-pw':'Purified Water skid: RO pressure vessels, high-pressure pump and EDI stack',
 'sys-wfi-distillation':'Multi-effect WFI still: five columns, condenser and feed pump on one skid',
 'sys-wfi-membrane':'WFI membrane skid: double-pass RO, EDI, heat exchangers and ultrafilter',
 'sys-pure-steam':'Pure steam generator: evaporator column, separator, preheater and control panel',
 'sys-storage':'Polypropylene storage tank with vent filter, distribution pump, heat exchanger, UV and loop with point-of-use valves',
 'sys-monitoring':'Wall-mounted analyzer panel: TOC and conductivity transmitters, controller and sample line',
 'svc-design':'Skid design: a 3D frame model standing on its P&ID sheet, with scale rule and pencil',
 'svc-fabrication':'Butt-fusion machine joining two polypropylene pipes, with heater plate, facing tool and a finished spool',
 'svc-fat-sat':'Water treatment skid hosed to a wheeled test cart with gauges, flow meter and laptop',
 'svc-service':'Field service kit: open toolbox, wrenches, spare filter cartridge, replacement pump and tri-clamp',
 'svc-upgrades':'Existing storage tank joined to a new skid module by flanged spools, one still on the hoist',
 'svc-cq':'Qualification kit: tabbed protocol binder, checklist clipboard and calibrated temperature probe',
 'ind-pharma':'Mixing vessel for oral liquids and creams, fed from a Purified Water point-of-use valve',
 'ind-biotech':'Jacketed bioprocess vessel with agitator drive, sanitary piping, valves and control box',
 'ind-meddevice':'Washer-disinfector with instrument racks and spray arms, fed by a purified water line',
 'ind-cdmo':'Two-room cleanroom suite with process vessels, a pass-through hatch and a shared water loop',
 'ind-personal-care':'Water treatment skid with cartridge filters, membrane housings and a tank, piped to a mixing vessel with agitator and a bottle filler, a hose reel on the wall',
 'ind-hospital-lab':'Plant room with a membrane skid, pumps and a storage tank, its loop rising to a washer-disinfector and a lab bench sink on the floor above',
 'ind-process':'Membrane skid with filter vessels on a plinth, one pipe teeing to a cabinet, an open rinse tank and a plate-stack unit'
};
/* Width / height of each drawing in ART (the PNG mask's own ratio). On phones the hero's drawing box takes this ratio,
   never taller than 5:4 (ART_R below 1.25 keeps the 5:4 box), so a wide drawing runs the full gutter width with no
   empty band above or below it. A page missing here keeps the 5:4 box. */
var ART_R={'ind-biotech':0.57,'ind-cdmo':1.22,'ind-hospital-lab':1.05,'ind-meddevice':0.91,'ind-personal-care':1.74,'ind-pharma':0.53,'ind-process':1.3,'svc-cq':1.14,'svc-design':1.24,'svc-fabrication':1.15,'svc-fat-sat':1.51,'svc-service':1,'svc-upgrades':1.05,'sys-monitoring':0.69,'sys-pretreatment':1.18,'sys-pure-steam':0.65,'sys-pw':0.93,'sys-storage':1,'sys-wfi-distillation':0.93,'sys-wfi-membrane':0.91};
function artMask(id){var u='url(assets/illustrations/'+id+'.webp)';return '-webkit-mask-image:'+u+';mask-image:'+u}
/* Equipment figure (sys-, svc-, ind- pages with a drawing): the drawing large and dominant, up to four key facts as
   callouts round it, each joined to the drawing by a leader line ending in a dot. Callouts come in two lists: the top
   pair and the bottom pair, so phones can stack them above and below the drawing.
   HERO_AT: the anchor of each slot on the drawing, as fractions of the square drawing box (top left, top right, bottom
   left, bottom right). Every drawing is a centred isometric skid, so the anchors land on equipment.
   Desktop leaders: viewBox 120 x 100 (the figure is 6:5); drawing square x 12-108, y 2-98; callouts 27 % wide and 13 %
   tall in the corners, each with a rule on its drawing side whose inner end starts the leader.
   Phone leaders: viewBox 100 x 80 over the drawing row only (5:4); drawing square x 10-90; leaders start at the inner
   end of the rule under (or over) each callout, on the row's top (or bottom) edge. */
var HERO_AT=[[0.40,0.36],[0.62,0.32],[0.36,0.70],[0.65,0.665]];
function heroLeaders(n,wide){var o='';for(var i=0;i<n;i++){var a=HERO_AT[i],top=i<2,left=i%2===0,x0,y0,x1,y1;
  if(wide){x0=left?32.4:87.6;y0=top?13:87;x1=12+96*a[0];y1=2+96*a[1]}else{x0=left?47:53;y0=top?0:80;x1=10+80*a[0];y1=80*a[1]}
  o+='<line x1="'+x0+'" y1="'+y0+'" x2="'+x1.toFixed(1)+'" y2="'+y1.toFixed(1)+'"/><circle cx="'+x1.toFixed(1)+'" cy="'+y1.toFixed(1)+'" r="'+(wide?0.9:1.1)+'"/><circle class="is-start" cx="'+x0+'" cy="'+y0+'" r="'+(wide?0.6:0.8)+'"/>'}
 return '<svg class="aq-hero__leaders aq-hero__leaders--'+(wide?'wide':'narrow')+'" viewBox="0 0 '+(wide?'120 100':'100 80')+'" preserveAspectRatio="none" aria-hidden="true" focusable="false">'+o+'</svg>'}
/* Phone pins (pass 12, S16): on phones the leaders give way to numbered dots on the drawing, and the callouts follow the
   drawing as numbered rows. Hidden on desktop, aria-hidden (the callouts carry the text).
   Anchors: HERO_AT_P[page] where the generic HERO_AT slot would mark the wrong part (a numbered pin reads as "this part
   is that row"), else HERO_AT; both are fractions of the square drawing box. Desktop leaders keep HERO_AT.
   Placement: the phone box has ratio R (--art-r), the drawing (ratio r, ART_R) sits in it contained and centred, and its
   square box (side = the drawing's longer side) is centred on it, so a pin lands at 50 % + (a - 0.5) x side / box. */
var HERO_AT_P={
 'sys-storage':[[0.40,0.36],[0.115,0.37],[0.62,0.42]],
 'sys-pw':[[0.40,0.36],[0.92,0.47]],
 'sys-pretreatment':[[0.40,0.36],[0.62,0.32],[0.885,0.555],[0.65,0.665]]
};
function heroPins(n,id,R){var at=HERO_AT_P[id]||HERO_AT,r=ART_R[id]||1,w=r>=R?1:r/R,h=r>=R?1/r:1/R,S=Math.max(w,h),o='';
 for(var i=0;i<n;i++){var a=at[i]||HERO_AT[i];o+='<span class="aq-hero__pin" style="left:'+(50+(a[0]-0.5)*S*100).toFixed(1)+'%;top:'+(50+(a[1]-0.5)*S*R*100).toFixed(1)+'%">'+(i+1)+'</span>'}
 return n?'<span class="aq-hero__pins" aria-hidden="true">'+o+'</span>':''}
/* The phone box: the drawing's own ratio, never taller than 5:4; a system page's drawing (hero--mist, pins on it) may
   go down to square, so a near-square drawing runs the full gutter width (S9). */
function heroBoxR(id){var r=ART_R[id];return r?Math.max(r,/^sys-/.test(id)?1:1.25):1.25}
function wHeroFigure(p,facts){var n=facts.length,co=function(f){return '<div class="aq-hero__callout"><dt>'+tx(f.l)+'</dt><dd>'+tx(f.v)+'</dd></div>'},r=ART_R[p.id],R=heroBoxR(p.id);
 return '<figure class="aq-hero__figure"'+(r?' style="--art-r:'+R+'"':'')+'>'
  +(n?'<dl class="aq-hero__callouts aq-hero__callouts--top">'+facts.slice(0,2).map(co).join('')+'</dl>':'')
  +'<div class="aq-hero__art"><span class="aq-illustration" role="img" aria-label="'+e(ART[p.id])+'" style="'+artMask(p.id)+'"></span><span class="aq-hero__scan" aria-hidden="true"></span>'+(n?heroLeaders(n,true)+heroLeaders(n,false)+heroPins(n,p.id,R):'')+'</div>'
  +(n>2?'<dl class="aq-hero__callouts aq-hero__callouts--bottom">'+facts.slice(2,4).map(co).join('')+'</dl>':'')+'</figure>'}
/* Hero sheet (pass 9): a faint drawing-sheet ground behind every hero, aria-hidden: small registration crosses on a
   48 px grid, masked so they gather behind the right-hand figure and fade out before the headline. Pure decoration;
   the pattern lines take the line-strong token at reduced opacity (style.css). */
var HERO_SHEET='<svg class="aq-hero__sheet" aria-hidden="true" focusable="false"><defs><pattern id="aqHeroCross" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 20.5v7M20.5 24h7"/></pattern></defs><rect width="100%" height="100%" fill="url(#aqHeroCross)"/></svg>';
/* Home only (pass 9b): light through water, a faint caustic layer (FxCaustics, ambient WebGL) under the sheet, gathered
   behind the loop drawing and fading out before the headline (mask in style.css). aria-hidden decoration; without
   WebGL the hero is the same page on its surface ground. */
var HERO_WATER='<canvas class="aq-fx-shader" data-gl="caustics" aria-hidden="true"></canvas>';
/* Hub and company pages: an index of the other pages in this page's section, in pages.json order.
   A page whose first section already lists those pages (systems: the seven-families grid) sets "hero_index": false; its hero is then the text stack alone.
   A page alone in its section (projects) lists its own section headings instead; they link only when the block has a nav anchor. */
function heroIndex(p){var sib=W().filter(function(q){return q.section===p.section&&q.id!==p.id}),hub=NAVSECT.filter(function(n){return n[1]===p.id})[0];
 if(sib.length)return {label:hub?p.section+' · '+sib.length+' pages':'Also in '+p.section,aria:hub?'Pages in '+p.section:'Other pages in '+p.section,
  items:sib.map(function(q){return {t:q.nav_label||q.headline,wp:q.id}})};
 var bs=(p.blocks||[]),items=[];bs.forEach(function(b,i){if(b.h&&b.type!=='related'&&items.length<7)items.push({t:b.h,jump:b.nav?jid(b,i):''})});
 return items.length>1?{label:'On this page',aria:'On this page',items:items}:null}
/* System index (opt-in hero field "index"): the hub's child pages as numbered rows at a larger title size. index: true takes the other pages of this page's section (as heroIndex); index: ["sys-pw", …]
   lists those page ids in that order. Overrides hero_index. Returns heroIndex-shaped data with big: true, or null. */
function heroBigIndex(p){var v=p.index,pages=Array.isArray(v)?v.map(wp).filter(Boolean):v===true?W().filter(function(q){return q.section===p.section&&q.id!==p.id}):[];
 return pages.length?{big:true,label:p.section+' index · '+pages.length+' pages',aria:'Pages in '+p.section,items:pages.map(function(q){return {t:q.nav_label||q.headline,wp:q.id}})}:null}
function wHeroIndex(x){var n=x.items.length;
 return '<nav class="aq-hero__index'+(x.big?' aq-hero__index--big':'')+'" aria-label="'+e(x.aria)+'"><p class="aq-hero__index-label">'+e(x.label)+'</p><ol>'+x.items.map(function(it,i){
  var t='<span class="aq-hero__index-t">'+tx(it.t)+'</span>',ic=it.wp&&pageIcon(it.wp)?wIcon(pageIcon(it.wp),'aq-hero__index-ic'):'';
  return '<li>'+(it.wp?'<a class="aq-hero__index-item" href="#'+e(it.wp)+'" data-wp="'+e(it.wp)+'">'+t+ic+'</a>':it.jump?'<a class="aq-hero__index-item" href="#'+e(WP)+'" data-jump="'+e(it.jump)+'">'+t+'</a>':'<span class="aq-hero__index-item">'+t+'</span>')+
   (x.big&&i<n-1?'':'')+'</li>'}).join('')+'</ol></nav>'}
/* Home: fine-line drawing of a figure-eight distribution loop (viewBox 440 x 520). Strokes are currentColor and tokens in style.css.
   Annotations name the loop, its parts and the two USP test chapters at the sensors. No figure is drawn: hero facts are
   Aquemi's own figures and sit in the KeyFacts strip, and a pharmacopoeia limit is never drawn as if it were ours (DR-010).
   No filter: WHO TRS 1033 says filtration should not be used in distribution loops or at take-off points, and the
   drawing has no generation or tank to show one upstream. The heat exchanger is labelled with sys-storage's placeholder,
   "[heat exchanger, standard or option]" (aq-loop__ph, the placeholder's mono), since drawn as standard it would read as
   hot-water sanitization (DR-013). The weight sits on the diagonal: sensors top right, heat exchanger bottom left. */
/* Phones (pass 12): the same loop turned on its side (matrix(0 -1 1 0 0 440): x' = y, y' = 440 - x) in a 515 x 255
   box, so it runs the full gutter width at about 170 px tall; its SVG labels would paint at 7 px there, so the parts
   carry numbered pins (HTML, LOOP_PINS in percent of that box) and the labels move to a 2 x 2 legend under the drawing,
   at reading size, under a caption naming the loop. Both drawings are in the markup; CSS shows one. */
var LOOP_PINS=[[19.6,7.1,'CE · USP <645>'],[28.2,7.1,'TOC · USP <643>'],[68.5,94.1,'[heat exchanger, standard or option]'],[91.1,67.5,'Furthest point of use']];
function wHomeLoop(){
 var arrow=function(x,y,r){return '<path class="aq-loop__arrow" d="M-5,-3.5 L4,0 L-5,3.5 Z" transform="translate('+x+' '+y+') rotate('+r+')"/>'};
 var label=function(x,y,s,a,c){return '<text'+(c?' class="'+c+'"':'')+' x="'+x+'" y="'+y+'"'+(a?' text-anchor="'+a+'"':'')+'>'+e(s)+'</text>'};
 var pipe='<path class="aq-loop__pipe" d="M140,390 A80,80 0 0 0 300,390 L300,340 C300,270 140,230 140,160 L140,110 A80,80 0 0 1 300,110 L300,160 C300,230 140,270 140,340 Z"/>'+
  arrow(220,30,0)+arrow(180,459.3,30)+arrow(275,292,224)+arrow(275,208,136)+
  '<g class="aq-loop__part"><rect x="129" y="354" width="22" height="22"/><line x1="129" y1="354" x2="151" y2="376"/><line x1="151" y1="354" x2="129" y2="376"/>'+
  '<line x1="300" y1="Y1" x2="324" y2="Y1"/><circle cx="336" cy="Y1" r="12"/><line x1="300" y1="Y2" x2="324" y2="Y2"/><circle cx="336" cy="Y2" r="12"/>'+
  '<path d="M220,470 L220,480 M206,480 L206,492 L234,480 L234,492 Z"/></g>';
 /* the sensors sit 34 apart on the wide drawing, 44 apart on the phone one so their pins do not touch */
 var sensors=function(a,b){return pipe.replace(/Y1/g,a).replace(/Y2/g,b)};
 var phone='<div class="aq-loop__phone"><p class="aq-loop__cap">Distribution loop · PP</p><div class="aq-loop__band">'+
  '<svg class="aq-loop__svg aq-loop__svg--narrow" viewBox="12 86 515 255" aria-hidden="true" focusable="false"><g transform="matrix(0 -1 1 0 0 440)">'+sensors(113,157)+'</g></svg>'+
  LOOP_PINS.map(function(q,i){return '<span class="aq-hero__pin" style="left:'+q[0]+'%;top:'+q[1]+'%">'+(i+1)+'</span>'}).join('')+'</div>'+
  '<ol class="aq-loop__legend">'+LOOP_PINS.map(function(q,i){return '<li><span class="aq-hero__pin">'+(i+1)+'</span><span>'+tx(q[2])+'</span></li>'}).join('')+'</ol></div>';
 return '<figure class="aq-hero__loop" role="img" aria-label="Line drawing of a figure-eight distribution loop: a heat exchanger on the loop, standard or option still to be confirmed, conductivity and TOC sensors on the return, a valve at the furthest point of use, and flow arrows.">'+
 '<svg class="aq-loop__svg aq-loop__svg--wide" viewBox="0 0 440 520" aria-hidden="true" focusable="false">'+sensors(118,152)+
 '<g class="aq-loop__lead"><line x1="108" y1="365" x2="126" y2="365"/></g>'+
 '<g class="aq-loop__text">'+label(0,14,'Distribution loop · PP')+
  '<text class="aq-loop__tag" x="336" y="121" text-anchor="middle">CE</text><text class="aq-loop__tag" x="336" y="155" text-anchor="middle">TOC</text>'+
  label(352,122,'USP <645>')+label(352,156,'USP <643>')+
  label(104,362,'[heat exchanger,','end','aq-loop__ph')+label(104,374,'standard or option]','end','aq-loop__ph')+
  label(244,483,'Furthest point of use')+
 '</g></svg>'+phone+'</figure>'}
/* Drawn figure (opt-in hero field "figure", pages with no equipment drawing): a quiet line-art device in a 6:5 area
   on surface (no frame), always aria-hidden; the headline and lead carry the meaning.
   - {"spots": ["ro-skid", "storage-tank", "pure-steam-generator"], "label": "…"}: 2-4 Spot vignettes (an Icon name
     falls back to the icon) set out in a zig-zag and joined along their bases by one drawn flow pipe ending in an arrow,
     each tagged 01, 02 … with its name. An entry may be {"spot": "pid", "t": "Design"} to name it.
   - {"plate": "binder", "label": "Turnover package", "items": [...], "foot": "…"}: a stack of folders, divider tabs
     numbered, the front folder holding the index (items, at most 6).
   - {"plate": "stamp", "label": "Released", "title": "…", "sub": "QA", "items": [...]}: a release record (items = its
     checked rows) closed by a status line: a flow tick and the label, "Signed · <sub>" beside it.
   - {"plate": "route", "stops": ["Your request", "Engineer review", "Written reply"]}: one route from a start node
     through three numbered stops to an arrow.
   Geometry is in percent of the 6:5 frame; line work in an SVG viewBox 120 x 100 (non-scaling strokes).
   SPOT_NAME: the tag each spot gets when the entry names none. Reverse osmosis and electrodeionization are spelled out:
   the tag may be the only place a page names that equipment (projects). A page that wants the short form names the
   entry itself: {"spot": "ro-skid", "t": "RO skid"}. "Electrodeionization" carries a soft hyphen, so a narrow tag
   breaks it "Electro-deionization" rather than running past its width. */
var SPOT_NAME={'ro-skid':'Reverse osmosis skid','edi-stack':'Electro\u00addeionization stack','pure-steam-generator':'Pure steam generator','storage-tank':'Storage tank','heat-exchanger':'Heat exchanger','uv-ozone':'UV',pid:'P&ID',edi:'Electro\u00addeionization',toc:'TOC',uv:'UV','ro-membrane':'Reverse osmosis membrane','carbon-filter':'Carbon filter','pure-steam':'Pure steam'};
var SPOT_AT={2:[[30,46,40],[72,58,40]],3:[[19,58,36],[50,38,36],[81,58,36]],4:[[16,42,27],[39,60,27],[62,42,27],[85,60,27]]};
function spotName(n){return SPOT_NAME[n]||(n.charAt(0).toUpperCase()+n.slice(1).replace(/-/g,' '))}
function heroFrame(kind,inner,label){return '<figure class="aq-hero__drawn aq-hero__drawn--'+kind+'" aria-hidden="true">'+(label?'<span class="aq-hero__drawn-label">'+tx(label)+'</span>':'')+inner+'</figure>'}
function wHeroSpots(f){var sp=(f.spots||[]).map(function(s){return typeof s==='string'?{spot:s}:s}).filter(function(s){return s&&isVig(s.spot)}).slice(0,4),n=sp.length;if(n<2)return '';
 var at=SPOT_AT[n],pts=at.map(function(a){return [a[0]*1.2,a[1]+a[2]*0.6*0.86]}),d='M2,'+pts[0][1].toFixed(1)+' H'+pts[0][0].toFixed(1),dots='';
 for(var i=1;i<n;i++){var m=((pts[i-1][0]+pts[i][0])/2).toFixed(1);d+=' H'+m+' V'+pts[i][1].toFixed(1)+' H'+pts[i][0].toFixed(1)}
 d+=' H114';pts.forEach(function(q){dots+='<circle cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="1.1"/>'});
 var y=pts[n-1][1].toFixed(1),svg='<svg class="aq-hero__pipe" viewBox="0 0 120 100" preserveAspectRatio="none" focusable="false"><path class="aq-hero__pipe-run" d="'+d+'"/><path class="aq-hero__pipe-arrow" d="M113,'+(+y-2.2).toFixed(1)+' L118,'+y+' L113,'+(+y+2.2).toFixed(1)+' Z"/>'+dots+'</svg>';
 /* A tag hangs under its vignette. Where the pipe drops from this base to a lower neighbour, the riser (at the midpoint
    between the two) runs down beside the tag, so the tag is kept inside that gap with 1.5 % clear: --tw, a share of
    the vignette's width, caps the tag's own max-width (style.css). A long name then wraps instead of covering the pipe. */
 function tw(i){var a=at[i],lim=[];if(i>0&&pts[i-1][1]>pts[i][1])lim.push(a[0]-(pts[i-1][0]+pts[i][0])/2.4);if(i<n-1&&pts[i+1][1]>pts[i][1])lim.push((pts[i][0]+pts[i+1][0])/2.4-a[0]);
  return lim.length?';--tw:'+Math.floor((2*Math.min.apply(null,lim)-1.5)/a[2]*100)+'%':''}
 var cells=sp.map(function(s,i){var a=at[i],pos='left:'+a[0]+'%;top:'+a[1]+'%;--w:'+a[2]+'%'+tw(i);
  return '<span class="aq-hero__vig" style="'+pos+'">'+wSpot(s.spot,'l','aq-spot--muted')+'<span class="aq-hero__vig-t"><b>'+(i<9?'0':'')+(i+1)+'</b> '+tx(s.t||spotName(s.spot))+'</span></span>'}).join('');
 return heroFrame('spots',svg+cells,f.label)}
function wHeroBinder(f){var it=(f.items||[]).slice(0,6),k=Math.max(3,Math.min(4,it.length||3)),back='';
 for(var i=k-1;i>0;i--)back+='<span class="aq-hero__folder" style="--k:'+i+'"><span class="aq-hero__folder-tab">'+(i<9?'0':'')+(i+1)+'</span></span>';
 var list=it.map(function(t,i){return '<li><b>'+(i<9?'0':'')+(i+1)+'</b><span>'+tx(t)+'</span></li>'}).join('');
 return heroFrame('binder','<div class="aq-hero__binder">'+back+'<div class="aq-hero__folder is-front" style="--k:0"><span class="aq-hero__folder-tab">01</span><div class="aq-hero__folder-body">'
  +'<div class="aq-hero__folder-head"><span class="aq-hero__folder-n">'+tx(f.label||'Turnover package')+'</span>'+(isIcon('binder')?wIcon('binder'):'')+'</div>'
  +(list?'<ol class="aq-hero__folder-list">'+list+'</ol>':'')+(f.foot?'<span class="aq-hero__folder-foot">'+tx(f.foot)+'</span>':'')+'</div></div></div>')}
function wHeroStamp(f){var it=(f.items||['Inspection','Test','Documents']).slice(0,4);
 var tick='<svg viewBox="0 0 16 16" focusable="false"><path d="M3,8.5 L6.5,12 L13,4.5"/></svg>';
 var rec='<div class="aq-hero__record"><span class="aq-hero__record-h">'+tx(f.title||'Release record')+'</span><ul>'+it.map(function(t){return '<li><span>'+tx(t)+'</span><i></i></li>'}).join('')+'</ul>'
  +'<div class="aq-hero__record-foot"><span class="aq-hero__record-status">'+tick+tx(f.label||'Released')+'</span><span class="aq-hero__record-sign">Signed · '+tx(f.sub||'QA')+'</span></div></div>';
 return heroFrame('stamp',rec,f.caption)}
function wHeroRoute(f){var st=(f.stops||['Request','Review','Reply']).slice(0,3),P=[[22,30],[52,58],[84,32]];
 var d='M3,12 H'+(P[0][0]*1.2).toFixed(1)+' V'+P[0][1]+' V'+P[1][1]+' H'+(P[1][0]*1.2).toFixed(1)+' H'+(P[2][0]*1.2-14).toFixed(1)+' V'+P[2][1]+' H'+(P[2][0]*1.2).toFixed(1)+' V84 H115';
 var svg='<svg class="aq-hero__route" viewBox="0 0 120 100" preserveAspectRatio="none" focusable="false"><path class="aq-hero__route-guide" d="M3,92 H117"/><path class="aq-hero__route-run" d="'+d+'"/><circle class="aq-hero__route-start" cx="3" cy="12" r="1.6"/><path class="aq-hero__route-arrow" d="M113,81.6 L118,84 L113,86.4 Z"/></svg>';
 var stops=st.map(function(t,i){return '<span class="aq-hero__stop aq-hero__stop--'+['r','b','t'][i]+'" style="left:'+P[i][0]+'%;top:'+P[i][1]+'%"><b>'+(i+1)+'</b><span>'+tx(t)+'</span></span>'}).join('');
 return heroFrame('route',svg+stops,f.label)}
function wHeroDrawn(f){if(!f||typeof f!=='object')return '';return f.spots?wHeroSpots(f):f.plate==='binder'?wHeroBinder(f):f.plate==='stamp'?wHeroStamp(f):f.plate==='route'?wHeroRoute(f):''}
/* figure.look (pass 12 round B): a hub page's drawn scene with its keyed index (HeroScene.js); it wins over the other
   figure kinds and over index / hero_index, so a scene whose key cannot be built falls back to them. */
function wHero(p){var home=p.id==='home',art=!!ART[p.id]&&!home,detail=/^sys-|^svc-|^ind-/.test(p.id),scene=home||art||!p.figure||!p.figure.look?'':wHeroScene(p),drawn=home||art?'':scene||wHeroDrawn(p.figure),idx=home||detail||drawn?null:p.index?heroBigIndex(p):p.hero_index!==false?heroIndex(p):null;
 var left='<div class="aq-stack">'+(p.eyebrow?'<span class="aq-eyebrow">'+tx(p.eyebrow)+'</span>':'')+'<h1 class="'+(home?'aq-display-xl':'aq-display')+'">'+tx(p.headline)+'</h1>'+(p.lead?'<p class="aq-lead">'+tx(p.lead)+'</p>':'')+
  '<div class="aq-hero__actions">'+(p.primary_cta?wBtn(p.primary_cta,ctaLink(p),null,p.primary_cta_intent):'')+(p.secondary_cta&&p.secondary_cta.label?wBtn(p.secondary_cta.label,p.secondary_cta.link||'systems','link',p.secondary_cta.intent):'')+'</div>'+
  (p.tags&&p.tags.length?'<div class="aq-tags">'+p.tags.map(function(t){return '<span class="aq-tag">'+tx(t)+'</span>'}).join('')+'</div>':'')+'</div>';
 /* Callouts round the drawing only on sys-* pages, where each fact is a figure of the drawn module (a design value,
    guarantee or capacity, "what, where · basis", DR-010); service and industry pages keep their facts in the KeyFacts
    strip under the drawing. */
 var all=p.facts||[],co=art&&/^sys-/.test(p.id),callouts=co?all.slice(0,4):[],rest=co?all.slice(4):all;
 var right=home?wHomeLoop():art?wHeroFigure(p,callouts):drawn?drawn:detail?'<div class="aq-photo" role="img" aria-label="Photograph placeholder">[Photograph: '+e(p.nav_label||p.headline)+' · cool even light]</div>':idx?wHeroIndex(idx):'';
 var mod=home?' aq-hero__grid--loop':art?' aq-hero__grid--figure':scene?' aq-hero__grid--figure aq-hero__grid--scene':drawn?' aq-hero__grid--figure aq-hero__grid--drawn':idx?' aq-hero__grid--index'+(idx.big?' aq-hero__grid--big-index':''):'';
 return '<section class="aq-hero'+(home?' aq-hero--home aq-fx-host':'')+(co?' aq-hero--mist':'')+'" data-hero="'+e(p.id)+'">'+(home?HERO_WATER:'')+HERO_SHEET+'<div class="aq-in">'+(right?'<div class="aq-hero__grid'+mod+'">'+left+right+'</div>':left)+wKeyFacts(rest)+'</div></section>'}
