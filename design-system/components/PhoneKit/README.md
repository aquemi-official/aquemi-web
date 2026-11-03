PhoneKit is the shared phone behaviour for section looks: a picker or accordion (one situation open at a time) and a sticky compact figure (a drawing strip held under the header that follows the row being read), switched on by data attributes only below a breakpoint.

Source: `assets/src/parts/PhoneKit.js` (site script, built into `assets/aquemi-site.js`; no motion, so it runs the same
with reduced motion) and `style.css` here. Pass 12 audit patterns S11 (situation routers and tables stacking to
2,000–3,200 px) and S8 (drawing-and-list looks losing the drawing-to-text link on phones).

## When it is on

- Every root is checked against its own breakpoint: `data-pk-bp="<px>"`, default `860`. The width measured is the
  root's page container (`.aq-page`, the box the looks' `@container` rules read), so the guide's phone-width toggle
  switches it as a phone would.
- At or under the breakpoint the script sets `data-pk-on` on the root and does its work; above it nothing is touched.
  Growing past the breakpoint (rotate, resize) restores the markup exactly as rendered (bodies' own `hidden`, no
  `aria-expanded`, no active classes, no custom properties), so a desktop render is never changed by PhoneKit.
- New markup that carries a PhoneKit root is picked up as it is inserted (a MutationObserver runs before the next
  paint), so a page render never flashes the desktop stack on a phone.
- Without script, the phone shows the look's own phone CSS (every row open): write that as a sound fallback.

## Picker / accordion (S11)

```html
<ol data-pk-picker="accordion" data-pk-open="0" data-pk-bp="860">   <!-- or "chips" -->
  <li data-pk-item="new-system">
    <button type="button" data-pk-head>01 New system <span class="aq-phone-kit__chev" aria-hidden="true"></span></button>
    <div data-pk-body>… the route, the start-with link …</div>
  </li>
  …
</ol>
```

- `data-pk-picker="accordion"`: full-width heads, at least 48 px, each with the chevron (`.aq-phone-kit__chev`, a 44 px
  cue box; `.aq-phone-kit__chev--plus` for a plus that turns into a minus). The open body sits under its head. Tapping
  the open head closes it. The tapped head keeps its place on screen when a long body above it closes.
- `data-pk-picker="chips"`: the root turns into a grid of chips (2 columns; set `--pk-cols` on the root for another
  count), each at least 44 px, and the one open body runs full width under them. A chip never closes the only card.
  The chips are one tab stop (the open chip; a roving tabindex, restored when the root switches off), so Tab runs
  from the chips into the open card and on out; arrow keys move between chips and open the chip moved to (selection
  follows focus, as in tabs).
- `data-pk-open`: the index open at first (default `0`; `-1` for an accordion with none open).
- Heads (`[data-pk-head]`) are hidden until the root is on; give a desktop-only twin `data-pk-desk` and it hides while
  the root is on. PhoneKit hides only the head itself: a wrapper round a head (an `h3` holding the button, say) must
  hide with it in the look's CSS (`display: none` until `[data-pk-on]`), or the desktop keeps an empty heading
  (ClauseTabs `__ph`, round D). A body may be `display: contents` on desktop: once closed it is `display: none` whatever the look says.
- The script writes `aria-expanded` and `aria-controls` on each head (and an id on each body), and Enter and Space open
  a head that is not a button. Use a real `<button type="button">` for heads.
- A start-with link in a body or a head row: `class="aq-phone-kit__go"`, a full-width row link at least 48 px with the
  arrow at the right in flow. Never nest a link inside a head button: put it in the body.
- Defaults use `currentColor`, so heads and chips sit on navy, limestone or paper; an open chip fills with flow. A look
  restyles its own heads freely on top.

## Sticky compact figure (S8)

```html
<div data-pk-sticky data-pk-h="200" data-pk-zoom="1.8">
  <div data-pk-fig><div data-pk-pan><svg>… <g data-pk-key="2">…</g> …</svg></div></div>
  <ol>
    <li data-pk-row="1">…</li> <li data-pk-row="2">…</li> …
  </ol>
</div>
```

- `[data-pk-fig]` becomes `position: sticky` at the header line with height `data-pk-h` (96–220 px, default 160),
  clipped, on `surface` with a `line-strong` rule under it. The look fits its drawing into that strip (for an SVG:
  `height: 100%; width: auto`), with rendered labels of 12 px or more (S9). The figure must be a child of a box that
  spans the rows (sticky holds only inside its parent): on phones make any wrapper between them `display: contents`.
- The header line: the page's section bar while it shows (it tucks away on scroll down and comes back on scroll up),
  else the top of the view. The strip follows it (`--pk-top`, eased in 240 ms; instant with reduced motion).
- The reading line is 30 % of the view below the strip. The last row whose top has passed it is the active row: it gets
  `.is-pk-active`, so do the figure's `[data-pk-key]` targets that name its key (a target may list several keys,
  space-separated), and the root gets `data-pk-active="<key>"`. Before the first row reaches the line, the first row is
  active. Rows get a `scroll-margin-top` that clears the strip, so a jump never lands under it.
- The last row never slides under the strip: as its top rises to 16 px below the strip's foot, the strip lifts off with
  it (`--pk-lift` on the root, a `translateY` on the strip, no transition), so the last step reads whole while the
  strip still holds. Keep `transform` on `[data-pk-fig]` free for this (pan and zoom live on `[data-pk-pan]`).
