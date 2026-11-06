---
name: aquemi-studio
description: Work with the Aquemi studio, the family of development tools beside the website (design system guide, section library, design research, media gallery, page history, the studio bar on the draft site). Use when asked which tool or file does what, to refresh or rebuild tool data after a change, to check or ship work, to add or retire a development tool, to release or preview the live site without the tooling, to change which published copies carry the studio, or to promote dev to staging to main.
---

# Aquemi studio

The studio is every development tool that sits beside the site. It is **one registry**, `studio/manifest.json`, read by three things: the studio bar on every page (`studio/studio.js`, generated), the hub `studio.html`, and the CLI `python tools/studio.py`. The live site is released without any of it. Full guide: `studio/README.md`. Rules for the whole repo: `AGENTS.md`.

## Find the right tool

```bash
python tools/studio.py about            # every tool: what, when, reads, writes, run, skill, ships
python tools/studio.py about sections   # one tool
```

Then hand off to the skill the tool names: `aquemi-design-system` (tokens, components, pages, looks, Claude design system), `image-prompt-loop` (images, style atlas, Gemini, research), `motion-library` (motion). This skill covers the studio itself, the page history and releasing.

## After any change

1. Edit sources only. Generated files (listed as `outputs` in the manifest, and in AGENTS.md) are never edited by hand.
2. `python tools/studio.py status` names the tools whose sources changed after their outputs.
3. `python tools/studio.py refresh [tool ...]` runs the generators in dependency order (images → gallery → section snapshot → research → design-system build) and then both checks. It skips Pillow steps when Pillow is missing and `research.py` when the `../research` working folder is not beside the checkout (regenerating without it drops build notes); say so in your report when a step was skipped.
4. `python tools/design_system.py check` and `python tools/studio.py check` must both report 0 problems before you push.

## Release and copies

- `studio/manifest.json` → `release` says which published copies carry the studio (`true`) and which are the live site (`false`). Production is `true` while the site is a draft.
- `live.keep` lists the only files the live site is made of. `python tools/studio.py release <out>` copies them and cuts the `<!-- studio: … -->` … `<!-- /studio -->` block from `index.html`; it fails on any studio file or broken link left behind. `check` runs this as a dry run.
- `.github/workflows/pages.yml` calls `python tools/studio.py assemble`: production, `staging/`, `dev/` per their own manifest, `live/` (released main, always), and `studio/` (tooled main) when production is live.
- Going live: review `/live/`, set `"production": false`, promote to main. Nothing is deleted from the repo; the tooling keeps working at `/studio/` and on `dev/` and `staging/`.

## Add a tool to the family

1. Build the page at the repo root, reading generated data (never hand-maintained copies). Tokens only; reuse the guide's header pattern.
2. In its `<head>`: `<link rel="stylesheet" href="studio/studio.css">` and `<script defer src="studio/studio.js" data-tool="<id>"></script>`.
3. Add a tool entry to `studio/manifest.json` (`id, name, page, kind, what, when, sources, outputs, run, skill, ships: "studio"`, `production_only` if it is too big for the staging and dev copies, and then add its folders to `HEAVY` in `tools/studio.py`).
4. A generator goes in `tools/<name>.py` (standard library only; document its commands in its docstring) and a step in `STEPS` in `tools/studio.py`.
5. `python tools/design_system.py build && python tools/studio.py check`; add the tool to the AGENTS.md file table.

The site itself must never depend on the studio: `index.html` announces each render with an `aq:render` event and the bar listens. Anything the site needs at runtime goes in `live.keep`.

## Page history

`python tools/versions.py` on an up-to-date `main` after a release you want listed; add named checkpoints to `CHECKPOINTS` in it (about ten). Production copy only.

## Promote

Push to `dev`. Then pull request `dev → staging`, merge with a merge commit, review the staging copy; then `staging → main` the same way. The `check` status (design-system and studio checks) must pass; `main` and `staging` take no direct pushes.
