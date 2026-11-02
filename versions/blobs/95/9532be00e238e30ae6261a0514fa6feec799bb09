TermsSheet sets commercial terms as a clean numbered terms table beside an isometric line drawing of a purified water skid that bleeds off the page's right edge: how you buy it next to what you buy.

- On the site: a `spec` block with `"look": "terms-sheet"` (renderer `assets/src/blocks/look-terms-sheet.js`), cmp-quality "How buying from us works". Origin: pass 9b concept `cmp-quality.4` (numbered commercial-terms table beside an isometric skid frame bleeding off the right edge).
- Markup: `<div class="aq-terms-sheet">` (`has-notes` when notes get a column) > `__table` > `__head` (aria-hidden column names) + (Fold) `ol.__list` > `li.__row` > `__n` (aria-hidden), `__c` > `h3.__t`, `__c` > `__k`, `ul.__v`, `p.__m` (> `__mk`) or `__c.__note`, `p.__go`; then `__fig` (aria-hidden) > IsoKit `svg.__svg` (skid, RO rack, panel, tank, one pipe).
- Fields: `cols [term, ours, note]`, `rows [{p, v, m, link, link_label}]`, `fold`, `fold_noun`. A value written "a · b" breaks into lines. Notes get their own column only when at least half the rows have one; otherwise the note sits under the values, introduced by the third column's name.
- Tokens: head rule `navy`, row and column rules `line-strong`, numbers mono `ink-subtle` (flow on hover), terms 300 weight, value dashes `flow`; IsoKit default light sheet. The drawing is 150 % of its column; the section clips it (`overflow-x: clip`), so the page never scrolls sideways.
- Fold: phones only (desktop shows every term).
- Phone: the drawing becomes a cropped strip above the table; rows stack number, term and values.
- Motion (`motion.js`): the head rule wipes across, rows rise 8 px 0.09 s apart; the skid builds with `AQiso.timeline` (parts draw back to front, the pipe, the water runs to the tank). Under 4 s.
- Not for: specifications with measured values (SpecTable).
