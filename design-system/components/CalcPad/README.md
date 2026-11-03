CalcPad writes a grade table out as working on a squared calculation pad: one derivation line per product class, the class, an arrow, what sets it, an equals sign, and the minimum water boxed as the answer.

- On the site: a `table` block with `as: "grades"` and `"look": "calc-pad"` (renderer `assets/src/blocks/look-calc-pad.js`), on ind-personal-care "Which water each product class needs". Concept: pass 12 image 200 (take 2), `design-system/inspiration/gemini/200-p12-ind-personal-care-grade-take2.png`; built with the fixes its log asked for: words in Geist, mono only for line numbers and codes, every answer box whole.
- Markup: `div.aq-calc-pad` (squared `surface-raised` sheet, 16 px squares, a double `flow` margin rule) → `p.__key` (the column names in derivation order, aria-hidden) and `ol.__lines` of `li.__line` (`span.__no` in the margin, `p.__work` with `__class`, `__op` arrows, `__sets`; `p.__ans` the boxed answer). Visually hidden `__sr` prefixes give screen readers each column's name.
- Fields: as the grades table: `h`, `intro`, `cols [class, minimum, what sets it]`, `rows`. No new fields. Codes inside the text (GUI-0158, 21 CFR 210 and 211, ISO 22716, USP <645>) are set in mono, never split across lines.
- One answer is lit (`flow` fill, `surface` text): the first on load, then the line under the pointer or the line tapped (renderer; works with motion off).
- Tokens: `ink` box 2 px, `flow` operators and margin rule, `ink-muted` for what sets it. Work 24/32 Light; answers 18/28.
- **Phones** (≤ 860 px): the margin narrows to 32 px (24 px under 400 px) with 12–13 px mono numbers in it; each line's work (19/28) wraps above a full-width answer box (16/24). Under 400 px what sets it drops to its own line (16/24) under the class, led by its arrow (the `→` and `=` sit inside `__sets`), so the derivation order reads by position too. No fold; about 1,240 px for four classes (derivation-sheet was 1,900).
- Use it for three to six rows that read as "this, because of that, gives this answer". For a number-led grade table use DerivationSheet; for a plain grade comparison, CompareTable.

## Motion

On scroll-in the key line fades in, each line's work is uncovered left to right like a pen along the squares (clip-path 0.6 s, 0.12 s apart) and its answer box draws in after it. Once, under 2 s; nothing under reduced motion.
