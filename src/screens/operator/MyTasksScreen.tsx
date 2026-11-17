import { StyleSheet, View } from 'react-native';
import { useData } from '../../context/DataContext';
import { useAppNavigation } from '../../navigation/types';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { countByStatus, tasksOfOperator } from '../../services/taskQueries';
import { firstName } from '../../utils/format';
import { ScanBanner, TaskSectionList } from '../../components/domain';
import { KpiRow, Screen, ScreenHeader } from '../../components/ui';
import { Task } from '../../types/models';
import { spacing } from '../../theme';

export function MyTasksScreen() {
  const navigation = useAppNavigation();
  const { state } = useData();
  const user = useCurrentUser();
  const tasks = tasksOfOperator(state, user.id);
  const counts = countByStatus(tasks);

  const openTask = (task: Task) => task.parcelId && navigation.navigate('ScannedParcel', { parcelId: task.parcelId });

  const header = (
    <View style={styles.header}>
      <ScanBanner onPress={() => navigation.navigate('Tabs', { screen: 'ScanQr' })} />
      <KpiRow
        items={[
          { value: String(counts.pending), label: 'Pendentes' },
          { value: String(counts.inProgress), label: 'Em curso' },
          { value: String(counts.doneToday), label: 'Concluídas hoje' },
        ]}
      />
    </View>
  );

  return (
    <Screen scroll={false} header={<ScreenHeader overline={`Olá, ${firstName(user.name)}`} title="As minhas tarefas" />}>
      <TaskSectionList tasks={tasks.filter((task) => task.status !== 'done')} header={header} showOperator={false} onPressTask={openTask} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.md, marginBottom: spacing.sm },
});
