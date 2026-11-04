Closing is the call to action at the end of every page: one centred display headline on the navy band, one lead sentence and a large primary button, with the brand mark large and faint, cut by the top-left corner. An optional checklist, a send-and-return exchange drawn as a small process, or a proof figure sits below the button.

## Markup

```html
<section class="aq-section aq-band--navy aq-closing">
  <svg class="aq-closing__mark" viewBox="0 0 512 512" aria-hidden="true" focusable="false"><path d="M233.32 159.66A73.66 73.66 0 1 1 86.00 159.66A73.66 73.66 0 1 1 233.32 159.66ZM233.32 352.34A73.66 73.66 0 1 1 159.66 278.68A119.03 119.03 0 0 0 278.68 159.66A73.66 73.66 0 1 1 352.34 233.32A119.03 119.03 0 0 0 233.32 352.34ZM426.00 352.34A73.66 73.66 0 1 1 278.68 352.34A73.66 73.66 0 1 1 426.00 352.34Z"/></svg>
  <div class="aq-in"><div class="aq-closing__frame">
    <h2 class="aq-closing__h">Tell us the water grade and the flow. We'll do the rest.</h2>
    <p class="aq-lead aq-closing__lead">Send your URS or a short brief and an engineer will reply with questions, not a sales script.</p>
    <div class="aq-closing__action"><a class="aq-btn aq-btn--primary" href="#contact-proposal">Request a proposal <span class="aq-btn__arrow">→</span></a></div>
    <div class="aq-closing__more">…checklist or exchange, then proof…</div>
  </div></div>
</section>
```

- Always on `aq-band--navy` (see Band): it sets the navy ground, `on-navy` text and turns the primary button Limestone.
- On the site, `wClosing(c, p)` in `assets/src/parts/Closing.js` renders it from the page's `cta` (`h`, `body`, `button`, `link`, `intent`, `include`, `returns`, `turnaround`, `proof`). `aq-closing__more` appears only when the page has a checklist, an exchange or `cta.proof`. The proof shows `cta.proof` and nothing else; it never falls back to the hero facts.
- A closing that sends the reader to its own page's form (careers, cmp-quality) links the form's block, `"link": "#apply"`, and may still pre-select with `intent`: the jump ticks those options on that form in place, as a link from another page does on arrival (Button; EnquiryForm, "Pre-set from the same page"). `check` reads the intent against that block's fields.
- The closing action can be a call (DR-006, contact-proposal: "Call [sales phone number]"): `"cta": {"button": "Call [sales phone number]", "link": "tel:[sales phone number]"}`. While the number is a placeholder the action is that line as plain `on-navy` text with the placeholder, no button and no link (`aq-btn--pending`, see Button); once the number is filled in both, it is the Limestone button and dials it.

## Layout

- **Desktop:** everything centred, the one place on the site where text is centred: the headline (Geist 300, `clamp(40px, 4.8cqi, 68px)`/1.04, -0.035em, at most 20 characters a line wide, sentence case) in `on-navy`, the lead (`body-lg`, at most 52 characters per line) in `on-navy-muted`, then the button, the one large button on the site (`space-16` tall, `space-8` side padding, 16 px label; its arrow steps `space-1` on hover). The band is `space-24` + `space-8` above the headline and `space-24` below.
- **The mark** (unchanged; DR on the closing mark, option D): the supplied mark path at `min(44%, 640px)`, its centre 15 % of its width inside the top-left corner (`transform: translate(-35%, -35%)`), so the band edges cut the three outer dots about in half and the wave and lower-right dot show whole. Filled `limestone` at 6 %, with a radial mask that fades it away from the corner; it ends before the headline. It never moves.
- **The water line:** one 1.5 px line along the band's top edge in `flow` lifted towards `on-navy` (`--aq-c-water`), run in from the left by motion.
- **Exchange** (below the button, `space-12` under it, 1040 px max, left-aligned): three columns, send rows | pipe | returns. The send rows (index and text, 15/22, `space-12` tall, `--aq-c-hair` hairlines between) each run a stub into a manifold bus down the list's right edge; one pipe (twin `--aq-c-line` walls `space-2` apart, the water line in its bore, a chevron at its outlet) crosses the middle column with the turnaround riding above it as its label (mono 13/20, real text); the returns hang off a second bus down their left edge, each a row with a small drawn sheet (`aq-closing__doc`: folded corner, three text lines; `flow`-lit on hover). The two labels ("What to send us", "What comes back") hang above their lists, out of the flow, so both lists and the pipe centre on one line.
- **Checklist alone** (`include` without `returns`): two columns of numbered rows on faint hairlines (phones: the same two-column chip grid as the exchange).
- **Call** (`cta.variant: "call"`, contact-proposal, pass 12): the exchange as a phone call. `include` is what to have ready (`include_label` "Have ready"), `turnaround` names the line ("An engineer on the line") above the pipe, the closing's button (a `tel:` link) hangs under the pipe in a 44 px slot instead of standing under the lead, and `returns` is what comes back. The middle column widens to 192–280 px. While the number is a placeholder the Button writes its pending text; here it keeps the 44 px slot, marked by a dashed `--aq-c-line` hairline (it never pretends to dial). Phones: Have ready chips, the line's name as the chip on the pipe, the call slot full width under it, then the returns. Without `include` and `returns` a call closing falls back to the plain band with its button.
- **Phone** (`@container (max-width: 860px)`, pass 12 S3): headline 36/38, the lead, a full-width button (`space-12` tall), then the exchange as a vertical flow down the band, **nothing dropped**: every send item as a chip (14/20, `--aq-c-hair` frame, `radius-sm`) in a two-column grid, an item over 40 characters taking the whole row, and so does a half item that would otherwise sit alone (before a wide one, or last), so the grid has no hole; then the pipe, centred and running down to its chevron, with the turnaround as a chip on it reading "Reply within [time]" (`aq-closing__within`, phones only; mono 14/20 in a navy chip, so nothing sits on the arrow line); then every returned document as a row with its drawn sheet. No manifolds on phones. The proof stays (value 28/34). The mark is 90 % of the width, cut by the corner the same way.
- No frame, title strip, registration marks, ruled boxes or plate: the navy ground, the faded mark, hairlines and the one drawn process do the work.

