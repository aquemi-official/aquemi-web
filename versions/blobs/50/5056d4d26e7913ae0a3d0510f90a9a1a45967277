# Retired pages

Pages for products Aquemi does not offer at this time. They are kept here unchanged so they can come back, and the build does not read this folder.

| Page | Retired | Why |
| --- | --- | --- |
| `04-sys-wfi-distillation.json` | 2026-10-30 | WFI and multi-effect stills not offered |
| `05-sys-wfi-membrane.json` | 2026-10-30 | WFI not offered |
| `06-sys-pure-steam.json` | 2026-10-30 | Pure steam not offered |
| `19-ind-biotech.json` | 2026-10-30 | Page is built on WFI and pure steam for biologics |

The current offering is a modular polypropylene (PP) package with PVC pretreatment: pretreatment, RO, DI/EDI and distribution. Stainless steel piped systems are not offered.

## Part 11 content (retired 2026-11-04)

The first systems use polypropylene piping with simplified controls, which may not meet 21 CFR Part 11. So the site no longer claims or maps to 21 CFR Part 11, EU GMP Annex 11 or GUI-0050, and promises no audit trails, electronic records or electronic signatures. `part-11/` holds each affected page file exactly as it was before that change (commit 503a507). The pages themselves stay live, without that content. The biggest cuts:

- `09-sys-monitoring.json`: the "Data integrity, clause by clause" section (look `clause-crosswalk`, `#data-integrity`) and the FAQ "Which Part 11 clauses need our procedures?".
- `16-svc-upgrades.json`: "Data integrity gaps in older controls" (`#data-integrity-gaps`) is now "Gaps in older controls" (`#controls-gaps`), with risks in place of Part 11 and Annex 11 clauses.
- Rows, tags and FAQ lines on the other pages, the standards entries on `22-compliance.json`, and the signature placeholders on `23-cmp-documentation.json`.

The section library (`sections.html`) keeps the earlier versions of every changed section as retired specimens. To bring the content back, compare a file in `part-11/` with its live copy in `content/pages/` and restore the parts you want. Do this once the controls can support Part 11.

To bring a page back: move it to `content/pages/`, add its id back to the footer in `assets/src/parts/Footer.js` and to the related links of the pages that pointed to it, list it in `design-system/page-inventory.md`, then run `python tools/design_system.py build`. Its drawing and icon entries in `assets/src/` were left in place.
