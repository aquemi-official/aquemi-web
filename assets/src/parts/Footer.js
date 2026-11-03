/* Footer: the brand footer on navy, as the site first drew it. The Limestone logo, one line of description (the package,
   the plants it serves, and where we design, fabricate and test: the shop location) and the contact line (service and
   sales numbers and the head office); both read CONTACT in core.js, under the pages' placeholder names. Then four sitemap
   columns in one row, then the legal line under a hairline. Phones show the columns two by two.
   The footer is its own sitemap, separate from the header menu (NAVMENU): every page, grouped in four columns.
   A column entry is a page id or page#anchor; it shows only when that page (and block) exists (whas), so a page appears
   once its file exists and "Natural health products" (ind-pharma#nhp) once ind-pharma has its "nhp" block. Labels are
   each page's nav_label (projects reads "Applications", news "Technical notes"), with two overrides below.
   Privacy, Terms and Accessibility link once their pages exist.
   Phones (pass 12 C, G-C1/F1): at 600 px and under each column is a disclosure: a 48 px head button (aria-expanded,
   aria-controls) over its links, Company open at first, the others closed; above 600 px the button is not shown, the
   column name is a plain heading and every column is open. One delegated click handler for the whole site. */
function wFoot(){var cols=[['Systems & compliance',['sys-pw','sys-storage','sys-pretreatment','sys-monitoring','compliance','cmp-documentation','cmp-quality']],['Services',['urs-guide','project-plan','svc-design','svc-fabrication','svc-fat-sat','svc-cq','svc-service','svc-upgrades']],['Industries',['first-system','ind-pharma','ind-pharma#nhp','ind-cdmo','ind-meddevice','ind-hospital-lab','ind-personal-care','ind-process']],['Company',['about','projects','buying','news','careers','contact-proposal','contact-service','contact-locations']]],
  label={'ind-pharma#nhp':'Natural health products','buying':'Buying from Aquemi'},legal=[['privacy','Privacy'],['terms','Terms'],['accessibility','Accessibility']];
 return '<footer class="aq-footer"><div class="aq-in"><div class="aq-footer__cols">'
  +'<div class="aq-footer__head"><img class="aq-footer__logo" src="brand/logo-limestone.svg" alt="aquemi"><p class="aq-footer__desc">A modular Purified Water package in polypropylene with PVC pretreatment, for drug, device, personal care, hospital, laboratory and process plants. Designed, fabricated and tested in '+tx(CONTACT.shop)+'.</p>'
  +'<address class="aq-footer__contact">'+wtel(CONTACT.service,'','Service ')+wtel(CONTACT.sales,'','Sales ')+'<span>'+tx(CONTACT.office)+'</span></address></div>'
  +cols.map(function(c,i){var open=i===cols.length-1,id='wfoot-'+i;return '<nav class="aq-footer__col'+(open?' is-open':'')+'" aria-label="'+e(c[0])+'"><h5 class="aq-footer__colhead"><span class="aq-footer__colname">'+e(c[0])+'</span>'
   +'<button type="button" class="aq-footer__toggle" aria-expanded="'+open+'" aria-controls="'+id+'">'+e(c[0])+'<span class="aq-phone-kit__chev" aria-hidden="true"></span></button></h5>'
   +'<div class="aq-footer__links" id="'+id+'">'+c[1].filter(whas).map(function(id){return wlink(id,label[id])}).join('')+'</div></nav>'}).join('')
  +'</div><div class="aq-footer__legal"><span>© 2026 Aquemi <span class="aq-ph">[legal entity name]</span></span><span>'+legal.map(function(l){return wp(l[0])?wlink(l[0],l[1]):e(l[1])}).join(' · ')+'</span></div>'
  +'</div></footer>'}
if(typeof document!=='undefined')document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('.aq-footer__toggle');if(!b)return;
 var on=b.getAttribute('aria-expanded')!=='true',c=b.closest('.aq-footer__col');b.setAttribute('aria-expanded',String(on));if(c)c.classList.toggle('is-open',on)});
