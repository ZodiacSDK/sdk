import { normalizeEvmAddress, normalizeSolanaAddress } from "./address.js";
import { RegistryInvariantError } from "./errors.js";
import { BASE_CHAIN_ID, ZODIACS_REGISTRY } from "./official-registry.js";
import {
  ZODIAC_SIGNS,
  type ZodiacAsset,
  type ZodiacChain,
  type ZodiacElement,
  type ZodiacModality,
  type ZodiacRepresentation,
  type ZodiacSign,
  type ZodiacsRegistry,
  type ZodiacsSupportedChain
} from "./types.js";

export type RegistryInvariantCode =
  | "invalid-registry"
  | "invalid-supported-chain"
  | "invalid-asset-count"
  | "invalid-sign-order"
  | "duplicate-sign"
  | "duplicate-address"
  | "missing-asset-field"
  | "missing-metadata-field"
  | "invalid-representation"
  | "invalid-address"
  | "invalid-native-representation"
  | "invalid-base-representation"
  | "invalid-origin";

export interface RegistryInvariantIssue {
  readonly code: RegistryInvariantCode;
  readonly path: string;
  readonly message: string;
}

export interface RuntimeRegistryValidationResult {
  readonly valid: boolean;
  readonly issues: readonly RegistryInvariantIssue[];
  readonly errors: readonly string[];
}

const signSet = new Set<string>(ZODIAC_SIGNS);
const elementSet = new Set<ZodiacElement>(["fire", "earth", "air", "water"]);
const modalitySet = new Set<ZodiacModality>(["cardinal", "fixed", "mutable"]);
const chainSet = new Set<ZodiacChain>(["solana", "base"]);

export function validateZodiacsRegistrySchema(
  registry: unknown = ZODIACS_REGISTRY
): RuntimeRegistryValidationResult {
  const issues: RegistryInvariantIssue[] = [];

  if (!isRecord(registry)) {
    return toResult([issue("invalid-registry", "$", "Registry must be an object.")]);
  }

  validateRegistryHeader(registry, issues);

  const supportedChains = Array.isArray(registry.supportedChains) ? registry.supportedChains : [];
  validateSupportedChains(supportedChains, issues);

  const assets = registry.assets;

  if (!Array.isArray(assets)) {
    issues.push(issue("invalid-registry", "$.assets", "Registry assets must be an array."));
    return toResult(issues);
  }

  if (assets.length !== ZODIAC_SIGNS.length) {
    issues.push(
      issue(
        "invalid-asset-count",
        "$.assets",
        `Registry must contain exactly ${ZODIAC_SIGNS.length} assets.`
      )
    );
  }

  const seenSigns = new Set<ZodiacSign>();
  const seenAddresses = new Map<string, string>();

  assets.forEach((asset, index) => {
    validateAsset(asset, index, seenSigns, seenAddresses, issues);
  });

  ZODIAC_SIGNS.forEach((sign, index) => {
    const asset = assets[index] as unknown;

    if (!isRecord(asset) || asset.sign !== sign) {
      issues.push(
        issue(
          "invalid-sign-order",
          `$.assets[${index}].sign`,
          `Expected ${sign} at index ${index}.`
        )
      );
    }
  });

  return toResult(issues);
}

export function assertValidZodiacsRegistrySchema(
  registry: unknown = ZODIACS_REGISTRY
): asserts registry is ZodiacsRegistry {
  const result = validateZodiacsRegistrySchema(registry);

  if (!result.valid) {
    throw new RegistryInvariantError(result.errors.join(" "));
  }
}

export function normalizeZodiacsRegistry(
  registry: ZodiacsRegistry = ZODIACS_REGISTRY
): ZodiacsRegistry {
  assertValidZodiacsRegistrySchema(registry);
  const assetsBySign = new Map(registry.assets.map((asset) => [asset.sign, asset]));

  return {
    name: "Zodiacs Official Registry",
    source: "https://zodiacs.org",
    sdk: "@zodiacs/sdk",
    version: registry.version,
    nativeChain: "solana",
    supportedChains: normalizeSupportedChains(registry.supportedChains),
    assets: ZODIAC_SIGNS.map((sign) => normalizeAsset(assetsBySign.get(sign) as ZodiacAsset))
  };
}

