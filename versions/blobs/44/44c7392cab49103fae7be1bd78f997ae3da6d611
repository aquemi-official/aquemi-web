TimeCard sets a spec block of working terms as the shop's time card: a limestone card with its hang hole, a column header, one ruled line per term with a punch slot and number, and the block's note stamped at its foot, so pay and terms read as the paper a person on the floor handles each week.

- On the site: Careers, "Pay, benefits and terms" (`spec` block, `"look": "time-card"`; renderer `assets/src/blocks/look-time-card.js`). Origin: the tactile-object direction of `82-p9-sys-pw-4` (options as shipping tags) and `92-p9-compliance-2` (stamped folders), applied to the one paper object of a working week.
- Markup: `div.__stack` → `span.__under` (the card beneath, an outline turned 1.2°) and `div.aq-time-card[data-theme=light]` → `span.__hole`, `div.__head` (aria-hidden: "No." and the block's `cols`), the fold with `ol.__rows` of `li.__row` → `span.__n` (aria-hidden slot `i` and number), `h3.__p`, `p.__v`, `p.__m`; then `p.__note` with `span.__stamp`.
- Fields: `h`, `caption`, `intro`, `cols` [item, term, note], `rows [{p, v, m}]`, `note`, `fold`, `fold_noun`.
- Tokens: `limestone` card with `on-limestone` text, `navy` rules and stamp, Geist Light 20 terms, Geist Mono for the header, numbers and stamp only; `line-strong` outline for the card beneath. No shadows. At rest every slot is punched (filled navy); hover turns the line's slot flow.
- Phones: the card fills the width, header hidden, each line stacks item, term and note beside its number.
- Not for comparing terms across options (CompareTable, PlanChecker) or for company facts (Colophon).

## Motion

Motion: the card rises out of its slot onto the one beneath, the column names appear, then each visible line is punched in turn (motion first blanks the visible slots to dashed outlines; each fills navy and stays punched as its line types in from the left), and the note's stamp strikes once. Under 3 s; folded lines appear whole when opened; nothing under reduced motion.
