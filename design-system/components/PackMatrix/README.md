PackMatrix draws a docs block that is issued again and again (one pack per client and period) as that repetition: a matrix of identical packs, one pulled out and opened beside it as a sheet of its documents.

- On the site: a `docs` block with `"look": "pack-matrix"` (renderer `assets/src/blocks/look-pack-matrix.js`); used on ind-cdmo ("The client audit pack"). Origin: no concept of its own (quota); adapted from sys-pw.2 (Swiss grid with one differing cell) and 45-concept-evidence (records read off a sheet).
- Markup: `div.aq-pack-matrix` → `div.__grid` (aria-hidden: `span.__ax--y`, `span.__ax--x`, `span.__cells` of `span.__pk` (`.is-open` navy, pulled out), `span.__lead`), `div.__sheet` (`span.__strip` navy title strip, `ol.__docs` of `li.__doc` (`.is-key`): `span.__n` Geist Light 48, `h3.__t`, `p.__d`).
- Fields: `h`, `intro`, `items` [{t, d, key, link, intent}], `fold`, `fold_noun` (phones only). Added: `matrix` {rows, cols, at: [row, col], y, x} (grid size, the pack pulled out, two axis words from the intro; decorative).
- Tokens: packs `surface-raised` on `line-strong`, the open one `navy`; leader `action`; key documents get a `flow` rule and numeral.
- Phones: the matrix small above the sheet, documents in one column, fold back on.

## Motion

The packs are dealt onto the matrix in a sweep, one is pulled out and turns navy, the leader runs to the sheet, the sheet opens from the left and the documents are laid in, numerals rolling up. Once on scroll-in, under 4 s; nothing under reduced motion.
