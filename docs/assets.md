# Official Display Assets

The SDK includes official circle icons for the twelve Zodiacs signs. They are
packaged as neutral display assets for apps, websites, documentation, share
cards, profile views, and other interfaces that need consistent visual context
for verified zodiac holdings.

The assets are not wallet flows, transaction helpers, market data, or
acquisition prompts. They are display references for the official registry.

## Entrypoint

```ts
import { getAllZodiacIconAssets, getZodiacIconAsset } from "@zodiacs/sdk/assets";

const icons = getAllZodiacIconAssets();
const leo = getZodiacIconAsset("leo");

console.log(icons.length); // 12
console.log(leo.packagePath);
```

Each asset record includes:

- `sign`
- `displayName`
- `style`
- `format`
- `contentType`
- `width`
- `height`
- `packagePath`
- `relativePath`
- `sha256`

## Direct PNG Subpaths

Bundlers that support image imports can reference the PNG files directly:

```ts
import leoIconUrl from "@zodiacs/sdk/assets/zodiac-icons/circle/leo.png";
```

Build pipelines can also copy files from the package using the manifest
`relativePath` values.

## Asset Specs

- style: `circle`
- format: PNG
- dimensions: 1024 x 1024
- one icon per zodiac sign
- transparent outside the circle
- checksummed in the TypeScript manifest

## Usage Guidance

Use these assets when displaying official Zodiacs registry context. When an
interface shows ownership, also label provenance clearly:

- Solana-native representation
- Base-bridged representation
- official registry source
- public ownership lookup status

Do not use the icons to imply that unofficial assets are official. If an app
shows user-provided or unverified assets, keep those visually distinct from the
official registry assets.

For app-side aura and tooltip patterns that combine ownership, identity context,
and these icons, see [Symbolic Resonance](./symbolic-resonance.md).
