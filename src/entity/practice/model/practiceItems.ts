import { Ionicons } from '@expo/vector-icons';

import type { PracticeId, PracticeStatus } from '~/shared/store/usePracticeStore';

export interface PracticeMeta {
  id: PracticeId;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const PRACTICE_ITEMS: PracticeMeta[] = [
  { id: 'kiosk', title: '카페 키오스크 주문', icon: 'cafe' },
  { id: 'sms', title: '문자 보내기', icon: 'chatbox-ellipses' },
  { id: 'hospital', title: '병원 예약', icon: 'medkit' },
];

export const STATUS_NOTE: Record<PracticeStatus, string> = {
  done: '완료했어요',
  active: '이어서 하기',
  locked: '곧 열려요',
};
