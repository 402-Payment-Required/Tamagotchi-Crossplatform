import { create } from 'zustand';

interface MissionProgressState {
  // mission ids the user has completed (frontend-only, resets on app restart)
  done: string[];
  complete: (id: string) => void;
  reset: () => void;
}

export const useMissionProgress = create<MissionProgressState>()((set) => ({
  done: [],
  complete: (id) =>
    set((state) => (state.done.includes(id) ? state : { done: [...state.done, id] })),
  reset: () => set({ done: [] }),
}));
