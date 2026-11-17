import { StyleSheet, Text, View } from 'react-native';
import { User } from '../../types/models';
import { roleLabel, roleTone } from '../../services/presentation';
import { colors, fontSize, spacing } from '../../theme';
import { Avatar, Badge, Card } from '../ui';

export function ProfileHeader({ user, caption }: { user: User; caption?: string }) {
  return (
    <Card style={styles.card}>
      <Avatar name={user.name} size={56} />
      <View style={styles.texts}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {caption && <Text style={styles.email}>{caption}</Text>}
        <Badge label={roleLabel[user.role]} tone={roleTone[user.role]} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center' },
  texts: { flex: 1, gap: spacing.xs },
  name: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  email: { fontSize: fontSize.sm, color: colors.muted },
});
