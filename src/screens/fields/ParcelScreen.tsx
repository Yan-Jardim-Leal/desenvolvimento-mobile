import { Alert, StyleSheet, View } from 'react-native';
import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { usePermissions } from '../../hooks/usePermissions';
import { activePlantation, findField, findParcel } from '../../services/fieldQueries';
import { tasksOfParcel } from '../../services/taskQueries';
import { PlantationCard, SensorGrid, TaskRow } from '../../components/domain';
import { Button, EmptyState, IconTile, ListRow, Screen, ScreenHeader, SectionLabel } from '../../components/ui';
import { spacing } from '../../theme';

export function ParcelScreen({ navigation, route }: AppScreenProps<'Parcel'>) {
  const { state } = useData();
  const { canManage } = usePermissions();
  const parcel = findParcel(state, route.params.parcelId);
  if (!parcel) return <EmptyState message="Parcela não encontrada." />;
  const hasPlantation = Boolean(activePlantation(state, parcel.id));
  const tasks = tasksOfParcel(state, parcel.id);

  const footer = (
    <View style={styles.actions}>
      <Button label="Estatísticas" variant="secondary" style={styles.action} onPress={() => navigation.navigate('Statistics', { parcelId: parcel.id })} />
      {canManage && (
        <Button
          label={hasPlantation ? 'Nova tarefa' : 'Nova plantação'}
          style={styles.action}
          onPress={() =>
            hasPlantation
              ? navigation.navigate('NewTask', { fieldId: parcel.fieldId, parcelId: parcel.id })
              : navigation.navigate('NewPlantation', { parcelId: parcel.id })
          }
        />
      )}
    </View>
  );

  return (
    <Screen
      header={<ScreenHeader overline={findField(state, parcel.fieldId)?.name} title={`Parcela ${parcel.code}`} onBack={navigation.goBack} />}
      footer={footer}
    >
      <PlantationCard parcel={parcel} />
      <SectionLabel title="Sensores · atualizado há 4 min" />
      <SensorGrid sensors={parcel.sensors} />
      <ListRow
        title="Código QR da parcela"
        subtitle={`Gerado na criação · ${parcel.qrCode}`}
        detail="Imprimir ou partilhar"
        leading={<IconTile icon="qrcode" tone="neutral" size={48} />}
        onPress={() => Alert.alert('Código QR', parcel.qrCode)}
      />
      <SectionLabel title="Tarefas nesta parcela" />
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
      {tasks.length === 0 && <EmptyState message="Sem tarefas associadas." />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', gap: spacing.md },
  action: { flex: 1 },
});
