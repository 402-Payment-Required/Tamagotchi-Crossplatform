import { create } from 'zustand';

export type PracticeId = 'kiosk' | 'sms' | 'hospital';
export type PracticeStatus = 'done' | 'active' | 'locked';

interface PracticeState {
  status: Record<PracticeId, PracticeStatus>;
  complete: (id: PracticeId) => void;
}

// ponytail: fixed unlock order (kiosk -> sms -> hospital), revisit if practices stop being linear
const ORDER: PracticeId[] = ['kiosk', 'sms', 'hospital'];

export const usePracticeStore = create<PracticeState>()((set) => ({
  status: { kiosk: 'active', sms: 'locked', hospital: 'locked' },
  complete: (id) =>
    set((state) => {
      const next = { ...state.status, [id]: 'done' as const };
      const nextId = ORDER[ORDER.indexOf(id) + 1];
      if (nextId && next[nextId] === 'locked') next[nextId] = 'active';
      return { status: next };
    }),
}));
