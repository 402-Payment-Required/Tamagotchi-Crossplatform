import { useQuery } from '@tanstack/react-query';

import { getReport } from '../api/reportApi';

export const useReport = (userId: string | null) =>
  useQuery({
    queryKey: ['report', userId],
    queryFn: () => getReport(userId as string),
    enabled: !!userId,
  });
