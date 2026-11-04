/* EnquiryForm pre-set: tick the options named by the linking button's intent (WINTENT) and show the conditional fields they open,
   with the same cascade rule as the change handler below (a tick inside a hidden field does not count). Sets f._show and f._on. */
function wPreset(fs){var pre=WINTENT?WINTENT.split('|'):[];
 function ticks(f){return f._show&&(f.kind==='radio'||f.kind==='checkbox-group')?(f.options||[]).filter(function(o){return pre.indexOf(o)>=0}).slice(0,f.kind==='radio'?1:99):[]}
 fs.forEach(function(f){f._show=!f.when});
 for(var k=0;k<3&&pre.length;k++){var on=[];fs.forEach(function(f){on=on.concat(ticks(f))});fs.forEach(function(f){if(f.when)f._show=f.when.split('|').some(function(v){return on.indexOf(v)>=0})})}
 fs.forEach(function(f){f._on=ticks(f)})}
/* In-page pre-set: a jump within the page (Button "#anchor", page.js) whose link carries an intent ticks those options on
   the form in the block it jumps to, as wPreset does for a form reached from another page: only in fields showing (a
   tick inside a hidden conditional field does not count; three passes cover two levels of follow-ups), the first
   matching option of a radio. Each tick fires "change", so conditional fields, the required count and any error line
   follow as if the visitor had ticked it; the visitor's other answers stay. A stepped form whose open step comes after
   the first option ticked goes back to that step, as Back does (no check, the step marker slides). */
function wTick(sc,intent){var pre=String(intent||'').split('|').filter(Boolean);if(!sc||!pre.length)return;
 [].forEach.call(sc.querySelectorAll('form.wform'),function(fm){var first=null,one={};
  for(var k=0;k<3;k++)[].forEach.call(fm.querySelectorAll('input[type="radio"],input[type="checkbox"]'),function(x){var w=x.closest('[data-when]');
   if(w&&w.hidden||pre.indexOf(x.value)<0||x.type==='radio'&&one[x.name])return;if(x.type==='radio')one[x.name]=1;if(!first)first=x;
   if(!x.checked){x.checked=true;x.dispatchEvent(new Event('change',{bubbles:true}))}});
  var st=first&&first.closest('.aq-form__step'),cur=fm.querySelector('.aq-form__step:not([hidden])');
  if(st&&cur&&+st.dataset.step<+cur.dataset.step){var g=document.createElement('button');g.type='button';g.hidden=true;g.setAttribute('data-step-go',st.dataset.step);cur.appendChild(g);g.click();g.remove()}})}
/* EnquiryForm fields. ref is the data-sheet item number ("1.3"), shown before the label and hidden from screen readers.
   Only fields showing are numbered (pass 12): a conditional field still hidden gets an empty ref, and wRenum numbers
   the refs again whenever an answer opens or closes one, so the sheet never skips (1.1, 1.2, 1.3 …). */
function wSlug(s){return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
/* Option labels: through tx like any copy, so a [placeholder] in an option shows in the Placeholder style (careers'
   "[PP fabrication job title]", news' consent line). A checkbox or radio label holding markup (a placeholder, µ) wraps
   its text in one <span>, so it flows as one line in the flex cell. A select's <option> holds text only: an option with
   a placeholder takes aq-ph itself (the browser's list draws it on the Placeholder's ground where it can, and the closed
   select shows it so once chosen, EnquiryForm style.css). The option's value stays its label word for word: intents
   (wPreset) and conditional fields (data-when) match on it. */
function wOptT(o){var t=tx(o);return t===e(o)?t:'<span>'+t+'</span>'}
function wOptPh(o){return /\[[^\]]+\]/.test(String(o||''))}
/* Short options (four or more, each 20 characters or fewer, no placeholder): two columns on phones (aq-checks--short) */
function wShortOpts(o){o=o||[];return o.length>=4&&o.every(function(x){return String(x).length<=20&&!wOptPh(x)})}
/* Elsewhere note (field kind "note"): a request this form does not take, sent to another page's form (DR-014 rule 2:
   "I am qualifying suppliers" -> cmp-quality#audit). {kind: "note", when, label, link, action, intent}: label is the
   line, link a page id or page#anchor, action the link's words (default the linked block's heading, else the page's
   name), intent the options that form ticks on arrival. With when it shows only while that option is ticked, like any
   conditional field. Not a field: no number, never required, nothing sent, never validated.
   Call: link "tel:[service phone number]" draws as every call link does (Button's call, wCall, on the phone rule wnum
   that wtel uses for the NavBar and Footer numbers): it dials once the number is confirmed, digit groups on one line,
   and until then shows "Call [service phone number]" as plain text, never a link. action is its lead word (default
   "Call"); the number is added when the action leaves it out. A call carries no intent. */
