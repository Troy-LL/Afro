# Project skills (local only)

Skills for **this workspace only**. They appear in Cursor's **Agents** tab under this project.

## Policy

| Rule | Detail |
|------|--------|
| **Install location** | `.agents/skills/<name>/` only |
| **Never global** | Do **not** use `-g` / `--global` on `npx skills add` |
| **Run from repo root** | `cd` to workspace root before `npx skills add` |
| **Lock file** | `skills-lock.json` at repo root tracks installed skills |
| **Updates** | `npx skills update -p -y` (project only, not `-g`) |
| **Agent scope** | Prefer `--agent cursor` so installs don't fan out to 15 agents |

## Install command (template)

```bash
npx skills add <owner/repo@skill> -y --agent cursor
```

## Do not use in this project

- `~/.cursor/skills/` (global user skills — other projects' bloat)
- `npx skills add ... -g`
- `npx skills update -g`

The router (`.cursor/rules/afro.mdc`) forbids loading skills outside this tree unless the user explicitly invokes a plugin skill (e.g. `/poteto-mode`).

## Installed

| Skill | Path |
|-------|------|
| find-skills | `.agents/skills/find-skills/` |

After adding a skill: update this table, `skills-lock.json` (via CLI), `.cursor/harness/README.md`, and optionally `harness/skills/RECOMMENDED.md`.
