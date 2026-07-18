import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCharacterLabel } from '~/entity/character';
import { useSessionStore } from '~/shared/store/useSessionStore';
import { Avatar } from '~/shared/ui/Avatar';
import { PrimaryButton } from '~/shared/ui/PrimaryButton';

export default function PracticeCompleteView() {
  const router = useRouter();
  const { title, message } = useLocalSearchParams<{ title?: string; message?: string }>();
  const characterLabel = useSessionStore((state) => getCharacterLabel(state.character));

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 items-center px-8 pt-10">
        <View className="relative">
          <Avatar label={characterLabel} size={196} />
          <Text className="absolute -left-1 top-2 text-3xl">✨</Text>
          <Text className="absolute -right-1 top-5 text-2xl">🎊</Text>
        </View>
        <Text className="mt-8 text-center text-3xl font-extrabold leading-snug text-ink">
          {message || '성공하셨어요! 🎉'}
        </Text>
        {!!title && (
          <View className="mt-6 w-full rounded-[22px] bg-white p-6 shadow-md">
            <Text className="text-lg font-semibold text-ink-soft">완료한 연습</Text>
            <Text className="mt-1 text-xl font-extrabold text-ink">{title}</Text>
          </View>
        )}
      </View>

      <View className="px-7 pb-9">
        <PrimaryButton
          label="다음 연습하기"
          trailingIcon="arrow-forward"
          onPress={() => router.replace('/practice')}
        />
      </View>
    </SafeAreaView>
  );
}
