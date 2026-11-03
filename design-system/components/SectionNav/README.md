SectionNav is a sticky bar of numbered jump links to the sections of a long technical page, with a quiet page progress readout.

- Markup: `<nav class="aq-section-nav" aria-label="On this page"><div class="aq-in">`, then `<span class="aq-section-nav__label" aria-hidden="true">On this page <span>↓</span></span>`, then `<ol class="aq-section-nav__links">` with one `<li><a href="#…" data-jump="s-…"><span class="aq-section-nav__num" aria-hidden="true">01</span>Limits</a></li>` per section, then the progress cell (see the preview): `aq-section-nav__progress` holding a label, an `aq-section-nav__meter` (`role="progressbar"`, ten `aq-section-nav__seg`, lit ones `is-on`) and `aq-section-nav__pct`.
- Each link's `data-jump` is the `id` of a `<section>` on the page; the site renderer adds those ids from the block nav labels and scrolls on click (page ids own the URL hash, so links do not change it). Those sections get `scroll-margin-top` so the bar never covers their heading.
- The section being read is underlined: `aria-current="true"` turns the link `ink` with a 1 px `flow` line under it. No boxes or fills. The site's scroll-spy (one passive scroll listener, one update per frame) sets it here and in the phone menu's section jump, scrolls the active link into view inside the bar, and updates the progress segments and percentage.
- Sticks to the top of the viewport (`position: sticky`, `top: 0`) on `surface` with a `line` bottom border; label and progress cells are ruled off with `line`. Label and progress label are eyebrow style (Geist Mono 12/16, 0.08em, uppercase, `ink-muted`); links are Geist 14/20 sentence case in `ink-muted` with a Geist Mono 12 px `ink-subtle` number; the progress is ten 2 px `line` segments that turn `flow`, and a mono percentage. Transitions are dropped under `prefers-reduced-motion`.
- The links scroll sideways rather than wrapping, so the bar is always one row. Phones: see below.
- Every jump target (`section[id]`) gets `scroll-margin-top: var(--space-16)`, so the sticky bar never covers the heading after a jump.
- Use short labels (one to three words: "Limits", "Design", "Documents", "FAQ"). Eight links at most.
- Only on pages with four or more labelled sections. Short pages and the home page do without it; the NavBar is the site-level navigation and carries the proposal button.

## Phones

- A slim 44 px strip (every link a 44 px touch target, 13 px text). No label or percentage; the progress segments become a 2 px `flow` line along the bar's bottom edge, the current link gets a 1 px `ink` underline. While the reader scrolls down, the stuck bar tucks up out of view (`is-tucked`, a `transform` set by the scroll listener in `SectionNav.js`; no transition under reduced motion) and it returns on any scroll up, so it never sits on content. Jump targets get `scroll-margin-top: var(--space-12)`. The strip scrolls sideways inside itself and never widens the page.

## Motion

Motion (`SectionNav/motion.js`): a 2 px `flow` marker along the bar's bottom edge slides to the link being read (it follows the `aria-current` the scroll-spy sets, through a MutationObserver; transforms only, eased with `aq-settle`), and the links settle in once. With the marker on (`has-mark`), the current link keeps its sunken box with a `line` border instead of the `flow` one. Without JS or under reduced motion the static boxed link remains.

Pass 9b (Subframe Motion `sliding-tabs`, `fluid-tab-rail`): the marker keeps its momentum on a spring (460/34); a flow-tint plate glides under the hovered link and back to the current one; keyboard focus moves it instantly.
- At the footer (pass 12 C, F2): while the footer is in view the bar takes `is-footed` (SectionNav.js scroll-spy): it slides up out of sight and leaves the tab order, and returns as soon as the footer leaves the view. It stays while it holds keyboard focus.
