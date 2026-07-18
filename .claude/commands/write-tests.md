Write unit tests for the specified file or feature: $ARGUMENTS

## Project Testing Context

- **Framework**: Jest (`jest-expo` preset) + React Testing Library
- **Path alias**: `~/` or `@/` maps to `src/`
- **Run tests**: `pnpm exec jest src/path/to/file.test.ts --no-coverage`

## Instructions

1. **Read the target file first** before writing any tests. Understand what it actually does.

2. **Follow existing test patterns** — check nearby `.test.ts` files for conventions already used in this codebase. If none exist yet, keep the first one simple and idiomatic.

3. **Test structure**:
   - Place test file next to the source file: `foo.ts` → `foo.test.ts`
   - Group with `describe`, name cases with `it` or `test`

4. **React Query hooks**: wrap in a `QueryClientProvider` with a fresh `QueryClient` per test.

5. **What to test**:
   - Happy path (normal expected behavior)
   - Error states (API failures, validation errors)
   - Edge cases specific to the feature
   - User interactions for UI components

6. **What NOT to test**:
   - Implementation details (internal state, private methods)
   - Third-party library internals
   - Trivial pass-through code

7. **Zustand stores**: test state transitions using `act`:
   ```ts
   import { act } from '@testing-library/react-native';
   const { setField } = useXxxStore.getState();
   act(() => setField('value'));
   expect(useXxxStore.getState().field).toBe('value');
   ```

8. After writing, run the tests to confirm they pass:
   ```bash
   pnpm exec jest <test-file-path> --no-coverage
   ```
   Fix any failures before finishing.
