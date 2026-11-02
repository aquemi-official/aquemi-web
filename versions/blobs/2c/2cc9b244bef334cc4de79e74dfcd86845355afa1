/* Look "approval-merge" -> ApprovalMerge (design-system/components/ApprovalMerge): who prepares and who approves each
   request, drawn as lanes that all merge into one approval. Each request is a row set large on the left; the middle
   holds one lane per preparing party (Aquemi, your side, shared), and each row's preparer is a node on its lane with
   the cell's detail beside it ("Aquemi: system assessment" -> node on the Aquemi lane, "system assessment"). From
   every node a wire runs right; when every row names the same approver, the wires merge into one bus that ends in a
   single stamp with that approver's name, so the page says at a glance that the approval is always yours. If the
   approvers differ, each row ends in its own stamp. A figure in the intro ("15 working days") is set huge beside the
   heading as an aria-hidden echo of the intro.
   Fields as a roles table: h, intro, cols [request, prepared by, approved by], rows, caption_noun, anchor. Parties are
   read as RoleMatrix reads them: a cell starting "Aquemi" is ours, "You"/"Your" yours, anything else shared.
   Pointing at a request (mouse) traces its route in ink: its wire, then the bus down to the stamp (motion.js).
   Phones: the rows stack, the lane chip and the stamp under each request; one merged stamp closes the list. */
LOOKS['approval-merge']=function(b,H){var C=b.cols||[],R=b.rows||[],K='aq-approval-merge';
 var party=function(c){return roleParty(c)},cell=function(c){return String(c&&c.t||c||'')};
 var lanes=['ours','yours','shared'].filter(function(p){return R.some(function(r){return party(r[1])===p})});
 var laneName={ours:'Aquemi',yours:'Your side',shared:'Shared'};
 var ap=R.map(function(r){return cell(r[2])}),one=ap.length&&ap.every(function(a){return a===ap[0]});
 var m=String(b.intro||'').match(/(\d+)\s+(working days|days|weeks|months)/i);
 var hero=m?'<p class="'+K+'__hero" aria-hidden="true"><span class="'+K+'__fig">'+m[1]+'</span><span class="'+K+'__unit">'+e(m[2])+'</span></p>':'';
 var head='<div class="'+K+'__top">'+H+hero+'</div>';
 var lh='<div class="'+K+'__heads" aria-hidden="true"><span class="'+K+'__hk">'+tx(C[0]||'')+'</span><span class="'+K+'__hk '+K+'__hk--prep" style="--lanes:'+lanes.length+'">'
  +lanes.map(function(p){return '<span class="'+K+'__lane-h is-'+p+'">'+laneName[p]+'</span>'}).join('')+'</span><span class="'+K+'__hk '+K+'__hk--appr">'+tx(C[2]||'')+'</span></div>';
 var rows=R.map(function(r,i){var p=party(r[1]),li=lanes.indexOf(p),c=cell(r[1]),k=c.indexOf(':'),who=k>0?c.slice(0,k):c,det=k>0?c.slice(k+1).trim():'';
  return fli('<li class="'+K+'__row" style="--lane:'+(li+1)+';--lanes:'+lanes.length+'">'+idx(i)+'<h3 class="'+K+'__t">'+tcell(r[0])+'</h3>'
   +'<div class="'+K+'__lanes" aria-hidden="true">'+lanes.map(function(q){return '<span class="'+K+'__track is-'+q+'"></span>'}).join('')+'</div>'
   +'<p class="'+K+'__prep is-'+p+'"><span class="'+K+'__k">'+tx(C[1]||'')+'</span><span class="'+K+'__node" aria-hidden="true"></span><span class="'+K+'__who">'+tx(who)+'</span>'+(det?'<span class="'+K+'__det">'+tx(det)+'</span>':'')+'</p>'
   +'<span class="'+K+'__wire" aria-hidden="true"><span class="'+K+'__lit"></span></span>'
   +'<p class="'+K+'__appr'+(one?' is-merged':'')+'"><span class="'+K+'__k">'+tx(C[2]||'')+'</span><span class="'+K+'__stamp">'+tcell(r[2])+'</span></p></li>',b,i)}).join('');
 var bus=one?'<div class="'+K+'__bus" aria-hidden="true"><span class="'+K+'__busline"></span><span class="'+K+'__buslit"></span><span class="'+K+'__big"><span class="'+K+'__bigk">'+tx(C[2]||'')+'</span><span class="'+K+'__bigv">'+tx(ap[0])+'</span></span></div>':'';
 var inner='<div class="'+K+(one?' is-one':'')+'">'+lh+'<div class="'+K+'__body"><ol class="'+K+'__rows" role="list">'+rows+'</ol>'+bus+'</div></div>';
 return sec(head+wFold(b,R.length,inner,b.fold_noun||b.caption_noun||'requests'),K+'-sec')};
