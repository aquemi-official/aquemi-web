CutawayRail reads an evidence table beside one sticky drawing: a close isometric cutaway of the plant stays in view while one card per standard runs down a rail, and the card being read lights the parts it governs, with an "active" tag and a callout naming it.

- On the site: a `table` block with `"look": "cutaway-rail"` (renderer `assets/src/blocks/look-cutaway-rail.js`). Origin: pass 9 concept `research/pass9/concepts/compliance.3.png` (sticky cutaway whose highlighted part changes with the active standard card).
- Markup: `<section class="aq-section aq-band--navy aq-cutaway-rail-sec">` → `div.aq-cutaway-rail` with `figure.__fig` (aria-hidden: `__draw` holding the IsoKit svg, a `__pin` per part, the moving `__call`, and the `__tag` with `__tag-k` and `__tag-v`) and `div.__rail` → `ol.__cards` of `li.__card` (limestone, `data-theme="light"`, `data-parts`, `data-code`): `__node` on the rail, `__std` (index, `h3.__name`), and `div.__f.__f--how|proof|go`, each with `p.__k` (column name) and `p.__v`.
- Fields, as a table: `cols`, `rows` (cells strings or `{t, link}`), `fold`, `fold_noun`. New optional fields: `tag` (the word before the active code on the drawing, e.g. "Active"); `parts`, one entry per row, the drawn parts that row governs, space-separated: `mat` (product-contact pipe cut open, drawn plain: no joint, bead or band while the joining method is open, FD-18, DR-018), `loop` (tank and loop), `pov` (point-of-use branch, valve and outlet), `ana` (analyser), `ctl` (control panel), `docs` (binders and clipboard).
- Active card: the card crossing 45 % of the viewport height, or the one under the pointer or keyboard focus (renderer; works without motion). Its parts take `is-lit` (a stronger flow line than IsoKit's default), their pins show and the callout moves to the first part. `window.AQcutaway.scan()` re-reads it.
- Desktop shows every card (the rail is the reading); the fold applies on phones only. The band's `overflow` is visible (clipped on x only) so the drawing can stick.
- Tokens: `navy` ground, limestone cards, `flow` active edge and lit lines, `on-navy-muted` rail.
- Phones: the drawing is a sticky band (at most 30 vh) above the cards; cards stack in one column; the callout hides.
- Use it for five to ten standards that each map to parts of one drawing. For a short list with documents use ProofFolders.

## Motion

Motion: when the drawing scrolls in, IsoKit's choreography builds it (sheet, parts back to front, pipes, one run of water through the loop and the cut pipe) and the tag wipes in; at the end the active card's parts light again. Each card slides in from the right as it reaches the viewport, its node popping first and its fields rising after. Drawing under 4 s, each card under 1 s; nothing under reduced motion.
