HmiTrend sets a table of alarm lines (line, how it is set, what the system does) as the operator panel's own screen: a dark instrument panel with a trend plot of one reading under the limit lines, flagged by the trend rule before it reaches any of them, and the alarm summary as the real table.

Look `hmi-trend` (`assets/src/blocks/look-hmi-trend.js`) on a `table` block. Used on sys-monitoring, "Alert, action and trend". Art direction: live control-room HMI screen (no concept image of its own).

- Markup: `<div class="aq-hmi-trend" data-theme="dark">` > `__screen` > `__bar` (aria-hidden: `__tabs` / `__tab.is-on`, `__banner` with the trend line's name and action, `__lamps`), `__plot` (aria-hidden: `svg.__svg` grid, `__zone`, `__lim--limit|action|alert`, `g.__rule` with `__win`, `__fit`, `__mark`; `svg.__run` with `__trace`, `__now`; HTML `__ll` labels, `__flag`, `__dot`, `__ax`), `table.__table` (one `tr.__row--<kind>` per line, `th` with the `__pri` glyph and the name).
- `data-theme="dark"` makes every token inside the dark theme's in both page themes, so status colours read at full strength. One shape per line, always with its name: limit diamond and action triangle (`fail`), alert square (`caution`), trend arrow (`flow`).
- Fields: `h`, `intro`, `cols` (three), `rows [[line, how, what]]` (cells may be `{t, link}`), `lines` (role per row: `limit | action | alert | trend`, default that order), `tabs` (screen tab names, the first shown; decoration taken from the page's own words).
- The plot carries no values or units: it shows the order of the lines and the drift being flagged, never a reading.
- `plot` (optional) lists the roles drawn on the plot. Leave out a level that is a laboratory result (a microbial action or alert level), so the plot never suggests it is read online; the table keeps every row.
- Phones (pass 12, S10): the screen chrome stays whole: every tab as one 44 px segmented strip (equal segments, the shown screen lit as on desktop; the tabs are the screen's chrome, aria-hidden, not panels), then the newest alarm with its text wrapped at 14 px and the lamp cluster on their own row; the plot shortens with labels above their lines; table rows stack with their column names.

Motion: the screen opens from a centre line, tabs decode and lamps test; the grid and limit lines run out with their labels; the reading is written left to right like a live pen; as it passes the trend window it shades, at the rule's mark the flag strikes, the banner flashes twice and the trend row is flagged (it stays flagged); the live dot lands and pulses. Once, under 5 s. Hover a row to isolate its line on the plot.

Pass 12 (under 400 px): tabs take 4 px padding and 0.02em tracking so "Sanitization" fits its third of the strip.

Pass 12 C: at 860 px and below the field labels (`__k`, "How it is set", "What the system does") show on the first card only; on cards 2-4 they are visually hidden and stay in the markup.

Pass 12 C verify (F7): at 860 px and below the table head is visually hidden but stays in the accessibility tree, so a screen reader on a phone still gets each cell with its column name; `__k` stays `aria-hidden`.
