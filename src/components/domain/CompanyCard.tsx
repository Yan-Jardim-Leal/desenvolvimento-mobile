import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useData } from '../../context/DataContext';
import { Company } from '../../types/models';
import { companyStats } from '../../services/companyQueries';
import { plural } from '../../utils/format';
import { colors, fontSize, spacing } from '../../theme';
import { Badge, Card, IconTile } from '../ui';

export function CompanyCard({ company, onPress }: { company: Company; onPress: () => void }) {
  const { state } = useData();
  const stats = companyStats(state, company.id);
  return (
    <Card onPress={onPress}>
      <View style={styles.header}>
        <IconTile icon="office-building-outline" tone="earth" />
        <View style={styles.texts}>
          <Text style={styles.name}>{company.name}</Text>
          <Text style={styles.meta}>
            NIF {company.nif} · {company.city}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.muted} />
      </View>
      <View style={styles.badges}>
        <Badge label={plural(stats.farmers, 'agricultor', 'agricultores')} />
        <Badge label={plural(stats.operators, 'operador', 'operadores')} tone="info" />
        <Badge label={plural(stats.fields, 'campo', 'campos')} tone="earth" />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  texts: { flex: 1 },
  name: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  meta: { fontSize: fontSize.sm, color: colors.muted },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
