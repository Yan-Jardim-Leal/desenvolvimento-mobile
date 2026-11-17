import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../theme';

interface Props {
  values: number[];
  labels: string[];
  height?: number;
}

export function BarChart({ values, labels, height = 110 }: Props) {
  const max = Math.max(...values);
  const min = Math.min(...values) * 0.8;
  return (
    <View style={styles.container}>
      <View style={[styles.bars, { height }]}>
        {values.map((value, index) => {
          const isLast = index === values.length - 1;
          const ratio = max === min ? 1 : (value - min) / (max - min);
          return (
            <View key={labels[index]} style={styles.column}>
              <View style={[styles.bar, { height: Math.max(ratio * height, 6) }, isLast ? styles.current : styles.past]} />
            </View>
          );
        })}
      </View>
      <View style={styles.labels}>
        {labels.map((label) => (
          <Text key={label} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: spacing.sm },
  column: { flex: 1, justifyContent: 'flex-end' },
  bar: { borderRadius: radius.sm },
  past: { backgroundColor: '#A9C9B2' },
  current: { backgroundColor: colors.primary },
  labels: { flexDirection: 'row', gap: spacing.sm },
  label: { flex: 1, textAlign: 'center', fontSize: fontSize.xs, color: colors.muted },
});
