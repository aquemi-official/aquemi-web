ConfigCards sets typical configurations as design-basis cards: every card draws the same polypropylene (PP) package piped to the use it feeds, with the reference capacity, the design-basis tag and the configuration's spec lines under it.

Look `config-cards` (block type `grid`), renderer `assets/src/blocks/look-config-cards.js`. Pass 12, concept 232
(projects.configurations, take 2), ruling R5. Used on: projects.0 (Applications, "Typical configurations").

## Markup

```html
<div class="aq-config-cards" style="--n:6">
  <ol class="aq-config-cards__list" tabindex="-1">
    <li class="aq-config-cards__card" data-k="0" data-scene="osd">
      <div class="aq-config-cards__fig" aria-hidden="true"><svg class="aq-iso aq-iso--raised aq-config-cards__svg">…</svg><span class="aq-config-cards__no">01</span></div>
      <div class="aq-config-cards__body">
        <h3 class="aq-config-cards__t"><a class="aq-config-cards__a" href="#ind-pharma" data-wp="ind-pharma">Oral solid dose site</a></h3>
        <p class="aq-config-cards__meta"><span class="aq-config-cards__cap"><span class="aq-ph">[reference capacity, L/h]</span></span><span class="aq-config-cards__tag">Design basis</span></p>
        <dl class="aq-config-cards__spec"><div class="aq-config-cards__row"><dt>Use</dt><dd>…</dd></div> …</dl>
        <span class="aq-config-cards__go" aria-hidden="true"></span>
      </div>
    </li> …
  </ol>
  <div class="aq-config-cards__ctl">Swipe · count · Previous · Next · Show all</div>
</div>
```

## Content

- Fields, as `grid`: `h`, `intro`, `items [{t, d, tag, link}]`. The description `d` is split into sentences: the sentence
  that is only a capacity placeholder (`[reference capacity, L/h]`) becomes the chip; the others become the spec lines,
  labelled in order by the block's look-only `spec_labels` (default Use, System, Checks); an item's own look-only
  `spec_labels` overrides them for that card (the lab card's first line is a grade, so it reads Grade, System, Checks).
- Drawing: the item's look-only `scene` (`osd`, `proof`, `washer`, `suites`, `batch`, `lab`), else the scene that
  follows its `link` (ind-pharma, ind-process, ind-meddevice, ind-cdmo, ind-personal-care, ind-hospital-lab). Each
  scene: the skid and RO rack at the same place (the package, identical in every card), then the use it feeds (tank and
  loop over a granulation bowl; a proofing vessel fed straight through a diaphragm valve; a tank feeding a
  washer-disinfector cabinet (glass door, two rack lines, a control strip; never a household porthole); a loop with
  three suite drops; a tank feeding a batching vessel and a filler; a riser serving two lab floors). Every card shares
  one viewBox, so the package is the same size everywhere. Drawn with IsoKit (bowl, vat, washer, batching vessel,
  filler and lab floor are built here from the kit's builder; they could join the kit).
- Copy rules (R5): the cards are a design basis ("Typical configuration"), never a client installation; capacities stay
  placeholders; no invented codes, slogans or names on the drawing (the drawings carry no text).

## Tokens and type

- Card: `surface-raised`, 1 px `line-strong` frame (hover: `flow`), drawing over a `line` rule, number tag `ink` on
  `ink-inverse` (reads on both themes). Title 20/26 Geist light-regular, spec lines 15/22 `ink-muted` with 11 px mono
  labels, capacity 14 px mono chip, tag 11 px mono outlined.
- The whole card is the link (the title's stretched `::after`); focus draws a 2 px `focus` ring round the card.

## Phone (container ≤ 860 px)

- A scroll-snap rail: one card at 85 % of the width with the next peeking, bled to the screen edge. Under it: "Swipe",
  a mono count (01 / 06, live), Previous and Next (44 px squares, disabled at the ends) and "Show all 6" (44 px), which
  stacks the cards (and "Show as a rail" returns). Reading text 14 px (`--aq-read-phone`).
- Tablets (container 601 to 860 px): the same rail with two cards at 46 % and the third peeking, so the drawing keeps
  the phone's scale instead of one card filling the screen.
- The count is announced politely once a swipe settles (120 ms after the last scroll event), not on every frame.
- Without script the rail still scrolls and snaps; the buttons do nothing harmful.

## Motion (`motion.js`)

The drawings open behind a navy shutter that lifts strip by strip (5 strips, 45 ms apart, 820 ms, strong ease-out),
card after card (120 ms apart), the text rises 12 px, then the water runs once from the package to the use in each card
(`AQiso.timeline`, flow only). About 3 s, once. Reduced motion: no shutter is inserted, the drawings are complete.
Ported from Subframe Motion "Staggered shutter reveal" (shutter-scene), MIT, (c) 2026 Subframe; the rail's controls and
count follow "Parallax image carousel" (parallax-plates), MIT, (c) 2026 Subframe.

## When not to use it

- Linked pages with no configuration to draw: use the plain `grid` (LinkGrid) or `standard-tiles`.
- One system drawn in detail: use a sheet look (SkidSheet, CostSkid).
