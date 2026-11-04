LevellingSheet lays quotes side by side on the same ruled lines, so a buyer sees which lines each quote leaves blank before comparing prices (look `levelling-sheet`, an evidence table).

Pass 12 build D, concept `inspiration/gemini/250-p12-buying-compare.png` (audit row 31, buying#compare). The concept's
row labels and figures are not used: the rows are the block's.

- **Markup** (renderer `assets/src/blocks/look-levelling-sheet.js`): `section.aq-section--alt.aq-levelling-sheet-sec >
  .aq-in > .aq-levelling-sheet` (a grid: lines | Quote A | Quote B | ours), holding three `__paper` sheets behind their
  columns, the heads `__h`, `ol.__rows` (a subgrid) and the navy `__edge` (straightedge).
  Each `li.__row`: `__line` (index and `h3.__t`), `__ask`, two quote cells `__c.is-a` / `.is-b` (`.is-said`: two grey
  strokes; `.is-gap`: a hatched blank) and `__c.is-ours` (a flow tick and the link `__go` to where we state it).
- **Fields**: `h`, `intro`, `cols` [line, ask, where ours states it], `rows` [line, ask, {`t`, `link`, `intent`}]. The
  first two column names head the lines; the third heads our sheet and is read before each answer by screen readers.
  `quotes` (look-only, optional): the two other sheets' labels, default `["Quote A", "Quote B"]`; a French page sets its
  own (add `quotes` to NOT_COPY before a page uses it).
- **Quote A and Quote B are drawing furniture** (aria-hidden): which of their lines are gaps is a fixed spread pattern
  (`lsGap` in the renderer), never a claim about any supplier.
- **Interaction**: the straightedge lies across the first line and glides to the line pointed at or focused
  (Subframe "Chart crosshair", chart-crosshair, MIT; CSS transform 220 ms, instant for keyboard and reduced motion); the
  line's index turns flow. On desktop the whole "ours" cell is the link's target (103 px tall on buying).
- **Tablets** keep the three sheets down to a 700 px container (the 1080 grid: A and B cells about 80 to 90 px, long
  answers wrap to two lines).
- **Phones** (700 and under): one checklist: number and line, A and B as small boxes at the right (a tick or a hatch),
  the ask (14 px), and our answer with its tick; the whole row is the link. No sheets, heads or straightedge. About
  1,080 px for eight lines.
- **Motion** (`motion.js`): sheets settle, lines print, strokes run out and gaps hatch in, our tick stamps down on each
  line (Subframe "Activity stamp", activity-stamp, MIT) and our answer prints after it, the straightedge is laid across
  the first line.
- **Tokens**: `surface-sunken` (the alt ground), `surface-raised`, `navy`, `on-navy`, `on-navy-muted`, `line-strong`, `ink`
  (the column-head rules, so they hold in dark),
  `ink-muted`, `flow`, `focus`, `shadow-overlay`, spacing steps.
- Use it for a short list of lines (6-10) every offer must be checked on. For readers and what they read use
  ReaderSplit; for a two-column comparison use VersusSpread.
