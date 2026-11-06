Aquemi designs and fabricates clean water systems for pharmaceutical manufacturing: modular Purified Water packages in polypropylene (PP) with PVC pretreatment, covering pretreatment, reverse osmosis, DI/EDI and the distribution loop. We do not offer Water for Injection, pure steam, stills or stainless steel piped systems at this time; never present them as Aquemi products. The people we talk to are engineers, validation leads and quality managers. They read specifications closely and they are accountable to auditors. The brand should feel like the equipment: precise, quiet, finished to a high standard, with nothing extra.

Three principles guide every decision:

1. **Precision over persuasion.** Show the number, the standard and the method. Let the specification make the case.
2. **Space is a material.** Generous white space, few elements, square edges. A page should read like a clean room looks.
3. **One flowing line.** The wordmark's swash from *e* into *m* is the brand's single expressive gesture. Use it sparingly, through the logo and the closing band's faint mark, and keep everything around it calm.

## Content fundamentals

### Voice

Write the way a senior process engineer explains a system to a peer: plain, exact and confident without selling.

- Use **we** for Aquemi and **you** for the client. Never "the customer".
- Lead with the outcome, then the evidence. "Conductivity holds below 1.1 µS/cm at 25 °C across the loop" beats "Industry-leading water quality".
- Name the standard every time a claim depends on one: USP <645>, USP <643>, Ph. Eur., GAMP 5, WHO TRS 1033.
- Use short sentences and active verbs. One idea per sentence.
- Don't hype. Never write *revolutionary*, *world-class*, *cutting-edge*, *best-in-class*, *seamless* or *solutions-driven*.
- No emoji, no exclamation marks.

| Write | Not |
| --- | --- |
| Every skid is factory acceptance tested before it ships. | Our rigorous quality processes ensure excellence. |
| Loop conductivity is trended against the USP <645> limit at 25 °C. | Cutting-edge monitoring technology. |
| Validation documents follow GAMP 5 and arrive with the equipment. | Seamless validation support! |

### Mechanics

- **Sentence case** for every heading, button and nav item: "Request a proposal", not "Request A Proposal".
- **Uppercase** only in the `eyebrow` style.
- **Units:** a space between number and unit (`80 °C`, `1.1 µS/cm`, `< 0.1 EU/mL`, `500 ppb TOC`). Use SI units; give imperial in brackets only on US-facing documents.
- **Abbreviations:** spell out on first use per page, then abbreviate: "Purified Water (PW)", "Reverse osmosis (RO)", "Electrodeionization (EDI)", "Polypropylene (PP)".
- **Numbers:** numerals for all measurements; words for one to nine in prose counts.
- **Product and system names** are set in the body face, never in the wordmark's letterforms.

## Visual foundations

### Logo

The identity has three parts: the **wordmark**, the **mark**, and the **lockup** that pairs them. The wordmark is lowercase and always set as one piece. Files are in the Logos, Mark and App icons asset groups.

- **Colours:** `aquemi-logo-navy.svg` on `surface`, `surface-raised` and `limestone`. `aquemi-logo-limestone.svg` on `navy`. `aquemi-logo-white.svg` on photography only, where the image behind it is dark and even.
- **Clear space:** keep a margin equal to the height of the *a* on every side. No text, edge or image detail inside it.
- **Minimum size:** 96 px wide on screen, 25 mm wide in print.
- **Placement:** top left in navigation at 112 px wide; bottom left in the footer at 160 px wide.
- **Don't** recolour it outside the three files, stretch, outline, add a shadow, rotate, re-letter it in a font, or place it on `flow` or a busy image.

### The mark

Four dots on a 2 × 2 grid, two of them joined on the diagonal by a wave. It distils the wordmark's one flowing line: the dots are the drops, and the wave is the swash from *e* into *m*.

