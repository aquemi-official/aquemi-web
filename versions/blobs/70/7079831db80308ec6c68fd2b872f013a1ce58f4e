LimitStack sets a page's water-quality limits as an editorial type stack beside a sculpted outlet pipe, so the reader sees each limit large, its reference, and the guaranteed skid-outlet value as the stack's last, boxed step.

- On the site: a `spec` block with `"look": "limit-stack"` (renderer `assets/src/blocks/look-limit-stack.js`). Origin: pass 9 concept `research/pass9/concepts/sys-pw.0.png` (oversized headline, stepped limits, pipe loop with a Guaranteed band).
- Markup: `<section class="aq-section aq-band--limestone aq-limit-stack-sec">` → `<div class="aq-limit-stack">` with `__text` (the section head at display scale with the caption beside the heading, `ol.__list` of `li.__row` stepped by `--i`, the note) and `figure.__fig` (an IsoKit svg on the limestone ground, `__seal` and `__outlet` lettering skewed onto the iso face, `figcaption.__note` holding the block intro).
- Row: `p.__p` (index, mono label, an "Action level" chip from `level`), `p.__v` (limit `__n`, unit `__u`, qualifier `__q`, split by `gaugeParse` from blocks/spec.js; a placeholder value prints whole as `__n--open`), `p.__m` (a hairline `__rule` that runs towards the drawing, then the reference).
- Fields: `h`, `caption` (beside the heading), `intro` (the note on the pipe), `rows [{p, v, m, hl, level}]`, `note`. A row whose `p` says "guaranteed" or "outlet" is the boxed hero step (`is-hero`: flow border on `surface-raised`); `hl` puts the index in flow. The navy collar's lettering is that row's own label (its last comma part: "Skid outlet, guaranteed" reads "Guaranteed") and is left out while the row's value is a `[placeholder]` (DR-018: no guarantee drawn while the copy keeps it open); the collar band is always drawn.
- Tokens: limestone ground, `on-limestone` / `on-limestone-muted` text, Geist Light display heading, Geist Mono limits, `navy` collar, `flow` water. The figure is sticky beside the stack on desktop.
- Phones: head, drawing, stack; steps shrink to `space-3`; the reference rules become top hairlines. Below 600 px (pass 12, S13): no step indent, and the coil drawing is capped at 300 px tall.
- Use it for one short list of limits (up to six) with a guaranteed value; for many parameters use ParamTiles or SpecTable.

## Motion

Motion: one timeline when the stack scrolls in. Each row steps in from the left a beat after the one above (index decodes, the limit rises out of its line, the reference rule runs out towards the drawing); the pipe draws through `AQiso.timeline`, the water runs in at the top, round the coil and down the outlet run; when it reaches the collar its lettering (if any) wraps on, the guaranteed row flashes `flow-tint` and the note appears. Under 5 s; nothing under reduced motion.

Pass 9 polish: the section carries `data-theme="light"`, so the limestone sheet keeps its light tokens (white pipe body, flow line, boxed outlet row) in the dark theme. Row labels are Geist, the index and figures Geist Mono.

Pass 9b: each limit rolls up on the core odometer (`m.count`, ported from "Sliding number") as its row is set; pointing at a row rolls its limit once more. Placeholders never roll.

Pass 12 verify fixes: the svg and its lettering (seal, outlet) sit in one box (`__draw`), so the lettering stays on the pipe at any width. Under 860 px the drawing box is capped at 420 px, the intro note leaves the drawing and sits under it at 14 px, the note leader is not drawn and the band it used is pulled up (`--ls-cut`, set by the renderer). Under 600 px the box is 260 px wide, the outlet lettering steps 5 px off the wall and the qualifiers are 14 px.
