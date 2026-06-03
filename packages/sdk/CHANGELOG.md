# @zodiacs/sdk Changelog

## 1.0.0-rc.1

- Promoted the SDK package metadata for the first v1 release candidate.
- Added a release-audit regression for Base fallback `readContract` block option
  pass-through.
- Confirmed subpath exports, React isolation, market isolation, registry
  checksum, Base/Solana read optimization, testing fixtures, docs, examples, and
  package contents.

## 0.3.0

- Made the root `@zodiacs/sdk` entry point React-free and market-adapter-free.
- Added explicit subpath entrypoints for core, registry, Base, Solana, identity,
  market, React, UI, and testing.
- Added batched Base reads, wallet-scan Solana ownership reads, identity
  context helpers, testing fixtures, and consumer app documentation.

## 0.2.0

- Added the canonical multi-chain Zodiacs registry with native Solana SPL
  assets and official bridged Base ERC-20 representations.
- Added registry verification, provenance, Base reads, cross-chain ownership,
  identity context helpers, React hooks, UI components, and optional market
  context adapters.
