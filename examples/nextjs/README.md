# Zodiacs SDK Next.js Example

Minimal read-only integration demo for the Zodiacs SDK. The example presents
Zodiacs.org cultural assets as symbolic identity and ownership surfaces with
official registry provenance.

## Setup

Install dependencies from the repository root:

```sh
corepack pnpm install
```

Create an environment file for the example:

```sh
cp examples/nextjs/.env.example examples/nextjs/.env.local
```

Or provide the variable inline when running the app:

```sh
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
```

## Run

```sh
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.mainnet-beta.solana.com" corepack pnpm --filter zodiacs-sdk-nextjs-example dev
```

Open the local Next.js URL, enter a Solana wallet public key, select a zodiac
asset, and run a read-only balance lookup. The app passes
`NEXT_PUBLIC_SOLANA_RPC_URL` to `ZodiacsProvider` as `rpcUrl`, so React balance
hooks can use the first-party read-only Solana reader.

The example does not request private keys, sign messages, submit transactions,
provide custody, or show acquisition or exchange buttons. It uses
`NEXT_PUBLIC_SOLANA_RPC_URL` for Solana RPC access.

## What It Shows

- Local Zodiacs token metadata from `@zodiacs/sdk/core`
- `ZodiacAssetCard` and `ZodiacsPanel` from `@zodiacs/sdk/ui`
- Read-only balance lookup with `getZodiacBalance`
- React balance hooks through `ZodiacsProvider rpcUrl`
- Ownership summary with `getZodiacsOwnership`

Market adapters are explicit through `@zodiacs/sdk/market` and are intentionally
not part of this read-only UI example.
