+++
title = 'Cortex'
date = 2026-11-22
weight = 20
tagline = 'keyboard-first personal operating system'
status = 'live'
app = '/cortex/'
repo = 'https://github.com/donatomartinelli/HabitTracker'
aliases = ['/projects/habittracker/']
description = 'Cortex is a keyboard-first personal operating system: tasks, day plan, focus, habits, notes and money in one fast, offline place. It grew out of my minimal desktop habit tracker.'
+++

**[ [open the Cortex page](/cortex/) ]**

Cortex started as a borderless Tauri habit tracker for the Windows desktop and grew into a complete personal system:

- **tasks and day plan**: a planner with day slots and a calendar synced with Google, Apple and Outlook;
- **focus**: built-in timer sessions tied to tasks;
- **habits**: GitHub-style consistency heat map;
- **notes**: Markdown, with import and export (also from Notion);
- **money**: a small ledger;
- **command palette**: type what you mean.

### Design

The visual language is the one this site now uses: pure black, square corners, **VT323** for titles and numbers and **JetBrains Mono** for text. The fonts are self-hosted, so it works offline.

### Stack

Vanilla JS and CSS, Tauri v2 (Rust) for the desktop widget, IndexedDB as the main storage with daily backups, and an optional Supabase account for sync.
