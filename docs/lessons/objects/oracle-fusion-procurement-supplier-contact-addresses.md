# Supplier Contact Addresses

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/contacts/{SupplierContactId}/child/addresses`; item key: `SupplierContactAddressId`.
- Documented operations: GET, POST, DELETE. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierContactAddresses`; create function is not yet present.

## POST

This creates an association to an existing supplier address, not a new postal address. Resolve supplier, contact and address in the same parent scope. Omit the returned association ID. Exact request field, requiredness, uniqueness and Example Request Body remain a preimplementation gate.

First successful BO GET sample: none. Untested: live GET/POST and duplicate-association behavior.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
