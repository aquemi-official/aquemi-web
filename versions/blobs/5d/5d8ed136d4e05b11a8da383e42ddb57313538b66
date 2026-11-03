/* Footer: the brand footer on navy, as the site first drew it. The Limestone logo, one line of description (where we
   design, fabricate and test: the shop location) and the contact line (service and sales numbers and the head office);
   both read CONTACT in core.js, under the pages' placeholder names. Then four sitemap columns in one row, then the legal
   line under a hairline. Phones show the columns two by two.
   A column entry is a page id or page#anchor; it shows only when that page (and block) exists (whas), so the pass 11 pages
   (urs-guide, project-plan, first-system, buying) appear once their files exist, and "Natural health products" (ind-pharma#nhp, DR-017) once
   ind-pharma has its "nhp" block. Privacy, Terms and Accessibility link once their pages exist. */
function wFoot(){var cols=[['Systems',['sys-pw','sys-storage','sys-pretreatment','sys-monitoring']],['Services',['urs-guide','project-plan','svc-design','svc-fabrication','svc-fat-sat','svc-cq','svc-service','svc-upgrades']],['Industries & compliance',['first-system','ind-pharma','ind-pharma#nhp','ind-meddevice','ind-cdmo','compliance','cmp-documentation','cmp-quality']],['Company',['about','projects','careers','news','buying','contact-proposal','contact-service','contact-locations']]],
  label={'ind-pharma#nhp':'Natural health products','buying':'Buying from Aquemi'},legal=[['privacy','Privacy'],['terms','Terms'],['accessibility','Accessibility']];
 return '<footer class="aq-footer"><div class="aq-in"><div class="aq-footer__cols">'
  +'<div class="aq-footer__head"><img class="aq-footer__logo" src="brand/logo-limestone.svg" alt="aquemi"><p class="aq-footer__desc">A modular Purified Water package in polypropylene, for makers of pharmaceuticals, medical devices and natural health products, and for contract manufacturers. Designed, fabricated and tested in '+tx(CONTACT.shop)+'.</p>'
  +'<address class="aq-footer__contact">'+wtel(CONTACT.service,'','Service ')+wtel(CONTACT.sales,'','Sales ')+'<span>'+tx(CONTACT.office)+'</span></address></div>'
  +cols.map(function(c){return '<nav class="aq-footer__col" aria-label="'+e(c[0])+'"><h5 class="aq-footer__colhead">'+e(c[0])+'</h5>'+c[1].filter(whas).map(function(id){return wlink(id,label[id])}).join('')+'</nav>'}).join('')
  +'</div><div class="aq-footer__legal"><span>© 2026 Aquemi <span class="aq-ph">[legal entity name]</span></span><span>'+legal.map(function(l){return wp(l[0])?wlink(l[0],l[1]):e(l[1])}).join(' · ')+'</span></div>'
  +'</div></footer>'}
