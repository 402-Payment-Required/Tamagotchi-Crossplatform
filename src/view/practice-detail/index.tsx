import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PRACTICE_ITEMS } from '~/entity/practice';
import type { PracticeId } from '~/shared/store/usePracticeStore';
import { usePracticeStore } from '~/shared/store/usePracticeStore';
import { PrimaryButton } from '~/shared/ui/PrimaryButton';

const OPTIONS: Record<PracticeId, readonly string[]> = {
  kiosk: ['아메리카노', '카페라떼', '녹차'],
  sms: ['안녕하세요, 잘 지내세요?', '지금 어디예요?', '고마워요!'],
  hospital: ['내과 진료 예약', '치과 검진 예약', '안과 진료 예약'],
};

const PROMPTS: Record<PracticeId, string> = {
  kiosk: '원하는 음료를 골라 볼까요?',
  sms: '보낼 문장을 골라 볼까요?',
  hospital: '필요한 진료를 골라 볼까요?',
};

export default function PracticeDetailView() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: PracticeId }>();
  const practice = PRACTICE_ITEMS.find((item) => item.id === id);
  const [selected, setSelected] = useState<string | null>(null);
  const complete = usePracticeStore((state) => state.complete);

  if (!practice || !id) {
    router.replace('/(tabs)/practice');
    return null;
  }

  const finish = () => {
    complete(id);
    router.replace({ pathname: '/practice-complete', params: { id } });
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 px-7 pb-8 pt-5">
        <Pressable
          accessibilityLabel="연습 목록으로 돌아가기"
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm active:opacity-70">
          <Ionicons name="chevron-back" size={26} color="#8A7F6E" />
        </Pressable>

        <View className="mt-8 rounded-[30px] bg-white p-7 shadow-md">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-peach-tint">
            <Ionicons name={practice.icon} size={28} color="#E67E00" />
          </View>
          <Text className="mt-6 text-3xl font-extrabold leading-tight text-ink">{PROMPTS[id]}</Text>
          <Text className="mt-3 text-lg font-semibold leading-relaxed text-ink-soft">
            천천히 누르면 돼요. 틀려도 괜찮아요.
          </Text>
        </View>

        <View className="mt-7 gap-4">
          {OPTIONS[id].map((option) => {
            const isSelected = selected === option;
            return (
              <Pressable
                key={option}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                onPress={() => setSelected(option)}
                className={`min-h-[80px] flex-row items-center justify-between rounded-3xl border-2 px-6 ${
                  isSelected ? 'border-brand bg-brand-light' : 'border-line bg-white'
                }`}>
                <Text className="text-xl font-extrabold text-ink">{option}</Text>
                {isSelected && <Ionicons name="checkmark-circle" size={28} color="#3DBE5C" />}
              </Pressable>
            );
          })}
        </View>

        <View className="mt-auto pt-7">
          <PrimaryButton
            label="선택 완료"
            trailingIcon="arrow-forward"
            disabled={!selected}
            onPress={finish}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
