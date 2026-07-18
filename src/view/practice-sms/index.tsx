import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePracticeStore } from '~/shared/store/usePracticeStore';

const STEPS = ['받는 사람', '내용 고르기', '미리 보기', '보내기'] as const;
const MESSAGES = [
  '안녕하세요, 잘 지내세요?',
  '오늘도 좋은 하루 보내세요!',
  '고마워요. 곧 연락드릴게요!',
] as const;

export default function PracticeSmsView() {
  const router = useRouter();
  const complete = usePracticeStore((state) => state.complete);
  const [step, setStep] = useState(0);
  const [recipient, setRecipient] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const canContinue = (step === 0 && recipient) || (step === 1 && message) || step > 1;

  const next = () => {
    if (step === 3) {
      complete('sms');
      router.replace({ pathname: '/practice-complete', params: { id: 'sms' } });
      return;
    }
    setStep((current) => current + 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#eef0f2]">
      <View className="flex-1">
        <View className="flex-row items-center justify-between bg-[#20252b] px-5 py-4">
          <Pressable accessibilityLabel="연습 나가기" onPress={() => router.back()} className="p-1">
            <Ionicons name="close" size={28} color="#fff" />
          </Pressable>
          <Text className="text-lg font-extrabold text-white">문자 보내기</Text>
          <Text className="text-sm font-bold text-[#b5f3c6]">연습 중</Text>
        </View>
        <View className="flex-row bg-white px-6 py-3">
          {STEPS.map((label, index) => (
            <View key={label} className="flex-1 items-center">
              <View
                className={`h-7 w-7 items-center justify-center rounded-full ${index <= step ? 'bg-brand' : 'bg-[#dde1e5]'}`}>
                <Text
                  className={`text-xs font-extrabold ${index <= step ? 'text-white' : 'text-[#8b949d]'}`}>
                  {index < step ? '✓' : index + 1}
                </Text>
              </View>
              <Text
                className={`mt-1 text-[10px] font-bold ${index === step ? 'text-brand-dark' : 'text-[#8b949d]'}`}>
                {label}
              </Text>
            </View>
          ))}
        </View>
        <View className="flex-1 px-5 pt-7">
          <Text className="text-sm font-bold text-brand-dark">
            {step + 1}단계 · {STEPS[step]}
          </Text>
          <Text className="mt-2 text-3xl font-extrabold text-[#20252b]">
            {step === 0
              ? '누구에게 보낼까요?'
              : step === 1
                ? '보낼 내용을 골라 주세요'
                : step === 2
                  ? '문자를 확인해 주세요'
                  : '이제 보내 볼까요?'}
          </Text>
          {step === 0 && (
            <View className="mt-7 gap-3">
              {['손자 민수', '딸 지은'].map((name) => (
                <Pressable
                  key={name}
                  onPress={() => setRecipient(name)}
                  className={`flex-row items-center rounded-3xl border-2 p-5 ${recipient === name ? 'border-brand bg-brand-light' : 'border-white bg-white'}`}>
                  <View className="h-12 w-12 items-center justify-center rounded-full bg-[#fff0dc]">
                    <Ionicons name="person" size={25} color="#E67E00" />
                  </View>
                  <Text className="ml-4 text-xl font-extrabold text-[#20252b]">{name}</Text>
                  {recipient === name && (
                    <Ionicons
                      name="checkmark-circle"
                      size={28}
                      color="#3DBE5C"
                      style={{ marginLeft: 'auto' }}
                    />
                  )}
                </Pressable>
              ))}
            </View>
          )}
          {step === 1 && (
            <View className="mt-7 gap-3">
              {MESSAGES.map((text) => (
                <Pressable
                  key={text}
                  onPress={() => setMessage(text)}
                  className={`rounded-3xl border-2 p-5 ${message === text ? 'border-brand bg-brand-light' : 'border-white bg-white'}`}>
                  <Text className="text-xl font-bold leading-relaxed text-[#20252b]">{text}</Text>
                </Pressable>
              ))}
            </View>
          )}
          {step >= 2 && (
            <View className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
              <Text className="text-base font-bold text-[#71808e]">받는 사람 · {recipient}</Text>
              <View className="mt-5 self-start rounded-2xl bg-brand-light px-5 py-4">
                <Text className="text-xl font-bold leading-relaxed text-[#20252b]">{message}</Text>
              </View>
              {step === 3 && (
                <Text className="mt-5 text-lg font-bold text-brand-dark">
                  보내기 버튼을 눌러 보세요.
                </Text>
              )}
            </View>
          )}
        </View>
        <View className="border-t border-[#d8dde1] bg-white px-5 py-4">
          <Pressable
            disabled={!canContinue}
            onPress={next}
            className={`h-16 items-center justify-center rounded-2xl ${canContinue ? 'bg-brand active:bg-brand-dark' : 'bg-[#d9dee2]'}`}>
            <Text className="text-xl font-extrabold text-white">
              {step === 3 ? '보내기' : '다음으로'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
