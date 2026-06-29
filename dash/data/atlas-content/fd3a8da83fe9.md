# Integration: Accounting (provider-agnostic: Xero / MYOB / QuickBooks)

## Prerequisites

- Which platform the business uses, and who holds admin access
- Owner decision on scope: read-only (recommended at launch) vs draft-invoice creation

## Credential setup

- OAuth app or API token with the minimum scope (start read-only; promote to invoice-draft scope only after the first month of clean operation)
- Store per `core/security/secrets-pattern.md`; record scopes and token expiry with a cron renewal reminder

## Configuration

- READ-ONLY BY DEFAULT. The Finance agent never creates, updates, or deletes accounting records without explicit per-action approval from the owner; this mirrors the kit's hard rule on money
- Map the chart of accounts the agent needs (sales, receivables) into `business/`; the agent cites figures only from API pulls, never from memory

## Verification

- Pull last month's invoice list; owner confirms the figures match what they see in the platform
- Attempt a write with the read-only credential; confirm it is rejected (proves the scope is what was recorded)

## Known traps

- (none yet; append as learned)