- `data-pk-zoom="<scale>"` pans and zooms the `[data-pk-pan]` layer (default: the figure's first child) so the active
  target sits centred at that scale, kept inside the strip (`--pk-x`, `--pk-y`, `--pk-s`; no transition with reduced
  motion).
- `data-pk-dim` on the root quiets the rows off the reading line (opacity 0.55). Use it only where the rows' text
  keeps AA contrast at that opacity; never dim the reading text of the rows the reader is about to read (light the
  active row's number or marker instead). Otherwise the look styles `.is-pk-active` itself.

## Events and API

- The root dispatches `pk:change` (bubbles) with `detail.key` (the item's `data-pk-item` or the row's `data-pk-row`),
  `detail.index` and `detail.on`. Switching off sends `index: -1, on: false`, so a look restores its desktop state.
  Use it to sync the look's own state: a dial needle, the stage a drawing shows.
- `window.AQpk`: `scan()` (set up new roots now), `on(root)` (is PhoneKit driving this root), `line(root)` (the reading
  line in px from the top of the view), `open(root, index)`. A look's `motion.js` that runs its own scroll story should
  stand down while `root.hasAttribute('data-pk-on')`, so the two never fight over the active step.

## Rules

- Phone only: never use PhoneKit to change a desktop render. Never fold a row a callout or pin points at (S7): use the
  sticky figure, which keeps every row open, for drawing-and-list looks.
- Tap targets: heads 48 px, chips and row links 44–48 px. Reading text inside heads and bodies at least 14 px.
- Tokens only (`flow`, `focus`, `line-strong`, `surface`, spacing steps); motion lives in the look's `motion.js`, never
  here.

Used by (pass 12): ManifoldRouter (chevron only), StairRouter (chips; accordion without labels), PidRoutes (accordion),
TieInRun and JointSteps (sticky figure).

All looks that opt in after build round A (integrator, 2026-11-03; each look's README says which behaviour it uses):
AuditSkid, BinderTabs, BudgetBento, CapaRing, CostBalance, CutawayRail, CutoverSchedule, DecisionValve, JointMacro, JointSteps, LimitDrawer, ManifoldRouter, MethodBento, MultiportRouter, PidRoutes, ProjectRun, ReaderSplit, RedlineSheet, RequestMenu, RevisionSheet, RoleLoop, RuleFigures, SignalDial, SitePlates, SpareSheet, StairRouter, StandardsOrbit, TermsSheet, TieInRun, UseMatrix, VersusSpread, WalkdownPins, WitnessPlan.

Added in build round B (integrator, 2026-11-03): IndustryDrops (chips), LimitFolders (accordion), LimitPlan, ScenePlates,
SkidSheet and TankGa (sticky figure). RoomLimit, WasherZones, GhostSkid, ConfigCards and HeroScene design their phone
versions without PhoneKit (a two-column checklist, AQsnap rails and a full-width drawing); each README says why.

Added in build round C (integrator, 2026-11-03):
- sticky figure: SensorLoop (`data-pk-bp="600"`, a 180 px strip), ApplicationWheel (`data-pk-bp="600"`, a 140 px wheel
  strip; a tap on a segment scrolls to its group) and RoomLimit (now PhoneKit, replacing its own crop; zooms 1.6x onto
  the active pin). StandardsOrbit's strip now zooms about 1.25x onto the active zone (`data-pk-zoom` 1.15 on a layer
  already cropped to the plant).
- chips: TraceLines (one code chip per line; the readout dial follows `pk:change`) and GradeCrosswalk (one chip per
  standard; its waters light on `pk:change`).
- accordion: CheckLedger (first row open, route as an `aq-phone-kit__go` row link) and SpareSheet (a nested root: the
  `tbody` accordion at 600 inside the sticky figure root at 860; `pk:change` from the accordion draws the open part).
- CutawayRail keys each card twice (a marker 12 % of the reading window above the card, and the card's top) to move
  its switch earlier than PhoneKit's 30 % line. A `data-pk-line="<fraction>"` option here would replace that workaround
  (open, no owner this round).

Added in build round D (integrator, 2026-11-03):
- accordion plus sticky figure (nested roots, as SpareSheet): ClauseTabs (buying terms). The clause list is the
  accordion (`data-pk-open="-1"`); the root is a sticky figure (`data-pk-bp="860" data-pk-h="180" data-pk-zoom="1.6"`)
  whose `data-pk-key` sits on the tags only, so the zoom centres on the tag; the tags counter-scale (`scale(1 /
  --pk-s)`); a tapped clause (`pk:change`) wins over the reading line while its row is in view. The root is a flex
  column while PhoneKit is on, because a grid item's sticky box holds only inside its own row.
- accordion: FitEnvelope (urs-guide pp-rows, ind-process fit): the lockout tags are heads on one cord, none open at
  first, `fold: 3` on urs-guide.
- Designed without PhoneKit (each README says why): LevellingSheet (a plain CSS checklist, each row one link),
  BidRoute (an always-open riser: the route is the idea), CapitalRequest (a form, nothing to pick), RecordTrail,
  ReceivingBench and ContractFolders (each station, row or folder already one readable unit).
