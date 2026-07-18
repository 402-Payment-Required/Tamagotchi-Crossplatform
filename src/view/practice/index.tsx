import { useRouter } from 'expo-router';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PracticeRow, usePracticeList } from '~/entity/practice';

export default function PracticeView() {
  const router = useRouter();
  const items = usePracticeList();

  const handlePress = (id: (typeof items)[number]['id']) => {
    if (id === 'kiosk') {
      router.push('/practice-kiosk');
      return;
    }
    // ponytail: only the kiosk flow has a screen so far — other practices show a
    // holding message until their own flows are designed and built.
    Alert.alert('준비 중이에요', '곧 만나볼 수 있어요!');
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="px-7 pt-8">
        <Text className="text-3xl font-extrabold text-ink">오늘의 연습</Text>
        <Text className="mt-2 text-lg font-semibold text-ink-soft">하나씩 천천히 해봐요</Text>
      </View>

      <View className="gap-6 px-7 pt-8">
        {items.map((item) => (
          <PracticeRow
            key={item.id}
            title={item.title}
            note={item.note}
            icon={item.icon}
            status={item.status}
            onPress={() => handlePress(item.id)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
