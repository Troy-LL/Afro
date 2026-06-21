# ponytail-review (Cursor harness)

Over-engineering review of the **current diff**. Lists cuts; does not apply them.
Correctness, security, and perf are out of scope — route those to normal review.

## Format

One line per finding:

`L<line>: <tag> <what>. <replacement>.` or `<file>:L<line>: ...` for multi-file.

## Tags

- `delete:` — dead code, unused flexibility. Replacement: nothing.
- `stdlib:` — hand-rolled thing stdlib ships. Name the function.
- `native:` — dep/code the platform already covers. Name the feature.
- `yagni:` — abstraction with one impl, config nobody sets, layer with one caller.
- `shrink:` — same logic, fewer lines. Show shorter form.

## End

`net: -<N> lines possible.` or `Lean already. Ship.`

## Examples

✅ `L12-38: stdlib: 27-line validator. "@" in email, 1 line; real validation is the confirmation mail.`

✅ `L4: native: moment.js for one format. Intl.DateTimeFormat, 0 deps.`

Do not flag ponytail minimum smoke tests or assert self-checks for deletion.
