# OpenAPI parser observation

Worker /root/address_contract reported a read-only ConvertFrom-Json rejection of case-distinct PODistributionId/PoDistributionId keys in retained procurement26c-openapi.json. No mutation or tenant call. Exact tool stdout not retained locally; worker message is source. Case-insensitive PowerShell object properties conflict; proposed correction is ConvertFrom-Json -AsHashtable or native JSON parser. No unchanged retry authorized.
