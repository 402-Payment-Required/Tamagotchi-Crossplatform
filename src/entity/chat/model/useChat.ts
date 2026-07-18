import { useMutation } from '@tanstack/react-query';

import { postChat } from '../api/chatApi';

export const useChat = () =>
  useMutation({
    mutationFn: ({ userId, message }: { userId: string; message: string }) =>
      postChat(userId, message),
  });
