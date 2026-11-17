import { ReactNode } from 'react';
import { useData } from '../../context/DataContext';
import { Task } from '../../types/models';
import { findUser } from '../../services/userQueries';
import { dueLabel, taskLocation } from '../../services/taskQueries';
import { taskIcon, taskStatusLabel, taskStatusTone } from '../../services/presentation';
import { Badge, IconTile, ListRow } from '../ui';

interface Props {
  task: Task;
  showOperator?: boolean;
  onPress?: () => void;
  trailing?: ReactNode;
}

export function TaskRow({ task, showOperator = true, onPress, trailing }: Props) {
  const { state } = useData();
  const operatorName = findUser(state, task.operatorId)?.name ?? '';
  const due = dueLabel(task);
  return (
    <ListRow
      title={task.type}
      subtitle={taskLocation(state, task)}
      detail={showOperator ? `${operatorName} · ${due}` : due}
      leading={<IconTile icon={taskIcon(task.type)} tone={taskStatusTone[task.status]} />}
      trailing={trailing ?? <Badge label={taskStatusLabel[task.status]} tone={taskStatusTone[task.status]} />}
      onPress={onPress}
    />
  );
}
