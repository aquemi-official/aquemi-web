HoldTimeline draws a sequence of stages with hold points as nodes on one rising line across a pale engraved macro close-up of a PP pipe, each stage's duration and deliverables hung off its node.

Pass 9 look `hold-timeline` (`assets/src/blocks/look-hold-timeline.js`), set with `"look": "hold-timeline"` on a `steps` block. Without the look the block renders as ProcessSteps. First used on services ("How long each stage takes, and what it leaves").

## Markup

```html
<section class="aq-section aq-hold-timeline-sec">
  <div class="aq-hold-timeline__macro" aria-hidden="true"><svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">…</svg></div>
  <div class="aq-in aq-stack-l">
    <header class="aq-sec-head">…</header>
    <div class="aq-hold-timeline" style="--n:6;--w:25%">
      <ol class="aq-hold-timeline__list">
        <li class="aq-hold-timeline__st is-down is-hold" style="--i:0;--x:8.33%">
          <span class="aq-hold-timeline__pole" aria-hidden="true"></span>
          <span class="aq-hold-timeline__node" aria-hidden="true"><span class="aq-hold-timeline__halo"></span></span>
          <div class="aq-hold-timeline__c">
            <h3 class="aq-hold-timeline__t"><span class="aq-hold-timeline__n" aria-hidden="true">01 /</span> Design</h3>
            <p class="aq-hold-timeline__dur"><span class="aq-ph">[design to DQ, weeks]</span></p>
            <p class="aq-hold-timeline__d">Compliance matrix, …</p>
            <p class="aq-hold-timeline__hold"><span class="aq-hold-timeline__hk">Hold point</span> Signed by your quality unit</p>
          </div>
        </li>
        …
        <li class="aq-hold-timeline__band" aria-hidden="true"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <polyline class="aq-hold-timeline__rail" points="…"/><polyline class="aq-hold-timeline__run" points="…"/></svg>
          <span class="aq-hold-timeline__drop"></span></li>
      </ol>
    </div>
  </div>
</section>
```

## Fields

- `items[]`: `t` "<stage>, <duration>" (the last comma outside `[]` and `()` splits it), `d` what the stage leaves, optional `hold` (who signs: "Your quality unit"), optional `link` (page or page#anchor; the stage name becomes the link).
- Every duration shows as a mono line (a `[placeholder]` as its chip). Optional `box: true` on an item sets its stated duration with a number ("at least 12 months") as the section's boxed figure; no duration is boxed by default (DR-018 rule 3: display size is a claim, so only a step the page chooses is set large).
- `macro` (optional): `false` drops the pipe close-up.

## Rules

- Light ground (pass 9 polish): the section follows the page theme; on services it sits on the alternate ground between the navy router and the FAQ, so the page has one loud section. A boxed duration (`box: true`) renders as the boxed figure with its number set large and light (`__num`).
- The macro is decoration in line art only: a PP pipe drawn huge and cropped (engraving lines closer together towards the edges give it its round body), water as a dashed `flow` centre line; no joint or weld bead is drawn while the joining method is open (FD-18, DR-018). No raster, no gradient.
- Geometry: odd stages hang above-left of their node, even ones below-right; `--w` (callout width) and each `--x` (node position) are chosen per item count so same-side callouts never touch and the line never crosses text. Best for 3 to 7 stages.
- A hold point is a ringed node and a "Hold point" stamp naming who signs.
- Phones: one vertical `flow` line down the left with the stages along it; the macro stays as a faint ground.
- Hover a stage: its node swells and its pole turns `flow`.

## Motion

Motion: the macro comes into focus (scale and fade), its engraving lines draw outwards from one ring and the water creeps once; then a flow drop runs the rising line from the left edge, laying it behind it, and each node lands as the drop arrives, its pole growing and the callout unrolling from the node. At a hold point the drop waits a beat, the ring opens and the stamp strikes; a boxed figure (if any) counts up; the drop leaves at the top right and rests there (under 5 s, once). Phones land each stage as it scrolls in. Nothing under reduced motion.

Ported (pass 9b): Subframe Motion "Cue scrubber" (cue-scrubber): the stages are seekable chapters. Pointing at or focusing into a stage sends the water node by node to it (120 ms legs), empties the line beyond and steps the stages still ahead back; leaving lets it run on to the top. Wide screens.
