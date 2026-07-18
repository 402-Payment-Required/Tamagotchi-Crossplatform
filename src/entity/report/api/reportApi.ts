import { instance } from '~/shared/lib/axios';
import { getErrorMessage } from '~/shared/lib/errorHandler';

export interface ReportSignal {
  type: string;
  value: string;
  ts: string;
}

export interface ReportResponse {
  user_id: string;
  signals: ReportSignal[];
}

export const getReport = async (userId: string): Promise<ReportResponse> => {
  try {
    const { data } = await instance.get<ReportResponse>('/report', {
      params: { user_id: userId },
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
