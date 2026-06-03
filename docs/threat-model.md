# Security and Threat Model

## In Scope

- official registry verification
- address normalization and validation
- public ownership reads
- deterministic identity context
- provenance labels for Solana-native and Base-bridged representations

## Out of Scope

- custody
- private keys
- signing
- approvals
- transaction submission
- swaps, trading, exchange, staking, rewards, or claims
- financial advice or price prediction

## Main Risks

- A downstream app displays unofficial assets as official.
- Registry JSON is edited without review.
- A consumer app treats token ownership as paid digital entitlement without handling platform rules.
- RPC providers return partial or malformed data.

## Mitigations

- Validate registry invariants and checksum before release.
- Use `isOfficialZodiacAddress` and `getRepresentationByAddress`.
- Show provenance labels in UI.
- Keep wallet, transaction, notification, and Builder Code behavior in app adapters.
- Surface partial read errors and warnings instead of silently hiding them.
