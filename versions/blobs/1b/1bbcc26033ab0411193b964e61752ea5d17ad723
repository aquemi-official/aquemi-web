/* Button: the hero's primary and secondary links (kind "link"), the closing, the contact routes, FAQ links and form
   notes all use it.
   link: a page id, "page#anchor" (opens that page at the block with that anchor; page.js), "#anchor" (scrolls to that
   block on this page) or "tel:<number>" (a call, below). intent (optional): option labels, "|"-separated, that the
   linked page's EnquiryForm ticks on arrival (data-intent). An in-page "#anchor" carries it too: the jump ticks those
   options on the form in the block it lands on, in place, the visitor's other answers kept (wTick, parts/EnquiryForm.js;
   page.js). A tel: link carries none.
   Call (link "tel:[sales phone number]"): the number follows wnum in core.js, the rule the NavBar and Footer numbers use
   (wtel). Once it is confirmed (no [square brackets]) the button dials it, its digit groups kept on one line, with no
   arrow (it opens no page); until then the label shows as plain text with the placeholder (aq-btn--pending), never a
   link. The label names the number ("Call [sales phone number]"); a label that leaves it out gets it added.
   Email (link "mailto:<address>"): opens the visitor's mail app, no arrow and no intent. */
function wBtn(label,link,kind,intent){if(/^tel:/i.test(link||''))return wCall(label,link.slice(4),kind);
 if(/^mailto:/i.test(link||''))return '<a class="aq-btn aq-btn--'+(kind||'primary')+'" href="'+e(link)+'">'+tx(label)+'</a>';
 var j=link&&link.charAt(0)==='#';return '<a class="aq-btn aq-btn--'+(kind||'primary')+'" href="#'+e(j?WP:(link||'contact-proposal'))+'" '+(j?'data-jump="'+e(link.slice(1)):'data-wp="'+e(link||'contact-proposal'))+'"'+(intent?' data-intent="'+e(intent)+'"':'')+'>'+tx(label)+(kind==='secondary'?'':' <span class="aq-btn__arrow">→</span>')+'</a>'}
function wCall(label,num,kind){num=String(num||'').trim();label=String(label||'');var n=wnum(num),s=tx(num),t=tx(label.indexOf(num)<0?(label?label+' ':'')+num:label);
 return n?'<a class="aq-btn aq-btn--'+(kind||'primary')+'" href="tel:'+e(n)+'">'+t.split(s).join(s.replace(/ /g,'\u00a0'))+'</a>':'<span class="aq-btn aq-btn--pending">'+t+'</span>'}
