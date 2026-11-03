/* NavBar: the phone menu drops like a curtain and pushes the page down, its rows following one after another, the urgent
   block first; Close lifts it before the page re-renders without it. On the wide bar the mega panels unroll, switch on
   one shared backdrop and roll up; the phone menu's groups open as an accordion. Subframe Motion ports:
   - Ported from Subframe Motion "Curtain index" (curtain-index), MIT, (c) 2026 Subframe: the phone menu opens top-down
     (its height from 0, so the page below is pushed rather than covered) on the example's curtain ease
     (cubic-bezier(0.76, 0, 0.24, 1), 380 ms); the entries fade and slide down 12 px, 100 ms in and 35 ms apart
     (cubic-bezier(0.2, 0.8, 0.2, 1), 300 ms). Close: the entries fade in 120 ms while the curtain lifts (280 ms).
     A mega panel's first open uses the same curtain: clip from the top edge down, 240 ms; its columns (head, groups,
     featured card, foot, tasks row) drop 8 px and fade in, 160 ms, 18 ms apart from 60 ms. Close, a third faster:
     content fades in 120 ms, the clip rolls up in 160 ms, then the panel is hidden. Opened from the keyboard, the
     columns do not fade, so focus can land on the overview link at once.
   - Ported from Subframe Motion "Layered menu" (layered-menu), MIT, (c) 2026 Subframe: switching from one open panel to
     another keeps one surface: a shared backdrop (aq-mega__bg) springs its height to the new panel, the outgoing
     content fades and slides 12 px away from the new button's side (120 ms) and the incoming slides in from that side
     (200 ms, the example's strong ease-out cubic-bezier(0.16, 1, 0.3, 1)). Disclosure buttons, not menu roles.
   - Ported from Subframe Motion "Sliding selection" (sliding-tabs), MIT, (c) 2026 Subframe: on the wide bar one flow
     rule rests under the current section and slides on its spring (stiffness 460, damping 34) to the button the pointer
     or keyboard focus is on, rests under an open panel's button, then returns; on a new page it slides from the section
     just left to the new one. The backdrop above springs on the same values.
   - Ported from Subframe Motion "Spring accordion" (spring-accordion), MIT, (c) 2026 Subframe (adapted from Motion
     Primitives' accordion, MIT, (c) 2024 ibelick): a phone menu group opens from height 0 to its height in 300 ms with
     no bounce and fades in, the open sibling closes in parallel; a group opened from the keyboard opens at once, as the
     example does. The plus turning into a cross is CSS.
   - The toggle's two bars turn into a cross (curtain-index's toggle; icon-morph "menu-close"), 220 ms, and back on close.
   NavBar.js owns the state and announces each change (aq:navpanel on the bar, aq:navgroup on the section button); this
   file takes a change over only when it can animate it (preventDefault), and calls detail.done() when the exit ends, so
   nothing is left hidden by an interrupted tween. Under reduced motion, or without GSAP, every change is instant and the
   rule just sits. */
