import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ponytail: mock weekly report — swap the constants below for a real query
// (e.g. useWeeklyReport(childId)) once the reporting API exists.
const STATS = [
  { label: '대화 횟수', value: '12' },
  { label: '식사 언급', value: '9' },
  { label: '첫 성공', value: '키오스크 🎉' },
];

const ACTIVITY = [
  {
    icon: 'chatbubbles' as const,
    tint: '#E3F7E8',
    color: '#3DBE5C',
    title: '손주와 대화 — 김치찌개 이야기',
    time: '오늘 오전 10:24',
  },
  {
    icon: 'cafe' as const,
    tint: '#FFF1DE',
    color: '#F58A00',
    title: '키오스크 연습 완료',
    time: '어제 오후 3:10',
  },
  {
    icon: 'checkbox' as const,
    tint: '#E3F7E8',
    color: '#3DBE5C',
    title: '문자 보내기 연습 시작',
    time: '7월 16일',
  },
];

export default function FamilyReportView() {
  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView contentContainerClassName="gap-6 px-7 pb-10 pt-6">
        <View>
          <Text className="text-2xl font-extrabold text-ink">어머니 주간 리포트</Text>
          <Text className="mt-1 text-base font-semibold text-ink-soft">7월 12일 – 7월 18일</Text>
        </View>

        <View className="rounded-[20px] bg-peach-tint p-5">
          <View className="flex-row items-center gap-2">
            <Ionicons name="sunny" size={22} color="#E67E00" />
            <Text className="text-sm font-extrabold tracking-wide text-peach-deep">
              이번 주 하이라이트
            </Text>
          </View>
          <Text className="mt-3 text-lg font-bold leading-snug text-peach-text">
            어머니가 카페 키오스크 주문을 처음으로 혼자 성공하셨어요! 🎉
          </Text>
        </View>

        <View className="flex-row gap-3">
          {STATS.map((stat) => (
            <View key={stat.label} className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
              <Text className="text-2xl font-extrabold text-brand" numberOfLines={1}>
                {stat.value}
              </Text>
              <Text className="mt-1 text-xs font-semibold text-locked-text">{stat.label}</Text>
            </View>
          ))}
        </View>

        <View>
          <Text className="mb-3 text-lg font-extrabold text-ink">최근 활동</Text>
          <View className="gap-3">
            {ACTIVITY.map((item) => (
              <View key={item.title} className="flex-row items-center gap-3">
                <View
                  className="h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: item.tint }}>
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-ink">{item.title}</Text>
                  <Text className="text-xs font-semibold text-[#9A9186]">{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <Pressable
          onPress={() => Alert.alert('전화 연결', '전화 기능은 준비 중이에요.')}
          className="mt-2 h-20 flex-row items-center justify-center gap-3 rounded-2xl bg-brand active:bg-brand-dark">
          <Ionicons name="call" size={24} color="#fff" />
          <Text className="text-xl font-extrabold text-white">어머니께 전화하기</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
