# Afro

Cursor agent harness — **ponytail** simplicity at implementation, **poteto** process when the job warrants it.

Copy `.cursor/` into a project (or open this repo as the workspace).

## Layout

| Path | Role |
|------|------|
| `.cursor/rules/afro.mdc` | Always-on router — classify, gate, route |
| `.cursor/harness/knobs.md` | Tunable thresholds (word bands, QA gate) |
| `.cursor/harness/router.md` | Routing matrix and execution tiers |
| `.cursor/harness/ladder.md` | Implementation ladder (YAGNI → minimum that works) |
| `reference/` | Session memory — prompt counter, steering docs, commit drafts (`reference/AGENT.md`) |

## Quick tuning

Edit **`.cursor/harness/knobs.md`** — short/long word bands, QA gate on/off, default route.

## Overrides (in any prompt)

| Say | Effect |
|-----|--------|
| `quick`, `ponytail only` | Ponytail-only, no gate |
| `poteto`, `full process` | Fuller local process |
| `both`, `full stack` | Poteto + ladder on every edit |

Every agent reply starts with `Route: …` — see `afro.mdc`.

## Upstream

Ponytail reference sync: `.cursor/harness/upstream.md` (optional local `ponytail/` clone, gitignored).

## Futures

External integration packs are intentionally not part of the active harness. Track them outside `Afro/` in `../Futures/` until they have a routable, testable design.
