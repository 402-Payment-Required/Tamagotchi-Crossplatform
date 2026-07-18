import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

interface PracticeRowProps {
  title: string;
  note: string;
  icon: keyof typeof Ionicons.glyphMap;
  status: 'done' | 'todo';
}

export function PracticeRow({ title, note, icon, status }: PracticeRowProps) {
  const done = status === 'done';
  return (
    <View className="flex-row items-center gap-4 rounded-[22px] bg-white p-6 shadow-sm">
      <View
        className="h-16 w-16 items-center justify-center rounded-2xl"
        style={{ backgroundColor: done ? '#E3F7E8' : '#FFF1DE' }}>
        <Ionicons name={icon} size={30} color={done ? '#3DBE5C' : '#F58A00'} />
      </View>
      <View className="flex-1">
        <Text className="text-xl font-extrabold text-ink">{title}</Text>
        <Text className="mt-1 text-base font-semibold text-ink-softer">{note}</Text>
      </View>
      {done ? (
        <View className="h-11 w-11 items-center justify-center rounded-full bg-brand">
          <Ionicons name="checkmark" size={22} color="#fff" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={26} color="#C4B9A6" />
      )}
    </View>
  );
}
