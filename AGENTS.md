# Working in this repository (for people and AI agents)

This is the draft Aquemi website and the **Aquemi design system** it is built from. Aquemi designs and fabricates clean water systems for pharmaceutical manufacturing; readers are engineers, validation leads and QA managers.

- Site: https://aquemi-official.github.io/aquemi-web/
- Design system guide (generated from this repo): https://aquemi-official.github.io/aquemi-web/design-system.html
- Claude design system (for Claude chats, decks and designs): https://claude.ai/artifact/Qk92oQ4PLCDVzKjaixEmDc

## Branches

Three long-lived branches, one GitHub Pages site (`.github/workflows/pages.yml` publishes all three on every push to any of them, in a minute or two):

| Branch | Role | Published at |
| --- | --- | --- |
| `dev` | Day-to-day work. Commit and push here. | https://aquemi-official.github.io/aquemi-web/dev/ |
| `staging` | Review before release. Only `dev` merges in. | https://aquemi-official.github.io/aquemi-web/staging/ |
| `main` | Production, the public site. Only `staging` merges in. | https://aquemi-official.github.io/aquemi-web/ |

- Work on `dev` (or a short branch merged into `dev`). Never commit straight to `staging` or `main`.
- Promote a batch: merge `dev` into `staging`, review the staging copy, then merge `staging` into `main`. Fast-forward merges keep the three in step.
- The staging and dev copies leave out the page history (`versions.html`) and the image gallery (`inspiration.html`); those work on production only. Their draft bar names the copy.
- `python tools/versions.py` lists commits on `main`, so the page history shows released versions.

## The one rule

**`design-system/` is the source of truth for anything visual.** The site, the guide page and the Claude design system all read from it. Don't style the site anywhere else, and don't invent a look that isn't in it.

- Use the `aq-*` components. Before building UI, read `design-system/README.md` (brand book) and the `README.md` of each component you use.
- Colours, spacing, radii and type come from tokens (`var(--surface)`, `var(--space-6)`, `aq-h1` …). No literal colours or pixel values for spacing in component CSS.
- Write in the brand voice (brand book, "Content fundamentals"): name the standard, give the number with its unit, no hype words, sentence case.
- Facts only Aquemi can supply go in `[square brackets]` (the Placeholder component). Never fill one with a guessed value.

## Files

| Path | What |
| --- | --- |
| `design-system/tokens.json` | All tokens: colour (light and dark), type, spacing, radius, shadow, layout. **Edit to change the look everywhere.** |
| `design-system/components/<Name>/style.css` | One component's styles, token-only, including its own `@container (max-width: 860px)` phone rules. |
| `design-system/components/base.css` | Fonts, base type scale, page layout (`aq-in`, `aq-section`), placeholder, logo swap. |
| `design-system/components/bundle.css` | **Generated**: base.css plus every style.css. What the site and the artifact load. |
| `design-system/components/<Name>/README.md` | Guidelines for one component: markup, rules, when to use it. First sentence is its summary. |
| `design-system/components/<Name>/preview.html` | A live example with real Aquemi copy. Line 1 is `<!-- @dsCard group="…" height=… width=… subtitle="…" -->`. |
| `design-system/README.md`, `website.md`, `page-inventory.md` | Brand book, website plan, list of all site pages and which components each uses. |
| `design-system/tokens.css`, `components.json` | **Generated** by `python tools/design_system.py build`. Never edit any generated file by hand. |
| `design-system/artifact.json` | Where the Claude design system lives and its uploaded asset ids. |
| `content/pages/NN-<id>.json` | One page's copy: hero fields, optional `facts`, `blocks` (one per section), closing `cta`, `todo` (open facts). `NN` sets the order. |
| `content/pages.json` | **Generated** from `content/pages/`. The site fetches it. |
| `assets/src/blocks/<type>.js` | Renderer for one block type: `BLOCKS['<type>']=function(b,H){...}` returns that section's `aq-*` markup. |
| `assets/src/parts/<Name>.js`, `core.js`, `page.js` | Shared helpers (`sec`, `split`, `tx`, `e`, `wp`), NavBar, Footer, Hero, Button and other pieces, and page assembly. |
| `assets/aquemi-site.js` | **Generated** from `assets/src/`. The site and the guide load it. |
| `design-system/components/<Name>/motion.js`, `assets/src/motion/core.js`, `gl.js` | Motion (GSAP 3.13): the core animates every section the same way; a component's `motion.js` adds its own choreography with `AQmotion.fx('<Name>', fn)` and may register an ambient WebGL layer with `AQgl.def` (see FxShader). Reveals play once, under 5 s; rules in the brand book, Motion. New motion is ported from the Subframe Motion library (MIT; MCP server in `.mcp.json`). |
| `assets/motion.js` | **Generated** from the motion sources above. The site loads it. |
| `assets/site.css` | Draft-bar chrome only. No brand styles here. |
| `design-system/components/bundle.min.css`, `content/pages.min.json` | **Generated** minified site copies that `index.html` loads. The guide keeps the readable files. |
| `assets/fonts/`, `assets/vendor/` | Self-hosted Geist fonts (with `fonts.css`, the same rules inlined in `index.html`) and GSAP 3.13 as one file. |
| `sw.js` | Service worker: page loads from the network first, versioned and static files from the device. Its cache name is stamped by `build`. |
| `tools/images.py` | Writes the WebP copy of each PNG in `assets/illustrations/`; run it after adding or changing one (needs Pillow). The site uses the WebP. |
| `inspiration.html` | Media gallery of every image made or considered, used or not, tagged by what became of it. Reads `design-system/inspiration/gallery.json`; after adding an image run `python tools/gallery.py`. |
| `versions.html`, `versions/` | Page history: any page as it was at each big checkpoint (the default stops) or at any commit on main ("All versions"), flipped or compared side by side (desktop or phone). `versions/blobs`, `tree`, `index.json` are **generated** by `python tools/versions.py` (rerun after pushes you want listed; add named checkpoints in its `CHECKPOINTS`). `versions/sw.js` serves old commits from them. Never edit generated files in `versions/`. |
| `research.html`, `research/` | Design research: pass 9's image loop for people to read (each section's Gemini concept and what it became, every image taken apart into keywords, themes, the style atlas, build notes, skills and briefs). **Generated** by `python tools/research.py`, which also copies the text records from the working folder `../research/pass9*` into `research/`; rerun after new concepts, descriptions or build notes (and `tools/gallery.py` first for new images). |
| `sections.html`, `design-system/specimens/<look>.json`, `section-library.md`, `section-library.json` | The **Section library**: every look (section design) the site has had, live or retired, rendered with its motion from every content it has shown, grouped by block type, with a phone-width toggle. Specimens are written by `python tools/specimens.py snapshot` (appended, never pruned); the catalog (`.md` for editors, `.json` for the page) by the same command. `python tools/specimens.py fit <type>` lists the looks that take a block type. |
| `design-system/components/bundle-library.css`, `assets/library.js`, `assets/library-motion.js` | **Generated** by `build`: the retired looks (no page uses them) and their components, kept out of the site's bundles. Only `sections.html` loads them (`library.js` is the site script plus the retired renderers, loaded instead of `aquemi-site.js`); the guide loads the CSS to show retired components. |
| `design-system.html` | The visual guide. Generated at load time from the files above; normally needs no edits. |
| `brand/` | Logo, lockup, mark and favicon SVGs. Use as they are. |
| `tools/design_system.py` | `build`, `check`, `new`, `stage`. Python 3 standard library only. `build` also stamps content hashes (`?v=…`) into `index.html` and `sw.js`: never edit those by hand. See README, "Page speed". |

