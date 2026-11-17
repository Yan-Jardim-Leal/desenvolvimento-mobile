import { ReactElement } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { Task } from '../../types/models';
import { groupTasks } from '../../services/taskQueries';
import { spacing } from '../../theme';
import { EmptyState, SectionLabel } from '../ui';
import { TaskRow } from './TaskRow';

interface Props {
  tasks: Task[];
  header?: ReactElement;
  showOperator?: boolean;
  onPressTask?: (task: Task) => void;
}

export function TaskSectionList({ tasks, header, showOperator, onPressTask }: Props) {
  return (
    <SectionList
      sections={groupTasks(tasks)}
      keyExtractor={(task) => task.id}
      contentContainerStyle={styles.content}
      ListHeaderComponent={header}
      ListEmptyComponent={<EmptyState message="Sem tarefas para mostrar." />}
      renderSectionHeader={({ section }) => <SectionLabel title={section.title} />}
      renderItem={({ item }) => (
        <TaskRow task={item} showOperator={showOperator} onPress={onPressTask && (() => onPressTask(item))} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      stickySectionHeadersEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.sm },
  separator: { height: spacing.sm },
});
