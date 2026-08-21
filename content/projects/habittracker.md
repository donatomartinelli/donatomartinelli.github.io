+++
title = 'Habit Tracker'
description = 'A minimalist, ultra-lightweight desktop habit tracker built with Vanilla JS and Tauri v2. Designed to run perfectly as a borderless, floating desktop widget on Windows, consuming almost zero RAM.'
draft = false
+++

**[🔗 View Repository on GitHub](https://github.com/donatomartinelli/HabitTracker)**

This project is a minimal, offline-first desktop application developed to track daily habits and manage focus sessions. Bypassing heavy frameworks like Electron or React, the application is built entirely in Vanilla JavaScript and wrapped in **Tauri v2**, utilizing a Rust backend for native system interactions.

### Architecture and UI Design

The user interface adheres to a strict brutalist design philosophy. It utilizes system monospaced fonts (`ui-monospace`), raw CSS Flexbox layouts, and a 92% opacity dark background coupled with a backdrop blur to elegantly blend with the desktop wallpaper.

Through the Tauri configuration, the application is rendered as a frameless (`decorations: false`) and transparent window. Native window dragging is implemented directly into the DOM via the `data-tauri-drag-region` attribute, allowing the app to act as a floating, borderless widget.

![Dashboard Overview](/img/a1.png)

### Data Persistence and Telemetry

To ensure zero latency and strict privacy, the application operates entirely offline without any cloud synchronization. All relational data (task templates, daily logs, and specific events) is serialized and persisted locally through the browser's `localStorage` API.

The tracker supports granular task creation, including specific weekdays targeting, frequency adjustments, and multiple daily repetitions. 

![Create Habit](/img/a5.png)
![Manage Habits](/img/a2.png)

Daily consistency is visually mapped through a GitHub-style contribution graph. The JavaScript engine calculates the ratio of completed tasks versus total scheduled tasks for each day, assigning a specific CSS class (from `lvl-1` to `lvl-4`) to render the heat map intensity.

### Integrated Focus Mechanism

The application features a built-in Pomodoro timer to enforce deep work sessions. When initiated, the timer hijacks the interface with an absolute overlay, displaying a minimalist SVG circular progress bar. 

Upon completion of a focus session, the logic automatically parses the active templates for the current day and prompts the user to check off an uncompleted instance of a task.

![Timer Setup](/img/a3.png)
![Active Timer](/img/a4.png)

### Rust Backend Integration (Quick Notes)

While the core logic runs in the frontend, the application exploits Tauri's Inter-Process Communication (IPC) to bypass the browser sandbox for the "Quick Notes" feature. 

When a note is saved, the JavaScript frontend invokes a native Rust function (`save_note`). The Rust backend interfaces directly with the OS filesystem, locating the user's Desktop directory and appending the raw text into categorized `.txt` files in a dedicated "Notes" folder.