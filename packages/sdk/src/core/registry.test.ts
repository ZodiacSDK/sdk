import { describe, expect, it } from "vitest";
import {
  DEFAULT_ZODIAC_TOKENS,
  createZodiacTokenRegistry,
  getAllZodiacTokens,
  getMintAddress,
  getZodiacToken,
  validateZodiacRegistry
} from "./registry.js";
import { ZODIAC_SIGNS } from "./types.js";

describe("zodiac token registry", () => {
  it("contains exactly twelve zodiac tokens", () => {
    expect(getAllZodiacTokens()).toHaveLength(12);
  });

  it("contains one token for each zodiac sign", () => {
    expect(getAllZodiacTokens().map((token) => token.sign)).toEqual(ZODIAC_SIGNS);
  });

  it("has a unique mint address for every sign", () => {
    const mintAddresses = getAllZodiacTokens().map((token) => token.mintAddress);
    expect(new Set(mintAddresses).size).toBe(12);
  });

  it("returns tokens and mint addresses by sign", () => {
    expect(getZodiacToken("aries").ticker).toBe("ARIES");
    expect(getMintAddress("pisces")).toBe("3JsSsmGzjWDNe9XCw2L9vznC5JU9wSqQeB6ns5pAkPeE");
  });

  it("returns tokens from a custom registry in zodiac order", () => {
    const override = {
      ...DEFAULT_ZODIAC_TOKENS[0],
      ticker: "ARI",
      mintAddress: "11111111111111111111111111111111",
      marketLinks: {
        dexScreener: "https://dexscreener.com/solana/11111111111111111111111111111111",
        jupiter: "https://jup.ag/tokens/11111111111111111111111111111111"
      }
    };
    const registry = createZodiacTokenRegistry([override, ...DEFAULT_ZODIAC_TOKENS.slice(1)]);

    expect(getAllZodiacTokens(registry)[0]?.ticker).toBe("ARI");
    expect(getAllZodiacTokens(registry).map((token) => token.sign)).toEqual(ZODIAC_SIGNS);
  });

  it("validates the default registry", () => {
    expect(validateZodiacRegistry()).toEqual({ valid: true, errors: [] });
  });
});
