The site header: logo, the six sections as mega menu buttons, a "Service request" link and one call to action; on narrow screens a menu with the urgent block and the sections as an accordion.

- Structure: `<nav class="aq-nav" aria-label="Main">` holding the logo link (`<a class="aq-nav__home">`), `<ul class="aq-nav__links">` of `<li class="aq-nav__item">`, the shared panel backdrop `<div class="aq-mega__bg" aria-hidden="true" hidden>`, a spacer (`<span class="aq-nav__spacer">`), the service link `<a class="aq-nav__service">` ("Service request", to contact-service), the primary `aq-btn` inside `<span class="aq-nav__frame">` (a plain wrapper, so the phone menu can reuse the button) and the phone menu toggle.
- Sections come from `NAVMENU` in `assets/src/core.js` (one source; `NAVSECT` derives from it): Systems, Services, Industries, Compliance, Applications (the `projects` page), Company. A section's `sections` lists the page `section` strings that make it current (Company is current on the Contact pages too). The service link is not a section: beside Services, a seventh "Service" section would read as a duplicate.
- 72 px bar on `surface` with a `line` bottom rule. It scrolls with the page; the SectionNav is what sticks on long pages.
- On desktop the header carries the lockup. The consumer provides both lockup files as two `<img>` elements, each with `aq-nav__logo aq-nav__logo--lockup` (152 px wide, 140 px at mid widths): `aquemi-lockup-navy.svg` with `aq-logo--on-light`, and `aquemi-lockup-limestone.svg` with `aq-logo--on-dark`. On phones, use the wordmark alone (`aquemi-logo-*.svg`, only `aq-nav__logo`, 112 px).

## Section buttons and panels (wide bar)

- Each section is `<button type="button" class="aq-nav__trigger" id="nav-t-<id>" aria-expanded aria-controls="nav-p-<id>">` with the label and a chevron (`aq-nav__chev`, 8 px, two 1.5 px strokes in `currentColor`, turned over while open). Styled as the old section link: Geist 14/20, 500, `ink-muted`; hover, open and the current section (`aria-current="true"`) turn `ink`. A section with `panel: null` stays a plain link (`<a>` in the item).
- The button no longer navigates. Its panel `<div class="aq-mega" id="nav-p-<id>" hidden>` sits inside the same `<li>` (Tab runs button, panel links, next button) but is placed against the bar: full width under it, `surface`, a `line` hairline on top and a `line-strong` one at the bottom (so the overlay reads as a layer in dark too, where `shadow-overlay` barely shows), z-index 20 (above the SectionNav and look layers, below BackToTop), scrolling inside when taller than the window: its `max-height` is the window less the bar's bottom edge (`--mega-top`, set at each open, so a draft bar or a scrolled page above the nav is counted). No scrim: it is not modal, and not a landmark.
- Inside `aq-mega__in` (`content-max`, `space-8` padding, a 12-column grid):
  - `aq-mega__head`: `<p class="aq-mega__name">` (12/16 mono, uppercase, `ink-muted`), `<p class="aq-mega__lead">` (one line, 16/24 `ink`) and `<a class="aq-mega__all">` "<Section> overview", the hub and the first link.
  - `aq-mega__groups`: two to four `aq-mega__group`s, each a `<p class="aq-mega__label">` (text, not a heading: the page outline never changes) and a list labelled by it (`aria-labelledby`) of `<a class="aq-mega__link">` with `aq-mega__t` (16/24, 500, a 1 px `flow` underline draws on hover and focus) and `aq-mega__d` (one line, 9 words or fewer, 14/20 `ink-muted`, `text-wrap: pretty` so no one-word last line). Side by side, the groups' labels share one row (`subgrid`), so a label that wraps to two lines moves every column's first link down together. The current page's link carries `aria-current="page"` and a `flow` arrow.
  - `<a class="aq-mega__feat">`: the featured card, a real destination (a guide, a technical note, the supplier audit), on `surface-sunken` with a `line` hairline and square corners: a Spot icon in `flow`, a mono eyebrow, a 20/28 title (`text-wrap: balance`) with a `flow` arrow that travels with the title's last word (`aq-mega__tail`, nowrap: the arrow never wraps alone), a 14/20 description.
  - `<p class="aq-mega__foot">` (optional): a 14/20 line under a hairline, with an optional link. Systems carries the DR-021 exclusion sentence word for word (and a "Why" link); Industries names its other exclusions once, without a link (the tasks row right under it carries "check our use fits").
  - Then, across the panel foot, `aq-mega__tasks`: a `surface-sunken` band, the label "I need to" and the same buyer tasks in every panel (`NAVTASKS`), 14/20 links with a `flow` arrow, separated by hairlines (no pills). Seven tasks never fit one line inside `content-max`, so they are set on purpose as a grid of four columns (4 + 3), hairlines in line from row to row, the first column without one; the label sits on the first row's line. Each link has `space-1` of side padding so its inset focus ring stays off the words.
