import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useMissionProgress } from '~/shared/store/useMissionProgress';

const MENU = [
  { name: '아메리카노', price: 4500, emoji: '☕' },
  { name: '카페라떼', price: 5000, emoji: '🥛' },
  { name: '유자차', price: 4800, emoji: '🍵' },
] as const;

export default function KioskCafeView() {
  const router = useRouter();
  const complete = useMissionProgress((state) => state.complete);
  const [orderType, setOrderType] = useState<'매장' | '포장' | null>(null);
  const [item, setItem] = useState<(typeof MENU)[number] | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [payment, setPayment] = useState<'카드' | '현금' | null>(null);
  const [paid, setPaid] = useState(false);

  const total = item ? item.price * quantity : 0;
  const finish = () => {
    complete('kiosk_cafe');
    router.replace({
      pathname: '/practice-complete',
      params: {
        title: '카페 키오스크 주문',
        message: '성공하셨어요! 주문 번호를 확인해 주세요 ☕',
      },
    } as never);
  };

  if (!orderType)
    return <Choice title="매장에서 드시나요?" choices={['매장', '포장']} onChoose={setOrderType} />;
  if (paid)
    return <Choice title="결제가 완료됐어요!" choices={['주문 번호 확인하기']} onChoose={finish} />;
  if (!item)
    return (
      <SafeAreaView className="flex-1 bg-[#eef0f2]">
        <KioskHeader onClose={() => router.back()} />
        <ScrollView contentContainerClassName="px-5 pb-28 pt-6">
          <Text className="text-2xl font-extrabold text-[#20252b]">어떤 음료를 드릴까요?</Text>
          <Text className="mt-2 text-base font-bold text-[#71808e]">
            음료를 누르면 장바구니에 담겨요.
          </Text>
          <View className="mt-6 flex-row flex-wrap gap-3">
            {MENU.map((menu) => (
              <Pressable
                key={menu.name}
                onPress={() => {
                  setItem(menu);
                  setQuantity(1);
                }}
                className="w-[47%] rounded-3xl bg-white p-5 shadow-sm">
                <Text className="text-4xl">{menu.emoji}</Text>
                <Text className="mt-4 text-lg font-extrabold text-[#20252b]">{menu.name}</Text>
                <Text className="mt-1 font-bold text-[#71808e]">
                  {menu.price.toLocaleString()}원
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  if (!payment && checkout)
    return (
      <SafeAreaView className="flex-1 bg-[#eef0f2]">
        <KioskHeader onClose={() => router.back()} />
        <View className="flex-1 px-5 pt-6">
          <Text className="text-2xl font-extrabold text-[#20252b]">결제 수단을 골라 주세요</Text>
          <OrderSummary item={item} quantity={quantity} total={total} />
          <View className="mt-5 flex-row gap-3">
            {(['카드', '현금'] as const).map((type) => (
              <Pressable
                key={type}
                onPress={() => setPayment(type)}
                className="flex-1 items-center rounded-3xl bg-white py-8 shadow-sm">
                <Ionicons name={type === '카드' ? 'card' : 'cash'} size={38} color="#3DBE5C" />
                <Text className="mt-3 text-xl font-extrabold text-[#20252b]">{type} 결제</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  return (
    <SafeAreaView className="flex-1 bg-[#eef0f2]">
      <KioskHeader onClose={() => router.back()} />
      <View className="flex-1 px-5 pt-6">
        <Text className="text-2xl font-extrabold text-[#20252b]">장바구니를 확인해 주세요</Text>
        <OrderSummary item={item} quantity={quantity} total={total} onChange={setQuantity} />
        <Pressable
          onPress={() => (payment ? setPaid(true) : setCheckout(true))}
          className="mb-5 mt-auto h-16 items-center justify-center rounded-2xl bg-brand">
          <Text className="text-xl font-extrabold text-white">
            {payment
              ? `결제 완료 · ${total.toLocaleString()}원`
              : `주문하기 · ${total.toLocaleString()}원`}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function KioskHeader({ onClose }: { onClose: () => void }) {
  return (
    <View className="flex-row items-center justify-between bg-[#20252b] px-5 py-4">
      <Pressable onPress={onClose}>
        <Ionicons name="close" size={28} color="#fff" />
      </Pressable>
      <Text className="text-lg font-extrabold text-white">CAFE 주문하기</Text>
      <Text className="font-bold text-[#b5f3c6]">연습 중</Text>
    </View>
  );
}
function Choice({
  title,
  choices,
  onChoose,
}: {
  title: string;
  choices: readonly string[];
  onChoose: (value: any) => void;
}) {
  return (
    <SafeAreaView className="flex-1 bg-[#eef0f2]">
      <View className="flex-1 justify-center px-6">
        <Text className="text-center text-3xl font-extrabold text-[#20252b]">{title}</Text>
        <View className="mt-8 gap-4">
          {choices.map((choice) => (
            <Pressable
              key={choice}
              onPress={() => onChoose(choice)}
              className="rounded-3xl bg-white p-6 shadow-sm">
              <Text className="text-center text-2xl font-extrabold text-[#20252b]">{choice}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
function OrderSummary({
  item,
  quantity,
  total,
  onChange,
}: {
  item: (typeof MENU)[number];
  quantity: number;
  total: number;
  onChange?: (quantity: number) => void;
}) {
  return (
    <View className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
      <View className="flex-row items-center">
        <Text className="text-4xl">{item.emoji}</Text>
        <View className="ml-4 flex-1">
          <Text className="text-xl font-extrabold text-[#20252b]">{item.name}</Text>
          <Text className="mt-1 font-bold text-[#71808e]">{item.price.toLocaleString()}원</Text>
        </View>
        {onChange && (
          <View className="flex-row items-center gap-3">
            <Pressable onPress={() => onChange(Math.max(1, quantity - 1))}>
              <Text className="text-3xl text-brand-dark">−</Text>
            </Pressable>
            <Text className="text-xl font-extrabold">{quantity}</Text>
            <Pressable onPress={() => onChange(quantity + 1)}>
              <Text className="text-3xl text-brand-dark">＋</Text>
            </Pressable>
          </View>
        )}
      </View>
      <View className="mt-5 border-t border-[#e5e7e9] pt-4">
        <Text className="text-right text-xl font-extrabold text-[#20252b]">
          합계 {total.toLocaleString()}원
        </Text>
      </View>
    </View>
  );
}
