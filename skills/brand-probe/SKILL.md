---
name: brand-probe
description: "Probe a brand book against a control run. Use when a brand book must be tested before acceptance or after a change, or someone asks whether it works."
---

# Brand Probe

Find out what the book changes in an agent's work, by comparing each real task done with the book against a **control** done without it. Done when each task has its runs and a `report.md` with the current `book-hash`.

You **observe**: leave the book and the runs as they are, because a run that went badly is the finding and `brand-book` makes the fixes.

Run `node brand/tools/brand.mjs status`. Test `brand/work/candidate/` if it exists, otherwise `brand/`, and note the `book-hash` it prints. If the candidate has errors, hand off to `brand-book`; if there is no book, to `brandfile`.

## Tasks

If `probes/` in the book's folder already holds tasks, keep them, so versions stay comparable. Where a report is missing or carries another hash, rerun the with-book run and the report; the control does not depend on the book.

Otherwise take two or three real tasks from "Readers and work" in `brand/work/brief.md`, or from `{#start}` in the book once the brief is archived; if neither names one, ask the person. Word each as they would ask for it, with no brand rules in it, and pick tasks whose result is a page or a text.

Add one **gap task**: something real the book does not cover. It shows whether an agent says the book has no answer or fills the gap with fashion.

Save each as `probes/<task-id>/task.md` in the book's folder.

## Runs

You have read the book and the brief, so give every run to a new subagent with its [run brief](references/run-briefs.md). Without subagents, ask the person to paste each brief into a new session, and continue once the files exist.

Each real task runs twice: with the book and as the control. The gap task runs only with the book. The folders are not sealed, so each run replies with the files it opened: run again any run that opened a file its brief does not allow.

## Report

For each task, a new subagent writes `probes/<task-id>/report.md` from the [report brief](references/run-briefs.md#report).

## Hand back

Run `node brand/tools/brand.mjs build` so the runs appear side by side on the page. For a candidate, hand off to `brand-book`. For an accepted book, tell the person what strayed and what the book changed, and name the page. Report only what you saw: a few tasks on one brand catch failures and prove nothing general.
