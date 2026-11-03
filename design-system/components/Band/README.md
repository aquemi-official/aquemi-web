Band sets one short statement large on a quiet limestone or sunken ground, with a supporting line and a faint pipework line drawing at the right; its ground modifiers (`aq-band--limestone`, `aq-band--sunken`, `aq-band--navy`) also change the ground for other sections.

## Markup

```html
<section class="aq-section aq-band--limestone aq-band"><div class="aq-in"><div class="aq-band__frame">
  <div class="aq-band__text">
    <h2 class="aq-band__h">One file, many <span class="aq-band__mark">auditors</span></h2>
    <p class="aq-lead aq-band__lead">We organize the turnover package by the questions auditors ask …</p>
  </div>
  <svg class="aq-band__motif" viewBox="0 0 240 320" preserveAspectRatio="xMaxYMid meet" aria-hidden="true" focusable="false">…</svg>
</div></div></section>
```

- `aq-band` plus one ground modifier on `<section class="aq-section">`. The statement band uses `aq-band--limestone` (default) or `aq-band--sunken`.
- `aq-band__frame` only positions the text and the drawing. It draws no box: the change of ground is the separation.
- `aq-band__mark` is optional and underlines one word or phrase with a 1 px `flow` hairline. Use it only when the content names that word.
- `aq-band__motif` is decoration: `aria-hidden`, a schematic of pipes, a valve and two blank instrument boxes, with no tags, values, ticks or labels. Never put readings, numbers or text in it. Copy the SVG from `assets/src/blocks/band.js` (`BAND_MOTIF`).
- On the site: block type `band` with `h`, `body`, `tone` (`limestone` or `sunken`) and an optional `mark` naming the word or phrase in `h` to underline (`"mark": "auditors"`). The renderer wraps the first whole-word match; if `mark` isn't found in `h`, nothing is marked. No page sets `mark` yet.

### Ground modifiers on their own

- `aq-band--sunken` for standard tags and the documentation list (StandardsGrid, DocList). `aq-band--limestone` for the statement band. `aq-band--navy` for the brand band; only Closing (and the Footer's own navy) use it.
- Text on navy uses `on-navy` and `on-navy-muted`. A primary button inside a navy band turns Limestone with navy text automatically.

## Layout

- **Desktop:** statement in the left 64 % of the content width, up to 20 characters per line, lead below it. The drawing fills the right 28 % of the band at 30 % strength.
- **Phone** (`@container (max-width: 860px)`): statement full width at 38/44 px, lead 16/24 px, no drawing. Nothing overflows at 375 px.

## Token rules

- Statement: the `display` style, `font-sans` 300, 56/60 px, -0.025em, sentence case (38/44 px on phones). Lead is `aq-lead` and takes the ground's muted colour (`on-limestone-muted` on limestone, `ink-muted` on sunken).
- The drawing is 1 px lines in `currentColor`, so it follows `on-limestone` on limestone and `ink` on sunken in both themes. No frame, no ruler ticks, no corner brackets, no gradients.

## Writing

- Statement: one sentence that states a commitment or a fact, as the page data gives it. No slogans, no exclamation marks.
- Lead: one or two sentences with the evidence: the standard, the number with its unit, or what the reader gets.
- Facts only Aquemi can supply stay in `[square brackets]`.

## When not to use it

- Never two bands touching, and not more than one statement band per page.
- Not for a call to action at the end of the page: that is Closing.
- Not for long text, lists or tags; use a normal section.

Origin: concept P in `design-system/inspiration/`, generated in Gemini and rebuilt with Aquemi tokens (Geist Light in sentence case; the concept's frame, section numbers and invented values dropped).

## Motion

Motion: no own choreography. The navy, sunken and limestone grounds are static; the statement band's pipework motif draws on through the generic motion layer, and the Closing on the navy band has its own (`Closing/motion.js`).

## Pass 12 C

- **Navy-to-navy seam (V1).** Two navy bands in a row (news capa-ring then colophon, contact-service routes then riser-valves, cmp-documentation index-sheet then stage-stacks) are told apart by a Limestone hairline at 18 % on the second band's top edge and 16 px more top padding (80 px desktop, 64 px phones). The Closing keeps its own padding.
- **Dark limestone (provisional ruling RC1, owner to confirm).** In dark mode (system setting or `data-theme="dark"`) a full-width `.aq-band--limestone` re-declares the colour tokens as the warm dark stone set from tokens.json: `--limestone` and `--surface` take `stone` (#2B2722), `--on-limestone`, `--ink` take `on-stone`, the muted and subtle inks, raised and sunken fills and the lines take their stone values; every other colour token is inherited from the page. A band pinned `data-theme="light"`, and any pinned-light wrapper inside a band, takes the same dark set (pinning was the old way to keep dark ink on the light band). Paper stays paper: an object marked `data-paper` (redline-sheet, record-slips, spare-sheet, joint-tag, signature-blocks, cut-band) keeps its light tokens and, in dark mode anywhere on the page, is dimmed to `paper-dim` (#D9CEC3) with `paper-dim-raised` (#ECE6E0) fills. Navy blocks inside a band stay navy. Light mode is unchanged. To reverse, delete the dark blocks in `Band/style.css`.
