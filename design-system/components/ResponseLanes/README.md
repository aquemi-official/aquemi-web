ResponseLanes draws a table of response times by request as lanes on one clock: each request runs from where you call or send through its first response into what follows, every clause a stop with its time beneath, and the severities set as a calm scale of huge light numerals.

Look `response-lanes` (`assets/src/blocks/look-response-lanes.js`), pass 9; adapted from the pool's timeline and numeral ideas (services.1 hold-point line, sys-pw.0 and sys-pw.2 oversized numerals).

- Data: a `table` block with `"look": "response-lanes"` (an `as: "router"` field may stay; the look replaces it). `cols`: [your request, first response, what follows]; the two value labels head the lane zones. `rows`: [request, first response, what follows]; cells may be `{t, link, intent}`. Each value cell is split into stops at "; " outside brackets and parentheses. `intro` (the plan note) prints in the section head.
- Request (`__req`): a request written "Severity N: …" shows N as a Geist 300 numeral at 88/72 in a `line-strong` outline (severity 1 filled `flow`), a "Severity N" mono eyebrow and the rest in Geist 300 at 22/28 (first letter capitalised). The first request without a severity opens under a `line-strong` rule (`is-break`), its words aligned with the titles above.
- Lane (`__lane`): a start mark (square, `ink`), one line (`line-strong`; severity 1 in `flow`) through two zones (first response, what follows, split at a tick); each stop is a node (a 13 px ring in `flow`) with its clause beneath in 15/22. Stops are evenly spaced: the lane shows order, never a time scale.
- Phones: the request on top, the lane down the left with the zone labels (`__zk`, visually hidden on desktop) as eyebrows.
- Not for service plan comparisons (PlanChecker) or for timelines with real durations.

## Motion

Motion (`motion.js`): lane by lane, the numeral rises out of its slot, the start mark sets, the line draws out (`--aq-line`) and each node lands as the line reaches it, its clock rising beneath. Severity 1 draws fastest and each next severity a little slower, so urgency reads from the pace; one drop of water then runs severity 1's lane once and fades (desktop). One timeline under 4.5 s. Hover or focus on a row turns its lane to flow.
