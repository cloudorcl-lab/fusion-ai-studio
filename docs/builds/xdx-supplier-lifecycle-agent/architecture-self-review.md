# Architecture Self-Review

Planning review: PASS for the proposed boundaries, not runtime proof. See requirement-slice-register.md for outcome/phase mapping and golden-path-test-manifest.md for routes, terminal owners and acceptance.

- One root workflow owns state and conversation; BOs own API functions; deterministic gate owns POST. No competing form-state implementation.
- Human pauses stay at root; wrapper choice is an explicit P1 capability gate. A missing Ask Oracle contract blocks runtime expansion, not an excuse for a replacement UI.
- Source contract, writable allowlist, parent scope, exact approval and persisted verification are mandatory per object.
- Supplier -> address -> dependent site is sequential. Contacts depend on supplier. No speculative parallel writes.
- P0 inventories all children; P8 expands only contract-ready resources. Unknown endpoints/requiredness are explicit preimplementation tasks, not guessed schemas.
- Conversation variable persistence and concurrent-submit protection are unproven; P1 gates writes and must resolve these limitations.
- Reused BO identities retain downstream compatibility; baseline snapshots are evidence only.
- Scope excludes PDF/email, account provisioning, Visual Builder and GitHub publication.
- Inline execution: phases share state/owners and must be sequential. No subagent delegation required.
