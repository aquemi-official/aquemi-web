RecordSlips shows each process of a quality system with the record it leaves: the process set large and light, what it controls under it, and at its right edge a slot from which a paper slip feeds out listing the records you can inspect, each with an empty tick box.

- On the site: a `table` block (`as: "evidence"`) with `"look": "record-slips"` (renderer `assets/src/blocks/look-record-slips.js`), cmp-quality "Each process, and the record it leaves". Origin: no concept of its own; adapted from 45-concept-evidence (each item joined to its proof) as a tactile print-out.
- Markup: `<div class="aq-record-slips">` > `__cols` (aria-hidden) + (Fold) `ol.__list` > `li.__row` > `__proc` (`aq-index`, `h3.__name`, `__k`, `p.__ctl`) and `__feed` (`__slot`, `__slip[data-theme="light"][data-paper]` (data-paper: the dark theme dims the paper, pass 12 round C) > `__k`, `ul.__recs` > `li` > `__box` + text).
- Fields: `cols [process, what it controls, record you can inspect]`, `rows` (strings or `{t, link}`), `fold`, `fold_noun`. Records split at ";".
- Tokens: process 300 weight on the ground, slot `navy`, slip `surface-raised` paper with a `flow` top edge and a dotted perforation in `line-strong`. Column names head the list once on desktop and label each row on phones.
- Hover: pointing at a process feeds its slip a little further out and turns its name flow.
- Fold: phones only.
- Phone: the slot runs under the process and the slip hangs below it.
- Motion (`motion.js`): per row, the name rises, the slot drops in, the slip feeds out of the slot (clipped at its edge) and the records tick in. Under 2 s a row.
- Not for: documents delivered with a system (DocList, IndexSheet).

Phones (pass 12, audit S7): every log field shows (the page's fold is ignored here), each as a compact row: number and field on one line, what it proves under it, and the slip as a short paper strip fed sideways out of a navy slot at its left with its records inline, each with its tick box. The column names head the list once, as on desktop; the per-row labels are not shown. The section is in the concept queue for a new look; this is the S7 fix only. Desktop unchanged.

Verify fixes (pass 12 V7): on phones only the process column head stays; the record head pointed at nothing (the slips sit under their rows) and ran into the edge at 360 px.
