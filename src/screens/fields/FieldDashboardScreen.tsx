import { useState } from 'react';
import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { usePermissions } from '../../hooks/usePermissions';
import { findCompany } from '../../services/companyQueries';
import { fieldStats, findField, parcelLabel, parcelsOfField, activePlantation } from '../../services/fieldQueries';
import { formatArea } from '../../utils/format';
import { CropLegend, ParcelTable } from '../../components/domain';
import { Badge, Button, EmptyState, IconTile, KpiRow, ListRow, Screen, ScreenHeader, SectionLabel } from '../../components/ui';

export function FieldDashboardScreen({ navigation, route }: AppScreenProps<'FieldDashboard'>) {
  const { state, actions } = useData();
  const { canManage } = usePermissions();
  const parcels = parcelsOfField(state, route.params.fieldId);
  const [selectedId, setSelectedId] = useState(parcels[0]?.id ?? '');
  const field = findField(state, route.params.fieldId);
  if (!field) return <EmptyState message="Campo não encontrado." />;
  const stats = fieldStats(state, field.id);
  const selected = parcels.find((parcel) => parcel.id === selectedId);

  const handleNewParcel = () => {
    const parcel = actions.addParcel(field.id);
    navigation.navigate('NewPlantation', { parcelId: parcel.id });
  };

  return (
    <Screen
      header={
        <ScreenHeader
          overline={canManage ? 'Dashboard do campo' : findCompany(state, field.companyId)?.name}
          title={field.name}
          onBack={navigation.goBack}
          right={!canManage && <Badge label="Só leitura" tone="earth" />}
        />
      }
    >
      <SectionLabel title={`Parcelas (${parcels.length})`} />
      {canManage && <Button label="Nova parcela" icon="plus" variant="secondary" onPress={handleNewParcel} />}
      <ParcelTable parcels={parcels} selectedId={selectedId} onSelect={(parcel) => setSelectedId(parcel.id)} />
      <CropLegend parcels={parcels} />
      <KpiRow
        items={[
          { value: formatArea(field.areaHa), label: 'Área total' },
          { value: String(stats.parcels), label: 'Parcelas' },
          { value: `${stats.activePlantations} ativas`, label: 'Plantações' },
        ]}
      />
      <ListRow title={`${field.city}, ${field.region}`} subtitle={field.coordinates} leading={<IconTile icon="map-marker-outline" tone="earth" />} />
      {selected && (
        <>
          <SectionLabel title="Parcela selecionada" />
          <ListRow
            title={parcelLabel(state, selected)}
            subtitle={`${activePlantation(state, selected.id)?.status ?? 'Pousio'} · humidade ${selected.sensors.humidity} %`}
            leading={<IconTile icon="sprout-outline" />}
            onPress={() => navigation.navigate('Parcel', { parcelId: selected.id })}
          />
        </>
      )}
    </Screen>
  );
}
