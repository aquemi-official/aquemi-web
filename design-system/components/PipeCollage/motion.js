/* PipeCollage: the poster is pasted up, then the text is hung on it. Each tile of the board slides in from the edge
   it faces behind its own mask (left column from the left, right from the right, middle from above), the elbow's
   pipe and the flow lines draw along their run, the numbers drop onto the pieces; the editorial blocks follow down the
   field, each bracket drawing down before its words rise. Board and blocks play once, under 3 s. Hovering or
   focusing a block frames its piece (renderer). The section heading is left to the core. */
AQmotion.fx('PipeCollage', function (root, m) {
  root.querySelectorAll('.aq-pipe-collage').forEach(function (el) {
    var board = el.querySelector('.aq-pipe-collage__board'), list = el.querySelector('.aq-pipe-collage__blocks');
    if (!list || !m.free(list)) return;
    m.claim(list); if (board) m.claim(board);
    var D = window.DrawSVGPlugin;
    if (board && board.offsetParent) {
      var tl = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
      [].forEach.call(board.querySelectorAll('.aq-pipe-collage__cell'), function (c, i) {
        var ed = c.getAttribute('data-edge'), dx = ed === 'l' ? -60 : ed === 'r' ? 60 : 0, dy = dx ? 0 : -60;
        tl.from(c, { x: dx, y: dy, autoAlpha: 0, duration: 0.7, ease: 'power4.out', clearProps: 'transform,opacity,visibility' }, 0.06 * i);
      });
      var lines = [].slice.call(board.querySelectorAll('[data-f="pipe"], [data-f="fl"], [data-f="flo"]'));
      if (D && lines.length) tl.fromTo(lines, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut', stagger: 0.08, clearProps: 'strokeDasharray,strokeDashoffset' }, 0.6);
      tl.from(board.querySelectorAll('.aq-pipe-collage__n'), { y: -8, autoAlpha: 0, duration: 0.35, stagger: 0.08, clearProps: 'transform,opacity,visibility' }, 1.2);
      /* cells sit inside a placing <g transform>; GSAP moves only the inner cell, so clearing it never loses the placement */
      m.on(board, function () { tl.play() }, 'top 75%');
    }
    [].forEach.call(list.querySelectorAll('.aq-pipe-collage__block'), function (b, i) {
      var bt = m.tw(gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } }));
      bt.from(b, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: 'power2.inOut', clearProps: 'clipPath' }, 0)
        .from(b.children, { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.06, clearProps: 'transform,opacity,visibility' }, 0.2);
      m.on(b, function () { bt.delay(m.narrow() ? 0 : (i % 2) * 0.12).play() }, 'top 88%');
    });
  });
});
