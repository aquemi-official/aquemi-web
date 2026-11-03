RevisionSheet tells a document review cycle on one document: a paper sheet stays pinned beside the steps and takes each step's marks as the step reaches the middle of the screen (comments, answered comments and a struck draft tag, signatures, recorded data, the current revision), its revision block filling one row per step.

- On the site: a `steps` block with `"look": "revision-sheet"` (renderer `assets/src/blocks/look-revision-sheet.js`), cmp-documentation "How each document reaches your file". Origin: 63-concept-notes-register (the revision register) and the style atlas's hybrid 3 (sticky drawing, scrolling sheet).
- Markup: `<div class="aq-revision-sheet" data-n>` > `__fig` > `__paperwrap.is-s1 ... is-sN[data-theme="light"]` > `svg.__svg` (aria-hidden; layers `g.__ly.__ly1 ...`) and `ol.__steps` > `li.__step[data-s]` (`__n`, `__body` > `h3.__t`, `p.__d`, `p.__hold`).
- Fields: `h`, `intro`, `items [{t, d, hold, link}]`. Marks follow a step's place (1 comments and a draft tag named from the first word of step 1, 2 answers and the revision triangle, 3 first signature, 4 data and second signature, 5 current revision and register tick); the first and second `hold` label the signature boxes. A hold step prints "Hold · Signed by ..." like ProcessSteps.
- Behaviour (look script, works without motion): the step nearest the screen's middle sets the sheet's state (`window.AQrevsheet.set/scan`); pointing at a step shows the sheet at that step. Without script, and below the last step, every mark shows.
- Tokens: paper `surface-raised` on a `limestone` backing, printed furniture `line` / `line-strong`, marks `flow` and `flow-tint`, signatures `navy`. Drawing labels in SVG `<text>` repeat the steps' text (aria-hidden).
- Layout (pass 9b, concept research/pass9b/concepts/cmp-documentation.2.png, numbered rhythm only): the steps lead at the left with large Geist Mono 300 numbers, the sheet stands at the right; rows shortened to 1.3 × space-32 so the story moves at reading pace.
- Phone: see "Phones (pass 12)" below (sticky strip that fills step by step).
- Motion (`motion.js`): the sheet is laid down and turns to its angle, steps rule in; on phones the marks play a step every 0.6 s. Under 4 s.
- Not for: steps without a single document to follow (ProcessSteps, HoldTimeline).

## Phones (pass 12)

The strip runs under 600 px (`data-pk-bp="599"`); 600-860 px keep the full sheet above the steps.

The sheet is a 140 px strip held under the header (PhoneKit sticky figure): the whole sheet as a thumbnail beside its revision rows (`__revs`, one per step: number, a rule, a tick when done). The step on the reading line sets the sheet's marks (cumulative, as on desktop) and lights its row; the motion's play-through stands down while PhoneKit drives. Desktop: the sheet sits 16 px in from the viewport edge.
