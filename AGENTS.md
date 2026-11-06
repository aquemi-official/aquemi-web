# Working in this repository (for people and AI agents)

This is the draft Aquemi website and the **Aquemi design system** it is built from. Aquemi designs and fabricates clean water systems for pharmaceutical manufacturing; readers are engineers, validation leads and QA managers.

- Site: https://aquemi-official.github.io/aquemi-web/
- Design system guide (generated from this repo): https://aquemi-official.github.io/aquemi-web/design-system.html
- Claude design system (for Claude chats, decks and designs): https://claude.ai/artifact/Qk92oQ4PLCDVzKjaixEmDc
- Studio hub (every development tool): https://aquemi-official.github.io/aquemi-web/studio/web/index.html

## The studio

Every development tool beside the site is the **studio kit** in `studio/` (portable: it never names Aquemi and can be copied into another web project). Aquemi's settings for it are in `studio.config.json`: brand, the page adapter for `content/pages.json`, data locations, page-history checkpoints, branches, the live keep-list, and Aquemi's own tools (the design system guide, the section library, design research). Aquemi's rules for the kit's skills are in `design-system/notes/` (`image-loop.md`, `motion.md`, `site-scan.md`). The kit's own section, at the end of this file, says how to use it; `studio/README.md` is the full guide.

