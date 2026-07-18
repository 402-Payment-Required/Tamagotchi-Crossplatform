import { instance } from '~/shared/lib/axios';
import { getErrorMessage } from '~/shared/lib/errorHandler';

export type MissionType = 'kiosk' | 'typing' | 'sms';
export type MissionStatus = 'locked' | 'inprogress' | 'done';

export interface MissionItem {
  mission_id: string;
  title: string;
  type: MissionType;
  status: MissionStatus;
}

export interface MissionStep {
  step: number | null;
  prompt: string | null;
  options: string[] | null;
  hint: string | null;
}

export interface MissionStepResult extends MissionStep {
  correct: boolean;
  done: boolean;
  message: string | null;
}

export const getMissionList = async (userId: string): Promise<MissionItem[]> => {
  try {
    const { data } = await instance.get<{ missions: MissionItem[] }>('/mission/list', {
      params: { user_id: userId },
    });
    return data.missions;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const startMission = async (userId: string, missionId: string): Promise<MissionStep> => {
  try {
    const { data } = await instance.post<MissionStep>('/mission/start', {
      user_id: userId,
      mission_id: missionId,
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const stepMission = async (
  userId: string,
  missionId: string,
  action: string
): Promise<MissionStepResult> => {
  try {
    const { data } = await instance.post<MissionStepResult>('/mission/step', {
      user_id: userId,
      mission_id: missionId,
      action,
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const completeMission = async (
  userId: string,
  missionId: string
): Promise<{ mission_id: string; status: MissionStatus }> => {
  try {
    const { data } = await instance.post<{ mission_id: string; status: MissionStatus }>(
      '/mission/complete',
      { user_id: userId, mission_id: missionId }
    );
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
