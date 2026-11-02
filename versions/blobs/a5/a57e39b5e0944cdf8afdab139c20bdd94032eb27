CheckerRouter sets a router table (situation, what you need, start with) as a Swiss checker of square navy, limestone and paper tiles, one band of six tiles per situation, the start page as a go tile.

- On the site: a `table` block with `"as": "router"` and `"look": "checker-router"` (renderer `assets/src/blocks/look-checker-router.js`); used on ind-pharma (where to start). Concept: pass 9b ind-pharma.0 (checker grid with slash numerals and two blueprint tiles). Replaces NumeralIndex.
- Markup: `section.aq-checker-router-sec` → `ol.aq-checker-router` (grid, 1 px gaps) → `li.__row` (six-column grid) → `div.__tile` ×6 with a tone class (`.is-navy`, `.is-lime`, `.is-paper`) and `--d` (0–5, its place in the mosaic): `__num` (aria-hidden `span.__n` "01" + `i` slash), `__sit` (`span.__k`, `h3.__t`), a filler (`.is-fill` navy, or `.is-paper` with an optional `.has-fig` IsoKit drawing `svg.__svg`), `__need` (`__k`, `p.__d`), a filler, `a.__go` (`__k`, `__to`, `__arrow`; a `.is-flat` tile when the cell has no page).
- Fields: `cols`, `rows` [situation, need, {t, link, intent}]. Added: `draws` ["outlet", "", "", "ro", ""] (optional, per row: an IsoKit part kind drawn small in the row's paper filler; pick one that names the row's subject).
- Tokens: tiles `navy` / `limestone` / `surface-raised`, text `on-navy` / `on-limestone` / `ink` with their muted pairs, hairlines `line-strong`, numerals Geist Light 88/80 with the slash in `flow` mixed toward the tile's ink, keys Geist Mono 11/16 caps. Fillers alternate navy and paper by row so the bands read as a checkerboard.
- Interaction: the row in hand (pointer, focus) gets `.is-on` and every tile trades its tone for its inverse after `--d` × 45 ms (exit × 30 ms), each a hard step: a mosaic. Instant under reduced motion.
- Under 1100 px: fillers narrow, drawings off. Phones: each situation is a 2 × 2 block (numeral | situation, then need, then start), fillers dropped, the go tile navy on odd rows.

## Motion

The empty grid is there first; the tiles blink on in scattered order (steps, no fade), then each row's words rise 10 px into their tiles, top row first. Once on scroll-in, under 2 s. Port of Subframe mosaic-reveal (tiles switching with steps(1, end) after scattered delays); the hover mosaic is the same mechanism in CSS. Nothing under reduced motion.
