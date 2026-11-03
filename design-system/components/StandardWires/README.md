StandardWires sets a table of standards on a navy blueprint and wires each answer to the equipment that answers it, so a reader who starts from a standard sees which part of the system meets it.

- On the site: a `table` block (shape `as: "evidence"`) with `"look": "standard-wires"` (renderer `assets/src/blocks/look-standard-wires.js`). Origin: pass 9 concept `research/pass9/concepts/systems.3.png`.
- Markup: `<div class="aq-standard-wires">` holding `div.__heads` (column names, aria-hidden), `ol.__list` of `li.__row[data-sw]` → `div.__std` (`span.__n` index box, `h3.__s` standard in mono), `div.__ask` (`p.__a`), `div.__ans` (`p.__chip` with the row's page link), `span.__run` (the wire to the plate), `div.__cell` (the drawing: `svg.aq-iso.aq-iso--navy.__svg`, its `path.__wire` and `circle.__end`, aria-hidden); then `div.__foot` (title block). Column keys repeat in each row as visually hidden `p.__k` for screen readers.
- Fields: `h`, `intro`, `cols`, `rows [[standard, asks, {t, link, art}]]`, `fold`, `fold_noun`, `nav` (plate title). `art` (new, optional, on the answer cell): `analyzer`, `storage`, `panel`, `pretreatment` or `generation`; default from the link's page.
- Tokens: `navy` band, `on-navy` standards in Geist Mono 26/34, `on-navy-muted` asks, wires and plate lines; hover or focus a row: the chip fills with a `flow`/`navy` mix, its wire and equipment turn `flow`.
- Phones: rows stack (standard, asks, then the chip beside its drawing); header, run, wire and title block go. Pass 12: the drawing is 120 px tall (the 300 x 170 plate drawn 212 px wide and shifted so the part sits mid-cell), tied to the answer chip by a short hairline wire.

## Motion

Motion: each row is wired up as it scrolls in: the index pops, the standard decodes, the asks fade up, the chip strikes on; `AQiso.timeline` draws the part and runs its water while the wire runs from the chip across to the plate and steps to the part; the part lights as the wire lands, then settles. Folded rows appear whole when opened. Under 5 s; nothing under reduced motion.

Ported (pass 9b): Subframe Motion "Expandable ledger" (expandable-ledger): opening the fold expands each new row from nothing (210 ms, cubic-bezier(.2,.8,.2,1)) and then wires it up like the rows above.
