---
name: studio-site-scan
description: Scan competitor or reference websites (sitemap, page outlines, calls to action, the words they use), compare them with our own pages, and apply what we learn. Use when asked to study other sites or a market, look at a competitor's sitemap or how others structure their pages, compare copy, terms or calls to action, plan or rework our sitemap, or rewrite our pages to match what the market says, in our own voice.
---

# Site scans: learn from other sites, write in our own voice

The scan tool takes other sites apart and sets them against ours. We adopt **structure, coverage and vocabulary**,
never their text. Code: `studio/lib/scan.py` (its docstring lists every command). Viewer: `studio/web/scans.html`.
Data: the folder in `studio.config.json` `data.scans` (below, `<scans>`).

## 0. Read the project first

Before planning or writing anything, read `studio.config.json`:

- `project` (what the business is, who reads the site) and `site.pages` (where our page content lives, which adapter).
- `brand`: `book` (the brand book, read its voice and content sections), `voice` (how we write, and the project's
  placeholder convention for facts only the client can supply), `offer` (what we sell and what we don't), `never`
  (things we must never show or say).
- `notes["site-scan"]` if present: a project notes file with extra rules and, often, the list of sites to study.
  Read it whole.

## 1. Pick the sites

Use the sites in the project's notes, or ask the person for 3 to 6: direct competitors, the market leader, and one
or two sites whose structure they admire. Do not guess competitors silently; propose a list and confirm.

## 2. Scan

```bash
python studio/studio.py scan https://competitor.example --max 40          # id: competitor-example
python studio/studio.py scan https://other.example --max 30 --name other   # choose the id
python studio/studio.py scan list
```

- It reads robots.txt and obeys its Disallow rules, then the sitemaps (or crawls links). Keep `--max` modest
  (20 to 60) and the default delay; never scan the same site repeatedly in a loop.
- Pages marked **thin** (under 80 words) are usually drawn by JavaScript. Capture the rendered HTML with a browser
  (Claude in Chrome: open the page, save `document.documentElement.outerHTML` to a file; or Playwright
  `page.content()`), then add it:
  `python studio/studio.py scan import <site> <file.html> <url>`. Same for pages behind a cookie wall.
- Unreachable site: check the URL; do not work around blocks or logins.

## 3. Compare

```bash
python studio/studio.py scan compare <site>                # writes <scans>/<site>/compare.json
python studio/studio.py scan compare <site> <our-page-id>  # also pairs that page with their closest pages
python studio/studio.py scan compare --all                 # every scanned site at once -> <scans>/compare-all.json
```

Read the output and the viewer (`studio/web/scans.html`, served from the project root with
`python -m http.server 8000`): **Map** (their URL tree and home navigation), **Pages** (outline, meta description,
calls to action per page), **Words** (they say / we don't, we say / they don't, shared; their h2s and calls to action
against ours), **Compare** (our page beside their most similar pages).

How to read it:
- "They say, we don't" terms with a high share across several sites are what readers expect to find. Brand names,
  product names, staff names and boilerplate are noise; skip them.
- "We say, they don't" can be a strength (our distinct offer) or jargon readers don't search for. Say which.
- Headings that recur across sites show the questions a page of that kind is expected to answer, and in what order.
- Word counts and calls to action show depth and how the field asks for the next step.

## 4. Write the findings

One note per site at `<scans>/<site>/findings.md` (and `<scans>/findings.md` for a cross-site summary):
what the sitemap covers that ours doesn't, page types and their usual outline, vocabulary to adopt (with the
reason), calls to action, anything that contradicts `brand.offer` or `brand.never` (and so must not be adopted).
Quote no more than a heading or a short term from them; describe, don't copy.

## 5. Apply, in our voice

1. **Sitemap.** Propose additions, merges and renames as a table (our page, their equivalent pages, why), and
   agree it with the person before adding pages.
2. **Copy, page by page.** Edit the project's content files (found through `site.pages` in `studio.config.json`).
   Use the vocabulary readers expect, cover the questions the field answers, keep our structure components and
   our voice (`brand.voice`, the brand book). Run `scan compare <site> <page>` again to check coverage moved.
3. Keep each change small and explain it: which finding it comes from.

## Hard rules

- Never copy sentences, claims, figures, prices, certifications, standards compliance, client names, logos or
  testimonials from another site, even reworded. Adopt structure, coverage and vocabulary only.
- A fact only the client can supply (a figure, a certificate, a lead time, a reference) stays a placeholder in the
  project's own convention (see `brand.voice`). Never fill one with a value seen on a competitor's site.
- Nothing that conflicts with `brand.offer` or `brand.never`, however common it is in the market.
- Respect robots.txt, keep `--max` modest, and don't scan sites behind logins.
- Scan data is research, not content: never publish it or link to it from the site.

## After changes

```bash
python studio/studio.py refresh     # regenerate what the edits made stale
python studio/studio.py check       # studio rules and the live-site dry run
```

Also run the project's own build and checks (`AGENTS.md`). Add screenshots or captures to the gallery or the research
records only when they are worth keeping as references.
