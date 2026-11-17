import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSize, radius, spacing } from '../../theme';
import { IconButton } from '../ui';

interface Props {
  subtitle: string;
  badge?: string;
  onBack?: () => void;
}

export function BrandHero({ subtitle, badge, onBack }: Props) {
  return (
    <View style={styles.hero}>
      {onBack && <IconButton icon="chevron-left" onPress={onBack} />}
      {badge && <Text style={styles.badge}>{badge}</Text>}
      <View style={styles.brand}>
        <MaterialCommunityIcons name="leaf-circle" size={40} color={colors.white} />
        <Text style={styles.title}>FarmIPB</Text>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.brandDark, padding: spacing.xl, paddingTop: spacing.xxl, gap: spacing.md, borderBottomLeftRadius: radius.lg, borderBottomRightRadius: radius.lg },
  badge: {
    alignSelf: 'center',
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { color: colors.white, fontSize: fontSize.xxl, fontWeight: '800' },
  subtitle: { color: '#CFE3D5', fontSize: fontSize.md },
});
