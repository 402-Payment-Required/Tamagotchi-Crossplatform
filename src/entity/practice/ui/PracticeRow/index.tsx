import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import type { PracticeStatus } from '~/shared/store/usePracticeStore';

interface PracticeRowProps {
  title: string;
  note: string;
  icon: keyof typeof Ionicons.glyphMap;
  status: PracticeStatus;
}

const ICON_TINT = { done: '#E3F7E8', active: '#FFF1DE', locked: '#E6DFD2' } as const;
const ICON_COLOR = { done: '#3DBE5C', active: '#F58A00', locked: '#A99E8B' } as const;

export function PracticeRow({ title, note, icon, status }: PracticeRowProps) {
  const locked = status === 'locked';
  return (
    <View
      className={`flex-row items-center gap-4 rounded-[22px] p-6 ${
        locked ? 'bg-locked-bg opacity-80' : 'bg-white shadow-sm'
      }`}>
      <View
        className="h-16 w-16 items-center justify-center rounded-2xl"
        style={{ backgroundColor: ICON_TINT[status] }}>
        <Ionicons name={icon} size={30} color={ICON_COLOR[status]} />
      </View>
      <View className="flex-1">
        <Text className={`text-xl font-extrabold ${locked ? 'text-locked-text' : 'text-ink'}`}>
          {title}
        </Text>
        <Text
          className={`mt-1 text-base font-semibold ${
            locked ? 'text-locked-text2' : 'text-ink-softer'
          }`}>
          {note}
        </Text>
      </View>
      {status === 'done' && (
        <View className="h-11 w-11 items-center justify-center rounded-full bg-brand">
          <Ionicons name="checkmark" size={22} color="#fff" />
        </View>
      )}
      {status === 'active' && <Ionicons name="chevron-forward" size={26} color="#C4B9A6" />}
      {locked && (
        <View className="h-11 w-11 items-center justify-center rounded-full bg-[#D8CFBF]">
          <Ionicons name="lock-closed" size={20} color="#7C7263" />
        </View>
      )}
    </View>
  );
}
