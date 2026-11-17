import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AppAlert } from '../../types/models';
import { colors, fontSize, radius, spacing } from '../../theme';
import { formatTimestamp } from '../../utils/date';
import { IconName, IconTile } from '../ui';

const iconFor = (title: string): IconName => {
  if (title.includes('concluída')) return 'check';
  if (title.includes('observação')) return 'pencil-outline';
  if (title.includes('Colheita') || title.includes('terminar')) return 'calendar-clock';
  if (title.includes('atribuída')) return 'clipboard-text-outline';
  return 'sprout-outline';
};

export function AlertRow({ alert, onPress }: { alert: AppAlert; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <IconTile icon={iconFor(alert.title)} tone={alert.title.includes('Colheita') ? 'earth' : 'success'} />
      <View style={styles.texts}>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.message}>{alert.message}</Text>
        <Text style={styles.time}>{formatTimestamp(alert.createdAt)}</Text>
      </View>
      {!alert.read && <View style={styles.dot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  texts: { flex: 1, gap: 2 },
  title: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  message: { fontSize: fontSize.sm, color: colors.muted },
  time: { fontSize: fontSize.xs, color: colors.muted, marginTop: spacing.xs },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: spacing.xs },
});