## Token rules

- Ground: Navy depth, the brand book's gradient ground for the closing band (`linear-gradient(160deg, navy + 12 % on-navy, navy 45 %, navy + 30 % on-limestone)`), set on `.aq-closing.aq-band--navy`. Body text keeps 5.7:1 or better at every stop in both themes.
- Ground `navy` (from `aq-band--navy`); text `on-navy`, secondary text `on-navy-muted`. These stay light on navy in both themes (`ink-inverse` would turn dark in the dark theme).
- Hairlines: 1 px `on-navy-muted` at 30 % strength (`--aq-c-hair`); drawing lines (bus, stubs, pipe walls, sheets) at 55 % (`--aq-c-line`); water `flow` mixed 55 % with `on-navy` (`--aq-c-water`), so it reads on navy in both themes. Labels ("What to send us", "Proof") in the `eyebrow` style in `on-navy-muted`.
- Proof value in `font-mono` 300, 40/44 px, tabular figures, `on-navy`; its label 14/22 `on-navy-muted`.

## Writing

- Headline: one sentence, sentence case, naming what the reader should send or ask for. Not a slogan.
- Lead: what to send and what comes back.
- Proof: set `cta.proof` only when one figure the page already states evidences what the closing asks for: an Aquemi commitment or a test we run ("100 % of welds visually examined" under "Send your fabrication spec"). A pharmacopoeia limit alone is not proof of anything we do; a count of system families is not proof either. Value with its unit, label with its standard. Never invent or round a number for this box, and never use a `[placeholder]` (`check` rejects it); leave the box out instead.

## When not to use it

- Only once per page, last before the footer. Never next to another navy band.
- Not for mid-page prompts; use a Button in the section instead.

Origin: concepts 18 (closing) and 49 (send and return) in `design-system/inspiration/gemini/`, now set in the brand's plain closing band (no drawing frame or plate).

## Checklist (`cta.include`)

An optional list of short strings on the page's `cta`, rendered as a compact numbered checklist (below the button), headed "What to send us" (override with `cta.include_label`).

```json
"cta": {"h": "Send your feed water analysis.", "body": "…", "button": "Request a sizing proposal", "link": "contact-proposal",
        "include": ["Feed water analysis, last 12 months", "Peak and average demand, L/h", "Lowest feed temperature"]}
```

```html
<div class="aq-closing__include"><p class="aq-closing__tag">What to send us</p>
  <ol><li><span class="aq-index" aria-hidden="true">01</span><span>Feed water analysis, last 12 months</span></li>…</ol></div>
```

- Use it to fold a page's "what to send us" docs block into the closing: one ask, in one place. Three to seven items, each 8 words or fewer.
- Rows on `on-navy-muted` hairlines at 30 % strength; text 16/24 `on-navy` (14/22 on phones); index in `on-navy-muted`.

## Exchange (`cta.returns`, `cta.turnaround`)

With `cta.returns` (two to four strings, each a document or answer the page already promises: "Skid sizing for your coldest feed", "Budget range, CAD") the checklist becomes an exchange below the button: what you send, an arrow with `cta.turnaround` (a placeholder until confirmed, `[proposal response time, working days]`), and what comes back, numbered like the send rows. `cta.returns_label` overrides "What comes back". Markup: `.aq-closing__swap` > `.aq-closing__include` (rows `<li><span class="aq-index">01</span><span class="aq-closing__t">…</span></li>`), `<p class="aq-closing__turn"><span class="aq-closing__pipe" aria-hidden="true"><i></i></span><span class="aq-closing__turn-t">[turnaround]</span></p>`, `.aq-closing__include.aq-closing__returns` (rows lead with `<span class="aq-closing__doc" aria-hidden="true"></span>`). The empty `<i>` is the droplet motion sends through the pipe. Phones: every send row and every return (pass 12). Never list a return the page doesn't already promise.

## Motion

`Closing/motion.js`, once when the band scrolls in (`top 95%`): the water line runs along the top edge, the headline lines rise out of their mask, the lead and the button follow (one nudge of its arrow). Then the exchange runs in the order the water would: the send rows list themselves and their stubs run into the bus, the pipe is laid across, a droplet travels it with the water filling behind it, the turnaround lands on the pipe, and the returned sheets drop out of the far manifold one by one. A proof figure counts up only when it is a plain number. All ends static within 2.2 s of the band showing (a long exchange, four send rows and three returns, plays faster rather than longer); the custom properties it drives (`--aq-c-run`, `--aq-stub`, `--aq-bus`, `--aq-pipe`, `--aq-water`) default to 1, so the band is complete without JS and under reduced motion. The mark never moves.
