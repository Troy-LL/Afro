# Harness eval — Method A (one chat per test)

**Workspace:** `Test Folder` (router: `.cursor/rules/ponytail.mdc`)

## Path B — git + fixture app

This repo has a **baseline commit** and a tiny app at `sandbox/fixture-app/` so tests aren't thin air.

| Asset | Purpose |
|-------|---------|
| `git` | `/review`, test #10, and diffs — baseline committed; changes show in `git diff` |
| `sandbox/fixture-app/` | Real auth bug + utils module for tests #5, #7 |
| `.gitignore` | Excludes `ponytail/` clone and `node_modules/` |

**Git:** if dubious ownership, use `git -c safe.directory=<absolute repo root>` before diff/status (see `review.md`).

**Fixture smoke test** (should fail until auth is fixed):

```powershell
cd sandbox/fixture-app
node --experimental-strip-types --test src/app.test.ts
```

---

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
| 1 | Ponytail-only | No ✓ | **Yes** (v3) | **Yes** | **v3 rerun (`a7aec05a`):** seeded typo; `Route:` first line; 2 task tools (read+grep→edit); fixed L4. |
| 2 | Poteto | No ✓ | **Yes** | **Yes** | Named "test #2 / Poteto path"; read poteto-mode + Feature playbook; todos + prove (npm test/run). No gate (long+high). Built `sandbox/run-02/` TS CLI w/ boundary validation, test, README. Minor: no principle-by-name citations in reply. |
| 3 | Ponytail-only | No ✓ | **Yes** (v3) | **Yes** | **v3 (`2b8d30f5`):** `Route:` first line; 1 task tool (target read); blank line already present. Trivial-cap tweak works. |
| 4 | Poteto (Investigation) | No ✓ | **Yes** (v3) | **Yes** | **v3 (`e931f274`):** `Route: poteto` first line; clear layer explanation; merge = no. |
| 5 | Gate | **Yes** (v2) | **Yes** (v2) | **Yes** | **v2 retest (`d5eb2a95`):** short+high → gate turn 1; `Route: gate`; AskQuestion only. Fixes Path B routing miss. |
| 6 | Gate | **Yes** (v2) | **Yes** (v2) | **Yes** | **v2 retest (`7f644f2d`):** 209 words, long+low → gate; `Route: gate`; AskQuestion only. `prompts/test-06-long-low.md` works. |
| 7 | Gate | **Yes** (v2) | **Yes** (v2) | **Yes** | **v2 retest (`e2b76b96`):** short+high refactor → gate; `Route: gate`; AskQuestion only. Fixes Path B routing miss. |
| 8 | Ponytail-only (override) | No ✓ | **Yes** (v3) | **Yes** | **v3 (`a291f5fd`):** `Route:` first line; `quick:` honored; knob 100→80 applied then **reverted to 100** post-eval. |
| 9 | Poteto (override) | No ✓ | Partial | **Yes*** | `poteto:` — no gate. Design + thin `.cursor/commands/review.md` → `skills/review.md`; README updated. *Deduction: didn't read poteto-mode SKILL/playbook or TodoWrite; borrowed pattern from sibling `Cursor-Maxxing`. Deliverable is solid YAGNI split. |
| 10 | Both + review skill | No ✓ | Partial | **Yes** | **Path B (`5e9739fe`):** `both:` no gate; loaded `review.md`, safe.directory git diff, delete-list format, `net: -17 lines`, no edits applied. Found dead utils exports from #7 refactor. |

---

## Prompts (copy one per new chat)

### 1 — Short + low

```
Fix the typo in harness/README.md: change "do not guess" to "don't guess".
```

**Eval seed:** baseline has correct wording — temporarily change line 4 in `.cursor/harness/README.md` to `do not guess` before running test #1.

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
fix auth in sandbox/fixture-app — npm test is failing on verifyToken
```

### 6 — Long + low (should gate)

Copy the full prompt from **`prompts/test-06-long-low.md`** (~210 words). Do not use the short standup-only version — it is under 200 words and will not trigger the gate.

### 7 — Mid + mid (should gate)

```
refactor utils in sandbox/fixture-app/src/utils.ts — same behavior, clearer structure
```

### 8 — Override quick

```
quick: set Short prompt words to 80 in harness/knobs.md
```

### 9 — Override poteto

```
poteto: design how we should add a /review slash command to this harness, then implement the thinnest version.
```

### 10 — Override both + review

Run after you have uncommitted changes (`git diff` non-empty). Make a small edit first, or use diff since baseline.

```
both: review the current diff for over-engineering using our harness review skill. Don't apply fixes, only the delete-list.
```

Or invoke **`/review`** in Agent chat (same procedure via `.cursor/commands/review.md`).

---

## Optional — skills layer (new chat)

```
find a skill for systematic debugging — project-local only, don't use -g. Recommend one and wait for my OK before installing.
```

Expect: harness find-skills path, no `-g`, `--agent cursor` in install command.

---

## After all 10

- **≥7/10 routing correct** → tune `knobs.md`, not the MDC.
- **Gates on 1–4** → raise Short/Long thresholds or set QA gate `off` in `knobs.md`.
- **Never gates on 5–7** → confirm `router.md` §B (paths don't downgrade) + gate turn-1 rule.
- **No `Route:` first line** → router rule § first line in `ponytail.mdc`.
- **8–10 gate anyway** → override detection broken; check trigger words in `knobs.md`.

Revert test edits when done: `git -c safe.directory=<repo> checkout -- .`

---

## v2 post-tweak retests (2026-06-21)

Subagent simulators (Method A turn 1) after slim MDC + router §B path-no-downgrade tweak:

| # | Agent | Result |
|---|-------|--------|
| 5 | [d5eb2a95](d5eb2a95-e4f7-42f9-880c-74811108cc77) | **Pass** — gate, AskQuestion only |
| 6 | [7f644f2d](7f644f2d-9113-440c-9546-6b1d696c17e4) | **Pass** — 209 words, gate |
| 7 | [e2b76b96](e2b76b96-d29d-421e-928f-5c3d6b06c271) | **Pass** — gate on refactor |
| 3 | [6c4e2fc0](6c4e2fc0-ae6e-4366-87c6-136fba076b69) | **Pass*** — ponytail-only, no gate; 4 tools (harness reads) |

**Routing score (retested): 4/4 correct.** Remaining gap: test #3 still over-tools when harness reads are counted.

---

## v3 polish (2026-06-21)

**Harness tweak:** trivial ≤3 cap excludes classify reads (`ponytail.mdc`, `knobs.md`, `router.md`) — see `router.md` §E and `ponytail.mdc` rule 4.

| # | Agent | Result |
|---|-------|--------|
| 1 | [1a58027a](1a58027a-8f0d-4331-9fad-ac8acc23d5d5) | **Mixed** — `Route:` ✓; process over-tools (git) |
| 1 rerun | [a7aec05a](a7aec05a-66b7-42f1-af3d-46c55ca49ee6) | **Pass** — seeded typo; 2 task tools |
| 3 | [2b8d30f5](2b8d30f5-2989-45c8-8c06-507d6b1280d3) | **Pass** — 1 task tool |
| 4 | [e931f274](e931f274-68d9-456d-ba5f-c43b5e286a01) | **Pass** — `Route: poteto` first line |
| 8 | [a291f5fd](a291f5fd-26b5-48ba-9614-930c58e92faf) | **Pass** — `Route:` + `quick:` override |

**`Route:` compliance: 4/4.** **Overall harness grade: A** (routing 10/10; `Route:` compliance; trivial cap fixed; test #1 passes with typo seed).
