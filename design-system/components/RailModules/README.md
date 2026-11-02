RailModules shows an options block as a macro close-up of a control panel backplate: one DIN rail across the plate and off both page edges, every option a module clipped onto it (terminal screws, status lamp, number, engraved icon, name), its line hanging on a leader under the plate.

Look `rail-modules` (`assets/src/blocks/look-rail-modules.js`) on an `options` block. Used on sys-monitoring, "Options". Art direction: macro detail with overlaid callouts (the section's planned direction, no concept image of its own); tactile like sys-pw.4 without its tags.

- Markup: `<div class="aq-rail-modules">` > `__plate` (`__rail` aria-hidden, `p.__base` nameplate, `ol.__list[style=--rm-n]` > `li.__m` > `a|div.__body` (`__term` screw rows, `__face` with `__top` (`__led`, `__n`), Spot `__ic`, `h3.__t` with a `__go` arrow on a link) + `p.__d` callout).
- Fields: `items [{t, d, spot|icon, link}]`, `base` (the nameplate), `fold` (phones only), `fold_noun`. A module with `link` is the link (focus ring, arrow).
- Tokens: plate `surface-sunken` with a `line-strong` hole pattern, rail and bodies `surface-raised` with `line-strong`, lamp `flow` when lit, callouts `ink-muted` on `line-strong` leaders.
- Phones: the rail stands vertical at the left and the modules stack along it as wide cards (screws in a column, the line inside).

Motion: the rail slides along the plate and the nameplate decodes; modules drop onto the rail one after another and seat, screws turn home, each lamp tests, and each leader runs down to its callout. Once, under 5 s. Hover lifts a module off the rail and lights its lamp.
