# Architecture Self-Review

Planning review: PASS for the proposed boundaries, not runtime proof. See requirement-slice-register.md for outcome/phase mapping and golden-path-test-manifest.md for routes, terminal owners and acceptance.

- One root workflow owns state and conversation; BOs own API functions; deterministic gate owns POST. No competing form-state implementation.
- Human pauses stay at root; wrapper choice is an explicit P1 capability gate. A missing Ask Oracle contract blocks runtime expansion, not an excuse for a replacement UI.
- Source contract, writable allowlist, parent scope, exact approval and persisted verification are mandatory per object.
- Supplier -> address -> dependent site is sequential. Contacts depend on supplier. No speculative parallel writes.
- P0 inventories all 22 child rows (three core plus 19 additional) in resource-inventory.md. Explicit user scope excludes every DFF, every attachment, payment behavior and third-party payment relationships. P8 contains four ordinary create resources and five read routes.
- Enabled create payloads contain required business fields only. Optional source fields are neither inherited nor submitted; user-supplied optional values require a future scope change.
- Conversation variable persistence and concurrent-submit protection are unproven; P1 gates writes and must resolve these limitations.
- Reused BO identities retain downstream compatibility. Current server ETag8 added 20 functions beyond the ETag2 plan snapshot; adoption is server-to-local, never an overwrite of newer remote work. Baseline/current snapshots are evidence only.
- Ask Oracle uses an Agentic App `queryAgent` and a dedicated `Query` path; a debug-chat run cannot satisfy the signed-in UI gate.
- Scope excludes PDF/email, account provisioning, Visual Builder and GitHub publication.
- Inline execution: phases share state/owners and must be sequential. No subagent delegation required.
