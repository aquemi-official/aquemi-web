/* Look "coverage-map" -> CoverageMap (design-system/components/CoverageMap): a coverage table by region (a router table:
   region, then the columns that answer for it) set as one column per region beside an instrument readout (pass 9b,
   concept contact-locations.2). Three columns to a row on desktop; the readout takes the top right cell: the region in
   hand, its severity 1 on-site time set as the large readout figure (the first column's cell up to " in "; the rest,
   the centres served, sits under it with the column's own label), a round seal stamp naming the CRN body and the
   engineering seal (the acronyms in brackets in the last column, or the body's name when it has none), and the tile map
   of the provinces and territories with that region's tiles lit and the base marked. Each region column: index, the
   region set large and light (a button that puts it on the readout), the tile codes it covers, then each column as a
   labelled field. Pointing at a column, focusing or pressing its name, or pressing a tile on the map puts that region on
   the readout; the choice persists. Every column is always shown: the readout only repeats one.
   Fields, as a table: cols, rows, nav, and
     map: [{c: "ON", n: "Ontario", x: 4, y: 1, r: 0}] one tile per province or territory: code, name, column and row on
          the grid, and r, the index of the row that covers it (no invented places, only the tiles it lists);
     base: {c: "ON", label: "Based in Ontario"} (optional) the tile marked as home, with its label (copy from the page);
          its row is on the readout when the page opens.
   Every tile is a button: a tile with a row puts that row on the readout; a tile without one picks the row named like
   the tile (Quebec), else the row for the rest ("Other provinces and territories", the last row whose label starts
   "Other"); the dashed look of a tile without a row is kept.
   Phones (pass 12, S11): the tile map is the province picker. The readout sheet shows the map (and the stamp, when the
   region has one); under it only the chosen region's column shows (the base row's at first), so the region is never
   read twice and the section is one map and one card. A row of region chips under the map (the row names, 44 px,
   aria-pressed) does what a tile does, so no region hides behind the map; tiles that pick a named row (data-named) get
   a solid edge on phones; a polite status names the chosen region when the readout face is folded.
   Design system: components/CoverageMap. */
