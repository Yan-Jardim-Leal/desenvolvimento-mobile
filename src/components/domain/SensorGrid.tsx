import { StyleSheet, Text, View } from 'react-native';
import { Sensors } from '../../types/models';
import { colors, fontSize, radius, spacing, Tone } from '../../theme';
import { formatDecimal } from '../../utils/format';
import { IconName, IconTile } from '../ui';

interface Reading {
  icon: IconName;
  tone: Tone;
  value: string;
  label: string;
}

const readingsOf = (sensors: Sensors): Reading[] => [
  { icon: 'water-outline', tone: 'info', value: `${sensors.humidity} %`, label: 'Humidade' },
  { icon: 'thermometer', tone: 'warning', value: `${formatDecimal(sensors.temperature)} °C`, label: 'Temperatura' },
  { icon: 'white-balance-sunny', tone: 'earth', value: `${sensors.light} lx`, label: 'Luminosidade' },
  { icon: 'flask-outline', tone: 'success', value: formatDecimal(sensors.ph), label: 'pH do solo' },
];

export function SensorGrid({ sensors }: { sensors: Sensors }) {
  return (
    <View style={styles.grid}>
      {readingsOf(sensors).map((reading) => (
        <View key={reading.label} style={styles.tile}>
          <IconTile icon={reading.icon} tone={reading.tone} size={36} />
          <View>
            <Text style={styles.value}>{reading.value}</Text>
            <Text style={styles.label}>{reading.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tile: {
    flexBasis: '48%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  value: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  label: { fontSize: fontSize.xs, color: colors.muted },
});
