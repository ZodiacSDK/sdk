import { PublicKey } from "@solana/web3.js";
import { getAddress, isAddress } from "viem";
import type { ZodiacChain } from "./types.js";
import { InvalidZodiacAddressError } from "./errors.js";

export function isEvmAddress(address: string): boolean {
  return isAddress(address);
}

export function normalizeEvmAddress(address: string): string {
  const trimmed = address.trim();

  if (!isAddress(trimmed)) {
    throw new InvalidZodiacAddressError(address);
  }

  return getAddress(trimmed);
}

export function isSolanaAddressLike(address: string): boolean {
  return normalizeSolanaAddressOrNull(address) !== null;
}

export function normalizeSolanaAddress(address: string): string {
  const normalized = normalizeSolanaAddressOrNull(address);

  if (!normalized) {
    throw new InvalidZodiacAddressError(address);
  }

  return normalized;
}

export function normalizeZodiacAddress(address: string, chain?: ZodiacChain): string {
  const trimmed = address.trim();

  if (chain === "base") {
    return normalizeEvmAddress(trimmed);
  }

  if (chain === "solana") {
    return normalizeSolanaAddress(trimmed);
  }

  if (isEvmAddress(trimmed)) {
    return normalizeEvmAddress(trimmed);
  }

  return normalizeSolanaAddress(trimmed);
}

function normalizeSolanaAddressOrNull(address: string): string | null {
  const trimmed = address.trim();

  if (!trimmed) {
    return null;
  }

  try {
    return new PublicKey(trimmed).toBase58();
  } catch {
    return null;
  }
}
