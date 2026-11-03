KeyFacts is a strip of up to four of Aquemi's own figures, each with its unit and the basis a reader can hold us to, that tells an engineer what a page stands on before they read a word of copy.

- Markup: `<dl class="aq-key-facts">` with one `<div>` per fact: `<dt>` (what and where, "Skid outlet"), then `<dd class="aq-key-facts__value">` (comparator `aq-key-facts__cmp`, figure `aq-key-facts__fig`, unit `aq-key-facts__unit`; `is-long` when the value is words or a placeholder), then an optional second `<dd class="aq-key-facts__src">` (the basis, "measured at FAT"). Keep `dt` first so screen readers read the name, then the value, then the basis.
- On the site, `wKeyFacts(facts)` in `assets/src/parts/KeyFacts.js` builds it from page `facts` `{l, v}`: the label splits at the last " · " into name and basis; the value splits off a leading comparator and a trailing unit (only when the tail after the last space has no digits and follows a figure, so a value that is a placeholder stays whole: `[outlet conductivity guarantee, µS/cm @ 25 °C]`). Placeholders keep their `[brackets]`.
- Look: a row of equal cells between two `line` hairlines, divided by `line` hairlines, on the section's own ground (no frame, plate, rulers, index numbers or dials). Each cell: the name in Geist 14/20 sentence case, `ink-muted`; the figure in Geist Mono 300 in `ink`, 28 to 40 px (20 to 24 px when `is-long`), wrapping only at spaces, with the comparator and the unit beside it in `ink-muted` mono; the basis in 12 px mono `ink-muted` at the foot. (The style also sets five or more cells smaller, for a strip outside the hero; a hero never has more than four.)
- Phones: one fact per row between `line` hairlines, the name on top (13 px), then the figure left (26 px) and the basis right (12 px). The figure's column is as wide as the figure and the basis wraps in the rest, so a long basis never squeezes a short figure. A long value (`is-long`, 17 px) takes the row width and its basis sits under it, left-aligned (`.aq-key-facts > div:has(> .is-long)`), so a placeholder value reads at any phone width. Desktop cells already stack name, value and basis.
- Value split: a leading number keeps a short unit tail whole (`<number> <unit>` splits at its first space, so a two-word unit stays together); "long" (smaller type) is judged on the figure alone, so a short number with a long unit stays large.

## What a fact is (DR-010)

- **Aquemi's own figure:** a design value or guarantee, a commitment (time, price, coverage, capacity) or a measured result. Two tests: whose number is it (ours, not a standard's), and can the reader hold us to it (a unit or condition, and a basis).
- **Never a fact:** a pharmacopoeia or regulatory limit or minimum, labelled or not; a code, clause or standard; a material family alone; a count of our own documents, stages or roles; a policy line without a figure. Those belong in tables (SpecTable, LimitGauges); the eyebrow or lead names the standard the page meets.
- **Label** "what, where · basis", six words or fewer before the " · ": `{"v": "[outlet conductivity guarantee, µS/cm @ 25 °C]", "l": "Skid outlet · measured at FAT"}`, `{"v": "≥ [design minimum return velocity, m/s]", "l": "Return velocity, peak demand · measured on site"}`.
- **At most four,** the deciding figure first. Zero is valid: a page with no figure of its own shows no strip.
- **Unconfirmed figures** show their placeholder (eight words or fewer, naming the unit), never a guess, under one name on every page (DR-011). Price and lead-time facts stay off until filled (DR-005); at launch an unfilled fact goes. `python tools/design_system.py check` warns on a fact equal to a public limit, a code as the value, or a label without its " · " basis.
- On the site it sits at the bottom of the Hero (`facts` in `content/pages/`); on `sys-*` pages with a drawing the first four facts are the drawing's callouts instead, and only a fifth or later would reach the strip.
- Not for one figure with an explanation: use Readout. Not for full specifications: use SpecTable.

## Motion

Motion (`KeyFacts/motion.js`): the plate unrolls left to right, then cell by cell the name settles, a plain figure counts up, the unit and the basis follow. Standard numbers and placeholders never count; they fade in. In the hero it waits about 1 s for the headline. Skipped under reduced motion.

Pass 9b: a figure that starts with its number rolls up on odometer wheels (`m.count`, Subframe Motion `sliding-number`); the unit, comparator and any `[placeholder]` stay still, screen readers hear the real value, and the text is restored when the roll ends. The dial settles on `aq-settle` (no elastic).
- Pass 12 round C: the name is 14/21 px at every width and the source line 13 px mono (was 13 and 12 px on phones).