(function () {
  var closing = false, lastPage = null, lastBox = null;
  var still = function () { return !window.gsap || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) };
  function ease(n, d) { if (window.CustomEase && !CustomEase.get(n)) CustomEase.create(n, d); return window.CustomEase ? n : 'power3.inOut' }
  var CURTAIN = 'M0,0 C0.76,0 0.24,1 1,1', SNAP = 'M0,0 C0.2,0.8 0.2,1 1,1', OUT = 'M0,0 C0.16,1 0.3,1 1,1';
  function bars(t, open, dur) {
    var b = t && t.querySelectorAll('.aq-nav__burger > i'); if (!b || b.length < 2) return;
    var on = [{ y: 3, rotation: 45 }, { y: -3, rotation: -45 }], off = [{ y: 0, rotation: 0 }, { y: 0, rotation: 0 }];
    [0, 1].forEach(function (i) { b[i].style.transition = 'none'; gsap.fromTo(b[i], open ? off[i] : on[i], Object.assign({ duration: dur, ease: ease('aq-snap', SNAP), clearProps: open ? 'transform,transition' : 'transition' }, open ? on[i] : off[i])) });
  }
  // Close: let the curtain lift first, then run the toggle's own handler (which re-renders), then restore focus
  if (typeof document !== 'undefined') document.addEventListener('click', function (ev) {
    var t = ev.target && ev.target.closest && ev.target.closest('#wmenu'), panel = document.getElementById('wmenu-panel');
    if (!t || !panel || closing || still() || typeof t.onclick !== 'function') return;
    ev.stopImmediatePropagation(); ev.preventDefault(); closing = true;
    var fn = t.onclick, rows = panel.querySelectorAll('.aq-menu__urgent, .aq-menu__list > li, .aq-menu__label, .aq-menu__cta');
    bars(t, false, 0.22);
    gsap.to(rows, { autoAlpha: 0, duration: 0.12, ease: 'power1.out' });
    gsap.fromTo(panel, { height: panel.offsetHeight, overflow: 'hidden' }, { height: 0, paddingTop: 0, paddingBottom: 0, duration: 0.28, ease: ease('aq-curtain', CURTAIN), onComplete: function () {
      closing = false; fn.call(t); var n = document.getElementById('wmenu'); if (n) n.focus();
    } });
  }, true);

  /* ---- Mega panels ---- */
  var morph = null;   // the running switch: {sp, nav, bg}
  function cols(p) { return p ? [].slice.call(p.querySelectorAll('.aq-mega__head, .aq-mega__group, .aq-mega__feat, .aq-mega__foot, .aq-mega__tasks')) : [] }
  function inner(p) { return p ? [].slice.call(p.querySelectorAll('.aq-mega__in, .aq-mega__tasks')) : [] }
  function reset(nav) {
    if (morph) { morph.sp.stop(); morph = null }
    nav.querySelectorAll('.aq-mega').forEach(function (p) { gsap.killTweensOf([p].concat(cols(p), inner(p))); gsap.set([p].concat(cols(p), inner(p)), { clearProps: 'clipPath,opacity,visibility,transform' }) });
    var bg = nav.querySelector('.aq-mega__bg'); if (bg) { bg.hidden = true; bg.style.height = '' }
    nav.classList.remove('is-morph');
  }
  function side(nav, a, b) { var L = [].slice.call(nav.querySelectorAll('.aq-mega')); return L.indexOf(a) > L.indexOf(b) ? 1 : -1 }
  document.addEventListener('aq:navpanel', function (ev) {
    var d = ev.detail, nav = ev.target, M = window.AQmotion && AQmotion.M;
    if (still() || !M || !nav.querySelector) return;
    ev.preventDefault();
    reset(nav); d.others();
    if (d.open && !d.from) {   // first open: curtain
      gsap.fromTo(d.open, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.24, ease: ease('aq-curtain', CURTAIN), clearProps: 'clipPath' });
      if (!d.key) gsap.fromTo(cols(d.open), { y: -8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.16, delay: 0.06, stagger: 0.018, ease: ease('aq-snap', SNAP), clearProps: 'transform,opacity,visibility' });
      d.done();
    } else if (!d.open && d.from) {   // close: content out, clip up, then hidden
      var p = d.from;
      gsap.to(inner(p), { autoAlpha: 0, duration: 0.12, ease: 'power1.out' });
      gsap.fromTo(p, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.16, ease: ease('aq-curtain', CURTAIN), onComplete: function () {
        d.done(); gsap.set([p].concat(inner(p)), { clearProps: 'clipPath,opacity,visibility' });
      } });
    } else if (d.open && d.from) {   // switch: one backdrop springs between the two heights
      var bg = nav.querySelector('.aq-mega__bg'), from = d.from, to = d.open, dir = side(nav, to, from);
      if (!bg) { d.done(); return }
      var hF = from.offsetHeight, hT = to.offsetHeight;
      nav.classList.add('is-morph'); bg.hidden = false; bg.style.height = hF + 'px';
      gsap.to(inner(from), { x: -12 * dir, autoAlpha: 0, duration: 0.12, ease: 'power1.out', onComplete: function () { d.done(); gsap.set(inner(from), { clearProps: 'transform,opacity,visibility' }) } });
      gsap.fromTo(inner(to), { x: 12 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.2, ease: ease('aq-out', OUT), clearProps: 'transform,opacity,visibility' });
      var st = { h: hF }, m = morph = { nav: nav, bg: bg, sp: null };
      m.sp = M.spring(st, { stiffness: 460, damping: 34, mass: 1 }, function (o) {
        bg.style.height = o.h.toFixed(1) + 'px';
        to.style.clipPath = 'inset(0 0 ' + Math.max(0, hT - o.h).toFixed(1) + 'px 0)';
        from.style.clipPath = 'inset(0 0 ' + Math.max(0, hF - o.h).toFixed(1) + 'px 0)';
        if (o.h === hT && morph === m) { morph = null; bg.hidden = true; bg.style.height = ''; nav.classList.remove('is-morph'); to.style.clipPath = ''; from.style.clipPath = '' }
      });
      m.sp.to({ h: hT });
    } else d.done();
  });

  /* ---- Phone menu groups (spring-accordion) ---- */
  document.addEventListener('aq:navgroup', function (ev) {
    var d = ev.detail; if (still() || d.key) return;
    ev.preventDefault();
    if (d.open) { gsap.killTweensOf(d.open); gsap.fromTo(d.open, { height: 0, autoAlpha: 0, overflow: 'hidden' }, { height: 'auto', autoAlpha: 1, duration: 0.3, ease: ease('aq-snap', SNAP), clearProps: 'height,opacity,visibility,overflow' }) }
    if (d.from) { var f = d.from; gsap.killTweensOf(f); gsap.fromTo(f, { height: f.offsetHeight, overflow: 'hidden' }, { height: 0, autoAlpha: 0, duration: 0.3, ease: ease('aq-snap', SNAP), onComplete: function () { d.done(); gsap.set(f, { clearProps: 'height,opacity,visibility,overflow' }) } }) }
    else d.done();
  });

  AQmotion.fx('NavBar', function (root, m) {
    AQmotion.M = m;
    var nav = root.querySelector('.aq-nav'); if (!nav) return;
    var page = window.AQ ? AQ.page : location.hash, fresh = page !== lastPage; lastPage = page;
    var panel = root.querySelector('#wmenu-panel');
    if (panel) {
      m.claim(panel);
      bars(root.querySelector('#wmenu'), true, 0.22);
      var rows = [].slice.call(panel.querySelectorAll('.aq-menu__urgent, .aq-menu__list > li, .aq-menu__label, .aq-menu__cta'));
      var tl = m.tw(gsap.timeline());
      tl.fromTo(panel, { height: 0, overflow: 'hidden' }, { height: 'auto', duration: 0.38, ease: ease('aq-curtain', CURTAIN), clearProps: 'height,overflow' }, 0);
      if (rows.length) tl.fromTo(rows, { y: -12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.035, ease: ease('aq-snap', SNAP), clearProps: 'transform,opacity,visibility' }, 0.1);
    }
    nav.querySelectorAll('.aq-mega').forEach(function (p) { m.claim(p) });

    // The sliding rule on the wide bar, placed against the bar (the items stay unpositioned for the panels)
    var ul = nav.querySelector('.aq-nav__links'); if (!ul || !ul.offsetParent) return;
    var TOP = ':scope > .aq-nav__item > .aq-nav__trigger, :scope > .aq-nav__item > a';
    var mark = document.createElement('li'); mark.className = 'aq-nav__mark'; mark.setAttribute('aria-hidden', 'true');
    ul.appendChild(mark); nav.classList.add('has-mark');
    function box(a) { var r = a.getBoundingClientRect(), o = nav.getBoundingClientRect(); return { x: r.left - o.left, w: r.width } }
    function topOf(t) { var a = t && t.closest && t.closest('.aq-nav__trigger, .aq-nav__item > a'); return a && a.parentNode.parentNode === ul ? a : null }
    var st = { x: 0, w: 0, k: 0 }, sp = m.spring(st, { stiffness: 460, damping: 34, mass: 1 }, function (o) {
      mark.style.transform = 'translateX(' + o.x.toFixed(1) + 'px) scaleX(' + Math.max(0, o.w / 100).toFixed(4) + ')'; mark.style.opacity = Math.max(0, Math.min(1, o.k)).toFixed(3);
      if (cur) lastBox = { x: o.x, w: o.w };
    });
    m.tw({ kill: sp.stop });
    var cur = [].filter.call(ul.querySelectorAll(TOP), function (a) { return a.hasAttribute('aria-current') })[0], rest = cur ? box(cur) : null;
    if (rest && lastBox && fresh) { sp.jump({ x: lastBox.x, w: lastBox.w, k: 1 }); sp.to({ x: rest.x, w: rest.w }) }
    else if (rest) sp.jump({ x: rest.x, w: rest.w, k: 1 });
    else sp.jump({ x: 0, w: 0, k: 0 });
    function home() { var o = ul.querySelector('.aq-nav__trigger[aria-expanded="true"]'); return o ? box(o) : rest }
    function go(a, instant) {
      var b = a ? box(a) : home();
      if (!b) { sp.to({ k: 0 }); return }
      if (!st.k && !rest) { sp.jump({ x: b.x, w: b.w * 0.6 }) }
      (instant ? sp.jump : sp.to)({ x: b.x, w: b.w, k: 1 });
    }
    ul.addEventListener('pointerover', function (ev) { var a = topOf(ev.target); if (a && ev.pointerType === 'mouse') go(a) });
    ul.addEventListener('pointerleave', function () { go(null) });
    ul.addEventListener('focusin', function (ev) { var a = topOf(ev.target); if (a && a.matches(':focus-visible')) go(a, true) });
    ul.addEventListener('focusout', function (ev) { if (!ul.contains(ev.relatedTarget)) go(null, true) });
    nav.addEventListener('aq:navpanel', function (ev) { go(ev.detail.trigger || null) });
  });
})();
