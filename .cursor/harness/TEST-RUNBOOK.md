# Harness eval — Method A (one chat per test)

**Workspace:** `Test Folder` (router: `.cursor/rules/ponytail.mdc`)

## Protocol

1. Open **Agent** → **New chat** (every test — do not reuse threads).
2. Confirm workspace root is this folder.
3. Copy **one** prompt below — nothing else in the first message.
4. Before tools run, note in scorecard: **Route stated?** **Gate?** **Correct?**
5. Let the agent finish or stop after routing if you only care about classification.
6. Next test → **New chat** again.

**Pass (routing test):** behavior matches **Expected** column.  
**Pass (full test):** routing + reasonable execution for that tier.

---

## Scorecard

| # | Expected | Gate? | Route stated? | Pass? | Notes |
|---|----------|-------|---------------|-------|-------|
| 1 | Ponytail-only | No ✓ | No | **Yes** | One grep + one edit; no poteto playbook. Didn't prefix `Route:`. Resolved `harness/README.md` → `.cursor/harness/README.md`. |
| 2 | Poteto | No ✓ | **Yes** | **Yes** | Named "test #2 / Poteto path"; read poteto-mode + Feature playbook; todos + prove (npm test/run). No gate (long+high). Built `sandbox/run-02/` TS CLI w/ boundary validation, test, README. Minor: no principle-by-name citations in reply. |
| 3 | Ponytail-only | No | | | |
| 4 | Poteto (Investigation) | No | | | |
| 5 | Gate | **Yes ✓** | **Yes** | **Yes*** | AskQuestion w/ Poteto/Both/Ponytail (recommended Poteto). *Deduction: SemanticSearch + TEST-RUNBOOK read same turn as gate — should wait for answer first. After choice: bug-fix playbook, no invented auth, correct blocker report. |
| 6 | Gate | No ✓* | No | **Yes*** | *Prompt was ~92 words (short band), not 200+ — matrix → Ponytail-only, no gate expected. One read + one edit in `ladder.md`; ignored standup noise. **Retest #6** with full runbook paste to validate long+low gate. |
| 7 | Gate | **Yes ✓** | **Yes** | **Yes** | AskQuestion only in turn 1 (no parallel tools — gate ordering fixed vs #5). User chose Poteto; Refactoring playbook; no invented `utils/`; blocker report w/ principle names. Classified short+high refactor (runbook says mid+mid — both → gate). |
| 8 | Ponytail-only (override) | No ✓ | No | **Yes** | `quick:` honored — no gate, no poteto. One StrReplace on knobs table 100→80; grep for stray `100`. Minimal diff. |
| 9 | Poteto (override) | No ✓ | Partial | **Yes*** | `poteto:` — no gate. Design + thin `.cursor/commands/review.md` → `skills/review.md`; README updated. *Deduction: didn't read poteto-mode SKILL/playbook or TodoWrite; borrowed pattern from sibling `Cursor-Maxxing`. Deliverable is solid YAGNI split. |
| 10 | Both + review skill | No | | | |

---

## Prompts (copy one per new chat)

### 1 — Short + low

```
Fix the typo in harness/README.md: change "do not guess" to "don't guess".
```

### 2 — Long + high

```
Add a small CLI in sandbox/run-02/ that reads a JSON file, validates email fields with proper trust-boundary checks, and prints invalid rows. Include one runnable test and a README with usage. Use TypeScript if you need a language.
```

### 3 — Mid + low

```
In .agents/README.md, add a blank line after the Policy table for readability.
```

### 4 — Mid + high (investigation)

```
Why does our harness have both .cursor/harness/skills/review.md and .agents/skills/find-skills? Explain how they differ and whether we should merge them.
```

### 5 — Short + high (should gate)

```
fix auth
```

### 6 — Long + low (should gate)

Paste this entire block as one message:

```
Team sync notes — sprint 14

Alice: standup at 9, retro moved to Thursday. Bob: CI green on main but flaky on Windows runners. Carol: lunch at noon, design review for onboarding flow. Dave: vacation next week. Erin: dependency audit scheduled, no action items for harness work. Frank: please stop using "util" as a folder name. Grace: documentation debt on internal wiki.

Parking lot: coffee machine, badge access, nothing about code.

Anyway, the only thing I need: in harness/ladder.md, change "YAGNI" to "you aren't gonna need it" once in the first bullet.
```

### 7 — Mid + mid (should gate)

```
refactor utils
```

### 8 — Override quick

```
quick: bump the Short prompt words knob from 100 to 80 in ponytail.mdc
```

### 9 — Override poteto

```
poteto: design how we should add a /review slash command to this harness, then implement the thinnest version.
```

### 10 — Override both + review

Run after you have any uncommitted diff (e.g. after test 1 or 8).

```
both: review the current diff for over-engineering using our harness review skill. Don't apply fixes, only the delete-list.
```

---

## Optional — skills layer (new chat)

```
find a skill for systematic debugging — project-local only, don't use -g. Recommend one and wait for my OK before installing.
```

Expect: harness find-skills path, no `-g`, `--agent cursor` in install command.

---

## After all 10

- **≥7/10 routing correct** → harness works; tune knobs in `ponytail.mdc`.
- **Gates on 1–4** → gate too aggressive; raise Short/Long thresholds or set QA gate `off`.
- **Never gates on 5–7** → agent skipping Step 0; add first-line `Route: …` requirement to MDC.
- **8–10 gate anyway** → override detection broken; check exact trigger words.

Revert test edits when done: `git checkout -- .` or undo from test 8's knob change if you kept it.
