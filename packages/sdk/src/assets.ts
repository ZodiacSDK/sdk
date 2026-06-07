import type { ZodiacSign } from "./core/index.js";

export type ZodiacIconStyle = "circle";
export type ZodiacIconFormat = "png";

export interface ZodiacIconAsset {
  readonly sign: ZodiacSign;
  readonly displayName: string;
  readonly style: ZodiacIconStyle;
  readonly format: ZodiacIconFormat;
  readonly contentType: "image/png";
  readonly width: 1024;
  readonly height: 1024;
  readonly packagePath: `@zodiacs/sdk/assets/zodiac-icons/circle/${ZodiacSign}.png`;
  readonly relativePath: `assets/zodiac-icons/circle/${ZodiacSign}.png`;
  readonly sha256: string;
}

export const ZODIAC_CIRCLE_ICON_ASSETS = [
  {
    sign: "aries",
    displayName: "Aries",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/aries.png",
    relativePath: "assets/zodiac-icons/circle/aries.png",
    sha256: "f986d9b1cbe9aef8b86331aa41371cbded17f868ac07571814466c367c25d659"
  },
  {
    sign: "taurus",
    displayName: "Taurus",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/taurus.png",
    relativePath: "assets/zodiac-icons/circle/taurus.png",
    sha256: "7988754418617960eb3083ef8356bad1afe402a6f9e098929a73234f23c60c80"
  },
  {
    sign: "gemini",
    displayName: "Gemini",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/gemini.png",
    relativePath: "assets/zodiac-icons/circle/gemini.png",
    sha256: "94ab09cb126e4aadfbcfd24b86fa33eee35b2770a3f01dcdc24a379cdb2c6b43"
  },
  {
    sign: "cancer",
    displayName: "Cancer",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/cancer.png",
    relativePath: "assets/zodiac-icons/circle/cancer.png",
    sha256: "9fe3e72071a91adea150117dbcdd7e432b207e5dfa1a284066b7b2dd37ed652c"
  },
  {
    sign: "leo",
    displayName: "Leo",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/leo.png",
    relativePath: "assets/zodiac-icons/circle/leo.png",
    sha256: "c596da09b495de2b819ffd85d96afe5e8694130a69e2c84d8f1ee52d0094bf33"
  },
  {
    sign: "virgo",
    displayName: "Virgo",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/virgo.png",
    relativePath: "assets/zodiac-icons/circle/virgo.png",
    sha256: "ff05a4b427d25a87cebd17735276a3ea3b1de99c6bd3a71c53dac70da136cc23"
  },
  {
    sign: "libra",
    displayName: "Libra",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/libra.png",
    relativePath: "assets/zodiac-icons/circle/libra.png",
    sha256: "fe6bf55d3abdf0656cc90dac8112cc5af683657ef06ae311f75ca84a038228eb"
  },
  {
    sign: "scorpio",
    displayName: "Scorpio",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/scorpio.png",
    relativePath: "assets/zodiac-icons/circle/scorpio.png",
    sha256: "1280fcdf23d3bf21a7af3f58dbcd364392037ae14beafa2422bc72a392bfa44a"
  },
  {
    sign: "sagittarius",
    displayName: "Sagittarius",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/sagittarius.png",
    relativePath: "assets/zodiac-icons/circle/sagittarius.png",
    sha256: "f218168d36db043f7e973401ac348680e4638b891c44f1a8b1dc566bf6e50782"
  },
  {
    sign: "capricorn",
    displayName: "Capricorn",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/capricorn.png",
    relativePath: "assets/zodiac-icons/circle/capricorn.png",
    sha256: "21591b84c04c9d7b41a00a4653acda34367bfc854f6028a0ccef1618e966952a"
  },
  {
    sign: "aquarius",
    displayName: "Aquarius",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/aquarius.png",
    relativePath: "assets/zodiac-icons/circle/aquarius.png",
    sha256: "c33554c1173df7680614d941862d162625d83ad5361bb6f37aa26cdc7a22c93c"
  },
  {
    sign: "pisces",
    displayName: "Pisces",
    style: "circle",
    format: "png",
    contentType: "image/png",
    width: 1024,
    height: 1024,
    packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/pisces.png",
    relativePath: "assets/zodiac-icons/circle/pisces.png",
    sha256: "71194cd846c0a0451ff648306b8db16d19c81c5470d76cb8c17e9e4151ecc39d"
  }
] as const satisfies readonly ZodiacIconAsset[];

export function getAllZodiacIconAssets(): readonly ZodiacIconAsset[] {
  return ZODIAC_CIRCLE_ICON_ASSETS;
}

export function getZodiacIconAsset(sign: ZodiacSign): ZodiacIconAsset {
  return ZODIAC_CIRCLE_ICON_ASSETS.find((asset) => asset.sign === sign)!;
}

export function getZodiacIconAssetPath(sign: ZodiacSign): ZodiacIconAsset["packagePath"] {
  return getZodiacIconAsset(sign).packagePath;
}
