StrataRun draws a process diagram as one water run stepping down a terrace of stacked paper slabs, so the reader sees the whole package from feed water to points of use as a single route through real equipment.

- On the site: a `diagram` block with `"look": "strata-run"` (renderer `assets/src/blocks/look-strata-run.js`). Origin: pass 9 concept `research/pass9/concepts/systems.0.png` (one continuous run through isometric equipment), executed as layered paper-cut depth instead of a blueprint sheet.
- Markup: `<div class="aq-strata-run">` holding `ol.__stages` (one `li.__stage[data-stage]` per stage: `.aq-index`, `h3.__t` (a link when the stage has one), `p.__d`, and `span.__thumb` with the phone drawing), `div.__fig` (the scene: `svg.aq-iso.__svg`, aria-hidden) and `p.__base` (the base line, with its dashed key).
- Scene (IsoKit): one slab per stage (`g.__stack` of `path.__slab` sheets, the top sheet `is-top`), each a step lower and nearer than the last, so the water runs back to front in DOM order. Equipment per stage (`art`): feed (riser, ball valve, gauge), pretreatment (media filter, carbon), generation (RO rack, EDI), storage (tank), loop (pump, UV, analyser), outlets (three points of use). The distribution header runs over the outlets with a drop to each and returns overhead to the tank. Behind it all, `path.__stream` (flow-tint) with its paper edge `__edge`; along the foot, the dashed monitoring bus `__bus` with a riser to every slab. Leaders `path.__lead` continue each label's left hairline down to its part.
- Fields: `stages [{t, d, icon|spot, link, art}]`, `base`, `base_link`, `caption`. `link` (new, optional): a page id or `page#anchor`; the stage name becomes the link (44 px target) and hovering or focusing it lights the stage's equipment. `art` (new, optional): what stands on the slab; default by position (feed, pretreatment, generation, storage, loop, outlets). `base_link` (new, optional) links the base line. Up to six stages.
- Tokens: slabs `surface-raised` tops and `surface-sunken` sheets with `line-strong` 1 px edges; stream `flow-tint` over a `line` edge; leaders and bus `line-strong`; equipment IsoKit default. Labels: mono `flow` index, 17/24 name, 14/21 `ink-muted` text.
- Phones (pass 12, S10): the run turns vertical. Each stage's slab drawing stands 140 px tall in its own row,
  alternating left and right, the stage number and name in the free half beside it; one twin-wall pipe (`line-strong`
  walls, `flow` water) zigzags down: in at the slab's near corner, out at the far corner, across to the page edge and
  down past the stage's text to the next slab (`span.__pp--iv/ih/oh/ov` in the thumb; `--ly` / `--ry` from the
  renderer are the slab corners' heights). Every row keeps a pipe lane on both sides, so the text has one left edge
  whichever side the pipe runs down; beside a left-hand slab the name may run on into the right lane. The text sits
  under its slab; title links are 44 px targets, their arrow kept to the last word. Tablets (600-860 px): the run keeps
  a 560 px measure and the slabs stand 180 px tall. Systems at 375 px: 1,425 -> 1,697 px (the slab drawings run about
  140 px tall instead of about 90 px).
- Not for: P&ID schematics (ProcessDiagram) or a single machine (Illustration).

## Motion

Motion: the terrace is laid, then the water runs down it. The labels rise in a row and their leaders draw down to the slabs; the stream wipes in from the left; each slab's sheets fall in and settle (`aq-settle`), top stage first; then `AQiso.timeline` draws the equipment, the pipes and the water from the feed down the terrace and round the loop, each label's hairline turning `flow` as the water reaches its stage; the signal bus fades in. Phones: each stage rises as it scrolls in and its own slab drawing builds. Under 5 s; nothing under reduced motion; complete without script.

Ported (pass 9b): Subframe Motion "Animated beam" via `AQbeam` (SystemRun): pointing at or focusing a stage label runs the water (a moving `flow` slug filling the pipe bore) down that stage's pipes while the visitor stays.

Pass 12 C: the desktop section links take `padding-block: 11px`, a 44 px target; the link is inline, so the padding changes no layout (verify: the old `margin-block: -11px` did nothing and is gone).
