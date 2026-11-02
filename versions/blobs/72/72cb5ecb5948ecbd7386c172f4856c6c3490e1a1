/* CheckerRouter: the checker is set as a mosaic. The empty grid of hairlines is there first; the tiles blink on in
   scattered order (each a hard step, no fade), then each row's words rise into their tiles, top row first. Once on
   scroll-in, under 2 s. After that the visitor drives it: the row in hand trades its tiles for their inverse in the same
   scattered steps (CSS, --d per tile; works under reduced motion as an instant swap).
   Ported from Subframe Motion "Afterimage" (mosaic-reveal), MIT, (c) 2026 Subframe (kept: a grid of tiles switching
   with steps(1, end) after scattered delays, ~0.3 s spread per swap, the print traded for its inverse; replaced: the
   cover tiles over two prints with the router's own tiles and their navy/limestone inverse). */
AQmotion.fx('CheckerRouter', function (root, m) {
  root.querySelectorAll('.aq-checker-router').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var tiles = [].slice.call(el.querySelectorAll('.aq-checker-router__tile'));
    var tl = m.tw(gsap.timeline({ paused: true }));
    tiles.forEach(function (t, k) {
      var d = +getComputedStyle(t).getPropertyValue('--d') || 0, at = 0.04 * d + 0.025 * (k % 6) + 0.05 * Math.floor(k / 6);
      tl.from(t, { autoAlpha: 0, duration: 0.24, ease: 'steps(1)', clearProps: 'opacity,visibility' }, at);
    });
    el.querySelectorAll('.aq-checker-router__row').forEach(function (r, i) {
      tl.from(r.querySelectorAll('.aq-checker-router__k, .aq-checker-router__t, .aq-checker-router__d, .aq-checker-router__to'),
        { y: 10, autoAlpha: 0, duration: 0.45, stagger: 0.03, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.45 + i * 0.1);
    });
    m.on(el, function () { tl.play() }, 'top 80%');
  });
});
