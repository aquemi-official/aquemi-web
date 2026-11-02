PlanChecker compares service plans as a checker of square tiles on limestone: one column per plan alternating navy and limestone, a head tile with a huge light slash numeral, the plan name and who it suits, a terms tile whose rows line up across the plans, and each plan's own button.

Look `plan-checker` (`assets/src/blocks/look-plan-checker.js`) on a `table` block with `as: "plans"`. Used on svc-service, "Service plans: response, scope, price". Concept: research/pass9b/concepts/svc-service.0.png (plan columns as alternating navy/limestone tiles, huge slash numerals, price and response tiles below).

- Markup: `section.aq-band--limestone.aq-plan-checker-sec[data-theme=light]` > `div.aq-plan-checker[data-show][style=--n,--rows]` > `__tabs` (phones: `button.__tab[data-tier][aria-pressed]` with `__tabno`, `__tabn`) + `ol.__plans > li.__plan.t<N>` (`is-base` for "No plan", `is-rec`) > `div.__head` (`p.__no` with `__num` and `__sl`, `__mark`, `h3.__name`, `p.__suits` with `__sk`), one `div.__term[data-r]` per term (`p.__v` value, `p.__k` label; `is-first`), `div.__act` (the button). Tiles carry `is-navy` or `is-lime`.
- Fields: as PlanTiers. `cols` [label, plan ...] (a head may be `{t, intent}`), `rows`; the row whose label starts "Suits" goes in the head tile; `recommend` (only when the page says so); `fold`, `fold_noun` (terms shown first). The button is the page's primary CTA, link and intent, labelled per plan; none on "No plan".
- Layout: the plans grid has one row per term; each plan spans them all with `grid-template-rows: subgrid`, so terms line up across plans. Pointing at a term lights it in every plan.
- Tokens: navy tiles remap `ink`, `ink-muted`, `line-strong` to on-navy values; limestone tiles a lighter limestone with `line-strong` hairline edges; numeral Geist 300 at up to 112 px; labels mono 12 px.
- Phones: the numerals become tabs (still alternating); the picked plan's tiles run full width; arrow keys move between tabs.
- Don't use it for more than five plans or for comparisons that are not plans (CompareTable).

Motion: the checker lays itself down in a diagonal wave, head tiles first: each tile rises out of its bottom edge (clip-path, 0.7 s power3.inOut, 120 ms a step), its words follow 8 px, and the numerals roll on the odometer (sliding-number, `m.count`). Once, under 2 s. Term hover across plans repeats (class toggle, CSS transition).
