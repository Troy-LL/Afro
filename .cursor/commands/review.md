# Ponytail review — over-engineering diff

Review the **current diff** for over-engineering only. Lists cuts; do not apply them.

## Steps

1. Read `.cursor/harness/skills/review.md` and follow its format and tags exactly.
2. Run `git diff` and `git diff --staged`. If both empty, say there is no diff to review and stop.

If `git` reports dubious ownership, retry with `git -c safe.directory=<absolute repo root> diff` (same for `--staged`).
3. Output findings only — no edits, no commits.

## Output

Per the skill: one line per finding, then `net: -<N> lines possible.` or `Lean already. Ship.`
