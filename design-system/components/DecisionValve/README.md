DecisionValve draws a router table as a multiport valve, a navy object on the paper: supplies on the left, the valve with one numbered position per route in the middle, the routes as cards on the right; choosing a supply turns the lever to that position and lights the line in and the line out, while every card stays readable.

- On the site: a `table` block with `as: "router"` and `"look": "decision-valve"` (renderer `assets/src/blocks/look-decision-valve.js`), on sys-pretreatment "Chlorine or chloramine: the removal step". No concept image of its own: adapted from home.4 (situations as branches off one junction), drawn as the page's own idea, the router as a decision valve (the multiport head a media filter carries).
- Markup: `<div class="aq-decision-valve">` (grid: supplies, valve, cards; route rows of equal height) → `p.__colh` column heads (`cols[0]`, `cols[1]`), `div.__valve` (`svg.__lines` stretched over the rows: `__in` and `__out` per route; `svg.__dial`: body, position plate with `__pos` marks and `__posn` numbers, bosses, ticks, `g.__lever` turned by `--a`), then per route `button.__src` (`aria-pressed`, `aria-controls` its card; `--r` its grid row) and `article.__card` (`__cardno` "Position 01", aria-hidden; `h3.__step`; `dl.__dl` the remaining columns under their own labels).
- Fields: as Router: `cols`, `rows` (cells strings or `{t, link, intent}`). No new fields. The first route is chosen on load; a click on a supply or a card chooses it (the renderer's delegated listener); links inside cards stay links.
- Tokens (pass 9b: light ground, after concept `research/pass9b/concepts/sys-pretreatment.3.png`, a light decision sheet): the page's paper ground, the valve itself a `navy` object with a `limestone` lever; lines `line-strong`; the chosen supply filled `navy` with `on-navy` text, its lines `flow`, the chosen card outlined `flow` with a flow edge. Supply buttons are at least 64 px tall with a 2 px `focus` ring. The heading is display scale (Geist Light 56 px).
- Phones: each supply directly over its card on a short pipe; the stretched lines and column heads drop. Pass 12
  (PhoneKit sticky figure: `data-pk-sticky data-pk-h="120"`, the valve `data-pk-fig`, supplies and cards
  `data-pk-row`): the valve rides as a 120 px strip under the header, the 104 px dial with its lever and the position
  in words (`__now`: "Position 03 / 04"; the plate's own numerals would render under 12 px, so they hide). The pair on
  the reading line turns the lever to its position and lights its card (`pk:change` -> `pick`); a tap on a supply still
  chooses it. Sys-pretreatment at 375 px: 1,693 -> 1,647 px, and the dial now stays with the pair being read.
- Use it for two to six exclusive situations that each lead to one answer with two or three properties. For many situations, or ones that lead to another page, use Router or StairRouter.
- Pass 12 C: on phones (no line draw) the sources start at 0 and the cards at 0.5 s, so nothing stays blank under the lit bar; the desktop timeline (cards at 1.6 s) is unchanged.

## Motion

Motion: on scroll-in the supplies slide in, their lines run to the valve, the dial turns into place, the lever swings from rest to position 01, the lines out run and the cards slide in (under 3 s). On each choice the lever turns (CSS, 500 ms) and the lit lines run again from supply to card. Nothing under reduced motion (the lever still turns, by CSS).

Lines: the renderer writes fallback paths in a 200 x 400 box; on the page a small layout pass (`window.AQdecisionValve.layout`, rerun on resize and called by motion.js before DrawSVG) redraws them in the valve column's real pixels, each supply line into the inlet boss and each route line out of its own outlet boss to its card. Route 01 is lit at render.
