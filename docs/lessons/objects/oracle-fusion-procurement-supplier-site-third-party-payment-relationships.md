# Supplier Site Third-Party Payment Relationships

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/sites/{SupplierSiteId}/child/thirdPartyPaymentRelationships`; item key: `TppRelationshipId`.
- Documented operations: GET, POST, PATCH. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierSiteThirdPartyPaymentRelationships`.

## POST

This changes remittance routing and is excluded from ordinary MVP write scope. Enabling it requires separate user authority, exact remit-to supplier/address resolution, dates, uniqueness/overlap rules, request schema and Example Request Body. Omit the returned own ID only after documentation/live confirmation.

First successful BO GET sample: none. Untested: live GET/POST and financial data-security rules.

Change history: 2026-09-22 — created from Oracle 26C inventory; write intentionally excluded pending separate authority.
