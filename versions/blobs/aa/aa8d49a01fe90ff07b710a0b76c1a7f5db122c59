CapitalRequest sets a page's reasons to buy as a capital request form already filled in: one paper sheet with a folded corner, a numbered field per reason with its text typed on the field line, an "Attach" link to the page that holds the source, and the references a reason rests on as mono boxes in the margin.

- On the site: a `grid` block with `"look": "capital-request"` (renderer `assets/src/blocks/look-capital-request.js`), first-system "Making the case inside your company" (pass 12 build round D). Replaces industry-feed there; industry-feed stays in the section library.
- Origin: concept 247 (`design-system/inspiration/gemini/247-p12-first-system-case.png`, builder notes in `research/pass12/concepts/log.md`). Taken from it: the folded-corner sheet, the boxed numbers, the Attach link with a paperclip per field, the codes in the margin beside field 02, the 2 + 2 field layout, the phone as the same form one column wide. Not taken: its lorem lines (the page's four reasons fill the fields), the "Aquemi" wordmark and the 1440px / 390px mock-up labels.
- Markup: `<div class="aq-capital-request" data-n>` > `__sheet[data-theme="light"]` > `svg.__fold` (flap and crease, aria-hidden), `p.__title`, `ol.__fields` > `li.__field[.is-half][.has-codes]` (`__n` aria-hidden, `h3.__t` > `__type` + `__caret`, `ul.__codes[aria-hidden="true"]` > `li.__code` (the codes repeat `d`, so screen readers hear them once), `p.__d`, `a.__attach` with `svg.__clip` and a screen-reader tail ": the page behind <label>", `__rule`).
- Fields: `h`, `intro` (section head), `sheet` (look-only: the form's title; default "Capital request"), `items [{t, d, link, tag, codes}]`. `codes` lists the references to set in the margin; each must already appear in that item's `d` (DR-018: the margin repeats, never adds). Without `codes`, an item's `tag` stands there alone. An item without `link` has no Attach link.
- Layout: the first fields run the full width (above 860 px their Attach link sits at the right of the text's last line, as in the concept, so no empty band under the text), the last two share a row when there are 3 or more (4 items: 01, 02, then 03 and 04 side by side). The sheet is at most 896 px wide and sits 128 px in from the content edge (112 px under 1100 px) so the margin holds the codes.
- Tokens: paper `surface-raised` with `line-strong` edges, rules and number boxes; the flap `surface-sunken`; reading text `ink`; Attach links and the caret `flow` (hover `action-hover`, focus ring `focus`). The sheet carries `data-theme="light"`, so it stays paper in the dark theme.
- Motion (`motion.js`): the sheet is laid down, then field by field the number box lands, the label types in behind a caret (ported from Subframe Motion "Editing caret", MIT), the text settles, the line rules in, the codes stamp into the margin and Attach comes up. Once, about 2.8 s. Reduced motion: the filled form, nothing moves. Hover on Attach turns the paperclip 12 degrees (160 ms).
- Not for: reasons without a buying document to fill (use LinkGrid or StandardTiles), or more than 6 items (the form gets long; split the case).

## Phones

No PhoneKit: there is nothing to pick and no drawing to follow, so the phone keeps the whole idea, the same form one column wide (under 600 px every field runs full width; 600-860 px keep the 2 + 2 layout).

- The margin goes; the codes come in under their field's label as a row of mono boxes (14 px / 20 px), still beside field 02.
- Reading text 15 px / 23 px, labels 18 px, the sheet title 20-22 px; number boxes 32 px.
- Each Attach link is a 44 px row target at the field's right; the screen-reader name says which page it opens ("Attach: the page behind <label>").
- The fold shrinks to 32 px; sheet padding 16 px under 600 px.
