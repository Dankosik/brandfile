# Run Briefs

Give these as they are, filling in the angle brackets, each to a new subagent or a new session. `<book>` is the folder under test, `brand/work/candidate` or `brand`; paths are from the project root.

## Task run

One brief for both runs, so the only difference between them is access to the book. `<run>` is `with` or `without`, and:

- with the book, `<out>` is `<book>/probes/<task-id>` and `<access>` is `Read <book>/BRAND.md first and follow it. You may also open files in <book>/assets/. Open nothing else in the project: no other files under brand/, no source code, no AGENTS.md or CLAUDE.md.`
- for the control, `<out>` is a new empty folder outside the project, so the path does not reveal the book, and `<access>` is `Open no file in this project, including AGENTS.md and CLAUDE.md.` Move its result into `<book>/probes/<task-id>/` afterwards.

```text
Do this task. <access>

Task:
<the text of task.md>

Write the result to <out>/<run>.html if it is a page or interface, in plain HTML and CSS with
no scripts and no external files, or to <out>/<run>.md if it is text. Use real values and content, not
placeholders. Leave your choices unexplained, in the file and in the reply.

When you finish, reply with only the list of files you opened.
```

## Report

```text
Check one task's results against a brand book. Write only the report.

Read <book>/BRAND.md, and in <book>/probes/<task-id>/ read task.md and the with and without files.

Write <book>/probes/<task-id>/report.md, in the language of the book, with this header and three short sections:

---
book: <book-hash>
date: <today>
---

Where it strays. Each point names the rule or id in the book and quotes what the output did. Measure instead of
trusting impressions: list the colors, fonts, and sizes actually in the file and compare them with the book's tables,
and search the text for forms the book forbids. Say so if something the book decides was left blank. If nothing
strays, say what you checked. <For the gap task only: This task is outside the book. Say whether the agent stated
that the book has no answer, and what it filled the gap with.>

What the book changed. Compare with the run without it: structure, values, words. If there is little difference,
say so plainly, because that is the most important finding a probe can make.

For the person to judge. What cannot be measured: whether this is recognizably their brand and whether the tone fits.
Put each as a question about fit, and leave it unanswered.

Describe only: give no scores, grades, overall verdict, or opinion on beauty.

When you finish, reply with only the path of the report.
```
