import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSize, radius, spacing } from '../../theme';

interface Props {
  title: string;
  subtitle?: string;
  detail?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  highlighted?: boolean;
}

export function ListRow({ title, subtitle, detail, leading, trailing, onPress, highlighted = false }: Props) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={[styles.row, highlighted && styles.highlighted]}>
      {leading}
      <View style={styles.texts}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
        {detail && <Text style={styles.subtitle}>{detail}</Text>}
      </View>
      {trailing}
      {onPress && <MaterialCommunityIcons name="chevron-right" size={20} color={colors.muted} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  highlighted: { borderColor: colors.primary, backgroundColor: colors.successSurface },
  texts: { flex: 1, gap: 2 },
  title: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  subtitle: { fontSize: fontSize.sm, color: colors.muted },
});
