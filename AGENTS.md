# AGENTS.md

Tamagotchi — cross-platform React Native (Expo) virtual pet app.

## Commands

```bash
pnpm start / pnpm run ios / pnpm run android / pnpm run web   # dev
pnpm run lint / pnpm run format                                # lint
pnpm test                                                       # Jest unit tests
pnpm exec jest src/path/to/file.test.ts                         # single file
```

## Architecture

FSD-inspired layers: `app/` (routes, `src/app/`) → `view/` → `widget/` → `entity/` → `shared/`

```
src/
  app/      Expo Router routes (file-based)
  view/     screen-level compositions
  widget/   feature-level composite UI
  entity/   domain data + hooks (api/model/ui per entity)
  shared/   api/  lib/  store/  ui/  types/  consts/
```

State: Zustand (UI) + React Query (server, 5 min cache).
API: `src/shared/lib/axios.ts` (base URL from `EXPO_PUBLIC_API_URL`, 5s timeout).
Styling: NativeWind — `className` prop, never `StyleSheet`.
Alias: `~/` or `@/` → `src/`.

See `.claude/rules/fsd-architecture.md` and `.claude/rules/code-patterns.md` for conventions.
`/new-entity <domain>` scaffolds a new entity. `/check` runs the full local quality gate.

## Environment

```
EXPO_PUBLIC_API_URL=
```

## CI

`.github/workflows/ci.yml` — lint + typecheck + test on push/PR to `main`.

Note: Expo SDK 57 — check https://docs.expo.dev/versions/v57.0.0/ for versioned API docs before writing native/config code.
