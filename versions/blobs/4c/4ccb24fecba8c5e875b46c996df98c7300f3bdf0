FxGuilloche is an engraved certificate rosette (ported from Subframe Motion "Guilloché"): rings modulated by two petal waves turning very slowly, in on-navy hairlines on a navy tile.

- Shader: `AQgl.def('guilloche', …)` in this folder's `motion.js` (the licence header and what changed from the example are at its top). Runtime and API: `assets/src/motion/gl.js`; general rules: FxShader.
- Markup: `<canvas class="aq-fx-shader" data-gl="guilloche" aria-hidden="true"></canvas>` as the first child of a positioned host with `aq-fx-host` (or, where the host must not clip, `isolation: isolate`). Decoration only: aria-hidden, no text in it; the page is complete without WebGL.
- Colour: the `on-navy` token read from the host (light and dark theme), drawn on a transparent ground so the host's own ground shows. Strength is `--fx-amt` on the canvas, set by the placement in its component's style.css (default 0.3 here).
- Used on: the navy readout box of CertReadout (`assets/src/blocks/look-cert-readout.js`) on cmp-quality, behind the giant reading. The medallion is placed with `--fx-x`, `--fx-y` (fractions of the host) and `--fx-size` on the canvas.
- Motion: only while on screen, only the most visible layer on the page moves, slow (one visible cycle well over 6 s), 30 fps cap, render scale at most 0.75 and lower on phones and low-power devices; a still frame under reduced motion.
- When to use: On a certificate tile or readout only, faint, behind large type. Not behind a paragraph; never as the seal of a standard Aquemi has not confirmed.
