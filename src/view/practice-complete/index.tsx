import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCharacterLabel } from '~/entity/character';
import { useSessionStore } from '~/shared/store/useSessionStore';
import { Avatar } from '~/shared/ui/Avatar';
import { PrimaryButton } from '~/shared/ui/PrimaryButton';

const DONE_SKILLS = ['메뉴 고르기', '화면 눌러 주문하기', '주문 마치기'];

export default function PracticeCompleteView() {
  const router = useRouter();
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
          주문 완료!{'\n'}할머니 이제 혼자도{'\n'}할 수 있어요 🎉
        </Text>

        <View className="mt-10 w-full rounded-[22px] bg-white p-6 shadow-md">
          <Text className="text-xl font-extrabold text-ink">이제 혼자 할 수 있는 것: 3가지</Text>
          <View className="mt-5 gap-4">
            {DONE_SKILLS.map((skill) => (
              <View key={skill} className="flex-row items-center gap-3">
                <View className="h-8 w-8 items-center justify-center rounded-full bg-brand">
                  <Ionicons name="checkmark" size={18} color="#fff" />
                </View>
                <Text className="text-lg font-bold text-ink">{skill}</Text>
              </View>
            ))}
          </View>
        </View>
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
