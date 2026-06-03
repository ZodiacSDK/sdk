import { describe, expect, it } from "vitest";
import {
  CompatibilityWheel,
  OfficialZodiacBadge,
  ProfileSummaryCard,
  ShareCardPreview,
  UnverifiedZodiacWarning,
  ZodiacTokenCard,
  ZodiacAddressVerifier
} from "./index.js";
import { getCompatibilityContext, getZodiacIdentityContext } from "../core/index.js";

describe("registry UI components", () => {
  it("renders native and bridged labels", () => {
    expect(
      OfficialZodiacBadge({ address: "GhFiFrExPY3proVF96oth1gESWA5QPQzdtb8cy8b1YZv" }).props
        .children
    ).toBe("Official native Zodiacs.org asset on Solana");
    expect(
      OfficialZodiacBadge({ address: "0x3ffB5282F5891Dd8c813E64059EdB0607537eC91" }).props.children
    ).toBe("Official bridged Zodiacs.org asset on Base");
  });

  it("renders neutral unknown-address language", () => {
    const element = UnverifiedZodiacWarning({
      address: "0x0000000000000000000000000000000000000000"
    });
    expect(JSON.stringify(element)).toContain("not found in the official Zodiacs.org registry");
  });

  it("verifier includes origin and counterpart rows without action buttons", () => {
    const element = ZodiacAddressVerifier({
      address: "0x3ffB5282F5891Dd8c813E64059EdB0607537eC91"
    });
    const serialized = JSON.stringify(element);

    expect(serialized).toContain("Origin chain");
    expect(serialized).toContain("Native counterpart");
    expect(serialized).not.toMatch(/buy|sell|swap|approve|transfer/iu);
  });

  it("renders data-first profile, share, token, and compatibility primitives without trading CTAs", () => {
    const first = { holdings: [{ sign: "aries", held: true }] } as const;
    const second = {
      holdings: [
        { sign: "aries", held: true },
        { sign: "cancer", held: true }
      ]
    } as const;
    const context = getZodiacIdentityContext(first, { date: new Date("2026-03-22T00:00:00.000Z") });
    const compatibility = getCompatibilityContext(first, second);
    const serialized = JSON.stringify([
      ZodiacTokenCard({ sign: "aries", held: true }),
      ProfileSummaryCard({ context }),
      ShareCardPreview({ context }),
      CompatibilityWheel({ compatibility })
    ]);

    expect(serialized).toContain("Solana native");
    expect(serialized).toContain("Compatibility wheel");
    expect(serialized).not.toMatch(
      /buy|sell|swap|approve|transfer|profit|earn token|invest|portfolio|market cap|complete your wheel|missing sign|unlock|reward|token-gated/iu
    );
  });
});
