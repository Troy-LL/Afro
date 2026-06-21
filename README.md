# Afro

Cursor agent harness — **ponytail** simplicity at implementation, **poteto** process when the job warrants it.

Copy `.cursor/` and `.agents/` into a project (or open this repo as the workspace).

## Layout

| Path | Role |
|------|------|
| `.cursor/rules/ponytail.mdc` | Always-on router — classify, gate, route |
| `.cursor/harness/knobs.md` | Tunable thresholds (word bands, QA gate) |
| `.cursor/harness/router.md` | Routing matrix and execution tiers |
| `.cursor/harness/ladder.md` | Implementation ladder (YAGNI → minimum that works) |
| `.cursor/harness/skills/` | Review, audit, debt, find-skills adapters |
| `.cursor/commands/review.md` | `/review` slash command |
| `.agents/skills/` | Project-local skills (never install with `-g`) |

## Quick tuning

Edit **`.cursor/harness/knobs.md`** — short/long word bands, QA gate on/off, default route.

## Overrides (in any prompt)

| Say | Effect |
|-----|--------|
| `quick`, `ponytail only` | Ponytail-only, no gate |
| `poteto`, `/poteto-mode` | Full poteto playbooks |
| `both`, `full stack` | Poteto + ladder on every edit |

Every agent reply starts with `Route: …` — see `ponytail.mdc`.

## Upstream

Ponytail reference sync: `.cursor/harness/upstream.md` (optional local `ponytail/` clone, gitignored).
