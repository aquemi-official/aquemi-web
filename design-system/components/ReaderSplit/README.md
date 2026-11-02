ReaderSplit sets an evidence table on a band split down the middle: the readers (auditors, inspectors) on the navy half, what each reads and where we answer it across the seam on the limestone half, row against row.

- On the site: a `table` block with `"as": "evidence"` and `"look": "reader-split"` (renderer `assets/src/blocks/look-reader-split.js`); used on ind-meddevice ("Who audits your water system"). Origin: no concept of its own (quota); adapted from systems.2 (navy/limestone split, the seam as a boundary), STYLE-ATLAS hybrid 4 in light type.
- Markup: `section.aq-reader-split-sec` (limestone, `aq-band--split` so the next section restarts the alternation) → `span.__ground` (navy left half) → `div.aq-reader-split` → `div.__head` (H on navy), `p.__colh`, `ol.__rows` of `li.__row` → `div.__who` (index, `h3.__t` Geist Light 28/34), `span.__tie` with `span.__node`, `div.__what` (`p.__read` Geist Mono 17/27, `a.__go`).
- Fields: `h`, `intro`, `cols`, `rows` [who, read, {t, link, intent}], `fold`, `fold_noun` (all widths: the block's own fold).
- Hover/focus a row: the tie draws across the seam and the node fills `limestone`.
- Phones: one column on limestone, each reader a navy bar over its reading.

## Motion

Row by row the reader slides in from the left, the node strikes on the seam, the tie shoots across and the reading arrives from the right. Once on scroll-in, under 3.5 s; folded rows left alone; the heading stays with the core.