function validateRegistryHeader(
  registry: Record<string, unknown>,
  issues: RegistryInvariantIssue[]
): void {
  if (registry.name !== "Zodiacs Official Registry") {
    issues.push(
      issue("invalid-registry", "$.name", "Registry name must be Zodiacs Official Registry.")
    );
  }

  if (registry.source !== "https://zodiacs.org") {
    issues.push(
      issue("invalid-registry", "$.source", "Registry source must be https://zodiacs.org.")
    );
  }

  if (registry.sdk !== "@zodiacs/sdk") {
    issues.push(issue("invalid-registry", "$.sdk", "Registry sdk field must be @zodiacs/sdk."));
  }

  if (typeof registry.version !== "string" || !registry.version.trim()) {
    issues.push(issue("invalid-registry", "$.version", "Registry version is required."));
  }

  if (registry.nativeChain !== "solana") {
    issues.push(issue("invalid-registry", "$.nativeChain", "Registry nativeChain must be solana."));
  }
}

function validateSupportedChains(
  chains: readonly unknown[],
  issues: RegistryInvariantIssue[]
): void {
  const expected = new Set(["solana:native:SPL", `base:bridged:ERC20:${BASE_CHAIN_ID}`]);

  for (const [index, chain] of chains.entries()) {
    if (
      !isRecord(chain) ||
      typeof chain.chain !== "string" ||
      typeof chain.kind !== "string" ||
      typeof chain.tokenStandard !== "string"
    ) {
      issues.push(
        issue(
          "invalid-supported-chain",
          `$.supportedChains[${index}]`,
          "Supported chain entry is invalid."
        )
      );
      continue;
    }

    const key = `${chain.chain}:${chain.kind}:${chain.tokenStandard}${chain.chainId ? `:${String(chain.chainId)}` : ""}`;
    expected.delete(key);
  }

  for (const missing of expected) {
    issues.push(
      issue(
        "invalid-supported-chain",
        "$.supportedChains",
        `Missing supported chain entry: ${missing}.`
      )
    );
  }
}

function validateAsset(
  asset: unknown,
  index: number,
  seenSigns: Set<ZodiacSign>,
  seenAddresses: Map<string, string>,
  issues: RegistryInvariantIssue[]
): void {
  const path = `$.assets[${index}]`;

  if (!isRecord(asset)) {
    issues.push(issue("invalid-registry", path, "Asset must be an object."));
    return;
  }

  if (!isZodiacSign(asset.sign)) {
    issues.push(
      issue(
        "missing-asset-field",
        `${path}.sign`,
        "Asset sign must be one of the twelve zodiac signs."
      )
    );
    return;
  }

  const sign = asset.sign;

  if (seenSigns.has(sign)) {
    issues.push(issue("duplicate-sign", `${path}.sign`, `Duplicate asset for ${sign}.`));
  }

  seenSigns.add(sign);

  if (typeof asset.displayName !== "string" || !asset.displayName.trim()) {
    issues.push(
      issue("missing-asset-field", `${path}.displayName`, `${sign} displayName is required.`)
    );
  }

  validateMetadata(asset.metadata, `${path}.metadata`, issues);

  if (!isRecord(asset.native)) {
    issues.push(
      issue(
        "invalid-native-representation",
        `${path}.native`,
        `${sign} native representation is required.`
      )
    );
  }

  if (!Array.isArray(asset.representations)) {
    issues.push(
      issue(
        "invalid-representation",
        `${path}.representations`,
        `${sign} representations must be an array.`
      )
    );
    return;
  }

  const representations = asset.representations;
  const nativeRepresentations = representations.filter(
    (representation) =>
      isRecord(representation) &&
      representation.chain === "solana" &&
      representation.kind === "native"
  );
  const baseRepresentations = representations.filter(
    (representation) =>
      isRecord(representation) &&
      representation.chain === "base" &&
      representation.kind === "bridged"
  );

  if (nativeRepresentations.length !== 1) {
    issues.push(
      issue(
        "invalid-native-representation",
        `${path}.representations`,
        `${sign} must have one native Solana representation.`
      )
    );
  }

  if (baseRepresentations.length !== 1) {
    issues.push(
      issue(
        "invalid-base-representation",
        `${path}.representations`,
        `${sign} must have one Base bridged representation.`
      )
    );
  }

  representations.forEach((representation, representationIndex) => {
    validateRepresentation(
      representation,
      sign,
      `${path}.representations[${representationIndex}]`,
      seenAddresses,
      issues
    );
  });

  const native = nativeRepresentations[0];
  const base = baseRepresentations[0];

  if (
    isRecord(asset.native) &&
    isRecord(native) &&
    JSON.stringify(asset.native) !== JSON.stringify(native)
  ) {
    issues.push(
      issue(
        "invalid-native-representation",
        `${path}.native`,
        `${sign} native field must match the Solana representation.`
      )
    );
  }

  if (isRecord(native) && isRecord(base) && base.originAddress !== native.address) {
    issues.push(
      issue(
        "invalid-origin",
        `${path}.representations`,
        `${sign} Base representation must point to the matching Solana origin.`
      )
    );
  }
}