- Grid: from 1,240 px the head takes columns 1-3, the groups 4-9 (two groups side by side, three in three columns, one group with its links in two columns), the featured card 10-12; below 1,240 px the head is one line (name, lead, overview) over the groups (1-8) and the card (9-12). Up to 1,120 px the padding is `space-6`.
- Entries show only when their page (and anchor) exists (`whas`), so planned pages and anchors appear when their files land; a group with no entry and a card or foot link whose target is missing drop out. An entry gated `filled` (certification status) stays hidden while its block's ISO 9001 row is a placeholder.

### Behaviour

| Event | What happens |
| --- | --- |
| Click, Enter or Space on a button | Toggles its panel; opening one closes any other |
| A mouse rests 120 ms on a button (fine pointers only) | Opens it; with a panel already open, another button switches at once |
| Click on a hover-opened button | Keeps it open (a second click closes) |
| The pointer leaves button and panel | Closes after 300 ms unless re-entered; a panel opened by click stays |
| Escape | Closes it; returns focus to its button only when focus was in the panel (a hover-opened panel leaves focus where it was); before the phone menu's Escape |
| Focus leaves the item, a press outside the bar | Closes it; focus is not moved |
| A link in the panel | Navigates; the page re-renders, so everything closes |
| The bar scrolls out of view, or turns compact | Closes it (IntersectionObserver, ResizeObserver) |
| Left / Right, Home / End on the sections | Move between them; Down on a button opens it at the overview link |

State lives in the DOM (`hidden`, `aria-expanded`); opening never re-renders the page. Each change is announced as a cancelable `aq:navpanel` event on the bar (`detail: {open, from, trigger, key, done}`); motion that takes it over calls `done()` when its exit ends, and `done()` runs anyway 400 ms later, so a panel is never left showing. Without motion every change is instant.

## Widths

Container widths: above 1,120 px the full spacing; up to 1,120 px the gaps tighten (`space-4` around, `space-3` between sections, lockup 140 px). The bar needs about 1,010 px for the logo, six section buttons with chevrons, the service link and the button, so up to 1,040 px the sections, the service link and the button hide and the toggle shows. A width guard (NavBar.js) backs that budget: when a bar renders and on resize, if the section buttons overflow their row by more than half the bar's gap (longer labels, a translation), the bar gets `is-tight` and takes the same compact form at any width; below 860 px the bar drops to 64 px with `space-4` gutters.

## Phone menu

The toggle: `<button class="aq-btn aq-btn--secondary aq-nav__toggle" aria-expanded aria-controls>` reading "Menu" or "Close". It opens `<div class="aq-menu">` on `surface` directly under the bar, holding in order:

