import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCompleteMission, useStartMission, useStepMission } from '~/entity/practice';
import { useSessionStore } from '~/shared/store/useSessionStore';

interface StepView {
  prompt: string;
  options: string[];
  hint: string;
}

export default function MissionPlayView() {
  const router = useRouter();
  const { missionId, title } = useLocalSearchParams<{ missionId: string; title?: string }>();
  const userId = useSessionStore((state) => state.phone) ?? '';

  const startMission = useStartMission();
  const stepMission = useStepMission();
  const completeMission = useCompleteMission(userId);

  const [step, setStep] = useState<StepView | null>(null);
  const [answer, setAnswer] = useState('');
  const [wrongTry, setWrongTry] = useState(false);

  useEffect(() => {
    startMission.mutate(
      { userId, missionId },
      {
        onSuccess: (data) =>
          setStep({
            prompt: data.prompt ?? '',
            options: data.options ?? [],
            hint: data.hint ?? '',
          }),
      }
    );
    // ponytail: intentionally re-runs only when the mission changes, not on every mutate identity change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionId, userId]);

  const submit = (action: string) => {
    if (!action.trim() || stepMission.isPending) return;
    setWrongTry(false);
    stepMission.mutate(
      { userId, missionId, action },
      {
        onSuccess: (result) => {
          if (!result.correct) {
            setWrongTry(true);
            return;
          }
          if (result.done) {
            completeMission.mutate(missionId);
            router.replace({
              pathname: '/practice-complete',
              params: { title: title ?? '', message: result.message ?? '' },
            } as never);
            return;
          }
          setAnswer('');
          setStep({
            prompt: result.prompt ?? '',
            options: result.options ?? [],
            hint: result.hint ?? '',
          });
        },
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#eef0f2]">
      <View className="flex-row items-center justify-between bg-[#20252b] px-5 py-4">
        <Pressable accessibilityLabel="연습 나가기" onPress={() => router.back()} className="p-1">
          <Ionicons name="close" size={28} color="#fff" />
        </Pressable>
        <Text className="text-lg font-extrabold text-white">{title ?? '연습'}</Text>
        <Text className="text-sm font-bold text-[#b5f3c6]">연습 중</Text>
      </View>

      {!step ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#3DBE5C" size="large" />
        </View>
      ) : (
        <View className="flex-1 px-5 pt-8">
          <Text className="text-3xl font-extrabold leading-tight text-[#20252b]">
            {step.prompt}
          </Text>
          {!!step.hint && (
            <Text className="mt-3 text-base font-bold text-brand-dark">{step.hint}</Text>
          )}
          {wrongTry && (
            <Text className="mt-3 text-base font-bold text-[#C85C3F]">다시 한 번 해볼까요?</Text>
          )}

          {step.options.length > 0 ? (
            <View className="mt-7 gap-3">
              {step.options.map((option) => (
                <Pressable
                  key={option}
                  disabled={stepMission.isPending}
                  onPress={() => submit(option)}
                  className="rounded-3xl border-2 border-white bg-white p-5 active:border-brand active:bg-brand-light">
                  <Text className="text-xl font-extrabold text-[#20252b]">{option}</Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View className="mt-7 gap-4">
              <TextInput
                value={answer}
                onChangeText={setAnswer}
                placeholder="여기에 입력해 보세요"
                className="h-16 rounded-2xl border-2 border-line bg-white px-5 text-xl font-semibold text-ink"
              />
              <Pressable
                disabled={!answer.trim() || stepMission.isPending}
                onPress={() => submit(answer)}
                className={`h-16 items-center justify-center rounded-2xl ${
                  answer.trim() ? 'bg-brand active:bg-brand-dark' : 'bg-[#d9dee2]'
                }`}>
                <Text className="text-xl font-extrabold text-white">확인</Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
