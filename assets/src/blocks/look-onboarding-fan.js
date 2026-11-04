/* Look "onboarding-fan" -> OnboardingFan (design-system/components/OnboardingFan): a supplier-onboarding set as an
   open folder with one tabbed paper fanned out of it per item (pass 12 build E, concept 255, audit row 32,
   buying#onboarding). Each paper: a tab at its own cut along the top edge carrying the item's filing code (key items'
   tabs edged in flow), the title (a link when the item has one), what the paper is, and a status-stamp slot: a dashed
   rubber-stamp outline holding the item's status, which is its [placeholder] until Aquemi supplies it.
   The concept's numbered step captions over the fan are invented and not used: the papers are the block's items.
   Status: the first [placeholder] in the item's d is lifted into the stamp; what is left of d (less a leading
   "Status:" and the colon before the placeholder) stays on the paper. An item with no placeholder puts its whole d in
   the stamp (its d is its status, e.g. "Your form completed, or our questionnaire pack"); once filled in, "Status: x.
   Rest" and "What it is: x" split the same way (ofSplit).
   Fields (a docs block): h, intro, items [{t, d, code, key, link, intent}]. Codes come from the DocList lookup
   (docCode) unless the item names its own. Wide: one fan of n papers (two fans, 4 + 3, under a 1,100 px container);
   phones (640 and under): the folder holds compact rows, tab chip and title over the stamp, with a small fan of tab
   tops showing above the folder's lip. */
(function(){
function ofTrim(s){return s.replace(/^[\s.:;,]+/,'').replace(/[\s:;,]+$/,'')}
function ofSplit(d){d=String(d||'');var m=d.match(/\[[^\[\]]+\]/);
 /* filled in (no placeholder left): "Status: x. Rest" or "What it is: x" keep the same split */
 if(!m){var s=d.match(/^Status:\s*([^.]+)\.?\s*([\s\S]*)$/i);if(s)return {s:s[1],b:ofTrim(s[2])};
  var c=d.lastIndexOf(': ');return c>0?{s:ofTrim(d.slice(c+2)),b:ofTrim(d.slice(0,c))}:{s:d,b:''}}
 return {s:m[0],b:ofTrim(d.slice(0,m.index).replace(/\bStatus:\s*$/i,'')+d.slice(m.index+m[0].length))}}
LOOKS['onboarding-fan']=function(b,H){
 var items=(b.items||[]).map(function(x){return typeof x==='string'?{t:x}:x}),n=items.length,mid=(n-1)/2;
 /* two fans under 1,100 px: the first ceil(n/2) papers, then the rest; each paper knows its place in both */
 var h1=Math.ceil(n/2);
 var li=items.map(function(x,i){var t=String(x.t||''),c=x.code||docCode(t)[0],p=ofSplit(x.d);
  var r2=i<h1?i:i-h1,m2=((i<h1?h1:n-h1)-1)/2;
  var name=x.link&&wp(x.link)?wlink(x.link,t,x.intent):tx(t);
  var st='--i:'+i+';--o:'+(i-mid).toFixed(2)+';--o2:'+(r2-m2).toFixed(2)+';--t:'+(n>1?(i/(n-1)).toFixed(3):0)+';--t2:'+(r2/Math.max(1,(i<h1?h1:n-h1)-1)).toFixed(3);
  return '<li class="aq-onboarding-fan__paper'+(x.key?' is-key':'')+(i===h1?' is-row2':'')+'" style="'+st+'" data-theme="light" data-paper>'
   +'<span class="aq-onboarding-fan__tab"><span class="aq-onboarding-fan__code">'+e(c)+'</span></span>'
   +'<h3 class="aq-onboarding-fan__t">'+name+'</h3>'
   +(p.b?'<p class="aq-onboarding-fan__d">'+tx(p.b)+'</p>':'')
   +(p.s?'<p class="aq-onboarding-fan__stamp"><span class="aq-onboarding-fan__sk">Status<span class="aq-onboarding-fan__sr">: </span></span><span class="aq-onboarding-fan__sv">'+tx(p.s)+'</span></p>':'')
   +'</li>'}).join('');
 var crown='<span class="aq-onboarding-fan__crown" aria-hidden="true" data-theme="light" data-paper>'+items.map(function(x,i){return '<i'+(x.key?' class="is-key"':'')+' style="--o:'+(i-mid).toFixed(2)+';--t:'+(n>1?(i/(n-1)).toFixed(3):0)+'"></i>'}).join('')+'</span>';
 return sec(H+'<div class="aq-onboarding-fan" style="--n:'+n+';--n1:'+h1+'">'+crown
  +'<span class="aq-onboarding-fan__back" aria-hidden="true" data-theme="light" data-paper></span>'
  +'<ol class="aq-onboarding-fan__papers" role="list">'+li+'</ol>'
  +'<span class="aq-onboarding-fan__front" aria-hidden="true" data-theme="light" data-paper></span></div>','aq-onboarding-fan-sec')};
})();
