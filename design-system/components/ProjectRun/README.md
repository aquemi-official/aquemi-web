ProjectRun tells ordered steps as one run the reader scrolls along: on wide screens a sticky stage shows the current step's equipment drawing, its number set huge and a pipe whose water fills stop by stop as the steps scroll past.

- Look: `"look": "project-run"` on a `steps` block (renderer `assets/src/blocks/look-project-run.js`). Fields: `h`, `items [{t, d, link, art, label}]`. `art`: an illustration id from `ART` (Hero.js), default the link's page when it has a drawing; `label`: the short stop name on the run (default `t`).
- Markup: `.aq-project-run[style="--n"]` › `__stage` (aria-hidden: `__num` with `__cur` / `__of`, `__arts` with one `aq-illustration.__art` per step, `__run` with `__pipe` › `__water` + `__drop` and one `__stop` › `__dot` + `__lab` per step) and `ol.__steps` › `li.__step` (`__node`, `aq-illustration.__pic`, `__text` › `__code`, `h3.__t` with the link, `__d`).
- Two states. Static (default: no script, reduced motion, phones): the steps stack down a vertical twin-wall pipe, a numbered node per step, the drawing beside the text; each step's pipe segment carries the water (`--w`). Live (`is-live`, added by motion on wide screens): two columns, the steps in Geist Light 48 on the left (the current one at full strength, the rest at 28 %), the sticky stage on the right on `surface-raised`.
- Tokens: drawings in `ink` through the Illustration mask; pipe walls `line-strong`, water and the current stop `flow`; the number Geist Light 140, labels Geist Mono 12.
- Motion: reader-driven. Live: the stage unrolls on entry; then the scroll sets the water (smoothed; it stops when the scroll stops), the current step, its drawing (prints up while the last lifts away) and the big number (decodes). Phones: the water fills down the vertical run with the scroll, each node tinting as it passes; each step rises in once.

## Phone (pass 12, PhoneKit sticky figure)

- The root carries `data-pk-sticky data-pk-h="132"`, the stage `data-pk-fig`, each step `data-pk-row`. At or under 860 px
  (page container) PhoneKit holds the stage as a 132 px strip under the header: a small copy of the desktop stage on
  `surface-raised` (the current step's drawing at 128 x 84, its number in Geist Light 40 with the stop name `__now` in
  Geist Mono 12, and the 6-stop run with 16 px dots whose water fills to the current stop). From 600 to 860 px
  (tablets) the drawing runs the strip's full height at 200 px wide, the number and the run stacked beside it.
- The steps run under it as short rows on the vertical twin-wall run: a 28 px node, the title link (Geist 20/26, a 44 px
  target that takes no extra row height), the paragraph at 15/22; the per-step drawings and the `01 / 06` code hide
  (the strip carries them). The step on the reading line drives the strip, its node fills `flow`, the run above it
  carries the water. This is state set by the renderer's `pk:change` listener, so it holds with motion off and under
  reduced motion (transitions then off). The desktop live stage (`is-live`, motion) is untouched; the phone motion only
  rises the rows in (its scroll fill stands down while PhoneKit is on).
- Without script the phone keeps the static stack (a drawing per step). Home at 375 px: 2,769 -> 1,187 px.