- **Geometry is fixed.** The dots sit on an exact grid and the wave's concave edges are arcs centred on the two free dots, so the gap is even all round. Beside the wordmark, the mark is as tall as the *a*, and the wave's narrowest point sits between the wordmark's hairline and its *e*-to-*m* swash. Use the supplied files; never redraw, re-space or rotate it. The one exception is the mark's own animation (The mark in motion, below), which moves the dots and always comes to rest on the supplied geometry.
- **Colours:** `aquemi-mark-navy.svg` on light grounds, `aquemi-mark-limestone.svg` on `navy`. One colour only; never fill the dots in different colours.
- **Clear space:** half the mark's width on every side.
- **Minimum size:** 16 px on screen (favicon), 6 mm in print.
- **Use it alone** where space is square or tiny: favicons, app icons, profile pictures, equipment badges, document footers, social avatars. Everywhere else, prefer the wordmark or the lockup.
- **One large use on the site:** the closing band carries the mark large and faint (`aquemi-mark-limestone` geometry in `limestone` at 6 %, `min(44%, 640px)` wide), its centre 15 % of its width inside the band's top-left corner so the edges cut the outer dots, fading away from the corner and ending before the headline. Clear space and minimum size do not apply to this watermark; nothing else on the site shows the mark this way.

### The mark in motion

The mark has one animation, **Spread**: a single drop at the centre divides like water into the mark. It is the only way the mark moves.

- **The movement.** The four dots start stacked as one drop at the centre and travel out along the diagonals to the grid. The two dots the wave joins stay connected the whole way: the wave's concave edges keep the mark's own rule (arcs centred on the two free dots), so the neck starts as wide as a drop and narrows steadily to the wave's waist. The free dots pull away and separate. A light liquid softening shows only while all four dots still overlap, and is gone before they land. The animation ends on the supplied mark exactly, never on an approximation.
- **Timing.** Hold the single drop for 0.2 s, then spread in 0.45 s on the brand ease `cubic-bezier(0.2, 0, 0, 1)`. Played once, the full mark is in place at about 0.65 s. As a loader it loops every 3.2 s: the mark holds for 2 s, then gathers back to the centre in 0.5 s on `cubic-bezier(0.4, 0, 0.2, 1)` and spreads again.
- **Where to use it:**
  - once, as an intro: the site's first load, splash screens and video idents;
  - looping, as a loading indicator: waits of more than about half a second, at 16 px and up.
  
  Loop it only while something is actually loading, never as decoration.
- **In the lockup** the mark animates in its fixed place and the wordmark stays still.
- **One colour,** as for the still mark: navy on light grounds, limestone on `navy`.
- **Reduced motion.** With `prefers-reduced-motion`, show the still mark. A loader may pulse its opacity slowly (2.4 s, between 100 % and 45 %).
- **Distance.** Each dot travels a quarter of the mark's width, about 23 px when the mark is 120 px wide. This is the one exception to the 16 px limit in Motion.
- **Don't:**
  - spin, bounce, scale or recolour the mark;
  - animate the wordmark;
  - animate the closing band's faint mark;
  - change the timing to make it feel livelier.
- **Reference:** option E on the mark motion board, https://aquemi-official.github.io/aquemi-web/design-system/inspiration/mark-motion.html (in the repo, `design-system/inspiration/mark-motion.html`). It is drawn from the mark's geometry on every frame; the other options on that board were not chosen.

### The lockup

The mark sits to the left of the wordmark, top-aligned with the arch of the *a* and sitting on the baseline, with the *q*'s tail hanging below. The space between them is fixed in `aquemi-lockup-navy.svg` and `aquemi-lockup-limestone.svg`; never rebuild it by hand.

- Use the lockup on first introductions: proposals, datasheet covers, trade-show graphics, email signatures, the website header on wide screens.
- Use the wordmark alone in the site navigation on phones and anywhere width is tight.
- Minimum lockup width: 140 px on screen, 35 mm in print.

### App icons and profile pictures

Built from the mark, in Limestone on a full `navy` square. Files are in the App icons asset group.

| File | Size | Use |
| --- | --- | --- |
| `favicon.svg` | Scalable | Browser tabs. Navy on clear, switches to Limestone in a dark browser |
| `favicon-32.png` (with `favicon.ico`, 16/32/48 px, kept with the website files) | 32 px | Browser tabs in older browsers |
| `apple-touch-icon.png` | 180 px | iPhone and iPad home screen |
| `icon-512.png` | 512 px | Android home screen and installed web app (also 192 px) |
| `icon-maskable-512.png` | 512 px | Android adaptive icon; extra padding survives circle and squircle crops |
| `profile-navy-1024.png` | 1024 px | Default profile picture: LinkedIn, Google Business Profile, YouTube |
| `profile-limestone-1024.png` | 1024 px | Profile picture where navy clashes or the platform is dark |

