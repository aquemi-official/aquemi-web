DocList shows the documents delivered with a system as a quiet hairline list: each row gives the short code a validation team files the document under, its name and one line of detail, with the deciding documents first and their code in `flow`.

## Markup

```html
<ol class="aq-docs">
  <li class="is-key">
    <span class="aq-index" aria-hidden="true">01</span>
    <span class="aq-docs__code" aria-hidden="true">CM</span>
    <span class="aq-docs__name">User requirement specification (URS) compliance matrix</span>
    <span class="aq-docs__d">Each requirement, how we meet it and where it is verified</span>
    <span class="aq-icon aq-docs__icon" aria-hidden="true" style="mask-image:url(assets/icons/stamp.svg)"></span>
  </li>
  …
</ol>
```

- An ordered list, one `<li>` per document, separated by `line` hairlines (the `.aq-rows` grammar). Index and code are `aria-hidden`: screen readers get the list numbering and the full name.
- `aq-docs__name` holds the document name as QA writes it, in sentence case. An item with `link` (a page id or `page#anchor`) makes the name a link; its `intent` (options the linked page's form ticks on arrival, as on a button) rides on that link: `{"t": "Joint records", "link": "cmp-documentation#samples", "intent": "Joint records extract"}` draws `<a href="#cmp-documentation#samples" data-wp="cmp-documentation#samples" data-intent="Joint records extract">Joint records</a>`, and `check` fails a label that ticks nothing there (DR-014), as for every intent. `aq-docs__d` is the optional detail.
- An item with `file` (a path under `assets/docs/`, a released PDF such as a product brochure) makes the name a link that opens the file in a new tab. Only for a file that exists in the repository; a document that is sent on request links a request form instead (as svc-documentation#samples).
- Icon (`aq-docs__icon`, optional, `ink-muted`, desktop only): from the name (`DOC_ICONS` in the renderer: borescope, weld, pid for drawings, gauge for calibration and pressure, wrench for maintenance and spares, calendar for plans, stamp for certificates and statements, magnifier for reviews and inspections, binder for indexes, registers, manuals and logs), only where the drawing says what the document is. An item's `icon` field wins; `"icon": "none"` removes it.
- Code: the derived code, or an item's `tag` when the data has a category. Plain lists (`aq-docs--plain`: items that are not documents with recognised codes) drop the code column.
- `is-key` marks a deciding document: its code turns `flow`. Nothing else changes; no fills, tints or badges.
- Every docs block renders this way, full width under the standard section head. The site renderer (`assets/src/blocks/docs.js`, block type `docs`) builds it from `{h, nav, items, fold, fold_noun, key, link, link_label, intent}`; items `{t, d, code, tag, icon, key, link, intent}`. `fold` works on phones only: on desktop every row shows and the "Show all" button is hidden; on phones the first `fold` rows show and the button sits under the list.

## Block link

One link under the list, so a module page keeps its three or four deciding documents and points to the full package instead of adding a row ("Full index →"):

```json
{"type": "docs", "nav": "Documents", "items": ["…"], "link": "cmp-documentation#samples", "link_label": "Full index"}
```

- `link`: a page id or `page#anchor` (opens that page at the block with that `anchor`). A link to a page that does not exist prints nothing; `check` warns on a missing page or anchor.
- `link_label` (optional): its words, five or fewer (`check` counts them with the buttons). Without it a `page#anchor` link reads the target block's heading and a page link the page's name.
- `intent` (optional): options the linked page's form ticks on arrival, as on a button (`check` fails on labels that tick nothing, DR-014).
- Markup: `<p class="aq-docs__more">` holding the Button link variant (`aq-btn aq-btn--link`, `flow`, with its arrow), `space-4` under the list's last hairline (the list and the link share an `aq-stack`). It shows at every width, under the "Show all" button on phones.

## Key documents

- Item `"key": true` marks the documents that decide the review. Without any marked item, the first `key` items of the block are key: default 2 in a coded list of five or more, `"key": 0` for none. Order the list so the deciding documents come first (the same rule as fold).

## Layout

- **Desktop:** one row per document: index (`aq-index`) | code (Geist Mono 500 13/24, `ink-muted`; `flow` on key rows) in a 96 px column | name (Geist 500 17/24 `ink`) | detail (Geist 15/24 `ink-muted`, within `text-max`) | 32 px icon.
- **Phone** (container 860 px and below): index and code on one line, the name (16/24) under the code, the detail (14/22) under the name. Code 12 px; no icon.

## Codes

The renderer derives each code from the document name with a lookup of common validation documents (FS, URS, CM, DQ, RA, P&ID, GA, ISO, MAT, WLD, JNT, WPS & PQR, SRF, PAS, CAL, FAT & SAT, IQ & OQ, PQ, O&M, SOP, SPR, TM, DEV, CC …). A name the lookup misses uses the acronym it gives in brackets, else the initials of its first three words. If fewer than half the items match the lookup, the list renders plain, numbers only. The lookup also covers loop and fabrication records: HMB (heat and mass balance), SB (steam balance), FIP (fabrication and inspection plan), DLR (dead leg register), SLP (slope survey or verification), SLP & DLR, RIB (riboflavin spray coverage), PAS (passivation), SMP (sampling plan), SVR (software version record), ASB (as-built drawings), CIA (change impact assessment), LFL, ASR, CSV, JNT (joint maps and joint logs of PP joints, "Joint map and joining log"; a name that opens with material certificates keeps MAT) and the CDMO audit pack (SD, CM, TRD, EXC, CL, DI). A compliance matrix is CM, also against a URS ("URS compliance matrix"): that entry comes before URS, so the matrix gets its own code.

- **New document types:** add them to `DOC_CODES` in `assets/src/blocks/docs.js`. Never reword a document's name to hit a known code; name it as the validation team does.
- **Explicit code:** an item may set `code` (`{"t": "Added by system", "code": "+"}`) when no lookup entry fits or the derived code would mislead. An explicit code counts as a recognised one. A code with no letter or digit (`"+"`) leaves the code cell empty so it never reads as a missing label. Use it sparingly; a lookup entry serves every page.

## Token rules

- Hairlines `line` only: no frame, plate, card, tab or shadow. Surface is the section's own.
- Text `ink` and `ink-muted`; `flow` only on key codes and link hover. Spacing `space-*` only.

## Motion

`motion.js`: the binder is filled. The plate unrolls, the folders slide down into it one by one in index order (a slight tilt that settles, ease `aq-settle`), each tab rises out of its folder's top edge just after it lands, and the title block is stamped last. One timeline on desktop (about 1.8 s for 12 folders); on phones the folders in view land first and the rest as they scroll in, and the folders "Show all" reveals slide in the same way. A folder whose name is a link lifts one step on hover. Nothing runs under reduced motion.

## When not to use it

- Not for test results or specifications with values: use SpecTable.
- Not for steps in sequence: use ProcessSteps; the numbers here are an index, not an order of work.
- Not for fewer than four items; write them in a sentence instead. Above twelve, split the package into groups with their own headings.
