InstrumentLimits reads a spec block's levels off two instruments: the action level as an analog dial with its red-line, the alert level as a chart recorder whose alert line is drawn from the data (look `instrument-limits`, spec block `as: "gauges"`).

Concept: HMI and instrument direction (the LimitGauges dial taken to a full instrument panel), after the brief's "limits read like instruments".

## Markup
`<section class="aq-section aq-instrument-limits-sec" data-theme="dark">` > section head, `ol.aq-instrument-limits` > `li.__plate.is-dial|is-rec` (`__screws`, `h3.__p`, `__face` with `svg.__dial` or `svg.__rec` and `__rl`, `p.__v`, `p.__lv.is-action|is-alert`, `ul.__basis`, the row's link), then the note.

## Fields
As a spec block (`as: "gauges"`): `rows` [{`p`, `v`, `m`, `level`, `hl`, `link`, `link_label`}], `note`. A row whose value starts with a figure (optionally ≤, <, >) is a dial scaled to 1.5 x that figure; a row in words is the recorder.

## Rules
- Dark section; faceplates `surface-raised` with an inner bezel and corner screws. Status colours appear only as data: `fail` for the action red-line, line and word; `caution` for the alert line and word.
- No figures beyond the row's own limit: the dial labels 0 and the limit; the recorder's sample points are decoration (aria-hidden) and carry no values.
- Phone: faceplates stacked.

## Motion
The faceplates rise; the dial's scale draws round, ticks follow, the needle sweeps from zero to the limit while the readout counts, and the red-line strikes as it arrives; on the recorder the action line runs, the samples land left to right, and the alert line is drawn outwards from the end of the runs. Once, under 5 s.
