/* EnquiryForm: the data sheet is drawn up, then filled in by the visitor. Pass 9: the progress is a pipeline; on
   Continue the water runs along the line just passed and the ring (the step marker) slides on to the new node.
   Scroll-in: the title rule rules across, the progress steps (stepped form) or section legends wipe in from the left
   with their numbers decoding, the fields of the open step rise in reading order, the revision strip settles last.
   Continue / Back (stepped form): the step marker under the progress list slides to the new step (Flip), the new
   step slides in from the side it was asked for and its fields follow. A blocked Continue or Send ("aq:invalid" from
   parts/EnquiryForm.js): each field that needs attention gives a short shake (0.3 s). TextField's focus colours are CSS.
   Pass 9b (Subframe Motion ports, below): a passed step's node springs into a tick (task-steps); entering a field group
   runs one lap of a flow light round it (border-beam); error lines drop in and a field put right earns a tick
   (address-check); Send moves through pending and error faces at a fixed width (loading-button). */
AQmotion.fx('EnquiryForm', function (root, m) {
  var CLEAR = 'transform,opacity,visibility';
  function fieldsOf(scope) { return [].filter.call(scope.querySelectorAll('.aq-form__grid > *'), function (f) { return !!f.offsetParent }) }
  root.querySelectorAll('.wform').forEach(function (fm) {
    m.claim(fm);
    var title = fm.querySelector('.aq-form__title'), prog = fm.querySelector('.aq-form__progress'), strip = fm.querySelector('.aq-form__strip'),
      open = fm.querySelector('.aq-form__step:not([hidden])') || fm, legends = [].filter.call(fm.querySelectorAll('.aq-form__legend'), function (l) { return !!l.offsetParent }),
      fields = fieldsOf(fm).slice(0, 12), acts = [].filter.call(fm.querySelectorAll('.aq-form__actions'), function (a) { return !!a.offsetParent }),
      pli = prog ? [].slice.call(prog.children) : [];
    // one marker under the current step, moved with Flip
    var mark = null;
    if (prog && window.Flip) {
      mark = document.createElement('span'); mark.className = 'aq-form__mark'; mark.setAttribute('aria-hidden', 'true');
      var cur = prog.querySelector('[aria-current="step"]') || pli[0]; if (cur) { cur.appendChild(mark); prog.classList.add('has-mark') }
    }
    if (title) gsap.set(title, { clipPath: 'inset(0 100% 0 0)' });
    var wipe = pli.concat(legends), rise = fields.concat(acts);
    if (wipe.length) gsap.set(wipe, { clipPath: 'inset(0 100% 0 0)' });
    if (rise.length) gsap.set(rise, { y: 14, autoAlpha: 0 });
    if (strip) gsap.set(strip, { autoAlpha: 0 });
    m.on(fm, function () {
      var tl = m.tw(gsap.timeline({ delay: 0.2 }));
      if (title) tl.to(title, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.inOut', clearProps: 'clipPath' }, 0);
      if (wipe.length) tl.to(wipe, { clipPath: 'inset(0 0% 0 0)', duration: 0.5, ease: 'power2.out', stagger: 0.1, clearProps: 'clipPath' }, 0.3);
      legends.forEach(function (l, i) { var n = l.querySelector('.aq-form__num'); if (n && window.ScrambleTextPlugin) tl.to(n, { duration: 0.4, scrambleText: { text: n.textContent, chars: '0123456789', speed: 0.8 }, ease: 'none' }, 0.3 + i * 0.1) });
      if (fields.length) tl.to(fields, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out', stagger: Math.min(0.06, 0.9 / (fields.length || 1)), clearProps: CLEAR }, 0.5);
      if (acts.length) tl.to(acts, { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out', clearProps: CLEAR }, 0.9);
      if (strip) tl.to(strip, { autoAlpha: 1, duration: 0.4, clearProps: 'opacity,visibility' }, 1.1);
      // fields beyond the first twelve (long single sheets) follow as they scroll in
      fieldsOf(fm).slice(12).forEach(function (f) { gsap.set(f, { y: 14, autoAlpha: 0 }); m.on(f, function () { m.tw(gsap.to(f, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out', clearProps: CLEAR })) }, 'top 92%') });
    }, 'top 80%');
    // Step change: capture the marker before page.js swaps the step, animate after it has
    fm.addEventListener('click', function (ev) {
      var g = ev.target.closest && ev.target.closest('[data-step-go]'); if (!g) return;
      var from = fm.querySelector('.aq-form__step:not([hidden])'), state = mark && window.Flip ? Flip.getState(mark) : null;
      requestAnimationFrame(function () {
        var to = fm.querySelector('.aq-form__step:not([hidden])'); if (!to || to === from) return;
        var dir = +to.dataset.step > +(from && from.dataset.step) ? 1 : -1;
        if (state) { var li = prog.querySelector('[aria-current="step"]'); if (li) { li.appendChild(mark); m.tw(Flip.from(state, { duration: 0.5, ease: 'power3.inOut', delay: dir > 0 ? 0.25 : 0 })) } }
        // forward: the water runs along the line just passed, then the ring arrives at the new node
        if (dir > 0 && prog) { var was = pli[+to.dataset.step - 1]; if (was) m.tw(gsap.fromTo(was, { '--aq-fill': 0 }, { '--aq-fill': 1, duration: 0.5, ease: 'power2.inOut' })) }
        // task-steps: each step just passed settles into a tick that springs in from 0.8 (POP: stiffness 640, damping 22)
        if (dir > 0 && prog) pli.slice(+(from && from.dataset.step) || 0, +to.dataset.step).forEach(function (li) { m.tw(gsap.fromTo(li, { '--aq-pop': 0.8 }, { '--aq-pop': 1, duration: 0.45, ease: 'power3.out' })) });
        var tl = m.tw(gsap.timeline());
        tl.fromTo(to, { x: 32 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out', clearProps: CLEAR }, 0);
        var lg = to.querySelector('.aq-form__legend'); if (lg) tl.fromTo(lg, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.45, ease: 'power2.out', clearProps: 'clipPath' }, 0.05);
        var nf = fieldsOf(to); if (nf.length) tl.fromTo(nf, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power3.out', stagger: 0.05, clearProps: CLEAR }, 0.15);
      });
    });
    // Blocked Continue / Send: the fields that need attention shake once
    fm.addEventListener('aq:invalid', function (ev) {
      (ev.detail || []).forEach(function (f, i) { m.tw(gsap.fromTo(f, { x: 0 }, { keyframes: { x: [0, -6, 5, -3, 2, 0] }, duration: 0.3, ease: 'none', delay: i * 0.04, clearProps: 'transform' })) });
      // a blocked Send shows the alert face on the button for 1.4 s (loading-button, below)
      var sb = fm.querySelector('.aq-form__submit'); if (sb && sb.offsetParent && window.AQformFace && !sb.closest('[hidden]')) AQformFace(sb, 'error');
    });
  });
});

/* EnquiryForm, visitor-driven feedback (pass 9b). Document-level, so it follows every render; none of it runs under
   reduced motion except the plain state changes (error lines, ticks and faces simply appear). The form's fields, names,
   pre-set, validation rules and submit handling are untouched: this only listens.
   1. Border beam. Ported from Subframe Motion "Border beam" (border-beam), MIT, (c) 2026 Subframe. Focus entering a
      field group (an input's field, or a whole option group) sends a short flow light once round the group's outline
      (a conic light in a 1 px ring, 0.9 s), then the ring goes; the field's own focus style stays. Visitor-driven and
      once per entry: never a loop.
   2. Inline validation. Ported from Subframe Motion "Address check" (address-check), MIT, (c) 2026 Subframe. An error
      line (parts/EnquiryForm.js) drops in under its field (0.18 s) while the field's border turns over 150 ms (CSS);
      when a field that showed an error is put right, a tick springs in after its label and stays while it holds.
   3. Send. Ported from Subframe Motion "An action in progress" (loading-button), MIT, (c) 2026 Subframe. The submit
      button's faces (label, pending spinner, alert) are stacked at one fixed footprint and spring-crossfade (opacity,
      a 3 px rise, a 2 px blur; stiffness 260, damping 34, mass 0.8: about 0.35 s). A blocked Send shows the alert for
      1.4 s; an accepted Send shows the pending face while the form posts (aq:sending from parts/EnquiryForm.js wSend,
      at least 0.45 s, so it never flashes), then on aq:sent the label returns and the status line wipes in; on
      aq:failed the alert face shows and the line wipes in the same way. The faces are aria-hidden: the button keeps its
      label, and the status line (role="status") says what happened. */
(function () {
  if (typeof document === 'undefined' || window.__aqFormFx) return; window.__aqFormFx = 1;
  var still = function () { return !window.gsap || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) };
  var SVG = function (d) { return '<svg viewBox="0 0 12 12" width="14" height="14" fill="none" aria-hidden="true">' + d + '</svg>' };
  var SPIN = SVG('<circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.25"/><path d="M10.5 6A4.5 4.5 0 0 0 6 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>');
  var ALERT = SVG('<path d="M6 2.9v3.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M6 9.05h.01" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>');
  var TICK = SVG('<path d="M2.6 6.3 4.9 8.6 9.4 3.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>');

  // 1. Border beam
  function beam(g) {
    if (still() || g.querySelector(':scope > .aq-form__beam')) return;
    var b = document.createElement('span'); b.className = 'aq-form__beam'; b.setAttribute('aria-hidden', 'true'); g.appendChild(b);
    var o = { a: -30, k: 0 }, set = function () { b.style.setProperty('--aq-a', o.a + 'deg'); b.style.opacity = o.k };
    gsap.timeline({ onUpdate: set, onComplete: function () { b.remove() } })
      .to(o, { k: 1, duration: 0.15, ease: 'power1.out' }, 0)
      .to(o, { a: 330, duration: 0.9, ease: 'power1.inOut' }, 0)
      .to(o, { k: 0, duration: 0.25, ease: 'power1.in' }, 0.7);
  }
  document.addEventListener('focusin', function (ev) {
    var g = ev.target.closest && ev.target.closest('.wform .aq-fieldset, .wform .aq-field'); if (!g || g.contains(ev.relatedTarget)) return;
    if (g.closest('[hidden]')) return; beam(g);
  });

  // 2. Inline validation: error lines drop in; a field put right earns a tick
  if (window.MutationObserver) new MutationObserver(function (list) {
    list.forEach(function (r) {
      if (r.type === 'childList') [].forEach.call(r.addedNodes, function (n) {
        if (n.nodeType === 1 && n.classList.contains('aq-field__error') && !still()) gsap.fromTo(n, { y: -4, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.18, ease: 'power2.out', clearProps: 'transform,opacity,visibility' });
      });
      if (r.type === 'attributes' && r.target.classList && r.target.classList.contains('aq-field') && r.target.closest('.wform')) {
        var fd = r.target, was = /\bis-error\b/.test(r.oldValue || ''), now = fd.classList.contains('is-error'), lab = fd.querySelector(':scope > .aq-field__label'), ok = lab && lab.querySelector('.aq-form__ok');
        if (now && ok) ok.remove();
        if (was && !now && !ok && lab) {
          ok = document.createElement('span'); ok.className = 'aq-form__ok'; ok.setAttribute('aria-hidden', 'true'); ok.innerHTML = TICK; lab.appendChild(ok);
          if (!still()) gsap.fromTo(ok, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: 'back.out(2.2)', clearProps: 'transform,opacity,visibility' });
        }
      }
    });
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true });

  // 3. Send: stacked faces at one footprint
  function faces(b) {
    var w = b.querySelector(':scope > .aq-form__faces'); if (w) return w;
    w = document.createElement('span'); w.className = 'aq-form__faces';
    var lab = document.createElement('span'); lab.className = 'aq-form__face is-label';
    while (b.firstChild) lab.appendChild(b.firstChild);
    w.appendChild(lab);
    w.insertAdjacentHTML('beforeend', '<span class="aq-form__face is-pending" aria-hidden="true">' + SPIN + '</span><span class="aq-form__face is-error" aria-hidden="true">' + ALERT + '<span></span></span>');
    w.lastChild.lastChild.textContent = lab.textContent.trim();
    b.appendChild(w); return w;
  }
  function face(b, state) {
    var w = faces(b), cur = b.getAttribute('data-face') || 'label'; if (cur === state) return;
    b.setAttribute('data-face', state); clearTimeout(b._aqFace);
    var show = w.querySelector('.is-' + state), hide = w.querySelector('.is-' + cur), spin = w.querySelector('.is-pending svg');
    if (b._aqSpin) { b._aqSpin.kill(); b._aqSpin = null }
    if (state === 'pending' && spin && !still()) b._aqSpin = gsap.to(spin, { rotation: 360, duration: 0.85, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
    if (still()) { if (hide) { hide.style.opacity = 0; hide.style.visibility = 'hidden' } show.style.opacity = 1; show.style.visibility = 'visible' }
    else {
      if (hide) gsap.to(hide, { autoAlpha: 0, y: -3, filter: 'blur(2px)', duration: 0.25, ease: 'power2.out', overwrite: true });
      gsap.fromTo(show, { autoAlpha: 0, y: 3, filter: 'blur(2px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out', overwrite: true, clearProps: state === 'label' ? 'transform,opacity,visibility,filter' : '' });
    }
    if (state === 'error') b._aqFace = setTimeout(function () { face(b, 'label') }, 1400);
  }
  window.AQformFace = face;
  // The send itself (parts/EnquiryForm.js wSend) says when it starts and how it ended; the faces follow
  document.addEventListener('aq:sending', function (ev) {
    var fm = ev.target, b = fm.querySelector && fm.querySelector('.aq-form__submit'); if (!b || !b.offsetParent) return;
    var msg = fm.querySelector('.wform-msg'); fm._aqSendAt = Date.now();
    face(b, 'pending'); if (msg && !still()) gsap.set(msg, { autoAlpha: 0 });
  });
  function ended(ev, ok) {
    var fm = ev.target, b = fm.querySelector && fm.querySelector('.aq-form__submit'); if (!b || !b.offsetParent) return;
    var msg = fm.querySelector('.wform-msg'), wait = Math.max(0, 450 - (Date.now() - (fm._aqSendAt || 0)));
    setTimeout(function () {
      face(b, ok ? 'label' : 'error');
      if (msg && !still()) gsap.fromTo(msg, { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' }, { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'power2.out', clearProps: 'opacity,visibility,clipPath' });
    }, wait);
  }
  document.addEventListener('aq:sent', function (ev) { ended(ev, true) });
  document.addEventListener('aq:failed', function (ev) { ended(ev, false) });
})();
