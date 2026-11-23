+++
title = 'math-tex: LaTeX lecture notes'
date = 2026-11-23
weight = 30
tagline = 'LaTeX notes, compiled and published by CI'
status = 'live'
app = '/math-hub/#/dispense'
repo = 'https://github.com/donatomartinelli/math-pdf'
description = 'My university mathematics notes (Algebra, Analysis, Geometry, Scientific Computing, Physics, Rational Mechanics), typeset in LaTeX and compiled continuously via GitHub Actions. The PDFs are read on math-hub.'
+++

**[ [read the notes on math-hub](/math-hub/#/dispense) ]**

### Typesetting

Every course is a KOMA-Script book with a shared preamble: custom environments for definitions, propositions, lemmas, theorems and proofs, framed statements, and Inkscape figures. The strict structure is what makes everything else automatic: the statements become the theorem index and the dependency graph on math-hub, and Anki cards through AnkiConnect.

### Pipeline

The sources live in a private repository, **math-tex**. On every push, GitHub Actions:

1. compiles every course with `latexmk` in a TeX Live container, always in full: every chapter and every proof;
2. publishes the PDFs and a `manifest.json` to the public [math-pdf](https://github.com/donatomartinelli/math-pdf) repository;
3. extracts problems, statements, page numbers and `\ref` dependencies into JSON for [math-hub](/projects/math-hub/).

For studying, a local, git-ignored `studio.tex` can restrict a build to a few chapters and hide the proofs. The published PDFs are never affected.
