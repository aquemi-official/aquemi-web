DerivationSheet works a grade table as an engineering derivation on a calculation pad: each row is a numbered line read like an equation, step, what sets it, then the typical water boxed as the answer, with a device limit set as the line's hero figure.

- On the site: a `table` block with `"as": "grades"` and `"look": "derivation-sheet"` (renderer `assets/src/blocks/look-derivation-sheet.js`); used on ind-meddevice (the device limit worked back to the water grade). Origin: no concept of its own (quota); adapted from sys-pw.0 (numbers as heroes, stepping type) on a calculation sheet.
- Markup: `div.aq-derivation-sheet` (pad: `svg.__grid` pattern, `span.__margin` double rule in `flow`) → `ol.__lines` of `li.__line` (`.is-figure`) → `span.__no` "(1)", `div.__given` (mono key, `h3.__t` Geist Light 24/31), `span.__op` arrow svg, `div.__lim` (`p.__set` mono, or the hero `p.__v` → `span.__num` Geist Mono Light 72 + `span.__u`, then `p.__ref`), `span.__op.is-imp` double arrow, `div.__ans` (`p.__w`, `span.__box` frame and underline).
- Fields: `cols` [step, typical water, what sets it], `rows`, `intro`. A "what sets it" cell that opens with a number and unit, optionally "(reference)" and "; rest", becomes the hero figure (parsed, no new field).
- Tokens: pad `surface-raised` with a `line` grid, `ink` answer box (hover `flow`), arrows `ink-subtle` / `flow`. Column keys show on the first line only (every line on phones).
- Phones: each line reads down the pad, arrows turned down.

## Motion

The derivation is written out line by line: the margin rule draws down; per line the number is set, the step writes in from the left, the arrow draws, the limit appears (a hero figure rolls up to its value on odometer wheels, sliding-number via `m.count`), the double arrow draws and the answer is boxed. Once on scroll-in, under 5 s; nothing under reduced motion; complete without script. Pointing at a line re-runs its working: the arrow and then the implication draw again (0.2 s each) while the answer box turns flow.
