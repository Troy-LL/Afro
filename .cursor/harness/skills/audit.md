# ponytail-audit (Cursor harness)

Whole-repo over-engineering scan. Same tags as `review.md`; ranked biggest cut first.

## Hunt for

- Deps stdlib/platform already ship
- Single-implementation interfaces, factories with one product
- Wrappers that only delegate, files exporting one thing
- Dead flags/config, hand-rolled stdlib

## Output

`<tag> <what to cut>. <replacement>. [path]` — ranked.

End: `net: -<N> lines, -<M> deps possible.` or `Lean already. Ship.`

Lists only; applies nothing. One-shot report.
