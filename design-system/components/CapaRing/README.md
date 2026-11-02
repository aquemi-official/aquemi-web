CapaRing shows a closed-loop procedure (a defect held, decided, repaired, corrected, checked and reported) as steps around one ring that the water runs once and closes, the hold step drawn as a closed valve.

- On the site: a `steps` block with `"look": "capa-ring"` (renderer `assets/src/blocks/look-capa-ring.js`), cmp-quality "How a defect is held and closed". Origin: no concept of its own; adapted from 84-p9-services-1 (hold points as nodes on one line) and 91-p9-compliance-1 (orbit rings), made into a loop because the procedure ends by closing.
- Markup: section `aq-band--navy aq-capa-ring-sec` > `<div class="aq-capa-ring" style="--rows">` > `__fig` (`svg.__svg` aria-hidden: `__far`, `__tick`s, `__base`, `__flow`, `g.__node[data-i]` > `__lead`, `__dot`, `__no` or `__valve`; `__core`) and `ol.__steps` > `li.__step.is-r|is-l[data-i]` (`__n`, `h3.__t`, `p.__d`, `p.__hold`).
- Fields: `h`, `intro`, `items [{t, d, hold, link}]`, `core` (optional centre word; default the first abbreviation in the first step's text, "NCR"). Steps run clockwise from the top right, the first half down the right, the rest back up the left; six fit best.
- Tokens: `navy` ground; lines `on-navy-muted`; the water and lit nodes `flow` lightened towards `on-navy` (`--fl`); hold tag outlined in `limestone`.
- Hover/focus: a step lights its node and leader.
- Phone: the ring (about 76 % of the width) over the steps as a numbered list.
- Motion (`motion.js`): rings and ticks draw, the core settles, the water runs clockwise lighting each node and sliding its step in, waits at the hold (the valve jolts), closes the loop and swells once. About 4.5 s.
- Not for: open-ended sequences (ProcessSteps, HoldTimeline).
