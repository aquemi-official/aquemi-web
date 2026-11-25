Specification sheets present water quality limits as a two-column matrix with the one critical limit pulled out as a full-width band, the most persuasive content Aquemi has.

## Spec sheet (default)

On desktop the rows flow into two columns on `surface-raised`, separated by `line` hairlines. Each cell stacks the parameter (Geist 500 16/24, so the row titles read apart from the mono values), the limit in `data` (Geist Mono 14/24, tabular figures) with its unit, and the method or reference beneath (Geist 14/24 `ink-muted`). Highlighted rows at the top span both columns; the first one is the sheet's one `flow-tint` band, its parameter at `h3` (Geist 500 20/28) and its value one step larger (Mono 20/28). On phones (container 860 px or less) it becomes compact rows on hairlines: the parameter, the value, then the basis in small muted type; the highlighted row keeps its tint. No sideways scroll is needed.

```html
<table class="aq-spec" role="table">
  <caption>WFI by distillation · USP and Ph. Eur.</caption>
  <thead role="rowgroup"><tr role="row">
    <th scope="col" role="columnheader">Parameter</th><th scope="col" role="columnheader">Specification</th><th scope="col" role="columnheader">Method or reference</th>
  </tr></thead>
  <tbody role="rowgroup">
    <tr role="row" class="is-highlight is-lead"><th scope="row" role="rowheader">Bacterial endotoxins</th><td role="cell" class="aq-spec__value">&lt; 0.25 EU/mL</td><td role="cell" class="aq-spec__method">USP &lt;85&gt;</td></tr>
    <tr role="row"><th scope="row" role="rowheader">Conductivity</th><td role="cell" class="aq-spec__value">≤ 1.3 µS/cm @ 25 °C</td><td role="cell" class="aq-spec__method">USP &lt;645&gt; stage 1</td></tr>
  </tbody>
</table>
```

- It stays a real `<table>`: `<caption>` naming the system and standard, a `<thead>` (shown as one label strip), one `<tr>` per parameter with `<th scope="row">`. The CSS changes the table's `display`, so always add the ARIA roles shown above; they keep row and column semantics for screen readers in every browser.
- Cells: parameter (`th`), value (`aq-spec__value`), method or reference (`aq-spec__method`; may be empty). An optional `aq-spec__status` cell holding an `aq-status` sits top right of the cell, or under the reference in the band.
- Write limits exactly as the pharmacopoeia states them, comparison sign and unit included: `≤ 1.3 µS/cm @ 25 °C`, `≤ 500 ppb`, `< 0.25 EU/mL`. Never round or reword them for the layout.
- **Highlight.** Mark the critical row with `is-highlight` (block field `hl`). Rows always keep their source order; nothing is moved. Highlighted rows at the top of the list also carry `is-lead` and span both columns. Only the first highlighted row is tinted `flow-tint` (the brand allows one highlighted row); any later highlight is marked with a 2 px `flow` line on its left instead. Put the limit a QA reader checks first at the top and highlight it: endotoxins for WFI, conductivity for PW, non-condensable gases for pure steam. Highlight one row; two at most.
- **Row link.** A row may point to the page that explains it (row field `link`, a page id or `page#anchor`): a quiet `aq-spec__link` after the basis, its words and an arrow in `flow` (`<a class="aq-spec__link" href="#svc-fat-sat" data-wp="svc-fat-sat">FAT and SAT</a>`). Use it instead of writing "See the … page" into the basis.
  - Words: the row's `link_label` when it has one, five or fewer (`{"p": "Budget range", "v": "[budget range, CAD] at [reference capacity, L/h]", "m": "Single-pass RO and EDI, city feed", "link": "systems#budget", "link_label": "Budget ranges"}` reads "Budget ranges →"); else, for a `page#anchor` link, the heading of the block it opens at; else the page's nav label (`wlabel` in `core.js`, the rule FAQ links and form notes use). So a row that links an anchored block names that block, not the whole page.
- **Note link.** The block's `note` (one small line, `aq-small`, under the sheet; the same under dials, rule bars and callouts) can end in a text link: block fields `note_link` (a page id or `page#anchor`) and `note_link_label` (its words, five or fewer; default as a row link: the linked block's heading, else the page's nav label). Same grammar, inline in the note: the words in `flow` at Geist 500 and the note's size, an arrow after them (`aq-spec__note-link`), underlined on hover, a `focus` ring; on phones a 44 px hit area. `{"note": "Moves the price: capacity, … and temporary water.", "note_link": "svc-service#running-cost"}` ends "… and temporary water. What it costs to run →" (systems' budget note, pointing at the running cost). A link to a missing page prints the note alone; a link without a note prints alone. `check` warns on a missing page or anchor and on a label over five words.

## Token rules

- Surfaces: label strip `surface-sunken`, matrix body `surface-raised`, rules `line`. No boxes, no shadows. Band `flow-tint`; text on it stays `ink` and `ink-muted`.
- Type: header labels Geist 500 14/20 `ink-muted` in sentence case; parameter Geist 500 16/24; values in `data` (Geist Mono 14/24, tabular figures) at every width; band parameter `h3`, band value Mono 20/28 on desktop. Placeholders in values keep the Placeholder style at the row's text size. Method Geist 14/24 `ink-muted` (13/20 on phones). Nothing is uppercase except the visually hidden caption, which is an `eyebrow`.
- Spacing only from `--space-*`: cells `space-4` vertical, matrix columns `space-12` apart, band padding `space-6` (`space-4` on phones).
- Status words use `aq-status aq-status--pass`, `--caution` or `--fail`, and always include the word.

## When not to use it

- Not for a single headline figure in running copy: use a readout or stat component.
- Not for test results with several values per parameter (limit, result, status): use CompareTable (`aq-compare-table`), and never show a result without its method.
- Not for options compared against criteria: use CompareTable.
- The consumer provides the data; never fill a `[placeholder]` with a guessed value.
- Phones: three lines per row, parameter, value, then the basis (13 px, own line) and any row link (44 px hit area); the column-label strip is visually hidden (it stays for screen readers).

## Caption and section head

- The `<caption>` is visually hidden. On the site, block `spec`'s `caption` is shown once, as the eyebrow of the standard section head above `h` (`assets/src/blocks/spec.js`). Never print a second mono caption above the table.
- Ten rows or fewer per table (content budget). Split a longer sheet by topic.

## Readout lead row

A lead row (`is-highlight is-lead`, the first `hl` rows) whose value holds a number becomes a readout: the renderer adds `is-readout` to the row and a first cell `<td class="aq-spec__read" aria-hidden="true"><span class="aq-spec__read-n">< 0.25</span><span class="aq-spec__read-u">EU/mL</span></td>` (the limit parsed as LimitGauges does: the first comparator and number, or a leading number). The row stays in the `flow-tint` band: the limit in `readout` (Geist Mono 300 40/44, -0.02em; 32/36 on phones) with its unit beside it in Mono 14/20 `ink-muted`, and to the right the parameter at `h3`, the full value in `data` and the basis. The big figure is the page's one headline measurement; the value cell keeps the exact text for screen readers. Lead rows without a number are the same band without the figure.

## Motion

`motion.js` (spec sheets only; `aq-spec--compare` is CompareTable's): the column-label strip rules across, then rows are ruled in reading order (each wipes left to right), the parameter lands first, its value fills in after it, the basis last. A readout lead row unrolls its navy panel top down while the big limit counts up and the unit rises. Folded rows are left alone.
