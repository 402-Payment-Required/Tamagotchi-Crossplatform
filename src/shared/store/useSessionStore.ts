import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CharacterId = 'grandson' | 'granddaughter' | 'cat' | 'dog';

interface SessionState {
  hasHydrated: boolean;
  phone: string | null;
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
        character: state.character,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => () => {
        useSessionStore.setState({ hasHydrated: true });
      },
    }
  )
);
