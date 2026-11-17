import { StyleSheet, Text } from 'react-native';
import { colors, fontSize, spacing } from '../../theme';

export function EmptyState({ message }: { message: string }) {
  return <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: { textAlign: 'center', color: colors.muted, fontSize: fontSize.sm, paddingVertical: spacing.xl },
});
