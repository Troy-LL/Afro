# ponytail-debt (Cursor harness)

Harvest every `ponytail:` comment into a ledger. Read-only unless user asks to write a file.

## Scan

Grep repo (skip `node_modules`, `.git`, build output):

`grep -rnE '(#|//) ?ponytail:' .`

## Output row

`<file>:<line>, <what was simplified>. ceiling: <limit>. upgrade: <trigger to revisit>.`

Comments with no upgrade trigger → tag `no-trigger` (rot risk).

End: `<N> markers, <M> with no trigger.` or `No ponytail: debt. Clean ledger.`

Optional persist: write `PONYTAIL-DEBT.md` when user asks.
