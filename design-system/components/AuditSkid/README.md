AuditSkid draws a documents block as the system those documents describe: one isometric skid in the middle of a light sheet, each document a numbered callout on a leader to the part it covers.

- On the site: a `docs` block with `"look": "audit-skid"` (renderer `assets/src/blocks/look-audit-skid.js`); used on ind-cdmo ("The client audit pack", anchor `audit-pack`). Concept: pass 9b ind-cdmo.1 (a white PP skid centred, the pack's documents as numbered callouts on both sides, mono corners).
- Drawing: IsoKit parts (`skid`, `ro`, `panel`, `tank`, `pump`, `analyzer`, `outlet`, `valve`) and pipes; polypropylene Purified Water plant only (generation rack, tank, loop, point of use; no still, no stainless).
- Markup: `div.aq-audit-skid` (grid: left callouts, drawing, right callouts) → `div.__fig` (aria-hidden: `svg.aq-iso`, `span.__pin` per document, `span.__ring` crosshair), `ol.__docs` (inside the fold) of `li.__doc.is-l|is-r` (`tabindex=0`, `data-part`: `span.__n`, `h3.__t`, `p.__d`), `svg.__leads` (leaders laid by the look from the rendered callouts, ResizeObserver), `span.__corner` × 2 (aria-hidden).
- Fields: `h`, `intro`, `items` [{t, d, key, link, intent, part}], `fold`, `fold_noun` (phones only), `corner` (short mono word for the right corner). `part`: `ro`, `sample`, `skid`, `analyzer`, `outlet`, `tiein`, `tank`, `pump`, `panel` (default `skid`). The first half of the documents sit left, the rest right.
- Tokens: sheet `surface-raised` on a `line` frame; pins `surface-raised` on `line-strong`, key documents' numerals and pins `flow`, the chosen pin `navy`; leaders `line-strong`, the chosen one `flow`; a chosen part's lines `flow` over `flow-tint`. Heading Geist Light 72/76 (36/40 on phones).
- Interaction (in the look, so it works without motion): pointing at, focusing or clicking a document selects it (persists): the ring glides to its pin, the pin fills and grows to 1.12, leader and part turn flow, the other documents quiet to 0.62. Instant under reduced motion.
- Mid widths: drawing above, documents two a row, no leaders. Phones: drawing full width, one column, fold back on, right corner dropped.

## Motion

The system is drawn through the IsoKit choreography, the pins come in with the pipes, then each leader draws from its pin out to the callout and the callout rises in as it arrives (0.12 s apart). Once on scroll-in, under 5 s; at the end the first document is selected without quieting the others. Selection ported from Subframe Motion "Image hotspots" (atlas-hotspots): shared pin/list selection, ring glide 0.25 s cubic-bezier(.2,.8,.2,1), chosen pin to 1.12.

## Phones (pass 12)

The drawing is a 200 px strip held under the header (PhoneKit sticky figure, `data-pk-zoom="1.8"`; the svg, pins and ring sit in `__pan`). The document on the reading line is selected exactly as on desktop (pin filled, crosshair ring, its part in flow) and the strip pans and zooms to its pin; pins and ring are counter-scaled so they stay about 29 px. Every document shows (S7: each one is pinned, so none is folded away); the others are not quieted on phones. Tapping a document selects it too. Desktop and the 860-1100 px layout are unchanged.
