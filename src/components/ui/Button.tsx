import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSize, radius, spacing } from '../../theme';
import { IconName } from './types';

type Variant = 'primary' | 'secondary' | 'danger' | 'link';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: IconName;
  disabled?: boolean;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
}

const textColors: Record<Variant, string> = {
  primary: colors.white,
  secondary: colors.primary,
  danger: colors.danger,
  link: colors.primary,
};

export function Button({ label, onPress, variant = 'primary', icon, disabled = false, compact = false, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.base, styles[variant], compact && styles.compact, (pressed || disabled) && styles.dimmed, style]}
    >
      {icon && <MaterialCommunityIcons name={icon} size={18} color={textColors[variant]} />}
      <Text style={[styles.label, { color: textColors[variant] }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderRadius: radius.md, paddingVertical: 14 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.primary },
  danger: { backgroundColor: 'transparent' },
  link: { backgroundColor: 'transparent', paddingVertical: spacing.xs },
  compact: { paddingVertical: 8, paddingHorizontal: 14 },
  dimmed: { opacity: 0.6 },
  label: { fontSize: fontSize.md, fontWeight: '600' },
});
