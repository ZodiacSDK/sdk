# Contributing

Keep SDK core read-only and app-neutral.

Before opening a change:

```sh
corepack pnpm install
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

Registry changes require:

- evidence for official address updates
- invariant tests passing
- `corepack pnpm --filter @zodiacs/sdk registry:checksum`
- updated `packages/sdk/registry/zodiacs.registry.sha256`

Do not add buy, sell, swap, approval, signing, custody, reward, or claim flows to SDK core.
