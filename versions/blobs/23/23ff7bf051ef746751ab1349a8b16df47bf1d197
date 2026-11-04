SystemRun shows a modular package as one continuous water line drawn as a navy blueprint: drinking water enters at the left, runs through each system's equipment in order and leaves at the point of use, with a column per system under the drawing.

- Look: `"look": "system-run"` on a `path` block (renderer `assets/src/blocks/look-system-run.js`). Fields: `h`, `from`, `to`, `items [{t, d, tag, link, label}]`; `label` is the short bracket name over the drawing (default `t`; the second system's defaults to "RO and DI/EDI", what the drawing shows, since DI versus EDI is open, FD-21, DR-018).
- Markup: `<section class="aq-section aq-band--navy aq-system-run-sec">` › `.aq-system-run` › `.aq-system-run__fig` (IsoKit `svg.aq-iso--navy.aq-system-run__svg`, `.aq-system-run__brackets` with one `__bracket[data-stage]` per system, `__end--in` / `__end--out`) and `ol.aq-system-run__stages` › `li.__item` › `a.__stage[data-stage]` (`__mark`, `__mini-wrap` phone drawing, `__code`, `h3.__t`, `__d`, `__foot` with the `aq-tag` and `__go`).
- The drawing is fixed to the home page's four systems (media filter, softener, then carbon or bisulfite drawn as one vessel, in the order sys-pretreatment teaches; RO rack and one DI/EDI stack; PP tank and loop pump; panel, analyser on a sample tee and point of use), built from IsoKit parts. Stage ids `s0` to `s3` tie each column to its parts. Other paths keep the WaterPath renderer.
- Tokens: navy ground; lines `on-navy-muted`; water `flow` mixed 45 % into `on-navy` (`--sr-flow`, the IsoKit navy rule); text `on-navy` / `on-navy-muted`; Geist 24/30 titles, Geist Mono 12 eyebrows. Pointing at or focusing a column lights its equipment and bracket (colour only).
- Phone: the long drawing gives way to one drawing per system down one twin-wall pipe at the left (pass 12): the
  rail runs from "Drinking water" (`__pend--in`, the block's `from`) to "Point of use" (`__pend--out`, `to`) with the
  water (`--sr-flow`) down its middle, each system's stretch being its `__mark`; a tee (`__tee`, a 16 px node where it
  leaves the rail) runs to each drawing's own inlet pipe. Each phone drawing is cropped tight to its equipment and the
  pipe that brings water in (`SR_CROP`, measured once from the fixed scene: nothing clipped, no dead paper), full
  column width up to 420 px; the tag and the link share one row, or the link takes the next row whole when both do
  not fit (its arrow kept to the last word). Tablets (600-860 px): each drawing sits left (up to 420 px or 55 %) with
  its text beside it. Home at 375 px: 2,090 -> 1,904 px, gaps between systems about 40 % shorter.
- Motion: the sheet fades up, the brackets drop in, the equipment draws back to front and the pipes follow (`AQiso.timeline`); then the water runs the whole line once with a droplet at its head and each system lights as the water reaches it (bracket turns flow, column rule fills, number decodes). Phones: each system's drawing builds as it scrolls in while its stretch of the vertical line fills. Once, under 5 s; nothing under reduced motion.

Ported (pass 9b): Subframe Motion "Animated beam" (animated-beam) as `AQbeam` (shared helper in this motion.js; also used by StrataRun and StandardsOrbit). Pointing at a column, or moving across the drawing, runs a travelling gradient beam through that system's water lines and lights its equipment, bracket and column, for as long as the visitor stays. Desktop only; nothing under reduced motion.

Pass 12 C: phones (<= 600 px) cap each vignette at 300 px wide and give each stage a `space-4` foot. Desktop unchanged.
