# Release Checklist

1. Confirm no core module imports React.
2. Confirm no core code signs, submits transactions, approves transfers, swaps, trades, or custodies assets.
3. Run `corepack pnpm install --frozen-lockfile`.
4. Run `corepack pnpm lint`.
5. Run `corepack pnpm typecheck`.
6. Run `corepack pnpm test`.
7. Run `corepack pnpm --filter @zodiacs/sdk registry:checksum`.
8. Run `corepack pnpm build`.
9. Build `examples/base-app`.
10. Review registry/provenance docs and changelog.
