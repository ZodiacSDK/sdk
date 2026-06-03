import { describe, expect, it } from "vitest";
import {
  createMockBaseOwnership,
  createMockOwnership,
  mockBasePublicClient,
  mockBasePublicClientWithReadContracts,
  mockBasePublicClientWithoutReadContracts,
  mockEmptyOwnership,
  mockFullWheelOwnership,
  mockMixedCrossChainOwnership,
  mockOneSignOwnership,
  mockPartialFailureBaseClient,
  mockPartialFailureSolanaConnection,
  mockRegistry,
  mockSolanaConnectionWithWalletScan,
  mockSolanaConnection
} from "./testing.js";
import { getBaseZodiacsOwnership, getSolanaZodiacsOwnership } from "./core/index.js";

describe("testing fixtures", () => {
  it("creates typed ownership fixtures", () => {
    expect(mockEmptyOwnership.heldSigns).toEqual([]);
    expect(mockOneSignOwnership.heldSigns).toEqual(["aries"]);
    expect(mockFullWheelOwnership.heldSigns).toHaveLength(12);
    expect(mockMixedCrossChainOwnership.solana?.heldSigns).toEqual(["aries", "gemini"]);
    expect(mockMixedCrossChainOwnership.base?.heldSigns).toEqual(["gemini", "taurus"]);
    expect(mockRegistry.assets).toHaveLength(12);
    expect(createMockOwnership({ heldSigns: ["aries"] })).toMatchObject({
      heldSigns: ["aries"],
      zeroBalanceSigns: expect.arrayContaining(["taurus"]),
      totalHeld: 1
    });
    expect(createMockBaseOwnership({ heldSigns: ["taurus"] })).toMatchObject({
      heldSigns: ["taurus"],
      zeroBalanceSigns: expect.arrayContaining(["aries"]),
      totalHeld: 1
    });
  });

  it("mocks Base and Solana read clients", async () => {
    await expect(
      getBaseZodiacsOwnership(
        mockBasePublicClient({ heldSigns: ["aries"] }),
        "0x1111111111111111111111111111111111111111"
      )
    ).resolves.toMatchObject({
      heldSigns: ["aries"]
    });
    await expect(
      getBaseZodiacsOwnership(
        mockBasePublicClientWithReadContracts({ heldSigns: ["taurus"] }),
        "0x1111111111111111111111111111111111111111"
      )
    ).resolves.toMatchObject({
      heldSigns: ["taurus"]
    });
    await expect(
      getBaseZodiacsOwnership(
        mockBasePublicClientWithoutReadContracts({ heldSigns: ["gemini"] }),
        "0x1111111111111111111111111111111111111111"
      )
    ).resolves.toMatchObject({
      heldSigns: ["gemini"]
    });
    await expect(
      getSolanaZodiacsOwnership(
        mockSolanaConnection({ heldSigns: ["gemini"] }),
        "CWKQJJYec89wcx871C8vmyTPc3jhsdoAYs5aGffUtELJ"
      )
    ).resolves.toMatchObject({
      heldSigns: ["gemini"]
    });
    await expect(
      getSolanaZodiacsOwnership(
        mockSolanaConnectionWithWalletScan({ heldSigns: ["leo"] }),
        "CWKQJJYec89wcx871C8vmyTPc3jhsdoAYs5aGffUtELJ"
      )
    ).resolves.toMatchObject({
      heldSigns: ["leo"]
    });
  });

  it("mocks partial failure clients", async () => {
    await expect(
      getBaseZodiacsOwnership(
        mockPartialFailureBaseClient(),
        "0x1111111111111111111111111111111111111111"
      )
    ).resolves.toMatchObject({
      status: "partial"
    });
    await expect(
      getSolanaZodiacsOwnership(
        mockPartialFailureSolanaConnection(),
        "CWKQJJYec89wcx871C8vmyTPc3jhsdoAYs5aGffUtELJ"
      )
    ).resolves.toMatchObject({
      status: "partial"
    });
  });
});
