import { Ionicons } from '@expo/vector-icons';

export type MissionId = 'kiosk_cafe' | 'typing_1' | 'sms_greeting';

export interface MissionStep {
  prompt: string;
  hint: string;
  // options present → tap-to-answer; absent → free text input
  options?: string[];
}

export interface Mission {
  id: MissionId;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  steps: MissionStep[];
  doneMessage: string;
}

// ponytail: missions run fully on the frontend — no backend. Content mirrors the
// server's mission script so the demo flow is identical but never fails a request.
export const MISSIONS: Mission[] = [
  {
    id: 'kiosk_cafe',
    title: '카페 키오스크 주문',
    icon: 'cafe',
    steps: [
      {
        prompt: '매장에서 드시나요, 포장하시나요?',
        hint: "큰 버튼 '매장에서 먹기'를 눌러보세요",
        options: ['매장에서 먹기', '포장하기'],
      },
      {
        prompt: '메뉴를 골라 주세요',
        hint: "'아메리카노'를 눌러보세요",
        options: ['아메리카노', '카페라떼', '녹차'],
      },
      {
        prompt: '포인트 적립하시겠어요?',
        hint: "'아니오'를 눌러보세요",
        options: ['예', '아니오'],
      },
    ],
    doneMessage: '주문 완료! 이제 혼자서도 할 수 있어요 🎉',
  },
  {
    id: 'typing_1',
    title: '문자 따라 쓰기',
    icon: 'create',
    steps: [
      {
        prompt: "이 문장을 그대로 입력해 보세요:\n'오늘 날씨가 좋네요'",
        hint: '천천히 따라 적어 보세요',
      },
    ],
    doneMessage: '잘 쓰셨어요! 문자 보내기가 한결 쉬워졌어요 ✍️',
  },
  {
    id: 'sms_greeting',
    title: '손주에게 안부 문자 보내기',
    icon: 'chatbox-ellipses',
    steps: [
      {
        prompt: '받는 사람을 골라 주세요',
        hint: "제일 위 '손주' 버튼을 눌러보세요",
        options: ['손주', '손녀', '친구'],
      },
      {
        prompt: '보낼 내용을 골라 주세요',
        hint: '마음에 드는 문장을 눌러보세요',
        options: ['오늘 밥 잘 먹었니?', '보고 싶구나', '사랑한다'],
      },
      {
        prompt: '이제 보내 볼까요?',
        hint: "'보내기'를 눌러보세요",
        options: ['보내기'],
      },
    ],
    doneMessage: '문자를 보냈어요! 손주가 정말 기뻐할 거예요 💌',
  },
];

export const getMission = (id: string): Mission | undefined =>
  MISSIONS.find((mission) => mission.id === id);
