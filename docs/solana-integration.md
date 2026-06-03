# Solana Integration Guide

Solana helpers read native SPL Zodiacs mints. Ownership reads use one wallet-level token account query where
possible, then map token accounts back to the official registry mints.

```ts
import { Connection } from "@solana/web3.js";
import { getSolanaZodiacsOwnership } from "@zodiacs/sdk/solana";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
const ownership = await getSolanaZodiacsOwnership(
  connection,
  "CWKQJJYec89wcx871C8vmyTPc3jhsdoAYs5aGffUtELJ"
);
```

Single-sign compatibility helpers such as `getZodiacBalance` remain available and read by mint. Ownership
helpers avoid one RPC call per sign by querying SPL token accounts by owner and token program. Unknown token
accounts are ignored; malformed official token accounts become typed unavailable balances.