function wFormNote(f){var tel=/^tel:/i.test(f.link||''),lk=tel?wBtn(f.action||'Call',f.link,'link'):f.link&&wp(f.link)?wBtn(f.action||wlabel(f.link),f.link,'link',f.intent):'';
 return '<div class="aq-form__elsewhere aq-form__full"'+(f.when?' data-when="'+e(f.when)+'"'+(f._show?'':' hidden'):'')+'>'+(f.label?'<p class="aq-form__elsewhere-t">'+tx(f.label)+'</p>':'')+lk+'</div>'}
/* Required count for the title row: the required fields showing when the form opens (conditional ones only once their
   trigger is ticked, by the visitor or the linking page's intent; f._show from wPreset). The change handler below keeps
   it current as answers open or close follow-ups (wReqNow). */
function wReq(fs){return fs.filter(function(f){return f.required&&f.kind!=='note'&&f._show!==false}).length}
function wReqNow(fm){return [].filter.call(fm.querySelectorAll('[required],[data-required]'),function(x){var w=x.closest('[data-when]');return !w||!w.hidden}).length}
function wReqText(n){return '<span class="wform-req">'+n+' required</span>'}
function wField(f,i,ref){if(f.kind==='note')return wFormNote(f);var id='wf'+(f._n==null?i:f._n),nm=wSlug(f.label),req=f.required?' required':'',hid=id+'_help',
 when=f.when?' data-when="'+e(f.when)+'"'+(f._show?'':' hidden'):'',
 num=typeof ref==='string'?'<span class="aq-form__ref" aria-hidden="true">'+e(ref)+'</span>':'',opt=f.required?'':' <span class="aq-field__optional">(optional)</span>',
 lab='<label class="aq-field__label" for="'+id+'">'+num+tx(f.label)+opt+'</label>',
 help=f.help?'<p class="aq-field__help" id="'+hid+'">'+tx(f.help)+'</p>':'',desc=f.help?' aria-describedby="'+hid+'"':'',inp;
 if(f.kind==='select')inp='<select class="aq-field__input" id="'+id+'" name="'+nm+'"'+req+desc+'>'+'<option value="">Choose…</option>'+(f.options||[]).map(function(o){return '<option'+(wOptPh(o)?' class="aq-ph"':'')+'>'+e(o)+'</option>'}).join('')+'</select>';
 else if(f.kind==='textarea')inp='<textarea class="aq-field__input" id="'+id+'" name="'+nm+'"'+req+desc+'></textarea>';
 else if(f.kind==='checkbox-group'||f.kind==='radio')return '<fieldset class="aq-fieldset aq-field aq-form__full"'+when+desc+(f.required?' data-required=""':'')+'><legend class="aq-field__label">'+num+tx(f.label)+opt+'</legend><div class="aq-checks'+(wShortOpts(f.options)?' aq-checks--short':'')+'">'+(f.options||[]).map(function(o,j){return '<label><input type="'+(f.kind==='radio'?'radio':'checkbox')+'" id="'+id+'_'+j+'" name="'+nm+'" value="'+e(o)+'"'+(f._on&&f._on.indexOf(o)>=0?' checked':'')+'> '+wOptT(o)+'</label>'}).join('')+'</div>'+help+'</fieldset>';
 /* File: optional unless the request cannot go without it (careers' CV); a required one is marked and checked like any
    field: required on the input, no "(optional)", counted in the title row, and Continue or Send asks for a file */
 else if(f.kind==='file')inp='<input class="aq-field__file" id="'+id+'" name="'+nm+'" type="file" multiple accept="'+e(f.accept||'.pdf,.docx,.xlsx,.csv,.png,.jpg')+'"'+req+desc+'>';
 else inp=f.unit?'<div class="aq-field__suffix"><input class="aq-field__input" id="'+id+'" name="'+nm+'" inputmode="numeric"'+req+desc+'><span class="aq-field__unit">'+e(f.unit)+'</span></div>':'<input class="aq-field__input" id="'+id+'" name="'+nm+'" type="'+(f.kind==='email'?'email':f.kind==='tel'?'tel':'text')+'"'+(f.kind==='email'?' autocomplete="email"':f.kind==='tel'?' autocomplete="tel"':'')+req+desc+'>';
 return '<div class="aq-field'+(f.kind==='textarea'||f.kind==='file'?' aq-form__full':'')+'"'+when+'>'+lab+inp+help+'</div>'}
