import { ReactNode } from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../../theme';

interface Props {
  children: ReactNode;
  onPress?: () => void;
  highlighted?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, onPress, highlighted = false, style }: Props) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={[styles.card, highlighted && styles.highlighted, style]}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, gap: spacing.md },
  highlighted: { borderColor: colors.primary, borderWidth: 1.5 },
});
