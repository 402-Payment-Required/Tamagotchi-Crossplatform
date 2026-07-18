import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ReportSignal } from '~/entity/report';
import { useReport } from '~/entity/report';
import { useSessionStore } from '~/shared/store/useSessionStore';

const TYPE_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  meal: 'restaurant',
  mood: 'happy',
};

const MOOD_KO: Record<string, string> = {
  good: '좋음',
  bad: '안 좋음',
  tired: '피곤함',
  anxious: '불안함',
  happy: '행복함',
};

function describeSignal(signal: ReportSignal): string {
  if (signal.type === 'meal') {
    return signal.value === 'True' ? '식사를 하셨어요' : '아직 식사 전이에요';
  }
  if (signal.type === 'mood') {
    return `기분이 ${MOOD_KO[signal.value] ?? signal.value}`;
  }
  return `${signal.type}: ${signal.value}`;
}

function formatTime(ts: string): string {
  const date = new Date(ts);
  if (Number.isNaN(date.getTime())) return ts;
  return date.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function FamilyReportView() {
  const userId = useSessionStore((state) => state.phone);
  const { data, isLoading, isError, refetch, isRefetching } = useReport(userId);

  const signals = [...(data?.signals ?? [])].sort(
    (a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime()
  );
  const mealCount = signals.filter((signal) => signal.type === 'meal').length;
  const latestMood = signals.find((signal) => signal.type === 'mood');

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <ScrollView contentContainerClassName="gap-6 px-7 pb-10 pt-6">
        <View>
          <Text className="text-2xl font-extrabold text-ink">가족 리포트</Text>
          <Text className="mt-1 text-base font-semibold text-ink-soft">
            손주와의 대화와 연습 기록이에요
          </Text>
        </View>

        {isLoading && (
          <View className="items-center py-12">
            <ActivityIndicator color="#3DBE5C" size="large" />
          </View>
        )}

        {isError && (
          <View className="gap-4 rounded-2xl bg-white p-6 shadow-sm">
            <Text className="text-base font-bold text-locked-text">
              리포트를 불러오지 못했어요.
            </Text>
            <Pressable
              disabled={isRefetching}
              onPress={() => refetch()}
              className="h-14 items-center justify-center rounded-2xl bg-brand active:bg-brand-dark">
              <Text className="text-lg font-extrabold text-white">
                {isRefetching ? '다시 불러오는 중...' : '다시 시도하기'}
              </Text>
            </Pressable>
          </View>
        )}

        {data && (
          <>
            <View className="flex-row gap-3">
              <View className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
                <Text className="text-2xl font-extrabold text-brand" numberOfLines={1}>
                  {signals.length}
                </Text>
                <Text className="mt-1 text-xs font-semibold text-locked-text">전체 기록</Text>
              </View>
              <View className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
                <Text className="text-2xl font-extrabold text-brand" numberOfLines={1}>
                  {mealCount}
                </Text>
                <Text className="mt-1 text-xs font-semibold text-locked-text">식사 언급</Text>
              </View>
              <View className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
                <Text className="text-2xl font-extrabold text-brand" numberOfLines={1}>
                  {latestMood ? (MOOD_KO[latestMood.value] ?? latestMood.value) : '—'}
                </Text>
                <Text className="mt-1 text-xs font-semibold text-locked-text">최근 기분</Text>
              </View>
            </View>

            <View>
              <Text className="mb-3 text-lg font-extrabold text-ink">최근 활동</Text>
              {signals.length === 0 ? (
                <View className="rounded-2xl bg-white p-6 shadow-sm">
                  <Text className="text-base font-semibold text-ink-soft">
                    아직 기록된 활동이 없어요.
                  </Text>
                </View>
              ) : (
                <View className="gap-3">
                  {signals.map((signal, index) => (
                    <View
                      key={`${signal.type}-${signal.ts}-${index}`}
                      className="flex-row items-center gap-3">
                      <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#E3F7E8]">
                        <Ionicons
                          name={TYPE_ICON[signal.type] ?? 'information-circle'}
                          size={20}
                          color="#3DBE5C"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-bold text-ink">
                          {describeSignal(signal)}
                        </Text>
                        <Text className="text-xs font-semibold text-[#9A9186]">
                          {formatTime(signal.ts)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </>
        )}

        <Pressable
          onPress={() => Alert.alert('전화 연결', '전화 기능은 준비 중이에요.')}
          className="mt-2 h-20 flex-row items-center justify-center gap-3 rounded-2xl bg-brand active:bg-brand-dark">
          <Ionicons name="call" size={24} color="#fff" />
          <Text className="text-xl font-extrabold text-white">전화하기</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
