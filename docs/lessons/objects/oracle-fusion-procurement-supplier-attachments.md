# Supplier Attachments

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/attachments`; item key: `attachmentsUniqID` / returned `AttachedDocumentId`.
- Documented operations: GET, POST, PATCH, DELETE plus LOB enclosures. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierAttachments`, `CreateSupplierAttachment`. Query metadata only; never expose `FileContents`.

## POST

Current reviewed BO allowlist: `DatatypeCode`, `Title`, `Description`, `CategoryName`, `FileName`, `UploadedFileContentType`, `FileContents`, `Url`. `AttachedDocumentId` is omitted as the resource's own generated ID. Exact FILE/URL rules, requiredness, size/type limits, duplicate scope and Example Request Body must be reconciled before a live payload. Binary content is sensitive and cannot enter visible workflow state.

First successful BO GET sample: none. Untested: live GET/POST and tenant categories. Revalidate on release, BO ETag or attachment-policy change.

Change history: 2026-09-22 — created from 26C inventory and current server BO ETag 8; no live function execution.
