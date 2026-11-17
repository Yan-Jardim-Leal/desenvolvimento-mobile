import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAppNavigation } from '../../navigation/types';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { findCompany } from '../../services/companyQueries';
import { filterTasks, TaskFilter, tasksOfCompany } from '../../services/taskQueries';
import { TaskSectionList } from '../../components/domain';
import { ChipGroup, IconButton, Screen, ScreenHeader } from '../../components/ui';
import { Task } from '../../types/models';

const FILTER_LABELS: Record<TaskFilter, string> = { all: 'Todas', pending: 'Pendentes', done: 'Concluídas' };

export function TasksScreen() {
  const navigation = useAppNavigation();
  const { state } = useData();
  const user = useCurrentUser();
  const [filter, setFilter] = useState<TaskFilter>('all');
  const tasks = filterTasks(tasksOfCompany(state, user.companyId), filter);

  const openTask = (task: Task) =>
    task.parcelId ? navigation.navigate('Parcel', { parcelId: task.parcelId }) : navigation.navigate('FieldDashboard', { fieldId: task.fieldId });

  return (
    <Screen
      scroll={false}
      header={
        <ScreenHeader
          overline={findCompany(state, user.companyId)?.name}
          title="Tarefas"
          right={<IconButton icon="plus" filled onPress={() => navigation.navigate('NewTask', {})} />}
        />
      }
    >
      <ChipGroup options={['all', 'pending', 'done'] as const} value={filter} onChange={setFilter} labels={FILTER_LABELS} />
      <TaskSectionList tasks={tasks} onPressTask={openTask} />
    </Screen>
  );
}
