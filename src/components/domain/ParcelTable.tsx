import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useData } from '../../context/DataContext';
import { Parcel } from '../../types/models';
import { activePlantation, parcelCrop } from '../../services/fieldQueries';
import { cropColor } from '../../services/presentation';
import { formatArea } from '../../utils/format';
import { colors, fontSize, radius, spacing } from '../../theme';

interface Props {
  parcels: Parcel[];
  selectedId: string;
  onSelect: (parcel: Parcel) => void;
}

const COLUMNS = ['PARCELA', 'CULTURA', 'ÁREA', 'HUMIDADE'];

export function ParcelTable({ parcels, selectedId, onSelect }: Props) {
  const { state } = useData();
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        {COLUMNS.map((column) => (
          <Text key={column} style={[styles.cell, styles.head, column === 'CULTURA' && styles.wide]}>
            {column}
          </Text>
        ))}
      </View>
      {parcels.map((parcel) => {
        const crop = parcelCrop(state, parcel);
        const active = Boolean(activePlantation(state, parcel.id));
        return (
          <Pressable key={parcel.id} onPress={() => onSelect(parcel)} style={[styles.row, parcel.id === selectedId && styles.selected]}>
            <Text style={[styles.cell, styles.bold]}>{parcel.code}</Text>
            <View style={[styles.cell, styles.wide, styles.crop]}>
              <View style={[styles.dot, { backgroundColor: cropColor(crop) }]} />
              <Text style={styles.text}>{crop}</Text>
            </View>
            <Text style={[styles.cell, styles.text]}>{formatArea(parcel.areaHa)}</Text>
            <Text style={[styles.cell, styles.bold]}>{active ? `${parcel.sensors.humidity} %` : '--'}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function CropLegend({ parcels }: { parcels: Parcel[] }) {
  const { state } = useData();
  const crops = [...new Set(parcels.map((parcel) => parcelCrop(state, parcel)))];
  return (
    <View style={styles.legend}>
      {crops.map((crop) => (
        <View key={crop} style={styles.crop}>
          <View style={[styles.dot, { backgroundColor: cropColor(crop) }]} />
          <Text style={styles.legendText}>{crop}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  selected: { backgroundColor: colors.successSurface, borderLeftWidth: 3, borderLeftColor: colors.primary },
  cell: { flex: 1 },
  wide: { flex: 1.6 },
  head: { fontSize: fontSize.xs, fontWeight: '700', color: colors.muted },
  bold: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text },
  text: { fontSize: fontSize.sm, color: colors.text },
  crop: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  legendText: { fontSize: fontSize.xs, color: colors.muted },
});
