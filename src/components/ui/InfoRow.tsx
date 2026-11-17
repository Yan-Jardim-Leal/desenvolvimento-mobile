import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '../../theme';

interface Props {
  label: string;
  value: string;
}

export function InfoRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  label: { fontSize: fontSize.sm, color: colors.muted },
  value: { flexShrink: 1, textAlign: 'right', fontSize: fontSize.sm, fontWeight: '600', color: colors.text },
});
