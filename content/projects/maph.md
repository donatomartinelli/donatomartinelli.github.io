+++
title = 'MAPH'
date = 2026-08-25
description = 'Interactive 3D data visualization mapping logical dependencies between mathematical theorems and definitions, auto-generated from LaTeX cross-references.'
draft = false
+++

**[🔗 View Repository on GitHub](https://github.com/donatomartinelli/MAPH)**

MAPH is a data visualization project that maps the underlying logical connections within university mathematics notes. Nodes represent specific mathematical statements (theorems, definitions, propositions), while edges illustrate their logical dependencies.

### Parsing and Visualization Workflow

A custom Node.js script automatically parses the `.tex` source files, extracting environments and statements using Regular Expressions. By mapping `\label` and `\ref` tags, it generates a structured JSON dataset. This data feeds a WebGL-based `3d-force-graph` engine where node and edge brightness scales dynamically based on degree centrality.