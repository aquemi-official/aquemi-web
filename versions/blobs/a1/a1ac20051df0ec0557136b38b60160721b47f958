OptionTaps shows options where they would join the system, as one limestone drawing sheet: the standard train drawn solid in isometric line, each option a dashed part (the drawing convention for "optional") on its own dashed tee off the main line, a huge light title, and the options as numbered drawing notes in a narrow column whose numbers frame their part on the drawing.

- On the site: an `options` block with `"look": "option-taps"` (renderer `assets/src/blocks/look-option-taps.js`), on sys-pretreatment "Options". Origin: pass 9b concept `research/pass9b/concepts/sys-pretreatment.5.png` (limestone drawing sheet: border and title block, huge light title, options as drawing notes, note numbers pinned on the schematic); pass 9 drew it as a navy blueprint with cards under it.
- Markup: `div.aq-option-taps` (the sheet: double hairline frame) → `div.__main` (section head with the page name as eyebrow, Geist Light 120 px title; `div.__fig` > `div.__cam` (IsoKit svg `aq-iso--limestone __svg`; train parts `data-iso-id="t0…"`; option parts `.__ghost` `data-iso-id="o0…"` and tees `.__tee` `data-iso-id="tee0…"`; HTML `__label` per train part and `__mark` pin per option, aria-hidden)) and `div.__side` (right of a vertical rule: `ol.__cards` of `li.__card` notes (`p.__no` > `button.__pin[aria-pressed]` the number, `svg.__mini` the dashed part for phones, `h3.__t`, `p.__d`), then `div.__block` the title block, aria-hidden).
- Fields: `h`, `intro` (optional, under the title), `items [{t, d, spot, at, part, row, r, h}]`, `train [{part, label, r, h, ly}]`, `fold`, `fold_noun`. New optional fields: `train`, the standard parts left to right (IsoKit kinds; `label` a short drawing label; `ly` its vertical offset in px, used to keep neighbouring labels apart); per item `at` (position along the train, fractions between parts), `part` (the IsoKit kind drawn dashed), `row` (`back` above the line, `front` below), `r` / `h` passed to the part.
- Interaction (in the renderer, so it also works under reduced motion), ported from Subframe Motion "Product tour spotlight" (guided-inspection): pressing a note's number frames its part (the drawing translates and scales 1.6× in 600 ms, clamped to the plate; the other parts dim to 35 %; the part and pin light); pressing it again or Escape lets go; the arrow keys step through the notes. Hover on a note lights its part and pin (colour only). Everything is readable without it.
- Tokens: `limestone` ground, `on-limestone` frame, rules and ink, IsoKit limestone lines; the pressed pin `navy` with `on-navy`. Square corners; pins are 48 px targets.
- Phones (pass 12, S9): the sheet keeps its frame and title block; the whole-train overview (under 300 px wide at
  375, labels and parts unreadable) gives way to a crop of the train at each option's tap point over its note
  (`span.__crop`, the full column wide and about 2.1 : 1, about 136 px tall at 375: the trunk edge to edge, the
  standard parts inside the window, cut by its edge like a camera crop, the window slid along the train so it never
  shows paper past the train's ends; the nearest standard part carries its drawing label `__clab`, under it when the
  option stands behind the train and over it when in front; a tank on legs gets its tee rising into its foot). The
  number shows as a plain tag beside the note's title (`__nop`; the camera button is desktop only). Tablets
  (600-860 px): the notes run two a row. Sys-pretreatment at 375 px: 1,460 -> 1,789 px; ind-process: 1,245 -> 1,421 px.
- Use it for options that each attach at a known point of one system. For options without a place in a drawing, OptionTags or OptionModules.

## Motion

Motion: the standard train draws and the water runs it (IsoKit choreography), then each dashed part and its tee fade up in turn while its pin drops onto it and its note rises. Once, under 5 s; nothing under reduced motion.
