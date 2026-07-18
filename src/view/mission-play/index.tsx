import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getMission } from '~/entity/practice';
import { useMissionProgress } from '~/shared/store/useMissionProgress';
import KioskCafeView from '~/view/kiosk-cafe';

export default function MissionPlayView() {
  const router = useRouter();
  const { missionId, title } = useLocalSearchParams<{ missionId: string; title?: string }>();
  const complete = useMissionProgress((state) => state.complete);

  const mission = getMission(missionId);
  const [stepIndex, setStepIndex] = useState(0);
  const [answer, setAnswer] = useState('');

  if (!mission) {
    router.replace('/practice');
    return null;
  }
  if (mission.id === 'kiosk_cafe') return <KioskCafeView />;

  const step = mission.steps[stepIndex];
  const isLastStep = stepIndex === mission.steps.length - 1;

  const advance = () => {
    if (isLastStep) {
      complete(mission.id);
      router.replace({
        pathname: '/practice-complete',
        params: { title: title ?? mission.title, message: mission.doneMessage },
      } as never);
      return;
    }
    setAnswer('');
    setStepIndex((current) => current + 1);
  };

  const isFreeText = !step.options;
  const canSubmitText = answer.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-[#eef0f2]">
      <View className="flex-row items-center justify-between bg-[#20252b] px-5 py-4">
        <Pressable accessibilityLabel="연습 나가기" onPress={() => router.back()} className="p-1">
          <Ionicons name="close" size={28} color="#fff" />
        </Pressable>
        <Text className="text-lg font-extrabold text-white">{title ?? mission.title}</Text>
        <Text className="text-sm font-bold text-[#b5f3c6]">연습 중</Text>
      </View>

      {/* step progress */}
      <View className="flex-row gap-2 px-5 py-4">
        {mission.steps.map((_, index) => (
          <View
            key={index}
            className="h-2 flex-1 rounded-full"
            style={{ backgroundColor: index <= stepIndex ? '#3DBE5C' : '#dde1e5' }}
          />
        ))}
      </View>

      <View className="flex-1 px-5 pt-4">
        <Text className="text-sm font-bold text-brand-dark">
          {stepIndex + 1}단계 · {mission.steps.length}단계 중
        </Text>
        <Text className="mt-2 text-3xl font-extrabold leading-snug text-[#20252b]">
          {step.prompt}
        </Text>
        <Text className="mt-3 text-base font-bold text-brand-dark">{step.hint}</Text>

        {isFreeText ? (
          <View className="mt-7 gap-4">
            <TextInput
              value={answer}
              onChangeText={setAnswer}
              placeholder="여기에 입력해 보세요"
              multiline
              className="min-h-16 rounded-2xl border-2 border-line bg-white px-5 py-4 text-xl font-semibold text-ink"
            />
            <Pressable
              disabled={!canSubmitText}
              onPress={advance}
              className={`h-16 items-center justify-center rounded-2xl ${
                canSubmitText ? 'bg-brand active:bg-brand-dark' : 'bg-[#d9dee2]'
              }`}>
              <Text className="text-xl font-extrabold text-white">확인</Text>
            </Pressable>
          </View>
        ) : (
          <View className="mt-7 gap-3">
            {step.options?.map((option) => (
              <Pressable
                key={option}
                onPress={advance}
                className="rounded-3xl border-2 border-white bg-white p-5 active:border-brand active:bg-brand-light">
                <Text className="text-xl font-extrabold text-[#20252b]">{option}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
