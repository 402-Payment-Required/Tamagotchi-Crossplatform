import { Ionicons } from '@expo/vector-icons';

export type MissionId =
  | 'kiosk_cafe'
  | 'kiosk_fastfood'
  | 'hospital_checkin'
  | 'subway_ticket'
  | 'atm_withdraw'
  | 'sms_greeting'
  | 'typing_1';

export interface MissionStep {
  prompt: string;
  hint: string;
  // options present → tap-to-answer; absent → free text input
  options?: string[];
}

export interface Mission {
  id: MissionId;
  title: string;
  // one-line description of the real-world situation this rehearses
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  steps: MissionStep[];
  doneMessage: string;
}

// ponytail: missions run fully on the frontend (no backend). Each one rehearses a
// real situation older adults struggle with — the wording mirrors the actual
// kiosks/machines so the practice transfers. Any choice advances (no wrong answers).
export const MISSIONS: Mission[] = [
  {
    id: 'kiosk_cafe',
    title: '카페 키오스크 주문',
    subtitle: '카페에서 화면으로 음료 주문하기',
    icon: 'cafe',
    steps: [
      {
        prompt: '드시고 가세요, 포장하세요?',
        hint: "'매장에서 먹기'를 눌러보세요",
        options: ['매장에서 먹기', '포장하기'],
      },
      {
        prompt: '어떤 음료를 드릴까요?',
        hint: "'아메리카노'를 눌러보세요",
        options: ['아메리카노', '카페라떼', '유자차'],
      },
      {
        prompt: '따뜻하게, 시원하게?',
        hint: "'따뜻하게(HOT)'를 눌러보세요",
        options: ['따뜻하게 (HOT)', '시원하게 (ICE)'],
      },
      {
        prompt: '어떻게 결제하시겠어요?',
        hint: "'카드'를 눌러보세요",
        options: ['카드', '삼성페이', '현금'],
      },
    ],
    doneMessage: '주문 완료! 이제 카페에서 혼자 주문할 수 있어요 ☕',
  },
  {
    id: 'kiosk_fastfood',
    title: '햄버거 가게 주문',
    subtitle: '패스트푸드 키오스크에서 세트 주문하기',
    icon: 'fast-food',
    steps: [
      {
        prompt: '드시고 가세요, 포장하세요?',
        hint: "'매장에서 먹기'를 눌러보세요",
        options: ['매장에서 먹기', '포장하기'],
      },
      {
        prompt: '무엇을 드릴까요?',
        hint: "'불고기버거 세트'를 눌러보세요",
        options: ['불고기버거 세트', '치즈버거 세트', '단품만 주문'],
      },
      {
        prompt: '음료를 골라 주세요',
        hint: "'콜라'를 눌러보세요",
        options: ['콜라', '사이다', '오렌지 주스'],
      },
      {
        prompt: '더 필요하신 게 있나요?',
        hint: "'이대로 주문할게요'를 눌러보세요",
        options: ['이대로 주문할게요', '감자튀김 추가'],
      },
      {
        prompt: '어떻게 결제하시겠어요?',
        hint: "'카드'를 눌러보세요",
        options: ['카드', '현금'],
      },
    ],
    doneMessage: '주문 완료! 영수증의 번호를 부르면 받으러 가세요 🍔',
  },
  {
    id: 'hospital_checkin',
    title: '병원 무인 접수',
    subtitle: '병원 접수 기계로 진료 접수하기',
    icon: 'medkit',
    steps: [
      {
        prompt: '무엇을 하시겠어요?',
        hint: "'진료 접수'를 눌러보세요",
        options: ['진료 접수', '진료비 수납', '증명서 발급'],
      },
      {
        prompt: '본인 확인 방법을 골라 주세요',
        hint: "'주민등록번호'를 눌러보세요",
        options: ['주민등록번호', '휴대폰 번호'],
      },
      {
        prompt: '어느 진료과에 오셨나요?',
        hint: "'내과'를 눌러보세요",
        options: ['내과', '정형외과', '안과', '이비인후과'],
      },
      {
        prompt: '이대로 접수하시겠어요?',
        hint: "'네, 접수할게요'를 눌러보세요",
        options: ['네, 접수할게요', '다시 고를게요'],
      },
    ],
    doneMessage: '접수가 끝났어요! 대기 번호표를 뽑아 자리에서 기다리세요 🏥',
  },
  {
    id: 'subway_ticket',
    title: '지하철 표 사기',
    subtitle: '지하철 발권기로 1회용 교통카드 사기',
    icon: 'train',
    steps: [
      {
        prompt: '무엇을 하시겠어요?',
        hint: "'1회용 교통카드'를 눌러보세요",
        options: ['1회용 교통카드', '교통카드 충전'],
      },
      {
        prompt: '어디까지 가세요?',
        hint: '화면에서 가려는 역을 골라요',
        options: ['1~2 정거장', '3~4 정거장', '5 정거장 이상'],
      },
      {
        prompt: '몇 분이 가세요?',
        hint: "'1명'을 눌러보세요",
        options: ['1명', '2명'],
      },
      {
        prompt: '카드나 현금을 넣어 주세요',
        hint: "'현금 넣기'를 눌러보세요",
        options: ['현금 넣기', '카드로 결제'],
      },
    ],
    doneMessage: '표가 나왔어요! 보증금은 내릴 때 돌려받을 수 있어요 🚇',
  },
  {
    id: 'atm_withdraw',
    title: '현금 인출기(ATM) 사용',
    subtitle: '은행 기계에서 돈 찾기',
    icon: 'card',
    steps: [
      {
        prompt: '카드를 넣어 주세요',
        hint: "'카드 넣었어요'를 눌러보세요",
        options: ['카드 넣었어요'],
      },
      {
        prompt: '무엇을 하시겠어요?',
        hint: "'출금(돈 찾기)'을 눌러보세요",
        options: ['출금 (돈 찾기)', '입금 (돈 넣기)', '잔액 조회'],
      },
      {
        prompt: '비밀번호 네 자리를 눌러 주세요',
        hint: '남에게 보이지 않게 가리고 눌러요',
        options: ['●●●● 눌렀어요'],
      },
      {
        prompt: '얼마를 찾으시겠어요?',
        hint: "'5만 원'을 눌러보세요",
        options: ['3만 원', '5만 원', '10만 원'],
      },
    ],
    doneMessage: '돈과 카드를 잊지 말고 챙기세요! 잘하셨어요 💵',
  },
  {
    id: 'sms_greeting',
    title: '가족에게 문자 보내기',
    subtitle: '휴대폰으로 안부 문자 보내기',
    icon: 'chatbox-ellipses',
    steps: [
      {
        prompt: '누구에게 보낼까요?',
        hint: "'손주'를 눌러보세요",
        options: ['손주', '아들', '딸'],
      },
      {
        prompt: '보낼 내용을 골라 주세요',
        hint: '마음에 드는 문장을 눌러보세요',
        options: ['잘 지내니? 보고 싶구나', '밥은 잘 챙겨 먹니?', '사랑한다 우리 강아지'],
      },
      {
        prompt: '이렇게 보내면 될까요?',
        hint: "'보내기'를 눌러보세요",
        options: ['보내기', '내용 바꾸기'],
      },
    ],
    doneMessage: '문자를 보냈어요! 가족이 정말 기뻐할 거예요 💌',
  },
  {
    id: 'typing_1',
    title: '문자 따라 쓰기',
    subtitle: '글자판으로 문장 입력 연습하기',
    icon: 'create',
    steps: [
      {
        prompt: "이 문장을 그대로 써 보세요:\n'내일 점심에 만나요'",
        hint: '띄어쓰기까지 천천히 따라 적어 보세요',
      },
    ],
    doneMessage: '잘 쓰셨어요! 이제 문자도 직접 쓸 수 있어요 ✍️',
  },
];

export const getMission = (id: string): Mission | undefined =>
  MISSIONS.find((mission) => mission.id === id);
