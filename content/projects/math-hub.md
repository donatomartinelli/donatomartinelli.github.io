+++
title = 'math-hub'
date = 2026-11-23
weight = 10
tagline = 'my math notes: LaTeX pipeline, full PDFs, theorem graph, drills'
status = 'live'
app = '/math-hub/'
repo = 'https://github.com/donatomartinelli/math-hub'
aliases = ['/projects/matematica/', '/projects/maph/', '/projects/mentalmath/']
description = 'Everything I do with mathematics in one place: university notes typeset in LaTeX (math-tex) and compiled by CI into full PDFs, a searchable index of definitions and theorems, a 3D dependency graph (formerly MAPH), spaced-repetition problems and Trachtenberg mental-math training (formerly Mental Math).'
+++

**[ [open math-hub](/math-hub/) ]**

math-hub brings together what used to be four separate projects:

| was | now | in math-hub |
|---|---|---|
| **MATEMATICA / math-tex**: LaTeX notes and PDF archive | the source of everything | [dispense](/math-hub/#/dispense) |
| **MAPH**: 3D graph of theorem dependencies | rebuilt on every push, all courses | [grafo](/math-hub/#/grafo) |
| **Mental Math**: Trachtenberg trainer | same engine, heat map and presets | [calcolo](/math-hub/#/calcolo) |
| problem bank with spaced repetition | problems tagged in the LaTeX sources | [problemi](/math-hub/#/problemi) |

## math-tex: one source

My notes for Algebra, Analysis, Geometry, Scientific Computing, Physics and Rational Mechanics are KOMA-Script books with a shared preamble: environments for definitions, propositions, lemmas, theorems and proofs, framed statements and Inkscape figures. They live in a private repository, **math-tex**, and nothing is ever written twice:

```
math-tex (.tex sources)
  ├─ CI ─► latexmk (TeX Live) ─► math-hub/library: full PDFs + manifest.json
  ├─ CI ─► extract.py ─► math-hub/data: problems.json + catalog.json
  └─ local ─► Anki cards (AnkiConnect)
```

Every push compiles the **complete** notes, with every chapter and every proof, reproducibly. Locally I can print only the chapters I am studying, without proofs, through a git-ignored `studio.tex`. The site is never affected.

## What the site does

- **dispense**: the PDFs, read in-page and opened at the right page.
- **enunciati**: search across ~1,400 definitions, theorems, propositions, lemmas and corollaries, rendered with KaTeX.
- **grafo** (ex MAPH): a 3D force graph of logical dependencies. An edge A → B means that B, or its proof, cites A with `\ref`. Brighter nodes are more connected. Clicking a node shows the statement and opens the PDF at its page.
- **problemi**: exercises tagged in the sources with `\tagprob{topic}{level}`, scheduled with a simplified spaced-repetition algorithm. IDs are content hashes, so review history survives edits elsewhere.
- **calcolo** (ex Mental Math): multiplication drills based on the Trachtenberg system. The rule for each multiplier is shown on screen, and slower multipliers come up more often (an EMA of latency, with a penalty for each error). It has presets, sessions in seconds or minutes, a daily heat map and latency charts.

## Stack

Vanilla JS (ES modules) with a hash router, KaTeX, Chart.js, 3d-force-graph, GitHub Pages. Python for extraction and GitHub Actions for the pipeline. Progress is stored in the browser and can be synced through a private Gist.
