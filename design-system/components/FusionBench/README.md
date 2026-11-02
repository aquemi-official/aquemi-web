FusionBench shows a fabrication standard as a shop drawing and its parts list on a navy blueprint band: an isometric of the joining bench (pipe stock, clamps holding two lengths fused at a bead, heater plate, test coupon, procedure clipboard, data logger, test cap and gauge, open bore with the rinse water, certificate binders), a numbered balloon on the part each row is about, and the rows as the drawing's parts list.

- On the site: a `spec` block with `"look": "fusion-bench"` (renderer `assets/src/blocks/look-fusion-bench.js`), svc-fabrication "Our fabrication standard". No concept of its own (Gemini quota); adapted from `research/pass9/concepts/home.3.png` (an equipment drawing with leader callouts) and `sys-pw.3.png` (items pinned to the part they cover).
- Markup: `section.aq-band--navy.aq-fusion-bench-sec` → `div.aq-fusion-bench`: `__stage` (sticky on wide screens) with `div.__fig.aq-iso-figure.aq-iso-figure--navy` (IsoKit svg; leaders as `g[data-k][data-part]`; HTML balloons `__ball`), and `__parts`: `p.__cap` (caption and count), `__cols` (column legend), the fold wrapper with `ol.__list` of `li.__row` (`data-k`): `__no`, `h3.__p`, `p.__v`, `p.__m` (each with its column name in `__k`, visually hidden on desktop).
- Fields, as a spec block: `h`, `caption`, `cols`, `rows` [{`p`, `v`, `m`, `part`}], `fold`, `fold_noun`. `part` (optional): `stock`, `bead`, `exam`, `coupon`, `bore`, `binder`, `clipboard`, `logger`, `rinse`, `gauge`; default from the item's words. A row's `at` (the callouts shape's illustration position) is ignored here. The fold applies on phones only.
- Drawn here from IsoKit primitives (`isoB`, `isoPart` skid, gauge, clipboard, analyzer, binder; `isoLeader`, `isoSheet`): the kit has no fusion machine, clamps, heater plate, coupon or open bore. Candidate for IsoKit: `fusion-machine`.
- Pointing at or focusing into a row lights its balloon, leader and part (`AQiso.light`).
- Phones: drawing on top at full width, list in one column with the column names shown.

## Motion

Motion: one timeline. The sheet and bench build through `AQiso.timeline` (lines draw back to front, the rinse water runs once); then each leader runs out from its part, its balloon lands, and the parts-list rows slide in in the same order. About 4.5 s; nothing under reduced motion.
