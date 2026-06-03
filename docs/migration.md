# Migration Notes

Existing Solana read APIs remain available:

- `getZodiacBalance`
- `getZodiacsOwnership`
- `getHeldZodiacs`

These compatibility helpers continue to read native Solana SPL assets.

React hooks and UI components now live behind explicit optional entrypoints so
server and backend imports from `@zodiacs/sdk` do not load React:

- move `useZodiacBalance`, `useZodiacToken`, and ownership hooks to
  `@zodiacs/sdk/react`
- move `ZodiacsPanel`, `ZodiacAssetCard`, `ZodiacShelf`, receipt, wheel, and
  profile components to `@zodiacs/sdk/ui`

New integrations should prefer explicit names:

- `getSolanaZodiacBalance`
- `getSolanaZodiacsOwnership`
- `getBaseZodiacBalance`
- `getBaseZodiacsOwnership`
- `getCrossChainZodiacsOwnership`

New integrations should also prefer subpath imports:

- `@zodiacs/sdk/core`
- `@zodiacs/sdk/market`
- `@zodiacs/sdk/registry`
- `@zodiacs/sdk/base`
- `@zodiacs/sdk/solana`
- `@zodiacs/sdk/identity`
- `@zodiacs/sdk/react`
- `@zodiacs/sdk/ui`
- `@zodiacs/sdk/testing`

Market adapters are no longer exported from the root entrypoint. Import them
from `@zodiacs/sdk/market` so server and registry consumers do not load optional
market context code by accident.

`useZodiacMarket` and `ZodiacMarketStrip` are deprecated compatibility shapes
and do not fetch or render market context. New market integrations should use
`@zodiacs/sdk/market` explicitly and keep that data outside consumer-safe SDK UI.

The key model change is that the SDK now exposes a canonical multi-chain
registry. Solana SPL mints are the native originals. Base ERC-20 addresses are
official bridged representations that point back to the Solana mint for the
same sign.
