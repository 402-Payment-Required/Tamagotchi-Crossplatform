import { instance } from '~/shared/lib/axios';
import { getErrorMessage } from '~/shared/lib/errorHandler';

import type { Emotion } from './chatApi';

export interface VoiceChatResponse {
  audio: string;
  reply: string;
  emotion: Emotion;
  signals: Record<string, unknown>;
}

export const postVoiceStart = async (userId: string): Promise<string> => {
  try {
    const { data } = await instance.post<{ session_id: string }>('/voice/start', {
      user_id: userId,
    });
    return data.session_id;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const postVoiceChat = async (
  userId: string,
  sessionId: string,
  audioUri: string
): Promise<VoiceChatResponse> => {
  try {
    const form = new FormData();
    form.append('user_id', userId);
    form.append('session_id', sessionId);
    form.append(
      'audio',
      // React Native's FormData accepts {uri, name, type} for file parts; DOM's Blob type doesn't cover this.
      { uri: audioUri, name: 'recording.m4a', type: 'audio/m4a' } as unknown as Blob
    );
    const { data } = await instance.post<VoiceChatResponse>('/voice/chat', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const postVoiceEnd = async (userId: string, sessionId: string): Promise<void> => {
  try {
    await instance.post('/voice/end', { user_id: userId, session_id: sessionId });
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
