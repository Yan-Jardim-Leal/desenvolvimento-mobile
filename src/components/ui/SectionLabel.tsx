import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '../../theme';

interface Props {
  title: string;
  right?: string;
}

export function SectionLabel({ title, right }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      {right && <Text style={styles.right}>{right}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
  title: { fontSize: fontSize.xs, fontWeight: '700', color: colors.muted, letterSpacing: 0.6 },
  right: { fontSize: fontSize.xs, fontWeight: '600', color: colors.primary },
});
