# find-skills (Cursor harness)

Discover and install skills from the open ecosystem. Full skill: `.agents/skills/find-skills/SKILL.md`.

**Browse:** [skills.sh](https://skills.sh/)

## Local-only policy

This project installs skills **only** under `.agents/skills/`. Never global.

| Do | Don't |
|----|-------|
| `npx skills add <pkg@skill> -y --agent cursor` from repo root | `-g` / `--global` |
| `npx skills ls` | `npx skills ls -g` |
| `npx skills update -p -y` | `npx skills update -g` |
| Read `.agents/skills/*` | Read `~/.cursor/skills/` |

See `.agents/README.md` for the full policy.

## When to use

- User asks "find a skill for X", "is there a skill for…", "how do I do X" (common task)
- Extending the harness with new procedures
- Before authoring a custom harness skill — check if one exists

## Workflow

1. **Leaderboard first** — [skills.sh](https://skills.sh/) for popular/battle-tested options
2. **Search** — `npx skills find [query]` from **workspace root**
3. **Verify** — prefer 1K+ installs; official sources; check repo stars
4. **Present** — name, installs, **project-local** install command, skills.sh link
5. **Install** (if user approves):

```bash
npx skills add <owner/repo@skill> -y --agent cursor
```

6. **Register** — update `.agents/README.md`, `.cursor/harness/README.md`, optionally `RECOMMENDED.md`

## Harness integration

After installing, add a thin adapter in `harness/skills/<name>.md` if the agent needs a local pointer beyond `.agents/skills/`.
