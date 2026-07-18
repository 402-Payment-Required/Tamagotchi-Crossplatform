import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PracticeRow, usePracticeList } from '~/entity/practice';
import { useSessionStore } from '~/shared/store/useSessionStore';

export default function PracticeView() {
  const router = useRouter();
  const userId = useSessionStore((state) => state.phone);
  const { data: items, isLoading, isError } = usePracticeList(userId);
  const completed = items?.filter((item) => item.status === 'done').length ?? 0;

  const handlePress = (missionId: string, title: string) =>
    router.push({ pathname: `/mission/${missionId}`, params: { title } } as never);

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="px-7 pt-8">
        <Text className="text-lg font-bold text-ink-soft">오늘의 연습</Text>
        <Text className="mt-1 text-3xl font-extrabold text-ink">하나씩 천천히 해봐요</Text>
        <View className="mt-5 rounded-2xl bg-brand-light px-5 py-4">
          <Text className="text-base font-bold text-brand-dark">
            {isLoading ? '연습 목록을 불러오고 있어요...' : `완료한 연습 ${completed}개`}
          </Text>
        </View>
      </View>

      {isLoading && (
        <View className="items-center pt-12">
          <ActivityIndicator color="#3DBE5C" size="large" />
        </View>
      )}

      {isError && (
        <View className="mx-7 mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <Text className="text-base font-bold text-locked-text">
            연습 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </Text>
        </View>
      )}

      <View className="gap-6 px-7 pt-8">
        {items?.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => handlePress(item.id, item.title)}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${item.note}`}>
            <PracticeRow
              title={item.title}
              note={item.note}
              icon={item.icon}
              status={item.status}
            />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
