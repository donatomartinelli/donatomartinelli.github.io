+++
title = 'My personal math workflow'
description = 'A comprehensive breakdown of my study system: from attending lectures and digital note-taking, to LaTeX typesetting, Anki spaced repetition, and exam preparation.'
date = '2026-08-22'
draft = false
+++

## Fase 1: Acquisizione, Studio e Rielaborazione (Routine Giornaliera)
L'obiettivo di questa fase è fissare i concetti a caldo, svolgere il lavoro profondo e creare un archivio di base pulito.

*   **Lezione in Presenza:** Presa di appunti grezza in tempo reale (annotando sempre la data odierna sul documento).
*   **Studio e Rielaborazione Serale (Tablet):** Lo stesso giorno della lezione, revisione profonda e riscrittura ordinata degli appunti. Questa è la fase centrale di *deep work*:
    *   Studio e comprensione dei passaggi logici delle dimostrazioni risultate ostiche in classe.
    *   Svolgimento degli esercizi e dei problemi assegnati dal professore (tutto integrato nel corpo degli appunti).
    *   Riscrittura leggibile con formule allineate e struttura visiva chiara.

## Fase 2: Digitalizzazione e Formattazione (Routine del Fine Settimana)
Trasferimento del materiale dal tablet all'ambiente di sviluppo (VS Code) per l'archivio definitivo.

*   **Trascrizione LaTeX:** Passaggio degli appunti in file `.tex`.
*   **Refactoring AI:** Utilizzo di un prompt unificato per una rielaborazione velatissima del sorgente (inserimento in environment matematici, aggiunta sistematica di `\label{...}` e `\ref{...}`, correzione sintassi, senza alterare in alcun modo l'ordine logico o il senso matematico).
*   **Tagging per l'Esame:** Inserimento del tag `@anki` esclusivamente accanto ai teoremi fondamentali e alle relative dimostrazioni richieste all'orale.
*   **Version Control & CI/CD:** Push sul repository privato GitHub. GitHub Actions compila automaticamente i PDF, che rimangono archiviati nel repository privato per uso esclusivamente personale.

## Fase 3: Parsing e Memorizzazione (Routine del Fine Settimana)
Automazione totale della creazione delle flashcard tramite script Python proprietario.

*   **Routing Automatico:** Il parser scansiona i file `.tex` e genera le carte, smistandole in due mazzi Anki per ogni materia da preparare:
    1.  **Mazzo Materia:** Contiene sistematicamente tutti gli enunciati (definizioni, proposizioni, teoremi, lemmi, corollari).
    2.  **Mazzo Dimostrazioni:** Triggerato dal tag `@anki`, contiene solo i teoremi cardine e gli step logici delle dimostrazioni per l'orale.
*   **Parametri Anki:** 
    *   *Scadenza (Deadline):* Impostata alla data del primo esame comunicata dal professore.
    *   *Moltiplicatore:* Impostato a 1. L'assimilazione è garantita valutando con onestà la ritenzione del concetto durante le review quotidiane, che procedono parallelamente alle lezioni.

## Fase 4: Mantenimento a Lungo Termine (Post-Esame)
Consolidamento della mappa mentale globale e gestione dell'obsolescenza dei dati.

*   **Chiusura Materia:** A esame superato, il "Mazzo Dimostrazioni" viene eliminato (la memoria procedurale di ogni singolo step non è più necessaria).
*   **Merge Strutturale:** Il "Mazzo Materia" viene fuso all'interno di un unico master deck **Generale**.
*   **Spaced Repetition Continua:** 10 minuti di review quotidiana fissa sul mazzo Generale per mantenere attivi a lungo termine i concetti e gli enunciati di tutta la carriera universitaria.