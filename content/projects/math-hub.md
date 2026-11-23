+++
title = 'math-hub'
date = 2026-11-23
weight = 10
tagline = 'notes, full PDFs, theorem index & graph, drills'
status = 'live'
app = '/math-hub/'
repo = 'https://github.com/donatomartinelli/math-hub'
description = 'A terminal-style site that publishes my university math notes: full PDF lecture notes, a searchable index of definitions and theorems, a 3D dependency graph, spaced-repetition problems and mental-math training. Everything is generated from the LaTeX sources.'
+++

**[ [open math-hub](/math-hub/) ]**

## One source, three repositories

All content starts as LaTeX in a private repository, **math-tex**. Nothing is written twice:

```
math-tex (.tex sources)
  ├─ CI ─► latexmk ─► math-hub/library: full PDFs + manifest.json
  ├─ CI ─► extract.py ─► math-hub/data: problems.json + catalog.json
  └─ local ─► Anki (AnkiConnect)
```

Every push compiles the **complete** notes (every chapter, every proof) in a TeX Live container and publishes them. Locally I can print only the chapters I am studying, without proofs, through a git-ignored `studio.tex`: the site is never affected.

## What the site does

- **dispense**: the PDFs, read in-page and opened at the right page.
- **enunciati**: search across ~1,400 definitions, theorems, propositions, lemmas and corollaries, rendered with KaTeX.
- **grafo**: a 3D force graph of logical dependencies. An edge A → B means that B, or its proof, cites A via `\ref`. Brighter nodes are more connected. This used to be the separate [MAPH](/projects/maph/) project.
- **problemi**: exercises tagged in the sources with `\tagprob{topic}{level}`, scheduled with a simplified spaced-repetition algorithm. IDs are content hashes, so review history survives edits elsewhere.
- **calcolo**: Trachtenberg mental-math drills, previously [Mental Math](/projects/mentalmath/), with heat map, presets and latency tracking.

## Stack

Vanilla JS (ES modules), hash router, KaTeX, Chart.js, 3d-force-graph, GitHub Pages. Python for extraction, GitHub Actions for the pipeline. Progress is stored in the browser and can be synced through a private Gist.
