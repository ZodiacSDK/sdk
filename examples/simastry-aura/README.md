# Simastry Aura Example

A minimal read-only example showing how an astrology app can turn verified
Zodiac ownership into a shareable Aura page payload and optional AI astrologist
conversation context.

This example uses deterministic mock ownership from `@zodiacs/sdk/testing` so
it can run without a wallet, private key, RPC key, or transaction. Production
apps can replace the mock ownership with public reads from
`getCrossChainZodiacsOwnership`, `getSolanaZodiacsOwnership`, or
`getBaseZodiacsOwnership`.

## Run

From the repository root:

```sh
corepack pnpm install
corepack pnpm --filter @zodiacs/sdk build
corepack pnpm --filter zodiacs-sdk-simastry-aura-example start
```

## What It Shows

- Verified held-sign context beside a birth-chart sun sign.
- A payload shape for a shareable Simastry Aura page.
- Optional context that can be passed into an AI astrologist conversation.
- Read-only posture: no custody, no signing, no transactions.

Related pages:

- [How Simastry uses Zodiacs SDK](https://zodiacs.org/simastry-zodiacs-sdk/)
- [Simastry Aura web example](https://zodiacs.org/sdk/examples/simastry-aura/)
- [Zodiacs SDK](https://zodiacs.org/sdk/)
