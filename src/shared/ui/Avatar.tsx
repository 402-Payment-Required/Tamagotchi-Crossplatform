import { Text, View } from 'react-native';

interface AvatarProps {
  label: string;
  size: number;
  tone?: 'brand' | 'peach';
  className?: string;
}

const TONE_BG: Record<NonNullable<AvatarProps['tone']>, string> = {
  brand: '#CFF0D8',
  peach: '#EFE0CC',
};

const AVATARS: Record<string, string> = {
  손주: '🧡',
  손자: '👦',
  손녀: '👧',
  고양이: '🐱',
  강아지: '🐶',
};

export function Avatar({ label, size, tone = 'brand', className }: AvatarProps) {
  return (
    <View
      className={`items-center justify-center rounded-full ${className ?? ''}`}
      style={{ width: size, height: size, backgroundColor: TONE_BG[tone] }}>
      <Text style={{ fontSize: size * 0.5 }}>{AVATARS[label] ?? '🧡'}</Text>
      <View className="absolute bottom-[12%] rounded-full bg-white/80 px-3 py-1">
        <Text className="text-sm font-extrabold text-brand-dark">{label}</Text>
      </View>
    </View>
  );
}
