import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  // ponytail: 20s, not 5s — /voice/chat round-trips through STT+LLM+TTS
  timeout: 20000,
});
