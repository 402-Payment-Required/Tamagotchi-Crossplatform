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
  // ponytail: fetch, not axios — RN's fetch builds the multipart body (boundary +
  // {uri,name,type} file part) natively. axios mangles RN FormData file parts, so
  // the server saw no fields and returned 422 "missing". Do NOT set Content-Type;
  // fetch adds it with the boundary itself.
  const form = new FormData();
  form.append('user_id', userId);
  form.append('session_id', sessionId);
  form.append('audio', {
    uri: audioUri,
    name: 'recording.m4a',
    type: 'audio/m4a',
  } as unknown as Blob);

  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/voice/chat`, {
      method: 'POST',
      body: form,
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`voice/chat ${response.status}: ${detail}`);
    }
    return (await response.json()) as VoiceChatResponse;
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
