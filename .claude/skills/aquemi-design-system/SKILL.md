---
name: aquemi-design-system
description: Change, extend, review or publish the Aquemi design system in this repo. Use when adding or editing a component, changing tokens (colours, type, spacing), adding a page-section type to the site, reviewing the visual guide, or publishing design-system changes to the Claude design system artifact.
---

# Aquemi design system

`design-system/` is the source of truth. The site (`index.html`), the visual guide (`design-system.html`) and the Claude design system artifact all come from it. Read `AGENTS.md` for the file map.

## Change or extend

1. Read `design-system/README.md` (brand book) and the README of every component you touch.
2. Make the change:
   - Tokens: edit `design-system/tokens.json`. Keep the list shape `{"tokens":[{"name","value","usage"}]}`; colours as `{"light": "#…", "dark": "#…"}` hex; every token has a usage note. Text colours need 4.5:1 on their ground in both themes.
   - New component: `python tools/design_system.py new <PascalName> "<Group>"`, then fill in README.md, preview.html (real Aquemi copy, line 1 the `@dsCard` marker) and `style.css` (tokens only).
   - Existing component: edit its `style.css`, README and preview together (`bundle.css` is generated).
   - New section type on the site: component first, then a renderer `assets/src/blocks/<type>.js`, then content in a page file in `content/pages/`, then the mapping table in `design-system/page-inventory.md`.
   - Section looks (`"look": "<name>"` on a block, `assets/src/blocks/look-<name>.js` + its component): **never delete one.** Before inventing a new look, run `python tools/specimens.py fit <type>` and reuse one that fits (live or retired, see `sections.html`). A look no page uses is retired: the build moves it into the library bundles, and it stays in the section library. After page edits run `python tools/specimens.py snapshot` so every content version is kept.
3. Run `python tools/design_system.py build`, `python tools/design_system.py check` and `python studio/studio.py check`. Fix every problem they report. (`python studio/studio.py refresh` does all of it in order; the `studio` skill covers the tooling as a whole.)
4. Review visually: serve the repo (`python -m http.server 8000`) and open `/design-system.html` and the affected site pages. Check light, dark and the "Phone width" toggle on the component.
5. Commit to `dev` and push; the dev copy updates in a minute or two. Promote through `staging` to `main` (AGENTS.md, Branches).

## Publish to the Claude design system

The artifact is listed in `design-system/artifact.json` (`artifact`). It is a Design System artifact; its content lives in its own files under `project/`.

1. `python tools/design_system.py build && python tools/design_system.py check`
2. `python tools/design_system.py stage <scratch dir>` to copy every publishable file to `<scratch dir>/project/` (it leaves out generated `tokens.css`, `components.json` and `artifact.json`).
3. Read the live index with the Artifact tool: `read` the artifact with `path: "project/design-system.json"`. Save a copy at `<scratch dir>/project/design-system.json`, keep every key as read, and only set `lastChange` to `{"by": "<person you work for>", "at": "<now, ISO 8601>", "via": "Claude Code", "note": "<one line on what changed>"}`. Change `assetGroups` only when assets changed.
4. Publish in one call: `url` = the artifact, `root` = `<scratch dir>`, `file_path` = the absolute path of `<scratch dir>/project/design-system.json`, `files` = every other staged file by its `project/…` path (the same path on both sides). Leave out files that did not change if you prefer; files left out are kept.
5. If the publish is refused because someone saved meanwhile, read the index again, redo step 3 once, and publish again. If refused a second time, tell the person.
6. New logos or images: upload them first (`publish` with `asset: true` to the artifact), add the record to the index's `assetGroups` and the id to `design-system/artifact.json`, and put the file in `brand/` so the guide can show it.

Never publish `index.html`, `SKILL.md` or anything under `artifact-type/` to the artifact; only `project/…` paths.

## Sharing

The artifact is shared from its page's Share menu on claude.ai. Agents can't change sharing. If a teammate can't open it, ask the owner to share it with the organization.
