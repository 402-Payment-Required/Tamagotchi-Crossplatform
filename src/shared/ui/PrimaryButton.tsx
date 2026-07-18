import { Ionicons } from '@expo/vector-icons';
import { Pressable, PressableProps, Text } from 'react-native';

interface PrimaryButtonProps extends Omit<PressableProps, 'children'> {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  trailingIcon?: keyof typeof Ionicons.glyphMap;
  tone?: 'brand' | 'peach';
  className?: string;
}

const TONE_CLASS = {
  brand: 'bg-brand active:bg-brand-dark',
  peach: 'bg-peach active:bg-peach-deep',
};

export function PrimaryButton({
  label,
  icon,
  trailingIcon,
  tone = 'brand',
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      className={`flex-row items-center justify-center gap-3 rounded-[22px] py-6 shadow-md ${
        TONE_CLASS[tone]
      } ${disabled ? 'opacity-50' : ''} ${className ?? ''}`}
      {...props}>
      {icon && <Ionicons name={icon} size={26} color="#fff" />}
      <Text className="text-2xl font-extrabold text-white">{label}</Text>
      {trailingIcon && <Ionicons name={trailingIcon} size={26} color="#fff" />}
    </Pressable>
  );
}
