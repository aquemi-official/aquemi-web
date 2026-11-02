SheetPreviews sets a short document list as a Swiss row of sheets: a huge index numeral, a paper sheet whose thumbnail shows what kind of document it is, then its code, name and line.

- On the site: a `docs` block with `"look": "sheet-previews"` (renderer `assets/src/blocks/look-sheet-previews.js`), on sys-pretreatment "Documents delivered". No concept image of its own: adapted from sys-pw.2 (Swiss grid, huge numerals) and compliance.2 (documents as physical paper), with a thumbnail per document kind.
- Markup: `div.__top` (section head, then the block link as a link button) and `ol.aq-sheet-previews` (one column per item) of `li.__item` → `__num` (aria-hidden), `div.__sheet` (`data-theme="light"`; `svg.__svg`: limestone paper, dog-ear, header lines, the code in a box, the thumbnail, a title-block rule), `p.__code`, `h3.__t` (a link when the item has one), `p.__d`.
- Fields: as DocList: `h`, `items [{t, d, code, key, link, intent, tag}]`, `key`, `fold`, `fold_noun`, `link`, `link_label`, `intent`. Codes come from DocList's `docCode`. New optional per item: `sheet`: `basis` (a month-by-month grid, two columns hatched), `curves` (two projection curves), `logic` (a logic sequence), `certificate` (frame, seal, lot strip); anything else draws ruled text.
- Key documents keep DocList's rule: the code in `flow` (and here the numeral in `ink`, the others in `line-strong`). No badges.
- Thumbnails are decoration with no values; the text carries the meaning.
- Phones: two columns, smaller numerals; the block's fold applies on phones only.
- Use it for three to six documents a reader should recognise at a glance. For long registers use DocList; for documents tied to parts of a drawing, DocHotspots.

## Motion

Motion: on scroll-in the sheets start as one squared stack in the first column and deal out to their columns, turning flat as they land; the numerals rise; each thumbnail draws itself and its code decodes, the text following. Under 3 s. Phones: each sheet rises into place. Hover lifts a sheet (CSS). Nothing under reduced motion.
