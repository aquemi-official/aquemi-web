MembraneFace sets a short list of feed-water targets as a bento round the thing they protect: the feed end of a spiral-wound reverse osmosis element, drawn large on navy, with one target per tile around it.

- On the site: a `spec` block with `"look": "membrane-face"` (renderer `assets/src/blocks/look-membrane-face.js`), on sys-pretreatment "Water at the RO inlet". No concept image of its own: adapted from compliance.0 (bento, one limit per tile, oversized numerals, a central visual tile) and industries.3 (one object, callouts round it).
- Markup: `<div class="aq-membrane-face">` (a four-column grid with areas) → `__head` (the section head, eyebrow from `caption`), `figure.__core` (navy: `__label` "RO element · feed end", aria-hidden; `svg.__svg` with the vessel wall, anti-telescoping ring and spokes, six membrane leaves spiralling out of the permeate tube, numbered rim marks `__mark`; `figcaption.__note` = the block note), `ol.__tiles` (display: contents, `role="list"`) of `li.__tile` → `h3.__p` (index + parameter), `p.__v` (`__pre` the text before the comparator, `__n` comparator and number large in Geist Mono, `__u` the rest of the value through `tx`, so `[confirm]` stays a placeholder; a value without a comparator prints whole as `__w`), `p.__m` (the basis under a hairline).
- Fields: `h`, `caption`, `intro`, `rows [{p, v, m, hl}]`, `note`. No new fields. `hl` tints that tile `flow-tint` with a `flow` border (one per block).
- Grid: heading over two columns with tiles 1 and 2 beside it; the element 2 × 2 in the middle; tiles 3 to 6 either side; more rows run on underneath. The rim marks sit towards their tiles. Hover or focus within a tile lights its rim mark; the index numbers carry the pairing for everyone.
- Tokens: tiles `surface-raised` on `line`, values `ink`, bases `ink-muted`; the element `navy` with `limestone` lines and `on-navy-muted` furniture.
- Mid widths (up to 1100 px): two columns, the element as a wide band above the tiles. Phones (pass 12, S10): the element with its six ring numbers is the header (the numbers are 44 px buttons,
  `__jump`, over the rim, the drawing 272 px wide), the note under it; the targets run as one scroll-snap row of
  compact cards (84 % wide, the next peeking). Tapping a number brings its card into the row (smooth unless reduced
  motion); the card in view lights its number and rim pin (`is-in`; the lit number carries `aria-current`), number 01 from
  arrival. The behaviour lives in the renderer, so it works
  with motion off. Sys-pretreatment at 375 px: 1,514 -> 811 px.
- Use it for four to eight targets that protect one piece of equipment. For limits with a guaranteed outlet value use LimitStack; for many parameters ParamTiles or SpecTable.

## Motion

Motion: one timeline when the block scrolls in. The element tile wipes down, its rings draw, the membrane leaves wind out from the tube while the face turns a few degrees, the spokes settle; then each rim mark strikes and its tile rises into its cell, the index decoding and the target lifting out of its line. Under 4 s; nothing under reduced motion.
