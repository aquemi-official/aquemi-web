ClauseTabs shows commercial terms as page one of a proposal on a clipboard, with a numbered tab on each clause and a leader from every tab to what that clause governs on a small isometric PP package (look `clause-tabs`, a spec block).

Pass 12 build D, concept `inspiration/gemini/249-p12-buying-terms-take2.png` (audit row 33, buying#terms). The page says how you buy it; the package is what you buy.

- **Markup** (renderer `assets/src/blocks/look-clause-tabs.js`): `section.aq-clause-tabs-sec > .aq-in > .aq-clause-tabs`, which holds:
  - `__board` (sunken ground, navy `__clip` with its ring) and `__page` (raised paper, column heads `__head`, `ol.__list`).
    Each `li.__row` has `__tab` (the numbered index tab on the page's right edge), `h3.__t` (term), `__ours` (values as
    `ul.__v`, a value written `a · b` breaks into lines) and `__body` (the note `__m` and the link `__go`).
  - `__fig > __sheet`: the IsoKit drawing (`__svg`) and one `__tag` per clause, placed on its part.
  - `svg.__leads`: the leaders, laid by the look's script from the rendered tabs to the tags (ResizeObserver), so they
    follow wrapping.
- **Fields**: `h`, `intro`, `cols` [term, ours, note], `rows` [{`p`, `v`, `m`, `link`, `link_label`, `part`}]. `part`
  (look-only) names what the clause governs: `scope` (default, the dashed scope line round the whole package), `base`
  (the skid base and its fork pockets), `ro` (the membrane housings), `panel` (the control panel), `valve` (the sample
  valve on the product line) or `option` (the dashed option module). The tag anchors were found by a search over each
  part's faces (round D, checked at 1100 to 1440): on buying the tags fall down the drawing in clause order, no two
  leaders cross, no leader runs through the rack, its pump, the panel, the valve or another tag, and no tag covers a
  part it does not name. The valve's tag sits beside the valve, not on it, so the lit valve stays in view.
- **Drawing (PP rules)**: closed PP skid base with fork pockets, the PP RO rack, the product line with fusion beads out
  of the rack's end, down and along the open deck to a PP diaphragm sample valve low in front of the rack, a control panel on the deck, a dashed module on the floor; no steel, flanges, handwheels or legs.
  The drawing carries no words.
- **Interaction**: pointing at or focusing a clause lights its tab, leader, tag (flow, 112 %) and part (`.is-hot`);
  CSS transitions, none under reduced motion.
- **Widths**: 1080 px and under, the drawing stands above the page (at most 576 px wide, centred) and the leaders and
  tabs go (each term shows its number). **Phones and tablets** (860 and under) use two PhoneKit roots:
  - the root is a **sticky figure** (`data-pk-sticky data-pk-h="180" data-pk-zoom="1.6"`): the drawing is a 180 px strip
    held under the header (full bleed at 600 and under), each row is `data-pk-row`, each tag `data-pk-key`. The clause on
    the reading line lights its tag and part and the strip pans to that tag; the tags keep 12 px through the zoom (a
    counter-scale) and the clause's number chip turns flow. The root stacks as a flex column there, since a grid item's
    sticky box would hold only inside its own row.
  - the list is an **accordion** (head: tab chip and term, 48 px; the value stays in view; the note and the link, 44 px,
    open on tap). A clause opened by tap takes the light and the strip (the look's own pan, PhoneKit's maths) while its
    row stays in view below the strip; then the reading line leads again.
  - A clause with neither note nor link is a plain row. Without script the drawing stands above the page and every
    clause shows open. The phone heads' `h3` wrappers are hidden with their buttons on desktop (no empty headings).
- **Motion** (`motion.js`): page settles, clauses print, the package builds (AQiso), then each leader draws from its tab
  and its tag strikes on (Subframe "Asset crop workflow", process-choreography, MIT). The leaders' layer stays hidden
  until its draw starts; on the phone strip the tags fade only (their transform is the counter-scale).
- **Tokens**: `surface`, `surface-sunken`, `surface-raised`, `navy`, `line`, `line-strong`, `ink`, `ink-muted`, `flow`, `shadow-overlay`,
  spacing steps; 14 px floor for reading text on phones.
- Use it for a short list of terms or clauses that each bear on part of the equipment. For a plain terms table use
  TermsSheet; for standards keyed to parts use SkidTags.
