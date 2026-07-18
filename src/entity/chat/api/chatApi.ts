import { instance } from '~/shared/lib/axios';
import { getErrorMessage } from '~/shared/lib/errorHandler';

export type Emotion = 'happy' | 'worried' | 'excited' | 'sad' | 'neutral';

export interface ChatResponse {
  reply: string;
  emotion: Emotion;
  signals: Record<string, unknown>;
}

export const postChat = async (userId: string, message: string): Promise<ChatResponse> => {
  try {
    const { data } = await instance.post<ChatResponse>('/chat', {
      user_id: userId,
      message,
    });
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
