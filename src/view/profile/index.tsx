import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCharacterLabel } from '~/entity/character';
import { useSessionStore } from '~/shared/store/useSessionStore';
import { Avatar } from '~/shared/ui/Avatar';

export default function ProfileView() {
  const router = useRouter();
  const characterLabel = useSessionStore((state) => getCharacterLabel(state.character));
  const phone = useSessionStore((state) => state.phone);
  const logout = useSessionStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="items-center px-8 pt-10">
        <Avatar label={characterLabel} size={140} />
        <Text className="mt-4 text-2xl font-extrabold text-ink">{characterLabel}와 함께</Text>
        {phone && <Text className="mt-1 text-base font-semibold text-ink-soft">{phone}</Text>}
      </View>

      <View className="mt-9 px-7">
        <Text className="text-lg font-extrabold text-ink">내 설정</Text>
        <Text className="mt-1 text-base font-semibold text-ink-soft">
          필요한 항목을 눌러 바꿀 수 있어요.
        </Text>
      </View>
      <View className="mt-5 gap-4 px-7">
        <Pressable
          onPress={() => router.push('/character-select')}
          className="flex-row items-center justify-between rounded-2xl bg-white p-5 shadow-sm active:opacity-80">
          <View className="flex-row items-center gap-3">
            <Ionicons name="sync" size={22} color="#3DBE5C" />
            <Text className="text-lg font-bold text-ink">캐릭터 바꾸기</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#C4B9A6" />
        </Pressable>

        <Pressable
          onPress={() => router.push('/family-report')}
          className="flex-row items-center justify-between rounded-2xl bg-white p-5 shadow-sm active:opacity-80">
          <View className="flex-row items-center gap-3">
            <Ionicons name="stats-chart" size={22} color="#F58A00" />
            <Text className="text-lg font-bold text-ink">가족 리포트 보기</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#C4B9A6" />
        </Pressable>

        <Pressable
          onPress={handleLogout}
          className="flex-row items-center gap-3 rounded-2xl bg-white p-5 shadow-sm active:opacity-80">
          <Ionicons name="log-out-outline" size={22} color="#B0A592" />
          <Text className="text-lg font-bold text-locked-text">로그아웃</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
