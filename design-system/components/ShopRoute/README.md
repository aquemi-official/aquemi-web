ShopRoute shows a fabrication sequence as the route a spool takes through the shop, drawn as a floor plan on a limestone sheet: one bay per step (three across, the second row returning right to left as a U-shaped shop runs) with its plan furniture, one route line through every bay with a stop per step, a gate after a hold point, and a ringed stop and tag for each witness point.

- On the site: a `steps` block with `"look": "shop-route"` (renderer `assets/src/blocks/look-shop-route.js`), svc-fabrication "From pipe to turnover". No concept of its own (Gemini quota); adapted from `research/pass9/concepts/sys-pw.1.png` (a route with numbered stops), recast as an architectural plan.
- Markup: `section.aq-shop-route-sec` → `div.aq-shop-route` (`data-theme="light"`, `--cols`, `--rows`): `__route` (aria-hidden: `__seg--a`, `--b`, `--c` lanes, `__gate`, `__spool`), `ol.__bays` of `li.__bay` (`is-hold`, `is-wit`, `is-back` second row, `is-rc` right column; placed by inline `grid-row` and `grid-column`): `svg.__furn` (aria-hidden), `__n`, `h3.__t` (link via `stepTitle`), `p.__d`, `p.__tags` (`__wit`, `__stamp`), `__stop`; then `__door--in`, `__door--out`.
- Fields (a steps block): `h`, `intro`, `items` [{`t`, `d`, `hold`, `link`, `bay`}]. `bay` (optional): `plan`, `receive`, `qualify`, `join`, `test`, `clean` (default from the step's words). A step whose text contains "Witness point." shows it as the tag instead (the words move, unchanged). DOM order stays the step order.
- Tokens: `limestone` sheet, walls `on-limestone` mixes, route `flow`, hold gate and stamp `on-limestone`, spool `navy`.
- Phones: bays stacked in order, the route down the left edge through every stop.
- Use it for four to eight steps that happen in one place. Abstract sequences: ProcessSteps or FidelityLadder.

## Motion

Motion: one timeline. The bays print up and their furniture draws in; a spool enters by the top-left door and travels the route along the top lane, down the aisle and back along the bottom lane while the lane draws on behind it; each bay lights as the spool reaches its stop (stop lands, number decodes, stamp strikes, witness tag slides in); the spool leaves by the bottom door. Under 4.5 s. Phones: each stop lands in turn. Nothing under reduced motion.
