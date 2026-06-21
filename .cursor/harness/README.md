# Agent harness — reference index

Context library for this workspace. The router lives in `.cursor/rules/ponytail.mdc` (short); details in `router.md` and `knobs.md`.
Read this file when you need a skill, audit procedure, or canonical wording — don't guess.

## When to open what

| User intent | Read |
|-------------|------|
| Route / classify / QA gate | `router.md` + `knobs.md` |
| Tune thresholds | `knobs.md` |
| Full workflow, playbooks, subagents | Invoke **`/poteto-mode`** (pstack skill) |
| Canonical ponytail ladder | `ladder.md` |
| Review diff for over-engineering | `/review` or `skills/review.md` |
| Audit whole repo for bloat | `skills/audit.md` |
| List `ponytail:` deferred shortcuts | `skills/debt.md` |
| Find / install ecosystem skills | `skills/find-skills.md` → `.agents/skills/find-skills/` |
| Curated install list | `skills/RECOMMENDED.md` |
| Local skills policy | `.agents/README.md` |
| Upstream ponytail (sync only) | `upstream.md` → optional local `ponytail/` clone |

## Ponytail skills (simplicity layer)

| Invoke | Trigger phrases | Procedure |
|--------|-----------------|-----------|
| `/review` | review, over-engineered, simplify review | `skills/review.md` |
| (chat) | audit codebase, find bloat | `skills/audit.md` |
| (chat) | ponytail debt, list shortcuts | `skills/debt.md` |
| (chat) | find a skill, skills.sh | `skills/find-skills.md` |

## Maintenance

- **Knobs:** `knobs.md` only (not the MDC).
- **Router logic:** `router.md` + slim `ponytail.mdc`.
- **Ladder:** sync with `ponytail/skills/ponytail/SKILL.md` when upstream updates.

