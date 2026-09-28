# Architecture self-review

Task xdx-supplier-core-restart-20260928. Recommendation: one workflow and one native app; dedicated resource BOs isolate contracts. Accuracy precedes speed. Rejected wholesale reuse because user requested fresh restart; retain verified tooling and business receipts only. A separate pass-through workflow adds lifecycle ambiguity without an independent responsibility.

One owner each: request/draft deterministic code; BO operation owns HTTP; result normalizer owns data shape; terminal owns widget. Every Query path terminates without HUMAN/WAIT. Supplier-number resolution precedes child URLs. Header4 applies to all filtered GETs, duplicate preflights and BU lookup. Paging commands carry verified position/filter when cross-stage state is unavailable. Error paths preserve reserved/uncertain attempts; no silent retry.

Self-review status: design reviewed against eight requirements and canonical lessons. Runtime persistence, native rendering, real saved bindings and configured judgments remain pending. No broad concurrency/atomicity claim. No additional framework or test scenarios beyond approved requirement manifest.