/* EnquiryForm in steps: each step is one numbered sheet section (Step 1 = 1.0), with a progress list, Back and Continue.
   Items are numbered 1.1, 1.2 … in order; notes take no number. */
function wFormSteps(b){var n=0,S=b.steps,k=S.length,all=[];S.forEach(function(s){(s.fields||[]).forEach(function(fd){fd._n=n++;all.push(fd)})});
 return '<form class="aq-form aq-form--steps wform" novalidate>'
  +'<p class="aq-form__title"><span>Data sheet</span><span>'+k+' steps · '+wReqText(wReq(all))+'</span></p>'
  +'<ol class="aq-form__progress">'+S.map(function(s,i){return '<li'+(i?'':' aria-current="step"')+'>'+tx(s.title)+'</li>'}).join('')+'</ol>'
  +S.map(function(s,i){var q=0;return '<fieldset class="aq-form__section aq-form__step" data-step="'+i+'"'+(i?' hidden':'')+'><legend class="aq-form__legend"><span class="aq-form__num">'+(i+1)+'.0</span> Step '+(i+1)+' of '+k+': '+tx(s.title)+'</legend>'
   +'<div class="aq-form__grid">'+(s.intro?'<p class="aq-small aq-form__full">'+tx(s.intro)+'</p>':'')+(s.fields||[]).map(function(fd){return wField(fd,fd._n,fd.kind==='note'||fd._show===false?'':(i+1)+'.'+(++q))}).join('')+'</div>'
   +'<div class="aq-form__actions">'+(i?'<button class="aq-btn aq-btn--secondary" type="button" data-step-go="'+(i-1)+'">Back</button>':'')+(i<k-1?'<button class="aq-btn aq-btn--primary" type="button" data-step-go="'+(i+1)+'">'+tx(s.next||'Continue')+' <span class="aq-btn__arrow">→</span></button>':'<button class="aq-btn aq-btn--primary aq-form__submit" type="submit">'+tx(b.submit||'Send')+'</button>')+'</div>'
   +(i===k-1&&b.note?'<p class="aq-small aq-form__note">'+tx(b.note)+'</p>':'')+(i===k-1?'<span class="aq-small wform-msg" role="status"></span>':'')+'</fieldset>'}).join('')
  +'</form>'}
/* Item numbers of the fields showing, per numbered section ("2.0" numbers its items 2.1, 2.2 …); a ref inside a hidden
   conditional field is emptied (CSS hides an empty ref). */
function wRenum(fm){[].forEach.call(fm.querySelectorAll('.aq-form__section'),function(sc){var n=sc.querySelector('.aq-form__num'),pre=n?String(n.textContent).split('.')[0]:'',q=0;
 [].forEach.call(sc.querySelectorAll('.aq-form__ref'),function(r){var w=r.closest('[data-when]');r.textContent=w&&w.hidden?'':pre+'.'+(++q)})})}
/* Conditional fields: data-when="A|B" shows the field while any listed option is ticked. Ticks inside a hidden field do not count,
   so a follow-up question disappears with its parent (three passes cover two levels of nesting). Then the item numbers
   and the title row's required count follow what now shows. */
document.addEventListener('change',function(ev){var fm=ev.target.closest('form');if(!fm)return;var ws=fm.querySelectorAll('[data-when]');
 for(var k=0;k<3;k++){var on=[].filter.call(fm.querySelectorAll('input:checked'),function(x){var w=x.closest('[data-when]');return !w||!w.hidden}).map(function(x){return x.value});
  ws.forEach(function(w){w.hidden=!w.dataset.when.split('|').some(function(v){return on.indexOf(v)>=0})})}
 wRenum(fm);
 var rq=fm.querySelector('.wform-req');if(rq)rq.textContent=wReqNow(fm)+' required'});
