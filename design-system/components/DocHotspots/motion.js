/* DocHotspots: the skid develops like a print (wipe up from the base), then each document is pinned in turn: its
   hotspot drops onto the part and sends out one ripple, the leader draws out from the hotspot to the edge of the
   stage, and the card slides out from behind the drawing along it, its code decoding; the index link follows last.
   Narrow screens (no leaders): hotspots pop in order and the cards rise in a short stagger.
   One timeline, once, under 5 s. */
AQmotion.fx('DocHotspots', function (root, m) {
  root.querySelectorAll('.aq-doc-hotspots').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    if (window.AQdocHotspots) window.AQdocHotspots.layout(el); // the leaders in the stage's real pixels before DrawSVG measures them
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) }, D = window.DrawSVGPlugin;
    var art = el.querySelector('.aq-doc-hotspots__art'), cards = qa('.aq-doc-hotspots__card'), wide = getComputedStyle(el.querySelector('.aq-doc-hotspots__leads') || el).display !== 'none' && !!el.querySelector('.aq-doc-hotspots__leads');
    var sec = el.closest('.aq-section'), more = sec && sec.querySelector('.aq-doc-hotspots__more');
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (art) tl.fromTo(art, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.inOut', clearProps: 'clipPath' }, 0);
    cards.forEach(function (c, i) {
      var k = c.getAttribute('data-k'), hot = el.querySelector('.aq-doc-hotspots__hot[data-k="' + k + '"]'), at = 0.9 + i * 0.42;
      var path = el.querySelector('path[data-k="' + k + '"]'), dot = el.querySelector('circle[data-k="' + k + '"]'), code = c.querySelector('.aq-doc-hotspots__code span:last-child');
      var left = c.classList.contains('aq-doc-hotspots__card--l');
      if (hot) {
        tl.from(hot, { scale: 0, autoAlpha: 0, duration: 0.45, ease: 'back.out(3)', clearProps: 'transform,opacity,visibility' }, at)
          .fromTo(hot, { boxShadow: '0 0 0 0 rgba(255,255,255,0.55)' }, { boxShadow: '0 0 0 22px rgba(255,255,255,0)', duration: 0.8, ease: 'power2.out', clearProps: 'boxShadow' }, at + 0.15);
      }
      if (wide && path) {
        if (D) tl.fromTo(path, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, at + 0.2);
        else tl.from(path, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, at + 0.2);
        if (dot) tl.from(dot, { autoAlpha: 0, duration: 0.15, clearProps: 'opacity,visibility' }, at + 0.65);
        tl.fromTo(c, { x: left ? 60 : -60, autoAlpha: 0, clipPath: left ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
          { x: 0, autoAlpha: 1, clipPath: 'inset(0 0% 0 0%)', duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity,visibility,clipPath' }, at + 0.6);
      } else tl.from(c, { y: 24, autoAlpha: 0, duration: 0.6, clearProps: 'transform,opacity,visibility' }, 0.9 + i * 0.12);
      if (code) tl.call(function () { m.scramble(code, 0) }, null, wide ? at + 0.65 : 0.9 + i * 0.12);
    });
    if (more) { m.claim(more); tl.from(more, { autoAlpha: 0, y: 10, duration: 0.5, clearProps: 'transform,opacity,visibility' }, '-=0.3') }
    m.on(el, function () { tl.play() }, 'top 70%');

    // Ported from Subframe Motion "Atlas hotspots" (atlas-hotspots), MIT, (c) 2026 Subframe
    // The drawing's markers and the document cards share one selection: pointing at (or focusing into) a card, or
    // pointing at a marker on the skid, glides a crosshair ring to that part (250 ms, cubic-bezier(.2,.8,.2,1), the
    // library's values), lifts that marker and lights its card and leader; the other documents step back so the eye
    // stays on the one being read. Leaving the drawing and the cards clears the selection.
    var fig = el.querySelector('.aq-doc-hotspots__fig'), hots = qa('.aq-doc-hotspots__hot'); if (!fig || !hots.length) return;
    var cross = document.createElement('span'); cross.className = 'aq-doc-hotspots__cross'; cross.setAttribute('aria-hidden', 'true'); fig.appendChild(cross);
    var ease = window.CustomEase ? (CustomEase.get('aq-ledger') || CustomEase.create('aq-ledger', 'M0,0 C0.2,0.8 0.2,1 1,1')) : 'power2.out', cur = null, shown = false;
    function pick(k) {
      if (k === cur || tl.isActive()) return; cur = k;
      el.classList.toggle('has-pick', k != null);
      qa('[data-k]').forEach(function (x) { x.classList.toggle('is-pick', x.getAttribute('data-k') === k) });
      var h = k != null && el.querySelector('.aq-doc-hotspots__hot[data-k="' + k + '"]');
      if (!h) { shown = false; m.tw(gsap.to(cross, { autoAlpha: 0, scale: 0.6, duration: 0.17, onComplete: function () { if (!shown) gsap.set(cross, { display: 'none' }) } })); return }
      var x = h.offsetLeft, y = h.offsetTop;
      if (!shown) { gsap.set(cross, { left: x, top: y, display: 'block' }); m.tw(gsap.to(cross, { autoAlpha: 1, scale: 1, duration: 0.25, ease: ease })) }
      else m.tw(gsap.to(cross, { left: x, top: y, duration: 0.25, ease: ease, overwrite: 'auto' }));
      shown = true;
    }
    cards.forEach(function (c) { var k = c.getAttribute('data-k'); c.addEventListener('pointerenter', function () { pick(k) }); c.addEventListener('focusin', function () { pick(k) }) });
    hots.forEach(function (h) { var k = h.getAttribute('data-k'); h.addEventListener('pointerenter', function () { pick(k) }) });
    el.addEventListener('pointerleave', function () { pick(null) });
    el.addEventListener('focusout', function (ev) { if (!el.contains(ev.relatedTarget)) pick(null) });
  });
});
