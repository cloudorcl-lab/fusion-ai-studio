# Active Handoff

- Current objective: review the proposed XDX Supplier Workspace app plan and reusable build prompt; implementation has not started.
- Repository: C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1; branch TestingWFBuildTools. No push authorized.
- Canonical owner: docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md. Read this handoff first, then the full canonical, object registry and matching references before new work.
- [Proposed plan](../builds/xdx-supplier-information/xdx_supplier_workspace_plan.md) and [build prompt](../builds/xdx-supplier-information/xdx_supplier_workspace_build_prompt.md).
- Objective: query suppliers/addresses/sites/contacts; create parent and/or children; GET-verify and display complete authorized data; download PDF; send summary email. User confirmed email SUMMARY IN BODY ONLY, no attachment. PDF is a separate download.
- Proposed design: Agent Studio web app reusing XDX_SUPPLIER_INFORMATION. Native PDF download and actual approved email channel still require capability proof. Planning documents do not authorize live writes, sends, publication or push.
- Next: review intake/design assumptions. After scope approval follow new-app startup from committed governance, new branch codex/xdx-supplier-workspace, worktree .worktrees/xdx-supplier-workspace and fresh run. Use current session-gate arguments; do not overwrite governance with an older seed.
- Existing source BO: src/businessObjects/xdx_supplier_information.bo, seven GET/four POST functions. Source-API evidence is not remote BO/app/runtime proof.
- Retained [1497 child evidence](../builds/xdx-supplier-information/xdx_1497_children.md): supplier 300000333813822, address 300000333813850, site 300000333813859, contact 300000333813861. Last verified parent type Supplier/SUPPLIER; all 20 intended child fields matched POST/GET. No live refresh in planning. Prior commit 9beb503. Earlier empty-child receipts remain historical. Supplier 1496 is a separate retained test record.
- Current [session receipt](../builds/xdx-supplier-information/xdx_session_01a0b110-d7b6-7580-acd7-13938dd0c04b.json), [time tracker](../builds/xdx-supplier-information/time-tracker.md), [intake/learning register](../builds/xdx-supplier-information/intake-and-learning-register.md). Every new session/material task needs its own identity and Startup/Closeout receipt. Current cutoff excludes commit/final-response tail; recover later from session metadata.
- Planning found no new reusable policy change. No app/BO code changes or live calls/sends were made. Locate planning commit by subject "Plan supplier workspace and summary email flow".
- Preserve unrelated docs/agent-app-build-install-packet.zip, env.properties, fusion-ai-studio-1.code-workspace and docs/TODO.md.
- Communication: terse, direct, professional.
