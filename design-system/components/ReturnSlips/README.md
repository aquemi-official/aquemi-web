ReturnSlips sets a table of what each request returns as an exchange on a limestone band: each situation large on the left, a pipe across, and what comes back dealt out as paper slips with their "When" and "Cost" fields.

Look `return-slips` (`assets/src/blocks/look-return-slips.js`), pass 9; adapted from the pool's tactile direction (sys-pw.4 tags, compliance.2 folders) and the send-and-return idea of `49-concept-send-back`, set as paper rather than drawn.

- Data: a `table` block with `"look": "return-slips"`. `cols`: [situation, what comes back, when, cost]; the labels head the columns and name each slip's fields. `rows`: [situation, returns, when, cost]. A returns cell holding several items joined by " · " gives one slip per item; the when and cost cells are split the same way when they hold the same number of parts, otherwise every slip shows the whole cell. A `{t, link, intent}` cell becomes a link (a returns link is the slip's title). `fold` and `fold_noun` fold rows as everywhere.
- Band: `aq-band--limestone`; the content sits in `aq-return-slips-wrap` with `data-theme="light"`, so the slips keep light tokens in both page themes.
- Row (`__row`): 3 / gutter / 9 columns on `line-strong` hairlines. Left (`__have`): mono index and the situation in Geist 300 at 32/38. Gutter (`__pipe`): a twin-wall pipe in `line-strong` with the water and its arrowhead in `flow`. Right (`__slips`): four slip columns; a single slip spans two.
- Slip (`__slip`): `surface-raised` paper with a `line` edge and a folded top-right corner (clip-path and a `line-strong` triangle), a short ruled header (`__ruling`: one mark per slip in the row, `line-strong`, its own mark in `flow`, so a slip reads as 2 of 4), the item in 17/24, then the fields (`__f`) under a dashed rule: mono label (a clock icon on "When") over the value. Slips in a row share a subgrid, so their rules line up.
- Phones: rows stack; the pipe turns down from the situation into its slips; slips stack full width with label and value side by side.
- Not for a plain comparison matrix (CompareTable) or for routes the reader picks (Router).

## Motion

Motion (`motion.js`): row by row the situation rises, the pipe lays from it (`--aq-pipe`) and the water runs to the arrow (`--aq-water`), then the slips are dealt out of the pipe one by one, sliding in from the left with a slight turn that settles square. One timeline under 4 s, once on scroll-in; folded rows show as they are. Hover or focus on a row runs its pipe in flow and lifts its slips. Both variables default to 1.
