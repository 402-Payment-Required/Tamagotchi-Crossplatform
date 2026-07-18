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
      <View className="flex-1 items-center px-8 pt-10">
        <Avatar label={characterLabel} size={208} />
        <View className="mt-9 max-w-[310px] items-center rounded-[26px] bg-white px-8 py-6 shadow-md">
          <Text className="text-center text-2xl font-extrabold leading-snug text-ink">
            할머니,{'\n'}오늘도 만나요!
          </Text>
        </View>

        <View className="mt-12 w-full gap-6">
          <PrimaryButton
            label={`${characterLabel}랑 이야기하기`}
            icon="mic"
            onPress={() => router.push('/talk')}
          />
          <PrimaryButton
            label="함께 연습하기"
            icon="checkmark-circle"
            onPress={() => router.push('/practice')}
            tone="peach"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
