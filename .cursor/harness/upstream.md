# Upstream ponytail clone

**Path:** `ponytail/` (repo root, sibling to `.cursor/`)

This workspace keeps a shallow clone of [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) as reference — not loaded at runtime by Cursor.

## Use the clone for

- Diffing ladder/skills when upstream releases
- `ponytail/skills/*` full skill text
- `ponytail/docs/agent-portability.md` — official adapter map
- `ponytail/examples/` — before/after over-build traps
- `ponytail/benchmarks/` — measured impact data

## Use `.cursor/harness/` for

- Cursor-adapted skills the agent should load during work
- Index and pointers (this harness)
- Wording you have customized for poteto integration

**Rule of thumb:** edit harness for Cursor behavior; pull from `ponytail/` when syncing from upstream.
