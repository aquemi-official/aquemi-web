PlanSheets compares service plans like calibration sheets laid side by side on a navy band: each plan a limestone sheet with a ruled scale strip, a huge light sheet number, the plan name, who it suits set large, its terms as ruled fields and its own button.

Look `plan-sheets` (`assets/src/blocks/look-plan-sheets.js`) on a `table` block with `as: "plans"`. Used on svc-service, "Service plans: response, scope, price". Concept adapted: 47-concept-plan-tiers (plan columns compared row by row), recast as paper sheets on navy (atlas: navy + limestone, light display numerals).

- Markup: `section.aq-band--navy.aq-plan-sheets-sec` > `div.aq-plan-sheets[data-show]` > `__switch` (phone tabs, `button.__tab[aria-pressed][data-tier]`) + `table.__table`: `thead tr.__heads` (`td.__corner`, `th.__c.__head` with `svg.__scale`, `__no`, `__of`, `__mark`, `__name`), `tbody` (`tr.__suits` with `th.__label` and `td.__c` > `__k` + `__fit`; `tr.__row` with `th.__label` (`.aq-index`, `__lt`) and `td.__c` > `__k` + `__v`), `tbody.__foot tr.__acts` (the buttons). Plan cells carry `data-theme="light"` and `t<N>`; `is-base` marks the "No plan" column, `is-rec` a recommended one.
- Fields: as PlanTiers. `cols` [label, plan ...] (a head may be `{t, intent}` for a per-plan intent), `rows`; the row whose label starts "Suits" is the headline row; `recommend` (only when the page says so); `fold`, `fold_noun` (feature rows). The button is the page's primary CTA, link and intent.
- Tokens: navy band with the ink tokens remapped to on-navy inside; sheets `limestone` / `on-limestone`; sheet number Geist 300 at 72 px; placeholders on the navy read as dashed chips.
- Phones: sheet tabs pick one plan; the picked sheet runs full width, each field's label in mono above its value.
- Don't use it for more than five plans, or for comparisons that are not plans (use CompareTable).

Motion: the sheets are dealt onto the navy one after another (each column rises as one sheet, its fields printing top to bottom), the scale strips run out, the sheet numbers decode and the row labels follow down the left. Once, about 2 s. Hover a row and it lights across every sheet (CSS).
