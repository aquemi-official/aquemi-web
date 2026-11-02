UrsGate sets decisions that must be made before a gate as one project line running into that gate: decisions stand on stems above and below the line with huge light numerals, and the gate is a bar with its word as giant outline type cut by the page edge.

- On the site: an `options` block with `"look": "urs-gate"` (renderer `assets/src/blocks/look-urs-gate.js`); used on ind-pharma ("Decide before your requirements (URS) are approved"). Origin: no concept of its own (quota); adapted from services.0 (giant cropped outline type) and services.1 (nodes on a line to a hold point).
- Markup: `div.aq-urs-gate` (grid of 2n+1 columns plus the gate) → `span.__axis` (twin hairline, `span.__water`), `ol.__list` (display: contents) of `li.__item` (`.is-low` below the line; `span.__stem` with `span.__node`, `span.__n`, `h3.__t`, `p.__d`, optional `a.__link`), `div.__gate` (aria-hidden: `span.__bar`, `span.__mark`, `span.__word`).
- Fields: `h`, `items` [{t, d, link, link_label}], `fold`, `fold_noun` (phones only). Added: `gate` (the word set large, "URS"), `gate_label` (the mark on the bar, "Approved"); both decorative words already in the heading.
- Tokens: numerals Geist Light 72 in `ink-subtle`, stems `line-strong`, water `flow`, gate bar `action`, outline word `line-strong`. Hover/focus a decision: stem, node and numeral turn `flow`.
- Phones: the line runs down the left, decisions hang off it, the gate closes it at the bottom with the word cropped by the edge.

## Motion

The line runs out towards the gate; as it passes each decision the stem grows, the node seats, the numeral rolls up and the words rise; the water follows along the line, the bar drops across its end and the giant word wipes in. Once on scroll-in, under 4.5 s; nothing under reduced motion.
