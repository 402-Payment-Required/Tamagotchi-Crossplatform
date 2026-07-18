import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCharacterLabel } from '~/entity/character';
import { useSessionStore } from '~/shared/store/useSessionStore';
import { Avatar } from '~/shared/ui/Avatar';
import { PrimaryButton } from '~/shared/ui/PrimaryButton';

export default function HomeView() {
  const router = useRouter();
  const characterLabel = useSessionStore((state) => getCharacterLabel(state.character));

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 px-7 pt-7">
        <Text className="text-lg font-bold text-ink-soft">오늘도 반가워요</Text>
        <Text className="mt-1 text-3xl font-extrabold text-ink">무엇을 해볼까요?</Text>

        <View className="mt-6 flex-row items-center rounded-[28px] bg-white p-5 shadow-sm">
          <Avatar label={characterLabel} size={104} />
          <View className="ml-5 flex-1">
            <Text className="text-xl font-extrabold text-ink">
              {characterLabel}가 기다리고 있어요
            </Text>
            <Text className="mt-2 text-base font-semibold leading-relaxed text-ink-soft">
              편하게 이야기를 나누거나{`\n`}오늘의 연습을 이어가 보세요.
            </Text>
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-lg font-extrabold text-ink">오늘 할 일</Text>
          <View className="mt-3 rounded-2xl bg-peach-tint px-5 py-4">
            <Text className="text-base font-bold text-peach-text">
              천천히, 하나씩 해도 충분해요.
            </Text>
          </View>
        </View>

        <View className="mt-6 gap-4">
          <PrimaryButton
            label={`${characterLabel}와 이야기하기`}
            icon="mic"
            onPress={() => router.push('/talk')}
          />
          <PrimaryButton
            label="오늘의 연습 이어하기"
            icon="checkmark-circle"
            onPress={() => router.push('/practice')}
            tone="peach"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
