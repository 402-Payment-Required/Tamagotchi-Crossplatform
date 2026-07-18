import * as FileSystem from 'expo-file-system/legacy';

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
  // ponytail: use expo-file-system's native uploadAsync(MULTIPART), NOT JS
  // FormData/fetch. RN's JS FormData drops the file part (server saw no audio →
  // 422); the native uploader builds the multipart body with the file correctly.
  // Server field names: file part = "audio", extra fields = user_id/session_id.
  try {
    const result = await FileSystem.uploadAsync(
      `${process.env.EXPO_PUBLIC_API_URL}/voice/chat`,
      audioUri,
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'audio',
        mimeType: 'audio/m4a',
        parameters: { user_id: userId, session_id: sessionId },
      }
    );
    if (result.status < 200 || result.status >= 300) {
      throw new Error(`voice/chat ${result.status}: ${result.body}`);
    }
    return JSON.parse(result.body) as VoiceChatResponse;
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
