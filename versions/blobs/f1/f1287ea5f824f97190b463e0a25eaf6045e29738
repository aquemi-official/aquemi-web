/* TieInRun: the page's one scroll-linked story. One progress value, read from the steps list passing the reading line
   (60 % of the viewport), drives the drawing stage by stage: the new outlet fades in as a dashed planned outline, the
   change boundary is ruled round it, the branch turns solid (the dashes close up and the fills come in), then the water
   runs into the new branch; the step on the reading line and its marker take the flow colour, the other steps quiet.
   Scrubbed with the scroll, never pinned, never changes scroll speed; readable at every position; past the end the
   drawing rests in its finished, released state. Nothing under reduced motion: the drawing is complete.
   Ported from Subframe Motion "Scroll-driven image reveal" (scroll-window), MIT, (c) 2026 Subframe (kept: one scroll
   progress fanned out into staggered per-layer phases, phase = clamp(p * 1.24 - offset), each eased with smoothstep
   p * p * (3 - 2p) before it moves its layer; replaced: the photo slices and their clip apertures with the drawing's
   stages and their dash, fill and draw values, the inner scroller with the page's own scroll).
   Phones (pass 12): PhoneKit holds the drawing as a sticky strip and names the step on the reading line; the drawing
   eases to that step's stage instead of scrubbing. */
AQmotion.fx('TieInRun', function (root, m) {
  root.querySelectorAll('.aq-tie-in-run').forEach(function (el) {
    if (!m.free(el) || !window.ScrollTrigger) return; m.claim(el);
    var steps = [].slice.call(el.querySelectorAll('.aq-tie-in-run__step')), mks = [].slice.call(el.querySelectorAll('.aq-tie-in-run__mk'));
    var n = Math.min(4, steps.length) || 1, D = window.DrawSVGPlugin, list = el.querySelector('.aq-tie-in-run__steps');
    var flows = [].slice.call(el.querySelectorAll('.aq-tie-in-run__new .aq-iso__flow'));
    function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x) }
    var last = -2, pk = { p: 0 }, live = function () { return el.hasAttribute('data-pk-on') }, trig = null;
    function paint(p, at) {
      if (at == null && live()) return;  // phones: PhoneKit's active step drives the stages (below)
      for (var i = 0; i < 4; i++) el.style.setProperty('--p' + i, sm((p - i / n) * n * 1.24).toFixed(3));
      if (D && flows.length) gsap.set(flows, { drawSVG: (sm((p - 3 / n) * n * 1.24) * 100).toFixed(1) + '%' });
      var a = at != null ? at : p <= 0 ? -1 : Math.min(n - 1, Math.floor(p * n));
      el.classList.toggle('is-live', at != null || (p > 0 && p < 1));
      if (a === last) return; last = a;
      steps.forEach(function (s, i) { s.classList.toggle('is-on', i === a) });
      mks.forEach(function (k, i) { k.classList.toggle('is-on', i === a); k.classList.toggle('is-future', a >= 0 && i > a) });
    }
    trig = m.tw(ScrollTrigger.create({ trigger: list, start: 'top 60%', end: 'bottom 60%', onUpdate: function (st) { paint(st.progress) },
      onRefresh: function (st) { paint(st.progress) } }));
    // Phones (PhoneKit sticky strip): the step on the reading line sets the stage; the drawing eases to the end of that
    // step's phase (0.6 s), never scrubbed. Leaving phone width hands the drawing back to the scroll.
    el._tirMotion = true;
    function toStep(k) { k = Math.max(0, Math.min(n - 1, k)); last = -2;
      m.tw(gsap.to(pk, { p: (k + 1) / n, duration: 0.6, ease: 'power2.inOut', overwrite: true, onUpdate: function () { paint(pk.p, k) } })) }
    el.addEventListener('pk:change', function (ev) {
      var d = ev.detail || {};
      if (d.on && d.index >= 0) toStep(d.index);
      else { gsap.killTweensOf(pk); last = -2; paint(trig ? trig.progress : 1) }
    });
    if (live() && el.getAttribute('data-pk-active') != null) toStep(+el.getAttribute('data-pk-active'));
  });
});
