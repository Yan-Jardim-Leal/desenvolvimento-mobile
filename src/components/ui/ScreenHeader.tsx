import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '../../theme';
import { IconButton } from './IconButton';

interface Props {
  title: string;
  overline?: string;
  onBack?: () => void;
  right?: ReactNode;
  dark?: boolean;
}

export function ScreenHeader({ title, overline, onBack, right, dark = false }: Props) {
  const textColor = { color: dark ? colors.white : colors.text };
  return (
    <View style={styles.container}>
      {onBack && <IconButton icon="chevron-left" onPress={onBack} />}
      <View style={styles.titles}>
        {overline && <Text style={styles.overline}>{overline}</Text>}
        <Text style={[onBack ? styles.titleSmall : styles.title, textColor]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  titles: { flex: 1 },
  overline: { fontSize: fontSize.xs, color: colors.muted },
  title: { fontSize: fontSize.xl, fontWeight: '700' },
  titleSmall: { fontSize: fontSize.lg, fontWeight: '700' },
});
