import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSize, radius, spacing, Tone, tones } from '../../theme';
import { IconName } from './types';

interface Props {
  message: string;
  title?: string;
  tone?: Tone;
  icon?: IconName;
}

export function Notice({ message, title, tone = 'warning', icon = 'alert-circle-outline' }: Props) {
  const { background, foreground } = tones[tone];
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <MaterialCommunityIcons name={icon} size={20} color={foreground} />
      <View style={styles.texts}>
        {title && <Text style={[styles.title, { color: foreground }]}>{title}</Text>}
        <Text style={[styles.message, { color: foreground }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: spacing.md, padding: spacing.md, borderRadius: radius.md, alignItems: 'center' },
  texts: { flex: 1, gap: 2 },
  title: { fontSize: fontSize.sm, fontWeight: '700' },
  message: { fontSize: fontSize.sm },
});
