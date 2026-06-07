import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  ZODIAC_CIRCLE_ICON_ASSETS,
  getAllZodiacIconAssets,
  getZodiacIconAsset,
  getZodiacIconAssetPath
} from "./assets.js";
import { ZODIAC_SIGNS } from "./core/index.js";

const PNG_SIGNATURE = "89504e470d0a1a0a";

function readAsset(assetPath: string): Buffer {
  return readFileSync(new URL(`../${assetPath}`, import.meta.url));
}

function getPngDimensions(buffer: Buffer): { readonly width: number; readonly height: number } {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

describe("official zodiac icon assets", () => {
  it("publishes one normalized circle PNG per zodiac sign", () => {
    const assets = getAllZodiacIconAssets();

    expect(assets).toHaveLength(12);
    expect(assets.map((asset) => asset.sign)).toEqual(ZODIAC_SIGNS);
    expect(new Set(assets.map((asset) => asset.packagePath)).size).toBe(12);
    expect(new Set(assets.map((asset) => asset.sha256)).size).toBe(12);
  });

  it("matches the packaged PNG files and checksums", () => {
    for (const asset of ZODIAC_CIRCLE_ICON_ASSETS) {
      const buffer = readAsset(asset.relativePath);
      const digest = createHash("sha256").update(buffer).digest("hex");

      expect(buffer.subarray(0, 8).toString("hex")).toBe(PNG_SIGNATURE);
      expect(getPngDimensions(buffer)).toEqual({ width: 1024, height: 1024 });
      expect(asset.contentType).toBe("image/png");
      expect(asset.format).toBe("png");
      expect(asset.style).toBe("circle");
      expect(asset.packagePath).toBe(`@zodiacs/sdk/assets/zodiac-icons/circle/${asset.sign}.png`);
      expect(digest).toBe(asset.sha256);
    }
  });

  it("looks up a single sign asset", () => {
    expect(getZodiacIconAsset("leo")).toMatchObject({
      sign: "leo",
      displayName: "Leo",
      packagePath: "@zodiacs/sdk/assets/zodiac-icons/circle/leo.png"
    });
    expect(getZodiacIconAssetPath("pisces")).toBe(
      "@zodiacs/sdk/assets/zodiac-icons/circle/pisces.png"
    );
  });
});
