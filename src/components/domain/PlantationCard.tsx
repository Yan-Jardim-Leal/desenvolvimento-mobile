import { StyleSheet, Text, View } from 'react-native';
import { useData } from '../../context/DataContext';
import { Parcel } from '../../types/models';
import { activePlantation, cropName } from '../../services/fieldQueries';
import { plantStatusTone } from '../../services/presentation';
import { formatDate } from '../../utils/date';
import { formatArea } from '../../utils/format';
import { colors, fontSize, spacing } from '../../theme';
import { Badge, Card, IconTile, InfoRow } from '../ui';

export function PlantationCard({ parcel }: { parcel: Parcel }) {
  const { state } = useData();
  const plantation = activePlantation(state, parcel.id);
  const status = plantation?.status ?? 'Pousio';
  return (
    <Card>
      <View style={styles.header}>
        <IconTile icon={plantation ? 'sprout' : 'grass'} tone={plantation ? 'success' : 'neutral'} size={48} />
        <View style={styles.texts}>
          <Text style={styles.crop}>{plantation ? cropName(state, plantation.cropTypeId) : 'Sem plantação'}</Text>
          <Text style={styles.meta}>
            {plantation ? 'Plantação atual' : 'Parcela em pousio'} · {formatArea(parcel.areaHa)}
          </Text>
        </View>
        <Badge label={status} tone={plantStatusTone(status)} />
      </View>
      {plantation && (
        <>
          <InfoRow label="Data de plantação" value={formatDate(plantation.plantedAt)} />
          <InfoRow label="Colheita prevista" value={formatDate(plantation.harvestAt)} />
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  texts: { flex: 1 },
  crop: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  meta: { fontSize: fontSize.sm, color: colors.muted },
});
