# AGENTS.md

You are building the Zodiacs SDK for Zodiacs.org.

The SDK is the official read-only integration layer for the canonical Zodiacs.org registry. Solana SPL mints are native origins, and Base ERC-20 addresses are official bridged representations. Keep the SDK restrained, durable, and institutional.

## Repository Layout

- `packages/sdk`: the published `@zodiacs/sdk` ESM TypeScript package.
- `packages/sdk/src/core`: registry, address normalization, read-only ownership reads, identity context, and shared types.
- `packages/sdk/src/react.ts`: optional React hooks entrypoint.
- `packages/sdk/src/ui.ts`: optional React UI entrypoint.
- `packages/sdk/src/testing.ts`: type-safe fixtures for downstream app tests.
- `packages/sdk/registry`: canonical registry JSON and checksum artifact.
- `examples/base-app`: mobile-first read-only Base app starter.
- `examples/nextjs`: Next.js usage example.
- `docs`: integration guides, API contract docs, threat model, and release process.

## Tooling

- TypeScript only.
- pnpm workspace.
- ESM packages.
- Build packages with tsup.
- Test with Vitest.
- Format with Prettier.

Common commands:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm lint
corepack pnpm format:check
corepack pnpm typecheck
corepack pnpm registry:checksum
corepack pnpm test
corepack pnpm build
corepack pnpm exports:smoke
corepack pnpm pack:dry-run
```

## Public API Rules

- Root `@zodiacs/sdk` must remain React-free.
- Root `@zodiacs/sdk` should export core registry, ownership, address, and identity helpers only.
- Market adapters must require explicit import from `@zodiacs/sdk/market`.
- React hooks must require explicit import from `@zodiacs/sdk/react`.
- UI components must require explicit import from `@zodiacs/sdk/ui`.
- `@zodiacs/sdk/core`, `@zodiacs/sdk/registry`, `@zodiacs/sdk/base`, `@zodiacs/sdk/solana`, `@zodiacs/sdk/identity`, and `@zodiacs/sdk/testing` must not import React.
- Preserve backward compatibility where reasonable. Document migration notes for any root-export changes.

## Read-Only Constraints

Never add or enable:

- Private keys or seed phrases.
- Custody.
- Wallet clients in core SDK modules.
- Wallet signing or message signing.
- Transaction creation, simulation, signing, submission, approvals, transfers, swaps, staking, or asset movement helpers.
- Token purchases, token-gating, rewards, price charts, market caps, P&L, or financial-promotion flows.

The SDK core is for:

- Official registry data.
- Address normalization.
- Public read-only ownership checks.
- Solana-native provenance.
- Base bridged provenance.
- Cross-chain symbolic identity context.
- Safe display context for consumer apps.

## Language Rules

Use:

- `cultural asset`
- `symbolic identity`
- `ownership`
- `market context`
- `connected wallet`
- `read-only`
- `public address`
- `optional context`
- `verified zodiac holdings`
- `appears in your connected wallet`
- `official registry`
- `public ownership lookup`

Avoid:

- Hype, memes, and financial-promotional claims.
- Acquisition prompts.
- Price-prediction language.
- Copy that pressures people to add assets.

Consumer-safe helpers and SDK UI must not use language such as buy, sell, swap, invest, pump, profit, portfolio, market cap, complete your wheel, missing sign, unlock through ownership, token-gated, or reward.

## Docs Requirements

Docs should make clear that:

- The SDK is not a wallet SDK.
- The SDK does not sign or submit transactions.
- The SDK does not custody assets.
- Native SwiftUI apps should consume a small read-only backend API instead of importing the TypeScript SDK directly.
- Public ownership context is optional symbolic context and must not unlock paid digital features without separate platform-compliant handling.
- Consumer apps should clearly label Solana-native and Base-bridged provenance.

## Done Criteria

For SDK changes, finish only after:

- Relevant tests are added or updated.
- `corepack pnpm lint`, `typecheck`, `test`, and `build` pass when practical.
- `corepack pnpm format:check` passes.
- Registry changes include invariant tests and a checksum update.
- Export changes pass `corepack pnpm exports:smoke`.
- Package changes pass `corepack pnpm pack:dry-run`.
- A self-review confirms no signing, transaction, custody, private-key, swap, approval, token-gating, or acquisition behavior was introduced.
