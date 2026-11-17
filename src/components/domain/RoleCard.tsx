import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fontSize, spacing } from '../../theme';
import { Badge, Card, IconName, IconTile } from '../ui';

interface Props {
  title: string;
  tag: string;
  description: string;
  icon: IconName;
  highlighted?: boolean;
  onPress: () => void;
}

export function RoleCard({ title, tag, description, icon, highlighted = false, onPress }: Props) {
  return (
    <Card onPress={onPress} highlighted={highlighted} style={styles.card}>
      <IconTile icon={icon} tone={highlighted ? 'success' : 'earth'} size={52} />
      <View style={styles.texts}>
        <Badge label={tag} tone={highlighted ? 'success' : 'earth'} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} color={highlighted ? colors.primary : colors.muted} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center' },
  texts: { flex: 1, gap: spacing.xs },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  description: { fontSize: fontSize.sm, color: colors.muted },
});
