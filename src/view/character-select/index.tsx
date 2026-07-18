import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CHARACTERS, CharacterCard } from '~/entity/character';
import type { CharacterId } from '~/shared/store/useSessionStore';
import { useSessionStore } from '~/shared/store/useSessionStore';
import { PrimaryButton } from '~/shared/ui/PrimaryButton';

export default function CharacterSelectView() {
  const router = useRouter();
  const selectCharacter = useSessionStore((state) => state.selectCharacter);
  const storedCharacter = useSessionStore((state) => state.character);
  const [selected, setSelected] = useState<CharacterId>(storedCharacter ?? 'grandson');

  const confirm = () => {
    selectCharacter(selected);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <View className="flex-1 justify-between px-7 py-6">
        <View>
          <Text className="text-3xl font-extrabold leading-tight text-ink">
            함께할 친구를{'\n'}골라요
          </Text>
          <Text className="mt-2 text-lg font-semibold text-ink-soft">언제든지 바꿀 수 있어요</Text>

          <View className="mt-8 flex-row flex-wrap gap-4">
            {CHARACTERS.map((option) => (
              <View key={option.id} className="w-[47%]">
                <CharacterCard
                  option={option}
                  selected={selected === option.id}
                  onPress={() => setSelected(option.id)}
                />
              </View>
            ))}
          </View>
        </View>

        <PrimaryButton label="이 친구로 시작하기" trailingIcon="arrow-forward" onPress={confirm} />
      </View>
    </SafeAreaView>
  );
}
