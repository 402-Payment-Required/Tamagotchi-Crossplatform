import { Image } from 'expo-image';
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

const AVATARS = {
  손자: require('@/assets/images/characters/grandson.png'),
  손녀: require('@/assets/images/characters/granddaughter.png'),
  고양이: require('@/assets/images/characters/cat.png'),
  강아지: require('@/assets/images/characters/dog.png'),
};

export function Avatar({ label, size, tone = 'brand', className }: AvatarProps) {
  return (
    <View
      className={`items-center justify-center overflow-hidden rounded-full ${className ?? ''}`}
      style={{ width: size, height: size, backgroundColor: TONE_BG[tone] }}>
      {AVATARS[label as keyof typeof AVATARS] ? (
        <Image
          source={AVATARS[label as keyof typeof AVATARS]}
          contentFit="cover"
          style={{ width: size, height: size }}
        />
      ) : (
        <Text style={{ fontSize: size * 0.5 }}>🧡</Text>
      )}
      <View className="absolute bottom-[12%] rounded-full bg-white/80 px-3 py-1">
        <Text className="text-sm font-extrabold text-brand-dark">{label}</Text>
      </View>
    </View>
  );
}
