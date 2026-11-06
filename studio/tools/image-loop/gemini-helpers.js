// Gemini image loop helpers (Claude in Chrome, one gemini.google.com chat tab). Paste this whole file into ONE
// javascript_exec on the chat page, after setting window.PRE and window.SUF (the fixed head and tail of every prompt).
// It defines the helpers and stores them in localStorage.p9 so they survive reloads.
// After a reload, re-load them with (plain eval is blocked by Gemini's Trusted Types policy):
//   eval(trustedTypes.createPolicy('p'+Date.now(),{createScript:s=>s}).createScript(localStorage.p9))
//
//   await go(mid)   edit the chat's FIRST prompt to PRE+mid+SUF and press Update: a fresh generation with no earlier
//                   image or prompt in context. Returns 'sent N', or 'update disabled' if the text did not change
//                   (add a word such as " Take 2." to regenerate the same section).
//   st()            {w, h, isnew, q}: the newest image's size, whether it differs from the one before go(), a prompt slice
//   await cap()     overlay the newest image at natural size at the top-left; returns [w, h, w*0.6125, h*0.6125].
//                   Then capture with the computer tool: zoom region [0,0,w*0.6125,h*0.6125], save_to_disk:true,
//                   scale:1 (0.6125 = screenshot px per CSS px on a 2560 px wide window; check innerWidth).
//   ovx()           remove the overlay.
//   await nw(mid)   (current interface) type PRE+mid+SUF into a new chat's box and press Send; see SKILL.md stage 3.
(function () {
  window.PRE = window.PRE || '';
  window.SUF = window.SUF || '';
  window.go = async function (mid) {
    var t = document.querySelector('user-query [contenteditable=true]');
    if (!t) {
      var q = document.querySelector('user-query');
      q.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      var eb = [...q.querySelectorAll('button')].find(b => b.getAttribute('aria-label') === 'Edit');
      if (!eb) return 'no edit';
      eb.click(); await new Promise(r => setTimeout(r, 700));
      t = document.querySelector('user-query [contenteditable=true]');
    }
    if (!t) return 'no box';
    t.focus();
    var s = getSelection(), rg = document.createRange(); rg.selectNodeContents(t); s.removeAllRanges(); s.addRange(rg);
    document.execCommand('insertText', false, PRE + mid + SUF);   // registers as real input, unlike setting the value
    await new Promise(r => setTimeout(r, 500));
    var u = [...document.querySelectorAll('user-query button')].find(b => (b.innerText || '').trim() === 'Update');
    if (!u) return 'no update';
    if (u.disabled) return 'update disabled';
    window.__last = (document.querySelector('model-response img') || {}).src;
    u.click(); return 'sent ' + t.innerText.length;
  };
  window.st = function () {
    var im = [...document.querySelectorAll('model-response img')].pop();
    return { w: im && im.naturalWidth, h: im && im.naturalHeight, isnew: !!im && im.src !== window.__last, q: (document.querySelector('user-query') || {}).innerText?.slice(200, 260) };
  };
  window.ov = function () {
    var im = [...document.querySelectorAll('model-response img')].pop();
    var d = document.getElementById('ovx'); if (d) d.remove();
    d = document.createElement('div'); d.id = 'ovx'; d.style.cssText = 'position:fixed;left:0;top:0;z-index:2147483647;background:#fff';
    var c = new Image(); c.src = im.src; c.style.cssText = 'display:block;width:' + im.naturalWidth + 'px;height:' + im.naturalHeight + 'px';
    d.appendChild(c); document.body.appendChild(d);
    return [im.naturalWidth, im.naturalHeight, Math.round(im.naturalWidth * 0.6125), Math.round(im.naturalHeight * 0.6125)];
  };
  window.ovx = function () { var d = document.getElementById('ovx'); if (d) d.remove(); return 1 };
  window.cap = async function () {
    for (var i = 0; i < 30; i++) {
      var im = [...document.querySelectorAll('model-response img')].pop();
      if (im && im.naturalWidth > 500) return ov();
      if (im && im.complete && !im.naturalWidth && i % 6 == 5) { var s = im.src; im.src = ''; im.src = s }
      await new Promise(r => setTimeout(r, 500));
    }
    return 'none';
  };
  // Gemini's Nov 2026 interface: a saved chat often reloads blank after a generation, so go() can't be relied on.
  // nw(mid) types PRE+mid+SUF into a NEW chat (navigate to https://gemini.google.com/app first) and presses Send.
  window.nw = async function (mid) {
    var t;
    for (var i = 0; i < 20 && !(t = document.querySelector('rich-textarea .ql-editor')); i++) await new Promise(r => setTimeout(r, 300));
    if (!t) return 'no box';
    t.focus(); document.execCommand('insertText', false, PRE + mid + SUF);
    await new Promise(r => setTimeout(r, 600));
    var b = document.querySelector('button.send-button, button[aria-label*="Send"]');
    if (!b) return 'no send';
    b.click(); return 'sent ' + t.innerText.length;
  };
  localStorage.p9 = 'window.PRE=' + JSON.stringify(PRE) + ';window.SUF=' + JSON.stringify(SUF) + ';window.go=' + go.toString() +
    ';window.st=' + st.toString() + ';window.ov=' + ov.toString() + ';window.ovx=' + ovx.toString() + ';window.cap=' + cap.toString() +
    ';window.nw=' + nw.toString() + ';1';
  return 'helpers ready (' + localStorage.p9.length + ' chars stored)';
})();
