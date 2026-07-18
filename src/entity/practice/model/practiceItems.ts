import { Ionicons } from '@expo/vector-icons';

import type { MissionStatus, MissionType } from '../api/missionApi';

export const TYPE_ICON: Record<MissionType, keyof typeof Ionicons.glyphMap> = {
  kiosk: 'cafe',
  typing: 'create',
  sms: 'chatbox-ellipses',
};

export const STATUS_NOTE: Record<MissionStatus, string> = {
  done: '완료했어요',
  inprogress: '이어서 하기',
  locked: '아직 안 해봤어요',
};
