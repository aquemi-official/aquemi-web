ToleranceScales reads instrument calibration as acceptance bands: each instrument a row with its name and basis, and one readout per check with the acceptance set large and a ruler showing the nominal line and the band between the limits.

Look `tolerance-scales` (`assets/src/blocks/look-tolerance-scales.js`) on a `spec` block. Used on svc-service, "Instrument calibration". Concept adapted: sys-pw.2 and the atlas's "Swiss readout grid" (huge light numerals, tick scale, limit line).

- Markup: `ol.aq-tolerance-scales` > `li.__row` (`is-hl`, `is-many`) > `__id` (`__n`, `h3.__p`, `p.__m` with `__mk`) + `__reads` (`p.__v`, the full value visually hidden for screen readers; `__grid[aria-hidden]` > `__read--pm|range|span|ref` with `__k`, `__f` or `__t`, `svg.__ruler` (`__band`, `__ticks`, `__nom`, `__lim`, `__ref`)). `p.__note` with `__seal` after.
- Fields: `h`, `cols`, `rows [{p, v, m, hl}]`, `fold`, `fold_noun`, `note`. A value splits at ";" into checks; a figure is read from "± n unit" or "a % to b %"; a check without one draws a full-range band (or a reference line if it names a reference). Nothing is added.
- Tokens: band `flow-tint` with `flow` limit lines, nominal dashed `ink`, ticks `line-strong`; figures Geist 300 (44 px, 36 px with three checks); the hl row on `surface-raised` with a 2 px `flow` top rule.
- Phones: the name over its readouts, each ruler full width.

Motion: each row calibrates as it scrolls in: the name rises, ticks run out, the nominal drops, the band opens outwards from the nominal to its limits and the limit lines strike; the figure rises out of a mask. Once per row, about 1.4 s.
