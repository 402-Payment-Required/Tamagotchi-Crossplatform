import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { Avatar } from '~/shared/ui/Avatar';

import type { CharacterOption } from '../../model/characters';

interface CharacterCardProps {
  option: CharacterOption;
  selected: boolean;
  onPress: () => void;
}

export function CharacterCard({ option, selected, onPress }: CharacterCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      className={`relative items-center gap-3 rounded-[22px] bg-white px-3 py-5 ${
        selected ? 'border-[3px] border-brand' : 'border-2 border-line'
      }`}>
      {selected && (
        <View className="absolute right-3 top-3 h-8 w-8 items-center justify-center rounded-full bg-brand">
          <Ionicons name="checkmark" size={18} color="#fff" />
        </View>
      )}
      <Avatar label={option.label} size={100} tone={option.tone} />
      <Text className="text-xl font-extrabold text-ink">{option.label}</Text>
    </Pressable>
  );
}