| Tool | Page | Where it comes from |
| --- | --- | --- |
| Site | `index.html` | Aquemi |
| Design system | `design-system.html` | Aquemi (`tools/design_system.py`) |
| Section library | `sections.html` | Aquemi (`tools/specimens.py`) |
| Design research | `research.html` | Aquemi (`tools/research.py`, pass 9 record) |
| Studio hub, Page history, Media gallery, Style atlas, Site scans | `studio/web/` | Kit (Aquemi's gallery and atlas data come from `tools/gallery.py` and `style-atlas/aggregate.py`) |

## Branches

Three long-lived branches, one GitHub Pages site (`.github/workflows/pages.yml` publishes all three on every push to any of them, in a minute or two):

| Branch | Role | Published at |
| --- | --- | --- |
| `dev` | Day-to-day work. Commit and push here. | https://aquemi-official.github.io/aquemi-web/dev/ |
| `staging` | Review before release. Only `dev` merges in. | https://aquemi-official.github.io/aquemi-web/staging/ |
| `main` | Production, the public site. Only `staging` merges in. | https://aquemi-official.github.io/aquemi-web/ |

- Work on `dev` (or a short branch merged into `dev`). Push to `dev` directly.
- `main` and `staging` are protected on GitHub: no direct pushes (admins included), no force pushes, no deletion. They change only through a pull request whose design-system check (`check`) passes. No approval is required.
- Promote a batch: open a pull request from `dev` into `staging` (`gh pr create --base staging --head dev`), merge it with a merge commit, review the staging copy, then do the same from `staging` into `main`. Use merge commits, not squash or rebase, so the branches keep a shared history.
- The staging and dev copies leave out the page history (`versions/`) and the image gallery's files (`design-system/inspiration/`); those work on production only (the studio bar links there). The studio bar names the copy.
- `/live/` always shows `main` released: the website without the studio, as the public would see it. Going live is one switch, `"release": {"production": false}` in `studio.config.json`: the root then serves the released site and the tooled `main` moves to `/draft/` (studio/README.md, "Detaching for the live site").
- `python studio/studio.py history` lists commits on `main`, so the page history shows released versions.

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
| `assets/site.css` | Site page base only (box sizing, body ground, focus ring). No brand styles here. |
| `studio/` | The studio kit (generic; see `studio/README.md`). Edit it only for changes every project would want; then `python studio/studio.py install`. |
| `studio.config.json` | Aquemi's settings for the kit: everything Aquemi about the tooling. |
| `studio/web/studio.js`, `studio-data/` | **Generated** by `build` (the studio bar, the page index, the hub's data). |
| `design-system/notes/` | Aquemi's rules for the kit's skills: image loop, motion (with every motion port so far), site scans. |
| `design-system/components/bundle.min.css`, `content/pages.min.json` | **Generated** minified site copies that `index.html` loads. The guide keeps the readable files. |
| `assets/fonts/`, `assets/vendor/` | Self-hosted Geist fonts (with `fonts.css`, the same rules inlined in `index.html`) and GSAP 3.13 as one file. |
| `sw.js` | Service worker: page loads from the network first, versioned and static files from the device. Its cache name is stamped by `build`. |
| `studio/tools/images/` | `webp.py` (the WebP copy of each PNG in `assets/illustrations/`, run by `python studio/studio.py refresh webp` after adding or changing one; needs Pillow; the site uses the WebP), `line_art.py`, `icon_sheet.py`. |
| `studio/web/gallery.html` | Media gallery of every image made or considered, used or not, tagged by what became of it. Reads `design-system/inspiration/gallery.json`; after adding an image run `python studio/studio.py gallery` (Aquemi's producer `tools/gallery.py`). `inspiration.html` redirects there. |
| `studio/web/history.html`, `versions/` | Page history: any page as it was at each big checkpoint (the default stops, `history.checkpoints` in `studio.config.json`) or at any commit on main ("All versions"), flipped or compared side by side (desktop or phone). `versions/blobs`, `tree`, `index.json` and `sw.js` are **generated** by `python studio/studio.py history` (rerun on main after pushes you want listed). `versions.html` redirects there. Never edit generated files in `versions/`. |
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

**Add a development tool, or release the live site.** Follow `studio/README.md` and the `studio` skill. An Aquemi-only tool goes in `studio.config.json` `tools`; one any site could use goes in the kit, without naming Aquemi. The site must never depend on the studio: keep all studio wiring in `index.html` inside its `<!-- studio -->` block, and add any file the site loads at runtime to `live.keep`.

**Publish to the Claude design system.** After design-system changes land, publish them so Claude chats, decks and designs use the same system. Claude Code does this with the `aquemi-design-system` skill in `.claude/skills/`. Other agents: tell the person it needs publishing.

## Working in parallel

The sources are split so several people or agents can work at the same time without editing the same file: one component's `style.css`, `README.md` and `preview.html`; one block renderer; one page file. Give each agent its own files. Generated files (`bundle.css`, `aquemi-site.js`, `motion.js`, `pages.json`, `tokens.css`, `components.json`, `studio/web/studio.js`, `studio-data/`) are rebuilt from the sources, so concurrent `build` runs are safe; whoever commits runs `build` and `check` last.

## Before you push

```bash
python tools/specimens.py snapshot     # after page edits: keeps every section's content in the section library
python tools/design_system.py build
python tools/design_system.py check
python studio/studio.py check           # studio rules and a dry-run release of the live site
```

`python studio/studio.py refresh` runs the first three (and the image, gallery and atlas steps) in order, then both checks.

Preview locally with `python -m http.server 8000` and open http://localhost:8000/, http://localhost:8000/studio/web/index.html and http://localhost:8000/design-system.html. The same checks run on GitHub for every push (`.github/workflows/design-system.yml`).

<!-- studio-kit -->
## The studio (development and design tooling)

This project uses the **studio kit** in `studio/`: page history, media gallery, style atlas (image → keywords → prompts), site scans (other sites' sitemaps, outlines and words), motion porting, and a studio bar on every draft page. The kit is generic; `studio.config.json` at the root says everything about this project (brand, where pages and data live, branches, what the live site is made of, its own tools and notes). The live site is released without any of it.

- Read `studio/README.md` before working on any tool. Claude Code skills: `studio` (the kit as a whole), `studio-image-loop`, `studio-motion`, `studio-site-scan`.
- `python studio/studio.py about` says which tool does what; `status` what a change made stale; `refresh` regenerates it all and runs the checks; `check` must report 0 problems before you push.
- Never edit generated files (a tool's `outputs`). Studio wiring in site pages stays between `<!-- studio: ... -->` and `<!-- /studio -->`. Edit kit files in `studio/`, then `python studio/studio.py install`.
<!-- /studio-kit -->