1. The urgent block `<div class="aq-menu__urgent" data-theme="light">` on `limestone` (`space-4` padding, text in `on-limestone`): `<p class="aq-menu__ask">` "Production stopped?" in `label` (14/20, 500); the call line `aq-menu__call`, a "Call" eyebrow (`aq-menu__k`, `on-limestone-muted`) and the service number in Geist Mono 20/28, a `tel:` link once the number is confirmed and the `aq-ph` placeholder (never a link) until then; under it `<p class="aq-menu__hours">` "Answered" and the hours (14/20 Geist, `on-limestone-muted`), so the number never shows without them and never promises round-the-clock help; then the service row `<a class="aq-menu__service">` "Service request" in 20/28 under a `line-strong` hairline, 44 px tall, with the `flow` arrow and `aria-current="page"` on contact-service. `data-theme="light"` keeps its placeholder, hairline, arrow and focus ring on the light values, since limestone stays light in both themes. It is text, not a heading. The number and the hours come from `CONTACT.service` and `CONTACT.hours` in `assets/src/core.js`, the one source the Footer shares. At launch, while the number is unconfirmed, the block goes and its "Service request" row stays, first in the menu (`website.md`, Navigation).
2. `<nav aria-label="Sections"><ul class="aq-menu__list aq-menu__list--sect">`: each section a `<button class="aq-menu__sect" aria-expanded aria-controls="wm-g-<id>">` (20/28 Geist, 56 px rows, hairlines, a plus `aq-menu__plus` that turns into a cross while open) over its `<div class="aq-menu__group" hidden>`: the overview link (`aq-menu__all`), the featured entry as a sunken row with its description (`aq-menu__feat`), each group's label (`aq-menu__glabel`, 12/16 mono, text) and links (`aq-menu__link`, 16/24, 44 px or taller; descriptions from 480 px; two group columns from 600 px), then the foot line (its link styled as on the desktop: no underline, 500, a `flow` arrow). Two levels only: section, then links. Company leaves out the proposal and service links (the urgent block and the button carry them). The last row, "I need to", holds the buyer tasks. One group is open at a time; the current section's is open when the menu opens; opening one scrolls its row into view. Each change is a cancelable `aq:navgroup` event on the row's button.
3. On pages with a SectionNav: `<nav class="aq-menu__jump">` with the eyebrow label `<p class="aq-menu__label">Section jump</p>` and `<ol class="aq-menu__list aq-menu__list--jump">` repeating the page's jump links.
4. The proposal button in `<span class="aq-nav__frame aq-menu__cta">`, full width.

The menu is hidden at desktop widths even when open. The site renderer closes it when a section jump or a page link is chosen or Escape is pressed, and keeps focus on the toggle.

## Motion

CSS: on hover and keyboard focus a 1 px `flow` rule draws under a section button and the service link from its left end; the chevron and the plus turn in 160-200 ms; arrows nudge 4 px on hover (all dropped under reduced motion).

`NavBar/motion.js` (Subframe Motion ports, credit lines in the file):

- `curtain-index`: the phone menu unrolls from the bar and pushes the page, rows 35 ms apart, the urgent block first; Close rolls it up before the page re-renders and focus returns to the toggle. A mega panel's first open uses the same curtain (clip from the top, 240 ms) and its columns drop 8 px and fade in 18 ms apart (not when opened from the keyboard, so focus lands at once); closing fades the content (120 ms) and rolls the clip up (160 ms).
- `layered-menu`: switching between open panels keeps one surface: the backdrop springs its height to the new panel while the old content slides 12 px away from the new button's side and the new slides in from it.
- `sliding-tabs`: one flow rule rests under the current section, slides to the hovered or focused button on a spring (460 / 34), rests under an open panel's button and returns when it closes.
- `spring-accordion`: a phone group opens from height 0 in 300 ms with no bounce while the open one closes; from the keyboard it opens at once.
- `icon-morph`: the toggle's two bars cross while the menu is open (`aq-nav__burger`; the label stays "Menu" / "Close" in `aq-nav__toggle-t`).

Nothing in the header is ambient. Under reduced motion, or without GSAP, panels, switches and groups change at once and the rule just sits.
