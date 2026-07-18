import { useMutation, useQueryClient } from '@tanstack/react-query';

import { completeMission, startMission, stepMission } from '../api/missionApi';

export const useStartMission = () =>
  useMutation({
    mutationFn: ({ userId, missionId }: { userId: string; missionId: string }) =>
      startMission(userId, missionId),
  });

export const useStepMission = () =>
  useMutation({
    mutationFn: ({
      userId,
      missionId,
      action,
    }: {
      userId: string;
      missionId: string;
      action: string;
    }) => stepMission(userId, missionId, action),
  });

export const useCompleteMission = (userId: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (missionId: string) => completeMission(userId as string, missionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['missions', userId] }),
  });
};