- Favicons fill more of their square than other icons, so the four dots stay distinct at 16 px.
- Profile pictures keep the mark well inside the circle most platforms crop to.
- Add this to the `<head>` of every page:

```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0F2A47">
```

### Colour

The palette is mostly neutral. Navy carries the brand, Limestone softens it, and Flow Blue is the only accent.

| Role | Token | Share of a typical page |
| --- | --- | --- |
| Page and panels | `surface`, `surface-raised`, `surface-sunken` | about 70% |
| Brand bands, footer, primary actions | `navy` / `action` | about 20% |
| Quiet bands, reversed logo | `limestone` | about 8% |
| Links, chart lines, one highlighted figure | `flow` | 2% or less |

- Set text in `ink`. Use `ink-muted` for secondary copy and `ink-subtle` for metadata on `surface` and `surface-raised` only.
- Use `flow` as a line or a word, never as a large fill and never as a button.
- Status colours (`pass`, `caution`, `fail`) appear only in data: test results, qualification status, monitoring. Each one always comes with a word or icon.
- Gradients only as the two grounds below, never anywhere else. No tinted shadows. No colour outside these tokens.
- Dark mode swaps the ground to `surface` dark (a deep navy). Primary buttons turn Limestone (`action`) with navy labels (`on-action`).

### Gradient grounds

A section ground may carry a gradient only where it adds depth without adding an object. The rules:

- **Only these two grounds, each at most once per page.** Navy depth on the closing band; Flow mist on system-page heroes (pages with an equipment drawing). Nothing else takes a gradient: not cards, buttons, tables, text, icons, arcs or lines.
- **Never behind tables or long text.** A gradient sits under a headline, one lead sentence and a button, or beside a drawing.
- **Built from tokens only**, mixed in `srgb` with `color-mix()`, so every gradient follows light and dark themes.
- **Text keeps its contrast at every stop:** 4.5:1 for body text, checked against the stop where it is weakest, in both themes.
- **Quiet:** the change across a gradient should be felt rather than seen. No multi-colour blends, no blue-to-purple, no glow behind text.

| Ground | Where | Recipe |
| --- | --- | --- |
| Navy depth | Closing band | `linear-gradient(160deg, navy + 12 % on-navy, navy 45 %, navy + 30 % on-limestone)` |
| Flow mist | System-page hero, behind the equipment drawing | `radial-gradient(ellipse 60% 70% at 100% 0%, flow-tint 90 %, transparent 70 %)` over `surface` |

### Typography

Two families from one design: **Geist** for everything you read and **Geist Mono** for everything you measure. Both are free on Google Fonts. The wordmark is drawn, not typeset; never imitate it with a serif.

- Headlines (`display-xl`, `display`, `h1`, `h2`) run light (300–400) and tightly tracked. Size and space create the hierarchy, not bold.
- Body copy is `body` (16/26) with lines kept under `text-max` (680 px). Leads use `body-lg`.
- `eyebrow` (mono, uppercase, 0.08em tracking) sits above a headline to name the system or standard: `PURIFIED WATER · USP <645>`.
- Set every measurement in `data` or `readout` with tabular figures, so columns of values line up.
- Weight 500 is the heaviest weight in the system. Use it for `h3` and `label` only.

### Layout and spacing

- 12-column grid, max width `content-max` (1280 px), gutters `space-6`. Side margins: `space-4` on phones, `space-8` on desktop.
- Section padding: `space-24` on desktop, `space-12` on phones (pages are long; denser rhythm keeps them scannable). Leave the space empty; resist filling it.
- Headlines align left. Centred text is reserved for a single short line in a closing call-to-action band.
- Separate with `line` hairlines and changes of surface, not boxes and shadows. `shadow-overlay` is for floating menus and dialogs only.
- Sections alternate grounds: between the hero and the closing band, every second section sits on `surface-sunken`, the rest on `surface`, with the `line` hairline still between them. A Limestone, sunken or navy band keeps its own ground and restarts the alternation.
- Corners are square (`radius-0`) by default. Controls take `radius-sm`; only standard tags are pills (`radius-pill`).

### The arc motif

The swash in the wordmark is a quarter-arc rising into a straight stem. The site no longer draws it as a separate graphic: the closing band's large faint mark took its place (see The mark). If an arc is used elsewhere (print, slides):

