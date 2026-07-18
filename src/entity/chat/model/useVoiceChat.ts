import { useMutation } from '@tanstack/react-query';

import { postVoiceChat, postVoiceEnd, postVoiceStart } from '../api/voiceApi';

export const useVoiceStart = () =>
  useMutation({ mutationFn: (userId: string) => postVoiceStart(userId) });

export const useVoiceChat = () =>
  useMutation({
    mutationFn: ({
      userId,
      sessionId,
      audioUri,
    }: {
      userId: string;
      sessionId: string;
      audioUri: string;
    }) => postVoiceChat(userId, sessionId, audioUri),
  });

export const useVoiceEnd = () =>
  useMutation({
    mutationFn: ({ userId, sessionId }: { userId: string; sessionId: string }) =>
      postVoiceEnd(userId, sessionId),
  });
