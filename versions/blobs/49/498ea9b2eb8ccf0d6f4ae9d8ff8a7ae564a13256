SpareSheet sets like-for-like rules on a limestone drawing sheet: the title, one spare drawn large as a dimensioned part drawing, and the four-column table under them, where choosing a row draws its part.

Look `spare-sheet` (`assets/src/blocks/look-spare-sheet.js`) on a `table` block. Used on svc-service, "Like for like, or a change?". Concept: research/pass9b/concepts/svc-service.4.png (dimensioned part drawing on a limestone sheet, part list, title block), with the table's four-column like-for-like logic kept whole.

- Markup: `section.aq-spare-sheet-sec` > `div.aq-spare-sheet[data-theme=light][data-on]` > `__top` (the section head, `figure.__fig > svg.__svg` with `__cross` and one `g.__part[data-i]` per row: `g.__art` (the drawing), `__cl` centre line, `__dim` dimensions A and B, `__ball` / `__bt` balloon with the row number), `table.__table` (`thead th` with `__hn` 1 to 4; `tr.__row[data-i]` > `th > button.__pick[aria-pressed]` (`__n`, `__p`) + three `td`, each with a phone label `__k`), and `__tb` (title block, aria-hidden: the chosen part, "Part 01 / 07").
- Fields: `h`, `intro`, `cols` [part, like-for-like, change, what follows], `rows`, `kit` (`fold`, `fold_noun` no longer read: every part shows) (optional drawing per row: membrane, probe, card, seal, edi, lamp, cartridge; otherwise matched from the part's name; no match draws a plain outline).
- Drawings: flat line art in a 240 x 104 field, scaled into the 480 x 260 drawing area; dimensions carry letters only (A, B), never figures.
- Tokens: sheet `limestone` with a `line-strong` border and a `line` inner frame; equipment `line-strong` 1.5 px, details `ink-muted`, accents `flow`; table hairlines `line`; the chosen row a `flow` rule on `flow-tint`.
- Phones (pass 12, PhoneKit sticky figure): the root carries `data-pk-sticky data-pk-bp="860" data-pk-h="180"`; the
  top grid opens (`display: contents`) so the drawing is a 180 px limestone strip held under the section bar over
  the whole parts list, redrawn for the part on the reading line (`pk:change` -> `ssPick`). Lines stay 1.5 px; the
  dimension letters and the balloon number are 12 px as seen (balloon r 17). Every part shows (S7). Each row: the
  part button, then like-for-like and change side by side, what follows across both, under their column names. A row
  whose answer holds a word of 16+ letters (`is-wide`, e.g. "polytetrafluoroethylene") stacks its two answers, so
  the word is never split mid-word.
  No title block on phones.

Motion: the first part draws on the board (outline inks in, centre line and dimension lines run out from their middle, balloon and letters strike) while the column heads and rows print. Once, about 2 s. Choosing another row (pointer, focus, button) redraws that part in 0.7 s (repeats). Nothing under reduced motion: the chosen part just shows.
