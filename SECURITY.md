# Security Policy

Report security issues through the repository issue tracker or a private maintainer channel if one is
published by ZodiacsOfficial.

The SDK is read-only. It must not request private keys, sign messages, submit transactions, approve transfers,
custody assets, swap, trade, or move assets. Security reviews should focus on registry correctness, provenance,
address validation, RPC error handling, and accidental transaction-capable code entering core modules.
