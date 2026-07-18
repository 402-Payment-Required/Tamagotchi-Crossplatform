import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSessionStore } from '~/shared/store/useSessionStore';
import { Avatar } from '~/shared/ui/Avatar';
import { PrimaryButton } from '~/shared/ui/PrimaryButton';

export default function LoginView() {
  const router = useRouter();
  const login = useSessionStore((state) => state.login);
  const character = useSessionStore((state) => state.character);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const goNext = () => {
    login(phone);
    router.replace(character ? '/(tabs)' : '/character-select');
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 justify-between px-8 py-6">
        <View className="items-center pt-6">
          <Avatar label="손주" size={130} />
          <Text className="mt-4 text-4xl font-extrabold text-brand">손주</Text>
          <Text className="mt-2 text-lg font-semibold text-ink-soft">
            매일 만나는 다정한 말동무
          </Text>

          <View className="mt-9 w-full gap-4">
            <View className="gap-2">
              <Text className="text-lg font-bold text-peach-text">전화번호</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="010-0000-0000"
                keyboardType="phone-pad"
                className="h-16 rounded-2xl border-2 border-line bg-white px-5 text-xl font-semibold text-ink"
              />
            </View>
            <View className="gap-2">
              <Text className="text-lg font-bold text-peach-text">비밀번호</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••"
                secureTextEntry
                className="h-16 rounded-2xl border-2 border-line bg-white px-5 text-xl font-semibold text-ink"
              />
            </View>
          </View>
        </View>

        <View>
          <PrimaryButton label="로그인" onPress={goNext} className="h-[84px]" />
          <View className="my-4 flex-row items-center gap-3">
            <View className="h-px flex-1 bg-line" />
            <Text className="text-sm font-semibold text-ink-softer">처음 오셨나요?</Text>
            <View className="h-px flex-1 bg-line" />
          </View>
          <Pressable
            onPress={goNext}
            className="h-20 flex-row items-center justify-center gap-3 rounded-[22px] border-[2.5px] border-brand bg-white active:bg-brand-light">
            <Text className="text-xl font-extrabold text-brand-dark">회원가입 하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
