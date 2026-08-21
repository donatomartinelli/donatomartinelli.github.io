+++
title = 'Mental Math'
description = 'An open-source environment dedicated to fast arithmetic and mental calculation. The project integrates notes, cheat sheets, and training software to convert calculation from a slow, mechanical process into a conditioned reflex.'
draft = false
+++

**[🔗 View Repository on GitHub](https://github.com/donatomartinelli/MentalMath)**

MentalMath is an interactive training environment designed for the automation of mental arithmetic. Developed in JavaScript, the software translates the theoretical principles of the *Trachtenberg Speed System* into a data-driven intensive practice platform.

### Session Setup

The application opens to a minimal setup interface that allows granular control over generation parameters. It is possible to define the length of the multiplicand and isolate specific multipliers for targeted training, setting time limits in seconds or minutes. Recurring configurations are managed and saved locally through a preset system.

![Session Setup](/img/2.png)

### Calculation Engine and Validation

Currently, the logical core (`MathEngine`) exclusively supports the **multiplication** operation. The engine dynamically generates equations by selecting factors through weighted probability matrices. 

The execution interface is borderless and focused solely on input. Result validation occurs in real-time with a single keystroke, applying instant visual feedback in case of an error to avoid interrupting the cognitive flow.

![Game Interface](/img/3.png)

In case of a block, the system integrates a support mechanism that displays the specific Trachtenberg rule associated with the current multiplier (e.g., the breakdown for 7, 11, or 12) on screen. 

The architecture is modular, however: the integration of addition, subtraction, and division is already planned and will be implemented gradually alongside the advancement of the theoretical study of the system.

![Rule Hint](/img/4.png)

### Spaced Repetition and Telemetry

The core element of the software lies in the algorithmic tracking of performance. Each completed operation feeds a local database that records execution time and errors.

The algorithm dynamically updates the difficulty using an Exponential Moving Average (EMA), where errors are converted into severe time penalties (800ms per single error). This mechanism forces the generator to more frequently propose the factors on which a higher latency is recorded, applying the fundamentals of *Spaced Repetition*.

![Dashboard and Analytics](/img/1.png)

The analytical dashboard offers a technical visualization of progress:
*   **Consistency Tracker:** A heat map tracking the volume of daily calculations and a "Streak" counter for consecutive days of activity.
*   **Latency and Volume Charts:** A visual rendering, filterable via hover and interactive zoom, of reaction times broken down by specific groups of multipliers over time.