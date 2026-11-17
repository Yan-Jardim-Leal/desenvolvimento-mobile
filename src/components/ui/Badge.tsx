import { StyleSheet, Text, View } from 'react-native';
import { fontSize, radius, spacing, Tone, tones } from '../../theme';

interface Props {
  label: string;
  tone?: Tone;
}

export function Badge({ label, tone = 'success' }: Props) {
  const { background, foreground } = tones[tone];
  return (
    <View style={[styles.badge, { backgroundColor: background }]}>
      <Text style={[styles.label, { color: foreground }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill, alignSelf: 'flex-start' },
  label: { fontSize: fontSize.xs, fontWeight: '600' },
});
