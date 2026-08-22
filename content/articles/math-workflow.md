+++
title = 'My personal math workflow'
description = 'A comprehensive breakdown of my study system: from attending lectures and digital note-taking, to LaTeX typesetting, Anki spaced repetition, and exam preparation.'
date = '2026-08-22'
draft = false
+++

**Attend lectures.** This is fundamental, not only for learning the material and taking notes, but also for building a sense of belonging at the university. In the beginning, I skipped classes because I was bored, struggled to pay attention, and assumed I could master everything alone in my room. That approach backfired significantly—resulting in severe stress, restless nights, academic setbacks, and a substantial amount of wasted time.

**Take digital notes on a tablet.** Writing digitally provides seamless navigation between courses and makes correcting mistakes effortless across both lecture notes and in-class assignments. Once a lecture concludes, I clean up my raw notes to make them as linear as possible. I often write diagonally or draw excessive connecting lines, so I realign and organize the entire layout. This serves two purposes: reviewing the concepts and preparing the pages for the next step.

Next, I take screenshots, organize the pages, and transcribe them into LaTeX using Gemini. The first pass is a direct transcription. In the second pass, I use Gemini to polish the material into structured environments (definitions, propositions, proofs, and theorems). By utilizing the `exclude` package in LaTeX, I can easily filter my study material: if I want to skim only definitions or statements without proofs or exercises, I can toggle them with a single `%`. When my notes are too cryptic—especially when a professor explained something verbally without writing it down—I prompt the AI to clarify the reasoning clearly and concisely.

Once the LaTeX document is compiled, I either review it on my tablet or, preferably, print it out to study with a gel pen in an unlined A5 notebook. I work through the material from scratch to build a foundational grasp, rewriting concepts in my preferred notation and expanding or condensing details without altering the overall course structure. I make sure to understand the underlying logic thoroughly and grasp the core intuition behind each proof.

All LaTeX editing is handled in VS Code and integrated with GitHub: I maintain a private repository where I edit the source files and a public repository that automatically compiles and deploys the PDFs via GitHub Actions. What used to take months now takes just two to three days.

**Build Anki decks.** Once I have fully grasped the material, I create four separate Anki decks. In VS Code, I manage two working files: `anki.tex`, an uncompiled staging area for raw mathematical statements, and `anki.md`, which holds AI-formatted cards ready to be imported directly into the decks:
*   **Definizioni:** Core definitions.
*   **Teoremi Fondamentali:** Crucial named theorems with extensive proofs that professors frequently ask for in oral exams.
*   **Resto:** Secondary propositions, corollaries, and lemmas where memorizing full proofs alongside understanding them is unnecessary for the oral exam.
*   **Dimostrazioni:** Step-by-step proofs for the fundamental theorems. If a proof is long, I break it down into sequential cards: the prompt asks for the overall statement, then for the structural roadmap of the proof, followed by individual cards for step one, step two, and beyond.

**Exam preparation and session breakdown.** My schedule adapts depending on whether I am preparing for two oral exams, one oral and one written, or two written exams. I generally work in 30-minute focus blocks—either straight through or split into 15-minute intervals with a 3-minute break, depending on fatigue. I use these for *Definizioni*, *Resto*, and *Teoremi Fondamentali*. For *Dimostrazioni*, I schedule 30-to-60-minute blocks, aiming for a consistent four hours of focused study per day.

Before each session, I complete two 5-minute warm-ups of mental math using an application I am building to practice the Trachtenberg speed system.

Once an exam is completed, I merge all the decks (excluding Dimostrazioni) into a master deck called "Generale". I spend 10 minutes each day reviewing this deck to keep an active mental map of past subjects.

I am genuinely glad to have found a workflow that not only carries me through exams, but also preserves a durable structural overview of past material. I share my notes publicly in the hope that any student facing similar hurdles might find them useful. While I would love to pursue independent mathematical side-projects and work on unsolved problems continuously, catching up on my degree requires my full focus on upcoming exams.

Finally, my workflow is deeply indebted to the late Gilles Castel. His blog and his philosophy on learning, typesetting, and sharing mathematics remain a monumental inspiration. Beyond striving to become a better mathematician, his work taught me the value of design, taste, and craft in everything we build. I hope to honor that standard, even in some small measure, through my own projects.