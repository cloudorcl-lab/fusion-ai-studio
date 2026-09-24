# P6 acceptance

Accepted: one live site POST plus independent persisted GET and native readback. Site300000333814344 under supplier1505 /300000333814329, XDX SITE Retry 20260923 A, BU300000046987012 / US1 Business Unit, address XDX HQ Retry 20260923 A /300000333814336, purchasing purpose true. See xdx_p6_live_site_create.json. No repeated site POST; NEVER rerun this test with record-now.

The user explicitly approved site creation and all remaining planned create transactions after the automatic reviewer rejected the first command before process creation. Existing exact in-flow review, revision, duplicate and uncertain-result checks remain mandatory. No publication, provisioning, deletion or push authorization is inferred.

The live POST at22:56:02 returned generated site ID and all required fields, with a truncated preview only in the large unrelated tail. Seven actual fields were retained by model compaction; eight GET captures remain raw/complete. Last-step capturePolicy inherited model-generated from the synthetic test and was corrected to record-now after applying actual data; no input/response values changed. The original compaction request is retained as evidence.

Independent GET returned BU ID as a string, whereas the submitted payload and POST used numbers. Strict comparison incorrectly left confirmation uncertain. Corrected identifier-only comparison in confirmation and reconciliation; all business fields remain strictly compared. Local regression explicitly covers numeric/string identifiers. Repaired workflow DRAFT86137146/ETag14,89nodes. Actual four-turn file replay passed52.322s. Only affected duplicate/uncertain scenarios rerun47.295s/55.614s; judges2/2 accepted. Aggregate11/11PASS0pendingjudges combines unchanged prewrite cases with these targeted replays, not a second full-suite run. Aggregate metrics289508tokens375AIunits157.3s are suite snapshots, not task totals.

Native exact draft/review passed before write. After browser session recovery, target app Query showed one ACTIVE site row with exact site, BU and address. Chrome676646834 remains open. Missed five-minute keep-alive during approval wait recorded in tracker; not claimed compliant. Next keep-alive deadline23:08:00Z, refresh no later than five minutes during work.

Site object reference updated with omitted/generated SupplierSiteId and identifier serialization evidence; immutable first GET sample unchanged. Local validators/Query contract passed. P7 contact is next. Full goal remains incomplete through P9/Closeout.
