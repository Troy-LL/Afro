# Recommended skills for this harness

Curated via [find-skills](https://skills.sh/vercel-labs/skills/find-skills) for a **poteto + ponytail + Cursor harness** stack. **Project-local installs only** — run from repo root, never `-g`.

## Already in this project

| Skill | Where | Role |
|-------|-------|------|
| **find-skills** | `.agents/skills/find-skills/` | Discover/install more skills (local) |
| **poteto-mode** | pstack plugin (invoke explicitly) | Process, playbooks, subagents |
| **Harness adapters** | `.cursor/harness/skills/` | Review, audit, debt, find-skills |

Not loaded from `~/.cursor/skills/` (global) in this workspace.

## Strong fits (install candidates)

Run from workspace root. **No `-g`.**

### Verification & debugging (pairs with poteto **Prove It Works**)

| Skill | Installs | Install |
|-------|----------|---------|
| [verification-before-completion](https://skills.sh/obra/superpowers/verification-before-completion) | 116K+ | `npx skills add obra/superpowers@verification-before-completion -y --agent cursor` |
| [systematic-debugging](https://skills.sh/obra/superpowers/systematic-debugging) | 153K+ | `npx skills add obra/superpowers@systematic-debugging -y --agent cursor` |

### Refactoring (pairs with ponytail review + poteto Refactoring playbook)

| Skill | Installs | Install |
|-------|----------|---------|
| [request-refactor-plan](https://skills.sh/mattpocock/skills/request-refactor-plan) | 63K+ | `npx skills add mattpocock/skills@request-refactor-plan -y --agent cursor` |
| [refactor](https://skills.sh/github/awesome-copilot/refactor) | 18K+ | `npx skills add github/awesome-copilot@refactor -y --agent cursor` |

### Harness authoring (extend `.cursor/harness/`)

| Skill | Installs | Install |
|-------|----------|---------|
| [skill-creator](https://skills.sh/anthropics/skills/skill-creator) | official | `npx skills add anthropics/skills@skill-creator -y --agent cursor` |

Search skills.sh leaderboard first — install counts change.

## Probably skip (overlap or wrong tier)

| Skill | Why |
|-------|-----|
| Generic agent-workflow packs (<2K installs) | You already have poteto-mode + custom router |
| alinaqi/code-review | Correctness review; you have harness `review.md` for over-engineering |
| Duplicate ponytail installs | Your harness + clone already cover the ladder |

## Search again anytime

```bash
npx skills find "your topic"
```

Or ask: **"find a skill for X"** — agent loads `skills/find-skills.md` and follows the workflow.
