---
name: studio-motion
description: Find, port and ship motion for this website from the Subframe Motion library (300+ MIT examples: hover and press effects, scroll stories, counters, diagrams, WebGL shaders) into the project's own stack and design tokens. Use when asked for an animation, a hover or press effect, a scroll reveal, a shader or ambient background, "more motion", "use Subframe", or to make a section feel alive; also before writing any motion from scratch.
---

# Motion: Subframe Motion → this site

Subframe Motion (https://www.subframe.com/motion) is a library of open-source (MIT) motion examples: Components and interactions, Animation and motion, WebGL and shaders. Examples are React (some need the `motion` package) or raw WebGL. We **port** them: keep the motion mechanism and its values, rewrite the shell in the project's own stack.

**Read the project's notes first** (`notes.motion` in `studio.config.json`): its stack (for example vanilla JS with GSAP, or a framework), where motion code lives, its motion rules and the table of what is already ported. They win over this file. No notes yet? Ask what the stack is, or read the site's scripts, and start the notes file as you port.

| What | Where |
| --- | --- |
| MCP server (Claude Code loads it from the project's `.mcp.json`) | `subframe-motion` → `https://mcp.subframe.com/motion/mcp`, no account. Tools: `search_motion_examples`, `get_motion_example`, `get_motion_guidance`. Template: `studio/templates/mcp.json` |
| The same without the MCP (subagents, scripts) | `python studio/studio.py motion search "<words>" [--runtime webgl] [--category "..."]`, `motion get <slug> --out <dir>`, `motion guide <topics>`, `motion catalog` |
| Every example: slug, category, runtime, look | `studio/tools/motion/catalog.json` |

## Find

1. Say what the section must explain, then what should move. Search in plain words, several phrasings; filter by runtime or category; browse the catalog by `look` when words don't hit.
2. `get <slug>`: read `motion`, `adapt` (the code that drives the motion), `reducedMotion`, `limitations`, `packages`, `assets`, `license`. Read `guide adapting` once, and `scroll`, `ambient`, `text-and-numbers` or `feedback` for that kind of effect.
3. Reject examples that need assets the project lacks or that clash with the brand (config `brand`).

## Port

- Keep: the mechanism (shader, spring or easing values, stagger, geometry), its reduced-motion branch and keyboard behaviour, and the MIT notice: `Ported from Subframe Motion "<title>" (<slug>), MIT, (c) Subframe`.
- Replace: React state with the project's stack; demo colours with the project's tokens; demo copy with the section's real copy. Never add a framework or library the project does not already use.
- Put the code where the notes say; add a row to the notes' ported table (example, what it became, where it is used).

## Motion rules (unless the notes say otherwise)

- Scroll reveals play once and settle within 5 s; text travels 16 px or less.
- Hover and press: 100–200 ms; exits about a third faster than entrances.
- Ambient layers run only on screen, slowly, faint behind text, and stop to a still frame under reduced motion.
- At most one pinned or scroll-linked story per page; never hijack scroll speed.
- Under `prefers-reduced-motion`, only still frames and essential state changes.

Check the result in a browser at desktop and phone width (no console errors, nothing left hidden), then `python studio/studio.py refresh` and `check`.
