# Fixture app (harness eval target)

Minimal app code for **real** poteto/ponytail tests — not the harness meta layer.

| Path | Purpose |
|------|---------|
| `src/auth.ts` | Token verification (contains an intentional bug for test #5) |
| `src/utils.ts` | Grab-bag helpers (refactor target for test #7) |
| `src/index.ts` | Wires auth + utils |
| `src/app.test.ts` | Runnable check (`npm test`) |

## Run

```bash
cd sandbox/fixture-app
npm install
npm test
```

## Known eval scenarios

- **fix auth** → `verifyToken` must reject invalid tokens (see test #5 in `TEST-RUNBOOK.md`)
- **refactor utils** → split or simplify `src/utils.ts` without changing behavior (test #7)
