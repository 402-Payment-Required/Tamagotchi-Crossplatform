import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CharacterId = 'grandson' | 'granddaughter' | 'cat' | 'dog';

interface SessionState {
  hasHydrated: boolean;
  phone: string | null;
  // stable per-install id — used as the API user_id when there's no phone, so we
  // never send an empty user_id (uploadAsync drops empty params → server 422).
  deviceId: string;
  character: CharacterId | null;
  isAuthenticated: boolean;
  login: (phone: string) => void;
  selectCharacter: (character: CharacterId) => void;
  logout: () => void;
}

const initialState = {
  phone: null,
  character: null,
  isAuthenticated: false,
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      deviceId: `guest-${Math.random().toString(36).slice(2, 10)}`,
      ...initialState,
      login: (phone) => set({ phone, isAuthenticated: true }),
      selectCharacter: (character) => set({ character }),
      logout: () => set(initialState),
    }),
    {
      name: 'sonju-session',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        phone: state.phone,
        deviceId: state.deviceId,
        character: state.character,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => () => {
        useSessionStore.setState({ hasHydrated: true });
      },
    }
  )
);

// The id sent to the backend as user_id — the logged-in phone, or the stable
// device id as a fallback. Never empty.
export const useApiUserId = () =>
  useSessionStore((state) =>
    state.phone && state.phone.trim().length > 0 ? state.phone : state.deviceId
  );
