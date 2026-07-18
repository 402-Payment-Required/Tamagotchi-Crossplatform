import { useQuery } from '@tanstack/react-query';

import { getMissionList } from '../api/missionApi';
import { STATUS_NOTE, TYPE_ICON } from './practiceItems';

export const usePracticeList = (userId: string | null) =>
  useQuery({
    queryKey: ['missions', userId],
    queryFn: async () => {
      const missions = await getMissionList(userId as string);
      return missions.map((mission) => ({
        id: mission.mission_id,
        title: mission.title,
        type: mission.type,
        status: mission.status,
        icon: TYPE_ICON[mission.type],
        note: STATUS_NOTE[mission.status],
      }));
    },
    enabled: !!userId,
  });
