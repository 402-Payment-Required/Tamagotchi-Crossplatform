import { useMissionProgress } from '~/shared/store/useMissionProgress';

import { MISSIONS, getMission } from './missions';

describe('missions data', () => {
  it('every mission has at least one step and a done message', () => {
    for (const mission of MISSIONS) {
      expect(mission.steps.length).toBeGreaterThan(0);
      expect(mission.doneMessage.length).toBeGreaterThan(0);
    }
  });

  it('every option step lists at least two choices', () => {
    for (const mission of MISSIONS) {
      for (const step of mission.steps) {
        if (step.options) expect(step.options.length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('getMission finds by id and returns undefined for unknown', () => {
    expect(getMission('kiosk_cafe')?.title).toBe('카페 키오스크 주문');
    expect(getMission('nope')).toBeUndefined();
  });
});

describe('useMissionProgress', () => {
  beforeEach(() => useMissionProgress.getState().reset());

  it('marks a mission done and dedupes repeats', () => {
    useMissionProgress.getState().complete('kiosk_cafe');
    useMissionProgress.getState().complete('kiosk_cafe');
    expect(useMissionProgress.getState().done).toEqual(['kiosk_cafe']);
  });

  it('tracks multiple missions', () => {
    useMissionProgress.getState().complete('kiosk_cafe');
    useMissionProgress.getState().complete('typing_1');
    expect(useMissionProgress.getState().done).toEqual(['kiosk_cafe', 'typing_1']);
  });
});
