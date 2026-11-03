DocHotspots pins the documents delivered with a system to the parts of the skid they cover, so the reader sees what each record is about on the equipment itself.

- On the site: a `docs` block with `"look": "doc-hotspots"` (renderer `assets/src/blocks/look-doc-hotspots.js`). Origin: pass 9 concept `research/pass9/concepts/sys-pw.3.png` (product render with hotspot dots leading to document cards).
- Markup: `<section class="aq-section aq-band--navy aq-doc-hotspots-sec">` → `<div class="aq-doc-hotspots">` (a 2:1 stage): `svg.__leads` (one path and end dot per document, 100 × 50 units), `div.__fig` (the page's equipment drawing as an `aq-illustration` painted `limestone`, plus one `span.__hot` per document), `ol.__cards` of `li.__card--l|--r` (`p.__code` "01 / FAT & SAT", `h3.__t`, `p.__d`); then `p.__more` with the block link (Button link).
- Fields: `h`, `intro`, `items [{t, d, code, key, link, intent, at}]`, `link`, `link_label`, `intent`, `art` (page id whose drawing to use; default the page). `at: [x, y]`: the hotspot on the drawing as fractions of its box (0 to 1 from the top left). Codes come from the DocList lookup (`docCode`) unless `code` is given; `key` documents show their code in `flow`.
- Layout: cards alternate left and right, top to bottom; leaders run from each hotspot to its card's inner edge. Hovering a card lights its hotspot and leader. Four to six documents.
- Narrow (container 1080 px or less): the drawing on top with numbered hotspots, the cards in a grid below (one column on phones), no leaders. Phones: card padding trimmed by about a fifth (pass 12).

## Motion

Motion: the skid develops like a print (wipe up from the base); then each document is pinned in turn: its hotspot drops on with one ripple, the leader draws out to the stage edge, and the card slides out from behind the drawing along it while its code decodes; the index link follows. Narrow: hotspots pop and cards rise in a stagger. Under 5 s; nothing under reduced motion.

Ported (pass 9b): Subframe Motion "Atlas hotspots" (atlas-hotspots): markers and cards share one selection. Pointing at or focusing a card, or pointing at a marker, glides a crosshair ring to that part (250 ms, cubic-bezier(.2,.8,.2,1)), lifts its marker, lights its card and leader and steps the other documents back. The ring is out of the page (display none) when nothing is selected.

Pass 12: the cards list carries `data-theme="light"`, so codes, number badges and placeholders keep their light tokens on the limestone cards in the dark theme.
