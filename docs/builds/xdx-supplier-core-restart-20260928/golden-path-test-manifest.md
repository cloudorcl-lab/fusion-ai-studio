# MVP Golden-Path Test Manifest

Task: xdx-supplier-core-restart-20260928. Derived from already-authorized original scope. ATLAS assigns actual scenario/test IDs after graph exists; no invented binding. One required action at a time.

| ID | Requirements | Journey/route | Required boundary | Terminal/assertions |
| --- | --- | --- | --- | --- |
| GP-R1 | R1 | List/search exact and contains, displayed-number resolution, scalar detail and complete paging | Actual saved supplier BO node; forbid POST | One display terminal; correct keys/fields/cardinality; configured rubric plus native evidence |
| GP-R2 | R2 | Prepare/edit/review/exact approval, duplicate preflight, one B POST, independent GET and no replay | Actual saved supplier BO node; exact approved payload and at most one reserved POST | One display terminal; correct keys/fields/cardinality; configured rubric plus native evidence |
| GP-R3 | R3 | Parent-scoped list/filter/detail/paging with verified supplier key | Actual saved address BO node; forbid POST | One display terminal; correct keys/fields/cardinality; configured rubric plus native evidence |
| GP-R4 | R4 | Same-parent eight-field address, field edit/approval and direct A/native B GET verification | Actual saved address BO node; exact approved payload and at most one reserved POST | One display terminal; correct keys/fields/cardinality; configured rubric plus native evidence |
| GP-R5 | R5 | Parent-scoped site list/filter/detail/paging and relationship display | Actual saved site BO node; forbid POST | One display terminal; correct keys/fields/cardinality; configured rubric plus native evidence |
| GP-R6 | R6 | Current BU lookup, same-parent address, typed four-field exact approval and A/B persistence | Actual saved site BO node; exact approved payload and at most one reserved POST | One display terminal; correct keys/fields/cardinality; configured rubric plus native evidence |
| GP-R7 | R7 | Parent-scoped contact list/filter/detail/paging; minimal personal data | Actual saved contact BO node; forbid POST | One display terminal; correct keys/fields/cardinality; configured rubric plus native evidence |
| GP-R8 | R8 | Three-field contact edit/approval and A/B persistence without accounts | Actual saved contact BO node; exact approved payload and at most one reserved POST | One display terminal; correct keys/fields/cardinality; configured rubric plus native evidence |

Local invariants L-SEARCH map R1/R3/R5/R7 plus all duplicate/BU lookups; L-STATE maps R2/R4/R6/R8 (edit invalidation, exact approval, uncertainty and no replay); L-BIND maps all (nonblank current producer keys, rendered typed JSON, Query non-suspension). Reuse retained responses for negatives; no negative business POST probes. Native order: fresh InitDisplay→first paging Query→ordinary supplier Query→prepare→field edit→review→approve exact request/revision→create once→GET. Child expansion waits for supplier proof. Regression/optimization never replay accepted creates.
