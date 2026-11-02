BinderTabs files ordered stages as tab dividers in the open qualification binder, each signed off before the next (look `binder-tabs`, steps block).

Concept: the C&Q page's own idea (the qualification binder) with 48-concept-roles' strip of stage tabs; tactile object direction.

## Markup
`<section class="aq-section aq-binder-tabs-sec">` > `.aq-binder-tabs` > `__cover` (`__holder` with the section head, `__spine`) and `__stack` (`__rings` with three `i`, `ol.__list` > `li.__div` with `__holes`, `__n`, `__body` (`h3.__t`, `p.__d`), `__sign` (svg), `__tab`).

## Fields
`h`, `intro`, `items` [{`t`, `d`, `link`, `label`}]. `label`: the tab's short text ("IQ", "FAT · SAT"); without one the tab shows the number.

## Rules
- Cover `navy` with the heading in a ruled label holder; dividers `surface-raised` on a `surface-sunken` stack, each stepping `space-1` further right (a filed fan); tabs `limestone` with mono labels, alternate tabs lighter.
- Sign-off lines carry a `flow` signature (aria-hidden). Hover or focus pulls a tab out and turns it navy.
- Phone: the cover is a band over the stack with the rings across the top; the tab sits above each divider's name.

## Motion
The cover unfolds from the spine, the rings close, then each divider drops onto the rings in turn, its tab sliding out, and its sign-off writes itself before the next is filed. Once, under 5 s; on phones each divider as it scrolls in.
