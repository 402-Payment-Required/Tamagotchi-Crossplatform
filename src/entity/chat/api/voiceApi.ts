import { File } from 'expo-file-system';

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
  // ponytail: send the recording as base64 in a JSON body, not a multipart file.
  // RN can't reliably attach a {uri,name,type} file part (server saw no audio →
  // 422), but JSON POST is rock-solid here (same path as /chat and /voice/start).
  try {
    const audioBase64 = await new File(audioUri).base64();
    const { data } = await instance.post<VoiceChatResponse>('/voice/chat', {
      user_id: userId,
      session_id: sessionId,
      audio_base64: audioBase64,
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
