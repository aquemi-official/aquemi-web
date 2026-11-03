/* RetrofitPlant: the existing plant is drawn and the water runs it once at full strength (IsoKit's choreography, the
   faint "existing" state held off until then), then the plant drops back to existing, the sheet moves in on the picked
   upgrade (CSS transition on the camera group, 0.9 s) and its stages light; the tab list and the panel rise. One timeline, once, under 5 s. Picking another upgrade fades the sheet over
   (CSS). Phones (pass 12): the cropped sheet fades in, the chips rise in turn, then the panel; picking a chip moves
   the camera and the key-plan window as on desktop (CSS transition, none under reduced motion). */
AQmotion.fx('RetrofitPlant', function (root, m) {
  root.querySelectorAll('.aq-retrofit-plant').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var svg = el.querySelector('.aq-retrofit-plant__svg'), q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    if (m.narrow()) { var t = m.tw(gsap.timeline({ paused: true }));
      t.from(el.querySelector('.aq-retrofit-plant__sheet'), { autoAlpha: 0, duration: 0.5, ease: 'power2.out', clearProps: 'opacity,visibility' }, 0);
      t.from(q('.aq-retrofit-plant__tab'), { y: 10, autoAlpha: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.2);
      t.from(q('.aq-retrofit-plant__panel:not(.is-off) > *'), { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.4);
      m.on(el, function () { t.play() }, 'top 80%'); return }
    var tl = window.AQiso && svg ? AQiso.timeline(svg, m, { draw: 1.2, pipe: 0.6, flow: 1.3, stagger: 0.05, keep: true }) : null;
    if (!tl) return;
    function relight() { q('.aq-retrofit-plant__svg .is-lit').forEach(function (x) { x.classList.remove('is-lit') });
      String(svg.getAttribute('data-on') || '').split(' ').forEach(function (k) { if (k) q('.aq-retrofit-plant__svg [data-iso-id="' + k + '"], .aq-retrofit-plant__svg [data-iso-to="' + k + '"]').forEach(function (x) { x.classList.add('is-lit') }) });
      svg.classList.add('is-retro'); aim(false) }
    /* the camera: the whole plant while it is drawn and the water runs, then it moves in on the picked upgrade */
    var cam = el.querySelector('.aq-retrofit-plant__cam'), win = el.querySelector('.aq-retrofit-plant__kwin');
    function aim(wide, now) { if (!cam) return; var x = now ? ';transition:none' : '';
      cam.setAttribute('style', (svg.getAttribute(wide ? 'data-cam0' : 'data-cam') || '') + x); if (win) win.setAttribute('style', (svg.getAttribute(wide ? 'data-win0' : 'data-win') || '') + x);
      if (now) { cam.getBoundingClientRect(); cam.style.transition = ''; if (win) win.style.transition = '' } }
    aim(true, true);
    svg.classList.remove('is-retro'); q('.aq-retrofit-plant__svg .is-lit').forEach(function (x) { x.classList.remove('is-lit') });
    var te = tl.labels.end || 3.4;
    tl.call(relight, null, te + 0.1);
    tl.from(q('.aq-retrofit-plant__tab'), { x: -14, autoAlpha: 0, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 0.6);
    tl.from(q('.aq-retrofit-plant__panel:not(.is-off) .aq-retrofit-plant__term, .aq-retrofit-plant__panel:not(.is-off) .aq-retrofit-plant__go'), { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out', clearProps: 'transform,opacity,visibility' }, 1.0);
    tl.from(el.querySelector('.aq-retrofit-plant__legend'), { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, te);
    m.on(el, function () { tl.play() }, 'top 70%');
  });
});