- Quarter-circle arcs in a single 1.5 px stroke of `line-strong`, `flow`, or `limestone` on navy, cut at the edge of a band or image.
- At most one arc composition per screen. Never animate it on a loop.
- Never fill arcs with gradients or turn them into literal water drops or waves.

### Imagery

- **Subjects:** the work itself. PP skids and pipework, thermoplastic welds, PVC pretreatment vessels, sanitary valves, skids on the shop floor, installed loops in clean rooms, engineers reviewing drawings.
- **Light:** cool, even, natural or diffused. True whites, no colour filters, no lens flare.
- **Framing:** tight details or wide orderly views with strong verticals. Leave negative space for headlines.
- **Avoid:** stock lab coats with pipettes, splashing water, droplets on leaves, glowing blue molecules, globes and handshakes.
- **Diagrams:** draw process schematics as single-weight line art in `line-strong` with `flow` marking the water path. Follow P&ID conventions for valves and instruments.

### Motion

Motion should feel like steady flow: slow, smooth and purposeful.

- Durations 200 ms for controls, 400–600 ms for section reveals. Ease `cubic-bezier(0.2, 0, 0, 1)`.
- Fade and translate by at most 16 px. No bounce, no scale-pop, no parallax on text. The mark's own animation is the one exception (The mark in motion).
- Respect `prefers-reduced-motion`: drop translation and keep only opacity.
- **Scroll reveals** play once and settle within 5 s. **Visitor-driven feedback** (hover, press, drag, scrub) may repeat: 100–200 ms, exits a third faster than entrances.
- **Ambient layers** (FxShader: water caustics, flow fields, guilloché, contours) are the one material moment on a page: they move only while on screen and only the most visible one at a time, slowly (one visible cycle takes 6 s or more), stay faint behind text, and show a still frame under reduced motion. At most two on a page.
- **One pinned or scroll-linked story per page** may tie progress to scrolling: readable at every position, skippable, never changes scroll speed, a static layout under reduced motion.
- **Library.** New motion starts from the Subframe Motion library (MIT, https://www.subframe.com/motion), ported to GSAP and tokens with its licence header kept. In Claude Code use the `motion-library` skill.

### States

- Focus: 2 px solid `focus` ring with a 2 px offset on every interactive element.
- Hover on primary buttons shifts the fill to `action-hover`. Links underline on hover.
- Disabled controls use `ink-subtle` text on `surface-sunken` with no border change. Always explain why something is disabled nearby.

## Iconography

This section covers interface icons, not the brand mark. No interface icon set has been supplied. Until one is, use **Lucide** at a 1.5 px stroke, 20 px default size, coloured `ink` or `ink-muted`. Icons support labels; they never replace them. For process diagrams, use standard ISA-5.1 / P&ID symbols, not icons. Never use emoji.

## Data and specifications

Specifications are the brand's strongest content. Present them as clean tables (see SpecTable):

- Parameter in the first column, value in `data` with its unit, then the test method or pharmacopoeia reference.
- Give limits as the standard states them: `≤ 1.3 µS/cm @ 25 °C (stage 1)`, `≤ 500 ppb TOC`, `100 CFU/mL action level`.
- Highlight at most one row with `flow-tint`.
- When showing results, add a status word (Pass, Alert, Action) in the matching status colour.

## Where this system lives and how it grows

- **Source:** the `design-system/` folder of the GitHub repository `Aquemi-Official/aquemi-web`. Tokens, component styles (`components/<Name>/style.css`, built into `components/bundle.css`), guidelines and previews are edited there and published here.
- **Visual guide:** https://aquemi-official.github.io/aquemi-web/design-system.html renders every token and component from those files, in light, dark and phone width.
- **In use:** the draft website https://aquemi-official.github.io/aquemi-web/ loads the same `tokens.css` and `bundle.css`. The Page inventory section lists every page and the components it uses.
- **Building with it:** compose pages from the components (Page, NavBar, Hero, sections, closing Band, Footer) and the type classes (`aq-display`, `aq-h1`, `aq-lead` …). If something you need is missing, propose a new component in the repository rather than styling one-off.
- **Changing it:** see `AGENTS.md` in the repository. Changes made only in this artifact are overwritten by the next publish from the repository.
