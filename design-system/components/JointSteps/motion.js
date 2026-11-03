/* JointSteps: the sheet draws the joint the IsoKit way and the rail's steps rise in turn (once, under 3.5 s). Then the
   page's one scroll-linked story: as the rail is read, scroll position picks the step (stepwise, no easing between
   stages), the step's marker and number light and the sheet shows that stage on the joint (plan dimensions and tag,
   lot markings, coupon, joint zone, test cap, water through the bore). Pointing at or focusing a step seeks to it.
   It never pins or changes scroll speed; under reduced motion nothing runs (first step shown, every step readable).
   Ported from Subframe Motion "Scroll 360 product viewer" (scroll-turntable), MIT, (c) 2026 Subframe
   (kept: scroll progress across the track mapped to an index of views with no easing, a sticky view beside the
   scrolling track, direct selection seeking a view; replaced: the 32 cached canvas frames with six stages of one
   drawing, the panel's own scroller with the page's scroll). Phones (pass 12): PhoneKit's sticky strip names the step
   on the reading line instead (the look's script calls AQset), so the scroll story stands down while it is on. */
AQmotion.fx('JointSteps', function (root, m) {
  root.querySelectorAll('.aq-joint-steps').forEach(function (el) {
    if (!m.free(el)) return; m.claim(el);
    var qa = function (s, r) { return [].slice.call((r || el).querySelectorAll(s)) };
    var svg = el.querySelector('svg.aq-iso'), fig = el.querySelector('.aq-joint-steps__fig'), rail = el.querySelector('.aq-joint-steps__rail'), steps = qa('.aq-joint-steps__step');
    var tl = svg && window.AQiso ? AQiso.timeline(svg, m, { draw: 1.2, pipe: 0.8, flow: 1 }) : null;
    if (!tl) tl = m.tw(gsap.timeline({ paused: true }));
    var tag = el.querySelector('.aq-joint-steps__tag');
    if (tag) tl.from(tag, { autoAlpha: 0, x: -10, duration: 0.4, clearProps: 'opacity,visibility,transform' }, 1);
    if (steps.length) tl.from(steps, { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', clearProps: 'transform,opacity,visibility' }, 0.3);
    m.on(el, function () { tl.play() }, 'top 70%');
    /* the scroll story */
    var cur = -1;
    function set(i) {
      i = Math.max(0, Math.min(steps.length - 1, i)); if (i === cur) return; cur = i;
      steps.forEach(function (s, k) { s.classList.toggle('is-on', k === i) });
      if (fig) fig.setAttribute('data-st', steps[i].getAttribute('data-st'));
    }
    el.AQset = set;
    if (!rail || !window.ScrollTrigger || steps.length < 2) return;
    m.tw(ScrollTrigger.create({ trigger: rail, start: 'top 55%', end: 'bottom 55%',
      onUpdate: function (st) { if (!el.hasAttribute('data-pk-on')) set(Math.floor(st.progress * steps.length)) },
      onRefresh: function (st) { if (st.progress > 0 && !el.hasAttribute('data-pk-on')) set(Math.floor(st.progress * steps.length)) } }));
  });
});
