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

export function Avatar({ label, size, tone = 'brand', className }: AvatarProps) {
  return (
    <View
      className={`items-center justify-center rounded-full ${className ?? ''}`}
      style={{ width: size, height: size, backgroundColor: TONE_BG[tone] }}>
      <Text
        className="font-extrabold text-brand-dark"
        style={{ fontSize: size * 0.14, opacity: 0.55 }}>
        {label}
      </Text>
    </View>
  );
}
