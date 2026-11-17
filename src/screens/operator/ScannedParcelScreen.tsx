import { AppScreenProps } from '../../navigation/types';
import { useData } from '../../context/DataContext';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { findField, findParcel } from '../../services/fieldQueries';
import { isOpen, tasksOfParcel } from '../../services/taskQueries';
import { formatDecimal } from '../../utils/format';
import { PlantationCard, TaskRow } from '../../components/domain';
import { Badge, Button, Card, EmptyState, InfoRow, Screen, ScreenHeader, SectionLabel } from '../../components/ui';

export function ScannedParcelScreen({ navigation, route }: AppScreenProps<'ScannedParcel'>) {
  const { state } = useData();
  const user = useCurrentUser();
  const parcel = findParcel(state, route.params.parcelId);
  if (!parcel) return <EmptyState message="Parcela não encontrada." />;
  const tasks = tasksOfParcel(state, parcel.id).filter((task) => task.operatorId === user.id);

  return (
    <Screen
      header={
        <ScreenHeader
          overline={findField(state, parcel.fieldId)?.name}
          title={`Parcela ${parcel.code}`}
          onBack={navigation.goBack}
          right={<Badge label="QR lido agora" />}
        />
      }
      footer={<Button label="Registar observação" variant="secondary" onPress={() => navigation.navigate('Observation', { parcelId: parcel.id })} />}
    >
      <PlantationCard parcel={parcel} />
      <Card>
        <InfoRow label="Humidade do solo" value={`${parcel.sensors.humidity} %`} />
        <InfoRow label="Temperatura" value={`${formatDecimal(parcel.sensors.temperature)} °C`} />
      </Card>
      <SectionLabel title="Tarefas nesta parcela" />
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          showOperator={false}
          trailing={isOpen(task) ? <Button label="Concluir" onPress={() => navigation.navigate('CompleteTask', { taskId: task.id })} compact /> : undefined}
        />
      ))}
      {tasks.length === 0 && <EmptyState message="Sem tarefas atribuídas nesta parcela." />}
    </Screen>
  );
}
