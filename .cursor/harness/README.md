# Agent harness — reference index

Context library for this workspace. The router lives in `.cursor/rules/ponytail.mdc`.
Read this file when you need a skill, audit procedure, or canonical wording — don't guess.

## When to open what

| User intent | Read |
|-------------|------|
| Route / classify / QA gate | `.cursor/rules/ponytail.mdc` |
| Full workflow, playbooks, subagents | `poteto-mode` skill (path below) |
| Canonical ponytail ladder (wording sync) | `ladder.md` |
| Review diff for over-engineering | `/review` or `skills/review.md` |
| Audit whole repo for bloat | `skills/audit.md` |
| List `ponytail:` deferred shortcuts | `skills/debt.md` |
| Find / install ecosystem skills | `skills/find-skills.md` → `.agents/skills/find-skills/` |
| Curated install list for this stack | `skills/RECOMMENDED.md` |
| Local skills policy | `.agents/README.md` |
| **Eval runbook (Method A)** | `TEST-RUNBOOK.md` |
| Upstream ponytail source (sync, diff) | `../ponytail/` clone + `upstream.md` |

## Poteto mode (process layer)

**Path:** `C:\Users\admin\.cursor\plugins\cache\cursor-public\pstack\e46364b8be46000b7df0f260550cd712afbb8d36\skills\poteto-mode\SKILL.md`

Invoke: `/poteto-mode` or user says `poteto` / `full process`. Playbooks live under `poteto-mode/playbooks/`.

## Ponytail skills (simplicity layer)

Slash commands live in `.cursor/commands/`; procedures stay in `skills/` below.

| Invoke | Trigger phrases | Procedure |
|--------|-----------------|-----------|
| `/review` | review, over-engineered, what can we delete, simplify review | `skills/review.md` |
| audit codebase, find bloat, ponytail-audit | `skills/audit.md` |
| ponytail debt, list shortcuts, ponytail ledger | `skills/debt.md` |
| find a skill, skills.sh, install skill | `skills/find-skills.md` |
| what skills fit this harness | `skills/RECOMMENDED.md` |

## Maintenance

- **Ladder text:** keep `ladder.md` aligned with `ponytail/skills/ponytail/SKILL.md` when upstream updates.
- **Review/audit/debt:** adapted from upstream `ponytail/skills/`; diff there before editing here.
- **Router knobs:** edit only `ponytail.mdc`, not this README, unless adding new harness entries.
