# Zodiacs SDK

Official read-only TypeScript SDK for the canonical Zodiacs.org registry,
native Solana SPL Zodiacs assets, and official bridged Base ERC-20
representations.

```sh
pnpm add @zodiacs/sdk
```

```ts
import { getZodiacIdentityContext } from "@zodiacs/sdk/core";
import { getBaseZodiacsOwnership } from "@zodiacs/sdk/base";
import { getSolanaZodiacsOwnership } from "@zodiacs/sdk/solana";
```

```ts
import {
  getBaseZodiacRepresentation,
  getRepresentationByAddress,
  getSolanaZodiacRepresentation
} from "@zodiacs/sdk/core";

const representation = getRepresentationByAddress("0x3ffB5282F5891Dd8c813E64059EdB0607537eC91");

console.log(representation?.kind); // "bridged"
console.log(getSolanaZodiacRepresentation("aries").chain); // "solana"
console.log(getBaseZodiacRepresentation("aries").originChain); // "solana"
```

Identity context helpers provide computed symbolic context from registry
metadata and public ownership state:

```ts
import { getCurrentZodiacSeason, getZodiacIdentityContext } from "@zodiacs/sdk/identity";

const season = getCurrentZodiacSeason();
const context = getZodiacIdentityContext(ownership, {
  sunSign: "aries"
});

console.log(season.displayName);
console.log(context.heldSigns);
console.log(context.currentSeasonHeld);
```

The SDK is read-only. The root and core entrypoints provide registry
verification, public balance reads, metadata, and computed symbolic context.
React hooks and UI components are optional through `@zodiacs/sdk/react` and
`@zodiacs/sdk/ui`. Market context remains explicit through
`@zodiacs/sdk/market`.

The SDK does not request private keys, sign messages, submit transactions,
provide custody, or provide transaction approval helpers. It does not generate
horoscopes or recommend asset acquisition, disposal, exchange, or retention.

Always verify official addresses against the published Zodiacs.org registry.
The SDK exposes the official registry for apps and clients, but downstream
interfaces should display chain and representation provenance clearly.
