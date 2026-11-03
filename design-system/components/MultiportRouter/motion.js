/* MultiportRouter: the valve is set, then turned. On scroll-in the valve fades up, the pipes run out from its ports to
   the cards (DrawSVG on the wall and bore), the cards follow in a short stagger and the lever swings from rest to
   port 01. On every choice afterwards the water runs the chosen pipe again, port to card (0.45 s). Once on scroll-in,
   under 3 s; nothing under reduced motion (the lever then simply turns, by CSS). Phones (PhoneKit chips): the valve
   and the chips rise in; the lever still follows the chip by CSS. */
AQmotion.fx('MultiportRouter', function (root, m) {
  root.querySelectorAll('.aq-multiport-router').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    if (window.AQmultiport) window.AQmultiport.layout(el); // pipes in their real geometry before DrawSVG measures them
    var q = function (s) { return [].slice.call(el.querySelectorAll(s)) };
    var lever = el.querySelector('.aq-multiport-router__lever'), valve = el.querySelector('.aq-multiport-router__valve'), wide = !m.narrow();
    var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
    if (valve) tl.from(valve, { autoAlpha: 0, y: 12, duration: 0.6, clearProps: 'transform,opacity,visibility' }, 0);
    if (wide && window.DrawSVGPlugin) {
      var pipes = q('.aq-multiport-router__wall, .aq-multiport-router__bore');
      tl.fromTo(pipes, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut', stagger: 0.04, clearProps: 'strokeDasharray,strokeDashoffset' }, 0.35)
        .fromTo(q('.aq-multiport-router__pipe.is-on .aq-multiport-router__water'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'power1.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 1.3);
    }
    tl.from(wide ? q('.aq-multiport-router__card') : q('.aq-multiport-router__chip, .aq-multiport-router__card'), { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.07, clearProps: 'transform,opacity,visibility' }, wide ? 0.7 : 0.2);
    if (lever) {
      var end = lever.style.getPropertyValue('--a') || '0deg';
      tl.set(lever, { transition: 'none' }, 0).fromTo(lever, { '--a': '-90deg' }, { '--a': end, duration: 1.0, ease: 'aq-settle' }, 0.5).set(lever, { clearProps: 'transition' });
    }
    m.on(el, function () { tl.play() }, 'top 75%');
    // a choice: the water runs the chosen pipe, port to card
    function run(i) {
      if (!window.DrawSVGPlugin) return;
      var w = el.querySelector('.aq-multiport-router__pipe[data-i="' + i + '"] .aq-multiport-router__water');
      if (w) m.tw(gsap.fromTo(w, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.45, ease: 'power1.out', clearProps: 'strokeDasharray,strokeDashoffset' }));
    }
    el.addEventListener('click', function (ev) {
      var t = ev.target.closest('.aq-multiport-router__card'); if (!t || ev.target.closest('a') || el.querySelector('[data-pk-on]')) return;
      run(t.getAttribute('data-i'));
    });
  });
});
