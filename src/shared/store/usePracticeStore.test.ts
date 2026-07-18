import { usePracticeStore } from './usePracticeStore';

describe('usePracticeStore', () => {
  beforeEach(() => {
    usePracticeStore.setState({ status: { kiosk: 'active', sms: 'locked', hospital: 'locked' } });
  });

  it('starts with only kiosk active', () => {
    expect(usePracticeStore.getState().status).toEqual({
      kiosk: 'active',
      sms: 'locked',
      hospital: 'locked',
    });
  });

  it('completing kiosk marks it done and unlocks sms', () => {
    usePracticeStore.getState().complete('kiosk');
    expect(usePracticeStore.getState().status).toEqual({
      kiosk: 'done',
      sms: 'active',
      hospital: 'locked',
    });
  });

  it('completing the last item does not unlock anything further', () => {
    usePracticeStore.getState().complete('kiosk');
    usePracticeStore.getState().complete('sms');
    usePracticeStore.getState().complete('hospital');
    expect(usePracticeStore.getState().status).toEqual({
      kiosk: 'done',
      sms: 'done',
      hospital: 'done',
    });
  });
});
