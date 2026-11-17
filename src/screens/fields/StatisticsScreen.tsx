import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { findParcel, parcelLabel } from '../../services/fieldQueries';
import { average, Period, Series, sensorHistory } from '../../services/statistics';
import { formatDecimal } from '../../utils/format';
import { BarChart, Card, ChipGroup, EmptyState, Screen, ScreenHeader } from '../../components/ui';
import { colors, fontSize } from '../../theme';

const PERIOD_LABELS: Record<Period, string> = { '7d': '7 dias', '30d': '30 dias', season: 'Época' };

function ChartCard({ title, value, series }: { title: string; value: string; series: Series }) {
  return (
    <Card>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <BarChart values={series.values} labels={series.labels} />
    </Card>
  );
}

export function StatisticsScreen({ navigation, route }: AppScreenProps<'Statistics'>) {
  const { state } = useData();
  const [period, setPeriod] = useState<Period>('7d');
  const parcel = findParcel(state, route.params.parcelId);
  if (!parcel) return <EmptyState message="Parcela não encontrada." />;
  const history = sensorHistory(parcel.sensors, period);

  return (
    <Screen header={<ScreenHeader overline={`Parcela ${parcelLabel(state, parcel)}`} title="Estatísticas" onBack={navigation.goBack} />}>
      <ChipGroup options={['7d', '30d', 'season'] as const} value={period} onChange={setPeriod} labels={PERIOD_LABELS} />
      <ChartCard title="Humidade do solo" value={`${parcel.sensors.humidity} %`} series={history.humidity} />
      <ChartCard title="Temperatura" value={`${formatDecimal(parcel.sensors.temperature)} °C`} series={history.temperature} />
      <ChartCard title="pH do solo" value={`Média: ${formatDecimal(average(history.ph.values))}`} series={history.ph} />
      <Text style={styles.footnote}>Dados de demonstração (dummy)</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  value: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
  footnote: { textAlign: 'center', fontSize: fontSize.xs, color: colors.muted },
});
