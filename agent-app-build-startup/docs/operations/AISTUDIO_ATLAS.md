# AI Studio and ATLAS Execution Rules

1. Read `.agents/skills/aistudio/SKILL.md` before AI Studio planning or local artifact work. Read only the relevant bundled prompt references.
2. Resolve the target project/package layout before creating artifacts. If more than one app package exists, request the package named in the current task.
3. Invoke the bundled CLI from the project root: `node .agents/skills/aistudio/scripts/aistudio.js <command>`.
4. Validate and save one materially changed artifact before test sync. Treat a successful server-normalized DRAFT as the local source of truth.
5. Use the focused ATLAS sync plan as the test next-action source. Complete one approved action, refresh the plan, and do not run a canonical suite while in-scope create/update actions remain. Resolve required judges before acceptance; use the canonical Gate 6 scoped completion rule for outside-scope suggestions.
6. Omit `--evaluation-mode` and `--judge-provider` for ordinary configured-mode test runs. Never use remote judging or model optimization without explicit user approval.
7. Keep `.debug/` as temporary scratch; durable tests and reports are the source-controlled test paths and final summaries.
