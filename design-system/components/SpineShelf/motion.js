/* SpineShelf: the package is shelved. The shelf board draws across, the spines drop onto it one after another from
   the left (a short settle), then the key section's spine is pulled up as its index row opens; the index rows wipe in
   down the list and the open section's documents deal in. One timeline, once, under 3 s. */
AQmotion.fx('SpineShelf', function (root, m) {
  root.querySelectorAll('.aq-spine-shelf').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var spines = q('.aq-spine-shelf__spine'), board = el.querySelector('.aq-spine-shelf__board'), cap = el.querySelector('.aq-spine-shelf__cap');
    var rows = q('.aq-spine-shelf__item').filter(function (r) { return r.offsetHeight > 0 });
    var open = q('details[open] .aq-spine-shelf__docs li');
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (board) tl.from(board, { scaleX: 0, transformOrigin: '0 50%', duration: 0.7, ease: 'power2.inOut', clearProps: 'transform' }, 0);
    tl.from(spines, { yPercent: -18, autoAlpha: 0, duration: 0.55, ease: 'back.out(1.4)', stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0.25);
    if (cap) tl.from(cap, { autoAlpha: 0, duration: 0.4, clearProps: 'opacity,visibility' }, 0.9);
    tl.from(rows, { clipPath: 'inset(0 100% 0 0)', duration: 0.5, ease: 'power2.inOut', stagger: 0.05, clearProps: 'clipPath' }, 0.2);
    var pulled = spines.filter(function (s) { return s.classList.contains('is-open') });
    pulled.forEach(function (s) { s.classList.remove('is-open') });
    tl.call(function () { pulled.forEach(function (s) { var it = el.querySelector('.aq-spine-shelf__item[data-i="' + s.getAttribute('data-i') + '"] details'); if (!it || it.open) s.classList.add('is-open') }) }, null, 1.15);
    if (open.length) tl.from(open, { x: -12, autoAlpha: 0, duration: 0.4, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 1.3);
    m.on(el, function () { tl.play() }, 'top 80%');
  });
});
