import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePracticeStore } from '~/shared/store/usePracticeStore';

const STEPS = ['주문 방식', '메뉴 고르기', '장바구니', '결제 수단', '결제 완료'] as const;
const MENU = [
  { label: '아메리카노', price: '4,500원', emoji: '☕' },
  { label: '카페라떼', price: '5,000원', emoji: '🥛' },
  { label: '녹차', price: '4,800원', emoji: '🍵' },
] as const;

export default function PracticeKioskView() {
  const router = useRouter();
  const complete = usePracticeStore((state) => state.complete);
  const [step, setStep] = useState(0);
  const [orderType, setOrderType] = useState<'포장' | '매장' | null>(null);
  const [menu, setMenu] = useState<(typeof MENU)[number] | null>(null);
  const [payment, setPayment] = useState<'카드' | '현금' | null>(null);

  const next = () => {
    if (step === 4) {
      complete('kiosk');
      router.replace({ pathname: '/practice-complete', params: { id: 'kiosk' } });
      return;
    }
    setStep((current) => current + 1);
  };

  const canContinue =
    (step === 0 && orderType) ||
    (step === 1 && menu) ||
    step === 2 ||
    (step === 3 && payment) ||
    step === 4;
  const buttonLabel =
    step === 2 ? '주문하기' : step === 3 ? '결제하기' : step === 4 ? '결제 완료' : '다음으로';

  return (
    <SafeAreaView className="flex-1 bg-[#eef0f2]">
      <View className="flex-1">
        <View className="flex-row items-center justify-between bg-[#20252b] px-5 py-4">
          <Pressable accessibilityLabel="연습 나가기" onPress={() => router.back()} className="p-1">
            <Ionicons name="close" size={28} color="#fff" />
          </Pressable>
          <Text className="text-lg font-extrabold text-white">카페 키오스크</Text>
          <Text className="text-sm font-bold text-[#b5f3c6]">연습 중</Text>
        </View>

        <View className="flex-row bg-white px-3 py-3">
          {STEPS.map((label, index) => (
            <View key={label} className="flex-1 items-center">
              <View
                className={`h-7 w-7 items-center justify-center rounded-full ${
                  index <= step ? 'bg-brand' : 'bg-[#dde1e5]'
                }`}>
                {index < step ? (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                ) : (
                  <Text
                    className={`text-xs font-extrabold ${index === step ? 'text-white' : 'text-[#8b949d]'}`}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                className={`mt-1 text-[10px] font-bold ${index === step ? 'text-brand-dark' : 'text-[#8b949d]'}`}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-1 px-5 pt-7">
          <Text className="text-sm font-bold text-brand-dark">
            {step + 1}단계 · {STEPS[step]}
          </Text>
          {step === 0 && (
            <Text className="mt-2 text-3xl font-extrabold text-[#20252b]">
              어디에서 드실 건가요?
            </Text>
          )}
          {step === 1 && (
            <Text className="mt-2 text-3xl font-extrabold text-[#20252b]">
              원하는 메뉴를 골라 주세요
            </Text>
          )}
          {step === 2 && (
            <Text className="mt-2 text-3xl font-extrabold text-[#20252b]">
              장바구니를 확인해 주세요
            </Text>
          )}
          {step === 3 && (
            <Text className="mt-2 text-3xl font-extrabold text-[#20252b]">
              결제 수단을 골라 주세요
            </Text>
          )}
          {step === 4 && (
            <Text className="mt-2 text-3xl font-extrabold text-[#20252b]">
              결제를 진행해 주세요
            </Text>
          )}

          {step === 0 && (
            <View className="mt-7 flex-row gap-4">
              {(['포장', '매장'] as const).map((type) => (
                <Pressable
                  key={type}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: orderType === type }}
                  onPress={() => setOrderType(type)}
                  className={`flex-1 items-center rounded-3xl border-2 py-8 ${orderType === type ? 'border-brand bg-brand-light' : 'border-white bg-white'}`}>
                  <Text className="text-5xl">{type === '포장' ? '🛍️' : '🍽️'}</Text>
                  <Text className="mt-4 text-2xl font-extrabold text-[#20252b]">{type}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {step === 1 && (
            <View className="mt-6 gap-3">
              {MENU.map((item) => (
                <Pressable
                  key={item.label}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: menu?.label === item.label }}
                  onPress={() => setMenu(item)}
                  className={`flex-row items-center rounded-3xl border-2 p-4 ${menu?.label === item.label ? 'border-brand bg-brand-light' : 'border-white bg-white'}`}>
                  <View className="h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0dc]">
                    <Text className="text-3xl">{item.emoji}</Text>
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-xl font-extrabold text-[#20252b]">{item.label}</Text>
                    <Text className="mt-1 text-base font-bold text-[#71808e]">{item.price}</Text>
                  </View>
                  {menu?.label === item.label && (
                    <Ionicons name="checkmark-circle" size={28} color="#3DBE5C" />
                  )}
                </Pressable>
              ))}
            </View>
          )}

          {step === 2 && menu && (
            <View className="mt-7 rounded-3xl bg-white p-6 shadow-sm">
              <Text className="text-base font-bold text-[#71808e]">주문 내역 · {orderType}</Text>
              <View className="mt-5 flex-row items-center justify-between">
                <Text className="text-4xl">{menu.emoji}</Text>
                <View className="ml-4 flex-1">
                  <Text className="text-xl font-extrabold text-[#20252b]">{menu.label}</Text>
                  <Text className="mt-1 text-base font-bold text-[#71808e]">수량 1개</Text>
                </View>
                <Text className="text-lg font-extrabold text-[#20252b]">{menu.price}</Text>
              </View>
            </View>
          )}

          {step === 3 && (
            <View className="mt-7 flex-row gap-4">
              {(['카드', '현금'] as const).map((type) => (
                <Pressable
                  key={type}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: payment === type }}
                  onPress={() => setPayment(type)}
                  className={`flex-1 items-center rounded-3xl border-2 py-8 ${payment === type ? 'border-brand bg-brand-light' : 'border-white bg-white'}`}>
                  <Ionicons name={type === '카드' ? 'card' : 'cash'} size={42} color="#3DBE5C" />
                  <Text className="mt-4 text-2xl font-extrabold text-[#20252b]">{type} 결제</Text>
                </Pressable>
              ))}
            </View>
          )}

          {step === 4 && (
            <View className="mt-7 items-center rounded-3xl bg-white px-6 py-10 shadow-sm">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-brand-light">
                <Ionicons name="card" size={42} color="#2E8B45" />
              </View>
              <Text className="mt-6 text-2xl font-extrabold text-[#20252b]">
                {payment}를 단말기에 대주세요
              </Text>
              <Text className="mt-3 text-center text-lg font-semibold text-[#71808e]">
                {menu?.label} · {menu?.price}
              </Text>
            </View>
          )}
        </View>

        <View className="border-t border-[#d8dde1] bg-white px-5 py-4">
          <Pressable
            disabled={!canContinue}
            onPress={next}
            className={`h-16 items-center justify-center rounded-2xl ${canContinue ? 'bg-brand active:bg-brand-dark' : 'bg-[#d9dee2]'}`}>
            <Text className="text-xl font-extrabold text-white">{buttonLabel}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
