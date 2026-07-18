# Code Patterns

## API Function

```ts
import { instance } from '~/shared/lib/axios';
import { getErrorMessage } from '~/shared/lib/errorHandler';

export interface XxxResponse { /* fields */ }

export const getXxx = async (id: string): Promise<XxxResponse> => {
  try {
    const { data } = await instance.get<XxxResponse>(`/xxx/${id}`);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
```

Rules:
- Always use `instance` from `~/shared/lib/axios`, never raw `fetch` or `axios`
- Wrap catch with `getErrorMessage`, never swallow errors silently
- Return typed response, no `any`

## React Query Hook

```ts
import { useQuery } from '@tanstack/react-query';
import { getXxx, XxxResponse } from '../api/xxxApi';

export const useXxx = (id: string | undefined) =>
  useQuery<XxxResponse>({
    queryKey: ['xxx', id],
    queryFn: () => {
      if (!id) throw new Error('need ID');
      return getXxx(id);
    },
    enabled: !!id,
  });
```

Rules:
- Server state lives in React Query, **never** in Zustand
- `queryKey` must be an array: `['domain', param]`
- Guard optional params with `enabled: !!id`
- Mutations use `useMutation` + `queryClient.invalidateQueries` on success

## Zustand Store

```ts
import { create } from 'zustand';

interface State { field: string; setField: (v: string) => void; reset: () => void; }
const initialState = { field: '' };

export const useXxxStore = create<State>()((set) => ({
  ...initialState,
  setField: (v) => set({ field: v }),
  reset: () => set(initialState),
}));
```

Rules:
- Zustand is for **UI/form state only** (multi-step flows, local toggles)
- Always include a `reset` action
- Store files live in `src/shared/store/` only

## NativeWind Styling

```tsx
// ✓ Use className
<View className="flex-1 bg-white px-4 py-3">
  <Text className="text-lg font-semibold">제목</Text>
</View>

// ✗ Never use StyleSheet
const styles = StyleSheet.create({ ... });
```

## Import Alias

```ts
import { instance } from '~/shared/lib/axios';   // ✓ preferred
import { instance } from '@/shared/lib/axios';    // ✓ also OK
import { instance } from '../../../shared/lib/axios'; // ✗
```