## Common tasks

**Change a colour, type size or spacing step.** Edit `design-system/tokens.json` (keep the list shape and a `usage` note on every token), then `python tools/design_system.py build`. Check both themes in the guide.

**Adjust a component.** Edit its `style.css`, update its `README.md` if behaviour changed and its `preview.html` if the markup changed. If the site renders it, update its renderer in `assets/src/blocks/` or `assets/src/parts/`. Then `build`.

**Add a component.**
1. `python tools/design_system.py new <PascalName> "<Group>"` (groups: Foundations, Actions, Navigation, Page sections, Data, Forms).
2. Write the README (what it is, markup, token rules, when not to use it) and a preview with real Aquemi copy.
3. Style `.aq-<name>` in its `style.css` with tokens only, phone rules in the same file.
4. `python tools/design_system.py build` then `python tools/design_system.py check` (must report 0 problems).
5. Open `design-system.html` locally and review it in light, dark and phone width.

**Add or edit a page.** Edit its file in `content/pages/`, then `build`. Use existing block types; the guide's "Page blocks" section shows each with real content. Update `design-system/page-inventory.md` when pages are added or renamed.

**Add a new kind of section.** Add the component to the design system first (above), then a renderer `assets/src/blocks/<type>.js` that outputs that component's markup, then use it in a page file in `content/pages/`. Add it to the mapping table in `page-inventory.md`.

**Change or swap a section's look.** A look renders one block type. Run `python tools/specimens.py fit <type>` (or browse `sections.html`) and pick a look of the block's type; set the block's `"look"` and check it has that look's fields. A look of another type means restructuring the content to its fields (the specimen's block in `design-system/specimens/<look>.json` is the template). Before inventing a new look, check that none fits.

**Retiring a section.** Looks are never deleted. When a page stops using a look (its section is cut or takes another look), leave `assets/src/blocks/look-<name>.js` and `design-system/components/<Name>/` in place: the look is retired, the build moves it into the library bundles (the site's bundles do not carry it), and it stays in the section library with the content it last had. Reusing it later is setting `look` on a block and rebuilding. After any page edit, run `python tools/specimens.py snapshot` before shipping so every content version is kept (`check` reports content not yet recorded). A look deleted by mistake comes back with `python tools/specimens.py restore <look> <commit that deleted it>`.

**Explore a new section idea.** Generate a loose concept image (Gemini works well), save it in `design-system/inspiration/` and rebuild the idea as a token-only component. Steps and the prompt recipe are in `design-system/inspiration/README.md`.

**Publish to the Claude design system.** After design-system changes land, publish them so Claude chats, decks and designs use the same system. Claude Code does this with the `aquemi-design-system` skill in `.claude/skills/`. Other agents: tell the person it needs publishing.

## Working in parallel

The sources are split so several people or agents can work at the same time without editing the same file: one component's `style.css`, `README.md` and `preview.html`; one block renderer; one page file. Give each agent its own files. Generated files (`bundle.css`, `aquemi-site.js`, `motion.js`, `pages.json`, `tokens.css`, `components.json`) are rebuilt from the sources, so concurrent `build` runs are safe; whoever commits runs `build` and `check` last.

## Before you push

```bash
python tools/specimens.py snapshot     # after page edits: keeps every section's content in the section library
python tools/design_system.py build
python tools/design_system.py check
```

Preview locally with `python -m http.server 8000` and open http://localhost:8000/ and http://localhost:8000/design-system.html. The same check runs on GitHub for every push (`.github/workflows/design-system.yml`).