/* Validation feedback (the form is novalidate, so the messages are ours and read the same everywhere). A field is checked
   when the visitor leaves it after typing, re-checked live while it shows an error, and every visible field of the step
   is checked on Continue and on Send: the first problem takes focus and the step does not advance. Each error is a
   line under the field (aq-field__error, joined to the input with aria-describedby), the field takes is-error and its
   inputs aria-invalid. The form fires "aq:invalid" with the bad fields so the motion layer can nudge them. */
function wFieldErr(fd){var ins=[].slice.call(fd.querySelectorAll('input,select,textarea')),grp=fd.tagName==='FIELDSET';
 if(grp)return fd.hasAttribute('data-required')&&!ins.some(function(x){return x.checked})?(ins[0]&&ins[0].type==='radio'?'Choose one.':'Choose at least one.'):'';
 var x=ins[0];if(!x)return '';if(x.type==='file')return x.required&&!(x.files&&x.files.length)?'Attach a file.':'';var v=String(x.value||'').trim();
 if(x.required&&!v)return x.tagName==='SELECT'?'Choose one.':'Required.';
 if(v&&x.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))return 'Enter an email address, like name@company.com.';
 if(v&&x.type==='tel'&&(v.replace(/\D/g,'').length<7))return 'Enter a phone number with its area code.';
 return ''}
function wMark(fd){var msg=wFieldErr(fd),ins=[].slice.call(fd.querySelectorAll('input,select,textarea')),id=(ins[0]&&ins[0].id.replace(/_\d+$/,'')||'wf')+'_err',el=document.getElementById(id);
 fd.classList.toggle('is-error',!!msg);
 ins.forEach(function(x){if(msg)x.setAttribute('aria-invalid','true');else x.removeAttribute('aria-invalid')});
 var host=fd.tagName==='FIELDSET'?fd:ins[0],db=(host.getAttribute('aria-describedby')||'').split(' ').filter(function(t){return t&&t!==id});
 if(msg){if(!el){el=document.createElement('p');el.className='aq-field__error';el.id=id;fd.appendChild(el)}el.textContent=msg;db.push(id)}
 else if(el)el.remove();
 if(db.length)host.setAttribute('aria-describedby',db.join(' '));else host.removeAttribute('aria-describedby');
 return !msg}
function wCheck(scope){var bad=[].filter.call(scope.querySelectorAll('.aq-field'),function(fd){return !fd.closest('[hidden]')&&!wMark(fd)});
 if(bad.length){var fm=scope.closest('form')||scope,f=bad[0].querySelector('input,select,textarea');if(f)f.focus();
  fm.dispatchEvent(new CustomEvent('aq:invalid',{detail:bad}))}
 return bad}
document.addEventListener('input',function(ev){var t=ev.target,fd=t.closest&&t.closest('.wform .aq-field');if(!fd)return;fd.dataset.touched='1';if(fd.classList.contains('is-error'))wMark(fd)});
document.addEventListener('change',function(ev){var fd=ev.target.closest&&ev.target.closest('.wform .aq-field');if(fd&&(fd.classList.contains('is-error')||fd.tagName==='FIELDSET'&&fd.dataset.touched))wMark(fd)});
document.addEventListener('focusout',function(ev){var fd=ev.target.closest&&ev.target.closest('.wform .aq-field');if(!fd||!fd.dataset.touched||fd.contains(ev.relatedTarget))return;wMark(fd)});
/* Capture phase: runs before page.js moves the step and before the page's submit handler */
document.addEventListener('click',function(ev){var g=ev.target.closest&&ev.target.closest('.wform [data-step-go]');if(!g)return;var st=g.closest('.aq-form__step');
 if(!st||+g.dataset.stepGo<+st.dataset.step)return;
 if(wCheck(st).length){ev.preventDefault();ev.stopImmediatePropagation()}},true);
document.addEventListener('submit',function(ev){var fm=ev.target;if(!fm.classList||!fm.classList.contains('wform'))return;var bad=wCheck(fm);
 if(bad.length){ev.preventDefault();ev.stopImmediatePropagation();var msg=fm.querySelector('.wform-msg');if(msg)msg.textContent=bad.length===1?'One field needs attention.':bad.length+' fields need attention.'}},true);
