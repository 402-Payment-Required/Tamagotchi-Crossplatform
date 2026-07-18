import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCharacterLabel } from '~/entity/character';
import { usePracticeStore } from '~/shared/store/usePracticeStore';
import { useSessionStore } from '~/shared/store/useSessionStore';
import { Avatar } from '~/shared/ui/Avatar';

const MENU = [
  { label: '아메리카노', emoji: '☕' },
  { label: '카페라떼', emoji: '🥛' },
  { label: '녹차', emoji: '🍵' },
] as const;

export default function PracticeKioskView() {
  const router = useRouter();
  const complete = usePracticeStore((state) => state.complete);
  const characterLabel = useSessionStore((state) => getCharacterLabel(state.character));

  const order = () => {
    complete('kiosk');
    router.replace('/practice-complete');
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <Pressable
        onPress={() => router.back()}
        className="flex-row items-center gap-3 px-7 pt-6 active:opacity-60">
        <Ionicons name="chevron-back" size={26} color="#8A7F6E" />
        <Text className="text-lg font-bold text-ink-soft">키오스크 연습</Text>
      </Pressable>

      <Text className="px-7 pt-6 text-3xl font-extrabold leading-tight text-ink">
        무엇을{'\n'}주문할까요?
      </Text>

      <View className="gap-5 px-7 pt-8">
        {MENU.map((item) => (
          <Pressable
            key={item.label}
            onPress={order}
            className="h-[106px] flex-row items-center gap-5 rounded-3xl border-2 border-line bg-white px-6 shadow-sm active:border-brand active:bg-[#FBFFFB]">
            <View className="h-16 w-16 items-center justify-center rounded-2xl bg-[#F5EFE4]">
              <Text className="text-3xl">{item.emoji}</Text>
            </View>
            <Text className="text-2xl font-extrabold text-ink">{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <View className="mt-auto flex-row items-end gap-4 px-6 pb-9">
        <Avatar label={characterLabel} size={82} />
        <View className="flex-1 rounded-[22px] bg-peach-tint px-5 py-4">
          <Text className="text-lg font-bold leading-snug text-peach-text">
            할머니, 커피 그림{'\n'}아무거나 눌러도 돼요!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
