import { describe, expect, it } from "vitest";
import {
  InvalidZodiacAddressError,
  UnknownZodiacAddressError,
  assertOfficialZodiacAddress,
  getRepresentationByAddress,
  isOfficialZodiacAddress,
  normalizeEvmAddress,
  normalizeSolanaAddress,
  normalizeZodiacAddress
} from "./index.js";

describe("address normalization and lookup", () => {
  it("normalizes valid EVM and Solana addresses", () => {
    expect(normalizeEvmAddress("0x3ffb5282f5891dd8c813e64059edb0607537ec91")).toBe(
      "0x3ffB5282F5891Dd8c813E64059EdB0607537eC91"
    );
    expect(normalizeSolanaAddress(" GhFiFrExPY3proVF96oth1gESWA5QPQzdtb8cy8b1YZv ")).toBe(
      "GhFiFrExPY3proVF96oth1gESWA5QPQzdtb8cy8b1YZv"
    );
    expect(normalizeZodiacAddress("0x3ffb5282f5891dd8c813e64059edb0607537ec91")).toBe(
      "0x3ffB5282F5891Dd8c813E64059EdB0607537eC91"
    );
  });

  it("throws typed errors for invalid addresses", () => {
    expect(() => normalizeEvmAddress("not-an-address")).toThrow(InvalidZodiacAddressError);
    expect(() => normalizeSolanaAddress("not-an-address")).toThrow(InvalidZodiacAddressError);
    expect(() => normalizeZodiacAddress("not-an-address")).toThrow(InvalidZodiacAddressError);
  });

  it("distinguishes unknown valid addresses from invalid addresses", () => {
    const unknownBase = "0x0000000000000000000000000000000000000000";

    expect(isOfficialZodiacAddress(unknownBase)).toBe(false);
    expect(getRepresentationByAddress(unknownBase)).toBeNull();
    expect(() => assertOfficialZodiacAddress(unknownBase)).toThrow(UnknownZodiacAddressError);
  });
});
