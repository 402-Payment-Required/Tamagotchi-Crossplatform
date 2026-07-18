import { useMissionProgress } from '~/shared/store/useMissionProgress';

import { MISSIONS } from './missions';

export const usePracticeList = () => {
  const done = useMissionProgress((state) => state.done);
  return MISSIONS.map((mission) => {
    const isDone = done.includes(mission.id);
    return {
      id: mission.id,
      title: mission.title,
      icon: mission.icon,
      status: isDone ? ('done' as const) : ('todo' as const),
      note: isDone ? '완료했어요' : '해볼까요?',
    };
  });
};
