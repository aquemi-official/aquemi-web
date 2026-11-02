FxContour is contour lines of a slowly drifting terrain (ported from Subframe Motion "Contour terrain"), drawn as hairlines with an index contour every fifth, so a map sheet reads as a survey sheet.

- Shader: `AQgl.def('contour', …)` in this folder's `motion.js` (the licence header and what changed from the example are at its top). Runtime and API: `assets/src/motion/gl.js`; general rules: FxShader.
- Markup: `<canvas class="aq-fx-shader" data-gl="contour" aria-hidden="true"></canvas>` as the first child of a positioned host with `aq-fx-host` (or, where the host must not clip, `isolation: isolate`). Decoration only: aria-hidden, no text in it; the page is complete without WebGL.
- Colour: the `on-limestone` token read from the host (light and dark theme), drawn on a transparent ground so the host's own ground shows. Strength is `--fx-amt` on the canvas, set by the placement in its component's style.css (default 0.3 here).
- Used on: CoverageMap's limestone readout (`assets/src/blocks/look-coverage-map.js`), under the province tiles, on contact-locations.
- Motion: only while on screen, only the most visible layer on the page moves, slow (one visible cycle well over 6 s), 30 fps cap, render scale at most 0.75 and lower on phones and low-power devices; a still frame under reduced motion.
- When to use: Under a map or plan on limestone. Not under reading text, and never as data: the terrain is invented, so it must not sit where it could read as real relief.
