# Router — classify, gate, execute

The always-on rule (`.cursor/rules/afro.mdc`) points here for details.

## A. Word band

Read thresholds from `knobs.md`.

| Band | Condition |
|------|-----------|
| short | ≤ Short prompt words |
| mid | between Short and Long |
| long | ≥ Long prompt words |

## B. Complexity (content — paths do not downgrade)

**Low** — all plausible:

- Single action on one known file (typo, blank line, rename, constant tweak)
- No bug, perf, refactor, feature, investigation, or verify-before-ship

**High** — any of:

- Bug, perf, refactor, migration, feature, investigation, CI/PR, architecture
- "how/why should", design fork, autonomous/long-running work
- Multi-file or unknown blast radius
- Large paste, stack trace, or `@`-attached context

**Naming a path does not lower complexity** when the task is still fix, refactor, investigate, or feature work.

**Mid** — default when unsure.

## C. Route matrix

When bands **agree**, route silently (no gate). Overrides or non-`auto` default → skip matrix.

| Word | Complexity | Route |
|------|------------|-------|
| short | low | **Ponytail-only** |
| mid | low | **Ponytail-only** |
| long | high | **Poteto** (+ ladder) |
| mid | high | **Poteto** (+ ladder) |
| short | high | **Gate** |
| long | low | **Gate** |
| mid | mid | **Gate** |

## D. QA gate

When `QA gate` is `on` in `knobs.md` and matrix says **Gate**:

1. **Turn 1:** AskQuestion only — no Read, Grep, Shell, SemanticSearch, or subagents until the user answers. Do not read pasted content, `@`-attached files, or repo paths on turn 1; classify from the user's message text and harness docs only.
2. One sentence why (~N words + complexity reason).
3. Options: **Poteto** · **Both** · **Ponytail only** (same order always).
4. **Gate once per thread** unless scope clearly escalates.
5. User ignores → default **Poteto**.

If gate is `off`: short+high → Poteto; long+low → Both; mid+mid → Poteto.

## E. Execute

### Ponytail-only

- No Poteto process or todolist.
- **Trivial cap:** ≤3 **task** tools before edit (read target → optional one grep → edit). Reads of `afro.mdc`, `knobs.md`, and `router.md` for classification do **not** count. No runbook/git dig unless edit requires it.
- **Gated fixtures:** tool counting for the ponytail cap starts **after** the user answers the gate — turn 1 is excluded entirely.
- Ladder: `ladder.md`. Proof: one smallest check if non-trivial.

### Poteto

1. Use the fuller local process: gather enough context, make a short plan when scope is unclear, and use subagents when parallel exploration or verification helps.
2. Apply `ladder.md` at implementation unless the user chose ponytail-only at gate.
3. Verify the real path affected by the change before final response.

### Both

Poteto path + ladder on every production code touch.

## F. Examples

| Prompt | Words | Complexity | Result |
|--------|------:|------------|--------|
| fix typo in README | ~4 | low | Ponytail-only |
| fix auth — tests fail on verifyToken | ~8 | high | **Gate** (path does not exempt) |
| refactor utils in src/utils.ts | ~8 | high | **Gate** |
| 220-word standup paste + one-line ladder edit | long | low | **Gate** |
| long feature spec | 250+ | high | Poteto, no gate |
