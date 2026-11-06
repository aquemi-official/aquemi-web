# Aquemi website (draft) and design system

Working draft of the Aquemi customer site and the Aquemi design system it is built from.

- Site: https://aquemi-official.github.io/aquemi-web/
- Design system guide: https://aquemi-official.github.io/aquemi-web/design-system.html
- Claude design system (for Claude chats, decks and designs): https://claude.ai/artifact/Qk92oQ4PLCDVzKjaixEmDc

This is for drafting and testing. Every page carries a `noindex` tag. Work on `dev`; Pages updates every copy in a minute or two (AGENTS.md, Branches).

**Development tooling: the studio.** The design system guide, section library, design research, media gallery and page history are one family, opened from `studio.html` or the bar across every page, registered in `studio/manifest.json` and run with `python tools/studio.py`. The live site is released without it. See [studio/README.md](studio/README.md).

**Working on it, by hand or with an AI agent: read [AGENTS.md](AGENTS.md).** It covers the file map, the rules and step-by-step workflows for changing tokens, adding components, adding pages and publishing to Claude.

## In short

- `design-system/` is the source of truth for everything visual: tokens, component styles, guidelines and previews. The site, the guide page and the Claude design system all read from it.
- `content/pages/` holds one file per page (34 pages). **Edit copy here**, then run `build`; `content/pages.json` is generated from it.
- `tools/design_system.py` builds generated files, checks the rules, scaffolds components and stages the system for Claude:

```bash
python tools/design_system.py build
python tools/design_system.py check
python tools/design_system.py new PullQuote "Page sections"
python tools/studio.py status      # what a change made stale
python tools/studio.py refresh     # regenerate it all, then check
python tools/studio.py check       # studio rules + a dry-run release of the live site
```

Preview locally:

```bash
python -m http.server 8000
```

Then open http://localhost:8000/ (pages by id, e.g. `#sys-pw`) and http://localhost:8000/design-system.html.

## Page speed

The site is built to load like a parts catalogue: everything from one origin, the critical files first, nothing in the way, and repeat visits served from the device.

- **One origin.** Geist and Geist Mono are self-hosted in `assets/fonts/` (latin and latin-ext WOFF2, SIL OFL) and GSAP 3.13 with its plugins is one file in `assets/vendor/`. No third-party request on page load.
- **Critical files first, in parallel.** `index.html` preloads the two latin fonts and the page content, and its boot script starts fetching `content/pages.min.json` in `<head>`, alongside the CSS. All scripts are `defer`. On a page with an equipment drawing the boot script preloads it too.
- **Smaller files.** `build` writes site copies `bundle.min.css` (half the gzipped size of `bundle.css`) and `pages.min.json`. Illustrations are served as lossless WebP (`python tools/images.py` after adding or changing a PNG in `assets/illustrations/`; needs Pillow). The PNGs stay the source.
- **Cache for good, stay fresh.** `build` stamps each file's content hash into `index.html` (`?v=…`) and a cache name into `sw.js`. The service worker serves versioned files and the static folders (fonts, icons, illustrations, brand, vendor) from the device, but always asks the network first for the page itself, so a push shows on the next load. It runs only over https and leaves `versions/` alone.
- **Motion never holds the page.** Headings wait at most 0.8 s for fonts before animating.

The guide (`design-system.html`) and the Claude design system keep loading the readable `bundle.css` and `pages.json`.

## Drafting conventions

- Text in `[square brackets]` is a placeholder for a fact only Aquemi can supply. The studio bar highlights them; tick "Open facts" to list what each page still needs.
- Follow the voice rules in the brand book: name the standard, give the number with its unit, no hype words, sentence case.
- Standards limits on the systems, services and compliance pages need a technical review before launch.
