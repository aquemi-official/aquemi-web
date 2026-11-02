FxShader is an ambient WebGL layer (a water surface, a flow field, guilloché, contours) drawn behind one section's content from the design tokens; use it for the one material moment on a page.

- Markup: give the section (or a figure) `aq-fx-host` and put `<canvas class="aq-fx-shader" data-gl="<shader>" aria-hidden="true"></canvas>` as its first child. The content after it stays on top. Shaders are registered with `AQgl.def()` in their component's `motion.js` (see `assets/src/motion/gl.js` for the API).
- Colours come from tokens only: a shader names the tokens it uses (`flow`, `navy`, `limestone`, `surface`…) and `AQgl` reads them from the host, so the layer follows light and dark themes and recolours when the theme changes.
- Motion rules (brand book, Motion, "Ambient layers"):
  - it runs only while on screen and the tab is visible, and only the most visible layer on the page moves;
  - slow: one visible cycle takes 6 s or more; no flashing, nothing faster than water;
  - under `prefers-reduced-motion` it draws one still frame;
  - behind text it stays faint, so body text keeps AA contrast; loud shaders sit behind figures or headlines only.
- Strength: each placement sets `--fx-amt` on its canvas in its component's style.css (per theme if needed); the shader multiplies its alpha by it. A canvas is premultiplied and transparent: the shader draws ink, the host's ground shows.
- Budget: at most two layers on a page. A canvas marked `data-gl-optional` (the Closing ripple) is removed when the page already has two others. Frames are capped at 30 fps (60 for pointer-driven layers), render scale at most 0.75 of device pixels, lower on phones and low-power devices. `AQgl.bench(canvas)` returns a layer's GPU time per frame.
- Feedback layers (a field that remembers, e.g. ripples): `AQgl.def(name, { sim })` uploads a CPU field as the texture `u_state` each step (see gl.js and FxRipple).
- Shaders on the site: FxCaustics (home hero), FxRipple (closing band), FxContour (CoverageMap), FxGuilloche (CertReadout), FxPhosphor (HmiTrend), FxTruchet (ManifoldRouter), FxCutaway (MembraneFace).
- Without WebGL or JS the canvas stays empty and the host's ground shows: the page is complete without it.
- Library: most shaders are ported from the Subframe Motion library (MIT). Keep the licence header and credit in the shader's `motion.js`; search it with the `subframe-motion` MCP server (see `.claude/skills/motion-library/`).
- Only the layer filling most of the viewport moves; never more than two on a page. Don't use it for data: a chart or gauge is SVG.