(function(){
var covN=0;
function pad(i){return (i<9?'0':'')+(i+1)}
function low(s){return String(s||'').toLowerCase().trim()}
function txt(c){return c&&typeof c==='object'?String(c.t||''):String(c==null?'':c)}
/* the cell's text up to " in " outside a [placeholder]: [time, rest] */
function cut(s){var d=0;for(var i=0;i<s.length;i++){var c=s[i];if(c==='[')d++;else if(c===']'&&d)d--;else if(!d&&s.substr(i,4)===' in ')return [s.slice(0,i),s.slice(i+1)]}return [s,'']}
/* the stamp: "CRN: <body> (ABC). Seal: <body> (DEF) · ..." -> [["CRN","ABC"],["Seal","DEF"]] */
function stamp(s){var o=[];[['CRN','CRN:'],['Seal','Seal:']].forEach(function(k){var i=s.indexOf(k[1]);if(i<0)return;var r=s.slice(i+k[1].length),j=r.search(/\.\s|\s·\s|\.$/);r=(j<0?r:r.slice(0,j)).trim();
 var a=r.match(/\(([^()]+)\)\s*$/);if(r)o.push([k[0],a?a[1]:r])});return o}
LOOKS['coverage-map']=function(b,H){var C=b.cols||[],R=b.rows||[],M=b.map||[],B=b.base||null,k=++covN,nid='cov-'+k+'-now',lid='cov-'+k+'-list';
 var cols=M.reduce(function(a,t){return Math.max(a,(+t.x||0)+1)},1),rws=M.reduce(function(a,t){return Math.max(a,(+t.y||0)+1)},1);
 var on=0;if(B)M.forEach(function(t){if(t.c===B.c&&+t.r>=0&&+t.r<R.length)on=+t.r});
 function lt(i){return +i===on?' is-on':''}
 /* the readout: one face per region, the one in hand shown */
 var faces=R.map(function(r,i){var t=cut(txt(r[1])),st=stamp(txt(r[r.length-1])),codes=M.filter(function(x){return +x.r===i}).map(function(x){return e(x.c)});
  return '<div class="aq-coverage-map__nv'+lt(i)+'" data-r="'+i+'">'
   +'<p class="aq-coverage-map__nh"><span class="aq-coverage-map__ni aq-coverage-map__sc">'+pad(i)+(codes.length&&codes.length<3?' · '+codes.join(' '):'')+'</span><span class="aq-coverage-map__nt">'+tx(txt(r[0]))+'</span></p>'
   +'<div class="aq-coverage-map__nb"><p class="aq-coverage-map__big aq-coverage-map__sc">'+tx(t[0])+'</p>'
   +(st.length?'<p class="aq-coverage-map__stamp">'+st.map(function(x){return '<span><span class="aq-coverage-map__sk">'+tx(x[0])+'</span><span class="aq-coverage-map__sv aq-coverage-map__sc">'+tx(x[1])+'</span></span>'}).join('')+'</p>':'')+'</div>'
   +'<p class="aq-coverage-map__nl">'+tx(C[1]||'')+(t[1]?'<span>'+tx(t[1])+'</span>':'')+'</p></div>'}).join('');
 var other=-1;R.forEach(function(r,i){if(/^other\b/i.test(txt(r[0])))other=i});
 function pick(t){var r=+t.r;if(r>=0&&r<R.length)return r;for(var i=0;i<R.length;i++)if(low(txt(R[i][0]))===low(t.n))return i;return other}
 var tiles=M.map(function(t){var home=B&&B.c===t.c,r=+t.r,has=r>=0&&r<R.length,pk=pick(t);
  return '<button type="button" class="aq-coverage-map__tile'+(home?' is-home':'')+(has&&r===on?' is-on':'')+(pk===on?' is-pick':'')+(has?'':' is-none')+'" style="grid-column:'+((+t.x||0)+1)+';grid-row:'+((+t.y||0)+1)+'" data-r="'+(has?r:'')+'" data-p="'+(pk<0?'':pk)+'"'+(pk>=0&&pk!==other?' data-named':'')+' aria-label="'+e(t.n||t.c)+'" aria-pressed="'+(pk===on?'true':'false')+'" aria-controls="'+nid+' '+lid+'">'
   +'<span class="aq-coverage-map__code" aria-hidden="true">'+e(t.c)+'</span></button>'}).join('');
 /* phones: the regions as chips under the map (the row names), so every region can be found without guessing that a
    tile is pressable; a polite status names the region when the readout face is not shown */
 var chips='<div class="aq-coverage-map__chips" role="group" aria-label="'+e(txt(C[0])||'Regions')+'">'+R.map(function(r,i){return '<button type="button" class="aq-coverage-map__chip" data-p="'+i+'" aria-pressed="'+(i===on?'true':'false')+'" aria-controls="'+lid+'">'+tx(txt(r[0]))+'</button>'}).join('')+'</div>'
  +'<span class="aq-coverage-map__say" role="status"></span>';
 var base=B&&B.label?'<p class="aq-coverage-map__base"><span class="aq-coverage-map__pin" aria-hidden="true"></span>'+tx(B.label)+'</p>':'';
 /* the readout is a survey sheet: faint contour lines drift under it (FxContour, ambient WebGL, aria-hidden) */
 var now='<li class="aq-coverage-map__now aq-fx-host" data-theme="light"><canvas class="aq-fx-shader" data-gl="contour" aria-hidden="true"></canvas>'
  +'<div class="aq-coverage-map__faces" id="'+nid+'" aria-live="polite">'+faces+'</div>'
  +'<div class="aq-coverage-map__grid" role="group" aria-label="'+e(txt(C[0])||'Provinces and territories')+'" style="--cols:'+cols+';--rows:'+rws+'">'+tiles+'</div>'+base+chips+'</li>';
 var list=R.map(function(r,i){var codes=M.filter(function(t){return +t.r===i}).map(function(t){return e(t.c)});
  return '<li class="aq-coverage-map__col'+lt(i)+'" data-r="'+i+'">'
   +'<p class="aq-coverage-map__i" aria-hidden="true">'+pad(i)+'</p>'
   +'<h3 class="aq-coverage-map__t"><button type="button" class="aq-coverage-map__pick" aria-pressed="'+(i===on?'true':'false')+'" aria-controls="'+nid+'">'+tx(txt(r[0]))+'</button></h3>'
   +(codes.length?'<p class="aq-coverage-map__codes" aria-hidden="true">'+codes.map(function(c){return '<span>'+c+'</span>'}).join('')+'</p>':'')
   +'<dl class="aq-coverage-map__dl">'+r.slice(1).map(function(c,j){return '<div><dt>'+tx(C[j+1]||'')+'</dt><dd>'+tcell(c)+'</dd></div>'}).join('')+'</dl></li>'});
 /* the readout takes the third cell (top right on desktop) */
 list.splice(Math.min(2,list.length),0,now);
 return sec(H+'<ol class="aq-coverage-map" id="'+lid+'" role="list">'+list.join('')+'</ol>','aq-coverage-map-sec')};
/* Put a region on the readout: its column, its face and its tiles go on; the wrapper hears 'aqcoverage' (motion) */
function lit(w,r,instant){if(r===''||r==null)return;r=String(r);var cur=w.querySelector('.aq-coverage-map__col.is-on');if(cur&&cur.getAttribute('data-r')===r)return;
 [].forEach.call(w.querySelectorAll('[data-r]'),function(x){x.classList.toggle('is-on',x.getAttribute('data-r')===r)});
 [].forEach.call(w.querySelectorAll('.aq-coverage-map__tile'),function(t){var y=t.getAttribute('data-p')===r;t.classList.toggle('is-pick',y);t.setAttribute('aria-pressed',y?'true':'false')});
 [].forEach.call(w.querySelectorAll('.aq-coverage-map__pick'),function(p){p.setAttribute('aria-pressed',p.closest('[data-r]').getAttribute('data-r')===r?'true':'false')});
 [].forEach.call(w.querySelectorAll('.aq-coverage-map__chip'),function(p){p.setAttribute('aria-pressed',p.getAttribute('data-p')===r?'true':'false')});
 var f=w.querySelector('.aq-coverage-map__faces'),say=w.querySelector('.aq-coverage-map__say'),col=w.querySelector('.aq-coverage-map__col.is-on .aq-coverage-map__pick');
 if(say)say.textContent=f&&!f.offsetWidth&&col?col.textContent:'';
 w.dispatchEvent(new CustomEvent('aqcoverage',{detail:{r:+r,instant:!!instant}}))}
window.AQcoverage=lit;
function at(ev,sel){var x=ev.target.closest&&ev.target.closest(sel);return x&&x.closest('.aq-coverage-map')?x:null}
document.addEventListener('mouseover',function(ev){var c=at(ev,'.aq-coverage-map__col');if(c)lit(c.closest('.aq-coverage-map'),c.getAttribute('data-r'))});
document.addEventListener('focusin',function(ev){var c=at(ev,'.aq-coverage-map__col');if(c)lit(c.closest('.aq-coverage-map'),c.getAttribute('data-r'),true)});
document.addEventListener('click',function(ev){var t=at(ev,'.aq-coverage-map__tile, .aq-coverage-map__pick, .aq-coverage-map__chip');if(!t)return;
 var r=t.hasAttribute('data-p')?t.getAttribute('data-p'):t.closest('[data-r]').getAttribute('data-r');lit(t.closest('.aq-coverage-map'),r,ev.detail===0)});
})();