function validateMetadata(metadata: unknown, path: string, issues: RegistryInvariantIssue[]): void {
  if (!isRecord(metadata)) {
    issues.push(issue("missing-metadata-field", path, "Metadata must be an object."));
    return;
  }

  if (typeof metadata.element !== "string" || !elementSet.has(metadata.element as ZodiacElement)) {
    issues.push(
      issue("missing-metadata-field", `${path}.element`, "Metadata element is required.")
    );
  }

  if (
    typeof metadata.modality !== "string" ||
    !modalitySet.has(metadata.modality as ZodiacModality)
  ) {
    issues.push(
      issue("missing-metadata-field", `${path}.modality`, "Metadata modality is required.")
    );
  }

  for (const key of ["rulingPlanet", "archetype", "dateRange", "shortBio"]) {
    if (typeof metadata[key] !== "string" || !metadata[key].trim()) {
      issues.push(
        issue("missing-metadata-field", `${path}.${key}`, `Metadata ${key} is required.`)
      );
    }
  }
}

function validateRepresentation(
  representation: unknown,
  sign: ZodiacSign,
  path: string,
  seenAddresses: Map<string, string>,
  issues: RegistryInvariantIssue[]
): void {
  if (!isRecord(representation)) {
    issues.push(issue("invalid-representation", path, "Representation must be an object."));
    return;
  }

  if (representation.sign !== sign) {
    issues.push(
      issue("invalid-representation", `${path}.sign`, `Representation sign must be ${sign}.`)
    );
  }

  if (representation.chain !== "solana" && representation.chain !== "base") {
    issues.push(
      issue(
        "invalid-representation",
        `${path}.chain`,
        "Representation chain must be solana or base."
      )
    );
    return;
  }

  if (typeof representation.address !== "string" || !representation.address.trim()) {
    issues.push(
      issue("invalid-address", `${path}.address`, `${sign} representation address is required.`)
    );
    return;
  }

  const normalizedAddress = normalizeRepresentationAddress(
    representation.address,
    representation.chain,
    path,
    issues
  );

  if (normalizedAddress) {
    const addressKey = `${representation.chain}:${normalizedAddress.toLowerCase()}`;
    const previous = seenAddresses.get(addressKey);

    if (previous) {
      issues.push(
        issue(
          "duplicate-address",
          `${path}.address`,
          `${representation.address} duplicates ${previous}.`
        )
      );
    }

    seenAddresses.set(addressKey, path);
  }

  if (representation.chain === "solana") {
    validateNativeRepresentation(representation, sign, path, issues);
    validateRepresentationDisplayFields(representation, sign, path, issues);
    return;
  }

  validateBaseRepresentation(representation, sign, path, issues);
  validateRepresentationDisplayFields(representation, sign, path, issues);
}

function validateNativeRepresentation(
  representation: Record<string, unknown>,
  sign: ZodiacSign,
  path: string,
  issues: RegistryInvariantIssue[]
): void {
  if (representation.kind !== "native" || representation.tokenStandard !== "SPL") {
    issues.push(
      issue(
        "invalid-native-representation",
        path,
        `${sign} Solana representation must be native SPL.`
      )
    );
  }

  if (
    representation.isCanonicalOrigin !== true ||
    representation.isOfficialRepresentation !== true
  ) {
    issues.push(
      issue(
        "invalid-native-representation",
        path,
        `${sign} Solana representation must be official canonical origin.`
      )
    );
  }
}

