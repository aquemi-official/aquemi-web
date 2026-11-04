RelatedLinks closes a page with the pages to read next as tiles hung off one pipe: each tile shows its index and section, a picture of the target page and its title with a `flow` arrow.

## Markup

```html
<ol class="aq-related-links" style="--n:4">
  <li><a class="aq-related-links__card" href="#sys-storage" data-wp="sys-storage">
    <span class="aq-related-links__n" aria-hidden="true">02</span>
    <span class="aq-related-links__group"><span aria-hidden="true">02 / </span>Systems</span>
    <span class="aq-related-links__vis is-art" aria-hidden="true"><span class="aq-illustration aq-related-links__art" style="mask-image:url(assets/illustrations/sys-storage.webp)"></span></span>
    <span class="aq-related-links__title">Storage and distribution loops<span class="aq-related-links__arrow" aria-hidden="true">→</span></span>
  </a></li>
</ol>
```

- Block `related` (`assets/src/blocks/related.js`): `items` are page ids. Title: the page's `nav_label`; label: its `section`.
- Picture (`aq-related-links__vis`, `aria-hidden`), pass 12 (S2): **one drawing per destination, in one isometric hand.** The target page's equipment drawing from `ART` (Hero.js) when it has one (`is-art`, Illustration in `ink-muted`); else its own small IsoKit scene from `REL_ISO` in `related.js` (`is-iso`: an `svg.aq-iso` in `ink-muted` 1.15 px line, paper in `surface-raised`, `data-iso-motion="off"`), composed from kit parts only and holding no labels or figures: systems an RO rack on its skid, services a drafting board, urs-guide a clipboard of ticked clauses, first-system a room wall with the package on a dashed footprint, project-plan a ruled schedule with staggered bars, cmp-documentation binders, cmp-quality a ruled record with a stamp, compliance a matrix sheet with a tick column, projects (Applications) a typical configuration on a skid, industries two points of use, about the building, buying the truck, contact pages a building and truck / a panel / a request on a clipboard, and the new industry pages a point of use, tank and pump or tank until their hero drawings land in ART (ART always wins). Only a page with neither falls back to its page icon as a Spot; a page with no picture at all (`is-bare`) keeps its title at the bottom of the tile, never at the top of an empty card.
- Two links to the same page (`page#anchor`, `page#other`) are told apart by the linked block's heading (`wlabel`); otherwise the title is the page's `nav_label` (projects reads "Applications", R5).
- The whole tile is the link; one per page, two to four per row.

## Layout (pass 9)

- **Desktop:** one row for two to five tiles (five across, the title at 20/26: no 3 + 2 grid with an empty slot), six as two rows of three, seven or more four to a row; `space-6` apart. Between 861 and 1100 px five go 3 + 2 on a six-column grid, the last two wider. The picture window is a fixed 152 px (`space-32` + `space-6`), so a tile is about 300 px tall at any column width (pass 12: a row of five is about 575 px, six about 830 px, from 1,090). Above them one pipe runs the full width: twin 1 px `line-strong` walls `space-2` apart with a 1.5 px `flow` water line in the bore. Each tile hangs from it by a 1 px `line-strong` drop `space-8` in from its left edge, leaving the pipe at a 9 px node (`surface` fill, `line-strong` ring).
- Tile: `surface-raised`, 1 px `line`, `space-4` / `space-6` padding. Top row: the index (Geist Mono 13 `ink-subtle`) and the section label right (eyebrow, `ink-muted`); then the picture in its window; then the title, set at the bottom of the tile, Geist 400 24/30 `ink`, with a `flow` arrow (a real `aria-hidden` span). The `01 / ` prefix shows on phones only.
- Hover and focus: the tile's border, drop, node, picture and title turn `flow`, the picture lifts `space-1`, the arrow slides `space-2`; a press sets the title down 1 px. Focus is the 2 px `focus` ring.
- **Phones:** one column of rows `space-3` apart off a rail down the left (the same pipe turned upright), each row joined to it by a stub and node at its middle: label and title (19/26) at the left, the picture in a `space-16` square at the right (an IsoKit scene fits it with a `space-1` margin). Every row is a full-width link well over 44 px tall.
- `--aq-pipe`, `--aq-water` (on the list) and `--aq-drop`, `--aq-node` (on each li), 0 to 1, let motion lay the pipe; all default to 1, so the page is complete without JS.

## Writing

- Two to four links, in the order a reader would most likely go next. No descriptions: the title, section and picture say enough.

## When not to use it

- Not for a list of every page in a section: use LinkGrid. Not for a physical sequence of systems: use WaterPath.

## Motion

`motion.js`: on scroll-in the pipe is laid along the top of the row (down the rail on phones); as it passes each tile the node seats, the drop runs down and the tile rises off it, its picture printing up from the bottom and the index, label and title following; then the water runs the pipe once end to end. Under 3 s, once; nothing under reduced motion.

The IsoKit scenes ride the same picture reveal and hover (lines turn `flow`, the drawing lifts); IsoKit's own draw-on is switched off for them. Pass 9b (Subframe Motion `spotlight-card`): on a fine pointer a soft flow light, and the stretch of border nearest it, follow the pointer inside the tile; keyboard focus lights it from the centre. Off under reduced motion and on touch.
