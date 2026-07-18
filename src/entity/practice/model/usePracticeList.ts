import { usePracticeStore } from '~/shared/store/usePracticeStore';

import { PRACTICE_ITEMS, STATUS_NOTE } from './practiceItems';

export const usePracticeList = () => {
  const status = usePracticeStore((state) => state.status);
  return PRACTICE_ITEMS.map((item) => ({
    ...item,
    status: status[item.id],
    note: STATUS_NOTE[status[item.id]],
  }));
};