function validateBaseRepresentation(
  representation: Record<string, unknown>,
  sign: ZodiacSign,
  path: string,
  issues: RegistryInvariantIssue[]
): void {
  if (
    representation.chainId !== BASE_CHAIN_ID ||
    representation.kind !== "bridged" ||
    representation.tokenStandard !== "ERC20"
  ) {
    issues.push(
      issue(
        "invalid-base-representation",
        path,
        `${sign} Base representation must be bridged ERC20 on Base mainnet.`
      )
    );
  }

  if (
    representation.isCanonicalOrigin !== false ||
    representation.isOfficialRepresentation !== true
  ) {
    issues.push(
      issue(
        "invalid-base-representation",
        path,
        `${sign} Base representation must be official but not canonical origin.`
      )
    );
  }

  if (representation.originChain !== "solana" || typeof representation.originAddress !== "string") {
    issues.push(
      issue("invalid-origin", path, `${sign} Base representation origin must reference Solana.`)
    );
  }
}

function validateRepresentationDisplayFields(
  representation: Record<string, unknown>,
  sign: ZodiacSign,
  path: string,
  issues: RegistryInvariantIssue[]
): void {
  if (typeof representation.name !== "string" || !representation.name.trim()) {
    issues.push(
      issue("invalid-representation", `${path}.name`, `${sign} representation name is required.`)
    );
  }

  if (typeof representation.symbol !== "string" || !representation.symbol.trim()) {
    issues.push(
      issue(
        "invalid-representation",
        `${path}.symbol`,
        `${sign} representation symbol is required.`
      )
    );
  }

  if (
    !Number.isInteger(representation.decimals) ||
    Number(representation.decimals) < 0 ||
    Number(representation.decimals) > 18
  ) {
    issues.push(
      issue(
        "invalid-representation",
        `${path}.decimals`,
        `${sign} representation decimals must be 0 through 18.`
      )
    );
  }
}

function normalizeSupportedChains(
  chains: readonly ZodiacsSupportedChain[]
): readonly ZodiacsSupportedChain[] {
  return [
    chains.find((chain) => chain.chain === "solana") as ZodiacsSupportedChain,
    chains.find((chain) => chain.chain === "base") as ZodiacsSupportedChain
  ];
}

function normalizeAsset(asset: ZodiacAsset): ZodiacAsset {
  const native = normalizeRepresentation(asset.native);
  const representationsByChain = new Map(
    asset.representations.map((representation) => [representation.chain, representation])
  );
  const base = normalizeRepresentation(representationsByChain.get("base") as ZodiacRepresentation);

  return {
    sign: asset.sign,
    displayName: asset.displayName,
    metadata: {
      element: asset.metadata.element,
      modality: asset.metadata.modality,
      rulingPlanet: asset.metadata.rulingPlanet,
      archetype: asset.metadata.archetype,
      dateRange: asset.metadata.dateRange,
      ...(asset.metadata.shortBio ? { shortBio: asset.metadata.shortBio } : {})
    },
    native,
    representations: [native, base]
  };
}

function normalizeRepresentation(representation: ZodiacRepresentation): ZodiacRepresentation {
  const address =
    representation.chain === "base"
      ? normalizeEvmAddress(representation.address)
      : normalizeSolanaAddress(representation.address);

  return {
    ...representation,
    address,
    ...(representation.originAddress
      ? { originAddress: normalizeSolanaAddress(representation.originAddress) }
      : {})
  };
}

function normalizeRepresentationAddress(
  address: string,
  chain: ZodiacChain,
  path: string,
  issues: RegistryInvariantIssue[]
): string | null {
  try {
    return chain === "base" ? normalizeEvmAddress(address) : normalizeSolanaAddress(address);
  } catch {
    issues.push(
      issue("invalid-address", `${path}.address`, `Invalid ${chain} address: ${address}.`)
    );
    return null;
  }
}

function isZodiacSign(value: unknown): value is ZodiacSign {
  return typeof value === "string" && signSet.has(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function issue(code: RegistryInvariantCode, path: string, message: string): RegistryInvariantIssue {
  return { code, path, message };
}

function toResult(issues: readonly RegistryInvariantIssue[]): RuntimeRegistryValidationResult {
  return {
    valid: issues.length === 0,
    issues,
    errors: issues.map((item) => `${item.path}: ${item.message}`)
  };
}
