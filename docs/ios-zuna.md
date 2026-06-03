# iOS and Zuna Integration Guide

Zuna should use Zodiacs through a small read-only backend API that imports
`@zodiacs/sdk`. Native Swift and SwiftUI code should call that backend over
HTTPS and should not import the TypeScript SDK directly.

Wallet context is optional. The app can show Zuna identity surfaces without a
wallet, and a connected public address can add optional registry context when
verified zodiac holdings appear. Wallet ownership must not be used for paid
digital feature access unless the app has handled all App Store, legal, and
payments requirements outside this SDK.

## Product Rules

- No wallet required.
- No token-gating.
- No purchases, unlocks, or paid digital benefits through wallet ownership.
- No prices, P&L, market cap, portfolio charts, or trading language.
- No private keys, seed phrases, signatures, or transaction submission.
- No swaps, approvals, transfers, custody, or acquisition flows.
- Treat Zodiacs as cultural assets and symbolic identity context.

## Recommended Architecture

1. SwiftUI calls a read-only JSON API.
2. The backend validates public addresses.
3. The backend reads Solana and Base public ownership state with
   `@zodiacs/sdk`.
4. The backend returns `getZunaSafeWalletContext` plus optional registry and
   identity context.
5. SwiftUI renders the returned text and facts without creating wallet clients.

## Recommended Swift Protocols

```swift
public protocol WalletReadOnlyProvider {
    var publicAddress: String? { get }
    var chain: String? { get }
}

public protocol ZodiacsIdentityProvider {
    func fetchZodiacsContext(
        wallet: WalletReadOnlyProvider?
    ) async throws -> ZunaZodiacsContext
}

public protocol ZunaIdentityAPIClient {
    func signs() async throws -> [ZodiacSign]
    func solanaOwnership(address: String) async throws -> ZodiacsOwnership
    func baseOwnership(address: String) async throws -> ZodiacsOwnership
    func context(request: ZodiacsContextRequest) async throws -> ZunaZodiacsContext
}
```

## Minimal Models

```swift
public struct ZunaZodiacsContext: Decodable, Sendable {
    public let readOnly: Bool
    public let walletRequired: Bool
    public let headline: String
    public let description: String
    public let verifiedZodiacHoldings: [String]
    public let optionalContextFacts: [ZodiacFact]
}

public struct ZodiacFact: Decodable, Sendable {
    public let label: String
    public let value: String
}
```

## Backend SDK Usage

```ts
import { getBaseZodiacsOwnership } from "@zodiacs/sdk/base";
import { getSolanaZodiacsOwnership } from "@zodiacs/sdk/solana";
import { getZunaSafeWalletContext } from "@zodiacs/sdk/identity";

const solana = solanaAddress
  ? await getSolanaZodiacsOwnership(solanaConnection, solanaAddress)
  : undefined;
const base = baseAddress ? await getBaseZodiacsOwnership(basePublicClient, baseAddress) : undefined;

return getZunaSafeWalletContext(
  { solana, base },
  {
    publicAddress: baseAddress ?? solanaAddress
  }
);
```

## App Store Notes

Viewing publicly owned cultural assets can be framed as identity/profile
context. Avoid using wallet ownership as a paid digital entitlement mechanism.
Do not reward users with crypto or tokens for downloads, invites, social
posting, or other app activity. Keep exchange, trading, and custody flows out
of this SDK-backed experience.
