+++
title = 'MATEMATICA'
description = 'Archive of compiled PDF documentation for university mathematics lecture notes and examination materials. Source files are maintained in LaTeX and compiled continuously via GitHub Actions.'
draft = false
+++

**[🔗 View Repository on GitHub](https://github.com/donatomartinelli/MATEMATICA)**

This repository serves as a centralized, continuously integrated archive for university mathematics lecture notes and examination materials. The documentation spans across multiple branches of pure and applied mathematics, including Mathematical Analysis, Differential Geometry, Abstract Algebra, and Scientific Computing.

### Typesetting and CI/CD Workflow

All source files are meticulously typeset in LaTeX. The workflow relies on a dual-repository architecture: a private staging environment for raw editing and structural formatting in VS Code, and a public repository that handles continuous integration. Every push to the main branch triggers a GitHub Actions pipeline that automatically compiles the `.tex` source files and deploys the updated PDFs.

The documents are structured using custom environments for definitions, propositions, lemmas, and proofs. This strict modularity allows for seamless integration with spaced-repetition software (Anki) and selective compilation through the `exclude` package, enabling different reading modes depending on the study phase.

### Document Preview

Below are live previews of selected lecture notes. The documents are rendered directly in-page for immediate access.

#### Scientific Computing 1
{{< pdf src="/pdf/calcolo-scientifico-1.pdf" >}}

---

#### Geometry 1
{{< pdf src="/pdf/geometria-1.pdf" >}}