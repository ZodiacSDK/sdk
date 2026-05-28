# @zodiacs/sdk

Read-only TypeScript SDK for Zodiacs.org cultural assets, symbolic identity, ownership, and optional market context.

```sh
pnpm add @zodiacs/sdk
```

```tsx
import {
  ZodiacsProvider,
  ZodiacAssetCard,
  getZodiacBalance
} from "@zodiacs/sdk";

export function App() {
  return (
    <ZodiacsProvider rpcUrl="https://api.mainnet-beta.solana.com">
      <ZodiacAssetCard sign="aries" />
    </ZodiacsProvider>
  );
}
```

The SDK is read-only. It does not include signing, swaps, trading, custody, private keys, buy buttons, sell buttons, or transaction submission.
Market adapters are optional display context. DEX Screener and Jupiter endpoints are upstream-controlled and can be overridden with `config.endpoint`.
