/* Closing: the call to action at the end of every page, on the navy band.
   c is the page's cta ({h, body, button, link, intent, include, include_label}); p is the page.
   include: optional checklist of short strings (what to send us, each ≤ 8 words), shown as a compact numbered list under
   the body, so a page's "what to send" docs block can fold into its closing. include_label overrides "What to send us". proof: optional {v, l}, one confirmed figure that evidences what the
   closing asks for (an Aquemi commitment or a test we run). Without it there is no proof box; nothing is taken from the hero.
   returns: optional list of what comes back (each ≤ 8 words: "Sizing note", "Block flow diagram"), shown beside include as
   an exchange: what you send → turnaround → what comes back. returns_label
   overrides "What comes back"; turnaround (a placeholder until confirmed) labels the arrow between the two lists.
   variant: "call" draws the exchange as a phone call (look field; contact-proposal): include is what to have ready,
   turnaround names the line, the button (a tel: link) sits on the pipe, returns is what comes back. */
function wClosing(c,p){if(!c||!c.h)return '';
 var f=c.proof&&c.proof.v?c.proof:null,inc=c.include&&c.include.length?c.include:null,ret=inc&&c.returns&&c.returns.length?c.returns:null;
 /* Each row: index, text; a returned document also carries a drawn sheet (aq-closing__doc, aria-hidden). */
 /* Pass 12 (S3): phones show every item, the send list as a two-column chip grid; an item too long for half the width
    (over 40 characters) takes the whole row (is-wide), and so does a half item that would otherwise sit alone in its
    row (before a wide one, or last), so the grid never has a hole. Desktop ignores the class. */
 var wides=function(items){var w=items.map(function(x){return String(x).length>40}),col=0;
  return w.map(function(on,i){if(on){col=0;return true}if(col===0&&(i===items.length-1||w[i+1])){return true}col=1-col;return false})};
 var list=function(cls,label,items,doc){var W=wides(items);return '<div class="aq-closing__include'+cls+'"><p class="aq-closing__tag">'+tx(label)+'</p><ol>'+items.map(function(x,i){
  return '<li'+(W[i]?' class="is-wide"':'')+'>'+(doc?'<span class="aq-closing__doc" aria-hidden="true"></span>':'')+idx(i)+'<span class="aq-closing__t">'+tx(x)+'</span></li>'}).join('')+'</ol></div>'};
 /* variant "call" (contact-proposal, pass 12): the exchange as a phone call. What to have ready, then the line itself
    (the turnaround names it; the call button rides the pipe instead of standing under the lead), then what comes back.
    Without include and returns it falls back to the plain closing with its button. */
 var call=c.variant==='call'&&inc&&ret,cta=wBtn(c.button||'Request a proposal',c.link||'contact-proposal',null,c.intent);
 var send=inc?list('',c.include_label||'What to send us',inc):'';
 /* Exchange: what you send, the turnaround, what comes back, as two hairline lists on the navy */
 /* Exchange (pass 9): a small process drawn on the navy. The send rows feed a manifold (a bus down their right side), one
    pipe carries them across to the returns' manifold, and the turnaround rides the pipe as its label; each returned row
    is a drawn sheet. The pipe (aq-closing__pipe) is aria-hidden drawing; the turnaround stays real text. */
 /* The turnaround is a chip on the pipe; on phones it reads "Reply within [time]" (the words are hidden on desktop,
    where the pipe already says it). A call puts its button on the pipe, under the line's name. */
 var turn=call?'<div class="aq-closing__turn aq-closing__turn--call"><span class="aq-closing__pipe" aria-hidden="true"><i></i></span><span class="aq-closing__turn-t">'+tx(c.turnaround||'On the line')+'</span><span class="aq-closing__call">'+cta+'</span></div>'
  :'<p class="aq-closing__turn"><span class="aq-closing__pipe" aria-hidden="true"><i></i></span><span class="aq-closing__turn-t">'+(c.turnaround?'<span class="aq-closing__within">Reply within </span>':'')+tx(c.turnaround||'')+'</span></p>';
 var swap=ret?'<div class="aq-closing__plate"><div class="aq-closing__swap'+(call?' aq-closing__swap--call':'')+'">'+send+turn+list(' aq-closing__returns',c.returns_label||'What comes back',ret,1)+'</div></div>':send;
 /* The original closing: one centred headline, lead and button, with the brand mark large and faint, cut by the top-left corner.
    A checklist or exchange, when the page has one, sits below the button under a hairline. */
 return '<section class="aq-section aq-band--navy aq-closing aq-fx-host'+(call?' aq-closing--call':'')+'">'+CLOSE_WATER+MARK_CLOSE+'<div class="aq-in"><div class="aq-closing__frame">'+
  '<h2 class="aq-closing__h">'+tx(c.h)+'</h2>'+
  (c.body?'<p class="aq-lead aq-closing__lead">'+tx(c.body)+'</p>':'')+
  (call?'':'<div class="aq-closing__action">'+cta+'</div>')+
  (swap||f?'<div class="aq-closing__more">'+swap+(f?'<div class="aq-closing__proof"><span class="aq-closing__tag">Proof</span><span class="aq-closing__value">'+tx(f.v)+'</span>'+(f.l?'<span class="aq-closing__label">'+tx(f.l)+'</span>':'')+'</div>':'')+'</div>':'')+
  '</div></div></section>'}
/* The band was water (pass 9b): an FxRipple layer under everything, rings trailing the pointer and a slow drop every
   6.5 s. Retired (owner, 2026-11-05): the closing band is plain navy. To bring it back, set CLOSE_WATER to
   CLOSE_WATER_RETIRED. FxRipple stays in the design system. */
var CLOSE_WATER_RETIRED='<canvas class="aq-fx-shader" data-gl="ripple" data-gl-optional aria-hidden="true"></canvas>';
var CLOSE_WATER='';
/* The brand mark, large and faint, cut by the band's top-left corner (the mark's supplied path, never redrawn). */
var MARK_CLOSE='<svg class="aq-closing__mark" viewBox="0 0 512 512" aria-hidden="true" focusable="false"><path d="M233.32 159.66A73.66 73.66 0 1 1 86.00 159.66A73.66 73.66 0 1 1 233.32 159.66ZM233.32 352.34A73.66 73.66 0 1 1 159.66 278.68A119.03 119.03 0 0 0 278.68 159.66A73.66 73.66 0 1 1 352.34 233.32A119.03 119.03 0 0 0 233.32 352.34ZM426.00 352.34A73.66 73.66 0 1 1 278.68 352.34A73.66 73.66 0 1 1 426.00 352.34Z"/></svg>';
